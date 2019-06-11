import Spinner from 'react-spinner-material';
import React, { Component } from 'react';

export default class Spinners extends Component {
  render() {
  return (
      <div>
        <Spinner size={80} spinnerColor={"#008000"} spinnerWidth={2} visible={this.props.spin} />
      </div>
    );
  }
}
