import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// redux
import store from './stores';
import {Provider} from 'react-redux';


// Components
import {Home} from './components/layout';

const app = (
	<Provider store={store.configureStore()}>
		<div>
			<Home />
		</div>
	</Provider>
)


ReactDOM.render(app, document.getElementById('root'));