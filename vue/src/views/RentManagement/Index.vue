<template>
    <div class="p-2 wrapper-scroll transit">
        <form class="gap-5 mb-3 d-flex" @submit.prevent="submitSearch()">
            <div class="flex-1 d-grid input-gap">
                <!-- row 1 -->
                <div class="gap-3 d-flex">
                    <div class="d-flex basis-[42%] gap-3">
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[5.5rem] label-text">患者コード</label>
                            <input type="text" class="flex-1 form-control" v-model="search.search_patient_cd">
                        </div>
    
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[5.5rem] label-text">DCFコード</label>
                            <input type="text" class="flex-1 form-control" v-model="search.search_dcf_code">
                        </div>
                    </div>

                    <div class="d-flex align-items-center basis-[35%]">
                        <label class="w-[5.5rem] label-text">施設名</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_fac_name">
                    </div>

                    <div class="d-flex align-items-center basis-[23%]">
                        <label class="w-[5.5rem] label-text">処理状態</label>
                        <select class="flex-1 form-select" v-model="search.status" @change="onChangeStatus()">
                            <option :value="null">全て</option>
                            <option v-for="st in master.rent_new_status" :value="st.id">{{ st.value }}</option>
                        </select>
                    </div>
                </div>
                
                <!-- row 2 -->
                <div class="gap-3 d-flex">
                    <div class="d-flex align-items-center basis-[42%]">
                        <label class="w-[5.5rem] label-text">対象ポンプ</label>
                        <select class="flex-1 form-select" v-model="search.pump_code" @change="setPumpCode()">
                            <option :value="null">全て</option>
                            <option v-for="mc in master.machines" :value="mc.pump_cd">{{ '['+mc.pump_cd+'] '+mc.pump_nm_short }}</option>
                        </select>
                    </div>

                    <div class="d-flex align-items-center basis-[35%]">
                        <label class="w-[5.5rem] label-text">担当者名</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_des_doctor">
                    </div>

                    <div class="basis-[23%] d-flex align-items-center">
                        <label class="gap-2 label-text d-flex align-items-center">
                            <input type="checkbox" class="mt-0 form-check-input" v-model="search.is_complete" @change="onChangeIsComplete()">完了・取消のデータも表示
                        </label>
                    </div>
                </div>
            </div>

            <div class="w-[7rem] d-grid input-gap">
                <button type="button" class="btn default" @click="resetIndexSearch(); submitSearch();">リセット</button>
                <button type="submit" class="btn">検索</button>
            </div>
        </form>

        <div class="mb-1 d-flex align-items-end">
            <div class="col-4">
                <button type="button" class="btn selection w-[8rem]" @click="openDetail()">新規登録</button>
            </div>

            <div class="text-center col-4 fs-5">新規貸出処理中：{{ rents.length }}件</div>

            <div class="gap-2 col-4 d-flex align-items-center justify-content-end">
                <Datepicker class="w-[10rem]" format="yyyy/MM/dd(E)" v-model="plan_date"></Datepicker>
                <button type="button" class="btn default" :disabled="!plan_date || ids.length <= 0" @click="updatePlanDelivery()">出荷予定日設定</button>
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
                            <SortHeader @sort="sort()" :search="search" :field="'smd_code'">SMD<br>コード</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'patient_cd'">患者コード</SortHeader>
                            患者名
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'pump_code'">対象<br>ポンプ</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'dcf_code'">DCF<br>コード</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'fac_name'">施設名</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'des_doctor'">宛先担当者</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'pre_deli_hope'">貸出希望日</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'status'">状態</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'treat_recive_date'">連絡票受信</SortHeader>
                            <SortHeader @sort="sort()" :search="search" :field="'ord_recive_date'">発注書受信</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'plan_date'">出荷予定日</SortHeader>
                            <SortHeader @sort="sort()" :search="search" :field="'inst_date'">出荷指示日</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'serial_no'">出荷シリアル</SortHeader>
                            <SortHeader @sort="sort()" :search="search" :field="'delivery_date'">配達完了</SortHeader>
                        </th>
                        <th class="w-[5%]">詳細</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rent in rents">
                        <td class="text-center">
                            <input type="checkbox" class="form-check-input" v-model="ids" :value="rent.id">
                        </td>
                        <td class="text-center nowrap">{{ rent.smd_code }}</td>
                        <td class="text-center nowrap">{{ rent.patient_cd }}<br>{{ rent.patientHistory?.patient_nm ?? '-' }}</td>
                        <td class="text-center nowrap">{{ rent.shipment.pump_code }}</td>
                        <td class="text-center nowrap">{{ rent.dcf_code }}</td>
                        <td>{{ rent.fac_name }}</td>
                        <td>{{ rent.des_doctor }}</td>
                        <td class="text-center nowrap">{{ displayDate(rent.ord_deli_hope) }}</td>
                        <td class="text-center nowrap">{{ typeText(master.rent_new_status ?? [], rent.status) }}</td>
                        <td class="text-center nowrap">{{ displayDate(rent.treat_recive_date) }}<br>{{ displayDate(rent.ord_recive_date) }}</td>
                        <td class="text-center nowrap">{{ displayDate(rent.shipment?.plan_date) }}<br>{{ displayDate(rent.shipment?.inst_date) }}</td>
                        <td class="text-center nowrap">
                            {{ rent.shipment?.serial_no ?? '-' }}<br>
                            <span class="text-danger">{{ displayDate(rent.shipment?.delivery_date) }}</span>
                        </td>
                        <td class="text-center">
                            <button type="button" class="btn default sm" @click="openDetail(rent)">詳細</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <Detail v-if="transit.status" :rent="rent_selected"></Detail>
</template>

<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
import Detail from "./Detail.vue";
import SortHeader from "@/components/Sort.vue";
import { TRANSIT_RENT } from "../../components/Constants.vue";
import { typeText, formatBeforeRequest, timeToString, displayDate } from '@/helper.js';
</script>
<script>
export default {
    data: function () {
        return {
            isOpenDetailModal: false,
            rents: [],
            rent_selected: {},
            ids: [],
            isCheckAll: false,
            plan_date: null,
        };
    },
    computed: {
        ...mapState(['transit']),
        ...mapState({
            master: state => state.rent.master,
            search: state => state.rent.index_search
        }),
    },
    watch:{
        'transit.status': async function () {
            if(!this.transit.status && this.transit.reloadParent) {
                await this.loadIndexData()
                this.setTransitReloadParent(false)
            }
        }
    },
    methods: {
        ...mapActions('rent', ['getMasterRent', 'getIndexRent', 'setDateShipment']),
        ...mapMutations('rent', ['resetIndexSearch']),
        ...mapMutations(['setIsOpenTransitDetail', 'setTransitReloadParent']),
        openDetail: function (rent={}) {
            this.rent_selected = rent
            this.setIsOpenTransitDetail({status: true, type: TRANSIT_RENT})
        },
        submitSearch: async function () {
            this.search.sort = null
            this.search.sort_by = null
            await this.loadIndexData()
            this.setPumpCode()
        },
        loadIndexData: async function () {
            await this.getIndexRent(this.search).then((res) => {
                if(res && res.code == 200) {
                    this.rents = res.data
                    this.isCheckAll = false
                    this.ids = []
                }
            })
        },
        sort: async function () {
            if(this.rents.length > 0) {
                await this.loadIndexData()
            }
        },
        checkAll: function () {
            this.ids = []
            this.isCheckAll = !this.isCheckAll
            if(this.isCheckAll) {
                this.ids = this.rents.map(item => item.id)
            }
        },
        updatePlanDelivery: async function () {
            let payload = {ids: this.ids, plan_date: this.plan_date}
            payload = formatBeforeRequest(payload)
            await this.setDateShipment(payload).then((res) => {
                if(res && res.code == 200) {
                    for(let i = 0; i < this.rents.length; i++) {
                        if(this.ids.includes(this.rents[i].id)) {
                            this.rents[i].shipment.plan_date = timeToString(this.plan_date)
                        }
                    }
                }
            })
        },
        setPumpCode: function () {
            this.$store.state.pump_code = this.search.pump_code
        },
        onChangeStatus: function () {
            if([14, 99, 20].includes(this.search.status)) {
                this.search.is_complete = true
            } else {
                this.search.is_complete = false
            }
        },
        onChangeIsComplete: function () {
            if(!this.search.is_complete && [14, 99, 20].includes(this.search.status)) {
                this.search.status = null
            }
        }
    },
    created: async function () {
        await this.getMasterRent()
        this.search.pump_code = this.$store.state.pump_code
        await this.loadIndexData()
    }
}
</script>