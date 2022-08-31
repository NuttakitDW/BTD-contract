// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}


async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const hre = require("hardhat");
  const BitToonDAO = await ethers.getContractFactory("SaleBTD");
  const btd = await BitToonDAO.deploy("0xF488a1Ac7aadD80755aE4F081A67e1E85820a8C3", "0x58f345301C620c0C4596CE218F92550669519Aee");

  await btd.deployed();
  console.log("BitToonDAO deployed to:", btd.address);

  await delay(60000);

  await hre.run("verify:verify", {
    address: btd.address,
    constructorArguments: ["0xF488a1Ac7aadD80755aE4F081A67e1E85820a8C3", "0x58f345301C620c0C4596CE218F92550669519Aee"],
  }); 

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
