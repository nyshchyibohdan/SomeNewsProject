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
                        className="w-full sticky top-0 bg-black/70 backdrop-blur-3xl md:h-36 h-16 flex flex-row justify-between items-center z-[1000] md:pl-28 md:pr-28 pl-10 pr-10"
                        data-testid="header_"
                    >
                        <div className="hidden sm:block md:text-2xl text-xs ">
                            <Link
                                className="no-underline text-[#9eabb8] font-sans text-2xl font-bold"
                                to="/"
                            >
                                <img
                                    src={logo}
                                    className="md:w-40 w-20"
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

                {!hideHeader &&
                    <footer className="h-10 pl-1.5 pr-1.5 flex flex-row justify-center items-center lg:pb-[50px] lg:pt-[50px] lg:pl-[160px] lg:pr-[160px] bg-[#15171a]">
                        <div className="w-11/12 flex flex-row justify-between items-center">
                            <section className="text-[12px] self-center md:text-2xl">
                                <Link className="no-underline" to="/">
                                    Some news
                                </Link>
                            </section>
                            <div className='flex flex-row gap-8'>
                                <a
                                    className="text-[12px] no-underline text-[#9eabb8] md:text-[18px] font-bold footer-git-link"
                                    href="https://github.com/nyshchyibohdan/SomeNewsProject"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub
                                </a>
                                <a
                                    className={'text-[12px] no-underline text-[#9eabb8] md:text-[18px] font-bold footer-mail-to-link '}
                                    href="mailto:nyshchyi.bohdan@student.uzhnu.edu.ua?subject=Mail topic&body=Mail text"
                                >
                                    Report problem
                                </a>
                            </div>
                        </div>
                    </footer>
                }
            </>
        )

    },
});
