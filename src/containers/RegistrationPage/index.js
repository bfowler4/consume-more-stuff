import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { register, SET_USER_REGISTRATION_ERROR } from '../../actions/authenticationActions';

class RegistrationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ``,
      username: ``,
      password: ``,
      emailError: false,
      usernameError: false,
      passwordError: false,
      redirectToLogin: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ [`${event.target.name}Error`]: false });
    if (this.props.registrationError) {
      this.props.resetError();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let isError = false;
    if (!this.state.email) {
      this.setState({ emailError: true });
      isError = true;
    }
    if (!this.state.username) {
      this.setState({ usernameError: true });
      isError = true;
    }
    if (!this.state.password) {
      this.setState({ passwordError: true });
      isError = true;
    }

    if (!isError) {
      this.props.register(this.state.email, this.state.username, this.state.password, () => {
        this.setState({ redirectToLogin: true });
      });
    }
  }

  render() {
    if (this.state.redirectToLogin) {
      return <Redirect to={`/login`} />
    }

    return (
      <div className='registration_page_container'>
        <div className='registration_form_container'>
          <form className='registration_form' onSubmit={this.handleSubmit}>
            <h6>register</h6>
            <div className='registration_email_container'>
              <input
                type='text'
                placeholder='EMAIL'
                name='email'
                value={this.state.email}
                onChange={this.handleChange}
                spellCheck='false'
                className={this.state.emailError ? `input_error` : ``} />
              {this.state.emailError &&
                <p className='registration_form_error'>required</p>}
            </div>
            <div className='registration_username_container'>
              <input
                type='text'
                placeholder='USERNAME'
                name='username'
                value={this.state.username}
                onChange={this.handleChange}
                spellCheck='false'
                className={this.state.usernameError ? `input_error` : ``} />
              {this.state.usernameError &&
                <p className='registration_form_error'>required</p>}
            </div>
            <div className='registration_password_container'>
              <input
                type='password'
                placeholder='PASSWORD'
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
                className={this.state.passwordError ? `input_error` : ``} />
              {this.state.passwordError &&
                <p className='registration_form_error'>required</p>}
            </div>
            <input
              type='submit'
              value='SUBMIT' />
          </form>
          {this.props.registrationError &&
            <div className='registration_error_container'>
              <p>{this.props.registrationError}</p>
            </div>
          }
          <div className='login_link'>
            <Link to='/login' className='back_to_login'>{'\u2190'}back to login</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    registrationError: state.authentication.registrationError
  }
};

const mapDispatchToProps = dispatch => {
  return {
    register: (email, username, password, callback) => {
      dispatch(register(email, username, password, callback));
    },
    resetError: () => {
      dispatch({
        type: SET_USER_REGISTRATION_ERROR,
        error: false
      });
    }
  }
};

const ConnectedRegistrationPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationPage);

export default ConnectedRegistrationPage;