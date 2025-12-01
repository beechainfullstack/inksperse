#!/bin/bash

# Ink Token Disperser - Automated Setup Script
# This script will help you get started quickly

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════╗"
echo "║   Ink Token Disperser - Automated Setup     ║"
echo "╔══════════════════════════════════════════════╗"
echo -e "${NC}"
echo ""

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

node_version=$(node -v | cut -d'.' -f1 | sed 's/v//')
if [ "$node_version" -lt 18 ]; then
    echo -e "${YELLOW}⚠️  Node.js 18+ is required. Current version: $(node -v)${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v) detected${NC}"
echo ""

# Step 1: Install contract dependencies
echo -e "${BLUE}Step 1: Installing Smart Contract Dependencies...${NC}"
cd contracts
if npm install; then
    echo -e "${GREEN}✓ Contract dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠️  Failed to install contract dependencies${NC}"
    exit 1
fi
cd ..
echo ""

# Step 2: Install webapp dependencies
echo -e "${BLUE}Step 2: Installing Webapp Dependencies...${NC}"
cd webapp
if npm install; then
    echo -e "${GREEN}✓ Webapp dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠️  Failed to install webapp dependencies${NC}"
    exit 1
fi
cd ..
echo ""

# Step 3: Create .env file
echo -e "${BLUE}Step 3: Setting up Environment Configuration...${NC}"
if [ ! -f "contracts/.env" ]; then
    cp contracts/.env.example contracts/.env
    echo -e "${GREEN}✓ Created contracts/.env file${NC}"
    echo -e "${YELLOW}📝 Please edit contracts/.env and add your private key${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi
echo ""

# Step 4: Compile contracts
echo -e "${BLUE}Step 4: Compiling Smart Contracts...${NC}"
cd contracts
if npx hardhat compile; then
    echo -e "${GREEN}✓ Contracts compiled successfully${NC}"
else
    echo -e "${YELLOW}⚠️  Failed to compile contracts${NC}"
    exit 1
fi
cd ..
echo ""

# Step 5: Run tests
echo -e "${BLUE}Step 5: Running Tests...${NC}"
cd contracts
if npx hardhat test; then
    echo -e "${GREEN}✓ All tests passed${NC}"
else
    echo -e "${YELLOW}⚠️  Some tests failed${NC}"
fi
cd ..
echo ""

echo -e "${GREEN}╔══════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║          Setup Complete! 🎉                  ║${NC}"
echo -e "${GREEN}╔══════════════════════════════════════════════╗${NC}"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo ""
echo "1. Configure your environment:"
echo "   ${YELLOW}nano contracts/.env${NC}"
echo "   Add your private key (without 0x prefix)"
echo ""
echo "2. Get testnet ETH:"
echo "   Visit Ink faucet for testnet tokens"
echo ""
echo "3. Deploy contract to Ink Sepolia:"
echo "   ${YELLOW}cd contracts${NC}"
echo "   ${YELLOW}npx hardhat run scripts/deploy.js --network ink${NC}"
echo ""
echo "4. Update webapp with contract address:"
echo "   Edit ${YELLOW}webapp/src/App.jsx${NC}"
echo "   Set CONTRACT_ADDRESS to your deployed address"
echo ""
echo "5. Get WalletConnect Project ID:"
echo "   Visit ${YELLOW}https://cloud.walletconnect.com/${NC}"
echo "   Edit ${YELLOW}webapp/src/config/wagmi.js${NC}"
echo ""
echo "6. Start the webapp:"
echo "   ${YELLOW}cd webapp${NC}"
echo "   ${YELLOW}npm run dev${NC}"
echo ""
echo "📖 For detailed instructions, see:"
echo "   - ${YELLOW}QUICKSTART.md${NC} - Quick 5-minute guide"
echo "   - ${YELLOW}README.md${NC} - Full documentation"
echo "   - ${YELLOW}DEPLOYMENT.md${NC} - Deployment guide"
echo ""
echo -e "${GREEN}Happy building! 🚀${NC}"
