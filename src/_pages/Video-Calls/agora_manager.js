import AgoraRTC from "agora-rtc-sdk-ng";
import config from "../../configs/agora-config.json";

const AgoraManager = async (eventsCallback) => {
  let agoraEngine = null;

  // Set up the signaling engine with the provided App ID, UID, and configuration
  const setupAgoraEngine = async () => {
    agoraEngine = new AgoraRTC.createClient({ mode: "rtc", codec: "vp9" });
  };
  await setupAgoraEngine();

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
  const rejoinVideo = async (localPlayerContainer,channelParameters) => {
    channelParameters.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    localPlayerContainer.classList.add("video-player");
    document.getElementById("video-container").append(localPlayerContainer);
    channelParameters.localVideoTrack.play(localPlayerContainer);
    return channelParameters;
  };
  const rejoinAudio = async (channelParameters) => {
    return channelParameters.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  };
  const leaveVideo = async (channelParameters) => { 
    return channelParameters.localVideoTrack.close();
  };
  const leaveAudio = async (channelParameters) => { 
    return channelParameters.localAudioTrack.close();
  };
  const leave = async (channelParameters) => {
    channelParameters.localAudioTrack.close();
    channelParameters.localVideoTrack.close();
    await agoraEngine.leave();
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
    leaveAudio
  };
};

export default AgoraManager;
