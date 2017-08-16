import React, { Component } from 'react';

class Register extends Component{

	constructor(props) {
		super(props);
		
		this.state = {
			registration: {
				username: '',
				password: ''
			}
		}
	}

	updateRegistration(e){

		e.preventDefault();

		let updated = Object.assign({}, this.state.registration);
		updated[e.target.id] = e.target.value;

		this.setState({
			registration: updated
		})
		return;
	}	

	submitRegistration(e){

		e.preventDefault();

		if(this.state.registration.username.length == 0){
			alert('please enter your username');
			return;
		}else if(this.state.registration.password.length == 0){
			alert('please enter your password');
			return;
		}

		let updated = Object.assign({}, this.state.registration);
		this.props.onRegister(updated);
		return;
	}

	submitLoginCredential(e){

		e.preventDefault();

		if(this.state.registration.username.length == 0){
			alert('please enter your username');
			return;
		}else if(this.state.registration.password.length == 0){
			alert('please enter your password');
			return;
		}

		let updated = Object.assign({}, this.state.registration);
		this.props.onLogin(updated);
		return;
	}

	render(){

		return(
			<div>
				<h2>Sign up</h2>
				<input id="username" onChange={this.updateRegistration.bind(this)} type="text" placeholder="Username" /><br/>
				<input id="password" onChange={this.updateRegistration.bind(this)} type="password" placeholder="Password" /><br/>
				<button onClick={this.submitRegistration.bind(this)}>Join</button>
				<button onClick={this.submitLoginCredential.bind(this)}>Login</button>
		    </div>
		)
	}
}

export default Register
