import React from 'react';

const Toggle = ({ searchByFood, toggleSearch }) => {
  return (
    <div>
      <input
        checked={searchByFood}
        onChange={toggleSearch}
        type="checkbox"
        name=""
        id=""
      />
    </div>
  );
};

export default Toggle;
