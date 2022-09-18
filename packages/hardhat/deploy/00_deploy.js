// deploy/00_deploy.js
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("Fundraiser", {
    from: deployer,
    log: true,
  });
};
module.exports.tags = ["Fundraiser"];
