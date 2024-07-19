import report from "../../assets/images/report.png";

const ReportIcon = ({ documentType, documentTitle, color }) => {
    return (
        <>
            <div className="cursor-pointer bg-[#FAFAFA] rounded-2xl border-solid border-greyscale-100 border-2 p-5 flex flex-col gap-4 items-start justify-start shrink-0 w-[204px] h-[253px] relative">
                <div
                    style={{ backgroundColor: color }}
                    className="rounded-2xl p-3 flex flex-row gap-3 items-center justify-center shrink-0 relative"
                >
                    <img
                        className="shrink-0 w-10 h-10 relative"
                        style={{ objectFit: "cover" }}
                        src={report}
                    />
                </div>
                <div className="flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative">
                    <div className="text-[#212121] text-left font-bold text-lg font-urbanist leading-[1.6] relative self-stretch flex items-center justify-start">
                        {documentType}
                    </div>
                    <div
                        className="multiline-truncate text-greyscale-700 text-left font-body-medium-regular-font-family text-body-medium-regular-font-size leading-body-medium-regular-line-height font-body-medium-regular-font-weight relative self-stretch flex items-center justify-start"
                        style={{
                            letterSpacing:
                                "var(--body-medium-regular-letter-spacing, 0.2px)",
                        }}
                    >
                        {documentTitle}{" "}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReportIcon;
