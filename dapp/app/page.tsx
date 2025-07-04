import { ArrowRight, Shield, Zap, Users, TrendingUp, Clock, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">CKB UDT Staking</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/deploy" className="text-slate-600 hover:text-slate-900">
              Deploy
            </Link>
            <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
              Dashboard
            </Link>
            <Link href="/docs" className="text-slate-600 hover:text-slate-900">
              Docs
            </Link>
          </nav>
          <Button asChild>
            <Link href="/dashboard">Connect Wallet</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Universal UDT Staking Reward  Distribution Platform
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Deploy decentralized reward distribution for any UDT token on CKB. Support both possession-based rewards and
            liquid staking with complete automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Link href="/deploy">
                Deploy Staking Program <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Gift className="w-10 h-10 text-purple-600 mb-2" />
                <CardTitle>Possession-Based Rewards</CardTitle>
                <CardDescription>
                  Reward existing token holders based on their holdings across time periods without requiring new
                  staking actions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Zap className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle>Liquid Staking (Phase 2)</CardTitle>
                <CardDescription>
                  Stake UDT tokens and receive LSTs with continuous pool rewards and secondary market support
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Shield className="w-10 h-10 text-green-600 mb-2" />
                <CardTitle>Decentralized Configuration</CardTitle>
                <CardDescription>
                  Time-locked, immutable configurations with multi-signature validation and no admin controls
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Clock className="w-10 h-10 text-orange-600 mb-2" />
                <CardTitle>Period-Based Distribution</CardTitle>
                <CardDescription>
                  Automated reward distribution based on possession history during defined time periods
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Users className="w-10 h-10 text-indigo-600 mb-2" />
                <CardTitle>Universal Framework</CardTitle>
                <CardDescription>
                  Support any UDT token through configurable addresses with single-token deployment model
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <TrendingUp className="w-10 h-10 text-pink-600 mb-2" />
                <CardTitle>Set-and-Forget</CardTitle>
                <CardDescription>
                  Fully automated operation with public trigger APIs and no ongoing management required
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Deploy Staking Reward Program</h3>
                <p className="text-slate-600">
                  Configure reward parameters for your UDT token with time-locked immutable settings
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Deposit Rewards</h3>
                <p className="text-slate-600">Token projects deposit reward amounts for specific time periods</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Track Possession</h3>
                <p className="text-slate-600">Automated snapshots track token holdings across time periods</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Distribute Rewards</h3>
                <p className="text-slate-600">
                  Automatic distribution based on possession history when periods conclude
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Deploy Your Staking Reward Program?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get started with decentralized reward distribution for your UDT token in minutes
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/deploy">
              Start Deployment <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold">CKB UDT Staking</span>
              </div>
              <p className="text-slate-400 text-sm">Universal decentralized staking platform for CKB UDT tokens</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/deploy" className="hover:text-white">
                    Deploy
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/configure" className="hover:text-white">
                    Configure
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/docs" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-white">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="/github" className="hover:text-white">
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/discord" className="hover:text-white">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="/twitter" className="hover:text-white">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="/telegram" className="hover:text-white">
                    Telegram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 CKB UDT Staking Framework. Built on Nervos CKB.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
