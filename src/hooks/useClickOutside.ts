import { type RefObject, useEffect } from "react";

function useClickOutside(ref: RefObject<HTMLElement | null>, callback: () => void) {
    useEffect(() => {
        function handleClickOutside(event: Event) {
            if (
                ref.current &&
                event.target instanceof HTMLElement &&
                !ref.current.contains(event.target)
            ) {
                callback();
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref, callback]);
}

export default useClickOutside;
