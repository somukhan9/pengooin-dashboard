'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { useState } from 'react'

import classnames from 'classnames'

import FulFillmentReport from './FulFillment'
import MonetaryReport from './Monetary'
import DPPerformanceReport from './DPPerformance'

import '../styles.css'

const options = [
  {
    id: 1,
    title: 'Fulfillment Report',
  },
  {
    id: 2,
    title: 'Monetary Report',
  },
  {
    id: 3,
    title: 'DP Performance Report',
  },
]

const Report = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentReport = parseInt(searchParams.get('report-state') || '')
  const [reportState, setReportState] = useState<number>(currentReport)

  return (
    <div className="flex flex-col gap-8 items-center mt-10">
      <h1 className="md:text-4xl text-2xl font-bold text-center mb-4">
        Reports
      </h1>
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative inline-block text-left">
          <select
            value={reportState}
            onChange={(e) => setReportState(parseInt(e.target.value))}
            className="block transition-all duration-200 ease-in-out min-w-[250px] appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-blue-500"
          >
            <option value="" disabled>
              Select a Report
            </option>
            {options.map((value: { id: number; title: string }, index) => (
              <option
                key={index}
                value={value.id}
                // selected={reportState === value.id}
              >
                {value.title}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <button
          disabled={!reportState || reportState === currentReport}
          onClick={() => {
            const searchParam = new URLSearchParams(window.location.search)
            searchParam.set('report-state', reportState.toString())
            router.push(`?${searchParam.toString()}`, { scroll: false })
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue active:bg-blue-800 disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:opacity-80"
        >
          Generate Report
        </button>
      </div>

      {/* Report Container */}

      <div className="w-full flex items-center justify-center relative">
        <div
          className={`absolute top-0 w-full transition-all duration-200 ease-in-out ${classnames(
            {
              'opacity-0 h-0 overflow-hidden': currentReport !== 1,
              'opacity-100': currentReport === 1,
            }
          )}`}
        >
          <FulFillmentReport />
        </div>
        <div
          className={`absolute top-0 w-full transition-all duration-200 ease-in-out ${classnames(
            {
              'opacity-0 h-0 overflow-hidden': currentReport !== 2,
              'opacity-100': currentReport === 2,
            }
          )}`}
        >
          <MonetaryReport />
        </div>
        <div
          className={`absolute top-0 w-full transition-all duration-200 ease-in-out ${classnames(
            {
              'opacity-0 h-0 overflow-hidden': currentReport !== 3,
              'opacity-100': currentReport === 3,
            }
          )}`}
        >
          <DPPerformanceReport />
        </div>
      </div>
    </div>
  )
}
export default Report
