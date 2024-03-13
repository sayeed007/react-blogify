/* eslint-disable react/prop-types */
import BlogListOther from "./BlogListOther";

const OthersBlogs = ({ data }) => {

    return (
        <div className="mx-8">
            <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">{data?.[0]?.firstName} {data?.[0]?.lastName}&apos; s Blogs</h4>
            <BlogListOther blogs={data?.[0]?.blogs} />
        </div>
    );
};

export default OthersBlogs;
