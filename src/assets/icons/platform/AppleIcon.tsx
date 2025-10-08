import type {ComponentProps, FC} from "react";

export const AppleIcon: FC<ComponentProps<'svg'>> = (props) => {
    return (
        <svg
            width="19"
            height="18"
            viewBox="0 0 14 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M13.8 11.08C13.8 10.99 13.8 10.9 13.8 10.81C13.8 8.16 11.66 6.3 9.4 6.3C8.2 6.3 6.96 7.15 6.3 8.35C5.73 7.02 4.41 6.3 3.1 6.3C1.04 6.3 0 7.85 0 9.87C0 12.33 2.15 15.93 4.29 15.99C5.45 16.06 6.13 15.19 7.42 15.19C8.71 15.19 9.25 15.99 10.54 15.99C12.68 15.99 13.8 12.75 13.8 11.08ZM10.5 4.5C11.2 3.6 11.59 2.5 11.4 1.25C10.74 1.34 9.6 1.8 8.9 2.75C8.12 3.65 7.82 4.7 8 5.95C8.67 5.86 9.8 5.3 10.5 4.5Z"
                fill="currentColor"
            />
        </svg>
    );
};