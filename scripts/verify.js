const { run } = require("hardhat")

async function main() {
  // 替换为你的合约地址
  const contractAddress = "0xYourContractAddressHere";
  
  console.log(`正在验证合约: ${contractAddress}`);
  
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [], // 如果有构造函数参数，在这里添加
    });
    
    console.log("✅ 合约验证成功！");
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("ℹ️  合约已经验证过了");
    } else {
      console.error("❌ 验证失败:", error);
    }
  }
}

main().catch(console.error);