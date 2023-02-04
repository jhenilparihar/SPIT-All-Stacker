import React, { Component } from "react";
import { Link } from "react-router-dom";

import eth from "./assets/eth.svg";
import filter from "./assets/filter.svg";
import open from "./assets/open.svg";
import "./assets/explore.css";
import Loading from "../Loading/Loading";

class Marketplace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      allNFT: [],
      minPrice: 0,
      maxPrice: 0,
    };
  }

  componentDidMount() {
     this.setState({allNFT: this.props.AllContents})
  }
  
  render() {
    console.log(this.state.allNFT);
    return (
      <>
        <div class="outer-container">
          <div className="main-explore-container">
            <div className="row nft-card-row">
              <div className="container">
                <div class="row nft-container">
                  {this.state.allNFT.length !== 0 ? (
                    <>
                      {this.state.allNFT.map((NFT) => {
                        return (
                          <div
                            key={parseInt(NFT.contentId)}
                            class="col-4 col-lg-4 col-md-6 col-sm-1 align-items-center nft_card"
                          >
                            <Link
                              to={"/content/details/" + parseInt(NFT.contentId)}
                            >
                              <div className="details-div">
                                <div class="inner-div">
                                  {!this.state.loading ? (
                        
                                    <iframe src={NFT.contentThumbnailURI} frameborder="0"></iframe>
                                  ) : (
                                    <Loading />
                                  )}
                                </div>
                                <div class="row nft-details">
                                  <div class="col nft-name-explore">
                                    <p class="nft-owner-name-explore">
                                      {NFT.contentName}
                                    </p>
                                  </div>
                                  <div class="col nft-price-explore">
                                    <p class="n">Price</p>
                                    <p>
                                      <img src={eth} alt="" class="ether-img" />{" "}
                                      {window.web3.utils.fromWei(
                                        NFT.price.toString()
                                      )}{" "}
                                    </p>
                                  </div>
                                </div>
                                <div class="row buy-details"></div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1>HI</h1>
      </>
    );
  }
}

export default Marketplace;
