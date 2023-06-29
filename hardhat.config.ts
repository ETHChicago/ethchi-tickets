import { HardhatUserConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-toolbox";
import "@unlock-protocol/hardhat-plugin";
import "@unlock-protocol/contracts";

require("dotenv").config();


const mumbaiRpc = process.env.MUMBAI_RPC;

let devKey: string = "";
if (process.env.DEV_PRIVATE_KEY) {
  devKey = process.env.DEV_PRIVATE_KEY;
} 

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: mumbaiRpc,
      accounts: [devKey]
    }
  }
}

export default config;