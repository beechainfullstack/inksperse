import { useState } from 'react'
import { useAccount } from 'wagmi'
import Header from './components/Header'
import DisperseForm from './components/DisperseForm'
import Instructions from './components/Instructions'
import { AlertTriangle } from 'lucide-react'

// You'll need to update this with your deployed contract address
const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000'

function App() {
  const { isConnected } = useAccount()
  const [contractAddress, setContractAddress] = useState(CONTRACT_ADDRESS)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contract Address Input */}
        <div className="mb-8 bg-slate-800 rounded-xl p-6 shadow-2xl">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            TokenDisperser Contract Address
          </label>
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <p className="text-xs text-gray-400 mt-2">
            Enter your deployed TokenDisperser contract address
          </p>
        </div>

        {!isConnected ? (
          <div className="bg-slate-800 rounded-xl p-12 shadow-2xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-900/30 rounded-full mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Wallet Not Connected</h2>
            <p className="text-gray-400 mb-6">Please connect your wallet to start dispersing tokens</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <DisperseForm contractAddress={contractAddress} />
            </div>
            <div>
              <Instructions />
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Built for Kraken's Ink Layer 2 Protocol</p>
          <p className="mt-1">Efficiently disperse tokens to multiple addresses</p>
        </footer>
      </main>
    </div>
  )
}

export default App
