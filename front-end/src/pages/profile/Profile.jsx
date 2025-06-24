import './Profile.css';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

import defaultProfilePic from '../../assets/imgs/logo.png';
import { Footer, Header } from '../../components';
import { useAuthContext } from '../../contexts/AuthContext';
import { useUserArticlesContext } from '../../contexts/UserArticlesContext';
import useUserLikesContext from '../../contexts/UserLikesContext';
import useUserRepostsContext from '../../contexts/UserRepostsContext';
import { useAuthentication } from '../../hooks/useAuthentication';
import { logout } from '../../utils/auth';

const styleModal = {
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: ' #121417',
    border: '2px solid #000',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

function Profile() {
    useAuthentication();

    const { user, loading, error, setError, setLoading, removeUser, setUser } = useAuthContext();
    const { removeArticles } = useUserArticlesContext();
    const { removeReposts } = useUserRepostsContext();
    const { removeLikes } = useUserLikesContext();

    const navigate = useNavigate();

    const [openPasswordChangeModal, setOpenPasswordChangeModal] = React.useState(false);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const passChangeModalToggle = () => setOpenPasswordChangeModal(!openPasswordChangeModal);

    const oldPasswordChange = (event) => setOldPassword(event.target.value);
    const newPasswordChange = (event) => setNewPassword(event.target.value);
    const confirmPasswordChange = (event) => setConfirmPassword(event.target.value);

    // Account delete modal
    const [openDeleteAccountModal, setOpenDeleteAccountModal] = React.useState(false);

    const [passwordToDeleteAccount, setPasswordToDeleteAccount] = useState('');
    const deleteAccountModalToggle = () => setOpenDeleteAccountModal(!openDeleteAccountModal);

    const passwordToDeleteAccountChange = (event) => setPasswordToDeleteAccount(event.target.value);

    // Bio change
    const [biography, setBiography] = useState('');
    const [bioInput, setBioInput] = useState(false);
    const bioFieldToggle = () => setBioInput(!bioInput);
    const bioChange = (event) => {
        setBiography(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    const logoutUser = () => {
        logout();
        removeUser();
        removeArticles();
        removeReposts();
        removeLikes();
        navigate('/login');
    };

    const changeProfilePic = (event) => {
        event.preventDefault();
        try {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = async () => {
                const base64String = reader.result;
                await axios.post('http://localhost:5000/api/users/upload-pic', {
                    userId: user.id,
                    profilePic: base64String,
                });
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
        const timer = setTimeout(() => {
            window.location.reload();
        }, 500);
        return () => clearTimeout(timer);
    };

    const changeBio = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/update-bio', {
                userId: user.id,
                bio: biography,
            });

            setUser((prev) => ({
                ...prev,
                bio: biography,
            }));

            setBioInput(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
        return () => clearTimeout(timer);
    };

    const changePassword = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("New password and confirmation password don't match");
            return;
        }
        if (newPassword.length < 8) {
            setError('Password length is less that 8 symbols');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/api/users/change-password',
                {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                },
                {
                    headers: {
                        auth: localStorage.getItem('token'),
                    },
                },
            );

            if (response.data.success) {
                setError('');
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                passChangeModalToggle();
            }
        } catch (error_) {
            if (error_.response) {
                setError(error_.response.data.message);
            } else {
                setError('Server error');
                console.error('Error:', error_.message);
            }
        }
    };

    const deleteAccount = async (event) => {
        event.preventDefault();

        if (passwordToDeleteAccount.length < 8) {
            setError('Password length is less that 8 symbols');
            return;
        }

        try {
            await axios
                .delete('http://localhost:5000/api/users/delete-account', {
                    headers: {
                        auth: localStorage.getItem('token'),
                    },
                    data: {
                        password: passwordToDeleteAccount,
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        logoutUser();
                    }
                });
        } catch (error_) {
            if (error_.response) {
                setError(error_.response.data.message);
            } else {
                setError('Server error');
                console.error('Error:', error_.message);
            }
        }
    };

    if (loading)
        return <BounceLoader className="loader" color="#ffffff" speedMultiplier={1} data-testid="profile-loader" />;

    if (!user) {
        return <div>Error fetching user data</div>;
    }

    return (
        <div>
            <Header />
            <div className="profile-container" data-testid="profile-container">
                <div className={'main-profile-info'}>
                    <div className={'profile-image-block'}>
                        <img className={'profile-image'} src={user.profilePic || defaultProfilePic} alt="Profile" />
                        <div className={'profile-image-input-container'}>
                            <label className={'profile-image-input-label'}>
                                <input
                                    className={'profile-image-input'}
                                    type="file"
                                    onChange={changeProfilePic}
                                    accept="image/*"
                                />
                                Update profile picture
                            </label>
                        </div>
                    </div>

                    <div className={'profile-nickname-buttons'} data-testid="nickname-btns">
                        <h1 className={'profile-nickname'}>{user.nickname}</h1>
                        <div className={'profile-buttons'}>
                            <Link to="/user-reposts" className={'button link-to-page'}>
                                Reposts
                            </Link>
                            <Link to="/user-likes" className={'button link-to-page'}>
                                Likes
                            </Link>
                            <Link
                                to="/user-articles"
                                className={'button link-to-page link-to-user-articles'}
                                data-testid="articles-link"
                            >
                                Articles
                            </Link>
                        </div>
                    </div>
                </div>
                <hr className={'horizontal-rule'}></hr>
                <div className={'profile-bio'}>
                    <div className={'bio-main-parts'} data-testid="bio-main">
                        <h1 className={'bio-title'}>Biography</h1>
                        <button
                            className={`button bio-edit-button ${bioInput ? 'bio-edit-button-active' : ''}`}
                            onClick={bioFieldToggle}
                            data-testid="edit-bio-button"
                        >
                            {bioInput ? 'Cancel' : 'Edit Bio'}
                        </button>
                    </div>
                    {bioInput ? (
                        <div className={'bio-input'} data-testid="bio-input-container">
                            <textarea
                                className={'bio-input-field'}
                                value={biography}
                                onChange={bioChange}
                                rows={2}
                                data-testid="bio-input"
                            />
                            <button className={'button save-bio-button'} onClick={changeBio}>
                                Save
                            </button>
                        </div>
                    ) : (
                        <p className={'bio-input-text'} data-testid="bio-desc">
                            {user.bio}
                        </p>
                    )}
                </div>
                <div className={'account-activities'} data-testid="acc-activities">
                    <div className={'activities-title-block'}>
                        <h1 className={'activities-title'}>Account activities</h1>
                        <hr className={'horizontal-rule activities-title-rule'}></hr>
                    </div>
                    <button className={'button profile-logout-button'} onClick={logoutUser}>
                        Logout
                    </button>
                    <div className={'activity-block change-password-block'} data-testid="change-pass">
                        <h3 className={'activity-title'}>Change password</h3>
                        <hr className={'horizontal-rule activities-rule'}></hr>
                        <p className={'activity-desc'}>Change your account password. Old password required</p>
                        <hr className={'horizontal-rule activities-rule'}></hr>
                        <button
                            className={'button change-password-button'}
                            onClick={() => {
                                passChangeModalToggle();
                            }}
                        >
                            Change
                        </button>
                    </div>
                    <hr className={'horizontal-rule'}></hr>
                    <div className={'activity-block delete-account-block'} data-testid="delete-block">
                        <h3 className={'activity-title delete-acc-title'}>Delete account</h3>
                        <hr className={'horizontal-rule activities-rule'}></hr>
                        <p className={'activity-desc delete-acc-desc'}>Delete your account. Password required</p>
                        <hr className={'horizontal-rule activities-rule'}></hr>
                        <button
                            className={'button delete-account-button'}
                            onClick={() => {
                                deleteAccountModalToggle();
                            }}
                            data-testid="delete-acc-btn"
                        >
                            Delete
                        </button>
                    </div>
                </div>
                {/* Password change modal */}
                <Modal
                    open={openPasswordChangeModal}
                    onClose={passChangeModalToggle}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    data-testid="change-pass-modal"
                >
                    <Box sx={styleModal}>
                        <form
                            onSubmit={changePassword}
                            className={'password-change-form'}
                            data-testid="change-pass-form"
                        >
                            <div className={'password-field old-password-field'}>
                                <label htmlFor="oldPassword" className={'password-label old-password-label'}>
                                    Old Password:
                                </label>
                                <input
                                    className="input password-input"
                                    type="password"
                                    id="oldPassword"
                                    value={oldPassword}
                                    onChange={oldPasswordChange}
                                    required
                                />
                            </div>
                            <div className={'password-field new-password-field'}>
                                <label htmlFor="newPassword" className={'password-label new-password-label'}>
                                    New Password:
                                </label>
                                <input
                                    className={'input password-input'}
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={newPasswordChange}
                                    required
                                />
                            </div>
                            <div className={'password-field confirm-password-field'}>
                                <label htmlFor="confirmPassword" className={'password-label confirm-password-label'}>
                                    Confirm New Password:
                                </label>
                                <input
                                    className={'input password-input'}
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={confirmPasswordChange}
                                    required
                                />
                            </div>
                            {error && (
                                <p
                                    style={{ color: 'red' }}
                                    className={'modal-error-stack'}
                                    data-testid="change-pass-error"
                                >
                                    {error}
                                </p>
                            )}
                            <div className={'form-buttons-container'}>
                                <button
                                    onClick={passChangeModalToggle}
                                    className={'button cancel-pass-change-button'}
                                    data-testid="change-pass-cancel-btn"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={'button submit-pass-change-button'}
                                    data-testid="change-pass-sub-btn"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </Box>
                </Modal>

                {/* Delete account modal */}
                <Modal
                    open={openDeleteAccountModal}
                    onClose={deleteAccountModalToggle}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    data-testid="delete-acc-modal"
                >
                    <Box sx={styleModal}>
                        <form onSubmit={deleteAccount} className={'delete-account-form'}>
                            <div className={'password-field old-password-field'}>
                                <label htmlFor="confirm-pass-to-delete" className={'password-label old-password-label'}>
                                    Confirm password to delete account
                                </label>
                                <input
                                    className="input password-input"
                                    type="password"
                                    id="confirm-pass-to-delete"
                                    value={passwordToDeleteAccount}
                                    onChange={passwordToDeleteAccountChange}
                                    required
                                    data-testid="delete-old-pass"
                                />
                            </div>
                            {error && (
                                <p
                                    style={{ color: 'red' }}
                                    className={'modal-error-stack'}
                                    data-testid="delete-acc-err"
                                >
                                    {error}
                                </p>
                            )}
                            <div className={'form-buttons-container'}>
                                <button
                                    onClick={deleteAccountModalToggle}
                                    className={'button cancel-account-delete-button'}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={'button submit-account-delete-button'}
                                    name="delete-btn"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </Box>
                </Modal>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;
