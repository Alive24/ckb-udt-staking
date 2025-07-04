"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Calendar, DollarSign, Users, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function ManageProgramPage() {
  const [activeTab, setActiveTab] = useState("deposit")

  // Mock program data
  const program = {
    id: "mtk-staking-001",
    tokenName: "MyToken",
    tokenSymbol: "MTK",
    status: "Active",
    currentPeriod: 3,
    nextPeriodStart: "2024-02-15",
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/program/${program.id}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Program
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-semibold flex items-center space-x-2">
                  <span>Manage {program.tokenName} Program</span>
                  <Badge variant="secondary">{program.tokenSymbol}</Badge>
                </h1>
                <p className="text-sm text-slate-600 mt-1">Configure rewards and manage program settings</p>
              </div>
            </div>
            <Badge
              variant="outline"
              className={
                program.status === "Active" ? "text-green-600 border-green-600" : "text-slate-600 border-slate-600"
              }
            >
              {program.status}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="deposit">Deposit Rewards</TabsTrigger>
            <TabsTrigger value="period">New Period</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="deposit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Deposit Rewards</span>
                </CardTitle>
                <CardDescription>Add reward tokens to the current or upcoming period</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="targetPeriod">Target Period</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select period to fund" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Period (Period 3)</SelectItem>
                      <SelectItem value="next">Next Period (Period 4)</SelectItem>
                      <SelectItem value="future">Future Period (Period 5)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-slate-500 mt-1">Current period ends on {program.nextPeriodStart}</p>
                </div>

                <div>
                  <Label htmlFor="rewardToken">Reward Token</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select reward token" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ckb">CKB</SelectItem>
                      <SelectItem value="mtk">MTK (Same Token)</SelectItem>
                      <SelectItem value="custom">Custom Token Address</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rewardAmount">Reward Amount</Label>
                  <Input id="rewardAmount" placeholder="Enter amount to deposit" className="mt-1" type="number" />
                  <p className="text-sm text-slate-500 mt-1">
                    This amount will be distributed proportionally to all participants
                  </p>
                </div>

                <div>
                  <Label htmlFor="depositNote">Note (Optional)</Label>
                  <Textarea
                    id="depositNote"
                    placeholder="Add a note about this reward deposit..."
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Deposit Summary</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <div>• Rewards will be distributed based on effective average holdings</div>
                    <div>• Distribution occurs automatically when the period ends</div>
                    <div>• Participants can claim rewards after distribution</div>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Deposit Rewards
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="period" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Create New Period</span>
                </CardTitle>
                <CardDescription>Set up a new reward period with custom parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="periodName">Period Name</Label>
                  <Input id="periodName" placeholder="e.g., Period 4, Q1 2024 Rewards" className="mt-1" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" className="mt-1" defaultValue="2024-02-15" />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" className="mt-1" defaultValue="2024-03-15" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="initialRewards">Initial Reward Deposit</Label>
                  <Input
                    id="initialRewards"
                    placeholder="Amount to deposit for this period"
                    className="mt-1"
                    type="number"
                  />
                  <p className="text-sm text-slate-500 mt-1">You can add more rewards later during the period</p>
                </div>

                <div>
                  <Label htmlFor="rewardTokenPeriod">Reward Token</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select reward token" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ckb">CKB</SelectItem>
                      <SelectItem value="mtk">MTK (Same Token)</SelectItem>
                      <SelectItem value="custom">Custom Token Address</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="periodDescription">Period Description</Label>
                  <Textarea
                    id="periodDescription"
                    placeholder="Describe the goals and details of this reward period..."
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Period Configuration</h4>
                  <div className="text-sm text-green-800 space-y-1">
                    <div>• Duration: 30 days (matches program configuration)</div>
                    <div>• Snapshots: Daily (automated)</div>
                    <div>• Distribution: Automatic at period end</div>
                    <div>• Target: Regular UDT Tokens</div>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Period
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Program Settings</span>
                </CardTitle>
                <CardDescription>Manage program configuration and administrative settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="programDescription">Program Description</Label>
                  <Textarea
                    id="programDescription"
                    defaultValue="MyToken staking rewards program with monthly distribution periods"
                    className="mt-1"
                    rows={3}
                  />
                  <p className="text-sm text-slate-500 mt-1">This description appears on the program detail page</p>
                </div>

                <div>
                  <Label htmlFor="contactInfo">Contact Information</Label>
                  <Input id="contactInfo" placeholder="Discord, Telegram, or email for support" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="websiteUrl">Project Website</Label>
                  <Input id="websiteUrl" placeholder="https://yourproject.com" className="mt-1" type="url" />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Notification Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Period End Notifications</div>
                        <div className="text-sm text-slate-500">Notify participants when periods end</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Snapshot Alerts</div>
                        <div className="text-sm text-slate-500">Alert when snapshots fail or are delayed</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Administrative Actions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Export Participant Data</div>
                        <div className="text-sm text-slate-500">Download CSV of all participants and rewards</div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Users className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Program Analytics</div>
                        <div className="text-sm text-slate-500">View detailed program performance metrics</div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Analytics
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-medium text-amber-900 mb-2">Important Notice</h4>
                  <p className="text-sm text-amber-800">
                    Core program parameters (period duration, snapshot frequency, target type) are immutable and cannot
                    be changed after deployment. Only descriptive information and notification settings can be updated.
                  </p>
                </div>

                <Button className="w-full">Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
