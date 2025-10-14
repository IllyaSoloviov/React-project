import type {FC, PropsWithChildren} from "react";
import QueryProvider from "@/providers/QueryProvider.tsx";
// import ToastifyProvider from "@/providers/ToastifyProvider.tsx";
// import I18nProvider from "@/providers/I18nextProvider.tsx";
import {ThemeProvider} from "@/providers/ThemeContextProvider.tsx";
import I18nProvider from "@/providers/I18nextProvider.tsx";

const Providers: FC<PropsWithChildren> = ({children}) => {
    return (
        <I18nProvider>
            <ThemeProvider>
                <QueryProvider>
                    {children}
                </QueryProvider>
            </ThemeProvider>
        </I18nProvider>
    );
};

export default Providers;