/* eslint-disable react/prop-types */
import moment from "moment";
import Avatar from "../common/Avatar";
import { Link } from "react-router-dom";

const BlogCardOthers = ({ blog }) => {
    const currentPath = window.location.pathname;

    function truncateString(str, maxLength) {
        if (str?.length > maxLength) {
            return str?.substring(0, maxLength) + "...";
        }
        return str;
    }


    return (
        <>

            {/* Blog Card Start */}
            <div className="blog-card">

                {blog?.thumbnail &&
                    <img
                        className="blog-thumb border border-white rounded"
                        src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${blog?.thumbnail}`}
                        alt={blog?.title} />
                }

                <div className="mt-2 relative">

                    <div>
                        <h3
                            className="text-slate-300 text-xl lg:text-2xl"
                        >
                            <Link
                                to={
                                    currentPath?.includes('user-profile')
                                        ?
                                        `/read-single-blog/${blog?.id}`
                                        :
                                        `/single-blog/${blog?.id}`
                                }
                            >
                                {blog?.title}
                            </Link>
                        </h3>

                    </div>

                    <p className="mb-6 text-base text-slate-500 mt-1">
                        {truncateString(blog?.content, 200)}
                    </p>

                    {/* Meta Information */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center capitalize space-x-2">
                            <Avatar
                                avatar={blog?.author?.avatar}
                                firstName={blog?.author?.firstName}
                            />

                            <div>
                                <h5 className="text-slate-500 text-sm">
                                    {blog?.author?.firstName} {blog?.author?.lastName}
                                </h5>
                                <div className="flex items-center text-xs text-slate-700">
                                    <span>
                                        {moment(blog?.createdAt).format('MMMM DD, YYYY')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="text-sm px-2 py-1 text-slate-700">
                            <span>
                                {blog?.likes?.length} Likes
                            </span>
                        </div>
                    </div>

                </div>
            </div>
            {/* Blog Card End */}

        </>

    );
};

export default BlogCardOthers;
