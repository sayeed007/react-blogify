/* eslint-disable react/prop-types */
import EmptyScreenView from "../../common/emptyScreen/EmptyScreenView";
import BlogCard from "./BlogCard";


const BlogList = ({ blogs }) => {
    return (
        <>
            {blogs?.length > 0 ?
                <>
                    {blogs?.map((blog, blogIndex) => (
                        <BlogCard
                            key={`${blogIndex}-${blog.id}`}
                            blog={blog}
                        />
                    ))}
                </>
                :
                <EmptyScreenView
                    message={'No Blog Found.'}
                    detailedMessage={'Start writing blog by clicking on write button on top bar.'}
                />
            }

        </>
    )

};

export default BlogList;
