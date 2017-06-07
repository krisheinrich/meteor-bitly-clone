import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

class Link extends Component {
  onLogout = () => {
    Accounts.logout(() => this.props.history.push('/'));
  }

  render() {
    return (
      <div>
        <h1>Your Links</h1>
        <button onClick={this.onLogout}>Log Out</button>
      </div>
    );
  }
}

export default Link;
