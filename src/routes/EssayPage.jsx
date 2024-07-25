import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import AnimatedLoading from "../components/common/AnimatedLoading";
import useMe from "../apis/hook/useMe";
import { useNavigate } from "react-router-dom";
import Questionbox from "../components/common/Questionbox";
import WordDocumentViewer from "../components/html/WordDocumentViewer";
import ResetIcon from "../components/atom/ResetIcon";
import CreateIcon from "../components/atom/CreateIcon";
import {
    documentApi,
    askAdditionalQuestion,
    answerAdditionalQuestion,
    createReport,
    getCreatedReport,
    getDocFile,
} from "../apis/document";

const PageState = {
    NORMAL: "NORMAL",
    MAKE_DOCUMENT: "MAKE_DOCUMENT",
    MAKE_ADDITIONAL_QUESTION: "MAKE_ADDITIONAL_QUESTION",
    MAKE_TEXT_REPORT: "MAKE_TEXT_REPORT",
    MAKE_DOCX_REPORT: "MAKE_DOCX_REPORT",
};

const EssayPage = () => {
    const { me, isLoadingMe } = useMe();
    const [pageState, setPageState] = useState(PageState.NORMAL);
    const navigate = useNavigate();
    const [essayData, setEssayData] = useState({
        topic: "",
        length: 1000,
        format: "",
        prompt: "",
    });
    const [hasAdditionalQuestions, setHasAdditionalQuestions] = useState(false);
    const [additionalAnswers, setAdditionalAnswers] = useState([]);
    //const [isOutputCreated, setIsOutputCreated] = useState(false);
    const [documentId, setDocumentId] = useState();
    const [responseJSON, setResponseJSON] = useState({
        needMorePrompt: 0,
        prompt: [""],
    });
    const [docUrl, setDocUrl] = useState("");
    const [createdEssayUrl, setCreatedEssayUrl] = useState();
    const [createdEssay, setCreatedEssay] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleEssayData = (e) => {
        const { id, value } = e.target;
        setEssayData({
            ...essayData,
            [id]: value,
        });
    };

    const resetEssayData = (e) => {
        const { id } = e.target;
        if (id === "length") {
            setEssayData({
                ...essayData,
                [id]: 1000,
            });
        } else {
            setEssayData({
                ...essayData,
                [id]: "",
            });
        }
    };

    // JSON 문자열의 큰따옴표를 올바르게 변환하는 함수
    const fixQuotes = (jsonStr) => {
        // 유니코드 이스케이프 시퀀스를 사용해 큰따옴표로 대체
        return jsonStr
            .replace(/“|”/g, '"')
            .replace(/”/g, '"')
            .replace(/‘|’/g, "'");
    };

    const handleEssaySubmit = async (e) => {
        e.preventDefault();
        setPageState(PageState.MAKE_DOCUMENT);
        setIsLoading(true);
        try {
            const essaySubmitData = {
                title: essayData.topic,
                amount: essayData.length,
                type: "essay",
                prompt: essayData.prompt,
                form: essayData.format,
                elements: "",
                core: "",
            };
            const documentResponse = await documentApi(essaySubmitData);
            setDocumentId(documentResponse.data.id);
            setPageState(PageState.MAKE_ADDITIONAL_QUESTION);
            // 추가 질문 유무 물어보기
            const responseObject = await askAdditionalQuestion(
                documentResponse.data.id
            );
            console.log(responseObject.data.content[0].text);
            const processedResponse = JSON.parse(
                fixQuotes(responseObject.data.content[0].text)
            );
            setResponseJSON(processedResponse);
            setHasAdditionalQuestions(processedResponse.needMorePrompt);

            if (processedResponse.needMorePrompt === 1) {
                setAdditionalAnswers(
                    Array(processedResponse.prompt.length).fill("")
                );
            } else {
                setPageState(PageState.MAKE_TEXT_REPORT);
                await createReport(documentResponse.data.id);
                setPageState(PageState.MAKE_DOCX_REPORT);
                await getDocFile(documentResponse.data.id);
                navigate(`/essay/${documentResponse.data.id}`);
                setPageState(PageState.NORMAL);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("문서 생성 오류:", error);
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred. Please try again.";
            alert(`${errorMessage} 문서 생성에 실패했습니다.`);
        }
        console.log(essayData);
        setIsLoading(false);
    };

    const mergeQnA = (questions, answers) => {
        if (questions.length !== answers.length) {
            throw new Error("The arrays must have the same length");
        }

        let mergedString =
            " <추가프롬프트> \n 다음은 너와 이전에 나누었던 에세이 작성에 대한 질의응답 정보야 ";
        for (let i = 0; i < questions.length; i++) {
            if (answers[i].trim() !== "") {
                mergedString +=
                    " {질문: " + questions[i] + " 답변: " + answers[i] + "}";
            }
        }
        console.log(mergedString);
        return mergedString;
    };

    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setPageState(PageState.MAKE_ADDITIONAL_QUESTION);
        setHasAdditionalQuestions(false);
        const addPrompt = mergeQnA(responseJSON.prompt, additionalAnswers);
        const documentIdAndAddingPrompt = {
            documentId: documentId,
            addPrompt: addPrompt,
        };
        await answerAdditionalQuestion(documentIdAndAddingPrompt);
        setPageState(PageState.MAKE_TEXT_REPORT);
        const finalResponse = await createReport(documentId);
        setPageState(PageState.MAKE_DOCX_REPORT);
        const wordUrl = await getDocFile(documentId);
        navigate(`/essay/${documentId}`);

        //필요없는 부분
        setDocUrl(wordUrl.data);
        setPageState(PageState.NORMAL);
        setIsLoading(false);
        //
    };

    const updateAdditionalAnswer = (index, answer) => {
        setAdditionalAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[index] = answer;
            return newAnswers;
        });
    };

    const getLoadingText = (pageState) => {
        switch (pageState) {
            case PageState.NORMAL:
                return null;
            case PageState.MAKE_DOCUMENT:
                return (
                    <>
                        <span>문</span>
                        <span>서</span>
                        <span className="mx-1"></span>
                        <span>정</span>
                        <span>보</span>
                        <span>를</span>
                        <span className="mx-1"></span>
                        <span>저</span>
                        <span>장</span>
                        <span>하</span>
                        <span>는</span>
                        <span className="mx-1"></span>
                        <span>중</span>
                    </>
                );
            case PageState.MAKE_ADDITIONAL_QUESTION:
                return (
                    <>
                        <span>추</span>
                        <span>가</span>
                        <span className="mx-1"></span>
                        <span>질</span>
                        <span>문</span>
                        <span>을</span>
                        <span className="mx-1"></span>
                        <span>생</span>
                        <span>성</span>
                        <span>하</span>
                        <span>는</span>
                        <span className="mx-1"></span>
                        <span>중</span>
                    </>
                );
            case PageState.MAKE_TEXT_REPORT:
                return (
                    <>
                        <span>보</span>
                        <span>고</span>
                        <span>서</span>
                        <span className="mx-1"></span>
                        <span>내</span>
                        <span>용</span>
                        <span className="mx-1"></span>
                        <span>작</span>
                        <span>성</span>
                        <span>하</span>
                        <span>는</span>
                        <span className="mx-1"></span>
                        <span>중</span>
                    </>
                );
            case PageState.MAKE_DOCX_REPORT:
                return (
                    <>
                        <span>보</span>
                        <span>고</span>
                        <span>서</span>
                        <span>를</span>
                        <span className="mx-1"></span>
                        <span>문</span>
                        <span>서</span>
                        <span>화</span>
                        <span className="mx-1"></span>
                        <span>하</span>
                        <span>는</span>
                        <span className="mx-1"></span>
                        <span>중</span>
                    </>
                );
            default:
                return null;
        }
    };

    useEffect(() => {
        if (!me && !isLoadingMe) {
            alert("로그인이 필요합니다.");
            navigate("/");
            navigate("/signin");
        }
    }, [me]);

    return (
        <>
            {hasAdditionalQuestions && (
                <>
                    <div
                        className="fixed top-0 bottom-0 left-0 right-0 bg-[rgba(217,217,217,0.20)] z-20 flex "
                        style={{ backdropFilter: "blur(5px)" }}
                    ></div>
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-[#ffffff] rounded-[10px] border-solid border-[#a0a0a0] border px-4 flex flex-col gap-[25px] items-center justify-center w-[40%] max-h-[600px]">
                        <div className="mt-8 min-h-[20%] text-left text-xl font-semibold ">
                            <span>
                                <span className="div-span">추가질문</span>
                                <span className="div-span2  text-orange-500">
                                    *
                                </span>
                            </span>{" "}
                        </div>
                        <div className="flex flex-col gap-5 items-start justify-start shrink-0 w-[95%] mx-auto !max-h-[400px] overflow-auto">
                            {responseJSON.prompt.map((question, index) => (
                                <Questionbox
                                    question={question}
                                    key={index}
                                    index={index}
                                    additionalAnswers={additionalAnswers}
                                    updateAdditionalAnswer={
                                        updateAdditionalAnswer
                                    }
                                />
                            ))}
                        </div>
                        <button
                            className="bg-[#008585] hover:bg-[#007373] active:bg-[#006060] mb-8 min-h-[20%] rounded-[10px] flex flex-row items-center justify-center w-[95%] mx-auto h-[60px] shrink-0"
                            style={{
                                boxShadow:
                                    "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                            }}
                            onClick={handleFinalSubmit}
                        >
                            <div className="flex flex-row gap-1.5 items-center justify-center shrink-0 relative">
                                <div className="text-white text-center relative">
                                    CREATE{" "}
                                </div>
                                <svg
                                    className="shrink-0 w-5 h-5 relative overflow-visible "
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.39799 12.809C7.57421 12.9334 7.78476 13 8.00047 12.9994C8.21619 12.9989 8.4264 12.9313 8.60199 12.806C8.77999 12.676 8.91499 12.496 8.98899 12.288L9.43599 10.915C9.5507 10.5709 9.74385 10.2581 10.0002 10.0014C10.2565 9.74474 10.569 9.55117 10.913 9.436L12.304 8.986C12.5097 8.91154 12.6868 8.77443 12.8104 8.59399C12.934 8.41354 12.9978 8.19887 12.993 7.9802C12.9881 7.76153 12.9148 7.5499 12.7833 7.37513C12.6518 7.20036 12.4688 7.07125 12.26 7.006L10.885 6.558C10.5407 6.44343 10.2277 6.25034 9.97085 5.994C9.71399 5.73766 9.52027 5.42509 9.40499 5.081L8.95299 3.693C8.88021 3.48851 8.7455 3.31179 8.56761 3.18743C8.38972 3.06307 8.17749 2.99724 7.96044 2.99911C7.7434 3.00098 7.53233 3.07045 7.35661 3.19787C7.18088 3.32528 7.04924 3.50429 6.97999 3.71L6.52299 5.11C6.40827 5.44486 6.21907 5.74934 5.96965 6.0005C5.72022 6.25166 5.41706 6.44296 5.08299 6.56L3.69299 7.007C3.48859 7.07994 3.31197 7.2147 3.18764 7.39259C3.06332 7.57048 2.99747 7.78267 2.99923 7.99969C3.00098 8.21671 3.07027 8.4278 3.19746 8.60365C3.32465 8.7795 3.50343 8.91138 3.70899 8.981L5.08299 9.426C5.42907 9.54084 5.74336 9.73531 6.00058 9.99375C6.25781 10.2522 6.45078 10.5674 6.56399 10.914L7.01599 12.305C7.08799 12.509 7.22199 12.685 7.39799 12.809ZM7.48299 5.394L8.00999 4.017L8.44999 5.394C8.61352 5.88708 8.89013 6.33506 9.25772 6.70213C9.62531 7.0692 10.0737 7.34518 10.567 7.508L11.973 8.038L10.591 8.485C10.0981 8.64909 9.65029 8.92588 9.28314 9.29338C8.91599 9.66088 8.63962 10.109 8.47599 10.602L7.95299 11.98L7.50399 10.601C7.34264 10.1081 7.06874 9.65964 6.70399 9.291C6.33467 8.92337 5.88578 8.64555 5.39199 8.479L4.01399 7.957L5.39999 7.507C5.88662 7.33844 6.32798 7.06028 6.68999 6.694C7.04922 6.32619 7.32035 5.88171 7.48299 5.394ZM13.535 16.851C13.6373 16.9229 13.7549 16.97 13.8786 16.9887C14.0022 17.0073 14.1285 16.9969 14.2474 16.9583C14.3663 16.9196 14.4747 16.8539 14.5638 16.7662C14.6529 16.6785 14.7204 16.5713 14.761 16.453L15.009 15.691C15.0627 15.5331 15.1516 15.3895 15.269 15.271C15.387 15.151 15.531 15.063 15.689 15.011L16.461 14.759C16.6203 14.704 16.7582 14.6001 16.8549 14.4622C16.9517 14.3242 17.0024 14.1592 16.9999 13.9907C16.9973 13.8222 16.9416 13.6588 16.8407 13.5238C16.7398 13.3888 16.5989 13.2891 16.438 13.239L15.674 12.989C15.516 12.9361 15.3725 12.8473 15.2545 12.7297C15.1365 12.6121 15.0474 12.4688 14.994 12.311L14.742 11.538C14.6879 11.379 14.5851 11.2411 14.4482 11.1438C14.3114 11.0465 14.1473 10.9947 13.9794 10.9958C13.8114 10.9969 13.6481 11.0508 13.5125 11.1499C13.377 11.249 13.276 11.3883 13.224 11.548L12.977 12.31C12.926 12.4668 12.8394 12.6096 12.724 12.7274C12.6087 12.8452 12.4677 12.9347 12.312 12.989L11.539 13.241C11.3799 13.2949 11.2419 13.3975 11.1444 13.5342C11.0469 13.671 10.9949 13.8349 10.9958 14.0029C10.9967 14.1708 11.0504 14.3342 11.1493 14.4699C11.2483 14.6056 11.3874 14.7068 11.547 14.759L12.31 15.006C12.47 15.06 12.614 15.149 12.732 15.267C12.851 15.386 12.939 15.53 12.99 15.689L13.243 16.463C13.2978 16.6195 13.3998 16.755 13.535 16.851ZM12.622 14.058L12.443 14L12.627 13.936C12.9295 13.8297 13.2038 13.6558 13.4291 13.4276C13.6543 13.1994 13.8246 12.9229 13.927 12.619L13.985 12.441L14.045 12.622C14.1471 12.9285 14.3192 13.207 14.5476 13.4354C14.776 13.6638 15.0545 13.8359 15.361 13.938L15.556 14.001L15.376 14.061C15.0689 14.1634 14.7899 14.336 14.5613 14.5652C14.3327 14.7943 14.1607 15.0737 14.059 15.381L14 15.562L13.942 15.382C13.8404 15.0738 13.6682 14.7936 13.4389 14.5639C13.2097 14.3342 12.93 14.1613 12.622 14.059"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                        </button>
                    </div>
                </>
            )}
            <Header className="fixed" headerType="essay" />
            <form
                className="top-0 left-0 flex flex-col gap-2.5 items-center justify-between shrink-0 w-[313px] h-full fixed z-10"
                style={{
                    background: "linear-gradient(to left, #cae5e4, #cae5e4)",
                }}
                onSubmit={handleEssaySubmit}
            >
                <div className="flex flex-col items-center justify-start shrink-0 w-[289px] py-4 max-h-[80%] overflow-auto gap-[11px] absolute top-[76px] bottom-20">
                    <div
                        className="bg-[#ffffff] rounded-[10px] p-4 flex flex-col gap-0 items-center justify-center shrink-0 relative w-[98.5%] "
                        style={{
                            boxShadow: "0px 4px 64px 0px rgba(0, 0, 0, 0.05)",
                        }}
                    >
                        <div className="flex flex-col gap-2.5 items-start justify-start shrink-0 w-[98.5%] relative">
                            <div className="flex flex-row items-center justify-between self-stretch shrink-0 relative w-full">
                                <div className="px-1 text-left font-['Inter-SemiBold',_sans-serif] text-base font-semibold relative">
                                    <span>
                                        <span className="div-span">
                                            에세이 주제
                                        </span>
                                        <span className="div-span2 text-orange-500">
                                            *
                                        </span>
                                    </span>{" "}
                                </div>
                                <ResetIcon
                                    id="topic"
                                    onClick={resetEssayData}
                                    isDisabled={pageState !== PageState.NORMAL}
                                />
                            </div>
                            <textarea
                                placeholder="작성할 에세이의 주제를 알려주세요."
                                id="topic"
                                value={essayData.topic}
                                onChange={handleEssayData}
                                readOnly={pageState !== PageState.NORMAL}
                                className={`${
                                    pageState !== PageState.NORMAL
                                        ? "bg-[#f5f5f5] text-[#9e9e9e] "
                                        : "bg-[#ffffff] "
                                } overflow-auto rounded border-solid border-[#C2C2C2] border self-stretch shrink-0 h-[74px] relative text-left font-['Inter-Regular',_sans-serif] text-xs leading-5 font-normal p-2`}
                            />
                        </div>
                    </div>
                    <div
                        className="bg-[#ffffff] rounded-[10px] p-4 flex flex-col gap-2.5 items-start justify-start shrink-0 relative w-[98.5%] "
                        style={{
                            boxShadow: "0px 4px 64px 0px rgba(0, 0, 0, 0.05)",
                        }}
                    >
                        <div className="flex flex-col gap-2.5 items-start justify-start shrink-0 w-full relative">
                            <div className="flex flex-row items-center justify-between self-stretch shrink-0 relative w-full">
                                <div className="px-1 text-left font-['Inter-SemiBold',_sans-serif] text-base font-semibold relative">
                                    <span>
                                        <span className="div-span3">분량</span>
                                        <span className="div-span4 text-orange-500">
                                            *
                                        </span>
                                    </span>{" "}
                                </div>
                                <ResetIcon
                                    id="length"
                                    onClick={resetEssayData}
                                    isDisabled={pageState !== PageState.NORMAL}
                                />
                            </div>
                            <div className="flex flex-row gap-2.5 items-center justify-start self-stretch shrink-0 relative">
                                <input
                                    id="length"
                                    type="number"
                                    min="0"
                                    max="10000"
                                    step="500"
                                    placeholder="1500"
                                    value={essayData.length}
                                    onChange={handleEssayData}
                                    readOnly={pageState !== PageState.NORMAL}
                                    autoComplete="off"
                                    className={`${
                                        pageState !== PageState.NORMAL
                                            ? "bg-[#f5f5f5] text-[#9e9e9e] "
                                            : "bg-[#ffffff] "
                                    } rounded border-solid border-[#C2C2C2] border px-3 flex flex-row gap-1 items-end justify-start shrink-0 w-[80%] h-8 relative overflow-hidden text-gray02-70 text-left font-['Inter-Regular',_sans-serif] text-[11px] leading-5 font-normal`}
                                />
                                <div className="text-[#000000] text-left font-['Inter-Regular',_sans-serif] text-[11px] leading-5 font-normal relative">
                                    자 이상{" "}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#ffffff] rounded-[10px] p-4 flex flex-col gap-2.5 items-center justify-center shrink-0 relative w-[98.5%] ">
                        <div className="flex flex-col gap-2.5 items-center justify-center shrink-0 w-full relative">
                            <div className="flex flex-row items-center justify-between self-stretch shrink-0 relative w-full">
                                <span className="px-1 text-[#000000] text-left font-['Inter-SemiBold',_sans-serif] text-base font-semibold relative">
                                    양식{" "}
                                </span>
                                <ResetIcon
                                    id="format"
                                    onClick={resetEssayData}
                                    isDisabled={pageState !== PageState.NORMAL}
                                />
                            </div>
                            <textarea
                                id="format"
                                placeholder="서론, 본론, 결론, 참고문헌 등 따라야
                                        할 에세이의 양식이 있다면
                                        알려주세요."
                                value={essayData.format}
                                onChange={handleEssayData}
                                readOnly={pageState !== PageState.NORMAL}
                                className={`${
                                    pageState !== PageState.NORMAL
                                        ? "bg-[#f5f5f5] text-[#9e9e9e] "
                                        : "bg-[#ffffff] "
                                } overflow-auto rounded border-solid border-[#C2C2C2] border self-stretch shrink-0 h-[74px] relative text-left font-['Inter-Regular',_sans-serif] text-xs leading-5 font-normal p-2`}
                            />
                        </div>
                    </div>
                    <div className="bg-[#ffffff] rounded-[10px] p-4 flex flex-col gap-2.5 items-center justify-start shrink-0 relative w-[98.5%] ">
                        <div className="flex flex-col gap-2 items-start justify-start shrink-0 w-full relative">
                            <div className="flex flex-row items-center justify-between shrink-0 w-full relative">
                                <div className="flex flex-row items-center justify-between shrink-0 relative">
                                    <span className="px-1 text-[#000000] text-left font-['Inter-SemiBold',_sans-serif] text-base font-semibold relative">
                                        프롬프트{" "}
                                    </span>
                                    <CreateIcon color="black" />
                                </div>
                                <ResetIcon
                                    id="prompt"
                                    onClick={resetEssayData}
                                    isDisabled={pageState !== PageState.NORMAL}
                                />
                            </div>
                            <span className="px-1 text-[#000000] text-left font-['Inter-Regular',_sans-serif] text-[9px] font-normal relative">
                                레포트의 내용을 세밀하게 조정하고 싶다면, 아래
                                항목에 필요 사항을
                                <br />
                                작성해주세요{" "}
                            </span>
                        </div>
                        <textarea
                            id="prompt"
                            placeholder="ex) 서론 부분을 독자들의 흥미를 이끄는
                                내용으로 시작할 수 있게 해줘"
                            value={essayData.prompt}
                            readOnly={pageState !== PageState.NORMAL}
                            onChange={handleEssayData}
                            className={`${
                                pageState !== PageState.NORMAL
                                    ? "bg-[#f5f5f5] text-[#9e9e9e] "
                                    : "bg-[#ffffff] "
                            } overflow-auto rounded border-solid border-[#C2C2C2] border self-stretch shrink-0 h-[74px] relative text-left font-['Inter-Regular',_sans-serif] text-xs leading-5 font-normal p-2`}
                        />
                    </div>
                </div>
                <button
                    className={`${
                        (pageState !== PageState.NORMAL ||
                            hasAdditionalQuestions) &&
                        "hidden "
                    } bg-[#008585] hover:bg-[#007373] active:bg-[#006060] rounded-[10px] bottom-1 flex flex-row gap-1 items-center justify-center mx-auto w-[289px] shrink-0 h-[60px] absolute`}
                    style={{
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    }}
                    type="submit"
                    disabled={pageState !== PageState.NORMAL}
                >
                    <div className="flex flex-row gap-1.5 items-center justify-start shrink-0 relative">
                        <div className="text-white text-center font-body-text-inter-14-medium-font-family text-body-text-inter-14-medium-font-size leading-body-text-inter-14-medium-line-height font-body-text-inter-14-medium-font-weight relative">
                            CREATE{" "}
                        </div>
                        <CreateIcon color="white" />
                    </div>
                </button>
            </form>
            {docUrl ? (
                <div className="bg-[#d9d9d9] pt-[74px] pl-[313px] h-screen overflow-y-auto">
                    <WordDocumentViewer documentUrl={docUrl} />
                </div>
            ) : pageState !== PageState.NORMAL ? (
                <>
                    <div
                        className="fixed top-0 bottom-0 left-0 right-0 bg-[rgba(217,217,217,0.20)] z-0 flex items-center justify-center"
                        style={{ backdropFilter: "blur(5px)" }}
                    ></div>
                    <div className="bg-transparent top-[74px] bottom-0 left-[313px] right-0 flex flex-col gap-10 items-center justify-center shrink-0 fixed overflow-auto z-10">
                        <div className="text-[18px] loading-text2 text-[#299792] flex flex-row">
                            {getLoadingText(pageState)}
                        </div>
                        <span className="loader"></span>
                    </div>
                    <div className="bg-[#d9d9d9] pt-[74px] pl-[313px] flex flex-row items-center justify-center shrink-0 h-screen relative overflow-auto -z-10">
                        <div className="my-4 bg-[#ffffff] shrink-0 w-[529px] h-[90%] relative flex flex-row items-center justify-center"></div>
                    </div>
                </>
            ) : (
                <div className="bg-[#d9d9d9] pt-[74px] pl-[313px] flex flex-row items-center justify-center shrink-0 h-screen relative overflow-auto -z-10">
                    <div className="my-4 bg-[#ffffff] shrink-0 w-[529px] h-[90%] relative flex flex-row items-center justify-start"></div>
                </div>
            )}
        </>
    );
};

export default EssayPage;
