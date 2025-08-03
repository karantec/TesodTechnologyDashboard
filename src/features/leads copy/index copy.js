import { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

function ServiceList() {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const servicesPerPage = 6;

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "https://backend.tesodtechnology.com/services/"
      );
      setServices(
        Array.isArray(response.data) ? response.data : [response.data]
      );
    } catch (err) {
      console.error("Failed to fetch services", err);
    }
  };

  const handleDelete = async (serviceId) => {
    try {
      await axios.delete(
        `https://backend.tesodtechnology.com/services/${serviceId}`
      );
      setServices(services.filter((service) => service._id !== serviceId));
    } catch (err) {
      console.error("Failed to delete service", err);
    }
  };

  const handleEdit = (service) => {
    setSelectedService(service);
  };

  const handleUpdate = async (values) => {
    try {
      await axios.put(
        `https://tesodtechnologyfinal.onrender.com/services/${selectedService._id}`,
        values
      );
      setSelectedService(null);
      fetchServices();
    } catch (err) {
      console.error("Failed to update service", err);
    }
  };

  const handleCreate = async (values) => {
    try {
      await axios.post(
        "https://backend.tesodtechnology.com/services/createService",
        values
      );
      setIsCreateModalOpen(false);
      fetchServices();
    } catch (err) {
      console.error("Failed to create service", err);
    }
  };

  const resetFormData = () => {
    setSelectedService(null);
  };

  const openCreateModal = () => {
    resetFormData();
    setIsCreateModalOpen(true);
  };

  const handleImageUpload = async (setFieldValue, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", "marketdata"); // Replace with your Cloudinary preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/de4ks8mkh/image/upload", // Replace with your Cloudinary cloud name
        imageData
      );
      setFieldValue("image", response.data.secure_url);
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService
  );

  // Validation schema for Formik
  const serviceSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.string().required("Image is required"),
  });

  // Form Modal component to be reused for both create and edit
  const ServiceFormModal = ({ title, onSubmit, isOpen, initialValues }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={serviceSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, values, errors, touched }) => (
              <Form>
                <Field
                  type="text"
                  name="title"
                  placeholder="Service Title"
                  className="w-full mt-2 p-2 border rounded"
                />
                {errors.title && touched.title && (
                  <div className="text-red-500 text-sm">{errors.title}</div>
                )}

                <Field
                  type="text"
                  name="category"
                  placeholder="Category"
                  className="w-full mt-2 p-2 border rounded"
                />
                {errors.category && touched.category && (
                  <div className="text-red-500 text-sm">{errors.category}</div>
                )}

                <Field
                  as="textarea"
                  name="description"
                  placeholder="Description"
                  className="w-full mt-2 p-2 border rounded"
                />
                {errors.description && touched.description && (
                  <div className="text-red-500 text-sm">
                    {errors.description}
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(setFieldValue, e)}
                  className="w-full p-2 border rounded mt-2"
                />
                {errors.image && touched.image && (
                  <div className="text-red-500 text-sm">{errors.image}</div>
                )}

                {/* Preview Current Image */}
                {values.image && (
                  <img
                    src={values.image}
                    alt="Service Preview"
                    className="w-full h-32 object-cover mt-2 rounded-md"
                  />
                )}

                <div className="mt-4 flex justify-between">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={resetFormData}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <TitleCard title="Service List">
        {/* Add Service Button */}
        <div className="mb-6">
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Add New Service
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentServices.map((service) => (
            <div
              key={service._id}
              className="border rounded-lg p-5 shadow-lg bg-white hover:shadow-xl transition-all"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-bold text-gray-800 mt-3">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Category:</strong> {service.category}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {service.description}
              </p>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(service)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">Page {currentPage}</span>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                indexOfLastService < services.length ? prev + 1 : prev
              )
            }
            disabled={indexOfLastService >= services.length}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </TitleCard>

      {/* Create Service Modal */}
      <ServiceFormModal
        title="Add New Service"
        onSubmit={handleCreate}
        isOpen={isCreateModalOpen}
        initialValues={{ title: "", category: "", description: "", image: "" }}
      />

      {/* Edit Service Modal */}
      <ServiceFormModal
        title="Edit Service"
        onSubmit={handleUpdate}
        isOpen={!!selectedService}
        initialValues={
          selectedService || {
            title: "",
            category: "",
            description: "",
            image: "",
          }
        }
      />
    </div>
  );
}

export default ServiceList;
