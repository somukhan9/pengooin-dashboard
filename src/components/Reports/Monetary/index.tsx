import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Necessary imports for export features
import { CSVLink } from 'react-csv'
import * as XLSX from 'xlsx'
import Papa from 'papaparse'

const columns = [
  { id: 1, title: 'Order ID' },
  { id: 2, title: 'Delivery Charge' },
  { id: 3, title: 'Vat' },
  { id: 4, title: 'Total Price' },
]

type TReport = {
  id: number
  deliveryCharge: number
  vat: number
  totalPrice: number
}

const reports = [
  { id: 1, deliveryCharge: 49, vat: 10, totalPrice: 259 },
  { id: 2, deliveryCharge: 39, vat: 7, totalPrice: 232 },
  { id: 3, deliveryCharge: 60, vat: 12, totalPrice: 350 },
  { id: 4, deliveryCharge: 35, vat: 2, totalPrice: 150 },
]

const MonetaryReport = () => {
  const searchParams = useSearchParams()

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null)

  // Only for demo purpose
  const [tableData, setTableData] = useState<TReport[]>([...reports])

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
      'Order ID': row.id,
      'Delivery Charge': row.deliveryCharge,
      VAT: row.vat,
      'Total Price': row.totalPrice,
    }))

    // Generate CSV file
    const csvFileName = 'monetary_report.csv'
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
      ['Order ID', 'Delivery Charge', 'VAT', 'Total Price'],
      ...tableData.map((row) => [
        row.id,
        row.deliveryCharge,
        row.vat,
        row.totalPrice,
      ]),
    ]

    // Create a workbook
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.aoa_to_sheet(excelData)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1')

    // Generate Excel file
    const excelFileName = 'monetary_report.xlsx'
    XLSX.writeFile(workbook, excelFileName)
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
        <table className="w-full border border-gray-300 divide-y divide-gray-300">
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
export default MonetaryReport
