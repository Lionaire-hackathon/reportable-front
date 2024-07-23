import React from "react";

const ResetIcon = ({ id, onClick = null, isDisabled }) => (
    <svg
        className={`${
            isDisabled && "hidden"
        } cursor-pointer shrink-0 w-4 h-4 relative overflow-visible`}
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id={id}
        onClick={onClick}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.82 0.528976C9.20071 0.411147 10.5884 0.653982 11.847 1.23369C13.1056 1.81341 14.1921 2.71011 15 3.83598V2.24998C15 2.05106 15.079 1.8603 15.2197 1.71965C15.3603 1.57899 15.5511 1.49998 15.75 1.49998C15.9489 1.49998 16.1397 1.57899 16.2803 1.71965C16.421 1.8603 16.5 2.05106 16.5 2.24998V6.49998H12.25C12.0511 6.49998 11.8603 6.42096 11.7197 6.28031C11.579 6.13965 11.5 5.94889 11.5 5.74998C11.5 5.55106 11.579 5.3603 11.7197 5.21965C11.8603 5.07899 12.0511 4.99998 12.25 4.99998H13.977C13.2931 3.92988 12.3107 3.08356 11.1512 2.56556C9.9917 2.04757 8.70584 1.88058 7.45248 2.08524C6.19912 2.2899 5.03316 2.85723 4.09864 3.71715C3.16412 4.57708 2.50198 5.69192 2.194 6.92398C2.17128 7.02076 2.12955 7.11206 2.07123 7.19257C2.01291 7.27308 1.93917 7.34119 1.85429 7.39294C1.76942 7.4447 1.6751 7.47906 1.57682 7.49403C1.47854 7.50901 1.37827 7.5043 1.28182 7.48017C1.18538 7.45604 1.0947 7.41298 1.01505 7.3535C0.935404 7.29401 0.868375 7.21928 0.817865 7.13366C0.767355 7.04803 0.734371 6.95322 0.720832 6.85473C0.707293 6.75625 0.713469 6.65605 0.739 6.55998C1.14354 4.9424 2.0434 3.49166 3.31279 2.41052C4.58218 1.32939 6.15766 0.671906 7.819 0.529976L7.82 0.528976ZM4.42 15.381C5.49199 16.0164 6.69758 16.3925 7.94068 16.4795C9.18378 16.5665 10.43 16.3618 11.58 15.8819C12.73 15.402 13.752 14.6601 14.5646 13.7153C15.3771 12.7704 15.9577 11.6489 16.26 10.44C16.305 10.2482 16.2728 10.0464 16.1702 9.87814C16.0676 9.70993 15.903 9.58883 15.7119 9.54101C15.5207 9.4932 15.3185 9.52251 15.1488 9.62261C14.9791 9.72271 14.8556 9.88557 14.805 10.076C14.4969 11.3078 13.8347 12.4223 12.9002 13.282C11.9658 14.1417 10.8 14.7089 9.54688 14.9136C8.29373 15.1182 7.00809 14.9513 5.84871 14.4336C4.68933 13.9158 3.70699 13.0698 3.023 12H4.75C4.94891 12 5.13968 11.921 5.28033 11.7803C5.42098 11.6397 5.5 11.4489 5.5 11.25C5.5 11.0511 5.42098 10.8603 5.28033 10.7196C5.13968 10.579 4.94891 10.5 4.75 10.5H0.5V14.75C0.5 14.9489 0.579018 15.1397 0.71967 15.2803C0.860322 15.421 1.05109 15.5 1.25 15.5C1.44891 15.5 1.63968 15.421 1.78033 15.2803C1.92098 15.1397 2 14.9489 2 14.75V13.164C2.64478 14.0623 3.46879 14.8172 4.42 15.381Z"
            fill="black"
        />
    </svg>
);

export default ResetIcon;
