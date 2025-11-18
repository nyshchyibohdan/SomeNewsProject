import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import defaultProfilePic from "../../assets/imgs/logo.png";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function Navbar() {
    const user = useAppSelector((state) => state.user);
    const [showDropdown, setShowDropdown] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const currentPath = useLocation().pathname;

    useEffect(() => {
        if (mobileOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [mobileOpen]);

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    function checkpath() {
        if (currentPath !== '/profile') {
            return <div className="relative">
                <button
                    className="!bg-transparent !border-0 cursor-pointer !p-0 outline-none"
                    onClick={toggleDropdown}
                >
                    <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={user.profilePic || defaultProfilePic}
                    />
                </button>

                {showDropdown && (
                    <ul className="absolute flex flex-col items-center right-0 top-11 bg-[#25292e] rounded-lg w-[150px] py-2.5 list-none shadow-xl">
                        <li>
                            <Link className="px-4 py-2 w-full text-white font-bold hover:text-[#9eabb8]" to="/profile">
                                Profile
                            </Link>
                        </li>
                        <li>
                            <button className="!p-0 !px-4 !py-2 !bg-transparent !border-0 w-full text-left !text-[#e74c3c] font-bold !hover:text-[#a3372b]">
                                Logout
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        }
    }

    return (
        <>
            <div className="hidden md:flex items-center gap-9">
                <Link className="[&.active]:!underline hover:text-[#9eabb8]" to="/" onClick={() => setShowDropdown(false)}>
                    Home
                </Link>
                <Link className="[&.active]:!underline hover:text-[#9eabb8]" to="/technology" onClick={() => setShowDropdown(false)}>
                    Technology
                </Link>
                <Link className="[&.active]:!underline hover:text-[#9eabb8]" to="/sport" onClick={() => setShowDropdown(false)}>
                    Sport
                </Link>
                <Link className="[&.active]:!underline hover:text-[#9eabb8]" to="/science" onClick={() => setShowDropdown(false)}>
                    Science
                </Link>

                {checkpath()}
            </div>


            <button
                className="md:hidden text-3xl cursor-pointer !border-none !bg-transparent !p-0"
                onClick={() => setMobileOpen(!mobileOpen)}
            >
                ☰
            </button>

            {mobileOpen && (
                <nav className="md:hidden absolute top-16 left-0 w-screen h-screen bg-[#25292e] flex flex-col gap-6 px-6 py-4 z-[2000]">
                    <div className="flex flex-col gap-3">
                        <Link className="[&.active]:!underline text-white text-lg" to="/" onClick={() => setMobileOpen(false)}>
                            Home
                        </Link>
                        <Link className="[&.active]:!underline text-white text-lg" to="/technology" onClick={() => setMobileOpen(false)}>
                            Technology
                        </Link>
                        <Link className="[&.active]:!underline text-white text-lg" to="/sport" onClick={() => setMobileOpen(false)}>
                            Sport
                        </Link>
                        <Link className="[&.active]:!underline text-white text-lg" to="/science" onClick={() => setMobileOpen(false)}>
                            Science
                        </Link>
                    </div>

                    <div className="flex flex-row justify-around border-t border-gray-600 pt-3">
                        <Link
                            className="px-4 py-2 bg-[#293038] w-1/3 rounded-[8px] text-white text-center font-bold hover:text-[#9eabb8]"
                            to="/profile"
                            onClick={() => setMobileOpen(false)}
                        >
                            Profile
                        </Link>
                        <button className="!p-0 !px-4 !py-2 !bg-[#e74c3c] w-1/3 !border-0 text-center !text-[white] font-bold !hover:text-[#a3372b]">
                            Logout
                        </button>
                    </div>
                </nav>
            )}
        </>
    );
}
