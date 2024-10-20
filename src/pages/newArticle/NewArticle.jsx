import 'react-quill/dist/quill.snow.css';
import './NewArticle.css';

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { Link, useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

import defaultProfilePic from '../../assets/imgs/logo.png';
import { Footer, Header } from '../../components/index';
import { isAuthenticated } from '../../utils/auth';
import { getUser } from '../../utils/userService';

const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    ['bold', 'italic', 'underline'],
    ['blockquote', 'code-block'],
    ['link', 'image'],

    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],

    [{ align: [] }],

    ['clean'],
];

const quill = {
    toolbar: toolbarOptions,
};

function NewArticle() {
    const [user, setUser] = useState(null);
    const [articleTitle, setArticleTitle] = useState('');
    const [articleDescription, setArticleDescription] = useState('');
    const [articleMainImage, setArticleMainImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [articleContent, setArticleContent] = useState('');
    const [error, setError] = useState('');
    const quillReference = useRef(null);

    const changeArticleTitle = (event) => setArticleTitle(event.target.value);
    const changeArticleMainImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            setArticleMainImage(file);
        } else {
            setArticleMainImage(null);
        }
    };
    const changeArticleDescription = (event) => {
        setArticleDescription(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUser();
                setUser(userData);
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated()) {
            fetchUserData();
        } else {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        getUser();
    }, []);

    const saveArticle = async (event) => {
        event.preventDefault();

        if (articleTitle.length < 5) {
            setError('Article length should be more than 5');
            return;
        }
        if (articleTitle.length > 100) {
            setError('Article title should be less than 100');
            return;
        }
        if (articleDescription.length > 200) {
            setError('Article description should be less than 200');
            return;
        }

        if (articleDescription.length < 10) {
            setError('Article description should be more that 10');
            return;
        }

        const mainImage = articleMainImage === null ? defaultProfilePic : articleMainImage;

        try {
            const getBase64 = (file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.addEventListener('loadend', () => resolve(reader.result));
                    reader.addEventListener('error', () => reject(new Error('File reading error occurred')));

                    reader.readAsDataURL(file);
                });
            };

            let base64String = '';

            if (mainImage) {
                base64String = await getBase64(mainImage);
            }

            const response = await axios.post('http://localhost:5000/api/articles/save-article', {
                title: articleTitle,
                description: articleDescription,
                mainPicture: base64String,
                content: articleContent,
                author: user.id,
            });

            if (response.data.success) {
                setError('');
                navigate('/user-articles');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'An error occurred while saving the article');
            } else {
                setError(error.message || 'An unexpected error occurred');
            }
        }
    };

    if (loading) return <BounceLoader className="loader" color="#ffffff" speedMultiplier={1} />;

    return (
        <div>
            <Header />
            <div className={'new-article-page-container'}>
                <div className={'new-article-title-container'}>
                    <label className={'new-article-title-label'}>Article title</label>
                    <input className={'new-article-title-input'} type="text" onChange={changeArticleTitle} />
                </div>
                <div className={'new-article-desc-container'}>
                    <label className={'new-article-desc-label'}>Article description</label>
                    <textarea
                        className={'article-desc-input-field'}
                        value={articleDescription}
                        onChange={changeArticleDescription}
                        rows={2}
                    />
                </div>
                <div className={'new-article-main-image-container'}>
                    <label className={'new-article-main-image-label'}>
                        <input
                            required={true}
                            className={'new-article-main-image'}
                            type="file"
                            onChange={changeArticleMainImage}
                            accept="image/*"
                        />
                        Set article&apos;s main picture (optional)
                    </label>
                </div>
                <ReactQuill modules={quill} value={articleContent} onChange={setArticleContent} ref={quillReference} />
                <div className={'create-article-buttons'}>
                    <Link className={'cancel-link'} to="/profile">
                        Cancel
                    </Link>
                    <button onClick={saveArticle} className={'button create-article-button'}>
                        Create Article
                    </button>
                </div>

                <div className="new-article-error-stack">{error && <p className="error">{error}</p>}</div>
            </div>
            <Footer />
        </div>
    );
}

export default NewArticle;
