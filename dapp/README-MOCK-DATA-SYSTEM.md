# Complete Mock Data Provider System

This document provides an overview of the comprehensive mock data provider system for the CKB UDT Staking dApp.

## System Overview

The mock data provider system consists of two main components:

1. **Program Data Providers** - Manage staking programs and user positions
2. **Protocol Data Providers** - Manage protocol governance, administration, and analytics

Both systems follow the same architectural pattern and provide seamless switching between mock and real blockchain data.

## Architecture Pattern

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Components    │────│    Providers     │────│    Services     │
│  (UI Layer)     │    │  (Data Layer)    │    │ (Implementation)│
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
            ┌───────▼────┐    ┌─────────▼──────┐
            │ Mock Data  │    │ CKB Blockchain │
            │ Provider   │    │   Provider     │
            └────────────┘    └────────────────┘
```

## File Structure

```
dapp/
├── lib/
│   ├── types/
│   │   ├── program.ts          # Program & user data types
│   │   └── protocol.ts         # Protocol & governance data types
│   ├── mock-data/
│   │   ├── programs.ts         # Mock program & user data
│   │   └── protocol.ts         # Mock protocol & governance data
│   ├── providers/
│   │   ├── program-provider.tsx    # Program data context
│   │   └── protocol-provider.tsx   # Protocol data context  
│   ├── hooks/
│   │   ├── use-program-data.ts     # Program data hooks
│   │   └── use-protocol-data.ts    # Protocol data hooks
│   └── services/
│       ├── program-service.ts      # Program service layer
│       └── protocol-service.ts     # Protocol service layer
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── programs/page.tsx       # Programs listing (updated)
│   ├── dashboard/page.tsx      # User dashboard (updated)
│   └── protocol/page.tsx       # Protocol dashboard (new)
├── .env.local                  # Environment configuration
└── README-*.md                 # Documentation
```

## Quick Start

### 1. Environment Setup

The system uses mock data by default. To switch between mock and real data:

```bash
# Use mock data (default)
NEXT_PUBLIC_USE_MOCK_DATA=true

# Use real CKB blockchain data
NEXT_PUBLIC_USE_MOCK_DATA=false
NEXT_PUBLIC_CKB_RPC_URL=https://mainnet.ckb.dev
NEXT_PUBLIC_CKB_INDEXER_URL=https://mainnet.ckb.dev/indexer
```

### 2. Basic Usage in Components

#### Program Data
```tsx
import { useProgramData } from "@/lib/providers/program-provider";

function MyComponent() {
  const { uiPrograms, userPositions, loading, error } = useProgramData();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h2>Programs: {uiPrograms.length}</h2>
      <h2>My Positions: {userPositions.length}</h2>
    </div>
  );
}
```

#### Protocol Data
```tsx
import { useProtocolData } from "@/lib/providers/protocol-provider";

function ProtocolComponent() {
  const { protocolInfo, endorsers, admins, loading } = useProtocolData();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>Total Programs: {protocolInfo?.stats.totalPrograms}</h2>
      <h2>Endorsers: {endorsers.length}</h2>
      <h2>Admins: {admins.length}</h2>
    </div>
  );
}
```

## Available Pages

### 1. Programs Page (`/programs`)
- **Updated**: Now uses program provider system
- **Features**: Program listing, filtering, staking interface
- **Data**: 3 mock staking programs (USDC, BTC/CKB LP, CKB)
- **Status**: Loading states, error handling, real-time updates

### 2. Dashboard Page (`/dashboard`)  
- **Updated**: Integrated with program provider (with adapter)
- **Features**: User positions, rewards tracking, staking management
- **Data**: 2 mock user positions with realistic amounts and rewards
- **Status**: Full backward compatibility maintained

### 3. Protocol Page (`/protocol`) - **NEW**
- **Features**: Protocol governance, admin management, analytics
- **Tabs**: Overview, Endorsers, Admins, Governance, Security
- **Data**: Complete protocol information with 5 endorsers, 3 admins
- **Operations**: Add/remove endorsers, manage permissions, vote on proposals

## Mock Data Features

### Program Data
- **3 Active Programs**: USDC (12.5% APY), BTC/CKB LP (24.8% APY), CKB (8.2% APY)
- **2 User Positions**: $7,500 staked with $164 rewards
- **Realistic Metrics**: TVL, participants, time remaining, progress tracking
- **Different Statuses**: Active, upcoming, completed programs

### Protocol Data
- **5 Endorsers**: Nervos Foundation, community leads, security auditors
- **3 Admin Levels**: Owner, admin, moderator with different permissions
- **Governance**: 12 proposals total, 2 active, 67.5% participation rate
- **Security**: 94/100 score, completed audit, vulnerability breakdown
- **Analytics**: DAU, volume, uptime, transaction metrics

### Real-time Updates
- **Program Updates**: Every 10 seconds (progress, APY changes)
- **Protocol Updates**: Every 15 seconds (TVL, user metrics)
- **Transaction Simulation**: 1-3 second delays for operations

## Integration Benefits

### For Development
1. **Immediate Development**: Start building UI with realistic data
2. **No Dependencies**: No need for blockchain connection during development
3. **Consistent Testing**: Predictable data for component testing
4. **Edge Case Testing**: Mock data includes various scenarios and states

### For Production
1. **Seamless Migration**: Single environment variable switches to real data
2. **Type Safety**: All data structures strongly typed with TypeScript
3. **Error Handling**: Built-in loading and error states
4. **Performance**: Optimized with React context and memoization

### For Maintenance
1. **Clean Architecture**: Clear separation between UI, providers, and services
2. **Modular Design**: Easy to extend with new data types and operations
3. **Documentation**: Comprehensive documentation for all components
4. **Testing**: Easy to mock and test individual components

## CKB Integration Path

When ready for real blockchain integration:

### 1. Set Environment Variables
```bash
NEXT_PUBLIC_USE_MOCK_DATA=false
```

### 2. Implement Service Methods
```typescript
// lib/services/program-service.ts
export class CKBProgramService implements ProgramServiceInterface {
  async getAllPrograms(): Promise<ProgramData[]> {
    // Query CKB blockchain for program cells
    // Parse Molecule data structures  
    // Return structured program data
  }
  
  // ... implement other methods
}

// lib/services/protocol-service.ts
export class CKBProtocolService implements ProtocolServiceInterface {
  async getProtocolData(): Promise<ProtocolData> {
    // Query protocol cell from blockchain
    // Parse Molecule-encoded ProtocolData
    // Return structured data
  }
  
  // ... implement other methods
}
```

### 3. Add Wallet Integration
- Connect with CKB-CCC for wallet operations
- Handle transaction signing and submission
- Implement real-time blockchain event listening

### 4. No Component Changes Required
- All UI components continue to work unchanged
- Same hooks and providers interface
- Automatic loading states and error handling

## Documentation Links

- **[Program Providers System](./README-PROVIDERS.md)** - Detailed guide for program data management
- **[Protocol Providers System](./README-PROTOCOL-PROVIDERS.md)** - Complete protocol governance documentation
- **[Molecule Schema](../schemas/ckb-udt-staking.mol)** - Data structure definitions

## Testing

### Mock Data Testing
```bash
npm run dev
# Visit http://localhost:3000/programs - Programs listing
# Visit http://localhost:3000/dashboard - User dashboard  
# Visit http://localhost:3000/protocol - Protocol governance
```

### Component Testing
```tsx
import { render } from '@testing-library/react';
import { ProgramProvider } from '@/lib/providers/program-provider';
import { ProtocolProvider } from '@/lib/providers/protocol-provider';

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <ProtocolProvider>
      <ProgramProvider>
        {ui}
      </ProgramProvider>
    </ProtocolProvider>
  );
}
```

## Performance Considerations

### Context Optimization
- Providers use React.memo and useMemo for optimization
- Separate contexts prevent unnecessary re-renders
- Efficient data fetching with proper dependency arrays

### Data Management
- Local state updates for optimistic UI updates
- Background refresh for real-time sync
- Error boundaries for graceful failure handling

### Memory Usage
- Controlled mock data size (reasonable number of items)
- Proper cleanup of intervals and subscriptions
- Efficient data structures and algorithms

## Security Considerations

### Mock Data Safety
- No real private keys or sensitive data in mock files
- All mock addresses are clearly fake/example addresses
- Mock transaction hashes use proper format but are random

### Production Ready
- Environment variable validation
- Proper error handling for network failures
- Input sanitization for user-provided data
- Rate limiting considerations for API calls

This comprehensive mock data system provides a solid foundation for developing the complete CKB UDT Staking application while maintaining clean architecture and easy migration to real blockchain integration.