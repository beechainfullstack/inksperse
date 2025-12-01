const hre = require("hardhat");

async function main() {
  console.log("Deploying TokenDisperser to Ink Layer 2...");

  const TokenDisperser = await hre.ethers.getContractFactory("TokenDisperser");
  const tokenDisperser = await TokenDisperser.deploy();

  await tokenDisperser.waitForDeployment();

  const address = await tokenDisperser.getAddress();
  console.log(`TokenDisperser deployed to: ${address}`);

  // Optionally deploy a mock token for testing
  if (hre.network.name === "hardhat" || hre.network.name === "localhost") {
    console.log("\nDeploying MockERC20 for testing...");
    const MockERC20 = await hre.ethers.getContractFactory("MockERC20");
    const mockToken = await MockERC20.deploy(
      "Test Token",
      "TEST",
      hre.ethers.parseEther("1000000")
    );
    await mockToken.waitForDeployment();
    const mockAddress = await mockToken.getAddress();
    console.log(`MockERC20 deployed to: ${mockAddress}`);
  }

  console.log("\nDeployment complete!");
  console.log("\nContract addresses:");
  console.log("===================");
  console.log(`TokenDisperser: ${address}`);
  
  return address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
