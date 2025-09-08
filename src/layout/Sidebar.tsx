import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const menu = [
    { name: "Students", path: "/students" },
    { name: "Enrollments", path: "/enrollments" },
  ];
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen w-[250px] bg-gray-100 p-4 shadow-lg">
      <img
        src="./logo.jpeg"
        width={250}
        height={300}
        alt="Visa Direct NZ"
        className="cursor-pointer" // show pointer on hover
        onClick={() => navigate("/")} // navigate to home
      ></img>
      <ul className="mt-4">
        {menu.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`h-10 flex items-center px-4 mb-2 rounded-lg cursor-pointer transition-all duration-200
                ${
                  location.pathname === item.path
                    ? "bg-violet-600 text-white"
                    : "bg-violet-500 text-white hover:bg-violet-600 hover:translate-x-1"
                }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
