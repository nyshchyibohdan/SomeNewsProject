import 'react-quill/dist/quill.snow.css';

import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';

import { Footer, Header } from '../../components/index';
import { isAuthenticated } from '../../utils/auth';

function NewArticle() {
    const quillReference = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        // getUser();
    }, []);

    const saveArticle = () => {
        if (quillReference.current) {
            const editor = quillReference.current.getEditor();
            const text = editor.getText();
            console.log(text);
        }
    };

    return (
        <div>
            <Header />
            <div className={'new-article-page-container'}>
                <ReactQuill ref={quillReference} />
                <button onClick={saveArticle}>Save Article</button>
                <h1>May the force be with you</h1>
            </div>
            <Footer />
        </div>
    );
}

export default NewArticle;
