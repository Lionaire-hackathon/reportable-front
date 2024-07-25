import React, { useState, useEffect } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const WordDocumentViewer = ({ document }) => {
  const docs = [
    {
      uri: document.wordUrl,
      title: document.title,
      fileName: document.title,
    },
  ];

  return (
    document.wordUrl && (
    <div className="flex justify-center items-center w-full h-full">
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        className="w-full h-[calc(100vh-104px)] border-2 border-gray-300 shadow-lg"
      />
    </div>
    )
  );
};

export default WordDocumentViewer;
