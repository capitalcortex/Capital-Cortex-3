import Lottie from "lottie-react";
import commingSoonAnimation from "../../public/images/coming-soon.json";

const CommingSoon = () => <div className="h-[400px] w-[800px] flex items-center justify-center">
    <Lottie animationData={commingSoonAnimation} loop={true} />
</div>;

export default CommingSoon;