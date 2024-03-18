import jp from '@/lang/jp.json'

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
        state.user.factor = null
        state.user.data = {}

        //clear cookie
        var cookieName = localStorage.getItem('COOKIE_NAME')
        var cookieDomain = localStorage.getItem('COOKIE_DOMAIN')
        document.cookie = cookieName + '=' + ';path=/;domain=' + cookieDomain + ';Expires=Thu, 01 Jan 1970 00:00:01 GMT'

        sessionStorage.removeItem('TOKEN')
        sessionStorage.removeItem('USER')
    },
    setFactor: (state, factor) => {
        state.user.factor = factor
        sessionStorage.setItem('FACTOR', factor)
    },
    setUser: (state, user) => {
        sessionStorage.setItem('USER', JSON.stringify(user))
        state.user.data = sessionStorage.getItem('USER')
    },
    setToken: (state, token) => {
        state.user.token = token
        sessionStorage.setItem('TOKEN', token)
    },
    initTransit: (state) => {
        state.transit = {
            status: false,
            class: '',
            type: 0,
            reloadParent: false
        }
    },
    setIsOpenTransitDetail: (state, data = {status: false, type: 1}) => {
        state.transit.type = data.type ?? 1
        if (data.status) {
            state.transit.status = data.status ?? false
            setTimeout(() => {
                state.transit.class = 'show'
            }, 100)
        } else {
            state.transit.class = ''
            setTimeout(() => {
                state.transit.status = data.status ?? false
            }, 300)
        }
    },
    setTransitReloadParent: (state, boolean) => {
        state.transit.reloadParent = boolean
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
        state.errorModal.title = jp.error_title
        state.errorModal.message = value
        state.errorModal.active = true
    },
    downloadByURL: (state, value) => {
        const link = document.createElement('a')
        link.href = value
        link.click()
        link.remove()
    },
    setDeleteButton: (state, value) => {
        state.isDeleteButton = value
    },
    setFromFeature: (state, value) => {
        state.fromFeature = value
    }
}
