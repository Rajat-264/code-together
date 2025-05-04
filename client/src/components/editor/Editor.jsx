import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import socket from "../../Socket";
import "./editor.css";

const Editor = ({ roomId, username }) => {
  const [code, setCode] = useState("// Start coding...");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    socket.emit("join-room", { roomId, username });

    socket.on("receive-code", (newCode) => {
      if (newCode !== code) {
        setCode(newCode);
      }
    });

    socket.on("receive-message", ({ username: sender, message }) => {
      setMessages((prev) => [...prev, { sender, message }]);
    });

    return () => {
      socket.off("receive-code");
      socket.off("receive-message");
    };
  }, [roomId, username]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("send-code", { roomId, code: newCode });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit("send-message", { roomId, message, username });
      setMessages((prev) => [...prev, { sender: "You", message }]);
      setMessage("");
    }
  };

  return (
    <div className="editor-container">
      <div className="editor">
        <MonacoEditor
          width="1050px"        
          language="javascript"
          theme="vs-dark"
          value={code}
          onChange={handleCodeChange}
          editorDidMount={(editor) => (editorRef.current = editor)}
        />
      </div>
      <div className="chat">
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx}>
              <strong>{msg.sender}:</strong> {msg.message}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage} className="chat-send">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
