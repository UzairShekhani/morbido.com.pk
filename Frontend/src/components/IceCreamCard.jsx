const IceCreamCard = ({ image, name, price, onClick }) => {
    return (
      <>
      <div className="icecream-card" onClick={onClick}>
        <img src={image} alt={name} className="icecream-image" />
        <h3 className="icecream-name">{name}</h3>
        <p className="icecream-price">Rs. {price}</p>
      </div>
      </>
    );
  };
  
  export default IceCreamCard;
  