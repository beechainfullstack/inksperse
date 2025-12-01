import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { inkSepolia, inkMainnet } from './chains'

export const config = getDefaultConfig({
  appName: 'Ink Token Disperser',
  projectId: 'YOUR_PROJECT_ID', // Get from WalletConnect Cloud
  chains: [inkSepolia, inkMainnet],
  ssr: false,
})
