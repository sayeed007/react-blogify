/* eslint-disable react/prop-types */
import moment from "moment";
import Avatar from "../common/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { actions } from "../../actions";

import ThreeDots from '../../assets/icons/3dots.svg';
import EditIcon from '../../assets/icons/edit.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import ConfirmDelete from "../../common/deleteConfirmationModal/ConfirmDelete";
import CommonSuccessModal from "../../common/commonSuccessModal/CommonSuccessModal";
import useAxios from "../../hooks/useAxios";
import { DeleteBlog } from "../../api/Blogs";
import { useProfile } from "../../hooks/useProfile";
import CommonErrorModal from "../../common/commonErrorModal/CommonErrorModal";

const BlogCard = ({ blog }) => {
    const { dispatch } = useProfile();

    const { api } = useAxios();
    const { auth } = useAuth();
    const isMe = blog?.author?.id == auth?.user?.id;
    const navigate = useNavigate();


    const [toggledView, setToggledView] = useState(false);

    const [confirmDeleteModal, showConfirmDeleteModal] = useState(false);

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);



    function truncateString(str, maxLength) {
        if (str?.length > maxLength) {
            return str?.substring(0, maxLength) + "...";
        }
        return str;
    }


    const deleteButtonAction = () => {
        DeleteBlog(api, blog?.id).then((response) => {
            handleCloseModal();
            if (response?.[0]) {
                setSuccessMessage('Blog is successfully deleted.');
            } else {
                setErrorMessage(response?.[1]);
            }
        })
    };



    const fetchProfile = async () => {
        dispatch({ type: actions.profile.DATA_FETCHING });

        try {
            const response = await api.get(
                `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
            );
            if (response.status === 200) {
                dispatch({
                    type: actions.profile.DATA_FETCHED,
                    data: response.data,
                });
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: error.message,
            });
        }
    };

    const handleCloseModal = () => {
        showConfirmDeleteModal(false);
    };

    const actionOnSuccessModal = () => {
        setSuccessMessage(null);
        fetchProfile();

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
                                to={`/single-blog/${blog?.id}`}
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

                    {/* action dot */}
                    {isMe &&
                        <div className="absolute right-0 top-0">
                            <button
                                onClick={() => setToggledView(!toggledView)}
                            >
                                <img
                                    src={ThreeDots}
                                    alt="3dots of Action"
                                />
                            </button>

                            {/* Action Menus Popup */}
                            {toggledView &&
                                <div className="action-modal-container">
                                    <button
                                        className="action-menu-item hover:text-lwsGreen"
                                        onClick={() => {
                                            navigate(`/edit-blog/${blog?.id}`);
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
                                        onClick={() => {
                                            showConfirmDeleteModal(true);
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
                </div>
            </div>
            {/* Blog Card End */}

        </>

    );
};

export default BlogCard;
