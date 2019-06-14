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

const JaneID = uuid4()
const JohnID = uuid4()
const RichardID = uuid4()
const AnnaID = uuid4()

const employees = {
  [JaneID]: { name: 'Jane', role: managerID },
  [JohnID]: { name: 'John', role: buyerID },
  [RichardID]: { name: 'Richard', role: cashierID },
  [AnnaID]: { name: 'Anna', role: clientID },
}

export { roles, employees }