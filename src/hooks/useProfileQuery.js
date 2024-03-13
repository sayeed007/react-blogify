// useProfileQuery.js
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchProfileData = async (profileId, api, setErrorMessage) => {
    return api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${profileId}`)
        .then((response) => {
            setErrorMessage(""); // Clear any previous error message
            return [response?.data, null];
        })
        .catch(error => {
            console.error(error);
            const errorMessage = error?.response?.data?.error ? error?.response?.data?.error : error.message;
            setErrorMessage(errorMessage);
            return [null, errorMessage];
        });
};

const useProfileQuery = (profileId, api, onErrorCallback) => {
    const [errorMessage, setErrorMessage] = useState("");

    const { data, ...query } = useQuery({
        queryKey: ['profile', profileId],

        queryFn: () => fetchProfileData(profileId, api, setErrorMessage),
        onError: (error) => {
            console.error(error);
            if (onErrorCallback && typeof onErrorCallback === 'function') {
                onErrorCallback(error);
            }
        },
    });

    return { data, errorMessage, setErrorMessage, ...query };
};

export default useProfileQuery;





