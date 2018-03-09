import React from 'react';
import { Link } from 'react-router-dom';

export default ({ item }) => {
  const { image_url } = item;

  return (
    <Link to={`/items/${item.id}`}
      className='item_container'
      style={{ backgroundImage: `url(${image_url})` }}>
    </Link>
  );
}