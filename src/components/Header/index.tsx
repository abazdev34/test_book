/** @format */

import { useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { FaList } from 'react-icons/fa';
import { MdHome } from 'react-icons/md';
import { PiSignOutBold } from 'react-icons/pi';
import { NavLink } from 'react-router-dom';
import AskToLogOut from './AskToLogOut';

// Warm color palette
const colors = {
    primary: '#e67e22', // Orange
    secondary: '#f39c12', // Amber
    accent: '#d35400', // Dark Orange
    text: '#34495e', // Dark Blue-Gray
    background: '#fff', // White
};

export default function Header() {
    const isAuthenticated = useIsAuthenticated();
    const [logOut, setLogOut] = useState(false);
    const signOut = useSignOut();
    const auth = useAuthUser();
    const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility

    const buttonStyle = {
        borderColor: colors.primary,
        color: colors.primary,
        backgroundColor: colors.background,
    };

    return (
        <header className='w-full flex justify-between items-center px-4'>
            <div className='flex items-center'>
                <NavLink to='/'>
                    <button
                        className='py-2 px-4 border-2 h-10 rounded-md text-center'
                        style={buttonStyle}
                    >
                        <MdHome />
                    </button>
                </NavLink>
                <button
                    className='ml-4 md:hidden' // Hide on larger screens
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className='text-2xl'>☰</span> {/* Hamburger icon */}
                </button>
            </div>

            <nav className={`flex-col md:flex md:flex-row md:items-center ${menuOpen ? 'flex' : 'hidden'} md:flex`}>
                {isAuthenticated ? (
                    <>
                        {auth.role === 'admin' ? (
                            <>
                                <NavLink to='/admin'>
                                    <button
                                        className='py-2 px-4 border-2 h-10 rounded-md text-center'
                                        style={buttonStyle}
                                    >
                                        🛠️
                                    </button>
                                </NavLink>
                                <NavLink to='/adminPanel'>
                                    <button
                                        className='py-2 px-4 border-2 h-10 rounded-md text-center'
                                        style={buttonStyle}
                                    >
                                        📘
                                    </button>
                                </NavLink>
                                <NavLink to='/all_results'>
                                    <button
                                        className='py-2 px-4 border-2 h-10 rounded-md text-center'
                                        style={buttonStyle}
                                    >
                                        📊
                                    </button>
                                </NavLink>
                            </>
                        ) : (
                            <div className="flex gap-2">
                                <NavLink to='/dashboard'>
                                    <button
                                        className='py-2 px-4 border-2 h-10 rounded-md text-center'
                                        style={buttonStyle}
                                    >
                                        <FaList />
                                    </button>
                                </NavLink>
                                <NavLink to='/results'>
                                    <button
                                        className='py-2 px-4 border-2 h-10 rounded-md text-center'
                                        style={buttonStyle}
                                    >
                                        ✅
                                    </button>
                                </NavLink>
                            </div>
                        )}
                        <button
                            className='py-2 px-4 border-2 h-10 rounded-md text-center'
                            style={buttonStyle}
                            onClick={() => setLogOut(!logOut)}
                        >
                            <PiSignOutBold />
                        </button>
                        {logOut && <AskToLogOut setLogOut={setLogOut} signOut={signOut} />}
                    </>
                ) : (
                    <>
                        <NavLink to='/login'>
                            <button
                                className='py-2 px-4 border-2 h-10 rounded-md text-center'
                                style={buttonStyle}
                            >
                                Кирүү
                            </button>
                        </NavLink>
                        <NavLink to='/register'>
                            <button
                                className='py-2 px-4 border-2 h-10 rounded-md text-center'
                                style={buttonStyle}
                            >
                                Каттоо
                            </button>
                        </NavLink>
                    </>
                )}
            </nav>
        </header>
    );
}