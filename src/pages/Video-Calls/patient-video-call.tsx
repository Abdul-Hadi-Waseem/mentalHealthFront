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
            remotePlayerContainer.classList.add("video-player");
            document.getElementById("video-container").append(remotePlayerContainer);
            // document.body.append(remotePlayerContainer);
            channelParameters.remoteVideoTrack.play(remotePlayerContainer);
          }
          if (args[1] == "audio") {
            channelParameters.remoteAudioTrack = args[0].audioTrack;
            channelParameters.remoteAudioTrack.play();
          }
      }
    };

    const { join, leave, config } = await AgoraGetStarted(handleVSDKEvents);

    document.getElementById("channelName").innerHTML = config.channelName;
    document.getElementById("userId").innerHTML = config.uid;

    const remotePlayerContainer = document.createElement("div");
    const localPlayerContainer = document.createElement("div");
    
    localPlayerContainer.style.width = "100vw";
    localPlayerContainer.style.height = "100vh";
    remotePlayerContainer.style.width = "100vw";
    remotePlayerContainer.style.height = "100vh";

    // Listen to the Join button click event.
    document.getElementById("join").onclick = async function () {
      // Join a channel.
      setIsInMeeting(true);
      await join(localPlayerContainer, channelParameters);
      // await subscribe(remotePlayerContainer,channelParameters,"1");
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
