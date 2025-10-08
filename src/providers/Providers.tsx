import type {FC, PropsWithChildren} from "react";
import QueryProvider from "@/providers/QueryProvider.tsx";
// import ToastifyProvider from "@/providers/ToastifyProvider.tsx";
// import I18nProvider from "@/providers/I18nextProvider.tsx";
import {ThemeProvider} from "@/providers/ThemeContextProvider.tsx";

const Providers: FC<PropsWithChildren> = ({children}) => {
    return (
        <ThemeProvider>
            <QueryProvider>
                {children}
            </QueryProvider>
        </ThemeProvider>
    );
};

export default Providers;