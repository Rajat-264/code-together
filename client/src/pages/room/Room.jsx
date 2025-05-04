import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Editor from "../../components/editor/Editor";
import "./room.css";

const Room = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const { username } = location.state || {};

  return (
    <div className="room-container">
      <div className="room-header">
        <p><strong>Room ID :</strong> {roomId}</p>
        <p><strong>Username :</strong> {username}</p>
      </div>
      <Editor roomId={roomId} username={username} />
    </div>
  );
};

export default Room;
