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

const Avatar = ({ avatar, firstName }) => {
    return (
        <>
            {avatar ?
                <img
                    className="avater-img rounded-full border-2 border-white"
                    src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${avatar}`}
                    alt="avatar"
                />
                :
                <div className={`avater-img ${getColorForLetter(firstName?.[0])} text-white grid place-items-center text-xl rounded-full border-2 border-white`}>
                    <span className="capitalize">{firstName?.[0]}</span>
                </div>
            }
        </>
    );
}

export default Avatar;
