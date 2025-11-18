import { createFileRoute } from '@tanstack/react-router'
import { beforeLoadPage } from '../utils/utils'
import Loader from '../components/Loader/Loader';
import { useAppSelector } from '../hooks/reduxHooks';
import defaultProfilePic from '../assets/imgs/logo.png';

export const Route = createFileRoute('/profile')({
  beforeLoad: () => beforeLoadPage(),
  component: Profile,
  pendingComponent: Loader
})

function Profile() {
  const user = useAppSelector(state => state.user);

  return (
    <div>
      <div className="profile-container" data-testid="profile-container">
        <div className={'main-profile-info'}>
          <div className={'profile-image-block'}>
            <img className={'profile-image'} src={user.profilePic || defaultProfilePic} alt="Profile" />
            <div className={'profile-image-input-container'}>
              {/* <label className={'profile-image-input-label'}>
                            <input
                                className={'profile-image-input'}
                                type="file"
                                onChange={changeProfilePic}
                                accept="image/*"
                            />
                            Update profile picture
                        </label> */}
            </div>
          </div>

          <div className={'profile-nickname-buttons'} data-testid="nickname-btns">
            <h1 className={'profile-nickname'}>{user.nickname}</h1>
            <div className={'profile-buttons'}>
              {/* <Link to="/user-reposts" className={'button link-to-page'}>
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
                        </Link> */}
            </div>
          </div>
        </div>
        <hr className={'horizontal-rule'}></hr>
        {/* <div className={'profile-bio'}>
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
            </div> */}
        <div className={'account-activities'} data-testid="acc-activities">
          <div className={'activities-title-block'}>
            <h1 className={'activities-title'}>Account activities</h1>
            <hr className={'horizontal-rule activities-title-rule'}></hr>
          </div>
          <button className={'button profile-logout-button'}>
            Logout
          </button>
          <div className={'activity-block change-password-block'} data-testid="change-pass">
            <h3 className={'activity-title'}>Change password</h3>
            <hr className={'horizontal-rule activities-rule'}></hr>
            <p className={'activity-desc'}>Change your account password. Old password required</p>
            <hr className={'horizontal-rule activities-rule'}></hr>
            {/* <button
              className={'button change-password-button'}
              onClick={() => {
                passChangeModalToggle();
              }}
            >
              Change
            </button> */}
          </div>
          <hr className={'horizontal-rule'}></hr>
          <div className={'activity-block delete-account-block'} data-testid="delete-block">
            <h3 className={'activity-title delete-acc-title'}>Delete account</h3>
            <hr className={'horizontal-rule activities-rule'}></hr>
            <p className={'activity-desc delete-acc-desc'}>Delete your account. Password required</p>
            <hr className={'horizontal-rule activities-rule'}></hr>
            {/* <button
              className={'button delete-account-button'}
              onClick={() => {
                deleteAccountModalToggle();
              }}
              data-testid="delete-acc-btn"
            >
              Delete
            </button> */}
          </div>
        </div>
        {/* Password change modal */}
        {/* <Modal
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
        {/* <Modal
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
        </Modal> */}
      </div>
    </div>
  );
}
