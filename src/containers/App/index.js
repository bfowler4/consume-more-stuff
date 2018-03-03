import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import '../NavigationBar/styles.css';

import { loadItems, loadSingleItem, editItem} from '../../actions/itemsActions';
import { setPageToDisplay } from '../../actions/pageDisplayActions';

import NavigationBar from '../../containers/NavigationBar';
import ItemComponent from '../../components/ItemComponent';
import EditItem from '../EditItem';

class App extends Component {
  
  componentWillMount() {
    this.props.loadItems();
    this.props.loadSingleItem(1);
  }

  contentDisplayer() {
    switch (this.props.currentPage) {
      case `homePage`:
        return <div>HOME PAGE VIEW</div>;
      case `singleItemPage`:
        return <ItemComponent singleItem={this.props.singleItem} />;
      default:
        return <div>HOME PAGE VIEW</div>;
    }
  }

  render() {
    return (
      <div className='outer_page_container'>
        <NavigationBar />
        <div className='app_content'>
          {this.contentDisplayer()}
        </div>
        <EditItem />
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

export default ConnectedApp;
