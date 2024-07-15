const Tag = ({ content = "+", handleContentDelete }) => {
    return (
        <div
            className={
                "bg-[#e7FAF5] rounded-[50px] border-solid border-[#B5D0C9] border pt-0.5 pr-2 pb-0.5 pl-2 flex flex-row gap-1 items-center justify-center relative shrink-0 group"
            }
        >
            <div className="text-[#21725E] text-left text-[12px] relative">
                {content}{" "}
            </div>
            <button
                type="button"
                className="hidden group-hover:block"
                onClick={() => {
                    handleContentDelete(content);
                }}
            >
                -
            </button>
        </div>
    );
};

export default Tag;
