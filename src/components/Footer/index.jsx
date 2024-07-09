import likelionsnu from "../../assets/images/Likelionsnu.png";
import instagramLogo from "../../assets/images/Instagram.png";
import twitterLogo from "../../assets/images/TwitterX.png";

const Footer = () => {
    return (
        <div className="bg-[#ffffff] w-full h-[472px] absolute left-0 top-[1480px] overflow-hidden">
            <div className="pt-[17px] pb-[17px] flex flex-col gap-2.5 items-start justify-start h-[312px] absolute left-[183px] top-[93px]">
                <div className="flex flex-col gap-[27px] items-center justify-start shrink-0 w-[1074px] absolute left-0 top-0">
                    <div className="shrink-0 w-[1074px] h-[247px] static">
                        <div
                            className="bg-[#102047] border-solid border-[#102047] border w-[100%] h-[0.24%] absolute right-[0%] left-[0%] bottom-[20.83%] top-[78.93%]"
                            style={{ opacity: "0.06" }}
                        ></div>
                        <div
                            className="bg-[#102047] border-solid border-[#102047]  border w-[100%] h-[0.24%] absolute right-[0%] left-[0%] bottom-[99.76%] top-[0%]"
                            style={{ opacity: "0.06" }}
                        ></div>
                    </div>
                    <div className="flex flex-row gap-3.5 items-center justify-start shrink-0 relative">
                        <img
                            className="shrink-0 w-[38px] h-[38px] relative"
                            style={{ objectFit: "cover" }}
                            src={instagramLogo}
                        />
                        <svg
                            className="shrink-0 w-[38px] h-[38px] relative overflow-visible"
                            width="38"
                            height="38"
                            viewBox="0 0 38 38"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_23_72)">
                                <path
                                    d="M34.8333 18.9998C34.8333 10.2598 27.74 3.1665 19 3.1665C10.26 3.1665 3.16667 10.2598 3.16667 18.9998C3.16667 26.6632 8.61333 33.044 15.8333 34.5165V23.7498H12.6667V18.9998H15.8333V15.0415C15.8333 11.9857 18.3192 9.49984 21.375 9.49984H25.3333V14.2498H22.1667C21.2958 14.2498 20.5833 14.9623 20.5833 15.8332V18.9998H25.3333V23.7498H20.5833V34.754C28.5792 33.9623 34.8333 27.2173 34.8333 18.9998Z"
                                    fill="black"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_23_72">
                                    <rect
                                        width="38"
                                        height="38"
                                        fill="white"
                                        transform="translate(0 -0.000244141)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                        <img
                            className="shrink-0 w-[38px] h-[38px] relative"
                            style={{ objectFit: "cover" }}
                            src={twitterLogo}
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-[106px] items-center justify-start shrink-0 relative">
                    <div className="flex flex-row gap-[15px] items-center justify-start shrink-0 relative">
                        <div className="flex flex-col gap-3.5 items-start justify-start shrink-0 w-[200px] h-[200px] relative">
                            <div className="flex flex-col gap-3.5 items-start justify-start self-stretch shrink-0 relative">
                                <div className="text-dark text-left font-['Inter-Bold',_sans-serif] text-base leading-7 font-bold relative self-stretch">
                                    제품{" "}
                                </div>
                                <div
                                    className="text-[#102047] text-left font-['Inter-Regular',_sans-serif] text-base font-normal relative self-stretch"
                                    style={{ opacity: "0.5" }}
                                >
                                    이용약관{" "}
                                </div>
                                <div
                                    className="text-[#102047] text-left font-['Inter-Regular',_sans-serif] text-base font-normal relative self-stretch"
                                    style={{ opacity: "0.5" }}
                                >
                                    개인정보 보호정책{" "}
                                </div>
                                <div
                                    className="text-[#102047]  text-left font-['Inter-Regular',_sans-serif] text-base font-normal relative self-stretch"
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
                    <div className="bg-[rgba(43,161,156,0.80)] rounded-[10px] border-solid border-[#979797] border shrink-0 w-[338px] h-[205px] relative overflow-hidden">
                        <div className="flex flex-col gap-0 items-start justify-start w-[266px] absolute left-9 top-3">
                            <div className="flex flex-col gap-2 items-start justify-start self-stretch shrink-0 relative">
                                <div className="text-[#fcfcfc] text-left font-['Inter-Bold',_sans-serif] text-base leading-7 font-bold relative self-stretch h-[31px]">
                                    만든 사람들{" "}
                                </div>
                                <div class="w-full h-[43px] relative">
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
            </div>
        </div>
    );
};

export default Footer;
