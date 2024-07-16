const File = ({ fileName, index }) => {
    return (
        <div className="flex items-center justify-between">
            <span key={index}>{fileName}</span>
            <button
                type="button"
                onClick={() => {
                    handleFileDelete(fileName);
                }}
            >
                x
            </button>
        </div>
    );
};

export default File;
