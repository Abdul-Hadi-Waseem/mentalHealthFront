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
      config.channelName,
      config.token,
      config.uid
    );
    channelParameters.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    channelParameters.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    // Append the local video container to the page body.
    localPlayerContainer.classList.add("video-player");
    document.getElementById("video-container").append(localPlayerContainer);
    // document.body.append(localPlayerContainer);    
    // Publish the local audio and video tracks in the channel.
    await getAgoraEngine().publish([
      channelParameters.localAudioTrack,
      channelParameters.localVideoTrack,
    ]);    
    // Play the local video track.
    channelParameters.localVideoTrack.play(localPlayerContainer);
  };
  // const subscribe = async (remotePlayerContainer, channelParameters, uid) => {
  //   // await agoraEngine.subscribe(uid, "audio");
  //   // if (mediaType === "video") {
  //   //   const remotePlayerContainer = document.createElement("div");
  //   //   user.videoTrack.play(remotePlayerContainer);
  //   //   document.body.append(remotePlayerContainer);
  //   // }
  //   // user.audioTrack.play();
  //   // // Create a remote video track to render the video stream from the remote user.    
  //   // const remoteVideoTrack = await getAgoraEngine().subscribe(uid);
  //   // // Play the remote video track in the specified remote player container.
  //   // remoteVideoTrack.play(remotePlayerContainer);
  //   // remotePlayerContainer.classList.add("video-player");
  //   // document.body.append(remotePlayerContainer);    
  //   // // Store the remote video track in the channel parameters for future reference.
  //   // channelParameters.remoteVideoTracks.set(uid, remoteVideoTrack);
  // };
  
  const leave = async (channelParameters) => {
    // Destroy the local audio and video tracks.
    channelParameters.localAudioTrack.close();
    channelParameters.localVideoTrack.close();
    // Remove the containers you created for the local video and remote video.
    await agoraEngine.leave();
  };

  // Return the agoraEngine and the available functions
  return {
    getAgoraEngine,
    config,
    join,
    leave,
    // subscribe
  };
};

export default AgoraManager;
