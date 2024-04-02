import react, {useState} from "react"
import "./index.css"
import Register from "./components/Register"


const Login = ({setLogin, setJwt}) => {
    const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // You can implement your login logic here
    if (userID === '' || password === '') {
      alert('Please enter UserID and Password');
      return;
    }

    try {
      const response = await fetch('https://api.acmdevday.com/cashLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userID,
          password: password
        }),
      });

      console.log(response)
      if (response.success) {
        response.json().then((data) => {
          setJwt(data.jwt);
          setLogin(true);
        });
        console.log(response)
      } else {
        alert('Invalid UserID or Password');
        setUserID('');
        setPassword('');
        console.log(response)
      }
      }
    catch (error) {
      console.log(error)
      console.log("Hello")
      alert("error")
    }
  }

  return (
     <div className=" bg-[#031e2c] min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200 mb-16">Cash Portal DevDay'24</h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-8">
            <div>
              <label htmlFor="userID" className="sr-only">
                UserID
              </label>
              <input
                id="userID"
                name="userID"
                type="text"
                autoComplete="userID"
                required
                className="appearance-none relative block w-full px-3 py-2 bg-gray-800 text-white placeholder-gray-400 text-gray-100 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="UserID"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-2 bg-gray-800 text-white placeholder-gray-400 text-gray-100 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [jwt, setJwt] = useState("");	
  	

  return (
    <>
      {
        isLoggedIn ? <Register jwt={jwt}/> :
        <Login setLogin={setIsLoggedIn} setJwt={setJwt} />
      }
    </>
  )
}

export default App
