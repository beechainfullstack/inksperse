# Ink Token Disperser

A comprehensive token dispersal application built for Kraken's Ink Layer 2 protocol. Efficiently send ERC20 tokens or native ETH to multiple addresses in a single transaction.

![Ink Token Disperser](https://img.shields.io/badge/Layer2-Ink-purple)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-blue)
![React](https://img.shields.io/badge/React-18.2-blue)

## Features

✨ **Multi-Recipient Dispersal** - Send tokens to hundreds of addresses in one transaction  
🔐 **Non-Custodial** - Tokens transfer directly from your wallet  
💰 **Gas Efficient** - Optimized for minimal gas consumption on Ink L2  
🎯 **Flexible Options** - Equal or custom amounts per recipient  
📊 **CSV Import** - Bulk upload recipient lists  
🌐 **Modern UI** - Beautiful, responsive interface with RainbowKit integration

## Architecture

```
ink-token-disperser/
├── contracts/          # Smart contracts (Hardhat)
│   ├── contracts/
│   │   ├── TokenDisperser.sol    # Main dispersal contract
│   │   └── MockERC20.sol         # Test token
│   ├── scripts/
│   │   └── deploy.js             # Deployment script
│   └── test/
│       └── TokenDisperser.test.js # Contract tests
└── webapp/            # React frontend (Vite)
    ├── src/
    │   ├── components/           # React components
    │   ├── config/              # Chain & wagmi config
    │   └── contracts/           # ABIs
    └── public/
```

## Smart Contract

### TokenDisperser.sol

The core contract provides four main functions:

#### 1. `disperseToken(address token, address[] recipients, uint256[] amounts)`
Disperses ERC20 tokens with custom amounts per recipient.

#### 2. `disperseTokenEqual(address token, address[] recipients, uint256 amountPerRecipient)`
Disperses equal ERC20 token amounts to all recipients.

#### 3. `disperseEther(address[] recipients, uint256[] amounts)`
Disperses native ETH with custom amounts per recipient.

#### 4. `disperseEtherEqual(address[] recipients)`
Disperses equal ETH amounts to all recipients.

### Security Features

- ✅ ReentrancyGuard protection
- ✅ SafeERC20 for token transfers
- ✅ Input validation
- ✅ Owner recovery functions
- ✅ Non-custodial design

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MetaMask or compatible Web3 wallet
- ETH on Ink Layer 2 for gas fees

### Installation

1. **Clone the repository**
```bash
git clone <your-repo>
cd ink-token-disperser
```

2. **Install contract dependencies**
```bash
cd contracts
npm install
```

3. **Install webapp dependencies**
```bash
cd ../webapp
npm install
```

### Smart Contract Setup

1. **Configure environment**
```bash
cd contracts
cp .env.example .env
# Edit .env with your private key and RPC URL
```

2. **Compile contracts**
```bash
npm run compile
```

3. **Run tests**
```bash
npm test
```

4. **Deploy to Ink Layer 2**
```bash
# Testnet (Ink Sepolia)
npx hardhat run scripts/deploy.js --network ink

# Mainnet
npx hardhat run scripts/deploy.js --network inkMainnet
```

5. **Save the deployed contract address** - You'll need it for the webapp!

### Webapp Setup

1. **Configure the contract address**

Edit `webapp/src/App.jsx` and update the `CONTRACT_ADDRESS`:
```javascript
const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS'
```

2. **Get WalletConnect Project ID**

Visit [WalletConnect Cloud](https://cloud.walletconnect.com/) and create a project.

Edit `webapp/src/config/wagmi.js` and update:
```javascript
projectId: 'YOUR_WALLETCONNECT_PROJECT_ID'
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

## Usage

### Connecting to Ink Layer 2

1. Click "Connect Wallet" in the top right
2. Select your wallet provider
3. Approve the connection
4. Switch to Ink network when prompted (the app will help you add it)

### Dispersing Tokens

#### Option 1: Manual Entry

1. Select "ERC20 Token" or "Native ETH"
2. For tokens, enter the token contract address
3. Add recipients manually or click "Add Recipient"
4. Enter amounts for each recipient
5. Click "Disperse Now"
6. Approve token spending (for ERC20) and confirm transaction

#### Option 2: CSV Import

1. Prepare a CSV file with format:
```
0x1234...,100
0x5678...,200
0x9abc...,150
```

2. Click "Upload CSV"
3. Select your file
4. Review imported recipients
5. Click "Disperse Now"

#### Equal Distribution

1. Toggle "Send equal amount to all recipients"
2. Enter the amount per recipient
3. Add recipient addresses (amounts will be ignored)
4. Click "Disperse Now"

## Network Information

### Ink Sepolia (Testnet)
- **Chain ID:** 763373
- **RPC URL:** https://rpc-gel-sepolia.inkonchain.com/
- **Explorer:** https://explorer-sepolia.inkonchain.com
- **Faucet:** Get testnet ETH from Ink faucet

### Ink Mainnet
- **Chain ID:** 57073
- **RPC URL:** https://rpc-gel.inkonchain.com/
- **Explorer:** https://explorer.inkonchain.com

## Gas Optimization

The TokenDisperser contract is optimized for gas efficiency:

- Batch transfers in a single transaction
- Optimized storage usage
- Efficient loop operations
- No unnecessary state changes

**Estimated gas costs on Ink L2:**
- 10 recipients: ~150k gas
- 50 recipients: ~450k gas
- 100 recipients: ~850k gas

## Security Considerations

⚠️ **Important Security Notes:**

1. **Verify Addresses** - Always double-check recipient addresses before dispersing
2. **Test First** - Use testnet before mainnet deployment
3. **Approve Carefully** - Only approve the exact amount needed for token dispersals
4. **Contract Audits** - This contract has not been professionally audited
5. **Use at Your Own Risk** - Always verify the contract code before use

## Development

### Running Tests
```bash
cd contracts
npx hardhat test
```

### Running Local Hardhat Node
```bash
cd contracts
npx hardhat node
```

### Deploying to Local Network
```bash
npx hardhat run scripts/deploy.js --network localhost
```

## Troubleshooting

### "Insufficient allowance" error
- You need to approve the TokenDisperser contract to spend your tokens
- The webapp will prompt you to approve before dispersing

### "Insufficient ETH sent" error
- Ensure you're sending enough ETH to cover all recipients
- Check the total amount in the summary section

### Wrong network
- Click your wallet and switch to Ink Layer 2
- The app will help you add the network if needed

### Transaction fails
- Ensure you have enough tokens/ETH in your wallet
- Check that all addresses are valid Ethereum addresses
- Verify you have enough ETH for gas fees

## Tech Stack

### Smart Contracts
- Solidity 0.8.20
- Hardhat
- OpenZeppelin Contracts
- Ethers.js v6

### Frontend
- React 18
- Vite
- TailwindCSS
- Wagmi v2
- Viem v2
- RainbowKit v2
- Lucide Icons

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Disclaimer

This software is provided "as is", without warranty of any kind. Use at your own risk. Always verify smart contract code before interacting with it on mainnet.

## Resources

- [Ink Documentation](https://docs.inkonchain.com/)
- [Kraken Exchange](https://www.kraken.com/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Wagmi Documentation](https://wagmi.sh/)
- [RainbowKit Documentation](https://www.rainbowkit.com/)

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review the troubleshooting section

---

Built with ❤️ for the Kraken Ink Layer 2 ecosystem
# inksperse
