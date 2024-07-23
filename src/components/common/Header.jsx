import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import useMe from "../../apis/hook/useMe";
import { logout } from "../../apis/user";
import { useParams, useNavigate } from "react-router-dom";
import { getDocFile } from "../../apis/document";

const Header = ({ className, headerType = "" }) => {
    const { documentId } = useParams();
    const { me, isLoadingMe } = useMe();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    if (isLoadingMe) {
        return <div>Loading...</div>; // 로딩 상태 처리
    }

    const handleDownload = async () => {
        try {
            const response = await getDocFile(documentId);
            const url = response.data; // S3 문서의 URL을 가져옵니다.
            const link = document.createElement("a");
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading the document:", error);
        }
    };

    return (
        <div
            className={
                "z-30 bg-white border-solid border-[#dddddd] border-b top-0 pt-3.5 pr-[18px] pb-3.5 pl-[18px] flex flex-row gap-2.5 items-center justify-between w-full " +
                (headerType === "" ? "h-[104px] " : "h-[74px] ") +
                (className ? className : "")
            }
        >
            <div className="flex flex-row items-center justify-between w-full relative">
                <div className="flex flex-row items-center justify-between gap-[52px] relative">
                    <img
                        className="cursor-pointer w-[259px] h-[74px] relative"
                        style={{ objectFit: "cover" }}
                        src={logo}
                        alt="Logo"
                        onClick={() => {
                            navigate("/");
                        }}
                    />
                    <div className="hide-on-small flex flex-row gap-[52px] items-start justify-start relative">
                        {headerType === "" ? (
                            <>
                                <button
                                    onClick={() => {
                                        navigate("/service");
                                    }}
                                    className="button-text"
                                >
                                    Service
                                </button>
                                <button className="!hidden button-text">
                                    Contents
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="button-text">
                                    {`${headerType} service`}
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex flex-row gap-7 items-center justify-start shrink-0 relative">
                    {me ? (
                        <>
                            {headerType === "" ? (
                                <button
                                    className="button bg-[#131313] text-[#FFFFFF] mt-1 !px-[25px] py-[11px]"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <div className="flex flex-row gap-[30px] items-center justify-center shrink-0 relative">
                                        <svg
                                            className="cursor-pointer shrink-0 w-4 h-4 relative overflow-visible "
                                            width="16"
                                            height="17"
                                            viewBox="0 0 16 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => {
                                                navigate(`/${headerType}`);
                                            }}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M7.32 0.528976C8.70071 0.411147 10.0884 0.653982 11.347 1.23369C12.6056 1.81341 13.6921 2.71011 14.5 3.83598V2.24998C14.5 2.05106 14.579 1.8603 14.7197 1.71965C14.8603 1.57899 15.0511 1.49998 15.25 1.49998C15.4489 1.49998 15.6397 1.57899 15.7803 1.71965C15.921 1.8603 16 2.05106 16 2.24998V6.49998H11.75C11.5511 6.49998 11.3603 6.42096 11.2197 6.28031C11.079 6.13965 11 5.94889 11 5.74998C11 5.55106 11.079 5.3603 11.2197 5.21965C11.3603 5.07899 11.5511 4.99998 11.75 4.99998H13.477C12.7931 3.92988 11.8107 3.08356 10.6512 2.56556C9.4917 2.04757 8.20584 1.88058 6.95248 2.08524C5.69912 2.2899 4.53316 2.85723 3.59864 3.71715C2.66412 4.57708 2.00198 5.69192 1.694 6.92398C1.67128 7.02076 1.62955 7.11206 1.57123 7.19257C1.51291 7.27308 1.43917 7.34119 1.35429 7.39294C1.26942 7.4447 1.1751 7.47906 1.07682 7.49403C0.97854 7.50901 0.878265 7.5043 0.781825 7.48017C0.685385 7.45604 0.594703 7.41298 0.515053 7.3535C0.435404 7.29401 0.368375 7.21928 0.317865 7.13366C0.267355 7.04803 0.234371 6.95322 0.220832 6.85473C0.207293 6.75625 0.213469 6.65605 0.239 6.55998C0.643544 4.9424 1.5434 3.49166 2.81279 2.41052C4.08218 1.32939 5.65766 0.671906 7.319 0.529976L7.32 0.528976ZM3.92 15.381C4.99199 16.0164 6.19758 16.3925 7.44068 16.4795C8.68378 16.5665 9.93001 16.3618 11.08 15.8819C12.23 15.402 13.252 14.6601 14.0646 13.7153C14.8771 12.7704 15.4577 11.6489 15.76 10.44C15.805 10.2482 15.7728 10.0464 15.6702 9.87814C15.5676 9.70993 15.403 9.58883 15.2119 9.54101C15.0207 9.4932 14.8185 9.52251 14.6488 9.62261C14.4791 9.72271 14.3556 9.88557 14.305 10.076C13.9969 11.3078 13.3347 12.4223 12.4002 13.282C11.4658 14.1417 10.3 14.7089 9.04688 14.9136C7.79373 15.1182 6.50809 14.9513 5.34871 14.4336C4.18933 13.9158 3.20699 13.0698 2.523 12H4.25C4.44891 12 4.63968 11.921 4.78033 11.7803C4.92098 11.6397 5 11.4489 5 11.25C5 11.0511 4.92098 10.8603 4.78033 10.7196C4.63968 10.579 4.44891 10.5 4.25 10.5H0V14.75C0 14.9489 0.0790176 15.1397 0.21967 15.2803C0.360322 15.421 0.551088 15.5 0.75 15.5C0.948912 15.5 1.13968 15.421 1.28033 15.2803C1.42098 15.1397 1.5 14.9489 1.5 14.75V13.164C2.14478 14.0623 2.96879 14.8172 3.92 15.381Z"
                                                fill="black"
                                            />
                                        </svg>
                                        <svg
                                            className="cursor-pointer shrink-0 w-6 h-6 relative overflow-visible "
                                            width="24"
                                            height="25"
                                            viewBox="0 0 24 25"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => {
                                                handleLogout();
                                                navigate("/");
                                            }}
                                        >
                                            <path
                                                d="M3 21.5V3.5H21V7.5H19V5.5H5V19.5H19V17.5H21V21.5H3ZM17 17.5L15.6 16.1L18.175 13.5H9V11.5H18.175L15.6 8.9L17 7.5L22 12.5L17 17.5Z"
                                                fill="black"
                                            />
                                        </svg>
                                        <svg
                                            className="cursor-pointer shrink-0 w-6 h-6 relative overflow-visible "
                                            width="24"
                                            height="25"
                                            viewBox="0 0 24 25"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            onClick={handleDownload}
                                        >
                                            <path
                                                d="M5 20.5H19V18.5H5V20.5ZM19 9.5H15V3.5H9V9.5H5L12 16.5L19 9.5Z"
                                                fill="black"
                                            />
                                        </svg>
                                    </div>
                                </>
                            )}
                            <div
                                className="cursor-pointer flex flex-row gap-3 items-center mx-4 mt-1"
                                onClick={() => {
                                    navigate("/mypage");
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                >
                                    <path
                                        d="M28 16C28 18.1217 27.1571 20.1566 25.6569 21.6569C24.1566 23.1571 22.1217 24 20 24C17.8783 24 15.8434 23.1571 14.3431 21.6569C12.8429 20.1566 12 18.1217 12 16C12 13.8783 12.8429 11.8434 14.3431 10.3431C15.8434 8.84285 17.8783 8 20 8C22.1217 8 24.1566 8.84285 25.6569 10.3431C27.1571 11.8434 28 13.8783 28 16Z"
                                        fill="black"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M19.184 39.984C8.517 39.556 0 30.772 0 20C0 8.954 8.954 0 20 0C31.046 0 40 8.954 40 20C40 31.046 31.046 40 20 40H19.726C19.5447 40 19.364 39.9947 19.184 39.984ZM7.166 32.62C7.01646 32.1906 6.96557 31.733 7.01708 31.2812C7.0686 30.8294 7.22121 30.395 7.46358 30.0103C7.70595 29.6255 8.03186 29.3003 8.41712 29.0588C8.80238 28.8172 9.2371 28.6655 9.689 28.615C17.485 27.752 22.563 27.83 30.321 28.633C30.7735 28.6801 31.2093 28.8299 31.5952 29.0709C31.9811 29.3119 32.3068 29.6378 32.5477 30.0237C32.7886 30.4096 32.9383 30.8455 32.9853 31.298C33.0323 31.7505 32.9754 32.2078 32.819 32.635C36.1441 29.271 38.0062 24.73 38 20C38 10.059 29.941 2 20 2C10.059 2 2 10.059 2 20C2 24.916 3.971 29.372 7.166 32.62Z"
                                        fill="black"
                                    />
                                </svg>
                                <div className="text-[#131313] text-[16px] font-semibold mb-1">
                                    {me.name}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                className="button text-[#131313] border border-neutral-900"
                                to="/signup"
                            >
                                Sign Up
                            </Link>
                            <Link
                                className="button bg-[#131313] text-[#FFFFFF]"
                                to="/signin"
                            >
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
