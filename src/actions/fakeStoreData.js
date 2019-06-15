import uuid4 from 'uuid4'

const frontDoorID = uuid4()
const storageRoomID = uuid4()

const doors = {
  [frontDoorID]: { name: 'Front Door' },
  [storageRoomID]: { name: 'Storage Room' },
}

const managerID = uuid4()
const buyerID = uuid4()
const cashierID = uuid4()
const clientID = uuid4()

const roles = {
  [managerID]: { name: 'Manager', permissions: { [frontDoorID]: true, [storageRoomID]: true } },
  [buyerID]: { name: 'Buyer', permissions: { [frontDoorID]: false, [storageRoomID]: true } },
  [cashierID]: { name: 'Cashier', permissions: { [frontDoorID]: true, [storageRoomID]: false } },
  [clientID]: { name: 'Client', permissions: { [frontDoorID]: false, [storageRoomID]: false } },
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

export { doors, roles, employees }