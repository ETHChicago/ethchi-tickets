import { CreateLockArgs } from "@unlock-protocol/hardhat-plugin/dist/src/createLock";
import { UnlockV12, PublicLockV13 } from "@unlock-protocol/contracts";
import { network, ethers } from "hardhat";

// create sample data
const lockParams: CreateLockArgs = {
  expirationDuration: 60 * 60 * 24 * 30, // 30 days
  currencyContractAddress: ethers.constants.AddressZero, // address 0 is ETH but could be any ERC20 token
  keyPrice: ethers.utils.parseEther('.001'), // in wei
  maxNumberOfKeys: 100,
  name: 'Unlock-Protocol Sample Lock',
}

async function main(): Promise<void> {

  if (network.name == "mumbai"){
    console.log(`NETWORK: ${network.name}`);

    // get signer
    let signers;
    await ethers.getSigners()
    .then(r => signers = r)
    const signer = signers[0];
    console.log(`SIGNER: ${signer.address}`)

    // instantiate unlock protocol
    const unlockAddress = "0x1FF7e338d5E582138C46044dc238543Ce555C963"
    const unlockInterface = new ethers.Contract(unlockAddress, UnlockV12.abi, signer)
    const lockInterface = new ethers.utils.Interface(PublicLockV13.abi);

    // initialize lock creator
    /*
    console.log("initializing unlock...")
    await unlockInterface.initialize(
      signer.address, // lock creator 
    ).then(r => (
      console.log(r)
    )).catch(e => (
      console.log(e.reason)
    ))
    */

    // create lock
    const params = lockInterface.encodeFunctionData(
      "initialize(address,uint256,address,uint256,uint256,string)",
      [
        signer.address,
        31 * 60 * 60 * 24, // 30 days in seconds
        ethers.constants.AddressZero, // We use the base chain currency
        ethers.utils.parseUnits("0.01", 18), // 0.01 Eth
        1000,
        "testing!",
      ]
    );
    let lockAddress;
    await unlockInterface.createUpgradeableLockAtVersion(params, 12).then(r => (
      r.wait().then(r => (
        lockAddress = r.logs[0].address
      ))
    ))
    console.log(`Lock deployed to: ${lockAddress}`)



  } else {
    console.log("network not supported")
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
