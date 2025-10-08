import type {ComponentProps, FC} from "react";

export const NintendoSwitchIcon: FC<ComponentProps<'svg'>> = (props) => {
    return (
        <svg
            width="19"
            height="18"
            viewBox="0 0 24 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M15 0H9C7.34315 0 6 1.34315 6 3V13C6 14.6569 7.34315 16 9 16H15C16.6569 16 18 14.6569 18 13V3C18 1.34315 16.6569 0 15 0ZM8 3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3V13C16 13.5523 15.5523 14 15 14H9C8.44772 14 8 13.5523 8 13V3Z"
                fill="currentColor"
            />
            <circle cx="3" cy="4" r="2" fill="currentColor"/>
            <path
                d="M0 3C0 1.34315 1.34315 0 3 0H5C6.65685 0 8 1.34315 8 3V13C8 14.6569 6.65685 16 5 16H3C1.34315 16 0 14.6569 0 13V3ZM2 13C2 13.5523 2.44772 14 3 14H5C5.55228 14 6 13.5523 6 13V3C6 2.44772 5.55228 2 5 2H3C2.44772 2 2 2.44772 2 3V13Z"
                fill="currentColor"
            />
            <circle cx="21" cy="12" r="2" fill="currentColor"/>
            <path
                d="M16 3C16 1.34315 17.3431 0 19 0H21C22.6569 0 24 1.34315 24 3V13C24 14.6569 22.6569 16 21 16H19C17.3431 16 16 14.6569 16 13V3ZM18 13C18 13.5523 18.4477 14 19 14H21C21.5523 14 22 13.5523 22 13V3C22 2.44772 21.5523 2 21 2H19C18.4477 2 18 2.44772 18 3V13Z"
                fill="currentColor"
            />
        </svg>
    );
};