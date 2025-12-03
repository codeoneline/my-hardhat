const { HardhatUserConfig } = require("hardhat/config")
require("@nomicfoundation/hardhat-toolbox")
const dotenv = require("dotenv")

dotenv.config();

module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    wanTestnet: {
      gasPrice: 2e9,
      gasLimit: 2e7,
      bip44ChainId: 2147492648, // TODO fake chainID.
      url: "http://gwan-testnet.wandevs.org:36891",
      accounts: [process.env.PK],
    },
    wanMainnet: {
      gasPrice: 2000000000,
      url: "https://gwan-ssl.wandevs.org:56891",
      accounts: [process.env.PK],
    },
    // Wanchain 测试网
    wanchainTestnet: {
      gasPrice: 2e9,
      gasLimit: 2e7,
      url: process.env.WANCHAIN_TESTNET_RPC_URL || "",
      chainId: 999,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    // Wanchain 主网
    wanchainMainnet: {
      gasPrice: 2000000000,
      url: process.env.WANCHAIN_MAINNET_RPC_URL || "",
      chainId: 888,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    // 本地网络（测试用）
    hardhat: {
      chainId: 1337,
    },
  },
  // 验证合约配置
  etherscan: {
    apiKey: {
      wanchainTestnet: process.env.WANSCAN_API_KEY || "",
      wanchainMainnet: process.env.WANSCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "wanchainTestnet",
        chainId: 999,
        urls: {
          apiURL: "https://testnet.wanscan.org/api",
          // apiURL: "https://nodes-testnet.wandevs.org/wan",
          browserURL: "https://testnet.wanscan.org",
        },
      },
      {
        network: "wanchainMainnet",
        chainId: 888,
        urls: {
          apiURL: "https://wanscan.org/api",
          // apiURL: "https://nodes.wandevs.org/wan",
          browserURL: "https://wanscan.org",
        },
      },
      {
        network: "astar",
        chainId: 592,
        urls: {
          apiURL: "https://blockscout.com/astar/api",
          browserURL: "https://blockscout.com/astar",
        },
      },
      {
        network: "baseTestnet",
        chainId: 84531,
        urls: {
         apiURL: "https://api-goerli.basescan.org/api",
         browserURL: "https://goerli.basescan.org"
        }
      },
      {
        network: "baseMainnet",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
    ],
  },
  // 路径配置
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};