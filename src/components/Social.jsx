import react, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"

const CheckParticipant = () => {

    const [participant, setParticipant] = useState("");
    const [data, setData] = useState({});
    const [found, setFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("Enter the Participant CNIC to search");

    const handleChange = (e) => {
        //should only be number
        const regex = /^\d*$/;
        if (regex.test(e.target.value)) {
            setParticipant(e.target.value)
        }
    }

    const fetchParticipant = async () => {
        setLoading(true);
        const response = await fetch(`https://api.acmdevday.com/verifyParticipant`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                cnic: participant
            }),
        });

        const data = await response.json();

        if (data.success){
            setData(data.data)
            setFound(true)
        }
        else {
            alert("Not found");
            setFound(false)
            setData({})
        }
        setLoading(false);
    }


    return (
        <div>
            <div className="flex flex-col gap-4 items-center justify-center">
                <div className="text-white text-2xl font-bold">
                    Check Participant
                </div>
                <div className="flex flex-row gap-4">
                    <input type="text" placeholder="Enter Participant ID" className="border p-2 rounded-lg bg-gray-800 text-white" value={participant} onChange={handleChange}/>
                    <button className="bg-[#297987] text-white p-2 rounded-lg hover:bg-[#13a3bd]" onClick={fetchParticipant}>
                        Check
                    </button>
                </div>
            </div>

            <div>
                {
                    loading?
                    <div className="text-white text-2xl font-bold text-center py-12 bg-gray-800 my-5">Loading...</div> : found ? <Participant data={data} /> : <div className="text-white text-2xl font-bold text-center py-12 bg-gray-800 my-5">{text}</div>
                }
            </div>
        </div>
    )
}

const Participant = ({data}) => {

    return (
        <div className="flex flex-col gap-4 items-center justify-center mx-6 rounded-3xl p-5 m-4 bg-gray-800">
            <div className="text-white text-2xl font-bold">
                Participant Details
            </div>
            <div>

            <div className="text-gray-300 text-md font-bold">
                Name: 
                <div className="text-lg inline ml-5 text-white">{data.name}</div>
            </div>
            <div className="text-white text-md font-bold">
                CNIC:
                <div className="text-lg inline ml-5 text-white">{data.cnic}</div>
            </div>
            <div className="text-white text-md font-bold">
                Email: 
                <div className="text-lg inline ml-5 text-white">{data.email}</div>
            </div>
            <div className="text-white text-md font-bold">
                WhatsApp Number:
                <div className="text-lg inline ml-5 text-white">{data.whatsapp_number}</div>
            </div>
            <div className="text-white text-md font-bold">
                Team Name: 
                <div className="text-lg inline ml-5 text-white">{data.Team_Name}</div>
            </div>
            <div className="text-white text-md font-bold">
                Competition: 
                <div className="text-lg inline ml-5 text-white">{data.competition}</div>
            </div>
            <div className="text-white text-md font-bold">
                Consumer Number:
                <div className="text-lg inline ml-5 text-white">{data.consumerNumber}</div>
            </div>
            <div className="text-white text-md font-bold">
                Email sent status
                <div className="text-lg inline ml-5 text-white">{data.Paid}</div>
            </div>    
            </div>
        </div>
    )
}

const Social = ({isLoggedIn}) => {

    const navigate = useNavigate();

    const [cnic, setCnic] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [universityName, setUniversityName] = useState("");
    const [ticketID, setTicketID] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
    }, [])

    const handleChange = (e) => {
        if (e.target.name === "cnic") {
            setCnic(e.target.value)
        }
        if (e.target.name === "name") {
            setName(e.target.value)
        }
        if (e.target.name === "email") {
            setEmail(e.target.value)
        }
        if (e.target.name === "whatsapp") {
            setWhatsapp(e.target.value)
        }
        if (e.target.name === "universityName") {
            setUniversityName(e.target.value)
        }
        if(e.target.name=="ticketID"){
            setTicketID(e.target.value);
        }
    }

    const handleSubmit = async () => {
        setLoading(true);
        if (cnic === "" || name === "" || email === "" || whatsapp === "" || universityName === "" || ticketID === "") {
            alert("Please fill all the fields")
            setLoading(false)
            return
        }

        try {

            const data = await fetch("https://api.acmdevday.com/addSocialEventParticipant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    cnic: cnic,
                    name: name,
                    email: email,
                    whatsapp_number: whatsapp,
                    college: universityName,
                    ticketID: ticketID,
                })
            })
    
            const res = await data.json()
        
            if (res.success) {
                alert(res.message)
                setCnic("")
                setName("")
                setEmail("")
                setWhatsapp("")
                setUniversityName("")
                setTicketID("")
            }
            else {
                alert(res.message)
            }
        } catch {
            alert("Error in Submitting Form, try again later")
        }
        setLoading(false)
    }


    return (
        <div className="bg-[#031e2c] min-h-screen">
            <div className="pt-56">
                <CheckParticipant/>
                <>
                    {// Details of the participant
                    // form for Registration
                    // inpuit forms for CNIC NAME EMAIL WHATSAPP and University
                    }
                    <div>
                        <div>
                            <div className="text-white text-2xl font-bold text-center mb-4">
                                Registration Form
                            </div>
                            <div className="flex flex-col gap-4 max-w-[650px] mx-auto px-5">
                                <input type="text" placeholder="CNIC" className="border p-2 rounded-lg bg-gray-800 text-white" name="cnic" value={cnic} onChange={handleChange}/>
                                <input type="text" placeholder="Name" className="border p-2 rounded-lg bg-gray-800 text-white" name="name" value={name} onChange={handleChange}/>
                                <input type="email" placeholder="Email" className="border p-2 rounded-lg bg-gray-800 text-white" name="email" value={email} onChange={handleChange} />
                                <input type="text" placeholder="WhatsApp Number" className="border p-2 rounded-lg bg-gray-800 text-white" name="whatsapp" value={whatsapp} onChange={handleChange}/>
                                <input type="text" placeholder="University" className="border p-2 rounded-lg bg-gray-800 text-white" name="universityName" value={universityName} onChange={handleChange} />
                                <input type="text" placeholder="Ticket ID" className="border p-2 rounded-lg bg-gray-800 text-white" name="ticketID" value={ticketID} onChange={handleChange} />
                                <button className="bg-[#297987] text-white p-2 rounded-lg hover:bg-[#13a3bd] my-5 border mb-24" onClick={handleSubmit}>
                                    {loading ? "Submitting...." : "Submit"}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </div>
    )
}

export default Social
