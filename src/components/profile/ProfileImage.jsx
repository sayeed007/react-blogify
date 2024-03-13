import { useRef } from "react";
import EditIcon from "../../assets/icons/edit.svg";
import useAxios from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";

import { actions } from "../../actions";
import { useAuth } from "../../hooks/useAuth";



const getColorForLetter = (letter) => {
    // Define a mapping of letters to background colors
    const colorMap = {
        A: 'bg-blue-500',
        B: 'bg-green-500',
        C: 'bg-red-500',
        D: 'bg-purple-500',
        E: 'bg-orange-500',
        F: 'bg-yellow-500',
        G: 'bg-pink-500',
        H: 'bg-indigo-500',
        I: 'bg-teal-500',
        J: 'bg-blue-600',
        K: 'bg-green-600',
        L: 'bg-red-600',
        M: 'bg-purple-600',
        N: 'bg-orange-600',
        O: 'bg-yellow-600',
        P: 'bg-pink-600',
        Q: 'bg-indigo-600',
        R: 'bg-teal-600',
        S: 'bg-blue-700',
        T: 'bg-green-700',
        U: 'bg-red-700',
        V: 'bg-purple-700',
        W: 'bg-orange-700',
        X: 'bg-yellow-700',
        Y: 'bg-pink-700',
        Z: 'bg-indigo-700',
        // Add more mappings as needed
    };

    // Convert the letter to uppercase to handle both cases
    const uppercaseLetter = letter?.toUpperCase();

    // Use the color from the mapping, or a default color if not found
    return colorMap[uppercaseLetter] || 'bg-gray-500';
};

const ProfileImage = () => {
    const { auth } = useAuth();

    const { state, dispatch } = useProfile();
    const { api } = useAxios();

    const user = state?.user ?? auth?.user;

    const fileUploaderRef = useRef();

    const handleImageUpload = (event) => {
        event.preventDefault();

        fileUploaderRef.current.addEventListener("change", updateImageDisplay);
        fileUploaderRef.current.click();
    };

    const updateImageDisplay = async () => {
        try {
            const formData = new FormData();
            for (const file of fileUploaderRef.current.files) {
                formData.append("avatar", file);
            }

            const response = await api.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/profile/avatar`,
                formData
            );
            if (response.status === 200) {
                dispatch({
                    type: actions.profile.IMAGE_UPDATED,
                    data: response.data.user,
                });

                let authenticUserInfo = localStorage.getItem("auth-user") ? JSON.parse(localStorage.getItem("auth-user")) : {};

                authenticUserInfo.user = response.data?.user;

                localStorage.setItem("auth-user", JSON.stringify(authenticUserInfo));

            }
        } catch (error) {
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: error.message,
            });
        }
    };

    return (
        <>
            {/*  profile info  */}
            <div className="flex flex-col items-center py-8 text-center">
                <div
                    className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]"
                >

                    {user?.avatar ?
                        <img
                            className="w-full h-full rounded-full border-2 border-white"
                            src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${user?.avatar}`}
                            alt="avatar"
                        />
                        :
                        <div className={`w-full h-full border-2 border-white ${getColorForLetter(user?.firstName?.[0])} text-white grid place-items-center text-5xl rounded-full`}>

                            <span className="capitalize">{user?.firstName?.[0]}</span>
                        </div>
                    }

                    <form id="form" encType="multipart/form-data">
                        <button
                            className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
                            onClick={handleImageUpload}
                            type="submit"
                        >
                            <img src={EditIcon} alt="Edit" />
                        </button>
                        <input
                            id="file"
                            type="file"
                            ref={fileUploaderRef}
                            accept=".jpg, .jpeg, .png"
                            hidden />
                    </form>
                </div>
            </div>

        </>

    );
};

export default ProfileImage;
