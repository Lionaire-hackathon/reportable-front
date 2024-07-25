import React, { useState, useEffect } from "react";
import mammoth from "mammoth";

const WordToHtmlViewer = ({ documentUrl }) => {
    const [htmlContent, setHtmlContent] = useState("");

    useEffect(() => {
        const fetchAndConvertDocument = async () => {
            try {
                const response = await fetch(documentUrl);
                const arrayBuffer = await response.arrayBuffer();
                const result = await mammoth.convertToHtml(
                    { arrayBuffer },
                    {
                        styleMap: [
                            "p[style-name='Title'] => h1.my-title", // 문서의 제목 스타일 적용
                            "p[style-name='Heading 1'] => h1.my-heading-1",
                            "p[style-name='Heading 2'] => h2.my-heading-2",
                            "p[style-name='Heading 3'] => h3.my-heading-3",
                            "p[style-name='Heading 4'] => h4.my-heading-4",
                            "p[style-name='Heading 5'] => h5.my-heading-5",
                            "p[style-name='Heading 6'] => h6.my-heading-6",
                            "p[style-name='Normal'] => p.my-normal",
                            "p[style-name='TOC'] => p.my-toc", // 목차 스타일 적용
                            "b => strong",
                            "i => em",
                            "u => span.underline",
                        ],
                    }
                );
                setHtmlContent(result.value);
            } catch (error) {
                console.error("Error fetching or converting document:", error);
            }
        };

        fetchAndConvertDocument();
    }, [documentUrl]);

    return (
        <div className="flex justify-center items-center bg-gray-200 py-8">
            <div
                className="bg-white p-8 shadow-md"
                style={{ width: "210mm", height: "297mm", padding: "20mm" }}
            >
                <div
                    className="space-y-4"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            </div>
        </div>
    );
};

export default WordToHtmlViewer;
