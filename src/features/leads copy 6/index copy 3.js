import { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";

function Blog() {
  const [blogData, setBlogData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    author: "",
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchBlogData();
  }, []);

  const fetchBlogData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://tesodtechnologyfinal.onrender.com/blog/get"
      );
      setBlogData(
        Array.isArray(response.data) ? response.data : [response.data]
      );
    } catch (err) {
      console.error("Failed to fetch blog data", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://tesodtechnologyfinal.onrender.com/blog/${id}`
      );
      setBlogData(blogData.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Failed to delete blog", err);
    }
  };

  const handleCreate = async () => {
    try {
      setIsSubmitting(true);
      await axios.post(
        "https://tesodtechnologyfinal.onrender.com/blog/create",
        formData
      );
      setIsCreateModalOpen(false);
      resetFormData();
      fetchBlogData();
    } catch (err) {
      console.error("Failed to create blog", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormData = () => {
    setFormData({
      title: "",
      image: "",
      description: "",
      author: "",
    });
  };

  const openCreateModal = () => {
    resetFormData();
    setIsCreateModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const cloudData = new FormData();
    cloudData.append("file", file);
    cloudData.append("upload_preset", "marketdata"); // Replace this

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/de4ks8mkh/image/upload", // Replace this
        cloudData
      );
      setFormData((prev) => ({ ...prev, image: res.data.secure_url }));
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <TitleCard title="Blog Manager">
        <div className="mb-6">
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            disabled={isLoading}
          >
            Add New Blog
          </button>
        </div>

        {isLoading && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading blogs...</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogData.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 shadow-lg bg-white hover:shadow-xl transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="mt-2 text-lg font-bold">{item.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              <p className="mt-2 text-xs text-gray-500 italic">
                By {item.author}
              </p>

              <div className="mt-4 flex justify-end">
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

        {blogData.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            No blogs found. Add some to get started.
          </div>
        )}
      </TitleCard>

      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800">Add New Blog</h3>

            <div className="mt-4 space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
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
              />
              <input
                type="text"
                placeholder="Author"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center justify-center"
                disabled={
                  !formData.title ||
                  !formData.image ||
                  !formData.description ||
                  !formData.author ||
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
    </div>
  );
}

export default Blog;
