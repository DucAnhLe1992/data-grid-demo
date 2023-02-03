import { useState, useEffect } from "react";

interface useConTextMenuProps {
  setContextMenu: (args: any) => void;
}

export const useConTextMenu = ({ setContextMenu }: useConTextMenuProps) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleContextMenu = () => {
      setClicked(false);
      setContextMenu(null);
    };
    const handleClick = (event: any) => {
      event.preventDefault();
    };
    document.addEventListener("click", handleContextMenu);
    document.addEventListener("contextmenu", handleClick);
    return () => {
      document.removeEventListener("click", handleContextMenu);
    };
  }, [setContextMenu]);

  return { clicked, setClicked };
};
