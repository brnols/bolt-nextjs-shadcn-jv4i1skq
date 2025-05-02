import TanStackQuery from "./TanStackQuery";

interface PrimeProviderProps {
    children: React.ReactNode;
}

const PrimeProvider = async ({ children }: PrimeProviderProps) => {
    return (
        <>
            <TanStackQuery>{children}</TanStackQuery>
        </>
    );
};

export default PrimeProvider;
