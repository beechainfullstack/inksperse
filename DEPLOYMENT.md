# Deployment Guide

This guide will walk you through deploying the Token Disperser to Ink Layer 2.

## Pre-Deployment Checklist

- [ ] Node.js 18+ installed
- [ ] Wallet with ETH on Ink L2
- [ ] Private key ready (NEVER commit this!)
- [ ] WalletConnect Project ID obtained

## Step 1: Deploy Smart Contract

### 1.1 Setup Environment

```bash
cd contracts
cp .env.example .env
```

Edit `.env`:
```env
PRIVATE_KEY=your_private_key_without_0x
INK_RPC_URL=https://rpc-gel-sepolia.inkonchain.com/
```

⚠️ **Security Warning:** Never commit your `.env` file or private key!

### 1.2 Get Testnet ETH

For Ink Sepolia testnet:
1. Visit Ink faucet (check Ink documentation)
2. Request testnet ETH for your wallet address
3. Wait for transaction confirmation

### 1.3 Install Dependencies

```bash
npm install
```

### 1.4 Compile Contracts

```bash
npx hardhat compile
```

Expected output:
```
Compiled 5 Solidity files successfully
```

### 1.5 Run Tests (Optional but Recommended)

```bash
npx hardhat test
```

All tests should pass:
```
  TokenDisperser
    Token Dispersal
      ✓ Should disperse tokens to multiple recipients
      ✓ Should disperse equal token amounts to multiple recipients
      ✓ Should reject dispersal with mismatched arrays
    ETH Dispersal
      ✓ Should disperse ETH to multiple recipients
      ✓ Should disperse equal ETH amounts to multiple recipients
      ✓ Should reject ETH dispersal with insufficient value

  6 passing
```

### 1.6 Deploy to Ink Sepolia (Testnet)

```bash
npx hardhat run scripts/deploy.js --network ink
```

Expected output:
```
Deploying TokenDisperser to Ink Layer 2...
TokenDisperser deployed to: 0x1234567890abcdef...

Deployment complete!

Contract addresses:
===================
TokenDisperser: 0x1234567890abcdef...
```

**IMPORTANT:** Save the TokenDisperser contract address! You'll need it for the webapp.

### 1.7 Deploy to Ink Mainnet (Production)

⚠️ **Only after thorough testing on testnet!**

```bash
npx hardhat run scripts/deploy.js --network inkMainnet
```

### 1.8 Verify Contract (Optional)

If Ink supports contract verification:

```bash
npx hardhat verify --network ink YOUR_CONTRACT_ADDRESS
```

## Step 2: Configure and Deploy Webapp

### 2.1 Get WalletConnect Project ID

1. Visit https://cloud.walletconnect.com/
2. Sign up or log in
3. Create a new project
4. Copy your Project ID

### 2.2 Install Dependencies

```bash
cd ../webapp
npm install
```

### 2.3 Configure Contract Address

Edit `webapp/src/App.jsx`:

```javascript
// Replace with your deployed contract address
const CONTRACT_ADDRESS = '0x1234567890abcdef...'
```

### 2.4 Configure WalletConnect

Edit `webapp/src/config/wagmi.js`:

```javascript
export const config = getDefaultConfig({
  appName: 'Ink Token Disperser',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Replace this
  chains: [inkSepolia, inkMainnet],
  ssr: false,
})
```

### 2.5 Test Locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

**Test the following:**
- [ ] Wallet connection works
- [ ] Network switching to Ink works
- [ ] Can add recipients manually
- [ ] CSV upload works
- [ ] Token dispersal works (on testnet)
- [ ] ETH dispersal works (on testnet)

### 2.6 Build for Production

```bash
npm run build
```

This creates an optimized build in `webapp/dist/`.

## Step 3: Deploy Webapp

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd webapp
vercel
```

3. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? **Select your account**
   - Link to existing project? **N**
   - Project name? **ink-token-disperser**
   - Directory? **./dist**
   - Override settings? **N**

4. Your app will be live at: `https://ink-token-disperser.vercel.app`

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

3. Follow prompts to create site

### Option 3: IPFS (Decentralized)

1. Install IPFS Desktop or use Pinata/Infura

2. Add build folder to IPFS:
```bash
ipfs add -r dist/
```

3. Access via IPFS gateway:
```
https://ipfs.io/ipfs/YOUR_IPFS_HASH
```

### Option 4: Traditional Web Hosting

Upload `webapp/dist/` contents to:
- Apache/Nginx server
- AWS S3 + CloudFront
- Google Cloud Storage
- Any static hosting service

## Post-Deployment

### Verify Deployment

1. **Visit your deployed site**
2. **Connect wallet**
3. **Verify network detection**
4. **Test a small dispersal on testnet**
5. **Check transaction on block explorer**

### Update Documentation

Update your README with:
- Live webapp URL
- Deployed contract address
- Network information

### Security Checklist

- [ ] Private keys removed from all files
- [ ] `.env` in `.gitignore`
- [ ] Contract address publicly documented
- [ ] Webapp using correct contract address
- [ ] Tested on testnet thoroughly
- [ ] Consider contract audit before mainnet

## Monitoring

### Track Contract Usage

Monitor your contract on Ink Explorer:
```
https://explorer-sepolia.inkonchain.com/address/YOUR_CONTRACT_ADDRESS
```

### Analytics (Optional)

Add analytics to webapp:
- Google Analytics
- Plausible
- Mixpanel

## Troubleshooting

### Deploy script fails
- Check your private key format (no 0x prefix in .env)
- Ensure you have enough ETH for gas
- Verify RPC URL is correct

### Webapp won't connect
- Check WalletConnect Project ID
- Verify contract address is correct
- Check browser console for errors

### Transactions fail
- Ensure contract is deployed to correct network
- Verify ABI matches deployed contract
- Check gas limits

## Upgrading

To deploy a new version:

1. **Update contract:**
   - Deploy new contract version
   - Update contract address in webapp

2. **Update webapp:**
   - Make changes
   - Test locally
   - Build and redeploy

## Maintenance

### Regular checks:
- Monitor gas prices on Ink
- Check for Ink protocol updates
- Update dependencies regularly
- Review security advisories

---

## Support

If you encounter issues:
1. Check this guide thoroughly
2. Review error messages
3. Check Ink documentation
4. Open an issue on GitHub

Good luck with your deployment! 🚀
