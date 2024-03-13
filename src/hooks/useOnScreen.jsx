import { useCallback, useState } from "react";

const useOnScreen = ({
    root = null,
    rootMargin = "0px",
    threshold = 0
} = {}) => {
    const [observer, setOserver] = useState();
    const [isIntersecting, setIntersecting] = useState(false);

    const lastBlogRef = (useCallback)(
        (node) => {
            if (node) {
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        setIntersecting(entry.isIntersecting);
                    },
                    { root, rootMargin, threshold }
                );

                observer.observe(node);
                setOserver(observer);
            }
        },
        [root, rootMargin, threshold]
    );

    return { lastBlogRef, isIntersecting, observer };
};

export default useOnScreen;
