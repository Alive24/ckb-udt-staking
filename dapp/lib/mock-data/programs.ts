import { ProgramData, ProtocolData, UIProgram, UserPosition } from "@/lib/types/program";

// Mock Protocol Data
export const mockProtocolData: ProtocolData = {
  programs_approved: [], // Will be populated with mockProgramsData
  endorsers_whitelist: [
    "0x1234567890abcdef1234567890abcdef12345678",
    "0xabcdef1234567890abcdef1234567890abcdef12",
  ],
  last_updated: Date.now(),
  protocol_config: {
    admin_lock_hash_vec: [
      "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
    ],
    script_code_hashes: {
      ckb_boost_protocol_type_code_hash: "0xprotocol_type_hash_here",
      ckb_boost_protocol_lock_code_hash: "0xprotocol_lock_hash_here", 
      ckb_boost_campaign_type_code_hash: "0xcampaign_type_hash_here",
      ckb_boost_campaign_lock_code_hash: "0xcampaign_lock_hash_here",
      ckb_boost_user_type_code_hash: "0xuser_type_hash_here",
    },
  },
};

// Mock Program Data (Raw blockchain data structure)
export const mockProgramsData: ProgramData[] = [
  {
    id: "0xprogram_1_hash",
    creator: {
      code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
      hash_type: "type",
      args: "0xcreator_args_1",
    },
    metadata: {
      name: "USDC Staking Rewards",
      description: "Earn rewards by staking USDC tokens. Weekly snapshots with proportional reward distribution.",
      website: "https://example.com/usdc-program",
      logo_url: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    },
    config: {
      target_token_script: {
        code_hash: "0xusdc_token_script_hash",
        hash_type: "type",
        args: "0xusdc_args",
      },
      target_token_type: 0, // regular token
      min_stake_amount: "1000000000", // 1000 USDC (6 decimals)
      reward_type: 0, // possession-based
      reward_token_script: undefined, // same as target
      distribution_type: 1, // periodic
      distribution_mode: 0, // proportional
      snapshot_interval: 604800, // 1 week in seconds
      program_duration: 7776000, // 90 days
      period_duration: 604800, // 1 week
      period_count: 12, // 12 weeks
      time_lock_option: 1, // snapshot-based lock
      creator_lock: {
        code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        hash_type: "type",
        args: "0xcreator_args_1",
      },
      admin_lock_hashes: [],
      description: "USDC staking program with weekly rewards",
      created_at: Date.now() - 86400000, // 1 day ago
      locked_at: Date.now() - 43200000, // 12 hours ago
    },
    status: 4, // active
  },
  {
    id: "0xprogram_2_hash",
    creator: {
      code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
      hash_type: "type",
      args: "0xcreator_args_2",
    },
    metadata: {
      name: "BTC/CKB LP Rewards",
      description: "Stake BTC/CKB LP tokens to earn enhanced rewards. Higher APY for liquidity providers.",
      website: "https://example.com/btc-ckb-lp",
      logo_url: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    },
    config: {
      target_token_script: {
        code_hash: "0xbtc_ckb_lp_token_script_hash",
        hash_type: "type",
        args: "0xbtc_ckb_lp_args",
      },
      target_token_type: 1, // LP token
      min_stake_amount: "100000000000000000", // 0.1 LP tokens (18 decimals)
      reward_type: 0, // possession-based
      distribution_type: 1, // periodic
      distribution_mode: 0, // proportional
      snapshot_interval: 259200, // 3 days
      program_duration: 5184000, // 60 days
      period_duration: 259200, // 3 days
      period_count: 20, // 20 periods
      time_lock_option: 2, // distribution-based lock
      creator_lock: {
        code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        hash_type: "type",
        args: "0xcreator_args_2",
      },
      admin_lock_hashes: [],
      description: "BTC/CKB LP staking with enhanced rewards",
      created_at: Date.now() - 172800000, // 2 days ago
      locked_at: Date.now() - 86400000, // 1 day ago
    },
    status: 4, // active
  },
  {
    id: "0xprogram_3_hash",
    creator: {
      code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
      hash_type: "type",
      args: "0xcreator_args_3",
    },
    metadata: {
      name: "Long-term CKB Holders",
      description: "Reward long-term CKB holders with additional CKB rewards. Monthly distribution with 6-month lock period.",
    },
    config: {
      target_token_script: {
        code_hash: "0xckb_token_script_hash",
        hash_type: "type", 
        args: "0xckb_args",
      },
      target_token_type: 0, // regular token
      min_stake_amount: "10000000000000", // 100,000 CKB (8 decimals)
      reward_type: 0, // possession-based
      distribution_type: 1, // periodic
      distribution_mode: 0, // proportional
      snapshot_interval: 2592000, // 30 days
      program_duration: 15552000, // 180 days (6 months)
      period_duration: 2592000, // 30 days
      period_count: 6, // 6 months
      time_lock_option: 3, // final lock
      creator_lock: {
        code_hash: "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        hash_type: "type",
        args: "0xcreator_args_3",
      },
      admin_lock_hashes: [],
      description: "Long-term CKB staking program",
      created_at: Date.now() - 259200000, // 3 days ago
      locked_at: Date.now() - 172800000, // 2 days ago
    },
    status: 4, // active
  },
];

// Update protocol data with programs
mockProtocolData.programs_approved = mockProgramsData;

// UI-friendly program data for components
export const mockUIPrograms: UIProgram[] = [
  {
    id: "0xprogram_1_hash",
    name: "USDC Staking Rewards",
    description: "Earn rewards by staking USDC tokens. Weekly snapshots with proportional reward distribution.",
    logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    token: "USDC",
    apy: "12.5%",
    totalStaked: "2,450,000 USDC",
    participants: 1247,
    status: "active",
    periodProgress: 68,
    timeRemaining: "2d 14h",
  },
  {
    id: "0xprogram_2_hash", 
    name: "BTC/CKB LP Rewards",
    description: "Stake BTC/CKB LP tokens to earn enhanced rewards. Higher APY for liquidity providers.",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    token: "BTC/CKB LP",
    apy: "24.8%",
    totalStaked: "156.8 BTC/CKB LP",
    participants: 89,
    status: "active",
    periodProgress: 23,
    timeRemaining: "1d 8h",
  },
  {
    id: "0xprogram_3_hash",
    name: "Long-term CKB Holders",
    description: "Reward long-term CKB holders with additional CKB rewards. Monthly distribution with 6-month lock period.",
    token: "CKB",
    apy: "8.2%",
    totalStaked: "45,000,000 CKB",
    participants: 567,
    status: "active",
    periodProgress: 87,
    timeRemaining: "4d 12h",
  },
];

// Mock user positions for dashboard
export const mockUserPositions: UserPosition[] = [
  {
    id: "position_1",
    programId: "0xprogram_1_hash",
    programName: "USDC Staking Rewards",
    amount: "5,000 USDC",
    token: "USDC",
    rewards: "156.25 USDC",
    apy: "12.5%",
    status: "active",
    timeLeft: "2d 14h",
  },
  {
    id: "position_2", 
    programId: "0xprogram_2_hash",
    programName: "BTC/CKB LP Rewards",
    amount: "2.45 BTC/CKB LP",
    token: "BTC/CKB LP",
    rewards: "0.087 BTC/CKB LP",
    apy: "24.8%",
    status: "active",
    timeLeft: "1d 8h",
  },
];