import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./assets/style.css";
import eth from "./assets/eth.svg";
import wallet from "./assets/wallet.png";
import share from "./assets/share.png";
import content from "./assets/content.png";
import { Player } from "video-react";

class ContentDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNFTPrice: "",
    };
  }

  //   callChangeTokenPriceFromApp = (tokenId, newPrice) => {
  //     this.props.changeTokenPrice(tokenId, newPrice);
  //   };
  render() {
    return (
      <>
        <div class="details-main">
          <div className="row">
            <div class="detail-page__nft-image_section">
              <div className="detail-page__nft-image">
                <section class="home">
                  <video
                    class="video-slide active"
                    id="yes"
                    src={this.props.content.contentThumbnailURI}
                    type="video/mp4"
                    autoPlay
                    muted
                    loop
                  ></video>
                  <div class="content active">
                    <h1>
                      {this.props.content.contentName}
                      <br />
                    </h1>
                    <p>{this.props.content.contentDesc} </p>
                  </div>
                </section>
              </div>
              {/* <div className="row price_row detail_section">
                <div className="row created_on div_title">
                  <img class="description_image" src={content} alt="" />
                  Description
                </div>
                <div className="row price_div">
                  <div className="row div_content_text description_content">
                    {this.props.content !== undefined ? (
                      <>
                        {this.props.content.contentDesc.length !== 0 ? (
                          this.props.content.contentDesc
                        ) : (
                          <em>No Description</em>
                        )}
                      </>
                    ) : (
                      <em>No Description</em>
                    )}
                  </div>
                </div>
              </div> */}
            </div>
            <div class="col col-sm-12 nft-item-details">
              <div className="row">
                <div className="col-10 creator_details">
                  {/* <Link to={"/profile/" + this.props.content.currentOwner}> */}
                  {/* <p class="creator-name" href="">
                    {this.props.content.currentOwner}
                  </p> */}
                  {/* </Link> */}
                </div>
                {/* <div className="col share_div_">
                  <div className="row nft-details-share">
                    <img src={share} height="25px" alt="" />
                  </div>
                </div> */}
                <h1 className="nft_name">
                  {this.props.content.contentName} #
                  {this.props.content.contentType}
                </h1>
                <div className="row owner_name">
                  <span>
                    Owned by{" "}
                    {/* <Link to={"/profile/" + this.props.content.currentOwner}> */}
                    {this.props.content.currentOwner}
                    {/* </Link> */}
                  </span>
                </div>
                <div className="row price_row">
                  <div className="created_on">
                    <span className="row eth_price">Price : </span>
                    <div className="assets-price-detail">
                      <img src={eth} class="eth_icon" alt=""></img>
                      <span class="eth_price">
                        {window.web3.utils.fromWei(
                          this.props.content.price.toString(),
                          "Ether"
                        )}{" "}
                      </span>
                    </div>
                  </div>
                  <div className="row price_div">
                    <div className="row">
                      {this.props.accountAddress !==
                      this.props.content.currentOwner ? (
                        <button
                          class="buy_now-btn"
                          value={this.props.content.price}
                          onClick={(e) =>
                            this.props.buySubscription(
                              this.props.content,
                              parseInt(this.props.content.contentId),
                              e.target.value,
                              this.props.accountAddress
                            )
                          }
                        >
                          <img class="wallet_icon" src={wallet} alt=""></img>
                          Subscribe now
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* <div className="row price_row">
                  <div className="row created_on">Token Details</div>
                  <div className="row price_div">
                    <div className="row div_content_text">
                      <div className="col-6">Number Of Transfers</div>
                      <div className="col-3">
                        {this.props.NFT.numberOfTransfers.toNumber()}
                      </div>
                    </div>
                    <div className="row div_content_text">
                      <div className="col-6">Previous Owner</div>
                      <div className="col-3">
                        <Link to={"/profile/" + this.props.NFT.previousOwner}>
                          {this.props.NFT.previousOwner.substr(0, 5) +
                            "..." +
                            this.props.NFT.previousOwner.slice(
                              this.props.NFT.previousOwner.length - 5
                            )}
                        </Link>
                      </div>
                    </div>
                    <div className="row div_content_text">
                      <div className="col-6">Owned By</div>
                      <div className="col-3">
                        <Link to={"/profile/" + this.props.NFT.currentOwner}>
                          {this.props.NFT.currentOwner.substr(0, 5) +
                            "..." +
                            this.props.NFT.currentOwner.slice(
                              this.props.NFT.currentOwner.length - 5
                            )}
                        </Link>
                      </div>
                    </div>

                    <div className="row div_content_text">
                      <div className="col-6">Minted By</div>
                      <div className="col-3">
                        <Link to={"/profile/" + this.props.NFT.mintedBy}>
                          {this.props.NFT.mintedBy.substr(0, 5) +
                            "..." +
                            this.props.NFT.mintedBy.slice(
                              this.props.NFT.mintedBy.length - 5
                            )}
                        </Link>
                      </div>
                    </div>

                    <div className="row div_content_text">
                      <div className="col-6">Token URI</div>
                      <div className="col-3">
                        <a href={this.props.NFT.tokenURI}>
                          {this.props.NFT.tokenURI.substr(0, 25) +
                            "..." +
                            this.props.NFT.tokenURI.slice(
                              this.props.NFT.tokenURI.length - 5
                            )}
                        </a>
                      </div>
                    </div>
                    <div className="row div_content_text">
                      <div className="col-6">MintTime</div>
                      <div className="col-4">
                        {this.props.NFT.mintTime}
                      </div>
                    </div>

                    <div className="row "></div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default ContentDetailPage;
