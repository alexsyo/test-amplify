import React, { Component } from 'react';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react';
import { google_client_id } from './config';
import { API, Auth } from 'aws-amplify';

class App extends Component {
  state = {
    showAuthenticator: false,
    units: undefined,
    resources: undefined
  }

  federated = {
    google_client_id
  }

  showAuthenticator = () => this.setState({showAuthenticator: !this.state.showAuthenticator})
  signOut = () => Auth.signOut();

  callApi = async () => {
    try {
      const res = await API.get('units', '/units')
      console.log(res)
      this.setState({ units: res.toString() })
    } catch(e) {
      console.log(`error ${e}`)
    }
  }

  callApi2 = async () => {
    try {
      const res = await API.get('resources', '/resources')
      console.log(res)
      this.setState({ resources: res.toString() })
    } catch(e) {
      console.log(`error ${e}`)
    }
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.showAuthenticator}>show authenticator</button>
        <button onClick={this.signOut}>logout</button>
        <button onClick={this.callApi}>call the api units</button>
        <button onClick={this.callApi2}>call the api resources</button>
        <p>units {this.state.units}</p>
        <p>resources {this.state.resources}</p>
        {this.state.showAuthenticator.toString()}
        {this.state.showAuthenticator && <Authenticate federated={this.federated} />}
      </div>
    );
  }
}

const Authenticate = withAuthenticator(() => <div>logged in!</div>); 

export default App;
