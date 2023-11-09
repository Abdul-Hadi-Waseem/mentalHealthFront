import AgoraGetStarted from "./agora_manager_get_started.js";
import React, { useState } from "react";
let channelParameters = {
  localAudioTrack: null,
  localVideoTrack: null,
  remoteAudioTrack: null,
  remoteVideoTrack: null,
  remoteUid: null,
};
const PatientVideoCall: React.FC = () => {
  const [isInMeeting, setIsInMeeting] = useState(false);

  const meetingCredentials = localStorage.getItem("creds");
  const info = meetingCredentials.split("@");
  const channelName = info[0];
  const role = info[1];
  const meetingId = info[2];

  function removeVideoDiv(elementId) {
    console.log("Removing " + elementId + "Div");
    let Div = document.getElementById(elementId);
    if (Div) {
      Div.remove();
    }
  }
  // The following code is solely related to UI implementation and not Agora-specific code
  window.onload = async () => {
    const handleVSDKEvents = (eventName, ...args) => {
      switch (eventName) {
        case "user-published":
          if (args[1] == "video") {
            channelParameters.remoteVideoTrack = args[0].videoTrack;
            channelParameters.remoteAudioTrack = args[0].audioTrack;
            channelParameters.remoteUid = args[0].uid.toString();
            remotePlayerContainer.id = args[0].uid.toString();
            channelParameters.remoteUid = args[0].uid.toString();
            remotePlayerContainer.textContent =
              "Remote user " + args[0].uid.toString();
            document.body.append(remotePlayerContainer);
            // Play the remote video track.
            channelParameters.remoteVideoTrack.play(remotePlayerContainer);
          }
          // Subscribe and play the remote audio track If the remote user publishes the audio track only.
          if (args[1] == "audio") {
            // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
            channelParameters.remoteAudioTrack = args[0].audioTrack;
            // Play the remote audio track. No need to pass any DOM element.
            channelParameters.remoteAudioTrack.play();
          }
      }
    };

    const { join, leave, config } = await AgoraGetStarted(handleVSDKEvents);

    document.getElementById("channelName").innerHTML = config.channelName;
    document.getElementById("userId").innerHTML = config.uid;

    // Dynamically create a container in the form of a DIV element to play the remote video track.
    const remotePlayerContainer = document.createElement("div");
    // Dynamically create a container in the form of a DIV element to play the local video track.
    const localPlayerContainer = document.createElement("div");
    
    // Specify the ID of the DIV container. You can use the uid of the local user.
    // localPlayerContainer.id = config.uid;
    // Set the textContent property of the local video container to the local user id.
    // localPlayerContainer.textContent = "Local user " + config.uid;
    // Set the local video container size.
    localPlayerContainer.style.width = "100vw";
    localPlayerContainer.style.height = "100vh";
    // Set the remote video container size.
    remotePlayerContainer.style.width = "100vw";
    remotePlayerContainer.style.height = "100vh";

    // Listen to the Join button click event.
    document.getElementById("join").onclick = async function () {
      // Join a channel.
      setIsInMeeting(true);
      await join(localPlayerContainer, channelParameters);
      console.log("publish success!");
    };
    // Listen to the Leave button click event.
    document.getElementById("leave").onclick = async function () {
      removeVideoDiv(remotePlayerContainer.id);
      removeVideoDiv(localPlayerContainer.id);
      // Leave the channel
      await leave(channelParameters);
      console.log("You left the channel");
      // Refresh the page for reuse
      window.location.reload();
    };
  };
  return (
    <div id="projectSelector">
      <h1 id="channelName"></h1>
      <h2>
        User: <span id="userId"></span>
      </h2>
      <button id="leave" className="danger-btn" style={{ display: isInMeeting ? 'block' : 'none' }}>
        LEAVE MEETING
      </button>
        <button id="join" className="primary-btn" style={{ display: isInMeeting ? 'none' : 'block' }}>
          JOIN MEETING
        </button>
      <div id="video-container" className="video-container"></div>
    </div>
  );
};

export default PatientVideoCall;
