require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {},
    ink: {
      url: process.env.INK_RPC_URL || "https://rpc-gel-sepolia.inkonchain.com/",
      chainId: 763373,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    },
    inkMainnet: {
      url: "https://rpc-gel.inkonchain.com/",
      chainId: 57073,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  },
  etherscan: {
    apiKey: {
      ink: process.env.ETHERSCAN_API_KEY || ""
    }
  }
};
