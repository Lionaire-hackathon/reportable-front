import { useEffect, useState, useRef } from "react";
import Header from "../components/common/Header";
import useMe from "../apis/hook/useMe";
import { useNavigate } from "react-router-dom";
import Tag from "../components/common/Tag";

const EssayPage = () => {
    const { me, isLoadingMe } = useMe();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newContent, setNewContent] = useState("");

    const navigate = useNavigate();
    const [reportData, setReportData] = useState({
        topic: "",
        length: "",
        contents: new Set([
            "초록",
            "연구 목적",
            "연구 방법",
            "연구 결과",
            "결론",
            "논의",
        ]),
        purposeAndMethod: "",
        files: [],
        requirement: "",
    });
    const fileUploadRef = useRef(null);
    //const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isOutputCreated, setIsOutputCreated] = useState(false);

    const handleFileChange = async (e) => {
        const newFiles = Array.from(e.target.files);
        setReportData({
            ...reportData,
            files: [...reportData.files, ...newFiles],
        });
        //setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleUpload = () => {
        fileUploadRef.current.click();
    };

    const handleFileDelete = (index) => {
        setReportData({
            ...reportData,
            files: reportData.files.filter((_, idx) => idx !== index),
        });
    };

    const handleContentDelete = (targetContent) => {
        setReportData({
            ...reportData,
            contents: new Set(
                Array.from(reportData.contents).filter(
                    (content) => content !== targetContent
                )
            ),
        });
    };

    const changeNewContent = (e) => {
        setNewContent(e.target.value);
    };

    const addNewContent = () => {
        if (newContent.trim() !== "") {
            setReportData({
                ...reportData,
                contents: new Set([...reportData.contents, newContent]),
            });
            setNewContent(""); // 입력 필드를 비웁니다.
        }
    };

    const handleModal = () => {
        console.log("딸깍");
        setIsModalOpen(!isModalOpen);
    };

    const handleReportData = (e) => {
        const { id, value } = e.target;
        setReportData({
            ...reportData,
            [id]: value,
        });
    };

    const resetReportData = (e) => {
        const { id } = e.target;
        if (id === "contents") {
            setReportData({
                ...reportData,
                contents: new Set(),
            });
        } else if (id === "files") {
            setReportData({
                ...reportData,
                files: [],
            });
        } else {
            setReportData({
                ...reportData,
                [id]: "",
            });
        }
    };

    const handleEssaySubmit = (e) => {
        e.preventDefault(); // to prevent reloading the page
        setIsOutputCreated(!isOutputCreated);
        console.log(reportData);
    };

    const handleFileName = (e) => {
        setReportData({
            ...reportData,
            files: reportData.files.map((file, idx) => {
                if (idx === e.target.key) {
                    const [pureName, extension] = splitFileName(file.name);
                    return { ...file, name: e.target.value + extension };
                } else {
                    return file;
                }
            }),
        });
    };

    const handleKeyDown = (e) => {
        console.log(e.key);
        if (e.key === "Enter") {
            console.log("엔터!");
            e.preventDefault(); // 기본 Enter 키 동작을 방지
            e.target.blur(); // 포커스를 제거
        }
    };

    const splitFileName = (fileName) => {
        const dotIndex = fileName.lastIndexOf(".");
        if (dotIndex === -1) return [fileName, ""];
        return [fileName.substring(0, dotIndex), fileName.substring(dotIndex)];
    };

    /*
    useEffect(() => {
        if (!me) {
            alert("로그인이 필요합니다.");
            navigate("/");
            navigate("/signin");
        }
    }, [me]);
    */

    return (
        <>
            <Header className="relative" />
            <div className="flex flex-row items-stretch justify-center relative w-full h-[950px] flex-grow overflow-auto">
                <form
                    className="flex flex-col gap-2.5 items-center justify-between shrink-0 w-[313px] h-full relative "
                    style={{
                        background:
                            "linear-gradient(to left, #cae5e4, #cae5e4)",
                    }}
                    onSubmit={handleEssaySubmit}
                >
                    <div className="flex flex-col items-center justify-center shrink-0 w-[289px] top-4 pt-[64px] relative h-[800px] overflow-scroll">
                        <div className="flex flex-col gap-[11px] items-start justify-start shrink-0 relative ">
                            <div
                                className="bg-[#ffffff] rounded-[10px] p-4 flex flex-col gap-0 items-center justify-center shrink-0 relative w-[98.5%]"
                                style={{
                                    boxShadow:
                                        "0px 4px 64px 0px rgba(0, 0, 0, 0.05)",
                                }}
                            >
                                <div className="flex flex-col gap-2.5 items-start justify-start shrink-0 w-full relative">
                                    <div className="flex flex-row gap-2.5 items-center justify-between self-stretch shrink-0 relative">
                                        <div className="px-1 text-left font-['Inter-SemiBold',_sans-serif] text-base font-semibold relative">
                                            <span>
                                                <span>보고서 주제</span>
                                                <span className="text-orange-500">
                                                    *
                                                </span>
                                            </span>{" "}
                                        </div>
                                        <svg
                                            className="cursor-pointer shrink-0 w-4 h-4 relative overflow-visible"
                                            width="17"
                                            height="17"
                                            viewBox="0 0 17 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            id="topic"
                                            onClick={resetReportData}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M7.82 0.528976C9.20071 0.411147 10.5884 0.653982 11.847 1.23369C13.1056 1.81341 14.1921 2.71011 15 3.83598V2.24998C15 2.05106 15.079 1.8603 15.2197 1.71965C15.3603 1.57899 15.5511 1.49998 15.75 1.49998C15.9489 1.49998 16.1397 1.57899 16.2803 1.71965C16.421 1.8603 16.5 2.05106 16.5 2.24998V6.49998H12.25C12.0511 6.49998 11.8603 6.42096 11.7197 6.28031C11.579 6.13965 11.5 5.94889 11.5 5.74998C11.5 5.55106 11.579 5.3603 11.7197 5.21965C11.8603 5.07899 12.0511 4.99998 12.25 4.99998H13.977C13.2931 3.92988 12.3107 3.08356 11.1512 2.56556C9.9917 2.04757 8.70584 1.88058 7.45248 2.08524C6.19912 2.2899 5.03316 2.85723 4.09864 3.71715C3.16412 4.57708 2.50198 5.69192 2.194 6.92398C2.17128 7.02076 2.12955 7.11206 2.07123 7.19257C2.01291 7.27308 1.93917 7.34119 1.85429 7.39294C1.76942 7.4447 1.6751 7.47906 1.57682 7.49403C1.47854 7.50901 1.37827 7.5043 1.28182 7.48017C1.18538 7.45604 1.0947 7.41298 1.01505 7.3535C0.935404 7.29401 0.868375 7.21928 0.817865 7.13366C0.767355 7.04803 0.734371 6.95322 0.720832 6.85473C0.707293 6.75625 0.713469 6.65605 0.739 6.55998C1.14354 4.9424 2.0434 3.49166 3.31279 2.41052C4.58218 1.32939 6.15766 0.671906 7.819 0.529976L7.82 0.528976ZM4.42 15.381C5.49199 16.0164 6.69758 16.3925 7.94068 16.4795C9.18378 16.5665 10.43 16.3618 11.58 15.8819C12.73 15.402 13.752 14.6601 14.5646 13.7153C15.3771 12.7704 15.9577 11.6489 16.26 10.44C16.305 10.2482 16.2728 10.0464 16.1702 9.87814C16.0676 9.70993 15.903 9.58883 15.7119 9.54101C15.5207 9.4932 15.3185 9.52251 15.1488 9.62261C14.9791 9.72271 14.8556 9.88557 14.805 10.076C14.4969 11.3078 13.8347 12.4223 12.9002 13.282C11.9658 14.1417 10.8 14.7089 9.54688 14.9136C8.29373 15.1182 7.00809 14.9513 5.84871 14.4336C4.68933 13.9158 3.70699 13.0698 3.023 12H4.75C4.94891 12 5.13968 11.921 5.28033 11.7803C5.42098 11.6397 5.5 11.4489 5.5 11.25C5.5 11.0511 5.42098 10.8603 5.28033 10.7196C5.13968 10.579 4.94891 10.5 4.75 10.5H0.5V14.75C0.5 14.9489 0.579018 15.1397 0.71967 15.2803C0.860322 15.421 1.05109 15.5 1.25 15.5C1.44891 15.5 1.63968 15.421 1.78033 15.2803C1.92098 15.1397 2 14.9489 2 14.75V13.164C2.64478 14.0623 3.46879 14.8172 4.42 15.381Z"
                                                fill="black"
                                            />
                                        </svg>
                                    </div>
                                    <textarea
                                        placeholder="작성할 보고서의 주제를 알려주세요."
                                        id="topic"
                                        value={reportData.topic}
                                        readOnly={isOutputCreated}
                                        onChange={handleReportData}
                                        style={{
                                            backgroundColor: isOutputCreated
                                                ? "#f5f5f5"
                                                : "#ffffff",
                                        }}
                                        className="rounded border-solid border-[#C2C2C2] border self-stretch shrink-0 h-[74px] relative overflow-hidden text-[#9e9e9e] text-left font-['Inter-Regular',_sans-serif] text-xs leading-5 font-normal p-2"
                                    />
                                </div>
                            </div>
                            <div
                                className="bg-[#ffffff] rounded-[10px] p-4 flex flex-col gap-2.5 items-start justify-start shrink-0 relative w-[98.5%] "
                                style={{
                                    boxShadow:
                                        "0px 4px 64px 0px rgba(0, 0, 0, 0.05)",
                                }}
                            >
                                <div className="flex flex-col gap-2.5 items-start justify-start shrink-0 w-full relative">
                                    <div className="flex flex-row items-center justify-between self-stretch shrink-0 relative">
                                        <div className="px-1 text-left font-['Inter-SemiBold',_sans-serif] text-base font-semibold relative">
                                            <span>
                                                <span>분량</span>
                                                <span className="text-orange-500">
                                                    *
                                                </span>
                                            </span>{" "}
                                        </div>
                                        <svg
                                            className="cursor-pointer shrink-0 w-4 h-4 relative overflow-visible"
                                            width="17"
                                            height="17"
                                            viewBox="0 0 17 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            id="length"
                                            onClick={resetReportData}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M7.82 0.528976C9.20071 0.411147 10.5884 0.653982 11.847 1.23369C13.1056 1.81341 14.1921 2.71011 15 3.83598V2.24998C15 2.05106 15.079 1.8603 15.2197 1.71965C15.3603 1.57899 15.5511 1.49998 15.75 1.49998C15.9489 1.49998 16.1397 1.57899 16.2803 1.71965C16.421 1.8603 16.5 2.05106 16.5 2.24998V6.49998H12.25C12.0511 6.49998 11.8603 6.42096 11.7197 6.28031C11.579 6.13965 11.5 5.94889 11.5 5.74998C11.5 5.55106 11.579 5.3603 11.7197 5.21965C11.8603 5.07899 12.0511 4.99998 12.25 4.99998H13.977C13.2931 3.92988 12.3107 3.08356 11.1512 2.56556C9.9917 2.04757 8.70584 1.88058 7.45248 2.08524C6.19912 2.2899 5.03316 2.85723 4.09864 3.71715C3.16412 4.57708 2.50198 5.69192 2.194 6.92398C2.17128 7.02076 2.12955 7.11206 2.07123 7.19257C2.01291 7.27308 1.93917 7.34119 1.85429 7.39294C1.76942 7.4447 1.6751 7.47906 1.57682 7.49403C1.47854 7.50901 1.37827 7.5043 1.28182 7.48017C1.18538 7.45604 1.0947 7.41298 1.01505 7.3535C0.935404 7.29401 0.868375 7.21928 0.817865 7.13366C0.767355 7.04803 0.734371 6.95322 0.720832 6.85473C0.707293 6.75625 0.713469 6.65605 0.739 6.55998C1.14354 4.9424 2.0434 3.49166 3.31279 2.41052C4.58218 1.32939 6.15766 0.671906 7.819 0.529976L7.82 0.528976ZM4.42 15.381C5.49199 16.0164 6.69758 16.3925 7.94068 16.4795C9.18378 16.5665 10.43 16.3618 11.58 15.8819C12.73 15.402 13.752 14.6601 14.5646 13.7153C15.3771 12.7704 15.9577 11.6489 16.26 10.44C16.305 10.2482 16.2728 10.0464 16.1702 9.87814C16.0676 9.70993 15.903 9.58883 15.7119 9.54101C15.5207 9.4932 15.3185 9.52251 15.1488 9.62261C14.9791 9.72271 14.8556 9.88557 14.805 10.076C14.4969 11.3078 13.8347 12.4223 12.9002 13.282C11.9658 14.1417 10.8 14.7089 9.54688 14.9136C8.29373 15.1182 7.00809 14.9513 5.84871 14.4336C4.68933 13.9158 3.70699 13.0698 3.023 12H4.75C4.94891 12 5.13968 11.921 5.28033 11.7803C5.42098 11.6397 5.5 11.4489 5.5 11.25C5.5 11.0511 5.42098 10.8603 5.28033 10.7196C5.13968 10.579 4.94891 10.5 4.75 10.5H0.5V14.75C0.5 14.9489 0.579018 15.1397 0.71967 15.2803C0.860322 15.421 1.05109 15.5 1.25 15.5C1.44891 15.5 1.63968 15.421 1.78033 15.2803C1.92098 15.1397 2 14.9489 2 14.75V13.164C2.64478 14.0623 3.46879 14.8172 4.42 15.381Z"
                                                fill="black"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex flex-row gap-2.5 items-center justify-start self-stretch shrink-0 relative">
                                        <input
                                            id="length"
                                            type="number"
                                            min="0"
                                            max="10000"
                                            step="500"
                                            placeholder="1500"
                                            value={reportData.length}
                                            onChange={handleReportData}
                                            autoComplete="off"
                                            readOnly={isOutputCreated}
                                            style={{
                                                backgroundColor: isOutputCreated
                                                    ? "#f5f5f5"
                                                    : "#ffffff",
                                            }}
                                            className="rounded border-solid border-[#C2C2C2] border px-3 flex flex-row gap-1 items-end justify-start shrink-0 w-[80%] h-8 relative overflow-hidden text-gray02-70 text-left font-['Inter-Regular',_sans-serif] text-[11px] leading-5 font-normal"
                                        />
                                        <div className="text-[#000000] text-left font-['Inter-Regular',_sans-serif] text-[11px] leading-5 font-normal relative">
                                            자 이상{" "}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#ffffff] rounded-[10px] p-4 flex flex-col gap-2.5 items-start justify-start shrink-0 relative w-[98.5%] ">
                                <div className="flex flex-col gap-[13px] items-start justify-start shrink-0 w-full relative">
                                    <div className="flex flex-row items-center justify-between self-stretch shrink-0 relative">
                                        <div className="text-left font-['Inter-SemiBold',_sans-serif] text-base font-semibold relative">
                                            <span>
                                                <span>보고서 포함사항</span>
                                                <span className="text-orange-500">
                                                    *
                                                </span>
                                            </span>{" "}
                                        </div>
                                        <div className="flex flex-row gap-[11px] items-center justify-start shrink-0 relative">
                                            <svg
                                                className="cursor-pointer shrink-0 w-4 h-4 relative overflow-visible "
                                                width="17"
                                                height="17"
                                                viewBox="0 0 17 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                id="contents"
                                                onClick={resetReportData}
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M7.82 0.528976C9.20071 0.411147 10.5884 0.653982 11.847 1.23369C13.1056 1.81341 14.1921 2.71011 15 3.83598V2.24998C15 2.05106 15.079 1.8603 15.2197 1.71965C15.3603 1.57899 15.5511 1.49998 15.75 1.49998C15.9489 1.49998 16.1397 1.57899 16.2803 1.71965C16.421 1.8603 16.5 2.05106 16.5 2.24998V6.49998H12.25C12.0511 6.49998 11.8603 6.42096 11.7197 6.28031C11.579 6.13965 11.5 5.94889 11.5 5.74998C11.5 5.55106 11.579 5.3603 11.7197 5.21965C11.8603 5.07899 12.0511 4.99998 12.25 4.99998H13.977C13.2931 3.92988 12.3107 3.08356 11.1512 2.56556C9.9917 2.04757 8.70584 1.88058 7.45248 2.08524C6.19912 2.2899 5.03316 2.85723 4.09864 3.71715C3.16412 4.57708 2.50198 5.69192 2.194 6.92398C2.17128 7.02076 2.12955 7.11206 2.07123 7.19257C2.01291 7.27308 1.93917 7.34119 1.85429 7.39294C1.76942 7.4447 1.6751 7.47906 1.57682 7.49403C1.47854 7.50901 1.37827 7.5043 1.28182 7.48017C1.18538 7.45604 1.0947 7.41298 1.01505 7.3535C0.935404 7.29401 0.868375 7.21928 0.817865 7.13366C0.767355 7.04803 0.734371 6.95322 0.720832 6.85473C0.707293 6.75625 0.713469 6.65605 0.739 6.55998C1.14354 4.9424 2.0434 3.49166 3.31279 2.41052C4.58218 1.32939 6.15766 0.671906 7.819 0.529976L7.82 0.528976ZM4.42 15.381C5.49199 16.0164 6.69758 16.3925 7.94068 16.4795C9.18378 16.5665 10.43 16.3618 11.58 15.8819C12.73 15.402 13.752 14.6601 14.5646 13.7153C15.3771 12.7704 15.9577 11.6489 16.26 10.44C16.305 10.2482 16.2728 10.0464 16.1702 9.87814C16.0676 9.70993 15.903 9.58883 15.7119 9.54101C15.5207 9.4932 15.3185 9.52251 15.1488 9.62261C14.9791 9.72271 14.8556 9.88557 14.805 10.076C14.4969 11.3078 13.8347 12.4223 12.9002 13.282C11.9658 14.1417 10.8 14.7089 9.54688 14.9136C8.29373 15.1182 7.00809 14.9513 5.84871 14.4336C4.68933 13.9158 3.70699 13.0698 3.023 12H4.75C4.94891 12 5.13968 11.921 5.28033 11.7803C5.42098 11.6397 5.5 11.4489 5.5 11.25C5.5 11.0511 5.42098 10.8603 5.28033 10.7196C5.13968 10.579 4.94891 10.5 4.75 10.5H0.5V14.75C0.5 14.9489 0.579018 15.1397 0.71967 15.2803C0.860322 15.421 1.05109 15.5 1.25 15.5C1.44891 15.5 1.63968 15.421 1.78033 15.2803C1.92098 15.1397 2 14.9489 2 14.75V13.164C2.64478 14.0623 3.46879 14.8172 4.42 15.381Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                {isModalOpen && (
                                    <div className="w-full flex flex-row items-center justify-between">
                                        <input
                                            id="newContent"
                                            placeholder="ex)실험 방법"
                                            value={newContent}
                                            onChange={changeNewContent}
                                            className="bg-gray02-10 rounded border-solid border border-[#B5D0C9] px-3"
                                        />
                                        <button
                                            type="button"
                                            onClick={addNewContent}
                                            className="bg-[#e7FAF5] border border-[#B5D0C9] rounded-lg px-2 self-stretch whitespace-nowrap"
                                        >
                                            추가
                                        </button>
                                    </div>
                                )}
                                <div className="flex flex-col gap-2.5 items-start justify-start shrink-0 w-full relative">
                                    <div className="flex flex-row flex-wrap gap-[7px] items-start justify-start self-stretch shrink-0 relative">
                                        {reportData.contents &&
                                            Array.from(reportData.contents).map(
                                                (content) => (
                                                    <Tag
                                                        content={content}
                                                        isOutputCreated={
                                                            isOutputCreated
                                                        }
                                                        handleContentDelete={
                                                            handleContentDelete
                                                        }
                                                    ></Tag>
                                                )
                                            )}
                                        <button
                                            type="button"
                                            onClick={handleModal}
                                            className={`${
                                                isOutputCreated ? "hidden" : ""
                                            } bg-white rounded-[50px] border-solid border-[#B5D0C9] border pb-[0.15rem] flex flex-row gap-1 items-center justify-center relative w-[24px] h-[24px]`}
                                        >
                                            <span>+</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#ffffff] rounded-[10px] p-4 flex flex-col gap-2.5 items-center justify-center shrink-0 relative w-[98.5%] ">
                                <div className="flex flex-col gap-2.5 items-center justify-center shrink-0 w-full relative">
                                    <div className="flex flex-row items-center justify-between self-stretch shrink-0 relative">
                                        <div className="px-1 text-[#000000] text-left font-['Inter-SemiBold',_sans-serif] text-base font-semibold relative">
                                            <span>
                                                <span>연구 목적 및 방법</span>
                                                <span className="text-orange-500">
                                                    *
                                                </span>
                                            </span>{" "}
                                        </div>
                                        <svg
                                            className="cursor-pointer shrink-0 w-4 h-4 relative overflow-visible"
                                            width="16"
                                            height="17"
                                            viewBox="0 0 16 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            id="purposeAndMethod"
                                            onClick={resetReportData}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M7.32 0.528976C8.70071 0.411147 10.0884 0.653982 11.347 1.23369C12.6056 1.81341 13.6921 2.71011 14.5 3.83598V2.24998C14.5 2.05106 14.579 1.8603 14.7197 1.71965C14.8603 1.57899 15.0511 1.49998 15.25 1.49998C15.4489 1.49998 15.6397 1.57899 15.7803 1.71965C15.921 1.8603 16 2.05106 16 2.24998V6.49998H11.75C11.5511 6.49998 11.3603 6.42096 11.2197 6.28031C11.079 6.13965 11 5.94889 11 5.74998C11 5.55106 11.079 5.3603 11.2197 5.21965C11.3603 5.07899 11.5511 4.99998 11.75 4.99998H13.477C12.7931 3.92988 11.8107 3.08356 10.6512 2.56556C9.4917 2.04757 8.20584 1.88058 6.95248 2.08524C5.69912 2.2899 4.53316 2.85723 3.59864 3.71715C2.66412 4.57708 2.00198 5.69192 1.694 6.92398C1.67128 7.02076 1.62955 7.11206 1.57123 7.19257C1.51291 7.27308 1.43917 7.34119 1.35429 7.39294C1.26942 7.4447 1.1751 7.47906 1.07682 7.49403C0.97854 7.50901 0.878265 7.5043 0.781825 7.48017C0.685385 7.45604 0.594703 7.41298 0.515053 7.3535C0.435404 7.29401 0.368375 7.21928 0.317865 7.13366C0.267355 7.04803 0.234371 6.95322 0.220832 6.85473C0.207293 6.75625 0.213469 6.65605 0.239 6.55998C0.643544 4.9424 1.5434 3.49166 2.81279 2.41052C4.08218 1.32939 5.65766 0.671906 7.319 0.529976L7.32 0.528976ZM3.92 15.381C4.99199 16.0164 6.19758 16.3925 7.44068 16.4795C8.68378 16.5665 9.93001 16.3618 11.08 15.8819C12.23 15.402 13.252 14.6601 14.0646 13.7153C14.8771 12.7704 15.4577 11.6489 15.76 10.44C15.805 10.2482 15.7728 10.0464 15.6702 9.87814C15.5676 9.70993 15.403 9.58883 15.2119 9.54101C15.0207 9.4932 14.8185 9.52251 14.6488 9.62261C14.4791 9.72271 14.3556 9.88557 14.305 10.076C13.9969 11.3078 13.3347 12.4223 12.4002 13.282C11.4658 14.1417 10.3 14.7089 9.04688 14.9136C7.79373 15.1182 6.50809 14.9513 5.34871 14.4336C4.18933 13.9158 3.20699 13.0698 2.523 12H4.25C4.44891 12 4.63968 11.921 4.78033 11.7803C4.92098 11.6397 5 11.4489 5 11.25C5 11.0511 4.92098 10.8603 4.78033 10.7196C4.63968 10.579 4.44891 10.5 4.25 10.5H0V14.75C0 14.9489 0.0790176 15.1397 0.21967 15.2803C0.360322 15.421 0.551088 15.5 0.75 15.5C0.948912 15.5 1.13968 15.421 1.28033 15.2803C1.42098 15.1397 1.5 14.9489 1.5 14.75V13.164C2.14478 14.0623 2.96879 14.8172 3.92 15.381Z"
                                                fill="black"
                                            />
                                        </svg>
                                    </div>
                                    <textarea
                                        id="purposeAndMethod"
                                        placeholder="진행한 실험이나 연구에 대한 핵심적인 내용을 설명해주세요."
                                        value={reportData.purposeAndMethod}
                                        onChange={handleReportData}
                                        readOnly={isOutputCreated}
                                        style={{
                                            backgroundColor: isOutputCreated
                                                ? "#f5f5f5"
                                                : "#ffffff",
                                        }}
                                        className="rounded border-solid border-[#C2C2C2] border self-stretch shrink-0 h-[74px] relative overflow-hidden text-[#9e9e9e] text-left font-['Inter-Regular',_sans-serif] text-xs leading-5 font-normal p-2"
                                    />
                                </div>
                            </div>
                            <div className="bg-[#ffffff] rounded-[10px] p-4 flex flex-col gap-2.5 items-center justify-start shrink-0 relative w-[98.5%] ">
                                <div className="flex flex-col gap-1 items-start justify-start shrink-0 w-full relative">
                                    <div className="flex flex-row items-center justify-between shrink-0 w-full relative">
                                        <div className="px-1 text-[#000000] text-left font-['Inter-SemiBold',_sans-serif] text-base font-semibold relative">
                                            결과 보고서{" "}
                                        </div>
                                        <svg
                                            className="cursor-pointer shrink-0 w-4 h-4 relative overflow-visible"
                                            width="17"
                                            height="16"
                                            viewBox="0 0 17 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            id="files"
                                            onClick={resetReportData}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M7.82 0.0289756C9.20071 -0.0888534 10.5884 0.153982 11.847 0.733693C13.1056 1.31341 14.1921 2.21011 15 3.33598V1.74998C15 1.55106 15.079 1.3603 15.2197 1.21965C15.3603 1.07899 15.5511 0.999976 15.75 0.999976C15.9489 0.999976 16.1397 1.07899 16.2803 1.21965C16.421 1.3603 16.5 1.55106 16.5 1.74998V5.99998H12.25C12.0511 5.99998 11.8603 5.92096 11.7197 5.78031C11.579 5.63965 11.5 5.44889 11.5 5.24998C11.5 5.05106 11.579 4.8603 11.7197 4.71965C11.8603 4.57899 12.0511 4.49998 12.25 4.49998H13.977C13.2931 3.42988 12.3107 2.58356 11.1512 2.06556C9.9917 1.54757 8.70584 1.38058 7.45248 1.58524C6.19912 1.7899 5.03316 2.35723 4.09864 3.21715C3.16412 4.07708 2.50198 5.19192 2.194 6.42398C2.17128 6.52076 2.12955 6.61206 2.07123 6.69257C2.01291 6.77308 1.93917 6.84119 1.85429 6.89294C1.76942 6.9447 1.6751 6.97906 1.57682 6.99403C1.47854 7.00901 1.37827 7.0043 1.28182 6.98017C1.18538 6.95604 1.0947 6.91298 1.01505 6.8535C0.935404 6.79401 0.868375 6.71928 0.817865 6.63366C0.767355 6.54803 0.734371 6.45322 0.720832 6.35473C0.707293 6.25625 0.713469 6.15605 0.739 6.05998C1.14354 4.4424 2.0434 2.99166 3.31279 1.91052C4.58218 0.82939 6.15766 0.171906 7.819 0.0299756L7.82 0.0289756ZM4.42 14.881C5.49199 15.5164 6.69758 15.8925 7.94068 15.9795C9.18378 16.0665 10.43 15.8618 11.58 15.3819C12.73 14.902 13.752 14.1601 14.5646 13.2153C15.3771 12.2704 15.9577 11.1489 16.26 9.93997C16.305 9.74817 16.2728 9.54635 16.1702 9.37814C16.0676 9.20993 15.903 9.08883 15.7119 9.04101C15.5207 8.9932 15.3185 9.02251 15.1488 9.12261C14.9791 9.22271 14.8556 9.38557 14.805 9.57598C14.4969 10.8078 13.8347 11.9223 12.9002 12.782C11.9658 13.6417 10.8 14.2089 9.54688 14.4136C8.29373 14.6182 7.00809 14.4513 5.84871 13.9336C4.68933 13.4158 3.70699 12.5698 3.023 11.5H4.75C4.94891 11.5 5.13968 11.421 5.28033 11.2803C5.42098 11.1397 5.5 10.9489 5.5 10.75C5.5 10.5511 5.42098 10.3603 5.28033 10.2196C5.13968 10.079 4.94891 9.99998 4.75 9.99998H0.5V14.25C0.5 14.4489 0.579018 14.6397 0.71967 14.7803C0.860322 14.921 1.05109 15 1.25 15C1.44891 15 1.63968 14.921 1.78033 14.7803C1.92098 14.6397 2 14.4489 2 14.25V12.664C2.64478 13.5623 3.46879 14.3172 4.42 14.881Z"
                                                fill="black"
                                            />
                                        </svg>
                                    </div>
                                    <div className="px-1 text-[#000000] text-left font-['Inter-Regular',_sans-serif] text-[9px] font-normal relative">
                                        결과 데이터를 이미지/엑셀 형식으로, 파일
                                        이름을 정확히 작성해주시고 첨부해주세요.{" "}
                                    </div>
                                    <div className="px-1 text-[11px] font-semibold w-full">
                                        {reportData.files.length > 0 && (
                                            <div>
                                                {reportData.files.map(
                                                    (file, index) => {
                                                        const [
                                                            pureName,
                                                            extension,
                                                        ] = splitFileName(
                                                            file.name
                                                        );
                                                        return (
                                                            <div>
                                                                <div className="flex items-center justify-between ">
                                                                    <div className="flex-grow">
                                                                        <span
                                                                            contentEditable="true"
                                                                            className="editable flex-grow"
                                                                            onInput={
                                                                                handleFileName
                                                                            }
                                                                            onKeyDown={
                                                                                handleKeyDown
                                                                            }
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                pureName
                                                                            }
                                                                        </span>
                                                                        <span>
                                                                            {
                                                                                extension
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        className="text-center"
                                                                        onClick={() => {
                                                                            handleFileDelete(
                                                                                index
                                                                            );
                                                                        }}
                                                                    >
                                                                        x
                                                                    </button>
                                                                </div>
                                                                <textarea
                                                                    placeholder="파일에 대한 설명을 입력해 주세요."
                                                                    className="border w-full"
                                                                />
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    ref={fileUploadRef}
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={handleUpload}
                                    disabled={isOutputCreated}
                                    className={`${
                                        isOutputCreated
                                            ? "bg-[#F5F5F5] border-[#c5c5c5] text-[#9e9e9e]"
                                            : "bg-[#F7F5FF] border-[#694df9] text-[#694DF9]"
                                    } self-stretch border border-[#694df9] text-[#694DF9] rounded-[4px]`}
                                >
                                    파일 업로드
                                </button>
                            </div>
                            <div className="bg-[#ffffff] rounded-[10px] p-4 flex flex-col gap-2.5 items-center justify-start shrink-0 relative w-[98.5%] ">
                                <div className="flex flex-col gap-1.5 items-start justify-start shrink-0 w-full relative">
                                    <div className="flex flex-row items-center justify-between shrink-0 w-full relative">
                                        <div className="flex flex-row items-center justify-between shrink-0 relative">
                                            <div className="px-1 text-[#000000] text-left font-['Inter-SemiBold',_sans-serif] text-base font-semibold relative">
                                                프롬프트{" "}
                                            </div>
                                            <svg
                                                className="shrink-0 w-5 h-5 relative overflow-visible"
                                                width="21"
                                                height="20"
                                                viewBox="0 0 21 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M7.89807 12.8089C8.07429 12.9334 8.28483 12.9999 8.50055 12.9994C8.71627 12.9989 8.92648 12.9313 9.10207 12.8059C9.28007 12.6759 9.41507 12.4959 9.48907 12.2879L9.93607 10.9149C10.0508 10.5708 10.2439 10.258 10.5003 10.0014C10.7566 9.74469 11.0691 9.55112 11.4131 9.43595L12.8041 8.98595C13.0097 8.91149 13.1868 8.77438 13.3104 8.59394C13.4341 8.4135 13.4979 8.19882 13.4931 7.98015C13.4882 7.76148 13.4149 7.54985 13.2834 7.37508C13.1519 7.20031 12.9688 7.0712 12.7601 7.00595L11.3851 6.55795C11.0407 6.44338 10.7278 6.25029 10.4709 5.99395C10.2141 5.73761 10.0203 5.42504 9.90507 5.08095L9.45307 3.69295C9.38029 3.48846 9.24558 3.31174 9.06769 3.18738C8.8898 3.06302 8.67756 2.99719 8.46052 2.99906C8.24347 3.00093 8.03241 3.07041 7.85668 3.19782C7.68096 3.32523 7.54932 3.50424 7.48007 3.70995L7.02307 5.10995C6.90835 5.44482 6.71915 5.74929 6.46972 6.00045C6.22029 6.25161 5.91713 6.44291 5.58307 6.55995L4.19307 7.00695C3.98867 7.07989 3.81204 7.21465 3.68772 7.39254C3.5634 7.57043 3.49754 7.78262 3.4993 7.99964C3.50106 8.21666 3.57035 8.42775 3.69754 8.6036C3.82473 8.77945 4.00351 8.91133 4.20907 8.98095L5.58307 9.42595C5.92914 9.54079 6.24343 9.73526 6.50066 9.9937C6.75788 10.2521 6.95086 10.5673 7.06407 10.9139L7.51607 12.3049C7.58807 12.5089 7.72207 12.6849 7.89807 12.8089ZM7.98307 5.39395L8.51007 4.01695L8.95007 5.39395C9.11359 5.88703 9.39021 6.33501 9.7578 6.70208C10.1254 7.06915 10.5738 7.34513 11.0671 7.50795L12.4731 8.03795L11.0911 8.48495C10.5982 8.64904 10.1504 8.92583 9.78322 9.29333C9.41606 9.66083 9.13969 10.1089 8.97607 10.6019L8.45307 11.9799L8.00407 10.6009C7.84272 10.1081 7.56882 9.65959 7.20407 9.29095C6.83474 8.92332 6.38585 8.6455 5.89207 8.47895L4.51407 7.95695L5.90007 7.50695C6.38669 7.33839 6.82806 7.06023 7.19007 6.69395C7.54929 6.32614 7.82042 5.88166 7.98307 5.39395ZM14.0351 16.8509C14.1374 16.9229 14.255 16.97 14.3786 16.9886C14.5023 17.0072 14.6286 16.9968 14.7475 16.9582C14.8664 16.9196 14.9747 16.8538 15.0639 16.7662C15.153 16.6785 15.2205 16.5712 15.2611 16.4529L15.5091 15.6909C15.5628 15.533 15.6517 15.3894 15.7691 15.2709C15.8871 15.1509 16.0311 15.0629 16.1891 15.0109L16.9611 14.7589C17.1204 14.704 17.2582 14.6001 17.355 14.4621C17.4518 14.3241 17.5025 14.1591 17.5 13.9906C17.4974 13.8221 17.4417 13.6587 17.3408 13.5237C17.2399 13.3888 17.099 13.2891 16.9381 13.2389L16.1741 12.9889C16.0161 12.936 15.8725 12.8473 15.7546 12.7297C15.6366 12.6121 15.5475 12.4687 15.4941 12.3109L15.2421 11.5379C15.188 11.379 15.0852 11.241 14.9483 11.1437C14.8114 11.0464 14.6474 10.9946 14.4795 10.9957C14.3115 10.9968 14.1482 11.0508 14.0126 11.1499C13.877 11.249 13.7761 11.3883 13.7241 11.5479L13.4771 12.3099C13.426 12.4667 13.3394 12.6096 13.2241 12.7273C13.1087 12.8451 12.9677 12.9347 12.8121 12.9889L12.0391 13.2409C11.88 13.2949 11.742 13.3974 11.6445 13.5342C11.547 13.6709 11.495 13.8349 11.4959 14.0028C11.4968 14.1708 11.5505 14.3342 11.6494 14.4699C11.7483 14.6056 11.8875 14.7067 12.0471 14.7589L12.8101 15.0059C12.9701 15.0599 13.1141 15.1489 13.2321 15.2669C13.3511 15.386 13.4391 15.5299 13.4901 15.6889L13.7431 16.4629C13.7979 16.6194 13.8999 16.755 14.0351 16.8509ZM13.1221 14.0579L12.9431 13.9999L13.1271 13.9359C13.4296 13.8296 13.7039 13.6558 13.9292 13.4276C14.1544 13.1994 14.3247 12.9228 14.4271 12.6189L14.4851 12.4409L14.5451 12.6219C14.6472 12.9284 14.8192 13.2069 15.0477 13.4353C15.2761 13.6638 15.5546 13.8359 15.8611 13.9379L16.0561 14.0009L15.8761 14.0609C15.569 14.1633 15.29 14.3359 15.0614 14.5651C14.8327 14.7943 14.6607 15.0736 14.5591 15.3809L14.5001 15.5619L14.4421 15.3819C14.3405 15.0737 14.1682 14.7936 13.939 14.5639C13.7098 14.3341 13.43 14.1612 13.1221 14.0589"
                                                    fill="black"
                                                />
                                            </svg>
                                        </div>
                                        <svg
                                            className="cursor-pointer shrink-0 w-4 h-4 relative overflow-visible"
                                            width="17"
                                            height="16"
                                            viewBox="0 0 17 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            id="requirement"
                                            onClick={resetReportData}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M7.82 0.0289756C9.20071 -0.0888534 10.5884 0.153982 11.847 0.733693C13.1056 1.31341 14.1921 2.21011 15 3.33598V1.74998C15 1.55106 15.079 1.3603 15.2197 1.21965C15.3603 1.07899 15.5511 0.999976 15.75 0.999976C15.9489 0.999976 16.1397 1.07899 16.2803 1.21965C16.421 1.3603 16.5 1.55106 16.5 1.74998V5.99998H12.25C12.0511 5.99998 11.8603 5.92096 11.7197 5.78031C11.579 5.63965 11.5 5.44889 11.5 5.24998C11.5 5.05106 11.579 4.8603 11.7197 4.71965C11.8603 4.57899 12.0511 4.49998 12.25 4.49998H13.977C13.2931 3.42988 12.3107 2.58356 11.1512 2.06556C9.9917 1.54757 8.70584 1.38058 7.45248 1.58524C6.19912 1.7899 5.03316 2.35723 4.09864 3.21715C3.16412 4.07708 2.50198 5.19192 2.194 6.42398C2.17128 6.52076 2.12955 6.61206 2.07123 6.69257C2.01291 6.77308 1.93917 6.84119 1.85429 6.89294C1.76942 6.9447 1.6751 6.97906 1.57682 6.99403C1.47854 7.00901 1.37827 7.0043 1.28182 6.98017C1.18538 6.95604 1.0947 6.91298 1.01505 6.8535C0.935404 6.79401 0.868375 6.71928 0.817865 6.63366C0.767355 6.54803 0.734371 6.45322 0.720832 6.35473C0.707293 6.25625 0.713469 6.15605 0.739 6.05998C1.14354 4.4424 2.0434 2.99166 3.31279 1.91052C4.58218 0.82939 6.15766 0.171906 7.819 0.0299756L7.82 0.0289756ZM4.42 14.881C5.49199 15.5164 6.69758 15.8925 7.94068 15.9795C9.18378 16.0665 10.43 15.8618 11.58 15.3819C12.73 14.902 13.752 14.1601 14.5646 13.2153C15.3771 12.2704 15.9577 11.1489 16.26 9.93997C16.305 9.74817 16.2728 9.54635 16.1702 9.37814C16.0676 9.20993 15.903 9.08883 15.7119 9.04101C15.5207 8.9932 15.3185 9.02251 15.1488 9.12261C14.9791 9.22271 14.8556 9.38557 14.805 9.57598C14.4969 10.8078 13.8347 11.9223 12.9002 12.782C11.9658 13.6417 10.8 14.2089 9.54688 14.4136C8.29373 14.6182 7.00809 14.4513 5.84871 13.9336C4.68933 13.4158 3.70699 12.5698 3.023 11.5H4.75C4.94891 11.5 5.13968 11.421 5.28033 11.2803C5.42098 11.1397 5.5 10.9489 5.5 10.75C5.5 10.5511 5.42098 10.3603 5.28033 10.2196C5.13968 10.079 4.94891 9.99998 4.75 9.99998H0.5V14.25C0.5 14.4489 0.579018 14.6397 0.71967 14.7803C0.860322 14.921 1.05109 15 1.25 15C1.44891 15 1.63968 14.921 1.78033 14.7803C1.92098 14.6397 2 14.4489 2 14.25V12.664C2.64478 13.5623 3.46879 14.3172 4.42 14.881Z"
                                                fill="black"
                                            />
                                        </svg>
                                    </div>
                                    <div className="px-1 text-[#000000] text-left font-['Inter-Regular',_sans-serif] text-[9px] font-normal relative">
                                        레포트의 내용을 세밀하게 조정하고
                                        싶다면, 아래 항목에 필요 사항을
                                        <br />
                                        작성해주세요{" "}
                                    </div>
                                </div>
                                <textarea
                                    id="requirement"
                                    placeholder="ex) 서론 부분을 독자들의 흥미를 이끄는
                                    내용으로 시작할 수 있게 해줘"
                                    value={reportData.requirement}
                                    onChange={handleReportData}
                                    readOnly={isOutputCreated}
                                    style={{
                                        backgroundColor: isOutputCreated
                                            ? "#f5f5f5"
                                            : "#ffffff",
                                    }}
                                    className="rounded border-solid border-[#C2C2C2] border self-stretch shrink-0 h-[74px] relative overflow-hidden text-[#9e9e9e] text-left font-['Inter-Regular',_sans-serif] text-xs leading-5 font-normal p-2"
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        className="bg-[#005f5f] rounded-[10px] bottom-5 mx-3 pt-2 pr-4 pb-2 pl-4 flex gap-1 items-center justify-center self-stretch shrink-0 h-[60px] relative"
                        style={{
                            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                        }}
                        type="submit"
                    >
                        <div className="flex flex-row gap-1.5 items-center justify-start shrink-0 relative">
                            <div className="text-white text-center font-body-text-inter-14-medium-font-family text-body-text-inter-14-medium-font-size leading-body-text-inter-14-medium-line-height font-body-text-inter-14-medium-font-weight relative">
                                CREATE{" "}
                            </div>
                            <svg
                                className="shrink-0 w-5 h-5 relative overflow-visible"
                                width="21"
                                height="20"
                                viewBox="0 0 21 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7.89807 12.8089C8.07429 12.9334 8.28483 12.9999 8.50055 12.9994C8.71627 12.9989 8.92648 12.9313 9.10207 12.8059C9.28007 12.6759 9.41507 12.4959 9.48907 12.2879L9.93607 10.9149C10.0508 10.5708 10.2439 10.258 10.5003 10.0014C10.7566 9.74469 11.0691 9.55112 11.4131 9.43595L12.8041 8.98595C13.0097 8.91149 13.1868 8.77438 13.3104 8.59394C13.4341 8.4135 13.4979 8.19882 13.4931 7.98015C13.4882 7.76148 13.4149 7.54985 13.2834 7.37508C13.1519 7.20031 12.9688 7.0712 12.7601 7.00595L11.3851 6.55795C11.0407 6.44338 10.7278 6.25029 10.4709 5.99395C10.2141 5.73761 10.0203 5.42504 9.90507 5.08095L9.45307 3.69295C9.38029 3.48846 9.24558 3.31174 9.06769 3.18738C8.8898 3.06302 8.67756 2.99719 8.46052 2.99906C8.24347 3.00093 8.03241 3.07041 7.85668 3.19782C7.68096 3.32523 7.54932 3.50424 7.48007 3.70995L7.02307 5.10995C6.90835 5.44482 6.71915 5.74929 6.46972 6.00045C6.22029 6.25161 5.91713 6.44291 5.58307 6.55995L4.19307 7.00695C3.98867 7.07989 3.81204 7.21465 3.68772 7.39254C3.5634 7.57043 3.49754 7.78262 3.4993 7.99964C3.50106 8.21666 3.57035 8.42775 3.69754 8.6036C3.82473 8.77945 4.00351 8.91133 4.20907 8.98095L5.58307 9.42595C5.92914 9.54079 6.24343 9.73526 6.50066 9.9937C6.75788 10.2521 6.95086 10.5673 7.06407 10.9139L7.51607 12.3049C7.58807 12.5089 7.72207 12.6849 7.89807 12.8089ZM7.98307 5.39395L8.51007 4.01695L8.95007 5.39395C9.11359 5.88703 9.39021 6.33501 9.7578 6.70208C10.1254 7.06915 10.5738 7.34513 11.0671 7.50795L12.4731 8.03795L11.0911 8.48495C10.5982 8.64904 10.1504 8.92583 9.78322 9.29333C9.41606 9.66083 9.13969 10.1089 8.97607 10.6019L8.45307 11.9799L8.00407 10.6009C7.84272 10.1081 7.56882 9.65959 7.20407 9.29095C6.83474 8.92332 6.38585 8.6455 5.89207 8.47895L4.51407 7.95695L5.90007 7.50695C6.38669 7.33839 6.82806 7.06023 7.19007 6.69395C7.54929 6.32614 7.82042 5.88166 7.98307 5.39395ZM14.0351 16.8509C14.1374 16.9229 14.255 16.97 14.3786 16.9886C14.5023 17.0072 14.6286 16.9968 14.7475 16.9582C14.8664 16.9196 14.9747 16.8538 15.0639 16.7662C15.153 16.6785 15.2205 16.5712 15.2611 16.4529L15.5091 15.6909C15.5628 15.533 15.6517 15.3894 15.7691 15.2709C15.8871 15.1509 16.0311 15.0629 16.1891 15.0109L16.9611 14.7589C17.1204 14.704 17.2582 14.6001 17.355 14.4621C17.4518 14.3241 17.5025 14.1591 17.5 13.9906C17.4974 13.8221 17.4417 13.6587 17.3408 13.5237C17.2399 13.3888 17.099 13.2891 16.9381 13.2389L16.1741 12.9889C16.0161 12.936 15.8725 12.8473 15.7546 12.7297C15.6366 12.6121 15.5475 12.4687 15.4941 12.3109L15.2421 11.5379C15.188 11.379 15.0852 11.241 14.9483 11.1437C14.8114 11.0464 14.6474 10.9946 14.4795 10.9957C14.3115 10.9968 14.1482 11.0508 14.0126 11.1499C13.877 11.249 13.7761 11.3883 13.7241 11.5479L13.4771 12.3099C13.426 12.4667 13.3394 12.6096 13.2241 12.7273C13.1087 12.8451 12.9677 12.9347 12.8121 12.9889L12.0391 13.2409C11.88 13.2949 11.742 13.3974 11.6445 13.5342C11.547 13.6709 11.495 13.8349 11.4959 14.0028C11.4968 14.1708 11.5505 14.3342 11.6494 14.4699C11.7483 14.6056 11.8875 14.7067 12.0471 14.7589L12.8101 15.0059C12.9701 15.0599 13.1141 15.1489 13.2321 15.2669C13.3511 15.386 13.4391 15.5299 13.4901 15.6889L13.7431 16.4629C13.7979 16.6194 13.8999 16.755 14.0351 16.8509ZM13.1221 14.0579L12.9431 13.9999L13.1271 13.9359C13.4296 13.8296 13.7039 13.6558 13.9292 13.4276C14.1544 13.1994 14.3247 12.9228 14.4271 12.6189L14.4851 12.4409L14.5451 12.6219C14.6472 12.9284 14.8192 13.2069 15.0477 13.4353C15.2761 13.6638 15.5546 13.8359 15.8611 13.9379L16.0561 14.0009L15.8761 14.0609C15.569 14.1633 15.29 14.3359 15.0614 14.5651C14.8327 14.7943 14.6607 15.0736 14.5591 15.3809L14.5001 15.5619L14.4421 15.3819C14.3405 15.0737 14.1682 14.7936 13.939 14.5639C13.7098 14.3341 13.43 14.1612 13.1221 14.0589"
                                    fill="white"
                                />
                            </svg>
                        </div>
                    </button>
                </form>
                <div className="bg-[#d9d9d9] flex flex-row flex-grow gap-2.5 items-center justify-center shrink-0 h-full relative ">
                    <div className="bg-[#ffffff] shrink-0 w-[629px] h-[891px] relative"></div>
                </div>
            </div>
        </>
    );
};

export default EssayPage;
