/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import MostPopularSingleBlogList from "./MostPopularSingleBlogList";
import { GetPopularBlogs } from "../../api/Blogs";
import useAxios from "../../hooks/useAxios";
import InsidePageLoader from "../../common/loader/InsidePageLoader";
import EmptyScreenView from "../../common/emptyScreen/EmptyScreenView";
import CommonErrorModalDesign from "../../common/commonErrorModal/CommonInsidePageErrorModal";

const MostPopularBlogList = () => {
    const { api } = useAxios();

    const [mostPopularBlogs, setMostPopularBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [reload, setReload] = useState('');

    useEffect(() => {
        setIsLoading(true);

        GetPopularBlogs(api).then((response) => {
            setIsLoading(false);
            if (response?.[0]) {
                setMostPopularBlogs(response?.[0]);
                setErrorMessage('');
            } else {
                setMostPopularBlogs([]);
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
                    Most Popular 👍️
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

                                {mostPopularBlogs?.blogs?.length > 0 ?
                                    mostPopularBlogs?.blogs?.map((eachBlog, index) => {
                                        return (
                                            <MostPopularSingleBlogList
                                                key={`Popular-${index}-${eachBlog?.id}`}
                                                blog={eachBlog}
                                            />
                                        )
                                    })
                                    :
                                    <EmptyScreenView
                                        message={'No Blog Found as Popular'}
                                        detailedMessage={'Popular blogs will appear they got liked by other users.'}
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

export default MostPopularBlogList;
