import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addItem } from '../../actions/itemsActions';

class AddItemForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      price: ``,
      condition: '',
      category: '',
      titleError: false,
      descriptionError: false,
      priceError: false,
      conditionError: false,
      categoryError: false,
      imageFile: ``
    };
  };


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ [`${event.target.name}Error`]: false });
  };

  handleImageChange(event) {
    event.preventDefault();
    if (!event.target.files[0]) {
      return;
    }
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        imageFile: reader.result,
      });
    }
    reader.readAsDataURL(file);
  }

  handleSubmit(event) {
    event.preventDefault();
    let isError = false;
    const inputs = [`title`, `description`, `price`, `condition`, `category`];
    inputs.forEach(input => {
      if (!this.state[input]) {
        this.setState({ [`${input}Error`]: true });
        isError = true;
      }
    })

    if (isError) {
      return;
    }

    this.props.addItem(this.state)
    this.setState({
      title: '',
      description: '',
      price: '',
      condition: '',
      category: '',
      image_url: ''
    });
  };

  render() {
    return (
      <div className="add_item_form_container">
        <form className='add_item_form' onSubmit={this.handleSubmit.bind(this)}>
          <h6>add item</h6>
          <div className='form_input_container'>
            <input
              type="text"
              name="title"
              placeholder="TITLE"
              value={this.state.title}
              onChange={this.handleChange.bind(this)} 
              className={this.state.titleError ? `input_error` : ``} />
              {this.state.titleError &&
                <p className='add_item_form_error'>required</p>}
          </div>
          <div className='form_input_container'>
            <input
              type="text"
              name="description"
              placeholder="DESCRIPTION"
              value={this.state.description}
              onChange={this.handleChange.bind(this)}
              className={this.state.descriptionError ? `input_error` : ``} />
              {this.state.descriptionError &&
                <p className='add_item_form_error'>required</p>}
          </div>
          <div className='condition_category_container'>
            <input
              type="number"
              name="price"
              placeholder="PRICE"
              value={this.state.price}
              onChange={this.handleChange.bind(this)} 
              className={this.state.priceError ? `input_error` : ``} />
            <select
              name="condition"
              value={this.state.condition}
              onChange={this.handleChange.bind(this)}
              className={this.state.conditionError ? `input_error` : ``} >
              <option value="">CONDITION</option>
              <option value="new">New</option>
              <option value="like new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="salvage">Salvage</option>
            </select>
            <select
              name="category"
              value={this.state.category}
              onChange={this.handleChange.bind(this)}
              className={this.state.categoryError ? `input_error` : ``} >
              <option value="">CATEGORY</option>
              <option value="electronics">Electronics</option>
              <option value="vehicles">Vehicles</option>
              <option value="furniture">Furniture</option>
              <option value="apparel">Apparel</option>
              <option value="other">Other</option>
            </select>
          </div>
          <input
            type='file'
            name='file'
            accept='image/*'
            onChange={this.handleImageChange.bind(this)} />
          <input
            type='submit'
            value='SUBMIT' />
          <div className='close_button_container' onClick={this.props.hideAddForm}>
            <div className='close_button'>
              <div className='left_x'></div>
              <div className='right_x'></div>
            </div>
          </div>
        </form>
      </div>
    )
  };
};


const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  addItem: item => dispatch(addItem(item))
});

const ConnectedAddItemForm = connect(mapStateToProps, mapDispatchToProps)(AddItemForm);

export default ConnectedAddItemForm;