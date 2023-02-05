import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import './SideBar.css'

class SideBar extends Component {
	render() {
		return (
			<div>
				<div className="sidebar">
					<div className="logo">
					<Link to="/">
						<div >
							<h1 class="stlogo"><span class="stlogo1">Stream</span><span class="stlogo2">.it</span></h1>
						</div>
						</Link>
					</div>
					
					<div className="navigation">
						<ul>
							<li>
								<Link to="/">
									<span className="fa fa-home"></span>
									<span>Home</span>
								</Link>
							</li>
							
							<li>
							<Link to="/search">
									<span className="fa fa-search"></span>
									<span>Search</span>
								</Link>
							</li>
							
							<li>
							<Link to="/create">
									<span className="fa fas fa-book"></span>
									<span>Upload</span>
								</Link>
							</li>

							<li>
							<Link to="/library">
									<span className="fa fas fa-book"></span>
									<span>Your Library</span>
								</Link>
							</li>

							<li>
								<a href="#">
									<span className="fa fas fa-book"></span>
									<span>Group Streaming</span>
								</a>
							</li>

							<li>
							<Link to="/profile">
									<span className="fa fas fa-book"></span>
									<span>Profile</span>
								</Link>
							</li>

							<li>
								<a href="#">
									<span className="fa fas fa-book"></span>
									<span>History</span>
								</a>
							</li>

							
						</ul>
					</div>
					
					
					<div className="policies">
						<ul>
							<li>
								<a href="#">Cookies</a>{" "}{" "}
								{" "}<a href="#">{" "}Privacy</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default SideBar
