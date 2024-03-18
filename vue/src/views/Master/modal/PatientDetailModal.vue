<template>
    <ModalLayout :show="show" title="患者マスタと使用ポンプ使用履歴" maxWidth="max-w-7xl" :class="'px-0'" @close="onClose()">
        <div class="gap-5 px-3 py-2 d-flex">
            <div class="flex-1 gap-3 d-flex">
                <div class="d-flex align-items-center basis-[22%]">
                    <label class="label-text w-[6rem]">患者コード</label>
                    <input type="text" class="flex-1 text-center form-control" :value="patient_info.patient_cd" disabled>
                </div>
                <div class="d-flex align-items-center basis-[24%]">
                    <label class="label-text w-[6rem]">患者名(漢字)</label>
                    <input type="text" class="flex-1 text-center form-control" v-model="patient_info.patient_kj" maxlength="40">
                </div>
                <div class="d-flex align-items-center basis-[22%]">
                    <label class="label-text w-[6rem]">患者名(カナ)</label>
                    <input type="text" class="flex-1 text-center form-control" v-model="patient_info.patient_kn" maxlength="40">
                </div>
                <div class="d-flex align-items-center basis-[16%]">
                    <label class="label-text w-[3rem]">性別</label>
                    <select class="flex-1 form-select" v-model="patient_info.patient_sex">
                        <template v-if="master.sex">
                            <option v-for="item in master.sex.filter(item => item.id != SEX_UNSET)" :value="item.id">{{ item.value }}</option>
                        </template>
                    </select>
                </div>
                <div class="d-flex align-items-center basis-[16%]">
                    <label class="label-text w-[3rem]">略名</label>
                    <input type="text" class="flex-1 text-center form-control" v-model="patient_info.patient_nm" maxlength="20">
                </div>
            </div>

            <button class="btn default w-[5rem]" @click="savePatient()" :disabled="!patient_valid">保存</button>
        </div>

        <div class="divider"></div>

        <div class="px-3 py-2 d-grid input-gap">
            <!-- row 1 -->
            <div class="gap-3 d-flex">
                <div class="d-flex align-items-center" style="flex-basis: 25%;">
                    <label class="label-text w-[8rem]">患者コード</label>
                    <input type="text" class="flex-1 text-center form-control" :value="history_info.patient_cd" disabled>
                    <input type="text" class="form-control text-center w-[3rem] ms-1" :value="history_info.hist_no" disabled>
                </div>
                <div class="d-flex align-items-center" style="flex-basis: 21.5%;">
                    <label class="label-text w-[6rem]">状態</label>
                    <input type="text" class="flex-1 text-center form-control" :value="history_info.status_text" disabled>
                </div>
                <div class="d-flex align-items-center" style="flex-basis: 51%;">
                    <label class="label-text w-[6rem]">施設名</label>
                    <input type="text" class="flex-1 form-control" v-model="history_info.fac_name" maxlength="50">
                </div>
            </div>

            <!-- row 2 -->
            <div class="gap-3 d-flex">
                <!-- left -->
                <div class="d-grid input-gap basis-[75%]">
                    <div class="gap-3 d-flex">
                        <div class="d-flex align-items-center basis-[35%]">
                            <label class="label-text w-[8rem]">患者名(漢字)</label>
                            <input type="text" class="flex-1 text-center form-control" v-model="history_info.patient_kj" maxlength="40">
                        </div>
                        <div class="d-flex align-items-center basis-[30%]">
                            <label class="label-text w-[6rem]">性別</label>
                            <select class="flex-1 form-select" v-model="history_info.patient_sex">
                                <template v-if="master.sex">
                                    <option v-for="item in master.sex.filter(item => item.id != SEX_UNSET)" :value="item.id">{{ item.value }}</option>
                                </template>
                            </select>
                        </div>
                        <div class="d-flex align-items-center basis-[35%]">
                            <label class="label-text w-[6rem]">診療科名</label>
                            <input type="text" class="flex-1 form-control" v-model="history_info.des_clinic" maxlength="20">
                        </div>
                    </div>

                    <div class="gap-3 d-flex">
                        <div class="d-flex align-items-center basis-[35%]">
                            <label class="label-text w-[8rem]">患者名(カナ)</label>
                            <input type="text" class="flex-1 text-center form-control" v-model="history_info.patient_kn" maxlength="40">
                        </div>
                        <div class="d-flex align-items-center basis-[30%]">
                            <label class="label-text w-[6rem]">シリアルNo.</label>
                            <input type="text" class="flex-1 text-center form-control" v-model="history_info.serial_no" maxlength="20">
                        </div>
                        <div class="d-flex align-items-center basis-[35%]">
                            <label class="label-text w-[6rem]">カルテNo.</label>
                            <input type="text" class="flex-1 form-control" v-model="history_info.medical_record" maxlength="50">
                        </div>
                    </div>

                    <div class="gap-3 d-flex">
                        <div class="d-flex align-items-center basis-[35%]">
                            <label class="label-text w-[8rem]">請求開始年月</label>
                            <Datepicker month-picker format="yyyy年MM月" class="flex-1" v-model="history_info.invoice_start"></Datepicker>
                        </div>
                        <div class="d-flex align-items-center basis-[37%]">
                            <label class="label-text w-[6rem]">状態情報</label>
                            <input type="text" class="flex-1 text-center form-control" placeholder="ステータス①" v-model="history_info.status_str1" maxlength="20">
                        </div>
                        <div class="basis-[28%]">
                            <input type="text" class="flex-1 text-center form-control" placeholder="ステータス②" v-model="history_info.status_str2" maxlength="20">
                        </div>
                    </div>

                    <div class="gap-3 d-flex">
                        <div class="d-flex align-items-center basis-[35%]">
                            <label class="label-text w-[8rem]">請求停止年月</label>
                            <Datepicker month-picker format="yyyy年MM月" class="flex-1" v-model="history_info.invoice_finish"></Datepicker>
                        </div>
                        <div class="d-flex align-items-center basis-[30%]">
                            <label class="label-text w-[6rem]">入力者</label>
                            <select class="flex-1 form-select" v-model="history_info.staff_pdfchk">
                                <option v-for="user in master.users" :value="user.userid">{{ user.username }}</option>
                            </select>
                        </div>
                        <div class="d-flex align-items-center basis-[35%]">
                            <label class="label-text w-[6rem]">確認者</label>
                            <select class="flex-1 form-select" v-model="history_info.staff_wcheck">
                                <option v-for="user in master.users" :value="user.userid">{{ user.username }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="gap-2 d-flex">
                        <div class="d-flex flex-column input-gap basis-[50%]">
                            <div class="d-flex justify-content-between align-items-center">
                                <label class="label-text">作業メモ欄（アッヴィ社施設情報の連携）</label>
                                <button class="btn default w-[9rem]" @click="copyFacName()" :disabled="disable_copy_fac">テキスト複製</button>
                            </div>
                            <textarea class="form-control" v-model="history_info.maker_fac_name" style="min-height: 6rem;" maxlength="500"></textarea>
                        </div>
                        <div class="d-flex flex-column input-gap basis-[50%]">
                            <div class="d-flex justify-content-between align-items-center">
                                <label class="label-text">作業メモ欄（アッヴィ社備考の連携）</label>
                                <button class="btn default w-[9rem]" @click="copyRemark()" :disabled="disable_copy">テキスト複製</button>
                            </div>
                            <textarea class="form-control" v-model="history_info.maker_remarks" style="min-height: 6rem;" maxlength="500"></textarea>
                        </div>
                    </div>
                </div>

                <!-- right -->
                <div class="d-grid input-gap basis-[25%]" style="height: fit-content;">
                    <div class="d-flex align-items-center">
                        <label class="label-text w-[6rem]">医師名</label>
                        <input type="text" class="flex-1 text-center form-control" v-model="history_info.des_doctor">
                    </div>
                    <div class="d-flex align-items-center">
                        <label class="label-text w-[9rem]">アッヴィ使用開始</label>
                        <Datepicker class="flex-1" v-model="history_info.dateof_start"></Datepicker>
                    </div>
                    <div class="d-flex align-items-center">
                        <label class="label-text w-[9rem]">メーカ情報登録日</label>
                        <Datepicker class="flex-1" v-model="history_info.maker_ofdate"></Datepicker>
                    </div>
                    <div class="d-flex align-items-center">
                        <label class="label-text w-[9rem]">到着(転院)日</label>
                        <Datepicker class="flex-1" v-model="history_info.dateof_into"></Datepicker>
                    </div>
                    <div class="d-flex align-items-center">
                        <label class="label-text w-[9rem]">同意書著名日</label>
                        <Datepicker class="flex-1" v-model="history_info.dateof_signed"></Datepicker>
                    </div>
                    <div class="d-flex align-items-center">
                        <label class="label-text w-[9rem]">同意書開始日</label>
                        <Datepicker class="flex-1" v-model="history_info.dateof_agree"></Datepicker>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-3 mb-1 d-flex align-items-center">
            <div class="col-2">
                <!-- <button type="button" class="btn delete w-[8rem]" :disabled="!history_info.hist_no" @click="deleteHistory()">履歴削除</button> -->
            </div>

            <div class="col-8 d-flex justify-content-center align-items-center">
                <span>患者のポンプ使用履歴：全{{ patient_info.histories.length }}件</span>
            </div>

            <div class="col-2">
                
            </div>
        </div>

        <div class="px-3 wrapper-scroll" style="min-height: 20rem;">
            <div class="parent-scroll">
                <table class="view-scroll t-border allow-select">
                    <thead class="text-center">
                        <tr>
                            <th class="w-[3%]">No</th>
                            <th class="w-[10%]">カルテ番号</th>
                            <th class="w-[8%]">患者名</th>
                            <th class="w-[6%]">ポンプ</th>
                            <th class="w-[8%]">シリアル<br>No.</th>
                            <th class="w-[6%]">SMD<br>コード</th>
                            <th>施設名</th>
                            <th>診療科名</th>
                            <th>医師名</th>
                            <th class="w-[5%]">状態</th>
                            <th class="w-[8%]">請求開始</th>
                            <th class="w-[8%]">請求停止</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(hist, index) in patient_info.histories" :class="{'selected': history_info.hist_no == hist.hist_no}" @click="selectItem(hist, index)">
                            <td class="text-center">{{ hist.hist_no }}</td>
                            <td class="text-center" :class="{'text-disable': hist.medical_record_text == SIMILAR}">{{ hist.medical_record_text }}</td>
                            <td class="text-center" :class="{'text-disable': hist.patient_nm_text == SIMILAR}">{{ hist.patient_nm_text }}</td>
                            <td class="text-center" :class="{'text-disable': hist.pump_code_text == SIMILAR}">{{ hist.pump_code_text }}</td>
                            <td class="text-center">{{ hist.serial_no }}</td>
                            <td class="text-center" :class="{'text-disable': hist.smd_code_text == SIMILAR}">{{ hist.smd_code_text }}</td>
                            <td :class="{'text-disable': hist.fac_name_text == SIMILAR}">{{ hist.fac_name_text }}</td>
                            <td :class="{'text-disable': hist.des_clinic_text == SIMILAR}">{{ hist.des_clinic_text }}</td>
                            <td class="text-center" :class="{'text-disable': hist.des_doctor_text == SIMILAR}">{{ hist.des_doctor_text }}</td>
                            <td class="text-center" :class="{'text-primary': hist.status == HISTORY_STATUS_ACTIVE}">{{ hist.status_text }}</td>
                            <td class="text-center">{{ hist.invoice_start ? moment(hist.invoice_start).format('YYYY年MM月') : '' }}</td>
                            <td class="text-center">{{ hist.invoice_finish ? moment(hist.invoice_finish).format('YYYY年MM月') : '' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="p-3 d-flex justify-content-around">
            <!-- <button class="btn delete w-[8rem]" :disabled="patient_info.histories.length > 0" @click="removePatient()">マスタ削除</button> -->
            <button class="btn default w-[8rem]" @click="onClose()">閉じる</button>
            <button class="btn w-[8rem]" @click="saveHistory()" :disabled="!history_info?.hist_no">保存</button>
        </div>
    </ModalLayout>

    <ConfirmModal ref="confirmDialog"></ConfirmModal>
</template>
<style scoped>
/* button.btn {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.375rem 0.75rem;
} */
</style>
<script setup>
import { mapState, mapActions } from "vuex";
import moment from 'moment';
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue";
import { SIMILAR, HISTORY_STATUS_ACTIVE, SEX_UNSET } from "@/components/Constants.vue";
import { PATIENT_SCHEMA } from '@/validation/schema.js'
import { monthToDate, dateToMonth, timeToString, formatPatientHistory } from '@/helper.js';
import jp from '@/lang/jp.json';
</script>
<script>
export default {
    props: ['show', 'patient', 'history'],
    emits: ['close'],
    data: function () {
        return {
            day: null,
            patient_info: {},
            history_info: {},
            history_compare: {},
            selected_index: null,
            reload_parent: false,
            patient_valid: false,
            disable_copy: false,
            disable_copy_fac: false,
        }
    },
    computed: {
        ...mapState({
            master: state => state.patient.master
        }),
    },
    watch: {
        'patient_info': {
            deep: true,
            handler: async function () {
                await PATIENT_SCHEMA.validate(this.patient_info).then(() => {
                    this.patient_valid = true;
                }).catch(() => {
                    this.patient_valid = false;
                })
            }
        }
    },
    methods: {
        ...mapActions('patient', ['getMasterPatient', 'updatePatient', 'updatePatientHistory', 'deletePatientHistory', 'deletePatient']),
        onClose: function () {
            this.$emit('close', this.reload_parent);
        },
        selectItem: async function (item, index) {
            if(JSON.stringify(this.history_info) != JSON.stringify(this.history_compare)) {
                await this.saveHistory()
            }
            this.initSelected(item, index)
        },
        savePatient: async function () {
            let payload = {
                patient_kj: this.patient_info.patient_kj,
                patient_kn: this.patient_info.patient_kn,
                patient_nm: this.patient_info.patient_nm,
                patient_sex: this.patient_info.patient_sex,
            }
            await this.updatePatient({patient_id: this.patient_info.patient_id, payload: payload}).then((res) => {
                this.patient_info = formatPatientHistory(res.data);
            });
        },
        removePatient: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: jp.confirm,
                message: jp.delete_patient_message,
            })
            if(ok) {
                let params = {patient_id: this.patient_info.patient_id};
                await this.deletePatient(params).then((res) => {
                    if(res && res.code == 200) {
                        this.$refs.confirmDialog.close();
                        this.reload_parent = true;
                        this.$emit('close', this.reload_parent);
                    }
                });
            }
        },
        saveHistory: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: jp.confirm,
                message: jp.update_patient_message,
            })
            if(ok) {
                let payload = {
                    patient_kj    : this.history_info.patient_kj,
                    patient_kn    : this.history_info.patient_kn,
                    patient_sex   : this.history_info.patient_sex,
                    medical_record: this.history_info.medical_record,
                    serial_no     : this.history_info.serial_no,
                    fac_name      : this.history_info.fac_name,
                    des_clinic    : this.history_info.des_clinic,
                    des_doctor    : this.history_info.des_doctor,
                    dateof_into   : timeToString(this.history_info.dateof_into),
                    dateof_agree  : timeToString(this.history_info.dateof_agree),
                    dateof_start  : timeToString(this.history_info.dateof_start),
                    dateof_signed : timeToString(this.history_info.dateof_signed),
                    invoice_start : monthToDate(this.history_info.invoice_start),
                    invoice_finish: monthToDate(this.history_info.invoice_finish),
                    staff_wcheck  : this.history_info.staff_wcheck,
                    staff_pdfchk  : this.history_info.staff_pdfchk,
                    status_str1   : this.history_info.status_str1,
                    status_str2   : this.history_info.status_str2,
                    maker_ofdate  : timeToString(this.history_info.maker_ofdate),
                    maker_fac_name: this.history_info.maker_fac_name,
                    maker_remarks : this.history_info.maker_remarks,
                }
                if(!this.checkDate(this.history_info.invoice_start, this.history_info.invoice_finish)) {
                    await this.$refs.confirmDialog.show({
                        title: jp.error_title,
                        message: jp.invoice_start_invalid,
                        type: 3
                    })
                } else {
                    let params = {patient_id: this.patient_info.patient_id, hist_no: this.history_info.hist_no, payload: payload}
                    await this.updatePatientHistory(params).then((res) => {
                        if(res && res.code == 200) {
                            this.patient_info.histories[this.selected_index] = res.data
                            this.patient_info = formatPatientHistory(this.patient_info)
                            this.initSelected(this.patient_info.histories[this.selected_index], this.selected_index)
                            this.reload_parent = this.patient_info.patient_cd
                        }
                    })
                }
                await this.$refs.confirmDialog.close()
            }
        },
        deleteHistory: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: jp.confirm,
                message: jp.delete_patient_message,
            })
            if(ok) {
                let params = {patient_id: this.patient_info.patient_id, hist_no: this.history_info.hist_no};
                await this.deletePatientHistory(params).then((res) => {
                    if(res && res.code == 200) {
                        this.patient_info = formatPatientHistory(res.data);
                        this.initSelected(this.patient_info.histories[0] ?? {}, 0);
                        this.reload_parent = this.patient_info.patient_cd;
                    }
                });
                await this.$refs.confirmDialog.close();
            }
        },
        initSelected: function (history, index) {
            this.history_info = {...history};
            if(Object.keys(this.history_info)?.length > 0) {
                this.history_info.invoice_start = dateToMonth(this.history_info.invoice_start);
                this.history_info.invoice_finish = dateToMonth(this.history_info.invoice_finish);
            }
            this.selected_index = index;
            this.history_compare = {...this.history_info}
        },
        copyRemark: function () {
            navigator.clipboard.writeText(this.history_info.maker_remarks)
            this.disable_copy = true
            setTimeout(() => {
                this.disable_copy = false
            }, 500)
        },
        copyFacName: function () {
            navigator.clipboard.writeText(this.history_info.maker_fac_name)
            this.disable_copy_fac = true
            setTimeout(() => {
                this.disable_copy_fac = false
            }, 500)
        },
        checkDate: function (start, end) {
            return true //remove checkdate
            if(!start && end) return false
            if(!end) return true
            if(start.year > end.year) return false
            if(start.year < end.year) return true
            return start.month < end.month
        }
    },
    created: function () {
        if(!this.master.sex || this.master.sex.length <= 0) {
            this.getMasterPatient();
        }
    },
    mounted: function () {
        this.patient_info = {...this.patient};
        this.initSelected(this.patient_info.histories[this.patient_info.history_index] ?? {}, this.patient_info.history_index);
    }
}
</script>