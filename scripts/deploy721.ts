import { ethers } from "hardhat";

async function main() {

    console.log(ethers.getSigners());
    const [ deployer ] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Beerhound721");
    const token = await Token.deploy();

    console.log("Token address:", token.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });