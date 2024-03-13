import { useEffect, useRef, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { GetSingleBlog, ToggleFavouritePost, ToggleLikePost } from '../../api/Blogs';
import Loader from '../../common/loader/Loader';
import CommonErrorModal from '../../common/commonErrorModal/CommonErrorModal';
import EmptyScreenView from '../../common/emptyScreen/EmptyScreenView';
import { useParams } from 'react-router-dom';
import SingleBlogDetailsBlogInfo from './SingleBlogDetailsBlogInfo';
import SingleBlogDetailsComments from './SingleBlogDetailsComments';
import { actions } from "../../actions";

import LikeIcon from '../../assets/icons/like.svg';
import LikeIconFilled from '../../assets/icons/like-filled.svg';
import LoveIcon from '../../assets/icons/heart.svg';
import LoveIconFilled from '../../assets/icons/heart-filled.svg';
import CommentIcon from '../../assets/icons/comment.svg'
import { useAuth } from '../../hooks/useAuth';
import { useForceLogIn } from '../../hooks/useForceLogIn';
import ForceLogInModal from '../../common/forceLogInModal/ForceLogInModal';



const SingleBlogDetails = () => {
    const { state, dispatch } = useForceLogIn();

    const { auth } = useAuth();
    const isLoggedInUser = auth?.user?.id;

    const commentRef = useRef(null);


    // Use the useParams hook to extract route parameters
    const { blogId } = useParams();
    const { api } = useAxios();

    const [singleBlogDetails, setSingleBlogDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const [reload, setReload] = useState(true);


    useEffect(() => {
        GetSingleBlog(api, blogId).then((response) => {
            setIsLoading(false);
            if (response?.[0]) {
                setSingleBlogDetails(response?.[0]);
                setErrorMessage('');
            } else {
                setSingleBlogDetails([]);
                setErrorMessage(response?.[1]);
            }
        });


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

    const handleFavourite = () => {
        if (isLoggedInUser) {
            ToggleFavouritePost(api, blogId).then((response) => {
                if (response?.[0]) {
                    setReload(reload => !reload);
                } else {
                    setErrorMessage(response?.[1]);
                }
            });
        } else {
            dispatch({
                type: actions.forceLogIn.DATA_TOGGLING,
                data: {
                    isWarningModalVisible: true,
                    message: 'You need to log in to write a blog.'
                },
            });
        }
    };

    const handleLike = () => {
        if (isLoggedInUser) {
            ToggleLikePost(api, blogId).then((response) => {
                if (response?.[0]) {
                    setReload(reload => !reload);
                } else {
                    setErrorMessage(response?.[1]);
                }
            });

        } else {
            dispatch({
                type: actions.forceLogIn.DATA_TOGGLING,
                data: {
                    isWarningModalVisible: true,
                    message: 'You need to log in to write a blog.'
                },
            });
        }
    };

    const handleCommentClick = () => {
        if (commentRef.current) {
            commentRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    };

    const actionOnErrorModal = () => {
        setErrorMessage('');
    };


    return (
        <>

            {errorMessage &&
                <CommonErrorModal
                    actionOnErrorModal={actionOnErrorModal}
                    visible={errorMessage}
                    message={errorMessage}
                />
            }


            {isLoading ?
                <Loader
                    activateLoader={isLoading}
                    loaderMessage={"Please Wait"}
                />
                :
                <>
                    {Object?.keys(singleBlogDetails)?.length > 0 ?
                        <>

                            <SingleBlogDetailsBlogInfo
                                singleBlogDetails={singleBlogDetails}
                            />

                            <SingleBlogDetailsComments
                                ref={commentRef}
                                singleBlogDetails={singleBlogDetails}
                                setErrorMessage={setErrorMessage}
                                setReload={setReload}
                                reload={reload}
                                isLoggedInUser={isLoggedInUser}
                            />


                            {/* Floating Actions*/}
                            <div className="floating-action">
                                <ul className="floating-action-menus">
                                    <li
                                        onClick={() => handleLike()}
                                    >
                                        {singleBlogDetails?.likes?.filter((eachLike) => eachLike?.id === auth?.user?.id)?.length > 0 ?
                                            <img
                                                src={LikeIconFilled}
                                                alt="liked"
                                            />
                                            :
                                            <img
                                                src={LikeIcon}
                                                alt="not-liked"
                                            />
                                        }

                                        <span>{singleBlogDetails?.likes?.length}</span>
                                    </li>

                                    <li
                                        onClick={() => handleFavourite()}
                                    >
                                        {singleBlogDetails?.isFavourite ?
                                            <img
                                                src={LoveIconFilled}
                                                alt="Favourite"
                                            />
                                            :
                                            <img
                                                src={LoveIcon}
                                                alt="Not-Favourite"
                                            />
                                        }
                                    </li>

                                    <li
                                        onClick={() => handleCommentClick()}
                                    >
                                        <img
                                            src={CommentIcon}
                                            alt="Comments"
                                        />

                                        <span>{singleBlogDetails?.comments?.length}</span>
                                    </li>
                                </ul>
                            </div>

                        </>
                        :
                        <EmptyScreenView
                            message={'Blog Details not found.'}
                            detailedMessage={'Maybe the blog is deleted or you are trying to access a invalid blog.'}
                        />

                    }


                </>
            }

            {state?.isWarningModalVisible &&
                <ForceLogInModal
                />
            }
        </>
    );
}

export default SingleBlogDetails;
