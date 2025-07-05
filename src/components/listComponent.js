import React from 'react';

function ListComponent({ items, renderItem }) {
  if (!items || items.length === 0) {
    return <p>No items to display.</p>;
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id || index}>
          {renderItem ? renderItem(item) : item}
        </li>
      ))}
    </ul>
  );
}

export default ListComponent;
