import Header from "../components/common/Header";
import { useEffect, useState, useRef } from "react";
import ReportIcon from "../components/common/ReportIcon";
import dummyReports from "../data/dummyReports";
import useMe from "../apis/hook/useMe";
import { useNavigate } from "react-router-dom";
import differentiators from "../assets/images/differentiators.png";
import essayInfo1 from "../assets/images/essayInfo1.png";
import essayInfo2 from "../assets/images/essayInfo2.png";
import essayInfo3 from "../assets/images/essayInfo3.png";
import researchInfo1 from "../assets/images/researchInfo1.png";
import researchInfo2 from "../assets/images/researchInfo2.png";

const MyPage = () => {
    const { me, isLoadingMe } = useMe();
    const navigate = useNavigate();
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
        const yOffset = -200;
        const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
    };

    return (
        <div className="bg-[#ffffff] h-[4524px] relative overflow-auto">
            <Header className="fixed" />
            <div className="bg-[#cae5e4] w-[276px] h-screen top-0 fixed left-0 flex justify-center items-start pt-[200px] z-10">
                <div
                    style={stickyStyle}
                    className="flex flex-col gap-[50px] items-start justify-start sticky w-full"
                >
                    <div className="w-full flex flex-row gap-5 items-center justify-center self-stretch shrink-0 relative">
                        <div className="flex flex-row gap-5 items-center justify-center mx-auto w-[80%]">
                            <svg
                                className="shrink-0 w-[25px] h-[25px] relative overflow-visible"
                                width="26"
                                height="25"
                                viewBox="0 0 26 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13 0C6.1 0 0.5 5.6 0.5 12.5C0.5 19.4 6.1 25 13 25C19.9 25 25.5 19.4 25.5 12.5C25.5 5.6 19.9 0 13 0ZM14.25 18.75H11.75V11.25H14.25V18.75ZM14.25 8.75H11.75V6.25H14.25V8.75Z"
                                    fill="#434343"
                                />
                            </svg>
                            <div className="text-[#1e6d69] text-left font-['Audiowide-Regular',_sans-serif] text-xl font-normal relative">
                                Service Info{" "}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-10 items-center justify-center self-stretch shrink-0 relative">
                        <div className="mx-auto flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 relative w-[80%]">
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
                                    handleScroll("service-intro");
                                }}
                                className="cursor-pointer text-[rgba(30,109,105,0.93)] hover:text-[#848484] text-left font-['Audiowide-Regular',_sans-serif] text-xl font-normal relative w-[130px] "
                            >
                                서비스 소개{" "}
                            </div>
                        </div>
                        <div className="mx-auto flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 relative w-[80%]">
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
                                className="cursor-pointer text-[rgba(30,109,105,0.93)] hover:text-[#848484] text-left font-['Audiowide-Regular',_sans-serif] text-xl font-normal relative w-[130px]"
                                onClick={() => handleScroll("how-to-use")}
                            >
                                사용방법{" "}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center mt-[104px] ml-[276px] h-full">
                <div className="flex flex-col gap-[84px] items-start justify-start w-[80%] mx-auto h-[4403px] top-[56px]">
                    <div className="flex flex-col gap-[39px] items-center justify-start self-stretch shrink-0 relative">
                        <div className="flex flex-col gap-[11px] items-start justify-start shrink-0 w-full relative">
                            <div className="text-[#656565] text-left font-['Inter-Medium',_sans-serif] text-xl leading-[160%] font-medium relative self-stretch flex items-center justify-start">
                                서비스 소개{" "}
                            </div>
                            <div
                                id="service-intro"
                                className="text-[#000000] text-left font-['Inter-SemiBold',_sans-serif] text-[40px] leading-[160%] font-semibold relative self-stretch flex items-center justify-start"
                            >
                                Welcome to Reportable{" "}
                            </div>
                            <div className="text-[#656565] text-left font-['Inter-Medium',_sans-serif] text-xl leading-[160%] font-medium relative self-stretch flex items-center justify-start">
                                Reportable은 LLM(Anthropic API)을 이용하여
                                사용자가 요구하는 조건에 맞는 학술보고서를
                                작성해주는 서비스 플랫폼입니다. Reportable은
                                반복되는 문서작업에 피로감을 느끼는 대학생들과
                                직장인들에게 효율적이고 정확한 보고서 작성
                                도구를 제공합니다. 사용자는 간단한 입력을 통해
                                원하는 주제, 분량, 형식 등을 설정할 수 있으며,
                                인공지능이 이를 바탕으로 고품질의 맞춤형
                                보고서를 생성합니다.
                            </div>
                        </div>
                        <div className="bg-[#ffffff] rounded-[10px] border-solid border-[#d9d9d9] border pt-2.5 pr-[30px] pb-2.5 pl-[30px] flex flex-row gap-10 items-center justify-start shrink-0 w-full h-[704px] relative">
                            <img
                                className="shrink-0 w-[50%] relative"
                                style={{ objectFit: "cover" }}
                                src={differentiators}
                            />
                            <div className="flex flex-col gap-[31px] items-start justify-start shrink-0 w-[50%] relative">
                                <div
                                    className="text-[#299792] text-left font-['Urbanist-SemiBold',_sans-serif] text-[22px] leading-[160%] font-semibold relative flex items-center justify-start"
                                    style={{ letterSpacing: "0.2px" }}
                                >
                                    Reportable의 차별점{" "}
                                </div>
                                <div className="flex flex-col gap-2.5 items-start justify-start shrink-0 w-[90%] relative">
                                    <div
                                        className="text-[#121212] text-left text-[18px] font-semibold relative self-stretch h-[29px] flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                        }}
                                    >
                                        1. 맞춤형 보고서 작성에 특화
                                    </div>
                                    <div className="bg-[#FAFAFA] rounded-2xl pt-[18px] pr-5 pb-[18px] pl-5 flex flex-row gap-3 items-center justify-start self-stretch shrink-0 relative">
                                        <div className="flex flex-row gap-3 items-center justify-start flex-1 relative">
                                            <div
                                                className="text-[#656565] text-left font-['Urbanist-Medium',_sans-serif] text-lg leading-[160%] font-medium relative flex-1 flex items-center justify-start"
                                                style={{
                                                    letterSpacing: "0.2px",
                                                }}
                                            >
                                                Reportable은 사용자 맞춤형
                                                보고서를 생성하는 데 중점을 두고
                                                있어, 개인화된 요구 사항을
                                                충족시킬 수 있습니다.{" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2.5 items-start justify-start shrink-0 w-[90%] relative">
                                    <div
                                        className="text-[#121212] text-left text-[18px] font-semibold relative self-stretch h-[29px] flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                        }}
                                    >
                                        2. 특정 양식에 얽매이지 않음
                                    </div>
                                    <div className="bg-[#FAFAFA] rounded-2xl pt-[18px] pr-5 pb-[18px] pl-5 flex flex-row gap-3 items-center justify-start self-stretch shrink-0 relative">
                                        <div className="flex flex-row gap-3 items-center justify-start flex-1 relative">
                                            <div
                                                className="text-[#656565] text-left font-['Urbanist-Medium',_sans-serif] text-lg leading-[160%] font-medium relative flex-1 flex items-center justify-start"
                                                style={{
                                                    letterSpacing: "0.2px",
                                                }}
                                            >
                                                Reportable은 생성 모델을
                                                사용하여 고품질의 자연스러운
                                                문서를 작성하기 때문에 유연하고
                                                다양한 요구를 충족시킬 수
                                                있습니다.{" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2.5 items-start justify-start shrink-0 w-[90%] relative">
                                    <div
                                        className="text-[#121212] text-left text-[18px] font-semibold relative self-stretch h-[29px] flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                        }}
                                    >
                                        3. 효율성과 편의성 제공
                                    </div>
                                    <div className="bg-[#FAFAFA] rounded-2xl pt-[18px] pr-5 pb-[18px] pl-5 flex flex-row gap-3 items-center justify-start self-stretch shrink-0 relative">
                                        <div className="flex flex-row gap-3 items-center justify-start flex-1 relative">
                                            <div
                                                className="text-[#656565] text-left font-['Urbanist-Medium',_sans-serif] text-lg leading-[160%] font-medium relative flex-1 flex items-center justify-start"
                                                style={{
                                                    letterSpacing: "0.2px",
                                                }}
                                            >
                                                Reportable은 간단한 입력과
                                                편리한 GUI를 통해 간단하게
                                                고품질의 보고서를 작성해주기
                                                때문에 시간과 노력을 절약할 수
                                                있습니다.{" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[60px] items-center justify-start self-stretch shrink-0 h-[3109px] relative">
                        <div className="flex flex-col gap-[11px] items-start justify-start shrink-0 w-full relative">
                            <div className="text-[#656565] text-left font-['Inter-Medium',_sans-serif] text-xl leading-[160%] font-medium relative self-stretch flex items-center justify-start">
                                사용방법{" "}
                            </div>
                            <div
                                id="how-to-use"
                                className="text-[#000000] text-left font-['Inter-SemiBold',_sans-serif] text-[40px] leading-[160%] font-semibold relative self-stretch flex items-center justify-start"
                            >
                                Reportable은 어떻게 사용하나요?{" "}
                            </div>
                            <div className="text-[#656565] text-left font-['Inter-Medium',_sans-serif] text-xl leading-[160%] font-medium relative self-stretch flex items-center justify-start">
                                Reportable에서 작성할 수 있는 보고서의 유형은
                                essay와 research report 두 가지 종류로 나뉩니다.
                                essay는 개인의 주관적인 생각과 논지를 중심으로
                                특정 주제에 대해 논리적으로 서술하는 것에 초점이
                                맞춰져 있습니다. 연구보고서는 좀 더 체계적이고
                                형식적인 양식 하에서 특정 주제에 대한 연구
                                결과를 객관적으로 보고하는 형태로, 사용자가
                                제공한 연구 결과를 바탕으로 명확한 답변을
                                제공하는 것에 초점이 맞춰져 있습니다.{" "}
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 items-start justify-start shrink-0 w-full relative">
                            <div className="flex flex-row gap-2.5 items-center justify-start self-stretch shrink-0 relative">
                                <svg
                                    className="w-6 h-6 relative overflow-visible "
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M23.6101 5.38925C24.13 4.86932 24.13 4.00278 23.6101 3.50951L20.4905 0.389946C19.9972 -0.129982 19.1307 -0.129982 18.6107 0.389946L16.1578 2.82961L21.1571 7.82891M0 19.0007V24H4.99931L19.7439 9.24205L14.7446 4.24274L0 19.0007Z"
                                        fill="black"
                                    />
                                </svg>
                                <div className="text-[#000000] text-left font-['Inter-SemiBold',_sans-serif] text-3xl leading-[160%] font-semibold relative w-[1052px] h-[47px] flex items-center justify-start">
                                    essay 작성하기{" "}
                                </div>
                            </div>
                            <div className="text-[#656565] text-left font-['Inter-Medium',_sans-serif] text-xl leading-[160%] font-medium relative self-stretch flex items-center justify-start">
                                Reportable의 홈페이지에서 essay 작성페이지로
                                접근할 수 있습니다.{" "}
                            </div>
                        </div>
                        <div className="bg-[#ffffff] rounded-[10px] border-solid border-[#d9d9d9] border pt-[50px] pr-[30px] pb-[50px] pl-[30px] flex flex-col gap-10 items-start justify-start shrink-0 w-full h-auto relative">
                            <div className="flex flex-row items-center justify-between shrink-0 w-full relative">
                                <img
                                    className="shrink-0 w-[36%] relative"
                                    style={{ objectFit: "cover" }}
                                    src={essayInfo1}
                                />
                                <div className="flex flex-col gap-2.5 items-center justify-center shrink-0 w-[60%] h-[445px] relative">
                                    <div
                                        className="text-[#121212] text-left pl-4 text-[20px] font-bold relative self-stretch h-[29px] flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                        }}
                                    >
                                        1. 에세이 관련 정보 입력하기
                                    </div>
                                    <div className="bg-[#FAFAFA] rounded-2xl pt-5 pr-[30px] pb-5 pl-[30px] flex flex-row gap-3 items-center justify-start self-stretch shrink-0 relative">
                                        <div className="flex flex-row gap-3 items-center justify-start flex-1 relative">
                                            <div
                                                className="text-[#656565] text-left font-['Urbanist-Medium',_sans-serif] text-lg leading-[160%] font-medium relative flex-1 flex items-center justify-start"
                                                style={{
                                                    letterSpacing: "0.2px",
                                                }}
                                            >
                                                에세이 보고서를 생성하기
                                                위해서는 에세이 주제(필수),
                                                분량(필수), 양식, 프롬프트를
                                                입력해야 합니다. 프롬프트는
                                                에세이 작성에 필요한 추가적인
                                                요구사항을 말합니다. 입력창
                                                오른쪽 위의 초기화 버튼을 누르면
                                                이전의 입력사항을 초기화할 수
                                                있습니다.
                                                <br />
                                                <br />
                                                입력사항을 모두 입력한 후에
                                                하단의 CREATE 버튼을 누르면 다음
                                                단계로 넘어갑니다.{" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row items-center justify-between shrink-0 w-full relative">
                                <div className="flex flex-col gap-2.5 items-center justify-center shrink-0 w-[51%] h-[445px] relative">
                                    <div
                                        className="text-[#121212] text-left pl-4 text-[20px] font-bold relative self-stretch h-[29px] flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                        }}
                                    >
                                        2. 추가질문 입력하기
                                    </div>
                                    <div className="bg-[#FAFAFA] rounded-2xl pt-5 pr-[30px] pb-5 pl-[30px] flex flex-row gap-3 items-center justify-start self-stretch shrink-0 relative">
                                        <div className="flex flex-row gap-3 items-center justify-start flex-1 relative">
                                            <div
                                                className="text-[#656565] text-left font-['Urbanist-Medium',_sans-serif] text-lg leading-[160%] font-medium relative flex-1 flex items-center justify-start"
                                                style={{
                                                    letterSpacing: "0.2px",
                                                }}
                                            >
                                                에세이 보고서를 생성하기
                                                위해서는 관련된 배경지식, 개인의
                                                주관적인 생각과 논지가 중요하기
                                                때문에, AI의 판단에 따라
                                                사용자에게 추가질문이 제시될 수
                                                있습니다. 이러한 추가질문들은
                                                답변하지 않아도 되지만 좀 더 질
                                                높은 보고서의 생성을 원한다면
                                                답변을 작성하시는 것을
                                                추천합니다.(일부 질문에만
                                                답변하는 것도 가능합니다.
                                                <br />
                                                <br />
                                                추가질문에 대한 답변을 모두
                                                작성한 후 하단에 있는 CREATE
                                                버튼을 누르면 문서가 생성됩니다.{" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <img
                                    className="shrink-0 w-[44%] relative"
                                    style={{ objectFit: "cover" }}
                                    src={essayInfo2}
                                />
                            </div>
                            <div className="flex flex-row items-center justify-between shrink-0 w-full relative">
                                <img
                                    className="shrink-0 w-[43.6%] relative"
                                    style={{ objectFit: "cover" }}
                                    src={essayInfo3}
                                />
                                <div className="flex flex-col gap-2.5 items-center justify-center shrink-0 w-[48%] h-[445px] relative">
                                    <div
                                        className="text-[#121212] text-left pl-4 text-[20px] font-bold relative self-stretch h-[29px] flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                        }}
                                    >
                                        3. 완성된 보고서 확인하기
                                    </div>
                                    <div className="bg-[#FAFAFA] ounded-2xl pt-5 pr-[30px] pb-5 pl-[30px] flex flex-row gap-3 items-center justify-start self-stretch shrink-0 relative">
                                        <div className="flex flex-row gap-3 items-center justify-start flex-1 relative">
                                            <div
                                                className="text-[#656565] text-left font-['Urbanist-Medium',_sans-serif] text-lg leading-[160%] font-medium relative flex-1 flex items-center justify-start"
                                                style={{
                                                    letterSpacing: "0.2px",
                                                }}
                                            >
                                                1~2분 정도로 기다리면 오른쪽의
                                                문서 부분에서 완성된 보고서의
                                                docx 파일을 확인할 수 있습니다.
                                                또한 우측 상단의 저장 아이콘을
                                                클릭하면 해당 문서를 다운로드
                                                받을 수 있습니다. <br />
                                                <br />
                                                추가로 한 번 생성된 보고서의
                                                경우 이후에도 My Page에서 확인할
                                                수 있습니다.{" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 items-start justify-start shrink-0 w-full relative">
                            <div className="flex flex-row gap-2.5 items-center justify-start self-stretch shrink-0 relative">
                                <svg
                                    className="w-6 h-6 relative overflow-visible "
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M23.6101 5.38925C24.13 4.86932 24.13 4.00278 23.6101 3.50951L20.4905 0.389946C19.9972 -0.129982 19.1307 -0.129982 18.6107 0.389946L16.1578 2.82961L21.1571 7.82891M0 19.0007V24H4.99931L19.7439 9.24205L14.7446 4.24274L0 19.0007Z"
                                        fill="black"
                                    />
                                </svg>
                                <div className="text-[#000000] text-left font-['Inter-SemiBold',_sans-serif] text-3xl leading-[160%] font-semibold relative w-[1052px] h-[47px] flex items-center justify-start">
                                    research report 작성하기{" "}
                                </div>
                            </div>
                            <div className="text-[#656565] text-left font-['Inter-Medium',_sans-serif] text-xl leading-[160%] font-medium relative self-stretch flex items-center justify-start">
                                Reportable의 홈페이지에서 research report
                                작성페이지로 접근할 수 있습니다.{" "}
                            </div>
                        </div>
                        <div className="bg-[#ffffff] rounded-[10px] border-solid border-[#d9d9d9] border pt-[50px] pr-[30px] pb-[50px] pl-[30px] flex flex-col gap-10 items-start justify-start shrink-0 w-full h-auto relative">
                            <div className="flex flex-row items-center justify-between shrink-0 w-full relative">
                                <img
                                    className="shrink-0 w-[40%] relative"
                                    style={{ objectFit: "cover" }}
                                    src={researchInfo1}
                                />
                                <div className="flex flex-col gap-2.5 items-center justify-center shrink-0 w-[60%] h-[445px] relative">
                                    <div
                                        className="text-[#121212] text-left pl-4 text-[20px] font-bold relative self-stretch h-[29px] flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                        }}
                                    >
                                        1. 연구 보고서 관련 정보 입력하기
                                    </div>
                                    <div className="bg-[#FAFAFA] rounded-2xl pt-5 pr-[30px] pb-5 pl-[30px] flex flex-row gap-3 items-center justify-start self-stretch shrink-0 relative">
                                        <div className="flex flex-row gap-3 items-center justify-start flex-1 relative">
                                            <div
                                                className="text-[#656565] text-left font-['Urbanist-Medium',_sans-serif] text-lg leading-[160%] font-medium relative flex-1 flex items-center justify-start"
                                                style={{
                                                    letterSpacing: "0.2px",
                                                }}
                                            >
                                                연구 보고서를 생성하기 위해서는
                                                보고서 주제(필수), 분량(필수),
                                                보고서 포함사항(필수), 연구 목적
                                                및 방법(필수), 참고 자료,
                                                프롬프트를 입력해야 합니다.{" "}
                                                <br />
                                                <br />
                                                보고서 포함사항에서는 보고서에
                                                꼭 포함시키고자 하는 내용을 태그
                                                형식으로 추가할 수
                                                있으며(‘+’버튼 입력) 참고 자료
                                                창에서는 결과 데이터 또는 참고할
                                                이미지 자료를 설명과 함께
                                                업로드해 AI에 제공할 수
                                                있습니다. 프롬프트에는 위에서
                                                언급한 내용 외에 추가적으로
                                                요구하고 싶은 사항을 입력합니다.
                                                입력창 오른쪽 위의 초기화 버튼을
                                                누르면 이전의 입력사항을
                                                초기화할 수 있습니다.
                                                <br />
                                                <br />
                                                입력사항을 모두 입력한 후에
                                                하단의 CREATE 버튼을 누르면
                                                보고서가 생성됩니다.{" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row items-center justify-between shrink-0 w-full relative">
                                <div className="flex flex-col gap-2.5 items-center justify-center shrink-0 w-[51%] h-[445px] relative">
                                    <div
                                        className="text-[#121212] text-left pl-4 text-[20px] font-bold relative self-stretch h-[29px] flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                        }}
                                    >
                                        2. 완성된 보고서 확인하기
                                    </div>
                                    <div className="bg-[#FAFAFA] ounded-2xl pt-5 pr-[30px] pb-5 pl-[30px] flex flex-row gap-3 items-center justify-start self-stretch shrink-0 relative">
                                        <div className="flex flex-row gap-3 items-center justify-start flex-1 relative">
                                            <div
                                                className="text-[#656565] text-left font-['Urbanist-Medium',_sans-serif] text-lg leading-[160%] font-medium relative flex-1 flex items-center justify-start"
                                                style={{
                                                    letterSpacing: "0.2px",
                                                }}
                                            >
                                                1~2분 정도로 기다리면 오른쪽의
                                                문서 부분에서 완성된 보고서의
                                                docx 파일을 확인할 수 있습니다.
                                                또한 우측 상단의 저장 아이콘을
                                                클릭하면 해당 문서를 다운로드
                                                받을 수 있습니다. <br />
                                                <br />
                                                추가로 한 번 생성된 보고서의
                                                경우 이후에도 My Page에서 확인할
                                                수 있습니다.{" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <img
                                    className="shrink-0 w-[43.6%] relative"
                                    style={{ objectFit: "cover" }}
                                    src={researchInfo2}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
