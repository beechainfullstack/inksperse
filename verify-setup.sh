#!/bin/bash

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔍 Ink Token Disperser - Setup Verification"
echo "==========================================="
echo ""

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check file exists
file_exists() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        return 0
    else
        echo -e "${RED}✗${NC} $2"
        return 1
    fi
}

# Function to check directory exists
dir_exists() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        return 0
    else
        echo -e "${RED}✗${NC} $2"
        return 1
    fi
}

errors=0

# Check Node.js
echo "📦 Checking Prerequisites..."
if command_exists node; then
    version=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js installed ($version)"
    
    # Check if version is >= 18
    major_version=$(echo $version | cut -d'.' -f1 | sed 's/v//')
    if [ "$major_version" -ge 18 ]; then
        echo -e "  ${GREEN}✓${NC} Version 18+ required (OK)"
    else
        echo -e "  ${YELLOW}!${NC} Node.js 18+ recommended (current: $version)"
        ((errors++))
    fi
else
    echo -e "${RED}✗${NC} Node.js not installed"
    ((errors++))
fi

# Check npm
if command_exists npm; then
    version=$(npm -v)
    echo -e "${GREEN}✓${NC} npm installed ($version)"
else
    echo -e "${RED}✗${NC} npm not installed"
    ((errors++))
fi

echo ""
echo "📁 Checking Project Structure..."

# Check main directories
dir_exists "contracts" "Contracts directory" || ((errors++))
dir_exists "webapp" "Webapp directory" || ((errors++))

# Check contract files
file_exists "contracts/contracts/TokenDisperser.sol" "TokenDisperser.sol" || ((errors++))
file_exists "contracts/contracts/MockERC20.sol" "MockERC20.sol" || ((errors++))
file_exists "contracts/scripts/deploy.js" "Deploy script" || ((errors++))
file_exists "contracts/test/TokenDisperser.test.js" "Contract tests" || ((errors++))
file_exists "contracts/hardhat.config.js" "Hardhat config" || ((errors++))

# Check webapp files
file_exists "webapp/src/App.jsx" "App.jsx" || ((errors++))
file_exists "webapp/src/main.jsx" "main.jsx" || ((errors++))
file_exists "webapp/src/components/DisperseForm.jsx" "DisperseForm component" || ((errors++))
file_exists "webapp/src/config/wagmi.js" "Wagmi config" || ((errors++))
file_exists "webapp/src/config/chains.js" "Chain config" || ((errors++))
file_exists "webapp/vite.config.js" "Vite config" || ((errors++))
file_exists "webapp/tailwind.config.js" "Tailwind config" || ((errors++))

# Check documentation
echo ""
echo "📚 Checking Documentation..."
file_exists "README.md" "Main README" || ((errors++))
file_exists "QUICKSTART.md" "Quick start guide" || ((errors++))
file_exists "DEPLOYMENT.md" "Deployment guide" || ((errors++))
file_exists "SECURITY.md" "Security policy" || ((errors++))
file_exists "LICENSE" "License file" || ((errors++))

echo ""
echo "⚙️  Checking Dependencies..."

# Check if node_modules exist
if [ -d "contracts/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Contract dependencies installed"
else
    echo -e "${YELLOW}!${NC} Contract dependencies not installed (run: cd contracts && npm install)"
    ((errors++))
fi

if [ -d "webapp/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Webapp dependencies installed"
else
    echo -e "${YELLOW}!${NC} Webapp dependencies not installed (run: cd webapp && npm install)"
    ((errors++))
fi

echo ""
echo "🔐 Checking Configuration..."

# Check for .env file
if [ -f "contracts/.env" ]; then
    echo -e "${GREEN}✓${NC} Environment file exists"
    
    # Check if it contains required variables
    if grep -q "PRIVATE_KEY" "contracts/.env"; then
        if grep -q "PRIVATE_KEY=your_private_key" "contracts/.env"; then
            echo -e "  ${YELLOW}!${NC} PRIVATE_KEY needs to be configured"
        else
            echo -e "  ${GREEN}✓${NC} PRIVATE_KEY is set"
        fi
    else
        echo -e "  ${RED}✗${NC} PRIVATE_KEY not found in .env"
        ((errors++))
    fi
else
    echo -e "${YELLOW}!${NC} .env file not found (copy .env.example to .env)"
fi

echo ""
echo "==========================================="

if [ $errors -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo ""
    echo "🚀 Next steps:"
    echo "1. Configure contracts/.env with your private key"
    echo "2. Run: cd contracts && npx hardhat test"
    echo "3. Deploy: npx hardhat run scripts/deploy.js --network ink"
    echo "4. Update webapp/src/App.jsx with contract address"
    echo "5. Run: cd webapp && npm run dev"
else
    echo -e "${RED}✗ Found $errors issue(s)${NC}"
    echo ""
    echo "Please fix the issues above before proceeding."
fi

echo ""
echo "📖 Documentation: README.md"
echo "⚡ Quick Start: QUICKSTART.md"
