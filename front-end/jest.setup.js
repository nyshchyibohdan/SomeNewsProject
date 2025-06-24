import { loginUser, registerAccount, renderReusable, setupAuthedUser } from './__tests__/utils/utils.helper';

window.scrollTo = jest.fn();

global.renderReusable = renderReusable;

global.registerAccount = registerAccount;

global.loginUser = loginUser;

global.setupAuthedUser = setupAuthedUser;
