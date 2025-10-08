import type {ComponentProps, FC} from "react";

export const AndroidIcon: FC<ComponentProps<'svg'>> = (props) => {
    return (
        <svg
            width="19"
            height="18"
            viewBox="0 0 17 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M15.5 8.75C15.5 5.5 12.8 2.5 9 2.5C5.2 2.5 2.5 5.5 2.5 8.75V12.5H15.5V8.75ZM9 0C11.487 0 13.5 2.013 13.5 4.5C13.5 4.77614 13.2761 5 13 5C12.7239 5 12.5 4.77614 12.5 4.5C12.5 2.51472 10.9853 1 9 1C7.01472 1 5.5 2.51472 5.5 4.5C5.5 4.77614 5.27614 5 5 5C4.72386 5 4.5 4.77614 4.5 4.5C4.5 2.013 6.513 0 9 0ZM17 12.5V8.75C17 4.5 13.3 0.9375 9 0.9375C4.7 0.9375 1 4.5 1 8.75V12.5H0V16.25H1V20H2V16.25H16V20H17V16.25H18V12.5H17ZM5 14.5V16.5H4V14.5H5ZM14 14.5V16.5H13V14.5H14Z"
                fill="currentColor"
            />
        </svg>
    );
};