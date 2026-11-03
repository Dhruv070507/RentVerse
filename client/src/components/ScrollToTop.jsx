// it is a component that will scroll to the top of the page
// when user navigates to a new page because react router dom
// does not do that by default


import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;