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
                            <label class="w-[6rem] label-text">シリアルNo</label>
                            <input type="text" class="flex-1 form-control" v-model="search.serial_no">
                        </div>
                    </div>

                    <div class="d-flex align-items-center basis-[35%]">
                        <label class="w-[5.5rem] label-text">施設名</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_fac_name">
                    </div>

                    <div class="d-flex align-items-center basis-[23%]">
                        <label class="w-[5.5rem] label-text">処理状態</label>
                        <select class="flex-1 form-select" v-model="search.status">
                            <option :value="null">全て</option>
                            <option v-for="st in rent_status" :value="st.id">{{ st.value }}</option>
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

                    <div class="basis-[23%]"></div>
                </div>
            </div>

            <div class="w-[7rem] d-grid input-gap">
                <button type="button" class="btn default" @click="resetConsentSearch(); submitSearch();">リセット</button>
                <button type="submit" class="btn">検索</button>
            </div>
        </form>

        <div class="mb-1 d-flex align-items-end justify-content-center">
            <div class="text-center fs-5">{{ count_status_title }}</div>
        </div>

        <div class="parent-scroll">
            <table class="view-scroll t-border">
                <thead class="text-center">
                    <tr>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'smd_code'">コード</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'patient_cd'">患者コード</SortHeader>
                            患者名
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'dcf_code'">DCFコード</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'fac_name'">施設名</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'des_doctor'">担当者</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'ord_deli_hope'">貸出希望日</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'ord_recive_date'">発注受付日</SortHeader>
                            <SortHeader @sort="sort()" :search="search" :field="'date_send_fax'">受領書送信日</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'plan_date'">出荷予定日</SortHeader>
                            <SortHeader @sort="sort()" :search="search" :field="'inst_date'">出荷指示日</SortHeader>
                        </th>
                        <th>指示書No.<br>出荷シリアル</th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'delivery_date'">発注書受信日</SortHeader>
                        </th>
                        <th class="w-[6%]">詳細</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rent in rents">
                        <td class="text-center">{{ rent.smd_code }}</td>
                        <td class="text-center">{{ rent.patient_cd }}<br>{{ rent.patientHistory?.patient_nm ?? '-' }}</td>
                        <td class="text-center">{{ rent.dcf_code }}</td>
                        <td>{{ rent.fac_name }}</td>
                        <td>{{ rent.des_doctor }}</td>
                        <td class="text-center">{{ displayDate(rent.ord_deli_hope)}}</td>
                        <td class="text-center">{{ displayDate(rent.ord_recive_date) }}<br>{{ displayDate(rent.date_send_fax) }}</td>
                        <td class="text-center">{{ displayDate(rent.shipment?.plan_date) }}<br>{{ displayDate(rent.shipment?.inst_date) }}</td>
                        <td class="text-center">{{ rent.shipment?.inst_id || '-' }}<br>{{ rent.shipment?.serial_no }}</td>
                        <td class="text-center">{{ displayDate(rent.shipment?.delivery_date) }}</td>
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
            rent_status: [],
            count_status_title: ''
        };
    },
    computed: {
        ...mapState(['transit']),
        ...mapState({
            master: state => state.rent.master,
            search: state => state.rent.consent_search
        }),
    },
    watch: {
        'transit.status': async function () {
            if(!this.transit.status && this.transit.reloadParent) {
                await this.loadIndexData()
                this.setTransitReloadParent(false)
            }
        }
    },
    methods: {
        ...mapActions('rent', ['getMasterRent', 'getIndexRent', 'setDateShipment']),
        ...mapMutations('rent', ['resetConsentSearch']),
        ...mapMutations(['setIsOpenTransitDetail', 'setTransitReloadParent']),
        openDetail: function (rent={}) {
            this.rent_selected = rent
            this.setIsOpenTransitDetail({status: true, type: TRANSIT_RENT})
        },
        submitSearch: async function () {
            await this.loadIndexData()
            this.setPumpCode()
        },
        loadIndexData: async function () {
            this.search.tab = 4
            await this.getIndexRent(this.search).then((res) => {
                if(res && res.code == 200) {
                    this.rents = res.data
                    this.setCountStatusTitle()
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
        setCountStatusTitle: function () {
            this.count_status_title = ''
            let group = {}
            this.rents.forEach(rent => {
                if(!group[rent.status]) {
                    group[rent.status] = 1
                } else {
                    group[rent.status]++
                }
            })
            this.rent_status.forEach((item, index) => {
                this.count_status_title += item.value+'：'+(group[item.id] ?? 0)+'件'+(index < this.rent_status.length ? '' : '　')
            })
        },
        setPumpCode: function () {
            this.$store.state.pump_code = this.search.pump_code
        }
    },
    created: async function () {
        await this.getMasterRent()
        this.search.pump_code = this.$store.state.pump_code
        this.rent_status = this.master.rent_new_status.filter(item => [11, 12, 13].includes(item.id))
        await this.loadIndexData()
    }
}
</script>