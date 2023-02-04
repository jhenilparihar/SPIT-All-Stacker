import { useState } from "react";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Web3 from "web3";
import OTT from "./abis/OTT.json";
import ContractNotDeployed from "./components/ContractNotDeployed/ContractNotDeployed";
import ConnectToMetamask from "./components/ConnectMetamask/ConnectToMetamask";
import Loading from "./components/Loading/Loading";
// import NoPage from "./NoPage/NoPage";
import Create1 from "./components/create/Create1";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "",
      accountBalance: "",
      OTTContract: null,
      OTTCount: 0,
      contents: [],
      loading: true,
      metamaskConnected: false,
      contractDetected: false,
      totalContentsMinted: 0,
      totalTokensOwnedByAccount: 0,
      imageIsUsed: false,
      imageHash: "",
      // lastMintTime: null,
      // currentProfile: "",
      // allUserProfile: {},
    };
  }

  componentWillMount = async () => {
    await this.loadWeb3();
    await this.loadBlockchainData();
  };

  loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      this.setState({ metamaskConnected: false });
    } else {
      this.setState({ metamaskConnected: true });
      this.setState({ loading: true });
      this.setState({ accountAddress: accounts[0] });
      let accountBalance = await web3.eth.getBalance(accounts[0]);
      accountBalance = web3.utils.fromWei(accountBalance, "Ether");
      this.setState({ accountBalance });
      this.setState({ loading: false });
      const networkId = await web3.eth.net.getId();
      const networkData = OTT.networks[networkId];
      if (networkData) {
        this.setState({ loading: true });
        const OTTContract = new web3.eth.Contract(OTT.abi, networkData.address);
        this.setState({ OTTContract });
        this.setState({ contractDetected: true });

        const ContentCount = await OTTContract.methods.ContentCounter().call();
        this.setState({ ContentCount: ContentCount });
        for (var i = 1; i <= ContentCount; i++) {
          const content = await OTTContract.methods.allContents(i).call();
          this.setState({
            contents: [...this.state.contents, content],
          });
        }
        let totalContentsMint = await OTTContract.methods
          .getNumberOfContentMinted()
          .call();

        let totalContentsMinted = parseInt(totalContentsMint);
        this.setState({ totalContentsMinted });
        this.setState({ loading: false });
      } else {
        this.setState({ contractDetected: false });
      }
    }
  };

  connectToMetamask = async () => {
    await window.ethereum.enable();
    this.setState({ metamaskConnected: true });
    window.location.reload();
  };

  render() {
    return (
      <>
        {!this.state.metamaskConnected ? (
          <ConnectToMetamask connectToMetamask={this.connectToMetamask} />
        ) : !this.state.contractDetected ? (
          <ContractNotDeployed />
        ) : this.state.loading ? (
          <Loading />
        ) : (
          <>
            <Create1 />
            {/* <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <h1>Navbar</h1>
                  }
                >
                  <Route index element={<Create1 />} />
                  <Route path="*" element={<NoPage />} />
                </Route>
              </Routes>
            </BrowserRouter> */}
          </>
        )}
      </>
    );
  }
}

export default App;
