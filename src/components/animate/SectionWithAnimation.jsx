import React, { useEffect, useRef, useState } from "react";
import { animate } from "motion";

const SectionWithAnimation = ({ children }) => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isVisible && sectionRef.current) {
            animate(
                sectionRef.current,
                { opacity: [0, 1], transform: ["translateY(50px)", "translateY(0px)"] },
                { duration: 1 }
            );
        }
    }, [isVisible]);

    return (
        <section ref={sectionRef} className="opacity-0">
            {children}
        </section>
    );
};
export default SectionWithAnimation

