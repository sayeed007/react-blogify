/* eslint-disable react/prop-types */

import UserName from "../common/UserName";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const MostPopularSingleBlogList = (props) => {
    const { auth } = useAuth();
    const isMe = props?.blog?.author?.id == auth?.user?.id;
    const isLoggedIn = auth?.user?.id


    return (
        <li>
            <h3
                className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer"
            >
                <Link
                    to={isLoggedIn ?
                        `/single-blog/${props?.blog?.id}`
                        :
                        `/read-single-blog/${props?.blog?.id}`
                    }
                >
                    {props?.blog?.title}
                </Link>
            </h3>
            <div className="flex justify-between text-slate-600 text-sm">
                <div className="flex">
                    <span className="mr-2">
                        by
                    </span>

                    <UserName
                        id={props?.blog?.author?.id}
                        firstName={props?.blog?.author?.firstName}
                        lastName={props?.blog?.author?.lastName}
                        isMe={isMe}
                        loggedInUser={auth?.user?.id}
                    />

                </div>

                <div>
                    <span className="mx-5">
                        {props?.blog?.likes?.length} Likes
                    </span>
                </div>
            </div>
        </li>
    );
}

export default MostPopularSingleBlogList;
