const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenDisperser", function () {
  let tokenDisperser;
  let mockToken;
  let owner;
  let addr1;
  let addr2;
  let addr3;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    // Deploy MockERC20
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    mockToken = await MockERC20.deploy(
      "Test Token",
      "TEST",
      ethers.parseEther("1000000")
    );

    // Deploy TokenDisperser
    const TokenDisperser = await ethers.getContractFactory("TokenDisperser");
    tokenDisperser = await TokenDisperser.deploy();
  });

  describe("Token Dispersal", function () {
    it("Should disperse tokens to multiple recipients", async function () {
      const recipients = [addr1.address, addr2.address, addr3.address];
      const amounts = [
        ethers.parseEther("100"),
        ethers.parseEther("200"),
        ethers.parseEther("300"),
      ];

      const totalAmount = amounts.reduce((a, b) => a + b, 0n);

      // Approve tokens
      await mockToken.approve(await tokenDisperser.getAddress(), totalAmount);

      // Disperse tokens
      await expect(
        tokenDisperser.disperseToken(await mockToken.getAddress(), recipients, amounts)
      )
        .to.emit(tokenDisperser, "TokensDispersed")
        .withArgs(await mockToken.getAddress(), owner.address, totalAmount, recipients.length);

      // Check balances
      expect(await mockToken.balanceOf(addr1.address)).to.equal(amounts[0]);
      expect(await mockToken.balanceOf(addr2.address)).to.equal(amounts[1]);
      expect(await mockToken.balanceOf(addr3.address)).to.equal(amounts[2]);
    });

    it("Should disperse equal token amounts to multiple recipients", async function () {
      const recipients = [addr1.address, addr2.address, addr3.address];
      const amountPerRecipient = ethers.parseEther("100");
      const totalAmount = amountPerRecipient * BigInt(recipients.length);

      // Approve tokens
      await mockToken.approve(await tokenDisperser.getAddress(), totalAmount);

      // Disperse tokens
      await tokenDisperser.disperseTokenEqual(
        await mockToken.getAddress(),
        recipients,
        amountPerRecipient
      );

      // Check balances
      for (const recipient of recipients) {
        expect(await mockToken.balanceOf(recipient)).to.equal(amountPerRecipient);
      }
    });

    it("Should reject dispersal with mismatched arrays", async function () {
      const recipients = [addr1.address, addr2.address];
      const amounts = [ethers.parseEther("100")];

      await expect(
        tokenDisperser.disperseToken(await mockToken.getAddress(), recipients, amounts)
      ).to.be.revertedWith("Arrays length mismatch");
    });
  });

  describe("ETH Dispersal", function () {
    it("Should disperse ETH to multiple recipients", async function () {
      const recipients = [addr1.address, addr2.address, addr3.address];
      const amounts = [
        ethers.parseEther("1"),
        ethers.parseEther("2"),
        ethers.parseEther("3"),
      ];

      const totalAmount = amounts.reduce((a, b) => a + b, 0n);

      const addr1BalanceBefore = await ethers.provider.getBalance(addr1.address);
      const addr2BalanceBefore = await ethers.provider.getBalance(addr2.address);
      const addr3BalanceBefore = await ethers.provider.getBalance(addr3.address);

      // Disperse ETH
      await expect(
        tokenDisperser.disperseEther(recipients, amounts, { value: totalAmount })
      )
        .to.emit(tokenDisperser, "EthDispersed")
        .withArgs(owner.address, totalAmount, recipients.length);

      // Check balances
      expect(await ethers.provider.getBalance(addr1.address)).to.equal(
        addr1BalanceBefore + amounts[0]
      );
      expect(await ethers.provider.getBalance(addr2.address)).to.equal(
        addr2BalanceBefore + amounts[1]
      );
      expect(await ethers.provider.getBalance(addr3.address)).to.equal(
        addr3BalanceBefore + amounts[2]
      );
    });

    it("Should disperse equal ETH amounts to multiple recipients", async function () {
      const recipients = [addr1.address, addr2.address];
      const totalAmount = ethers.parseEther("2");
      const amountPerRecipient = totalAmount / BigInt(recipients.length);

      const addr1BalanceBefore = await ethers.provider.getBalance(addr1.address);
      const addr2BalanceBefore = await ethers.provider.getBalance(addr2.address);

      // Disperse ETH
      await tokenDisperser.disperseEtherEqual(recipients, { value: totalAmount });

      // Check balances
      expect(await ethers.provider.getBalance(addr1.address)).to.equal(
        addr1BalanceBefore + amountPerRecipient
      );
      expect(await ethers.provider.getBalance(addr2.address)).to.equal(
        addr2BalanceBefore + amountPerRecipient
      );
    });

    it("Should reject ETH dispersal with insufficient value", async function () {
      const recipients = [addr1.address, addr2.address];
      const amounts = [ethers.parseEther("1"), ethers.parseEther("2")];
      const totalAmount = amounts.reduce((a, b) => a + b, 0n);

      await expect(
        tokenDisperser.disperseEther(recipients, amounts, {
          value: totalAmount - ethers.parseEther("0.5"),
        })
      ).to.be.revertedWith("Insufficient ETH sent");
    });
  });
});
