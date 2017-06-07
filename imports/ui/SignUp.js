import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

class SignUp extends Component {
  state = {
    error: ''
  }

  onSubmit = (e) => {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (!email || !password) {
      return this.setState({ error: 'You must provide an email and password' });
    } else if (password.length < 9) {
      return this.setState({ error: 'Password must contain at least 9 characters' });
    }
    // reset any error message
    this.setState({ error: '' });
    // reset form
    e.target.reset();

    Accounts.createUser({ email, password }, (err) => {
      if (err) {
        return this.setState({ error: err.reason });
      } else {
        this.props.history.replace('/links');
      }
      console.log('Signup callback', err);
    });
  }

  render() {
    return (
      <div>
        <h1>Join Short Link</h1>

        { this.state.error ? <p>{this.state.error}</p> : null }
        <form noValidate onSubmit={this.onSubmit}>
          <input type="email" ref="email" name="email" placeholder="Email" />
          <input type="password" ref="password" name="password" placeholder="Password" />
          <button>Create Account</button>
        </form>
        <Link to="/">Have an account?</Link>
      </div>
    );
  }
}

export default SignUp;
