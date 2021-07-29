class Auth {
    constructor() {
        this.authentication = false
    }

    signIn(cb) {
        this.authentication = true
        this.isAuth()
        setTimeout(cb, 200)
    }

    logOut(cb) {
        this.authentication = false
        this.isAuth()
        setTimeout(cb, 200)
    }

    isAuth() {
        if(localStorage.getItem('token') && localStorage.getItem('user')) return true
        return false
    }
}
export default new Auth()