import AgoraGetStarted from "./agora_manager_get_started.js";
import React, { useState, useEffect } from "react";
import videoOnIcon from "../../assets/icons/video-on-icon.svg";
import videoOffIcon from "../../assets/icons/video-off-icon.svg";
import micOffIcon from "../../assets/icons/mic-off-icon.svg";
import micOnIcon from "../../assets/icons/mic-on-icon.svg";
import "./videos.css";
let channelParameters = {
  localAudioTrack: null,
  localVideoTrack: null,
  remoteAudioTrack: null,
  remoteVideoTrack: null,
  remoteUid: null,
  channelName: null,
  token: null,
  uid: null,
};
const PatientVideoCall: React.FC = () => {
  const [channelParams, setChannelParams] = useState(channelParameters);
  const [isInMeeting, setIsInMeeting] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [role, setRole] = useState("");
  const [meetingToken, setMeetingToken] = useState("");
  useEffect(() => {
    const meetingCredentials = localStorage.getItem("creds");
    const info = meetingCredentials.split("@");
    setChannelName(info[0] || "appointment");
    setRole(info[1] || "patient");
    setMeetingToken(info[2]);
    setPatientId(info[3]);
    const initializeVideoCall = async () => {
      const handleVSDKEvents = (eventName, ...args) => {
        switch (eventName) {
          case "user-published":
            if (args[1] == "video") {
              channelParams.remoteVideoTrack = args[0].videoTrack;
              channelParams.remoteAudioTrack = args[0].audioTrack;
              channelParams.remoteUid = args[0].uid.toString();
              remotePlayerContainer.id = args[0].uid.toString();
              channelParams.remoteUid = args[0].uid.toString();
              remotePlayerContainer.classList.add("video-player");
              document
                .getElementById("video-container")
                .append(remotePlayerContainer);
              channelParams.remoteVideoTrack.play(remotePlayerContainer);
            }
            if (args[1] == "audio") {
              channelParams.remoteAudioTrack = args[0].audioTrack;
              channelParams.remoteAudioTrack.play();
            }
        }
      };

      const { join, leave, rejoinVideo, rejoinAudio, leaveVideo ,leaveAudio} =
        await AgoraGetStarted(handleVSDKEvents);

      const remotePlayerContainer = document.createElement("div");
      const localPlayerContainer = document.createElement("div");

      localPlayerContainer.style.width = "100vw";
      localPlayerContainer.style.height = "100vh";
      remotePlayerContainer.style.width = "100vw";
      remotePlayerContainer.style.height = "100vh";

      // Listen to the Join button click event.
      document.getElementById("join").onclick = async function () {
        channelParams.channelName = info[0];
        channelParams.token = info[2];
        channelParams.uid = parseInt(info[3]);
        // setIsInMeeting(true);
        setChannelParams(await join(localPlayerContainer, channelParams));
        setIsInMeeting(true);
        setIsVideoOn(true);
        setIsMicOn(true);
      };
      document.getElementById("leave").onclick = async function () {
        // removeVideoDiv(remotePlayerContainer.id);
        // removeVideoDiv(localPlayerContainer.id);
        await leave(channelParams);
        window.location.reload();
      };
      document.getElementById("stopVideo").onclick = async function () {
        setIsVideoOn(false);
        setChannelParams(await leaveVideo(channelParams));        
      };
      document.getElementById("startVideo").onclick = async function () {        
        setIsVideoOn(true);
        setChannelParams(
          await rejoinVideo(localPlayerContainer, channelParams)
        );    
      };
      document.getElementById("startMic").onclick = async function () {        
        setIsMicOn(true);
        setChannelParams(await rejoinAudio(localPlayerContainer, channelParams));    
      };
      document.getElementById("stopMic").onclick = async function () {
        setIsMicOn(false);
        setChannelParams(await leaveAudio(channelParams));        
      };
    };

    initializeVideoCall();
  }, []);
  function removeVideoDiv(elementId) {
    console.log("Removing " + elementId + "Div");
    let Div = document.getElementById(elementId);
    if (Div) {
      Div.remove();
    }
  }
  return (
    <div id="projectSelector">
      <h1>{channelName.replace(/([A-Z])/g, ' $1').trim() + " Appointment"}</h1>
      <h2>User: {role}</h2>
      <div style={{ display: "flex","justifyContent": "space-evenly" }}>
        <button
          id="leave"
          className="danger-btn"
          style={{ display: isInMeeting ? "block" : "none" }}
        >
          LEAVE MEETING
        </button>
        <button
          id="join"
          className="primary-btn"
          style={{ display: isInMeeting ? "none" : "block" }}
        >
          JOIN MEETING
        </button>
        <div className="video-panel">
          <img
            id="stopVideo"
            src={videoOnIcon}
            width={"50px"}
            style={{
              display: isInMeeting ? (isVideoOn ? "block" : "none") : "none",
            }}
          ></img>
          <img
            id="startVideo"
            src={videoOffIcon}
            width={"50px"}
            style={{
              display: isInMeeting ? (isVideoOn ? "none" : "block") : "none",
            }}
          ></img>
          <img
            id="stopMic"
            src={micOnIcon}
            width={"50px"}
            style={{
              display: isInMeeting ? (isMicOn ? "block" : "none") : "none",
            }}
          ></img>
          <img
            id="startMic"
            src={micOffIcon}
            width={"50px"}
            style={{
              display: isInMeeting ? (isMicOn ? "none" : "block") : "none",
            }}
          ></img>
        </div>
      </div>
      <div id="video-container" className="video-container"></div>
    </div>
  );
};

export default PatientVideoCall;
