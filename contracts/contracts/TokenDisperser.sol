// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title TokenDisperser
 * @dev Disperses ERC20 tokens or native ETH to multiple addresses in a single transaction
 */
contract TokenDisperser is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // Events
    event TokensDispersed(
        address indexed token,
        address indexed sender,
        uint256 totalAmount,
        uint256 recipientCount
    );
    
    event EthDispersed(
        address indexed sender,
        uint256 totalAmount,
        uint256 recipientCount
    );

    event DispersalFailed(
        address indexed recipient,
        uint256 amount,
        string reason
    );

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Disperses ERC20 tokens to multiple recipients
     * @param token The ERC20 token contract address
     * @param recipients Array of recipient addresses
     * @param amounts Array of amounts to send to each recipient
     */
    function disperseToken(
        address token,
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external nonReentrant {
        require(recipients.length == amounts.length, "Arrays length mismatch");
        require(recipients.length > 0, "No recipients provided");
        require(token != address(0), "Invalid token address");

        uint256 totalAmount = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            require(recipients[i] != address(0), "Invalid recipient address");
            require(amounts[i] > 0, "Amount must be greater than 0");
            totalAmount += amounts[i];
        }

        // Transfer total amount from sender to this contract
        IERC20(token).safeTransferFrom(msg.sender, address(this), totalAmount);

        // Disperse to recipients
        for (uint256 i = 0; i < recipients.length; i++) {
            IERC20(token).safeTransfer(recipients[i], amounts[i]);
        }

        emit TokensDispersed(token, msg.sender, totalAmount, recipients.length);
    }

    /**
     * @dev Disperses equal amounts of ERC20 tokens to multiple recipients
     * @param token The ERC20 token contract address
     * @param recipients Array of recipient addresses
     * @param amountPerRecipient Amount to send to each recipient
     */
    function disperseTokenEqual(
        address token,
        address[] calldata recipients,
        uint256 amountPerRecipient
    ) external nonReentrant {
        require(recipients.length > 0, "No recipients provided");
        require(token != address(0), "Invalid token address");
        require(amountPerRecipient > 0, "Amount must be greater than 0");

        uint256 totalAmount = amountPerRecipient * recipients.length;

        // Transfer total amount from sender to this contract
        IERC20(token).safeTransferFrom(msg.sender, address(this), totalAmount);

        // Disperse to recipients
        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "Invalid recipient address");
            IERC20(token).safeTransfer(recipients[i], amountPerRecipient);
        }

        emit TokensDispersed(token, msg.sender, totalAmount, recipients.length);
    }

    /**
     * @dev Disperses native ETH to multiple recipients
     * @param recipients Array of recipient addresses
     * @param amounts Array of amounts to send to each recipient
     */
    function disperseEther(
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external payable nonReentrant {
        require(recipients.length == amounts.length, "Arrays length mismatch");
        require(recipients.length > 0, "No recipients provided");

        uint256 totalAmount = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            require(recipients[i] != address(0), "Invalid recipient address");
            require(amounts[i] > 0, "Amount must be greater than 0");
            totalAmount += amounts[i];
        }

        require(msg.value >= totalAmount, "Insufficient ETH sent");

        // Disperse to recipients
        for (uint256 i = 0; i < recipients.length; i++) {
            (bool success, ) = payable(recipients[i]).call{value: amounts[i]}("");
            require(success, "ETH transfer failed");
        }

        // Refund excess ETH
        if (msg.value > totalAmount) {
            (bool refundSuccess, ) = payable(msg.sender).call{value: msg.value - totalAmount}("");
            require(refundSuccess, "Refund failed");
        }

        emit EthDispersed(msg.sender, totalAmount, recipients.length);
    }

    /**
     * @dev Disperses equal amounts of native ETH to multiple recipients
     * @param recipients Array of recipient addresses
     */
    function disperseEtherEqual(
        address[] calldata recipients
    ) external payable nonReentrant {
        require(recipients.length > 0, "No recipients provided");
        require(msg.value > 0, "No ETH sent");

        uint256 amountPerRecipient = msg.value / recipients.length;
        require(amountPerRecipient > 0, "Amount per recipient is 0");

        // Disperse to recipients
        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "Invalid recipient address");
            (bool success, ) = payable(recipients[i]).call{value: amountPerRecipient}("");
            require(success, "ETH transfer failed");
        }

        emit EthDispersed(msg.sender, msg.value, recipients.length);
    }

    /**
     * @dev Allows owner to recover stuck tokens
     * @param token The token contract address
     * @param amount Amount to recover
     */
    function recoverTokens(
        address token,
        uint256 amount
    ) external onlyOwner {
        IERC20(token).safeTransfer(owner(), amount);
    }

    /**
     * @dev Allows owner to recover stuck ETH
     */
    function recoverEth() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "ETH recovery failed");
    }

    // Receive function to accept ETH
    receive() external payable {}
}
