import likelionsnu from "../../assets/images/Likelionsnu.png";
import instagramLogo from "../../assets/images/Instagram.png";
import twitterLogo from "../../assets/images/TwitterX.png";

const Footer = () => {
    return (
        <div className="bg-[#ffffff] px-36 py-24 flex flex-col gap-2.5 items-center justify-center relative overflow-hidden ">
            <div className="flex flex-col gap-[30px] items-center justify-start self-stretch shrink-0 relative">
                <div className="border-solid border-[#cfcfcf] border-t border-b pt-[25px] pb-[25px] pl-2.5 flex flex-row items-center justify-between shrink-0 relative">
                    <div className="flex flex-row gap-[15px] items-center justify-start shrink-0 relative">
                        <div className="flex flex-col gap-3.5 items-start justify-start shrink-0 w-[200px] h-[200px] relative">
                            <div className="flex flex-col gap-3.5 items-start justify-start self-stretch shrink-0 relative">
                                <div className="text-dark text-left font-['Inter-Bold',_sans-serif] text-base leading-7 font-bold relative self-stretch">
                                    제품{" "}
                                </div>
                                <div
                                    className="text-dark text-left font-['Inter-Regular',_sans-serif] text-base font-normal relative self-stretch"
                                    style={{ opacity: "0.5" }}
                                >
                                    이용약관{" "}
                                </div>
                                <div
                                    className="text-dark text-left font-['Inter-Regular',_sans-serif] text-base font-normal relative self-stretch"
                                    style={{ opacity: "0.5" }}
                                >
                                    개인정보 보호정책{" "}
                                </div>
                                <div
                                    className="text-dark text-left font-['Inter-Regular',_sans-serif] text-base font-normal relative self-stretch"
                                    style={{ opacity: "0.5" }}
                                >
                                    쿠키 정책{" "}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3.5 items-start justify-start shrink-0 w-[200px] h-[200px] relative">
                            <div className="flex flex-col gap-3.5 items-start justify-start self-stretch shrink-0 relative">
                                <div className="text-dark text-left font-['Inter-Bold',_sans-serif] text-base leading-7 font-bold relative self-stretch">
                                    정보{" "}
                                </div>
                                <div
                                    className="text-dark text-left font-['Inter-Regular',_sans-serif] text-base font-normal relative self-stretch"
                                    style={{ opacity: "0.5" }}
                                >
                                    자주 묻는 질문{" "}
                                </div>
                                <div
                                    className="text-dark text-left font-['Inter-Regular',_sans-serif] text-base font-normal relative self-stretch"
                                    style={{ opacity: "0.5" }}
                                >
                                    가격 정책{" "}
                                </div>
                                <div
                                    className="text-dark text-left font-['Inter-Regular',_sans-serif] text-base font-normal relative self-stretch"
                                    style={{ opacity: "0.5" }}
                                >
                                    지원{" "}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[13px] items-start justify-start shrink-0 w-[200px] h-[200px] relative">
                            <div className="flex flex-col gap-[13px] items-start justify-start self-stretch shrink-0 relative">
                                <div className="text-dark text-left font-['Inter-Bold',_sans-serif] text-base leading-7 font-bold relative self-stretch h-[27.45px]">
                                    회사{" "}
                                </div>
                                <div
                                    className="text-dark text-left font-['Inter-Regular',_sans-serif] text-base font-normal relative self-stretch h-[19.47px]"
                                    style={{ opacity: "0.5" }}
                                >
                                    회사 소개{" "}
                                </div>
                                <div
                                    className="text-dark text-left font-['Inter-Regular',_sans-serif] text-base font-normal relative self-stretch h-[19.47px]"
                                    style={{ opacity: "0.5" }}
                                >
                                    채용{" "}
                                </div>
                                <div
                                    className="text-dark text-left font-['Inter-Regular',_sans-serif] text-base font-normal relative self-stretch h-[19.47px]"
                                    style={{ opacity: "0.5" }}
                                >
                                    문의하기
                                    <br />{" "}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[rgba(43,161,156,0.80)] rounded-[10px] flex items-center justify-center border-solid border-[#979797] border shrink-0 pr-2.5 w-[338px] h-[205px] relative overflow-hidden">
                        <div className="flex flex-col gap-0 items-start justify-start w-[78%] relative">
                            <div className="flex flex-col gap-2 items-start justify-start self-stretch shrink-0 relative">
                                <div className="text-[#fcfcfc] text-left font-['Inter-Bold',_sans-serif] text-base leading-7 font-bold relative self-stretch h-[31px]">
                                    만든 사람들{" "}
                                </div>
                                <div
                                    className="cursor-pointer w-full h-[43px] relative"
                                    onClick={() => {
                                        window.location.href =
                                            "https://www.snulion.com/";
                                    }}
                                >
                                    <img
                                        className="w-full h-full object-contain"
                                        src={likelionsnu}
                                    />
                                </div>
                                <div className="text-[#ffffff] text-left font-['Inter-Regular',_sans-serif] text-xs leading-[20.4px] font-normal relative self-stretch h-[51px]">
                                    서울대학교 멋쟁이 사자처럼은 아이디어를
                                    현실로 만드는 웹 프로그래밍 동아리입니다.{" "}
                                </div>
                            </div>
                            <div className="pt-2.5 pb-2.5 flex flex-row gap-[5px] items-center justify-center shrink-0 relative">
                                <svg
                                    className="shrink-0 w-2.5 h-[5px] relative overflow-visible"
                                    width="10"
                                    height="5"
                                    viewBox="0 0 10 5"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.95 2.5C0.95 1.645 1.645 0.95 2.5 0.95H4.5V0H2.5C1.12 0 0 1.12 0 2.5C0 3.88 1.12 5 2.5 5H4.5V4.05H2.5C1.645 4.05 0.95 3.355 0.95 2.5ZM3 3H7V2H3V3ZM7.5 0H5.5V0.95H7.5C8.355 0.95 9.05 1.645 9.05 2.5C9.05 3.355 8.355 4.05 7.5 4.05H5.5V5H7.5C8.88 5 10 3.88 10 2.5C10 1.12 8.88 0 7.5 0Z"
                                        fill="white"
                                    />
                                </svg>
                                <div className="text-[#ffffff] text-left font-['Inter-Regular',_sans-serif] text-xs leading-[20.4px] font-normal relative">
                                    협업 관련 문의: snu@likelion.org{" "}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-3.5 items-center justify-center shrink-0 relative">
                    <img
                        className="cursor-pointer shrink-0 w-[38px] h-[38px] relative"
                        style={{ objectFit: "cover" }}
                        src={instagramLogo}
                        onClick={() => {
                            window.location.href =
                                "https://www.instagram.com/likelion_snu/";
                        }}
                    />
                    <svg
                        className="cursor-pointer shrink-0 w-[38px] h-[38px] relative overflow-visible"
                        width="38"
                        height="38"
                        viewBox="0 0 38 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_76_203)">
                            <path
                                d="M34.8333 19.0001C34.8333 10.2601 27.74 3.16675 19 3.16675C10.26 3.16675 3.16667 10.2601 3.16667 19.0001C3.16667 26.6634 8.61333 33.0442 15.8333 34.5167V23.7501H12.6667V19.0001H15.8333V15.0417C15.8333 11.9859 18.3192 9.50008 21.375 9.50008H25.3333V14.2501H22.1667C21.2958 14.2501 20.5833 14.9626 20.5833 15.8334V19.0001H25.3333V23.7501H20.5833V34.7543C28.5792 33.9626 34.8333 27.2176 34.8333 19.0001Z"
                                fill="black"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_76_203">
                                <rect width="38" height="38" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <img
                        className="cursor-pointer shrink-0 w-[38px] h-[38px] relative"
                        style={{ objectFit: "cover" }}
                        src={twitterLogo}
                    />
                </div>
            </div>
        </div>
    );
};

export default Footer;
