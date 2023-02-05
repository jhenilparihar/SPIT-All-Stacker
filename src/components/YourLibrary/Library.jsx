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
                            {window.web3.utils.fromWei(item.price.toString())}{" "}
                          </span>
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : <em>No Content</em>}
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
                            {window.web3.utils.fromWei(item.price.toString())}{" "}
                          </span>
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
              ) : <em>No Contents</em>}
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
