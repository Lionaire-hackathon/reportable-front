import demo from "../assets/images/demo.png";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Toggle from "../components/common/Toggle";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <>
            <Header className="fixed" />
            <div className="flex flex-col gap-0 items-start justify-start h-auto w-full relative left-0 pt-[104px]">
                <div className="bg-white flex flex-col items-center justify-start self-stretch shrink-0 h-[551px] relative">
                    <div className="bg-[#299792] flex flex-col gap-0 items-center justify-center self-stretch shrink-0 h-[339px] relative">
                        <div className="flex flex-row gap-[71px] items-center justify-start shrink-0 relative">
                            <div className="flex flex-col gap-[27px] items-start justify-start shrink-0 w-[315px] relative">
                                <div className="text-left font-['Inter-Bold',_sans-serif] text-3xl font-bold relative self-stretch">
                                    <span>
                                        <span
                                            className="div-span"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            쉽고, 편리한 <br />
                                            레포트의 완성
                                        </span>
                                        <span className="div-span2">
                                            - 레포터블
                                        </span>
                                    </span>{" "}
                                </div>
                                <div className="flex flex-row gap-0 items-center justify-center shrink-0 h-[77px] relative">
                                    <div className="flex flex-col gap-[9px] items-end justify-center shrink-0 w-[62px] h-[71px] relative">
                                        <svg
                                            className="shrink-0 w-[45px] h-[45px] relative overflow-visible"
                                            width="45"
                                            height="45"
                                            viewBox="0 0 45 45"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M-1.97 38.03C-2.83375 38.03 -3.55437 37.7406 -4.13187 37.1619C-4.70937 36.5831 -4.99875 35.8625 -5 35V20.4331C-5 19.5706 -4.71062 18.85 -4.13187 18.2713C-3.55312 17.6925 -2.83313 17.4037 -1.97188 17.405H2.5V8.03C2.5 7.1675 2.78937 6.44688 3.36812 5.86813C3.94687 5.28938 4.6675 5 5.53 5H25.7219C26.5844 5 27.305 5.28938 27.8838 5.86813C28.4625 6.44688 28.7513 7.1675 28.75 8.03V22.5969C28.75 23.4594 28.4613 24.18 27.8838 24.7588C27.3063 25.3375 26.5856 25.6262 25.7219 25.625H21.25V35C21.25 35.8625 20.9613 36.5831 20.3838 37.1619C19.8062 37.7406 19.0856 38.03 18.2219 38.03H-1.97ZM-1.97 36.155H18.2219C18.5094 36.155 18.7737 36.0344 19.015 35.7931C19.255 35.5531 19.375 35.2887 19.375 35V23.03H-3.125V35C-3.125 35.2887 -3.005 35.5531 -2.765 35.7931C-2.525 36.0344 -2.26063 36.155 -1.97188 36.155M21.25 23.75H25.7219C26.0094 23.75 26.2738 23.63 26.515 23.39C26.7563 23.15 26.8762 22.8856 26.875 22.5969V10.625H4.375V17.405H18.2219C19.0844 17.405 19.8044 17.6938 20.3819 18.2713C20.9594 18.8488 21.2488 19.5694 21.25 20.4331V23.75Z"
                                                fill="black"
                                            />
                                        </svg>
                                        <div className="text-[#000000] text-left font-['Inter-Bold',_sans-serif] text-[15px] font-bold relative self-stretch">
                                            종류 선택{" "}
                                        </div>
                                    </div>
                                    <svg
                                        className="shrink-0 w-6 h-6 relative overflow-visible"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7 2L17 12L7 22"
                                            stroke="black"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                    <div className="flex flex-col gap-[13px] items-center justify-start shrink-0 w-[59px] h-[71px] relative">
                                        <svg
                                            className="shrink-0 w-10 h-10 relative overflow-visible"
                                            width="41"
                                            height="41"
                                            viewBox="0 0 41 41"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7.16666 7.37501C7.16666 6.4357 7.53979 5.53487 8.20399 4.87067C8.86818 4.20648 9.76901 3.83334 10.7083 3.83334H21.8217C22.3187 3.83356 22.7952 4.03108 23.1467 4.38251L31.5133 12.7492C31.0649 12.988 30.6555 13.2937 30.2992 13.6558L29.89 14.0717L22.5833 6.76501V13.2083C22.5833 13.7833 23.05 14.25 23.625 14.25H29.7142L27.6625 16.3333H23.625C22.7962 16.3333 22.0013 16.0041 21.4153 15.4181C20.8292 14.832 20.5 14.0371 20.5 13.2083V5.91668H10.7083C10.3215 5.91668 9.95062 6.07032 9.67713 6.34381C9.40363 6.6173 9.24999 6.98824 9.24999 7.37501V33.625C9.24999 34.4308 9.90332 35.0833 10.7083 35.0833H30.2917C30.6784 35.0833 31.0494 34.9297 31.3229 34.6562C31.5963 34.3827 31.75 34.0118 31.75 33.625V26.2158L33.8333 24.1642V33.625C33.8333 34.5643 33.4602 35.4652 32.796 36.1293C32.1318 36.7935 31.231 37.1667 30.2917 37.1667H10.7083C9.76901 37.1667 8.86818 36.7935 8.20399 36.1293C7.53979 35.4652 7.16666 34.5643 7.16666 33.625V7.37501ZM31.485 14.825C31.793 14.517 32.1588 14.2726 32.5613 14.1059C32.9638 13.9391 33.3952 13.8533 33.8308 13.8533C34.2665 13.8533 34.6979 13.9391 35.1004 14.1059C35.5029 14.2726 35.8686 14.517 36.1767 14.825C36.4847 15.1331 36.7291 15.4988 36.8958 15.9013C37.0625 16.3038 37.1483 16.7352 37.1483 17.1708C37.1483 17.6065 37.0625 18.0379 36.8958 18.4404C36.7291 18.8429 36.4847 19.2086 36.1767 19.5167L24.7417 30.775C24.4289 31.0829 24.0406 31.3031 23.6158 31.4133L20.92 32.1125C20.7589 32.1549 20.5923 32.1729 20.4258 32.1658H12.3658C12.0896 32.1658 11.8246 32.0561 11.6293 31.8607C11.4339 31.6654 11.3242 31.4004 11.3242 31.1242C11.3242 30.8479 11.4339 30.583 11.6293 30.3876C11.8246 30.1923 12.0896 30.0825 12.3658 30.0825H18.8892L19.5875 27.3858C19.6979 26.9607 19.9183 26.5721 20.2267 26.2592L31.485 14.825Z"
                                                fill="black"
                                            />
                                        </svg>
                                        <div className="text-[#000000] text-left font-['Inter-Bold',_sans-serif] text-[15px] font-bold relative self-stretch">
                                            자동 작성{" "}
                                        </div>
                                    </div>
                                    <svg
                                        className="shrink-0 w-6 h-6 relative overflow-visible !shrink-0"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7 2L17 12L7 22"
                                            stroke="black"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                    <div className="flex flex-col gap-3.5 items-center justify-start shrink-0 w-20 relative">
                                        <svg
                                            className="shrink-0 w-[39px] h-[39px] relative overflow-visible !shrink-0 !w-[39px] !h-[39px]"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12.2 4.39999C11.1657 4.39999 10.1737 4.81089 9.44228 5.54228C8.71089 6.27367 8.3 7.26565 8.3 8.29999V18.4536C8.93746 18.2734 9.59025 18.1527 10.25 18.0929V8.29999C10.25 7.78282 10.4554 7.28683 10.8211 6.92114C11.1868 6.55544 11.6828 6.34999 12.2 6.34999H20V13.175C20 13.9508 20.3082 14.6947 20.8567 15.2433C21.4053 15.7918 22.1492 16.1 22.925 16.1H29.75V31.7C29.75 32.2172 29.5446 32.7132 29.1789 33.0789C28.8132 33.4445 28.3172 33.65 27.8 33.65H20.78C20.4251 34.3446 19.9955 34.9985 19.4988 35.6H27.8C28.8343 35.6 29.8263 35.1891 30.5577 34.4577C31.2891 33.7263 31.7 32.7343 31.7 31.7V14.9573C31.6993 14.1818 31.3907 13.4383 30.842 12.8903L23.2097 5.25604C22.6614 4.70806 21.9179 4.40016 21.1427 4.39999H12.2ZM29.3463 14.15H22.925C22.6664 14.15 22.4184 14.0473 22.2356 13.8644C22.0527 13.6816 21.95 13.4336 21.95 13.175V6.75364L29.3463 14.15ZM20 28.775C20 31.1023 19.0755 33.3342 17.4299 34.9799C15.7842 36.6255 13.5523 37.55 11.225 37.55C8.89772 37.55 6.66577 36.6255 5.02013 34.9799C3.3745 33.3342 2.45 31.1023 2.45 28.775C2.45 26.4477 3.3745 24.2158 5.02013 22.5701C6.66577 20.9245 8.89772 20 11.225 20C13.5523 20 15.7842 20.9245 17.4299 22.5701C19.0755 24.2158 20 26.4477 20 28.775ZM15.8153 25.1597C15.7247 25.0689 15.6171 24.9969 15.4987 24.9477C15.3802 24.8986 15.2532 24.8732 15.125 24.8732C14.9968 24.8732 14.8698 24.8986 14.7513 24.9477C14.6329 24.9969 14.5253 25.0689 14.4347 25.1597L9.275 30.3213L8.0153 29.0597C7.83222 28.8766 7.58391 28.7738 7.325 28.7738C7.06608 28.7738 6.81778 28.8766 6.6347 29.0597C6.45162 29.2428 6.34877 29.4911 6.34877 29.75C6.34877 30.0089 6.45162 30.2572 6.6347 30.4403L8.5847 32.3903C8.67527 32.4811 8.78286 32.5531 8.90131 32.6023C9.01976 32.6514 9.14675 32.6767 9.275 32.6767C9.40324 32.6767 9.53023 32.6514 9.64868 32.6023C9.76714 32.5531 9.87473 32.4811 9.9653 32.3903L15.8153 26.5403C15.9061 26.4497 15.9781 26.3421 16.0273 26.2237C16.0764 26.1052 16.1017 25.9782 16.1017 25.85C16.1017 25.7217 16.0764 25.5948 16.0273 25.4763C15.9781 25.3579 15.9061 25.2503 15.8153 25.1597Z"
                                                fill="black"
                                            />
                                        </svg>
                                        <div className="text-[#000000] text-left font-['Inter-Bold',_sans-serif] text-[15px] font-bold relative self-stretch">
                                            수정 및 출력{" "}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#000000] rounded pt-2 pr-4 pb-2 pl-4 flex flex-row gap-1 items-center justify-center shrink-0 relative">
                                    <Link
                                        className="text-gray02-10 text-center font-['Inter-Bold',_sans-serif] text-sm leading-5 font-bold text-white relative"
                                        to="/essay"
                                    >
                                        레포트 작성하러 가기{" "}
                                    </Link>
                                    <svg
                                        className="shrink-0 w-4 h-4 relative overflow-visible"
                                        width="16"
                                        height="17"
                                        viewBox="0 0 16 17"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8 14.5C11.3137 14.5 14 11.8137 14 8.5C14 5.18629 11.3137 2.5 8 2.5C4.68629 2.5 2 5.18629 2 8.5C2 11.8137 4.68629 14.5 8 14.5Z"
                                            stroke="white"
                                            strokeMiterlimit="10"
                                        />
                                        <path
                                            d="M7.25 6.25L9.75 8.5L7.25 10.75"
                                            stroke="white"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <img
                                className="shrink-0 w-[353px] h-[250px] relative"
                                style={{ objectFit: "cover" }}
                                src={demo}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col flex-grow items-center justify-center shrink-0 w-full relative">
                        <div className="flex flex-row items-center justify-center self-stretch shrink-0 gap-[71px] relative">
                            <Link
                                className="flex w-[297px] h-[62px] p-2 pr-4 justify-center items-center gap-1.5 rounded border-2 border-[#299792] bg-white text-[#299792]"
                                to="/essay"
                            >
                                에세이 작성하기
                            </Link>
                            <Link
                                className="flex w-[297px] h-[62px] p-2 pr-4 justify-center items-center gap-1.5 rounded border-2 border-[#299792] bg-white text-[#299792]"
                                to="/report"
                            >
                                보고서 작성하기
                            </Link>
                        </div>
                    </div>
                </div>
                <div
                    className={
                        "bg-[#cae5e4] flex flex-col items-center justify-center shrink-0 w-full h-auto relative p-[60px]"
                    }
                >
                    <div className="flex flex-col items-start justify-center w-[90%] gap-10 realative">
                        <div className="text-[#000000] text-left font-['Inter-Bold',_sans-serif] text-[25px] w-full font-bold relative">
                            FAQ.
                            <br />
                            레포터블, 어떻게 사용하나요?{" "}
                        </div>
                        <div className="flex flex-col gap-6 items-start justify-start shrink-0 w-full relative">
                            <Toggle
                                question="레포터블은 어떤 기능이 있나요?"
                                answer="레포터블은 개쩌는 서비스에요! 엄청나게 많은 기능들이 있답니다 한 번 돈부터 내고 사용해보세요."
                                isOpened={false}
                            />
                            <Toggle
                                question="어떤 종류의 레포트를 작성할 수 있나요?"
                                answer="저희 서비스는 다양한 종류의 레포트 작성을
                                        도와드릴 수 있습니다. 단순한 감상문부터
                                        논리적 비평, 인문학 에세이, 심지어는 과학
                                        실험 보고서, 공학 프로젝트 보고서까지 다룰
                                        수 있습니다. 원하는 분량에 맞게 레포트의
                                        내용을 확장할 수도 있고, AI를 이용해
                                        레포트에 실증 분석내용을 포함할 수도
                                        있습니다. 간단한 입력만으로 필요한 콘텐츠와
                                        스타일이 담긴 맞춤형 레포트를 생성해 보세요."
                                isOpened={true}
                            />
                            <Toggle
                                question="공대생인데, 실험보고서도 작성할 수 있나요?"
                                answer="당연히, 가능합니다! 현재 가능한 레포트 종류는 총
                                    두가지로, 에세이와 보고서 유형입니다. 에세이는
                                    주로 특정 주제에 관해 작성자의 개인적인 의견,
                                    경험 등을 담는 글이며 본인의 생각을 펼치는데
                                    AI가 도움을 줍니다. 반면, 보고서는 주로 프로젝트
                                    요약 보고서나 실험 보고서로 연구나 실험의 과정을
                                    기록하고 정해진 양식에 맞춰 결론을 도출하는데
                                    특화된 유형입니다. 레포터블은 보고서를 작성할
                                    때, 담겨야 하는 데이터 등을 생성하는데 도움을
                                    주며 결과 요약에 탁월합니다."
                                isOpened={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default HomePage;
