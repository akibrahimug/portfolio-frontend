'use client'

import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Beaker, ChevronDown, BarChart2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import methods from '@/lib/methods.json'

// Define the methodology type
type Methodology = {
  name: string
  category: string
  description: string
  complexity: 'Low' | 'Medium' | 'High'
  teamSize: 'Small' | 'Medium' | 'Large' | 'Any'
  flexibility: 'Low' | 'Medium' | 'High'
  timeToImplement: 'Short' | 'Medium' | 'Long'
}

const Methodologies = () => {
  // State for selected methodologies to compare
  const [selectedMethodologies, setSelectedMethodologies] = useState<string[]>([])
  const [isCompareDialogOpen, setIsCompareDialogOpen] = useState(false)
  // Add state to control dropdown open state
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Development methodologies with additional comparison data
  const methodologies: Methodology[] = methods.methods as Methodology[]

  const categoryColors: Record<string, string> = {
    process: 'bg-green-100 text-green-800',
    principle: 'bg-blue-100 text-blue-800',
    paradigm: 'bg-purple-100 text-purple-800',
    architecture: 'bg-yellow-100 text-yellow-800',
    technology: 'bg-red-100 text-red-800',
    design: 'bg-violet-100 text-violet-800',
  }

  // Group methodologies by category
  const groupedMethodologies = methodologies.reduce((acc, methodology) => {
    if (!acc[methodology.category]) {
      acc[methodology.category] = []
    }
    acc[methodology.category].push(methodology)
    return acc
  }, {} as Record<string, typeof methodologies>)

  // Format category name for display (capitalize first letter)
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  // Toggle methodology selection for comparison
  const toggleMethodologySelection = (methodologyName: string) => {
    setSelectedMethodologies((prev) => {
      if (prev.includes(methodologyName)) {
        return prev.filter((name) => name !== methodologyName)
      } else {
        // Limit to 3 selections for better UI
        if (prev.length < 3) {
          return [...prev, methodologyName]
        }
        return prev
      }
    })
  }

  // Get selected methodology objects
  const getSelectedMethodologyObjects = () => {
    return methodologies.filter((m) => selectedMethodologies.includes(m.name))
  }

  // Handle compare button click
  const handleCompareClick = () => {
    if (selectedMethodologies.length >= 2) {
      // Close dropdown before opening dialog to remove underlying overlay
      setDropdownOpen(false)
      setIsCompareDialogOpen(true)
    }
  }

  // Handle dialog close
  const handleDialogOpenChange = (open: boolean) => {
    setIsCompareDialogOpen(open)
  }

  return (
    <div className='m-2 md:mr-10 items-center justify-end'>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger className='group inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 cursor-pointer'>
          <span className='hidden lg:inline-block'>My Methodology</span>
          <Beaker className='h-4 w-4' />
          <ChevronDown className='h-4 w-4 opacity-50 transition-transform group-data-[state=open]:rotate-180' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[280px] bg-white p-1 shadow-md'>
          <div className='p-2'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm font-medium text-gray-700'>
                Select to compare ({selectedMethodologies.length}/3)
              </span>
              <Button
                variant='outline'
                size='sm'
                onClick={handleCompareClick}
                disabled={selectedMethodologies.length < 2}
                className='h-8 gap-1 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer'
              >
                <BarChart2 className='h-3.5 w-3.5' />
                <span>Compare</span>
              </Button>
            </div>
          </div>
          <DropdownMenuSeparator className='bg-gray-200' />
          {Object.entries(groupedMethodologies).map(([category, items], index) => (
            <React.Fragment key={category}>
              {index > 0 && <DropdownMenuSeparator className='bg-gray-200' />}
              <DropdownMenuLabel
                className={cn(
                  'text-xs font-medium uppercase tracking-wider px-2',
                  categoryColors[category],
                )}
              >
                {formatCategoryName(category)}
              </DropdownMenuLabel>
              {items.map((methodology, idx) => (
                <DropdownMenuItem
                  key={idx}
                  className='flex cursor-pointer items-center justify-between rounded-md py-1.5 px-2 text-sm text-gray-700 hover:bg-gray-100'
                  onSelect={(e) => e.preventDefault()} // Prevent closing dropdown on selection
                >
                  <div className='flex items-center gap-2'>
                    <Checkbox
                      id={`methodology-${methodology.name}`}
                      checked={selectedMethodologies.includes(methodology.name)}
                      onCheckedChange={() => toggleMethodologySelection(methodology.name)}
                      className='border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer'
                    />
                    <span>{methodology.name}</span>
                  </div>
                  <Badge
                    variant='outline'
                    className={cn('ml-2 text-xs font-normal border', categoryColors[category])}
                  >
                    {category}
                  </Badge>
                </DropdownMenuItem>
              ))}
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Comparison Dialog */}
      <Dialog open={isCompareDialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className='max-w-4xl bg-white p-6 rounded-lg shadow-lg'>
          <DialogHeader>
            <DialogTitle className='text-xl font-semibold text-gray-900'>
              Methodology Comparison
            </DialogTitle>
            <DialogDescription className='text-gray-500'>
              Compare different development methodologies side by side
            </DialogDescription>
          </DialogHeader>

          <div className='mt-4 overflow-x-auto'>
            <MethodologyComparisonTable
              methodologies={getSelectedMethodologyObjects()}
              categoryColors={categoryColors}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Comparison table component
const MethodologyComparisonTable = ({
  methodologies,
  categoryColors,
}: {
  methodologies: Methodology[]
  categoryColors: Record<string, string>
}) => {
  // Comparison criteria
  const criteria = [
    { key: 'category', label: 'Category' },
    { key: 'description', label: 'Description' },
    { key: 'complexity', label: 'Complexity' },
    { key: 'teamSize', label: 'Team Size' },
    { key: 'flexibility', label: 'Flexibility' },
    { key: 'timeToImplement', label: 'Time to Implement' },
  ]

  // Helper function to render cell content based on criteria
  const renderCellContent = (methodology: Methodology, criteriaKey: string) => {
    const value = methodology[criteriaKey as keyof Methodology]

    if (criteriaKey === 'category') {
      return (
        <Badge
          variant='outline'
          className={cn('text-xs font-normal border', categoryColors[value as string])}
        >
          {value}
        </Badge>
      )
    }

    return value
  }

  // Helper function to get background color for complexity, flexibility, etc.
  const getValueColor = (value: string) => {
    switch (value) {
      case 'Low':
        return 'bg-green-50 text-green-700'
      case 'Medium':
        return 'bg-yellow-50 text-yellow-700'
      case 'High':
        return 'bg-red-50 text-red-700'
      case 'Short':
        return 'bg-green-50 text-green-700'
      case 'Long':
        return 'bg-red-50 text-red-700'
      default:
        return ''
    }
  }

  return (
    <div className='w-full'>
      <table className='w-full border-collapse'>
        <thead>
          <tr>
            <th className='p-2 text-left font-medium text-gray-500 border-b border-gray-200'>
              Criteria
            </th>
            {methodologies.map((methodology) => (
              <th
                key={methodology.name}
                className='p-2 text-left font-medium text-gray-900 border-b border-gray-200'
              >
                {methodology.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {criteria.map((criterion) => (
            <tr key={criterion.key} className='border-t border-gray-100'>
              <td className='p-2 font-medium text-gray-700'>{criterion.label}</td>
              {methodologies.map((methodology) => {
                const value = methodology[criterion.key as keyof Methodology] as string
                const valueColor = ['complexity', 'flexibility', 'timeToImplement'].includes(
                  criterion.key,
                )
                  ? getValueColor(value)
                  : ''

                return (
                  <td key={`${methodology.name}-${criterion.key}`} className='p-2 text-gray-800'>
                    {criterion.key === 'category' ? (
                      renderCellContent(methodology, criterion.key)
                    ) : criterion.key === 'description' ? (
                      <span className='text-sm'>{value}</span>
                    ) : (
                      <span className={cn('px-2 py-1 rounded-full text-xs', valueColor)}>
                        {value}
                      </span>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Methodologies
