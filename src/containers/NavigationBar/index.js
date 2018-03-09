import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setPageToDisplay } from '../../actions/pageDisplayActions';

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMenu: false,
      displayCategories: false,
    }

    this.handleDisplayMenu = this.handleDisplayMenu.bind(this);
    this.handleHideMenu = this.handleHideMenu.bind(this);
    this.handleDisplayCategories = this.handleDisplayCategories.bind(this);
  }

  handleDisplayMenu() {
    if (this.state.displayMenu) {
      this.handleHideMenu();
    } else {
      this.setState({ displayMenu: true });
    }
  }

  handleDisplayCategories() {
    this.setState({ displayCategories: true })
  }

  handleHideMenu(event) {
    this.setState({ displayCategories: false });
    this.setState({ displayMenu: false });
  }
  
  render() {
    return (
      <div className='header'>
        {this.state.displayMenu ?
          <div className='blur' onClick={this.handleHideMenu}></div>
          : null}
        <div className={`navigation_categories ${this.state.displayCategories ? null : `hide_categories`}`}>
          <h6 className='navigation_categories_title'>CATEGORIES</h6>
          <div className='navigation_categories_links'>
            {this.props.categories.map((category, index) => {
              return <Link to={`/category/${category}`} onClick={this.handleHideMenu} key={index}>{ category }</Link>;
            })}
          </div>
        </div>
        <div className={`navigation_menu ${this.state.displayMenu ? null : `hide_menu`}`}>
          <h6 className='navigation_menu_title'>MENU</h6>
          <div className='navigation_menu_links'>
            <Link to="/login" onClick={this.handleHideMenu}>LOGIN</Link>
            <span onClick={this.handleDisplayCategories}>CATEGORIES</span>
            <span>ALL ITEMS</span>
          </div>
        </div>
        <div className='base_navigation_bar'>
          <Link to='/' className='home_button' onClick={this.handleHideMenu}>Home</Link> 
          <span onClick={this.handleDisplayMenu} className='expand_button'>Expand</span>
        </div>
      </div>      
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.items.categories,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPageToDisplay: page => {
      dispatch(setPageToDisplay(page));
    }
  }
}

const ConnectedNavigationBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);

export default ConnectedNavigationBar;