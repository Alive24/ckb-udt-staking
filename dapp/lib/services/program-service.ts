// Program Service Layer - Abstraction for data operations
// This service can be easily swapped between mock and real blockchain implementations

import { ProgramData, ProtocolData, UIProgram, UserPosition } from "@/lib/types/program";

export interface ProgramServiceInterface {
  // Protocol Operations
  getProtocolData(): Promise<ProtocolData>;
  
  // Program Operations
  getAllPrograms(): Promise<ProgramData[]>;
  getProgramById(id: string): Promise<ProgramData | null>;
  getUIPrograms(): Promise<UIProgram[]>;
  
  // User Operations
  getUserPositions(userAddress?: string): Promise<UserPosition[]>;
  getUserPositionById(id: string): Promise<UserPosition | null>;
  
  // Transaction Operations
  stakeTokens(programId: string, amount: string, userAddress: string): Promise<string>; // Returns tx hash
  unstakeTokens(positionId: string, userAddress: string): Promise<string>;
  claimRewards(positionId: string, userAddress: string): Promise<string>;
  
  // Real-time Operations
  subscribeToUpdates(callback: (data: any) => void): () => void; // Returns unsubscribe function
}

// Mock Implementation
export class MockProgramService implements ProgramServiceInterface {
  private mockDelay = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms));

  async getProtocolData(): Promise<ProtocolData> {
    await this.mockDelay();
    const { mockProtocolData } = await import("@/lib/mock-data/programs");
    return mockProtocolData;
  }

  async getAllPrograms(): Promise<ProgramData[]> {
    await this.mockDelay();
    const { mockProgramsData } = await import("@/lib/mock-data/programs");
    return mockProgramsData;
  }

  async getProgramById(id: string): Promise<ProgramData | null> {
    await this.mockDelay(500);
    const { mockProgramsData } = await import("@/lib/mock-data/programs");
    return mockProgramsData.find(p => p.id === id) || null;
  }

  async getUIPrograms(): Promise<UIProgram[]> {
    await this.mockDelay();
    const { mockUIPrograms } = await import("@/lib/mock-data/programs");
    return mockUIPrograms;
  }

  async getUserPositions(_userAddress?: string): Promise<UserPosition[]> {
    await this.mockDelay();
    const { mockUserPositions } = await import("@/lib/mock-data/programs");
    // In real implementation, filter by userAddress
    return mockUserPositions;
  }

  async getUserPositionById(id: string): Promise<UserPosition | null> {
    await this.mockDelay(500);
    const { mockUserPositions } = await import("@/lib/mock-data/programs");
    return mockUserPositions.find(p => p.id === id) || null;
  }

  async stakeTokens(_programId: string, _amount: string, _userAddress: string): Promise<string> {
    await this.mockDelay(2000); // Simulate transaction time
    // Mock transaction hash
    return `0x${Math.random().toString(16).substring(2, 66)}`;
  }

  async unstakeTokens(_positionId: string, _userAddress: string): Promise<string> {
    await this.mockDelay(2000);
    return `0x${Math.random().toString(16).substring(2, 66)}`;
  }

  async claimRewards(_positionId: string, _userAddress: string): Promise<string> {
    await this.mockDelay(1500);
    return `0x${Math.random().toString(16).substring(2, 66)}`;
  }

  subscribeToUpdates(callback: (data: any) => void): () => void {
    // Mock real-time updates
    const interval = setInterval(() => {
      callback({
        type: "period_update",
        timestamp: Date.now(),
        data: { progress: Math.random() * 100 }
      });
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }
}

// Real CKB Implementation (placeholder)
export class CKBProgramService implements ProgramServiceInterface {
  private _rpcUrl: string;
  private _indexerUrl: string;

  constructor(rpcUrl: string, indexerUrl: string) {
    this._rpcUrl = rpcUrl;
    this._indexerUrl = indexerUrl;
  }

  async getProtocolData(): Promise<ProtocolData> {
    // TODO: Implement real CKB blockchain queries
    // 1. Query protocol cell from blockchain
    // 2. Parse Molecule data
    // 3. Return structured data
    throw new Error("CKB implementation not yet available");
  }

  async getAllPrograms(): Promise<ProgramData[]> {
    // TODO: Implement real CKB blockchain queries
    // 1. Query all program cells
    // 2. Parse Molecule data for each program
    // 3. Return array of programs
    throw new Error("CKB implementation not yet available");
  }

  async getProgramById(id: string): Promise<ProgramData | null> {
    // TODO: Query specific program cell by ID
    throw new Error("CKB implementation not yet available");
  }

  async getUIPrograms(): Promise<UIProgram[]> {
    // Convert raw program data to UI-friendly format
    const programs = await this.getAllPrograms();
    return programs.map(this.convertToUIProgram);
  }

  async getUserPositions(_userAddress?: string): Promise<UserPosition[]> {
    // TODO: Query user's staking positions from blockchain
    throw new Error("CKB implementation not yet available");
  }

  async getUserPositionById(_id: string): Promise<UserPosition | null> {
    // TODO: Query specific position by ID
    throw new Error("CKB implementation not yet available");
  }

  async stakeTokens(_programId: string, _amount: string, _userAddress: string): Promise<string> {
    // TODO: Build and submit staking transaction
    // 1. Build transaction with program cells
    // 2. Sign with user wallet
    // 3. Submit to CKB network
    // 4. Return transaction hash
    throw new Error("CKB implementation not yet available");
  }

  async unstakeTokens(_positionId: string, _userAddress: string): Promise<string> {
    // TODO: Build and submit unstaking transaction
    throw new Error("CKB implementation not yet available");
  }

  async claimRewards(_positionId: string, _userAddress: string): Promise<string> {
    // TODO: Build and submit reward claiming transaction
    throw new Error("CKB implementation not yet available");
  }

  subscribeToUpdates(_callback: (data: any) => void): () => void {
    // TODO: Subscribe to CKB blockchain events
    // Use WebSocket or polling to get real-time updates
    throw new Error("CKB implementation not yet available");
  }

  private convertToUIProgram(_program: ProgramData): UIProgram {
    // Convert raw program data to UI-friendly format
    // TODO: Implement conversion logic
    throw new Error("CKB implementation not yet available");
  }
}

// Service Factory - Easy switching between implementations
export function createProgramService(type: "mock" | "ckb" = "mock"): ProgramServiceInterface {
  switch (type) {
    case "mock":
      return new MockProgramService();
    case "ckb":
      // Get from environment or config
      const rpcUrl = process.env.NEXT_PUBLIC_CKB_RPC_URL || "http://localhost:8114";
      const indexerUrl = process.env.NEXT_PUBLIC_CKB_INDEXER_URL || "http://localhost:8116";
      return new CKBProgramService(rpcUrl, indexerUrl);
    default:
      return new MockProgramService();
  }
}

// Default service instance - easily configurable
export const programService = createProgramService(
  (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "false" ? "ckb" : "mock") as "mock" | "ckb"
);