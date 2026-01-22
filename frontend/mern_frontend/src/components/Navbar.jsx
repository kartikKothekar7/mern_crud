// import React from 'react'

// const Navbar = () => {
//   return (
//     <div>
//         <div className='w-screen bg-gray-500 flex flex-row h-2rem item-center'>
//             <a href="http://localhost:5173/login">login</a>
//             <a href="http://localhost:5173/signup">signup</a>
//         </div>
//     </div>
//   )
// }

// export default Navbar
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="w-screen bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Notes App</h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
      >
        Logout
      </button>
      <a href="http://localhost:5173/login">login</a>
      <a href="http://localhost:5173/signup">signup</a>
    </nav>
  );
};

export default Navbar;
