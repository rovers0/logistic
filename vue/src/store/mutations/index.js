export default {
    getSetCookieToken: (state) => {
        //get cookie sso token
        let cookie_name = localStorage.getItem('COOKIE_NAME') ? localStorage.getItem('COOKIE_NAME') : 'sso_token'

        let name = cookie_name + '='
        let decodedCookie = decodeURIComponent(document.cookie)
        let ca = decodedCookie.split(';')
        let i = 0
        for (i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) == ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(name) == 0) {
                var token = c.substring(name.length, c.length)
                sessionStorage.setItem('TOKEN', token)
                state.user.token = token
            }
        }
    },
    setCookie: (state, data) => {
        localStorage.setItem('COOKIE_NAME', 'sso_token')
        localStorage.setItem('COOKIE_DOMAIN', data.sso_domain)
        var cookieName = localStorage.getItem('COOKIE_NAME')
        var cookieValue = data.token
        var cookieDomain = localStorage.getItem('COOKIE_DOMAIN')
        var myDate = new Date()
        myDate.setDate(myDate.getDate() + 1) // add 1 day expire
        document.cookie = cookieName + '=' + cookieValue + ';expires=' + myDate + ';domain=' + cookieDomain + ';path=/'
    },
    logout: (state) => {
        state.user.token = null
        state.user.data = {}

        sessionStorage.removeItem('TOKEN')
        sessionStorage.removeItem('USER')
    },
    setUser: (state, user) => {
        sessionStorage.setItem('USER', JSON.stringify(user))
        state.user.data = sessionStorage.getItem('USER')
    },
    setToken: (state, token) => {
        state.user.token = token
        sessionStorage.setItem('TOKEN', token)
    },
    setLoading: (state, value) => {
        state.loading = value
    },
    initErrorModal: (state) => {
        state.errorModal = {
            active: false,
            title: '',
            message: '',
            type: 3
        }
    },
    showErrorModal: (state, value) => {
        state.errorModal.title = 'Error'
        state.errorModal.message = value
        state.errorModal.active = true
    },
}
