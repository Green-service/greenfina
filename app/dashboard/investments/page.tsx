'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import InvestmentGraph from '@/components/InvestmentGraph'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface InvestmentData {
  id: string
  value: number
  change_percentage: number
  trend: 'up' | 'down' | 'stable'
}

export default function InvestmentsPage() {
  const [latestData, setLatestData] = useState<InvestmentData | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchLatestData()

    // Set up real-time subscription
    const subscription = supabase
      .channel('investment_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'investment_data'
        },
        () => {
          fetchLatestData()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchLatestData = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('investment_data')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1)

      if (error) throw error

      if (data && data.length > 0) {
        setLatestData(data[0])
      }
    } catch (error) {
      console.error('Error fetching latest investment data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-500'
      case 'down':
        return 'text-red-500'
      default:
        return 'text-yellow-500'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '↑'
      case 'down':
        return '↓'
      default:
        return '→'
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push('/dashboard')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Global Investment Index</h1>
            <p className="text-muted-foreground">Track the global investment market performance</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Current Value</CardTitle>
            <CardDescription>Latest global investment index value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? 'Loading...' : latestData ? `R${latestData.value.toLocaleString()}` : 'No data available'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change</CardTitle>
            <CardDescription>Percentage change from previous value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${latestData ? getTrendColor(latestData.trend) : ''}`}>
              {loading ? 'Loading...' : latestData ? 
                `${getTrendIcon(latestData.trend)} ${latestData.change_percentage > 0 ? '+' : ''}${latestData.change_percentage}%` : 
                'No data available'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trend</CardTitle>
            <CardDescription>Current market trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold capitalize ${latestData ? getTrendColor(latestData.trend) : ''}`}>
              {loading ? 'Loading...' : latestData ? latestData.trend : 'No data available'}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Investment Performance</CardTitle>
          <CardDescription>Real-time global investment index tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <InvestmentGraph />
        </CardContent>
      </Card>
    </div>
  )
} 