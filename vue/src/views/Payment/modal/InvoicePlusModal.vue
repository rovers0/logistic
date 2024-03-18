<template>
    <ModalLayout :show="show" title="伝票追加" maxWidth="max-w-7xl" @close="onClose()">
        <form class="gap-5 px-3 py-2 d-flex" @submit.prevent="submitSearch()">
            <div class="flex-1 gap-3 d-flex">
                <div class="d-flex align-items-center basis-[25%]">
                    <label class="w-[5rem] label-text">ポンプ</label>
                    <select class="flex-1 form-select" v-model="search.pump_code">
                        <option :value="null">全て</option>
                        <option v-for="mc in master.machines" :value="mc.pump_cd">{{ '['+mc.pump_cd+'] '+mc.pump_nm_short }}</option>
                    </select>
                </div>
                <div class="d-flex align-items-center w-[25%]">
                    <label class="w-[4rem] label-text">施設名</label>
                    <input type="text" class="flex-1 form-control" v-model="search.search_fac_name">
                </div>
                <div class="d-flex align-items-center w-[25%]">
                    <label class="w-[2rem] label-text">卸</label>
                    <select class="flex-1 form-select" v-model="search.comp_code">
                        <option :value="null">全て</option>
                        <option v-for="item in master.companies" :key="item.comp_cd" :value="item.comp_cd">{{ item.comp_nm_short }}</option>
                    </select>
                </div>
                <div class="basis-[25%] d-flex align-items-center">
                    <label class="gap-2 label-text d-flex align-items-center">
                        <input type="checkbox" class="mt-0 form-check-input" v-model="search.is_finished">終了も表示
                    </label>
                </div>
            </div>
            <div class="gap-1 d-flex">
                <button type="button" class="btn default w-[6rem]" @click="resetSearch()">リセット</button>
                <button type="submit" class="btn w-[6rem]">検索</button>
            </div>
        </form>

        <div class="px-3">
            <div class="my-2 divider" style="height: 1px;"></div>
        </div>

        <div class="px-5 pb-4 d-flex flex-column input-gap">
            <div class="gap-3 d-flex">
                <div class="d-flex align-items-center w-[25%]">
                    <label class="label-text w-[7rem]">患者コード</label>
                    <input type="text" class="flex-1 text-center form-control" disabled :value="historySelected.patient_cd">
                    <input type="text" class="form-control w-[3rem] ms-1 text-center" disabled :value="historySelected.hist_no">
                </div>
                <div class="d-flex align-items-center w-[25%]">
                    <label class="label-text w-[6rem]">状態</label>
                    <input type="text" class="flex-1 text-center form-control" disabled :value="historySelected.status_text">
                </div>
                <div class="d-flex align-items-center w-[50%]">
                    <label class="label-text w-[6rem]">施設名</label>
                    <input type="text" class="flex-1 form-control" disabled :value="historySelected.fac_name">
                </div>
            </div>

            <div class="gap-3 d-flex">
                <div class="d-flex align-items-center w-[25%]">
                    <label class="label-text w-[7rem]">患者名</label>
                    <input type="text" class="flex-1 text-center form-control" disabled :value="historySelected.patient_kj">
                </div>
                <div class="d-flex align-items-center w-[25%]">
                    <label class="label-text w-[6rem]">性別</label>
                    <input type="text" class="flex-1 text-center form-control" disabled :value="historySelected.patient_sex_label">
                </div>
                <div class="d-flex w-[50%] gap-3">
                    <div class="d-flex align-items-center w-[50%]">
                        <label class="label-text w-[6rem]">診療科名</label>
                        <input type="text" class="flex-1 form-control" disabled :value="historySelected.des_clinic">
                    </div>
                    <div class="d-flex align-items-center w-[50%]">
                        <label class="label-text w-[8.5rem]">医師名</label>
                        <input type="text" class="flex-1 text-center form-control" disabled :value="historySelected.des_doctor">
                    </div>
                </div>
            </div>

            <div class="gap-3 d-flex">
                <div class="d-flex align-items-center w-[25%]">
                    <label class="label-text w-[7rem]">シリアルNo.</label>
                    <input type="text" class="flex-1 text-center form-control" disabled :value="historySelected.serial_no">
                </div>
                <div class="d-flex align-items-center w-[25%]">
                    <label class="label-text w-[6rem]">請求開始</label>
                    <Datepicker month-picker format="yyyy年MM月" class="flex-1" v-model="historySelected.invoice_start" disabled></Datepicker>
                </div>
                <div class="d-flex w-[50%] gap-3">
                    <div class="d-flex align-items-center w-[50%]">
                        <label class="label-text w-[6rem]">請求停止</label>
                        <Datepicker month-picker format="yyyy年MM月" class="flex-1" v-model="historySelected.invoice_finish" disabled></Datepicker>
                    </div>
                    <div class="d-flex align-items-center w-[50%]">
                        <label class="label-text w-[8.5rem]">到着(転院)日</label>
                        <Datepicker class="flex-1" v-model="historySelected.dateof_into" disabled></Datepicker>
                    </div>
                </div>
            </div>

            <div class="gap-3 d-flex">
                <div class="d-flex align-items-center w-[25%]">
                    <label class="label-text w-[7rem]">同意書開始日</label>
                    <Datepicker class="flex-1" v-model="historySelected.dateof_agree" disabled></Datepicker>
                </div>
                <div class="d-flex align-items-center w-[25%]">
                    <label class="label-text w-[6rem]">署名日</label>
                    <Datepicker class="flex-1" v-model="historySelected.dateof_signed" disabled></Datepicker>
                </div>
                <div class="d-flex w-[50%] gap-3">
                    <div class="d-flex align-items-center w-[50%]">
                        <label class="label-text w-[6rem]">更新日</label>
                        <Datepicker class="flex-1" v-model="historySelected.maker_ofdate" disabled></Datepicker>
                    </div>
                    <div class="d-flex align-items-center w-[50%]">
                        <label class="label-text w-[8.5rem]">アッヴィ使用開始</label>
                        <Datepicker class="flex-1" v-model="historySelected.dateof_start" disabled></Datepicker>
                    </div>
                </div>
            </div>
        </div>

        <div class="mb-1 d-flex align-items-center">
            <div class="col-2">
                
            </div>

            <div class="gap-2 col-8 d-flex justify-content-center align-items-center">
                <select class="form-select w-[6.5rem]" v-model="search.limit" @change="onChangeLimit()">
                    <option v-for="item  in  ROW_LIMITS" :value="item.id">{{ item.text }}</option>
                </select>

                <span v-if="result.total > 0">
                {{ number(result.total) }}件中{{ result.firstItem }}-{{ result.lastItem }}
                </span>

                <Pagination v-if="result.page_count > 1" v-model="search.page" class="mb-0" :page-count=" result.page_count " :click-handler="pagination"></Pagination>
            </div>

            <div class="col-2 d-flex align-items-center justify-content-end">
                
            </div>
        </div>

        <div class="px-3 wrapper-scroll" style="min-height: 30rem;">
            <div class="parent-scroll">
                <table class="view-scroll t-border">
                    <thead class="text-center">
                        <tr>
                            <th>
                                <SortHeader @sort="sort()" :search="search" :field="'patient_cd'">患者コード</SortHeader>
                            </th>
                            <th>
                                <SortHeader @sort="sort()" :search="search" :field="'hist_no'">No</SortHeader>
                            </th>
                            <th>
                                <SortHeader @sort="sort()" :search="search" :field="'patient_nm'">患者名</SortHeader>
                            </th>
                            <th>
                                <SortHeader @sort="sort()" :search="search" :field="'pump_code'">ポンプ</SortHeader>
                            </th>
                            <th>
                                <SortHeader @sort="sort()" :search="search" :field="'serial_no'">シリアルNo.</SortHeader>
                            </th>
                            <th>
                                <SortHeader @sort="sort()" :search="search" :field="'smd_code'">SMDコード</SortHeader>
                            </th>
                            <th>
                                <SortHeader @sort="sort()" :search="search" :field="'fac_name'">施設名</SortHeader>
                            </th>
                            <th>
                                <SortHeader @sort="sort()" :search="search" :field="'dep_name'">診療科名</SortHeader>
                            </th>
                            <th>
                                <!-- <SortHeader @sort="sort()" :search="search" :field="'des_doctor'">医師名</SortHeader> -->
                                医師名
                            </th>
                            <th>
                                <SortHeader @sort="sort()" :search="search" :field="'status'">状態</SortHeader>
                            </th>
                            <th>
                                <SortHeader @sort="sort()" :search="search" :field="'invoice_start'">請求開始</SortHeader>
                            </th>
                            <th>
                                <SortHeader @sort="sort()" :search="search" :field="'invoice_finish'">請求停止</SortHeader>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="his in histories" @click="setHistorySelected(his)" :class="{'selected': historySelected.patient_cd == his.patient_cd}">
                            <td class="text-center nowrap">{{ his.patient_cd }}</td>
                            <td class="text-center nowrap">{{ his.hist_no }}</td>
                            <td class="text-center nowrap">{{ his.patient_nm }}</td>
                            <td class="text-center nowrap">{{ his.pump_code }}</td>
                            <td class="text-center nowrap">{{ his.serial_no }}</td>
                            <td class="text-center nowrap">{{ his.smd_code }}</td>
                            <td class="">{{ his.fac_name }}</td>
                            <td class="">{{ his.pumpFacility?.dep_name }}</td>
                            <td class="">{{ his.des_doctor }}</td>
                            <td class="text-center nowrap" :class=" { 'text-primary': his.status == HISTORY_STATUS_ACTIVE } ">{{ his.status_text }}</td>
                            <td class="text-center nowrap">{{ displayDate(his.invoice_start, '-', 'YYYY年MM月') }}</td>
                            <td class="text-center nowrap">{{ displayDate(his.invoice_finish, '-', 'YYYY年MM月') }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="px-3 py-3 d-flex justify-content-around">
            <button class="btn default w-[8rem]" @click="onClose()">閉じる</button>
            <button class="btn w-[8rem]" @click="submit()" :disabled="!historySelected.patient_cd">売上伝票追加</button>
        </div>

    </ModalLayout>

    <ConfirmModal ref="confirmDialog"></ConfirmModal>
</template>
<style scoped>
button.btn {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.375rem 0.75rem;
}
.parent {
    position: relative;
    width: fit-content;
    margin: 0 auto;
}
.lb-input {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-0.5rem, -52%);
}
</style>
<script setup>
import { mapState, mapActions } from 'vuex'
import ModalLayout from '@/components/layout/modal/ModalLayout.vue'
import Pagination from "@/components/Pagination.vue"
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue"
import SortHeader from "@/components/Sort.vue"
import { ROW_LIMITS, HISTORY_STATUS_ACTIVE } from "@/components/Constants.vue"
import { typeText, formatBeforeRequest, timeToString, displayDate, number, deepClone, formatPatientHistory, dateToMonth } from '@/helper.js'
import jp from '@/lang/jp.json'
</script>
<script>
export default {
    props: ['show'],
    emits: ['close', 'reload'],
    data: function () {
        return {
            search: {
                page: 1,
                limit: 100,
                sort: 'patient_cd',
                sort_by: 'asc',
                pump_code: 'A',
                comp_code: null,
                search_fac_name: null,
                is_finished: false,
            },
            result: {},
            histories: [],
            historySelected: {}
        }
    },
    computed: {
        ...mapState({
            master: state => state.invoice.master,
        }),
    },
    methods: {
        ...mapActions('invoice', ['getInvoicePlusHistories', 'invoicePlus']),
        onClose: function () {
            this.$emit('close')
        },
        submit: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: jp.confirm,
                message: jp.confirm_add_invoice_plus
            })
            if(ok) {
                await this.$refs.confirmDialog.close()

                let payload = {patient_cd: this.historySelected.patient_cd, hist_no: this.historySelected.hist_no}
                await this.invoicePlus(payload).then((res) => {
                    if(res && res.code == 200) {
                        this.$emit('reload')
                    }
                })
            }
        },
        onChangeLimit: async function () {
            if (this.search.limit <= this.result.total || this.result.total > this.result.limit) {
                this.search.page = 1
                this.loadIndexData()
            }
        },
        pagination: function (page) {
            this.search.page = page
            this.loadIndexData()
        },
        loadIndexData: async function () {
            await this.getInvoicePlusHistories(formatBeforeRequest(this.search)).then((res) => {
                if (res && res.code == 200) {
                    this.result = res.data
                    this.histories = res.data.data
                    if(this.histories.length > 0) {
                        this.setHistorySelected(this.histories[0])
                    } else {
                        this.setHistorySelected({})
                    }
                }
            })
        },
        submitSearch: async function () {
            this.search.page = 1
            this.loadIndexData()
        },
        resetSearch: async function () {
            this.initSearch()
            this.loadIndexData()
        },
        sort: function () {
            if(this.result.total > 0) {
                this.search.page = 1
                this.loadIndexData()
            }
        },
        initSearch: function () {
            this.search = {
                page: 1,
                limit: 100,
                sort: 'patient_cd',
                sort_by: 'asc',
                pump_code: 'A',
                comp_code: null,
                search_fac_name: null,
                is_finished: false,
            }
        },
        setHistorySelected: function (history) {
            this.historySelected = {...history}
            this.historySelected.invoice_start = dateToMonth(this.historySelected.invoice_start)
            this.historySelected.invoice_finish = dateToMonth(this.historySelected.invoice_finish)
            console.log(this.historySelected)
        }
    },
    created: async function () {
        await this.loadIndexData()
    },
}
</script>
