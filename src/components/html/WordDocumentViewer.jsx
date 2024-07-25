import React, { useState, useEffect } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const WordDocumentViewer = ({ documentUrl }) => {
    const docs = [
        {
            uri: documentUrl,
            title: "Document 1",
            fileName: "document1.docx",
        },
    ];

    return (
        documentUrl && (
            <div className="flex justify-center items-center w-full h-full">
                <DocViewer
                    documents={docs}
                    pluginRenderers={DocViewerRenderers}
                    className="w-full h-[calc(100vh-104px)] border-2 border-gray-300 shadow-lg doc-viewer-container"
                />
            </div>
        )
    );
};

export default WordDocumentViewer;
