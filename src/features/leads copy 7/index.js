import { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";

function ServiceList() {
   const [products, setProducts] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [selectedProduct, setSelectedProduct] = useState(null);
   const [updatedProduct, setUpdatedProduct] = useState({ name: "", category: "", description: "", image: "" });

   const productsPerPage = 6;

   useEffect(() => {
      fetchProducts();
   }, []);

   const fetchProducts = async () => {
      try {
         const response = await axios.get("https://framedigitalbackend.onrender.com/product/Product");
         setProducts(response.data);
      } catch (err) {
         console.error("Failed to fetch products", err);
      }
   };

   const handleDelete = async (productId) => {
      try {
         await axios.delete(`https://framedigitalbackend.onrender.com/product/Product/${productId}`);
         setProducts(products.filter((product) => product._id !== productId));
      } catch (err) {
         console.error("Failed to delete product", err);
      }
   };

   const handleEdit = (product) => {
      setSelectedProduct(product);
      setUpdatedProduct({ ...product });
   };

   const handleUpdate = async () => {
      try {
         await axios.put(`https://framedigitalbackend.onrender.com/product/Product/${selectedProduct._id}`, updatedProduct);
         fetchProducts();
         setSelectedProduct(null);
      } catch (err) {
         console.error("Failed to update product", err);
      }
   };

   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

   return (
      <div className="p-6 min-h-screen bg-gray-100">
         <TitleCard title="Product List">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {currentProducts.map((product) => (
                  <div 
                     key={product._id} 
                     className="border rounded-lg p-5 shadow-lg bg-white hover:shadow-xl transition-all"
                  >
                     <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-40 object-cover rounded-md"
                     />
                     <h3 className="text-lg font-bold text-gray-800 mt-3">{product.name}</h3>
                     <p className="text-sm text-gray-600"><strong>Category:</strong> {product.category}</p>
                     <p className="text-sm text-gray-600 mt-2">{product.description}</p>

                     <div className="mt-4 flex justify-between">
                        <button 
                           onClick={() => handleEdit(product)}
                           className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                           Edit
                        </button>
                        <button 
                           onClick={() => handleDelete(product._id)}
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
                  onClick={() => setCurrentPage((prev) => (indexOfLastProduct < products.length ? prev + 1 : prev))} 
                  disabled={indexOfLastProduct >= products.length} 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
               >
                  Next
               </button>
            </div>
         </TitleCard>

         {/* Edit Modal */}
         {selectedProduct && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
               <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
                  <h3 className="text-lg font-bold text-gray-800">Edit Product</h3>
                  <input 
                     type="text" 
                     value={updatedProduct.name} 
                     onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })} 
                     className="w-full mt-2 p-2 border rounded"
                     placeholder="Product Name"
                  />
                  <input 
                     type="text" 
                     value={updatedProduct.category} 
                     onChange={(e) => setUpdatedProduct({ ...updatedProduct, category: e.target.value })} 
                     className="w-full mt-2 p-2 border rounded"
                     placeholder="Category"
                  />
                  <textarea 
                     value={updatedProduct.description} 
                     onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })} 
                     className="w-full mt-2 p-2 border rounded"
                     placeholder="Description"
                  ></textarea>
                  <input 
                     type="text" 
                     value={updatedProduct.image} 
                     onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })} 
                     className="w-full mt-2 p-2 border rounded"
                     placeholder="Image URL"
                  />

                  <div className="mt-4 flex justify-between">
                     <button 
                        onClick={handleUpdate} 
                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                     >
                        Save
                     </button>
                     <button 
                        onClick={() => setSelectedProduct(null)} 
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
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

export default ServiceList;
