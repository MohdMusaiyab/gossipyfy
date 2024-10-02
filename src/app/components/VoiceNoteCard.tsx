"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, MessageCircle, Share2, Volume2, Volume1, VolumeX } from 'lucide-react';

interface VoiceNoteCardProps {
  title: string;
  description: string;
  fileUrl: string;
  username: string;
  createdAt: string;
  likes?: number;
  comments?: number;
  userAvatar?: string;
}

const VoiceNoteCard: React.FC<VoiceNoteCardProps> = ({
  title,
  description,
  fileUrl,
  username,
  createdAt,
  likes = 0,
  comments = 0,
  userAvatar = "/api/placeholder/40/40"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    // Add event listeners
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipBackward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime -= 10;
  };

  const skipForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime += 10;
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} />;
    if (volume < 0.5) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <img
          src={userAvatar}
          alt={username}
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{username}</h3>
          <p className="text-xs text-gray-500">{new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
      </div>

      <div className="mb-6">
        <audio ref={audioRef} src={fileUrl} preload="metadata" />
        
        {/* Progress Bar */}
        <div
          ref={progressBarRef}
          onClick={handleProgressClick}
          className="w-full h-1 bg-gray-200 rounded-full mb-2 cursor-pointer"
        >
          <div
            className="h-full bg-blue-500 rounded-full relative"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full shadow-md transform translate-x-1/2" />
          </div>
        </div>

        {/* Time indicators */}
        <div className="flex justify-between text-xs text-gray-500 mb-4">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={skipBackward}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <SkipBack size={20} />
            </button>
            
            <button
              onClick={togglePlay}
              className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </button>
            
            <button
              onClick={skipForward}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>

          <div className="relative flex items-center">
            <button
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {getVolumeIcon()}
            </button>
            
            {showVolumeSlider && (
              <div
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
                className="absolute right-full mr-2 bg-white shadow-lg rounded-lg p-2"
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 accent-blue-500"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-500 transition-colors"
        >
          <Heart
            size={20}
            className={`${isLiked ? 'fill-current text-red-500' : ''}`}
          />
          <span>{likes + (isLiked ? 1 : 0)}</span>
        </button>

        <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-500 transition-colors">
          <MessageCircle size={20} />
          <span>{comments}</span>
        </button>

        <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-500 transition-colors">
          <Share2 size={20} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default VoiceNoteCard;