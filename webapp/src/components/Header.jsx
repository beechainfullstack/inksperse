import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Coins } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Ink Token Disperser</h1>
              <p className="text-xs text-gray-400">Kraken's Ink Layer 2</p>
            </div>
          </div>
          <ConnectButton />
        </div>
      </div>
    </header>
  )
}
