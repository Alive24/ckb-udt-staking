# Protocol Data Providers System

This document explains the comprehensive protocol data provider system for managing CKB UDT Staking Protocol governance, administration, and analytics.

## Architecture Overview

The protocol provider system follows the same architecture as the program providers but focuses on protocol-level operations:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Components    │────│  Protocol        │────│    Services     │
│  (UI Layer)     │    │  Providers       │    │ (Implementation)│
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
- `lib/types/protocol.ts` - Complete TypeScript interfaces for protocol data structures

### Mock Data
- `lib/mock-data/protocol.ts` - Comprehensive mock protocol data including:
  - Protocol configuration and statistics
  - Endorser and admin information
  - Governance proposals and voting data
  - Security audit results and metrics
  - Recent activity and analytics

### Providers
- `lib/providers/protocol-provider.tsx` - React context provider for protocol data
- `lib/hooks/use-protocol-data.ts` - Specialized hooks for different protocol operations

### Services
- `lib/services/protocol-service.ts` - Service layer with mock and CKB implementations

## Data Structures

### Core Protocol Data

#### Raw Protocol Data (`ProtocolData`)
Mirrors the Molecule schema from `/schemas/ckb-udt-staking.mol`:

```typescript
interface ProtocolData {
  programs_approved: string[];       // Array of approved program IDs
  endorsers_whitelist: string[];     // Array of endorser addresses
  last_updated: number;              // Last update timestamp
  protocol_config: ProtocolConfig;   // Configuration settings
}
```

#### Protocol Configuration (`ProtocolConfig`)
```typescript
interface ProtocolConfig {
  admin_lock_hash_vec: string[];     // Admin lock hashes
  script_code_hashes: {              // Contract code hashes
    ckb_boost_protocol_type_code_hash: string;
    ckb_boost_protocol_lock_code_hash: string;
    ckb_boost_campaign_type_code_hash: string;
    ckb_boost_campaign_lock_code_hash: string;
    ckb_boost_user_type_code_hash: string;
  };
}
```

### UI-Friendly Data Structures

#### Complete Protocol Information (`UIProtocolInfo`)
```typescript
interface UIProtocolInfo {
  stats: UIProtocolStats;           // Overview statistics
  endorsers: EndorserInfo[];        // Endorser details
  admins: ProtocolAdmin[];          // Administrator information
  governance: ProtocolGovernance;   // Governance data
  security: ProtocolSecurity;       // Security metrics
  metrics: ProtocolMetrics;         // Performance metrics
  config: ProtocolConfig;           // Raw configuration
  lastUpdated: number;              // Last update timestamp
}
```

#### Protocol Statistics (`UIProtocolStats`)
```typescript
interface UIProtocolStats {
  totalPrograms: number;            // Total number of programs
  activePrograms: number;           // Currently active programs
  totalValueLocked: string;         // TVL across all programs
  totalParticipants: number;        // Total unique participants
  totalRewardsDistributed: string;  // Total rewards paid out
  protocolVersion: string;          // Current protocol version
  lastUpdate: string;               // Last update timestamp
}
```

#### Endorser Information (`EndorserInfo`)
```typescript
interface EndorserInfo {
  address: string;                  // Endorser wallet address
  name?: string;                    // Optional display name
  verified: boolean;                // Verification status
  endorsedPrograms: number;         // Number of programs endorsed
  joinDate: string;                 // Date joined as endorser
  reputation: number;               // Reputation score (0-100)
}
```

#### Protocol Administration (`ProtocolAdmin`)
```typescript
interface ProtocolAdmin {
  address: string;                  // Admin wallet address
  name?: string;                    // Optional display name
  role: "owner" | "admin" | "moderator"; // Role level
  permissions: string[];            // Array of permission strings
  lastActive: string;               // Last activity timestamp
}
```

#### Governance Data (`ProtocolGovernance`)
```typescript
interface ProtocolGovernance {
  proposalCount: number;            // Total proposals created
  activeProposals: number;          // Currently active proposals
  votingPower: string;              // Total voting power
  participationRate: number;        // Voter participation percentage
  lastProposalId?: string;          // Most recent proposal ID
}
```

#### Security Information (`ProtocolSecurity`)
```typescript
interface ProtocolSecurity {
  auditStatus: "pending" | "in-progress" | "completed" | "failed";
  auditDate?: string;               // Audit completion date
  auditFirm?: string;               // Auditing firm name
  securityScore: number;            // Security score (0-100)
  vulnerabilities: {                // Vulnerability breakdown
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}
```

## Using the Protocol Provider System

### Basic Setup

The protocol provider is automatically included in the app layout:

```tsx
// app/layout.tsx
<ProtocolProvider>
  <ProgramProvider>
    {children}
  </ProgramProvider>
</ProtocolProvider>
```

### Using in Components

#### Complete Protocol Data
```tsx
import { useProtocolData } from "@/lib/providers/protocol-provider";

function ProtocolDashboard() {
  const {
    protocolInfo,
    endorsers,
    admins,
    governance,
    security,
    metrics,
    loading,
    error,
    refreshData
  } = useProtocolData();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div>
      <h1>Protocol Statistics</h1>
      <p>Total Programs: {protocolInfo?.stats.totalPrograms}</p>
      <p>Total Value Locked: {protocolInfo?.stats.totalValueLocked}</p>
      <p>Security Score: {security?.securityScore}/100</p>
    </div>
  );
}
```

#### Individual Hooks
```tsx
import { 
  useProtocolInfo,
  useEndorsers,
  useAdmins,
  useProtocolMetrics 
} from "@/lib/hooks/use-protocol-data";

function ProtocolMetrics() {
  const { data: protocolInfo, loading } = useProtocolInfo();
  const { endorsers } = useEndorsers();
  const { admins } = useAdmins();
  const { metrics } = useProtocolMetrics("week");

  // Use the data...
}
```

## Administrative Operations

### Endorser Management
```tsx
import { useEndorserOperations } from "@/lib/hooks/use-protocol-data";

function EndorserManagement() {
  const { addEndorser, removeEndorser, loading } = useEndorserOperations();

  const handleAddEndorser = async () => {
    const result = await addEndorser(
      "0x1234...endorser_address", 
      "0xabcd...admin_address"
    );
    
    if (result.success) {
      console.log("Endorser added:", result.txHash);
    }
  };

  const handleRemoveEndorser = async () => {
    const result = await removeEndorser(
      "0x1234...endorser_address",
      "0xabcd...admin_address"
    );
    
    if (result.success) {
      console.log("Endorser removed:", result.txHash);
    }
  };

  return (
    <div>
      <button onClick={handleAddEndorser} disabled={loading}>
        Add Endorser
      </button>
      <button onClick={handleRemoveEndorser} disabled={loading}>
        Remove Endorser
      </button>
    </div>
  );
}
```

### Admin Management
```tsx
import { useAdminOperations } from "@/lib/hooks/use-protocol-data";

function AdminManagement() {
  const { addAdmin, removeAdmin, updateAdminPermissions } = useAdminOperations();

  const handleAddAdmin = async () => {
    const result = await addAdmin(
      "0x5678...new_admin_address",
      "admin",
      "0x9abc...owner_address"
    );
    
    if (result.success) {
      console.log("Admin added:", result.txHash);
    }
  };

  const handleUpdatePermissions = async () => {
    const result = await updateAdminPermissions(
      "0x5678...admin_address",
      ["approve_programs", "manage_endorsers", "view_analytics"],
      "0x9abc...owner_address"
    );
    
    if (result.success) {
      console.log("Permissions updated:", result.txHash);
    }
  };

  // Implementation...
}
```

### Governance Operations
```tsx
import { useGovernanceOperations } from "@/lib/hooks/use-protocol-data";

function GovernanceInterface() {
  const { createProposal, voteOnProposal, loading } = useGovernanceOperations();

  const handleCreateProposal = async () => {
    const result = await createProposal(
      "Increase Maximum Staking Duration",
      "Proposal to increase maximum staking duration from 180 to 365 days",
      "0xdef0...proposer_address"
    );
    
    if (result.success) {
      console.log("Proposal created:", result.proposalId);
    }
  };

  const handleVote = async () => {
    const result = await voteOnProposal(
      "PROP-2024-003",
      "for",
      "0x1234...voter_address", 
      "5000000"
    );
    
    if (result.success) {
      console.log("Vote submitted:", result.txHash);
    }
  };

  // Implementation...
}
```

### Configuration Management
```tsx
import { useProtocolConfig } from "@/lib/hooks/use-protocol-data";

function ConfigurationPanel() {
  const { updateConfig, approveProgram, rejectProgram } = useProtocolConfig();

  const handleConfigUpdate = async () => {
    const result = await updateConfig(
      {
        admin_lock_hash_vec: ["0xnew...admin_hash"],
        script_code_hashes: {
          ckb_boost_protocol_type_code_hash: "0xnew...hash"
          // ... other hashes
        }
      },
      "0xadmin...address"
    );
    
    if (result.success) {
      console.log("Config updated:", result.txHash);
    }
  };

  const handleProgramApproval = async () => {
    const result = await approveProgram(
      "0xprogram...id",
      "0xadmin...address"
    );
    
    if (result.success) {
      console.log("Program approved:", result.txHash);
    }
  };

  // Implementation...
}
```

## Real-time Updates

### Protocol Update Subscriptions
```tsx
import { useProtocolUpdates } from "@/lib/hooks/use-protocol-data";

function LiveProtocolMetrics() {
  const updates = useProtocolUpdates();

  useEffect(() => {
    const latestUpdate = updates[updates.length - 1];
    if (latestUpdate?.type === "protocol_update") {
      // Handle real-time protocol updates
      console.log("Protocol updated:", latestUpdate.data);
    }
  }, [updates]);

  return (
    <div>
      <h3>Live Metrics</h3>
      {updates.map((update, index) => (
        <div key={index}>
          {update.type}: {JSON.stringify(update.data)}
        </div>
      ))}
    </div>
  );
}
```

## Mock Data Features

The mock data includes realistic scenarios:

### Protocol Statistics
- 3 active programs with real TVL numbers
- 1,903 total participants across programs
- 94/100 security score with completed audit
- 99.8% uptime percentage

### Endorsers (5 entities)
- Nervos Foundation (98% reputation)
- Community leaders (89-96% reputation)
- Developer DAO (94% reputation)
- Security auditor (96% reputation)

### Administrators (3 levels)
- Protocol Owner (full permissions)
- Technical Admin (program and endorser management)
- Community Moderator (analytics and moderation)

### Governance
- 12 total proposals with 2 currently active
- 67.5% participation rate
- Realistic voting power and timeframes

### Security Audit
- Completed audit by BlockSec
- 1 medium and 3 low vulnerabilities
- 94/100 security score

### Activity Timeline
- Recent program approvals
- Endorser additions
- Configuration updates
- Security audit completion

## Integration with CKB Blockchain

When implementing real CKB integration:

### CKB Service Implementation
```typescript
export class CKBProtocolService implements ProtocolServiceInterface {
  async getProtocolData(): Promise<ProtocolData> {
    // 1. Query protocol cell from CKB blockchain
    // 2. Parse Molecule-encoded ProtocolData
    // 3. Return structured data
  }

  async addEndorser(address: string, adminAddress: string): Promise<string> {
    // 1. Verify admin permissions
    // 2. Build transaction to update protocol cell
    // 3. Add endorser to whitelist
    // 4. Sign and submit transaction
    // 5. Return transaction hash
  }

  async approveProgram(programId: string, adminAddress: string): Promise<string> {
    // 1. Verify admin has approval permissions
    // 2. Build transaction to update approved programs list
    // 3. Sign and submit transaction
    // 4. Return transaction hash
  }

  // ... other methods
}
```

### Environment Configuration
```bash
# Switch to real CKB data
NEXT_PUBLIC_USE_MOCK_DATA=false
NEXT_PUBLIC_CKB_RPC_URL=https://mainnet.ckb.dev
NEXT_PUBLIC_CKB_INDEXER_URL=https://mainnet.ckb.dev/indexer
```

## Testing and Development

### Mock Data Testing
```bash
# Run with mock protocol data (default)
npm run dev
# Visit /protocol to see the protocol dashboard
```

### Real-time Updates Testing
The mock service provides real-time updates every 15 seconds with simulated:
- Active program count changes
- TVL fluctuations
- Daily active user metrics

## Benefits

1. **Complete Protocol Management**: Full administrative interface for protocol operations
2. **Rich Mock Data**: Realistic scenarios for development and testing
3. **Real-time Updates**: Live protocol metrics and activity feeds
4. **Type Safety**: Comprehensive TypeScript interfaces
5. **Modular Architecture**: Easy switching between mock and real implementations
6. **Administrative Features**: Full CRUD operations for endorsers, admins, and configuration
7. **Governance Integration**: Proposal creation and voting mechanisms
8. **Security Monitoring**: Audit results and vulnerability tracking
9. **Analytics Dashboard**: Comprehensive protocol metrics and performance indicators

This protocol provider system enables complete protocol governance and administration while maintaining the same clean architecture and easy integration path as the program providers.