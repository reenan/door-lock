## Door Lock


Door Lock is a demo application to simulate openning doors via web.

The demo can be accessed here: [Door Lock](http://door-lock.surge.sh/)

The application provides an interface to register a `Store` and manage its `Employees`, `Roles` and `Doors`. 

Each `Store` may have as many `Employees`, `Roles` and `Doors` as it wishes.

Each `Employee` can have a `Role` that determines which `Doors` he/she can open.

Each `Role` stores which `Doors` employees that have this role can open and which they can not.

Being that, `Employee`, `Role` and `Door` structs are:

```
Employee: {
  name: String,
  role: Role ID
}
```

```
Role: {
  name: String,
  permissions: {
    DoorID: Boolean
  }
}
```

```
Door: {
  name: String
}
```

----

#### Running
```
$ npm install
$ npm start
```

#### Testing
```
$ npm run test [-- --coverage --watchAll]
$ npm run test:e2e
```
##### PS: The application needs to be running on port 3000 for e2e tests.

##### ([why watchAll?](https://github.com/facebook/create-react-app/issues/6888))

#### Building
```
$ npm run build
```

##### PS: This application is not compatible with IE

----
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project's interface was built using [Semantic UI React](https://react.semantic-ui.com/).

This project's ajax requests are dummy requests fired against [ReqRes](https://reqres.in).

This project's demo is hosted by [Surge](https://surge.sh/).
