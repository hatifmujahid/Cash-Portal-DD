import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SocialList = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }

        const fetchData = async () => {
            try {
                const response = await fetch("https://api.acmdevday.com/getSocials", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                const socialData = await response.json();
                setData(socialData);
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData();
    }, [isLoggedIn, navigate]);

    return (
        <div className="bg-[#031e2c] min-h-screen flex justify-center items-center">
            <div className="pt-24 w-full px-4 overflow-x-auto">
                <table className="table-auto w-full mx-auto text-white">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="px-4 py-2">CNIC</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Whatsapp Number</th>
                            <th className="px-4 py-2">College</th>
                            <th className="px-4 py-2">Is Participant</th>
                            <th className="px-4 py-2">Fees Amount</th>
                            <th className="px-4 py-2">Email sent status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item._id}>
                                <td className="border border-gray-500 px-4 py-2">{item.cnic}</td>
                                <td className="border border-gray-500 px-4 py-2">{item.name}</td>
                                <td className="border border-gray-500 px-4 py-2">{item.email}</td>
                                <td className="border border-gray-500 px-4 py-2">{item.whatsapp_number}</td>
                                <td className="border border-gray-500 px-4 py-2">{item.college}</td>
                                <td className="border border-gray-500 px-4 py-2">{item.isParticipant ? "Yes" : "No"}</td>
                                <td className="border border-gray-500 px-4 py-2">{item.fees_amount}</td>
                                <td className="border border-gray-500 px-4 py-2">{item.Paid}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SocialList;
