"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Coins, Info, ArrowDownRight, AlertTriangle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function StakingPortalPage({
  params,
  searchParams,
}: {
  params: { programId: string }
  searchParams: { action?: string }
}) {
  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeAmount, setUnstakeAmount] = useState("")
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)
  const [activeTab, setActiveTab] = useState("stake")

  // Set initial tab based on URL parameter
  useEffect(() => {
    if (searchParams.action === "unstake") {
      setActiveTab("unstake")
    }
  }, [searchParams.action])

  // Mock program data
  const program = {
    id: params.programId,
    tokenName: "BANK/CKB LP-UTXOSwap",
    tokenSymbol: "BANK/CKB",
    tokenLogo: "https://picsum.photos/48/48?random=1",
    currentBalance: "1,250.00",
    availableBalance: "2,500.00",
    currentPeriod: "Period 3",
    periodDuration: 30, // 30 days per period
    totalPeriods: 12, // Limited to 12 periods
    remainingPeriods: 9, // 9 periods left
    daysRemaining: 11,
    estimatedAPY: "15.2%",
    nextRewardDistribution: "2024-02-15",
    distributionMethod: "Periodic",
    programStatus: "Ongoing",
    collectedRewards: "80.6",
    rewardToken: "BANK",
    walletBalance: "5,420.50",
  }

  // Calculate how much more is needed to deposit
  const calculateRemainingDeposit = () => {
    const current = Number.parseFloat(program.currentBalance.replace(",", ""))
    const available = Number.parseFloat(program.availableBalance.replace(",", ""))
    const stakeAmountNum = Number.parseFloat(stakeAmount) || 0

    if (stakeAmountNum > available) {
      return (stakeAmountNum - available).toLocaleString()
    }
    return "0"
  }

  const handleStake = async () => {
    setIsStaking(true)
    // Simulate staking transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsStaking(false)
    setStakeAmount("")
    // Show success message or redirect
  }

  const handleUnstake = async () => {
    setIsUnstaking(true)
    // Simulate unstaking transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsUnstaking(false)
    setUnstakeAmount("")
    // Show success message or redirect
  }

  // Calculate period-based rewards
  const calculatePeriodRewards = (amount: number) => {
    const annualRate = 0.152 // 15.2% APY
    const periodRate = (annualRate * program.periodDuration) / 365
    return (amount * periodRate).toFixed(2)
  }

  // Calculate 30-day standardized rewards
  const calculate30DayRewards = (amount: number) => {
    const annualRate = 0.152 // 15.2% APY
    const thirtyDayRate = (annualRate * 30) / 365
    return (amount * thirtyDayRate).toFixed(2)
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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center space-x-3">
              <img
                src={program.tokenLogo || "/placeholder.svg"}
                alt={`${program.tokenSymbol} logo`}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-semibold">{program.tokenName} Staking Portal</h1>
                  <Link
                    href={`https://explorer.nervos.org/address/${program.tokenSymbol}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
                <p className="text-sm text-slate-600">
                  Manage your staking position in {program.currentPeriod} ({program.periodDuration} days)
                  {program.totalPeriods && ` • ${program.remainingPeriods} of ${program.totalPeriods} periods left`}
                </p>
                <p className="text-sm text-slate-500">
                  Wallet Balance: {program.walletBalance} {program.tokenSymbol}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          {/* Info Banner */}
          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Reward Token:</strong> This program distributes {program.rewardToken} tokens as rewards.
              Automation setup is required but can be configured later.
            </AlertDescription>
          </Alert>

          {/* Program Overview */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Coins className="w-5 h-5 text-green-600" />
                <span>Program Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-sm text-slate-600">Current Staked</div>
                  <div className="text-lg font-semibold">
                    {program.currentBalance} {program.tokenSymbol}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-600">Period Duration</div>
                  <div className="text-lg font-semibold text-blue-600">{program.periodDuration} days</div>
                  <div className="text-xs text-slate-500">{program.daysRemaining} remaining</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-600">Estimated APY</div>
                  <div className="text-lg font-semibold text-green-600">{program.estimatedAPY}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-600">Rewards Collected</div>
                  <div className="text-lg font-semibold text-purple-600">
                    {program.collectedRewards} {program.rewardToken}
                  </div>
                  <div className="text-xs text-slate-500">from previous periods</div>
                </div>
              </div>
              {program.totalPeriods && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <strong>Limited Program:</strong> {program.remainingPeriods} of {program.totalPeriods} periods
                    remaining. Program will end after {program.totalPeriods * program.periodDuration} total days.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Staking/Unstaking Interface */}
          <Card>
            <CardHeader>
              <CardTitle>Manage Position</CardTitle>
              <CardDescription>
                Stake or unstake {program.tokenSymbol} tokens for {program.periodDuration}-day periods
                {program.totalPeriods && ` (${program.remainingPeriods} periods remaining)`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="stake">Stake Tokens</TabsTrigger>
                  <TabsTrigger value="unstake">Unstake Tokens</TabsTrigger>
                </TabsList>

                <TabsContent value="stake" className="space-y-6 mt-6">
                  <div>
                    <Label htmlFor="stakeAmount">Amount to Stake</Label>
                    <div className="mt-1 relative">
                      <Input
                        id="stakeAmount"
                        type="number"
                        placeholder="0.00"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        className="pr-16"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-sm text-slate-500">{program.tokenSymbol}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-sm text-slate-500">
                      <span>
                        Available: {program.availableBalance} {program.tokenSymbol}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-auto p-1"
                        onClick={() => setStakeAmount(program.availableBalance)}
                      >
                        Max
                      </Button>
                    </div>
                    {stakeAmount &&
                      Number.parseFloat(stakeAmount) > Number.parseFloat(program.availableBalance.replace(",", "")) && (
                        <div className="mt-2 text-sm text-red-600">
                          Additional deposit needed: {calculateRemainingDeposit()} {program.tokenSymbol}
                        </div>
                      )}
                  </div>

                  {stakeAmount && Number.parseFloat(stakeAmount) > 0 && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Staking Preview</h4>
                      <div className="space-y-2 text-sm text-blue-800">
                        <div className="flex justify-between">
                          <span>Staking Amount:</span>
                          <span className="font-medium">
                            {stakeAmount} {program.tokenSymbol}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>New Total Staked:</span>
                          <span className="font-medium">
                            {(
                              Number.parseFloat(program.currentBalance.replace(",", "")) +
                              Number.parseFloat(stakeAmount)
                            ).toLocaleString()}{" "}
                            {program.tokenSymbol}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated Rewards per Period:</span>
                          <span className="font-medium text-green-600">
                            ~{calculatePeriodRewards(Number.parseFloat(stakeAmount))} {program.rewardToken}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-blue-600">30-day standardized:</span>
                          <span className="text-xs font-medium text-blue-600">
                            ~{calculate30DayRewards(Number.parseFloat(stakeAmount))} {program.rewardToken}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Period Duration:</span>
                          <span className="font-medium">{program.periodDuration} days</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Important:</strong> Staked tokens will be included in the next snapshot calculation.
                      Rewards are distributed every {program.periodDuration} days based on your effective average
                      holdings during each period.
                      {program.totalPeriods && ` This program has ${program.remainingPeriods} periods remaining.`}
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={handleStake}
                    disabled={!stakeAmount || Number.parseFloat(stakeAmount) <= 0 || isStaking}
                    className="w-full"
                    size="lg"
                  >
                    {isStaking ? (
                      "Staking..."
                    ) : (
                      <div className="flex items-center">
                        <Coins className="w-4 h-4 mr-2" />
                        Stake {stakeAmount || "0"} {program.tokenSymbol}
                      </div>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="unstake" className="space-y-6 mt-6">
                  <div>
                    <Label htmlFor="unstakeAmount">Amount to Unstake</Label>
                    <div className="mt-1 relative">
                      <Input
                        id="unstakeAmount"
                        type="number"
                        placeholder="0.00"
                        value={unstakeAmount}
                        onChange={(e) => setUnstakeAmount(e.target.value)}
                        className="pr-16"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-sm text-slate-500">{program.tokenSymbol}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-sm text-slate-500">
                      <span>
                        Currently Staked: {program.currentBalance} {program.tokenSymbol}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-auto p-1"
                        onClick={() => setUnstakeAmount(program.currentBalance.replace(",", ""))}
                      >
                        Max
                      </Button>
                    </div>
                  </div>

                  {unstakeAmount && Number.parseFloat(unstakeAmount) > 0 && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-medium text-red-900 mb-2">Unstaking Preview</h4>
                      <div className="space-y-2 text-sm text-red-800">
                        <div className="flex justify-between">
                          <span>Unstaking Amount:</span>
                          <span className="font-medium">
                            {unstakeAmount} {program.tokenSymbol}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Remaining Staked:</span>
                          <span className="font-medium">
                            {(
                              Number.parseFloat(program.currentBalance.replace(",", "")) -
                              Number.parseFloat(unstakeAmount)
                            ).toLocaleString()}{" "}
                            {program.tokenSymbol}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Lost Rewards per Period:</span>
                          <span className="font-medium text-red-600">
                            -{calculatePeriodRewards(Number.parseFloat(unstakeAmount))} {program.rewardToken}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-red-600">30-day standardized loss:</span>
                          <span className="text-xs font-medium text-red-600">
                            -{calculate30DayRewards(Number.parseFloat(unstakeAmount))} {program.rewardToken}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Current Period Impact:</span>
                          <span className="font-medium text-red-600">
                            Reduces effective average for remaining {program.daysRemaining} days
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Warning:</strong> Unstaking tokens will reduce your effective average for the current{" "}
                      {program.periodDuration}-day period. This may impact your rewards for {program.currentPeriod} with{" "}
                      {program.daysRemaining} days remaining. Unstaked tokens will be available immediately.
                      {program.totalPeriods && ` Note: This program has only ${program.remainingPeriods} periods left.`}
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={handleUnstake}
                    disabled={!unstakeAmount || Number.parseFloat(unstakeAmount) <= 0 || isUnstaking}
                    className="w-full bg-red-600 hover:bg-red-700"
                    size="lg"
                  >
                    {isUnstaking ? (
                      "Unstaking..."
                    ) : (
                      <div className="flex items-center">
                        <ArrowDownRight className="w-4 h-4 mr-2" />
                        Unstake {unstakeAmount || "0"} {program.tokenSymbol}
                      </div>
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle>
                How {program.periodDuration}-Day Periods Work
                {program.totalPeriods && ` (${program.totalPeriods} Total Periods)`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                    ↑
                  </div>
                  <div>
                    <div className="font-medium">Staking</div>
                    <div className="text-slate-600">
                      Add tokens to increase your position. New tokens are included in the next snapshot and contribute
                      to your effective average for the {program.periodDuration}-day period.
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                    ↓
                  </div>
                  <div>
                    <div className="font-medium">Unstaking</div>
                    <div className="text-slate-600">
                      Remove tokens from your position. This reduces your effective average for the remaining{" "}
                      {program.daysRemaining} days of the current period and affects future {program.periodDuration}
                      -day periods.
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
                    📊
                  </div>
                  <div>
                    <div className="font-medium">Effective Average & Rewards</div>
                    <div className="text-slate-600">
                      Your rewards are calculated based on your effective average holdings during each{" "}
                      {program.periodDuration}-day period. Rewards are distributed at the end of each period based on
                      your participation throughout those {program.periodDuration} days.
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                    ⏰
                  </div>
                  <div>
                    <div className="font-medium">Timing</div>
                    <div className="text-slate-600">
                      Current period ends in {program.daysRemaining} days. New staking/unstaking actions affect your
                      position immediately but rewards are calculated based on your average holdings over the full{" "}
                      {program.periodDuration} days.
                      {program.totalPeriods &&
                        ` This program will run for ${program.totalPeriods} periods total (${
                          program.totalPeriods * program.periodDuration
                        } days).`}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
