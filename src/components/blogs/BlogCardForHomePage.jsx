/* eslint-disable react/prop-types */
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

import ThreeDots from '../../assets/icons/3dots.svg';
import EditIcon from '../../assets/icons/edit.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Avatar from "../common/Avatar";
import UserName from "../common/UserName";
import ConfirmDelete from "../../common/deleteConfirmationModal/ConfirmDelete";
import { DeleteBlog } from "../../api/Blogs";
import useAxios from "../../hooks/useAxios";
import CommonErrorModal from "../../common/commonErrorModal/CommonErrorModal";
import CommonSuccessModal from "../../common/commonSuccessModal/CommonSuccessModal";
import { useQueryClient } from "@tanstack/react-query";




function BlogCardForHomePage(props) {
    const { api } = useAxios();
    const { auth } = useAuth();
    const isMe = props?.blog?.author?.id === auth?.user?.id;
    const isLoggedInUser = auth?.user?.id;

    const queryClient = useQueryClient();


    const navigate = useNavigate();


    const [toggledView, setToggledView] = useState(false);
    const [confirmDeleteModal, showConfirmDeleteModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);



    const truncateString = (str, maxLength) => {
        if (str?.length > maxLength) {
            return str?.substring(0, maxLength) + "...";
        }
        return str;
    };

    const deleteButtonAction = () => {
        DeleteBlog(api, props?.blog?.id).then((response) => {
            handleCloseModal();
            if (response?.[0]) {
                setSuccessMessage('Blog is successfully deleted.');
            } else {
                setErrorMessage(response?.[1]);
            }
        })
    };

    const handleDivClick = () => {
        navigate(isLoggedInUser ?
            `/single-blog/${props?.blog?.id}`
            :
            `/read-single-blog/${props?.blog?.id}`
        );
    };

    const handleCloseModal = () => {
        showConfirmDeleteModal(false);
    };

    const actionOnSuccessModal = () => {
        setToggledView(!toggledView);
        setSuccessMessage(null);

        queryClient.invalidateQueries("blogs");
    };

    const actionOnErrorModal = () => {
        setErrorMessage(null);
    };


    return (
        <>

            {confirmDeleteModal &&
                <ConfirmDelete
                    visible={confirmDeleteModal}
                    header={'Delete Blog'}
                    message={'Are you sure you want to delete this blog?'}

                    deleteButtonAction={deleteButtonAction}
                    handleCloseModal={handleCloseModal}
                />
            }

            {errorMessage &&
                <CommonErrorModal
                    actionOnErrorModal={actionOnErrorModal}
                    visible={errorMessage}
                    message={errorMessage}
                />
            }


            {successMessage &&
                <CommonSuccessModal
                    successModalVisible={successMessage}
                    message={successMessage}
                    actionOnSuccessModal={actionOnSuccessModal}
                />

            }



            {/* Blog Card Start */}
            <div className="blog-card"
                onClick={handleDivClick}
                ref={props?.lastBlogRef}
            >

                <div
                    className="flex justify-center items-center "
                >
                    {props?.blog?.thumbnail &&
                        <img
                            className="blog-thumb w-full border border-white rounded"
                            src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${props?.blog?.thumbnail}`}
                            alt={props?.blog?.title} />
                    }
                </div>

                <div className="mt-2 relative">
                    <h3
                        className="text-slate-300 text-xl lg:text-2xl w-[95%]"
                    >
                        <Link
                            onClick={(e) => e?.stopPropagation()}
                            to={isLoggedInUser ?
                                `/single-blog/${props?.blog?.id}`
                                :
                                `/read-single-blog/${props?.blog?.id}`
                            }
                        >
                            {props?.blog?.title}
                        </Link>
                    </h3>

                    <p
                        className="mb-6 text-base text-slate-500 mt-1"
                    >
                        {truncateString(props?.blog?.content, 200)}
                    </p>

                    {/* Meta Information */}
                    <div
                        className="flex justify-between items-center"
                    >
                        <div
                            className="flex items-center capitalize space-x-2"

                        >

                            {/* PROFILE AVATAR */}
                            <Avatar
                                avatar={props?.blog?.author?.avatar}
                                firstName={props?.blog?.author?.firstName}
                            />


                            <div>
                                <UserName
                                    id={props?.blog?.author?.id}
                                    firstName={props?.blog?.author?.firstName}
                                    lastName={props?.blog?.author?.lastName}
                                    isMe={isMe}
                                    loggedInUser={auth?.user?.id}
                                />

                                <div
                                    className="flex items-center text-xs text-slate-700"
                                >
                                    <span>
                                        {moment(props?.blog?.createdAt).format('MMMM DD, YYYY')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div
                            className="text-sm px-2 py-1 text-slate-700"
                        >
                            <span>
                                {props?.blog?.likes?.length} Likes
                            </span>
                        </div>
                    </div>

                    {/* action dot */}
                    {isMe &&
                        <div className="absolute right-0 top-0">
                            <button
                                onClick={(e) => {
                                    setToggledView(!toggledView);
                                    e.stopPropagation()
                                }}
                            >
                                <img
                                    src={ThreeDots}
                                    alt="3dots of Action"
                                />
                            </button>

                            {/* Action Menus Popup */}
                            {toggledView &&
                                <div className="action-modal-container z-[10]">
                                    <button
                                        className="action-menu-item hover:text-lwsGreen"
                                        onClick={(e) => {
                                            navigate(`/edit-blog/${props?.blog?.id}`);
                                            e.stopPropagation();
                                        }}
                                    >
                                        <img
                                            src={EditIcon}
                                            alt="Edit"
                                        />
                                        Edit
                                    </button>
                                    <button
                                        className="action-menu-item hover:text-red-500"
                                        onClick={(e) => {
                                            showConfirmDeleteModal(true);
                                            e.stopPropagation();
                                        }}
                                    >
                                        <img
                                            src={DeleteIcon}
                                            alt="Delete"
                                        />
                                        Delete
                                    </button>
                                </div>
                            }

                        </div>
                    }
                    {/* action dot ends */}
                </div>
            </div>
            {/* Blog Card End */}
        </>
    )
}

export default BlogCardForHomePage