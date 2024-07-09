import background from "../assets/images/background.jpg";
import { useEffect, useState } from "react";

const SignUpPage = () => {
    /*
    useEffect(() => {
        // 페이지가 로드될 때 스크롤 막기
        document.body.style.overflow = "hidden";

        // 컴포넌트가 언마운트될 때 스크롤 다시 허용
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);
    */
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmVisibility = () => {
        setShowConfirm(!showConfirm);
    };

    return (
        <div className="flex flex-col gap-0 items-start justify-start h-full relative bg-[#299792]">
            <img
                className="self-stretch shrink-0 h-[900px] relative"
                style={{ objectFit: "cover" }}
                src={background}
            />
            <form className="pt-[13px] pr-10 pb-[13px] pl-10 flex flex-row gap-2.5 items-center justify-start shrink-0 w-[587px] h-[793px] absolute left-[436px] top-[37px]">
                <div className="bg-[#ffffff] rounded-[10px] flex flex-row gap-2.5 items-center justify-start shrink-0 absolute left-0 top-0">
                    <div className="shrink-0 w-[587px] h-[793px] static">
                        <div
                            className="bg-[#ffffff] rounded-[10px] border-solid border-[#878787] border-[0.5px] w-[587px] h-[793px] absolute left-0 top-0"
                            style={{
                                boxShadow:
                                    "0px 4px 64px 0px rgba(0, 0, 0, 0.05)",
                            }}
                        ></div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 items-center justify-start shrink-0 w-[494.32px] relative">
                    <div className="flex flex-col gap-2.5 items-start justify-start self-stretch shrink-0 relative">
                        <div className="flex flex-col gap-5 items-start justify-start self-stretch shrink-0 relative">
                            <div className="text-left font-['-',_sans-serif] text-[21px] font-normal relative self-stretch h-[32.68px]">
                                <span>
                                    <span className="text-black text-[21px]">
                                        Welcome to{" "}
                                    </span>
                                    <span className="text-[#299792] text-[21px] font-semibold">
                                        REPORTABLE!
                                    </span>
                                </span>{" "}
                            </div>
                            <div className="shrink-0 w-[302.22px] h-[73.53px] static">
                                <div className="text-[#000000] text-left font-['Poppins-Medium',_sans-serif] text-[31px] font-medium absolute left-0 top-[52.68px] w-[133.67px] h-12">
                                    회원가입{" "}
                                </div>
                                <div className="text-[#000000] text-left font-['Poppins-Regular',_sans-serif] text-base font-normal absolute left-0 top-[101.7px] w-[302.22px] h-[24.51px]">
                                    Sign Up Your own account!{" "}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pb-2.5 flex flex-col gap-[15px] items-start justify-start self-stretch shrink-0 relative">
                        <div className="flex flex-col gap-[9px] items-start justify-start self-stretch shrink-0 relative">
                            <label
                                htmlFor="email"
                                className="label text-[#000000] text-left font-['Poppins-Regular',_sans-serif] text-base font-normal relative self-stretch h-[24.51px]"
                            >
                                이메일 주소{" "}
                            </label>
                            <div className="flex flex-row items-center justify-between self-stretch shrink-0 relative">
                                <div className="bg-[#ffffff] rounded-md border-solid border-[#282828] border-[0.6px] pt-[19px] pr-[24px] pb-[19px] pl-[24px] flex flex-row gap-2.5 items-center justify-start shrink-0 w-[376px] h-[50px] relative">
                                    <input
                                        required
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email address"
                                        autoComplete="off"
                                        className="custom-input text-left font-['Poppins-Light',_sans-serif] text-sm relative w-full"
                                    />
                                </div>
                                <div className="shrink-0 w-[105px] h-[50px] static">
                                    <button className="bg-[#848383] rounded-md pt-[15px] pr-4 pb-[15px] pl-4 flex flex-row gap-2.5 items-center justify-center w-[105px] h-[50px] absolute left-[389.32px] top-0">
                                        <div className="text-[#ffffff] text-left font-['Poppins-Medium',_sans-serif] text-[14px] font-medium relative">
                                            이메일 인증{" "}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[9px] items-start justify-start self-stretch shrink-0 relative">
                            <label
                                htmlFor="username"
                                className="label text-[#000000] text-left font-['Poppins-Regular',_sans-serif] text-base font-normal relative self-stretch h-[24.51px]"
                            >
                                이름{" "}
                            </label>
                            <div className="flex flex-row gap-[9px] items-start justify-start shrink-0 relative">
                                <div className="bg-[#ffffff] rounded-md border-solid border-[#282828] border-[0.6px] pt-[19px] pr-[31px] pb-[19px] pl-[31px] shrink-0 w-[494.32px] h-[50px] relative">
                                    <div className="flex flex-row items-center justify-between w-[441.41px] absolute left-[25px] top-[14.49px]">
                                        <input
                                            required
                                            type="username"
                                            id="username"
                                            placeholder="Enter your name"
                                            autoComplete="off"
                                            className="custom-input text-left font-['Poppins-Light',_sans-serif] text-sm relative w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[9px] items-start justify-start self-stretch shrink-0 relative">
                            <label
                                htmlFor="password"
                                className="label text-[#000000] text-left font-['Poppins-Regular',_sans-serif] text-base font-normal relative self-stretch h-[24.51px]"
                            >
                                비밀번호{" "}
                            </label>
                            <div className="bg-[#ffffff] rounded-md border-solid border-[#282828] border-[0.6px] pt-[19px] pr-[31px] pb-[19px] pl-[31px] self-stretch shrink-0 h-[50px] relative">
                                <div className="flex flex-row items-center justify-between absolute left-[25px] right-[25px] top-[14.49px]">
                                    <input
                                        required
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        id="password"
                                        placeholder="Enter your password"
                                        className="custom-input text-left font-['Poppins-Light',_sans-serif] text-sm relative"
                                    />
                                    <div
                                        className="shrink-0 w-[24.41px] h-[21.45px] relative overflow-hidden cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <svg
                                                className="h-[auto] absolute left-0 top-[1.46px] overflow-visible"
                                                width="25"
                                                height="19"
                                                viewBox="0 0 25 19"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12.2049 0.989502C6.65715 0.989502 1.91939 4.30684 -0.00012207 8.9895C1.91939 13.6722 6.65715 16.9895 12.2049 16.9895C17.7526 16.9895 22.4904 13.6722 24.4099 8.9895C22.4904 4.30684 17.7526 0.989502 12.2049 0.989502ZM12.2049 14.3228C9.14253 14.3228 6.65715 11.9335 6.65715 8.9895C6.65715 6.0455 9.14253 3.65617 12.2049 3.65617C15.2672 3.65617 17.7526 6.0455 17.7526 8.9895C17.7526 11.9335 15.2672 14.3228 12.2049 14.3228ZM12.2049 5.7895C10.363 5.7895 8.87624 7.21884 8.87624 8.9895C8.87624 10.7602 10.363 12.1895 12.2049 12.1895C14.0467 12.1895 15.5335 10.7602 15.5335 8.9895C15.5335 7.21884 14.0467 5.7895 12.2049 5.7895Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="h-[auto] absolute left-0 top-[1.46px] overflow-visible"
                                                width="25"
                                                height="19"
                                                viewBox="0 0 25 19"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12.0192 6.32749L15.5134 9.39763L15.5301 9.23682C15.5301 7.62376 14.0381 6.31287 12.2022 6.31287L12.0192 6.32749Z"
                                                    fill="black"
                                                />
                                                <path
                                                    d="M12.2022 4.36361C15.2638 4.36361 17.7487 6.54684 17.7487 9.23688C17.7487 9.86553 17.6045 10.4649 17.3549 11.0156L20.5995 13.8665C22.2746 12.6384 23.5946 11.0497 24.41 9.23688C22.4854 4.95818 17.7542 1.927 12.2022 1.927C10.6492 1.927 9.1628 2.17065 7.78174 2.60924L10.1778 4.7096C10.8045 4.49519 11.4867 4.36361 12.2022 4.36361Z"
                                                    fill="black"
                                                />
                                                <path
                                                    d="M1.10927 1.70764L3.63845 3.92985L4.14319 4.37333C2.31287 5.63063 0.865245 7.30217 0 9.23682C1.91909 13.5155 6.65573 16.5467 12.2022 16.5467C13.9216 16.5467 15.5633 16.2543 17.0664 15.7231L17.5379 16.1373L20.7715 18.9833L22.1858 17.7455L2.52361 0.464966L1.10927 1.70764ZM7.24367 7.0926L8.95752 8.59844C8.90761 8.808 8.87433 9.01752 8.87433 9.23682C8.87433 10.8499 10.3663 12.1608 12.2022 12.1608C12.4518 12.1608 12.6903 12.1315 12.9232 12.0877L14.6371 13.5935C13.8994 13.9151 13.0786 14.1101 12.2022 14.1101C9.14056 14.1101 6.65573 11.9269 6.65573 9.23682C6.65573 8.46686 6.87761 7.7456 7.24367 7.0926Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[9px] items-start justify-start self-stretch shrink-0 relative">
                            <label
                                htmlFor="confirm-password"
                                className="label text-[#000000] text-left font-['Poppins-Regular',_sans-serif] text-base font-normal relative self-stretch h-[24.51px]"
                            >
                                비밀번호 확인{" "}
                            </label>
                            <div className="bg-[#ffffff] rounded-md border-solid border-[#282828] border-[0.6px] pt-[19px] pr-[31px] pb-[19px] pl-[31px] self-stretch shrink-0 h-[50px] relative">
                                <div className="flex flex-row items-center justify-between absolute left-[25px] right-[25px] top-[14.49px]">
                                    <input
                                        required
                                        type={showConfirm ? "text" : "password"}
                                        id="confirm-password"
                                        placeholder="Enter your password"
                                        className="custom-input text-left font-['Poppins-Light',_sans-serif] text-sm relative w-full"
                                    />
                                    <div
                                        className="shrink-0 w-[24.41px] h-[21.45px] relative overflow-hidden cursor-pointer"
                                        onClick={toggleConfirmVisibility}
                                    >
                                        {showConfirm ? (
                                            <svg
                                                className="h-[auto] absolute left-0 top-[1.46px] overflow-visible"
                                                width="25"
                                                height="19"
                                                viewBox="0 0 25 19"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12.2049 0.989502C6.65715 0.989502 1.91939 4.30684 -0.00012207 8.9895C1.91939 13.6722 6.65715 16.9895 12.2049 16.9895C17.7526 16.9895 22.4904 13.6722 24.4099 8.9895C22.4904 4.30684 17.7526 0.989502 12.2049 0.989502ZM12.2049 14.3228C9.14253 14.3228 6.65715 11.9335 6.65715 8.9895C6.65715 6.0455 9.14253 3.65617 12.2049 3.65617C15.2672 3.65617 17.7526 6.0455 17.7526 8.9895C17.7526 11.9335 15.2672 14.3228 12.2049 14.3228ZM12.2049 5.7895C10.363 5.7895 8.87624 7.21884 8.87624 8.9895C8.87624 10.7602 10.363 12.1895 12.2049 12.1895C14.0467 12.1895 15.5335 10.7602 15.5335 8.9895C15.5335 7.21884 14.0467 5.7895 12.2049 5.7895Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="h-[auto] absolute left-0 top-[1.46px] overflow-visible"
                                                width="25"
                                                height="19"
                                                viewBox="0 0 25 19"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12.0192 6.32749L15.5134 9.39763L15.5301 9.23682C15.5301 7.62376 14.0381 6.31287 12.2022 6.31287L12.0192 6.32749Z"
                                                    fill="black"
                                                />
                                                <path
                                                    d="M12.2022 4.36361C15.2638 4.36361 17.7487 6.54684 17.7487 9.23688C17.7487 9.86553 17.6045 10.4649 17.3549 11.0156L20.5995 13.8665C22.2746 12.6384 23.5946 11.0497 24.41 9.23688C22.4854 4.95818 17.7542 1.927 12.2022 1.927C10.6492 1.927 9.1628 2.17065 7.78174 2.60924L10.1778 4.7096C10.8045 4.49519 11.4867 4.36361 12.2022 4.36361Z"
                                                    fill="black"
                                                />
                                                <path
                                                    d="M1.10927 1.70764L3.63845 3.92985L4.14319 4.37333C2.31287 5.63063 0.865245 7.30217 0 9.23682C1.91909 13.5155 6.65573 16.5467 12.2022 16.5467C13.9216 16.5467 15.5633 16.2543 17.0664 15.7231L17.5379 16.1373L20.7715 18.9833L22.1858 17.7455L2.52361 0.464966L1.10927 1.70764ZM7.24367 7.0926L8.95752 8.59844C8.90761 8.808 8.87433 9.01752 8.87433 9.23682C8.87433 10.8499 10.3663 12.1608 12.2022 12.1608C12.4518 12.1608 12.6903 12.1315 12.9232 12.0877L14.6371 13.5935C13.8994 13.9151 13.0786 14.1101 12.2022 14.1101C9.14056 14.1101 6.65573 11.9269 6.65573 9.23682C6.65573 8.46686 6.87761 7.7456 7.24367 7.0926Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[9px] items-start justify-start self-stretch shrink-0 relative">
                            <label
                                htmlFor="phone-number"
                                className="label text-[#000000] text-left font-['Poppins-Regular',_sans-serif] text-base font-normal relative self-stretch h-[24.51px]"
                            >
                                휴대폰 번호(번호만){" "}
                            </label>
                            <div className="flex flex-row items-center justify-between self-stretch shrink-0 relative">
                                <div className="bg-[#ffffff] rounded-md border-solid border-[#282828] border-[0.6px] pt-[19px] pr-[24px] pb-[19px] pl-[24px] flex flex-row gap-2.5 items-center justify-start shrink-0 w-[376px] h-[50px] relative">
                                    <input
                                        required
                                        type="tel"
                                        id="phone-number"
                                        placeholder="Enter your phone number"
                                        className="custom-input text-left font-['Poppins-Light',_sans-serif] text-sm relative w-full"
                                    />
                                </div>
                                <div className="shrink-0 w-[105px] h-[50px] static">
                                    <button className="bg-[#848383] rounded-md pt-[15px] pr-4 pb-[15px] pl-4 flex flex-row gap-2.5 items-center justify-center w-[105px] h-[50px] absolute left-[389.32px] top-0">
                                        <div className="text-[#ffffff] text-left font-['Poppins-Medium',_sans-serif] text-[14px] font-medium relative">
                                            본인 인증{" "}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[18px] items-center justify-start self-stretch shrink-0 relative">
                        <div className="shrink-0 w-[491.69px] h-[58.21px] static">
                            <div className="bg-[#000000] rounded-md w-[491.69px] h-[58.21px] absolute left-[1.32px] top-0"></div>
                            <div className="text-[#ffffff] text-left font-['Poppins-Medium',_sans-serif] text-base font-medium absolute left-[209.38px] top-[17.36px] w-[76.72px] h-[24.51px]">
                                Register{" "}
                            </div>
                        </div>
                        <div className="text-center font-['-',_sans-serif] text-base font-normal relative self-stretch h-[24.51px]">
                            <span>
                                <span className="text-[16px] font-light">
                                    Already have an Account?{" "}
                                </span>
                                <span className="text-[#299792] text-[16px] font-semibold">
                                    Login
                                </span>
                            </span>{" "}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;
