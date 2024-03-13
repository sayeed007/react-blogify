// import HomeIcon from "../../assets/icons/home.svg";
// import Notification from "../../assets/icons/notification.svg";
import Logo from "../../assets/images/logo.svg";
import Logout from "../auth/Logout";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { Link, useNavigate } from "react-router-dom";

import Search from '../../assets/icons/SearchWhite.svg';
import Avatar from "./Avatar";
import SearchContent from "../search/Search";
import { useState } from "react";


const Header = () => {
    const { auth } = useAuth();
    const { state } = useProfile();

    const navigate = useNavigate();

    const user = state?.user ?? auth?.user;

    const [showSearchModal, setShowSearchModal] = useState(false);

    return (

        <>
            <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#030317] py-4">
                <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <Link to="/">
                        <img
                            className="max-w-[100px] lg:max-w-[140px]"
                            src={Logo}
                            alt="logo"
                        />
                    </Link>

                    <div className="flex items-center space-x-4">

                        <button className="icon-btn bg-indigo-600 text-white px-3 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                            onClick={() => navigate(`/create-new-blog`)}
                        >
                            Write
                        </button>

                        <button
                            className="flex text-white px-3 py-2 md:py-3 rounded-md  transition-all duration-200"
                            onClick={() => setShowSearchModal(true)}
                        >
                            <img src={Search} alt="Search" />
                            <span className="mx-2">Search</span>
                        </button>

                        {user ?
                            <Logout />
                            :
                            <Link
                                className="flex text-white px-3 py-2 md:py-3 rounded-md  transition-all duration-200"
                                to="/login"
                            >
                                Login
                            </Link>
                        }

                        <Link to="/my-profile" className="flex-center !ml-8 gap-3">

                            <Avatar
                                avatar={user?.avatar}
                                firstName={user?.firstName}
                            />

                            <span className="text-sm font-medium lg:text-lg">
                                {user?.firstName} {user?.lastName}
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>



            {showSearchModal &&
                <SearchContent
                    showSearchModal={showSearchModal}
                    setShowSearchModal={setShowSearchModal}
                />
            }

        </>
    );
};

export default Header;
