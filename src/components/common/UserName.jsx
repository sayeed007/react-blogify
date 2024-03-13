/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const UserName = ({ id, firstName, lastName, isMe, loggedInUser }) => {
    return (
        <h5
            className="text-slate-500 text-sm z-[10] transition-all duration-500 ease-in-out hover:text-blue-700 hover:font-bold"
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <Link
                to={
                    isMe
                        ?
                        `/my-profile`
                        :
                        (loggedInUser ?
                            `/profile/${id}`
                            :
                            `/user-profile/${id}`
                        )

                }
            >
                {firstName} {lastName}
            </Link>
        </h5>
    );
};

export default UserName;
