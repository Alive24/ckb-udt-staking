import { 
  ProtocolData, 
  UIProtocolInfo, 
  UIProtocolStats, 
  EndorserInfo, 
  ProtocolAdmin, 
  ProtocolGovernance, 
  ProtocolSecurity, 
  ProtocolMetrics 
} from "@/lib/types/protocol";

// Mock Protocol Data (Raw blockchain data structure)
export const mockProtocolData: ProtocolData = {
  programs_approved: [
    "0xprogram_1_hash", // USDC Staking
    "0xprogram_2_hash", // BTC/CKB LP
    "0xprogram_3_hash", // Long-term CKB
  ],
  endorsers_whitelist: [
    "0x1234567890abcdef1234567890abcdef12345678", // Nervos Foundation
    "0xabcdef1234567890abcdef1234567890abcdef12", // Community Lead 1
    "0x567890abcdef1234567890abcdef1234567890ab", // Community Lead 2
    "0xdef1234567890abcdef1234567890abcdef123456", // Developer DAO
    "0x4567890abcdef1234567890abcdef1234567890a", // Security Auditor
  ],
  last_updated: Date.now(),
  protocol_config: {
    admin_lock_hash_vec: [
      "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8", // Primary Admin
      "0x8ad6df6e3dcf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3ccf7", // Secondary Admin
    ],
    script_code_hashes: {
      ckb_boost_protocol_type_code_hash: "0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
      ckb_boost_protocol_lock_code_hash: "0xb2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567a",
      ckb_boost_campaign_type_code_hash: "0xc3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2",
      ckb_boost_campaign_lock_code_hash: "0xd4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2c3",
      ckb_boost_user_type_code_hash: "0xe5f6789012345678901234567890abcdef1234567890abcdef1234567ab2c3d4",
    },
  },
};

// Mock Protocol Statistics
export const mockProtocolStats: UIProtocolStats = {
  totalPrograms: 3,
  activePrograms: 3,
  totalValueLocked: "$48,571,250", // Sum of all program TVL
  totalParticipants: 1903, // Sum of all program participants
  totalRewardsDistributed: "$2,847,500",
  protocolVersion: "v1.2.1",
  lastUpdate: "2024-01-15T10:30:00Z",
};

// Mock Endorsers
export const mockEndorsers: EndorserInfo[] = [
  {
    address: "0x1234567890abcdef1234567890abcdef12345678",
    name: "Nervos Foundation",
    verified: true,
    endorsedPrograms: 3,
    joinDate: "2023-06-01",
    reputation: 98,
  },
  {
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    name: "Community Lead Alpha",
    verified: true,
    endorsedPrograms: 2,
    joinDate: "2023-08-15",
    reputation: 92,
  },
  {
    address: "0x567890abcdef1234567890abcdef1234567890ab",
    name: "Community Lead Beta",
    verified: true,
    endorsedPrograms: 2,
    joinDate: "2023-09-20",
    reputation: 89,
  },
  {
    address: "0xdef1234567890abcdef1234567890abcdef123456",
    name: "Developer DAO",
    verified: true,
    endorsedPrograms: 1,
    joinDate: "2023-10-10",
    reputation: 94,
  },
  {
    address: "0x4567890abcdef1234567890abcdef1234567890a",
    name: "Security Auditor Prime",
    verified: true,
    endorsedPrograms: 3,
    joinDate: "2023-07-05",
    reputation: 96,
  },
];

// Mock Protocol Admins
export const mockProtocolAdmins: ProtocolAdmin[] = [
  {
    address: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
    name: "Protocol Owner",
    role: "owner",
    permissions: [
      "manage_admins",
      "update_config",
      "approve_programs",
      "manage_endorsers",
      "emergency_pause",
      "upgrade_protocol",
    ],
    lastActive: "2024-01-15T09:45:00Z",
  },
  {
    address: "0x8ad6df6e3dcf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3ccf7",
    name: "Technical Admin",
    role: "admin",
    permissions: [
      "approve_programs",
      "manage_endorsers",
      "update_config",
      "view_analytics",
    ],
    lastActive: "2024-01-15T08:20:00Z",
  },
  {
    address: "0x7cd6ef5e2dcf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3ccg8",
    name: "Community Moderator",
    role: "moderator",
    permissions: [
      "view_analytics",
      "moderate_discussions",
      "assist_users",
    ],
    lastActive: "2024-01-15T07:15:00Z",
  },
];

// Mock Governance Data
export const mockProtocolGovernance: ProtocolGovernance = {
  proposalCount: 12,
  activeProposals: 2,
  votingPower: "15,420,000 CKB",
  participationRate: 67.5,
  lastProposalId: "PROP-2024-003",
};

// Mock Security Data
export const mockProtocolSecurity: ProtocolSecurity = {
  auditStatus: "completed",
  auditDate: "2023-12-01",
  auditFirm: "BlockSec",
  securityScore: 94,
  vulnerabilities: {
    critical: 0,
    high: 0,
    medium: 1,
    low: 3,
  },
};

// Mock Metrics
export const mockProtocolMetrics: ProtocolMetrics = {
  dailyActiveUsers: 245,
  weeklyVolume: "$3,247,500",
  monthlyVolume: "$14,850,000",
  avgTransactionSize: "$1,250",
  networkFees: "$2,840",
  uptimePercentage: 99.8,
};

// Complete UI Protocol Info
export const mockUIProtocolInfo: UIProtocolInfo = {
  stats: mockProtocolStats,
  endorsers: mockEndorsers,
  admins: mockProtocolAdmins,
  governance: mockProtocolGovernance,
  security: mockProtocolSecurity,
  metrics: mockProtocolMetrics,
  config: mockProtocolData.protocol_config,
  lastUpdated: mockProtocolData.last_updated,
};

// Helper function to get protocol stats summary
export const getProtocolSummary = () => ({
  totalPrograms: mockProtocolStats.totalPrograms,
  activePrograms: mockProtocolStats.activePrograms,
  totalValueLocked: mockProtocolStats.totalValueLocked,
  securityScore: mockProtocolSecurity.securityScore,
  uptimePercentage: mockProtocolMetrics.uptimePercentage,
  endorserCount: mockEndorsers.length,
  adminCount: mockProtocolAdmins.length,
});

// Helper function to get recent activity
export const getRecentProtocolActivity = () => [
  {
    id: "activity_1",
    type: "program_approved",
    title: "New staking program approved",
    description: "Long-term CKB Holders program has been approved by governance",
    timestamp: Date.now() - 3600000, // 1 hour ago
    actor: "Community Lead Alpha",
  },
  {
    id: "activity_2", 
    type: "endorser_added",
    title: "New endorser added",
    description: "Security Auditor Prime has been added to the endorsers whitelist",
    timestamp: Date.now() - 7200000, // 2 hours ago
    actor: "Protocol Owner",
  },
  {
    id: "activity_3",
    type: "config_updated",
    title: "Protocol configuration updated",
    description: "Script code hashes have been updated to latest version",
    timestamp: Date.now() - 14400000, // 4 hours ago
    actor: "Technical Admin",
  },
  {
    id: "activity_4",
    type: "security_audit",
    title: "Security audit completed",
    description: "Q4 2023 security audit completed with score of 94/100",
    timestamp: Date.now() - 86400000, // 1 day ago
    actor: "BlockSec",
  },
];

// Helper function to get governance proposals
export const getActiveProposals = () => [
  {
    id: "PROP-2024-003",
    title: "Increase Maximum Staking Duration",
    description: "Proposal to increase maximum staking duration from 180 days to 365 days for long-term programs",
    status: "active",
    votesFor: "8,420,000 CKB",
    votesAgainst: "1,240,000 CKB", 
    totalVotes: "9,660,000 CKB",
    endDate: "2024-01-20T23:59:59Z",
    proposer: "Community Lead Beta",
  },
  {
    id: "PROP-2024-002",
    title: "Add Support for Native Assets",
    description: "Enable staking of native CKB assets directly without wrapping",
    status: "active",
    votesFor: "12,150,000 CKB",
    votesAgainst: "2,890,000 CKB",
    totalVotes: "15,040,000 CKB", 
    endDate: "2024-01-18T23:59:59Z",
    proposer: "Developer DAO",
  },
];