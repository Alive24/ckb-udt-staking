"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  ExternalLink,
  Play,
  Eye,
  Lock,
  CheckCircle,
  AlertTriangle,
  Coins,
  ArrowDownRight,
  ChevronDown,
  RefreshCw,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function ProgramsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [tokenFilter, setTokenFilter] = useState("all")
  const [expandedPrograms, setExpandedPrograms] = useState<Record<string, boolean>>({})

  const toggleExpand = (programId: string) => {
    setExpandedPrograms((prev) => ({
      ...prev,
      [programId]: !prev[programId],
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

  // Mock programs data with updated LP token names
  const allPrograms = [
    {
      id: "bank-staking-001",
      tokenName: "BankToken",
      tokenSymbol: "BANK",
      tokenLogo: "https://picsum.photos/32/32?random=1",
      description:
        "BANK token staking rewards program with monthly distribution periods using even distribution. Stake your BANK tokens to earn rewards every 30 days.",
      balance: "1,250.00",
      balanceUSD: "$1,875.00",
      balanceCKB: "156,250 CKB",
      effectiveAverage: "1,180.50",
      effectiveAverageUSD: "$1,770.75",
      effectiveAverageCKB: "147,562 CKB",
      currentPeriod: "Period 3",
      periodDuration: 30,
      totalPeriods: 12,
      remainingPeriods: 9,
      periodProgress: 65,
      daysRemaining: 11,
      estimatedRewards: "45.2",
      estimatedAPY: "18.5%",
      collectedRewards: "80.6",
      rewardToken: "BANK",
      lastSnapshot: "2 hours ago",
      nextSnapshot: "22 hours",
      programStatus: "Ongoing",
      distributionMethod: "Periodic",
      distributionMode: "Even",
      minStakeAmount: "100",
      lockRequirement: "Lock until each distribution",
      funding: {
        funded: "1,000 BANK",
        fundedUSD: "$1,500.00",
        fundedCKB: "125,000 CKB",
        expected: "1,000 BANK",
        expectedUSD: "$1,500.00",
        expectedCKB: "125,000 CKB",
        completionPercentage: 100,
      },
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
    },
    {
      id: "bank-ckb-lp-001",
      tokenName: "BANK/CKB LP-UTXOSwap",
      tokenSymbol: "BANK/CKB",
      tokenLogo: "https://picsum.photos/32/32?random=6",
      description:
        "Liquidity provider token staking for BANK/CKB trading pair on UTXOSwap. Earn BANK rewards for providing liquidity to the decentralized exchange.",
      balance: "850.00",
      balanceUSD: "$2,125.00",
      balanceCKB: "170,000 CKB",
      effectiveAverage: "850.00",
      effectiveAverageUSD: "$2,125.00",
      effectiveAverageCKB: "170,000 CKB",
      currentPeriod: "Period 2",
      periodDuration: 14,
      totalPeriods: 24,
      remainingPeriods: 22,
      periodProgress: 45,
      daysRemaining: 8,
      estimatedRewards: "32.1",
      estimatedAPY: "22.3%",
      collectedRewards: "28.4",
      rewardToken: "BANK",
      lastSnapshot: "1 day ago",
      nextSnapshot: "1 day",
      programStatus: "Ongoing",
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
      effectiveAverage: "720.00",
      effectiveAverageUSD: "$1,800.00",
      effectiveAverageCKB: "144,000 CKB",
      currentPeriod: "Period 1",
      periodDuration: 21,
      totalPeriods: null,
      remainingPeriods: null,
      periodProgress: 30,
      daysRemaining: 15,
      estimatedRewards: "85.7",
      estimatedAPY: "15.8%",
      collectedRewards: "0",
      rewardToken: "RUSD",
      lastSnapshot: "3 hours ago",
      nextSnapshot: "21 hours",
      programStatus: "Ongoing",
      distributionMethod: "Periodic",
      distributionMode: "Even",
      minStakeAmount: "100",
      lockRequirement: "Lock until each distribution",
      funding: {
        funded: "2,000 RUSD",
        fundedUSD: "$2,040.00",
        fundedCKB: "163,200 CKB",
        expected: "2,000 RUSD",
        expectedUSD: "$2,040.00",
        expectedCKB: "163,200 CKB",
        completionPercentage: 100,
      },
      canStake: true,
      canUnstake: true,
      stakingPortalUrl: `/stake/bank-rusd-lp-001`,
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
    },
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
      estimatedRewards: "0",
      estimatedAPY: "0%",
      rewardToken: "NEW",
      periodDuration: 45,
      totalPeriods: null,
      distributionMode: "Even",
      minStakeAmount: "500",
      lockRequirement: "No time lock",
      programStatus: "Preview",
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
    },
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
      estimatedRewards: "0",
      estimatedAPY: "0%",
      rewardToken: "DEMO",
      programDuration: 180,
      distributionMode: "Proportional",
      minStakeAmount: "50",
      lockRequirement: "Lock until final distribution only",
      programStatus: "Configured",
      distributionMethod: "End-Only",
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
      estimatedRewards: "0",
      estimatedAPY: "0%",
      rewardToken: "BANK",
      programDuration: 90,
      distributionMode: "Even",
      minStakeAmount: "200",
      lockRequirement: "Lock until each snapshot",
      programStatus: "Configured",
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
      canStake: false,
      canUnstake: false,
      stakingPortalUrl: null,
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
      effectiveAverage: "698.45",
      effectiveAverageUSD: "$349.23",
      effectiveAverageCKB: "87,306 CKB",
      estimatedRewards: "0",
      estimatedAPY: "0%",
      collectedRewards: "128.5",
      rewardToken: "BANK",
      programDuration: 120,
      distributionMode: "Proportional",
      minStakeAmount: "25",
      lockRequirement: "Lock until final distribution only",
      programStatus: "Ended",
      distributionMethod: "End-Only",
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
    },
  ]

  // Filter programs based on search and filters
  const filteredPrograms = allPrograms.filter((program) => {
    const matchesSearch =
      program.tokenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.tokenSymbol.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || program.programStatus.toLowerCase() === statusFilter.toLowerCase()
    const matchesToken = tokenFilter === "all" || program.tokenSymbol === tokenFilter

    return matchesSearch && matchesStatus && matchesToken
  })

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
      return null
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
    return null
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
                  Dashboard
                </Link>
                <Link href="/programs" className="text-sm text-purple-600 font-medium">
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
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">Staking Programs</h1>
          <p className="text-sm text-slate-600 mt-1">
            Discover and participate in staking programs across different tokens
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search programs by token name or symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="configured">Configured</SelectItem>
                <SelectItem value="preview">Preview</SelectItem>
                <SelectItem value="ended">Ended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tokenFilter} onValueChange={setTokenFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tokens</SelectItem>
                <SelectItem value="BANK">BANK</SelectItem>
                <SelectItem value="BANK/CKB">BANK/CKB LP</SelectItem>
                <SelectItem value="BANK/RUSD">BANK/RUSD LP</SelectItem>
                <SelectItem value="BANK/BTC">BANK/BTC LP</SelectItem>
                <SelectItem value="NEW">NEW</SelectItem>
                <SelectItem value="DEMO">DEMO</SelectItem>
                <SelectItem value="PART">PART</SelectItem>
                <SelectItem value="TEST">TEST</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="space-y-4">
          {filteredPrograms.map((program) => {
            const isExpanded = expandedPrograms[program.id] || false
            const hasDifference = hasStakingDifference(program.balance, program.effectiveAverage)

            return (
              <Card
                key={program.id}
                className={`transition-all duration-200 ${
                  program.programStatus === "Ongoing"
                    ? "border-green-200 bg-green-50/50"
                    : program.programStatus === "Preview"
                      ? "border-blue-200 bg-blue-50/50"
                      : program.programStatus === "Configured"
                        ? "border-orange-200 bg-orange-50/50"
                        : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={program.tokenLogo || "/placeholder.svg"}
                        alt={`${program.tokenSymbol} logo`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-base truncate">{program.tokenName}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {program.tokenSymbol}
                          </Badge>
                          <Link
                            href={`https://explorer.nervos.org/address/${program.tokenSymbol}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>

                        {/* Program description */}
                        <p className="text-sm text-slate-600 mb-2 line-clamp-2">{program.description}</p>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600">Wallet: </span>
                            <span className="font-medium">
                              {walletBalances[program.tokenSymbol] || "0.00"} {program.tokenSymbol}
                            </span>
                          </div>
                          {program.programStatus === "Ongoing" && (
                            <>
                              <div>
                                <span className="text-purple-600">Staked: </span>
                                <span className="font-medium">
                                  {program.balance} {program.tokenSymbol}
                                </span>
                              </div>
                              <div>
                                <span className="text-green-600">APY: </span>
                                <span className="font-medium text-green-600">{program.estimatedAPY}</span>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Show difference if significant */}
                        {hasDifference && program.programStatus === "Ongoing" && (
                          <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                            <div className="text-blue-800">
                              <strong>Effective Average:</strong> {program.effectiveAverage} {program.tokenSymbol}
                            </div>
                            <div className="text-blue-600">Rewards calculated on effective average for this period</div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-1">
                      <div className="flex space-x-1">
                        {getProgramStatusBadge(program.programStatus)}
                        {getFundingBadge(program.funding.completionPercentage, program.programStatus)}
                      </div>
                      <div className="text-xs text-slate-500">
                        {getDistributionBadge(program.distributionMethod, program.totalPeriods)}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="grid grid-cols-4 gap-3 mb-3 p-2 bg-slate-50/50 rounded-lg">
                    <div className="text-center">
                      <div className="text-xs text-slate-500">Min Stake</div>
                      <div className="text-sm font-medium">
                        {program.minStakeAmount} {program.tokenSymbol}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-500">Distribution</div>
                      <div className="text-sm font-medium">{program.distributionMode}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-500">Rewards</div>
                      <div className="text-sm font-medium text-purple-600">{program.rewardToken}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-500">
                        {program.distributionMethod === "Periodic" ? "Period" : "Duration"}
                      </div>
                      <div className="text-sm font-medium">
                        {program.distributionMethod === "Periodic"
                          ? `${program.periodDuration}d`
                          : `${program.programDuration}d`}
                      </div>
                    </div>
                  </div>

                  {/* Period Progress for Ongoing Periodic Programs - Always Visible */}
                  {program.programStatus === "Ongoing" && program.distributionMethod === "Periodic" && (
                    <div className="mb-4 p-3 bg-white rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          {program.currentPeriod} ({program.periodDuration} days)
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{program.periodProgress}%</span>
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
                                <strong>Manual Snapshot:</strong> Use if your recent balance changes aren't reflected in
                                the effective average for the current period.
                              </p>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <Progress value={program.periodProgress} className="h-2 mb-2" />
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{program.daysRemaining} days remaining</span>
                        {program.totalPeriods && (
                          <span>
                            {program.remainingPeriods} of {program.totalPeriods} periods left
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <Collapsible open={isExpanded} onOpenChange={() => toggleExpand(program.id)}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-full justify-between p-2 h-8 text-xs">
                        <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-3 mt-3">
                      {/* Same detailed content as dashboard but more compact */}
                      <div className="grid md:grid-cols-2 gap-4 p-3 bg-white rounded-lg border">
                        <div>
                          <div className="text-sm font-medium text-slate-600 mb-2">Funding Status</div>
                          <div className="space-y-1">
                            <div className="text-sm">
                              <span className="font-medium">
                                {program.funding.funded} / {program.funding.expected}
                              </span>
                              <span className="text-slate-500 ml-2">({program.funding.completionPercentage}%)</span>
                            </div>
                            <div className="text-xs text-slate-500">
                              {program.funding.fundedUSD} / {program.funding.expectedUSD}
                            </div>
                            {program.funding.completionPercentage === 0 && (
                              <div className="text-xs text-red-600 flex items-center">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Needs funding
                              </div>
                            )}
                            {program.funding.completionPercentage === 100 && (
                              <div className="text-xs text-green-600 flex items-center">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Fully funded
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-600 mb-2">Program Config</div>
                          <div className="space-y-1 text-xs text-slate-600">
                            <div>Lock: {program.lockRequirement}</div>
                            <div>Method: {program.distributionMethod}</div>
                            {program.distributionMethod === "Periodic" ? (
                              <div>
                                Every {program.periodDuration} days
                                {program.totalPeriods && ` (${program.totalPeriods} periods)`}
                              </div>
                            ) : (
                              <div>After {program.programDuration} days</div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Snapshot Information for Ongoing Programs */}
                      {program.programStatus === "Ongoing" && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="text-sm font-medium text-green-800 mb-1">Snapshot Status</div>
                          <div className="text-xs text-green-700 space-y-1">
                            <div>Last snapshot: {program.lastSnapshot}</div>
                            <div>Next snapshot: in {program.nextSnapshot}</div>
                            <div>Status: Healthy • Daily snapshots active</div>
                          </div>
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>

                  <div className="flex items-center justify-between pt-3 border-t mt-3">
                    <div className="text-xs text-slate-500">
                      {program.programStatus === "Preview" ? (
                        <>Waiting for configuration</>
                      ) : program.programStatus === "Configured" ? (
                        <>Ready • Needs {program.funding.completionPercentage === 0 ? "funding" : "full funding"}</>
                      ) : program.programStatus === "Ongoing" ? (
                        <>Live • Earning rewards</>
                      ) : (
                        <>Completed</>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {program.programStatus === "Ongoing" && (
                        <>
                          {program.canStake && (
                            <Button variant="outline" size="sm" asChild className="h-7 px-2 text-xs bg-transparent">
                              <Link href={program.stakingPortalUrl}>
                                <Coins className="w-3 h-3 mr-1" />
                                Stake
                              </Link>
                            </Button>
                          )}
                          {program.canUnstake && (
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="h-7 px-2 text-xs text-red-600 border-red-600 bg-transparent"
                            >
                              <Link href={`${program.stakingPortalUrl}?action=unstake`}>
                                <ArrowDownRight className="w-3 h-3 mr-1" />
                                Unstake
                              </Link>
                            </Button>
                          )}
                        </>
                      )}
                      <Button variant="outline" size="sm" asChild className="h-7 px-2 text-xs bg-transparent">
                        <Link href={`/program/${program.id}`}>Details</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-16">
            <div className="text-slate-400 mb-4">No programs found matching your criteria</div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setStatusFilter("all")
                setTokenFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
