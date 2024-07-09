import background from "../assets/images/background.jpg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../apis/user";

const SignInPage = () => {
    const navigate = useNavigate();
    const [signInData, setSignInData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleSignInData = (e) => {
        const { id, type, value, checked } = e.target;
        setSignInData({
            ...signInData,
            [id]: type === "checkbox" ? checked : value,
        });
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault(); // to prevent reloading the page
        try {
            await login(signInData);
            navigate("/");
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div
            className="flex flex-col gap-0 items-center justify-center h-screen relative bg-cover"
            style={{
                backgroundImage: `url(${background})`,
                opacity: "0.8",
            }}
        >
            <form
                className="bg-[#ffffff] rounded-[10px] border-solid border-[#878787] border-[0.5px] flex flex-col gap-2.5 items-center justify-center shrink-0 w-[505px] h-[701px] relative"
                style={{ boxShadow: "0px 4px 64px 0px rgba(0, 0, 0, 0.05)" }}
                onSubmit={handleSignInSubmit}
            >
                <div className="flex flex-col gap-[24px] items-center justify-start shrink-0 w-[83%] relative">
                    <div className="text-left font-['-',_sans-serif] text-[21px] font-normal relative self-stretch">
                        <span>
                            <span className="font-semibold">Welcome to </span>
                            <span className="text-[#299792] text-[21px] font-semibold">
                                REPORTABLE!
                            </span>
                        </span>{" "}
                    </div>
                    <div className="w-full h-[72px] relative flex justify-start">
                        <div className="text-[#000000] text-left font-['Poppins-Medium',_sans-serif] text-[31px] font-medium absolute left-0 top-0">
                            로그인{" "}
                        </div>
                        <div className="text-[#000000] text-left font-['Poppins-Regular',_sans-serif] text-base font-normal absolute left-0 top-12 w-[260px]">
                            Please login to continue{" "}
                        </div>
                    </div>
                    <div className="flex flex-col gap-[22px] items-start justify-start self-stretch shrink-0 relative">
                        <div className="shrink-0 w-full h-auto static flex flex-col gap-2 pb-4">
                            <div className="h-[92px] w-[423px] static left-0 flex flex-col gap-2">
                                <label
                                    htmlFor="email"
                                    className="text-[#000000] text-left font-['Poppins-Regular',_sans-serif] text-base font-normal static right-[7.8%] left-[0%] w-[92.2%] h-[26.09%]"
                                >
                                    이메일 주소{" "}
                                </label>
                                <div className="bg-[#ffffff] rounded-md border-solid border-[#000000] border-[0.7px] w-full py-4 flex items-center justify-center">
                                    <input
                                        required
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email address"
                                        value={signInData.email}
                                        onChange={handleSignInData}
                                        autoComplete="off"
                                        className="custom-input text-[#ababab] text-left font-['Poppins-Light',_sans-serif] text-sm font-light relative w-[90%]"
                                    />
                                </div>
                            </div>
                            <div className="h-[92px] w-[423px] static left-0 flex flex-col gap-2">
                                <label
                                    htmlFor="password"
                                    className="text-[#000000] text-left font-['Poppins-Regular',_sans-serif] text-base font-normal static right-[7.8%] left-[0%] w-[92.2%] h-[26.09%]"
                                >
                                    비밀번호{" "}
                                </label>
                                <div className="bg-[#ffffff] rounded-md border-solid border-[#000000] border-[0.7px] w-full py-4 flex items-center justify-center">
                                    <div className="flex w-[90%] items-center justify-between">
                                        <input
                                            required
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            id="password"
                                            placeholder="Enter your password"
                                            value={signInData.password}
                                            onChange={handleSignInData}
                                            className="custom-input no-selection text-[#ababab] font-['Poppins-Light',_sans-serif] text-left text-sm font-light relative w-[90%]"
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
                            <div className="flex flex-row items-center justify-between relative py-2 px-1">
                                <div className="flex flex-row items-center shrink-0 w-[115px] relative">
                                    <div className="flex flex-row items-start">
                                        <input
                                            type="checkbox"
                                            id="rememberMe"
                                            checked={signInData.rememberMe}
                                            onChange={handleSignInData}
                                            className="bg-[#ffffff] mr-2 leading-tight border-solid border-[#000000] border shrink-0 w-[15px] h-[15px] relative"
                                        />
                                        <div className="text-[#000000] text-left font-['Poppins-Light',_sans-serif] text-xs relative">
                                            Rememebr me{" "}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-[#0085ff] text-left font-['Poppins-Light',_sans-serif] text-xs relative">
                                    Forgot Password ?{" "}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="flex flex-row items-center justify-center bg-[#000000] rounded-md !h-[57px] relative w-full my-1"
                            >
                                <div className="text-[#ffffff] font-['Poppins-Medium',_sans-serif] text-base font-medium relative">
                                    Login{" "}
                                </div>
                            </button>
                            <div className="text-[16px] text-[#B5B5B5] font-medium flex justify-center relative items-center w-full">
                                OR
                            </div>
                            <button className="bg-[#ffffff] rounded-[9px] border-solid border-[#689df6] border p-[0.75rem] my-1 flex gap-2.5 items-center item-center justify-center relative">
                                <div className="flex flex-row gap-3 items-center justify-center shrink-0 relative">
                                    <div className="bg-[#ffffff] rounded-[9px] flex items-center justify-center relative">
                                        <svg
                                            className="shrink-0 w-[22.09px] h-[21.75px] relative overflow-visible "
                                            width="23"
                                            height="23"
                                            viewBox="0 0 23 23"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M21.2742 11.8567C21.2742 11.0745 21.2084 10.5037 21.066 9.91174H11.8062V13.4423H17.2415C17.1319 14.3197 16.5402 15.6411 15.2251 16.5289L15.2067 16.6471L18.1345 18.835L18.3373 18.8546C20.2002 17.1949 21.2742 14.7531 21.2742 11.8567"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M11.8054 21.1591C14.4683 21.1591 16.7037 20.3134 18.3366 18.8547L15.2244 16.529C14.3916 17.0893 13.2738 17.4804 11.8054 17.4804C9.19735 17.4804 6.98377 15.8208 6.1947 13.527L6.07904 13.5365L3.03469 15.8092L2.99487 15.9159C4.61669 19.0237 7.94804 21.1591 11.8054 21.1591Z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M6.19542 13.527C5.98721 12.935 5.86672 12.3007 5.86672 11.6454C5.86672 10.9899 5.98721 10.3557 6.18446 9.76378L6.17895 9.63771L3.09644 7.32849L2.99558 7.37477C2.32715 8.66441 1.9436 10.1126 1.9436 11.6454C1.9436 13.1781 2.32715 14.6263 2.99558 15.9159L6.19542 13.527"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M11.8055 5.81042C13.6574 5.81042 14.9066 6.58207 15.619 7.22693L18.4024 4.60538C16.6929 3.07263 14.4683 2.13184 11.8055 2.13184C7.94807 2.13184 4.6167 4.2671 2.99487 7.37486L6.18376 9.76388C6.9838 7.47004 9.19738 5.81042 11.8055 5.81042"
                                                fill="#EB4335"
                                            />
                                        </svg>
                                    </div>
                                    <div className="text-[#b5b5b5] text-left font-['Poppins-Regular',_sans-serif] text-base font-normal relative w-[161.89px] h-[20.07px]">
                                        Sign in with Google{" "}
                                    </div>
                                </div>
                            </button>
                            <div className="flex justify-center relative items-center w-full gap-2">
                                <div className="text-[#7d7d7d] text-[16px] font-light">
                                    Don't have an account?
                                </div>
                                <Link
                                    className="text-[16px] text-black font-medium"
                                    to="/signup"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignInPage;
