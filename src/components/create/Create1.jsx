import React, { Component } from "react";
import { useState } from 'react'
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'
import "./style.css";


const projectId = "2LEiWo06lqrPLBn4x5fxBHwMDgg"
const projectSecret = "c567bca7714ae367126c8b266fe86cab"
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const src="https://infura-ipfs.io/ipfs/QmaxfZNigeYpkQXkGdErsHkmNDSG4YeHyTojvsCpYgVwgH";

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
      authorization: auth,
  },
})

class Create1 extends Component{
    constructor(props) {
        super(props);
        this.state = {
          NFTName: "",
          NFTPrice: "",
          fileUrl: "",
          trailerUrl: "",
          description: "",
          imageIsUpload: false,
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
  ontChange = async (e) => {
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
                <h1>Create New Item</h1>
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
                    <img class="img-uploaded" src={this.state.fileUrl} alt=""/>
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
                    Thumnail{" "}
                    <span class="highlight">*</span>
                  </label>
                  <div id="b2" class="nft-image1">
                    {/* <img class="img-uploaded1" src={this.state.fileUrl} alt=""/> */}
                    <input
                      class="img-fileInput1"
                      type="file"
                      onChange={this.ontChange}
                    />
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
                {!this.state.imageIsUpload ? (
                  <button
                    type="submit"
                    class="create-btn create-btn-disabled"
                    disabled
                  >
                    Create NFT
                  </button>
                ) : (
                  <button type="submit" class="create-btn">
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