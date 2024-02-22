'use client'
import { Button, Table } from 'antd'
import React from 'react'

type PDTableProps = {
  loading?: boolean
  columns: any
  dataSource: any
  pageSize?: number
  totalPages?: number
  showSizeChanger?: boolean
  onPaginationChange?: (page: number, pageSize: number) => void
  onTableChange?: (pagination: any, filter: any, sorter: any) => void
  showPagination?: boolean
  scroll?: object
  className?: string
}
const PDTable = ({
  loading = false,
  columns,
  dataSource,
  pageSize,
  totalPages,
  showSizeChanger = true,
  onPaginationChange,
  onTableChange,
  showPagination = true,
  scroll = {},
  className = '',
}: PDTableProps) => {
  const paginationConfig = showPagination
    ? {
        pageSize: pageSize,
        total: totalPages,
        pageSizeOptions: [5, 10, 20],
        showSizeChanger: showSizeChanger,
        onChange: onPaginationChange,
      }
    : false
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      pagination={paginationConfig}
      onChange={onTableChange}
      scroll={scroll}
      className={className}
    />
  )
}

export default PDTable
