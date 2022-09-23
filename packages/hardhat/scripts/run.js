const hre = require("hardhat");

const main = async () => {
  const factory = await hre.ethers.getContractFactory("Fundraiser");
  const fundraiser = await factory.deploy();
  await fundraiser.deployed();
  console.log("Contract deployed to:", fundraiser.address);

  const [deployer, address1, address2] = await hre.ethers.getSigners();
  let accountDataCID = "bafybeibhwfzx6oo5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi";
  let accountKind = 0; // "Individual"
  let accountTxn = await fundraiser.createAccount(accountDataCID, accountKind);
  let account = await accountTxn.wait();
  console.log("NEW ACCOUNT CREATED:", account.events[0].args.accountId);

  let goal = hre.ethers.utils.parseEther("1");
  let startAt = 1718926200;
  let campaignDataCID = "bafybeibhwfzx6oo5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi";
  let categoryId = "0x2efa9d8aaaee861e3c33003a83429b789718741fa73415832ff17eb59a339f13";

  let txn = await fundraiser.createCampaign(
    campaignDataCID,
    1,
    categoryId,
    startAt,
    0,
    goal
  );
  let campaign = await txn.wait();
  console.log("NEW CAMPAIGN CREATED:", campaign.events[0].event);

  let campaignId = campaign.events[0].args[0].id;
  console.log("CAMPAIGN ID:", campaignId);

  txn = await fundraiser.publishCampaign(campaignId);
  let response = await txn.wait();
  console.log('PUBLISHED CAMPAIGN:', response.events[0].event, response.events[0].args.state);

  let donation = hre.ethers.utils.parseEther("1.5");
  txn = await fundraiser.donate(campaignId, { value: donation });
  response = await txn.wait();

  console.log("NEW DONATION:", response.events[0].event, hre.ethers.utils.formatEther(response.events[0].args.amount) + " ether");

  let amount = hre.ethers.utils.parseEther("1");
  txn = await fundraiser.distributeFunds(campaignId, amount);
  response = await txn.wait();
  console.log("DONATION DISTRIBUTION:", response.events[0].event,  hre.ethers.utils.formatEther(response.events[0].args.amount) + " ether");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

