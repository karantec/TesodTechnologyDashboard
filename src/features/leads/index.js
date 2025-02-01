import React, { useState } from 'react';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    discountedPrice: '',
    weight: '',
    karat: '',
    description: '',
    coverImage: '',
    images: '',
    inStock: true,
  });
  
  const [products, setProducts] = useState([
    {
      name: 'Gold Bracelet',
      category: 'Bracelets',
      price: 200,
      discountedPrice: 180,
      weight: 15,
      karat: '18K',
      description: 'Elegant gold bracelet',
      coverImage: 'https://via.placeholder.com/150',
      images: 'https://via.placeholder.com/150',
      inStock: true,
    },
    {
      name: 'Diamond Earrings',
      category: 'Earrings',
      price: 500,
      discountedPrice: 450,
      weight: 5,
      karat: '14K',
      description: 'Shiny diamond earrings',
      coverImage: 'https://via.placeholder.com/150',
      images: 'https://via.placeholder.com/150',
      inStock: true,
    },
    {
      name: 'Silver Necklace',
      category: 'Necklaces',
      price: 150,
      discountedPrice: 120,
      weight: 30,
      karat: 'Sterling',
      description: 'Beautiful silver necklace',
      coverImage: 'https://via.placeholder.com/150',
      images: 'https://via.placeholder.com/150',
      inStock: false,
    }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts([...products, formData]);
    setFormData({
      name: '', category: '', price: '', discountedPrice: '', weight: '', karat: '', description: '', coverImage: '', images: '', inStock: true
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-yellow-700 mb-6">Add New Jewelry Product</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          
          <div>
            <label className="block font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Category</option>
              <option value="Bracelets">Bracelets</option>
              <option value="Earrings">Earrings</option>
              <option value="Necklaces">Necklaces</option>
              <option value="Shop Earrings">Shop Earrings</option>
              <option value="Wedding & Bridal">Wedding & Bridal</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Discounted Price ($)</label>
              <input
                type="number"
                name="discountedPrice"
                value={formData.discountedPrice}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Weight (g)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Karat</label>
              <select
                name="karat"
                value={formData.karat}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select Karat</option>
                <option value="14K">14K</option>
                <option value="18K">18K</option>
                <option value="22K">22K</option>
                <option value="24K">24K</option>
              </select>
            </div>
          </div>
          
          <button type="submit" className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold">Add Product</button>
        </form>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Discounted Price</th>
              <th className="border p-2">Weight</th>
              <th className="border p-2">Karat</th>
              <th className="border p-2">In Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border">
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.category}</td>
                <td className="border p-2">${product.price}</td>
                <td className="border p-2">${product.discountedPrice || 'N/A'}</td>
                <td className="border p-2">{product.weight}g</td>
                <td className="border p-2">{product.karat}</td>
                <td className="border p-2">{product.inStock ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddProductForm;
