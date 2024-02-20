import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const columns = [
  { id: 1, title: 'Order ID' },
  { id: 2, title: 'Delivery Charge' },
  { id: 3, title: 'Vat' },
  { id: 4, title: 'Total Price' },
]

const reports = [
  { id: 1, deliveryCharge: 49, vat: 10, totalPrice: 259 },
  { id: 2, deliveryCharge: 39, vat: 7, totalPrice: 232 },
  { id: 3, deliveryCharge: 60, vat: 12, totalPrice: 350 },
  { id: 4, deliveryCharge: 35, vat: 2, totalPrice: 150 },
]

type TReport = {
  id: number
  deliveryCharge: number
  vat: number
  totalPrice: number
}

const MonetaryReport = () => {
  const searchParams = useSearchParams()
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null)

  const page = searchParams.get('page') || 1

  const handleStartDateChange = (date: Date | null) => {
    setSelectedStartDate(date)
  }

  const handleEndDateChange = (date: Date | null) => {
    setSelectedEndDate(date)
  }

  return (
    <div className="flex flex-col items-center justify-center border border-gray-300 rounded-lg py-5">
      <h3 className="md:text-2xl text-xl font-semibold text-center mb-4">
        Monetary Report
      </h3>

      {/* Filter By Date Options */}
      <div className="mb-5 w-max flex items-center gap-4">
        <div>
          <h4>Start Date</h4>
          <DatePicker
            selected={selectedStartDate}
            onChange={handleStartDateChange}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select a date"
            className="w-full px-4 py-2 transition-all duration-200 ease-in-out border border-blue-300 hover:border-blue-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            locale="en-US" // Set the locale
          />
        </div>
        <div>
          <h4>End Date</h4>
          <DatePicker
            selected={selectedEndDate}
            onChange={handleEndDateChange}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select a date"
            className="w-full px-4 py-2 transition-all duration-200 ease-in-out border border-blue-300 hover:border-blue-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            locale="en-US" // Set the locale
          />
        </div>
        <div>
          <h4 className="opacity-0">End Date</h4>
          <button
            disabled={!selectedStartDate || !selectedEndDate}
            onClick={() => {}}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue active:bg-blue-800 disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:opacity-80"
          >
            Go
          </button>
        </div>
      </div>

      {/* Data in Table format */}
      <div className="relative overflow-x-auto">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-300">
          <thead className="text-left">
            <tr>
              {columns.map((value: { id: number; title: string }, index) => (
                <th
                  key={index}
                  className="text-left px-6 py-2 whitespace-nowrap"
                >
                  {value.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reports.map((value: TReport, index) => (
              <tr key={index}>
                <td className="px-6 py-2">{value.id}</td>
                <td className="px-6 py-2">{value.deliveryCharge}</td>
                <td className="px-6 py-2">{value.vat}</td>
                <td className="px-6 py-2">{value.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="my-4 text-center">Pagination will go here</p>
      </div>
    </div>
  )
}
export default MonetaryReport
