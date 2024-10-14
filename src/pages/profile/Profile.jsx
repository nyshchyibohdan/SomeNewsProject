import './Profile.css';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

import defaultProfilePic from '../../assets/imgs/logo.png';
import { Footer, Header } from '../../components';
import { isAuthenticated, logout } from '../../utils/auth';

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
    const [user, setUser] = useState({
        nickname: '',
        email: '',
        bio: '',
        profilePic: '',
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    // Password change modal
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

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        getUser();
    }, []);

    const logoutUser = () => {
        logout();
        navigate('/login');
    };

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/profile', {
                headers: {
                    auth: localStorage.getItem('token'),
                },
            });
            setUser(response.data.user);
            setBiography(response.data.user.bio);
            setLoading(false);
        } catch (error) {
            console.error('Error getting user', error);
            setLoading(false);
        }
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
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
        setBioInput(false);
        const timer = setTimeout(() => {
            window.location.reload();
        }, 500);
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
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users/change-password', {
                oldPassword: oldPassword,
                newPassword: newPassword,
            }, {
                headers: {
                    auth: localStorage.getItem('token'),
                },
            });

            if (response.data.success) {
                setError('');
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                passChangeModalToggle()
            } else {
                setError('Error changing password');
            }
        } catch (error_) {
            console.error(error_);
            setError('Server error while changing password');
        }
    };

    const deleteAccount = async (event) => {
        event.preventDefault();

        if (passwordToDeleteAccount.length < 8) {
            setError('Password length is less that 8 symbols');
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
                    } else {
                        setError('Error deleting account');
                    }
                });
        } catch (error_) {
            console.error(error_);
            setError('Server error while deleting account');
        }
    };

    if (loading) return <BounceLoader className="loader" color="#ffffff" speedMultiplier={1} />;

    if (!user) {
        return <div>Error fetching user data</div>;
    }

    return (
        <div>
            <Header />
            <div className="profile-container">
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

                    <div className={'profile-nickname-buttons'}>
                        <h1 className={'profile-nickname'}>{user.nickname}</h1>
                        <div className={'profile-buttons'}>
                            <button className={'button reposts-button'}>Reposts</button>
                            <button className={'button likes-button'}>Likes</button>
                            <button className={'button articles-button'}>Articles</button>
                        </div>
                    </div>
                </div>
                <hr className={'horizontal-rule'}></hr>
                <div className={'profile-bio'}>
                    <div className={'bio-main-parts'}>
                        <h1 className={'bio-title'}>Biography</h1>
                        <button
                            className={`button bio-edit-button ${bioInput ? 'bio-edit-button-active' : ''}`}
                            onClick={bioFieldToggle}
                        >
                            {bioInput ? 'Cancel' : 'Edit Bio'}
                        </button>
                    </div>
                    {bioInput ? (
                        <div className={'bio-input'}>
                            <textarea className={'bio-input-field'} value={biography} onChange={bioChange} rows={2} />
                            <button className={'button save-bio-button'} onClick={changeBio}>
                                Save
                            </button>
                        </div>
                    ) : (
                        <p className={'bio-input-text'}>{user.bio}</p>
                    )}
                </div>
                <div className={'account-activities'}>
                    <div className={'activities-title-block'}>
                        <h1 className={'activities-title'}>Account activities</h1>
                        <hr className={'horizontal-rule activities-title-rule'}></hr>
                    </div>
                    <button className={'button profile-logout-button'} onClick={logoutUser}>
                        Logout
                    </button>
                    <div className={'activity-block change-password-block'}>
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
                    <div className={'activity-block delete-account-block'}>
                        <h3 className={'activity-title delete-acc-title'}>Delete account</h3>
                        <hr className={'horizontal-rule activities-rule'}></hr>
                        <p className={'activity-desc delete-acc-desc'}>Delete your account. Password required</p>
                        <hr className={'horizontal-rule activities-rule'}></hr>
                        <button
                            className={'button delete-account-button'}
                            onClick={() => {
                                deleteAccountModalToggle();
                            }}
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
                >
                    <Box sx={styleModal}>
                        <form onSubmit={changePassword} className={'password-change-form'}>
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
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div className={'form-buttons-container'}>
                                <button onClick={passChangeModalToggle} className={'button cancel-pass-change-button'}>
                                    Cancel
                                </button>
                                <button type="submit" className={'button submit-pass-change-button'}>
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
                >
                    <Box sx={styleModal}>
                        <form onSubmit={deleteAccount} className={'password-change-form'}>
                            <div className={'password-field old-password-field'}>
                                <label htmlFor="oldPassword" className={'password-label old-password-label'}>
                                    Confirm password to delete account
                                </label>
                                <input
                                    className="input password-input"
                                    type="password"
                                    id="oldPassword"
                                    value={passwordToDeleteAccount}
                                    onChange={passwordToDeleteAccountChange}
                                    required
                                />
                            </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div className={'form-buttons-container'}>
                                <button
                                    onClick={deleteAccountModalToggle}
                                    className={'button cancel-pass-change-button'}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className={'button submit-pass-change-button'}>
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
