import { TableProps } from 'antd'
import { TDeliveryPerson, TOrder } from './types'

// Necessary imports for export features
import { CSVLink } from 'react-csv'
import * as XLSX from 'xlsx'
import Papa from 'papaparse'

const generateRandomTimestamp = (): Date => {
  const startDate = new Date(2022, 0, 1)
  const endDate = new Date()
  const randomTimestamp = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  )
  return randomTimestamp
}

export const generateDummyData = (): TOrder[] => {
  const dummyData: TOrder[] = []

  for (let i = 1; i <= 20; i++) {
    const deliveryPerson: TDeliveryPerson = {
      id: `DP${i}`,
      name: `DeliveryPerson${i}`,
    }

    const orderTime = generateRandomTimestamp()
    const assignmentTime = new Date(
      orderTime.getTime() + Math.random() * 60 * 60 * 1000
    ) // Random time within 1 hour
    const inProgressTime = new Date(
      assignmentTime.getTime() + Math.random() * 60 * 60 * 1000
    ) // Random time within 1 hour
    const receivedTime = new Date(
      inProgressTime.getTime() + Math.random() * 60 * 60 * 1000
    ) // Random time within 1 hour
    const deliveryTime = new Date(
      receivedTime.getTime() + Math.random() * 60 * 60 * 1000
    ) // Random time within 1 hour

    const orderInProgress = Math.floor(
      (inProgressTime.getTime() - assignmentTime.getTime()) / (60 * 1000)
    )
    const deliveryDurationFromReceived = Math.floor(
      (deliveryTime.getTime() - receivedTime.getTime()) / (60 * 1000)
    )
    const orderExecutionTime = Math.floor(
      (deliveryTime.getTime() - assignmentTime.getTime()) / (60 * 1000)
    )

    const order: TOrder = {
      key: `${i}`,
      orderId: `Order${i}`,
      deliveryPersonId: deliveryPerson.id,
      deliveryPersonName: deliveryPerson.name,
      orderTime,
      assignmentTime,
      inProgressTime,
      orderInProgress,
      receivedTime,
      deliveryTime,
      deliveryDurationFromReceived,
      orderExecutionTime,
    }

    dummyData.push(order)
  }

  return dummyData
}

export type TColumn = {
  title: string
  dateIndex: string
  key: string
}

// {
//   title: 'Address',
//   dataIndex: 'address',
//   key: 'address',
// },

type DataType = {
  key: string
  orderId: string
  deliveryPersonId: string
  deliveryPersonName: string
  assignmentTime: string
  inProgressTime: string
  orderInProgress: string
  receivedTime: string
  deliveryTime: string
  deliveryDurationFromReceived: string
  orderExecutionTime: string
}

export const columns = [
  { title: 'Order ID', dataIndex: 'orderId', key: 'orderId' },
  {
    title: 'Delivery Person ID',
    dataIndex: 'deliveryPersonId',
    key: 'deliveryPersonId',
  },
  {
    title: 'Delivery Person Name',
    dataIndex: 'deliveryPersonName',
    key: 'deliveryPersonName',
  },
  {
    title: 'Order Time',
    dataIndex: 'orderTime',
    key: 'orderTime',
    render: function (data: Date) {
      return data.toLocaleString() as string
    },
  },
  {
    title: 'Assignment Time',
    dataIndex: 'assignmentTime',
    key: 'assignmentTime',
    render: function (data: Date) {
      return data.toLocaleString() as string
    },
  },
  {
    title: 'In Progress Time',
    dataIndex: 'inProgressTime',
    key: 'inProgressTime',
    render: function (data: Date) {
      return data.toLocaleString() as string
    },
  },
  {
    title: 'Order In Progress (min)',
    dataIndex: 'orderInProgress',
    key: 'orderInProgress',
    render: function (data: number) {
      return data.toString()
    },
  },
  {
    title: 'Received Time',
    dataIndex: 'receivedTime',
    key: 'receivedTime',
    render: function (data: Date) {
      return data.toLocaleString() as string
    },
  },
  {
    title: 'Delivery Time',
    dataIndex: 'deliveryTime',
    key: 'deliveryTime',
    render: function (data: Date) {
      return data.toLocaleString() as string
    },
  },
  {
    title: 'Delivery Duration From Receive (min)',
    dataIndex: 'deliveryDurationFromReceived',
    key: 'deliveryDurationFromReceived',
    render: function (data: number) {
      return String(data)
    },
  },
  {
    title: 'Order Execution Time (min)',
    dataIndex: 'orderExecutionTime',
    key: 'orderExecutionTime',
    render: function (data: number) {
      return data.toString()
    },
  },
]

export const exportCSV = (tableData: TOrder[]) => {
  // Prepare CSV data
  const csvData = tableData.map((row) => ({
    'Order ID': row.orderId,
    'Delivery Person ID': row.deliveryPersonId,
    'Delivery Person Name': row.deliveryPersonName,
    'Order Time': row.orderTime,
    'Assignment Time': row.assignmentTime,
    'In Progress Time': row.inProgressTime,
    'Order In Progress (min)': row.orderInProgress,
    'Received Time': row.receivedTime,
    'Delivery Time': row.deliveryTime,
    'Delivery Duration From Received (min)': row.deliveryDurationFromReceived,
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

export const exportExcel = (tableData: TOrder[]) => {
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
      'Delivery Duration From Received (min)',
      'Order Execution Time (min)',
    ],
    ...tableData.map((row) => [
      row.orderId,
      row.deliveryPersonId,
      row.deliveryPersonName,
      row.orderTime,
      row.assignmentTime,
      row.inProgressTime,
      row.orderInProgress,
      row.receivedTime,
      row.deliveryTime,
      row.deliveryDurationFromReceived,
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
