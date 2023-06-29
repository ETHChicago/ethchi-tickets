import { UnlockV12, PublicLockV13 } from "@unlock-protocol/contracts";
import { network, ethers } from "hardhat";
import networkConfig from "../helper.config";

async function main(): Promise<void> {
  console.log(`NETWORK: ${network.name}`);

  // get addresses for current network
  const adrs = networkConfig[`${network.name}`] 

  // get signer
  let signers;
  await ethers.getSigners()
  .then(r => signers = r)
  const signer = signers[0];
  console.log(`SIGNER: ${signer.address}`)

  // instantiate unlock protocol
  const unlockAddress = adrs.unlockProtocol;
  const unlock = new ethers.Contract(unlockAddress, UnlockV12.abi, signer);
  const lockInterface = new ethers.utils.Interface(PublicLockV13.abi);

  // create VIP lock
  let params = lockInterface.encodeFunctionData(
    "initialize(address,uint256,address,uint256,uint256,string)",
    [
      signer.address, 
      ethers.constants.MaxUint256, // max for unlimited
      adrs.usdc, // polygon usdc
      ethers.utils.parseUnits("1000", 6), // usdc is 6 decimals
      100,
      "ETHCHI - VIP",
    ]
  );
  let lockAddress;
  await unlock.createUpgradeableLockAtVersion(params, 12).then(r => (
    r.wait().then(r => (
      lockAddress = r.logs[0].address
    ))
  ))
  console.log(`Lock deployed to: ${lockAddress}`)

  // create traditional early-bird lock
  params = lockInterface.encodeFunctionData(
    "initialize(address,uint256,address,uint256,uint256,string)",
    [
      signer.address, 
      ethers.constants.MaxUint256, // max for unlimited
      adrs.usdc, // polygon usdc
      ethers.utils.parseUnits("375", 6), // usdc is 6 decimals
      100,
      "ETHCHI - GA (early bird)",
    ]
  );
  lockAddress;
  await unlock.createUpgradeableLockAtVersion(params, 12).then(r => (
    r.wait().then(r => (
      lockAddress = r.logs[0].address
    ))
  ))
  console.log(`Lock deployed to: ${lockAddress}`)

  // create traditional standard lock
  params = lockInterface.encodeFunctionData(
    "initialize(address,uint256,address,uint256,uint256,string)",
    [
      signer.address, 
      ethers.constants.MaxUint256, // max for unlimited
      adrs.usdc, // polygon usdc
      ethers.utils.parseUnits("500", 6), // usdc is 6 decimals
      100,
      "ETHCHI - GA (standard)",
    ]
  );
  lockAddress;
  await unlock.createUpgradeableLockAtVersion(params, 12).then(r => (
    r.wait().then(r => (
      lockAddress = r.logs[0].address
    ))
  ))
  console.log(`Lock deployed to: ${lockAddress}`)

  // create hacker early-bird lock
  params = lockInterface.encodeFunctionData(
    "initialize(address,uint256,address,uint256,uint256,string)",
    [
      signer.address, 
      ethers.constants.MaxUint256, // max for unlimited
      adrs.usdc, // polygon usdc
      ethers.utils.parseUnits("75", 6), // usdc is 6 decimals
      150,
      "ETHCHI - Hacker (early-bird)",
    ]
  );
  lockAddress;
  await unlock.createUpgradeableLockAtVersion(params, 12).then(r => (
    r.wait().then(r => (
      lockAddress = r.logs[0].address
    ))
  ))
  console.log(`Lock deployed to: ${lockAddress}`)

  // create hacker standard lock
  params = lockInterface.encodeFunctionData(
    "initialize(address,uint256,address,uint256,uint256,string)",
    [
      signer.address, 
      ethers.constants.MaxUint256, // max for unlimited
      adrs.usdc, // polygon usdc
      ethers.utils.parseUnits("100", 6), // usdc is 6 decimals
      150,
      "ETHCHI - Hacker (standard)",
    ]
  );
  lockAddress;
  await unlock.createUpgradeableLockAtVersion(params, 12).then(r => (
    r.wait().then(r => (
      lockAddress = r.logs[0].address
    ))
  ))
  console.log(`Lock deployed to: ${lockAddress}`)

  console.log('All Locks deployed!')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
