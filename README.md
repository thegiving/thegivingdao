<div id="top"></div>

<br />
<div align="center">
  <a href="https://github.com/thegiving/thegivingdao/">
    <img src="frontend/public/giving.png" alt="Logo" width="110" height="110">
  </a>

<h3 align="center">The Giving - a fully decentralized GoFundMe</h3>

</div>

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://github.com/thegiving/thegivingdao/)

The Giving is a fully decentralized charity organization like GoFundMe which is able to accept donations in crypto or fiat currencies. 

### Built With

- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Solidity](https://soliditylang.org/)
- [Polygon](https://polygon.technology/)
- [The Graph](https://thegraph.com/en/)


<!-- GETTING STARTED -->

## Getting Started

To get this application up and and running on your local machine follow these simple steps.

### Prerequisites

You need to have Node.js, NPM and hardhat installed on your computer, before running this project.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/thegiving/thegivingdao
   ```
2. Install NPM packages

   ```sh
   npm install
   ```

   or

   ```sh
   yarn install
   ```

3. Compile the smart contract
   ```sh
   npx hardhat compile
   ```
4. Deploy the smart contract
5. Get your contract address and paste in in `connectContract.js`

6. Deploy subgraph in `subragph` directory by following steps in `subgraph/README.md` (optional, since it is already deployed in hosted service)

7. Get subgraph query endpoint after deployment and update it in `apollo-client.js`

    ```js
    const client = new ApolloClient({
      uri: "YOUR_SUBGRAPH_LINK_HERE", // <-- Update this
      cache: new InMemoryCache(),
    });
    ```

8. Run the app

   ```sh
   npm start
   ```
[product-screenshot]: frontend/public/sample_landing_page.jpg
