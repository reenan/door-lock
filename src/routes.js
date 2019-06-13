import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { RegisterContainer } from './components'

export default () => (
	<Switch>
		<Route path='/' exact component={RegisterContainer} />
		<Redirect from='*' to='/' />
	</Switch>
)
