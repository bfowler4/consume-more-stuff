import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CategoryListItem from '../../components/CategoryListItem';
import ConnectedAddItemForm from '../AddItemForm';

class CategoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayAddForm: false
    };
  }

  componentDidMount() {
    window.addEventListener(`scroll`, this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll);
  }

  displayAddForm(event) {
    this.setState({
      displayAddForm: true
    });
  }

  hideAddForm(event) {
    setTimeout(() => {
      this.setState({
        displayAddForm: false
      });
    }, 500);
    document.getElementById(`add_item_form`).className += ` fadeout`;
  }

  handleScroll() {
    const header = document.getElementById(`category_header`);
    const fader = document.getElementById(`fade_out`);
    const height = window.innerHeight;
    const scrollPosition = window.scrollY;

    fader.style.opacity = 1 - (height - scrollPosition) / height;

    if (scrollPosition >= height && !header.className.includes(`sticky`)) {
      header.className += ` sticky`;
    }

    if (scrollPosition < height) {
      header.className = `category_header`;
    }
  }

  render() {
    const currentCategory = this.props.match.params.category;
    const aboutParagraph = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in consectetur leo, quis tempus sem. Nunc volutpat enim at tempor tempor. Ut augue odio, tempus sed dui et, ullamcorper consectetur sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie et tortor eu dapibus. Nullam eu posuere erat, suscipit euismod nunc. Aliquam fringilla a ante vitae viverra. In non vestibulum elit, eu molestie augue.`;
    if (!this.props.categories.includes(currentCategory)) {
      return <Redirect to='/' />;
    }
    const items = this.props.items.filter(item => item.category === currentCategory);
    const url = items.length ? items[0].image_url : `test`;

    return (
      <div className='category_list_container'>
        {this.state.displayAddForm && <div className="form-bg" id='add_item_form'>
          <ConnectedAddItemForm hideAddForm={this.hideAddForm.bind(this)} /></div>}
        <div id='main_image'
          className='category_main_image'
          style={{ backgroundImage: `url(${url})` }}>
        </div>
        <div id='fade_out' className='fade_out'></div>
        <div className='category_spacer'>
          <div className='category_information_container'>
            <h2>{currentCategory}</h2>
            <p>{aboutParagraph}</p>
          </div>
        </div>
        <div id='category_header' className='category_header'>
          <span className='all_items_button'>all items</span>
          <span className='add_item_button' onClick={this.displayAddForm.bind(this)}>add item</span>
          <input className='search_bar' type='text' placeholder={`Search through ${currentCategory}...`} />
        </div>
        <div className='category_list_items_container'>
          {items.map(item =>
            <CategoryListItem key={item.id} item={item} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items.items,
    categories: state.items.categories,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const ConnectedCategoryList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);

export default ConnectedCategoryList;