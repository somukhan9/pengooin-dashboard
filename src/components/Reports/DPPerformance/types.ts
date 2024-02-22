export type TDeliveryPerson = {
  id: string
  name: string
}

export type TOrder = {
  key: string
  orderId: string
  deliveryPersonId: string
  deliveryPersonName: string
  orderTime: Date
  assignmentTime: Date
  inProgressTime: Date
  orderInProgress: number // in minutes
  receivedTime: Date
  deliveryTime: Date
  deliveryDurationFromReceived: number // in minutes
  orderExecutionTime: number // in minutes
}
