import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="fixed z-50 bg-white border-solid border-[#dddddd] border-b pt-3.5 pr-[18px] pb-3.5 pl-[18px] flex flex-row gap-2.5 items-center justify-between h-[104px] w-full overflow-hidden">
            <div className="flex flex-row items-center justify-between w-full relative">
                <div className="flex flex-row items-center justify-between w-[523px] relative">
                    <div className="w-[259px] h-[74px] relative">
                        <img
                            className="w-[100%] h-[100%] absolute right-[0%] left-[0%] bottom-[0%] top-[0%]"
                            style={{ objectFit: "cover" }}
                            src={logo}
                        />
                    </div>
                    <div className="flex flex-row gap-[52px] items-start justify-start relative">
                        <button className="button-text">Service</button>
                        <button className="button-text">Contents</button>
                    </div>
                </div>
                <div className="flex flex-row gap-5 items-center justify-start shrink-0 relative">
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
                </div>
            </div>
        </div>
    );
};

export default Header;
