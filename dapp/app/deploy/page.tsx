"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, Clock, Shield, Users, Settings, Coins, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function DeployPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [rewardType, setRewardType] = useState("possession")
  const [distributionType, setDistributionType] = useState("single")
  const [distributionMode, setDistributionMode] = useState("proportional")
  const [periodicAmount, setPeriodicAmount] = useState("")
  const [periodicCount, setPeriodicCount] = useState("")
  const [useMultiSig, setUseMultiSig] = useState(false)
  const [automationProvider, setAutomationProvider] = useState("cloudflare")
  const [setupAutomationNow, setSetupAutomationNow] = useState(false)

  const steps = [
    { id: 1, title: "Token & Rewards", description: "Configure token and reward model" },
    { id: 2, title: "Distribution Schedule", description: "Set up reward distribution" },
    { id: 3, title: "Security Config", description: "Configure program control" },
    { id: 4, title: "Review & Deploy", description: "Final review and deployment" },
  ]

  const fillPeriodicAmounts = () => {
    if (periodicAmount && periodicCount) {
      const amount = Number.parseFloat(periodicAmount)
      const count = Number.parseInt(periodicCount)
      const total = amount * count
      // This would fill all period inputs with the same amount
      console.log(`Setting ${count} periods of ${amount} each (total: ${total})`)
    }
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
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
            <h1 className="text-xl font-semibold">Deploy Staking Program</h1>
          </div>
          <div className="text-sm text-slate-600">
            Step {currentStep} of {steps.length}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep > step.id
                      ? "bg-green-500 border-green-500 text-white"
                      : currentStep === step.id
                        ? "bg-purple-600 border-purple-600 text-white"
                        : "bg-white border-slate-300 text-slate-400"
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${currentStep > step.id ? "bg-green-500" : "bg-slate-300"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step) => (
              <div key={step.id} className="text-center max-w-[100px]">
                <div className="text-sm font-medium">{step.title}</div>
                <div className="text-xs text-slate-500">{step.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Token Configuration */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Token Configuration</h3>
                  <div>
                    <Label htmlFor="targetToken">Target Token Address</Label>
                    <Input id="targetToken" placeholder="0x... (token to encourage staking)" className="mt-1" />
                    <p className="text-sm text-slate-500 mt-1">
                      The UDT token address that users will stake (supports regular tokens and LP tokens)
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="tokenType">Token Type</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select token type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular">Regular Token (e.g., BANK)</SelectItem>
                        <SelectItem value="lp">
                          LP Token (e.g., BANK/CKB Liquidity Pool on UTXOSwap, BANK/RUSD Liquidity Pool on UTXOSwap, BANK/BTC Liquidity Pool on UTXOSwap)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-slate-500 mt-1">
                      LP tokens are liquidity provider tokens from DEX pools
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="description">Program Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your staking program goals and benefits..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="minStakeAmount">Minimum Staking Amount (Optional)</Label>
                    <Input
                      id="minStakeAmount"
                      placeholder="e.g., 100 (leave empty for no minimum)"
                      className="mt-1"
                      type="number"
                    />
                    <p className="text-sm text-slate-500 mt-1">
                      Minimum amount of tokens required to participate in staking
                    </p>
                  </div>
                </div>

                {/* Reward Model */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Reward Model</h3>
                  <RadioGroup value={rewardType} onValueChange={setRewardType}>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="possession" id="possession" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="possession" className="text-base font-medium cursor-pointer">
                            Possession-Based Rewards (Traditional Mode)
                          </Label>
                          <p className="text-sm text-slate-600 mt-1">
                            Reward existing token holders based on their holdings across time periods. No new staking
                            required - works with current token positions.
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-green-600">
                            <span className="flex items-center">
                              <Check className="w-4 h-4 mr-1" /> Available Now
                            </span>
                            <span className="flex items-center">
                              <Shield className="w-4 h-4 mr-1" /> Fully Decentralized
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-4 border rounded-lg opacity-60">
                        <RadioGroupItem value="liquid" id="liquid" disabled className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="liquid" className="text-base font-medium cursor-pointer">
                            Liquid Staking Mode (Coming Soon)
                          </Label>
                          <p className="text-sm text-slate-600 mt-1">
                            Users stake tokens and receive liquid staking tokens (LSTs) with continuous rewards. New
                            tokens are minted automatically.
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-orange-600">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" /> Coming Soon
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" /> Advanced Features
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  {rewardType === "possession" && (
                    <div className="space-y-4 p-4 bg-purple-50 rounded-lg">
                      <div>
                        <Label htmlFor="rewardToken">Reward Token Address</Label>
                        <Input
                          id="rewardToken"
                          placeholder="0x... (leave empty to use same token as target)"
                          className="mt-1"
                        />
                        <p className="text-sm text-slate-500 mt-1">
                          Token used for rewards. Defaults to same as target token if empty.
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="lockOption">Optional CKB Time Lock</Label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select lock option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No Time Lock</SelectItem>
                            <SelectItem value="snapshot">Lock until each snapshot</SelectItem>
                            <SelectItem value="distribution">Lock until each distribution</SelectItem>
                            <SelectItem value="final">Lock until final distribution only</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-slate-500 mt-1">
                          Optional: Add CKB time locks to increase security and trust
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Distribution Schedule</Label>
                  <RadioGroup value={distributionType} onValueChange={setDistributionType} className="mt-3">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="single" id="single" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="single" className="text-base font-medium cursor-pointer">
                            Single Distribution
                          </Label>
                          <p className="text-sm text-slate-600 mt-1">
                            One-time reward distribution at the end of the program period.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="periodic" id="periodic" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="periodic" className="text-base font-medium cursor-pointer">
                            Periodic Distribution
                          </Label>
                          <p className="text-sm text-slate-600 mt-1">
                            Regular reward distributions at specified intervals throughout the program.
                          </p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base font-medium">Distribution Mode</Label>
                  <RadioGroup value={distributionMode} onValueChange={setDistributionMode} className="mt-3">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="proportional" id="proportional" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="proportional" className="text-base font-medium cursor-pointer">
                            Proportional Distribution
                          </Label>
                          <p className="text-sm text-slate-600 mt-1">
                            Rewards distributed proportionally based on each user's staked amount relative to total
                            staked.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="even" id="even" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="even" className="text-base font-medium cursor-pointer">
                            Even Distribution
                          </Label>
                          <p className="text-sm text-slate-600 mt-1">
                            Rewards distributed evenly among all users who meet the minimum staking requirement.
                          </p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  {distributionMode === "even" && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <Label htmlFor="evenDistributionMin">Minimum Stake for Even Distribution</Label>
                      <Input
                        id="evenDistributionMin"
                        placeholder="e.g., 1000 (minimum tokens to qualify)"
                        className="mt-1"
                        type="number"
                      />
                      <p className="text-sm text-slate-500 mt-1">
                        Users must stake at least this amount to receive equal rewards
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="snapshotInterval">Snapshot Interval</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="How often to take possession snapshots" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10min">10 Minutes</SelectItem>
                      <SelectItem value="1hour">1 Hour</SelectItem>
                      <SelectItem value="6hours">6 Hours</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-slate-500 mt-1">
                    How frequently to capture token holdings for reward calculations
                  </p>
                </div>

                {distributionType === "single" && (
                  <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium">Single Distribution Setup</h4>
                    <div>
                      <Label htmlFor="programDuration">Program Duration (Days)</Label>
                      <Input id="programDuration" placeholder="e.g., 30, 90, 180" className="mt-1" type="number" />
                    </div>
                    <div>
                      <Label htmlFor="totalRewards">Total Reward Amount (in reward tokens)</Label>
                      <Input
                        id="totalRewards"
                        placeholder="Total amount to distribute"
                        className="mt-1"
                        type="number"
                      />
                    </div>
                  </div>
                )}

                {distributionType === "periodic" && (
                  <div className="space-y-4 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium">Periodic Distribution Setup</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="periodDuration">Period Duration (Days)</Label>
                        <Input id="periodDuration" placeholder="e.g., 7, 14, 30" className="mt-1" type="number" />
                      </div>
                      <div>
                        <Label htmlFor="periodCount">Number of Periods</Label>
                        <Input
                          id="periodCount"
                          placeholder="e.g., 12 (leave empty for unlimited)"
                          className="mt-1"
                          type="number"
                          value={periodicCount}
                          onChange={(e) => setPeriodicCount(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="font-medium">Quick Setup Tool</h5>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="periodicAmount">Reward Tokens per Period</Label>
                          <Input
                            id="periodicAmount"
                            placeholder="Same for each period"
                            className="mt-1"
                            type="number"
                            value={periodicAmount}
                            onChange={(e) => setPeriodicAmount(e.target.value)}
                          />
                        </div>
                        <div className="flex items-end">
                          <Button onClick={fillPeriodicAmounts} variant="outline" className="w-full bg-transparent">
                            Fill All Periods
                          </Button>
                        </div>
                        <div className="flex items-end">
                          <div className="text-sm text-slate-600">
                            Total:{" "}
                            {periodicAmount && periodicCount
                              ? (Number.parseFloat(periodicAmount) * Number.parseInt(periodicCount)).toLocaleString()
                              : "0"}{" "}
                            reward tokens
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label>Individual Period Amounts (in reward tokens)</Label>
                        <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                          {Array.from({ length: Number.parseInt(periodicCount) || 3 }, (_, i) => (
                            <div key={i} className="flex items-center space-x-2">
                              <span className="text-sm w-16">Period {i + 1}:</span>
                              <Input placeholder="Amount" type="number" className="flex-1" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Program Cell Configuration</Label>
                  <p className="text-sm text-slate-600 mt-1">
                    Choose how the program cell will be controlled and validated
                  </p>
                </div>

                <RadioGroup
                  value={useMultiSig ? "multisig" : "single"}
                  onValueChange={(value) => setUseMultiSig(value === "multisig")}
                  className="space-y-4"
                >
                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="single" id="single" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="single" className="text-base font-medium cursor-pointer">
                        Single Signature Configuration (Recommended for MVP)
                      </Label>
                      <p className="text-sm text-slate-600 mt-1">
                        Use a single signature for program control. Quick setup and easy management, perfect for getting
                        started with staking programs.
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-green-600">
                        <span className="flex items-center">
                          <Check className="w-4 h-4 mr-1" /> Available Now
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" /> Quick Setup
                        </span>
                        <span className="flex items-center">
                          <Settings className="w-4 h-4 mr-1" /> Easy Management
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border rounded-lg opacity-60">
                    <RadioGroupItem value="multisig" id="multisig" disabled className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="multisig" className="text-base font-medium cursor-pointer">
                        Multi-Signature Configuration (Coming Soon)
                      </Label>
                      <p className="text-sm text-slate-600 mt-1">
                        Require multiple signatures for parameter validation and configuration changes. Enhanced
                        security and decentralization for production deployments.
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-orange-600">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" /> Coming Soon
                        </span>
                        <span className="flex items-center">
                          <Shield className="w-4 h-4 mr-1" /> Maximum Security
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" /> Decentralized Control
                        </span>
                      </div>
                    </div>
                  </div>
                </RadioGroup>

                {!useMultiSig && (
                  <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium">Single Signature Setup</h4>
                    <div>
                      <Label htmlFor="deployerKey">Deployer Public Key</Label>
                      <Input id="deployerKey" placeholder="Your public key for program control" className="mt-1" />
                      <p className="text-sm text-slate-500 mt-1">
                        This key will have control over the program configuration and reward deposits
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="singleTimeLock">Configuration Time-Lock (Optional)</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Optional configuration lock duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No Time Lock</SelectItem>
                          <SelectItem value="7">7 Days</SelectItem>
                          <SelectItem value="14">14 Days</SelectItem>
                          <SelectItem value="30">30 Days</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-slate-500 mt-1">
                        Optional: Lock configuration after deployment to prevent changes and increase trust
                      </p>
                    </div>

                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Flexible Configuration Locking:</strong> You can lock the configuration at any time
                        after deployment through the program management interface. This allows you to make initial
                        adjustments and lock the configuration when you're ready to increase trust and security.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-medium mb-3">Deployment Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Target Token:</span>
                      <span>0xabc...123</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Reward Model:</span>
                      <span>Possession-Based (Traditional)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Distribution:</span>
                      <span>
                        {distributionType === "single" ? "Single Distribution" : "Periodic Distribution"} (
                        {distributionMode === "proportional" ? "Proportional" : "Even"})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Snapshot Interval:</span>
                      <span>Daily</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Configuration:</span>
                      <span>Single Signature</span>
                    </div>
                  </div>
                </div>

                {/* Initial Funding Section */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium mb-3 flex items-center">
                    <Coins className="w-4 h-4 mr-1" />
                    Initial Funding (Optional)
                  </h4>
                  <p className="text-sm text-blue-800 mb-4">
                    Fund at least some reward tokens in the same transaction as deployment. This enables immediate staking participation.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="initial-funding" className="text-sm font-medium">
                        Initial Funding Amount
                      </Label>
                      <Input
                        id="initial-funding"
                        type="number"
                        placeholder="e.g., 10000 (reward tokens)"
                        className="mt-1"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Minimum recommended: 3 periods worth of rewards
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">
                        Coverage Analysis
                      </Label>
                      <div className="mt-1 p-2 bg-white rounded border text-sm">
                        <div className="flex justify-between">
                          <span>Covers:</span>
                          <span className="text-green-600">~3.2 periods</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span className="text-green-600">~96 days</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="enable-funding" />
                    <Label htmlFor="enable-funding" className="text-sm">
                      Include funding in deployment transaction
                    </Label>
                  </div>
                </div>

                {/* Configuration Locking Section */}
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-medium mb-3 flex items-center">
                    <Lock className="w-4 h-4 mr-1" />
                    Configuration Locking
                  </h4>
                  <p className="text-sm text-purple-800 mb-4">
                    Programs with sufficient funding (3+ periods) can start immediately by locking configuration on deployment.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Configuration Lock Strategy</Label>
                      <RadioGroup defaultValue="flexible" className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="flexible" id="flexible" />
                          <Label htmlFor="flexible" className="text-sm">
                            Flexible - Lock configuration later through management interface
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="immediate" id="immediate" />
                          <Label htmlFor="immediate" className="text-sm">
                            Immediate - Lock configuration on deployment (requires 3+ periods funding)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="scheduled" id="scheduled" />
                          <Label htmlFor="scheduled" className="text-sm">
                            Scheduled - Lock configuration at specified time
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="p-3 bg-white rounded border">
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Expected Lock Time:</span>
                          <span className="font-medium">December 15, 2024 at 2:00 PM UTC</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Program Start:</span>
                          <span className="font-medium">December 16, 2024 at 12:00 AM UTC</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">First Snapshot:</span>
                          <span className="font-medium">December 17, 2024 at 12:00 AM UTC</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">Ready for Deployment</h4>
                  <p className="text-sm text-green-800">
                    Your staking program is configured and ready to deploy. Initial funding and configuration locking options are available.
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I understand that this configuration will be controlled by my signature and that I'm responsible for
                    managing the program and reward distributions.
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox id="funding-responsibility" />
                  <Label htmlFor="funding-responsibility" className="text-sm leading-relaxed">
                    I understand that adequate funding is required to activate staking, and locked configurations cannot be changed.
                  </Label>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button
              onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Next <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/deploy/success">
                Deploy Program <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
