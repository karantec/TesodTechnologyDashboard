import { useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";
import axios from "axios";
import "react-quill/dist/quill.snow.css"; 

function AboutForm() {
   const [formData, setFormData] = useState({
      about: "",
      title: "",
      description1: "",
      buttonText: "",
      history: "",
      category: "",
      establishedYear: "",
      founder: "",
      featureImage: null,
      founderImage: null
   });

   const handleInputChange = (e) => {
    console.log("Event Target:", e.target); // Debugging
    console.log("Event Target Name:", e.target.name);
    console.log("Event Target Value:", e.target.value);
  
    if (!e.target.name) {
      console.error("Input field missing 'name' attribute!");
      return;
    }
  
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  

   const handleFileChange = (e) => {
      const { name, files } = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: files[0], 
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
         formDataToSend.append(key, value);
      });

      try {
         const response = await axios.post('http://localhost:8000/category/createCategory', formDataToSend, {
            headers: { 'Content-Type': 'multipart/form-data' }
         });
         console.log("Category created:", response.data);
         setFormData({
            about: "",
            title: "",
            description1: "",
            buttonText: "",
            history: "",
            category: "",
            establishedYear: "",
            founder: "",
            featureImage: null,
            founderImage: null
         });
      } catch (err) {
         console.error("Failed to post category", err);
      }
   };

   return (
      <div className="p-6 min-h-screen">
         <TitleCard title="Jewelry Categories">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <InputText labelTitle="About" name="about" value={formData.about} updateFormValue={handleInputChange} />
               <InputText labelTitle="Title" name="title" value={formData.title} updateFormValue={handleInputChange} />
               <InputText labelTitle="Button Text" name="buttonText" value={formData.buttonText} updateFormValue={handleInputChange} />
               <InputText labelTitle="Description" name="description1" value={formData.description1} updateFormValue={handleInputChange} />
               <input type="file" name="featureImage" onChange={handleFileChange} accept="image/*" className="input-file" />
               <InputText labelTitle="History" name="history" value={formData.history} updateFormValue={handleInputChange} />
               <InputText labelTitle="Category" name="category" value={formData.category} updateFormValue={handleInputChange} />
               <InputText labelTitle="Established Year" name="establishedYear" value={formData.establishedYear} updateFormValue={handleInputChange} />
               <input type="file" name="founderImage" onChange={handleFileChange} accept="image/*" className="input-file" />
               <div className="flex justify-end col-span-2">
                  <button type="submit" className="btn btn-sm btn-primary mt-4">
                     Submit
                  </button>
               </div>
            </form>
         </TitleCard>
      </div>
   );
}

export default AboutForm;
