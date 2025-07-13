"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  ProtocolData, 
  UIProtocolInfo, 
  EndorserInfo, 
  ProtocolAdmin,
  ProtocolGovernance,
  ProtocolSecurity,
  ProtocolMetrics 
} from "@/lib/types/protocol";
import { protocolService } from "@/lib/services/protocol-service";

// Hook for complete protocol information
export function useProtocolInfo() {
  const [data, setData] = useState<UIProtocolInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const protocolInfo = await protocolService.getUIProtocolInfo();
      setData(protocolInfo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch protocol info");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for raw protocol data
export function useRawProtocolData() {
  const [data, setData] = useState<ProtocolData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const protocolData = await protocolService.getProtocolData();
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

// Hook for endorsers management
export function useEndorsers() {
  const [endorsers, setEndorsers] = useState<EndorserInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEndorsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const endorsersData = await protocolService.getEndorsers();
      setEndorsers(endorsersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch endorsers");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEndorsers();
  }, [fetchEndorsers]);

  return { endorsers, loading, error, refetch: fetchEndorsers };
}

// Hook for admins management
export function useAdmins() {
  const [admins, setAdmins] = useState<ProtocolAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdmins = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const adminsData = await protocolService.getAdmins();
      setAdmins(adminsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  return { admins, loading, error, refetch: fetchAdmins };
}

// Hook for protocol metrics
export function useProtocolMetrics(timeframe: "day" | "week" | "month" = "week") {
  const [metrics, setMetrics] = useState<ProtocolMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const metricsData = await protocolService.getProtocolMetrics(timeframe);
      setMetrics(metricsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch metrics");
    } finally {
      setLoading(false);
    }
  }, [timeframe]);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return { metrics, loading, error, refetch: fetchMetrics };
}

// Hook for recent protocol activity
export function useRecentActivity(limit: number = 10) {
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivity = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const activityData = await protocolService.getRecentActivity(limit);
      setActivity(activityData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch recent activity");
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  return { activity, loading, error, refetch: fetchActivity };
}

// Hook for endorser operations
export function useEndorserOperations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addEndorser = useCallback(async (address: string, adminAddress: string) => {
    try {
      setLoading(true);
      setError(null);
      const txHash = await protocolService.addEndorser(address, adminAddress);
      return { success: true, txHash };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to add endorser";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const removeEndorser = useCallback(async (address: string, adminAddress: string) => {
    try {
      setLoading(true);
      setError(null);
      const txHash = await protocolService.removeEndorser(address, adminAddress);
      return { success: true, txHash };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to remove endorser";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    addEndorser,
    removeEndorser,
    loading,
    error,
  };
}

// Hook for admin operations
export function useAdminOperations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addAdmin = useCallback(async (address: string, role: string, ownerAddress: string) => {
    try {
      setLoading(true);
      setError(null);
      const txHash = await protocolService.addAdmin(address, role, ownerAddress);
      return { success: true, txHash };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to add admin";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const removeAdmin = useCallback(async (address: string, ownerAddress: string) => {
    try {
      setLoading(true);
      setError(null);
      const txHash = await protocolService.removeAdmin(address, ownerAddress);
      return { success: true, txHash };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to remove admin";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAdminPermissions = useCallback(async (address: string, permissions: string[], ownerAddress: string) => {
    try {
      setLoading(true);
      setError(null);
      const txHash = await protocolService.updateAdminPermissions(address, permissions, ownerAddress);
      return { success: true, txHash };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update admin permissions";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    addAdmin,
    removeAdmin,
    updateAdminPermissions,
    loading,
    error,
  };
}

// Hook for governance operations
export function useGovernanceOperations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProposal = useCallback(async (title: string, description: string, proposerAddress: string) => {
    try {
      setLoading(true);
      setError(null);
      const proposalId = await protocolService.createProposal(title, description, proposerAddress);
      return { success: true, proposalId };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create proposal";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const voteOnProposal = useCallback(async (proposalId: string, vote: "for" | "against", voterAddress: string, votingPower: string) => {
    try {
      setLoading(true);
      setError(null);
      const txHash = await protocolService.voteOnProposal(proposalId, vote, voterAddress, votingPower);
      return { success: true, txHash };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to vote on proposal";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createProposal,
    voteOnProposal,
    loading,
    error,
  };
}

// Hook for protocol configuration operations
export function useProtocolConfig() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateConfig = useCallback(async (config: any, adminAddress: string) => {
    try {
      setLoading(true);
      setError(null);
      const txHash = await protocolService.updateProtocolConfig(config, adminAddress);
      return { success: true, txHash };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update config";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const approveProgram = useCallback(async (programId: string, adminAddress: string) => {
    try {
      setLoading(true);
      setError(null);
      const txHash = await protocolService.approveProgram(programId, adminAddress);
      return { success: true, txHash };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to approve program";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const rejectProgram = useCallback(async (programId: string, reason: string, adminAddress: string) => {
    try {
      setLoading(true);
      setError(null);
      const txHash = await protocolService.rejectProgram(programId, reason, adminAddress);
      return { success: true, txHash };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to reject program";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    updateConfig,
    approveProgram,
    rejectProgram,
    loading,
    error,
  };
}

// Hook for real-time protocol updates
export function useProtocolUpdates() {
  const [updates, setUpdates] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = protocolService.subscribeToProtocolUpdates((update) => {
      setUpdates(prev => [...prev.slice(-9), update]); // Keep last 10 updates
    });

    return unsubscribe;
  }, []);

  return updates;
}