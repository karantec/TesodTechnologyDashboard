import { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";

function TestimonialList() {
   const [testimonials, setTestimonials] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const testimonialsPerPage = 6;
   const [selectedTestimonial, setSelectedTestimonial] = useState(null);
   const [editingTestimonial, setEditingTestimonial] = useState(null);
   const [formData, setFormData] = useState({ name: "", position: "", organization: "", message: "", photo: "" });

   useEffect(() => {
      fetchTestimonials();
   }, []);

   const fetchTestimonials = async () => {
      try {
         const response = await axios.get("https://framedigitalbackend.onrender.com/testimonial/Testimonial");
         setTestimonials(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (err) {
         console.error("Failed to fetch testimonials", err);
      }
   };

   const handleDelete = async (id) => {
      try {
         await axios.delete(`https://framedigitalbackend.onrender.com/testimonial/Testimonial/${id}`);
         setTestimonials(testimonials.filter((testimonial) => testimonial._id !== id));
      } catch (err) {
         console.error("Failed to delete testimonial", err);
      }
   };

   const handleEdit = (testimonial) => {
      setEditingTestimonial(testimonial);
      setFormData({
         name: testimonial.name,
         position: testimonial.position,
         organization: testimonial.organization,
         message: testimonial.message,
         photo: testimonial.photo
      });
   };

   const handleUpdate = async () => {
      try {
         await axios.put(`https://framedigitalbackend.onrender.com/testimonial/Testimonial/${editingTestimonial._id}`, formData);
         setEditingTestimonial(null);
         fetchTestimonials();
      } catch (err) {
         console.error("Failed to update testimonial", err);
      }
   };

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const indexOfLastTestimonial = currentPage * testimonialsPerPage;
   const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
   const currentTestimonials = testimonials.slice(indexOfFirstTestimonial, indexOfLastTestimonial);

   return (
      <div className="p-6 min-h-screen bg-gray-100">
         <TitleCard title="Testimonials List">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {currentTestimonials.map((testimonial) => (
                  <div 
                     key={testimonial._id} 
                     className="border rounded-lg p-5 shadow-lg bg-white cursor-pointer hover:shadow-xl transition-all"
                     onClick={() => setSelectedTestimonial(testimonial)}
                  >
                     <img 
                        src={testimonial.photo} 
                        alt={testimonial.name} 
                        className="w-full h-40 object-cover rounded-md" 
                     />
                     <h3 className="text-lg font-bold text-gray-800 mt-3">{testimonial.name}</h3>
                     <p className="text-sm text-gray-600">{testimonial.position}</p>
                     <p className="text-sm text-gray-600">{testimonial.organization}</p>
                     <p className="text-sm text-gray-600 mt-2">{testimonial.message.substring(0, 100)}...</p>
                     
                     <div className="mt-4 flex justify-between">
                        <button 
                           onClick={(e) => { e.stopPropagation(); handleEdit(testimonial); }}
                           className="px-3 py-1 bg-green-500 text-white rounded-md text-sm"
                        >
                           Edit
                        </button>
                        <button 
                           onClick={(e) => { e.stopPropagation(); handleDelete(testimonial._id); }}
                           className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
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
                  onClick={() => setCurrentPage((prev) => (indexOfLastTestimonial < testimonials.length ? prev + 1 : prev))} 
                  disabled={indexOfLastTestimonial >= testimonials.length} 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
               >
                  Next
               </button>
            </div>
         </TitleCard>

         {selectedTestimonial && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
               <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
                  <h3 className="text-lg font-bold text-gray-800">{selectedTestimonial.name}</h3>
                  <img 
                     src={selectedTestimonial.photo} 
                     alt={selectedTestimonial.name} 
                     className="w-full h-40 object-cover rounded-md my-3" 
                  />
                  <p className="text-sm text-gray-600">{selectedTestimonial.message}</p>
                  <p className="text-sm font-medium text-gray-700 mt-2">
                     {selectedTestimonial.position}, {selectedTestimonial.organization}
                  </p>
                  <button 
                     onClick={() => setSelectedTestimonial(null)} 
                     className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                     Close
                  </button>
               </div>
            </div>
         )}

         {editingTestimonial && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
               <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
                  <h3 className="text-lg font-bold text-gray-800">Edit Testimonial</h3>
                  <input 
                     type="text" 
                     name="name" 
                     value={formData.name} 
                     onChange={handleChange} 
                     placeholder="Name"
                     className="w-full p-2 border rounded mt-2"
                  />
                  <input 
                     type="text" 
                     name="position" 
                     value={formData.position} 
                     onChange={handleChange} 
                     placeholder="Position"
                     className="w-full p-2 border rounded mt-2"
                  />
                  <input 
                     type="text" 
                     name="organization" 
                     value={formData.organization} 
                     onChange={handleChange} 
                     placeholder="Organization"
                     className="w-full p-2 border rounded mt-2"
                  />
                  <textarea 
                     name="message" 
                     value={formData.message} 
                     onChange={handleChange} 
                     placeholder="Message"
                     className="w-full p-2 border rounded mt-2"
                  ></textarea>
                  <input 
                     type="text" 
                     name="photo" 
                     value={formData.photo} 
                     onChange={handleChange} 
                     placeholder="Photo URL"
                     className="w-full p-2 border rounded mt-2"
                  />
                  <button 
                     onClick={handleUpdate} 
                     className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-md"
                  >
                     Update
                  </button>
                  <button 
                     onClick={() => setEditingTestimonial(null)} 
                     className="mt-2 w-full px-4 py-2 bg-gray-400 text-white rounded-md"
                  >
                     Cancel
                  </button>
               </div>
            </div>
         )}
      </div>
   );
}

export default TestimonialList;
