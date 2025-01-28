import { useState, useEffect } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import { fetchPrivacyPolicy } from "../../../app/api";

function PrivacyPolicy() {
    const [privacyData, setPrivacyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch privacy policy data from API
        const fetchPrivacyPolicys = async () => {
            try {
                const response = await fetchPrivacyPolicy(); // Use the imported API function
                setPrivacyData(response); // Assuming response contains the privacy policy text
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load privacy policy"); // Handle errors gracefully
                setLoading(false);
            }
        };

        fetchPrivacyPolicys();
    }, []);

    return (
        <>
            <TitleCard title="Privacy Policy" topMargin="mt-2">
                <div className="px-6 py-4">
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {privacyData && (
                        <>
                            <h2 className="text-xl font-bold mb-4">{privacyData.title || "Our Commitment to Privacy"}</h2>
                            <p className="mb-4">{privacyData.description || "Your privacy is important to us."}</p>

                            {privacyData.sections?.map((section, index) => (
                                <div key={index}>
                                    <h3 className="text-lg font-semibold mt-6 mb-2">{section.heading}</h3>
                                    {section.content ? (
                                        <p className="mb-4">{section.content}</p>
                                    ) : (
                                        <ul className="list-disc ml-6 mb-4">
                                            {section.listItems?.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}

                            <h3 className="text-lg font-semibold mt-6 mb-2">Contact Us</h3>
                            <p>
                                {privacyData.contact?.email && (
                                    <>
                                        Email:{" "}
                                        <a href={`mailto:${privacyData.contact.email}`} className="text-blue-500">
                                            {privacyData.contact.email}
                                        </a>
                                        <br />
                                    </>
                                )}
                                {privacyData.contact?.phone && <>Phone: {privacyData.contact.phone}</>}
                            </p>
                        </>
                    )}
                </div>
            </TitleCard>
        </>
    );
}

export default PrivacyPolicy;
