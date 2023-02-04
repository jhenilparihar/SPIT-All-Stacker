import React, {Component} from 'react'
import './home.css'
import SideBar from "../SideBar/SideBar";
import TopNav from "../TopNav/TopNav";

export class Home extends Component {
	
	render() {
		const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		return (
			<div>
				<body>
				
				<TopNav/>
				<SideBar/>
				
				<div className="main-container">
					
					
					<div className="spotify-playlists">
						<h2>Spotify Playlists</h2>
						
						<div className="list">
							
							{items.map(item => (
								<div className="item">
									<img
										src="https://images-ext-2.discordapp.net/external/vngWidSdY-_H45PNJFWSKbcC7X5nah_4jyRH2rLZLBY/https/i.pinimg.com/originals/d6/eb/47/d6eb47154e92162fd665442c390a59fd.jpg"/>
									<div className="play">
										<span className="fa fa-play"></span>
									</div>
									<h4>Today's Top Hits</h4>
									<p>Rema & Selena Gomez are on top of the...</p>
								</div>
							))}
						
						
						</div>
					</div>
					
					<div className="spotify-playlists">
						<h2>Focus</h2>
						<div className="list">
							
							{items.map(item => (
								<div className="item">
									<img
										src="https://images-ext-2.discordapp.net/external/vngWidSdY-_H45PNJFWSKbcC7X5nah_4jyRH2rLZLBY/https/i.pinimg.com/originals/d6/eb/47/d6eb47154e92162fd665442c390a59fd.jpg"/>
									<div className="play">
										<span className="fa fa-play"></span>
									</div>
									<h4>Peaceful Piano</h4>
									<p>Relax and indulge with beautiful piano pieces</p>
								</div>
							))}
						
						
						</div>
					</div>
					
					<div className="spotify-playlists">
						<h2>Mood</h2>
						<div className="list">
							
							{items.map(item => (
								<div className="item">
									<img
										src="https://images-ext-2.discordapp.net/external/vngWidSdY-_H45PNJFWSKbcC7X5nah_4jyRH2rLZLBY/https/i.pinimg.com/originals/d6/eb/47/d6eb47154e92162fd665442c390a59fd.jpg"/>
									<div className="play">
										<span className="fa fa-play"></span>
									</div>
									<h4>Feelin' Good</h4>
									<p>Feel good with this positively timeless...</p>
								</div>
							))}
						
						
						</div>
						
						<hr/>
					</div>
				
				</div>
				
				<script
					src="https://kit.fontawesome.com/23cecef777.js"
					crossOrigin="anonymous"/>
				</body>
			</div>
		)
	}
}

export default Home
