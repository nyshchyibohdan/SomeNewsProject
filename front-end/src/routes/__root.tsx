import {
    createRootRoute,
    Link,
    Outlet,
    RootRoute,
    useMatchRoute,
} from "@tanstack/react-router";
import Navbar from "../components/Navbar/Navbar";
import logo from "../assets/imgs/logo.png";

export const Route: RootRoute = createRootRoute({
    component: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const matchRoute = useMatchRoute();
        const hideHeader =
            matchRoute({ to: "/login", fuzzy: true }) ||
            matchRoute({ to: "/register", fuzzy: true });
        // return (
        //     <>
        //         {!hideHeader && <div className="p-2 flex gap-2 sticky top-0 border-b-2 border-amber-50 z-[999]">
        //             <Link to="/" className="[&.active]:font-bold">
        //                 Home
        //             </Link>{' '}
        //             <Link to="/science" className="[&.active]:font-bold">
        //                 Science
        //             </Link>{' '}
        //             <Link to="/technology" className="[&.active]:font-bold">
        //                 Technology
        //             </Link>{' '}
        //             <Link to="/sport" className="[&.active]:font-bold">
        //                 Sport
        //             </Link>{' '}
        //         </div>}
        //         <Outlet />
        //         <TanStackRouterDevtools />
        //     </>)

        return (
            <>
                {!hideHeader && (
                    <header
                        className="w-full sticky top-0 bg-black/70 backdrop-blur-3xl h-36 flex flex-row justify-between items-center z-[1000] md:pl-28 md:pr-28"
                        data-testid="header_"
                    >
                        <div className="text-2xl">
                            <Link
                                className="no-underline text-[#9eabb8] font-sans text-2xl font-bold"
                                to="/"
                            >
                                <img
                                    src={logo}
                                    className="w-40"
                                    alt="logo"
                                    data-testid="header-logo-img-1"
                                />
                            </Link>
                        </div>

                        <nav
                            className="flex flex-row justify-center items-center"
                            data-testid="navbar-section"
                        >
                            <Navbar />
                        </nav>
                    </header>
                )}

                <main className="main-outlet">
                    <Outlet />
                </main>
            </>
        )

    },
});
