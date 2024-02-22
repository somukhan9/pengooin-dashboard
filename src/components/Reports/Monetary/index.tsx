import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { TReport } from './types'
import { columns, exportCSV, exportExcel, reports } from './utils'
import PDTable from '@/components/ui/PDTable'

const MonetaryReport = () => {
  const searchParams = useSearchParams()

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null)

  // Only for demo purpose
  const [tableData, setTableData] = useState<TReport[]>([...reports])

  const query: Record<string, any> = {}

  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(10)

  const [sortBy, setSortBy] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  query['limit'] = size
  query['page'] = page
  query['sortBy'] = sortBy
  query['sortOrder'] = sortOrder

  const handleStartDateChange = (date: Date | null) => {
    setSelectedStartDate(date)
  }

  const handleEndDateChange = (date: Date | null) => {
    setSelectedEndDate(date)
  }

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page)
    setSize(pageSize)
  }

  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter
    // console.log(order, field);
    setSortBy(field as string)
    setSortOrder(order === 'ascend' ? 'asc' : 'desc')
  }

  const resetFilters = () => {
    setSortBy('')
    setSortOrder('')
    setSearchTerm('')
  }

  return (
    <div className="grid items-center justify-center border border-gray-300 rounded-lg py-5 px-4">
      <h3 className="md:text-2xl text-xl font-semibold text-center mb-4">
        Monetary Report
      </h3>

      {/* Filter By Date Options */}
      <div className="mb-5 w-full flex items-center md:justify-center flex-wrap md:flex-nowrap gap-4">
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
      <div className="relative overflow-x-auto pb-2">
        {/* <table className="w-full border border-gray-300 divide-y divide-gray-300">
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
        </table> */}
        <PDTable
          columns={columns}
          dataSource={reports}
          pageSize={size}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
          scroll={{ x: true }}
        />
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => exportCSV(tableData)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        >
          Export as CSV
        </button>

        <button
          onClick={() => exportExcel(tableData)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        >
          Export as Excel
        </button>
      </div>
      <p className="my-4 text-center">Pagination will go here</p>
    </div>
  )
}
export default MonetaryReport
