import AgoraRTC from "agora-rtc-sdk-ng";
import config from "../../configs/agora-config.json";
import AC from 'agora-chat';

const AgoraManager = async (eventsCallback) => {
  let agoraEngine = null;
  let agoraChat = null;
  // Set up the signaling engine with the provided App ID, UID, and configuration
  const setupAgoraEngine = async () => {
    agoraEngine = new AgoraRTC.createClient({ mode: "rtc", codec: "vp9" });
  };
  const setupAgoraChatConnection = () => {
    const appKey = config.appKey;
    const agoraConn = new AC.connection({ appKey: appKey });
    agoraConn.addEventHandler("connection&message", {
      onConnected: () => {
        console.log("Connect success !");
      },
      onDisconnected: () => {
        console.log("Logout success !");
      },
      onTextMessage: (message) => {
        const outgoingMessageDiv = document.createElement('div');
        outgoingMessageDiv.className = 'chat-incoming-message';
        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        const currentTime = new Date().toLocaleTimeString();
        timeSpan.textContent = currentTime;
        const messageSpan = document.createElement('span');
        messageSpan.textContent = message.msg;
        outgoingMessageDiv.appendChild(messageSpan);
        outgoingMessageDiv.appendChild(timeSpan);
        const chatBox = document.getElementById('chat-box');
        chatBox.appendChild(outgoingMessageDiv);
      },

      onTokenWillExpire: () => {
        console.log("Token is about to expire");
      },
      onTokenExpired: () => {
        console.log("The token has expired");
      },
      onError: (error) => {
        console.log("on error", error);
      },
    });

    agoraChat = agoraConn;
  };
  await setupAgoraEngine();
  setupAgoraChatConnection();

  // Event Listeners
  agoraEngine.on("user-published", async (user, mediaType) => {
    await agoraEngine.subscribe(user, mediaType);
    console.log("subscribe success");
    eventsCallback("user-published", user, mediaType)
  });

  agoraEngine.on("user-unpublished", (user) => {
    console.log(user.uid + "has left the channel");
  });

  const getAgoraEngine = () => {
    return agoraEngine;
  };
  const join = async (localPlayerContainer, channelParameters) => {
    await agoraEngine.join(
      config.appId,
      channelParameters.channelName,
      channelParameters.token,
      channelParameters.uid
    );
    channelParameters.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    channelParameters.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    localPlayerContainer.classList.add("video-player");
    document.getElementById("video-container").append(localPlayerContainer);
    await getAgoraEngine().publish([
      channelParameters.localAudioTrack,
      channelParameters.localVideoTrack,
    ]);
    // Play the local video track.
    channelParameters.localVideoTrack.play(localPlayerContainer);
    return channelParameters;
  };
  const rejoinVideo = async (localPlayerContainer, channelParameters) => {
    channelParameters.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    localPlayerContainer.classList.add("video-player");
    document.getElementById("video-container").append(localPlayerContainer);
    channelParameters.localVideoTrack.play(localPlayerContainer);
    agoraEngine.publish(channelParameters.localVideoTrack);
    return channelParameters;
  };
  const rejoinAudio = async (channelParameters) => {
    channelParameters.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    agoraEngine.publish(channelParameters.localAudioTrack);
    return channelParameters;
  };
  const leaveVideo = async (channelParameters) => {
    agoraEngine.unpublish(channelParameters.localVideoTrack);
    return channelParameters.localVideoTrack.close();
  };
  const leaveAudio = async (channelParameters) => {
    agoraEngine.unpublish(channelParameters.localAudioTrack);
    return channelParameters.localAudioTrack.close();
  };
  const leave = async (channelParameters) => {
    try {
      channelParameters.localAudioTrack.close();
      channelParameters.localVideoTrack.close();
      await agoraEngine.leave();
    }
    catch (err) {
      console.log("Error leaving the channel", err);
    }
    finally {
      await agoraEngine.leave();
    }

  };
  // CHAT
  const handleLogin = (channelParameters) => {
    console.log(channelParameters)
    agoraChat.open({ user: channelParameters.chatUId, pwd: 'patientID', agoraToken: channelParameters.chatToken });
  };
  const handleLogout = (channelParameters) => {
    agoraChat.close();
    console.log("Logout");
  };
  const handleSendPeerMessage = (channelParameters) => {
    let peerId = channelParameters.peerId;
    const inputField = document.getElementById('message-to-send');
    let peerMessage = inputField.value;
    inputField.value = '';
    let option = {
      chatType: "singleChat",
      type: "txt",
      to: peerId,
      msg: peerMessage,
    };
    let msg = AC.message.create(option);
    agoraChat.send(msg)
      .then((res) => {
        const outgoingMessageDiv = document.createElement('div');
        outgoingMessageDiv.className = 'chat-outgoing-message';
        outgoingMessageDiv.textContent = peerMessage;
        const chatBox = document.getElementById('chat-box');
        chatBox.appendChild(outgoingMessageDiv);
        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        const currentTime = new Date().toLocaleTimeString();
        timeSpan.textContent = currentTime;
        outgoingMessageDiv.appendChild(timeSpan);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // Return the agoraEngine and the available functions
  return {
    getAgoraEngine,
    config,
    join,
    leave,
    leaveVideo,
    rejoinVideo,
    rejoinAudio,
    leaveAudio,
    handleLogin,
    handleLogout,
    handleSendPeerMessage
  };
};

export default AgoraManager;
