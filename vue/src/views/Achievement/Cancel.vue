<template>
    <div class="p-1 wrapper-scroll transit">
        <div class="mb-1 d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center col-4">
                <button class="btn" @click="openRegister()">新規作成</button>
            </div>

            <div class="d-flex justify-content-center align-items-center col-4">
                <span>使用中断・中止処理中：{{ cancelList.length }}件</span>
            </div>

            <div class="gap-3 d-flex col-4 justify-content-end">
                <label class="gap-2 d-flex align-items-center label-text">
                    <input type="checkbox" class="mt-0 form-check-input" @change="onChangeShowAll()" v-model="search.is_show_all">完了データも表示
                </label>
                <button class="btn default w-[9rem]" @click="isShowTable = !isShowTable">{{ isShowTable ? '一覧非表示▲' : '一覧表示▼' }}</button>
            </div>
        </div>

        <div class="mb-3 parent-scroll" style="min-height: 10rem;" :class="{'d-none': !isShowTable}">
            <table class="view-scroll t-border">
                <thead class="text-center">
                    <tr>
                        <th class="w-[4%]">コード</th>
                        <th>施設名</th>
                        <th class="w-[8%]">患者コード</th>
                        <th class="w-[8%]">患者名</th>
                        <th class="w-[8%]">ポンプ</th>
                        <th class="w-[8%]">シリアルNo.</th>
                        <th class="w-[8%]">受信日</th>
                        <th class="w-[8%]">中断・中止日</th>
                        <th class="w-[6%]">種別</th>
                        <th class="w-[8%]">請求停止年月</th>
                        <th class="w-[8%]">請求開始年月</th>
                        <th class="w-[8%]">状態</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cancel in cancelList" :key="cancel.id" :class="{'selected': cancel.id == cancelSelected.id}" @click="changeItemSelected(cancel)">
                        <td class="text-center">{{ cancel.curHistory.smd_code }}</td>
                        <td>{{ cancel.fac_name_label }}</td>
                        <td class="text-center">{{ cancel.patient_cd }}</td>
                        <td class="text-center">{{ cancel.curHistory.patient_nm }}</td>
                        <td class="text-center">{{ cancel.pump_code }}</td>
                        <td class="text-center">{{ cancel.serial_no }}</td>
                        <td class="text-center">{{ cancel.recv_info_date ? displayDate(cancel.recv_info_date) : displayDate(cancel.pause_recv_date) }}</td>
                        <td class="text-center">{{ cancel.pause_flag ? displayDate(cancel.pause_start_date) : displayDate(cancel.stop_date) }}</td>
                        <td class="text-center">{{ cancel.type }}</td>
                        <td class="text-center">{{ displayDate(cancel.curHistory.invoice_finish, '-', 'YYYY年MM月') }}</td>
                        <td class="text-center">{{ displayDate(cancel.newHistory?.invoice_start, '-', 'YYYY年MM月') }}</td>
                        <td class="text-center">{{ cancel.status_label }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mx-auto form-border d-grid input-gap" style="max-width: 100rem;" v-if="cancelList.length > 0">
            <!-- grid-1 -->
            <div class="d-grid input-gap">
                <div class="d-flex align-items-center">
                    <label class="fw-bold">■ 基本情報</label>
                </div>

                <div class="gap-3 d-flex"> 
                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="w-[6rem] label-text">ポンプ</label>
                        <input type="text" class="flex-1 text-center form-control" :value="cancelSelected.pump_code" disabled>
                    </div>
                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="w-[6rem] label-text">SMDコード</label>
                        <input type="text" class="flex-1 text-center form-control" :value="cancelSelected.curHistory.smd_code" disabled>
                    </div>
                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="w-[6rem] label-text">DCFコード</label>
                        <input type="text" class="flex-1 text-center form-control" :value="cancelSelected.dcf_code" disabled>
                    </div>
                    <div class="d-flex align-items-center basis-[40%]">
                        <label class="w-[6rem] label-text">施設名</label>
                        <input type="text" class="flex-1 form-control" v-model="cancelSelected.fac_name" :disabled="disable()">
                    </div>
                </div>

                <div class="gap-3 d-flex"> 
                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="w-[6rem] label-text">シリアルNo.</label>
                        <input type="text" class="flex-1 text-center form-control" :value="cancelSelected.serial_no" disabled>
                    </div>
                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="w-[6rem] label-text">患者コード</label>
                        <input type="text" class="flex-1 text-center form-control" :value="cancelSelected.patient_cd" disabled>
                    </div>
                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="w-[6rem] label-text">患者名</label>
                        <input type="text" class="flex-1 text-center form-control" :value="cancelSelected.curHistory.patient_nm" disabled>
                    </div>
                    <div class="d-flex align-items-center basis-[40%]">
                        <label class="w-[6rem] label-text">納品先</label>
                        <input type="text" class="flex-1 form-control" v-model="cancelSelected.clinic" :disabled="disable()">
                        <input type="text" class="form-control w-[8rem] ms-1" v-model="cancelSelected.doctor" :disabled="disable()">
                        <select class="w-[5.5rem] form-select ms-1" v-model="cancelSelected.title" :disabled="disable()">
                            <option v-for="title in master.des_title" :value="title.id">{{ title.value }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="my-2 divider" style="height:1px;"></div>

            <!-- grid-3 pause -->
            <div class="d-grid input-gap" v-if="cancelSelected.pause_flag">
                <div class="gap-3 d-flex">
                    <!-- left -->
                    <div class="d-flex flex-column input-gap basis-[50%]">
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[45%]">
                                <label class="label-text w-[7rem]">情報受信日</label>
                                <Datepicker class="flex-1" v-model="cancelSelected.pause_recv_date" :disabled="disable()"></Datepicker>
                            </div>
                            <div class="d-flex align-items-center basis-[55%]">
                                <label class="label-text w-[4rem]">情報元</label>
                                <input type="text" class="flex-1 form-control" v-model="cancelSelected.pause_info_from" :disabled="disable()">
                            </div>
                        </div>

                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center  basis-[100%]">
                                <label class="label-text w-[7rem]">担当者名</label>
                                <input type="text" class="flex-1 form-control" v-model="cancelSelected.pause_recv_who" :disabled="disable()">
                            </div>
                        </div>

                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[50%]">
                                <label class="label-text w-[7rem]">電話番号</label>
                                <input type="text" class="flex-1 form-control" v-model="cancelSelected.pause_recv_phone" :disabled="disable()">
                            </div>
                            <div class="d-flex align-items-center basis-[50%]">
                                <label class="label-text w-[5rem]">FAX番号</label>
                                <input type="text" class="flex-1 form-control" v-model="cancelSelected.pause_recv_fax" :disabled="disable()">
                            </div>
                        </div>

                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[50%]">
                                <label class="label-text w-[7rem]">中断開始日</label>
                                <Datepicker class="flex-1" v-model="cancelSelected.pause_start_date" :disabled="disable()"></Datepicker>
                            </div>
                            <div class="d-flex align-items-center basis-[50%]">
                                <label class="label-text w-[8.5rem]">請求中断開始年月</label>
                                <Datepicker month-picker format="yyyy年MM月" class="flex-1" v-model="cancelSelected.curHistory.invoice_finish" :disabled="disable()"></Datepicker>
                            </div>
                        </div>

                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[100%]">
                                <label class="label-text w-[7rem]">中断内容</label>
                                <input type="text" class="flex-1 form-control" v-model="cancelSelected.pause_info_text" :disabled="disable()">
                            </div>
                        </div>

                        <div class="gap-1 d-flex">
                            <div class="flex-1 d-flex align-items-center">
                                <label class="label-text w-[7rem]">中断開始理由</label>
                                <input type="text" class="flex-1 form-control" v-model="cancelSelected.pause_start_reason" :disabled="disable()">
                            </div>
                            <div class="d-flex align-items-center w-[9rem] justify-content-end">
                                <button class="btn w-[100%]" :disabled="cancelSelected.status != 0" @click="pause()">中断開始設定</button>
                            </div>
                        </div>

                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[100%]">
                                <label class="label-text w-[7rem]">備考</label>
                                <input type="text" class="flex-1 form-control" v-model="cancelSelected.pause_remarks" :disabled="disable()">
                            </div>
                        </div>
                    </div>

                    <!-- right -->
                    <div class="d-flex flex-column input-gap basis-[50%]">
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[50%]">
                                <label class="label-text w-[9rem] me-1">情報受信日</label>
                                <Datepicker class="flex-1" v-model="cancelSelected.rerent_recv_date" :disabled="disable()"></Datepicker>
                            </div>
                            <div class="d-flex align-items-center basis-[50%]">
                                <label class="label-text w-[5rem]">情報元</label>
                                <input type="text" class="flex-1 form-control" v-model="cancelSelected.rerent_info_from" :disabled="disable()">
                            </div>
                        </div>

                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[100%]">
                                <label class="label-text w-[9rem] me-1">担当者名</label>
                                <input type="text" class="flex-1 form-control" v-model="cancelSelected.rerent_recv_who" :disabled="disable()">
                            </div>
                        </div>

                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[50%]">
                                <label class="label-text w-[9rem] me-1">電話番号</label>
                                <input type="text" class="flex-1 form-control" v-model="cancelSelected.rerent_recv_phone" :disabled="disable()">
                            </div>
                            <div class="d-flex align-items-center basis-[48%]">
                                <label class="label-text w-[5rem]">FAX番号</label>
                                <input type="text" class="flex-1 form-control" v-model="cancelSelected.rerent_recv_fax" :disabled="disable()">
                            </div>
                        </div>

                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[50%]">
                                <label class="label-text w-[9rem] me-1">中断終了日</label>
                                <Datepicker class="flex-1" v-model="cancelSelected.rerent_start_date" :disabled="disable()"></Datepicker>
                            </div>
                            <div class="d-flex align-items-center basis-[48%]">
                                <label class="label-text w-[7rem]">請求開始年月</label>
                                <Datepicker month-picker format="yyyy年MM月" class="flex-1" v-model="cancelSelected.newHistory.invoice_start" :disabled="disable()"></Datepicker>
                            </div>
                        </div>
                        
                        <div class="d-flex">
                            <div class="d-flex flex-column input-gap w-[9rem] me-1">
                                <label class="label-text">中断終了理由</label>
                                <button class="btn" @click="pauseComplete()" :disabled="cancelSelected.status != 1">中断終了設定</button>
                            </div>
                            <textarea class="flex-1 form-control" v-model="cancelSelected.rerent_start_reason" :disabled="disable()"></textarea>
                        </div>

                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[100%]">
                                <label class="label-text w-[9rem] me-1">備考</label>
                                <input type="text" class="flex-1 form-control" v-model="cancelSelected.rerent_remarks" :disabled="disable()">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- grid-3: stop -->
            <template v-else>
                <div class="d-grid input-gap">
                    <div class="gap-3 d-flex align-items-center">
                        <label class="fw-bold basis-[20%]">■ 通知受信情報</label>

                        <div class="d-flex align-items-center basis-[20%]">
                            
                        </div>
                        <div class="d-flex align-items-center basis-[35%]">
                            <label class="w-[6rem] label-text">施設名</label>
                            <input type="text" class="flex-1 form-control" v-model="cancelSelected.recv_from_fac" :disabled="disable()">
                        </div>
                        <div class="d-flex align-items-center basis-[25%]">
                            <label class="w-[6rem] label-text">電話番号</label>
                            <input type="text" class="flex-1 text-center form-control" v-model="cancelSelected.recv_phone" maxlength="20" :disabled="disable()">
                        </div>
                    </div>

                    <div class="gap-3 d-flex align-items-center">
                        <div class="d-flex basis-[20%] gap-3">
                            <a href="javascript:void(0)" @click="openReport()">メーカー通知文書</a>
                        </div>

                        <div class="d-flex align-items-center basis-[20%]">
                            <label class="w-[6rem] label-text">情報受信日</label>
                            <Datepicker class="flex-1" v-model="cancelSelected.recv_info_date" :disabled="disable()"></Datepicker>
                        </div>
                        <div class="d-flex align-items-center basis-[35%]">
                            <label class="w-[6rem] label-text">担当者名</label>
                            <input type="text" class="flex-1 form-control" v-model="cancelSelected.recv_from_who" :disabled="disable()">
                        </div>
                        <div class="d-flex align-items-center basis-[25%]">
                            <label class="w-[6rem] label-text">FAX番号</label>
                            <input type="text" class="flex-1 text-center form-control" v-model="cancelSelected.recv_fax" maxlength="20" :disabled="disable()">
                        </div>
                    </div>
                </div>

                <div class="my-2 divider" style="height:1px;"></div>
                
                <div class="d-grid input-gap">
                    <div class="gap-3 d-flex">
                        <div class="d-flex basis-[80%] gap-3">
                            <div class="d-flex align-items-center basis-[25%]">
                                <label class="label-text w-[6rem]">中止日</label>
                                <Datepicker class="flex-1" v-model="cancelSelected.stop_date" :disabled="disable()"></Datepicker>
                            </div>
                            <div class="d-flex align-items-center basis-[25%]">
                                <label class="label-text w-[5rem]">情報元</label>
                                <input type="text" class="flex-1 form-control" v-model="cancelSelected.stop_info_from" :disabled="disable()">
                            </div>
                            <label class="d-flex gap-2 align-items-center justify-content-center basis-[25%]">
                                <input type="checkbox" class="mt-0 form-check-input" v-model="cancelSelected.hope_send_case" :disabled="disable()" v-bind:true-value="1" v-bind:false-value="0">回収ケース希望
                            </label>
                            <div class="d-flex align-items-center basis-[25%]">
                                <label class="label-text w-[7rem]">発送指示日</label>
                                <Datepicker class="flex-1" v-model="cancelSelected.send_case_inst" :disabled="disable()"></Datepicker>
                            </div>
                        </div>
                        <div class="d-flex basis-[20%]">
                            <div class="d-flex align-items-center">
                                <label class="label-text w-[8.5rem]">ケース発送日</label>
                                <Datepicker class="flex-1" v-model="cancelSelected.send_case_date" :disabled="disable()"></Datepicker>
                            </div>
                        </div>
                    </div>
    
                    <div class="gap-3 d-flex">
                        <div class="d-flex basis-[80%]">
                            <label class="label-text w-[6rem]">中止情報</label>
                            <input type="text" class="flex-1 form-control" v-model="cancelSelected.stop_info_text" :disabled="disable()">
                        </div>
                        <div class="d-flex basis-[20%]">
                            <div class="d-flex align-items-center">
                                <label class="label-text w-[8.5rem]">請求停止年月</label>
                                <Datepicker month-picker format="yyyy年MM月" class="flex-1" v-model="cancelSelected.curHistory.invoice_finish" :disabled="disable()"></Datepicker>
                            </div>
                        </div>
                    </div>
    
                    <div class="d-flex">
                        <label class="w-[6rem] label-text">備考</label>
                        <textarea class="flex-1 form-control" v-model="cancelSelected.stop_remarks" :disabled="disable()"></textarea>
                    </div>
                </div>
            </template>

            <!-- button -->
            <div class="pt-3 d-flex justify-content-between align-item-center">
                <a href="javascript:void(0)" v-if="cancelSelected.pause_flag" @click="openReport()" class="">メーカー通知文書</a>
                <div class="flex-1 d-flex justify-content-around">
                    <button class="btn delete" v-if="cancelSelected.pause_flag" :disabled="cancelSelectedOrigin.status == 9" @click="transfer()">中止へ転換</button>
                    <button class="btn delete w-[7rem]" @click="deleteItem()" :disabled="cancelSelectedOrigin.status == 9">取消</button>
                    <div class="gap-3 d-flex" v-if="!cancelSelected.pause_flag">
                        <label class="gap-2 label-text d-flex align-items-center">
                            <input type="checkbox" class="mt-0 form-check-input" v-model="isEnableComplete" :disabled="disable()">回収不可
                        </label>
                        <button class="btn w-[7rem]" :disabled="!isEnableComplete || cancelSelected.status == 9" @click="stopComplete()">中止確定</button>
                    </div>
                    <button class="btn w-[7rem]" @click="update()" :disabled="cancelSelected.status == 9">情報保存</button>
                </div>
            </div>
        </div>
    </div>

    <StopReportModal v-if="isOpenStopReport" :show="isOpenStopReport" @close="isOpenStopReport = false" :cancel="cancelSelected"></StopReportModal>
    <PauseReportModel v-if="isOpenPauseReport" :show="isOpenPauseReport" @close="isOpenPauseReport = false" :cancel="cancelSelected"></PauseReportModel>

    <CanCelRegisterModal v-if="isOpenRegisterCancel" :show="isOpenRegisterCancel" @close="isOpenRegisterCancel = false" @confirm="createCancel($event)"></CanCelRegisterModal>
    <ConfirmModal ref="confirmDialog"></ConfirmModal>

    <CancelSettingModal v-if="isOpenCancelSetting"
    :show="isOpenCancelSetting"
    :data="cancelProps"
    @close="onCloseCreate($event)"></CancelSettingModal>
</template>

<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
import CanCelRegisterModal from "./modal/cancel/CanCelRegisterModal.vue";
import StopReportModal from '@/views/Achievement/modal/cancel/StopReportModal.vue';
import PauseReportModel from '@/views/Achievement/modal/cancel/PauseReportModel.vue';
import CancelSettingModal from '@/views/Achievement/modal/setting/CancelSettingModal.vue';
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue";

import { formatBeforeRequest, dateToMonth, deepClone, displayDate, typeText } from '@/helper.js';
import jp from '@/lang/jp.json';
</script>
<script>
export default {
    data: function () {
        return {
            day: null,
            is_cancel: false,
            isShowTable: true,
            isOpenRegisterCancel: false,
            isOpenStopReport: false,
            isOpenPauseReport: false,
            isOpenCancelSetting: false,
            cancelList: [],
            cancelSelected: {
                curHistory: {},
                newHistory: {},
            },
            cancelSelectedOrigin: {
                curHistory: {},
                newHistory: {},
            },
            isEnableComplete: false,
            cancelProps: {},
        }
    },
    computed: {
        ...mapState({
            master: state => state.cancel.master,
            search: state => state.cancel.search,
        })
    },
    methods: {
        ...mapActions('cancel', ['getMasterCancel', 'getIndexCancel', 'updateCancel', 'updatePause', 'updatePauseComplete', 'updateStopComplete', 'deleteCancel', 'updateTransfer']),
        ...mapMutations('cancel', ['resetSearch']),
        openReport: function () {
            this.cancelSelected.pause_flag ? (this.isOpenPauseReport = true) : (this.isOpenStopReport = true);
        },
        openRegister: function () {
            this.isOpenRegisterCancel = true
        },
        onCloseCreate: async function(event) {
            this.isOpenCancelSetting = false
            if(event) {
                this.resetSearch()
                await this.searchCancelIndex()
            }
        },
        onChangeShowAll: async function () {
            await this.searchCancelIndex()
        },
        searchCancelIndex: async function () {
            await this.getIndexCancel(this.search).then((res) => {
                if(res && res.code == 200) {
                    this.cancelList = res.data
                    if(this.cancelList.length > 0) {
                        this.setCancelSelected(this.cancelList[0])
                    }
                }
            })
        },
        setCancelSelected: function (data) {
            this.cancelSelected = deepClone(data)

            this.cancelSelected.curHistory.invoice_finish = dateToMonth(this.cancelSelected.curHistory.invoice_finish)
            this.cancelSelected.curHistory.invoice_start = dateToMonth(this.cancelSelected.curHistory.invoice_start)
            if(this.cancelSelected.newHistory) {
                this.cancelSelected.newHistory.invoice_finish = dateToMonth(this.cancelSelected.newHistory.invoice_finish)
                this.cancelSelected.newHistory.invoice_start = dateToMonth(this.cancelSelected.newHistory.invoice_start)
            }
            this.cancelSelectedOrigin = deepClone(this.cancelSelected)
            console.log(this.cancelSelected)
        },
        changeItemSelected: function (data) {
            if(data.id == this.cancelSelected.id) {
                return
            }
            this.setCancelSelected(data)
        },
        getPayloadUpdate: function (cancel) {
            let data = formatBeforeRequest({...cancel})
            data.curHistory = formatBeforeRequest({...data.curHistory})
            data.newHistory = formatBeforeRequest({...data.newHistory})
            return data
        },
        update: async function () {
            let payload = this.getPayloadUpdate(this.cancelSelected)
            await this.updateCancel(payload).then((res) => {
                if(res && res.code == 200) {
                    this.$refs.confirmDialog.show({
                        title: jp.notification_title,
                        message: jp.update_success_new_rent_message,
                        type: 1
                    })
                    this.setCancelSelected(res.data)
                    this.reloadCancelList(res.data)
                }
            })
        },
        pause: async function () {
            let payload = this.getPayloadUpdate(this.cancelSelected)
            await this.updatePause(payload).then((res) => {
                if(res && res.code == 200) {
                    this.$refs.confirmDialog.show({
                        title: jp.notification_title,
                        message: jp.update_success_new_rent_message,
                        type: 1
                    })
                    this.setCancelSelected(res.data)
                    this.reloadCancelList(res.data)
                }

                if(res && res.code == 201) {
                    this.setCancelSelected(res.data)
                    this.reloadCancelList(res.data)
                }
            })
        },
        pauseComplete: async function () {
            let payload = this.getPayloadUpdate(this.cancelSelected)
            await this.updatePauseComplete(payload).then((res) => {
                if(res && res.code == 200) {
                    this.$refs.confirmDialog.show({
                        title: jp.notification_title,
                        message: jp.update_success_new_rent_message,
                        type: 1
                    })
                    this.setCancelSelected(res.data)
                    this.reloadCancelList(res.data)
                }

                if(res && res.code == 201) {
                    this.setCancelSelected(res.data)
                    this.reloadCancelList(res.data)
                }
            })
        },
        stopComplete: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: jp.confirm,
                message: jp.confirm_complete_stop,
                ok_class: ''
            })

            if(ok) {
                await this.$refs.confirmDialog.close()
                let payload = this.getPayloadUpdate(this.cancelSelected)
                console.log(payload)
                await this.updateStopComplete(payload).then((res) => {
                    if(res && res.code == 200) {
                        this.$refs.confirmDialog.show({
                            title: jp.notification_title,
                            message: jp.update_success_new_rent_message,
                            type: 1
                        })
                        this.setCancelSelected(res.data)
                        this.reloadCancelList(res.data)
                    }
    
                    if(res && res.code == 201) {
                        this.setCancelSelected(res.data)
                        this.reloadCancelList(res.data)
                    }
                })
            }
        },
        reloadCancelList: function (data) {
            for(let i = 0; i < this.cancelList.length; i++) {
                if(this.cancelList[i].id == data.id) {
                    this.cancelList[i] = data
                    break;
                }
            }
        },
        disable: function () {
            if(this.cancelSelected.status == 9) return true
            return false
        },
        deleteItem: async function () {
            let message = this.cancelSelected.pause_flag ? jp.confirm_delete_pause : jp.confirm_delete_stop
            const ok = await this.$refs.confirmDialog.show({
                title: jp.confirm,
                message: message,
                cancelButton: "キャンセル",
                ok_class: ''
            })
            if(ok) {
                await this.$refs.confirmDialog.close()
                await this.deleteCancel(this.cancelSelected.id).then((res) => {
                    if(res && res.code == 200) {
                        this.searchCancelIndex()
                    }
                })
            }
        },
        createCancel: async function (event) {
            this.isOpenRegisterCancel = false
            this.cancelProps = event
            this.isOpenCancelSetting = true
        },
        transfer: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: jp.confirm,
                message: jp.confirm_transfer_pause,
                cancelButton: "キャンセル",
                ok_class: ''
            })
            if(ok) {
                await this.$refs.confirmDialog.close()
                await this.updateTransfer({id: this.cancelSelected.id}).then((res) => {
                    if(res && res.code == 200) {
                        this.$refs.confirmDialog.show({
                            title: jp.notification_title,
                            message: jp.update_success_new_rent_message,
                            type: 1
                        })
                        this.setCancelSelected(res.data)
                        this.reloadCancelList(res.data)
                    }

                    if(res && res.code == 201) {
                        this.setCancelSelected(res.data)
                        this.reloadCancelList(res.data)
                    }
                })
            }
        }
    },
    created: async function () {
        await this.getMasterCancel()
        this.search.pump_code = this.$store.state.pump_code
        await this.searchCancelIndex()
    }
}
</script>