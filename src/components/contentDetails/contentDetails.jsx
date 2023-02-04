import React from "react";
// import NFTDetails from "./NFT-Details";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { useParams } from "react-router-dom";
import ContentDetailPage from "./contentDetailPage";

const ContentDetails = ({ AllContent, accountAddress, buySubscription }) => {
  let { id } = useParams();
  console.log(id);

  let tokenId = parseInt(id, 10) - 1;
  let content = AllContent[tokenId];
  let stringAddress = content.subcribedUser;
  let accessAddress = stringAddress.split(", ");

  accessAddress.includes(accountAddress);

  return (
    <>
      {accessAddress.includes(accountAddress) ? (
        <VideoPlayer
        content={content}
        />
      ) : (
        <ContentDetailPage
          content={content}
          accountAddress={accountAddress}
          buySubscription={buySubscription}
        />
      )}
    </>
  );
};

export default ContentDetails;
