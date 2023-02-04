import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './TopNav.css'
class TopNav extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}
	render() {
		return (
			<div>
				<div className="topbar">
					<div className="prev-next-buttons">
						<button type="button" className="fa fas fa-chevron-left"></button>
						<button type="button" className="fa fas fa-chevron-right"></button>
					</div>

					<div className="navbar">
						<ul>
							
							<li>
								<a href="/create">Create</a>
							</li>
							
							<li className="divider">|</li>
							{/* <li>
								<a href="#">Sign Up</a>
							</li> */}
						</ul>
						<Link to={"/profile"}>
							{this.props.currentProfile !== undefined ? (<div class="prof1-button" >
								<div class="prof1-img">
									{this.props.currentProfile.imageHash !== undefined ? (
										<img src={this.props.currentProfile.imageHash} alt="react logo" style={{ width: '100%', }} />
									) : <>
										<em>no des</em>
									</>}

								</div>
								{this.props.currentProfile.name !== undefined ? (
									<span class="uname">{this.props.currentProfile.name}</span>
								) : <>
									<em>no des</em>
								</>}
							</div>) : null}

						</Link>
					</div>
				</div>
			</div>
		)
	}
}

export default TopNav
