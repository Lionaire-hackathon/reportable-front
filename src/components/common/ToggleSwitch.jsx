import { useState } from "react";

const ToggleSwitch = () => {
    const [isToggled, setIsToggled] = useState(false);

    const toggle = () => {
        setIsToggled(!isToggled);
    };

    return (
        <div
            className="my-2 rounded-xl bg-[#293f3e] flex flex-row gap-0 items-center justify-center w-full h-5 relative cursor-pointer"
            onClick={toggle}
            style={{
                borderImage:
                    "linear-gradient(90deg, rgba(25, 26, 29, 1.00) 0%,rgba(55, 60, 66, 1.00) 100%)",
                borderImageSlice: "1",
            }}
        >
            <div
                className={`rounded-xl flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 w-[50%] relative ${
                    isToggled
                        ? "bg-gradient-to-b from-[#38AA8E] to-[#499985] "
                        : ""
                }`}
                style={{
                    border: isToggled ? "1px solid #000000" : "none",
                }}
            >
                <div
                    className={`text-center font-['Inter-Bold',_sans-serif] text-sm text-[8px] font-bold relative ${
                        isToggled ? "text-[#e7e7e7]" : "text-[#5f6265]"
                    }`}
                >
                    분석 데이터
                </div>
            </div>
            <div
                className={`rounded-xl flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 w-[50%] relative ${
                    !isToggled
                        ? "bg-gradient-to-b from-[#38AA8E] to-[#499985]"
                        : ""
                }`}
                style={{
                    border: isToggled ? "none" : "1px solid #000000",
                }}
            >
                <div
                    className={`text-center font-['Inter-Bold',_sans-serif] text-sm text-[8px] font-bold relative ${
                        !isToggled ? "text-[#e7e7e7]" : "text-[#5f6265]"
                    }`}
                >
                    첨부 데이터
                </div>
            </div>
        </div>
    );
};
