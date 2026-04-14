//FINAL CODE:
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../services/authService";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(email, password);
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-xl p-8 w-96"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full mb-4 px-3 py-2 border rounded-lg"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-6 px-3 py-2 border rounded-lg"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//         >
//           Login
//         </button>

//         <p className="mt-4 text-sm text-center">
//           Don’t have an account?{" "}
//           <span
//             onClick={() => navigate("/signup")}
//             className="text-blue-600 cursor-pointer"
//           >
//             Signup
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }


//__________FINAL CODE WITH UI____________:
// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-50 to-purple-50">

      {/* Animated Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/3 right-[-10%] w-80 h-80 bg-pink-300 rounded-full opacity-25 blur-3xl animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-300 rounded-full opacity-20 blur-3xl animate-blob"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white shadow-2xl rounded-2xl p-10 w-96 flex flex-col items-center animate-fadeIn"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-700">
          Login
        </h2>

        {error && <p className="text-red-500 text-sm mb-4 animate-fadeIn">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner transition"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner transition"
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl shadow-lg hover:scale-105 transform transition"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-pink-500 cursor-pointer hover:underline"
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}
