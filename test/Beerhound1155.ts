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
            await contract.safeTransferFrom(ownerAddress, addr1Address, 1, 50, randomBytes(10))
            const addr1Balance = await contract.balanceOf(addr1.address, 1);
            expect(addr1Balance).to.equal(50);
            const balances = await contract.balanceOfBatch([addr1Address], [1])
            expect(balances[0]).to.equal(50);
        });

        it("Should set approval", async function () {
            await contract.setApprovalForAll(addr1Address, true);
            const isApproved = await  contract.isApprovedForAll(ownerAddress, addr1Address);
            expect(isApproved).to.equal(true);
        });
    });
});