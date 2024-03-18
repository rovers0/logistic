<template>
    <div class="p-2 wrapper-scroll transit">
        <div class="w-[90%] mx-auto">
            <div class="d-flex">
                <div class="gap-2 col-4 d-flex">
                    <button class="btn action">請求データ確定</button>
                </div>
                <div class="col-4 d-flex align-items-center justify-content-center">
                    <div class="gap-2 d-flex">
                        <label class="label-text">請求年月</label>
                        <div class="flex-1 gap-1 d-flex align-items-center">
                            <button type="button" class="gap-2 btn default fw-bold d-flex align-items-center" @click="changeDataSet()"><span class="icon-pre"></span></button>
                            <Datepicker month-picker format="yyyy年MM月" class="flex-1" v-model="search.dataset" :clearable="false" @update:modelValue="updateDataset()"></Datepicker>
                            <button type="button" class="gap-2 btn default fw-bold d-flex align-items-center" @click="changeDataSet(true)"><span class="icon-next"></span></button>
                        </div>
                    </div>
                </div>
                <div class="gap-2 col-4 d-flex justify-content-end">
                    <button class="btn default">請求書一括出力</button>
                    <button class="btn default">仕切書一括出力</button>
                </div>
            </div>

            <div class="mt-1 parent-scroll">
                <table class="view-scroll t-border">
                    <thead class="text-center">
                        <tr>
                            <th>卸コード</th>
                            <th>JDコード</th>
                            <th>卸名</th>
                            <th>ポンプA</th>
                            <th>ポンプB</th>
                            <th>ポンプC</th>
                            <th>ポンプD</th>
                            <th>合計</th>
                            <th>出力日時</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="rp in companyReport">
                            <td class="text-center nowrap">{{ rp.comp_code }}</td>
                            <td class="text-center nowrap">{{ rp.jd_code }}</td>
                            <td class="">{{ rp.comp_name }}</td>
                            <td class="text-end nowrap">{{ rp.report?.PUMP_A }}</td>
                            <td class="text-center nowrap">{{ rp.report?.PUMP_B }}</td>
                            <td class="text-center nowrap">{{ rp.report?.PUMP_C }}</td>
                            <td class="text-center nowrap">{{ rp.report?.PUMP_D }}</td>
                            <td class="text-end nowrap">{{ rp.report?.TOTAL }}</td>
                            <td class="text-center nowrap">{{ displayDate(rp.output_at, '-', 'YYYY/MM/DD HH:MM') }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="mt-3 mb-1 d-flex align-items-center">
            <div class="gap-2 col-3 d-flex">
                <button class="btn default">施設明細出力</button>
            </div>

            <div class="gap-2 col-6 d-flex justify-content-center align-items-center">
                <!-- <span v-if=" patient_history.total > 0 ">{{ number(patient_history.total) }}件中{{ patient_history.firstItem
                    }}-{{ patient_history.lastItem }}</span> -->
                <span>{{ facilityReport.length }}件中</span>

                <!-- <Pagination v-if=" patient_history.page_count > 1 " v-model=" search.page " class="mb-0" :page-count=" patient_history.page_count " :click-handler="pagination"></Pagination> -->
            </div>

            <div class="col-3 d-flex align-items-center justify-content-end">
                <!-- <button class="btn default">一覧出力</button> -->
            </div>
        </div>
        
        <div class="parent-scroll">
            <table class="view-scroll t-border">
                <thead class="text-center">
                    <tr>
                        <th class="w-[3%]">
                            <!-- <input type="checkbox" class="form-check-input" @click="checkAll()" :checked="isCheckAll"> -->
                            <input type="checkbox" class="form-check-input">
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'smd_code'">SMDコード</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'dcf_code'">DCFコード</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'fac_name'">施設名</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'customer_cd'">得意先コード</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'jd_code'">JDコード</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'comp_code'">卸名</SortHeader>
                        </th>
                        <th>
                            A個数
                        </th>
                        <th>
                            B個数
                        </th>
                        <th>
                            C個数
                        </th>
                        <th>
                            D個数
                        </th>
                        <th>
                            分類
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="facility in facilityReport">
                        <td class="text-center">
                            <!-- <input type="checkbox" class="form-check-input" v-model="ids" :value="rent.id"> -->
                            <input type="checkbox" class="form-check-input">
                        </td>
                        <td class="text-center nowrap">{{ facility.smd_code }}</td>
                        <td class="text-center nowrap">{{ facility.dcf_code }}</td>
                        <td class="">{{ facility.fac_name }}</td>
                        <td class="text-center nowrap">{{ facility.customer_cd }}</td>
                        <td class="text-center nowrap">{{ facility.jd_code }}</td>
                        <td class="text-center nowrap">{{ facility.comp_name }}</td>
                        <td class="text-end nowrap">{{ facility.A ?? '-' }}</td>
                        <td class="text-end nowrap">{{ facility.B ?? '-' }}</td>
                        <td class="text-end nowrap">{{ facility.C ?? '-' }}</td>
                        <td class="text-end nowrap">{{ facility.D ?? '-' }}</td>
                        <td class="text-end nowrap">{{ facility.total ?? '0' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style scope>
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
    .btn.small {
        font-size: 0.8rem;
    }
</style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex"
import Pagination from "@/components/Pagination.vue"
import SortHeader from "@/components/Sort.vue"
import { typeText, formatBeforeRequest, timeToString, displayDate } from '@/helper.js'
</script>
<script>
export default {
    data: function () {
        return {
            day: null,
            search: {
                dataset: null,
                sort: null,
                sort_by: 'asc',
            },
            companyReport: [],
            facilityReport: []
        };
    },
    computed: {
        ...mapState({
            master: state => state.invoice.master,
        }),
    },
    methods: {
        ...mapActions('invoice', ['getMasterInvoice', 'getCompReport']),
        searchCompReport: async function () {
            let payload = {...this.search}
            let month = payload.dataset.month + 1
            payload.dataset = payload.dataset.year+''+(month.toString().padStart(2, '0'))
            await this.getCompReport(formatBeforeRequest(payload)).then((res) => {
                if(res && res.code == 200) {
                    this.companyReport = res.data['comp_report']
                    this.facilityReport = res.data['facility_report']
                }
            })
        },
        changeDataSet: async function (isNext = false) {
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

            await this.searchCompReport()
        },
        updateDataset: async function () {
            await this.searchCompReport()
        },
        sort: async function () {
            if(this.facilityReport.length > 0) {
                await this.searchCompReport()
            }
        },
    },
    created: async function () {
        this.getMasterInvoice()
        let today = new Date()
        this.search.dataset = {year: today.getFullYear(), month: today.getMonth()}
        // this.searchCompReport()
    }
}
</script>