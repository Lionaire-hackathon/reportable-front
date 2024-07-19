import { useEffect, useState } from "react";

const Questionbox = ({
    question,
    index,
    additionalAnswers,
    updateAdditionalAnswer,
}) => {
    const handleChange = (e) => {
        updateAdditionalAnswer(index, e.target.value);
    };

    return (
        <div className="flex flex-col gap-2.5 items-start justify-start self-stretch shrink-0 relative z-100 ">
            <div className="px-1 text-[#000000] text-left font-['Nunito-Regular',_sans-serif] text-xs font-normal relative self-stretch">
                <span className="div-2-span">{`${
                    index + 1
                }. ${question}`}</span>
            </div>
            <textarea
                placeholder="추가 질문에 대한 답변을 적어주세요."
                className="overflow-auto bg-[#ffffff] rounded border-solid border-[#C2C2C2] border self-stretch shrink-0 h-[74px] relative text-left text-xs leading-5 font-normal p-2 w-full"
                value={additionalAnswers[index]}
                onChange={handleChange}
            />
        </div>
    );
};

export default Questionbox;
