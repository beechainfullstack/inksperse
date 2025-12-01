# Token Disperser Smart Contracts

Solidity smart contracts for dispersing ERC20 tokens and native ETH to multiple addresses.

## Contracts

### TokenDisperser.sol

Main contract for token and ETH dispersal operations.

**Features:**
- Batch ERC20 token transfers
- Batch ETH transfers
- Equal or custom amounts per recipient
- Gas optimized
- Non-custodial
- Emergency recovery functions

**Functions:**

```solidity
// Disperse ERC20 with custom amounts
function disperseToken(
    address token,
    address[] calldata recipients,
    uint256[] calldata amounts
) external nonReentrant

// Disperse ERC20 with equal amounts
function disperseTokenEqual(
    address token,
    address[] calldata recipients,
    uint256 amountPerRecipient
) external nonReentrant

// Disperse ETH with custom amounts
function disperseEther(
    address[] calldata recipients,
    uint256[] calldata amounts
) external payable nonReentrant

// Disperse ETH with equal amounts
function disperseEtherEqual(
    address[] calldata recipients
) external payable nonReentrant
```

### MockERC20.sol

Test ERC20 token for development and testing.

## Development

### Install Dependencies

```bash
npm install
```

### Compile Contracts

```bash
npx hardhat compile
```

### Run Tests

```bash
npx hardhat test
```

### Test Coverage

```bash
npx hardhat coverage
```

### Deploy

```bash
# Testnet
npx hardhat run scripts/deploy.js --network ink

# Mainnet
npx hardhat run scripts/deploy.js --network inkMainnet
```

### Verify Contract

```bash
npx hardhat verify --network ink <CONTRACT_ADDRESS>
```

## Gas Estimates

Approximate gas usage on Ink L2:

| Recipients | Gas Used |
|-----------|----------|
| 10        | ~150k    |
| 50        | ~450k    |
| 100       | ~850k    |
| 200       | ~1.6M    |

## Security

- Uses OpenZeppelin contracts
- ReentrancyGuard on all state-changing functions
- SafeERC20 for token transfers
- Comprehensive input validation
- No custody of user funds

⚠️ **Not professionally audited - use at your own risk**

## License

MIT
