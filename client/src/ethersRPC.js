import { ethers } from "ethers";

export default class ethersRPC {
  constructor(web3AuthProvider) {
    this.web3AuthProvider = web3AuthProvider;
  }

  async getBalance() {
    try {
      const provider = new ethers.providers.Web3Provider(this.web3AuthProvider);
      const signer = provider.getSigner();
      const address = signer.getAddress();
      const balance = await provider.getBalance(address);
      return balance;
    } catch (error) {
      console.log(error);
    }
  }

  async getAddress() {
    try {
      const provider = new ethers.providers.Web3Provider(this.web3AuthProvider);
      const signer = provider.getSigner();
      const address = signer.getAddress();
      return address;
    } catch (error) {
      console.log(error);
    }
  }

  async getChainId() {
    try {
      const provider = new ethers.providers.Web3Provider(this.web3AuthProvider);
      const chainId = await provider.getNetwork();
      return chainId.chainId;
    } catch (error) {
      console.log(error);
    }
  }
}
