import { useEffect } from "react";

const usePortal = () => {
    const target = document.createElement('div');


    useEffect(() => {
        document.body.appendChild(target);
        return () => {
            document.body.removeChild(target);
        };
    }, [target]);

    return target;
};

export default usePortal;