// deploy/00_deploy.js
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer, controller } = await getNamedAccounts();
  await deploy("Fundraiser", {
    from: deployer,
    args: [controller],
    log: true,
  });
};
module.exports.tags = ["Fundraiser"];
