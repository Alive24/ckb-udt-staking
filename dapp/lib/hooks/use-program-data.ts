"use client";

import { useState, useEffect, useCallback } from "react";
import { ProgramData, ProtocolData, UIProgram, UserPosition } from "@/lib/types/program";
import { programService } from "@/lib/services/program-service";

// Hook for protocol data
export function useProtocolData() {
  const [data, setData] = useState<ProtocolData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const protocolData = await programService.getProtocolData();
      setData(protocolData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch protocol data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for all programs
export function usePrograms() {
  const [programs, setPrograms] = useState<ProgramData[]>([]);
  const [uiPrograms, setUIPrograms] = useState<UIProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrograms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [programsData, uiProgramsData] = await Promise.all([
        programService.getAllPrograms(),
        programService.getUIPrograms(),
      ]);
      setPrograms(programsData);
      setUIPrograms(uiProgramsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch programs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  return { programs, uiPrograms, loading, error, refetch: fetchPrograms };
}

// Hook for single program
export function useProgram(programId: string | undefined) {
  const [program, setProgram] = useState<ProgramData | null>(null);
  const [uiProgram, setUIProgram] = useState<UIProgram | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgram = useCallback(async () => {
    if (!programId) {
      setProgram(null);
      setUIProgram(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const [programData, uiPrograms] = await Promise.all([
        programService.getProgramById(programId),
        programService.getUIPrograms(),
      ]);
      
      setProgram(programData);
      setUIProgram(uiPrograms.find(p => p.id === programId) || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch program");
    } finally {
      setLoading(false);
    }
  }, [programId]);

  useEffect(() => {
    fetchProgram();
  }, [fetchProgram]);

  return { program, uiProgram, loading, error, refetch: fetchProgram };
}

// Hook for user positions
export function useUserPositions(userAddress?: string) {
  const [positions, setPositions] = useState<UserPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPositions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const positionsData = await programService.getUserPositions(userAddress);
      setPositions(positionsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch user positions");
    } finally {
      setLoading(false);
    }
  }, [userAddress]);

  useEffect(() => {
    fetchPositions();
  }, [fetchPositions]);

  return { positions, loading, error, refetch: fetchPositions };
}

// Hook for staking operations
export function useStaking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stakeTokens = useCallback(async (programId: string, amount: string, userAddress: string) => {
    try {
      setLoading(true);
      setError(null);
      const txHash = await programService.stakeTokens(programId, amount, userAddress);
      return { success: true, txHash };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Staking failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const unstakeTokens = useCallback(async (positionId: string, userAddress: string) => {
    try {
      setLoading(true);
      setError(null);
      const txHash = await programService.unstakeTokens(positionId, userAddress);
      return { success: true, txHash };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unstaking failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const claimRewards = useCallback(async (positionId: string, userAddress: string) => {
    try {
      setLoading(true);
      setError(null);
      const txHash = await programService.claimRewards(positionId, userAddress);
      return { success: true, txHash };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Claiming rewards failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    stakeTokens,
    unstakeTokens,
    claimRewards,
    loading,
    error,
  };
}

// Hook for real-time updates
export function useRealtimeUpdates() {
  const [updates, setUpdates] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = programService.subscribeToUpdates((update) => {
      setUpdates(prev => [...prev.slice(-9), update]); // Keep last 10 updates
    });

    return unsubscribe;
  }, []);

  return updates;
}