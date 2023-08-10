require("dotenv").config();
const { ethers } = require("ethers");
const mongoose = require("mongoose");
const Tba = require('./models/tba.model');
const Community = require('./models/community.model');

// ERC6551 레지스트리 컨트랙트의 ABI (함수 인터페이스)
const erc6551RegistryABI = require('./abi/ERC6551Registry.json');
const accountCreatedABI = require('./abi/Account.json');
const nftContractAbi = require('./abi/NftContract.json');

// ERC6551 레지스트리 컨트랙트 주소
const erc6551RegistryAddress = "0x02101dfB77FDE026414827Fdc604ddAF224F0921";

// Ethereum JSON-RPC 프로바이더 생성
const providerUrl = process.env.INFURA_URL;
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

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


const eventFilter = erc6551RegistryContract.filters.AccountCreated();


// 이벤트 리스너에서 감지된 트랜잭션을 처리하는 부분
erc6551RegistryContract.on(eventFilter, async (account, implementation, chainId, tokenContract, tokenId, salt, event) => {

    console.log("tba 생성 감지");

    // 토큰 컨트랙트가 Community 컬렉션에 있는 커뮤니티 주소들과 일치하는지 확인하기 위해 모든 커뮤니티 주소를 가져옴
    const communityAddresses = await Community.find({}, { address: 1 });

    // tokenContract가 communityAddresses 배열에 포함된 주소들과 일치하는지 확인하여 필터링
    const isMatchingContract = communityAddresses.some(community => community.address === tokenContract);

    // 만약 일치하는 커뮤니티 주소가 있을 때만 계정 정보 추가를 수행
    if (isMatchingContract) {
        console.log("ERC6551 레지스트리에서 새 트랜잭션 생성:", event);
        // community_id 가져오기
        try {
            const community = await Community.findOne({ address: tokenContract });
            const communityId = community ? community.id : null;

            const accountContract = new ethers.Contract(
                account,
                accountCreatedABI,
                provider
            );

            let owner = null;
            try {
                owner = await accountContract.owner();
            } catch (error) {
                console.log('Error occurred while getting owner');
            }

            // owner가 존재할 때만 계정 정보 추가
            if (owner) {
                const nftContract = new ethers.Contract(
                    tokenContract,
                    nftContractAbi,
                    provider
                );

                let tokenURI = null;
                try {
                    tokenURI = await nftContract.tokenURI(tokenId);
                } catch (error) {
                    console.log('Error occurred while getting tokenURI');
                }
                console.log(`token uri: ${tokenURI}`);
                console.log(`tokenId:${tokenId}`);

                // ethBalance 가져오기 (account의 이더 잔액 조회)
                const balance = await provider.getBalance(account);
                const ethBalance = ethers.utils.formatEther(balance);

                // MongoDB에 계정 정보 추가
                await Tba.create({
                    address: account,
                    owner: owner,
                    level: '',
                    tokenURI: tokenURI,
                    ethBalance: ethBalance,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    community_id: communityId,
                });

                console.log("계정 업데이트 완료");
            }
        } catch (error) {
            console.error("DB 업데이트 오류:", error);
        }
        console.log("트랜잭션 처리 완료");
    }
});

