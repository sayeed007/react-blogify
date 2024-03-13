import { useEffect, useState } from "react";
import { GetMyFavouriteBlogs } from "../../api/Blogs";
import useAxios from "../../hooks/useAxios";
import MyFavouriteSingleBlogList from "./MyFavouriteSingleBlogList";
import EmptyScreenView from "../../common/emptyScreen/EmptyScreenView";
import InsidePageLoader from "../../common/loader/InsidePageLoader";
import CommonErrorModalDesign from "../../common/commonErrorModal/CommonInsidePageErrorModal";

const MyFavouriteBlogList = () => {
    const { api } = useAxios();

    const [myFavouriteBlogs, setMyFavouriteBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [reload, setReload] = useState('');

    useEffect(() => {

        setIsLoading(true);

        GetMyFavouriteBlogs(api).then((response) => {
            setIsLoading(false);
            if (response?.[0]) {
                setMyFavouriteBlogs(response?.[0]);
                setErrorMessage('');
            } else {
                setMyFavouriteBlogs([]);
                setErrorMessage(response?.[1]);
            }
        });

    }, [reload]);


    const actionOnErrorModal = () => {
        setErrorMessage('');
        setReload(!reload);
    };


    return (
        <>

            <div className="sidebar-card">
                <h3
                    className="text-slate-300 text-xl lg:text-2xl font-semibold"
                >
                    Your Favourites ❤️
                </h3>

                {errorMessage ?
                    <CommonErrorModalDesign
                        actionOnErrorModal={actionOnErrorModal}
                        visible={errorMessage}
                        message={errorMessage}
                    />
                    :
                    <>
                        {isLoading ?
                            <InsidePageLoader
                                loaderMessage={"Please Wait"}
                            />
                            :
                            <ul className="space-y-5 my-5">

                                {myFavouriteBlogs?.blogs?.length > 0 ?
                                    myFavouriteBlogs?.blogs?.map((eachBlog, index) => {
                                        return (
                                            <MyFavouriteSingleBlogList
                                                key={`Favourite-${index}-${eachBlog?.id}`}
                                                blog={eachBlog}
                                            />
                                        )
                                    })
                                    :
                                    <EmptyScreenView
                                        message={'No Blog Found as Favorite'}
                                        detailedMessage={'Blogs will appear once you mark them as favorite'}
                                    />
                                }
                            </ul>
                        }
                    </>
                }
            </div>

        </>
    );
}

export default MyFavouriteBlogList;
