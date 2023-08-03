// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    mapping(address => uint256) private _lastSubscriptionTime;

    constructor() ERC20("Savvy", "SVY") {
        _mint(msg.sender, 100000000e18);
    }

    function subscription(address from, string memory plan) public {
        address to;
        uint256 amount;
        if (keccak256(bytes(plan)) == keccak256(bytes("plus"))) {
            to = 0x16c348c6309460080e1614ffFE54cab666d0a93A; // receiving wallet address
            amount = 10; // plus plan fee
        } else if (keccak256(bytes(plan)) == keccak256(bytes("business"))) {
            to = 0x16c348c6309460080e1614ffFE54cab666d0a93A; // receiving wallet address
            amount = 100; // business plan fee
        } else {
            revert("Invalid plan");
        }
        require(
            allowance(from, msg.sender) >= amount,
            "Insufficient allowance"
        );
        uint256 currentTime = block.timestamp;
        uint256 lastSubscriptionTime = _lastSubscriptionTime[from];
        require(
            currentTime >= lastSubscriptionTime + 1 minutes,
            "Subscription not yet available"
        ); // test 1 minute, should be 30 days
        _lastSubscriptionTime[from] = currentTime;
        _approve(from, msg.sender, allowance(from, msg.sender) - amount);
        _transfer(from, to, amount);
    }
}
