import { useEffect, useState } from "react";

function useOrientation() {
    const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);

    useEffect(() => {
        window.addEventListener('orientationchange', () => {
            const orientation = screen.orientation

            if (orientation.type.includes("portrait")) {
                setIsLandscape(false)
            } else if (orientation.type.includes("landscape")) {
                setIsLandscape(true)
            }
        })
    }, [])

    // const handleResize = () => {
    //     setIsLandscape(window.innerWidth > window.innerHeight);
    // };

    // window.addEventListener('resize', handleResize);

    // return () => {
    //     window.removeEventListener('resize', handleResize);
    // };


    return isLandscape;
}

export { useOrientation }