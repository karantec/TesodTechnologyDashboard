import React, { useState } from 'react';

const ViewProductsPage = () => {
  const [products, setProducts] = useState([
    {
      name: 'Gold Bracelet',
      category: 'Bracelets',
      price: 200,
      discountedPrice: 180,
      weight: 15,
      karat: '18K',
      description: 'Elegant gold bracelet',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS_zxA2OU1ajeeTlN2oi0K5jbQiISIw3L-dA&s',
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
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS_zxA2OU1ajeeTlN2oi0K5jbQiISIw3L-dA&s',
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
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS_zxA2OU1ajeeTlN2oi0K5jbQiISIw3L-dA&s',
      images: 'https://via.placeholder.com/150',
      inStock: false,
    },
    {
      name: 'Platinum Ring',
      category: 'Rings',
      price: 800,
      discountedPrice: 750,
      weight: 20,
      karat: '24K',
      description: 'Sleek platinum ring',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS_zxA2OU1ajeeTlN2oi0K5jbQiISIw3L-dA&s',
      images: 'https://via.placeholder.com/150',
      inStock: true,
    },
    {
      name: 'Emerald Pendant',
      category: 'Necklaces',
      price: 300,
      discountedPrice: 280,
      weight: 10,
      karat: '18K',
      description: 'Stunning emerald pendant',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS_zxA2OU1ajeeTlN2oi0K5jbQiISIw3L-dA&s',
      images: 'https://via.placeholder.com/150',
      inStock: true,
    },
    {
      name: 'Ruby Stud Earrings',
      category: 'Earrings',
      price: 250,
      discountedPrice: 230,
      weight: 5,
      karat: '14K',
      description: 'Elegant ruby stud earrings',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS_zxA2OU1ajeeTlN2oi0K5jbQiISIw3L-dA&s',
      images: 'https://via.placeholder.com/150',
      inStock: true,
    },
    {
      name: 'Sapphire Necklace',
      category: 'Necklaces',
      price: 450,
      discountedPrice: 420,
      weight: 15,
      karat: '18K',
      description: 'Beautiful sapphire necklace',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS_zxA2OU1ajeeTlN2oi0K5jbQiISIw3L-dA&s',
      images: 'https://via.placeholder.com/150',
      inStock: true,
    },
    {
      name: 'White Gold Bracelet',
      category: 'Bracelets',
      price: 350,
      discountedPrice: 320,
      weight: 12,
      karat: '14K',
      description: 'Stylish white gold bracelet',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS_zxA2OU1ajeeTlN2oi0K5jbQiISIw3L-dA&s',
      images: 'https://via.placeholder.com/150',
      inStock: false,
    },
    {
      name: 'Diamond Wedding Ring',
      category: 'Rings',
      price: 1000,
      discountedPrice: 950,
      weight: 10,
      karat: '18K',
      description: 'Exquisite diamond wedding ring',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS_zxA2OU1ajeeTlN2oi0K5jbQiISIw3L-dA&s',
      images: 'https://via.placeholder.com/150',
      inStock: true,
    },
    {
      name: 'Opal Earrings',
      category: 'Earrings',
      price: 200,
      discountedPrice: 180,
      weight: 6,
      karat: 'Sterling',
      description: 'Lovely opal earrings',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS_zxA2OU1ajeeTlN2oi0K5jbQiISIw3L-dA&s',
      images: 'https://via.placeholder.com/150',
      inStock: true,
    },
  ]);

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleEdit = (index) => {
    const productToEdit = products[index];
    setFormData({ ...productToEdit, index }); // Prepopulate form with data
    setIsEditing(true);
  };

  const [isEditing, setIsEditing] = useState(false);
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
    index: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing && formData.index !== null) {
      const updatedProducts = products.map((product, index) =>
        index === formData.index ? formData : product
      );
      setProducts(updatedProducts);
    } else {
      setProducts([...products, formData]);
    }
    setFormData({
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
      index: null,
    });
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-yellow-700 mb-6">
        Jewelry Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <img
              src={product.coverImage || 'https://via.placeholder.com/150'}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{product.category}</p>
            <p className="text-sm text-gray-500">{product.description}</p>
            <p className="mt-4">
              <span className="font-semibold">Price:</span> ${product.price}
            </p>
            {product.discountedPrice && (
              <p className="text-sm text-gray-500 line-through">
                ${product.discountedPrice}
              </p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              {product.weight}g | {product.karat}
            </p>
            <p className="text-sm mt-2">
              <span className="font-semibold">In Stock:</span> {product.inStock ? 'Yes' : 'No'}
            </p>

            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => handleEdit(index)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProductsPage;
