import type {ComponentProps, FC} from "react";

export const PCIcon:FC <ComponentProps<'svg'>> = (props) => {
    return (
        <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M0.5 15.4935L7.86312 16.5082V9.47925H0.5V15.4935ZM0.5 8.5725H7.86312V1.458L0.5 2.47275V8.5725ZM8.67313 16.6163L18.4651 17.9662V9.47813H8.67313V16.6163ZM8.67313 1.35V8.5725H18.4651V0L8.67313 1.35Z" fill="currentColor"/>
        </svg>
    );
};