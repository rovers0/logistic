import * as Yup from 'yup'

Yup.addMethod(Yup.number, 'greaterThan', function greaterThan(errorMessage, fieldName) {
    return this.test(`test-greater-than`, errorMessage, function (value) {
        const { path, createError, parent } = this
        return value === null || parent[fieldName] === undefined || value > parent[fieldName] || createError({ path, message: errorMessage })
    })
})

export const PUMP_DESTINATION_SCHEMA = Yup.object({
    // des_postcode: Yup.string().required(),
    // des_address : Yup.string().required(),
    // des_tel     : Yup.string().required(),
    des_clinic  : Yup.string().required(),
    des_doctor  : Yup.string().required(),
    des_title  : Yup.string().required(),
    // des_fax     : Yup.string().required(),
})

export const PATIENT_SCHEMA = Yup.object({
    patient_cd : Yup.string().required().min(7).max(13),
    patient_kj : Yup.string().required(),
    patient_kn : Yup.string().required(),
    patient_nm : Yup.string().required(),
    patient_sex: Yup.number().typeError('message').required(),
})

export const MACHINE_SCHEMA = Yup.object({
    pump_cd      : Yup.string().required(),
    pump_nm_full : Yup.string().required(),
    pump_nm_short: Yup.string().required(),
    expire_mons  : Yup.string().required(),
    expire_flag  : Yup.string().required(),
    exchange_long: Yup.string().required(),
    maker_code   : Yup.string().required(),
    maint_flag   : Yup.string().required(),
    rental_price : Yup.string().required(),
})

export const CONFIG_SCHEMA = Yup.object({
    DELIVERY_OF_MATERIALS_SCHEDULED_DAYS : Yup.number().typeError('message').transform((v, o) => o === '' ? null : v),
})

export const RENT_REGIS_SCHEMA = Yup.object({
    dcf_code  : Yup.string().required(),
    smd_code  : Yup.string().required(),
    // fac_name  : Yup.string().required(),
    // fac_tel   : Yup.string().required(),
    // fac_fax   : Yup.string().required(),
    des_code  : Yup.string().required(),
    // des_clinic: Yup.string().required(),
    des_doctor: Yup.string().required(),
})

// export const PUMP_DESTINATION_INSERT_SCHEMA = Yup.object({
//     des_postcode: Yup.string().required(),
//     field2: Yup.number().typeError('message').transform((v, o) => o === '' ? null : v).nullable().greaterThan('message', 'field1'),
// })

// how to use
// let invalid = await PUMP_DESTINATION_INSERT_SCHEMA.validate(data).then(() => {
//     return false;
// }).catch((reject) => {
    // show error
//     console.log(reject.errors);
//     return true;
// })
// if(invalid) {
//     return;
// }