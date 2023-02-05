import React, { Component } from "react";
import "./home.css";
import SideBar from "../SideBar/SideBar";
import TopNav from "../TopNav/TopNav";
import eth from "./eth.svg";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "",
      data:[],
    };
  }

componentDidMount=async() => {
	await fetch("https://spithackathon.pythonanywhere.com/login/ratingreommendation", {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	})
		.then(response => response.json())
		.then(data => {
			console.log(data);
      this.setState({data: data})
		})
		.catch(error => console.error(error));
}
  render() {
    const items = [1, 2, 3, 4, 5];

    console.log(this.state.data)
    return (
      <div>
        <body>
          <div className="main-container">
            <div className="spotify-playlists">
              <h2>All Contents</h2>
              {this.props.AllContents.length > 0 ? (
                <div className="list">
                  {this.props.AllContents.map((item) => (
                    <Link to={"/content/details/" + parseInt(item.contentId)}>
                      <div className="item">
                        <img class="banner-image" src={item.contentImage} />

                        <h4>{item.contentName}</h4>
                        <p>{item.contentType}</p>
                        <p class="item-footer">
                          <img class="eth-svg" src={eth} alt="" />{" "}
                          <span>
                            {window.web3.utils.fromWei(item.price.toString())}{" "}
                            
                          </span>
                        
                        </p>
                        <p>
                          
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>	
              ) : null}
            </div>

            <div className="spotify-playlists">
              <h2>Focus</h2>
              <div className="list">
              {this.state.data.length > 0 ? (
                <div className="list">
                  {this.state.data.map((item) => (
                    <Link to={"/content/details/" + parseInt(parseInt(item.id)-5)}>
                      <div className="item">
                        <img class="banner-image" src={item.contentImage} />

                        <h4>{item.contentName}</h4>
                        <p>{item.contentType}</p>
                        <p class="item-footer">
                          <img class="eth-svg" src={eth} alt="" />{" "}
                          <span>
                            {window.web3.utils.fromWei(item.price.toString())}{" "}
                            
                          </span>
                          <span class="rating">
                          {" "}Rating : 9.1
                          </span>
                        </p>
                        <p>
                          
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>	
              ) : null}
              </div>
            </div>

            <div className="spotify-playlists">
              <h2>Mood</h2>
              <div className="list">
                {items.map((item) => (
                  <div className="item">
                    <img
                      class="banner-image"
                      src="https://images-ext-2.discordapp.net/external/vngWidSdY-_H45PNJFWSKbcC7X5nah_4jyRH2rLZLBY/https/i.pinimg.com/originals/d6/eb/47/d6eb47154e92162fd665442c390a59fd.jpg"
                    />
                    <div className="play">
                      <span className="fa fa-play"></span>
                    </div>
                    <h4>Feelin' Good</h4>
                    <p>Feel good with this positively timeless...</p>
                  </div>
                ))}
              </div>

              <hr />
            </div>
          </div>

          <script
            src="https://kit.fontawesome.com/23cecef777.js"
            crossOrigin="anonymous"
          />
        </body>
      </div>
    );
  }
}

export default Home;
