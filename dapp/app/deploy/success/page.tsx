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

        {/* Funding and Configuration Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Funding & Configuration Status</CardTitle>
            <CardDescription>Current funding status and configuration locking information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium mb-3 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                  Initial Funding Applied
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Funded Amount:</span>
                    <span className="font-medium">10,000 BANK</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Coverage:</span>
                    <span className="font-medium text-green-600">3.2 periods (~96 days)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Status:</span>
                    <span className="font-medium text-green-600">Ready for Staking</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-medium mb-3 flex items-center">
                  <Settings className="w-4 h-4 mr-1" />
                  Configuration Locking
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Lock Strategy:</span>
                    <span className="font-medium">Scheduled</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Expected Lock Time:</span>
                    <span className="font-medium">Dec 15, 2:00 PM UTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Program Start:</span>
                    <span className="font-medium">Dec 16, 12:00 AM UTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">First Snapshot:</span>
                    <span className="font-medium">Dec 17, 12:00 AM UTC</span>
                  </div>
                </div>
              </div>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Program Ready:</strong> Your program is fully funded and ready for staking. Users can begin staking immediately once the configuration is locked.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Automation Setup Status */}
        {showAutomationSetup && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cloud className="w-5 h-5" />
                <span>Manual Automation Setup Required</span>
              </CardTitle>
              <CardDescription>
                Automation is not set up automatically. You need to manually deploy and authenticate with Cloudflare.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Settings className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Important:</strong> To enable automated snapshots, you must manually click the one-click deployment button below and authenticate with Cloudflare.
                  </AlertDescription>
                </Alert>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-3">Setup Instructions</h4>
                  <div className="space-y-2 text-sm text-blue-800">
                    <div>1. Click the "Deploy to Cloudflare" button below</div>
                    <div>2. Authenticate with your Cloudflare account</div>
                    <div>3. Complete the deployment process</div>
                    <div>4. Your automation will be active once deployed</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-slate-600 mb-2">Manual Trigger Webhook URL</div>
                    <div className="font-mono text-xs bg-slate-100 p-2 rounded flex items-center justify-between">
                      {programData.webhookUrl}
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(programData.webhookUrl)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      You can use this URL to manually trigger snapshots or integrate with your own automation system.
                    </p>
                  </div>

                  <div>
                    <div className="text-sm text-slate-600 mb-2">Distribution Trigger Webhook</div>
                    <div className="font-mono text-xs bg-slate-100 p-2 rounded flex items-center justify-between">
                      https://your-site.netlify.app/.netlify/functions/webhook-distribute?typeId={programData.typeId.slice(0, 16)}...
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(`https://your-site.netlify.app/.netlify/functions/webhook-distribute?typeId=${programData.typeId}`)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Use this URL to manually trigger reward distribution when periods end.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                    <Cloud className="w-4 h-4 mr-2" />
                    Deploy to Cloudflare
                  </Button>
                  <Button variant="outline" onClick={() => setSetupSkipped(true)}>
                    Skip Automation Setup
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Steps - only show after automation is complete or skipped */}
        {(automationComplete || setupSkipped) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>Your program is funded and ready - complete these steps to go live</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Program Funded</div>
                    <div className="text-sm text-slate-600 mt-1">
                      Your program is funded with 10,000 BANK tokens covering 3.2 periods. Users can stake immediately once configuration is locked.
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Monitor Configuration Lock</div>
                    <div className="text-sm text-slate-600 mt-1">
                      Configuration will be locked on Dec 15 at 2:00 PM UTC. After this, the program becomes immutable and staking becomes available.
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
                  <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">
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
