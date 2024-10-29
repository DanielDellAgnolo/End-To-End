const dotenv = require('dotenv');
dotenv.config();

const PASSWORD = 'secret_sauce';
const INVALID_PASSWORD = 'invalid_password';

const STANDARD_USER = {
    login: 'standard_user',
    senha: PASSWORD
};

const LOCKED_OUT_USER = {
    login: 'locked_out_user',
    senha: PASSWORD
};

const PROBLEM_USER = {
    login: 'problem_user',
    senha: PASSWORD
};

const PERFORMANCE_GLITCH_USER = {
    login: 'performance_glitch_user',
    senha: PASSWORD
};

const ERROR_USER = {
    login: 'error_user',
    senha: PASSWORD
};

const VISUAL_USER = {
    login: 'visual_user',
    senha: PASSWORD
};

const INVALID_USER = {
    login: 'invalid_user',
    senha: INVALID_PASSWORD
};

const MENSAGE_USER_OR_PASSWORD_INVALID = 'Epic sadface: Username and password do not match any user in this service';

module.exports = {
    STANDARD_USER,
    LOCKED_OUT_USER,
    PROBLEM_USER,
    PERFORMANCE_GLITCH_USER,
    ERROR_USER,
    VISUAL_USER,
    INVALID_USER,
    MENSAGE_USER_OR_PASSWORD_INVALID
};
