import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./home.css";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const createRoom = () => {
    const id = uuidv4();
    if (!username.trim()) return alert("Please enter a username");
    navigate(`/room/${id}`, { state: { username } });
  };

  const joinRoom = () => {
    if (!roomId.trim() || !username.trim()) {
      return alert("Please enter both Room ID and username");
    }
    navigate(`/room/${roomId}`, { state: { username } });
  };

  return (
    <div className="home-container">
      <h1 className="home-title">CodeTogether Pro</h1>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="home-input"
      />
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="home-input"
      />
      <div className="home-buttons">
        <button onClick={joinRoom} className="home-btn join">
          Join Room
        </button>
        <button onClick={createRoom} className="home-btn create">
          Create Room
        </button>
      </div>
    </div>
  );
};

export default Home;
