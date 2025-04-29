import { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";

function CallbackForm() {
  const [callbackData, setCallbackData] = useState([]);

  useEffect(() => {
    fetchCallbackData();
  }, []);

  const fetchCallbackData = async () => {
    try {
      const response = await axios.get(
        "https://tesodtechnologyfinal.onrender.com/callback/callback-requests"
      );
      setCallbackData(
        Array.isArray(response.data) ? response.data : [response.data]
      );
    } catch (err) {
      console.error("Failed to fetch callback requests", err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <TitleCard title="Callback Requests">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {callbackData.map((request) => (
            <div
              key={request._id}
              className="border rounded-lg p-5 shadow-lg bg-white hover:shadow-xl transition-all"
            >
              <h3 className="text-lg font-bold text-gray-800">
                {request.fullName}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Email:</strong> {request.email}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Phone:</strong> {request.phoneNumber}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Preferred Date:</strong> {request.preferredDate}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Preferred Time:</strong> {request.preferredTime}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Message:</strong> {request.message || "No message"}
              </p>
            </div>
          ))}
        </div>
      </TitleCard>
    </div>
  );
}

export default CallbackForm;
