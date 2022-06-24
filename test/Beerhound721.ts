import {Contract, ContractFactory} from "ethers";
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers, network} from 'hardhat';
import { expect, assert } from 'chai';
import {Address} from "cluster";

describe("Beerhound721 contract test", function () {
    let myContractFactory: ContractFactory;
    let contract: Contract;

    beforeEach(async function() {
        myContractFactory = await ethers.getContractFactory("Beerhound721");
        contract = await myContractFactory.deploy();
    });

    describe("Transactions", function() {

        it("balanceOf should return account balance", async function() {
            const [owner] = await ethers.getSigners();

            expect(await contract.balanceOf(owner.address)).to.equal(1);
        });
        it("ownerOf should return owner of image", async function() {
            const [owner] = await ethers.getSigners();

            expect(await contract.ownerOf(1)).to.equal(owner.address);
        });
        it("safeTransferFrom should transfer image", async function() {
            const [owner, addr1, addr2] = await ethers.getSigners();

            await contract.approve(addr1.address, 1);

            await contract.connect(addr1).transferFrom(owner.address, addr2.address, 1);

            expect(await contract.balanceOf(addr2.address)).to.equal(1);
            expect(await contract.balanceOf(owner.address)).to.equal(0);
        });
        it("approve should give permission", async function() {
            const [owner, addr1] = await ethers.getSigners();

            await contract.approve(addr1.address, 1);

            expect(await contract.getApproved(1)).to.equal(addr1.address);
        });
        it("approve should give permission for only one", async function() {
            const [owner, addr1, addr2] = await ethers.getSigners();

            await contract.approve(addr1.address, 1);
            await contract.approve(addr2.address, 1);

            expect(await contract.getApproved(1)).to.equal(addr2.address);
        });
        it("setApprovalForAll should give permission for all", async function() {
            const [owner, addr1] = await ethers.getSigners();

            await contract.setApprovalForAll(addr1.address, true);

            expect(await contract.isApprovedForAll(owner.address, addr1.address)).to.equal(true);
        });
        it("setApprovalForAll should remove permission for all", async function() {
            const [owner, addr1] = await ethers.getSigners();

            await contract.setApprovalForAll(addr1.address, false);

            expect(await contract.isApprovedForAll(owner.address, addr1.address)).to.equal(false);
        });
        it("mint should add tokens", async function() {
            const [owner] = await ethers.getSigners();

            await contract.mint(owner.address, 2);

            expect(await contract.balanceOf(owner.address)).to.equal(2);
        });
        it("mint should check owner", async function() {
            const [owner, addr1] = await ethers.getSigners();

            await expect(
                contract.mint(addr1.address, 2)
            ).to.be.revertedWith("Not owner");
        });
    });
});