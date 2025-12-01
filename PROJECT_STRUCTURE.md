# Ink Token Disperser - Project Structure

Complete overview of the project architecture and file organization.

## Directory Tree

```
ink-token-disperser/
├── contracts/                      # Smart contract project (Hardhat)
│   ├── contracts/
│   │   ├── TokenDisperser.sol     # Main dispersal contract
│   │   └── MockERC20.sol          # Test ERC20 token
│   ├── scripts/
│   │   └── deploy.js              # Deployment script
│   ├── test/
│   │   └── TokenDisperser.test.js # Contract tests
│   ├── hardhat.config.js          # Hardhat configuration
│   ├── package.json               # Contract dependencies
│   ├── .env.example               # Environment template
│   └── README.md                  # Contract documentation
│
├── webapp/                         # React web application (Vite)
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── DisperseForm.jsx   # Main dispersal form
│   │   │   ├── Header.jsx         # App header
│   │   │   └── Instructions.jsx   # User guide
│   │   ├── config/
│   │   │   ├── chains.js          # Ink chain configs
│   │   │   └── wagmi.js           # Web3 setup
│   │   ├── contracts/
│   │   │   └── abi.js             # Contract ABIs
│   │   ├── App.jsx                # Root component
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Global styles
│   ├── index.html                 # HTML template
│   ├── vite.config.js             # Vite config
│   ├── tailwind.config.js         # Tailwind config
│   ├── postcss.config.js          # PostCSS config
│   ├── package.json               # Web dependencies
│   └── README.md                  # Web app docs
│
├── .gitignore                      # Git ignore rules
├── LICENSE                         # MIT license
├── README.md                       # Main documentation
├── DEPLOYMENT.md                   # Deployment guide
├── SECURITY.md                     # Security policy
├── PROJECT_STRUCTURE.md            # This file
├── example-recipients.csv          # Sample CSV file
└── package.json                    # Root package.json

```

## File Descriptions

### Root Level

| File | Purpose |
|------|---------|
| `README.md` | Main project documentation and getting started guide |
| `DEPLOYMENT.md` | Step-by-step deployment instructions |
| `SECURITY.md` | Security considerations and vulnerability reporting |
| `LICENSE` | MIT license text |
| `.gitignore` | Git ignore patterns for sensitive/build files |
| `package.json` | Root package.json with workspace scripts |
| `example-recipients.csv` | Sample CSV format for bulk imports |

### Contracts Directory

#### Smart Contracts (`contracts/contracts/`)

| File | Purpose | Lines | Description |
|------|---------|-------|-------------|
| `TokenDisperser.sol` | Main Contract | ~200 | Core dispersal logic with ReentrancyGuard |
| `MockERC20.sol` | Test Token | ~30 | Simple ERC20 for testing |

#### Scripts (`contracts/scripts/`)

| File | Purpose |
|------|---------|
| `deploy.js` | Deploy TokenDisperser and optionally MockERC20 |

#### Tests (`contracts/test/`)

| File | Purpose | Tests |
|------|---------|-------|
| `TokenDisperser.test.js` | Contract tests | 6 test cases covering all functions |

#### Configuration

| File | Purpose |
|------|---------|
| `hardhat.config.js` | Hardhat configuration with Ink networks |
| `package.json` | Dependencies: Hardhat, OpenZeppelin, testing tools |
| `.env.example` | Template for environment variables |

### Webapp Directory

#### Components (`webapp/src/components/`)

| Component | Purpose | State | Key Features |
|-----------|---------|-------|--------------|
| `DisperseForm.jsx` | Main form | Complex | Token/ETH selection, recipients, CSV import |
| `Header.jsx` | App header | Simple | Branding, RainbowKit connect button |
| `Instructions.jsx` | User guide | Static | Step-by-step instructions, warnings |

#### Configuration (`webapp/src/config/`)

| File | Purpose |
|------|---------|
| `chains.js` | Ink Sepolia and Mainnet chain definitions |
| `wagmi.js` | Wagmi and RainbowKit configuration |

#### Contracts (`webapp/src/contracts/`)

| File | Purpose |
|------|---------|
| `abi.js` | TokenDisperser and ERC20 ABIs |

#### Root Files

| File | Purpose |
|------|---------|
| `App.jsx` | Main app component, routing logic |
| `main.jsx` | React entry point, providers setup |
| `index.css` | Global styles, Tailwind imports |
| `index.html` | HTML template |

#### Build Configuration

| File | Purpose |
|------|---------|
| `vite.config.js` | Vite build configuration |
| `tailwind.config.js` | Tailwind CSS customization |
| `postcss.config.js` | PostCSS plugins |
| `package.json` | Web dependencies and scripts |

## Technology Stack

### Smart Contracts
```
Solidity 0.8.20
├── OpenZeppelin Contracts 5.0
├── Hardhat 2.19
└── Hardhat Toolbox 4.0
```

### Frontend
```
React 18.2
├── Vite 5.0
├── TailwindCSS 3.3
├── Wagmi 2.5
├── Viem 2.7
├── RainbowKit 2.0
├── TanStack Query 5.0
└── Lucide React 0.292
```

## Data Flow

### Token Dispersal Flow

```
User Input (Webapp)
    ↓
Form Validation
    ↓
Wagmi Hook (useWriteContract)
    ↓
Wallet Signature Request
    ↓
Transaction Broadcast
    ↓
Ink L2 Network
    ↓
TokenDisperser Contract
    ↓
Token/ETH Transfers
    ↓
Event Emission
    ↓
UI Update (Success/Error)
```

### State Management

```
Wagmi State
├── Account State (address, connected)
├── Network State (chainId, chain)
├── Contract Reads (token info)
├── Contract Writes (dispersal)
└── Transaction Status (pending, success, error)

React State
├── Form Data (recipients, amounts)
├── UI State (loading, errors)
└── User Preferences (equal amounts, type)
```

## Key Integrations

### Web3 Integration

- **RainbowKit**: Wallet connection UI
- **Wagmi**: React hooks for Ethereum
- **Viem**: Low-level Ethereum interactions

### UI/UX

- **TailwindCSS**: Utility-first styling
- **Lucide**: Icon library
- **React**: Component-based UI

### Development Tools

- **Hardhat**: Smart contract development
- **Vite**: Fast build tool
- **ESLint**: Code linting

## Build Outputs

### Contract Compilation
```
contracts/artifacts/
└── contracts/
    ├── TokenDisperser.sol/
    │   └── TokenDisperser.json  # ABI + bytecode
    └── MockERC20.sol/
        └── MockERC20.json
```

### Web Build
```
webapp/dist/
├── assets/
│   ├── index-[hash].js      # Bundled JS
│   └── index-[hash].css     # Bundled CSS
└── index.html               # Entry HTML
```

## Dependencies

### Smart Contract Dependencies

```json
{
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox": "^4.0.0",
    "hardhat": "^2.19.0"
  },
  "dependencies": {
    "@openzeppelin/contracts": "^5.0.0"
  }
}
```

### Webapp Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "wagmi": "^2.5.0",
    "viem": "^2.7.0",
    "@rainbow-me/rainbowkit": "^2.0.0",
    "lucide-react": "^0.292.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "tailwindcss": "^3.3.6"
  }
}
```

## Development Workflow

1. **Contract Development**
   ```
   Write Solidity → Compile → Test → Deploy → Verify
   ```

2. **Frontend Development**
   ```
   Design UI → Implement → Test → Build → Deploy
   ```

3. **Integration**
   ```
   Update ABI → Configure Address → Test E2E → Deploy
   ```

## Deployment Artifacts

### Required for Production

- ✅ Deployed contract address
- ✅ Contract ABI (in webapp)
- ✅ WalletConnect Project ID
- ✅ Built webapp (`dist/`)
- ✅ Documentation

### Optional

- Block explorer verification
- Custom domain
- Analytics integration
- Error monitoring

## Maintenance

### Regular Updates

- Dependency updates (monthly)
- Security patches (as needed)
- Documentation updates (as changed)
- Test coverage maintenance

### Monitoring

- Contract events on block explorer
- Webapp analytics
- User feedback
- Gas price trends

---

For more details, see individual README files in each directory.
