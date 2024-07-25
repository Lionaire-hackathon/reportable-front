import { useEffect, useState, useRef } from "react";
import Header from "../components/common/Header";
import useMe from "../apis/hook/useMe";
import { useNavigate, useParams } from "react-router-dom";
import Tag from "../components/common/Tag";
import AWS from "aws-sdk";
import { getDocumentInfo, createReport, getDocFile } from "../apis/document";
import WordDocumentViewer from "../components/html/WordDocumentViewer";
import ResetIcon from "../components/atom/ResetIcon";

// AWS 자격 증명을 환경 변수로부터 설정합니다.
AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_REGION,
});

const s3 = new AWS.S3();

const PageState = {
    NORMAL: "NORMAL",
    MAKE_DOCUMENT: "MAKE_DOCUMENT",
    UPLOAD_FILE: "UPLOAD_FILE",
    MAKE_TEXT_REPORT: "MAKE_TEXT_REPORT",
    MAKE_DOCX_REPORT: "MAKE_DOCX_REPORT",
};

const ReportPage = () => {
    const { documentId } = useParams();
    const [pageState, setPageState] = useState(PageState.NORMAL);
    const [elementList, setElementList] = useState([]);
    const [documentInfo, setDocumentInfo] = useState();
    const splitElements = (inputString) => {
        const list = inputString.split(", ").map((item) => item.trim());
        return list;
    };

    const splitFileName = (fileName) => {
        const dotIndex = fileName.lastIndexOf(".");
        if (dotIndex === -1) return [fileName, ""];
        return [fileName.substring(0, dotIndex), fileName.substring(dotIndex)];
    };

    useEffect(() => {
        const fetchDocumentInfo = async () => {
            try {
                const returnObject = await getDocumentInfo(documentId);
                setDocumentInfo(returnObject.data);
                setElementList(splitElements(returnObject.data.elements));
            } catch (error) {
                console.error("Error fetching document info:", error);
            }
        };

        fetchDocumentInfo();
    }, [documentId]);
    const { me, isLoadingMe } = useMe();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!me && !isLoadingMe) {
            alert("로그인이 필요합니다.");
            navigate("/");
            navigate("/signin");
        }
    }, [me]);

    const handleReportSubmit = async (e) => {
        e.preventDefault();
        setPageState(PageState.MAKE_TEXT_REPORT);
        try {
            // Claude api를 사용해서 레포트 생성
            await createReport(documentId);
            setPageState(PageState.MAKE_DOCX_REPORT);
            await getDocFile(documentId);
        } catch (error) {
            console.error("문서 생성 오류:", error);
            const errorMessage =
                error.response?.data?.message ||
                "An unexpected error occurred. Please try again.";
            alert(`${errorMessage} 문서 생성에 실패했습니다.`);
        }
        window.location.reload();
        setPageState(PageState.NORMAL);
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
            case PageState.UPLOAD_FILE:
                return (
                    <>
                        <span>첨</span>
                        <span>부</span>
                        <span>파</span>
                        <span>일</span>
                        <span>을</span>
                        <span className="mx-1"></span>
                        <span>업</span>
                        <span>로</span>
                        <span>드</span>
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

    return (
        <>
            {documentInfo && (
                <>
                    <Header className="fixed" headerType="research" />
                    <div
                        className="top-0 left-0 flex flex-col gap-2.5 items-center justify-between shrink-0 w-[313px] h-full fixed z-10"
                        style={{
                            background:
                                "linear-gradient(to left, #cae5e4, #cae5e4)",
                        }}
                    >
                        <div className="flex flex-col items-center justify-start shrink-0 w-[289px] py-4 max-h-[80%] overflow-auto gap-[11px] absolute top-[76px] bottom-20">
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
                                        <ResetIcon
                                            id="topic"
                                            isDisabled={true}
                                        />
                                    </div>
                                    <textarea
                                        placeholder="작성할 보고서의 주제를 알려주세요."
                                        id="topic"
                                        value={documentInfo.title}
                                        readOnly
                                        className="bg-[#f5f5f5] text-[#9E9E9E] rounded border-solid border-[#C2C2C2] border self-stretch shrink-0 h-[74px] relative overflow-auto text-left font-['Inter-Regular',_sans-serif] text-xs leading-5 font-normal p-2"
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
                                        <ResetIcon
                                            id="length"
                                            isDisabled={true}
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
                                            value={documentInfo.amount}
                                            autoComplete="off"
                                            readOnly
                                            className="bg-[#f5f5f5] text-[#9E9E9E] rounded border-solid border-[#C2C2C2] border px-3 flex flex-row gap-1 items-end justify-start shrink-0 w-[80%] h-8 relative overflow-hidden text-gray02-70 text-left font-['Inter-Regular',_sans-serif] text-[11px] leading-5 font-normal"
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
                                            <ResetIcon
                                                id="contents"
                                                isDisabled={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2.5 items-start justify-start shrink-0 w-full relative">
                                    <div className="flex flex-row flex-wrap gap-[7px] items-start justify-start self-stretch shrink-0 relative">
                                        {elementList &&
                                            elementList.map((content) => (
                                                <Tag
                                                    content={content}
                                                    isReadOnly={true}
                                                ></Tag>
                                            ))}
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
                                        <ResetIcon
                                            id="purposeAndMethod"
                                            isDisabled={true}
                                        />
                                    </div>
                                    <textarea
                                        id="purposeAndMethod"
                                        placeholder="진행한 실험이나 연구에 대한 핵심적인 내용을 설명해주세요."
                                        value={documentInfo.core}
                                        readOnly
                                        className="bg-[#f5f5f5] text-[#9e9e9e] rounded border-solid border-[#C2C2C2] border self-stretch shrink-0 h-[74px] relative overflow-auto text-left font-['Inter-Regular',_sans-serif] text-xs leading-5 font-normal p-2"
                                    />
                                </div>
                            </div>
                            <div className="bg-[#ffffff] rounded-[10px] p-4 flex flex-col gap-2.5 items-center justify-start shrink-0 relative w-[98.5%] ">
                                <div className="flex flex-col gap-1 items-start justify-start shrink-0 w-full relative">
                                    <div className="flex flex-row items-center justify-between shrink-0 w-full relative">
                                        <div className="px-1 text-[#000000] text-left font-['Inter-SemiBold',_sans-serif] text-base font-semibold relative">
                                            참고 자료{" "}
                                        </div>
                                        <ResetIcon
                                            id="files"
                                            isDisabled={true}
                                        />
                                    </div>
                                    <div className="px-1 text-[#000000] text-left font-['Inter-Regular',_sans-serif] text-[9px] font-normal relative">
                                        결과 데이터를 이미지/엑셀 형식으로, 파일
                                        이름을 정확히 작성해주시고 첨부해주세요.{" "}
                                    </div>
                                    <div className="px-1 text-[11px] font-semibold w-full">
                                        {documentInfo.files.length > 0 && (
                                            <div>
                                                {documentInfo.files.map(
                                                    (file, index) => {
                                                        console.log(file.type);
                                                        const [
                                                            pureName,
                                                            extension,
                                                        ] = splitFileName(
                                                            file.name
                                                        );
                                                        return (
                                                            <div className="rounded border p-2">
                                                                <div className="flex items-center justify-between ">
                                                                    <div className="flex-grow">
                                                                        <span
                                                                            className="text-[#9e9e9e] flex-grow"
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {pureName +
                                                                                extension}
                                                                        </span>
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        className="hidden text-center"
                                                                    >
                                                                        x
                                                                    </button>
                                                                </div>
                                                                <div className="bg-[#373737] my-2 rounded flex flex-row gap-0 items-center justify-center w-full h-5 relative">
                                                                    <div
                                                                        className={`rounded flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 w-[50%] relative ${
                                                                            file.type ===
                                                                            "analysis"
                                                                                ? "bg-gradient-to-b from-[#838383] to-[#818181] "
                                                                                : ""
                                                                        }`}
                                                                        style={{
                                                                            border:
                                                                                file.type ===
                                                                                "analysis"
                                                                                    ? "1px solid #535353"
                                                                                    : "none",
                                                                        }}
                                                                    >
                                                                        <div
                                                                            className={`text-center font-['Inter-Bold',_sans-serif] text-[11px] font-bold relative ${
                                                                                file.type ===
                                                                                "analysis"
                                                                                    ? "text-[#e7e7e7]"
                                                                                    : "text-[#5f6265]"
                                                                            }`}
                                                                        >
                                                                            자료
                                                                            분석만
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className={`rounded flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 w-[50%] relative ${
                                                                            file.type !==
                                                                            "analysis"
                                                                                ? "bg-gradient-to-b from-[#838383] to-[#818181] "
                                                                                : ""
                                                                        }`}
                                                                        style={{
                                                                            border:
                                                                                file.type ===
                                                                                "analysis"
                                                                                    ? "none"
                                                                                    : "1px solid #535353",
                                                                        }}
                                                                    >
                                                                        <div
                                                                            className={`text-center font-['Inter-Bold',_sans-serif] text-[11px] font-bold relative ${
                                                                                file.type !==
                                                                                "analysis"
                                                                                    ? "text-[#e7e7e7]"
                                                                                    : "text-[#5f6265]"
                                                                            }`}
                                                                        >
                                                                            보고서
                                                                            첨부까지
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <textarea
                                                                    placeholder="파일에 대한 설명을 입력해 주세요."
                                                                    className="bg-[#f5f5f5] text-[#9e9e9e] overflow-auto border w-full"
                                                                    readOnly
                                                                    value={
                                                                        file.description
                                                                    }
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
                                    multiple
                                    disabled
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    disabled
                                    className="bg-[#F5F5F5] border-[#c5c5c5] text-[#9e9e9e] self-stretch border rounded-[4px]"
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
                                        <ResetIcon
                                            id="prompt"
                                            isDisabled={true}
                                        />
                                    </div>
                                    <div className="px-1 text-[#000000] text-left font-['Inter-Regular',_sans-serif] text-[9px] font-normal relative">
                                        레포트의 내용을 세밀하게 조정하고
                                        싶다면, 아래 항목에 필요 사항을
                                        <br />
                                        작성해주세요{" "}
                                    </div>
                                </div>
                                <textarea
                                    id="prompt"
                                    placeholder="ex) 서론 부분을 독자들의 흥미를 이끄는
                                    내용으로 시작할 수 있게 해줘"
                                    value={documentInfo.prompt}
                                    readOnly
                                    className="bg-[#f5f5f5] text-[#9e9e9e] rounded border-solid border-[#C2C2C2] border self-stretch shrink-0 h-[74px] relative overflow-auto text-left font-['Inter-Regular',_sans-serif] text-xs leading-5 font-normal p-2"
                                />
                            </div>
                        </div>
                        <button
                            className={`${
                                documentInfo.wordUrl ||
                                pageState !== PageState.NORMAL
                                    ? "hidden "
                                    : ""
                            } bg-[#005f5f] rounded-[10px] bottom-1 flex flex-row gap-1 items-center justify-center mx-auto w-[289px] shrink-0 h-[60px] absolute`}
                            style={{
                                boxShadow:
                                    "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                            }}
                            onClick={handleReportSubmit}
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
                    </div>
                    {documentInfo.wordUrl ? (
                        <div className="bg-[#d9d9d9] pt-[74px] pl-[313px] h-screen overflow-y-auto">
                            <WordDocumentViewer
                                document={documentInfo}
                            />
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
            )}
        </>
    );
};

export default ReportPage;
