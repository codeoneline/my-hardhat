const { ethers } = require("hardhat")
const dotenv = require("dotenv")

dotenv.config();

async function main() {
  console.log("🚀 开始部署 Token 合约到 Wanchain 测试网...\n");

  // 获取部署者账户
  const [deployer] = await ethers.getSigners();
  console.log(`👤 部署者地址: ${deployer.address}`);
  console.log(`💰 账户余额: ${ethers.formatEther(await ethers.provider.getBalance(deployer.address))} WAN\n`);

  // 部署 MyToken 合约
  console.log("📝 正在部署 MyToken 合约...");
  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy();
  
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  
  console.log(`✅ MyToken 合约部署成功！`);
  console.log(`📄 合约地址: ${tokenAddress}`);
  console.log(`🔗 浏览器链接: https://testnet.wanscan.org/address/${tokenAddress}\n`);

  // 获取合约信息
  const name = await token.name();
  const symbol = await token.symbol();
  const totalSupply = await token.totalSupply();
  const owner = await token.owner();
  
  console.log("📊 合约信息:");
  console.log(`  名称: ${name}`);
  console.log(`  符号: ${symbol}`);
  console.log(`  总供应量: ${ethers.formatEther(totalSupply)} ${symbol}`);
  console.log(`  所有者: ${owner}`);
  console.log(`  小数位: 18\n`);

  // 验证部署者拥有所有代币
  const deployerBalance = await token.balanceOf(deployer.address);
  console.log(`💰 部署者代币余额: ${ethers.formatEther(deployerBalance)} ${symbol}`);
  console.log(`  占比: ${(Number(deployerBalance) * 100 / Number(totalSupply)).toFixed(2)}%\n`);

  return tokenAddress;
}

// 错误处理
main().catch((error) => {
  console.error("❌ 部署失败:", error);
  process.exitCode = 1;
});