import React from "react";

// components
import { Container, LogoutButton, Logo, Button } from "./../index.js";

// routes
import { Link, useNavigate } from "react-router-dom";

// state management
import { useSelector } from "react-redux";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  // Navigation bar items
  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "Scan", slug: "/scan", active: authStatus },
    { name: "Physiotherapists", slug: "/physiotherapy", active: authStatus },
    { name: "Suggestions", slug: "/suggestions", active: authStatus },
  ];

  return (
    <header className="py-4 bg-gray-900 shadow-lg">
      <Container>
        <nav className="flex items-center">
          <div className="mr-6">
            <Link to="/">
              <Logo width="50px" />
            </Link>
          </div>
          <ul className="flex ml-auto space-x-6">
            {/* loop through items */}

            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Button onClick={() => navigate(item.slug)}>
                    {item.name}
                  </Button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

// return (
//   <header className='py-3 shadow bg-gray-500'>
//     <Container>
//       <nav className='flex'>
//         <div className='mr-4'>
//           <Link to='/'>
//             <Logo width='70px'   />

//             </Link>
//         </div>
//         <ul className='flex ml-auto'>
//           {navItems.map((item) =>
//           item.active ? (
//             <li key={item.name}>
//               <button
//               onClick={() => navigate(item.slug)}
//               className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
//               >{item.name}</button>
//             </li>
//           ) : null
//           )}
//           {authStatus && (
//             <li>
//               <LogoutBtn />
//             </li>
//           )}
//         </ul>
//       </nav>
//       </Container>
//   </header>
// )
