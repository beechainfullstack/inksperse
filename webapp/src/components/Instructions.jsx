import { AlertCircle, FileText, Shield } from 'lucide-react'

export default function Instructions() {
  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-2xl">
      <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
        <FileText className="w-6 h-6" />
        How to Use
      </h2>
      
      <div className="space-y-4 text-gray-300">
        <div>
          <h3 className="font-semibold text-white mb-2">1. Connect Wallet</h3>
          <p className="text-sm">Connect your wallet and make sure you're on Ink Layer 2 network.</p>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">2. Choose Disperse Type</h3>
          <p className="text-sm">Select whether you want to disperse ERC20 tokens or native ETH.</p>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">3. Add Recipients</h3>
          <p className="text-sm">
            Add recipients manually or upload a CSV file with format: <code className="bg-slate-900 px-2 py-1 rounded">address,amount</code>
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">4. Approve & Disperse</h3>
          <p className="text-sm">
            For ERC20 tokens, you'll need to approve the contract first. Then click "Disperse Now" to send.
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
          <div className="flex gap-2">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-blue-300 mb-1">Important Notes:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-200">
                <li>Double-check all addresses before dispersing</li>
                <li>Ensure you have enough tokens/ETH plus gas fees</li>
                <li>Transactions on Ink L2 are fast and low-cost</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-purple-900/30 border border-purple-700 rounded-lg">
          <div className="flex gap-2">
            <Shield className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-purple-300 mb-1">Security:</p>
              <p className="text-purple-200">
                This contract is non-custodial. Tokens are transferred directly from your wallet to recipients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
