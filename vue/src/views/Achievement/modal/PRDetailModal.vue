<template>
    <ModalLayout :show="show" title="PR実績詳細" maxWidth="max-w-8xl" :class="'px-0'" @close="onClose()">
        <div class="gap-3 p-2 d-flex justify-content-center align-items-center">
            <button class="btn default w-[7rem]" @click="prev()" :disabled="keys.length <= 1">←前へ</button>
            <span class="fs-5 fw-bold">【SMD得意先コード： {{ historySelected.smd_code }}</span>
            <button class="btn default w-[7rem]" @click="next()" :disabled="keys.length <= 1">次へ→</button>
        </div>

        <div class="divider"></div>

        <div class="gap-3 px-3 pt-2 pb-4 d-flex">
            <!-- left -->
            <div class="basis-[45%] d-flex flex-column gap-3">
                <!-- group 1 -->
                <div class="d-grid input-gap">
                    <!-- group1-title -->
                    <div class="mb-1 d-flex justify-content-between align-items-center">
                        <label class="fs-5 fw-bold">■ 施設と宛先情報</label>
                    </div>

                    <!-- group1-row1 -->
                    <div class="gap-3 d-flex">
                        <div class="d-flex align-items-center basis-[40%]">
                            <label class="w-[7rem] label-text">SMDコード</label>
                            <input type="text" class="flex-1 text-center form-control" :value="historySelected.smd_code" disabled>
                        </div>
                        <div class="d-flex align-items-center basis-[60%]">
                            <label class="w-[6rem] label-text">宛先コード</label>
                            <input type="text" class="form-control text-center w-[8rem]" :value="historySelected.des_code_text" disabled>
                        </div>
                    </div>

                    <!-- group1-row2 -->
                    <div class="d-flex align-items-center">
                        <label class="w-[7rem] label-text">施設名称</label>
                        <input type="text" class="flex-1 form-control" :value="historySelected.fac_name" disabled>
                    </div>

                    <!-- group1-row3 -->
                    <div class="d-flex align-items-center">
                        <label class="w-[7rem] label-text">宛先名称</label>
                        <input type="text" class="flex-1 form-control" v-model="historySelected.des_clinic">
                    </div>

                    <!-- group1-row4 -->
                    <div class="d-flex align-items-center">
                        <label class="w-[7rem] label-text">担当名</label>
                        <input type="text" class="flex-1 form-control" v-model="historySelected.des_doctor">
                        <select class="form-select w-[7rem] ms-2" v-model="historySelected.destination.des_title" disabled>
                            <option v-for="title in master.des_title" :value="title.id">{{ title.value }}</option>
                        </select>
                    </div>

                    <!-- group1-row5 -->
                    <div class="gap-3 d-flex">
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[7rem] label-text">電話番号</label>
                            <input type="text" class="flex-1 text-center form-control" :value="historySelected.destination.des_tel" disabled>
                        </div>
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[5rem] label-text">FAX番号</label>
                            <input type="text" class="flex-1 text-center form-control" :value="historySelected.destination.des_fax" disabled>
                        </div>
                    </div>
                </div>

                <!-- group 2 -->
                <div class="d-grid input-gap">
                    <!-- group2-title -->
                    <div class="mb-1 d-flex justify-content-between align-items-center">
                        <label class="fs-5 fw-bold">■ 依頼・請求情報</label>
                    </div>

                    <!-- group2-row1+2 -->
                    <div class="gap-2 d-flex">
                        <div class="flex-1 d-grid input-gap">
                            <div class="d-flex align-items-center">
                                <label class="w-[7rem] label-text">依頼元コード</label>
                                <select class="form-select w-[6rem] me-2" v-model="historySelected.pumpFacility.comp_code" disabled>
                                    <option v-for="item in master.companies" :key="item.comp_cd" :value="item.comp_cd">{{ item.comp_cd }}</option>
                                </select>
                                <input type="text" class="flex-1 form-control" v-model="historySelected.pumpFacility.comp_name" disabled>
                            </div>
                            <div class="d-flex align-items-center">
                                <label class="w-[7rem] label-text">請求元コード</label>
                                <input type="text" class="form-control text-center w-[6rem] me-2" v-model="historySelected.pumpFacility.jd_code" disabled>
                                <input type="text" class="flex-1 form-control" v-model="historySelected.pumpFacility.ses_name" disabled>
                            </div>
                        </div>
                        <!-- <button class="btn selection w-[5rem]" disabled>情報<br>変更</button> -->
                    </div>
                </div>

                <!-- group 3 -->
                <div class="d-grid input-gap">
                    <!-- group3-title -->
                    <div class="mb-1 d-flex justify-content-between align-items-center">
                        <label class="fs-5 fw-bold">■ 患者様情報</label>
                    </div>

                    <!-- group3-row1 -->
                    <div class="gap-3 d-flex">
                        <div class="d-flex align-items-center basis-[40%]">
                            <label class="w-[7rem] label-text">患者コード</label>
                            <input type="text" class="flex-1 text-center form-control" v-model="historySelected.patient_cd" disabled>
                        </div>
                        <div class="d-flex align-items-center basis-[60%]">
                            <label class="w-[3.5rem] label-text">患者名</label>
                            <input type="text" class="flex-1 text-center form-control" v-model="historySelected.patient_kj">
                            <input type="text" class="form-control text-center w-[6rem] ms-1" v-model="historySelected.patient_nm">
                            <select class="form-select w-[5.5rem] ms-1" v-model="historySelected.patient_sex">
                                <option v-for="item in master.sex" :value="item.id">{{ item.value }}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- group 4 -->
                <div class="d-grid input-gap">
                    <!-- group4-title -->
                    <div class="mb-1 d-flex justify-content-between align-items-center">
                        <label class="fs-5 fw-bold">■ 患者様情報</label>
                        <button class="btn default" @click="copyRemark()">テキスト複製</button>
                    </div>

                    <!-- group4-row1 -->
                    <textarea class="form-control" style="min-height: 5.5rem;" v-model="historySelected.maker_remarks"></textarea>
                </div>
            </div>

            <!-- right -->
            <div class="basis-[55%] d-flex flex-column gap-3">
                <!-- group 4 -->
                <div class="d-grid input-gap">
                    <!-- group4-title -->
                    <div class="mb-1 d-flex justify-content-between align-items-center">
                        <label class="fs-5 fw-bold">■ 使用ポンプの履歴</label>
                    </div>

                    <!-- group4-table -->
                    <div class="wrapper-scroll" style="min-height: 14rem;">
                        <div class="parent-scroll">
                            <table class="view-scroll t-border">
                                <thead class="text-center">
                                    <tr>
                                        <th class="w-[3rem]">No.</th>
                                        <th>シリアルNo.</th>
                                        <th>発送日</th>
                                        <th>出荷元</th>
                                        <th>理由</th>
                                        <th>指示番号</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="history in patient.histories" :id="'PR'+history.hist_no">
                                        <td class="text-center">{{ history.hist_no }}</td>
                                        <td class="text-center">{{ history.serial_no }}</td>
                                        <td class="text-center">{{ displayDate(history.pumpHistory?.regis_date) }}</td>
                                        <td class="text-center">{{ history.from_shelf }}</td>
                                        <td class="text-center">{{ history.shipment?.inst_type_label }}</td>
                                        <td class="text-center">{{ history.pumpHistory?.action_code }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- group 5 -->
                <div class="d-flex flex-column input-gap justify-content-between h-100">
                    <div class="d-flex flex-column input-gap">
                        <!-- group5-title -->
                        <div class="gap-2 mb-1 d-flex align-items-center">
                            <label class="fs-5 fw-bold basis-[40%]">■ 使用中のポンプ</label>
                        </div>
    
                        <!-- group5-row1 -->
                        <div class="gap-3 d-flex w-[80%]">
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="label-text w-[6rem]">シリアルNo.</label>
                                <input type="text" class="flex-1 text-center form-control" :value="historySelected.serial_no" disabled>
                            </div>
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="label-text w-[4rem]">ポンプ</label>
                                <input type="text" class="flex-1 text-center form-control" :value="historySelected.from_shelf" disabled>
                            </div>
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="label-text w-[3rem]">状態</label>
                                <input type="text" class="flex-1 text-center form-control" :class=" { 'text-primary': historySelected.status == HISTORY_STATUS_ACTIVE } " :value="historySelected.status_text" disabled>
                            </div>
                        </div>
    
                        <!-- group5-row2 -->
                        <div class="gap-3 d-flex flex-column w-[80%] mt-3">
                            <div class="gap-3 d-flex justify-content-between">
                                <!-- Exchange -->
                                <button class="btn default w-[10rem] ms-2" @click="openRegularSetting()" :disabled="historySelected.status != HISTORY_STATUS_ACTIVE">定期交換登録</button>
                                <!-- Fault -->
                                <button class="btn default w-[10rem] ms-2" @click="openFaultSetting()" :disabled="historySelected.status != HISTORY_STATUS_ACTIVE">故障登録</button>
                                <!-- Change facility -->
                                <button class="btn default w-[10rem] ms-2" @click="openTransferSetting()" :disabled="historySelected.status != HISTORY_STATUS_ACTIVE">転院登録</button>
                            </div>
                            <div class="gap-3 d-flex justify-content-between">
                                <!-- Rent to Stop -->
                                <button class="btn default w-[10rem] ms-2" @click="isOpenStopRentSetting = true" :disabled="historySelected.status != 0">新規中止登録</button>
                                <!-- Stop -->
                                <button class="btn default w-[10rem] ms-2" @click="openCancelSetting()" :disabled="historySelected.status != HISTORY_STATUS_ACTIVE">中止登録</button>
                                <!-- Pause -->
                                <button class="btn default w-[10rem] ms-2" @click="openCancelSetting(1)" :disabled="historySelected.status != HISTORY_STATUS_ACTIVE">中断登録</button>
                            </div>
                        </div>
                        <div class="d-flex justify-content-around w-[80%]">
                            <label class="label-text w-[9rem] d-flex align-items-center gap-2 text-danger mt-3">
                                <input type="checkbox" class="mt-0 form-check-input" v-model="historySelected.special_flg" v-bind:true-value="1" v-bind:false-value="0">調査要
                            </label>
                        </div>
                    </div>

                    <!-- group2-button -->
                    <div class="d-flex justify-content-around">
                        <button class="btn delete w-[9rem]" disabled>データ削除</button>
                        <button class="btn default w-[8rem]" @click="onClose()">閉じる</button>
                        <button class="btn w-[9rem]" @click="updateHistory()">情報保存</button>
                    </div>
                </div>
            </div>
        </div>
    </ModalLayout>
    
    <TransferSettingModal v-if="isOpenTransferSetting"
    :show="isOpenTransferSetting"
    :data="changeFacilityProps"
    @close="isOpenTransferSetting = false"></TransferSettingModal>

    <FaultSettingModal v-if="isOpenFaultSetting"
    :show="isOpenFaultSetting"
    :data="faultProps"
    @close="isOpenFaultSetting = false"></FaultSettingModal>

    <CancelSettingModal v-if="isOpenCancelSetting"
    :show="isOpenCancelSetting"
    :data="cancelProps"
    @close="isOpenCancelSetting = false"></CancelSettingModal>
    
    <RegularSettingModal v-if="isOpenRegularSetting"
    :show="isOpenRegularSetting"
    :data="regularProps"
    @close="isOpenRegularSetting = false"></RegularSettingModal>

    <StopRentSettingModal v-if="isOpenStopRentSetting"
    :show="isOpenStopRentSetting"
    :data="historySelected"
    @close="isOpenStopRentSetting = false"
    @reload="isOpenStopRentSetting = false; getHistorySelected(); reload = true;"></StopRentSettingModal>
    
    <ConfirmModal ref="confirmDialog"></ConfirmModal>
</template>
<style scoped>

</style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import RegularSettingModal from "./setting/RegularSettingModal.vue";
import FaultSettingModal from "./setting/FaultSettingModal.vue";
import TransferSettingModal from "./setting/TransferSettingModal.vue";
import CancelSettingModal from "./setting/CancelSettingModal.vue";
import StopRentSettingModal from "./setting/StopRentSettingModal.vue";
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue"
import { HISTORY_STATUS_ACTIVE } from "@/components/Constants.vue";
// import jp from '@/lang/jp.json'
import { typeText, formatBeforeRequest, displayDate, number, deepClone } from '@/helper.js';
</script>
<script>
export default {
    props: ['show', 'keys', 'selectedKey'],
    emits: ['close'],
    data: function () {
        return {
            day: null,
            isOpenRegularSetting: false,
            isOpenFaultSetting: false,
            faultProps: {
                serial_no: '',
                patient_cd: '',
            },
            isOpenTransferSetting: false,
            changeFacilityProps: {
                serial_no: '',
                patient_cd: '',
                src_remarks: '',
            },
            cancelProps: {
                serial_no: '',
                patient_cd: '',
                pause_flag: 1,
            },
            regularProps: {
                patient_cd: '',
                dateof_use: '',
            },
            isOpenCancelSetting: false,
            isOpenStopRentSetting: false,
            patient: {
                histories: []
            },
            historySelected: {
                destination: {},
                pumpFacility: {},
                pumpHistory: {},
                shipment: {},
                changeFacility: {},
                changeFault: {},
            },
            historyMax: {
                destination: {},
                pumpFacility: {},
                pumpHistory: {},
                shipment: {},
                changeFacility: {},
                changeFault: {},
            },
            reload: false,
        }
    },
    computed: {
        ...mapState({
            master: state => state.achievement.master,
        }),
    },
    methods: {
        ...mapActions('patient', ['updatePatientHistory']),
        ...mapActions('achievement', ['getMasterPatient']),
        ...mapActions('patient', ['showPatientHistory']),
        ...mapMutations('achievement', []),
        onClose: function () {
            this.$emit('close', this.reload)
        },
        openRegularSetting: function () {
            this.isOpenRegularSetting = true
        },
        openFaultSetting: function () {
            this.isOpenFaultSetting = true
        },
        openTransferSetting: function () {
            this.isOpenTransferSetting = true
        },
        openCancelSetting: function (pause_flag) {
            this.cancelProps.pause_flag = pause_flag
            this.isOpenCancelSetting = true
        },
        getHistorySelected: async function () {
            await this.showPatientHistory(this.selectedKey.patient_id).then((res) => {
                if(res && res.code == 200) {
                    this.patient = res.data
                    const history = this.patient.histories.find(el => el.hist_no == this.selectedKey.hist_no)
                    this.historyMax = this.patient.histories[0]
                    this.setHistorySelected(history)
                } else {
                    this.$emit('close', true)
                }
            })
        },
        setHistorySelected: function (data) {
            if(!data.destination) data.destination = {}
            if(!data.pumpFacility) data.pumpFacility = {}
            if(!data.pumpHistory) data.pumpHistory = {}
            if(!data.shipment) data.shipment = {}
            if(!data.changeFacility) data.changeFacility = {}
            if(!data.changeFault) data.changeFault = {}
            this.historySelected = data
            console.log(this.historySelected)

            this.changeFacilityProps.serial_no = this.historySelected.serial_no
            this.changeFacilityProps.patient_cd = this.historySelected.patient_cd
            this.changeFacilityProps.src_remarks = this.historySelected.pumpFacility?.ms_remarks

            this.faultProps.serial_no = this.historySelected.serial_no
            this.faultProps.patient_cd = this.historySelected.patient_cd

            this.cancelProps.serial_no = this.historySelected.serial_no
            this.cancelProps.patient_cd = this.historySelected.patient_cd

            this.regularProps.patient_cd = this.historySelected.patient_cd
            this.regularProps.dateof_use = this.historySelected.dateof_use
        },
        prev: async function () {
            for(let i = 0; i < this.keys.length; i++) {
                if((this.keys[i].hist_no == this.historySelected.hist_no)
                    && (this.keys[i].patient_id ==  this.historySelected.patient_id)) {
                    let index = i - 1
                    if(index == -1) index = this.keys.length - 1

                    this.selectedKey.patient_id = this.keys[index].patient_id
                    this.selectedKey.hist_no = this.keys[index].hist_no
                    this.getHistorySelected()
                    break
                }
            }
        },
        next: async function () {
            for(let i = 0; i < this.keys.length; i++) {
                if((this.keys[i].hist_no == this.historySelected.hist_no)
                    && (this.keys[i].patient_id ==  this.historySelected.patient_id)) {
                    let index = i + 1
                    if(i == (this.keys.length - 1)) index = 0
                    
                    this.selectedKey.patient_id = this.keys[index].patient_id
                    this.selectedKey.hist_no = this.keys[index].hist_no
                    this.getHistorySelected()
                    break
                }
            }
        },
        copyRemark: function () {
            navigator.clipboard.writeText(this.historySelected.maker_remarks)
        },
        updateHistory: async function (showMessage=true) {
            let payload = {
                patient_id: this.historySelected.patient_id,
                hist_no: this.historySelected.hist_no,
                payload: this.historySelected
            }
            const res =  await this.updatePatientHistory(payload).then((res) => {
                if(res && res.code == 200) {
                    this.historySelected = {...this.historySelected, ...res.data}
                    if(showMessage) {
                        this.$refs.confirmDialog.show({
                            title: 'jp.notification_title',
                            message: 'jp.update_success_new_rent_message',
                            type: 1
                        })
                    }
                    console.log(this.historySelected)
                    return true
                } else {
                    return false
                }
            })
        }
    },
    created: async function () {
        await this.getHistorySelected()
    }
}
</script>