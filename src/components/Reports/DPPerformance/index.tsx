import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Necessary imports for export features
import { CSVLink } from 'react-csv'
import * as XLSX from 'xlsx'
import Papa from 'papaparse'

import { TOrder } from './types'
import { generateDummyData, columns } from './utils'

const DPPerformanceReport = () => {
  const dpPerformanceData: TOrder[] = generateDummyData()

  const searchParams = useSearchParams()

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null)

  // Only for demo purpose
  const [tableData, setTableData] = useState<TOrder[]>([...dpPerformanceData])

  const page = searchParams.get('page') || 1

  const handleStartDateChange = (date: Date | null) => {
    setSelectedStartDate(date)
  }

  const handleEndDateChange = (date: Date | null) => {
    setSelectedEndDate(date)
  }

  const exportCSV = () => {
    // Prepare CSV data
    const csvData = tableData.map((row) => ({
      'Order ID': row.orderId,
      'Delivery Person ID': row.deliveryPerson.id,
      'Delivery Person Name': row.deliveryPerson.name,
      'Order Time': row.orderTime,
      'Assignment Time': row.assignmentTime,
      'In Progress Time': row.inProgressTime,
      'Order In Progress (min)': row.orderInProgress,
      'Received Time': row.receivedTime,
      'Delivery Time': row.deliveryTime,
      'Delivery Duration From Receive (min)': row.deliveryDurationFromReceive,
      'Order Execution Time (min)': row.orderExecutionTime,
    }))

    // Generate CSV file
    const csvFileName = 'dp_performance_report.csv'
    const csvOptions = { headers: true }
    // const csvBlob = new Blob([Papa.unparse(csvData, csvOptions)], {
    //   type: 'text/csv;charset=utf-8;',
    // })
    const csvBlob = new Blob([Papa.unparse(csvData, { header: true })], {
      type: 'text/csv;charset=utf-8;',
    })
    const csvUrl = URL.createObjectURL(csvBlob)

    // Create a link and click it to trigger the download
    const link = document.createElement('a')
    link.href = csvUrl
    link.setAttribute('download', csvFileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportExcel = () => {
    // Prepare Excel data
    const excelData = [
      [
        'Order ID',
        'Delivery Person ID',
        'Delivery Person Name',
        'Order Time',
        'Assignment Time',
        'In Progress Time',
        'Order In Progress (min)',
        'Received Time',
        'Delivery Time',
        'Delivery Duration From Receive (min)',
        'Order Execution Time (min)',
      ],
      ...tableData.map((row) => [
        row.orderId,
        row.deliveryPerson.id,
        row.deliveryPerson.name,
        row.orderTime,
        row.assignmentTime,
        row.inProgressTime,
        row.orderInProgress,
        row.receivedTime,
        row.deliveryTime,
        row.deliveryDurationFromReceive,
        row.orderExecutionTime,
      ]),
    ]

    // Create a workbook
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.aoa_to_sheet(excelData)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1')

    // Generate Excel file
    const excelFileName = 'dp_performance_report.xlsx'
    XLSX.writeFile(workbook, excelFileName)
  }

  return (
    <div className="grid items-center justify-center border border-gray-300 rounded-lg py-5 px-4">
      <h3 className="md:text-2xl text-xl font-semibold text-center mb-4">
        DP Performance Report
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
        <table className="w-full border border-gray-300 divide-y divide-gray-300">
          <thead className="text-left">
            <tr>
              {columns.map((value: string, index) => (
                <th
                  key={index}
                  className="text-left px-6 py-2 whitespace-nowrap"
                >
                  {value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dpPerformanceData.map((value: TOrder, index) => (
              <tr key={index}>
                <td className="px-6 py-2">{value.orderId}</td>
                <td className="px-6 py-2">{value.deliveryPerson.id}</td>
                <td className="px-6 py-2">{value.deliveryPerson.name}</td>
                <td className="px-6 py-2">
                  {value.orderTime.toLocaleString()}
                </td>
                <td className="px-6 py-2">
                  {value.assignmentTime.toLocaleString()}
                </td>
                <td className="px-6 py-2">
                  {value.inProgressTime.toLocaleString()}
                </td>
                <td className="px-6 py-2">{value.orderInProgress}</td>
                <td className="px-6 py-2">
                  {value.receivedTime.toLocaleString()}
                </td>
                <td className="px-6 py-2">
                  {value.deliveryTime.toLocaleString()}
                </td>
                <td className="px-6 py-2">
                  {value.deliveryDurationFromReceive}
                </td>
                <td className="px-6 py-2">{value.orderExecutionTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={exportCSV}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        >
          Export as CSV
        </button>

        <button
          onClick={exportExcel}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        >
          Export as Excel
        </button>
      </div>
      <p className="my-4 text-center">Pagination will go here</p>
    </div>
  )
}
export default DPPerformanceReport
