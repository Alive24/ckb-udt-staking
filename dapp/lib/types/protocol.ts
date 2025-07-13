// Protocol Types based on Molecule Schema

export interface ProtocolConfig {
  admin_lock_hash_vec: string[];
  script_code_hashes: {
    ckb_boost_protocol_type_code_hash: string;
    ckb_boost_protocol_lock_code_hash: string;
    ckb_boost_campaign_type_code_hash: string;
    ckb_boost_campaign_lock_code_hash: string;
    ckb_boost_user_type_code_hash: string;
  };
}

export interface ProtocolData {
  programs_approved: string[]; // Array of program IDs
  endorsers_whitelist: string[];
  last_updated: number;
  protocol_config: ProtocolConfig;
}

// UI-specific types for protocol management
export interface UIProtocolStats {
  totalPrograms: number;
  activePrograms: number;
  totalValueLocked: string;
  totalParticipants: number;
  totalRewardsDistributed: string;
  protocolVersion: string;
  lastUpdate: string;
}

export interface EndorserInfo {
  address: string;
  name?: string;
  verified: boolean;
  endorsedPrograms: number;
  joinDate: string;
  reputation: number; // 0-100
}

export interface ProtocolAdmin {
  address: string;
  name?: string;
  role: "owner" | "admin" | "moderator";
  permissions: string[];
  lastActive: string;
}

export interface ProtocolGovernance {
  proposalCount: number;
  activeProposals: number;
  votingPower: string;
  participationRate: number;
  lastProposalId?: string;
}

export interface ProtocolSecurity {
  auditStatus: "pending" | "in-progress" | "completed" | "failed";
  auditDate?: string;
  auditFirm?: string;
  securityScore: number; // 0-100
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export interface ProtocolMetrics {
  dailyActiveUsers: number;
  weeklyVolume: string;
  monthlyVolume: string;
  avgTransactionSize: string;
  networkFees: string;
  uptimePercentage: number;
}

// Complete protocol information for dashboard
export interface UIProtocolInfo {
  stats: UIProtocolStats;
  endorsers: EndorserInfo[];
  admins: ProtocolAdmin[];
  governance: ProtocolGovernance;
  security: ProtocolSecurity;
  metrics: ProtocolMetrics;
  config: ProtocolConfig;
  lastUpdated: number;
}