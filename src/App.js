import { useState } from "react";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

import React, { Component } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
// import "./components/bootstrap/css/bootstrap.css";
import "./App.css";
import Landing from "./components/Landing/Landing";
import Web3 from "web3";
import OTT from "./abis/OTT.json";
import ContractNotDeployed from "./components/ContractNotDeployed/ContractNotDeployed";
import ConnectToMetamask from "./components/ConnectMetamask/ConnectToMetamask";
import Loading from "./components/Loading/Loading";
import NoPage from "./components/NoPage/NoPage";
import Create1 from "./components/create/Create1";
import Marketplace from "./components/Explore/Marketplace";
import ContentDetails from "./components/contentDetails/contentDetails";
import SideBar from "./components/SideBar/SideBar";
import Profile from "./components/user/profile";
import Settings from "./components/user/Setting";
import Home from "./components/Landing/Home";
import Search from "./components/Search/Search";
import Library from "./components/YourLibrary/Library";

const projectId = "2LEiWo06lqrPLBn4x5fxBHwMDgg";
const projectSecret = "c567bca7714ae367126c8b266fe86cab";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

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
      contentIsUsed: false,
      imageHash: "",
      // lastMintTime: null,
      currentProfile: "",
      allUserProfile: {},
    };
  }

  componentWillMount = async () => {
    await this.loadWeb3();
    await this.loadBlockchainData();
    // await this.getContentSubscribedUser();
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

  getContentSubscribedUser = async () => {
    if (this.state.contents.length !== 0) {
      this.state.contents.map((nft) => {
        let stringAddress = nft.subcribedUser;
        let userAddressArray = stringAddress.split(", ");
        this.setState({
          contents: {
            ...nft,
            userAddressArray,
          },
        });
      });
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

        const isProfileSet = await this.state.OTTContract.methods
          .isProfileSet(this.state.accountAddress)
          .call();

        if (!isProfileSet) {
          var months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          var currentTime = new Date();
          // returns the month (from 0 to 11)
          var month = months[currentTime.getMonth()];

          // returns the day of the month (from 1 to 31)
          var day = currentTime.getDate();

          // returns the year (four digits)
          var year = currentTime.getFullYear();
          const overAllDate = month + " " + day + " " + year;
          console.log("See");
          await this.uploadProfile(
            "https://ipfs.infura.io/ipfs/QmeAcsFZfRd719RHMivPUitJpXzH54k8d3CXpmvmLZnF7A",
            "https://bafybeih5pgcobf6hpgf2pexmkhfsk55zr4dywrazgybk7u2fp6w4webkxu.ipfs.infura-ipfs.io/",
            "Unnamed",
            "No description",
            "abc@gmail.com",
            overAllDate
          );
        }

        const cp = await OTTContract.methods
          .allProfiles(this.state.accountAddress)
          .call();

        this.setState({ currentProfile: cp });

        const ProfileCounter = await OTTContract.methods.UserCounter().call();

        console.log(ProfileCounter);

        for (
          var profile_counter = 1;
          profile_counter <= ProfileCounter;
          profile_counter++
        ) {
          const address = await OTTContract.methods
            .allAddress(profile_counter)
            .call();
          const profile = await OTTContract.methods.allProfiles(address).call();

          this.state.allUserProfile[address] = profile;
        }

        console.log(this.state.allUserProfile);

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

  createContent = async (
    name,
    type,
    category,
    desc,
    tumbnailUrl,
    contentUrl,
    contentImage,
    tokenPrice
  ) => {
    this.setState({ loading: true });

    const contentIsUsed = await this.state.OTTContract.methods
      .tokenContentExists(contentUrl)
      .call();

    if (!contentIsUsed) {
      let previousTokenId;
      // previousTokenId = await this.state.OTT.methods
      //   .ContentCounter()
      //   .call();
      previousTokenId = this.state.totalContentsMinted;
      // const tokenId = previousTokenId + 1;
      // const tokenObject = {
      //   tokenName: "OTT Content",
      //   tokenSymbol: "OTT",
      //   tokenId: `${tokenId}`,
      //   name: name,
      //   type: type,
      //   imageUrl: contentUrl,
      //   description: desc,
      // };
      // const cid = await client.add(JSON.stringify(tokenObject));
      // let tokenURI = `https://ipfs.infura.io/ipfs/${cid.path}`;
      const price = window.web3.utils.toWei(tokenPrice.toString(), "ether");
      this.state.OTTContract.methods
        .createContent(
          name,
          type,
          category,
          desc,
          tumbnailUrl,
          contentImage,
          contentUrl,
          price,
          this.state.accountAddress
        )
        .send({ from: this.state.accountAddress })
        .on("confirmation", () => {
          localStorage.setItem(this.state.accountAddress, new Date().getTime());
          this.setState({ loading: false });
          window.location.reload();
        });
    } else {
      this.setState({ contentIsUsed: true });
      this.setState({ loading: false });
    }
  };

  buySubscription = async (content, tokenId, price, accountAddress) => {
    let address;
    if (content.subcribedUser.length > 0) {
      address = content.subcribedUser + ", " + this.state.accountAddress;
    } else {
      address = this.state.accountAddress;
    }

    this.setState({ loading: true });
    this.state.OTTContract.methods
      .buyToken(tokenId, address)
      .send({ from: this.state.accountAddress, value: price })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };

  // profile section
  uploadProfile = async (
    bannerHash,
    imageHash,
    name,
    description,
    email,
    date
  ) => {
    this.state.OTTContract.methods
      .addUserProfile(
        bannerHash,
        imageHash,
        name,
        description,
        this.state.accountAddress,
        email,
        date
      )
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        localStorage.setItem(this.state.accountAddress, new Date().getTime());
        this.setState({ loading: false });
        window.location.reload();
      });
  };

  getProfileDetails = async (address) => {
    const cp = await this.state.OTTContract.methods.allProfiles(address).call();

    return cp;
  };

  render() {
    console.log(this.state.contents);
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
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      {/* <TopNav /> */}
                      {/* <SideBar /> */}
                      <Outlet />
                    </>
                  }
                >
                  <Route
                    index
                    element={
                      <>
                       <Landing /> 
                      </>
                    }
                  />
                  <Route
                     path="/dashboard"
                    element={
                      <>
                        <SideBar />
                        <Home
                          accountAddress={this.state.accountAddress}
                          AllContents={this.state.contents}
                        />
                      </>
                    }
                  />

                  <Route
                    path="create"
                    element={
                      <>
                        <SideBar />
                        <Create1
                          createContent={this.createContent}
                          contentIsUsed={this.state.contentIsUsed}
                        />
                      </>
                    }
                  />

                  <Route
                    path="content/details/:id"
                    element={
                      <>
                        <SideBar />
                        <ContentDetails
                          accountAddress={this.state.accountAddress}
                          AllContent={this.state.contents}
                          buySubscription={this.buySubscription}
                        />
                      </>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <>
                        <SideBar />
                        <Profile currentProfile={this.state.currentProfile} />
                      </>
                    }
                  />
                  <Route
                    path="/setting"
                    element={
                      <Settings
                        uploadProfile={this.uploadProfile}
                        accountAddress={this.state.accountAddress}
                        currentProfile={this.state.currentProfile}
                      />
                    }
                  />
                  <Route
                    path="/search"
                    element={
                      <>
                        <SideBar />
                        <Search />
                      </>
                    }
                  />
                  <Route
                    path="/library"
                    element={
                      <>
                        <SideBar />
                        <Library
                          accountAddress={this.state.accountAddress}
                          AllContents={this.state.contents}
                        />
                      </>
                    }
                  />

                  <Route path="*" element={<NoPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </>
        )}
      </>
    );
  }
}

export default App;
