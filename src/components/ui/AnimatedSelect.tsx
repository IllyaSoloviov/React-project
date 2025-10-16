import {useState, useRef, useEffect, type FC} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {ArrowSvg} from "@/assets/icons/Arrow.svg.tsx";

interface Option {
    value: string;
    label: string;
}

interface AnimatedSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const AnimatedSelect: FC<AnimatedSelectProps> = ({options = [], value, onChange, placeholder = "Select an option...",}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleOptionClick = (newValue: string) => {
        onChange(newValue);
        setIsOpen(false);
    };

    return (
        <div
            ref={selectRef}
            className="relative w-full sm:w-56 lg:w-[150px] text-sm font-medium"
        >
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`
                    flex items-center justify-between w-full
                    bg-bg
                    border border-slate-500/40 text-text
                    rounded-xl px-4 py-2.5
                    shadow-[0_2px_8px_rgba(0,0,0,0.25)] backdrop-blur-sm
                    hover:border-indigo-400/70 hover:shadow-[0_3px_12px_rgba(99,102,241,0.3)]
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-400
                    transition-all duration-300 ease-out
                `}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span>{selectedOption ? selectedOption.label : placeholder}</span>
                <motion.span
                    animate={{rotate: isOpen ? -90 : 0}}
                    transition={{duration: 0.25}}
                >
                    <ArrowSvg className="w-4 h-4 text-text opacity-80"/>
                </motion.span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        key="options"
                        initial={{opacity: 0, y: -8}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -8}}
                        transition={{duration: 0.2, ease: "easeOut"}}
                        className="
                            absolute z-20 mt-2 w-full
                            bg-bg/90 backdrop-blur-md border border-slate-600/30
                            rounded-lg shadow-lg overflow-hidden origin-top
                        "
                    >
                        {options.map((opt) => (
                            <motion.li
                                key={opt.value}
                                onClick={() => handleOptionClick(opt.value)}
                                whileHover={{backgroundColor: "rgba(99,102,241,0.15)"}}
                                className={`
                                    px-4 py-2 cursor-pointer text-text font-medium
                                    ${opt.value === value ? "bg-[rgba(99,102,241,0.4)] font-semibold" : ""}
                                `}
                            >
                                {opt.label}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};