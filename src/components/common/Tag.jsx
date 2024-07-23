const Tag = ({ content = "+", handleContentDelete = null, isReadOnly }) => {
    return (
        <div
            className={`${
                isReadOnly
                    ? "bg-[#f5f5f5] border-[#c5c5c5]"
                    : "bg-[#e7FAF5] border-[#B5D0C9]"
            } rounded-[50px] border-solid border-[#B5D0C9] border pt-0.5 pr-2 pb-0.5 pl-2 flex flex-row gap-1 items-center justify-center relative shrink-0 group`}
        >
            <div
                className={`${
                    isReadOnly ? "text-[#9e9e9e]" : "text-[#21725E]"
                } text-left text-[12px] relative`}
            >
                {content}{" "}
            </div>
            <button
                type="button"
                className={`hidden ${isReadOnly ? "" : "group-hover:block"}`}
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
