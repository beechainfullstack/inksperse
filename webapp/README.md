# Ink Token Disperser - Web Application

Modern React web application for interacting with the TokenDisperser smart contract on Ink Layer 2.

## Features

- 🔌 RainbowKit wallet integration
- 🌐 Ink Layer 2 network support
- 💰 ERC20 token and ETH dispersal
- 📊 CSV bulk import
- 🎨 Beautiful, responsive UI with TailwindCSS
- ⚡ Fast development with Vite

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Wagmi v2** - Ethereum React hooks
- **Viem v2** - Ethereum interactions
- **RainbowKit v2** - Wallet connection
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Configuration

1. **WalletConnect Project ID**

Get a project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/)

Edit `src/config/wagmi.js`:
```javascript
projectId: 'YOUR_PROJECT_ID'
```

2. **Contract Address**

Edit `src/App.jsx`:
```javascript
const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS'
```

### Development

```bash
npm run dev
```

Open http://localhost:3000

### Build

```bash
npm run build
```

Output in `dist/` folder.

### Preview Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── DisperseForm.jsx     # Main dispersal form
│   ├── Header.jsx           # App header with wallet connect
│   └── Instructions.jsx     # Usage instructions
├── config/
│   ├── chains.js           # Ink chain configurations
│   └── wagmi.js            # Wagmi/RainbowKit setup
├── contracts/
│   └── abi.js              # Smart contract ABIs
├── App.jsx                 # Main app component
├── main.jsx                # App entry point
└── index.css               # Global styles
```

## Key Components

### DisperseForm

Main component for token dispersal:
- Token/ETH type selection
- Recipient management
- CSV import
- Equal amount toggle
- Transaction handling

### Header

Application header with:
- Branding
- RainbowKit connect button

### Instructions

User guide and security tips

## Configuration Files

### chains.js

Defines Ink Sepolia and Mainnet configurations:
- Chain IDs
- RPC URLs
- Block explorers
- Native currency info

### wagmi.js

Configures Wagmi and RainbowKit:
- WalletConnect project ID
- Supported chains
- App metadata

### abi.js

Contract ABIs for:
- TokenDisperser contract
- ERC20 token interface

## Usage

### Connecting Wallet

1. Click "Connect Wallet"
2. Select wallet provider
3. Approve connection
4. Switch to Ink network if prompted

### Dispersing Tokens

1. Enter token contract address (for ERC20)
2. Add recipients:
   - Manually: Click "Add Recipient"
   - Bulk: Upload CSV file
3. Enter amounts (or use equal distribution)
4. Review summary
5. Click "Disperse Now"
6. Approve token spending (ERC20 only)
7. Confirm transaction

### CSV Format

```csv
address,amount
0x1234...,100
0x5678...,200
```

## Styling

### TailwindCSS

Custom configuration in `tailwind.config.js`:
- Custom Ink-themed colors
- Dark mode optimized
- Responsive breakpoints

### Theme Colors

- `ink-purple`: #6b21a8
- `ink-blue`: #1e40af
- Dark slate backgrounds
- Purple/blue gradients

## State Management

Uses React hooks and Wagmi for:
- Wallet connection state
- Contract interactions
- Transaction status
- Token information

## Error Handling

- User-friendly error messages
- Transaction failure recovery
- Network mismatch detection
- Validation feedback

## Performance

- Code splitting with Vite
- Lazy loading components
- Optimized builds
- Fast hot module replacement

## Deployment

### Static Hosting

Deploy `dist/` folder to:
- Vercel
- Netlify
- GitHub Pages
- IPFS
- Any static hosting

### Vercel Deployment

```bash
npm run build
vercel --prod
```

### Netlify Deployment

```bash
npm run build
netlify deploy --prod --dir=dist
```

## Environment Variables

No environment variables needed! All configuration is in source code.

For production, update:
- Contract address in `App.jsx`
- WalletConnect ID in `wagmi.js`

## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules
npm install
```

### Build fails
```bash
npm run build -- --debug
```

### Wallet won't connect
- Check WalletConnect Project ID
- Clear browser cache
- Try different wallet

### Wrong network
- App will prompt to switch
- Add Ink network manually if needed

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

MIT
