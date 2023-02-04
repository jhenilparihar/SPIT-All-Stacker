// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;
pragma abicoder v2;

// import ERC721 iterface
import "./ERC721.sol";

// NFT smart contract inherits ERC721 interface
contract OTT is ERC721 {
    // this contract's token collection name
    string public collectionName;

    // this contract's token symbol
    string public collectionNameSymbol;

    // total number of NFT minted
    uint256 public ContentCounter;

    // total number of User Created
    uint256 public UserCounter;

    // define NFT struct
    struct Content {
        uint256 contentId;
        string contentName;
        string contentType;
        string contentDesc;
        string subcribedUser;
        string contentThumbnailURI;
        string contentURI;
        address payable currentOwner;
        uint256 price;
        uint256 numberOfViewer;
        // string mintTime;
        // bool forSale;
    }

    struct UserProfile {
        string name;
        address user;
        string email;
        Content[] contentCreated;
        Content[] contenAccess;
        // string timeOfRegistry;
    }

    // map user addresses to their profile
    mapping(address => UserProfile) public allProfiles;
    mapping(uint256 => address) public allAddress;

    // check whether profile isset or not
    mapping(address => bool) public isProfileSet;

    // map NFT's token id to NFT
    mapping(uint256 => Content) public allContents;
    mapping(string => bool) public tokenContentExists;

    // initialize contract while deployment with contract's collection name and token
    constructor() ERC721("Content Collection", "OTT") {
        collectionName = name();
        collectionNameSymbol = symbol();
    }

    // mint a new Content
    function createContent(
        string memory _name,
        string memory _contentType,
        string memory _contentDesc,
        string memory _contentThumbnailURI,
        string memory _contentURI,
        string memory _tokenURI,
        uint256 _price
    ) external {
        ContentCounter++;

        require(!tokenContentExists[_contentURI]);

        // mint the token
        _mint(msg.sender, ContentCounter);

        _setTokenURI(ContentCounter, _contentURI);

        tokenContentExists[_contentURI] = true;

        // create a new Content (struct) and pass in new values
        Content memory newContent = Content(
            ContentCounter,
            _name,
            _contentType,
            _contentDesc,
            "",
            _contentThumbnailURI,
            _contentURI,
            msg.sender,
            _price,
            0
            // false
        );

        // add the token id and it's content to allContent mapping
        allContents[ContentCounter] = newContent;
    }

    // get owner of the token
    function getTokenOwner(uint256 _tokenId) public view returns (address) {
        address _to = ownerOf(_tokenId);
        return _to;
    }

    // get metadata of the token
    function getTokenMetaData(uint256 _tokenId)
        public
        view
        returns (string memory)
    {
        string memory tm = tokenURI(_tokenId);
        return tm;
    }

    // get total number of tokens minted so far
    function getNumberOfContentMinted() public view returns (uint256) {
        uint256 total = totalSupply();
        return total;
    }

    // get total number of tokens owned by an address
    // function getTotalNumberOfTokensOwnedByAnAddress(address _owner) public view returns(uint256) {
    //   uint256 totalNumberOfTokensOwned = balanceOf(_owner);
    //   return totalNumberOfTokensOwned;
    // }

    // check if the token already exists
    // function getTokenExists(uint256 _tokenId) public view returns(bool) {
    //   bool tokenExists = _exists(_tokenId);
    //   return tokenExists;
    // }

// -------------------

    // // by a token by passing in the token's id
    // function buyToken(uint256 _tokenId) public payable {
    //     // check if the function caller is not an zero account address
    //     require(msg.sender != address(0));

    //     // check if the token id of the token being bought exists or not
    //     require(_exists(_tokenId));

    //     // get the token's owner
    //     address owner = ownerOf(_tokenId);

    //     // token's owner should not be an zero address account
    //     require(owner != address(0));

    //     // the one who wants to buy the token should not be the token's owner
    //     require(owner != msg.sender);

    //     // get that token from all NFT mapping and create a memory of it defined as (struct => NFT)
    //     NFT memory nft = allNFTs[_tokenId];

    //     // price sent in to buy should be equal to or more than the token's price
    //     require(msg.value >= nft.price);

    //     // token should be for sale
    //     require(nft.forSale);

    //     // transfer the token from owner to the caller of the function (buyer)
    //     _transfer(owner, msg.sender, _tokenId);

    //     // get owner of the token
    //     address payable sendTo = nft.currentOwner;

    //     // send token's worth of ethers to the owner
    //     sendTo.transfer(msg.value);

    //     // update the token's previous owner
    //     nft.previousOwner = nft.currentOwner;

    //     // update the token's current owner
    //     nft.currentOwner = msg.sender;

    //     // update the how many times this token was transfered
    //     nft.numberOfTransfers += 1;

    //     // toggle the forSale parameter of token
    //     nft.forSale = false;

    //     // set and update that token in the mapping
    //     allNFTs[_tokenId] = nft;
    // }

    // function changeTokenPrice(uint256 _tokenId, uint256 _newPrice) public {
    //     // require caller of the function is not an empty address
    //     require(msg.sender != address(0));

    //     // require that token should exist
    //     require(_exists(_tokenId));

    //     // get the token's owner
    //     address owner = ownerOf(_tokenId);

    //     // check that token's owner should be equal to the caller of the function
    //     require(owner == msg.sender);

    //     // get that token from allNFT mapping and create a memory of it defined as (struct => NFT)
    //     NFT memory nft = allNFTs[_tokenId];

    //     // update token's price with new price
    //     nft.price = _newPrice;

    //     // set and update that token in the mapping
    //     allNFTs[_tokenId] = nft;
    // }

    // // switch between set for sale and set not for sale
    // function toggleForSale(uint256 _tokenId) public {
    //     // require caller of the function is not an empty address
    //     require(msg.sender != address(0));

    //     // require that token should exist
    //     require(_exists(_tokenId));

    //     // get the token's owner
    //     address owner = ownerOf(_tokenId);

    //     // check that token's owner should be equal to the caller of the function
    //     require(owner == msg.sender);

    //     // get that token from all NFT mapping and create a memory of it defined as (struct => NFT)
    //     NFT memory nft = allNFTs[_tokenId];

    //     // if token's forSale is false make it true and vice versa
    //     if (nft.forSale) {
    //         nft.forSale = false;
    //     } else {
    //         nft.forSale = true;
    //     }

    //     // set and update that token in the mapping
    //     allNFTs[_tokenId] = nft;
    // }

    // function addUserProfile(
    //     string memory _bannerHash,
    //     string memory _imageHash,
    //     string memory _name,
    //     string memory _bio,
    //     address _user,
    //     string memory _email,
    //     string memory _timestamp
    // ) external {
    //     // require caller of the function is not an empty address
    //     require(msg.sender != address(0));

    //     UserCounter++;

    //     UserProfile memory userprofile = allProfiles[_user];

    //     userprofile.bannerHash = _bannerHash;
    //     userprofile.email = _email;
    //     userprofile.imageHash = _imageHash;
    //     userprofile.name = _name;
    //     userprofile.description = _bio;
    //     userprofile.user = _user;

    //     // add the user's address and it's profile to all allProfiles mapping
    //     if (!isProfileSet[_user]) {
    //         userprofile.timeOfRegistry = _timestamp;
    //         allAddress[UserCounter] = _user;
    //     }

    //     allProfiles[_user] = userprofile;
    //     isProfileSet[_user] = true;
    // }
}
