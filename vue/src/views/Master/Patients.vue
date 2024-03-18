<template>
    <div class="p-2 wrapper-scroll transit">
        <form class="gap-3 mb-3 d-flex" @submit.prevent="submitSearch()">
            <div class="flex-1 d-grid input-gap">
                <div class="flex-1 gap-3 d-flex">
                    <div class="d-flex gap-2 basis-[35%]">
                        <div class="d-flex align-items-center basis-[45%]">
                            <label class="w-[5.5rem] label-text">患者コード</label>
                            <input type="text" class="flex-1 form-control" v-model="search.search_patient_code">
                        </div>
                        <div class="d-flex align-items-center basis-[55%]">
                            <label class="w-[4rem] label-text">患者名</label>
                            <input type="text" class="flex-1 form-control" v-model="search.search_patient_name">
                        </div>
                    </div>

                    <div class="d-flex align-items-center basis-[25%]">
                        <label class="w-[7rem] label-text">シリアルNo.</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_serial_number">
                    </div>

                    <div class="d-flex gap-3 basis-[40%]">
                        <div class="d-flex align-items-center basis-[40%]">
                            <label class="w-[4rem] label-text">状態</label>
                            <select class="flex-1 form-select" v-model="search.status">
                                <option :value="null">全て</option>
                                <option v-for="status in master.status" :value="status.id">{{ status.value }}</option>
                            </select>
                        </div>
                        <div class="d-flex align-items-center basis-[60%]">
                            <label class="w-[4rem] label-text">ポンプ</label>
                            <select class="flex-1 form-select" v-model="search.pump_code" @change="setPumpCode()">
                                <option :value="null">全て</option>
                                <option v-for="machine in master.machines" :value="machine.pump_cd">{{
                                    '[' + machine.pump_cd + ']' + machine.pump_nm_short }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="flex-1 gap-3 d-flex">
                    <div class="d-flex align-items-center basis-[35%]">
                        <label class="w-[7.5rem] label-text">施設名・コード</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_fac_name">
                    </div>

                    <div class="d-flex align-items-center basis-[25%]">
                        <label class="w-[7rem] label-text">診療科・医師</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_des_clinic_doctor">
                    </div>

                    <div class="d-flex gap-3 basis-[40%]">
                        <div class="d-flex align-items-center basis-[38%] gap-3">
                            <label class="gap-1 label-text d-flex align-items-center">
                                <input type="radio" class="mt-0 form-check-input" name="invoice" :value="false" checked
                                    v-model="search.is_invoice_finish">請求開始
                            </label>
                            <label class="gap-1 label-text d-flex align-items-center">
                                <input type="radio" class="mt-0 form-check-input" name="invoice" :value="true"
                                    v-model="search.is_invoice_finish">請求停止
                            </label>
                        </div>
                        <div class="d-flex align-items-center basis-[62%]">
                            <Datepicker month-picker format="yyyy年MM月" v-model="search.invoice_from"></Datepicker>
                            <span class="px-3 fs-4">~</span>
                            <Datepicker month-picker format="yyyy年MM月" v-model="search.invoice_to"></Datepicker>
                        </div>
                    </div>
                </div>
            </div>

        <div class="d-grid input-gap">
                <button type="button" class="btn default w-[6rem]" @click="resetSearch(); submitSearch();">リセット</button>
                <button type="submit" class="btn w-[6rem]">検索</button>
            </div>
        </form>

        <div class="mb-1 d-flex align-items-center">
            <div class="col-2">
                <button type="button" class="btn w-[8rem]" @click="openPatientRegistration()">新規登録</button>
            </div>

            <div class="gap-2 col-8 d-flex justify-content-center align-items-center">
                <select class="form-select w-[6.5rem]" v-model=" search.limit " @change=" onChangeLimit() ">
                    <option v-for=" item  in  ROW_LIMITS " :value=" item.id ">{{ item.text }}</option>
                </select>

                <span v-if=" patient_history.total > 0 ">{{ number(patient_history.total) }}件中{{ patient_history.firstItem
                    }}-{{ patient_history.lastItem }}</span>

                <Pagination v-if=" patient_history.page_count > 1 " v-model=" search.page " class="mb-0"
                    :page-count=" patient_history.page_count " :click-handler=" pagination "></Pagination>
            </div>

            <div class="col-2 d-flex align-items-center justify-content-end">
                <button type="button" class="btn default w-[7rem]" @click=" exportPatient(search) ">一覧出力</button>
            </div>
        </div>

        <div class="parent-scroll">
            <table class="view-scroll t-border">
                <thead class="text-center">
                    <tr>
                        <th class="">
                            <SortHeader @sort=" sort() " :search=" search " :field=" 'patient_cd' ">患者コード</SortHeader>
                        </th>
                        <th class="w-[3%]">
                            <SortHeader @sort=" sort() " :search=" search " :field=" 'count(*)' ">No</SortHeader>
                        </th>
                        <th class="w-[6%]">カルテ番号</th>
                        <th class="">
                            <SortHeader @sort=" sort() " :search=" search " :field=" 'patient_nm' ">患者名</SortHeader>
                        </th>
                        <th class="">
                            <SortHeader @sort=" sort() " :search=" search " :field=" 'pump_code' ">ポンプ</SortHeader>
                        </th>
                        <th class="">
                            <SortHeader @sort=" sort() " :search=" search " :field=" 'serial_no' ">シリアルNo.</SortHeader>
                        </th>
                        <th class="">
                            <SortHeader @sort=" sort() " :search=" search " :field=" 'smd_code' ">SMDコード</SortHeader>
                        </th>
                        <th class="">
                            <SortHeader @sort=" sort() " :search=" search " :field=" 'fac_name' ">施設名</SortHeader>
                        </th>
                        <th class="">
                            <SortHeader @sort=" sort() " :search=" search " :field=" 'des_clinic' ">診療科名</SortHeader>
                        </th>
                        <th class="">医師名</th>
                        <th class="w-[3%]">状態</th>
                        <th class="w-[7%]">請求開始</th>
                        <th class="w-[7%]">請求停止</th>
                        <th class="w-[3%]">詳細</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if=" patient_history.total > 0 ">
                        <template v-for="( patient, i ) in  patient_history.data " :key="patient.patient_cd">
                            <template v-if=" patient.histories.length > 0 ">
                                <template v-if=" patient.open ">
                                    <tr v-for="( history, index ) in  patient.histories " :key=" history.storeout_key ">
                                        <td class="text-center align-top" :rowspan=" patient.histories.length "
                                            v-if=" index == 0 ">
                                            <a href="javascript:void(0)" @click=" openHistory(i) ">-{{ patient.patient_cd
                                                }}</a>
                                        </td>
                                        <td class="text-center row-span">{{ history.hist_no }}</td>
                                        <td class="text-center"
                                            :class=" { 'text-disable': history.medical_record_text == SIMILAR } ">
                                            {{ history.medical_record_text }}
                                        </td>
                                        <td class="text-center"
                                            :class=" { 'text-disable': history.patient_nm_text == SIMILAR } ">
                                            {{ history.patient_nm_text }}
                                        </td>
                                        <td class="text-center"
                                            :class=" { 'text-disable': history.pump_code_text == SIMILAR } ">
                                            {{ history.pump_code_text }}
                                        </td>
                                        <td class="text-center">{{ history.serial_no }}</td>
                                        <td class="text-center" :class=" { 'text-disable': history.smd_code_text == SIMILAR } ">
                                            {{ history.smd_code_text }}
                                        </td>
                                        <td :class=" { 'text-disable': history.fac_name_text == SIMILAR } ">
                                            {{ history.fac_name_text }}
                                        </td>
                                        <td :class=" { 'text-disable': history.des_clinic_text == SIMILAR } ">
                                            {{ history.des_clinic_text }}
                                        </td>
                                        <td class="text-center"
                                            :class=" { 'text-disable': history.des_doctor_text == SIMILAR } ">
                                            {{ history.des_doctor_text }}
                                        </td>
                                        <td class="text-center"
                                            :class=" { 'text-primary': history.status == HISTORY_STATUS_ACTIVE } ">{{
                                            history.status_text }}</td>
                                        <td class="text-center">{{ history.invoice_start ?
                                            moment(history.invoice_start).format('YYYY年MM月') : '' }}</td>
                                        <td class="text-center">{{ history.invoice_finish ?
                                            moment(history.invoice_finish).format('YYYY年MM月') : '' }}</td>
                                        <td class="text-center">
                                            <button class="btn default sm"
                                                @click=" openPatientDetail(patient.patient_id, index) ">詳細</button>
                                        </td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr v-if=" patient.histories[0] ">
                                        <td class="text-center nowrap">
                                            <a href="javascript:void(0)" @click=" openHistory(i) ">+{{ patient.patient_cd
                                                }}</a>
                                        </td>
                                        <td class="text-center">{{ patient.histories[0].hist_no }}</td>
                                        <td class="text-center">{{ patient.histories[0].medical_record }}</td>
                                        <td class="text-center nowrap">{{ patient.histories[0].patient_nm }}</td>
                                        <td class="text-center">{{ patient.histories[0].pump_code }}</td>
                                        <td class="text-center nowrap">{{ patient.histories[0].serial_no }}</td>
                                        <td class="text-center nowrap">{{ patient.histories[0].smd_code }}</td>
                                        <td>{{ patient.histories[0].fac_name }}</td>
                                        <td>{{ patient.histories[0].des_clinic }}</td>
                                        <td class="text-center">{{ patient.histories[0].des_doctor }}</td>
                                        <td class="text-center"
                                            :class=" { 'text-primary': patient.histories[0].status == HISTORY_STATUS_ACTIVE } ">
                                            {{ patient.histories[0].status_text }}</td>
                                        <td class="text-center nowrap">{{ patient.histories[0].invoice_start ?
                                            moment(patient.histories[0].invoice_start).format('YYYY年MM月') : '' }}</td>
                                        <td class="text-center nowrap">{{ patient.histories[0].invoice_finish ?
                                            moment(patient.histories[0].invoice_finish).format('YYYY年MM月') : '' }}</td>
                                        <td class="text-center">
                                            <button class="btn default sm"
                                                @click=" openPatientDetail(patient.patient_id, 0) ">詳細</button>
                                        </td>
                                    </tr>
                                </template>
                            </template>
                            <template v-else>
                                <tr>
                                    <td class="text-center">
                                        <a href="javascript:void(0)" @click=" openHistory(i) ">{{ patient.open ? '-' : '+'
                                            }}{{ patient.patient_cd }}</a>
                                    </td>
                                    <td v-for=" i  in  12 "></td>
                                    <td class="text-center">
                                        <button class="btn default sm"
                                            @click=" openPatientDetail(patient.patient_id, null) ">詳細</button>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="15" class="">結果が得られませんでした。</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>

    <PatientRegistrationModal v-if=" isOpenPatientRegistration " :show=" isOpenPatientRegistration " @saved=" insertedPatient() "
        @close=" isOpenPatientRegistration = false "></PatientRegistrationModal>
    <PatientDetailModal v-if=" isOpenPatientDetail " :show=" isOpenPatientDetail " @close=" closeDetail($event) "
        :patient=" patient_detail "></PatientDetailModal>
</template>

<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
import moment from 'moment';
import Pagination from "@/components/Pagination.vue";
import PatientRegistrationModal from "./modal/PatientRegistrationModal.vue";
import PatientDetailModal from "./modal/PatientDetailModal.vue";
import SortHeader from "@/components/Sort.vue";
import { ROW_LIMITS, SIMILAR, HISTORY_STATUS_ACTIVE } from "@/components/Constants.vue";
import { monthToDate, formatPatientHistory, number } from '@/helper.js';
</script>
<script>
export default {
    watch: {
    },
    data: function () {
        return {
            isOpenPatientRegistration: false,
            isOpenPatientDetail: false,
            patient_history: {},
            patient_detail: null,
            history_index: null,
        }
    },
    computed: {
        ...mapState({
            master: state => state.patient.master,
            search: state => state.patient.search
        }),
    },
    methods: {
        ...mapActions('patient', ['getMasterPatient', 'getIndexPatientHistory', 'showPatientHistory', 'exportPatient']),
        ...mapMutations('patient', ['setSearchSubmit', 'resetSearch', 'setSearchProperty']),
        openPatientRegistration: function () {
            this.isOpenPatientRegistration = true
        },
        insertedPatient: function () {
            this.isOpenPatientRegistration = false;
            this.resetSearch();
            this.setSearchProperty({ sort: 'patient_cd', sort_by: 'desc', page: 1 });
            this.search.pump_code = this.$store.state.pump_code
            this.loadIndexData();
        },
        openPatientDetail: async function (patient_id, index) {
            await this.showPatientHistory(patient_id).then((res) => {
                if (res && res.code == 200) {
                    this.patient_detail = formatPatientHistory(res.data);
                    this.patient_detail.history_index = index;
                }
            })
            this.isOpenPatientDetail = true;
        },
        closeDetail: async function (event) {
            this.isOpenPatientDetail = false;
            if (event) {
                this.loadIndexData(event);
            }
        },
        loadIndexData: async function (open = null) {
            let payload = { ...this.search };
            if (payload.invoice_from) {
                payload.invoice_from = monthToDate(payload.invoice_from);
            }
            if (payload.invoice_to) {
                payload.invoice_to = monthToDate(payload.invoice_to, true);
            }
            await this.getIndexPatientHistory(payload).then((res) => {
                if (res && res.code == 200) {
                    this.patient_history = res.data;
                    this.patient_history.data = this.patient_history.data.map(patient => {
                        patient = formatPatientHistory(patient);
                        patient.open = false;
                        if (patient.patient_cd == open) {
                            patient.open = true;
                        }
                        return patient;
                    })
                }
            })
        },
        submitSearch: function () {
            this.setSearchSubmit();
            this.loadIndexData();
            this.setPumpCode()
        },
        pagination: function (page) {
            this.search.page = page;
            this.loadIndexData();
        },
        onChangeLimit: function () {
            if (this.search.limit <= this.patient_history.total
                || this.patient_history.total > this.patient_history.limit) {
                this.search.page = 1;
                this.loadIndexData();
            }
        },
        sort: function () {
            if (this.patient_history.total > 0) {
                this.search.page = 1;
                this.loadIndexData();
            }
        },
        openHistory: function (index) {
            this.patient_history.data[index].open = !this.patient_history.data[index].open;
        },
        setPumpCode: function () {
            this.$store.state.pump_code = this.search.pump_code
        }
    },
    created: function () {
        this.getMasterPatient();
        this.search.pump_code = this.$store.state.pump_code
    },
    mounted: function () {
        this.loadIndexData();
    },
    unmounted: function () {
        this.search.sort = null
    }
}
</script>