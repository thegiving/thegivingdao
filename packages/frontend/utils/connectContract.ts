import abiJSON from "../contracts/Fundraiser.json";
import { ethers } from "ethers";

function connectContract() {
  const contractAddress = "0xefBB17DDe02e1D364f945F6bEC11060e775e682c";
  const contractABI = abiJSON;
  let fundraiser: ethers.Contract;
  try {
    let { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum as ethers.providers.ExternalProvider);
      const signer = provider.getSigner();
      fundraiser = new ethers.Contract(contractAddress, contractABI, signer); // instantiating new connection to the contract
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
  return fundraiser;
}

export default connectContract;
