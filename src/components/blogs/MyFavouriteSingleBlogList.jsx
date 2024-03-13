/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";


const MyFavouriteSingleBlogList = (props) => {


    return (
        <li>
            <h3
                className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer"
            >
                <Link
                    to={`/single-blog/${props?.blog?.id}`}
                >
                    {props?.blog?.title}
                </Link>
            </h3>
            <p className="text-slate-600 text-sm">
                {((props?.blog?.tags?.split(', '))?.map(tag => `#${tag.replace(/\s+/g, '')}`))?.join(', ')}
            </p>
        </li>

    );
}

export default MyFavouriteSingleBlogList;
