const SkeletonCard = () => {
    return (
        <div className="animate-pulse min-w-[250px] bg-bg-secondary/70 rounded-xl overflow-hidden shadow-md ">
            <div className="w-full h-48 bg-bg3/60 "></div>
            <div className="p-3 space-y-2">
                <div className="h-4 bg-bg3/80 rounded w-3/4"></div>
                <div className="h-3 bg-bg3/60 rounded w-1/2"></div>
                <div className="h-3 bg-bg3/40 rounded w-2/3"></div>
            </div>
        </div>
    );
};

export default SkeletonCard;