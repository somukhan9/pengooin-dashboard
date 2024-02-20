export type TDeliveryPerson = {
  id: string
  name: string
}

export type TOrder = {
  orderId: string
  deliveryPerson: TDeliveryPerson
  orderTime: Date
  assignmentTime: Date
  inProgressTime: Date
  orderInProgress: number // in minutes
  receivedTime: Date
  deliveryTime: Date
  deliveryDurationFromReceive: number // in minutes
  orderExecutionTime: number // in minutes
}
