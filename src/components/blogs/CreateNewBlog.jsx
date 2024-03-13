
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FileUploader } from "react-drag-drop-files";
import CommonErrorModal from "../../common/commonErrorModal/CommonErrorModal";
import UploadIcon from './../../assets/icons/UploadIcon.svg';
import ErrorTooltipIcon from './../../assets/icons/ErrorTooltipIcon.svg';
import useAxios from "../../hooks/useAxios";
import { CreateNewBlogPost } from "../../api/Blogs";
import CommonSuccessModal from "../../common/commonSuccessModal/CommonSuccessModal";
import { useNavigate } from "react-router-dom";

const fileTypes = ["jpeg", "jpg", "png", "gif", "image/*"];


const CreateNewBlog = () => {
    const { api } = useAxios();
    const navigate = useNavigate();

    const [fileUploadComplete, setFileUploadComplete] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [newlyCreatedBlog, setNewlyCreatedBlog] = useState(null);


    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const handleFileChange = (e) => {
        if (!fileTypes.includes(e?.type?.split('/')?.[1])) {
            setErrorMessage("Unsupported File Type. Please upload a valid image file.");
        } else {
            // Create URL for the uploaded file
            const url = URL.createObjectURL(e);
            setFileUrl(url);

            setFileUploadComplete(true);
            setImageFile(e);
            setErrorMessage('');
        }
    };

    const onSubmit = (data) => {
        CreateNewBlogPost(api, data).then((response) => {
            if (response?.[0]) {
                setSuccessMessage(response?.[0]?.message);
                setNewlyCreatedBlog(response?.[0]?.blog?.id)
            } else {
                setErrorMessage(response?.[1]);
            }
        })

    };

    const actionOnErrorModal = () => {
        setErrorMessage('');
    };

    const actionOnSuccessModal = () => {
        setSuccessMessage(false);
        navigate(`/single-blog/${newlyCreatedBlog}`);
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


            {successMessage &&
                <CommonSuccessModal
                    successModalVisible={successMessage}
                    message={successMessage}
                    actionOnSuccessModal={actionOnSuccessModal}
                />

            }

            <div className="card relative" >
                <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
                    Create Post
                </h6>
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)} className="createBlog" encType="multipart/form-data">

                        {/* Upload File */}
                        <div className='flex w-full justify-center items-center cursor-pointer'>
                            {!fileUploadComplete ?
                                <FileUploader
                                    handleChange={(e) => {
                                        // Set the file value using React Hook Form setValue
                                        setValue("thumbnail", e);
                                        handleFileChange(e);
                                    }}
                                    name="thumbnail"
                                    types={fileTypes}
                                    classes='DragAndDropStyle'

                                    {...register(
                                        'thumbnail',
                                        {
                                            required: "File is required",
                                            validate: value => {
                                                if (!value || typeof value !== 'object' || typeof value.type !== 'string') {
                                                    return "Invalid file. Please upload a valid image file.";
                                                }

                                                if (!fileTypes.includes(value.type.split('/')[1])) {
                                                    return "Unsupported File Type. Please upload a valid image file.";
                                                }

                                                return true;
                                            }
                                        }
                                    )

                                    }
                                >
                                    <div className="w-full my-2">
                                        <label
                                            className={`flex justify-center w-full px-4 py-2 transition bg-slate-600/20 border ${errors.thumbnail ? 'border-red-400' : 'border-slate-600'} border-dashed rounded-md appearance-none cursor-pointer`}>
                                            <span className="flex flex-col justify-center items-center space-x-2">
                                                <img src={UploadIcon} alt='Upload File' height='50' width='50' />
                                                <div className='drag-drop'>Drag & Drop Image here</div>
                                                <div className='or'>or</div>
                                                <div className='browse-button'>Browse File</div>
                                                <div className='or'>N.B: Only Image file is allowed to upload.</div>
                                            </span>
                                        </label>
                                    </div>
                                </FileUploader>
                                :
                                <div className='flex w-full px-4 py-2 transition bg-slate-600/20  border-2 border-slate-600 border-dashed rounded-md appearance-none cursor-pointer'>
                                    <div className='choose-file-details'>

                                        <div className='step-title mx-auto'>Chosen File Details</div>

                                        <div className='filePathCrop or w-full justify-center'>
                                            <img
                                                src={fileUrl}
                                                style={{
                                                    height: '60%',
                                                    width: '45%'
                                                }}
                                            />
                                        </div>

                                        <div className='filePathCrop or'>
                                            File Name: {imageFile?.name}
                                        </div>
                                        <div className='filePathCrop or'>
                                            File Size: {imageFile?.size} bytes
                                        </div>
                                        <div className='filePathCrop or'>
                                            File Type: {imageFile?.type}
                                        </div>
                                        <div className='filePathCrop or'>
                                            Last Modified: {(imageFile?.lastModifiedDate)?.toString()}
                                        </div>
                                    </div>
                                    <div className='choose-another'>
                                        <div className='my-2'>Wrong File?</div>
                                        <div className='my-2 text-[#4338CA] underline cursor-pointer'
                                            onClick={() => {
                                                setFileUrl(null);
                                                setImageFile('');
                                                setFileUploadComplete(false);
                                            }}>
                                            Choose Another
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        {errors.thumbnail &&
                            <div className="flex items-center text-red-500">
                                <span className="mr-2">
                                    <img src={ErrorTooltipIcon} alt='Error' height='15' width='15' />
                                </span>
                                {errors.thumbnail.message}
                            </div>
                        }


                        {/* BLOG TITLE */}
                        <div className={`mt-6 p-2 border  border-dashed rounded-md ${errors.title ? 'border-red-400' : 'border-slate-600'}`}>
                            <input
                                {...register("title", { required: "Title is required" })}
                                type="text"
                                id="title"
                                placeholder="Enter your blog title"
                            />
                        </div>
                        {errors.title &&
                            <div className="flex items-center text-red-500">
                                <span className="mr-2">
                                    <img src={ErrorTooltipIcon} alt='Error' height='15' width='15' />
                                </span>
                                {errors.title.message}
                            </div>
                        }

                        {/* BLOG TAGS */}
                        <div className={`mt-6 p-2 border  border-dashed rounded-md ${errors.tags ? 'border-red-400' : 'border-slate-600'}`}>
                            <input
                                {...register("tags", { required: "Tags are required" })}
                                type="text"
                                id="tags"
                                placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
                            />
                        </div>
                        {errors.tags &&
                            <div className="flex items-center text-red-500">
                                <span className="mr-2">
                                    <img src={ErrorTooltipIcon} alt='Error' height='15' width='15' />
                                </span>
                                {errors.tags.message}
                            </div>
                        }

                        {/* BLOG CONTENT */}
                        <div className={`mt-6 p-2 border  border-dashed rounded-md ${errors.content ? 'border-red-400' : 'border-slate-600'}`}>
                            <textarea
                                {...register("content", { required: "Content is required" })}
                                id="content"
                                placeholder="Write your blog content"
                                rows="8"
                            />
                        </div>
                        {errors.content &&
                            <div className="flex items-center text-red-500">
                                <span className="mr-2">
                                    <img src={ErrorTooltipIcon} alt='Error' height='15' width='15' />
                                </span>
                                {errors.content.message}
                            </div>
                        }

                        {/* CREATE BUTTON */}
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 my-6 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                        >
                            Create Blog
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateNewBlog;
