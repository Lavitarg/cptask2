import { Contract } from "ethers";
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers, network} from 'hardhat';
import { expect, assert } from 'chai';
import {Address} from "cluster";
import {randomBytes} from "ethers/lib/utils";

describe("Token contract", function () {

    let Token;
    let contract: Contract;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;
    let addrs: SignerWithAddress[];
    let ownerAddress: string;
    let addr1Address: string;


    beforeEach(async function () {
        Token = await ethers.getContractFactory("Beerhound1155");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        ownerAddress = owner.address;
        addr1Address = addr1.address;
        contract = await Token.deploy();
    });

    describe("Deployment", function () {

        it("Should return balance of 1 token ", async function () {
            const ownerBalance = await contract.balanceOf(owner.address, 1);
            expect(await 100).to.equal(ownerBalance);
        });
    });

    describe("Transactions", function () {

        it("Should transfer tokens between accounts", async function () {
            // Transfer 50 tokens from owner to addr1
            await contract.safeTransferFrom(ownerAddress, addr1Address, 1, 50, randomBytes(10))
            const addr1Balance = await contract.balanceOf(addr1.address, 1);
            expect(addr1Balance).to.equal(50);
            const balances = await contract.balanceOfBatch([addr1Address], [1])
            expect(balances[0]).to.equal(50);
        });

        // it("Should fail if sender doesn’t have enough tokens", async function () {
        //     const initialOwnerBalance = await contract.balanceOf(owner.address);
        //
        //     // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
        //     // `require` will evaluate false and revert the transaction.
        //     await expect(
        //         contract.connect(addr1).transfer(owner.address, 1)
        //     ).to.be.revertedWith("Not enough tokens");
        //
        //     // Owner balance shouldn't have changed.
        //     expect(await contract.balanceOf(owner.address)).to.equal(
        //         initialOwnerBalance
        //     );
        // });
        //
        // it("Should update balances after transfers", async function () {
        //     const initialOwnerBalance = await contract.balanceOf(owner.address);
        //
        //     // Transfer 100 tokens from owner to addr1.
        //     await contract.transfer(addr1.address, 100);
        //
        //     // Transfer another 50 tokens from owner to addr2.
        //     await contract.transfer(addr2.address, 50);
        //
        //     // Check balances.
        //     const finalOwnerBalance = await contract.balanceOf(owner.address);
        //     expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));
        //
        //     const addr1Balance = await contract.balanceOf(addr1.address);
        //     expect(addr1Balance).to.equal(100);
        //
        //     const addr2Balance = await contract.balanceOf(addr2.address);
        //     expect(addr2Balance).to.equal(50);
        // });


    });
});