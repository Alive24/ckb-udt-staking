"use client"

import { useState } from "react"
import { useProgramData } from "@/lib/providers/program-provider"
import {
  Wallet,
  TrendingUp,
  Gift,
  Settings,
  ExternalLink,
  Lock,
  Eye,
  Play,
  Coins,
  ArrowDownRight,
  ChevronDown,
  RefreshCw,
  HelpCircle,
  ArrowUpDown,
  Clock,
  Calendar,
  Camera,
  PauseCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function DashboardPage() {
  const [isConnected, setIsConnected] = useState(true)
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({})

  // Get data from provider
  const { userPositions, loading, error } = useProgramData()

  // Adapter function to convert UserPosition to expected dashboard format
  const adaptUserPositions = (positions: typeof userPositions) => {
    return positions.map(position => ({
      id: position.id,
      tokenName: position.programName,
      tokenSymbol: position.token,
      tokenLogo: `https://picsum.photos/32/32?random=${position.id.slice(-1)}`,
      description: `Staking ${position.token} tokens`,
      balance: position.amount.split(' ')[0],
      balanceUSD: `$${(parseFloat(position.amount.split(' ')[0].replace(',', '')) * 1.5).toFixed(2)}`,
      balanceCKB: `${(parseFloat(position.amount.split(' ')[0].replace(',', '')) * 125).toFixed(0)} CKB`,
      effectiveAverage: position.amount.split(' ')[0],
      effectiveAverageUSD: `$${(parseFloat(position.amount.split(' ')[0].replace(',', '')) * 1.5).toFixed(2)}`,
      effectiveAverageCKB: `${(parseFloat(position.amount.split(' ')[0].replace(',', '')) * 125).toFixed(0)} CKB`,
      stakingDate: new Date().toISOString().split('T')[0],
      currentPeriod: "Period 1",
      periodDuration: 30,
      totalPeriods: 12,
      remainingPeriods: 11,
      periodProgress: 65,
      periodStartDate: new Date().toISOString().split('T')[0],
      periodEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      daysRemaining: 11,
      estimatedRewards: position.rewards.split(' ')[0] || "0",
      estimatedAPY: position.apy,
      collectedRewards: "0",
      rewardToken: position.token,
      rewardType: "shared",
      lastSnapshot: "2 hours ago",
      nextSnapshot: position.timeLeft || "1d",
      lastTriggerTime: new Date().toISOString(),
      programStatus: position.status === "active" ? "Ongoing" : position.status === "unstaking" ? "Configured" : "Preview",
      isConfigured: true,
      isFunded: true,
      distributionMethod: "Periodic",
      distributionMode: "Proportional",
      minStakeAmount: "100",
      lockRequirement: "Lock until each distribution",
      funding: {
        funded: `${position.rewards.split(' ')[0] || "1000"} ${position.token}`,
        fundedUSD: "$1,500.00",
        fundedCKB: "125,000 CKB",
        expected: `${position.rewards.split(' ')[0] || "1000"} ${position.token}`,
        expectedUSD: "$1,500.00",
        expectedCKB: "125,000 CKB",
        completionPercentage: 100,
      },
      totalProgramFunding: {
        funded: `${(parseFloat(position.rewards.split(' ')[0] || "1000") * 10)} ${position.token}`,
        fundedUSD: "$15,000.00",
        fundedCKB: "1,250,000 CKB",
        expected: `${(parseFloat(position.rewards.split(' ')[0] || "1000") * 15)} ${position.token}`,
        expectedUSD: "$22,500.00",
        expectedCKB: "1,875,000 CKB",
        completionPercentage: 67,
      },
      canStake: true,
      canUnstake: position.status === "active",
      stakingPortalUrl: `/stake/${position.programId}`,
      isExternalStaking: false,
    }))
  }

  const adaptedPositions = adaptUserPositions(userPositions)

  const toggleCard = (cardId: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }))
  }

  // Mock wallet balances
  const walletBalances = {
    BANK: "5,420.50",
    CKB: "125,000.00",
    "LP-UTXOSwap (BANK/CKB)": "1,250.00",
    "LP-UTXOSwap (BANK/RUSD)": "2,100.00",
    "LP-UTXOSwap (BANK/BTC)": "850.00",
    NEW: "10,000.00",
    DEMO: "3,500.00",
    TEST: "1,200.00",
  }

  // Mock data - using BANK as example token with updated LP token names
  const mockPositions = [
    // ONGOING PROGRAMS FIRST
    {
      id: "bank-staking-001",
      tokenName: "BankToken",
      tokenSymbol: "BANK",
      tokenLogo: "https://picsum.photos/32/32?random=1",
      description:
        "BANK staking with 30-day periods and even distribution.",
      balance: "1,250.00", // Current staked amount
      balanceUSD: "$1,875.00", // 1,250 * $1.50
      balanceCKB: "156,250 CKB", // 1,250 * 125 CKB
      effectiveAverage: "1,180.50", // Lower because staked mid-period
      effectiveAverageUSD: "$1,770.75",
      effectiveAverageCKB: "147,562 CKB",
      stakingDate: "2024-01-20", // Staked 5 days into the period
      currentPeriod: "Period 3",
      periodDuration: 30, // 30 days per period
      totalPeriods: 12, // Limited to 12 periods
      remainingPeriods: 9, // 9 periods left
      periodProgress: 65,
      periodStartDate: "2024-01-15",
      periodEndDate: "2024-02-15",
      daysRemaining: 11,
      estimatedRewards: "1,250.0", // Current period only
      estimatedAPY: "18.5%", // Calculated APY
      collectedRewards: "2,480.0", // From previous periods
      rewardToken: "BANK",
      rewardType: "shared", // shared pool vs individual
      lastSnapshot: "2 hours ago",
      nextSnapshot: "22 hours",
      lastTriggerTime: "2024-02-10 00:00:15 UTC",
      // Program status
      programStatus: "Ongoing",
      isConfigured: true,
      isFunded: true,
      distributionMethod: "Periodic",
      distributionMode: "Even",
      minStakeAmount: "100",
      lockRequirement: "Lock until each distribution",
      // Funding for current period
      funding: {
        funded: "4,167 BANK",
        fundedUSD: "$6,250.50",
        fundedCKB: "520,875 CKB",
        expected: "4,167 BANK",
        expectedUSD: "$6,250.50",
        expectedCKB: "520,875 CKB",
        completionPercentage: 100,
      },
      // Total program funding for limited programs (shared pool)
      totalProgramFunding: {
        funded: "33,336 BANK",
        fundedUSD: "$50,004.00",
        fundedCKB: "4,167,000 CKB",
        expected: "50,000 BANK",
        expectedUSD: "$75,000.00",
        expectedCKB: "6,250,000 CKB",
        completionPercentage: 67,
      },
      canStake: true,
      canUnstake: true,
      stakingPortalUrl: `/stake/bank-staking-001`,
      isExternalStaking: false,
    },
    {
      id: "bank-ckb-lp-001",
      tokenName: "BANK/CKB Liquidity Pool on UTXOSwap",
      tokenSymbol: "LP-UTXOSwap (BANK/CKB)",
      tokenLogo: "https://picsum.photos/32/32?random=6",
      description:
        "Earn BANK rewards by providing BANK/CKB liquidity on UTXOSwap DEX.",
      balance: "850.00",
      balanceUSD: "$2,125.00", // LP tokens worth more
      balanceCKB: "170,000 CKB",
      effectiveAverage: "850.00", // Same as balance - staked from start
      effectiveAverageUSD: "$2,125.00",
      effectiveAverageCKB: "170,000 CKB",
      stakingDate: "2024-02-01", // Staked from period start
      currentPeriod: "Period 2",
      periodDuration: 14,
      totalPeriods: 24,
      remainingPeriods: 22,
      periodProgress: 45,
      periodStartDate: "2024-02-01",
      periodEndDate: "2024-02-15",
      daysRemaining: 8,
      estimatedRewards: "178.6",
      estimatedAPY: "22.3%",
      collectedRewards: "164.3",
      rewardToken: "BANK",
      rewardType: "shared", // shared pool for proportional
      lastSnapshot: "1 day ago",
      nextSnapshot: "1 day",
      lastTriggerTime: "2024-02-09 00:00:12 UTC",
      programStatus: "Ongoing",
      isConfigured: true,
      isFunded: true,
      distributionMethod: "Periodic",
      distributionMode: "Proportional",
      minStakeAmount: "50",
      lockRequirement: "No time lock",
      funding: {
        funded: "42,500 BANK",
        fundedUSD: "$63,750.00",
        fundedCKB: "5,312,500 CKB",
        expected: "42,500 BANK",
        expectedUSD: "$63,750.00",
        expectedCKB: "5,312,500 CKB",
        completionPercentage: 100,
      },
      totalProgramFunding: {
        funded: "42,500 BANK",
        fundedUSD: "$63,750.00",
        fundedCKB: "5,312,500 CKB",
        expected: "60,000 BANK",
        expectedUSD: "$90,000.00",
        expectedCKB: "7,500,000 CKB",
        completionPercentage: 71,
      },
      canStake: true,
      canUnstake: true,
      stakingPortalUrl: `/stake/bank-ckb-lp-001`,
      isExternalStaking: false,
    },
    {
      id: "bank-rusd-lp-001",
      tokenName: "BANK/RUSD Liquidity Pool on UTXOSwap",
      tokenSymbol: "LP-UTXOSwap (BANK/RUSD)",
      tokenLogo: "https://picsum.photos/32/32?random=7",
      description:
        "Earn RUSD rewards providing stable BANK/RUSD liquidity.",
      balance: "1,200.00",
      balanceUSD: "$3,000.00",
      balanceCKB: "240,000 CKB",
      effectiveAverage: "720.00", // Much lower - staked recently
      effectiveAverageUSD: "$1,800.00",
      effectiveAverageCKB: "144,000 CKB",
      stakingDate: "2024-02-08", // Staked very recently
      currentPeriod: "Period 1",
      periodDuration: 21,
      totalPeriods: null,
      remainingPeriods: null,
      periodProgress: 30,
      periodStartDate: "2024-02-01",
      periodEndDate: "2024-02-22",
      daysRemaining: 15,
      estimatedRewards: "4,762.0",
      estimatedAPY: "15.8%",
      collectedRewards: "0",
      rewardToken: "RUSD",
      rewardType: "individual", // per staker for even distribution
      lastSnapshot: "3 hours ago",
      nextSnapshot: "21 hours",
      lastTriggerTime: "2024-02-10 03:00:08 UTC",
      programStatus: "Ongoing",
      isConfigured: true,
      isFunded: true,
      distributionMethod: "Periodic",
      distributionMode: "Even",
      minStakeAmount: "100",
      lockRequirement: "Lock until each distribution",
      funding: {
        funded: "5,000 RUSD per staker",
        fundedUSD: "$5,100.00 per staker",
        fundedCKB: "408,000 CKB per staker",
        expected: "5,000 RUSD per staker",
        expectedUSD: "$5,100.00 per staker",
        expectedCKB: "408,000 CKB per staker",
        completionPercentage: 100,
      },
      canStake: true,
      canUnstake: true,
      stakingPortalUrl: `/stake/bank-rusd-lp-001`,
      isExternalStaking: false,
    },
    {
      id: "demo-staking-001",
      tokenName: "DemoToken",
      tokenSymbol: "DEMO",
      tokenLogo: "https://picsum.photos/32/32?random=8",
      description:
        "Single payout DEMO staking program with 180-day duration and final distribution.",
      balance: "800.00",
      balanceUSD: "$400.00",
      balanceCKB: "80,000 CKB",
      effectiveAverage: "800.00",
      effectiveAverageUSD: "$400.00",
      effectiveAverageCKB: "80,000 CKB",
      stakingDate: "2023-08-15",
      currentPeriod: "Final Period",
      periodDuration: 180,
      totalPeriods: 1,
      remainingPeriods: 0,
      periodProgress: 100,
      periodStartDate: "2023-08-15",
      periodEndDate: "2024-02-12",
      daysRemaining: 0,
      estimatedRewards: "960.0",
      estimatedAPY: "24.0%",
      collectedRewards: "960.0",
      rewardToken: "DEMO",
      rewardType: "individual",
      lastSnapshot: "Program ended",
      nextSnapshot: "N/A",
      lastTriggerTime: "2024-02-12 00:00:00 UTC",
      programStatus: "Ended",
      isConfigured: true,
      isFunded: true,
      distributionMethod: "End-Only",
      distributionMode: "Proportional",
      minStakeAmount: "50",
      lockRequirement: "Lock until final distribution only",
      funding: {
        funded: "5,000 DEMO",
        fundedUSD: "$2,500.00",
        fundedCKB: "500,000 CKB",
        expected: "5,000 DEMO",
        expectedUSD: "$2,500.00",
        expectedCKB: "500,000 CKB",
        completionPercentage: 100,
      },
      canStake: false,
      canUnstake: false,
      stakingPortalUrl: `/stake/demo-staking-001`,
      isExternalStaking: false,
    },
    {
      id: "paused-staking-001",
      tokenName: "PausedToken",
      tokenSymbol: "PAUSE",
      tokenLogo: "https://picsum.photos/32/32?random=9",
      description:
        "PAUSE staking program temporarily paused due to insufficient funding.",
      balance: "500.00",
      balanceUSD: "$250.00",
      balanceCKB: "50,000 CKB",
      effectiveAverage: "500.00",
      effectiveAverageUSD: "$250.00",
      effectiveAverageCKB: "50,000 CKB",
      stakingDate: "2024-01-15",
      currentPeriod: "Period 2",
      periodDuration: 30,
      totalPeriods: 8,
      remainingPeriods: 6,
      periodProgress: 60,
      periodStartDate: "2024-02-01",
      periodEndDate: "2024-03-02",
      daysRemaining: 18,
      estimatedRewards: "0",
      estimatedAPY: "0%",
      collectedRewards: "125.0",
      rewardToken: "PAUSE",
      rewardType: "shared",
      lastSnapshot: "5 days ago",
      nextSnapshot: "Paused",
      lastTriggerTime: "2024-02-05 00:00:00 UTC",
      programStatus: "Paused",
      isConfigured: true,
      isFunded: false,
      distributionMethod: "Periodic",
      distributionMode: "Even",
      minStakeAmount: "100",
      lockRequirement: "Lock until each distribution",
      funding: {
        funded: "625 PAUSE",
        fundedUSD: "$312.50",
        fundedCKB: "62,500 CKB",
        expected: "2,500 PAUSE",
        expectedUSD: "$1,250.00",
        expectedCKB: "250,000 CKB",
        completionPercentage: 25,
      },
      totalProgramFunding: {
        funded: "2,500 PAUSE",
        fundedUSD: "$1,250.00",
        fundedCKB: "250,000 CKB",
        expected: "10,000 PAUSE",
        expectedUSD: "$5,000.00",
        expectedCKB: "1,000,000 CKB",
        completionPercentage: 25,
      },
      canStake: false,
      canUnstake: true,
      stakingPortalUrl: `/stake/paused-staking-001`,
      isExternalStaking: false,
    },
  ]

  const mockHistory = [
    {
      id: 1,
      period: "Period 2 (30 days)",
      token: "BANK",
      rewards: "38.5 BANK",
      date: "2024-01-15",
      status: "Claimed",
    },
    {
      id: 2,
      period: "Period 1 (30 days)",
      token: "BANK",
      rewards: "42.1 BANK",
      date: "2024-01-01",
      status: "Claimed",
    },
    {
      id: 3,
      period: "Final Distribution (120 days)",
      token: "TEST",
      rewards: "128.5 BANK",
      date: "2024-01-20",
      status: "Claimed",
    },
  ]

  const getProgramStatusBadge = (status: string) => {
    switch (status) {
      case "Ongoing":
        return (
          <Badge className="bg-green-600 text-white border-0">
            <Play className="w-3 h-3 mr-1" />
            Ongoing
          </Badge>
        )
      case "Configured":
        return (
          <Badge className="bg-green-600 text-white border-0">
            <Lock className="w-3 h-3 mr-1" />
            Configuration Locked
          </Badge>
        )
      case "Preview":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            <Eye className="w-3 h-3 mr-1" />
            Preview
          </Badge>
        )
      case "Ended":
        return (
          <Badge variant="outline" className="text-slate-600 border-slate-600">
            Ended
          </Badge>
        )
      case "Paused":
        return (
          <Badge className="bg-orange-600 text-white border-0">
            <PauseCircle className="w-3 h-3 mr-1" />
            Paused
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getFundingBadge = (completionPercentage: number, status: string) => {
    if (status === "Preview") {
      return null // No funding badge for preview
    }
    if (completionPercentage === 0) {
      return (
        <Badge variant="outline" className="text-red-600 border-red-600">
          Needs Funding
        </Badge>
      )
    }
    if (completionPercentage < 100) {
      return (
        <Badge variant="outline" className="text-orange-600 border-orange-600">
          Partially Funded ({completionPercentage}%)
        </Badge>
      )
    }
    return null // No badge when fully funded
  }

  const getDistributionBadge = (method: string, totalPeriods?: number | null) => {
    if (method === "Periodic") {
      const periodsText = totalPeriods ? `${totalPeriods} periods` : "Unlimited"
      return (
        <Badge variant="outline" className="text-purple-600 border-purple-600">
          {method} ({periodsText})
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="text-purple-600 border-purple-600">
        {method}
      </Badge>
    )
  }

  // Check if effective average is significantly different from current balance
  const hasStakingDifference = (balance: string, effectiveAverage: string) => {
    const balanceNum = Number.parseFloat(balance.replace(",", ""))
    const effectiveNum = Number.parseFloat(effectiveAverage.replace(",", ""))
    return Math.abs(balanceNum - effectiveNum) / balanceNum > 0.1 // 10% difference
  }

  const isOngoing = (status: string) => status === "active"
  const isConfigured = (status: string) => status === "upcoming"
  const isPreview = (status: string) => status === "completed"

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-slate-600">Loading your positions...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-4 text-red-600">⚠️</div>
          <p className="text-slate-600 mb-4">Error loading positions: {error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

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
                <Link href="/dashboard" className="text-sm text-purple-600 font-medium">
                  My Stakings
                </Link>
                <Link href="/programs" className="text-sm text-slate-600 hover:text-slate-900">
                  Explore Programs
                </Link>
                <Link href="/configure" className="text-sm text-slate-600 hover:text-slate-900">
                  Manage Programs
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
          <h1 className="text-xl font-semibold">My Stakings</h1>
          <p className="text-sm text-slate-600 mt-1">
            View and manage your staking positions and rewards
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!isConnected ? (
          <div className="text-center py-16">
            <Wallet className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Connect Your Wallet</h2>
            <p className="text-slate-600 mb-6">Connect your CKB wallet to view your staking positions and rewards</p>
            <Button onClick={() => setIsConnected(true)} size="lg">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Overview Cards */}
            <div className="grid md:grid-cols-5 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Total Staked Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">566,250 CKB</div>
                  <div className="text-sm text-slate-500">$7,000.00</div>
                  <div className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +5.2% this period
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Total Rewards Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">219,437 CKB</div>
                  <div className="text-sm text-slate-500">$3,954.88</div>
                  <div className="text-sm text-slate-500 mt-1">
                    2,644.3 tokens earned (all time)
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Historical APY</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">19.5%</div>
                  <div className="text-sm text-slate-500 mt-1">realized performance</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Expected Aggregated APY</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">18.9%</div>
                  <div className="text-sm text-slate-500 mt-1">current weighted average</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Active Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-slate-500 mt-1">earning rewards</div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="positions" className="space-y-6">
              <TabsList>
                <TabsTrigger value="positions">My Positions</TabsTrigger>
                <TabsTrigger value="history">Reward History</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="positions" className="space-y-4">
                {adaptedPositions.map((position) => {
                  const isExpanded = expandedCards[position.id] || false
                  const hasDifference = hasStakingDifference(position.balance, position.effectiveAverage)

                  return (
                    <Card
                      key={position.id}
                      className={`transition-all duration-200 ${
                        position.programStatus === "Ongoing"
                          ? "border-green-200 bg-green-50/50"
                          : position.programStatus === "Preview"
                            ? "border-blue-200 bg-blue-50/50"
                            : position.programStatus === "Configured"
                              ? "border-orange-200 bg-orange-50/50"
                              : ""
                      }`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={position.tokenLogo || "/placeholder.svg"}
                              alt={`${position.tokenSymbol} logo`}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-base truncate">{position.tokenName}</h3>
                                <Badge variant="secondary" className="text-xs whitespace-nowrap">
                                  {position.tokenSymbol}
                                </Badge>
                                <Link
                                  href={`https://explorer.nervos.org/address/${position.tokenSymbol}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </Link>
                              </div>

                              {/* Shorter program description */}
                              <p className="text-sm text-slate-600 mb-2 line-clamp-1 max-w-md">
                                {position.description.length > 80 
                                  ? position.description.substring(0, 80) + "..."
                                  : position.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-end space-y-1">
                            <div className="flex space-x-1">
                              {getProgramStatusBadge(position.programStatus)}
                              {getFundingBadge(position.funding.completionPercentage, position.programStatus)}
                            </div>
                            <div className="text-xs text-slate-500 whitespace-nowrap">
                              {getDistributionBadge(position.distributionMethod, position.totalPeriods)}
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        {/* My Staking banner with styled info matching current period rewards */}
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-stretch justify-between min-h-[100px]">
                            <div className="flex-1 flex flex-col justify-between">
                              <div className="text-sm font-medium text-blue-900 mb-1">My Staking</div>
                              <div className="space-y-2 flex-1 flex flex-col justify-center">
                                <div>
                                  <div className="text-xs text-slate-500">Currently Staked</div>
                                  <div className="text-lg font-bold text-green-600">
                                    {position.balance} {position.tokenSymbol}
                                    {hasStakingDifference(position.balance, position.effectiveAverage) && (
                                      <span className="text-sm text-slate-500 ml-2">
                                        ({position.effectiveAverage} effective this period)
                                      </span>
                                    )}
                                  </div>
                                  {hasStakingDifference(position.balance, position.effectiveAverage) && (
                                    <div className="text-xs text-slate-400 mt-1">
                                      Effective amount is lower because you staked mid-period
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <div className="text-xs text-slate-500">Accumulated Rewards</div>
                                  <div className="text-lg font-bold text-green-600">
                                    {position.collectedRewards || "0"} {position.rewardToken}
                                  </div>
                                </div>
                              </div>
                            </div>
                            {position.programStatus === "Ongoing" && (
                              <div className="text-right flex flex-col justify-between">
                                <div className="text-sm font-medium text-blue-900 mb-1">Current Period Rewards</div>
                                <div className="flex-1 flex flex-col justify-center">
                                  <div className="text-lg font-bold text-green-600">
                                    {position.estimatedRewards} {position.rewardToken}
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    estimated for {position.periodDuration} days
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    (~{position.estimatedRewards} {position.rewardToken} per {position.periodDuration} days)
                                  </div>
                                </div>
                                <div className="text-sm font-medium text-green-600 mt-1">
                                  Est. APY: {position.estimatedAPY}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Program details - reorganized into 2 rows with icons */}
                        <div className="mb-4 p-3 bg-slate-50/50 rounded-lg">
                          {/* First row: Distribution, Rewards, Total Rewards, Periods Remaining (4 items) */}
                          <div className="grid grid-cols-12 gap-2 mb-3">
                            <div className="col-span-3 text-center">
                              <div className="flex items-center justify-center mb-1">
                                <ArrowUpDown className="w-3 h-3 text-slate-500 mr-1" />
                                <div className="text-xs text-slate-500">Distribution Mode</div>
                              </div>
                              <div className="text-sm font-medium">
                                {position.distributionMethod} - {position.distributionMode}
                              </div>
                            </div>
                            <div className="col-span-3 text-center">
                              <div className="flex items-center justify-center mb-1">
                                <Gift className="w-3 h-3 text-slate-500 mr-1" />
                                <div className="text-xs text-slate-500">Rewards</div>
                              </div>
                              <div className="text-sm font-medium text-purple-600">{position.rewardToken}</div>
                            </div>
                            <div className="col-span-3 text-center">
                              <div className="flex items-center justify-center mb-1">
                                <TrendingUp className="w-3 h-3 text-slate-500 mr-1" />
                                <div className="text-xs text-slate-500">Total Rewards</div>
                              </div>
                              <div className="text-sm font-medium text-green-600">
                                {position.funding.funded}
                                {position.distributionMode === "Even" && position.rewardType === "individual" && " (per staker)"}
                              </div>
                            </div>
                            <div className="col-span-3 text-center">
                              <div className="flex items-center justify-center mb-1">
                                <Clock className="w-3 h-3 text-slate-500 mr-1" />
                                <div className="text-xs text-slate-500">Distribution Schedule</div>
                              </div>
                              <div className="text-sm font-medium">
                                {position.totalPeriods 
                                  ? `${position.remainingPeriods} of ${position.totalPeriods}`
                                  : "Unlimited"}
                              </div>
                            </div>
                          </div>
                          
                          {/* Second row: Minimum Stake, Lock Requirement, Period Duration, Snapshot Interval (4 items) */}
                          <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-3 text-center">
                              <div className="flex items-center justify-center mb-1">
                                <Coins className="w-3 h-3 text-slate-500 mr-1" />
                                <div className="text-xs text-slate-500">Minimum Stake</div>
                              </div>
                              <div className="text-sm font-medium">
                                {position.minStakeAmount} {position.tokenSymbol}
                              </div>
                            </div>
                            <div className="col-span-3 text-center">
                              <div className="flex items-center justify-center mb-1">
                                <Lock className="w-3 h-3 text-slate-500 mr-1" />
                                <div className="text-xs text-slate-500">Lock Requirement</div>
                              </div>
                              <div className="text-sm font-medium">{position.lockRequirement}</div>
                            </div>
                            <div className="col-span-3 text-center">
                              <div className="flex items-center justify-center mb-1">
                                <Calendar className="w-3 h-3 text-slate-500 mr-1" />
                                <div className="text-xs text-slate-500">Period Duration</div>
                              </div>
                              <div className="text-sm font-medium">
                                {position.periodDuration} days
                              </div>
                            </div>
                            <div className="col-span-3 text-center">
                              <div className="flex items-center justify-center mb-1">
                                <Camera className="w-3 h-3 text-slate-500 mr-1" />
                                <div className="text-xs text-slate-500">Snapshot Interval</div>
                              </div>
                              <div className="text-sm font-medium">Daily</div>
                            </div>
                          </div>
                        </div>

                        {/* Status-specific notifications */}
                        {position.programStatus === "Preview" && (
                          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="text-sm font-medium text-blue-800 mb-1">Preview Mode</div>
                            <div className="text-xs text-blue-700">Configuration pending. Staking available once locked and funded.</div>
                          </div>
                        )}
                        
                        {position.programStatus === "Configured" && (
                          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <div className="text-sm font-medium text-orange-800 mb-1">Awaiting Funding</div>
                            <div className="text-xs text-orange-700">
                              Configuration locked. Needs{" "}
                              {position.funding.completionPercentage === 0 ? "funding" : "full funding"} to start.
                            </div>
                          </div>
                        )}

                        {/* Period Progress for Ongoing Periodic Programs - Always Visible with End Date */}
                        {position.programStatus === "Ongoing" && position.distributionMethod === "Periodic" && (
                          <div className="mb-4 p-3 bg-white rounded-lg border">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">
                                {position.currentPeriod} ({position.periodDuration} days)
                              </span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">{position.periodProgress}%</span>
                                <Button variant="ghost" size="sm" className="h-6 px-2">
                                  <RefreshCw className="w-3 h-3 mr-1" />
                                </Button>
                              </div>
                            </div>
                            <Progress value={position.periodProgress} className="h-2 mb-2" />
                            <div className="flex items-center justify-between text-xs text-slate-500">
                              <span>Ends: {position.periodEndDate}</span>
                              <div className="text-right">
                                <div>{position.daysRemaining} days remaining</div>
                                {position.totalPeriods && (
                                  <div>
                                    {position.remainingPeriods} of {position.totalPeriods} periods left
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Action buttons with available balance and snapshot info */}
                        <div className="flex items-center justify-between pt-3 border-t mt-3">
                          <div className="text-xs text-slate-500">
                            {position.programStatus === "Ongoing" ? (
                              <>Last snapshot: {position.lastSnapshot} • Next: in {position.nextSnapshot}</>
                            ) : position.programStatus === "Preview" ? (
                              <>Waiting for configuration</>
                            ) : position.programStatus === "Configured" ? (
                              <>Ready • Needs funding</>
                            ) : (
                              <>Program completed</>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            {position.programStatus === "Ongoing" && (
                              <>
                                {position.canStake && position.stakingPortalUrl && (
                                  <Button
                                    asChild
                                    className="h-8 px-3 text-xs bg-green-600 hover:bg-green-700 text-white border-0 shadow-sm"
                                  >
                                    <Link href={position.stakingPortalUrl}>
                                      <Coins className="w-3 h-3 mr-1" />
                                      {position.tokenSymbol.includes('LP') ? (
                                        <span>
                                          Stake (Available: {walletBalances.BANK} BANK, {walletBalances.CKB || "0"} CKB)
                                        </span>
                                      ) : (
                                        <span>
                                          Stake (Available: {walletBalances[position.tokenSymbol as keyof typeof walletBalances] || "0"} {position.tokenSymbol})
                                        </span>
                                      )}
                                    </Link>
                                  </Button>
                                )}
                                {position.canUnstake && position.stakingPortalUrl && (
                                  <Button
                                    variant="outline"
                                    size="default"
                                    asChild
                                    className="h-8 px-3 text-xs text-red-600 border-red-600 bg-transparent"
                                  >
                                    <Link href={`${position.stakingPortalUrl}?action=unstake`}>
                                      <ArrowDownRight className="w-3 h-3 mr-1" />
                                      Unstake
                                    </Link>
                                  </Button>
                                )}
                              </>
                            )}
                            <Button variant="outline" size="default" asChild className="h-8 px-3 text-xs bg-transparent">
                              <Link href={`/program/${position.id}`}>Details</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Reward History</CardTitle>
                    <CardDescription>Your claimed rewards from completed periods</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockHistory.map((reward) => (
                        <div key={reward.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Gift className="w-5 h-5 text-purple-600" />
                            <div>
                              <div className="font-medium">
                                {reward.period} - {reward.token}
                              </div>
                              <div className="text-sm text-slate-500">{reward.date}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{reward.rewards}</div>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              {reward.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Overview</CardTitle>
                      <CardDescription>Your staking performance across all programs</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Total Rewards Earned</span>
                          <span className="font-semibold">209.1 BANK</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Average APY</span>
                          <span className="font-semibold text-green-600">18.9%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Participation Rate</span>
                          <span className="font-semibold">95.2%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Program Status Distribution</CardTitle>
                      <CardDescription>Your participation across different program states</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">BANK Program (30-day periods, 12 total)</span>
                          <Badge className="bg-green-600 text-white">Ongoing</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">BANK/CKB Liquidity Pool on UTXOSwap (14-day periods, 24 total)</span>
                          <Badge className="bg-green-600 text-white">Ongoing</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">BANK/RUSD Liquidity Pool on UTXOSwap (21-day periods, unlimited)</span>
                          <Badge className="bg-green-600 text-white">Ongoing</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">NEW Program (45-day periods, unlimited)</span>
                          <Badge variant="outline" className="text-blue-600 border-blue-600">
                            Preview
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">DEMO Program (180 days)</span>
                          <Badge variant="outline" className="text-orange-600 border-orange-600">
                            Configured
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">TEST Program (120 days)</span>
                          <Badge variant="outline" className="text-slate-600 border-slate-600">
                            Ended
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
