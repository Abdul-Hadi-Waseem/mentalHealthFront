import React, { useState } from 'react';

interface MediaTypeProps {
  onMediaChange: (media: string) => void;
}

export const MediaTypeSelection: React.FC<MediaTypeProps> = ({ onMediaChange }) => {
  const [selectedMedia, setSelectedMedia] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMedia(event.target.value);
    onMediaChange(event.target.value);
  };

  return (
    <div>
      <h2>Select Media</h2>
      <div>
        <input type="radio" value="Chat" checked={selectedMedia === "Chat"} onChange={handleChange} /> Chat
        <input type="radio" value="Call" checked={selectedMedia === "Call"} onChange={handleChange} /> Call
        <input type="radio" value="Video Call" checked={selectedMedia === "Video Call"} onChange={handleChange} /> Video Call
      </div>
    </div>
  );
}
