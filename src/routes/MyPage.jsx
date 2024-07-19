import Header from "../components/common/Header";
import report from "../assets/images/report.png";
import { useEffect, useState, useRef } from "react";

const MyPage = () => {
    const [offset, setOffset] = useState(0);
    const scrollTimeoutRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setOffset(window.scrollY / 50);

            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            scrollTimeoutRef.current = setTimeout(() => {
                setOffset(0);
            }, 200); // 스크롤 이벤트가 멈춘 후 200ms 후에 setOffset(0) 호출
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const stickyStyle = {
        position: "absolute",
        top: `${offset + 200}px`, // 200px은 pt-[200px]과 동일하게 맞춤
        transition: "top 0.2s ease-out", // 부드러운 이동을 위해 추가
    };

    const handleScroll = (id) => {
        const element = document.getElementById(id);
        const yOffset = -200; // 원하는 오프셋 값 (px)
        const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
    };

    return (
        <>
            <Header className="fixed" />
            <div className="bg-[#cae5e4] w-[276px] h-screen top-0 fixed left-px -z-10 flex justify-center items-start pt-[200px] z-10">
                <div
                    style={stickyStyle}
                    className="flex flex-col gap-[50px] items-start justify-start sticky w-full"
                >
                    <div className="pr-10 flex flex-row gap-5 items-center justify-center self-stretch shrink-0 relative">
                        <svg
                            className="shrink-0 w-10 h-10 relative overflow-visible"
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5 18.3333C5 12.0483 5 8.905 6.95333 6.95333C8.905 5 12.0483 5 18.3333 5H21.6667C27.9517 5 31.095 5 33.0467 6.95333C35 8.905 35 12.0483 35 18.3333V21.6667C35 27.9517 35 31.095 33.0467 33.0467C31.095 35 27.9517 35 21.6667 35H18.3333C12.0483 35 8.905 35 6.95333 33.0467C5 31.095 5 27.9517 5 21.6667V18.3333Z"
                                fill="black"
                                fillOpacity="0.25"
                            />
                            <path
                                d="M20 23.3333C23.6819 23.3333 26.6667 20.3486 26.6667 16.6667C26.6667 12.9848 23.6819 10 20 10C16.3181 10 13.3333 12.9848 13.3333 16.6667C13.3333 20.3486 16.3181 23.3333 20 23.3333Z"
                                fill="black"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M31.5767 33.755C31.5901 33.8405 31.5743 33.9281 31.532 34.0037C31.4897 34.0792 31.4233 34.1384 31.3433 34.1717C29.3417 35 26.3933 35 21.6667 35H18.3333C13.6083 35 10.6583 35 8.65668 34.17C8.57706 34.1368 8.51085 34.0779 8.46857 34.0027C8.42629 33.9275 8.41037 33.8403 8.42335 33.755C9.13835 28.82 14.0483 25 20 25C25.9517 25 30.8617 28.82 31.5767 33.755Z"
                                fill="black"
                            />
                        </svg>
                        <div className="text-[#1e6d69] text-left font-semibold text-xlrelative">
                            Tachyon{" "}
                        </div>
                    </div>
                    <div className="flex flex-col gap-10 items-center justify-center self-stretch shrink-0 relative">
                        <div className="flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 relative">
                            <svg
                                className="shrink-0 w-6 h-6 relative overflow-visible"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_111_2766)">
                                    <path
                                        d="M17.63 6.34C17.27 5.83 16.67 5.5 16 5.5L5 5.51C3.9 5.51 3 6.4 3 7.5V17.5C3 18.6 3.9 19.49 5 19.49L16 19.5C16.67 19.5 17.27 19.17 17.63 18.66L22 12.5L17.63 6.34Z"
                                        fill="#1E6D69"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_111_2766">
                                        <rect
                                            width="24"
                                            height="24"
                                            fill="white"
                                            transform="translate(0 0.5)"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                            <div
                                onClick={() => {
                                    handleScroll("my-profile");
                                }}
                                className="cursor-pointer text-[rgba(30,109,105,0.93)] hover:text-[#848484] text-left font-['Audiowide-Regular',_sans-serif] text-xl font-normal relative w-[152px] "
                            >
                                My profile{" "}
                            </div>
                        </div>
                        <div className="flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 relative">
                            <svg
                                className="shrink-0 w-6 h-6"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_111_2771)">
                                    <path
                                        d="M17.63 6.34C17.27 5.83 16.67 5.5 16 5.5L5 5.51C3.9 5.51 3 6.4 3 7.5V17.5C3 18.6 3.9 19.49 5 19.49L16 19.5C16.67 19.5 17.27 19.17 17.63 18.66L22 12.5L17.63 6.34Z"
                                        fill="#1E6D69"
                                        className="hover:fill-[#1E6D69]"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_111_2771">
                                        <rect
                                            width="24"
                                            height="24"
                                            fill="white"
                                            transform="translate(0 0.5)"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                            <div
                                className="cursor-pointer text-[rgba(30,109,105,0.93)] hover:text-[#848484] text-left font-['Audiowide-Regular',_sans-serif] text-xl font-normal relative w-[152px]"
                                onClick={() =>
                                    document
                                        .getElementById("my-reports")
                                        .scrollIntoView({ behavior: "smooth" })
                                }
                            >
                                My reports{" "}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white top-0 pb-[33px] ml-[276px] mt-[104px] flex flex-col flex-grow gap-[120px] items-start justify-start shrink-0 h-auto relative">
                <div className="flex flex-col gap-[39px] items-center justify-start flex-grow pt-8 w-full h-auto relative ">
                    <div className="flex flex-row gap-4 items-center justify-start w-[80%]">
                        <div
                            id="my-profile"
                            className="text-[#000000] text-left font-['Inter-Medium',_sans-serif] text-[32px] leading-[160%] font-medium relative self-stretch flex items-center justify-start"
                        >
                            My Profile{" "}
                        </div>
                        <svg
                            className="cursor-pointer shrink-0 realtive"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.05 19.95L19.95 16.05C20.225 15.775 20.3625 15.425 20.3625 15C20.3625 14.575 20.225 14.225 19.95 13.95L16.0125 10.0125C15.7375 9.7375 15.394 9.606 14.982 9.618C14.569 9.631 14.225 9.775 13.95 10.05C13.675 10.325 13.5375 10.675 13.5375 11.1C13.5375 11.525 13.675 11.875 13.95 12.15L15.3 13.5H10.4625C10.0375 13.5 9.6875 13.6435 9.4125 13.9305C9.1375 14.2185 9 14.575 9 15C9 15.425 9.144 15.781 9.432 16.068C9.719 16.356 10.075 16.5 10.5 16.5H15.3L13.9125 17.8875C13.6375 18.1625 13.506 18.5065 13.518 18.9195C13.531 19.3315 13.675 19.675 13.95 19.95C14.225 20.225 14.575 20.3625 15 20.3625C15.425 20.3625 15.775 20.225 16.05 19.95ZM15 30C12.925 30 10.975 29.606 9.15 28.818C7.325 28.031 5.7375 26.9625 4.3875 25.6125C3.0375 24.2625 1.969 22.675 1.182 20.85C0.394 19.025 0 17.075 0 15C0 12.925 0.394 10.975 1.182 9.15C1.969 7.325 3.0375 5.7375 4.3875 4.3875C5.7375 3.0375 7.325 1.9685 9.15 1.1805C10.975 0.3935 12.925 0 15 0C17.075 0 19.025 0.3935 20.85 1.1805C22.675 1.9685 24.2625 3.0375 25.6125 4.3875C26.9625 5.7375 28.031 7.325 28.818 9.15C29.606 10.975 30 12.925 30 15C30 17.075 29.606 19.025 28.818 20.85C28.031 22.675 26.9625 24.2625 25.6125 25.6125C24.2625 26.9625 22.675 28.031 20.85 28.818C19.025 29.606 17.075 30 15 30Z"
                                fill="black"
                            />
                        </svg>
                    </div>
                    <div className="bg-white rounded-[10px] border-solid border-[#d9d9d9] border p-[40px] flex flex-row justify-evenly items-center shrink-0 w-[80%] h-auto relative">
                        <div className="flex flex-col gap-[60px] items-center justify-start shrink-0 relative w-[45%]">
                            <svg
                                className="rounded-[20px] flex flex-row gap-2.5 items-center justify-start shrink-0 w-36 h-36 relative "
                                width="192"
                                height="192"
                                viewBox="0 0 192 192"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    width="192"
                                    height="192"
                                    rx="20"
                                    fill="#A2A2A2"
                                />
                                <path
                                    d="M96 32C104.487 32 112.626 35.3714 118.627 41.3726C124.629 47.3737 128 55.5131 128 64C128 72.4869 124.629 80.6263 118.627 86.6274C112.626 92.6286 104.487 96 96 96C87.5131 96 79.3737 92.6286 73.3726 86.6274C67.3714 80.6263 64 72.4869 64 64C64 55.5131 67.3714 47.3737 73.3726 41.3726C79.3737 35.3714 87.5131 32 96 32ZM96 112C131.36 112 160 126.32 160 144V160H32V144C32 126.32 60.64 112 96 112Z"
                                    fill="white"
                                />
                            </svg>
                            <div className="text-[#939393] text-center font-['Roboto-Bold',_sans-serif] text-[30px] font-bold relative self-stretch">
                                환영합니다 Tachyon 님!{" "}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[36px] items-center justify-evenly shrink-0 relative w-[45%]">
                            <div className="bg-[#F2F2F2] rounded-2xl pt-[18px] pr-5 pb-[18px] pl-7 flex flex-row gap-6 items-center justify-start self-stretch shrink-0 relative w-full">
                                <div className="flex items-center justify-center w-[24px] h-[24px]">
                                    <svg
                                        className="h-[auto]"
                                        width="14"
                                        height="17"
                                        viewBox="0 0 14 17"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M11.4117 4.57571C11.4117 7.02324 9.44929 8.98576 7.00004 8.98576C4.55162 8.98576 2.58839 7.02324 2.58839 4.57571C2.58839 2.12819 4.55162 0.166504 7.00004 0.166504C9.44929 0.166504 11.4117 2.12819 11.4117 4.57571ZM7.00004 16.8332C3.38535 16.8332 0.333374 16.2457 0.333374 13.979C0.333374 11.7115 3.40453 11.1448 7.00004 11.1448C10.6156 11.1448 13.6667 11.7323 13.6667 13.999C13.6667 16.2665 10.5956 16.8332 7.00004 16.8332Z"
                                            fill="#212121"
                                        />
                                    </svg>
                                </div>
                                <div
                                    className="text-[#212121] text-left font-body-xlarge-semibold-font-family text-body-xlarge-semibold-font-size leading-body-xlarge-semibold-line-height font-body-xlarge-semibold-font-weight relative flex-1 flex items-center justify-start"
                                    style={{
                                        letterSpacing:
                                            "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                    }}
                                >
                                    Tachyon{" "}
                                </div>
                            </div>
                            <div className="bg-[#F2F2F2] rounded-2xl pt-[18px] pr-5 pb-[18px] pl-7 flex flex-row gap-6 items-center justify-start self-stretch shrink-0 relative w-full">
                                <div className="flex items-center justify-center w-[24px] h-[24px]">
                                    <svg
                                        className="h-[auto]"
                                        width="18"
                                        height="15"
                                        viewBox="0 0 18 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M13.1162 0C14.2337 0 15.3087 0.441667 16.0995 1.23417C16.8912 2.025 17.3337 3.09167 17.3337 4.20833V10.7917C17.3337 13.1167 15.442 15 13.1162 15H4.88366C2.55783 15 0.666992 13.1167 0.666992 10.7917V4.20833C0.666992 1.88333 2.54949 0 4.88366 0H13.1162ZM14.442 5.45L14.5087 5.38333C14.7078 5.14167 14.7078 4.79167 14.4995 4.55C14.3837 4.42583 14.2245 4.35 14.0587 4.33333C13.8837 4.32417 13.717 4.38333 13.5912 4.5L9.83366 7.5C9.35033 7.90083 8.65783 7.90083 8.16699 7.5L4.41699 4.5C4.15783 4.30833 3.79949 4.33333 3.58366 4.55833C3.35866 4.78333 3.33366 5.14167 3.52449 5.39167L3.63366 5.5L7.42533 8.45833C7.89199 8.825 8.45783 9.025 9.05033 9.025C9.64116 9.025 10.217 8.825 10.6828 8.45833L14.442 5.45Z"
                                            fill="#212121"
                                        />
                                    </svg>
                                </div>
                                <div
                                    className="text-[#212121] text-left font-body-xlarge-semibold-font-family text-body-xlarge-semibold-font-size leading-body-xlarge-semibold-line-height font-body-xlarge-semibold-font-weight relative flex-1 flex items-center justify-start"
                                    style={{
                                        letterSpacing:
                                            "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                    }}
                                >
                                    tachyon@domain.com
                                </div>
                            </div>
                            <div className="bg-[#F2F2F2] rounded-2xl pt-[18px] pr-5 pb-[18px] pl-7 flex flex-row gap-6 items-center justify-start self-stretch shrink-0 relative w-full">
                                <div className="flex items-center justify-center w-[24px] h-[24px]">
                                    <svg
                                        className="h-auto "
                                        width="22"
                                        height="18"
                                        viewBox="0 0 22 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11 0L0 6L11 12L20 7.09V14H22V6M4 10.18V14.18L11 18L18 14.18V10.18L11 14L4 10.18Z"
                                            fill="black"
                                        />
                                    </svg>
                                </div>
                                <div
                                    className="text-[#212121] text-left font-body-xlarge-semibold-font-family text-body-xlarge-semibold-font-size leading-body-xlarge-semibold-line-height font-body-xlarge-semibold-font-weight relative flex-1 flex items-center justify-start"
                                    style={{
                                        letterSpacing:
                                            "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                    }}
                                >
                                    2024-12345{" "}
                                </div>
                            </div>
                            <div className="bg-[#F2F2F2] rounded-2xl pt-[18px] pr-5 pb-[18px] pl-7 flex flex-row gap-6 items-center justify-start self-stretch shrink-0 relative w-full">
                                <div className="flex items-center justify-center w-[24px] h-[24px]">
                                    <svg
                                        className="h-auto"
                                        width="20"
                                        height="21"
                                        viewBox="0 0 20 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_111_2857)">
                                            <path
                                                d="M12.9166 1.3335H6.24996C5.09996 1.3335 4.16663 2.26683 4.16663 3.41683V17.5835C4.16663 18.7335 5.09996 19.6668 6.24996 19.6668H12.9166C14.0666 19.6668 15 18.7335 15 17.5835V3.41683C15 2.26683 14.0666 1.3335 12.9166 1.3335ZM9.58329 18.8335C8.89163 18.8335 8.33329 18.2752 8.33329 17.5835C8.33329 16.8918 8.89163 16.3335 9.58329 16.3335C10.275 16.3335 10.8333 16.8918 10.8333 17.5835C10.8333 18.2752 10.275 18.8335 9.58329 18.8335ZM13.3333 15.5002H5.83329V3.8335H13.3333V15.5002Z"
                                                fill="black"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_111_2857">
                                                <rect
                                                    width="20"
                                                    height="20"
                                                    fill="white"
                                                    transform="translate(0 0.5)"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div
                                    className="text-[#212121] text-left font-body-xlarge-semibold-font-family text-body-xlarge-semibold-font-size leading-body-xlarge-semibold-line-height font-body-xlarge-semibold-font-weight relative flex-1 flex items-center justify-start"
                                    style={{
                                        letterSpacing:
                                            "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                    }}
                                >
                                    +82 10 1234 5678{" "}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-[39px] items-center justify-start flex-grow w-full relative ">
                    <div className="flex flex-col gap-4 items-center justify-start w-[80%]">
                        <div
                            id="my-reports"
                            className="text-[#000000] text-left font-['Inter-Medium',_sans-serif] text-[32px] leading-[160%] font-medium relative self-stretch flex items-center justify-start"
                        >
                            My Reports{" "}
                        </div>
                        <div className="flex flex-wrap justify-start items-start gap-6 w-full">
                            <div className="bg-[#FAFAFA] rounded-2xl border-solid border-greyscale-100 border-2 p-5 flex flex-col gap-4 items-start justify-start shrink-0 w-[204px] h-[253px] relative">
                                <div className="bg-others-green rounded-2xl p-3 flex flex-row gap-3 items-center justify-center shrink-0 relative">
                                    <img
                                        className="shrink-0 w-10 h-10 relative"
                                        style={{ objectFit: "cover" }}
                                        src={report}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative">
                                    <div className="text-[#212121] text-left font-bold text-lg font-urbanist leading-[1.6] relative self-stretch flex items-center justify-start">
                                        Write an Articles{" "}
                                    </div>
                                    <div
                                        className="text-greyscale-700 text-left font-body-medium-regular-font-family text-body-medium-regular-font-size leading-body-medium-regular-line-height font-body-medium-regular-font-weight relative self-stretch flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-medium-regular-letter-spacing, 0.2px)",
                                        }}
                                    >
                                        Generate well-written articles on any
                                        topic you want.{" "}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#FAFAFA] rounded-2xl border-solid border-greyscale-100 border-2 p-5 flex flex-col gap-4 items-start justify-start shrink-0 w-[204px] h-[253px] relative">
                                <div className="bg-others-green rounded-2xl p-3 flex flex-row gap-3 items-center justify-center shrink-0 relative">
                                    <img
                                        className="shrink-0 w-10 h-10 relative"
                                        style={{ objectFit: "cover" }}
                                        src={report}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative">
                                    <div className="text-[#212121] text-left font-bold text-lg font-urbanist leading-[1.6] relative self-stretch flex items-center justify-start">
                                        Write an Articles{" "}
                                    </div>
                                    <div
                                        className="text-greyscale-700 text-left font-body-medium-regular-font-family text-body-medium-regular-font-size leading-body-medium-regular-line-height font-body-medium-regular-font-weight relative self-stretch flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-medium-regular-letter-spacing, 0.2px)",
                                        }}
                                    >
                                        Generate well-written articles on any
                                        topic you want.{" "}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#FAFAFA] rounded-2xl border-solid border-greyscale-100 border-2 p-5 flex flex-col gap-4 items-start justify-start shrink-0 w-[204px] h-[253px] relative">
                                <div className="bg-others-green rounded-2xl p-3 flex flex-row gap-3 items-center justify-center shrink-0 relative">
                                    <img
                                        className="shrink-0 w-10 h-10 relative"
                                        style={{ objectFit: "cover" }}
                                        src={report}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative">
                                    <div className="text-[#212121] text-left font-bold text-lg font-urbanist leading-[1.6] relative self-stretch flex items-center justify-start">
                                        Write an Articles{" "}
                                    </div>
                                    <div
                                        className="text-greyscale-700 text-left font-body-medium-regular-font-family text-body-medium-regular-font-size leading-body-medium-regular-line-height font-body-medium-regular-font-weight relative self-stretch flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-medium-regular-letter-spacing, 0.2px)",
                                        }}
                                    >
                                        Generate well-written articles on any
                                        topic you want.{" "}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#FAFAFA] rounded-2xl border-solid border-greyscale-100 border-2 p-5 flex flex-col gap-4 items-start justify-start shrink-0 w-[204px] h-[253px] relative">
                                <div className="bg-others-green rounded-2xl p-3 flex flex-row gap-3 items-center justify-center shrink-0 relative">
                                    <img
                                        className="shrink-0 w-10 h-10 relative"
                                        style={{ objectFit: "cover" }}
                                        src={report}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative">
                                    <div className="text-[#212121] text-left font-bold text-lg font-urbanist leading-[1.6] relative self-stretch flex items-center justify-start">
                                        Write an Articles{" "}
                                    </div>
                                    <div
                                        className="text-greyscale-700 text-left font-body-medium-regular-font-family text-body-medium-regular-font-size leading-body-medium-regular-line-height font-body-medium-regular-font-weight relative self-stretch flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-medium-regular-letter-spacing, 0.2px)",
                                        }}
                                    >
                                        Generate well-written articles on any
                                        topic you want.{" "}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#FAFAFA] rounded-2xl border-solid border-greyscale-100 border-2 p-5 flex flex-col gap-4 items-start justify-start shrink-0 w-[204px] h-[253px] relative">
                                <div className="bg-others-green rounded-2xl p-3 flex flex-row gap-3 items-center justify-center shrink-0 relative">
                                    <img
                                        className="shrink-0 w-10 h-10 relative"
                                        style={{ objectFit: "cover" }}
                                        src={report}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative">
                                    <div className="text-[#212121] text-left font-bold text-lg font-urbanist leading-[1.6] relative self-stretch flex items-center justify-start">
                                        Write an Articles{" "}
                                    </div>
                                    <div
                                        className="text-greyscale-700 text-left font-body-medium-regular-font-family text-body-medium-regular-font-size leading-body-medium-regular-line-height font-body-medium-regular-font-weight relative self-stretch flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-medium-regular-letter-spacing, 0.2px)",
                                        }}
                                    >
                                        Generate well-written articles on any
                                        topic you want.{" "}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#FAFAFA] rounded-2xl border-solid border-greyscale-100 border-2 p-5 flex flex-col gap-4 items-start justify-start shrink-0 w-[204px] h-[253px] relative">
                                <div className="bg-others-green rounded-2xl p-3 flex flex-row gap-3 items-center justify-center shrink-0 relative">
                                    <img
                                        className="shrink-0 w-10 h-10 relative"
                                        style={{ objectFit: "cover" }}
                                        src={report}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative">
                                    <div className="text-[#212121] text-left font-bold text-lg font-urbanist leading-[1.6] relative self-stretch flex items-center justify-start">
                                        Write an Articles{" "}
                                    </div>
                                    <div
                                        className="text-greyscale-700 text-left font-body-medium-regular-font-family text-body-medium-regular-font-size leading-body-medium-regular-line-height font-body-medium-regular-font-weight relative self-stretch flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-medium-regular-letter-spacing, 0.2px)",
                                        }}
                                    >
                                        Generate well-written articles on any
                                        topic you want.{" "}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#FAFAFA] rounded-2xl border-solid border-greyscale-100 border-2 p-5 flex flex-col gap-4 items-start justify-start shrink-0 w-[204px] h-[253px] relative">
                                <div className="bg-others-green rounded-2xl p-3 flex flex-row gap-3 items-center justify-center shrink-0 relative">
                                    <img
                                        className="shrink-0 w-10 h-10 relative"
                                        style={{ objectFit: "cover" }}
                                        src={report}
                                    />
                                </div>
                                <div className="flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative">
                                    <div className="text-[#212121] text-left font-bold text-lg font-urbanist leading-[1.6] relative self-stretch flex items-center justify-start">
                                        Write an Articles{" "}
                                    </div>
                                    <div
                                        className="text-greyscale-700 text-left font-body-medium-regular-font-family text-body-medium-regular-font-size leading-body-medium-regular-line-height font-body-medium-regular-font-weight relative self-stretch flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-medium-regular-letter-spacing, 0.2px)",
                                        }}
                                    >
                                        Generate well-written articles on any
                                        topic you want.{" "}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyPage;

/*
                    <div className="flex flex-col gap-14 items-start justify-start w-full relative">
                        <div className="text-[#000000] text-left font-['Inter-Medium',_sans-serif] text-[32px] leading-[160%] font-medium relative self-stretch flex items-center justify-start">
                            My Reports{" "}
                        </div>
                        <div className="flex flex-col gap-[72px] items-start justify-start self-stretch shrink-0 relative">
                            <div className="flex flex-row gap-[57px] items-center justify-start self-stretch shrink-0 relative">
                                <div className="bg-[#FAFAFA] rounded-2xl border-solid border-greyscale-100 border-2 p-5 flex flex-col gap-4 items-start justify-start shrink-0 w-[204px] h-[253px] relative">
                                    <div className="bg-others-green rounded-2xl p-3 flex flex-row gap-3 items-center justify-center shrink-0 relative">
                                        <img
                                            className="shrink-0 w-10 h-10 relative"
                                            style={{ objectFit: "cover" }}
                                            src={report}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative">
                                        <div className="text-[#212121] text-left font-bold text-lg font-urbanist leading-[1.6] relative self-stretch flex items-center justify-start">
                                            Write an Articles{" "}
                                        </div>
                                        <div
                                            className="text-greyscale-700 text-left font-body-medium-regular-font-family text-body-medium-regular-font-size leading-body-medium-regular-line-height font-body-medium-regular-font-weight relative self-stretch flex items-center justify-start"
                                            style={{
                                                letterSpacing:
                                                    "var(--body-medium-regular-letter-spacing, 0.2px)",
                                            }}
                                        >
                                            Generate well-written articles on
                                            any topic you want.{" "}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#FAFAFA] rounded-2xl border-solid border-greyscale-100 border-2 p-5 flex flex-col gap-4 items-start justify-start shrink-0 w-[204px] h-[253px] relative">
                                    <div className="bg-[#6ce6e1] rounded-2xl p-3 flex flex-row gap-3 items-center justify-center shrink-0 relative">
                                        <img
                                            className="shrink-0 w-10 h-10 relative"
                                            style={{ objectFit: "cover" }}
                                            src={report}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative">
                                        <div className="text-[#212121] text-left font-bold text-lg font-urbanist leading-[1.6] relative self-stretch flex items-center justify-start">
                                            Write an Articles{" "}
                                        </div>
                                        <div
                                            className="text-greyscale-700 text-left font-body-medium-regular-font-family text-body-medium-regular-font-size leading-body-medium-regular-line-height font-body-medium-regular-font-weight relative self-stretch flex items-center justify-start"
                                            style={{
                                                letterSpacing:
                                                    "var(--body-medium-regular-letter-spacing, 0.2px)",
                                            }}
                                        >
                                            Generate well-written articles on
                                            any topic you want.{" "}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#FAFAFA] rounded-2xl border-solid border-greyscale-100 border-2 p-5 flex flex-col gap-4 items-start justify-start shrink-0 w-[204px] h-[253px] relative">
                                    <div className="bg-[#e66c91] rounded-2xl p-3 flex flex-row gap-3 items-center justify-center shrink-0 relative">
                                        <img
                                            className="shrink-0 w-10 h-10 relative"
                                            style={{ objectFit: "cover" }}
                                            src={report}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative">
                                        <div className="text-[#212121] text-left font-bold text-lg font-urbanist leading-[1.6] relative self-stretch flex items-center justify-start">
                                            Write an Articles{" "}
                                        </div>
                                        <div
                                            className="text-greyscale-700 text-left font-body-medium-regular-font-family text-body-medium-regular-font-size leading-body-medium-regular-line-height font-body-medium-regular-font-weight relative self-stretch flex items-center justify-start"
                                            style={{
                                                letterSpacing:
                                                    "var(--body-medium-regular-letter-spacing, 0.2px)",
                                            }}
                                        >
                                            Generate well-written articles on
                                            any topic you want.{" "}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#FAFAFA] rounded-2xl border-solid border-greyscale-100 border-2 p-5 flex flex-col gap-4 items-start justify-start shrink-0 w-[204px] h-[253px] relative">
                                    <div className="bg-[#e6b56c] rounded-2xl p-3 flex flex-row gap-3 items-center justify-center shrink-0 relative">
                                        <img
                                            className="shrink-0 w-10 h-10 relative"
                                            style={{ objectFit: "cover" }}
                                            src={report}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative">
                                        <div className="text-[#212121] text-left font-bold text-lg font-urbanist leading-[1.6] relative self-stretch flex items-center justify-start">
                                            Write an Articles{" "}
                                        </div>
                                        <div
                                            className="text-greyscale-700 text-left font-body-medium-regular-font-family text-body-medium-regular-font-size leading-body-medium-regular-line-height font-body-medium-regular-font-weight relative self-stretch flex items-center justify-start"
                                            style={{
                                                letterSpacing:
                                                    "var(--body-medium-regular-letter-spacing, 0.2px)",
                                            }}
                                        >
                                            Generate well-written articles on
                                            any topic you want.{" "}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row gap-[57px] items-center justify-start self-stretch shrink-0 relative">
                                <div className="bg-[#FAFAFA] rounded-2xl border-solid border-greyscale-100 border-2 p-5 flex flex-col gap-4 items-start justify-start shrink-0 w-[204px] h-[253px] relative">
                                    <div className="bg-[#af4a4a] rounded-2xl p-3 flex flex-row gap-3 items-center justify-center shrink-0 relative">
                                        <img
                                            className="shrink-0 w-10 h-10 relative"
                                            style={{ objectFit: "cover" }}
                                            src={report}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative">
                                        <div className="text-[#212121] text-left font-bold text-lg font-urbanist leading-[1.6] relative self-stretch flex items-center justify-start">
                                            Write an Articles{" "}
                                        </div>
                                        <div
                                            className="text-greyscale-700 text-left font-body-medium-regular-font-family text-body-medium-regular-font-size leading-body-medium-regular-line-height font-body-medium-regular-font-weight relative self-stretch flex items-center justify-start"
                                            style={{
                                                letterSpacing:
                                                    "var(--body-medium-regular-letter-spacing, 0.2px)",
                                            }}
                                        >
                                            Generate well-written articles on
                                            any topic you want.{" "}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#FAFAFA] rounded-2xl border-solid border-greyscale-100 border-2 p-5 flex flex-col gap-4 items-start justify-start shrink-0 w-[204px] h-[253px] relative">
                                    <div className="bg-[#e6986c] rounded-2xl p-3 flex flex-row gap-3 items-center justify-center shrink-0 relative">
                                        <img
                                            className="shrink-0 w-10 h-10 relative"
                                            style={{ objectFit: "cover" }}
                                            src={report}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative">
                                        <div className="text-[#212121] text-left font-bold text-lg font-urbanist leading-[1.6] relative self-stretch flex items-center justify-start">
                                            Write an Articles{" "}
                                        </div>
                                        <div
                                            className="text-greyscale-700 text-left font-body-medium-regular-font-family text-body-medium-regular-font-size leading-body-medium-regular-line-height font-body-medium-regular-font-weight relative self-stretch flex items-center justify-start"
                                            style={{
                                                letterSpacing:
                                                    "var(--body-medium-regular-letter-spacing, 0.2px)",
                                            }}
                                        >
                                            Generate well-written articles on
                                            any topic you want.{" "}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#FAFAFA] rounded-2xl border-solid border-greyscale-100 border-2 p-5 flex flex-col gap-4 items-start justify-start shrink-0 w-[204px] h-[253px] relative">
                                    <div className="bg-[#d5e66c] rounded-2xl p-3 flex flex-row gap-3 items-center justify-center shrink-0 relative">
                                        <img
                                            className="shrink-0 w-10 h-10 relative"
                                            style={{ objectFit: "cover" }}
                                            src={report}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative">
                                        <div className="text-greyscale-900 text-left font-h6-bold-font-family text-h6-bold-font-size leading-h6-bold-line-height font-h6-bold-font-weight relative self-stretch flex items-center justify-start">
                                            Write an Articles{" "}
                                        </div>
                                        <div
                                            className="text-greyscale-700 text-left font-body-medium-regular-font-family text-body-medium-regular-font-size leading-body-medium-regular-line-height font-body-medium-regular-font-weight relative self-stretch flex items-center justify-start"
                                            style={{
                                                letterSpacing:
                                                    "var(--body-medium-regular-letter-spacing, 0.2px)",
                                            }}
                                        >
                                            Generate well-written articles on
                                            any topic you want.{" "}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#FAFAFA] rounded-2xl border-solid border-greyscale-100 border-2 p-5 flex flex-col gap-4 items-start justify-start shrink-0 w-[204px] h-[253px] relative">
                                    <div className="bg-[#a9e66c] rounded-2xl p-3 flex flex-row gap-3 items-center justify-center shrink-0 relative">
                                        <img
                                            className="shrink-0 w-10 h-10 relative"
                                            style={{ objectFit: "cover" }}
                                            src={report}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative">
                                        <div className="text-greyscale-900 text-left font-h6-bold-font-family text-h6-bold-font-size leading-h6-bold-line-height font-h6-bold-font-weight relative self-stretch flex items-center justify-start">
                                            Write an Articles{" "}
                                        </div>
                                        <div
                                            className="text-greyscale-700 text-left font-body-medium-regular-font-family text-body-medium-regular-font-size leading-body-medium-regular-line-height font-body-medium-regular-font-weight relative self-stretch flex items-center justify-start"
                                            style={{
                                                letterSpacing:
                                                    "var(--body-medium-regular-letter-spacing, 0.2px)",
                                            }}
                                        >
                                            Generate well-written articles on
                                            any topic you want.{" "}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
*/
