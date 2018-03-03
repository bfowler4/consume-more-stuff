import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './styles.css';
import '../NavigationBar/styles.css';
import '../HomePage/styles.css';
import '../CategoryList/styles.css';

import { loadItems, loadSingleItem, editItem} from '../../actions/itemsActions';
import { setPageToDisplay } from '../../actions/pageDisplayActions';

import NavigationBar from '../NavigationBar';
import HomePage from '../HomePage';
import CategoryList from '../CategoryList';
import NotFound from '../../components/NotFound';

class App extends Component {
  
  componentWillMount() {
    this.props.loadItems();
    this.props.loadSingleItem(1);
  }

  render() {
    return (
      <div className='outer_page_container'>
        <NavigationBar />
        <div className='page_spacer'></div>
        <div className='app_content'>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/category/:category" component={CategoryList} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.items.categories,
    conditions: state.items.conditions,
    items: state.items.items,
    singleItem: state.items.singleItem,
    currentPage: state.pageDisplay.currentPage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadItems: () => {
      dispatch(loadItems());
    },
    loadSingleItem: (id) => {
      dispatch(loadSingleItem(id))
    },
    setPageToDisplay: page => {
      dispatch(setPageToDisplay(page));
    }
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default withRouter(ConnectedApp);
