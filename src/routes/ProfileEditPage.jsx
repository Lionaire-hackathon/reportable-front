import useMe from "../apis/hook/useMe";
import Header from "../components/common/Header";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../apis/user";

const ProfileEditPage = () => {
    const formRef = useRef(null);
    const { me, isLoadingMe } = useMe();
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUserInfo, setUpdatedUserInfo] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    useEffect(() => {
        // me가 존재하고, 로딩이 완료되었는지 확인
        if (!isLoadingMe && me) {
            setUpdatedUserInfo({
                ...updatedUserInfo,
                name: me.name,
                email: me.email,
            });
        }
    }, [me, isLoadingMe]);

    const navigate = useNavigate();

    const handleInfoChange = (e) => {
        const { id, value } = e.target;
        setUpdatedUserInfo({
            ...updatedUserInfo,
            [id]: value,
        });
    };

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}년 ${month}월 ${day}일 가입`;
    };

    const handleDeleteAccount = async (e) => {
        const userConfirmed = window.confirm("정말 회원탈퇴 하시겠습니까?");
        if (userConfirmed) {
            await userApi.remove(me.id);
            alert("회원탈퇴가 성공적으로 완료되었습니다.");
            navigate("/");
        }
    };

    const validatePasswords = () => {
        const password = document.getElementById("password");
        const passwordConfirm = document.getElementById("passwordConfirm");

        if (password.value.trim() === "") {
            password.setCustomValidity(
                "새로운 비밀번호가 입력되지 않았습니다. 다시 한 번 확인해주세요."
            );
            return false;
        } else if (password.value !== passwordConfirm.value) {
            passwordConfirm.setCustomValidity(
                "비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요."
            );
            return false;
        } else {
            password.setCustomValidity("");
            passwordConfirm.setCustomValidity("");
            return true;
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault(); // to prevent reloading the page
        const form = e.target;

        try {
            if (form.checkValidity()) {
                const { passwordConfirm, ...updateUserDto } = updatedUserInfo;
                await userApi.update(me.id, updateUserDto);
                alert("회원정보가 수정되었습니다!");
                // 페이지를 리로드하지 않고 상태를 갱신
                window.location.reload();
                setIsEditing(false);
            } else {
                form.reportValidity();
            }
        } catch (error) {
            alert(
                `${error.response.data.message} 회원정보 수정에 실패하였습니다.`
            );
        }
    };

    const handleExternalButtonClick = () => {
        if (formRef.current) {
            formRef.current.requestSubmit(); // form.submit()을 대신해서 폼 내부의 onSubmit 이벤트를 트리거하는 requestSubmit 사용
        }
    };

    return (
        me && (
            <>
                <Header className="fixed" />
                <div className="pt-[104px] top-0 bottom-0 left-0 right-0 flex flex-col">
                    <div className="mt-[40px] flex items-center justify-center w-full ">
                        <div className="flex flex-row gap-4 items-center justify-start w-[70%]">
                            <svg
                                className="cursor-pointer relative overflow-visible "
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => {
                                    navigate("/mypage");
                                }}
                            >
                                <path
                                    d="M13.9875 19.9875C14.2625 20.2625 14.6065 20.3935 15.0195 20.3805C15.4315 20.3685 15.775 20.225 16.05 19.95C16.325 19.675 16.4625 19.325 16.4625 18.9C16.4625 18.475 16.325 18.125 16.05 17.85L14.7 16.5H19.5375C19.9625 16.5 20.3125 16.356 20.5875 16.068C20.8625 15.781 21 15.425 21 15C21 14.575 20.8565 14.2185 20.5695 13.9305C20.2815 13.6435 19.925 13.5 19.5 13.5H14.7L16.0875 12.1125C16.3625 11.8375 16.494 11.4935 16.482 11.0805C16.469 10.6685 16.325 10.325 16.05 10.05C15.775 9.775 15.425 9.6375 15 9.6375C14.575 9.6375 14.225 9.775 13.95 10.05L10.05 13.95C9.775 14.225 9.6375 14.575 9.6375 15C9.6375 15.425 9.775 15.775 10.05 16.05L13.9875 19.9875ZM15 30C12.925 30 10.975 29.606 9.15 28.818C7.325 28.031 5.7375 26.9625 4.3875 25.6125C3.0375 24.2625 1.969 22.675 1.182 20.85C0.394 19.025 0 17.075 0 15C0 12.925 0.394 10.975 1.182 9.15C1.969 7.325 3.0375 5.7375 4.3875 4.3875C5.7375 3.0375 7.325 1.9685 9.15 1.1805C10.975 0.3935 12.925 0 15 0C17.075 0 19.025 0.3935 20.85 1.1805C22.675 1.9685 24.2625 3.0375 25.6125 4.3875C26.9625 5.7375 28.031 7.325 28.818 9.15C29.606 10.975 30 12.925 30 15C30 17.075 29.606 19.025 28.818 20.85C28.031 22.675 26.9625 24.2625 25.6125 25.6125C24.2625 26.9625 22.675 28.031 20.85 28.818C19.025 29.606 17.075 30 15 30Z"
                                    fill="black"
                                />
                            </svg>
                            <div
                                id="profile-edit"
                                className="pt-1 text-[#000000] text-left font-['Inter-Medium',_sans-serif] text-[32px] leading-[160%] font-medium relative self-stretch flex items-center justify-start"
                            >
                                Profile Edit
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto my-[30px] bg-white rounded-[10px] border-solid border-[#d9d9d9] border py-[60px] flex flex-row justify-evenly items-center shrink-0 w-[70%] h-auto relative">
                        <div className="flex flex-col gap-[60px] items-center justify-start shrink-0 relative w-[40%]">
                            <svg
                                className="rounded-[20px] flex flex-row gap-2.5 items-center justify-start shrink-0 w-46 h-46 relative "
                                width="192"
                                height="192"
                                viewBox="0 0 192 192"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    width="192"
                                    height="192"
                                    rx="20"
                                    fill="#A2A2A2"
                                />
                                <path
                                    d="M96 32C104.487 32 112.626 35.3714 118.627 41.3726C124.629 47.3737 128 55.5131 128 64C128 72.4869 124.629 80.6263 118.627 86.6274C112.626 92.6286 104.487 96 96 96C87.5131 96 79.3737 92.6286 73.3726 86.6274C67.3714 80.6263 64 72.4869 64 64C64 55.5131 67.3714 47.3737 73.3726 41.3726C79.3737 35.3714 87.5131 32 96 32ZM96 112C131.36 112 160 126.32 160 144V160H32V144C32 126.32 60.64 112 96 112Z"
                                    fill="white"
                                />
                            </svg>
                            <div className="text-[#939393] text-center font-['Roboto-Bold',_sans-serif] text-[30px] font-bold relative self-stretch">
                                환영합니다 {me.name} 님!{" "}
                            </div>
                            {isEditing ? (
                                <>
                                    <div className="flex flex-row justify-evenly gap-[40px]">
                                        <button
                                            onClick={() => {
                                                setIsEditing(false);
                                            }}
                                            className="bg-[#ffffff] rounded-[5px] border-solid border-[#858585] border pt-[11px] pb-[11px] flex flex-row gap-2.5 items-center justify-center shrink-0 w-[140px] h-[55px] relative"
                                        >
                                            <span className="text-[#151515] text-left font-['Roboto-Regular',_sans-serif] text-[18px] font-normal relative white-space: nowrap">
                                                취소{" "}
                                            </span>
                                        </button>
                                        <button
                                            onClick={handleExternalButtonClick}
                                            className="bg-[#2f2f2f] rounded-[5px] pt-0.5 pb-0.5 w-[140px] flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 h-[55px] relative"
                                        >
                                            <span className="text-[#ffffff] text-left font-['Roboto-Regular',_sans-serif] text-[18px] font-normal relative white-space: nowrap">
                                                수정사항 저장{" "}
                                            </span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-row justify-evenly gap-[40px]">
                                        <button
                                            onClick={() => {
                                                setIsEditing(true);
                                            }}
                                            className="bg-[#2f2f2f] rounded-[5px] pt-0.5 pb-0.5 w-[140px] flex flex-row gap-2.5 items-center justify-center self-stretch shrink-0 h-[55px] relative"
                                        >
                                            <span className="text-[#ffffff] text-left font-['Roboto-Regular',_sans-serif] text-[18px] font-normal relative white-space: nowrap">
                                                프로필 수정{" "}
                                            </span>
                                        </button>
                                        <button
                                            onClick={handleDeleteAccount}
                                            className="bg-[#ffffff] rounded-[5px] border-solid border-[#858585] border pt-[11px] pb-[11px] flex flex-row gap-2.5 items-center justify-center shrink-0 w-[140px] h-[55px] relative"
                                        >
                                            <span className="text-[#e61515] text-left font-['Roboto-Regular',_sans-serif] text-[18px] font-normal relative white-space: nowrap">
                                                회원탈퇴{" "}
                                            </span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                        <form
                            ref={formRef}
                            onSubmit={handleUpdateSubmit}
                            className="flex flex-col gap-[36px] items-center justify-evenly shrink-0 relative w-[45%]"
                        >
                            <div className="bg-[#F2F2F2] rounded-2xl pt-[18px] pr-5 pb-[18px] pl-7 flex flex-row gap-6 items-center justify-start self-stretch shrink-0 relative w-full">
                                <div className="flex items-center justify-center w-[24px] h-[24px]">
                                    <svg
                                        className="h-[auto]"
                                        width="14"
                                        height="17"
                                        viewBox="0 0 14 17"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M11.4117 4.57571C11.4117 7.02324 9.44929 8.98576 7.00004 8.98576C4.55162 8.98576 2.58839 7.02324 2.58839 4.57571C2.58839 2.12819 4.55162 0.166504 7.00004 0.166504C9.44929 0.166504 11.4117 2.12819 11.4117 4.57571ZM7.00004 16.8332C3.38535 16.8332 0.333374 16.2457 0.333374 13.979C0.333374 11.7115 3.40453 11.1448 7.00004 11.1448C10.6156 11.1448 13.6667 11.7323 13.6667 13.999C13.6667 16.2665 10.5956 16.8332 7.00004 16.8332Z"
                                            fill="#212121"
                                        />
                                    </svg>
                                </div>
                                {isEditing ? (
                                    <input
                                        className="bg-[#F2F2F2] text-[#9e9e9e] text-left font-body-xlarge-semibold-font-family text-body-xlarge-semibold-font-size leading-body-xlarge-semibold-line-height font-body-xlarge-semibold-font-weight relative flex-1 flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                        }}
                                        id="name"
                                        value={updatedUserInfo.name}
                                        onChange={handleInfoChange}
                                    />
                                ) : (
                                    <div
                                        className="text-[#212121] text-left font-body-xlarge-semibold-font-family text-body-xlarge-semibold-font-size leading-body-xlarge-semibold-line-height font-body-xlarge-semibold-font-weight relative flex-1 flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                        }}
                                    >
                                        {me.name}
                                    </div>
                                )}
                            </div>
                            <div className="bg-[#F2F2F2] rounded-2xl pt-[18px] pr-5 pb-[18px] pl-7 flex flex-row gap-6 items-center justify-start self-stretch shrink-0 relative w-full">
                                <div className="flex items-center justify-center w-[24px] h-[24px]">
                                    <svg
                                        className="h-[auto]"
                                        width="18"
                                        height="15"
                                        viewBox="0 0 18 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M13.1162 0C14.2337 0 15.3087 0.441667 16.0995 1.23417C16.8912 2.025 17.3337 3.09167 17.3337 4.20833V10.7917C17.3337 13.1167 15.442 15 13.1162 15H4.88366C2.55783 15 0.666992 13.1167 0.666992 10.7917V4.20833C0.666992 1.88333 2.54949 0 4.88366 0H13.1162ZM14.442 5.45L14.5087 5.38333C14.7078 5.14167 14.7078 4.79167 14.4995 4.55C14.3837 4.42583 14.2245 4.35 14.0587 4.33333C13.8837 4.32417 13.717 4.38333 13.5912 4.5L9.83366 7.5C9.35033 7.90083 8.65783 7.90083 8.16699 7.5L4.41699 4.5C4.15783 4.30833 3.79949 4.33333 3.58366 4.55833C3.35866 4.78333 3.33366 5.14167 3.52449 5.39167L3.63366 5.5L7.42533 8.45833C7.89199 8.825 8.45783 9.025 9.05033 9.025C9.64116 9.025 10.217 8.825 10.6828 8.45833L14.442 5.45Z"
                                            fill="#212121"
                                        />
                                    </svg>
                                </div>
                                <div
                                    className="text-[#212121] text-left font-body-xlarge-semibold-font-family text-body-xlarge-semibold-font-size leading-body-xlarge-semibold-line-height font-body-xlarge-semibold-font-weight relative flex-1 flex items-center justify-start"
                                    style={{
                                        letterSpacing:
                                            "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                    }}
                                >
                                    {me.email}
                                </div>
                            </div>
                            <div className="bg-[#F2F2F2] rounded-2xl pt-[18px] pr-5 pb-[18px] pl-7 flex flex-row gap-6 items-center justify-start self-stretch shrink-0 relative w-full">
                                <div className="flex items-center justify-center w-[24px] h-[24px]">
                                    <svg
                                        className="h-auto "
                                        width="22"
                                        height="18"
                                        viewBox="0 0 22 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11 0L0 6L11 12L20 7.09V14H22V6M4 10.18V14.18L11 18L18 14.18V10.18L11 14L4 10.18Z"
                                            fill="black"
                                        />
                                    </svg>
                                </div>
                                <div
                                    className="text-[#212121] text-left font-body-xlarge-semibold-font-family text-body-xlarge-semibold-font-size leading-body-xlarge-semibold-line-height font-body-xlarge-semibold-font-weight relative flex-1 flex items-center justify-start"
                                    style={{
                                        letterSpacing:
                                            "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                    }}
                                >
                                    {formatDate(me.created_at)}
                                </div>
                            </div>
                            <div className="bg-[#F2F2F2] rounded-2xl pt-[18px] pr-5 pb-[18px] pl-7 flex flex-row gap-6 items-center justify-start self-stretch shrink-0 relative w-full">
                                <div className="flex items-center justify-center w-[24px] h-[24px]">
                                    <svg
                                        className="h-auto"
                                        width="20"
                                        height="21"
                                        viewBox="0 0 20 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_111_2857)">
                                            <path
                                                d="M12.9166 1.3335H6.24996C5.09996 1.3335 4.16663 2.26683 4.16663 3.41683V17.5835C4.16663 18.7335 5.09996 19.6668 6.24996 19.6668H12.9166C14.0666 19.6668 15 18.7335 15 17.5835V3.41683C15 2.26683 14.0666 1.3335 12.9166 1.3335ZM9.58329 18.8335C8.89163 18.8335 8.33329 18.2752 8.33329 17.5835C8.33329 16.8918 8.89163 16.3335 9.58329 16.3335C10.275 16.3335 10.8333 16.8918 10.8333 17.5835C10.8333 18.2752 10.275 18.8335 9.58329 18.8335ZM13.3333 15.5002H5.83329V3.8335H13.3333V15.5002Z"
                                                fill="black"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_111_2857">
                                                <rect
                                                    width="20"
                                                    height="20"
                                                    fill="white"
                                                    transform="translate(0 0.5)"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div
                                    className="text-[#212121] text-left font-body-xlarge-semibold-font-family text-body-xlarge-semibold-font-size leading-body-xlarge-semibold-line-height font-body-xlarge-semibold-font-weight relative flex-1 flex items-center justify-start"
                                    style={{
                                        letterSpacing:
                                            "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                    }}
                                >
                                    {me.phone_number
                                        ? me.phone_number
                                        : "번호를 등록해주세요"}
                                </div>
                            </div>
                            <div className="bg-[#F2F2F2] rounded-2xl pt-[18px] pr-5 pb-[18px] pl-7 flex flex-row gap-6 items-center justify-start self-stretch shrink-0 relative w-full">
                                <div className="flex items-center justify-center w-[24px] h-[24px]">
                                    <svg
                                        className="w-4 h-[21px] relative overflow-visible "
                                        width="16"
                                        height="21"
                                        viewBox="0 0 16 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8 16C8.53043 16 9.03914 15.7893 9.41421 15.4142C9.78929 15.0391 10 14.5304 10 14C10 13.4696 9.78929 12.9609 9.41421 12.5858C9.03914 12.2107 8.53043 12 8 12C7.46957 12 6.96086 12.2107 6.58579 12.5858C6.21071 12.9609 6 13.4696 6 14C6 14.5304 6.21071 15.0391 6.58579 15.4142C6.96086 15.7893 7.46957 16 8 16ZM14 7C14.5304 7 15.0391 7.21071 15.4142 7.58579C15.7893 7.96086 16 8.46957 16 9V19C16 19.5304 15.7893 20.0391 15.4142 20.4142C15.0391 20.7893 14.5304 21 14 21H2C1.46957 21 0.960859 20.7893 0.585786 20.4142C0.210714 20.0391 0 19.5304 0 19V9C0 8.46957 0.210714 7.96086 0.585786 7.58579C0.960859 7.21071 1.46957 7 2 7H3V5C3 3.67392 3.52678 2.40215 4.46447 1.46447C5.40215 0.526784 6.67392 0 8 0C8.65661 0 9.30679 0.129329 9.91342 0.380602C10.52 0.631876 11.0712 1.00017 11.5355 1.46447C11.9998 1.92876 12.3681 2.47995 12.6194 3.08658C12.8707 3.69321 13 4.34339 13 5V7H14ZM8 2C7.20435 2 6.44129 2.31607 5.87868 2.87868C5.31607 3.44129 5 4.20435 5 5V7H11V5C11 4.20435 10.6839 3.44129 10.1213 2.87868C9.55871 2.31607 8.79565 2 8 2Z"
                                            fill="black"
                                        />
                                    </svg>
                                </div>
                                {isEditing ? (
                                    <input
                                        className="bg-[#f2f2f2] text-[#9e9e9e] text-left font-body-xlarge-semibold-font-family text-body-xlarge-semibold-font-size leading-body-xlarge-semibold-line-height font-body-xlarge-semibold-font-weight relative flex-1 flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                        }}
                                        id="password"
                                        type="password"
                                        placeholder="새로운 비밀번호"
                                        value={updatedUserInfo.password}
                                        onChange={(e) => {
                                            handleInfoChange(e);
                                            validatePasswords();
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="text-[#212121] text-left font-body-xlarge-semibold-font-family text-body-xlarge-semibold-font-size leading-body-xlarge-semibold-line-height font-body-xlarge-semibold-font-weight relative flex-1 flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                        }}
                                    >
                                        **********
                                    </div>
                                )}
                            </div>
                            <div
                                className={`${
                                    isEditing ? "" : "hidden "
                                } bg-[#F2F2F2] rounded-2xl pt-[18px] pr-5 pb-[18px] pl-7 flex flex-row gap-6 items-center justify-start self-stretch shrink-0 relative w-full`}
                            >
                                <div className="flex items-center justify-center w-[24px] h-[24px]">
                                    <svg
                                        className="w-4 h-[21px] relative overflow-visible "
                                        width="16"
                                        height="21"
                                        viewBox="0 0 16 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8 16C8.53043 16 9.03914 15.7893 9.41421 15.4142C9.78929 15.0391 10 14.5304 10 14C10 13.4696 9.78929 12.9609 9.41421 12.5858C9.03914 12.2107 8.53043 12 8 12C7.46957 12 6.96086 12.2107 6.58579 12.5858C6.21071 12.9609 6 13.4696 6 14C6 14.5304 6.21071 15.0391 6.58579 15.4142C6.96086 15.7893 7.46957 16 8 16ZM14 7C14.5304 7 15.0391 7.21071 15.4142 7.58579C15.7893 7.96086 16 8.46957 16 9V19C16 19.5304 15.7893 20.0391 15.4142 20.4142C15.0391 20.7893 14.5304 21 14 21H2C1.46957 21 0.960859 20.7893 0.585786 20.4142C0.210714 20.0391 0 19.5304 0 19V9C0 8.46957 0.210714 7.96086 0.585786 7.58579C0.960859 7.21071 1.46957 7 2 7H3V5C3 3.67392 3.52678 2.40215 4.46447 1.46447C5.40215 0.526784 6.67392 0 8 0C8.65661 0 9.30679 0.129329 9.91342 0.380602C10.52 0.631876 11.0712 1.00017 11.5355 1.46447C11.9998 1.92876 12.3681 2.47995 12.6194 3.08658C12.8707 3.69321 13 4.34339 13 5V7H14ZM8 2C7.20435 2 6.44129 2.31607 5.87868 2.87868C5.31607 3.44129 5 4.20435 5 5V7H11V5C11 4.20435 10.6839 3.44129 10.1213 2.87868C9.55871 2.31607 8.79565 2 8 2Z"
                                            fill="black"
                                        />
                                    </svg>
                                </div>
                                {isEditing ? (
                                    <input
                                        className="bg-[#f2f2f2] text-[#9e9e9e] text-left font-body-xlarge-semibold-font-family text-body-xlarge-semibold-font-size leading-body-xlarge-semibold-line-height font-body-xlarge-semibold-font-weight relative flex-1 flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                        }}
                                        id="passwordConfirm"
                                        type="password"
                                        value={updatedUserInfo.passwordConfirm}
                                        placeholder="비밀번호 확인"
                                        onChange={(e) => {
                                            handleInfoChange(e);
                                            validatePasswords();
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="text-[#212121] text-left font-body-xlarge-semibold-font-family text-body-xlarge-semibold-font-size leading-body-xlarge-semibold-line-height font-body-xlarge-semibold-font-weight relative flex-1 flex items-center justify-start"
                                        style={{
                                            letterSpacing:
                                                "var(--body-xlarge-semibold-letter-spacing, 0.2px)",
                                        }}
                                    >
                                        **********
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    );
};

export default ProfileEditPage;
