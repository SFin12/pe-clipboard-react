import { useState, useEffect } from "react";

export function useViewport() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    // Return the width so we can use it in our components
    return { screenWidth };
}


export function formatDate (date) {
  
  return new Date(date).toISOString().split("T")[0]
}