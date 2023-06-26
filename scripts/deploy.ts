import { unlock } from "hardhat";

async function main() {
  // deploy the Unlock contract
  //await unlock.deployAndSetTemplate();

  // deploy the entire protocol (localhost only)
  await unlock.deployProtocol();

  // create a lock
  const lockArgs = {
    expirationDuration: 60 * 60 * 24 * 7, // 7 days
    currencyContractAddress: null, // null for ETH or erc20 address
    keyPrice: "100000000", // in wei
    maxNumberOfKeys: 10,
    name: "A Demo Lock",
  };
  await unlock.createLock(lockArgs);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
