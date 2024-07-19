import { useEffect, useState } from "react";
import Header from "../components/common/Header";
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

const EssayPage = () => {
  const { me, isLoadingMe } = useMe();
  const navigate = useNavigate();
  const [essayData, setEssayData] = useState({
    topic: "",
    length: 1000,
    format: "",
    requirement: "",
  });
  const [hasAdditionalQuestions, setHasAdditionalQuestions] = useState(false);
  const [additionalAnswers, setAdditionalAnswers] = useState([]);
  const [isOutputCreated, setIsOutputCreated] = useState(false);
  const [documentId, setDocumentId] = useState();
  const [responseJSON, setResponseJSON] = useState({
    needMorePrompt: 0,
    prompt: [""],
  });
  const [docUrl, setDocUrl] = useState("");

  const handleEssayData = (e) => {
    const { id, value } = e.target;
    setEssayData({
      ...essayData,
      [id]: value,
    });
  };

  const resetEssayData = (e) => {
    const { id } = e.target;
    setEssayData({
      ...essayData,
      [id]: "",
    });
  };

  // JSON 문자열의 큰따옴표를 올바르게 변환하는 함수
  const fixQuotes = (jsonStr) => {
    // 유니코드 이스케이프 시퀀스를 사용해 큰따옴표로 대체
    return jsonStr.replace(/“|”/g, '"').replace(/”/g, '"').replace(/‘|’/g, "'");
  };

  const handleEssaySubmit = async (e) => {
    e.preventDefault();
    try {
      const essaySubmitData = {
        title: essayData.topic,
        amount: essayData.length,
        type: "essay",
        prompt: essayData.requirement,
        form: essayData.format,
        elements: "",
        core: "",
      };
      const documentResponse = await documentApi(essaySubmitData);
      console.log("제출 완료");
      setDocumentId(documentResponse.data.id);
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
      setAdditionalAnswers(Array(processedResponse.prompt.length).fill(""));
      setIsOutputCreated(!isOutputCreated);
    } catch (error) {
      console.error("문서 생성 오류:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      alert(`${errorMessage} 문서 생성에 실패했습니다.`);
    }
    console.log(essayData);
  };

  const mergeQnA = (questions, answers) => {
    if (questions.length !== answers.length) {
      throw new Error("The arrays must have the same length");
    }

    let mergedString =
      " <다음은 너와 이전에 나누었던 에세이 작성에 대한 질의응답 정보야> ";
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
    const addPrompt = mergeQnA(responseJSON.prompt, additionalAnswers);
    const documentIdAndAddingPrompt = {
      documentId: documentId,
      addPrompt: addPrompt,
    };
    await answerAdditionalQuestion(documentIdAndAddingPrompt);
    const finalResponse = await createReport(documentId);
    console.log(finalResponse.data);
    const essay = await getCreatedReport(documentId);
    console.log(essay.data);
    const wordUrl = await getDocFile(documentId);
    setDocUrl(wordUrl.data);
    setIsOutputCreated(true);
    setHasAdditionalQuestions(false);
  };

  const updateAdditionalAnswer = (index, answer) => {
    setAdditionalAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = answer;
      return newAnswers;
    });
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
            className="fixed top-0 bottom-0 left-0 right-0 bg-[rgba(217,217,217,0.20)] z-40 flex "
            style={{ backdropFilter: "blur(5px)" }}
            onClick={() => {
              setHasAdditionalQuestions(false);
            }}
          ></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-[#ffffff] rounded-[10px] border-solid border-[#a0a0a0] border px-4 flex flex-col gap-[25px] items-center justify-center w-[40%] max-h-[600px]">
            <div className="mt-8 min-h-[20%] text-left text-xl font-semibold ">
              <span>
                <span className="div-span">추가질문</span>
                <span className="div-span2  text-orange-500">*</span>
              </span>{" "}
            </div>
            <div className="flex flex-col gap-5 items-start justify-start shrink-0 w-[95%] mx-auto !max-h-[400px] overflow-auto">
              {responseJSON.prompt.map((question, index) => (
                <Questionbox
                  question={question}
                  key={index}
                  index={index}
                  additionalAnswers={additionalAnswers}
                  updateAdditionalAnswer={updateAdditionalAnswer}
                />
              ))}
            </div>
            <button
              className="mb-8 min-h-[20%] bg-[#299792] rounded-[10px] flex flex-row items-center justify-center w-[95%] mx-auto h-[60px] shrink-0"
              style={{
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              }}
              onClick={handleFinalSubmit}
            >
              <div className="flex flex-row gap-1.5 items-center justify-center shrink-0 relative">
                <div className="text-white text-center relative">CREATE </div>
                <CreateIcon color="white" /> {/* CreateIcon 컴포넌트 사용 */}
              </div>
            </button>
          </div>
        </>
      )}
      <Header className="fixed" />
      <form
        className="top-0 left-0 flex flex-col gap-2.5 items-center justify-between shrink-0 w-[313px] h-full fixed"
        style={{
          background: "linear-gradient(to left, #cae5e4, #cae5e4)",
        }}
        onSubmit={handleEssaySubmit}
      >
        <div className="flex flex-col items-center justify-start shrink-0 w-[289px] py-4 max-h-[80%] overflow-auto gap-[11px] absolute top-28 bottom-20">
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
                    <span className="div-span">에세이 주제</span>
                    <span className="div-span2 text-orange-500">*</span>
                  </span>{" "}
                </div>
                <ResetIcon id="topic" onClick={resetEssayData} />
              </div>
              <textarea
                placeholder="작성할 에세이의 주제를 알려주세요."
                id="topic"
                value={essayData.topic}
                onChange={handleEssayData}
                readOnly={isOutputCreated}
                style={{
                  backgroundColor: isOutputCreated ? "#f5f5f5" : "#ffffff",
                }}
                className="overflow-auto rounded border-solid border-[#C2C2C2] border self-stretch shrink-0 h-[74px] relative text-[#9e9e9e] text-left font-['Inter-Regular',_sans-serif] text-xs leading-5 font-normal p-2"
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
                    <span className="div-span4 text-orange-500">*</span>
                  </span>{" "}
                </div>
                <ResetIcon id="length" onClick={resetEssayData} />
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
                  readOnly={isOutputCreated}
                  autoComplete="off"
                  style={{
                    backgroundColor: isOutputCreated ? "#f5f5f5" : "#ffffff",
                  }}
                  className="rounded border-solid border-[#C2C2C2] border px-3 flex flex-row gap-1 items-end justify-start shrink-0 w-[80%] h-8 relative overflow-hidden text-gray02-70 text-left font-['Inter-Regular',_sans-serif] text-[11px] leading-5 font-normal"
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
                <ResetIcon id="format" onClick={resetEssayData} />
              </div>
              <textarea
                id="format"
                placeholder="서론, 본론, 결론, 참고문헌 등 따라야
                                        할 에세이의 양식이 있다면
                                        알려주세요."
                value={essayData.format}
                onChange={handleEssayData}
                readOnly={isOutputCreated}
                style={{
                  backgroundColor: isOutputCreated ? "#f5f5f5" : "#ffffff",
                }}
                className="overflow-auto rounded border-solid border-[#C2C2C2] border self-stretch shrink-0 h-[74px] relative text-[#9e9e9e] text-left font-['Inter-Regular',_sans-serif] text-xs leading-5 font-normal p-2"
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
                <ResetIcon id="prompt" onClick={resetEssayData} />
              </div>
              <span className="px-1 text-[#000000] text-left font-['Inter-Regular',_sans-serif] text-[9px] font-normal relative">
                레포트의 내용을 세밀하게 조정하고 싶다면, 아래 항목에 필요
                사항을
                <br />
                작성해주세요{" "}
              </span>
            </div>
            <textarea
              id="requirement"
              placeholder="ex) 서론 부분을 독자들의 흥미를 이끄는
                                내용으로 시작할 수 있게 해줘"
              value={essayData.requirement}
              readOnly={isOutputCreated}
              onChange={handleEssayData}
              style={{
                backgroundColor: isOutputCreated ? "#f5f5f5" : "#ffffff",
              }}
              className=" overflow-auto rounded border-solid border-[#C2C2C2] border self-stretch shrink-0 h-[74px] relative  text-[#9e9e9e] text-left font-['Inter-Regular',_sans-serif] text-xs leading-5 font-normal p-2"
            />
          </div>
        </div>
        <button
          className="bg-[#005f5f] rounded-[10px] bottom-1 flex flex-row gap-1 items-center justify-center mx-auto w-[289px] shrink-0 h-[60px] absolute"
          style={{
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
          type="submit"
        >
          <div className="flex flex-row gap-1.5 items-center justify-start shrink-0 relative">
            <div className="text-white text-center font-body-text-inter-14-medium-font-family text-body-text-inter-14-medium-font-size leading-body-text-inter-14-medium-line-height font-body-text-inter-14-medium-font-weight relative">
              CREATE{" "}
            </div>
            <CreateIcon color="white" />
          </div>
        </button>
      </form>
      <div className="bg-[#d9d9d9] pt-[104px] pl-[313px] h-screen overflow-y-auto">
        <WordDocumentViewer documentUrl={docUrl} />
      </div>
    </>
  );
};

export default EssayPage;
