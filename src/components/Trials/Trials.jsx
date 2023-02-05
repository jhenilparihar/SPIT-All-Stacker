// Client-side (React component)
import React, {useState, useEffect} from 'react'
import ReactPlayer from 'react-player'
import io from 'socket.io-client'

const socket = io('http://localhost:3001')

function VideoPlayer({roomId}) {
	const [playbackTime, setPlaybackTime] = useState(0)
	
	useEffect(() => {
		socket.emit('joinRoom', roomId)
		
		socket.on('updatePlayback', (newTime) => {
			console.log('Inside updatePlayback');
			setPlaybackTime(newTime)
		})
	}, [roomId])
	
	const handlePlaybackChange = (newTime) => {
		setPlaybackTime(newTime)
		console.log('Time updated');
		socket.emit('updatePlayback', newTime)
	}
	
	return (
		<ReactPlayer
			url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
			controls={true}
			onProgress={({playedSeconds}) => handlePlaybackChange(playedSeconds)}
			playing={true}
			played={playbackTime}
		/>
	)
}

export default VideoPlayer
