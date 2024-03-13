/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import EmptyScreenView from "../../common/emptyScreen/EmptyScreenView";
import { useAuth } from "../../hooks/useAuth";
import Avatar from "../common/Avatar";
import UserName from "../common/UserName";
import React, { useEffect, useRef, useState } from "react";
import { CreateNewCommentToPost, DeleteComment } from "../../api/Blogs";
import useAxios from "../../hooks/useAxios";
import DeleteIcon from '../../assets/icons/delete.svg'
import ConfirmDelete from "../../common/deleteConfirmationModal/ConfirmDelete";
import CommonSuccessModal from "../../common/commonSuccessModal/CommonSuccessModal";
import ReactQuillEditor from "../../common/react-quillEditor/ReactQuillEditor";
import { useForceLogIn } from "../../hooks/useForceLogIn";
import { actions } from "../../actions";


const createMarkup = (html) => {
    return {
        __html: html
    };
};



const SingleBlogDetailsComments = React.forwardRef((props, ref) => {
    const { api } = useAxios();

    const { auth } = useAuth();
    const isMe = props?.singleBlogDetails?.author?.id === auth?.user?.id;
    const isLoggedInUser = auth?.user?.id;

    const { state, dispatch } = useForceLogIn();

    const [commentText, setCommentText] = useState({
        "content": ''
    });
    const [emptyCommentError, setEmptyCommentError] = useState(false);
    const [confirmDeleteModal, showConfirmDeleteModal] = useState(false);
    const [confirmDeleteCommentId, showConfirmDeleteCommentId] = useState(false);

    const [successMessage, setSuccessMessage] = useState(null);


    const makeNewComment = () => {
        if (isLoggedInUser) {
            if (commentText?.content) {
                CreateNewCommentToPost(api, props?.singleBlogDetails?.id, commentText).then((response) => {
                    if (response?.[0]) {
                        setCommentText({ "content": '' })
                        props.setReload(!props?.reload);
                        document.body.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                    } else {
                        props.setErrorMessage(response?.[1]);
                    }
                });
            } else {
                setEmptyCommentError(true);
            }
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

    const deleteButtonAction = () => {
        DeleteComment(api, props?.singleBlogDetails?.id, confirmDeleteCommentId).then((response) => {
            handleCloseModal();
            if (response?.[0]) {
                setSuccessMessage('Comment is successfully deleted.');
                props.setReload(!props?.reload);
            } else {
                props.setErrorMessage(response?.[1]);
            }
        })
    };

    const handleCloseModal = () => {
        showConfirmDeleteCommentId(null)
        showConfirmDeleteModal(false);
    };

    const actionOnSuccessModal = () => {
        setSuccessMessage(null);
    };

    const setHTMLTextValue = (HTMLValue) => {
        if (HTMLValue) {
            setCommentText({
                "content": HTMLValue
            });
            setEmptyCommentError(false);
        }
    };

    return (
        <>


            {confirmDeleteModal &&
                <ConfirmDelete
                    visible={confirmDeleteModal}
                    header={'Delete Comment'}
                    message={'Are you sure you want to delete this comment?'}

                    deleteButtonAction={deleteButtonAction}
                    handleCloseModal={handleCloseModal}
                />
            }


            {successMessage &&
                <CommonSuccessModal
                    successModalVisible={successMessage}
                    message={successMessage}
                    actionOnSuccessModal={actionOnSuccessModal}
                />

            }


            {/* Begin Comments */}
            <section id="comments" className="mb-24" ref={ref}>
                <div className="mx-auto w-full md:w-10/12 container">
                    <h2 className="text-3xl font-bold my-8">
                        Comments ({props?.singleBlogDetails?.comments?.length})
                    </h2>

                    <div className="flex items -center space-x-4">

                        {/* PROFILE AVATAR */}
                        <Avatar
                            avatar={auth?.user?.avatar}
                            firstName={auth?.user?.firstName}
                        />

                        <div className="w-full" >
                            <ReactQuillEditor
                                setTextValue={setHTMLTextValue}
                                textValue={commentText?.content ? commentText?.content : ''}
                            />

                            {emptyCommentError &&
                                <p className="text-red-500">
                                    Please write something in the comment box.
                                </p>
                            }

                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                                    onClick={() => makeNewComment()}
                                >
                                    Comment
                                </button>
                            </div>

                        </div>
                    </div>

                    {props?.singleBlogDetails?.comments?.length > 0 ?
                        <>
                            {props?.singleBlogDetails?.comments?.map((eachComment, commentIndex) => {
                                return (
                                    <div
                                        className="flex items-start space-x-4 my-8"
                                        key={`comment-${commentIndex}-${eachComment?.id}`}
                                    >
                                        <Avatar
                                            avatar={eachComment?.author?.avatar}
                                            firstName={eachComment?.author?.firstName}
                                        />

                                        <div className="w-full">

                                            <UserName
                                                id={eachComment?.author?.id}
                                                firstName={eachComment?.author?.firstName}
                                                lastName={eachComment?.author?.lastName}
                                                isMe={isMe}
                                                loggedInUser={auth?.user?.id}
                                            />

                                            <div className="flex justify-between w-full">
                                                <div className="text-slate-300 w-[95%]">
                                                    <div
                                                        dangerouslySetInnerHTML={createMarkup(eachComment?.content)}>
                                                    </div>
                                                </div>

                                                <div className=" flex w-[5%] justify-center items-center">

                                                    {(eachComment?.author?.id === auth?.user?.id) &&
                                                        <div className="bg-slate-300 p-1 hover:bg-red-500 cursor-pointer rounded-sm"
                                                            onClick={() => {
                                                                showConfirmDeleteCommentId(eachComment?.id)
                                                                showConfirmDeleteModal(true);
                                                            }}
                                                        >
                                                            <img
                                                                src={DeleteIcon}
                                                                alt={'delete'}
                                                                className="cursor-pointer transition duration-300 transform hover:scale-110"


                                                            />
                                                        </div>
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })

                            }
                        </>
                        :
                        <EmptyScreenView
                            message={'No Comment Found'}
                        />
                    }

                </div>
            </section>
            {/*Ends Comments */}

        </>
    );
});

export default SingleBlogDetailsComments;
