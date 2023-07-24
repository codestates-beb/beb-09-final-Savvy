import axios from "axios";
import { ethers } from "ethers";

// erc6551 info
const erc6551RegistryABI = [
  "function createAccount(address implementation, uint256 chainId, address tokenContract, uint256 tokenId, uint256 salt, bytes calldata initData) external returns (address)",
];
const erc6551RegistryAddress = "0x02101dfB77FDE026414827Fdc604ddAF224F0921";
const erc6551AccountAddress = "0x2d25602551487c3f3354dd80d76d54383a243358";
const methodId = "0xda7323b3";

export const createTba = async (address, nftId) => {
  try {
    const abiCoder = new ethers.utils.AbiCoder();
    // argument encoding
    const encodedArgs = abiCoder.encode(
      ["address", "uint256", "address", "uint256", "uint256", "bytes"],
      [
        erc6551AccountAddress,
        "11155111",
        address,
        Number(nftId),
        0,
        "0x8129fc1c",
      ]
    );

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: accounts[0],
          to: erc6551RegistryAddress,
          data: methodId + encodedArgs.slice(2),
        },
      ],
    });

    return txHash;
  } catch (e) {
    console.log(e);
    return;
  }
};

export const postTxHash = async (txHash) => {
  try {
    const result = await axios({
      method: "post",
      url: "http://localhost:8080/user/txHash",
      data: {
        txHash,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
    return;
  }
};
