require("dotenv").config();
const { ethers } = require("ethers");
const axios = require("axios");
const mongoose = require("mongoose");
const Tba = require('./models/tba.model');
const Community = require('./models/community.model');

// ERC6551 레지스트리 컨트랙트의 ABI (함수 인터페이스)
const erc6551RegistryABI = require('./abi/ERC6551Registry.json');
const accountCreatedABI = require('./abi/.json');

// ERC6551 레지스트리 컨트랙트 주소
const erc6551RegistryAddress = "0x02101dfB77FDE026414827Fdc604ddAF224F0921";

// Ethereum JSON-RPC 프로바이더 생성
const providerUrl = process.env.INFURA_URL;
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

// Ethereum 지갑 (개인 키)
const privateKey = process.env.PRIVATE_KEY;


// MongoDB 연결
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: process.env.MONGODB_USERNAME,
        pass: process.env.MONGODB_PASSWORD,
    })
    .then(() => console.log('MongoDB에 연결되었습니다.'))
    .catch((err) => console.error('MongoDB에 연결할 수 없습니다.', err));




// Ethereum 컨트랙트 및 이벤트 구독 
const erc6551RegistryContract = new ethers.Contract(
    erc6551RegistryAddress,
    erc6551RegistryABI,
    provider
);

// 원하는 NFT 컨트랙트 주소 배열 (미리 지정한 배열 -> 지금은 임시로 배포해놓은 nftContractAddress값이 들어가있지만 DB에서 받아와야함.)
// const nftContractAddresses = ["0xFe5FE303b9d0D03E72A8859ad77CA7c0b6353DF9"];

const eventFilter = erc6551RegistryContract.filters.AccountCreated();


// 이벤트 리스너에서 감지된 트랜잭션을 처리하는 부분
erc6551RegistryContract.on(eventFilter, async (account, implementation, chainId, tokenContract, tokenId, salt, event) => {
    // 토큰 컨트랙트가 Community 컬렉션에 있는 커뮤니티 주소들과 일치하는지 확인하기 위해 모든 커뮤니티 주소를 가져옴
    const communityAddresses = await Community.find({}, { address: 1 });

    // tokenContract가 communityAddresses 배열에 포함된 주소들과 일치하는지 확인하여 필터링
    const isMatchingContract = communityAddresses.some(community => community.address === tokenContract);

    // 만약 일치하는 커뮤니티 주소가 있을 때만 계정 정보 추가를 수행
    if (isMatchingContract) {
        console.log("ERC6551 레지스트리에서 새 트랜잭션 생성:", event);
  
        console.log("계정 주소:", account);
        console.log("구현 주소:", implementation);
        console.log("체인 ID:", chainId);
        console.log("토큰 컨트랙트 주소:", tokenContract);
        console.log("토큰 ID:", tokenId);
        console.log("솔트 값:", salt);
  
        // community_id 가져오기
        try {
            const community = await Community.findOne({ address: tokenContract });
            const communityId = community ? community.id : null;
  
            // owner 가져오기 (토큰 컨트랙트의 ownerOf 함수 호출 예시)  -> tokenContractInstance를 위한 ABI 필요 -> 어떻게 가져올지 생각해야할듯. 
            // const tokenContractInstance = new ethers.Contract(tokenContract, tokenContractABI, provider);
            // const owner = await tokenContractInstance.ownerOf(tokenId);
  
            // tokenURI 가져오기 (토큰 컨트랙트의 tokenURI 함수 호출 예시)
            // const tokenURI = await tokenContractInstance.tokenURI(tokenId);
  
            // ethBalance 가져오기 (account의 이더 잔액 조회)
            const balance = await provider.getBalance(account);
            const ethBalance = ethers.utils.formatEther(balance);
  
            // MongoDB에 계정 정보 추가
            await Tba.create({
                address: account,
                owner: '',
                level: '',
                tokenURI: '',
                ethBalance: ethBalance,
                createdAt: new Date(),
                updatedAt: new Date(),
                community_id: communityId,
            });
  
            console.log("계정 업데이트 완료");
        } catch (error) {
            console.error("DB 업데이트 오류:", error);
        }
    }
  
    console.log("트랜잭션 처리 완료");
});

