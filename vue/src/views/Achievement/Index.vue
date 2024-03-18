<template>
    <div class="p-2 wrapper-scroll transit">
        <form class="mb-4 d-flex" @submit.prevent="submitSearch()">
            <div class="d-grid input-gap mr-[2rem] flex-1">
                <!-- row 1 -->
                <div class="gap-3 d-flex">
                    <div class="d-flex align-items-center basis-[25%]">
                        <label class="w-[6rem] label-text">SMDコード</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_smd_code">
                    </div>
                    <div class="d-flex align-items-center basis-[25%]">
                        <label class="w-[6rem] label-text">現状状態</label>
                        <select class="flex-1 form-select" v-model="search.status">
                            <option :value="null">全て</option>
                            <option v-for="status in status_list" :value="status.id">
                                {{ status.value }}
                            </option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center basis-[50%]">
                        <label class="w-[9.5rem] label-text">施設名・DCFコード</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_fac_name">
                    </div>
                </div>

                <!-- row 2 -->
                <div class="gap-3 d-flex">
                    <div class="d-flex align-items-center basis-[25%]">
                        <label class="w-[6rem] label-text">出荷指示No.</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_inst_id">
                    </div>
                    <div class="d-flex align-items-center basis-[25%]">
                        <label class="w-[6rem] label-text">シリアルNo.</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_serial_no">
                    </div>
                    <div class="d-flex align-items-center basis-[50%]">
                        <label class="w-[9.5rem] label-text">使用開始日</label>
                        <div class="flex-1 d-flex align-items-center justify-content-between">
                            <Datepicker class="flex-1" v-model="search.dateof_start_from" :max-date="search.dateof_start_to"></Datepicker>
                            <span class="px-3 fs-4">~</span>
                            <Datepicker class="flex-1" v-model="search.dateof_start_to" :min-date="search.dateof_start_from"></Datepicker>
                        </div>
                    </div>
                </div>

                <!-- row 3 -->
                <div class="gap-3 d-flex">
                    <div class="d-flex align-items-center basis-[25%]">
                        <label class="w-[6rem] label-text">配達完了日</label>
                        <Datepicker class="flex-1" v-model="search.dateof_use"></Datepicker>
                    </div>
                    <div class="d-flex align-items-center basis-[25%]">
                        <label class="w-[6rem] label-text">出荷時の棚</label>
                        <select class="flex-1 form-select" v-model="search.from_shelf">
                            <option :value="null">全て</option>
                            <option v-for="shelf in master.master_des_shelf" :value="shelf.id">{{ shelf.value }}</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center basis-[50%]">
                        <label class="w-[9.5rem] label-text">対象ポンプ</label>
                        <select class="flex-1 form-select" v-model="search.pump_code" @change="setPumpCode()">
                            <option :value="null">全て</option>
                            <option v-for="machine in master.machines" :value="machine.pump_cd">
                                {{'[' + machine.pump_cd + ']' + machine.pump_nm_short }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- row 4 -->
                <div class="gap-3 d-flex">
                    <div class="d-flex align-items-center basis-[25%]">
                        <label class="w-[6rem] label-text">患者コード</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_patient_cd">
                    </div>
                    <div class="d-flex align-items-center basis-[25%]">
                        <label class="w-[6rem] label-text">患者名</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_patient_name">
                    </div>
                    <div class="d-flex basis-[50%] gap-5">
                        <label class="gap-2 label-text fw-bold d-flex align-items-center">
                            <input type="checkbox" class="mt-0 form-check-input" v-model="search.is_finished" @change="getStatusList()">回収完了ポンプを含む
                        </label>
                        <label class="gap-2 label-text fw-bold d-flex align-items-center">
                            <input type="checkbox" class="mt-0 form-check-input" v-model="search.special_flg">調査要のみ表示
                        </label>
                    </div>
                </div>
            </div>

            <div class="w-[7rem] d-flex flex-column input-gap">
                <button type="button" class="btn default" @click="resetSearch(); submitSearch();">リセット</button>
                <button type="submit" class="btn">検索</button>
            </div>
        </form>

        <div class="mb-1 d-flex align-items-center">
            <div class="gap-2 col-2 d-flex align-items-center">
                <label class="label-text">表示数</label>
                <select class="form-select w-[6.5rem]" v-model="search.limit" @change="onChangeLimit()">
                    <option v-for="item in ROW_LIMITS" :value="item.id">{{ item.text }}</option>
                </select>
            </div>

            <div class="gap-2 col-8 d-flex justify-content-center align-items-center">
                <span v-if="histories.total > 0 ">
                    {{ number(histories.total) }}件中{{ histories.firstItem}}-{{ histories.lastItem }}
                </span>

                <Pagination v-if="histories.page_count > 0" v-model="search.page" class="mb-0" :page-count="histories.page_count" :click-handler="pagination"></Pagination>
            </div>

            <div class="col-2 d-flex align-items-center justify-content-end">
                <button type="button" class="btn default w-[7rem]" disabled>一覧出力</button>
            </div>
        </div>

        <div class="parent-scroll">
            <table class="view-scroll t-border">
                <thead class="text-center">
                    <tr>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'smd_code'">SMDコード</SortHeader>
                        </th>
                        <th class="w-[15%]">
                            <SortHeader @sort="sort()" :search="search" :field="'inst_id'">出荷指示番号</SortHeader>
                        </th>
                        <th class="w-[20%]">
                            <SortHeader @sort="sort()" :search="search" :field="'fac_name'">施設名</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'patient_cd'">患者コード</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'patient_nm'">患者名</SortHeader>
                        </th>
                        <th class="w-[10%]">
                            <SortHeader @sort="sort()" :search="search" :field="'serial_no'">シリアルNo.</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'from_shelf'">出荷時<br>棚コード</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'status'">状態</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'dateof_start'">使用開始日</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'jd_code'">請求<br>コード</SortHeader>
                        </th>
                        <th class="w-[4%]">詳細</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="his in histories.data">
                        <td class="text-center">{{ his.smd_code }}</td>
                        <td class="text-center">{{ his.inst_id }}</td>
                        <!-- <td class="text-center"><a href="javascript:void(0)">{{ his.inst_id }}</a></td> -->
                        <td>{{ his.fac_name }}</td>
                        <td class="text-center">{{ his.patient_cd }}</td>
                        <td class="text-center">{{ his.patient_nm }}</td>
                        <td class="text-center">{{ his.serial_no }}</td>
                        <td class="text-center">{{ his.from_shelf ?? '-'  }}</td>
                        <td class="text-center" :class=" { 'text-primary': his.status == HISTORY_STATUS_ACTIVE } ">{{ typeText(master.status ?? [], his.status) }}</td>
                        <td class="text-center">{{ displayDate(his.dateof_start) }}</td>
                        <td class="text-center">{{ his.jd_code }}</td>
                        <td class="text-center">
                            <button type="button" class="btn default" @click="openPRDetailModal({patient_id: his.patient_id, hist_no: his.hist_no})">詳細</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <PRDetailModal v-if="isOpenPRDetailModal"
    :show="isOpenPRDetailModal"
    :keys="keys"
    :selectedKey="selected_key"
    @close="onClosePRDetail($event)"></PRDetailModal>
</template>

<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
import Pagination from "@/components/Pagination.vue";
import SortHeader from "@/components/Sort.vue";
import PRDetailModal from '@/views/Achievement/modal/PRDetailModal.vue';
import { ROW_LIMITS } from "@/components/Constants.vue";
import { typeText, formatBeforeRequest, displayDate, number } from '@/helper.js';
import { HISTORY_STATUS_ACTIVE } from "@/components/Constants.vue";
</script>
<script>
export default {
    data: function () {
        return {
            isOpenPRDetailModal: false,
            histories: [],
            keys: [],
            selected_key: {},
            status_list: []
        }
    },
    computed: {
        ...mapState(['fromFeature']),
        ...mapState({
            master: state => state.achievement.master,
            search: state => state.achievement.search
        }),
    },
    methods: {
        ...mapActions('achievement', ['getMasterPatient', 'getIndexPatientHistories']),
        ...mapMutations('achievement', ['setSearchSubmit', 'resetSearch', 'setSearchProperty']),
        ...mapMutations(['setFromFeature']),
        openPRDetailModal: function (key) {
            this.selected_key = key
            this.isOpenPRDetailModal = true
        },
        loadIndexData: async function () {
            let payload = { ...this.search }
            payload = formatBeforeRequest(payload)
            await this.getIndexPatientHistories(payload).then((res) => {
                if (res && res.code == 200) {
                    this.histories = res.data
                    this.keys = this.histories.data.map((item) => {
                        return {patient_id: item.patient_id, hist_no: item.hist_no}
                    })
                }
            })
        },
        submitSearch: function () {
            this.setSearchSubmit()
            this.loadIndexData()
            this.setPumpCode()
        },
        pagination: function (page) {
            this.search.page = page
            this.loadIndexData()
        },
        onChangeLimit: function () {
            if (this.search.limit <= this.histories.total
                || this.histories.total > this.histories.limit) {
                this.search.page = 1
                this.loadIndexData()
            }
        },
        sort: function () {
            if (this.histories.total > 0) {
                this.search.page = 1
                this.loadIndexData()
            }
        },
        setPumpCode: function () {
            this.$store.state.pump_code = this.search.pump_code
        },
        getStatusList: function () {
            this.status_list = this.master.status.filter((item) => {
                return this.search.is_finished || [0, 1, 2, 3, 4, 5, 6].includes(item.id)
            })
            if(!this.status_list.map(item => item.id).includes(this.search.status)) {
                this.search.status = null
            }
        },
        onClosePRDetail: function (event) {
            this.isOpenPRDetailModal = false
            if(event) {
                this.submitSearch()
            }
        }
    },
    created: async function () {
        await this.getMasterPatient()
        this.search.pump_code = this.$store.state.pump_code
        if(this.fromFeature) {
            this.search.sort = 'updated_at'
            this.setFromFeature(false)
        } else {
            this.search.sort = null
        }
        await this.loadIndexData()
        this.getStatusList()
    }
}
</script>