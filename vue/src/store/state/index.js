export default {
    user: {
        token: sessionStorage.getItem('TOKEN'),
        data: sessionStorage.getItem('USER'),
    },
    loading: false,
    errorModal: {
        active: false,
        title: '',
        message: '',
        type: 3
    },
}
