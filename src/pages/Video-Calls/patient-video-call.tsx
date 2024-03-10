import AgoraGetStarted from "./agora_manager_get_started.js";
import React, { useState, useEffect } from "react";
import videoOnIcon from "../../assets/icons/video-on-icon.svg";
import videoOffIcon from "../../assets/icons/video-off-icon.svg";
import micOffIcon from "../../assets/icons/mic-off-icon.svg";
import micOnIcon from "../../assets/icons/mic-on-icon.svg";
import leaveMeetingIcon from "../../assets/icons/leave-meeting.svg";
import joinMeetingIcon from "../../assets/icons/join-meeting.svg";
import chatIcon from "../../assets/icons/comments.svg";
import { ToastContainer, toast } from "react-toastify";
import "./videos.css";
let channelParameters = {
  localAudioTrack: null,
  localVideoTrack: null,
  remoteAudioTrack: null,
  remoteVideoTrack: null,
  remoteUid: null,
  channelName: null,
  token: null,
  chatToken: null,
  uid: null,
  peerId: null,
  chatUId: null,
};
const PatientVideoCall: React.FC = () => {
  const [channelParams, setChannelParams] = useState(channelParameters);
  const [isInMeeting, setIsInMeeting] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [isInChat, setIsInChat] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [role, setRole] = useState("");
  const [meetingToken, setMeetingToken] = useState("");
  const openChat = () => {    
    var chatContainer = document.getElementById("chat-container");
    if(chatContainer.style.right == "10px")
      chatContainer.style.right = "-500px";
    else
      chatContainer.style.right = "10px";
  };
  const closeChat = () => {
    var chatContainer = document.getElementById("chat-container");
    chatContainer.style.right = "-500px";
  };
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

      const {
        join,
        leave,
        rejoinVideo,
        rejoinAudio,
        leaveVideo,
        leaveAudio,
        handleLogin,
        handleLogout,
        handleSendPeerMessage,
        closeChat,
      } = await AgoraGetStarted(handleVSDKEvents);

      const remotePlayerContainer = document.createElement("div");      
      const localPlayerContainer = document.createElement("div");
      localPlayerContainer.id = "local-player";
      document.getElementById("sendMessage").onclick = async function () {
        handleSendPeerMessage(channelParameters);
      };

      // Listen to the Join button click event.
      document.getElementById("chat").onclick = async function () {
        channelParameters.chatToken = info[4];
        channelParameters.peerId = info[5];
        channelParameters.chatUId = info[3];
        try {
          if (isInChat) {
            return;
          }
          handleLogin(channelParameters);
          setIsInChat(true);
        } catch (e) {
          if (e.message.includes("4096")) {
            toast.error("Meeting expired or not started yet");
          } else {
            toast.error("Error joining Chat");
          }
          return;
        }
      };
      document.getElementById("join").onclick = async function () {
        channelParams.channelName = info[0];
        channelParams.token = info[2];
        channelParams.uid = parseInt(info[3]);
        // channelParameters.chatToken = info[4];
        // channelParameters.peerId = info[5];
        // channelParameters.chatUId = info[3];
        try {
          setChannelParams(await join(localPlayerContainer, channelParameters));          
          // handleLogin(channelParameters);
        } catch (e) {
          if (e.message.includes("key expired")) {
            toast.error("Meeting has ended");
            return;
          }
          if (e.message.includes("4096")) {
            toast.error("Meeting expired or not started yet");
          } else {
            toast.error("Error joining the meeting");
          }
          return;
        }
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
        setChannelParams(
          await rejoinAudio(channelParams)
        );
      };
      document.getElementById("stopMic").onclick = async function () {
        setIsMicOn(false);
        setChannelParams(await leaveAudio(channelParams));
      };
    };

    initializeVideoCall();
  }, []);
  function handleKeyPress(event) {
    if (event.keyCode === 13) {
      document.getElementById("sendMessage").click();
    }
  }
  window.onload = function () {
    const chatElement = document.getElementById("chat");
    chatElement.click();
    chatElement.click();
  };
  return (
    <div id="projectSelector" style={{ padding: "10px" }}>
      <ToastContainer />
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
          <img
            src={leaveMeetingIcon}
            id="leave"
            className="video-control-btn"
            style={{ display: isInMeeting ? "block" : "none" }}
          />
          <img
            src={joinMeetingIcon}
            id="join"
            className="video-control-btn"
            style={{ display: isInMeeting ? "none" : "block" }}
          />
          <div className="video-control-btn-chat">
            <img
              src={chatIcon}
              id="chat"
              onClick={openChat}
              style={{ width: "50%" }}
            />
          </div>
        </div>
      </div>
      <div id="chat-container">
        <div id="chat-controls">
          <button onClick={closeChat}>&#62;</button>
        </div>
        <div id="chat-box"></div>
        <div id="chat-message" className="flex">
          <input
            type="text"
            id="message-to-send"
            placeholder="Message..."
            onKeyDown={handleKeyPress}
          />
          <button id="sendMessage">Submit</button>
        </div>
      </div>
      <div id="video-container"></div>
    </div>
  );
};

export default PatientVideoCall;
