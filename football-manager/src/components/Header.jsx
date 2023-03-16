import { useState, useEffect } from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as cognito from "../utilities/cognito";
import { useDispatch } from "react-redux";
import { logout } from "../reducer/authSlice";

const imageFolderPath = import.meta.env.BASE_URL + "";

export default function Header() {
    const [openNav, setOpenNav] = useState(false);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUserName = cognito.currentUser()?.username;

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const signOutHandler = () => {
        cognito.signOut();
        dispatch(logout());
        setOpenNav(false);
    };

    const clickHandler = () => {
        if (isAuthenticated) {
            navigate("/create-team");
        } else {
            navigate("/sign-in");
        }
        setOpenNav(false);
    };

    const navList = (
        <ul className="mb-4 ml-2 mt-2 flex flex-col gap-2 md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <NavLink to="/" className="flex items-center" onClick={() => setOpenNav(false)}>
                    Home
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <NavLink to="/about" className="flex items-center" onClick={() => setOpenNav(false)}>
                    About
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <NavLink to="/league" className="flex items-center" onClick={() => setOpenNav(false)}>
                    League
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <NavLink to="/locker-room" className="flex items-center" onClick={() => setOpenNav(false)}>
                    Locker Room
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <NavLink to="/profile" className="flex items-center" onClick={() => setOpenNav(false)}>
                    Profile
                </NavLink>
            </Typography>
            {isAuthenticated ? (
                <>
                    <Typography
                        as="p"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-normal"
                    >
                        <NavLink to="" className="flex items-center">
                            Hello {currentUserName}!
                        </NavLink>
                    </Typography>
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-normal"
                    >
                        <NavLink to="/sign-in" className="flex items-center" onClick={signOutHandler}>
                            Sign out
                        </NavLink>
                    </Typography>
                </>
            ) : (
                <>
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-normal"
                    >
                        <NavLink to="/sign-up" className="flex items-center" onClick={() => setOpenNav(false)}>
                            Sign up
                        </NavLink>
                    </Typography>
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-normal"
                    >
                        <NavLink to="/sign-in" className="flex items-center" onClick={() => setOpenNav(false)}>
                            Sign in
                        </NavLink>
                    </Typography>
                </>
            )}

        </ul>
    );

    return (
        <Navbar className="mx-auto py-3 px-5 md:px-8 md:py-4 text-black rounded-none max-w-none">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="li"
                    href="#"
                    variant="small"
                    className="mr-4 cursor-pointer py-1.5 font-normal list-none"
                >
                    <NavLink to='/'>
                        <img src={`${imageFolderPath}logo.png`} alt='logo' className="w-20 md:w-[130px]" />
                    </NavLink>
                </Typography>
                <div className="hidden md:block">{navList}</div>
                <Button variant="gradient" size="sm" className="hidden md:inline-block bg-green-500 text-white p-4 py-2" onClick={clickHandler}>
                    <span>Create your own team!</span>
                </Button>
                <IconButton
                    variant="text"
                    className="ml-auto relative bottom-2 h-10 w-10 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </IconButton>
            </div>
            <MobileNav open={openNav} className={`${!openNav ? 'hidden' : '!h-auto'}`}>
                <div className="container mx-auto">
                    {navList}
                    <Button variant="gradient" size="sm" fullWidth className="mb-2 bg-green-500" onClick={clickHandler}>
                        <span>Create your own team!</span>
                    </Button>
                </div>
            </MobileNav>
        </Navbar>
    );
}