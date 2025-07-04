"use client"

import { useState } from "react"
import { Shield, Users, Clock, CheckCircle, AlertTriangle, Key, Lock, Settings, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function ConfigurePage() {
  const [activeConfigs, setActiveConfigs] = useState([
    {
      id: 1,
      tokenName: "MyToken",
      tokenSymbol: "MTK",
      status: "Configuration Period",
      timeRemaining: "5 days",
      progress: 60,
      requiredSigs: 3,
      currentSigs: 2,
      contributors: ["0xabc...123", "0xdef...456"],
    },
  ])

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
                <Link href="/configure" className="text-sm text-purple-600 font-medium">
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
          <h1 className="text-xl font-semibold">Manage Programs</h1>
          <p className="text-sm text-slate-600 mt-1">
            Deploy new programs and manage multi-signature configurations
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active Programs</TabsTrigger>
            <TabsTrigger value="deploy">Deploy Program</TabsTrigger>
            <TabsTrigger value="multisig">Multisig Program</TabsTrigger>
            <TabsTrigger value="history">Configuration History</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="grid gap-6">
              {activeConfigs.map((config) => (
                <Card key={config.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{config.tokenName}</span>
                          <Badge variant="secondary">{config.tokenSymbol}</Badge>
                        </CardTitle>
                        <CardDescription>Configuration Period of Program</CardDescription>
                      </div>
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        {config.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Time Lock Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Time-Lock Progress
                        </span>
                        <span className="text-sm text-slate-600">{config.timeRemaining} remaining</span>
                      </div>
                      <Progress value={config.progress} className="h-2" />
                    </div>

                    {/* Funding Interface */}
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium mb-3 flex items-center">
                        <Coins className="w-4 h-4 mr-1" />
                        Program Funding
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor="fund-amount" className="text-sm font-medium">
                            Funding Amount
                          </Label>
                          <Input
                            id="fund-amount"
                            type="number"
                            placeholder="Enter amount"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="fund-token" className="text-sm font-medium">
                            Token
                          </Label>
                          <Input
                            id="fund-token"
                            value={config.tokenSymbol}
                            disabled
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Add Funding
                        </Button>
                        <Button variant="outline" size="sm">
                          View Funding History
                        </Button>
                      </div>
                    </div>

                    {/* Signature Status */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3 flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          Signature Status
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Required Signatures:</span>
                            <span className="font-medium">{config.requiredSigs}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Current Signatures:</span>
                            <span className="font-medium text-green-600">{config.currentSigs}</span>
                          </div>
                          <Progress value={(config.currentSigs / config.requiredSigs) * 100} className="h-1" />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3 flex items-center">
                          <Key className="w-4 h-4 mr-1" />
                          Contributors
                        </h4>
                        <div className="space-y-2">
                          {config.contributors.map((contributor, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <span className="font-mono text-slate-600">{contributor}</span>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            </div>
                          ))}
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-mono text-slate-400">0xghi...789</span>
                            <Clock className="w-4 h-4 text-slate-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-slate-500">
                        Configuration will become immutable after time-lock expiration
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">Add Signature</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Once the time-lock period expires, configurations become permanently immutable. Ensure all parameters
                are correct before the deadline.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="deploy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Deploy New Staking Program</CardTitle>
                <CardDescription>
                  Create and deploy a new staking reward program for your UDT token
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Ready to Deploy?</h3>
                  <p className="text-slate-600 mb-6">
                    Launch the deployment wizard to configure your staking reward program
                  </p>
                  <Button size="lg" asChild>
                    <Link href="/deploy">
                      Start Deployment Wizard
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="multisig" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Multisig Program</CardTitle>
                <CardDescription>
                  Multi-signature program management features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                  <p className="text-slate-600 mb-6">
                    Multi-signature program management features will be available in a future update
                  </p>
                  <Badge variant="outline" className="text-slate-600 border-slate-400">
                    Feature in Development
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuration History</CardTitle>
                <CardDescription>
                  View past configurations and their current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-slate-600">No configuration history available</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
