/* eslint-disable react/prop-types */
import moment from 'moment';
import Avatar from '../common/Avatar';
import UserName from '../common/UserName';
import { useAuth } from '../../hooks/useAuth';



const SingleBlogDetailsBlogInfo = ({ singleBlogDetails }) => {
    const { auth } = useAuth();
    const isMe = singleBlogDetails?.author?.id == auth?.user?.id;


    return (
        <>
            {/* Begin Blogs */}
            <section>
                <div className="container text-center py-8">

                    <h1 className="font-bold text-3xl md:text-5xl">
                        {singleBlogDetails?.title}
                    </h1>

                    <div className="flex justify-center items-center my-4 gap-4">
                        <div className="flex items-center capitalize space-x-2">

                            {/* PROFILE AVATAR */}
                            <Avatar
                                avatar={singleBlogDetails?.author?.avatar}
                                firstName={singleBlogDetails?.author?.firstName}
                            />

                            <UserName
                                id={singleBlogDetails?.author?.id}
                                firstName={singleBlogDetails?.author?.firstName}
                                lastName={singleBlogDetails?.author?.lastName}
                                isMe={isMe}
                                loggedInUser={auth?.user?.id}
                            />

                        </div>

                        <span className="text-sm text-slate-700 dot">
                            {moment(singleBlogDetails?.createdAt).format('MMMM DD, YYYY')}
                        </span>

                        <span className="text-sm text-slate-700 dot">
                            {singleBlogDetails?.likes?.length} Likes
                        </span>

                    </div>

                    <img
                        className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
                        src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${singleBlogDetails?.thumbnail}`}
                        alt={singleBlogDetails?.title}
                    />

                    {/* Tags */}
                    {(singleBlogDetails?.tags?.split(','))?.length > 0 &&
                        <ul className="tags">
                            {(singleBlogDetails?.tags?.split(','))?.map((eachTag, tagIndex) => {
                                return (
                                    <li key={`KEY-${tagIndex}-${eachTag}`} className='capitalize'>
                                        {eachTag}
                                    </li>
                                )
                            })
                            }
                        </ul>
                    }

                    {/* Content */}
                    <div
                        className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
                        {singleBlogDetails?.content}
                    </div>

                </div>
            </section>
            {/* End Blogs */}
        </>
    );
}

export default SingleBlogDetailsBlogInfo;
