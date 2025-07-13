# Data Providers System

This document explains how the mock data provider system works and how to switch to real CKB blockchain integration.

## Architecture Overview

The application uses a provider-based architecture that allows easy switching between mock data and real blockchain data:

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

## Key Files

### Types
- `lib/types/program.ts` - TypeScript interfaces for all data structures

### Mock Data
- `lib/mock-data/programs.ts` - Mock program and user position data
- `lib/providers/program-provider.tsx` - React context provider
- `lib/hooks/use-program-data.ts` - React hooks for data access

### Services
- `lib/services/program-service.ts` - Service layer with mock and CKB implementations

## Using the System

### Current Setup (Mock Data)

The application currently uses mock data by default. All components get data through the provider:

```tsx
// In any component
import { useProgramData } from "@/lib/providers/program-provider";

function MyComponent() {
  const { uiPrograms, userPositions, loading, error } = useProgramData();
  
  // Use the data...
}
```

### Switching to Real CKB Data

To switch to real blockchain data:

1. **Set Environment Variable**:
   ```bash
   # In .env.local
   NEXT_PUBLIC_USE_MOCK_DATA=false
   NEXT_PUBLIC_CKB_RPC_URL=https://mainnet.ckb.dev
   NEXT_PUBLIC_CKB_INDEXER_URL=https://mainnet.ckb.dev/indexer
   ```

2. **Implement CKB Service Methods**:
   The `CKBProgramService` class in `lib/services/program-service.ts` needs implementation:
   ```typescript
   export class CKBProgramService implements ProgramServiceInterface {
     async getAllPrograms(): Promise<ProgramData[]> {
       // Implement: Query CKB blockchain for program cells
       // Parse Molecule data structures
       // Return structured program data
     }
     
     async getUserPositions(userAddress?: string): Promise<UserPosition[]> {
       // Implement: Query user's staking positions from blockchain
     }
     
     async stakeTokens(programId: string, amount: string, userAddress: string): Promise<string> {
       // Implement: Build and submit staking transaction
     }
     
     // ... other methods
   }
   ```

## Data Flow

### Mock Data Flow
```
Component → useProgramData() → ProgramProvider → MockProgramService → Mock Data
```

### Real Data Flow (When Implemented)
```
Component → useProgramData() → ProgramProvider → CKBProgramService → CKB Blockchain
```

## Data Structures

### Raw Blockchain Data (`ProgramData`)
Mirrors the Molecule schema structures:
```typescript
interface ProgramData {
  id: string;
  creator: Script;
  metadata: ProgramMetadata;
  config: ProgramConfig;
  status: number;
}
```

### UI-Friendly Data (`UIProgram`)
Simplified for component consumption:
```typescript
interface UIProgram {
  id: string;
  name: string;
  description: string;
  token: string;
  apy: string;
  totalStaked: string;
  participants: number;
  status: "active" | "upcoming" | "completed";
}
```

## Provider Features

### Loading States
```tsx
const { loading, error, data } = useProgramData();

if (loading) return <Spinner />;
if (error) return <ErrorMessage error={error} />;
return <DataDisplay data={data} />;
```

### Real-time Updates
```tsx
// Automatic updates when blockchain state changes
const { refreshData } = useProgramData();

// Manual refresh
await refreshData();
```

### Transaction Operations
```tsx
const { stakeTokens, unstakeTokens, claimRewards } = useProgramData();

// Stake tokens
const result = await stakeTokens("program_id", "1000", "user_address");
if (result.success) {
  console.log("Transaction hash:", result.txHash);
}
```

## Mock Data Structure

The mock data includes:

1. **3 Active Programs**:
   - USDC Staking (12.5% APY)
   - BTC/CKB LP Staking (24.8% APY) 
   - Long-term CKB Holders (8.2% APY)

2. **2 User Positions**:
   - 5,000 USDC staked
   - 2.45 BTC/CKB LP staked

3. **Realistic Scenarios**:
   - Different APY rates
   - Various time remaining
   - Progress tracking
   - Reward calculations

## Integration Checklist

When implementing real CKB integration:

- [ ] Implement `CKBProgramService` methods
- [ ] Add CKB transaction building logic
- [ ] Implement Molecule data parsing
- [ ] Add wallet integration (CKB-CCC)
- [ ] Add error handling for network issues
- [ ] Add transaction status tracking
- [ ] Add real-time blockchain updates
- [ ] Test with CKB testnet
- [ ] Update environment configuration

## Testing

### Mock Data Testing
```bash
# Run with mock data (default)
npm run dev
```

### CKB Integration Testing
```bash
# Set environment for testnet
NEXT_PUBLIC_USE_MOCK_DATA=false
NEXT_PUBLIC_CKB_RPC_URL=https://testnet.ckb.dev
npm run dev
```

## Benefits

1. **Development Speed**: Start building UI immediately with mock data
2. **Easy Testing**: Predictable mock data for component testing  
3. **Seamless Migration**: Switch to real data by changing one environment variable
4. **Type Safety**: All data structures are strongly typed
5. **Consistent Interface**: Same API whether using mock or real data

This architecture allows the frontend to be fully functional with mock data while the blockchain integration is being developed, then seamlessly switch over when ready.