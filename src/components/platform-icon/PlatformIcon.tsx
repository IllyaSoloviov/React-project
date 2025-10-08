import { PCIcon } from '@/assets/icons/platform/PCIcon';
import { PlaystationIcon } from '@/assets/icons/platform/PlaystationIcon';
import { XboxIcon } from '@/assets/icons/platform/XboxIcon';
import {AndroidIcon} from "@/assets/icons/platform/AndroidIcon.tsx";
import {NintendoSwitchIcon} from "@/assets/icons/platform/NintendoSwitchIcon.tsx";
import {AppleIcon} from "@/assets/icons/platform/AppleIcon.tsx";


interface PlatformIconProps {
    slug: string;
}

const PlatformIcon = ({ slug }: PlatformIconProps) => {

    const iconProps = {
        className: "w-5 h-5 text-text hover:text-text-secondary transition-colors"
    };

    switch (slug) {
        case "pc":
            return <PCIcon {...iconProps} />;

        case "playstation":
            return <PlaystationIcon {...iconProps} />;

        case "xbox":
            return <XboxIcon {...iconProps} />;

        case "nintendo":
            return <NintendoSwitchIcon {...iconProps}/>;

        case "ios":
            return <AppleIcon {...iconProps}/>;

        case "android":
            return <AndroidIcon {...iconProps}/>

        default:
            return null;
    }
};

export default PlatformIcon;