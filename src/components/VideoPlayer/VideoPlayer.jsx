import React from 'react'

import {Component} from 'react'
import {Player} from 'video-react';
import './VideoPlayer.css';
// import "node_modules/video-react/dist/video-react.css";

<link rel="stylesheet" href="/css/video-react.css"/>


class VideoPlayer extends Component {

	render() {
		return (
			<div class="video-div">
				<Player
					autoPlay={true}
					playsInline
					poster="/assets/poster.png"
					src={this.props.content.contentURI}
					
				/>
			</div>
		)
	}
}

export default VideoPlayer
