import React, { Component } from 'react';


// APIManager
import { APIManager } from '../../utils';


// redux
import actions from '../../actions';
import { connect } from 'react-redux';


// components
import { Register } from '../view';


class Account extends Component{


	componentDidMount() {
		
		this.props.checkCurrentUser();
	}

	register(registration){

		this.props.signup(registration);
	}

	login(credentials){

		this.props.login(credentials);
	}

	render(){

		const currentUser = this.props.account.user;

		return(
			<div>
				<div>
					{
						(currentUser == null) ?  
							(<Register onRegister={this.register.bind(this)}
									   onLogin={this.login.bind(this)} />)
							: <h2>{currentUser.username}</h2>
					}					
				</div>
			</div>
		)
	}
}


const stateToProps = (state) => {

	// matched here state.xxx.~~
	return {
		account: state.account
	}
}

const dispatchToProps = (dispatch) => {

	return {
		signup: (params) => dispatch(actions.signup(params)),
		login: (params) => dispatch(actions.login(params)),
		checkCurrentUser: () => dispatch(actions.checkCurrentUser()),
	}
}

export default connect(stateToProps, dispatchToProps)(Account)