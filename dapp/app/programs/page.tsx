"use client"

import { useState } from "react"
import { useProgramData } from "@/lib/providers/program-provider"
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

  // Get data from provider
  const { uiPrograms, loading, error, refreshData } = useProgramData()

  // Mock wallet balances
  const walletBalances = {
    USDC: "5,420.50",
    CKB: "125,000.00",
    "BTC/CKB LP": "1,250.00",
    NEW: "10,000.00",
    DEMO: "3,500.00",
    TEST: "1,200.00",
  }

  // Filter programs based on search and filters  
  const filteredPrograms = uiPrograms.filter((program) => {
    const matchesSearch =
      program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.token.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || program.status === statusFilter
    const matchesToken = tokenFilter === "all" || program.token === tokenFilter

    return matchesSearch && matchesStatus && matchesToken
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-slate-600">Loading programs...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-red-600" />
          <p className="text-slate-600 mb-4">Error loading programs: {error}</p>
          <Button onClick={() => refreshData()}>Try Again</Button>
        </div>
      </div>
    )
  }

  const getProgramStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-600 text-white border-0">
            <Play className="w-3 h-3 mr-1" />
            Active
          </Badge>
        )
      case "upcoming":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            <Eye className="w-3 h-3 mr-1" />
            Upcoming
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="text-slate-600 border-slate-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tokenFilter} onValueChange={setTokenFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tokens</SelectItem>
                <SelectItem value="USDC">USDC</SelectItem>
                <SelectItem value="BTC/CKB LP">BTC/CKB LP</SelectItem>
                <SelectItem value="CKB">CKB</SelectItem>
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
                  program.status === "active"
                    ? "border-green-200 bg-green-50/50"
                    : program.status === "upcoming"
                      ? "border-blue-200 bg-blue-50/50"
                      : program.status === "completed"
                        ? "border-slate-200 bg-slate-50/50"
                        : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={program.logo || "/placeholder.svg"}
                        alt={`${program.token} logo`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-base truncate">{program.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {program.token}
                          </Badge>
                          <Link
                            href={`https://explorer.nervos.org/address/${program.token}`}
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
                        {getProgramStatusBadge(program.status)}
                      </div>
                      <div className="text-xs text-slate-500">
                        APY: {program.apy}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Program Info */}
                  <div className="p-3 bg-slate-50/50 rounded-lg border space-y-3 mb-4">
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="flex items-center justify-center mb-1">
                          <TrendingUp className="w-3 h-3 text-slate-500 mr-1" />
                          <div className="text-xs text-slate-500">Total Staked</div>
                        </div>
                        <div className="text-sm font-medium text-green-600">{program.totalStaked}</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center mb-1">
                          <Coins className="w-3 h-3 text-slate-500 mr-1" />
                          <div className="text-xs text-slate-500">Participants</div>
                        </div>
                        <div className="text-sm font-medium">{program.participants}</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center mb-1">
                          <TrendingUp className="w-3 h-3 text-slate-500 mr-1" />
                          <div className="text-xs text-slate-500">APY</div>
                        </div>
                        <div className="text-sm font-medium text-green-600">{program.apy}</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center mb-1">
                          <Clock className="w-3 h-3 text-slate-500 mr-1" />
                          <div className="text-xs text-slate-500">Time Remaining</div>
                        </div>
                        <div className="text-sm font-medium">{program.timeRemaining}</div>
                      </div>
                    </div>
                  </div>

                  {/* Period Progress for Active Programs */}
                  {program.status === "active" && (
                    <div className="mb-4 p-3 bg-white rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Current Period</span>
                        <span className="text-sm font-medium">{program.periodProgress}%</span>
                      </div>
                      <Progress value={program.periodProgress} className="h-2 mb-2" />
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{program.timeRemaining} remaining</span>
                      </div>
                    </div>
                  )}

                  {/* Status-specific notifications */}
                  {program.status === "upcoming" && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="text-sm font-medium text-blue-800 mb-1">Upcoming Program</div>
                      <div className="text-xs text-blue-700">This program will start soon. Stay tuned for updates.</div>
                    </div>
                  )}
                  
                  {program.status === "completed" && (
                    <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <div className="text-sm font-medium text-slate-800 mb-1">Program Completed</div>
                      <div className="text-xs text-slate-700">All rewards have been distributed.</div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t mt-3">
                    <div className="text-xs text-slate-500">
                      {program.status === "active" ? (
                        <>Active • {program.participants} participants</>
                      ) : program.status === "upcoming" ? (
                        <>Starting soon</>
                      ) : (
                        <>Program completed</>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {program.status === "active" && (
                        <Button
                          asChild
                          className="h-8 px-3 text-xs bg-green-600 hover:bg-green-700 text-white border-0 shadow-sm"
                        >
                          <Link href={`/stake/${program.id}`}>
                            <Coins className="w-3 h-3 mr-1" />
                            Stake {program.token}
                          </Link>
                        </Button>
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
