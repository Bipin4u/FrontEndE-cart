import React, { useState } from 'react';

interface ratingProp {
    rating : number,
    reviews_count : number
}

//rating={item.rating} reviews_count={item.reviews_count}

const Rating = (props : ratingProp) => {
  const [hover, setHover] = useState(null);

  return (
    <div style={{ display: 'flex', alignItems: 'center', alignContent:"center"}}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: '2rem',
            color: star <= (hover || props.rating) ? 'gold' : 'gray',
            cursor: 'pointer',
            marginRight: '5px',
          }}
          // onMouseEnter={() => setHover(star)}
          // onMouseLeave={() => setHover(null)}
        >
          ★
        </span>
      ))}
      <p>{props.reviews_count}</p>
    </div>
  );
};

export default Rating;
