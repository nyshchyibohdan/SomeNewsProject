import { Link } from "@tanstack/react-router";

// function checkpath() {
//     if (currentPath !== '/profile') {
//         return (
//             <div className="dropdown-container" data-testid="dropdown-container-test">
//                 <button
//                     className="dropdown-menu-button"
//                     onClick={toggleDropdown}
//                     data-testid="dropdown-container-button"
//                 >
//                     <img className="navbar-avatar" src={user?.profilePic || defaultProfilePic} />
//                 </button>
//                 {showDropdown && (
//                     <ul className="dropdown-menu" data-testid="drop-menu">
//                         <li>
//                             <Link className="link profile-link" to="/profile">
//                                 Profile
//                             </Link>
//                         </li>
//                         <li>
//                             <button className="logout-button" onClick={logoutUser}>
//                                 Logout
//                             </button>
//                         </li>
//                     </ul>
//                 )}
//             </div>
//         );
//     }
// }

export default function Navbar() {
    return <div className="flex flex-row items-center gap-9" data-testid="nav-container">
        <Link
            className="[&.active]:!underline [&.active]:text-[#9eabb8] link"
            to="/"
        >
            Home
        </Link>
        <Link
            className="[&.active]:!underline [&.active]:text-[#9eabb8] link"
            to="/technology"
        >
            Technology
        </Link>
        <Link
            className="[&.active]:!underline [&.active]:text-[#9eabb8] link"
            to="/sport"
        >
            Sport
        </Link>
        <Link
            className="[&.active]:!underline [&.active]:text-[#9eabb8] link"
            to="/science"
        >
            Science
        </Link>
        {/* <Link
    className="[&.active]:!underline [&.active]:text-[#9eabb8] link"
    to="/community"
    name="Community"
>
    Community
</Link> */}
        {/* {checkpath()} */}
    </div>
}