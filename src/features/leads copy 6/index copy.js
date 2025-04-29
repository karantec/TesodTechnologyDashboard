import { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";

function Gallery() {
  const [galleryData, setGalleryData] = useState([]);
  const [formData, setFormData] = useState({
    image: "",
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const fetchGalleryData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8000/gallery");
      setGalleryData(
        Array.isArray(response.data) ? response.data : [response.data]
      );
    } catch (err) {
      console.error("Failed to fetch gallery data", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8000/gallery/${itemId}`);
      setGalleryData(galleryData.filter((item) => item._id !== itemId));
    } catch (err) {
      console.error("Failed to delete gallery item", err);
    }
  };

  const handleCreate = async () => {
    try {
      setIsLoading(true);
      await axios.post("http://localhost:8000/gallery", formData);
      setIsCreateModalOpen(false);
      resetFormData();
      fetchGalleryData();
    } catch (err) {
      console.error("Failed to create gallery item", err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetFormData = () => {
    setFormData({ image: "" });
  };

  const openCreateModal = () => {
    resetFormData();
    setIsCreateModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", "marketdata");

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/de4ks8mkh/image/upload",
        imageData
      );
      setFormData({ image: response.data.secure_url });
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <TitleCard title="Gallery">
        <div className="mb-6">
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            disabled={isLoading}
          >
            Add New Image
          </button>
        </div>

        {isLoading && <div className="text-center py-4">Loading...</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryData.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 shadow-lg bg-white hover:shadow-xl transition-all"
            >
              <div className="relative pb-[100%]">
                <img
                  src={item.image}
                  alt="Gallery image"
                  className="absolute inset-0 w-full h-full object-cover rounded-md"
                />
              </div>

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

        {galleryData.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            No gallery images found. Add some images to get started.
          </div>
        )}
      </TitleCard>

      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800">Add New Image</h3>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded"
              />
            </div>

            {formData.image && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preview
                </label>
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            )}

            <div className="mt-6 flex justify-between">
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
                disabled={!formData.image || isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                disabled={isLoading}
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

export default Gallery;
