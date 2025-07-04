"use client"

import { useState } from "react"
import { Shield, Users, Clock, CheckCircle, AlertTriangle, Key, Lock, Settings } from "lucide-react"
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
                  Dashboard
                </Link>
                <Link href="/programs" className="text-sm text-slate-600 hover:text-slate-900">
                  Programs
                </Link>
                <Link href="/deploy" className="text-sm text-slate-600 hover:text-slate-900">
                  Deploy
                </Link>
                <Link href="/configure" className="text-sm text-purple-600 font-medium">
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
          <h1 className="text-xl font-semibold">Configuration Management</h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage multi-signature configurations and time-locked parameters
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active Configurations</TabsTrigger>
            <TabsTrigger value="contribute">Contribute</TabsTrigger>
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
                        <CardDescription>Multi-signature configuration in progress</CardDescription>
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

          <TabsContent value="contribute" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contribute to Configuration</CardTitle>
                <CardDescription>Add your signature to validate configuration parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="configId">Configuration ID</Label>
                  <Input id="configId" placeholder="Enter configuration ID to contribute to" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="publicKey">Your Public Key</Label>
                  <Input id="publicKey" placeholder="0x..." className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="signature">Configuration Signature</Label>
                  <Textarea
                    id="signature"
                    placeholder="Paste your signature for the configuration parameters..."
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Carefully review all configuration parameters before signing. Your signature helps validate the
                    decentralized setup process.
                  </AlertDescription>
                </Alert>

                <Button className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Submit Signature
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuration Validation</CardTitle>
                <CardDescription>Verify configuration parameters before contributing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium mb-2">Parameter Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">Token:</span>
                        <span className="ml-2 font-medium">MyToken (MTK)</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Reward Type:</span>
                        <span className="ml-2 font-medium">Possession-Based</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Period Duration:</span>
                        <span className="ml-2 font-medium">30 Days</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Required Signatures:</span>
                        <span className="ml-2 font-medium">3 of 5</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    View Full Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuration History</CardTitle>
                <CardDescription>View completed and finalized configurations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium">DemoToken (DEMO)</div>
                        <div className="text-sm text-slate-500">Finalized on 2024-01-15</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Immutable
                      </Badge>
                      <div className="text-sm text-slate-500 mt-1">5/5 signatures</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium">TestToken (TEST)</div>
                        <div className="text-sm text-slate-500">Finalized on 2024-01-01</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Immutable
                      </Badge>
                      <div className="text-sm text-slate-500 mt-1">3/3 signatures</div>
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
