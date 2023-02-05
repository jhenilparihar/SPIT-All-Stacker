import React, { Component } from "react";
import { Link } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import TopNav from "../TopNav/TopNav";
import "./assets/Profile.css";
import setting from "./assets/setting.png";
import share from "./assets/share.png";
// import DisplayNFT from "./DisplayNFT";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        console.log("Hi")
        return (

            <>
            <div className="con">
                <div className="side">
                
                </div>
                {this.props.currentProfile !== undefined ? (<div class="main">
                    <div class="upper">
                        {this.props.currentProfile.bannerHash !== undefined ? (
                            <img src={this.props.currentProfile.bannerHash} alt="" />
                        ) : <>
                            <em>no des</em>
                        </>}
                        <input type="file" />
                    </div>
                    <div class="details">
                        <div class="details-inner">
                            <div class="prof-img">
                                {/* {this.props.currentProfile.imageHash !== undefined ? (
                                    <img src={this.props.currentProfile.imageHash} alt="" />
                                ) : <>
                                    <em>no des</em>
                                </>} */}
                                {/* <input type="file" /> */}
                            </div>
                            <div class="user-details">
                                {this.props.currentProfile.name !== undefined ? (

                                    <h1>{this.props.currentProfile.name}</h1>
                                ) : <>
                                    <em>no des</em>
                                </>}


                                <div class="address">
                                    {this.props.currentProfile.user !== undefined ? (

                                        this.props.currentProfile.user.substr(0, 5) +
                                        "..." +
                                        this.props.currentProfile.user.slice(this.props.currentProfile.user.length - 5)
                                    ) : <>
                                        <em>no des</em>
                                    </>}

                                </div>
                                {this.props.currentProfile.timeOfRegistry !== undefined ? (
                                    <p>{this.props.currentProfile.timeOfRegistry}</p>
                                ) : <>
                                    <em>no des</em>
                                </>}
                                {this.props.currentProfile.description !== undefined ? (
                                    <p>{this.props.currentProfile.description}</p>
                                ) : <>
                                    <em>no des</em>
                                </>}


                            </div>
                        </div>
                        <div class="share__Icon">
                            <img class="icons" src={share} alt="" />
                        </div>
                        <div class="settings__Icon">
                            <Link to="/setting">
                            <img class="icons" src={setting} alt="" />
                            </Link>
                        </div>
                    </div>
                    {/* <DisplayNFT AllNFT={AllNFT} profileAddress={currentProfile.user} /> */}
                </div>):(null)}
            
            </div>
                
            </>



        );
    }
}



// <h1>harsh{currentProfile.name}{currentProfile.user}</h1>


export default Profile;
