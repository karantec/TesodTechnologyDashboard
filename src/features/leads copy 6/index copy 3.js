import { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: "",
    description: "",
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://tesodtechnologyfinal.onrender.com/product"
      );
      setProducts(
        Array.isArray(response.data) ? response.data : [response.data]
      );
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://tesodtechnologyfinal.onrender.com/product/${id}`
      );
      setProducts(products.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  const handleCreate = async () => {
    try {
      setIsSubmitting(true);
      await axios.post(
        "https://tesodtechnologyfinal.onrender.com/product/create",
        formData
      );
      setIsCreateModalOpen(false);
      resetFormData();
      fetchProducts();
    } catch (err) {
      console.error("Failed to create product", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setIsSubmitting(true);
      await axios.put(
        `https://tesodtechnologyfinal.onrender.com/product/${currentProductId}`,
        formData
      );
      setIsUpdateModalOpen(false);
      resetFormData();
      fetchProducts();
    } catch (err) {
      console.error("Failed to update product", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormData = () => {
    setFormData({
      name: "",
      category: "",
      image: "",
      description: "",
    });
  };

  const openCreateModal = () => {
    resetFormData();
    setIsCreateModalOpen(true);
  };

  const openUpdateModal = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      image: product.image,
      description: product.description,
    });
    setCurrentProductId(product._id);
    setIsUpdateModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const cloudData = new FormData();
    cloudData.append("file", file);
    cloudData.append("upload_preset", "marketdata"); // Replace with your upload preset

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/de4ks8mkh/image/upload", // Replace with your cloud name
        cloudData
      );
      setFormData((prev) => ({ ...prev, image: res.data.secure_url }));
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <TitleCard title="Product Manager">
        <div className="mb-6">
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            disabled={isLoading}
          >
            Add New Product
          </button>
        </div>

        {isLoading && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 shadow-lg bg-white hover:shadow-xl transition-all"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="mt-2 text-lg font-bold">{item.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{item.category}</p>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>

              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => openUpdateModal(item)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm"
                  disabled={isLoading}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
                  disabled={isLoading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            No products found. Add some to get started.
          </div>
        )}
      </TitleCard>

      {/* Create Product Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800">Add New Product</h3>

            <div className="mt-4 space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-2 border rounded"
                rows="4"
              />
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center justify-center"
                disabled={
                  !formData.name ||
                  !formData.category ||
                  !formData.image ||
                  !formData.description ||
                  isSubmitting
                }
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  "Save"
                )}
              </button>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Product Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800">Update Product</h3>

            <div className="mt-4 space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-2 border rounded"
                rows="4"
              />
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md flex items-center justify-center"
                disabled={
                  !formData.name ||
                  !formData.category ||
                  !formData.image ||
                  !formData.description ||
                  isSubmitting
                }
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Updating...
                  </div>
                ) : (
                  "Update"
                )}
              </button>
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductManager;
