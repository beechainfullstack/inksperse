# Quick Start Guide

Get up and running with Ink Token Disperser in 5 minutes!

## Prerequisites

- Node.js 18+
- MetaMask wallet
- Some ETH on Ink Sepolia testnet

## Step 1: Install Dependencies (2 min)

```bash
# Install contract dependencies
cd contracts
npm install

# Install webapp dependencies
cd ../webapp
npm install
```

## Step 2: Deploy Contract (1 min)

```bash
cd contracts

# Create environment file
cp .env.example .env

# Edit .env and add your private key
# PRIVATE_KEY=your_key_here

# Deploy to Ink Sepolia testnet
npx hardhat run scripts/deploy.js --network ink
```

**Save the contract address!** You'll see output like:
```
TokenDisperser deployed to: 0x1234567890abcdef...
```

## Step 3: Configure Webapp (1 min)

Edit `webapp/src/App.jsx`:
```javascript
const CONTRACT_ADDRESS = '0x1234567890abcdef...' // Your address here
```

Get a WalletConnect Project ID from https://cloud.walletconnect.com/

Edit `webapp/src/config/wagmi.js`:
```javascript
projectId: 'your_project_id_here'
```

## Step 4: Run Webapp (30 sec)

```bash
cd webapp
npm run dev
```

Open http://localhost:3000

## Step 5: Test It! (30 sec)

1. Click "Connect Wallet"
2. Switch to Ink Sepolia network
3. Try a small ETH dispersal:
   - Select "Native ETH"
   - Add 2-3 test addresses
   - Enter small amounts (0.001 ETH each)
   - Click "Disperse Now"

## Next Steps

✅ **Working?** Great! Now:
- Try token dispersal (deploy a test token first)
- Test CSV upload feature
- Read full README.md for more features

❌ **Not working?** Check:
- Contract deployed successfully?
- Contract address correct in webapp?
- On correct network (Ink Sepolia)?
- Have testnet ETH for gas?

## Common Issues

**"Insufficient funds"**
- Get testnet ETH from Ink faucet
- Check you're on Ink Sepolia network

**"Cannot read properties of undefined"**
- Verify contract address is set in `App.jsx`
- Check network connection

**"Transaction failed"**
- Ensure recipient addresses are valid
- Check you have enough tokens/ETH
- Verify gas settings

## Resources

- Full documentation: `README.md`
- Deployment guide: `DEPLOYMENT.md`
- Security: `SECURITY.md`
- Project structure: `PROJECT_STRUCTURE.md`

## Get Help

- Check troubleshooting in README.md
- Review error messages in browser console
- Verify all configuration steps completed

---

**Ready for production?** See `DEPLOYMENT.md` for mainnet deployment!

🚀 Happy dispersing!
