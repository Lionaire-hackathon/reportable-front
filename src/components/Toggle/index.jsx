import { useState, useParams } from "react";

const Toggle = ({ question, answer, isOpened }) => {
    const [isClicked, setIsClicked] = useState(isOpened);
    const handleClick = (e) => {
        setIsClicked(!isClicked);
    };

    return (
        <div
            className="bg-neutral-100 rounded-[14px] border-solid border-[#94cbc8] border-2 pt-[16px] pr-[39px] pb-[16px] pl-[39px] flex flex-col gap-2.5 items-center justify-center self-stretch shrink-0 h-auto relative"
            style={{
                boxShadow:
                    "var(--buttons-color-default-box-shadow,  0px 6px 16px 0px rgba(74, 58, 255, 0.19))",
            }}
        >
            {isClicked ? (
                <div className="flex flex-col gap-1.5 items-start justify-start shrink-0 w-[1232.66px] relative">
                    <div className="shrink-0 w-[1232.66px] h-auto relative">
                        <div className="text-neutral-800 text-left font-headings-typography-size-4-font-family text-headings-typography-size-4-font-size leading-headings-typography-size-4-line-height font-bold pt-[24px] pb-[24px] left-[44.75px] top-[51.75px] w-[715px]">
                            {question}
                        </div>
                        <svg
                            className="w-[50.66px] h-[50.66px] absolute left-[1182px] top-1/2 transform -translate-y-1/2 overflow-visible"
                            width="52"
                            height="51"
                            viewBox="0 0 52 51"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={handleClick}
                        >
                            <circle
                                cx="26"
                                cy="25.5"
                                r="25.3309"
                                fill="black"
                            />
                            <path
                                d="M17.7434 22.3904L26 30.6097L34.2566 22.3904"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div className="text-neutral-600 text-left font-paragraph-default-font-family text-paragraph-default-font-size leading-paragraph-default-line-height font-paragraph-default-font-weight relative pb-[24px] w-[1130px]">
                        {answer}
                    </div>
                </div>
            ) : (
                <div className="shrink-0 w-[1232.99px] h-auto relative">
                    <div className="text-neutral-800 text-left font-headings-typography-size-4-font-family text-headings-typography-size-4-font-size leading-headings-typography-size-4-line-height font-bold pt-[24px] pb-[24px] left-[44.75px] top-[51.75px] w-[715px]">
                        {question}
                    </div>
                    <svg
                        className="w-[50.66px] h-[50.66px] absolute right-[3.38%] left-[1182px] top-1/2 transform -translate-y-1/2 overflow-visible"
                        width="52"
                        height="52"
                        viewBox="0 0 52 52"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={handleClick}
                    >
                        <g filter="url(#filter0_d_28_412)">
                            <circle
                                cx="26.1654"
                                cy="26"
                                r="25.33"
                                fill="white"
                            />
                        </g>
                        <path
                            d="M23.0558 34.2563L31.2748 26L23.0558 17.7437"
                            stroke="#4A3AFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <defs>
                            <filter
                                id="filter0_d_28_412"
                                x="-15.1646"
                                y="-10.33"
                                width="82.66"
                                height="82.66"
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood
                                    floodOpacity="0"
                                    result="BackgroundImageFix"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy="5" />
                                <feGaussianBlur stdDeviation="8" />
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0.0323264 0 0 0 0 0.0598209 0 0 0 0 0.204167 0 0 0 0.06 0"
                                />
                                <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_28_412"
                                />
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_28_412"
                                    result="shape"
                                />
                            </filter>
                        </defs>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default Toggle;
