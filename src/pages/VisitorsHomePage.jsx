import React, { useEffect, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import BlogCardForHomePage from "../components/blogs/BlogCardForHomePage";
import MostPopularBlogList from "../components/blogs/MostPopularBlogList";
import useOnScreen from "../hooks/useOnScreen";
import InsidePageLoader from "../common/loader/InsidePageLoader";
import CommonInsidePageErrorModal from "../common/commonErrorModal/CommonInsidePageErrorModal";
import EmptyScreenView from "../common/emptyScreen/EmptyScreenView";
import NoMoreBlogsToRead from "../components/noMoreBlogs/NoMoreBlogsToRead";

const VisitorsHomePage = () => {
    const { api } = useAxios();
    const queryClient = useQueryClient();

    const { lastBlogRef, isIntersecting, observer } = useOnScreen();
    const [errorMessage, setErrorMessage] = useState("");

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["blogs"],
        queryFn: ({ pageParam = 1 }) =>
            api.get(`/blogs?page=${pageParam}`).then((res) => res.data),
        getNextPageParam: (lastPage) =>
            lastPage.page * lastPage.limit < lastPage.total
                ? lastPage.page + 1
                : null,
        onError: (error) => {
            setErrorMessage(error?.message);
        },
    });

    useEffect(() => {
        if (isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
            observer.disconnect();
        }
    }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const actionOnErrorModal = () => {
        setErrorMessage("");
        // Refetch the data when the error modal is closed
        queryClient.invalidateQueries("blogs");
    };

    return (
        <>
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    <div className="space-y-3 md:col-span-5">
                        {isFetching && !isFetchingNextPage && (
                            <InsidePageLoader
                                activateLoader={isFetching && !isFetchingNextPage}
                                loaderMessage={"Getting All Posts.."}
                            />
                        )}

                        {errorMessage && !isFetching ? (
                            <CommonInsidePageErrorModal
                                visible={errorMessage}
                                actionOnErrorModal={actionOnErrorModal}
                                message={errorMessage}
                            />
                        ) : (
                            <>
                                {data?.pages?.[0]?.blogs?.length > 0 ?
                                    (
                                        <>
                                            {data?.pages?.map((page, pageIndex) => (
                                                <React.Fragment key={pageIndex}>
                                                    {page?.blogs?.map((eachBlog, blogIndex) => (
                                                        <BlogCardForHomePage
                                                            blog={eachBlog}
                                                            index={
                                                                blogIndex + 1 + pageIndex * 10
                                                            }
                                                            key={`blog-${blogIndex}-${eachBlog?.id}`}
                                                            lastBlogRef={
                                                                pageIndex === data.pages.length - 1 &&
                                                                    blogIndex === page.blogs.length - 1
                                                                    ? lastBlogRef
                                                                    : null
                                                            }
                                                        />
                                                    ))}
                                                </React.Fragment>
                                            ))}

                                            {!hasNextPage && data && data.pages.length > 0 && !isFetchingNextPage &&
                                                <NoMoreBlogsToRead />
                                            }
                                        </>
                                    ) :
                                    (
                                        <EmptyScreenView
                                            message={'No Blog Found'}
                                            detailedMessage={'Blogs will appear once user creates a blog.'}
                                        />
                                    )}
                                {isFetchingNextPage && <li>Loading...</li>}
                            </>
                        )}
                    </div>

                    <div className="md:col-span-2 h-full w-full space-y-5">
                        <MostPopularBlogList />
                    </div>
                </div>
            </div>
        </>
    );
};

export default VisitorsHomePage;
