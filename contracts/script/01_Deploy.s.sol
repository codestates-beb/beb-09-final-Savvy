// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {NFTLootBox} from "../src/NFTLootBox.sol";
import {BulkAirdrop} from "../src/BulkAirdrop.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() external returns (NFTLootBox) {
        uint256 deployerPrivatekey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivatekey);

        // NFTLootBox.sol 배포
        NFTLootBox nftLootBox = new NFTLootBox();

        // BulkAirdrop.sol 배포
        BulkAirdrop bulkAirdrop = new BulkAirdrop();

        vm.stopBroadcast();
    }
}
