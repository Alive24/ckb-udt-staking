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

  RefreshCw,
  HelpCircle,
  ArrowUpDown,
  Gift,
  Clock,
  Calendar,
  Camera,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"

export default function ProgramsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [tokenFilter, setTokenFilter] = useState("all")

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

  // Mock programs data with updated LP token names
  const allPrograms = [
    {
      id: "bank-staking-001",
      tokenName: "BankToken",
      tokenSymbol: "BANK",
      tokenLogo: "https://picsum.photos/32/32?random=1",
      description:
        "BANK staking with 30-day periods and even distribution.",
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
      estimatedRewards: "1,250.0",
      estimatedAPY: "18.5%",
      collectedRewards: "2,480.0",
      rewardToken: "BANK",
      rewardType: "shared",
      lastSnapshot: "2 hours ago",
      nextSnapshot: "22 hours",
      programStatus: "Ongoing",
      distributionMethod: "Periodic",
      distributionMode: "Even",
      minStakeAmount: "100",
      lockRequirement: "Lock until each distribution",
      funding: {
        funded: "4,167 BANK",
        fundedUSD: "$6,250.50",
        fundedCKB: "520,875 CKB",
        expected: "4,167 BANK",
        expectedUSD: "$6,250.50",
        expectedCKB: "520,875 CKB",
        completionPercentage: 100,
      },
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
    },
    {
      id: "bank-ckb-lp-001",
      tokenName: "BANK/CKB Liquidity Pool on UTXOSwap",
      tokenSymbol: "LP-UTXOSwap (BANK/CKB)",
      tokenLogo: "https://picsum.photos/32/32?random=6",
      description:
        "Earn BANK rewards by providing BANK/CKB liquidity on UTXOSwap DEX.",
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
      estimatedRewards: "178.6",
      estimatedAPY: "22.3%",
      collectedRewards: "164.3",
      rewardToken: "BANK",
      rewardType: "shared",
      lastSnapshot: "1 day ago",
      nextSnapshot: "1 day",
      programStatus: "Ongoing",
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
      effectiveAverage: "720.00",
      effectiveAverageUSD: "$1,800.00",
      effectiveAverageCKB: "144,000 CKB",
      currentPeriod: "Period 1",
      periodDuration: 21,
      totalPeriods: null,
      remainingPeriods: null,
      periodProgress: 30,
      daysRemaining: 15,
      estimatedRewards: "4,762.0",
      estimatedAPY: "15.8%",
      collectedRewards: "0",
      rewardToken: "RUSD",
      rewardType: "individual",
      lastSnapshot: "3 hours ago",
      nextSnapshot: "21 hours",
      programStatus: "Ongoing",
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
    },
    {
      id: "bank-btc-lp-001",
      tokenName: "BANK/BTC Liquidity Pool on UTXOSwap",
      tokenSymbol: "LP-UTXOSwap (BANK/BTC)",
      tokenLogo: "https://picsum.photos/32/32?random=8",
      description:
        "Premium BANK/BTC liquidity pool earning BTC rewards.",
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
        "NEW token staking with 45-day periods and unlimited duration.",
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
                  My Stakings
                </Link>
                <Link href="/programs" className="text-sm text-purple-600 font-medium">
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
          <h1 className="text-xl font-semibold">Explore Programs</h1>
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
                                            <SelectItem value="LP-UTXOSwap (BANK/CKB)">BANK/CKB LP</SelectItem>
                            <SelectItem value="LP-UTXOSwap (BANK/RUSD)">BANK/RUSD LP</SelectItem>
                            <SelectItem value="LP-UTXOSwap (BANK/BTC)">BANK/BTC LP</SelectItem>
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
                  {/* Program Info - styled like dashboard */}
                  <div className="p-3 bg-slate-50/50 rounded-lg border space-y-3 mb-4">
                    {/* First row: Distribution, Rewards, Total Rewards, Periods Remaining (4 items) */}
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-3 text-center">
                        <div className="flex items-center justify-center mb-1">
                          <ArrowUpDown className="w-3 h-3 text-slate-500 mr-1" />
                          <div className="text-xs text-slate-500">Distribution Mode</div>
                        </div>
                        <div className="text-sm font-medium">
                          {program.distributionMethod} - {program.distributionMode}
                        </div>
                      </div>
                      <div className="col-span-3 text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Gift className="w-3 h-3 text-slate-500 mr-1" />
                          <div className="text-xs text-slate-500">Rewards</div>
                        </div>
                        <div className="text-sm font-medium text-purple-600">{program.rewardToken}</div>
                      </div>
                      <div className="col-span-3 text-center">
                        <div className="flex items-center justify-center mb-1">
                          <TrendingUp className="w-3 h-3 text-slate-500 mr-1" />
                          <div className="text-xs text-slate-500">Total Rewards</div>
                        </div>
                        <div className="text-sm font-medium text-green-600">
                          {program.funding.funded}
                          {program.distributionMode === "Even" && program.rewardType === "individual" && " (per staker)"}
                        </div>
                      </div>
                      <div className="col-span-3 text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Clock className="w-3 h-3 text-slate-500 mr-1" />
                          <div className="text-xs text-slate-500">Distribution Schedule</div>
                        </div>
                        <div className="text-sm font-medium">
                          {program.distributionMethod === "Periodic" && program.totalPeriods
                            ? `${program.totalPeriods} periods`
                            : program.distributionMethod === "Periodic" ? "Unlimited"
                            : "Single Payout"}
                        </div>
                      </div>
                    </div>
                    
                    {/* Second row: Minimum Stake, Lock Requirement, Period Duration, APY (4 items) */}
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-3 text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Coins className="w-3 h-3 text-slate-500 mr-1" />
                          <div className="text-xs text-slate-500">Minimum Stake</div>
                        </div>
                        <div className="text-sm font-medium">
                          {program.minStakeAmount} {program.tokenSymbol}
                        </div>
                      </div>
                      <div className="col-span-3 text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Lock className="w-3 h-3 text-slate-500 mr-1" />
                          <div className="text-xs text-slate-500">Lock Requirement</div>
                        </div>
                        <div className="text-sm font-medium">{program.lockRequirement}</div>
                      </div>
                      <div className="col-span-3 text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Calendar className="w-3 h-3 text-slate-500 mr-1" />
                          <div className="text-xs text-slate-500">
                            {program.distributionMethod === "Periodic" ? "Period Duration" : "Total Duration"}
                          </div>
                        </div>
                        <div className="text-sm font-medium">
                          {program.distributionMethod === "Periodic"
                            ? `${program.periodDuration} days`
                            : `${program.programDuration} days`}
                        </div>
                      </div>
                      <div className="col-span-3 text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Camera className="w-3 h-3 text-slate-500 mr-1" />
                          <div className="text-xs text-slate-500">APY</div>
                        </div>
                        <div className="text-sm font-medium text-green-600">{program.estimatedAPY || "0%"}</div>
                      </div>
                    </div>
                  </div>

                  {/* Status-specific notifications */}
                  {program.programStatus === "Preview" && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="text-sm font-medium text-blue-800 mb-1">Preview Mode</div>
                      <div className="text-xs text-blue-700">Configuration pending. Staking available once locked and funded.</div>
                    </div>
                  )}
                  
                  {program.programStatus === "Configured" && (
                    <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="text-sm font-medium text-orange-800 mb-1">Awaiting Funding</div>
                      <div className="text-xs text-orange-700">
                        Configuration locked. Needs{" "}
                        {program.funding.completionPercentage === 0 ? "funding" : "full funding"} to start.
                      </div>
                    </div>
                  )}

                  {program.programStatus === "Ended" && (
                    <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <div className="text-sm font-medium text-slate-800 mb-1">Program Completed</div>
                      <div className="text-xs text-slate-700">
                        All rewards distributed. Final APY: {program.estimatedAPY || "12.5%"}
                      </div>
                    </div>
                  )}

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

                  {/* Funding Status - always visible */}
                  <div className="mb-4 p-3 bg-white rounded-lg border">
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

                  <div className="flex items-center justify-between pt-3 border-t mt-3">
                    <div className="text-xs text-slate-500">
                      {program.programStatus === "Ongoing" ? (
                        <>Last snapshot: {program.lastSnapshot} • Next: in {program.nextSnapshot}</>
                      ) : program.programStatus === "Preview" ? (
                        <>Waiting for configuration</>
                      ) : program.programStatus === "Configured" ? (
                        <>Ready • Needs {program.funding.completionPercentage === 0 ? "funding" : "full funding"}</>
                      ) : (
                        <>Program completed</>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {program.programStatus === "Ongoing" && (
                        <>
                          {program.canStake && program.stakingPortalUrl && (
                            <Button
                              asChild
                              className="h-8 px-3 text-xs bg-green-600 hover:bg-green-700 text-white border-0 shadow-sm"
                            >
                              <Link href={program.stakingPortalUrl}>
                                <Coins className="w-3 h-3 mr-1" />
                                {program.tokenSymbol.includes('LP') ? (
                                  <span>
                                    Stake (Available: {walletBalances.BANK} BANK, {walletBalances.CKB || "0"} CKB)
                                  </span>
                                ) : (
                                  <span>
                                    Stake (Available: {walletBalances[program.tokenSymbol as keyof typeof walletBalances] || "0"} {program.tokenSymbol})
                                  </span>
                                )}
                              </Link>
                            </Button>
                          )}
                          {program.canUnstake && program.stakingPortalUrl && (
                            <Button
                              variant="outline"
                              size="default"
                              asChild
                              className="h-8 px-3 text-xs text-red-600 border-red-600 bg-transparent"
                            >
                              <Link href={`${program.stakingPortalUrl}?action=unstake`}>
                                <ArrowDownRight className="w-3 h-3 mr-1" />
                                Unstake
                              </Link>
                            </Button>
                          )}
                        </>
                      )}
                      <Button variant="outline" size="default" asChild className="h-8 px-3 text-xs bg-transparent">
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
