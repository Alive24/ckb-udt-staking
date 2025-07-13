"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ProgramData, ProtocolData, UIProgram, UserPosition } from "@/lib/types/program";
import { 
  mockProgramsData, 
  mockProtocolData, 
  mockUIPrograms, 
  mockUserPositions 
} from "@/lib/mock-data/programs";

interface ProgramContextType {
  // Protocol Data
  protocolData: ProtocolData | null;
  
  // Program Data
  programs: ProgramData[];
  uiPrograms: UIProgram[];
  
  // User Data
  userPositions: UserPosition[];
  
  // Program Operations
  getProgramById: (id: string) => ProgramData | undefined;
  getUIProgramById: (id: string) => UIProgram | undefined;
  getUserPositionById: (id: string) => UserPosition | undefined;
  
  // Loading States
  loading: boolean;
  error: string | null;
  
  // Actions (for future real implementation)
  refreshData: () => Promise<void>;
  stakeTokens: (programId: string, amount: string) => Promise<boolean>;
  unstakeTokens: (positionId: string) => Promise<boolean>;
  claimRewards: (positionId: string) => Promise<boolean>;
}

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

interface ProgramProviderProps {
  children: ReactNode;
}

export function ProgramProvider({ children }: ProgramProviderProps) {
  const [protocolData, setProtocolData] = useState<ProtocolData | null>(null);
  const [programs, setPrograms] = useState<ProgramData[]>([]);
  const [uiPrograms, setUIPrograms] = useState<UIProgram[]>([]);
  const [userPositions, setUserPositions] = useState<UserPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Load mock data
        setProtocolData(mockProtocolData);
        setPrograms(mockProgramsData);
        setUIPrograms(mockUIPrograms);
        setUserPositions(mockUserPositions);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getProgramById = (id: string): ProgramData | undefined => {
    return programs.find(program => program.id === id);
  };

  const getUIProgramById = (id: string): UIProgram | undefined => {
    return uiPrograms.find(program => program.id === id);
  };

  const getUserPositionById = (id: string): UserPosition | undefined => {
    return userPositions.find(position => position.id === id);
  };

  const refreshData = async (): Promise<void> => {
    // In real implementation, this would refetch from blockchain/API
    await new Promise(resolve => setTimeout(resolve, 500));
    // For now, just update timestamps
    setProtocolData(prev => prev ? { ...prev, last_updated: Date.now() } : null);
  };

  const stakeTokens = async (programId: string, amount: string): Promise<boolean> => {
    // Mock implementation - in real app this would:
    // 1. Build CKB transaction
    // 2. Sign with wallet
    // 3. Submit to blockchain
    // 4. Update local state
    
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate transaction time
      
      // Add new position to user positions
      const program = getUIProgramById(programId);
      if (program) {
        const newPosition: UserPosition = {
          id: `position_${Date.now()}`,
          programId,
          programName: program.name,
          amount: `${amount} ${program.token}`,
          token: program.token,
          rewards: "0",
          apy: program.apy,
          status: "active",
          timeLeft: program.timeRemaining,
        };
        
        setUserPositions(prev => [...prev, newPosition]);
      }
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Staking failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const unstakeTokens = async (positionId: string): Promise<boolean> => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update position status
      setUserPositions(prev => 
        prev.map(pos => 
          pos.id === positionId 
            ? { ...pos, status: "unstaking" as const }
            : pos
        )
      );
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unstaking failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const claimRewards = async (positionId: string): Promise<boolean> => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset rewards for position
      setUserPositions(prev => 
        prev.map(pos => 
          pos.id === positionId 
            ? { ...pos, rewards: "0" }
            : pos
        )
      );
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Claiming rewards failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value: ProgramContextType = {
    protocolData,
    programs,
    uiPrograms,
    userPositions,
    getProgramById,
    getUIProgramById,
    getUserPositionById,
    loading,
    error,
    refreshData,
    stakeTokens,
    unstakeTokens,
    claimRewards,
  };

  return (
    <ProgramContext.Provider value={value}>
      {children}
    </ProgramContext.Provider>
  );
}

export function useProgramData() {
  const context = useContext(ProgramContext);
  if (context === undefined) {
    throw new Error("useProgramData must be used within a ProgramProvider");
  }
  return context;
}