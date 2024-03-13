/* eslint-disable react/prop-types */


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



const OthersProfileInfo = ({ data }) => {


    return (
        <>
            <div className="flex flex-col items-center py-8 text-center">


                {/* PROFILE IMAGE */}
                <div className="flex flex-col items-center py-8 text-center">
                    <div
                        className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]"
                    >

                        {data?.[0]?.avatar ?
                            <img
                                className="w-full h-full rounded-full border-2 border-white"
                                src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${data?.[0]?.avatar}`}
                                alt="avatar"
                            />
                            :
                            <div className={`w-full h-full border-2 border-white ${getColorForLetter(data?.[0]?.firstName?.[0])} text-white grid place-items-center text-5xl rounded-full`}>

                                <span className="capitalize">{data?.[0]?.firstName?.[0]}</span>
                            </div>
                        }

                    </div>
                </div>

                {/*  name , email  */}
                <div>
                    <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
                        {data?.[0]?.firstName} {data?.[0]?.lastName}
                    </h3>
                    <p className="leading-[231%] lg:text-lg">
                        {data?.[0]?.email}
                    </p>
                </div>

                {/* BIO */}
                <div className="mt-4 flex items-start gap-2 lg:mt-6">
                    <div className="flex-1">

                        <p className="leading-[188%] text-gray-400 lg:text-lg">
                            {data?.[0]?.bio}
                        </p>

                    </div>
                </div>

                <div className="w-3/4 border-b border-[#3F3F3F] py-3 lg:py-4"></div>
            </div>
        </>

    );
};

export default OthersProfileInfo;
