"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
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

interface ProtocolContextType {
  // Protocol Data
  protocolData: ProtocolData | null;
  protocolInfo: UIProtocolInfo | null;
  
  // Administrative Data
  endorsers: EndorserInfo[];
  admins: ProtocolAdmin[];
  
  // Governance & Metrics
  governance: ProtocolGovernance | null;
  security: ProtocolSecurity | null;
  metrics: ProtocolMetrics | null;
  recentActivity: any[];
  
  // Loading States
  loading: boolean;
  error: string | null;
  
  // Protocol Operations
  refreshData: () => Promise<void>;
  
  // Endorser Operations
  addEndorser: (address: string, adminAddress: string) => Promise<boolean>;
  removeEndorser: (address: string, adminAddress: string) => Promise<boolean>;
  
  // Admin Operations
  addAdmin: (address: string, role: string, ownerAddress: string) => Promise<boolean>;
  removeAdmin: (address: string, ownerAddress: string) => Promise<boolean>;
  updateAdminPermissions: (address: string, permissions: string[], ownerAddress: string) => Promise<boolean>;
  
  // Configuration Operations
  updateProtocolConfig: (config: any, adminAddress: string) => Promise<boolean>;
  approveProgram: (programId: string, adminAddress: string) => Promise<boolean>;
  rejectProgram: (programId: string, reason: string, adminAddress: string) => Promise<boolean>;
  
  // Governance Operations
  createProposal: (title: string, description: string, proposerAddress: string) => Promise<boolean>;
  voteOnProposal: (proposalId: string, vote: "for" | "against", voterAddress: string, votingPower: string) => Promise<boolean>;
}

const ProtocolContext = createContext<ProtocolContextType | undefined>(undefined);

interface ProtocolProviderProps {
  children: ReactNode;
}

export function ProtocolProvider({ children }: ProtocolProviderProps) {
  const [protocolData, setProtocolData] = useState<ProtocolData | null>(null);
  const [protocolInfo, setProtocolInfo] = useState<UIProtocolInfo | null>(null);
  const [endorsers, setEndorsers] = useState<EndorserInfo[]>([]);
  const [admins, setAdmins] = useState<ProtocolAdmin[]>([]);
  const [governance, setGovernance] = useState<ProtocolGovernance | null>(null);
  const [security, setSecurity] = useState<ProtocolSecurity | null>(null);
  const [metrics, setMetrics] = useState<ProtocolMetrics | null>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all protocol data
  const loadProtocolData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Load all data in parallel
      const [
        protocolDataRes,
        protocolInfoRes,
        endorsersRes,
        adminsRes,
        recentActivityRes,
      ] = await Promise.all([
        protocolService.getProtocolData(),
        protocolService.getUIProtocolInfo(),
        protocolService.getEndorsers(),
        protocolService.getAdmins(),
        protocolService.getRecentActivity(10),
      ]);
      
      setProtocolData(protocolDataRes);
      setProtocolInfo(protocolInfoRes);
      setEndorsers(endorsersRes);
      setAdmins(adminsRes);
      setGovernance(protocolInfoRes.governance);
      setSecurity(protocolInfoRes.security);
      setMetrics(protocolInfoRes.metrics);
      setRecentActivity(recentActivityRes);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load protocol data");
    } finally {
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    loadProtocolData();
  }, []);

  // Set up real-time updates
  useEffect(() => {
    const unsubscribe = protocolService.subscribeToProtocolUpdates((update) => {
      if (update.type === "protocol_update" && update.data) {
        // Update metrics with real-time data
        setMetrics(prev => prev ? {
          ...prev,
          ...update.data,
        } : null);
      }
    });

    return unsubscribe;
  }, []);

  const refreshData = async (): Promise<void> => {
    await loadProtocolData();
  };

  // Endorser Operations
  const addEndorser = async (address: string, adminAddress: string): Promise<boolean> => {
    try {
      setLoading(true);
      const txHash = await protocolService.addEndorser(address, adminAddress);
      
      // Update local state optimistically
      const newEndorser: EndorserInfo = {
        address,
        name: `Endorser ${address.slice(0, 8)}...`,
        verified: false,
        endorsedPrograms: 0,
        joinDate: new Date().toISOString().split('T')[0],
        reputation: 0,
      };
      setEndorsers(prev => [...prev, newEndorser]);
      
      console.log("Endorser added:", txHash);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add endorser");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeEndorser = async (address: string, adminAddress: string): Promise<boolean> => {
    try {
      setLoading(true);
      const txHash = await protocolService.removeEndorser(address, adminAddress);
      
      // Update local state
      setEndorsers(prev => prev.filter(e => e.address !== address));
      
      console.log("Endorser removed:", txHash);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove endorser");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Admin Operations
  const addAdmin = async (address: string, role: string, ownerAddress: string): Promise<boolean> => {
    try {
      setLoading(true);
      const txHash = await protocolService.addAdmin(address, role, ownerAddress);
      
      // Update local state optimistically
      const newAdmin: ProtocolAdmin = {
        address,
        name: `Admin ${address.slice(0, 8)}...`,
        role: role as "owner" | "admin" | "moderator",
        permissions: role === "admin" ? ["approve_programs", "manage_endorsers"] : ["view_analytics"],
        lastActive: new Date().toISOString(),
      };
      setAdmins(prev => [...prev, newAdmin]);
      
      console.log("Admin added:", txHash);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add admin");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeAdmin = async (address: string, ownerAddress: string): Promise<boolean> => {
    try {
      setLoading(true);
      const txHash = await protocolService.removeAdmin(address, ownerAddress);
      
      // Update local state
      setAdmins(prev => prev.filter(a => a.address !== address));
      
      console.log("Admin removed:", txHash);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove admin");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateAdminPermissions = async (address: string, permissions: string[], ownerAddress: string): Promise<boolean> => {
    try {
      setLoading(true);
      const txHash = await protocolService.updateAdminPermissions(address, permissions, ownerAddress);
      
      // Update local state
      setAdmins(prev => prev.map(admin => 
        admin.address === address ? { ...admin, permissions } : admin
      ));
      
      console.log("Admin permissions updated:", txHash);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update admin permissions");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Configuration Operations
  const updateProtocolConfig = async (config: any, adminAddress: string): Promise<boolean> => {
    try {
      setLoading(true);
      const txHash = await protocolService.updateProtocolConfig(config, adminAddress);
      
      // Refresh protocol data after config update
      await refreshData();
      
      console.log("Protocol config updated:", txHash);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update protocol config");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const approveProgram = async (programId: string, adminAddress: string): Promise<boolean> => {
    try {
      setLoading(true);
      const txHash = await protocolService.approveProgram(programId, adminAddress);
      
      // Update approved programs list
      setProtocolData(prev => prev ? {
        ...prev,
        programs_approved: [...prev.programs_approved, programId],
      } : null);
      
      console.log("Program approved:", txHash);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to approve program");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const rejectProgram = async (programId: string, reason: string, adminAddress: string): Promise<boolean> => {
    try {
      setLoading(true);
      const txHash = await protocolService.rejectProgram(programId, reason, adminAddress);
      
      console.log("Program rejected:", txHash);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reject program");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Governance Operations
  const createProposal = async (title: string, description: string, proposerAddress: string): Promise<boolean> => {
    try {
      setLoading(true);
      const proposalId = await protocolService.createProposal(title, description, proposerAddress);
      
      console.log("Proposal created:", proposalId);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create proposal");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const voteOnProposal = async (proposalId: string, vote: "for" | "against", voterAddress: string, votingPower: string): Promise<boolean> => {
    try {
      setLoading(true);
      const txHash = await protocolService.voteOnProposal(proposalId, vote, voterAddress, votingPower);
      
      console.log("Vote submitted:", txHash);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit vote");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value: ProtocolContextType = {
    // Data
    protocolData,
    protocolInfo,
    endorsers,
    admins,
    governance,
    security,
    metrics,
    recentActivity,
    
    // States
    loading,
    error,
    
    // Operations
    refreshData,
    addEndorser,
    removeEndorser,
    addAdmin,
    removeAdmin,
    updateAdminPermissions,
    updateProtocolConfig,
    approveProgram,
    rejectProgram,
    createProposal,
    voteOnProposal,
  };

  return (
    <ProtocolContext.Provider value={value}>
      {children}
    </ProtocolContext.Provider>
  );
}

export function useProtocolData() {
  const context = useContext(ProtocolContext);
  if (context === undefined) {
    throw new Error("useProtocolData must be used within a ProtocolProvider");
  }
  return context;
}