"use client"

import { useState } from "react"
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

  const toggleCard = (cardId: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }))
  }

  // Mock wallet balances
  const walletBalances = {
    BANK: "5,420.50",
    "BANK/CKB": "1,250.00",
    "BANK/RUSD": "2,100.00",
    "BANK/BTC": "850.00",
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
        "BANK token staking rewards program with monthly distribution periods using even distribution. Stake your BANK tokens to earn rewards every 30 days.",
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
      estimatedRewards: "45.2", // Current period only
      estimatedAPY: "18.5%", // Calculated APY
      collectedRewards: "80.6", // From previous periods (42.1 + 38.5)
      rewardToken: "BANK",
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
        funded: "1,000 BANK",
        fundedUSD: "$1,500.00",
        fundedCKB: "125,000 CKB",
        expected: "1,000 BANK",
        expectedUSD: "$1,500.00",
        expectedCKB: "125,000 CKB",
        completionPercentage: 100,
      },
      // Total program funding for limited programs
      totalProgramFunding: {
        funded: "8,000 BANK",
        fundedUSD: "$12,000.00",
        fundedCKB: "1,000,000 CKB",
        expected: "12,000 BANK",
        expectedUSD: "$18,000.00",
        expectedCKB: "1,500,000 CKB",
        completionPercentage: 67,
      },
      canStake: true,
      canUnstake: true,
      stakingPortalUrl: `/stake/bank-staking-001`,
      isExternalStaking: false,
    },
    {
      id: "bank-ckb-lp-001",
      tokenName: "BANK/CKB LP-UTXOSwap",
      tokenSymbol: "BANK/CKB",
      tokenLogo: "https://picsum.photos/32/32?random=6",
      description:
        "Liquidity provider token staking for BANK/CKB trading pair on UTXOSwap. Earn BANK rewards for providing liquidity to the decentralized exchange.",
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
      estimatedRewards: "32.1",
      estimatedAPY: "22.3%",
      collectedRewards: "28.4",
      rewardToken: "BANK",
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
        funded: "500 BANK",
        fundedUSD: "$750.00",
        fundedCKB: "62,500 CKB",
        expected: "500 BANK",
        expectedUSD: "$750.00",
        expectedCKB: "62,500 CKB",
        completionPercentage: 100,
      },
      totalProgramFunding: {
        funded: "8,500 BANK",
        fundedUSD: "$12,750.00",
        fundedCKB: "1,062,500 CKB",
        expected: "12,000 BANK",
        expectedUSD: "$18,000.00",
        expectedCKB: "1,500,000 CKB",
        completionPercentage: 71,
      },
      canStake: true,
      canUnstake: true,
      stakingPortalUrl: `/stake/bank-ckb-lp-001`,
      isExternalStaking: false,
    },
    {
      id: "bank-rusd-lp-001",
      tokenName: "BANK/RUSD LP-UTXOSwap",
      tokenSymbol: "BANK/RUSD",
      tokenLogo: "https://picsum.photos/32/32?random=7",
      description:
        "Liquidity provider token staking for BANK/RUSD stable pair. Earn RUSD rewards for providing liquidity to this stable trading pair with lower volatility.",
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
      estimatedRewards: "85.7",
      estimatedAPY: "15.8%",
      collectedRewards: "0",
      rewardToken: "RUSD",
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
        funded: "2,000 RUSD",
        fundedUSD: "$2,040.00", // RUSD slightly above $1
        fundedCKB: "163,200 CKB",
        expected: "2,000 RUSD",
        expectedUSD: "$2,040.00",
        expectedCKB: "163,200 CKB",
        completionPercentage: 100,
      },
      canStake: true,
      canUnstake: true,
      stakingPortalUrl: `/stake/bank-rusd-lp-001`,
      isExternalStaking: false,
    },
    {
      id: "bank-btc-lp-001",
      tokenName: "BANK/BTC LP-UTXOSwap",
      tokenSymbol: "BANK/BTC",
      tokenLogo: "https://picsum.photos/32/32?random=8",
      description:
        "High-value liquidity provider token staking for BANK/BTC trading pair. Earn BTC rewards for providing liquidity to this premium trading pair.",
      balance: "0",
      balanceUSD: "$0.00",
      balanceCKB: "0 CKB",
      effectiveAverage: "0",
      effectiveAverageUSD: "$0.00",
      effectiveAverageCKB: "0 CKB",
      estimatedRewards: "0",
      estimatedAPY: "0%",
      rewardToken: "BTC",
      periodDuration: 7,
      totalPeriods: 52,
      programStatus: "Preview",
      distributionMethod: "Periodic",
      distributionMode: "Proportional",
      minStakeAmount: "25",
      lockRequirement: "Lock until each snapshot",
      funding: {
        funded: "0 BTC",
        fundedUSD: "$0.00",
        fundedCKB: "0 CKB",
        expected: "0.1 BTC",
        expectedUSD: "$4,500.00",
        expectedCKB: "360,000 CKB",
        completionPercentage: 0,
      },
      canStake: false,
      canUnstake: false,
      stakingPortalUrl: null,
      isExternalStaking: false,
    },
    // PREVIEW PROGRAMS SECOND
    {
      id: "new-staking-001",
      tokenName: "NewToken",
      tokenSymbol: "NEW",
      tokenLogo: "https://picsum.photos/32/32?random=2",
      description:
        "Upcoming staking program for NEW token with extended 45-day periods. This program offers unlimited periods for long-term staking rewards.",
      balance: "0",
      balanceUSD: "$0.00",
      balanceCKB: "0 CKB",
      effectiveAverage: "0",
      effectiveAverageUSD: "$0.00",
      effectiveAverageCKB: "0 CKB",
      estimatedRewards: "0",
      estimatedAPY: "0%",
      rewardToken: "NEW",
      periodDuration: 45, // 45 days per period
      totalPeriods: null, // Unlimited periods
      distributionMode: "Even",
      minStakeAmount: "500",
      lockRequirement: "No time lock",
      // Program status - preview
      programStatus: "Preview",
      isConfigured: false,
      isFunded: false,
      distributionMethod: "Periodic",
      funding: {
        funded: "0 NEW",
        fundedUSD: "$0.00",
        fundedCKB: "0 CKB",
        expected: "1,000 NEW",
        expectedUSD: "$500.00",
        expectedCKB: "40,000 CKB",
        completionPercentage: 0,
      },
      canStake: false,
      canUnstake: false,
      stakingPortalUrl: null,
      isExternalStaking: false,
    },
    // CONFIGURED BUT NOT FUNDED PROGRAMS
    {
      id: "demo-staking-001",
      tokenName: "DemoToken",
      tokenSymbol: "DEMO",
      tokenLogo: "https://picsum.photos/32/32?random=3",
      description:
        "Demo staking program with end-only distribution after 180 days. Configuration is locked but awaiting funding to begin operations.",
      balance: "500.00",
      balanceUSD: "$250.00",
      balanceCKB: "50,000 CKB",
      effectiveAverage: "485.20",
      effectiveAverageUSD: "$242.60",
      effectiveAverageCKB: "48,520 CKB",
      estimatedRewards: "0", // No rewards until funded
      estimatedAPY: "0%",
      rewardToken: "DEMO",
      programDuration: 180, // 180 days total program
      distributionMode: "Proportional",
      minStakeAmount: "50",
      lockRequirement: "Lock until final distribution only",
      // Program status - configured but not funded
      programStatus: "Configured",
      isConfigured: true,
      isFunded: false,
      distributionMethod: "End-Only",
      // Total program funding
      funding: {
        funded: "0 DEMO",
        fundedUSD: "$0.00",
        fundedCKB: "0 CKB",
        expected: "5,000 DEMO",
        expectedUSD: "$2,500.00",
        expectedCKB: "500,000 CKB",
        completionPercentage: 0,
      },
      canStake: false,
      canUnstake: false,
      stakingPortalUrl: null,
      isExternalStaking: false,
    },
    {
      id: "partial-staking-001",
      tokenName: "PartialToken",
      tokenSymbol: "PART",
      tokenLogo: "https://picsum.photos/32/32?random=4",
      description:
        "Partially funded staking program with 90-day duration. Even distribution model ensures fair rewards for all participants once fully funded.",
      balance: "300.00",
      balanceUSD: "$450.00",
      balanceCKB: "37,500 CKB",
      effectiveAverage: "285.30",
      effectiveAverageUSD: "$427.95",
      effectiveAverageCKB: "35,662 CKB",
      estimatedRewards: "0", // No rewards until fully funded
      estimatedAPY: "0%",
      rewardToken: "BANK",
      programDuration: 90, // 90 days total program
      distributionMode: "Even",
      minStakeAmount: "200",
      lockRequirement: "Lock until each snapshot",
      // Program status - configured but partially funded (not ongoing until fully funded)
      programStatus: "Configured",
      isConfigured: true,
      isFunded: false, // Still needs full funding
      distributionMethod: "End-Only",
      funding: {
        funded: "2,500 BANK",
        fundedUSD: "$3,750.00",
        fundedCKB: "312,500 CKB",
        expected: "5,000 BANK",
        expectedUSD: "$7,500.00",
        expectedCKB: "625,000 CKB",
        completionPercentage: 50,
      },
      canStake: false, // Can't stake until fully funded
      canUnstake: false,
      stakingPortalUrl: null,
      isExternalStaking: false,
    },
    {
      id: "test-staking-001",
      tokenName: "TestToken",
      tokenSymbol: "TEST",
      tokenLogo: "https://picsum.photos/32/32?random=5",
      description:
        "Completed test staking program that ran for 120 days with proportional distribution. All rewards have been distributed and claimed.",
      balance: "750.00",
      balanceUSD: "$375.00",
      balanceCKB: "93,750 CKB",
      effectiveAverage: "698.45", // Whole program average for end-only
      effectiveAverageUSD: "$349.23",
      effectiveAverageCKB: "87,306 CKB",
      estimatedRewards: "0", // Program ended, no more estimates
      estimatedAPY: "0%",
      collectedRewards: "128.5", // Total rewards received from ended program
      rewardToken: "BANK",
      distributionReady: true,
      programDuration: 120, // Was 120 days total
      distributionMode: "Proportional",
      minStakeAmount: "25",
      lockRequirement: "Lock until final distribution only",
      // Program status
      programStatus: "Ended",
      isConfigured: true,
      isFunded: true,
      distributionMethod: "End-Only",
      // Total program funding
      funding: {
        funded: "1,600 BANK",
        fundedUSD: "$2,400.00",
        fundedCKB: "200,000 CKB",
        expected: "1,600 BANK",
        expectedUSD: "$2,400.00",
        expectedCKB: "200,000 CKB",
        completionPercentage: 100,
      },
      canStake: false,
      canUnstake: false,
      stakingPortalUrl: null,
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

  const isOngoing = (status: string) => status === "Ongoing"
  const isConfigured = (status: string) => status === "Configured"
  const isPreview = (status: string) => status === "Preview"

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
                  Dashboard
                </Link>
                <Link href="/programs" className="text-sm text-slate-600 hover:text-slate-900">
                  Programs
                </Link>
                <Link href="/deploy" className="text-sm text-slate-600 hover:text-slate-900">
                  Deploy
                </Link>
                <Link href="/configure" className="text-sm text-slate-600 hover:text-slate-900">
                  Configure
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
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Staking Dashboard</h1>
          <div className="flex items-center space-x-4">
            {!isConnected ? (
              <Button onClick={() => setIsConnected(true)}>
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-600">ckb1...abc123</span>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
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
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Total Staked Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$7,000.00</div>
                  <div className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +5.2% this period
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Average APY</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">18.9%</div>
                  <div className="text-sm text-slate-500 mt-1">across active programs</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Total Rewards Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">209.1</div>
                  <div className="text-sm text-slate-500 mt-1">BANK tokens (all time)</div>
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
                {mockPositions.map((position) => {
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
                                <Badge variant="secondary" className="text-xs">
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

                              {/* Program description */}
                              <p className="text-sm text-slate-600 mb-2 line-clamp-2">{position.description}</p>

                              {/* Key metrics always visible */}
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-slate-600">Currently Staked: </span>
                                  <span className="font-medium">
                                    {position.balance} {position.tokenSymbol}
                                  </span>
                                  <div className="text-xs text-slate-500">{position.balanceUSD}</div>
                                </div>
                                {position.programStatus === "Ongoing" && (
                                  <>
                                    <div>
                                      <span className="text-purple-600">Est. Rewards: </span>
                                      <span className="font-medium">
                                        {position.estimatedRewards} {position.rewardToken}
                                      </span>
                                      {position.distributionMethod === "Periodic" && (
                                        <div className="text-xs text-slate-500">per {position.periodDuration} days</div>
                                      )}
                                    </div>
                                    <div>
                                      <span className="text-green-600">APY: </span>
                                      <span className="font-medium text-green-600">{position.estimatedAPY}</span>
                                      <div className="text-xs text-slate-500">estimated</div>
                                    </div>
                                  </>
                                )}
                              </div>

                              {/* Show difference if significant */}
                              {hasDifference && position.programStatus === "Ongoing" && (
                                <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                                  <div className="text-blue-800">
                                    <strong>Effective Average:</strong> {position.effectiveAverage}{" "}
                                    {position.tokenSymbol}
                                    {position.stakingDate && (
                                      <span className="text-blue-600 ml-1">(staked {position.stakingDate})</span>
                                    )}
                                  </div>
                                  <div className="text-blue-600">
                                    Rewards calculated on effective average for this period
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col items-end space-y-1">
                            <div className="flex space-x-1">
                              {getProgramStatusBadge(position.programStatus)}
                              {getFundingBadge(position.funding.completionPercentage, position.programStatus)}
                            </div>
                            <div className="text-xs text-slate-500">
                              {getDistributionBadge(position.distributionMethod, position.totalPeriods)}
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        {/* Essential info always visible */}
                        <div className="grid grid-cols-4 gap-3 mb-4 p-3 bg-slate-50/50 rounded-lg">
                          <div className="text-center">
                            <div className="text-xs text-slate-500">Min Stake</div>
                            <div className="text-sm font-medium">
                              {position.minStakeAmount} {position.tokenSymbol}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-slate-500">Distribution</div>
                            <div className="text-sm font-medium">{position.distributionMode}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-slate-500">Rewards</div>
                            <div className="text-sm font-medium text-purple-600">{position.rewardToken}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-slate-500">
                              {position.distributionMethod === "Periodic" ? "Period" : "Duration"}
                            </div>
                            <div className="text-sm font-medium">
                              {position.distributionMethod === "Periodic"
                                ? `${position.periodDuration}d`
                                : `${position.programDuration}d`}
                            </div>
                          </div>
                        </div>

                        {/* Period Progress for Ongoing Periodic Programs - Always Visible */}
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
                                  <span className="text-xs">Snapshot</span>
                                </Button>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                      <HelpCircle className="w-3 h-3 text-slate-400" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-80 text-sm">
                                    <p>
                                      <strong>Manual Snapshot:</strong> Use if your recent balance changes aren't
                                      reflected in the effective average for the current period.
                                    </p>
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>
                            <Progress value={position.periodProgress} className="h-2 mb-2" />
                            <div className="flex items-center justify-between text-xs text-slate-500">
                              <span>{position.daysRemaining} days remaining</span>
                              {position.totalPeriods && (
                                <span>
                                  {position.remainingPeriods} of {position.totalPeriods} periods left
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Collapsible detailed information */}
                        <Collapsible open={isExpanded} onOpenChange={() => toggleCard(position.id)}>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="w-full justify-between p-2 h-8 text-xs">
                              <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                              <ChevronDown
                                className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                              />
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-3 mt-3">
                            {/* Effective Average and USD Values */}
                            {position.programStatus === "Ongoing" && (
                              <div className="grid md:grid-cols-2 gap-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <div>
                                  <div className="text-sm font-medium text-blue-900 mb-2">Position Details</div>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-blue-700">Current Balance:</span>
                                      <span className="font-medium">
                                        {position.balance} {position.tokenSymbol}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-blue-700">Effective Average:</span>
                                      <span className="font-medium">
                                        {position.effectiveAverage} {position.tokenSymbol}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-blue-700">USD Value:</span>
                                      <span className="font-medium">{position.effectiveAverageUSD}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-blue-700">CKB Value:</span>
                                      <span className="font-medium">{position.effectiveAverageCKB}</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-blue-900 mb-2">Rewards Summary</div>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-blue-700">Current Period:</span>
                                      <span className="font-medium">
                                        {position.estimatedRewards} {position.rewardToken}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-blue-700">Estimated APY:</span>
                                      <span className="font-medium text-green-600">{position.estimatedAPY}</span>
                                    </div>
                                    {position.collectedRewards && Number.parseFloat(position.collectedRewards) > 0 && (
                                      <div className="flex justify-between">
                                        <span className="text-blue-700">Collected:</span>
                                        <span className="font-medium">
                                          {position.collectedRewards} {position.rewardToken}
                                        </span>
                                      </div>
                                    )}
                                    <div className="flex justify-between">
                                      <span className="text-blue-700">Participation:</span>
                                      <span className="font-medium text-green-600">
                                        {position.userPosition?.participationRate || "100%"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Snapshot Information for Ongoing Programs */}
                            {position.programStatus === "Ongoing" && (
                              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                <div className="text-sm font-medium text-green-800 mb-1">Snapshot Status</div>
                                <div className="text-xs text-green-700 space-y-1">
                                  <div>Last snapshot: {position.lastSnapshot}</div>
                                  <div>Next snapshot: in {position.nextSnapshot}</div>
                                  <div>Last trigger: {position.lastTriggerTime}</div>
                                  <div>Status: Healthy • Daily snapshots active</div>
                                </div>
                              </div>
                            )}

                            {/* Funding Information */}
                            <div className="grid md:grid-cols-2 gap-4 p-3 bg-white rounded-lg border">
                              <div>
                                <div className="text-sm font-medium text-slate-600 mb-2">
                                  {position.distributionMethod === "Periodic"
                                    ? "Current Period Funding"
                                    : "Total Program Funding"}
                                </div>
                                <div className="space-y-1">
                                  <div className="text-sm">
                                    <span className="font-medium">
                                      {position.funding.funded} / {position.funding.expected}
                                    </span>
                                    <span className="text-slate-500 ml-2">
                                      ({position.funding.completionPercentage}%)
                                    </span>
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    {position.funding.fundedUSD} / {position.funding.expectedUSD}
                                  </div>
                                  <Progress value={position.funding.completionPercentage} className="h-1 mt-2" />
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-slate-600 mb-2">Program Configuration</div>
                                <div className="space-y-1 text-xs text-slate-600">
                                  <div>Lock: {position.lockRequirement}</div>
                                  <div>Method: {position.distributionMethod}</div>
                                  <div>Mode: {position.distributionMode}</div>
                                  {position.distributionMethod === "Periodic" ? (
                                    <div>
                                      Every {position.periodDuration} days
                                      {position.totalPeriods && ` (${position.totalPeriods} total)`}
                                    </div>
                                  ) : (
                                    <div>Duration: {position.programDuration} days</div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Total Program Funding for Limited Programs */}
                            {position.totalProgramFunding && position.distributionMethod === "Periodic" && (
                              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                                <div className="text-sm font-medium text-purple-900 mb-2">Total Program Funding</div>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-purple-700">Funded: </span>
                                    <span className="font-medium">{position.totalProgramFunding.funded}</span>
                                    <div className="text-xs text-purple-600">
                                      {position.totalProgramFunding.fundedUSD}
                                    </div>
                                  </div>
                                  <div>
                                    <span className="text-purple-700">Expected: </span>
                                    <span className="font-medium">{position.totalProgramFunding.expected}</span>
                                    <div className="text-xs text-purple-600">
                                      {position.totalProgramFunding.expectedUSD}
                                    </div>
                                  </div>
                                </div>
                                <Progress
                                  value={position.totalProgramFunding.completionPercentage}
                                  className="h-1 mt-2"
                                />
                                <div className="text-xs text-purple-700 mt-1">
                                  {position.totalProgramFunding.completionPercentage}% of total program funded
                                </div>
                              </div>
                            )}

                            {/* Status-specific information */}
                            {position.programStatus === "Preview" && (
                              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="text-sm font-medium text-blue-800 mb-1">Preview Mode</div>
                                <p className="text-xs text-blue-700">
                                  Configuration pending. Staking available once locked and funded.
                                </p>
                              </div>
                            )}

                            {position.programStatus === "Configured" && (
                              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                <div className="text-sm font-medium text-orange-800 mb-1">Awaiting Funding</div>
                                <p className="text-xs text-orange-700">
                                  Configuration locked. Needs{" "}
                                  {position.funding.completionPercentage === 0 ? "funding" : "full funding"} to start.
                                </p>
                              </div>
                            )}
                          </CollapsibleContent>
                        </Collapsible>

                        {/* Action buttons */}
                        <div className="flex items-center justify-between pt-3 border-t mt-3">
                          <div className="text-xs text-slate-500">
                            {position.programStatus === "Ongoing" ? (
                              <>Earning rewards • Last snapshot: {position.lastSnapshot}</>
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
                                {position.canStake && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                    className="h-7 px-2 text-xs bg-transparent"
                                  >
                                    <Link href={position.stakingPortalUrl}>
                                      <Coins className="w-3 h-3 mr-1" />
                                      Stake
                                    </Link>
                                  </Button>
                                )}
                                {position.canUnstake && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                    className="h-7 px-2 text-xs text-red-600 border-red-600 bg-transparent"
                                  >
                                    <Link href={`${position.stakingPortalUrl}?action=unstake`}>
                                      <ArrowDownRight className="w-3 h-3 mr-1" />
                                      Unstake
                                    </Link>
                                  </Button>
                                )}
                              </>
                            )}
                            <Button variant="outline" size="sm" asChild className="h-7 px-2 text-xs bg-transparent">
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
                          <span className="text-sm">BANK/CKB LP-UTXOSwap (14-day periods, 24 total)</span>
                          <Badge className="bg-green-600 text-white">Ongoing</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">BANK/RUSD LP-UTXOSwap (21-day periods, unlimited)</span>
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
