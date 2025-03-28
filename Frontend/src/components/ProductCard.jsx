// src/components/ProductCard.jsx
const ProductCard = ({ product }) => {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300">
        <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} className="w-full h-56 object-cover" />
        <div className="p-4">
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p className="text-gray-700">Category: {product.category}</p>
          <p className="text-green-600 font-semibold">Rs. {product.price}</p>
          <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
        </div>
      </div>
    );
  };
  
  export default ProductCard;
  