import { TDeliveryPerson, TOrder } from './types'

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

  for (let i = 1; i <= 10; i++) {
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
    const deliveryDurationFromReceive = Math.floor(
      (deliveryTime.getTime() - receivedTime.getTime()) / (60 * 1000)
    )
    const orderExecutionTime = Math.floor(
      (deliveryTime.getTime() - assignmentTime.getTime()) / (60 * 1000)
    )

    const order: TOrder = {
      orderId: `Order${i}`,
      deliveryPerson,
      orderTime,
      assignmentTime,
      inProgressTime,
      orderInProgress,
      receivedTime,
      deliveryTime,
      deliveryDurationFromReceive,
      orderExecutionTime,
    }

    dummyData.push(order)
  }

  return dummyData
}

export const columns: string[] = [
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
]
