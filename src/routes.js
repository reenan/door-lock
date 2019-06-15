import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { RegisterContainer, StoreContainer } from './pages'

export default () => (
	<Switch>
		<Route path='/' exact component={RegisterContainer} />
		<Route path='/store' exact component={StoreContainer} />
		<Redirect from='*' to='/' />
	</Switch>
)
