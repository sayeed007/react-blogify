/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import { Portal } from 'react-portal';
import close from '../../assets/icons/close.svg';
import { GetSearchedBlog } from '../../api/Blogs';
import useAxios from '../../hooks/useAxios';
import { Link } from 'react-router-dom';
import EmptyScreenView from '../../common/emptyScreen/EmptyScreenView';
import InsidePageLoader from '../../common/loader/InsidePageLoader';
import { useAuth } from '../../hooks/useAuth';
import usePortal from '../../hooks/usePortal';

const SearchContent = (props) => {
    const { api } = useAxios();
    const { auth } = useAuth();
    const isLoggedIn = auth?.user?.id


    const [searchTerm, setSearchTerm] = useState('');
    const [searchedData, setSearchedData] = useState([]);
    const [loading, setLoading] = useState(false);

    const target = usePortal();

    // Create a mutable ref for searchTerm
    const searchTermRef = useRef(searchTerm);

    // Update searchTermRef when searchTerm changes
    searchTermRef.current = searchTerm;

    // Debounce function
    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    // Function to fetch search results
    const fetchSearchResults = async (query) => {
        setLoading(true);

        GetSearchedBlog(api, query).then((response) => {

            setLoading(false);

            if (response?.[0]) {
                setSearchedData(response?.[0]?.data);
            } else {
                setSearchedData([]);
            }
        })

    };

    // Debounced version of the fetchSearchResults function with delayed execution
    const delayedFetchSearchResults = debounce((query) => {
        if (query.trim() === searchTermRef.current.trim()) {
            fetchSearchResults(query);
        }
    }, 1000); // Adjust the delay as needed

    // Handler for input change
    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        delayedFetchSearchResults(value);
    };

    function truncateString(str, maxLength) {
        if (str?.length > maxLength) {
            return str?.substring(0, maxLength) + "...";
        }
        return str;
    }


    return (
        <>
            {/*   Search Result */}
            <Portal node={target}>
                <section className="absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
                    {/* Search Container */}
                    <div
                        className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10"
                    >
                        {/* Search */}
                        <div>
                            <h3 className="font-bold text-xl pl-2 mb-4 text-slate-400 my-2">
                                Search for Your Desire Blogs
                            </h3>
                            {/* Input for search */}
                            <input
                                type="text"
                                placeholder="Start Typing to Search"
                                value={searchTerm}
                                onChange={handleInputChange}
                                className="w-full bg-transparent p-2 text-base border border-slate-600 border-dashed  text-white outline-none rounded-lg focus:ring focus:ring-indigo-600"
                            />
                        </div>

                        {/* Search Result */}
                        <div className="">
                            <h3 className="text-slate-400 font-bold mt-6">
                                Search Results ({searchedData?.length})
                            </h3>
                            <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">

                                {loading ?
                                    <InsidePageLoader
                                        loaderMessage={"Please Wait"}
                                    />
                                    :
                                    <>
                                        {searchedData?.length > 0 ?
                                            <>
                                                {searchedData?.map((eachSearchResult, searchIndex) => {
                                                    return (
                                                        <div
                                                            className="flex gap-6 py-2"
                                                            key={`SearchBlog-${searchIndex}-${eachSearchResult.Id}`}
                                                        >
                                                            <div className='flex justify-center items-center w-[30%]'>
                                                                <img
                                                                    className="w-full object-contain"
                                                                    src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${eachSearchResult?.thumbnail}`}
                                                                    alt=""
                                                                />
                                                            </div>

                                                            <div className="mt-2 w-[70%]" >
                                                                <h3
                                                                    className="text-slate-300 text-xl font-bold lg:text-2xl"
                                                                    onClick={() => {
                                                                        searchTermRef.current = null;
                                                                        setSearchTerm('');
                                                                        props.setShowSearchModal(false);
                                                                    }}
                                                                >
                                                                    <Link
                                                                        to={isLoggedIn ?
                                                                            `/single-blog/${eachSearchResult?.id}`
                                                                            :
                                                                            `/read-single-blog/${eachSearchResult?.id}`
                                                                        }
                                                                    >
                                                                        {eachSearchResult?.title}
                                                                    </Link>
                                                                </h3>

                                                                {/* Meta Information */}
                                                                <p className="mb-6 text-sm text-slate-500 mt-1">
                                                                    {truncateString(eachSearchResult?.content, 200)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                })

                                                }
                                            </>
                                            :
                                            <EmptyScreenView
                                                message={'No Blog Found'}
                                                detailedMessage={'Blogs will appear once your search keyword matches with blog content.'}
                                            />
                                        }

                                    </>
                                }

                            </div>
                        </div>

                        <div
                            onClick={() => {
                                searchTermRef.current = null;
                                setSearchTerm('');
                                props.setShowSearchModal(false);
                            }}
                        >
                            <img
                                src={close}
                                alt="Close"
                                className="absolute right-2 top-6 cursor-pointer w-8 h-8"
                            />
                        </div>
                    </div>
                </section>
            </Portal>
        </>
    );
}

export default SearchContent;
