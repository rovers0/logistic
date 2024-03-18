<template>
    <div class="p-2 wrapper-scroll transit">
        <form class="gap-5 d-flex" @submit.prevent="submitSearch()">
            <div class="flex-1 d-flex flex-column input-gap">
                <!-- row1 -->
                <div class="gap-3 d-flex">
                    <div class="d-flex align-items-center basis-[25%]">
                        <label class="w-[5rem] label-text">ポンプ</label>
                        <select class="flex-1 form-select" v-model="search.pump_code" @change="setPumpCode()">
                            <option :value="null">全て</option>
                            <option v-for="mc in master.machines" :value="mc.pump_cd">{{ '['+mc.pump_cd+'] '+mc.pump_nm_short }}</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center basis-[40%]">
                        <label class="w-[5.5rem] label-text">請求年月</label>
                        <div class="flex-1 gap-1 d-flex align-items-center">
                            <button type="button" class="gap-2 btn default fw-bold d-flex align-items-center" @click="changeDataSet()"><span class="icon-pre"></span></button>
                            <Datepicker month-picker format="yyyy年MM月" class="flex-1" v-model="search.dataset" :clearable="false"></Datepicker>
                            <button type="button" class="gap-2 btn default fw-bold d-flex align-items-center" @click="changeDataSet(true)"><span class="icon-next"></span></button>
                        </div>
                    </div>
                    <div class="d-flex align-items-center w-[35%]">
                        <label class="w-[2rem] label-text">卸</label>
                        <select class="flex-1 form-select" v-model="search.comp_code">
                            <option :value="null">全て</option>
                            <option v-for="item in master.companies" :key="item.comp_cd" :value="item.comp_cd">{{ item.comp_nm_short }}</option>
                        </select>
                    </div>
                </div>
                <!-- row2 -->
                <div class="gap-3 d-flex">
                    <div class="d-flex align-items-center basis-[25%]">
                        <label class="label-text w-[5rem]">施設名</label>
                        <input type="text" class="flex-1 form-control" v-model="search.fac_name">
                    </div>
                    <div class="d-flex align-items-center basis-[15%]">
                        <label class="w-[5.5rem] label-text">分類</label>
                        <select class="flex-1 form-select" v-model="search.invoice_type">
                            <option :value="null">全て</option>
                            <option v-for="mc in master.invoice_type" :value="mc.id">{{ mc.value }}</option>
                        </select>
                    </div>
                    <div class="d-flex basis-[60%] gap-3">
                        <div class="d-flex align-items-center">
                            <label class="w-[6rem] label-text">データ種別</label>
                            <div class="gap-3 d-flex">
                                <label class="gap-2 d-flex align-items-center">
                                    <input type="radio" name="status_list" class="mt-0 form-check-input" :value="0" v-model="search.hasStatus" @change="onChangeHasStatus()">全て
                                </label>
                                <label class="gap-2 d-flex align-items-center">
                                    <input type="radio" name="status_list" class="mt-0 form-check-input" :value="1" v-model="search.hasStatus" @change="onChangeHasStatus()">特定状態
                                </label>
                            </div>
                        </div>
                        <div class="flex-1 gap-3 d-flex align-items-center">
                            <label class="gap-2 label-text d-flex align-items-center" v-for="sts in status_list">
                                <input type="checkbox" class="mt-0 form-check-input" :disabled="!search.hasStatus" :value="sts.id" v-model="search.hist_status">{{ sts.value1 }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-[7rem] d-flex flex-column input-gap">
                <button type="button" class="btn default" @click="resetSearch(); submitSearch();">リセット</button>
                <button type="submit" class="btn">検索</button>
            </div>
        </form>

        <div class="mt-3 w-[90%] mx-auto d-flex gap-2">
            <button class="btn selection" @click="createInvoice()">当月請求<br>データ作成</button>
            <table class="flex-1 table mb-0 table-bordered border-color">
                <tbody class="text-center">
                    <tr class="bg-light-blue fw-bold fs-3">
                        <td>総件数</td>
                        <td v-for="sts in status_list">{{ sts.value2 }}</td>
                        <td>請求対象</td>
                    </tr>
                    <tr class="flex-td">
                        <td class="text-center fw-bold bg-light-blue">{{ indexRes.report?.['total'] ?? '0' }}</td>
                        <td class="text-center" v-for="sts in status_list">{{ indexRes.report?.[sts.id] ?? '0' }}</td>
                        <td class="text-center fw-bold">{{ indexRes.report?.['can_pay'] ?? '0' }}件</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mt-3 mb-1 d-flex align-items-center">
            <div class="gap-2 col-3 d-flex">
                <button class="btn default" @click="addNegative()" :disabled="ids.length == 0">マイナス伝票</button>
                <button class="btn default" @click="openInvoicePlusModal()">売上伝票追加</button>
            </div>

            <div class="gap-2 col-6 d-flex justify-content-center align-items-center">
                <span v-if="indexRes.total > 0">{{ number(indexRes.total) }}件</span>

                <!-- <Pagination v-if="indexRes.page_count > 1" v-model="search.page" class="mb-0" :page-count=" indexRes.page_count " :click-handler="pagination"></Pagination> -->
            </div>

            <div class="col-3 d-flex align-items-center justify-content-end">
                <!-- <div class="gap-3 d-flex">
                    <label class="gap-2 d-flex align-items-center">
                        <input type="radio" name="invoice_type" class="mt-0 form-check-input" :value="null" v-model="search.invoice_type">全て
                    </label>
                    <label class="gap-2 d-flex align-items-center">
                        <input type="radio" name="invoice_type" class="mt-0 form-check-input" :value="0" v-model="search.invoice_type">売上
                    </label>
                    <label class="gap-2 d-flex align-items-center">
                        <input type="radio" name="invoice_type" class="mt-0 form-check-input" :value="1" v-model="search.invoice_type">取消
                    </label>
                </div> -->
            </div>
        </div>

        <div class="parent-scroll">
            <table class="view-scroll t-border">
                <thead class="text-center">
                    <tr>
                        <th class="w-[3%]">
                            <input type="checkbox" class="form-check-input" @click="checkAll()" :checked="isCheckAll">
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'patient_cd'">患者(履歴)</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'patient_nm'">患者名</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'pump_code'">ポンプ</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'serial_no'">シリアルNo</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'hist_status'">状態</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'invoice_start'">開始月</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'invoice_finish'">終了月</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'smd_code'">SMDコード</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'jd_code'">JDコード</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'comp_code'">卸</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'fac_name'">得意先名</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'invoice_type'">分類</SortHeader>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="invoice in invoiceList">
                        <td class="text-center">
                            <input type="checkbox" class="form-check-input" v-model="ids" :value="invoice.id" :disabled="invoice.invoice_type == 1">
                        </td>
                        <td class="text-center nowrap">
                            <a href="javascript:void(0)" @click="openPatientDetail(invoice.patient.patient_id, invoice.hist_no_before)">{{ invoice.patient_cd }}</a>
                        </td>
                        <td class="text-center nowrap">{{ invoice.patientHistory?.patient_nm }}</td>
                        <td class="text-center nowrap">{{ invoice.pump_code }}</td>
                        <td class="text-center nowrap">{{ invoice.serial_no }}</td>
                        <td class="text-center nowrap">{{ invoice.hist_status_label }}</td>
                        <td class="text-center nowrap">{{ displayDate(invoice.patientHistory?.invoice_start, '-', 'YYYY年MM月') }}</td>
                        <td class="text-center nowrap">{{ displayDate(invoice.patientHistory?.invoice_finish, '-', 'YYYY年MM月') }}</td>
                        <td class="text-center nowrap">{{ invoice.smd_code }}</td>
                        <td class="text-center nowrap">{{ invoice.jd_code }}</td>
                        <td class="">{{ invoice.comp_name }}</td>
                        <td class="">{{ invoice.fac_name }}</td>
                        <td class="text-center nowrap" :class="{'text-danger': invoice.invoice_type == 1}">{{ invoice.invoice_type_label }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <ConfirmModal ref="confirmDialog"></ConfirmModal>

    <PatientDetailModal v-if="isOpenPatientDetail"
        :show="isOpenPatientDetail"
        @close="closeDetail($event)"
        :patient="patient_detail"></PatientDetailModal>

    <InvoicePlusModal  v-if="isOpenInvoicePlusModal"
        :show="isOpenInvoicePlusModal"
        @close="isOpenInvoicePlusModal = false"
        @reload="reloadAfterPlus()"></InvoicePlusModal>
</template>
<style scoped>
    tr>td {
        vertical-align: middle;
        white-space: nowrap;
    }
    .flex-td>td>div {
        display: flex;
        align-items: center;
        gap: 0.2rem;
    }

    .icon-pre::before {
        font-size: 1.2rem;
    }
    .icon-pre {
        line-height: 1.54;
    }
    .icon-next::before {
        font-size: 1.2rem;
    }
    .icon-next {
        line-height: 1.54;
    }
</style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex"
import Pagination from "@/components/Pagination.vue"
import SortHeader from "@/components/Sort.vue"
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue"
import PatientDetailModal from "@/views/Master/modal/PatientDetailModal.vue"
import InvoicePlusModal from "@/views/Payment/modal/InvoicePlusModal.vue"
import { typeText, formatBeforeRequest, timeToString, displayDate, number, deepClone, formatPatientHistory } from '@/helper.js'
import jp from '@/lang/jp.json'
import moment from "moment"
</script>
<script>
export default {
    data: function () {
        return {
            isOpenPatientDetail: false,
            isOpenInvoicePlusModal: false,
            status_list: [
                {id: 1, value1: '通常', value2: '通常件数'},
                {id: 0, value1: '新規', value2: '新規件数'},
                {id: 2, value1: '転院', value2: '転院件数'},
                {id: 3, value1: '故障', value2: '故障件数'},
                {id: 6, value1: '定期', value2: '定期交換'},
                {id: 4, value1: '中断', value2: '中断件数'},
                {id: 5, value1: '中止', value2: '中止件数'},
            ],
            invoiceList: [],
            indexRes: {},
            ids: [],
            isCheckAll: false,
            patient_detail: null
        };
    },
    computed: {
        ...mapState({
            master: state => state.invoice.master,
            search: state => state.invoice.search
        }),
    },
    methods: {
        ...mapActions('patient', ['showPatientHistory']),
        ...mapActions('invoice', ['getMasterInvoice', 'getIndexInvoice', 'storeInvoice', 'invoiceMinus']),
        ...mapActions('achievement', ['getIndexPatientHistories']),
        ...mapMutations('invoice', ['resetSearch']),
        pagination: async function (page) {
            this.search.page = page
            this.searchInvoiceIndex()
        },
        sort: async function () {
            if(this.invoiceList.length > 0) {
                this.search.page = 1
                await this.searchInvoiceIndex()
            }
        },
        createInvoice: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: jp.confirm,
                message: jp.confirm_create_invoice
            })
            if(ok) {
                await this.$refs.confirmDialog.close()
                await this.storeInvoice().then((res) => {
                    if(res && res.code == 200) {
                        this.$refs.confirmDialog.show({
                            title: jp.notification_title,
                            message: res.data.result+'件',
                            type: 1
                        })
                        this.search.pump_code = null
                        this.searchInvoiceIndex()
                    }
                })
            }
        },
        searchInvoiceIndex: async function () {
            let payload = {...this.search}
            let month = payload.dataset.month + 1
            payload.dataset = payload.dataset.year+''+(month.toString().padStart(2, '0'))
            await this.getIndexInvoice(formatBeforeRequest(payload)).then((res) => {
                if(res && res.code == 200) {
                    this.invoiceList = res.data.data
                    this.indexRes = res.data
                }
            })
        },
        setPumpCode: function () {
            // this.$store.state.pump_code = this.search.pump_code
        },
        submitSearch: async function () {
            await this.searchInvoiceIndex()
            this.setPumpCode()
        },
        onChangeHasStatus: function () {
            if(!this.search.hasStatus) {
                this.search.hist_status = []
            }
        },
        checkAll: function () {
            this.ids = []
            this.isCheckAll = !this.isCheckAll
            if(this.isCheckAll) {
                this.ids = this.invoiceList.map(item => item.id)
            }
        },
        changeDataSet: function (isNext = false) {
            let plus = 1
            if(!isNext) {
                plus = -1
            }

            let data = {month: this.search.dataset.month, year: this.search.dataset.year}
            data.month = data.month + plus
            
            if(data.month == 12) {
                data.month = 1
                data.year = data.year + 1
            }

            if(data.month == -1) {
                data.month = 11
                data.year = data.year - 1
            }
            this.search.dataset = data
        },
        addNegative: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: jp.confirm_add_negative_title,
                message: jp.confirm_add_negative_message,
                ok_class: '',
                cancelButton: 'キャンセル'
            })

            if(ok) {
                await this.$refs.confirmDialog.close()
                let payload = {ids: this.ids}
                await this.invoiceMinus(formatBeforeRequest(payload)).then((res) => {
                    if (res && res.code == 200) {
                        this.search.dataset = this.getDatasetToday()
                        this.searchInvoiceIndex()
                    }
                })
            }
        },
        openPatientDetail: async function (patient_id, hist_no) {
            await this.showPatientHistory(patient_id).then((res) => {
                if (res && res.code == 200) {
                    this.patient_detail = formatPatientHistory(res.data)
                    let index = 0
                    res.data.histories.forEach((value, i) => {
                        if(value.hist_no == hist_no) index = i
                    })
                    this.patient_detail.history_index = index
                }
            })
            this.isOpenPatientDetail = true
        },
        closeDetail: async function (event) {
            this.isOpenPatientDetail = false
            if (event) {
                this.searchInvoiceIndex()
            }
        },
        getDatasetToday: function () {
            let today = new Date()
            return {year: today.getFullYear(), month: today.getMonth()}
        },
        openInvoicePlusModal: async function () {
            this.isOpenInvoicePlusModal = true
        },
        reloadAfterPlus: async function () {
            this.isOpenInvoicePlusModal = false
            this.resetSearch()
            this.searchInvoiceIndex()
        }
    },
    created: async function () {
        this.getMasterInvoice()
        this.search.pump_code = null
        this.search.sort = null
        this.search.dataset = this.getDatasetToday()
        this.searchInvoiceIndex()
    }
}
</script>