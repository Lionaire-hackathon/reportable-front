import React, { useState, useRef } from "react";
import styled from "styled-components";
import Modal from "../common/ModalOverlay"; // 수정된 Modal 경로
import { editReport } from "../../apis/document";

const A4Container = styled.div`
    width: 21cm;
    height: auto;
    min-height: 29.7cm;
    padding: 2.54cm;
    margin: 1cm auto;
    border: 1px solid #d3d3d3;
    border-radius: 5px;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    font-family: Arial, sans-serif;
    position: relative;
`;

const A4Content = styled.div`
    h1 {
        text-align: center;
        margin-bottom: 0;
        font-size: 18pt;
        font-weight: bold;
        color: #000000;
    }

    h2 {
        margin-bottom: 0;
        font-size: 14pt;
        font-weight: bold;
        color: #000000;
    }

    h3 {
        margin-bottom: 0;
        font-size: 11pt;
        font-weight: bold;
        color: #000000;
    }

    p {
        color: #000000;
        margin: 0;
        font-size: 11pt;
        white-space: pre-wrap;
        cursor: pointer;
    }

    img {
        max-width: 300px;
        height: auto;
        display: inline;
        margin: 10px 0;
    }

    .empty-paragraph {
        height: 20pt;
    }

    .active-paragraph {
        background-color: #e0e0e0;
    }
`;

const EditButton = styled.button`
    position: fixed;
    bottom: 1cm;
    right: 1cm;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #299792;
    color: white;
    cursor: pointer;
    font-size: 14px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;

const A4Document = ({ htmlContent, documentId }) => {
    const [selectedParagraphs, setSelectedParagraphs] = useState([]);
    const [startParagraph, setStartParagraph] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [prompt, setPrompt] = useState(""); // 추가된 상태
    const contentRef = useRef(null);

    const addUniqueIds = (htmlContent) => {
        let idCounter = 0;
        return htmlContent.replace(
            /(<h1|<h2|<h3|<p)([^>]*)>/g,
            (match, tag, attrs) => {
                idCounter += 1;
                const id = `paragraph-${idCounter}`;
                return `${tag} id="${id}"${attrs}>`;
            }
        );
    };

    const modifiedHtmlContent = addUniqueIds(
        htmlContent.replace(
            /<p[^>]*>\s*<\/p>/g,
            '<div class="empty-paragraph"></div>'
        )
    );

    const handleContainerClick = () => {
        if (isModalOpen) {
            return;
        }
        const elements = Array.from(
            contentRef.current.querySelectorAll(
                "h1, h2, h3, p:not(.empty-paragraph)"
            )
        );
        elements.forEach((el) => el.classList.remove("active-paragraph"));

        setSelectedParagraphs([]);
        setStartParagraph(null);
    };

    const handleParagraphClick = (event) => {
        if (isModalOpen) {
            return;
        }
        event.stopPropagation();
        const element = event.target;

        if (element.classList.contains("empty-paragraph")) {
            // 빈 공간 클릭 시 선택 초기화
            if (selectedParagraphs.length > 0) {
                const elements = Array.from(
                    contentRef.current.querySelectorAll(
                        "h1, h2, h3, p:not(.empty-paragraph)"
                    )
                );
                elements.forEach((el) =>
                    el.classList.remove("active-paragraph")
                );

                setSelectedParagraphs([]);
                setStartParagraph(null);
            }
            return;
        }

        if (
            element.tagName === "H1" ||
            element.tagName === "H2" ||
            element.tagName === "H3" ||
            element.tagName === "P"
        ) {
            const paragraphId = element.id;

            const elements = Array.from(
                contentRef.current.querySelectorAll(
                    "h1, h2, h3, p:not(.empty-paragraph)"
                )
            );

            if (!startParagraph) {
                // 새로운 선택 시작
                elements.forEach((el) =>
                    el.classList.remove("active-paragraph")
                );
                setStartParagraph(element);
                setSelectedParagraphs([paragraphId]);
                element.classList.add("active-paragraph");

                const rect = element.getBoundingClientRect();
                setModalPosition({
                    top: rect.top + window.scrollY,
                    left: rect.left + window.scrollX - 410,
                });
            } else {
                // 선택 범위 끝
                const startIndex = elements.findIndex(
                    (el) => el.id === startParagraph.id
                );
                const endIndex = elements.findIndex(
                    (el) => el.id === paragraphId
                );

                if (startIndex !== -1 && endIndex !== -1) {
                    const newSelection = elements
                        .slice(
                            Math.min(startIndex, endIndex),
                            Math.max(startIndex, endIndex) + 1
                        )
                        .map((el) => el.id);

                    elements.forEach((el) =>
                        el.classList.remove("active-paragraph")
                    );

                    newSelection.forEach((id) => {
                        const paragraph = elements.find((el) => el.id === id);
                        if (paragraph) {
                            paragraph.classList.add("active-paragraph");
                        }
                    });

                    const newSelectionTexts = elements
                        .filter((el) => newSelection.includes(el.id))
                        .map((el) => el.innerText);

                    setSelectedParagraphs(newSelectionTexts);

                    const rect = elements
                        .find((el) => el.id === newSelection[0])
                        .getBoundingClientRect();
                    setModalPosition({
                        top: rect.top + window.scrollY,
                        left: rect.left + window.scrollX - 410,
                    });
                }

                setStartParagraph(null);
            }
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        const elements = Array.from(
            contentRef.current.querySelectorAll(
                "h1, h2, h3, p:not(.empty-paragraph)"
            )
        );
        elements.forEach((el) => el.classList.remove("active-paragraph"));

        setSelectedParagraphs([]);
        setPrompt(""); // 모달 닫을 때 prompt 초기화
    };

    const handleModalConfirm = () => {
        if (selectedParagraphs.length > 0) {
            handleApiCall();
        }
        handleModalClose();
    };

    const handleApiCall = async () => {
        if (selectedParagraphs.length > 0) {
            setIsLoading(true);
            try {
                const editPromptDto = {
                    document_id: documentId,
                    prompt: prompt,
                    content_before: selectedParagraphs,
                };
                await editReport(editPromptDto);
                window.location.reload();
            } catch (error) {
                console.log({
                    paragraphsToChange: selectedParagraphs,
                    prompt: prompt,
                });
                //console.error("Error:", error);
            }
        }
    };

    const handleEditButtonClick = () => {
        if (selectedParagraphs.length === 0) {
            alert("문단을 선택해주세요.");
        } else {
            setIsModalOpen(true);
        }
    };

    const getLoadingText = () => {
        return (
            <>
                <span>보</span>
                <span>고</span>
                <span>서</span>
                <span className="mx-1"></span>
                <span>내</span>
                <span>용</span>
                <span className="mx-1"></span>
                <span>수</span>
                <span>정</span>
                <span>하</span>
                <span>는</span>
                <span className="mx-1"></span>
                <span>중</span>
            </>
        );
    };

    return (
        <>
            {isLoading && (
                <>
                    <div
                        className="fixed top-0 bottom-0 left-0 right-0 bg-[rgba(217,217,217,0.20)] z-0 flex items-center justify-center z-10"
                        style={{ backdropFilter: "blur(5px)" }}
                    ></div>
                    <div className="bg-transparent top-[74px] bottom-0 left-[313px] right-0 flex flex-col gap-10 items-center justify-center shrink-0 fixed overflow-auto z-10">
                        <div className="text-[18px] loading-text2 text-[#299792] flex flex-row">
                            {getLoadingText()}
                        </div>
                        <span className="loader"></span>
                    </div>
                </>
            )}
            <A4Container onClick={handleContainerClick}>
                <A4Content
                    ref={contentRef}
                    dangerouslySetInnerHTML={{
                        __html: modifiedHtmlContent,
                    }}
                    onClick={handleParagraphClick}
                />
            </A4Container>
            <EditButton onClick={handleEditButtonClick}>수정</EditButton>
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onConfirm={handleModalConfirm}
                    prompt={prompt}
                    setPrompt={setPrompt} // 상태와 상태 변경 함수를 전달
                    position={modalPosition}
                />
            )}
        </>
    );
};

export default A4Document;
