import React from 'react'

import {Component} from 'react'
import {Player} from 'video-react';
import './VideoPlayer.css';
// import "node_modules/video-react/dist/video-react.css";

<link rel="stylesheet" href="/css/video-react.css"/>


export class VideoPlayer extends Component {
	render() {
		return (
			<div>Hello World
				<Player
					
					autoPlay={true}
					playsInline
					poster="/assets/poster.png"
					src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
					
				/>
			</div>
		)
	}
}

export default VideoPlayer
