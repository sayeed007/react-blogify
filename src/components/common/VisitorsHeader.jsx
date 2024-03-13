// import HomeIcon from "../../assets/icons/home.svg";
// import Notification from "../../assets/icons/notification.svg";
import Logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { actions } from "../../actions";

// import Search from '../../assets/icons/SearchWhite.svg';
import SearchContent from "../search/Search";
import { useState } from "react";
import { useForceLogIn } from "../../hooks/useForceLogIn.jsx";
import ForceLogInModal from "../../common/forceLogInModal/ForceLogInModal";


const VisitorsHeader = () => {
    const { state, dispatch } = useForceLogIn();


    const [showSearchModal, setShowSearchModal] = useState(false);

    return (
        <>
            <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#030317] py-4">
                <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <Link to="/blogs">
                        <img
                            className="max-w-[100px] lg:max-w-[140px]"
                            src={Logo}
                            alt="logo"
                        />
                    </Link>

                    <div className="flex items-center space-x-4">

                        <button className="icon-btn bg-indigo-600 text-white px-3 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                            onClick={() => {
                                dispatch({
                                    type: actions.forceLogIn.DATA_TOGGLING,
                                    data: {
                                        isWarningModalVisible: true,
                                        message: 'You need to log in to write a blog.'
                                    },
                                });
                            }}
                        >
                            Write
                        </button>

                        {/* <button
                            className="flex text-white px-3 py-2 md:py-3 rounded-md  transition-all duration-200"
                            onClick={() => setShowSearchModal(true)}
                        >
                            <img src={Search} alt="Search" />
                            <span className="mx-2">Search</span>
                        </button> */}


                        <Link
                            className="flex text-white px-3 py-2 md:py-3 rounded-md  transition-all duration-200"
                            to="/login"
                        >
                            Login
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


            {state?.isWarningModalVisible &&
                <ForceLogInModal
                />
            }

        </>
    );
};

export default VisitorsHeader;
