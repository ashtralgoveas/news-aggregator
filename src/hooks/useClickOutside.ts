import { useState, useRef, useEffect } from "react";

export const useClickOutside = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const elementRef = useRef(null);

  // Close when clicking outside
  const handleClickOutside = (event) => {
    if (elementRef.current && !elementRef.current.contains(event.target)) {
      setIsCollapsed(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return {
    isCollapsed,
    setIsCollapsed,
    elementRef,
  };
};
