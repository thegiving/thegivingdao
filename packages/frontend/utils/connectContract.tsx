import { providers } from "ethers";
import abiJSON from "../contracts/Fundraiser.json";
import { ethers  } from "ethers";

function connectContract() {
    const contractAddress = "0xa54b948BDc33b0CeC24eaCF0EF0451c3FF700bff";
    const contractABI = abiJSON;
    let fundraiser;
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
