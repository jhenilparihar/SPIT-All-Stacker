import React, { Component } from "react";
import { useState } from 'react'
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'
import "./style.css";


const projectId = "2LEiWo06lqrPLBn4x5fxBHwMDgg"
const projectSecret = "c567bca7714ae367126c8b266fe86cab"
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const src = "https://infura-ipfs.io/ipfs/QmaxfZNigeYpkQXkGdErsHkmNDSG4YeHyTojvsCpYgVwgH";

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
})

class Create1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NFTName: "",
      NFTPrice: "",
      fileUrl: "",
      trailerUrl: "",
      thumbUrl: "",
      description: "",
      imageIsUpload: false,
      category: ""
    };
  }
  // const [fileUrl, updateFileUrl] = useState(``)
  onChange = async (e) => {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://infura-ipfs.io/ipfs/${added.path}`
      this.setState({ fileUrl: url })
      //   updateFileUrl(url)
      console.log("IPFS URI of trailer: ", url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }
  onthumbChange = async (e) => {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://infura-ipfs.io/ipfs/${added.path}`
      this.setState({ thumbUrl: url })
      //   updateFileUrl(url)
      console.log("IPFS URI of thumb:", url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }
  ontrailChange = async (e) => {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://infura-ipfs.io/ipfs/${added.path}`
      this.setState({ trailerUrl: url })
      //   updateFileUrl(url)
      console.log("IPFS URI of trailer: ", url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  DropDown = () => {
    const dropdowns = document.querySelectorAll(".dropdown1");

    dropdowns.forEach((dropdown) => {
      const select = dropdown.querySelector(".select1");
      const caret = dropdown.querySelector(".caret");
      const menu = dropdown.querySelector(".explore-menu");
      const options = dropdown.querySelectorAll(".explore-menu li");
      const selected = dropdown.querySelector(".selected");

      select.addEventListener("click", () => {
        select.classList.toggle("select-clicked");
        //Add the rotate styles to the caret element
        caret.classList.toggle("caret-rotate");
        //Add the open styles to the menu element
        menu.classList.toggle("menu-open");
      });

      options.forEach((option) => {
        //Add a click event to the option element
        option.addEventListener("click", () => {
          //Change selected inner text to clicked option inner text
          selected.innerText = option.innerText;
          //Add the clicked select styles to the select element

          //Add the open styles to the menu element
          select.classList.remove("select-clicked"); //Add the rotate styles to the caret element
          caret.classList.remove("caret-rotate");
          menu.classList.remove("menu-open"); //Remove active class from all option elements
          options.forEach((option) => {
            option.classList.remove("active");
          });
          option.classList.add("active");
        });
      });
    });
  };
  drop = (e) => {
    var element = document.getElementById("user-container");
    element.classList.toggle("mystyle");
  }
  sayHello = async (stat) => {
    await this.setState({ category: stat });
    console.log("cat", this.state.category);
    var element = document.getElementById("user-container");
    element.classList.toggle("mystyle");
  }
  callCreateFromApp = (e) => {
    e.preventDefault();

    this.props.createContent(
      this.state.NFTName,
      "Horror",
      this.state.category,
      this.state.description, 
      this.state.trailerUrl,
      this.state.fileUrl,
      this.state.thumbUrl,
      this.state.NFTPrice,
    );
  };

  render() {
    return (
      // <div className="App">
      //   <h1>IPFS Example</h1>
      //   <input
      //     type="file"
      //     onChange={this.onChange}
      //   />
      //   {
      //     this.state.fileUrl && (
      //       <div>

      //         <img src={this.state.fileUrl} width="600px" />
      //         <a href={this.state.fileUrl} target="_blank">{this.state.fileUrl}</a>
      //       </div>

      //     )
      //   }
      //   {
      //     this.state.fileUrl && (
      //       <div>
      //          <iframe
      //   width="560"
      //   height="315"
      //   src={src}
      //   title="Youtube Player"
      //   frameborder="0"
      //   allowFullScreen
      // />
      //       </div>

      //     )
      //   }

      // </div>

      <div>
        <div class="main-u">
          <div class="inner-u">
            <div class="form-c">
              <form onSubmit={this.callMintMyNFTFromApp}>
                <h1>Create <span id="unique">New</span>  <span id="">Item</span></h1>
                <p class="sub-head">
                  <span class="highlight">* </span>Required fields{" "}
                </p>
                <div class="banner-image">
                  {/*  */}
                  <label for="b2" class="head">
                    {" "}
                    Full Video{" "}
                    <span class="highlight">*</span>
                  </label>
                  <p class="sub-head">
                    File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3,
                    WAV, OGG, GLB, GLTF. Max size: 100 MB
                  </p>
                  <div id="b2" class="nft-image">
                    <img class="img-uploaded" src={this.state.fileUrl} alt="" />
                    <input
                      class="img-fileInput"
                      type="file"
                      onChange={this.onChange}
                    />
                  </div>
                  {/*  */}

                </div>
                <div class="banner-image1">
                  <label for="b2" class="head1">
                    {" "}
                    Trailer{" "}
                    <span class="highlight">*</span>
                  </label>
                  <div id="b2" class="nft-image1">
                    {/* <img class="img-uploaded1" src={this.state.fileUrl} alt=""/> */}
                    <div class="variants">
                      <div class='file file--upload'>
                        <label for='input-file'>
                          Upload 
                        </label>
                        <input id='input-file' type='file' onChange={this.ontrailChange}/>
                      </div>
                    </div>
                    {/* <input
                      class="img-fileInput1"
                      type="file"
                      onChange={this.ontrailChange}
                    /> */}
                  </div>
                </div>
                <div class="banner-image1">
                  <label for="b2" class="head1">
                    {" "}
                    Thumnail{" "}
                    <span class="highlight">*</span>
                  </label>
                  <div id="b2" class="nft-image1">
                    {/* <img class="img-uploaded1" src={this.state.fileUrl} alt=""/> */}
                    <div class="variants">
                      <div class='file file--uploading'>
                        <label for='input-file'>
                          Upload 
                        </label>
                        <input id='input-file' type='file' onChange={this.onthumbChange}/>
                      </div>
                    </div>
                    {/* <input
                      class="img-fileInput1"
                      type="file"
                      onChange={this.ontChange}
                    /> */}
                  </div>
                </div>
                <label for="text-1542372332072" class="head">
                  Name <span class="highlight">*</span>
                </label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    name="text-1542372332012"
                    id="text-1542372332012"
                    required="required"
                    value={this.state.NFTName}
                    placeholder="Item name"
                    onChange={(e) => this.setState({ NFTName: e.target.value })}
                  ></input>
                  {/* <label for="text-1542372332072"> Name</label> */}
                </div>
                <br />
                <label for="text-1542372332072" class="head">
                  Price <span class="highlight">*</span>
                </label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="number"
                    name="text-1542372332032"
                    id="text-1542372332032"
                    required="required"
                    value={this.state.NFTPrice}
                    placeholder="Price"
                    onChange={(e) =>
                      this.setState({ NFTPrice: e.target.value })
                    }
                  ></input>
                  {/* <label for="text-1542372332072"> Name</label> */}
                </div>
                <div class="col-lg-3 col-md-3 col-sm-1 ">
                  <div class="dropdown1">
                    {/* <input class="dark-light" type="checkbox" id="dark-light" name="dark-light"/> */}
                    <label for="dark-light"></label>

                    <div class="light-back"></div>

                    {/* <a href="https://front.codes/" class="logo" target="_blank">
		<img src="https://assets.codepen.io/1462889/fcy.png" alt="">
	</a> */}

                    <div class="user">
                    <label for="text-1542372332072" class="head">
                  Category <span class="highlight">*</span>
                </label>
                      <div class="user-trigger" onClick={this.drop}>
                        <div class="avatar"></div>
                        
                        <div class="detail">
                          <strong>Category</strong>
                          @typeof
                        </div>
                        <button class="btn btn-default squared"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
                        </svg></button>
                      </div>
                      <div class="user-container" id="user-container">
                        <a onClick={() => {
                          this.sayHello("Romance");
                        }}>
                          {/* <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt=""> */}
                          <strong>Romance</strong>@Rmantic
                        </a>
                        <a onClick={() => {
                          this.sayHello("Notional");
                        }}>
                          {/* <img src="https://cdn.freebiesupply.com/logos/large/2x/dribbble-icon-1-logo-png-transparent.png" alt=""> */}
                          <strong>Notional</strong>@Indian
                        </a>
                        <a onClick={() => {
                          this.sayHello("Action");
                        }}>
                          {/* <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt=""> */}
                          <strong>Action</strong>@Movie
                        </a>

                      </div>
                    </div>
                  </div>
                </div>
                <div class="des-group">
                  <label for="des" class="head">
                    Description
                  </label>
                  <p class="sub-head">
                    The description will be included on the item's detail page
                    underneath its image.
                  </p>
                  <textarea
                    id="des"
                    name="des"
                    rows="8"
                    cols="60"
                    placeholder="Share about your NFT."
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                  ></textarea>
                </div>
                <hr></hr>
                <br />
                {!(this.state.fileUrl.length > 0 && this.state.trailerUrl.length > 0) ? (
                  <button
                    type="submit"
                    class="create-btn create-btn-disabled"
                    disabled
                  >
                    Create NFT
                  </button>
                ) : (
                  <button type="submit" class="create-btn" onClick={this.callCreateFromApp}>
                    Create NFT
                  </button>
                )}

                {/* <div className="mt-4">
                  {this.props.nameIsUsed ? (
                    <div className="alert alert-danger alert-dissmissible">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                      >
                        <span>&times;</span>
                      </button>
                      <strong>This name is taken!</strong>
                    </div>
                  ) : this.props.imageIsUsed ? (
                    <div className="alert alert-danger alert-dissmissible">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                      >
                        <span>&times;</span>
                      </button>
                      <strong>This Image is taken!</strong>
                    </div>
                  ) : null}
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Create1;