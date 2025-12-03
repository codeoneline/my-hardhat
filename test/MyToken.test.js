const { expect } = require("chai")
const { ethers } = require("hardhat")
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")
const { MyToken } = require("../typechain-types")

describe("MyToken", function () {
  const INITIAL_SUPPLY = ethers.parseEther("1000000");
  
  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    
    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy();
    
    return { token, owner, addr1, addr2 };
  }
  
  it("应该正确设置代币名称和符号", async function () {
    const { token } = await loadFixture(deployTokenFixture);
    
    expect(await token.name()).to.equal("MyToken");
    expect(await token.symbol()).to.equal("MTK");
  });
  
  it("应该分配初始供应量给部署者", async function () {
    const { token, owner } = await loadFixture(deployTokenFixture);
    
    const ownerBalance = await token.balanceOf(owner.address);
    expect(ownerBalance).to.equal(INITIAL_SUPPLY);
  });
  
  it("应该允许代币转移", async function () {
    const { token, owner, addr1 } = await loadFixture(deployTokenFixture);
    const transferAmount = ethers.parseEther("100");
    
    await token.transfer(addr1.address, transferAmount);
    
    const addr1Balance = await token.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(transferAmount);
  });
  
  it("应该允许所有者铸造新代币", async function () {
    const { token, owner, addr1 } = await loadFixture(deployTokenFixture);
    const mintAmount = ethers.parseEther("500");
    
    await token.mint(addr1.address, mintAmount);
    
    const addr1Balance = await token.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(mintAmount);
  });
});