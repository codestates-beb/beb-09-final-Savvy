import { ethers } from "ethers";
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";

// 1. 관리자가 에어드랍하려는 컨트랙트 approve 받기
// 2. 에어드랍 컨트랙트 실행
// 3. 결과 db에 저장

// contract information
const bulkAirdropAddress = process.env.REACT_APP_BULKAIRDROP_CONTRACT_ADDRESS;
const bulkAirdropAbi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [
      { internalType: "contract IERC1155", name: "_token", type: "address" },
      { internalType: "address[]", name: "_to", type: "address[]" },
      { internalType: "uint256[]", name: "_id", type: "uint256[]" },
      { internalType: "uint256[]", name: "_amount", type: "uint256[]" },
    ],
    name: "bulkAirdropERC1155",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC20", name: "_token", type: "address" },
      { internalType: "address[]", name: "_to", type: "address[]" },
      { internalType: "uint256[]", name: "_value", type: "uint256[]" },
    ],
    name: "bulkAirdropERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC721", name: "_token", type: "address" },
      { internalType: "address[]", name: "_to", type: "address[]" },
      { internalType: "uint256[]", name: "_id", type: "uint256[]" },
    ],
    name: "bulkAirdropERC721",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const erc20Abi = [
  "function approve(address spender, uint256 value) external returns (bool)",
];
const erc721Abi = [
  "function approve(address to, uint256 tokenId) external",
  "function setApprovalForAll(address operator, bool approved) external",
];
const erc1155Abi = [
  "function setApprovalForAll(address operator, bool approved) external",
];

export const airdrop = async (
  web3Auth,
  contractAddress,
  type,
  amounts,
  tokenIds,
  tbaAddresses
) => {
  try {
    const amountArr = amounts.split(", ");
    const tokenIdArr = tokenIds.split(", ");

    // init web3authProvider
    const web3authProvider = await web3Auth.connect();
    const provider = new ethers.providers.Web3Provider(web3authProvider);
    const signer = provider.getSigner();
    const adminAddress = await signer.getAddress();
    const adminBalance = ethers.utils.formatEther(await signer.getBalance());
    console.log(adminAddress);
    console.log(adminBalance);

    // init contract
    const bulkAirdropContract = new ethers.Contract(
      bulkAirdropAddress,
      bulkAirdropAbi,
      signer
    );
    const erc20Contract = new ethers.Contract(
      contractAddress,
      erc20Abi,
      signer
    );
    const erc721Contract = new ethers.Contract(
      contractAddress,
      erc721Abi,
      signer
    );
    const erc1155Contract = new ethers.Contract(
      contractAddress,
      erc1155Abi,
      signer
    );

    try {
      // approve
      if (type === "erc20") {
        const approve = await erc20Contract.approve(
          bulkAirdropAddress,
          ethers.utils.parseEther(amountArr.reduce((a, b) => a + b, 0))
        );
        await approve.wait();
        console.log(approve);
      } else if (type === "erc721") {
        const approve = await erc721Contract.setApprovalForAll(
          bulkAirdropAddress,
          true
        );
        await approve.wait();
        console.log(approve);
      } else if (type === "erc1155") {
        const approve = await erc1155Contract.setApprovalForAll(
          bulkAirdropAddress,
          true
        );
        await approve.wait();
        console.log(approve);
      }
    } catch (e) {
      console.log(e);
      return;
    }

    try {
      // airdrop
      if (type === "erc20") {
        const airdrop = await bulkAirdropContract.bulkAirdropERC20(
          contractAddress,
          tbaAddresses,
          amountArr
        );
        await airdrop.wait();
        console.log(airdrop);
      } else if (type === "erc721") {
        const airdrop = await bulkAirdropContract.bulkAirdropERC721(
          contractAddress,
          tbaAddresses,
          tokenIdArr
        );
        await airdrop.wait();
        console.log(airdrop);
      } else if (type === "erc1155") {
        const airdrop = await bulkAirdropContract.bulkAirdropERC1155(
          contractAddress,
          tbaAddresses,
          tokenIdArr,
          amountArr
        );
        await airdrop.wait();
        console.log(airdrop);
      }
    } catch (e) {
      console.log(e);
      return;
    }

    return true;
  } catch (error) {
    console.log(error);
    return;
  }
};
