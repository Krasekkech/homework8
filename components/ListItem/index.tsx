import React, { SetStateAction, useEffect, useRef } from "react";
import styles from "./index.module.css";

type Models = {
    elements: number[];
    showList: boolean;
    item: number;
    Blocks: number[];
    setBlocks: React.Dispatch<SetStateAction<number[]>>;
};

export const UpdatedListItem: React.FC<Models> = ({
                                              elements,
                                              showList,
                                              item,
                                              Blocks,
                                              setBlocks,
                                          }) => {
    const listItemRef = useRef<HTMLDivElement>(null);

    const Intersections = (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver,
    ) => {
        const finalBlock = entries[0];
        if (finalBlock.isIntersecting) {
            const lengthBlocks = Blocks.length;
            const newBlocks =
                lengthBlocks + 5 <= elements.length
                    ? elements.slice(0, lengthBlocks + 5)
                    : elements.slice(0, elements.length);

            setBlocks(newBlocks);
            observer.unobserve(finalBlock.target);
        }
    };

    useEffect(() => {
        const options = {
            rootMargin: "0px",
            threshold: 0.1,
        };
        const intersectionObserver = new IntersectionObserver(
            Intersections,
            options,
        );

        if (showList && intersectionObserver && listItemRef.current) {
            intersectionObserver.observe(listItemRef.current);
        }

        return () => {
            intersectionObserver.disconnect();
        };
    }, [showList]);

    return (
        <div ref={listItemRef} className={styles.item}>
            {item}
        </div>
    );
};
