const { ethers } = require("hardhat")

async function main() {
  // 部署参数
  const tokenName = "My Custom Token";
  const tokenSymbol = "MCT";
  const initialSupply = ethers.parseEther("1000000"); // 100万代币
  
  const [deployer] = await ethers.getSigners();
  
  console.log(`部署自定义代币: ${tokenName} (${tokenSymbol})`);
  console.log(`初始供应量: ${ethers.formatEther(initialSupply)}`);
  
  // 部署 SimpleToken
  const SimpleToken = await ethers.getContractFactory("SimpleToken");
  const token = await SimpleToken.deploy(tokenName, tokenSymbol, deployer.address);
  
  await token.waitForDeployment();
  
  console.log(`✅ 部署成功！`);
  console.log(`合约地址: ${await token.getAddress()}`);
}

main().catch(console.error);