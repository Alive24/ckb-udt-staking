"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Cloud, Settings, ArrowRight, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function DeploymentSuccessPage() {
  const [automationProgress, setAutomationProgress] = useState(0)
  const [automationComplete, setAutomationComplete] = useState(false)
  const [setupSkipped, setSetupSkipped] = useState(false)
  const [showAutomationSetup, setShowAutomationSetup] = useState(false)

  // Mock program data
  const programData = {
    id: "bank-staking-002",
    typeId: "0x1234567890abcdef1234567890abcdef12345678",
    tokenSymbol: "BANK",
    webhookUrl:
      "https://your-site.netlify.app/.netlify/functions/webhook-snapshot?typeId=0x1234567890abcdef1234567890abcdef12345678",
    workerUrl: "https://bank-staking-snapshots.your-username.workers.dev",
  }

  // Show automation setup after a brief delay to simulate deployment completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAutomationSetup(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Simulate automation setup progress
  useEffect(() => {
    if (showAutomationSetup && !setupSkipped) {
      const interval = setInterval(() => {
        setAutomationProgress((prev) => {
          if (prev >= 100) {
            setAutomationComplete(true)
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 500)

      return () => clearInterval(interval)
    }
  }, [showAutomationSetup, setupSkipped])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
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
                <Link href="/deploy" className="text-sm text-purple-600 font-medium">
                  Deploy
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-green-800 mb-2">Program Deployed Successfully!</h1>
          <p className="text-slate-600">
            Your {programData.tokenSymbol} staking program has been deployed to the CKB network.
          </p>
        </div>

        {/* Program Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Program Information</CardTitle>
            <CardDescription>Your new staking program details and identifiers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-slate-600">Program ID</div>
                <div className="font-mono text-sm bg-slate-100 p-2 rounded flex items-center justify-between">
                  {programData.id}
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(programData.id)}>
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-600">Type ID</div>
                <div className="font-mono text-sm bg-slate-100 p-2 rounded flex items-center justify-between">
                  {programData.typeId.slice(0, 20)}...
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(programData.typeId)}>
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Automation Setup Status */}
        {showAutomationSetup && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cloud className="w-5 h-5" />
                <span>Automation Setup</span>
              </CardTitle>
              <CardDescription>
                {setupSkipped ? "Automation setup was skipped" : "Setting up snapshot automation automatically"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!setupSkipped ? (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                    <h4 className="font-medium text-blue-900 mb-2">Configuring Default Automation</h4>
                    <div className="space-y-1 text-sm text-blue-800">
                      <div>• Provider: Cloudflare Workers (global edge network)</div>
                      <div>• Schedule: Daily snapshots at 00:00 UTC</div>
                      <div>• Monitoring: Automatic health checks and alerts</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Setup Progress</span>
                      <span className="text-sm font-medium">{automationProgress}%</span>
                    </div>
                    <Progress value={automationProgress} className="h-2" />
                  </div>

                  {!automationComplete ? (
                    <div className="space-y-2 text-sm text-slate-600">
                      <div>• Creating Cloudflare Worker...</div>
                      <div>• Configuring cron triggers...</div>
                      <div>• Setting up webhook endpoints...</div>
                      <div>• Testing connectivity...</div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Automation configured successfully!</strong> Your program will take snapshots
                          automatically.
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-slate-600">Worker URL</div>
                          <div className="font-mono text-sm bg-slate-100 p-2 rounded flex items-center justify-between">
                            {programData.workerUrl}
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(programData.workerUrl)}>
                                <Copy className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" asChild>
                                <a href={programData.workerUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-slate-600">Webhook URL</div>
                          <div className="font-mono text-xs bg-slate-100 p-2 rounded flex items-center justify-between">
                            {programData.webhookUrl}
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(programData.webhookUrl)}>
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {!automationComplete && (
                    <div className="flex justify-center">
                      <Button variant="outline" onClick={() => setSetupSkipped(true)} className="text-slate-600">
                        Skip for Now
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <Alert>
                    <Settings className="h-4 w-4" />
                    <AlertDescription>
                      Automation setup was skipped. You can configure it later through the program management interface.
                    </AlertDescription>
                  </Alert>

                  <Button variant="outline" className="w-full bg-transparent">
                    <Cloud className="w-4 h-4 mr-2" />
                    Set Up Automation Now
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Next Steps - only show after automation is complete or skipped */}
        {(automationComplete || setupSkipped) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>Complete these steps to activate your staking program</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Fund Your Program</div>
                    <div className="text-sm text-slate-600 mt-1">
                      Deposit reward tokens to activate staking and start distributing rewards to participants.
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Test Snapshots</div>
                    <div className="text-sm text-slate-600 mt-1">
                      Trigger a manual snapshot to ensure everything is working correctly before going live.
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Announce to Community</div>
                    <div className="text-sm text-slate-600 mt-1">
                      Share your staking program with token holders and start building participation.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons - only show after automation is complete or skipped */}
        {(automationComplete || setupSkipped) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link href={`/program/${programData.id}/manage`}>
                <Settings className="w-4 h-4 mr-2" />
                Manage Program
              </Link>
            </Button>

            <Button variant="outline" size="lg" className="flex items-center justify-center bg-transparent">
              <Link href={`/program/${programData.id}`}>
                <span className="mr-2">View Program Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
