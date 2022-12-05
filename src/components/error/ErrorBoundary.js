import React, { Component } from 'react';
import ErrorComponent from './ErrorComponent';

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, info) {
    this.setState({
      error: true,
    });
    console.log('error is', error);
    console.log('error info is', info);
  }

  render() {
    const { error } = this.state;

    if (error) {
      return <ErrorComponent />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
