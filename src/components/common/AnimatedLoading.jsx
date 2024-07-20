import Loading1 from "../../assets/images/Loading1.png";
import Loading2 from "../../assets/images/Loading2.png";
import Loading3 from "../../assets/images/Loading3.png";
import Loading4 from "../../assets/images/Loading4.png";
import Loading5 from "../../assets/images/Loading5.png";
import Loading6 from "../../assets/images/Loading6.png";
import Loading7 from "../../assets/images/Loading7.png";

const AnimatedLoading = ({ className }) => {
    return (
        <div className={"image-container " + className}>
            <img className="w-20, h-20" src={Loading1} alt="Loading..." />
            <img className="w-20, h-20" src={Loading2} alt="Loading..." />
            <img className="w-20, h-20" src={Loading3} alt="Loading..." />
            <img className="w-20, h-20" src={Loading4} alt="Loading..." />
            <img className="w-20, h-20" src={Loading5} alt="Loading..." />
            <img className="w-20, h-20" src={Loading6} alt="Loading..." />
            <img className="w-20, h-20" src={Loading7} alt="Loading..." />
        </div>
    );
};

export default AnimatedLoading;
