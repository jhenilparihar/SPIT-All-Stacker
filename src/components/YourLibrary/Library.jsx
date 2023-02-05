import React, { Component } from "react";
import eth from "./eth.svg";
import { Link } from "react-router-dom";
import "../Landing/home.css";

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "",
      ownedContent: [],
      createdContent: [],
    };
  }

  componentDidMount = () => {
    this.getSubscribedVideos();
  };

  getSubscribedVideos = () => {
    if (this.props.AllContents.length > 0) {
      this.props.AllContents.map((item) => {
        let stringAddress = item.subcribedUser;
        let accessAddress = stringAddress.split(", ");
        if (item.currentOwner == this.props.accountAddress) {
          this.setState({createdContent: [...this.state.createdContent,item] });
        } else if (accessAddress.includes(this.props.accountAddress)) {
          
            this.setState({ownedContent: [...this.state.ownedContent,item] });
        }
      });
    }
  };


  render() {
    console.log(this.state.createdContent);
    console.log(this.state.ownedContent);
    const items = [1, 2, 3, 4, 5];
    console.log("Hi");
    return (
      <div>
        <body>
          <div className="main-container">
            <div className="spotify-playlists">
              <h2>Your Library</h2>
              {this.state.ownedContent.length > 0 ? (
                <div className="list">
                  {this.state.ownedContent.map((item) => (
                    <Link to={"/content/details/" + parseInt(item.contentId)}>
                      <div className="item">
                        <img class="banner-image" src={item.contentImage} />

                        <h4>{item.contentName}</h4>
                        <p>{item.contentType}</p>
                        <p class="item-footer">
                          <img class="eth-svg" src={eth} alt="" />{" "}
                          <span>
                            {/* {window.web3.utils.fromWei(item.price.toString())}{" "} */}
                          </span>
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="spotify-playlists">
              <h2>Your Uploads</h2>
              {this.state.createdContent.length > 0 ? (
              <div className="list">
                {this.state.createdContent.map((item) => (
                    <Link to={"/content/details/" + parseInt(item.contentId)}>
                      <div className="item">
                        <img class="banner-image" src={item.contentImage} />

                        <h4>{item.contentName}</h4>
                        <p>{item.contentType}</p>
                        <p class="item-footer">
                          <img class="eth-svg" src={eth} alt="" />{" "}
                          <span>
                            {/* {window.web3.utils.fromWei(item.price.toString())}{" "} */}
                          </span>
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
              ) : null}
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

export default Library;
