import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

class Login extends Component {
  state = {
    error: ''
  }

  onSubmit = (e) => {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({ email }, password, (err) => {
      console.log('Login callback... Error:', err);
      if (err) {
        // Show error messages from Meteor to user, e.g. 'Incorrect password'
        this.setState({ error: err.reason });
      } else {
        console.log("Signed in as", Meteor.userId() );
        this.props.history.replace('/links');
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Short Link</h1>

        { this.state.error ? <p>{this.state.error}</p> : null }
        <form noValidate onSubmit={this.onSubmit}>
          <input type="email" ref="email" name="email" placeholder="Email" />
          <input type="password" ref="password" name="password" placeholder="Password" />
          <button>Login</button>
        </form>

        <Link to="/signup">Don't have an account?</Link>
      </div>
    );
  }
}

export default Login;
