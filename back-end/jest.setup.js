const {
    loginUser,
    registerUser,
    deleteUser,
} = require("./__tests__/testUtils/utils.helper");

global.loginUser = loginUser;

global.registerUser = registerUser;

global.deleteUser = deleteUser;
