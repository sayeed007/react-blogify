
import OthersProfileInfo from "../components/othersProfile/OthersProfileInfo";
import OthersBlogs from "../components/othersProfile/OthersBlogs";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import CommonInsidePageErrorModal from "../common/commonErrorModal/CommonInsidePageErrorModal";
import Loader from "../common/loader/Loader";
import useProfileQuery from "../hooks/useProfileQuery";
import useAxios from "../hooks/useAxios";



const OthersProfile = () => {

    const { userId } = useParams();
    const { api } = useAxios();


    const { data, errorMessage, isLoading, setErrorMessage } = useProfileQuery(userId, api);

    const queryClient = useQueryClient();


    const actionOnErrorModal = () => {
        setErrorMessage('');

        queryClient.invalidateQueries("profile");
    };


    return (
        <>
            {errorMessage ?
                <CommonInsidePageErrorModal
                    actionOnErrorModal={actionOnErrorModal}
                    visible={errorMessage}
                    message={errorMessage}
                />
                :
                <>
                    {isLoading ?
                        <Loader
                            activateLoader={isLoading}
                            loaderMessage={"Getting user Information, Please wait."}
                        />
                        :
                        <>

                            {/* PROFILE SECTION */}
                            <OthersProfileInfo
                                data={data}
                            />

                            {/* BLOG SECTION */}
                            <OthersBlogs
                                data={data}
                            />
                        </>
                    }
                </>
            }
        </>
    );
};

export default OthersProfile;
