import React, { Component } from "react";
import { useState } from 'react'
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'


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
      console.log("IPFS URI: ", url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  render() {
  return (
    <div className="App">
      <h1>IPFS Example</h1>
      <input
        type="file"
        onChange={this.onChange}
      />
      {
        this.state.fileUrl && (
          <div>
            
            <img src={this.state.fileUrl} width="600px" />
            <a href={this.state.fileUrl} target="_blank">{this.state.fileUrl}</a>
          </div>
          
        )
      }
      {
        this.state.fileUrl && (
          <div>
             <iframe
      width="560"
      height="315"
      src={src}
      title="Youtube Player"
      frameborder="0"
      allowFullScreen
    />
          </div>
          
        )
      }
     
    </div>
    
  );
}
}

export default Create1;