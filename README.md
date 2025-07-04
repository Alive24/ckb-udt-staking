# CKB UDT Staking Framework

A universal, fully decentralized infrastructure that enables any UDT token project to implement comprehensive staking reward programs on the Nervos CKB blockchain.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with CKB](https://img.shields.io/badge/Built%20with-CKB-blue.svg)](https://www.nervos.org/)
[![Frontend: Next.js](https://img.shields.io/badge/Frontend-Next.js-black.svg)](https://nextjs.org/)
[![Smart Contracts: Rust](https://img.shields.io/badge/Smart%20Contracts-Rust-orange.svg)](https://www.rust-lang.org/)

## Overview

The CKB UDT Staking Framework solves the fundamental problem of lacking standardized, decentralized staking and reward distribution infrastructure in the CKB ecosystem. It provides a **set-and-forget** solution where token projects can create staking reward programs with configurable parameters, enabling both traditional possession-based rewards and liquid staking capabilities.

### Key Value Propositions

- **Universal Framework**: Works with any UDT token through configurable addresses
- **Fully Decentralized**: No admin controls, time-locked configurations prevent manipulation
- **Dual Reward Models**: Traditional possession-based rewards (MVP) and liquid staking (future)
- **Set-and-Forget**: No ongoing management required after setup
- **Trigger-Based**: Public APIs for all processes - anyone can trigger operations
- **On-Chain Everything**: All data stored in CKB cells, no external databases needed

## Features

### 🎯 Current (Phase 1): Possession-Based Rewards

- **Possession Across Time Periods**: Reward token holders based on their holdings across defined periods
- **No New Token Minting**: Works with existing token holdings, already staked tokens, or specific lock code hashes
- **Snapshot-Based Tracking**: Periodic snapshots to evaluate average token possession during periods
- **Public Trigger System**: Anyone can trigger snapshots and distributions following verification rules
- **Deposit-Based Model**: Projects deposit total reward amounts upfront for specific periods
- **Automated Distribution**: Rewards automatically distributed at period conclusion

### 🚀 Planned (Phase 2): Liquid Staking

- **Actual Liquid Staking**: Users stake UDT tokens and receive LST tokens representing positions
- **CKB Time-Lock Integration**: Support for time-lock mechanisms to enforce staking periods
- **Continuous Pool Rewards**: Projects can deposit rewards anytime to enhance LST exchange ratio
- **Secondary Market Support**: LST trading while maintaining underlying staked positions

### 🔧 Technical Features

- **Single-Token Programs**: Each staking reward program configures rewards for one specific UDT token
- **Multi-Signature Configuration**: Public key-based setup with time-locked immutability
- **Trigger-Based Architecture**: Netlify Functions for public trigger APIs
- **Universal Dashboard**: Real-time monitoring for staking positions and rewards

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│              Next.js + Tailwind CSS + CCC                  │
│                    (Deployed on Netlify)                   │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────┼───────────────────────────────────┐
│                    Trigger APIs                             │
│              Netlify Functions (Public APIs)               │
│          Anyone can trigger snapshots/distributions        │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────┼───────────────────────────────────┐
│                   CKB Blockchain                           │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   Smart Contracts │  │   CKB Cells     │  │   SSRI      │  │
│  │   (Rust + ckb-std)│  │   (On-chain     │  │   Protocol  │  │
│  │                   │  │    Storage)     │  │             │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Rust and Cargo
- CKB node access (testnet/mainnet)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Alive24/ckb-udt-staking.git
   cd ckb-udt-staking
   ```

2. **Install frontend dependencies**

   ```bash
   cd dApp
   npm install
   ```

3. **Set up smart contracts**

   ```bash
   cd scripts
   make build
   ```

4. **Configure environment**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your CKB node settings
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see the application.

## Usage

### For Token Projects (Creating Staking Reward Programs)

1. **Access Framework**: Connect your wallet to the framework
2. **Configure Program**: Set up your UDT token address and reward parameters
3. **Select Reward Model**: Choose possession-based rewards (current) or liquid staking (future)
4. **Multi-Sig Setup**: Configure multi-signature validation for decentralized governance
5. **Launch Program**: Deploy your time-locked staking reward program

### For Token Holders (Participating in Rewards)

1. **Connect Wallet**: Link your CKB wallet with automatic UDT token detection
2. **Check Eligibility**: View your token holdings and eligible reward periods
3. **Monitor Snapshots**: Track periodic snapshots of your token possession
4. **Claim Rewards**: Collect distributed rewards when periods conclude

### For Trigger Users (Operating the System)

1. **Monitor Processes**: Check which snapshots or distributions need triggering
2. **Trigger Snapshots**: Call public APIs to trigger possession snapshots
3. **Trigger Distributions**: Initiate reward distributions at period conclusion
4. **Pay Gas Costs**: Trigger initiators pay for transaction costs

## API Reference

### Public Trigger APIs

All APIs are publicly accessible Netlify Functions:

- `POST /api/trigger/snapshot` - Trigger possession snapshot
- `POST /api/trigger/distribution` - Trigger reward distribution
- `POST /api/trigger/validation` - Trigger data validation
- `GET /api/status/periods` - Get period status information
- `GET /api/status/snapshots` - Get snapshot history

### CKB Cell Data APIs

- `GET /api/cells/config` - Read token configuration cells
- `GET /api/cells/periods` - Read reward period cells
- `GET /api/cells/snapshots` - Read possession snapshot cells
- `GET /api/cells/positions` - Read staking position cells

## Development Roadmap

### ✅ Phase 1: Possession-Based Reward Framework (Current)

- [ ] Generic UDT framework foundation
- [ ] Public key-based configuration system
- [ ] Possession tracking across time periods
- [ ] Snapshot triggering system with public APIs
- [ ] Dashboard and analytics interface
- [ ] Comprehensive testing and audits

### 🔄 Phase 2: Liquid Staking Infrastructure (TBD)

- [ ] CKB time-lock system integration
- [ ] Liquid staking token (LST) contracts
- [ ] Continuous pool reward system
- [ ] Secondary market support
- [ ] Enhanced dashboard with LST features

### 📋 Phase 3: Advanced Features (TBD)

- [ ] Multiple simultaneous periods
- [ ] Advanced analytics and optimization
- [ ] Mobile-responsive PWA
- [ ] Performance optimizations

### 🌍 Phase 4: Ecosystem Expansion (TBD)

- [ ] Multi-language support
- [ ] Developer documentation
- [ ] DeFi protocol integrations
- [ ] Community templates

## Technical Stack

### Frontend

- **Framework**: Next.js 18+ with React 18+
- **Styling**: Tailwind CSS
- **Wallet Integration**: CCC (CKB Connector & Components)
- **Language**: TypeScript 5+
- **Deployment**: Netlify

### Smart Contracts

- **Language**: Rust with ckb-std library
- **Protocol**: SSRI Protocol integration
- **Storage**: CKB cells for all data
- **Testing**: Custom CKB testing utilities

### Infrastructure

- **APIs**: Netlify Functions (serverless)
- **Node Access**: CKB testnet/mainnet nodes
- **Monitoring**: Automated health checks
- **CDN**: Global asset delivery

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Quality

- Follow ESLint and Prettier configurations
- Write comprehensive tests for smart contracts
- Document all public APIs and functions
- Follow security best practices

## Security

(TBD)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

(TBD)

## Acknowledgments

- [Nervos CKB](https://www.nervos.org/) - The foundational blockchain infrastructure
- [CCC](https://github.com/ckb-ecofund/ccc) - CKB Connector & Components library
- [SSRI Protocol](https://github.com/ckb-ecofund/ckb-ssri) - Staking reward infrastructure
- The CKB community for feedback and support

---
