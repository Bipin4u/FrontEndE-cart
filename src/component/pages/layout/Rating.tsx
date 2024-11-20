
interface ratingProp {
    rating : number,
    reviews_count : number
}

const Rating = (props : ratingProp) => {

  return (
    <div style={{ display: 'flex', alignItems: 'center', alignContent:"center"}}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: '2rem',
            color: star <= ( props.rating) ? '#008374' : 'gray',
            cursor: 'pointer',
            marginRight: '5px',
          }}
        >
          ★
        </span>
      ))}
      <p>{props.reviews_count}</p>
    </div>
  );
};

export default Rating;
