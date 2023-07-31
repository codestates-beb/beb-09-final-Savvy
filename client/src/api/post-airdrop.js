import { ethers } from "ethers";
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";

// 1. 관리자가 에어드랍하려는 컨트랙트 approve 받기
// 2. 에어드랍 컨트랙트 실행
// 3. 결과 db에 저장

// contract information
const bulkAirdropAddress = "0x755Cb4ad0d8fE702dC5D8A5da39d05883D7a1E23";
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
    // console.log(tokenIdArr);
    // console.log(tbaAddresses);

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

    // approve
    if (type === "ERC20") {
      const approve = await erc20Contract.approve(
        bulkAirdropAddress,
        ethers.utils.parseEther(amountArr.reduce((a, b) => a + b, 0))
      );
      const txReceipt = await approve.wait();
      console.log(txReceipt);
    } else if (type === "ERC721") {
      const approve = await erc721Contract.setApprovalForAll(
        bulkAirdropAddress,
        true
      );
      const txReceipt = await approve.wait();
      console.log(txReceipt);
    } else if (type === "ERC1155") {
      const approve = await erc1155Contract.setApprovalForAll(
        bulkAirdropAddress,
        true
      );
      const txReceipt = await approve.wait();
      console.log(txReceipt);
    }

    // airdrop
    if (type === "ERC20") {
      const airdrop = await bulkAirdropContract.bulkAirdropERC20(
        contractAddress,
        tbaAddresses[0],
        amountArr,
        { gasLimit: 5000000 }
      );
      const txReceipt = await airdrop.wait();
      console.log(txReceipt);
    } else if (type === "ERC721") {
      const airdrop = await bulkAirdropContract.bulkAirdropERC721(
        contractAddress,
        tbaAddresses[0],
        tokenIdArr,
        { gasLimit: 5000000 }
      );
      const txReceipt = await airdrop.wait();
      console.log(txReceipt);
    } else if (type === "ERC1155") {
      const airdrop = await bulkAirdropContract.bulkAirdropERC1155(
        contractAddress,
        tbaAddresses[0],
        tokenIdArr,
        amountArr,
        { gasLimit: 5000000 }
      );
      const txReceipt = await airdrop.wait();
      console.log(txReceipt);
    }

    return true;
  } catch (error) {
    console.log(error);
    return;
  }
};
