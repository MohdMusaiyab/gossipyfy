import React from 'react';

interface VoiceNoteCardProps {
  title: string;
  description: string;
  fileUrl: string;
  username: string;
  createdAt: string;
}

const VoiceNoteCard: React.FC<VoiceNoteCardProps> = ({ title, description, fileUrl, username, createdAt }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      <div className="mb-4">
        {/* Audio player */}
        <audio controls className="w-full">
          <source src={fileUrl} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      </div>

      <div className="text-sm text-gray-500">
        <span>Uploaded by: {username}</span>
        <br />
        <span>Created at: {new Date(createdAt).toLocaleDateString()}</span>
      </div>

      <div className="mt-4 flex space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Like</button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Comment</button>
      </div>
    </div>
  );
};

export default VoiceNoteCard;
