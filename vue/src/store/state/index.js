export default {
    user: {
        token: sessionStorage.getItem('TOKEN'),
        factor: sessionStorage.getItem('FACTOR'),
        data: sessionStorage.getItem('USER'),
    },
    transit: {
        status: false,
        class: '',
        type: 0,
        reloadParent: false
    },
    loading: false,
    errorModal: {
        active: false,
        title: '',
        message: '',
        type: 3
    },
    pump_code: 'A',
    isDeleteButton: false,
    fromFeature: false,
}
