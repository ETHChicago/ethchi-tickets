import { expect } from "chai";
import { ethers, unlock } from "hardhat";

describe("PurchaseHook", function() {
    before(async () => {
        // deploy core unlock protocol
        await unlock.deployProtocol();  // not up to date ??
    });

    it("should work as a hook", async function () {
        const [user] = await ethers.getSigners();

        // deploy a lock 
        const { lock } = await unlock.createLock({
            expirationDuration: 30 * 60 * 60 * 24,
            currencyContractAddress: null,
            keyPrice: 0,
            maxNumberOfKeys: 10,
            name: "test lock",
        });
        await lock.deployed();
        console.log(`Deployed lock to > ${lock.address}`)

        // deploy the hook 
        const PurchaseHook = await ethers.getContractFactory("PurchaseHook");
        const hook = await PurchaseHook.deploy();
        await hook.deployed;
        console.log(`Deployed hook to > ${hook.address}`)

        // attach the hook to our lock 
        await (
            await lock.setEventHooks(
                hook.address, // first address is onKeyPurchase hook
                ethers.constants.AddressZero,
                ethers.constants.AddressZero,
                ethers.constants.AddressZero,
                ethers.constants.AddressZero,
                ethers.constants.AddressZero,
                ethers.constants.AddressZero
            )
        ).wait();

        console.log('Attached hook to lock')

        // attempt to make a purchase 
        await expect(
            lock.purchase([0], [user.address], [user.address], [user.address], [[]])
        ).reverted;
    });

});