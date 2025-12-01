import { useState } from 'react'
import { parseEther, parseUnits, formatEther } from 'viem'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { Send, Plus, Trash2, Upload } from 'lucide-react'
import { TOKEN_DISPERSER_ABI, ERC20_ABI } from '../contracts/abi'

export default function DisperseForm({ contractAddress }) {
  const { address } = useAccount()
  const [disperseType, setDisperseType] = useState('token') // 'token' or 'eth'
  const [tokenAddress, setTokenAddress] = useState('')
  const [recipients, setRecipients] = useState([{ address: '', amount: '' }])
  const [equalAmount, setEqualAmount] = useState(false)
  const [singleAmount, setSingleAmount] = useState('')

  const { data: hash, writeContract, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  // Read token info
  const { data: tokenSymbol } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'symbol',
    query: { enabled: disperseType === 'token' && tokenAddress?.length === 42 }
  })

  const { data: tokenDecimals } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'decimals',
    query: { enabled: disperseType === 'token' && tokenAddress?.length === 42 }
  })

  const addRecipient = () => {
    setRecipients([...recipients, { address: '', amount: '' }])
  }

  const removeRecipient = (index) => {
    setRecipients(recipients.filter((_, i) => i !== index))
  }

  const updateRecipient = (index, field, value) => {
    const updated = [...recipients]
    updated[index][field] = value
    setRecipients(updated)
  }

  const parseCSV = (text) => {
    const lines = text.trim().split('\n')
    const parsed = lines.map(line => {
      const [addr, amt] = line.split(',').map(s => s.trim())
      return { address: addr, amount: amt || '' }
    }).filter(r => r.address)
    
    if (parsed.length > 0) {
      setRecipients(parsed)
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => parseCSV(e.target.result)
      reader.readAsText(file)
    }
  }

  const calculateTotal = () => {
    if (equalAmount && singleAmount) {
      return parseFloat(singleAmount) * recipients.length
    }
    return recipients.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0)
  }

  const handleDisperse = async () => {
    try {
      const addresses = recipients.map(r => r.address).filter(a => a)
      
      if (addresses.length === 0) {
        alert('Please add at least one recipient')
        return
      }

      if (disperseType === 'token') {
        if (!tokenAddress || tokenAddress.length !== 42) {
          alert('Please enter a valid token address')
          return
        }

        const decimals = tokenDecimals || 18

        if (equalAmount) {
          const amount = parseUnits(singleAmount, decimals)
          writeContract({
            address: contractAddress,
            abi: TOKEN_DISPERSER_ABI,
            functionName: 'disperseTokenEqual',
            args: [tokenAddress, addresses, amount]
          })
        } else {
          const amounts = recipients.map(r => parseUnits(r.amount || '0', decimals))
          writeContract({
            address: contractAddress,
            abi: TOKEN_DISPERSER_ABI,
            functionName: 'disperseToken',
            args: [tokenAddress, addresses, amounts]
          })
        }
      } else {
        // ETH dispersal
        if (equalAmount) {
          const totalEth = parseEther(singleAmount) * BigInt(addresses.length)
          writeContract({
            address: contractAddress,
            abi: TOKEN_DISPERSER_ABI,
            functionName: 'disperseEtherEqual',
            args: [addresses],
            value: totalEth
          })
        } else {
          const amounts = recipients.map(r => parseEther(r.amount || '0'))
          const totalEth = amounts.reduce((a, b) => a + b, 0n)
          writeContract({
            address: contractAddress,
            abi: TOKEN_DISPERSER_ABI,
            functionName: 'disperseEther',
            args: [addresses, amounts],
            value: totalEth
          })
        }
      }
    } catch (err) {
      console.error('Dispersal error:', err)
    }
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-white">Disperse Tokens</h2>

      {/* Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Disperse Type</label>
        <div className="flex gap-4">
          <button
            onClick={() => setDisperseType('token')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              disperseType === 'token'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            ERC20 Token
          </button>
          <button
            onClick={() => setDisperseType('eth')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              disperseType === 'eth'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            Native ETH
          </button>
        </div>
      </div>

      {/* Token Address */}
      {disperseType === 'token' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Token Contract Address {tokenSymbol && <span className="text-purple-400">({tokenSymbol})</span>}
          </label>
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      )}

      {/* Equal Amount Toggle */}
      <div className="mb-6">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={equalAmount}
            onChange={(e) => setEqualAmount(e.target.checked)}
            className="mr-2 w-4 h-4"
          />
          <span className="text-gray-300">Send equal amount to all recipients</span>
        </label>
      </div>

      {/* Single Amount (if equal) */}
      {equalAmount && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount per recipient
          </label>
          <input
            type="text"
            value={singleAmount}
            onChange={(e) => setSingleAmount(e.target.value)}
            placeholder="0.0"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      )}

      {/* CSV Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Quick Import (CSV)
        </label>
        <label className="flex items-center justify-center w-full px-4 py-2 bg-slate-700 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors">
          <Upload className="w-5 h-5 mr-2 text-gray-400" />
          <span className="text-gray-300">Upload CSV (address,amount)</span>
          <input type="file" accept=".csv,.txt" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Recipients List */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Recipients</label>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {recipients.map((recipient, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={recipient.address}
                onChange={(e) => updateRecipient(index, 'address', e.target.value)}
                placeholder="0x..."
                className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {!equalAmount && (
                <input
                  type="text"
                  value={recipient.amount}
                  onChange={(e) => updateRecipient(index, 'amount', e.target.value)}
                  placeholder="Amount"
                  className="w-32 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              )}
              <button
                onClick={() => removeRecipient(index)}
                className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addRecipient}
          className="mt-3 w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center gap-2 text-gray-300 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Recipient
        </button>
      </div>

      {/* Summary */}
      <div className="mb-6 p-4 bg-slate-900 rounded-lg">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Recipients:</span>
          <span className="text-white font-medium">{recipients.length}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Total Amount:</span>
          <span className="text-white font-medium">
            {calculateTotal().toFixed(6)} {disperseType === 'eth' ? 'ETH' : tokenSymbol || 'tokens'}
          </span>
        </div>
      </div>

      {/* Disperse Button */}
      <button
        onClick={handleDisperse}
        disabled={!address || isPending || isConfirming}
        className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all"
      >
        {isPending || isConfirming ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            {isPending ? 'Confirm in wallet...' : 'Processing...'}
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Disperse Now
          </>
        )}
      </button>

      {/* Status Messages */}
      {isSuccess && (
        <div className="mt-4 p-4 bg-green-900/50 border border-green-500 rounded-lg">
          <p className="text-green-300 font-medium">✓ Dispersal successful!</p>
          <p className="text-green-400 text-sm mt-1">Transaction: {hash?.slice(0, 10)}...{hash?.slice(-8)}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded-lg">
          <p className="text-red-300 font-medium">Error: {error.message}</p>
        </div>
      )}
    </div>
  )
}
