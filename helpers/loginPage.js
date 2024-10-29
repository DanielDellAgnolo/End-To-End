class Login {
    constructor(page) {
        this.page = page;
    }

    async login(usuario) {
        await this.page.locator('#user-name').fill(usuario.login);
        await this.page.locator('#password').fill(usuario.senha);
        await this.page.locator('#login-button').click();
    }
}

module.exports = Login;