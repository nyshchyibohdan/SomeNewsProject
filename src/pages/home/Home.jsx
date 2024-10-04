import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Footer, Header } from '../../components';
import { isAuthenticated } from '../../utils/auth';

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            <Header />
            <h1>Hello world</h1>
            <Footer />
        </div>
    )
}

export default Home;