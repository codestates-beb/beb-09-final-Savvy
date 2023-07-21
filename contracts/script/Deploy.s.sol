// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {NFTLootBox} from "../src/NFTLootBox.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() external returns (NFTLootBox) {
        uint256 deployerPrivatekey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivatekey);

        // NFTLootBox.sol 배포
        NFTLootBox nftLootBox = new NFTLootBox();

        vm.stopBroadcast();

        return nftLootBox;
    }
}
