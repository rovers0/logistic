import moment from 'moment';
import { SIMILAR } from "@/components/Constants.vue";
const digitsRE = /(\d{3})(?=\d)/g

export function number(value, currency, decimals) {
    value = parseFloat(value)
    if (!isFinite(value) || (!value && value !== 0)) return ''
    currency = currency != null ? currency : ''
    decimals = decimals != null ? decimals : 0
    var stringified = Math.abs(value).toFixed(decimals)
    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
    var i = _int.length % 3
    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : ''
    var _float = decimals ? stringified.slice(-1 - decimals) : ''
    var sign = value < 0 ? '-' : ''
    return sign + currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float
}

export function onlyNumber(value) {
    return value = value.replace(/[^0-9]/g, "");
}

export function typeText(arr, value, key_text=null, value_text=null) {
    let result = ''
    key_text = (key_text == null) ? 'id' : key_text
    value_text = (value_text == null) ? 'value' : value_text
    arr.forEach(element => {
        if(element[key_text] == value) {
            result = element[value_text]
            return
        }
    })
    return result
}

export function monthToDate(data, to=false, format="YYYY-MM-DD") {
    if(!data) return null
    if (to) return moment(data).endOf('month').format(format)
    return moment(data).startOf('month').format(format)
}

export function dateToMonth(string) {
    if(typeof string === 'object') return string
    if(!string) {
        return null
    }
    let date = new Date(string);
    return { year: date.getFullYear(), month: date.getMonth() }
}

export function timeToTimeStr(data) {
    if(!data) return null
    if(typeof data !== 'object') return data
    return data.hours+':'+data.minutes+':'+data.seconds
}

export function timeStrToTime(string) {
    if(typeof string === 'object') return string
    if(!string) {
        return null
    }
    let date = new Date('01/01/1970 '+string);
    return { hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds() }
}

export function timeToString(object, format='YYYY-MM-DD') {
    if(!object || typeof object !== 'object') return object
    return moment(object).format(format)
}

export function displayDate(date, replace='-', format='YYYY/MM/DD') {
    moment.updateLocale('en', {
        weekdaysShort: '日_月_火_水_木_金_土'.split('_')
    })
    if(!date) return replace
    if(typeof date !== 'object') date = new Date(date)
    const result = moment(date).format(format)
    return result === 'Invalid date' ? replace : result
}

export function formatPatientHistory(patient) {
    const columns = ['medical_record', 'patient_nm', 'pump_code', 'smd_code', 'fac_name', 'des_clinic', 'des_doctor'];
    let hist = {};
    columns.forEach((item) => {
        hist[item] = '';
    })
    patient.histories = patient.histories.map((history, index) => {
        if(index == 0) {
            columns.forEach((item) => {
                history[item+'_text'] = history[item];
                hist[item] = history[item];
            })
            return history;
        }
        columns.forEach((item) => {
            if(history[item] == hist[item]) {
                history[item+'_text'] = SIMILAR;
            } else {
                history[item+'_text'] = history[item];
                hist[item] = history[item];
            }
        })
        return history;
    })
    return patient;
}

export function mapPayload(object_1, object_2) {
    for (const key in {...object_1}) {
        if(Object.hasOwn(object_2, key)) {
            object_1[key] = object_2[key]
        }
    }
    return object_1
}

export function textNull(object) {
    for (const key in {...object}) {
        if(object[key] === "") {
            object[key] =  null
        }
    }
    return object
}

export function formatBeforeRequest(object) {
    for (const key in {...object}) {
        if(typeof object[key] === 'object' && typeof object[key]?.['getFullYear'] === 'function') {
            object[key] = timeToString(object[key])
        }
        if(typeof object[key] === 'object' && (object[key]?.['month'] || object[key]?.['month'] == 0) && object[key]?.['year']) {
            object[key] = monthToDate(object[key])
        }
        if(typeof object[key] === 'object' && (object[key]?.['hours'] || object[key]?.['hours'] == 0) && (object[key]?.['minutes'] || object[key]?.['minutes'] == 0)) {
            object[key] = timeToTimeStr(object[key])
        }
    }
    return object
}

export function deepClone(object) {
    return JSON.parse(JSON.stringify(object))
}