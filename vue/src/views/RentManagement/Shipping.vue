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

                    <div class="d-flex align-items-center basis-[23%]">
                        <label class="w-[5.5rem] label-text">出荷指示日</label>
                        <Datepicker class="flex-1" v-model="search.inst_date"></Datepicker>
                    </div>
                </div>
            </div>

            <div class="w-[7rem] d-grid input-gap">
                <button type="button" class="btn default" @click="resetShippingSearch(); submitSearch();">リセット</button>
                <button type="submit" class="btn">検索</button>
            </div>
        </form>

        <div class="mb-1 d-flex align-items-end">
            <div class="col-3">
                <button type="button" class="btn" @click="openShippingModal()" :disabled="ids.length <= 0">出荷指示情報作成・出力</button>
            </div>

            <div class="text-center col-6 fs-5">出荷準備中：{{ rents.length }}件</div>

            <div class="gap-2 col-3 d-flex align-items-center justify-content-end">
                <button type="button" class="btn" @click="openSetSendDateModal()" :disabled="checkDisableSendDate()">出荷データ送信完了</button>
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
                            <SortHeader @sort="sort()" :search="search" :field="'date_reply_plan'">納入予定日</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'status'">状態</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'plan_date'">出荷予定日</SortHeader>
                            <SortHeader @sort="sort()" :search="search" :field="'inst_date'">出荷指示日</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'send_date'">送信完了日</SortHeader>
                            <SortHeader @sort="sort()" :search="search" :field="'delivery_date'">出荷完了日</SortHeader>
                        </th>
                        <th class="w-[6%]">詳細</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rent in rents">
                        <td class="text-center">
                            <input type="checkbox" class="form-check-input" v-model="ids" :value="rent.shipment.id">
                        </td>
                        <td class="text-center">{{ rent.smd_code }}</td>
                        <td class="text-center">{{ rent.patient_cd }}<br>{{ rent.patientHistory?.patient_nm ?? '-' }}</td>
                        <td class="text-center">{{ rent.dcf_code }}</td>
                        <td>{{ rent.fac_name }}</td>
                        <td>{{ rent.des_doctor }}</td>
                        <td class="text-center">{{ displayDate(rent.date_reply_plan)}}</td>
                        <td class="text-center">{{ typeText(master.rent_new_status ?? [], rent.status) }}</td>
                        <td class="text-center">{{ displayDate(rent.shipment?.plan_date) }}<br>{{ displayDate(rent.shipment?.inst_date) }}</td>
                        <td class="text-center">{{ displayDate(rent.shipment?.send_date) }}<br>{{ displayDate(rent.shipment?.delivery_date) }}</td>
                        <td class="text-center">
                            <button type="button" class="btn default sm" @click="openDetail(rent)">詳細</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <Detail v-if="transit.status" :rent="rent_selected"></Detail>

    <!-- <ShippingInstructionsModal
        v-if="isOpenShippingModal"
        :show="isOpenShippingModal"
        :ids="ids"
        @close="isOpenShippingModal = false"
        @reload="loadIndexData()"></ShippingInstructionsModal> -->
    
    <ShipmentModal
        v-if="isOpenShippingModal"
        :show="isOpenShippingModal"
        :ids="ids"
        @close="isOpenShippingModal = false"
        @reload="loadIndexData()"></ShipmentModal>

    <SetSendDateModal
        v-if="isOpenSetSendDateModal"
        :show="isOpenSetSendDateModal"
        :quantity="ids.length"
        @close="isOpenSetSendDateModal = false"
        @confirm="updateSendDate($event)"></SetSendDateModal>
</template>

<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
import Detail from "./Detail.vue";
import SortHeader from "@/components/Sort.vue";
import ShippingInstructionsModal from "./modal/ShippingInstructionsModal.vue";
import ShipmentModal from "@/views/commons/ShipmentModal.vue";
import SetSendDateModal from "./modal/SetSendDateModal.vue";
import { TRANSIT_RENT } from "../../components/Constants.vue";
import { typeText, formatBeforeRequest, timeToString, displayDate } from '@/helper.js';
</script>
<script>
export default {
    data: function () {
        return {
            isOpenShippingModal: false,
            isOpenSetSendDateModal: false,
            rents: [],
            rent_selected: {},
            ids: [],
            isCheckAll: false,
            plan_date: null,
            rent_status: [],
        };
    },
    computed: {
        ...mapState(['transit']),
        ...mapState({
            master: state => state.rent.master,
            search: state => state.rent.shipping_search
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
        ...mapMutations('rent', ['resetShippingSearch']),
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
            this.search.tab = 3
            let params = formatBeforeRequest(this.search)
            await this.getIndexRent(params).then((res) => {
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
                this.ids = this.rents.map(item => item.shipment.id)
            }
        },
        openShippingModal: function () {
            this.isOpenShippingModal = true
        },
        openSetSendDateModal: function () {
            this.isOpenSetSendDateModal = true
        },
        updateSendDate: async function (event) {
            let payload = {ids: this.ids, send_date: event}
            payload = formatBeforeRequest(payload)
            await this.setDateShipment(payload).then((res) => {
                if(res && res.code == 200) {
                    for(let i = 0; i < this.rents.length; i++) {
                        if(this.ids.includes(this.rents[i].id)) {
                            this.rents[i].shipment.send_date = timeToString(event)
                            if(this.rents[i].status == 8) this.rents[i].status = 9
                            this.isOpenSetSendDateModal = false
                        }
                    }
                }
            })
        },
        checkDisableSendDate: function () {
            if(this.ids.length <= 0) return true
            for(let i = 0; i < this.rents.length; i++) {
                if(this.ids.includes(this.rents[i].id) && this.rents[i].status < 8) {
                    return true
                }
            }
            return false
        },
        setPumpCode: function () {
            this.$store.state.pump_code = this.search.pump_code
        }
    },
    created: async function () {
        await this.getMasterRent()
        this.search.pump_code = this.$store.state.pump_code
        this.rent_status = this.master.rent_new_status.filter(item => [6, 7, 8, 9, 10].includes(item.id))
        await this.loadIndexData()
    }
}
</script>