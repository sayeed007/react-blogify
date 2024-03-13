// ###### ------ CREATE APIS / POST ------ #######

export const CreateNewBlogPost = (api, data) => {

    let formData = new FormData();

    Object.keys(data).forEach(key => {
        return (
            formData.append(key, data?.[key])
        )
    });

    return (
        api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/`, formData)
            .then((response) => {
                return [response?.data];
            })
            .catch(error => {
                console.error(error);
                return [false, error?.response?.data?.error ? error?.response?.data?.error
                    : error?.response?.data?.message ? error?.response?.data?.message
                        : error.message];
            })
    )
};


export const ToggleLikePost = (api, blogId) => {
    return (
        api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/like`)
            .then((response) => {
                return [response?.data];
            })
            .catch(error => {
                console.error(error);
                return [false, error?.response?.data?.error ? error?.response?.data?.error
                    : error?.response?.data?.message ? error?.response?.data?.message
                        : error.message];
            })
    )
};

export const CreateNewCommentToPost = (api, blogId, data) => {
    return (
        api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/comment`, data)
            .then((response) => {
                return [response?.data];
            })
            .catch(error => {
                console.error(error);
                return [false, error?.response?.data?.error ? error?.response?.data?.error
                    : error?.response?.data?.message ? error?.response?.data?.message
                        : error.message];
            })
    )
};





// ###### ------ READ APIS / GET ------ #######

//  GET POPULAR BLOGS
export const GetPopularBlogs = (api) => {


    return (
        api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/popular`,)
            .then((response) => {
                return [response?.data];
            })
            .catch(error => {
                console.error(error);
                return [false, error?.response?.data?.error ? error?.response?.data?.error
                    : error?.response?.data?.message ? error?.response?.data?.message
                        : error.message];
            })
    )
};


//  GET Favourite BLOGS
export const GetMyFavouriteBlogs = (api) => {

    return (
        api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`,)
            .then((response) => {
                return [response?.data];
            })
            .catch(error => {
                console.error(error);
                return [false, error?.response?.data?.error ? error?.response?.data?.error
                    : error?.response?.data?.message ? error?.response?.data?.message
                        : error.message];
            })
    )
};


//  GET Single BLOGS
export const GetSingleBlog = (api, blogId) => {

    return (
        api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`)
            .then((response) => {
                return [response?.data];
            })
            .catch(error => {
                console.error(error);
                return [false, error?.response?.data?.error ? error?.response?.data?.error
                    : error?.response?.data?.message ? error?.response?.data?.message
                        : error.message];
            })
    )
};

//  GET Searched Blogs
export const GetSearchedBlog = (api, query) => {

    return (
        api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/search?q=${query}`)
            .then((response) => {
                return [response?.data];
            })
            .catch(error => {
                console.error(error);
                return [false, error?.response?.data?.error ? error?.response?.data?.error
                    : error?.response?.data?.message ? error?.response?.data?.message
                        : error.message];
            })
    )
};



// ###### ------ UPDATE APIS  / PUT/PATCH ------ #######
export const ToggleFavouritePost = (api, blogId) => {
    return (
        api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/favourite`)
            .then((response) => {
                return [response?.data];
            })
            .catch(error => {
                console.error(error);
                return [false, error?.response?.data?.error ? error?.response?.data?.error
                    : error?.response?.data?.message ? error?.response?.data?.message
                        : error.message];
            })
    )
};


export const UpdateExistingBlogPost = (api, blogId, data) => {

    let formData = new FormData();

    Object.keys(data).forEach(key => {
        return (
            formData.append(key, data?.[key])
        )
    });

    return (
        api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`, formData)
            .then((response) => {
                return [response?.data];
            })
            .catch(error => {
                console.error(error);
                return [false, error?.response?.data?.error ? error?.response?.data?.error
                    : error?.response?.data?.message ? error?.response?.data?.message
                        : error.message];
            })
    )
};



// ###### ------ DELETE APIS / DELETE ------ #######
export const DeleteComment = (api, blogId, commentId) => {
    return (
        api.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/comment/${commentId}`)
            .then((response) => {
                return [response?.data];
            })
            .catch(error => {
                console.error(error);
                return [false, error?.response?.data?.error ? error?.response?.data?.error
                    : error?.response?.data?.message ? error?.response?.data?.message
                        : error.message];
            })
    )
};


export const DeleteBlog = (api, blogId) => {
    return (
        api.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`)
            .then((response) => {
                return [response?.data];
            })
            .catch(error => {
                console.error(error);
                return [false, error?.response?.data?.error ? error?.response?.data?.error
                    : error?.response?.data?.message ? error?.response?.data?.message
                        : error.message];
            })
    )
};
