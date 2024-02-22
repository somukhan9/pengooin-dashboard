// Necessary imports for export features
import { CSVLink } from 'react-csv'
import * as XLSX from 'xlsx'
import Papa from 'papaparse'

import { TReport } from './types'

export const columns = [
  {
    title: 'Order ID',
    dataIndex: 'orderId',
    key: 'orderId',
    render: function (data: any) {
      return String(data)
    },
  },
  {
    title: 'Delivery Charge',
    dataIndex: 'deliveryCharge',
    key: 'deliveryCharge',
  },
  { title: 'Vat', dataIndex: 'vat', key: 'vat' },
  { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
]

export const reports = [
  { orderId: 1, deliveryCharge: 49, vat: 10, totalPrice: 259 },
  { orderId: 2, deliveryCharge: 39, vat: 7, totalPrice: 232 },
  { orderId: 3, deliveryCharge: 60, vat: 12, totalPrice: 350 },
  { orderId: 4, deliveryCharge: 35, vat: 2, totalPrice: 150 },
]

export const exportCSV = (tableData: TReport[]) => {
  // Prepare CSV data
  const csvData = tableData.map((row) => ({
    'Order ID': row.orderId,
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

export const exportExcel = (tableData: TReport[]) => {
  // Prepare Excel data
  const excelData = [
    ['Order ID', 'Delivery Charge', 'VAT', 'Total Price'],
    ...tableData.map((row) => [
      row.orderId,
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
