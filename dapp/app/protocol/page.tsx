"use client";

import { useState } from "react";
import { useProtocolData } from "@/lib/providers/protocol-provider";
import {
  Shield,
  Users,
  Settings,
  TrendingUp,
  Activity,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Eye,
  UserPlus,
  UserMinus,
  Vote,
  FileText,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function ProtocolPage() {
  const {
    protocolInfo,
    endorsers,
    admins,
    governance,
    security,
    metrics,
    recentActivity,
    loading,
    error,
    refreshData,
  } = useProtocolData();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-slate-600">Loading protocol data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-red-600" />
          <p className="text-slate-600 mb-4">Error loading protocol data: {error}</p>
          <Button onClick={() => refreshData()}>Try Again</Button>
        </div>
      </div>
    );
  }

  const getSecurityBadge = (score: number) => {
    if (score >= 90) {
      return <Badge className="bg-green-600 text-white">Excellent</Badge>;
    } else if (score >= 80) {
      return <Badge className="bg-blue-600 text-white">Good</Badge>;
    } else if (score >= 70) {
      return <Badge className="bg-yellow-600 text-white">Fair</Badge>;
    } else {
      return <Badge className="bg-red-600 text-white">Poor</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "owner":
        return <Badge className="bg-purple-600 text-white">Owner</Badge>;
      case "admin":
        return <Badge className="bg-blue-600 text-white">Admin</Badge>;
      case "moderator":
        return <Badge className="bg-green-600 text-white">Moderator</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Global Navigation */}
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-lg font-semibold text-purple-600">
                CKB UDT Staking
              </Link>
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">
                  My Stakings
                </Link>
                <Link href="/programs" className="text-sm text-slate-600 hover:text-slate-900">
                  Explore Programs
                </Link>
                <Link href="/protocol" className="text-sm text-purple-600 font-medium">
                  Protocol
                </Link>
                <Link href="/docs" className="text-sm text-slate-600 hover:text-slate-900">
                  Docs
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-slate-600">ckb1...abc123</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Protocol Overview</h1>
              <p className="text-sm text-slate-600 mt-1">
                Monitor and manage the CKB UDT Staking Protocol
              </p>
            </div>
            <Button onClick={() => refreshData()} className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Protocol Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Programs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{protocolInfo?.stats.totalPrograms}</div>
              <p className="text-xs text-muted-foreground">
                {protocolInfo?.stats.activePrograms} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value Locked</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{protocolInfo?.stats.totalValueLocked}</div>
              <p className="text-xs text-muted-foreground">
                {protocolInfo?.stats.totalParticipants} participants
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{security?.securityScore}/100</div>
              <div className="flex items-center space-x-2 mt-1">
                {security && getSecurityBadge(security.securityScore)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Uptime</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics?.uptimePercentage}%</div>
              <Progress value={metrics?.uptimePercentage || 0} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="endorsers">Endorsers</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest protocol events and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                          <p className="text-sm text-slate-600">{activity.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-slate-500">{activity.actor}</span>
                            <span className="text-xs text-slate-500">•</span>
                            <span className="text-xs text-slate-500">
                              {new Date(activity.timestamp).toRelativeTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Protocol Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Protocol Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Daily Active Users</span>
                      <span className="text-sm font-medium">{metrics?.dailyActiveUsers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Weekly Volume</span>
                      <span className="text-sm font-medium">{metrics?.weeklyVolume}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Monthly Volume</span>
                      <span className="text-sm font-medium">{metrics?.monthlyVolume}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Avg Transaction Size</span>
                      <span className="text-sm font-medium">{metrics?.avgTransactionSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Network Fees</span>
                      <span className="text-sm font-medium">{metrics?.networkFees}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="endorsers" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Protocol Endorsers</CardTitle>
                    <CardDescription>Trusted entities that can endorse staking programs</CardDescription>
                  </div>
                  <Button size="sm">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Endorser
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {endorsers.map((endorser) => (
                    <div key={endorser.address} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{endorser.name || "Unknown"}</span>
                            {endorser.verified && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          <p className="text-sm text-slate-600">{endorser.address.slice(0, 20)}...</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-slate-500">
                              {endorser.endorsedPrograms} programs endorsed
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span className="text-xs text-slate-500">{endorser.reputation}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admins" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Protocol Administrators</CardTitle>
                    <CardDescription>Users with administrative privileges</CardDescription>
                  </div>
                  <Button size="sm">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Admin
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {admins.map((admin) => (
                    <div key={admin.address} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Settings className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{admin.name || "Unknown"}</span>
                            {getRoleBadge(admin.role)}
                          </div>
                          <p className="text-sm text-slate-600">{admin.address.slice(0, 20)}...</p>
                          <p className="text-xs text-slate-500">
                            {admin.permissions.length} permissions • Last active: {new Date(admin.lastActive).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-1" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="governance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Governance Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Total Proposals</span>
                      <span className="text-sm font-medium">{governance?.proposalCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Active Proposals</span>
                      <span className="text-sm font-medium">{governance?.activeProposals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Voting Power</span>
                      <span className="text-sm font-medium">{governance?.votingPower}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Participation Rate</span>
                      <span className="text-sm font-medium">{governance?.participationRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Active Proposals</CardTitle>
                    <Button size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Create Proposal
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Increase Maximum Staking Duration</h4>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">
                        Proposal to increase maximum staking duration from 180 days to 365 days for long-term programs
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Ends in 3 days</span>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Vote className="w-3 h-3 mr-1" />
                            Vote
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Add Support for Native Assets</h4>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">
                        Enable staking of native CKB assets directly without wrapping
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Ends in 1 day</span>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Vote className="w-3 h-3 mr-1" />
                            Vote
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Audit Status</span>
                      <Badge className="bg-green-600 text-white">
                        {security?.auditStatus}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Security Score</span>
                      <span className="text-sm font-medium">{security?.securityScore}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Audit Date</span>
                      <span className="text-sm font-medium">{security?.auditDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Audit Firm</span>
                      <span className="text-sm font-medium">{security?.auditFirm}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vulnerability Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Critical</span>
                      <span className="text-sm font-medium text-red-600">{security?.vulnerabilities.critical}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">High</span>
                      <span className="text-sm font-medium text-orange-600">{security?.vulnerabilities.high}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Medium</span>
                      <span className="text-sm font-medium text-yellow-600">{security?.vulnerabilities.medium}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Low</span>
                      <span className="text-sm font-medium text-green-600">{security?.vulnerabilities.low}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}