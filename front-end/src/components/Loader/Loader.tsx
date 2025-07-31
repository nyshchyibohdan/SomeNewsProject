import { BounceLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className="fixed top-0 left-0 w-dvw h-dvh flex justify-center items-center z-[9999]">
            <BounceLoader
                className="loader"
                color="white"
                speedMultiplier={1}
            />
        </div>
    )
};

export default Loader;