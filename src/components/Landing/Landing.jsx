import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

const Landing = ({}) => {
  return (
    <div class="main1">
      <div class="head-container">
        <div class="fading-div">
          <div class="text-div">
            <div class="text-area">
            <h1 class="stream-logo"><span id="stream-logo">Stream</span><span class="itt">.it</span></h1>
              <h1>Stream Your World Your Way</h1>
              <span>
                OpenSea is the world's first and <br /> largest NFT marketplace
              </span>
              <div class="btn-div">
                <Link to="/dashboard">
                  <button type="submit" id="explore-btn" >
                    Explore 
                  </button>
                </Link>
                {/* <Link to="/">
                  <button type="submit" id="create-btn">
                    Create
                  </button>
                </Link> */}
              </div>
            </div>
          </div>
          <div class="banner-div">
            <div class="nft-banner">
              <div class="landing-img"></div>
              <div class="landing-img-details">
                <div class="landing-prof-img"></div>
                <div class="landing-prof-img-det">
                  <p class="name">Boared Ape</p>
                  <p class="user-name">Bored Ape Yatch Club</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
