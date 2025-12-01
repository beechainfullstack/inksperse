# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in the Ink Token Disperser contracts or webapp, please report it responsibly.

### How to Report

1. **DO NOT** open a public issue
2. Email security details to the project maintainer
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- Acknowledgment within 48 hours
- Initial assessment within 7 days
- Regular updates on fix progress
- Credit in security advisory (if desired)

## Security Considerations

### Smart Contract Security

⚠️ **Important:** This contract has NOT been professionally audited.

**Known Limitations:**
- No pausability mechanism
- No upgrade functionality
- Owner can recover stuck funds

**Security Features:**
- ✅ ReentrancyGuard on all state-changing functions
- ✅ SafeERC20 for token operations
- ✅ Input validation on all parameters
- ✅ Non-custodial design
- ✅ Comprehensive test coverage

### Best Practices

#### For Users

1. **Verify Addresses**
   - Always double-check recipient addresses
   - Use address book or ENS names
   - Test with small amounts first

2. **Token Approvals**
   - Only approve the exact amount needed
   - Revoke approvals after use if desired
   - Monitor approval transactions

3. **Transaction Safety**
   - Verify transaction details before signing
   - Check network (testnet vs mainnet)
   - Ensure sufficient gas

4. **Private Keys**
   - Never share your private key
   - Use hardware wallets for large amounts
   - Keep seed phrases secure

#### For Developers

1. **Environment Variables**
   - Never commit `.env` files
   - Use `.env.example` for templates
   - Rotate keys if exposed

2. **Deployment**
   - Test thoroughly on testnet
   - Verify contract source code
   - Document deployed addresses

3. **Updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Review dependency changes

## Smart Contract Risks

### General Risks

1. **Smart Contract Risk**
   - Code may contain bugs
   - No professional audit conducted
   - Use at your own risk

2. **Network Risk**
   - Ink L2 protocol changes
   - Network congestion
   - RPC node issues

3. **Token Risk**
   - Malicious token contracts
   - Non-standard ERC20 implementations
   - Token contract bugs

### Specific Considerations

#### Token Dispersal
- Ensure token contract is legitimate
- Verify token decimal places
- Check token balance before dispersal
- Consider token transfer fees

#### ETH Dispersal
- Account for gas costs
- Verify recipient addresses can receive ETH
- Consider sending to contract addresses

## Webapp Security

### Client-Side Security

1. **Wallet Connection**
   - Only connect to trusted dapps
   - Review requested permissions
   - Disconnect when done

2. **Transaction Signing**
   - Read transaction details carefully
   - Verify amounts and recipients
   - Check gas fees

3. **Browser Security**
   - Use updated browsers
   - Install security extensions
   - Be cautious of phishing

### RPC Security

- Default RPC URLs are public
- Consider using private RPC for privacy
- Be aware of RPC rate limits

## Incident Response

### If You Suspect a Security Issue

1. **Stop Using** the affected feature
2. **Document** what you observed
3. **Report** following the process above
4. **Monitor** your wallet for unusual activity

### If Funds Are Lost

- Smart contract transactions are **irreversible**
- Double-check all parameters before confirming
- Consider recovery options (if any)

## Security Checklist

Before using in production:

- [ ] Contract deployed to correct network
- [ ] Contract address verified
- [ ] Small test transaction completed successfully
- [ ] Recipient addresses verified
- [ ] Token approvals understood
- [ ] Gas costs acceptable
- [ ] Private keys secured
- [ ] Backup/recovery plan in place

## Disclaimer

This software is provided "as is" without warranty of any kind. The developers are not responsible for:

- Lost funds due to user error
- Smart contract vulnerabilities
- Network issues or downtime
- Third-party service failures
- Regulatory or legal issues

**USE AT YOUR OWN RISK**

## Security Resources

- [OpenZeppelin Security](https://docs.openzeppelin.com/contracts/security)
- [Ethereum Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- [Web3 Security Guide](https://ethereum.org/en/security/)

## Updates

This security policy may be updated periodically. Check for the latest version before use.

Last Updated: 2024-11-26
