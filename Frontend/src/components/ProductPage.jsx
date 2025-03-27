const ProductPage = () => {
    const updateProgress = (quantity) => {
      const maxQuantity = 100;
      const percentage = (quantity / maxQuantity) * 100;
      document.getElementById("progress-bar").style.width = `${percentage}%`;
      document.getElementById("progress-text").innerText = `${quantity}L Available`;
    };
  
    
  
    return (
      <div className="container">
        <div className="image-section">
          <img src="/images/11.jpg" alt="Ice Cream" />
        </div>
        <div className="details-section">
          <h2>Delicious Ice Cream</h2>
          <p className="price">Rs. 299</p>
          <div className="options">
            <strong>Flavors:</strong>
            {['Chocolate', 'Vanilla', 'Strawberry', 'Mango'].map((flavor, idx) => (
              <span key={idx} className="option-btn">{flavor}</span>
            ))}
          </div>
          <div className="options">
            <strong>Size:</strong>
            {['Small', 'Medium', 'Large'].map((size, idx) => (
              <span key={idx} className="option-btn">{size}</span>
            ))}
          </div>
          <div className="quantity">
            <label htmlFor="quantity">Available Quantity:</label>
            <div className="progress-container">
              <div className="progress-bar" id="progress-bar"></div>
              <span className="progress-text" id="progress-text">70L Available</span>
            </div>
          </div>
          <div className="btn-container">
            <button className="btn buy-now">Buy Now</button>
            <button className="btn add-cart">Add to Cart</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductPage;
  