import background from "../assets/images/background.jpg";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../apis/user";
import { sendCode, verifyCode } from "../apis/auth";

const SignUpPage = () => {
    const [signUpData, setSignUpData] = useState({
        email: "",
        name: "",
        password: "",
        passwordConfirm: "",
        phone_number: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isPhoneVerify, setIsPhoneVerify] = useState(false);
    const navigate = useNavigate();
    const emailInputRef = useRef(null);
    const phoneInputRef = useRef(null);
    const verificationRef = useRef(null);
    const [verificationCode, setVerificationCode] = useState("");
    const [isEmailVerifying, setIsEmailVerifying] = useState(false); //이메일 인증 단계 중인지
    const [isVerifyLoading, setIsVerifyLoading] = useState(false); //코드 전송 후 인증전까지
    const [verifyingEmail, setVerifyingEmail] = useState(""); // 인증 중인 이메일

    const handleVerificationCodeChange = (e) => {
        setVerificationCode(e.target.value);
    };

    const handleSignUpData = (e) => {
        const { id, type, value, checked } = e.target;
        setSignUpData({
            ...signUpData,
            [id]: type === "checkbox" ? checked : value,
        });
    };

    const validatePasswords = () => {
        const password = document.getElementById("password");
        const passwordConfirm = document.getElementById("passwordConfirm");

        if (password.value !== passwordConfirm.value) {
            passwordConfirm.setCustomValidity(
                "비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요."
            );
            return false;
        } else {
            passwordConfirm.setCustomValidity("");
            return true;
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault(); // to prevent reloading the page
        const form = e.target;
        try {
            if (form.checkValidity()) {
                const { passwordConfirm, ...submitSignUpData } = signUpData;
                await signup(submitSignUpData);
                console.log("good!");
                alert("회원가입이 완료되었습니다. 로그인해주세요.");
                navigate("/signin");
            } else {
                // 폼이 유효하지 않으면 기본 브라우저 메시지 표시
                form.reportValidity();
            }
        } catch (error) {
            alert(`${error.response.data.message} 회원가입에 실패하였습니다.`);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordConfirmVisibility = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    };

    const handleEmailVerification = async () => {
        // 이메일 인증 로직 추가
        setIsEmailVerifying(true);
        const emailDto = {
            email: signUpData.email,
            phone_number: "",
            code: "",
        };
        setVerifyingEmail(signUpData.email);
        const response = await sendCode(emailDto);
        alert("이메일로 코드가 전송되었습니다.");
        console.log(response);
        setIsVerifyLoading(true);
    };

    const handleSendVerificationCode = async () => {
        const emailCodeDto = {
            email: verifyingEmail,
            phone_number: "",
            code: verificationCode,
        };
        const response = await verifyCode(emailCodeDto);
        if (response.data) {
            setIsVerifyLoading(false);
            setIsEmailVerified(true);
        } else {
            setIsVerifyLoading(false);
        }
    };

    return (
        <div
            className="flex flex-col gap-0 items-center justify-center h-screen w-screen relative bg-cover"
            style={{
                backgroundImage: `url(${background})`,
                opacity: "0.8",
            }}
        >
            <form
                className="bg-[#ffffff] rounded-[10px] border-solid border-[#878787] border-[0.5px] flex flex-col gap-2.5 items-center justify-stretch shrink-0 w-[587px] h-[793px] relative"
                style={{ boxShadow: "0px 4px 64px 0px rgba(0, 0, 0, 0.05)" }}
                onSubmit={handleSignUpSubmit}
            >
                <div className="mt-6 h-full flex flex-col gap-[16px] items-center justify-start shrink-0 w-[83%] relative">
                    <div className="text-left font-['-',_sans-serif] text-[21px] font-normal relative self-stretch mt-6">
                        <span>
                            <span className="font-semibold">Welcome to </span>
                            <Link
                                className="text-[#299792] text-[21px] font-semibold"
                                to="/"
                            >
                                REPORTABLE!
                            </Link>
                        </span>{" "}
                        <div className="flex justify-start shrink-0 w-full h-[72px] relative">
                            <div className="mt-2 text-[#000000] text-left font-['Poppins-Medium',_sans-serif] text-[31px] font-medium absolute left-0 top-0">
                                회원가입
                            </div>
                            <div className="text-[#000000] text-left font-['Poppins-Regular',_sans-serif] text-base font-normal absolute left-0 top-12 w-[260px]">
                                Sign Up Your own account!{" "}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[22px] items-start justify-start self-stretch shrink-0 relative max-h-[500px] overflow-auto">
                        <div className="w-full h-auto pb-4 flex flex-col gap-1 overflow-auto">
                            <div className="h-[92px] w-full static left-0 flex flex-col gap-2">
                                <label
                                    htmlFor="email"
                                    className="text-[#000000] text-left font-['Poppins-Regular',_sans-serif] text-base font-normal static right-[7.8%] left-[0%] w-[92.2%] h-[26.09%]"
                                >
                                    이메일 주소
                                </label>
                                <div className="flex flex-row gap-2 justify-stretch">
                                    <div
                                        className="cursor-text h-[54px] flex w-full items-center justify-between px-4 py-4 border border-solid border-[#000000] rounded-md"
                                        onClick={() =>
                                            emailInputRef.current.focus()
                                        }
                                    >
                                        <input
                                            required
                                            type="email"
                                            id="email"
                                            placeholder="Enter your email address"
                                            value={signUpData.email}
                                            onChange={handleSignUpData}
                                            autoComplete="off"
                                            ref={emailInputRef}
                                            className="custom-input text-[#ababab] font-['Poppins-Light',_sans-serif] text-left text-sm font-light relative w-full border-none"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleEmailVerification}
                                        className={`${
                                            isEmailVerified && "hidden "
                                        } px-2 py-2 bg-[#299792] text-white text-[14px] rounded-md whitespace-nowrap h-[54px]`}
                                        disabled={isEmailVerified}
                                    >
                                        코드 전송
                                    </button>
                                </div>
                            </div>
                            {isEmailVerifying && (
                                <div className="h-auto w-full static left-0 flex flex-col gap-2 bg-[#f0f4f8] border border-dashed border-[#299792] rounded-md p-4">
                                    <label
                                        htmlFor="verification-code"
                                        className="text-[#000000] text-left font-['Poppins-Regular',_sans-serif] text-base font-normal"
                                    >
                                        인증번호
                                    </label>
                                    <div className="flex flex-row gap-2 items-center justify-stretch">
                                        <div
                                            className="bg-white cursor-text h-[54px] flex w-full items-center justify-between px-4 py-4 border-none rounded-md"
                                            onClick={() =>
                                                verificationRef.current.focus()
                                            }
                                        >
                                            <input
                                                required
                                                type="text"
                                                id="verification-code"
                                                placeholder="인증번호를 입력해주세요"
                                                value={verificationCode}
                                                onChange={
                                                    handleVerificationCodeChange
                                                }
                                                ref={verificationRef}
                                                className="border-none custom-input text-[#ababab] font-['Poppins-Light',_sans-serif] text-left text-sm font-light relative w-full"
                                            />
                                            {isVerifyLoading ? (
                                                <span className="loader-small"></span>
                                            ) : isEmailVerified ? (
                                                <svg
                                                    className="ml-2"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M9 12L11 14L15 10"
                                                        stroke="green"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                                        stroke="green"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    className="ml-2"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M15 9L9 15"
                                                        stroke="red"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M9 9L15 15"
                                                        stroke="red"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                                        stroke="red"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleSendVerificationCode}
                                            className="px-2 py-2 bg-transparent text-[#299792] rounded-md whitespace-nowrap h-[54px]"
                                        >
                                            인증
                                        </button>
                                    </div>
                                    <small className="text-[#299792]">
                                        Please enter the verification code sent
                                        to your email.
                                    </small>
                                </div>
                            )}
                            <div className="h-[92px] w-full static left-0 flex flex-col gap-2">
                                <label
                                    htmlFor="name"
                                    className="text-[#000000] text-left font-['Poppins-Regular',_sans-serif] text-base font-normal static right-[7.8%] left-[0%] w-[92.2%] h-[26.09%]"
                                >
                                    이름
                                </label>
                                <div className="bg-[#ffffff] rounded-md w-full flex items-center justify-center">
                                    <input
                                        required
                                        type="text"
                                        id="name"
                                        placeholder="Enter your name"
                                        value={signUpData.name}
                                        onChange={handleSignUpData}
                                        autoComplete="off"
                                        className="custom-input text-[#ababab] text-left font-['Poppins-Light',_sans-serif] text-sm font-light relative w-full py-4 px-4 border border-solid border-[#000000] rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="h-[92px] w-full static left-0 flex flex-col gap-2">
                                <label
                                    htmlFor="password"
                                    className="text-[#000000] text-left font-['Poppins-Regular',_sans-serif] text-base font-normal static right-[7.8%] left-[0%] w-[92.2%] h-[26.09%]"
                                >
                                    비밀번호
                                </label>
                                <div className="bg-[#ffffff] rounded-md w-full flex items-center justify-center">
                                    <div className="flex w-full items-center justify-between px-4 py-4 border border-solid border-[#000000] rounded-md">
                                        <input
                                            required
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            id="password"
                                            placeholder="Enter your password"
                                            value={signUpData.password}
                                            onChange={handleSignUpData}
                                            autoComplete="off"
                                            className="custom-input text-[#ababab] font-['Poppins-Light',_sans-serif] text-left text-sm font-light relative w-full border-none"
                                        />
                                        <div
                                            className="shrink-0 w-[24.41px] h-[21.45px] relative overflow-hidden cursor-pointer ml-2"
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
                            <div className="h-[92px] w-full static left-0 flex flex-col gap-2">
                                <label
                                    htmlFor="passwordConfirm"
                                    className="text-[#000000] text-left font-['Poppins-Regular',_sans-serif] text-base font-normal static right-[7.8%] left-[0%] w-[92.2%] h-[26.09%]"
                                >
                                    비밀번호 확인
                                </label>
                                <div className="bg-[#ffffff] rounded-md w-full flex items-center justify-center">
                                    <div className="flex w-full items-center justify-between px-4 py-4 border border-solid border-[#000000] rounded-md">
                                        <input
                                            required
                                            type={
                                                showPasswordConfirm
                                                    ? "text"
                                                    : "password"
                                            }
                                            id="passwordConfirm"
                                            placeholder="Confirm your password"
                                            value={signUpData.passwordConfirm}
                                            onChange={(e) => {
                                                handleSignUpData(e);
                                                validatePasswords();
                                            }}
                                            className="custom-input no-selection text-[#ababab] font-['Poppins-Light',_sans-serif] text-left text-sm font-light relative w-full border-none"
                                        />
                                        <div
                                            className="shrink-0 w-[24.41px] h-[21.45px] relative overflow-hidden cursor-pointer ml-2"
                                            onClick={
                                                togglePasswordConfirmVisibility
                                            }
                                        >
                                            {showPasswordConfirm ? (
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
                            <div className="h-[92px] w-full static left-0 flex flex-col gap-2">
                                <label
                                    htmlFor="phone_number"
                                    className="text-[#000000] text-left font-['Poppins-Regular',_sans-serif] text-base font-normal static right-[7.8%] left-[0%] w-[92.2%] h-[26.09%]"
                                >
                                    휴대폰 번호(번호만)
                                </label>
                                <div className="flex flex-row gap-2 justify-stretch">
                                    <div
                                        onClick={() =>
                                            phoneInputRef.current.focus()
                                        }
                                        className="cursor-text h-[54px] flex w-full items-center justify-between px-4 py-4 border border-solid border-[#000000] rounded-md"
                                    >
                                        <input
                                            required
                                            type="text"
                                            id="phone_number"
                                            pattern="\d{11}"
                                            title="정확한 형식의 전화번호를 입력해주세요."
                                            placeholder="Enter your phone number"
                                            value={signUpData.phone_number}
                                            onChange={handleSignUpData}
                                            autoComplete="off"
                                            ref={phoneInputRef}
                                            className="custom-input text-[#ababab] font-['Poppins-Light',_sans-serif] text-left text-sm font-light relative w-full border-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-0 h-[100px] w-full">
                        <button
                            type="submit"
                            className="flex flex-row items-center justify-center bg-[#000000] rounded-md !h-[57px] relative w-full my-1 mt-4"
                        >
                            <div className="text-[#ffffff] font-['Poppins-Medium',_sans-serif] text-base font-medium relative">
                                Register{" "}
                            </div>
                        </button>
                        <div className="flex justify-center relative items-center w-full gap-2">
                            <div className="text-[#7d7d7d] text-[16px] font-light">
                                Already have an account?
                            </div>
                            <Link
                                className="text-[16px] text-black font-medium"
                                to="/signin"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;
