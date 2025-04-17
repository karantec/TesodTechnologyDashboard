import { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
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
         const response = await axios.get("http://localhost:8000/product");
         setServices(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (err) {
         console.error("Failed to fetch services", err);
      }
   };

   const handleDelete = async (serviceId) => {
      try {
         await axios.delete(`http://localhost:8000/product/${serviceId}`);
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
         const updateData = new FormData();
         updateData.append("name", values.name);
         updateData.append("category", values.category);
         updateData.append("description", values.description);
         updateData.append("image", values.image);

         await axios.put(`http://localhost:8000/product/${selectedService._id}`, updateData, {
            headers: { "Content-Type": "multipart/form-data" },
         });

         setSelectedService(null);
         fetchServices();
      } catch (err) {
         console.error("Failed to update service", err);
      }
   };

   const handleCreate = async (values) => {
      try {
         const createData = new FormData();
         createData.append("name", values.name);
         createData.append("category", values.category);
         createData.append("description", values.description);
         createData.append("image", values.image);

         await axios.post("http://localhost:8000/product/create", createData, {
            headers: { "Content-Type": "multipart/form-data" },
         });

         setIsCreateModalOpen(false);
         fetchServices();
      } catch (err) {
         console.error("Failed to create service", err);
      }
   };

   const openCreateModal = () => {
      setIsCreateModalOpen(true);
   };

   const validationSchema = Yup.object({
      name: Yup.string().required("Service name is required"),
      category: Yup.string().required("Category is required"),
      description: Yup.string().required("Description is required"),
      image: Yup.mixed().required("Image is required"),
   });

   const indexOfLastService = currentPage * servicesPerPage;
   const indexOfFirstService = indexOfLastService - servicesPerPage;
   const currentServices = services.slice(indexOfFirstService, indexOfLastService);

   const ServiceFormModal = ({ title, onSubmit, isOpen, initialValues }) => {
      if (!isOpen) return null;

      return (
         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
               <h3 className="text-lg font-bold text-gray-800">{title}</h3>
               <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
               >
                  {({ setFieldValue }) => (
                     <Form>
                        <div className="mb-4">
                           <Field
                              type="text"
                              name="name"
                              className="w-full p-2 border rounded"
                              placeholder="Service Name"
                           />
                           <ErrorMessage
                              name="name"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                           />
                        </div>
                        <div className="mb-4">
                           <Field
                              type="text"
                              name="category"
                              className="w-full p-2 border rounded"
                              placeholder="Category"
                           />
                           <ErrorMessage
                              name="category"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                           />
                        </div>
                        <div className="mb-4">
                           <Field
                              as="textarea"
                              name="description"
                              className="w-full p-2 border rounded"
                              placeholder="Description"
                           />
                           <ErrorMessage
                              name="description"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                           />
                        </div>
                        <div className="mb-4">
                           <input
                              type="file"
                              name="image"
                              accept="image/*"
                              onChange={(e) => {
                                 const file = e.target.files[0];
                                 if (file) {
                                    setFieldValue("image", file);
                                 }
                              }}
                              className="w-full p-2 border rounded"
                           />
                           {initialValues.image && (
                              <img
                                 src={URL.createObjectURL(initialValues.image)}
                                 alt="Preview"
                                 className="w-full h-32 object-cover mt-2 rounded-md"
                              />
                           )}
                           <ErrorMessage
                              name="image"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                           />
                        </div>
                        <div className="mt-4 flex justify-between">
                           <button
                              type="submit"
                              className="px-4 py-2 bg-green-500 text-white rounded-md"
                           >
                              Save
                           </button>
                           <button
                              type="button"
                              onClick={() => setIsCreateModalOpen(false)}
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
         <TitleCard title="Product List">
            <div className="mb-6">
               <button
                  onClick={openCreateModal}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
               >
                  Add New Product
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
                     <h3 className="text-lg font-bold text-gray-800 mt-3">{service.name}</h3>
                     <p className="text-sm text-gray-600">
                        <strong>Category:</strong> {service.category}
                     </p>
                     <p className="text-sm text-gray-600 mt-2">{service.description}</p>
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
                     setCurrentPage((prev) => (indexOfLastService < services.length ? prev + 1 : prev))
                  }
                  disabled={indexOfLastService >= services.length}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
               >
                  Next
               </button>
            </div>
         </TitleCard>

         <ServiceFormModal
            title="Add New Product"
            onSubmit={handleCreate}
            isOpen={isCreateModalOpen}
            initialValues={{
               name: "",
               category: "",
               description: "",
               image: null,
            }}
         />
         <ServiceFormModal
            title="Edit Product"
            onSubmit={handleUpdate}
            isOpen={!!selectedService}
            initialValues={{
               name: selectedService?.name || "",
               category: selectedService?.category || "",
               description: selectedService?.description || "",
               image: selectedService?.image || null,
            }}
         />
      </div>
   );
}

export default ServiceList;
