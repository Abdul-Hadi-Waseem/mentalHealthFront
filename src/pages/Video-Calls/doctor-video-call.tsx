import AgoraGetStarted from "./agora_manager_get_started.js";
import React, { useState, useEffect } from "react";
import videoOnIcon from "../../assets/icons/video-on-icon.svg";
import videoOffIcon from "../../assets/icons/video-off-icon.svg";
import micOffIcon from "../../assets/icons/mic-off-icon.svg";
import micOnIcon from "../../assets/icons/mic-on-icon.svg";
import leaveMeetingIcon from "../../assets/icons/leave-meeting.svg";
import joinMeetingIcon from "../../assets/icons/join-meeting.svg";
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
  const [channelName, setChannelName] = useState("");
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [role, setRole] = useState("");
  const [meetingToken, setMeetingToken] = useState("");
  useEffect(() => {
    const meetingCredentials = localStorage.getItem("creds");
    const info = meetingCredentials.split("@");
    setChannelName(info[0] || "appointment");
    setRole(info[1] || "Doctor");
    setMeetingToken(info[2]);
    const initializeVideoCall = async () => {
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
              document
                .getElementById("video-container")
                .append(remotePlayerContainer);
              channelParameters.remoteVideoTrack.play(remotePlayerContainer);
            }
            if (args[1] == "audio") {
              channelParameters.remoteAudioTrack = args[0].audioTrack;
              channelParameters.remoteAudioTrack.play();
            }
        }
      };

      const { join, leave, rejoinVideo, rejoinAudio, leaveVideo ,leaveAudio} = await AgoraGetStarted(handleVSDKEvents);

      const remotePlayerContainer = document.createElement("div");
      const localPlayerContainer = document.createElement("div");
      localPlayerContainer.id = "local-player";

      // Listen to the Join button click event.
      document.getElementById("join").onclick = async function () {
        channelParameters.channelName = info[0];
        channelParameters.token = info[2];
        channelParameters.uid = parseInt(info[3]);
        setChannelParams(await join(localPlayerContainer, channelParameters));
        setIsInMeeting(true);
        setIsVideoOn(true);
        setIsMicOn(true);
      };      
      // Listen to the Leave button click event.
      document.getElementById("leave").onclick = async function () {
        removeVideoDiv(remotePlayerContainer.id);
        removeVideoDiv(localPlayerContainer.id);
        await leave(channelParameters);
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
      <div className="video-controls">        
        <div className="video-panel">
          <img
            id="stopVideo"
            src={videoOnIcon}
            width={"50px"}
            className="video-control-btn"
            style={{
              display: isInMeeting ? (isVideoOn ? "block" : "none") : "none",
            }}
          ></img>
          <img
            id="startVideo"
            src={videoOffIcon}
            width={"50px"}
            className="video-control-btn"
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
          <img src={leaveMeetingIcon} id="leave" className='video-control-btn' style={{ display: isInMeeting ? "block" : "none" }}/>
          <img src={joinMeetingIcon} id="join" className='video-control-btn' style={{ display: isInMeeting ? "none" : "block" }}/>
        </div>          
      </div>
      <div id="video-container"></div>
    </div>
  );
};

export default PatientVideoCall;
