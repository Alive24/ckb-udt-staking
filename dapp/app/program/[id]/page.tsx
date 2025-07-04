"use client"
import {
  ArrowLeft,
  Calendar,
  Clock,
  RefreshCw,
  TrendingUp,
  HelpCircle,
  Settings,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Play,
  Users,
  Globe,
  Cloud,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"

export default function ProgramDetailPage() {
  // Mock program data - using BANK with even distribution
  const program = {
    id: "bank-staking-001",
    tokenName: "BankToken",
    tokenSymbol: "BANK",
    tokenAddress: "0x1234...abcd",
    description:
      "BANK token staking rewards program with monthly distribution periods using even distribution. Stake your BANK tokens to earn rewards every 30 days. This program uses an even distribution model where all qualified stakers receive equal rewards regardless of stake size, promoting fair participation across all community members.",
    totalStaked: "125,000.00",
    totalParticipants: 342,
    currentPeriod: {
      id: 3,
      name: "Period 3",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      progress: 65,
      participantCount: 287,
      averageStaked: "118,500.00",
    },
    userPosition: {
      balance: "1,250.00",
      effectiveAverage: "1,180.50", // Current period only for periodic
      estimatedRewards: "45.2", // Current period only
      collectedRewards: "80.6", // From previous periods
      participationRate: "95%",
    },
    // Program status
    programStatus: "Ongoing",
    isLocked: true,
    distributionMethod: "Periodic",
    distributionMode: "Even",
    minStakeAmount: "1000",
    lockRequirement: "Lock after each distribution",
    // Current period funding
    funding: {
      funded: "1,000 BANK",
      expected: "1,000 BANK",
      completionPercentage: 100,
    },
    // Period history for periodic programs
    periods: [
      {
        id: 1,
        name: "Period 1",
        startDate: "2023-11-15",
        endDate: "2023-12-15",
        status: "Completed",
        funded: "1,100 BANK",
        expected: "1,100 BANK",
        participants: 198,
        userRewards: "42.1 BANK",
        claimed: true,
        description: "The first monthly distribution period for the BANK staking program.",
      },
      {
        id: 2,
        name: "Period 2",
        startDate: "2023-12-15",
        endDate: "2024-01-15",
        status: "Completed",
        funded: "950 BANK",
        expected: "950 BANK",
        participants: 265,
        userRewards: "38.5 BANK",
        claimed: true,
        description: "The second monthly distribution period for the BANK staking program.",
      },
      {
        id: 3,
        name: "Period 3",
        startDate: "2024-01-15",
        endDate: "2024-02-15",
        status: "Active",
        funded: "1,000 BANK",
        expected: "1,000 BANK",
        participants: 287,
        userRewards: "45.2 BANK (estimated)",
        claimed: false,
        description: "The third and current monthly distribution period for the BANK staking program.",
      },
      {
        id: 4,
        name: "Period 4",
        startDate: "2024-02-15",
        endDate: "2024-03-15",
        status: "Upcoming",
        funded: "1,200 BANK",
        expected: "1,200 BANK",
        participants: null,
        userRewards: null,
        claimed: false,
        description: "The fourth monthly distribution period for the BANK staking program.",
      },
      {
        id: 5,
        name: "Period 5",
        startDate: "2024-03-15",
        endDate: "2024-04-15",
        status: "Upcoming",
        funded: "0 BANK",
        expected: "1,000 BANK",
        participants: null,
        userRewards: null,
        claimed: false,
        description: "The fifth monthly distribution period for the BANK staking program. Funding is needed.",
      },
    ],
    // Configuration information
    configuration: {
      deploymentDate: "2024-01-01",
      rewardType: "Possession-Based",
      periodDuration: "30 days",
      snapshotFrequency: "Daily",
      rewardToken: "BANK",
      targetType: "Regular UDT Tokens",
      createdDate: "2023-12-01",
      deployer: "0xabcd...1234",
      description:
        "Configuration settings for the BANK staking program, including reward type, period duration, and snapshot frequency.",
    },
    // Automation setup
    automation: {
      provider: "cloudflare",
      workerName: "bank-staking-snapshots",
      isDeployed: true,
      lastTrigger: "2024-02-10 00:00:15 UTC",
      expectedFrequency: "Daily", // Expected frequency
      actualFrequency: "Daily", // Actual observed frequency
      status: "Healthy", // Healthy, Under-triggered, Over-triggered
      triggerHealth: "On schedule - last 5 triggers within expected timeframe",
    },
  }

  // Mock all stakers data
  const allStakers = [
    {
      address: "ckb1...abc123",
      balance: "1,250.00",
      effectiveAverage: "1,180.50",
      estimatedRewards: "45.2",
      participationRate: "95%",
      isCurrentUser: true,
    },
    {
      address: "ckb1...def456",
      balance: "2,100.00",
      effectiveAverage: "2,050.30",
      estimatedRewards: "45.2",
      participationRate: "98%",
      isCurrentUser: false,
    },
    {
      address: "ckb1...ghi789",
      balance: "1,800.00",
      effectiveAverage: "1,720.80",
      estimatedRewards: "45.2",
      participationRate: "96%",
      isCurrentUser: false,
    },
    {
      address: "ckb1...jkl012",
      balance: "1,500.00",
      effectiveAverage: "1,450.20",
      estimatedRewards: "45.2",
      participationRate: "97%",
      isCurrentUser: false,
    },
    {
      address: "ckb1...mno345",
      balance: "1,000.00",
      effectiveAverage: "1,000.00",
      estimatedRewards: "45.2",
      participationRate: "100%",
      isCurrentUser: false,
    },
  ]

  // Mock snapshot history with all stakers
  const snapshots = [
    {
      date: "2024-02-10",
      triggeredBy: "Auto",
      triggerTime: "2024-02-10 00:00:15 UTC",
      totalStaked: "125,000.00",
      participantCount: 287,
      stakers: [
        { address: "ckb1...abc123", balance: "1,250.00", isCurrentUser: true },
        { address: "ckb1...def456", balance: "2,100.00", isCurrentUser: false },
        { address: "ckb1...ghi789", balance: "1,800.00", isCurrentUser: false },
        { address: "ckb1...jkl012", balance: "1,500.00", isCurrentUser: false },
        { address: "ckb1...mno345", balance: "1,000.00", isCurrentUser: false },
      ],
    },
    {
      date: "2024-02-09",
      triggeredBy: "Auto",
      triggerTime: "2024-02-09 00:00:12 UTC",
      totalStaked: "124,500.00",
      participantCount: 285,
      stakers: [
        { address: "ckb1...abc123", balance: "1,180.00", isCurrentUser: true },
        { address: "ckb1...def456", balance: "2,080.00", isCurrentUser: false },
        { address: "ckb1...ghi789", balance: "1,780.00", isCurrentUser: false },
        { address: "ckb1...jkl012", balance: "1,480.00", isCurrentUser: false },
        { address: "ckb1...mno345", balance: "1,000.00", isCurrentUser: false },
      ],
    },
    {
      date: "2024-02-08",
      triggeredBy: "Manual",
      triggerTime: "2024-02-08 14:32:08 UTC",
      totalStaked: "124,200.00",
      participantCount: 284,
      stakers: [
        { address: "ckb1...abc123", balance: "1,180.00", isCurrentUser: true },
        { address: "ckb1...def456", balance: "2,060.00", isCurrentUser: false },
        { address: "ckb1...ghi789", balance: "1,760.00", isCurrentUser: false },
        { address: "ckb1...jkl012", balance: "1,460.00", isCurrentUser: false },
        { address: "ckb1...mno345", balance: "1,000.00", isCurrentUser: false },
      ],
    },
  ]

  // Mock trigger history
  const triggerHistory = [
    {
      date: "2024-02-10",
      time: "00:00:15 UTC",
      type: "Auto",
      status: "Success",
      participants: 287,
      duration: "2.3s",
      pubkey: "0x1a2b...5678",
    },
    {
      date: "2024-02-09",
      time: "00:00:12 UTC",
      type: "Auto",
      status: "Success",
      participants: 285,
      duration: "1.8s",
      pubkey: "0x1a2b...5678",
    },
    {
      date: "2024-02-08",
      time: "14:32:08 UTC",
      type: "Manual",
      status: "Success",
      participants: 284,
      duration: "2.1s",
      pubkey: "0x9abc...def0",
    },
    {
      date: "2024-02-07",
      time: "00:00:09 UTC",
      type: "Auto",
      status: "Success",
      participants: 282,
      duration: "1.9s",
      pubkey: "0x1a2b...5678",
    },
    {
      date: "2024-02-06",
      time: "00:00:11 UTC",
      type: "Auto",
      status: "Retry",
      participants: 280,
      duration: "4.2s",
      pubkey: "0x1a2b...5678",
    },
  ]

  const isOngoing = program.programStatus === "Ongoing"

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className={`border-b ${isOngoing ? "bg-green-50" : "bg-white"}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-semibold flex items-center space-x-2">
                  <span>{program.tokenName} Staking Program</span>
                  <Badge variant="secondary">{program.tokenSymbol}</Badge>
                </h1>
                <p className="text-sm text-slate-600 mt-1">{program.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/program/${program.id}/manage`}>
                  <Settings className="w-4 h-4 mr-2" />
                  Manage
                </Link>
              </Button>
              <div className="flex flex-col space-y-1">
                <div className="flex space-x-1">
                  <Badge className="bg-green-600 text-white border-0 text-xs">
                    <Play className="w-3 h-3 mr-1" />
                    Ongoing
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                    Fully Funded
                  </Badge>
                </div>
                <div className="flex space-x-1">
                  <Badge variant="outline" className="text-purple-600 border-purple-600 text-xs">
                    {program.distributionMethod} ({program.distributionMode})
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Ongoing Program Banner */}
        {isOngoing && (
          <div className="mb-8 p-6 bg-green-100 border border-green-200 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <Play className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-green-800">Live Staking Program</h2>
              <Badge className="bg-green-600 text-white border-0">{program.distributionMethod} Distribution</Badge>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {program.distributionMode} Mode
              </Badge>
            </div>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-green-700">Configuration locked</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-green-700">Current period funded</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-green-700">Earning rewards</span>
              </div>
              <div className="flex items-center space-x-2">
                <Cloud className="w-4 h-4 text-green-600" />
                <span className="text-green-700">Automation active</span>
              </div>
            </div>
          </div>
        )}

        {/* Automation Status */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <span>Snapshot Automation Status</span>
              <Badge
                className={`text-xs ${
                  program.automation.status === "Healthy"
                    ? "bg-green-600 text-white"
                    : program.automation.status === "Under-triggered"
                      ? "bg-orange-600 text-white"
                      : "bg-red-600 text-white"
                }`}
              >
                {program.automation.status}
              </Badge>
            </CardTitle>
            <CardDescription>Decentralized snapshot triggering - anyone can trigger snapshots</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-slate-600">Expected Frequency</div>
                <div className="font-medium">{program.automation.expectedFrequency}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600">Actual Frequency</div>
                <div className="font-medium">{program.automation.actualFrequency}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600">Last Trigger</div>
                <div className="font-medium">{program.automation.lastTrigger}</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="text-sm text-slate-600 mb-2">Trigger Health:</div>
              <div
                className={`text-sm ${
                  program.automation.status === "Healthy"
                    ? "text-green-700"
                    : program.automation.status === "Under-triggered"
                      ? "text-orange-700"
                      : "text-red-700"
                }`}
              >
                {program.automation.triggerHealth}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="text-sm text-slate-500">
                Triggering is decentralized - any authorized party can trigger snapshots
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Globe className="w-3 h-3 mr-1" />
                  Deploy Worker
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-3 h-3 mr-1" />
                  Configure Webhook
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className={isOngoing ? "border-green-200 bg-green-50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Staked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{program.totalStaked}</div>
              <div className="text-sm text-slate-500 mt-1">{program.tokenSymbol} tokens</div>
            </CardContent>
          </Card>

          <Card className={isOngoing ? "border-green-200 bg-green-50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{program.totalParticipants}</div>
              <div className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12 this period
              </div>
            </CardContent>
          </Card>

          <Card className={isOngoing ? "border-green-200 bg-green-50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Your Position</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{program.userPosition.balance}</div>
              <div className="text-sm text-slate-500 mt-1">
                Avg: {program.userPosition.effectiveAverage} (current period)
              </div>
            </CardContent>
          </Card>

          <Card className={isOngoing ? "border-green-200 bg-green-50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Current Period Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{program.userPosition.estimatedRewards}</div>
              <div className="text-sm text-slate-500 mt-1">{program.configuration.rewardToken} (estimated)</div>
              <div className="text-xs text-green-600 font-medium mt-1">Est. APY: 18.5%</div>
            </CardContent>
          </Card>
        </div>

        {/* Program Requirements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Program Configuration</CardTitle>
            <CardDescription>Distribution mode and staking requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div>
                <div className="text-sm text-slate-600">Distribution Mode</div>
                <div className="font-medium">{program.distributionMode}</div>
                <div className="text-xs text-slate-500">
                  {program.distributionMode === "Even"
                    ? "Equal rewards for all qualified stakers"
                    : "Proportional to stake amount"}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-600">Min Stake Required</div>
                <div className="font-medium">
                  {program.minStakeAmount} {program.tokenSymbol}
                </div>
                <div className="text-xs text-slate-500">To qualify for rewards</div>
              </div>
              <div>
                <div className="text-sm text-slate-600">Lock Requirement</div>
                <div className="font-medium">{program.lockRequirement}</div>
                <div className="text-xs text-slate-500">CKB time lock setting</div>
              </div>
              <div>
                <div className="text-sm text-slate-600">Qualified Stakers</div>
                <div className="font-medium">{allStakers.length}</div>
                <div className="text-xs text-slate-500">Meet minimum requirement</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Period Funding */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span>Current Period Funding</span>
            </CardTitle>
            <CardDescription>Funding status for {program.currentPeriod.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-lg font-bold text-green-600">
                  {program.funding.funded} / {program.funding.expected}
                </div>
                <div className="text-sm text-green-700">({program.funding.completionPercentage}%)</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-lg font-bold text-blue-600">{program.currentPeriod.participantCount}</div>
                <div className="text-sm text-blue-700">Participants This Period</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Period Status */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{program.currentPeriod.name}</span>
                </CardTitle>
                <CardDescription>
                  {program.currentPeriod.startDate} - {program.currentPeriod.endDate}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-600">Period Rewards</div>
                <div className="text-lg font-semibold">{program.funding.funded}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Period Progress</span>
                <span className="text-sm font-medium">{program.currentPeriod.progress}%</span>
              </div>
              <Progress value={program.currentPeriod.progress} className="h-2" />
            </div>

            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-sm text-slate-600">Participants</div>
                <div className="text-lg font-semibold">{program.currentPeriod.participantCount}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-600">Average Staked</div>
                <div className="text-lg font-semibold">{program.currentPeriod.averageStaked}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-600">Your Participation</div>
                <div className="text-lg font-semibold text-green-600">{program.userPosition.participationRate}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-slate-500">Last snapshot: 2 hours ago • Next in 22 hours</div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="text-xs">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Snapshot
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-1">
                      <HelpCircle className="w-3 h-3 text-slate-400" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 text-sm">
                    <p>
                      <strong>Manual Snapshot:</strong> Use if your recent balance changes aren't reflected in the
                      effective average for the current period.
                    </p>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="periods" className="space-y-6">
          <TabsList>
            <TabsTrigger value="periods">Period History</TabsTrigger>
            <TabsTrigger value="snapshots">Snapshot History</TabsTrigger>
            <TabsTrigger value="stakers">All Stakers</TabsTrigger>
            <TabsTrigger value="triggers">Trigger History</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="periods" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Period-by-Period History</CardTitle>
                <CardDescription>
                  Funding and rewards for each period ({program.distributionMode} distribution)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {program.periods.map((period) => (
                    <div key={period.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-medium">{period.name}</div>
                          <div className="text-sm text-slate-500">
                            {period.startDate} - {period.endDate}
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            period.status === "Completed"
                              ? "text-green-600 border-green-600"
                              : period.status === "Active"
                                ? "text-blue-600 border-blue-600"
                                : "text-slate-600 border-slate-600"
                          }
                        >
                          {period.status}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-slate-600">Funded</div>
                          <div className="font-semibold text-green-600">{period.funded}</div>
                          <div className="text-xs text-slate-500">of {period.expected}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-600">Participants</div>
                          <div className="font-semibold">{period.participants || "TBD"}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-600">Your Rewards</div>
                          <div className="font-semibold text-purple-600">{period.userRewards || "TBD"}</div>
                          {period.claimed && (
                            <Badge variant="outline" className="text-green-600 border-green-600 text-xs mt-1">
                              Claimed
                            </Badge>
                          )}
                        </div>
                        <div>
                          <div className="text-sm text-slate-600">Funding Status</div>
                          <div className="flex items-center space-x-2">
                            <Progress value={period.funded.startsWith("0") ? 0 : 100} className="h-2 flex-1" />
                            <span className="text-xs font-medium">{period.funded.startsWith("0") ? "0%" : "100%"}</span>
                          </div>
                        </div>
                      </div>

                      {period.status === "Upcoming" && period.funded.startsWith("0") && (
                        <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-700">
                          <AlertTriangle className="w-3 h-3 inline mr-1" />
                          This period needs funding before it can begin
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="snapshots" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Snapshots</CardTitle>
                <CardDescription>
                  Daily snapshots used to calculate effective averages for the current period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {snapshots.map((snapshot, index) => (
                    <div key={index} className="border rounded-lg">
                      <div className="flex items-center justify-between p-3 border-b">
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <div>
                            <div className="font-medium">{snapshot.date}</div>
                            <div className="text-sm text-slate-500">
                              Triggered: {snapshot.triggeredBy} at {snapshot.triggerTime}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">Total: {snapshot.totalStaked}</div>
                          <div className="text-sm text-slate-500">{snapshot.participantCount} participants</div>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="text-sm font-medium mb-2">Staker Balances:</div>
                        <div className="space-y-1 max-h-32 overflow-y-auto">
                          {snapshot.stakers.map((staker, stakerIndex) => (
                            <div
                              key={stakerIndex}
                              className={`flex items-center justify-between text-sm p-2 rounded ${staker.isCurrentUser ? "bg-blue-50 border border-blue-200" : "bg-slate-50"}`}
                            >
                              <span
                                className={`font-mono ${staker.isCurrentUser ? "font-medium text-blue-700" : "text-slate-600"}`}
                              >
                                {staker.address} {staker.isCurrentUser && "(You)"}
                              </span>
                              <span className="font-medium">{staker.balance}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stakers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Stakers</CardTitle>
                <CardDescription>
                  Public staking records for all participants in the current period ({program.distributionMode}{" "}
                  distribution)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {allStakers.map((staker, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg ${staker.isCurrentUser ? "border-blue-200 bg-blue-50" : ""}`}
                    >
                      <div className="grid md:grid-cols-5 gap-4">
                        <div>
                          <div className="text-sm text-slate-600">Address</div>
                          <div
                            className={`font-mono text-sm ${staker.isCurrentUser ? "font-medium text-blue-700" : ""}`}
                          >
                            {staker.address} {staker.isCurrentUser && "(You)"}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-600">Current Balance</div>
                          <div className="font-semibold">
                            {staker.balance} {program.tokenSymbol}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-600">Effective Average</div>
                          <div className="font-semibold">
                            {staker.effectiveAverage} {program.tokenSymbol}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-600">Est. Rewards</div>
                          <div className="font-semibold text-purple-600">
                            {staker.estimatedRewards} {program.configuration.rewardToken}
                          </div>
                          {program.distributionMode === "Even" && (
                            <div className="text-xs text-slate-500">Equal share</div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm text-slate-600">Participation</div>
                          <div className="font-semibold text-green-600">{staker.participationRate}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <strong>{program.distributionMode} Distribution:</strong>{" "}
                    {program.distributionMode === "Even"
                      ? `All stakers with ≥${program.minStakeAmount} ${program.tokenSymbol} receive equal rewards (${program.userPosition.estimatedRewards} ${program.configuration.rewardToken} each).`
                      : "Rewards are distributed proportionally based on each staker's effective average balance."}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="triggers" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Snapshot Trigger History</CardTitle>
                    <CardDescription>
                      Automated and manual snapshot triggers via{" "}
                      {program.automation.provider === "cloudflare" ? "Cloudflare Workers" : "AWS Lambda"}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Globe className="w-3 h-3 mr-1" />
                    Deploy Worker
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {triggerHistory.map((trigger, index) => (
                    <div key={index} className="border rounded-lg">
                      <div className="flex items-center justify-between p-3 border-b">
                        <div className="flex items-center space-x-3">
                          {trigger.type === "Auto" ? (
                            <Zap className="w-4 h-4 text-blue-500" />
                          ) : (
                            <Users className="w-4 h-4 text-purple-500" />
                          )}
                          <div>
                            <div className="font-medium">
                              {trigger.date} {trigger.time}
                            </div>
                            <div className="text-sm text-slate-500">
                              {trigger.type} trigger • {trigger.participants} participants
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="outline"
                            className={
                              trigger.status === "Success"
                                ? "text-green-600 border-green-600"
                                : trigger.status === "Retry"
                                  ? "text-orange-600 border-orange-600"
                                  : "text-red-600 border-red-600"
                            }
                          >
                            {trigger.status}
                          </Badge>
                          <div className="text-sm text-slate-500 mt-1">{trigger.duration}</div>
                        </div>
                      </div>
                      <div className="p-3 bg-slate-50">
                        <div className="text-sm text-slate-600">Triggered by:</div>
                        <div className="font-mono text-sm">{trigger.pubkey}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Automation Status:</strong> {program.automation.status} • Triggering is decentralized
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Program Configuration</CardTitle>
                <CardDescription>Locked program settings and parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-slate-600">Token Information</div>
                      <div className="mt-1">
                        <div className="text-sm">Name: {program.tokenName}</div>
                        <div className="text-sm">Symbol: {program.tokenSymbol}</div>
                        <div className="text-sm font-mono">Address: {program.tokenAddress}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-slate-600">Reward Configuration</div>
                      <div className="mt-1">
                        <div className="text-sm">Type: {program.configuration.rewardType}</div>
                        <div className="text-sm">Reward Token: {program.configuration.rewardToken}</div>
                        <div className="text-sm">Target: {program.configuration.targetType}</div>
                        <div className="text-sm">
                          Distribution: {program.distributionMethod} ({program.distributionMode})
                        </div>
                        <div className="text-sm">
                          Min Stake: {program.minStakeAmount} {program.tokenSymbol}
                        </div>
                        <div className="text-sm">Lock Requirement: {program.lockRequirement}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-slate-600">Period Settings</div>
                      <div className="mt-1">
                        <div className="text-sm">Duration: {program.configuration.periodDuration}</div>
                        <div className="text-sm">Snapshot Frequency: {program.configuration.snapshotFrequency}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
