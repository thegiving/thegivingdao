require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("hardhat-abi-exporter");

const defaultNetwork = "localhost";
module.exports = {
  defaultNetwork,
  /**
   * gas reporter configuration that let's you know
   * an estimate of gas for contract deployments and function calls
   * More here: https://hardhat.org/plugins/hardhat-gas-reporter.html
   */
  gasReporter: {
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP || null,
    enabled: true,
  },
  networks: {
    localhost: {
      url: "http://localhost:8545",
    },
    mumbai: {
      url: process.env.STAGING_INFURA_URL,
      accounts: [`0x${process.env.STAGING_PRIVATE_KEY}`],
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      }
    ],
  },
  abiExporter: {
    path: "../frontend/contracts/",
    runOnCompile: true,
    clear: true,
    flat: true,
    only: ["Fundraiser"],
    spacing: 2,
    pretty: false,
    fromat: "json"
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
    controller: {
      default: 1,
    }
  }
};

task("accounts", "Prints the list of accounts", async (_, { ethers }) => {
  const accounts = await ethers.provider.listAccounts();
  accounts.forEach((account) => console.log(account));
});
