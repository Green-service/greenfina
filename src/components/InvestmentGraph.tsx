'use client'

import { useEffect, useRef, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'
import { createClient } from '@/lib/supabase/client'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface InvestmentData {
  id: string
  timestamp: string
  value: number
  change_percentage: number
  trend: 'up' | 'down' | 'stable'
}

export default function InvestmentGraph() {
  const [data, setData] = useState<InvestmentData[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const chartRef = useRef<any>(null)

  useEffect(() => {
    // Initial data fetch
    fetchInvestmentData()

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
        (payload: any) => {
          console.log('Change received!', payload)
          fetchInvestmentData()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchInvestmentData = async () => {
    try {
      setLoading(true)
      const { data: investmentData, error } = await supabase
        .from('investment_data')
        .select('*')
        .order('timestamp', { ascending: true })
        .limit(50)

      if (error) {
        console.error('Error fetching investment data:', error)
        return
      }

      setData(investmentData || [])
    } catch (error) {
      console.error('Error fetching investment data:', error)
    } finally {
      setLoading(false)
    }
  }

  const chartData = {
    labels: data.map(d => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Global Investment Index',
        data: data.map(d => d.value),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        tension: 0.1,
        fill: true
      }
    ]
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#888',
          callback: (value) => `R${value.toLocaleString()}`
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#888',
          maxRotation: 0
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#888'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y
            const index = context.dataIndex
            const item = data[index]
            return [
              `Value: R${value.toLocaleString()}`,
              `Change: ${item.change_percentage > 0 ? '+' : ''}${item.change_percentage}%`,
              `Trend: ${item.trend}`
            ]
          }
        }
      }
    }
  }

  return (
    <div className="w-full h-[400px] bg-card rounded-lg p-4">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Loading investment data...</p>
        </div>
      ) : data.length > 0 ? (
        <Line ref={chartRef} data={chartData} options={options} />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No investment data available</p>
        </div>
      )}
    </div>
  )
} 