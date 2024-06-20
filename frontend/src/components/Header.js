import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue-600 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">
                    Flight Status
                </div>
                <div>
                    <Link to="/" className="mx-2 hover:underline">Home</Link>
                    <Link to="/simulation" className="mx-2 hover:underline">Simulation</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
