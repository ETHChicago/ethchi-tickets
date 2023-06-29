// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@unlock-protocol/contracts/dist/PublicLock/IPublicLockV13.sol";

contract PurchaseHook {

  /** Constructor */
  constructor() {}

  /**
   * Function that is called at the begining of the
   * `purchase` function on the Public Lock contract.
   * It is expected to return the price that has to be
   * paid by the purchaser (as a uint256). If this
   * reverts, the purchase function fails.
   */
  function keyPurchasePrice(
      address, /* from */
      address, /*recipient */
      address, /* referrer */
      bytes calldata /* data */
  ) external view returns (uint256 minKeyPrice) {
      return IPublicLockV13(msg.sender).keyPrice();
  }

  /**
    * Function that is called at the end of the `purchase`
    * function and that can be used to record and store
    * elements on the hook. Similarly, if this reverts, the
    * purchase function fails.
    */
  function onKeyPurchase(
      address, /*from*/
      address, /*recipient*/
      address, /*referrer*/
      bytes calldata, /*data*/
      uint256, /*minKeyPrice*/
      uint256 /*pricePaid*/
  ) external {
    // Do nothing
  }
}