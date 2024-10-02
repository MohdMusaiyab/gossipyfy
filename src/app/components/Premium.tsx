import React from 'react'
import VoiceNoteCard from './VoiceNoteCard'
const Premium = () => {
  return (
    <div>
      Premium Videos
        <VoiceNoteCard
            title="Voice Note Title"
            description="Voice Note Description"
            fileUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            username="Username"
            createdAt="2021-01-01"
            likes={5}
            comments={2}
            userAvatar="/api/placeholder/40/40"
        />
    </div>
  )
}

export default Premium
