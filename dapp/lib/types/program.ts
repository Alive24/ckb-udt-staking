// Program and Protocol Types based on Molecule Schema

export interface Script {
  code_hash: string;
  hash_type: "type" | "data" | "data1";
  args: string;
}

export interface ProgramMetadata {
  name: string;
  description: string;
  website?: string;
  logo_url?: string;
}

export interface ProgramConfig {
  // Target token configuration
  target_token_script: Script;
  target_token_type: number; // 0=regular, 1=LP token
  min_stake_amount: string; // Uint128 as string
  
  // Reward model configuration  
  reward_type: number; // 0=possession-based, 1=liquid staking
  reward_token_script?: Script; // Optional, defaults to target
  
  // Distribution configuration
  distribution_type: number; // 0=single, 1=periodic
  distribution_mode: number; // 0=proportional, 1=even
  snapshot_interval: number; // seconds
  
  // Program duration and periods
  program_duration: number; // seconds
  period_duration: number; // seconds
  period_count: number; // 0=unlimited
  
  // Security and lock configuration
  time_lock_option: number; // 0=none, 1=snapshot, 2=distribution, 3=final
  creator_lock: Script;
  admin_lock_hashes: string[]; // Byte32 array
  
  // Metadata
  description: string;
  created_at: number;
  locked_at: number;
}

export interface ProgramData {
  id: string; // Byte32
  creator: Script;
  metadata: ProgramMetadata;
  config: ProgramConfig;
  status: number; // 0=created, 1=funding, 2=reviewing, 3=approved, 4=active, 5=completed
}

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
  programs_approved: ProgramData[];
  endorsers_whitelist: string[];
  last_updated: number;
  protocol_config: ProtocolConfig;
}

// UI-specific types for components
export interface UIProgram {
  id: string;
  name: string;
  description: string;
  logo?: string;
  token: string;
  apy: string;
  totalStaked: string;
  participants: number;
  status: "active" | "upcoming" | "completed";
  periodProgress: number;
  timeRemaining: string;
}

export interface UserPosition {
  id: string;
  programId: string;
  programName: string;
  amount: string;
  token: string;
  rewards: string;
  apy: string;
  status: "active" | "unstaking" | "completed";
  timeLeft?: string;
}