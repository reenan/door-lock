import uuid4 from 'uuid4'

const managerID = uuid4()
const buyerID = uuid4()
const cashierID = uuid4()
const clientID = uuid4()

const roles = {
  [managerID]: { name: 'Manager', permissions: { frontDoor: true, storageRoom: true } },
  [buyerID]: { name: 'Buyer', permissions: { frontDoor: false, storageRoom: true } },
  [cashierID]: { name: 'Cashier', permissions: { frontDoor: true, storageRoom: false } },
  [clientID]: { name: 'Client', permissions: { frontDoor: false, storageRoom: false } },
}

const employees = [
  { name: 'Jane', role: managerID },
  { name: 'John', role: buyerID },
  { name: 'Richard', role: cashierID },
  { name: 'Anna', role: clientID },
]

export { roles, employees }