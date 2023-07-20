import { ethers } from "ethers";

export default function ethersRPC(web3AuthProvider) {
  const provider = new ethers.providers.Web3Provider(web3AuthProvider);
  const signer = provider.getSigner();
  const address = signer.getAddress();

  const getBalance = async () => {
    const balance = await provider.getBalance(address);
  };
}
