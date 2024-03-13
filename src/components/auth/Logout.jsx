// import LogoutIcon from "../../assets/icons/logout.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Logout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();


  const handleLogout = () => {
    setAuth({});
    localStorage.clear();
    navigate("/login");
  }

  return (
    <button
      className="flex text-white px-2 py-2 md:py-3 rounded-md  transition-all duration-200"
      onClick={handleLogout}>
      Log Out
    </button>
  )
}

export default Logout