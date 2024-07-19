import Header from "../components/common/Header";
import { useEffect, useState, useRef } from "react";
import useMe from "../apis/hook/useMe";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
    return (
        <>
            <Header className="fixed" />
            <div className="bg-[#ffffff] flex gap-2.5 items-center justify-center shrink-0 w-full relative ">
                <div className="flex flex-col gap-[52px] items-center justify-start shrink-0 w-[80%] mt-[104px] pt-12 relative">
                    <div className="flex flex-col gap-2.5 items-start justify-start shrink-0 relative h-[560px] overflow-auto">
                        <div className="flex flex-col gap-2.5 items-start justify-start shrink-0 w-[876px] relative">
                            <div className="flex flex-col gap-[19px] items-start justify-start self-stretch shrink-0 relative">
                                <div className="flex flex-row items-end justify-between shrink-0 w-[876px] relative">
                                    <div className="flex flex-col items-center justify-between shrink-0 w-[405px] h-48 relative">
                                        <div className="text-[#000000] text-left font-['Roboto-SemiBold',_sans-serif] text-[45px] font-semibold relative self-stretch h-[30px]">
                                            프로필 수정{" "}
                                        </div>
                                        <div className="shrink-0 w-[405px] h-[98px] static">
                                            <div className="bg-[#ffffff] rounded-[5px] border-solid border-[#858585] border-2 w-[405px] h-[60px] absolute left-0 top-[132px]"></div>
                                            <div className="text-[#1c1c1c] text-left font-['Roboto-SemiBold',_sans-serif] text-[26px] font-semibold absolute left-0 top-[94px]">
                                                이름{" "}
                                            </div>
                                        </div>
                                    </div>
                                    <svg
                                        className="rounded-[20px] flex flex-row items-center justify-between shrink-0 w-48 h-48 relative overflow-visible"
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
                                </div>
                                <div className="shrink-0 w-[873px] h-[98px] static">
                                    <div className="text-[#1c1c1c] text-left font-['Roboto-SemiBold',_sans-serif] text-[26px] font-semibold absolute left-0 top-[211px] w-[275.91px]">
                                        이메일{" "}
                                    </div>
                                    <div className="bg-[#ffffff] rounded-[5px] border-solid border-[#858585] border-2 pt-[17px] pr-[22px] pb-[17px] pl-[22px] flex flex-row gap-2.5 items-center justify-end w-[873px] h-[60px] absolute left-0 top-[249px]">
                                        <svg
                                            className="rounded-[5px] flex flex-row gap-2.5 items-center justify-start shrink-0 w-[30px] h-[30px] relative overflow-visible"
                                            width="30"
                                            height="30"
                                            viewBox="0 0 30 30"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                width="30"
                                                height="30"
                                                rx="5"
                                                fill="#23B000"
                                            />
                                            <path
                                                d="M11.7203 20.2013L7.4531 14.604L6 16.4966L11.7203 24L24 7.89262L22.5571 6L11.7203 20.2013Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="shrink-0 w-[876px] h-[98px] static">
                                    <div className="bg-[#ffffff] rounded-[5px] border-solid border-[#858585] border-2 w-[876px] h-[60px] absolute left-0 top-[366px]"></div>
                                    <div className="text-[#1c1c1c] text-left font-['Roboto-SemiBold',_sans-serif] text-[26px] font-semibold absolute left-0 top-[328px] w-[276.86px]">
                                        비밀번호 수정{" "}
                                    </div>
                                </div>
                                <div className="shrink-0 w-[873px] h-[98px] static">
                                    <div className="text-[#1c1c1c] text-left font-['Roboto-SemiBold',_sans-serif] text-[26px] font-semibold absolute left-0 top-[445px] w-[275.91px]">
                                        비밀번호 수정 확인{" "}
                                    </div>
                                    <div className="bg-[#ffffff] rounded-[5px] border-solid border-[#858585] border-2 pt-[17px] pr-[22px] pb-[17px] pl-[22px] flex flex-row gap-2.5 items-center justify-end w-[873px] h-[60px] absolute left-0 top-[483px]">
                                        <svg
                                            className="rounded-[5px] flex flex-row gap-2.5 items-center justify-start shrink-0 w-[30px] h-[30px] relative overflow-visible"
                                            width="30"
                                            height="30"
                                            viewBox="0 0 30 30"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                width="30"
                                                height="30"
                                                rx="5"
                                                fill="#23B000"
                                            />
                                            <path
                                                d="M11.7203 20.2013L7.4531 14.604L6 16.4966L11.7203 24L24 7.89262L22.5571 6L11.7203 20.2013Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="shrink-0 w-[873px] h-[98px] static">
                                    <div className="text-[#1c1c1c] text-left font-['Roboto-SemiBold',_sans-serif] text-[26px] font-semibold absolute left-0 top-[562px] w-[275.91px]">
                                        휴대폰 번호{" "}
                                    </div>
                                    <div className="bg-[#ffffff] rounded-[5px] border-solid border-[#858585] border-2 pt-[17px] pr-[22px] pb-[17px] pl-[22px] flex flex-row gap-2.5 items-center justify-end w-[873px] h-[60px] absolute left-0 top-[600px]">
                                        <svg
                                            className="rounded-[5px] flex flex-row gap-2.5 items-center justify-start shrink-0 w-[30px] h-[30px] relative overflow-visible"
                                            width="30"
                                            height="30"
                                            viewBox="0 0 30 30"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                width="30"
                                                height="30"
                                                rx="5"
                                                fill="#23B000"
                                            />
                                            <path
                                                d="M11.7203 20.2013L7.4531 14.604L6 16.4966L11.7203 24L24 7.89262L22.5571 6L11.7203 20.2013Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-[39px] items-center justify-start shrink-0 relative bottom-4">
                        <div className="bg-[#ffffff] rounded-[5px] border-solid border-[#858585] border pt-[11px] pr-[47px] pb-[11px] pl-[47px] flex flex-row gap-2.5 items-center justify-center shrink-0 w-[180px] h-[55px] relative">
                            <div className="text-[#1c1c1c] text-left font-['Roboto-Regular',_sans-serif] text-[28px] font-normal relative">
                                Cancel{" "}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2.5 items-start justify-start shrink-0 w-[180px] relative">
                            <div className="bg-[#2f2f2f] rounded-[5px] pt-0.5 pr-[47px] pb-0.5 pl-[47px] flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 h-[55px] relative">
                                <div className="text-[#ffffff] text-left font-['Roboto-Regular',_sans-serif] text-[28px] font-normal relative">
                                    Save{" "}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserPage;
