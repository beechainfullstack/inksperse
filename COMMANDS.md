# Command Reference - Ink Token Disperser

Quick reference for all common commands.

## Setup Commands

### Initial Setup
```bash
# Automated setup (recommended)
./setup.sh

# Manual setup
cd contracts && npm install
cd ../webapp && npm install
```

### Verify Installation
```bash
./verify-setup.sh
```

## Smart Contract Commands

### Development
```bash
cd contracts

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Run tests with coverage
npx hardhat coverage

# Clean build artifacts
npx hardhat clean
```

### Deployment

```bash
cd contracts

# Deploy to Ink Sepolia (testnet)
npx hardhat run scripts/deploy.js --network ink

# Deploy to Ink Mainnet
npx hardhat run scripts/deploy.js --network inkMainnet

# Deploy to local Hardhat network
npx hardhat run scripts/deploy.js --network hardhat
```

### Verification

```bash
cd contracts

# Verify contract on block explorer
npx hardhat verify --network ink <CONTRACT_ADDRESS>
```

### Local Development

```bash
cd contracts

# Start local Hardhat node
npx hardhat node

# Deploy to local node (in another terminal)
npx hardhat run scripts/deploy.js --network localhost
```

### Testing Specific Features

```bash
cd contracts

# Run specific test
npx hardhat test --grep "disperse tokens"

# Run tests with gas reporting
REPORT_GAS=true npx hardhat test
```

## Webapp Commands

### Development

```bash
cd webapp

# Start development server
npm run dev

# Start on specific port
npm run dev -- --port 3001

# Open browser automatically
npm run dev -- --open
```

### Building

```bash
cd webapp

# Build for production
npm run build

# Preview production build
npm run preview
```

### Linting & Formatting

```bash
cd webapp

# Run linter (if configured)
npm run lint

# Fix linting issues
npm run lint -- --fix
```

## Deployment Commands

### Vercel

```bash
cd webapp

# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

### Netlify

```bash
cd webapp

# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Traditional Hosting

```bash
cd webapp

# Build
npm run build

# Upload dist/ folder to your hosting service
```

## Git Commands

### Initial Commit

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Ink Token Disperser"

# Add remote
git remote add origin <your-repo-url>

# Push
git push -u origin main
```

### Regular Workflow

```bash
# Check status
git status

# Add changes
git add .

# Commit with message
git commit -m "Description of changes"

# Push to remote
git push
```

## Troubleshooting Commands

### Clear Cache & Reinstall

```bash
# Contracts
cd contracts
rm -rf node_modules artifacts cache
npm install

# Webapp
cd webapp
rm -rf node_modules dist
npm install
```

### Check Versions

```bash
# Node version
node -v

# npm version
npm -v

# Hardhat version
cd contracts && npx hardhat --version

# Vite version
cd webapp && npx vite --version
```

### Network Diagnostics

```bash
# Test Ink RPC connection
curl https://rpc-gel-sepolia.inkonchain.com/ \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

## Useful One-Liners

### Quick Test & Deploy (Testnet)

```bash
cd contracts && \
npx hardhat test && \
npx hardhat run scripts/deploy.js --network ink
```

### Build & Deploy Webapp

```bash
cd webapp && \
npm run build && \
vercel --prod
```

### Full Clean & Rebuild

```bash
# Contracts
cd contracts && \
rm -rf node_modules artifacts cache && \
npm install && \
npx hardhat compile && \
npx hardhat test

# Webapp
cd ../webapp && \
rm -rf node_modules dist && \
npm install && \
npm run build
```

## Environment Variables

### Set Environment Variables (Linux/Mac)

```bash
# Set for current session
export PRIVATE_KEY="your_private_key_here"

# Or use .env file
echo "PRIVATE_KEY=your_key" > contracts/.env
```

### Set Environment Variables (Windows)

```cmd
# PowerShell
$env:PRIVATE_KEY="your_private_key_here"

# CMD
set PRIVATE_KEY=your_private_key_here
```

## NPM Scripts Reference

### Root Level (`package.json`)

```bash
npm run dev      # Start webapp dev server
npm run build    # Build webapp
npm run compile  # Compile contracts
npm run test     # Test contracts
npm run deploy   # Deploy contracts to Ink
```

### Contracts (`contracts/package.json`)

```bash
npm run compile  # Compile Solidity contracts
npm run test     # Run contract tests
npm run deploy   # Run deployment script
```

### Webapp (`webapp/package.json`)

```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Docker Commands (Optional)

If you want to use Docker:

```bash
# Build Docker image
docker build -t ink-disperser .

# Run container
docker run -p 3000:3000 ink-disperser

# Run with environment variables
docker run -p 3000:3000 \
  -e PRIVATE_KEY=$PRIVATE_KEY \
  ink-disperser
```

## Database/Logs Commands

### View Contract Events

```bash
cd contracts

# Watch for events
npx hardhat run scripts/watch-events.js --network ink
```

### Export Contract Data

```bash
cd contracts

# Export deployment addresses
npx hardhat run scripts/export-addresses.js
```

## Security Commands

### Check for Vulnerabilities

```bash
# Contracts
cd contracts && npm audit

# Webapp
cd webapp && npm audit

# Fix vulnerabilities
npm audit fix
```

### Update Dependencies

```bash
# Contracts
cd contracts && npm update

# Webapp
cd webapp && npm update

# Check for outdated packages
npm outdated
```

## Performance Commands

### Analyze Bundle Size

```bash
cd webapp

# Build with analysis
npm run build -- --mode analyze

# Or use source-map-explorer
npm install -g source-map-explorer
npm run build
source-map-explorer dist/assets/*.js
```

### Gas Profiling

```bash
cd contracts

# Run tests with gas reporter
REPORT_GAS=true npx hardhat test
```

## Quick Reference Tables

### Network Endpoints

| Network | Chain ID | RPC URL |
|---------|----------|---------|
| Ink Sepolia | 763373 | https://rpc-gel-sepolia.inkonchain.com/ |
| Ink Mainnet | 57073 | https://rpc-gel.inkonchain.com/ |

### Port Reference

| Service | Default Port |
|---------|--------------|
| Vite Dev Server | 3000 |
| Hardhat Node | 8545 |
| Vite Preview | 4173 |

### File Locations

| Item | Path |
|------|------|
| Contract | `contracts/contracts/TokenDisperser.sol` |
| Deploy Script | `contracts/scripts/deploy.js` |
| Tests | `contracts/test/TokenDisperser.test.js` |
| Webapp Entry | `webapp/src/main.jsx` |
| Main Component | `webapp/src/App.jsx` |
| Config | `webapp/src/config/wagmi.js` |

---

**Pro Tip:** Bookmark this file for quick command reference!
