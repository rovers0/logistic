<template>
    <div class="p-2 wrapper-scroll transit">
        <form class="gap-5 mb-3 d-flex" @submit.prevent="submitSearch()">
            <div class="flex-1 d-grid input-gap">
                <!-- row 1 -->
                <div class="gap-3 d-flex">
                    <div class="d-flex basis-[42%] gap-3">
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[5.5rem] label-text">SMDコード</label>
                            <input type="text" class="flex-1 form-control" v-model="search.smd_code">
                        </div>
    
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[5.5rem] label-text">DCFコード</label>
                            <input type="text" class="flex-1 form-control" v-model="search.dcf_code">
                        </div>
                    </div>

                    <div class="d-flex align-items-center basis-[35%]">
                        <label class="w-[5.5rem] label-text">施設名</label>
                        <input type="text" class="flex-1 form-control" v-model="search.fac_name">
                    </div>

                    <div class="d-flex align-items-center basis-[23%]">
                        <label class="w-[5.5rem] label-text">処理状態</label>
                        <select class="flex-1 form-select" v-model="search.status">
                            <option :value="null">全て</option>
                            <option v-for="st in exchange_status" :value="st.id">{{ st.value }}</option>
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
                        <label class="w-[5.5rem] label-text">患者コード</label>
                        <input type="text" class="flex-1 form-control" v-model="search.patient_cd">
                    </div>

                    <div class="basis-[23%] d-flex align-items-center">
                        <label class="w-[5.5rem] label-text">患者名</label>
                        <input type="text" class="flex-1 form-control" v-model="search.patient_name">
                    </div>
                </div>
            </div>

            <div class="w-[7rem] d-grid input-gap">
                <button type="button" class="btn default" @click="resetGuideSearch(); submitSearch();">リセット</button>
                <button type="submit" class="btn">検索</button>
            </div>
    </form>

        <div class="w-[90%] mx-auto parent-scroll mb-3" style="max-height: 8rem;">
            <table class="view-scroll t-border">
                <thead class="text-center">
                    <tr>
                        <th>{{ typeText(exchange_status, 1) }}</th>
                        <th>{{ typeText(exchange_status, 2) }}</th>
                        <th>{{ typeText(exchange_status, 3) }}</th>
                        <th>{{ typeText(exchange_status, 4) }}</th>
                        <th>{{ typeText(exchange_status, 5) }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center">{{ statusReport[1] ?? 0 }} 件</td>
                        <td class="text-center">{{ statusReport[2] ?? 0 }} 件</td>
                        <td class="text-center">{{ statusReport[3] ?? 0 }} 件</td>
                        <td class="text-center">{{ statusReport[4] ?? 0 }} 件</td>
                        <td class="text-center">{{ statusReport[5] ?? 0 }} 件</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mb-1 d-flex align-items-center">
            <div class="gap-2 col-4 d-flex align-items-center">
                <button type="button" class="btn" @click="openMSContactSetting()" :disabled="ids.length == 0">MSへの連絡</button>
                <button type="button" class="btn" disabled>案内書出力</button>
            </div>

            <div class="col-4 d-flex justify-content-center align-items-center">
                <span class="label-text">定期交換処理中：全{{ exchangeList.length }}件</span>
            </div>

            <div class="gap-2 col-4 d-flex align-items-center">
                <select class="flex-1 form-select" v-model="planUpdate.plan">
                    <option v-for="st in master.exchange_plan" :value="st.id">{{ st.value }}</option>
                </select>
                <Datepicker class="w-[10rem]" v-model="planUpdate.plan_date" format="yyyy/MM/dd(E)"></Datepicker>
                <button type="button" class="btn" :disabled="!checkPlanUpdate()" @click="updatePlans()">作業日変更</button>
            </div>
        </div>

        <div class="parent-scroll">
            <table class="view-scroll t-border">
                <thead class="text-center">
                    <tr>
                        <th class="w-[3rem]">
                            <input type="checkbox" class="form-check-input" @click="checkAll()" :checked="isCheckAll">
                        </th>
                        <th class="w-[4%]">
                            <SortHeader @sort="sort()" :search="search" :field="'smd_code'">コード</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'fac_name'">施設名</SortHeader>
                        </th>
                        <th class="w-[8%]">
                            <SortHeader @sort="sort()" :search="search" :field="'patient_cd'">患者コード</SortHeader>
                            患者名
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'status'">処理状況</SortHeader>
                        </th>
                        <th>特記事項①</th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'plan_make_set'">案内一式</SortHeader>
                            <SortHeader @sort="sort()" :search="search" :field="'real_make_set'">作成日</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'plan_send_ms'">MS事前</SortHeader>
                            <SortHeader @sort="sort()" :search="search" :field="'real_send_ms'">連絡日</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'plan_send_fac'">施設案内</SortHeader>
                            <SortHeader @sort="sort()" :search="search" :field="'real_send_fac'">FAX日</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'plan_recv_exp'">回答</SortHeader>
                            <SortHeader @sort="sort()" :search="search" :field="'real_recv_exp'">締め日</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'plan_send_deli'">納品</SortHeader>
                            <SortHeader @sort="sort()" :search="search" :field="'real_send_deli'">連絡日</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'plan_inst_ymc'">出荷</SortHeader>
                            <SortHeader @sort="sort()" :search="search" :field="'inst_date'">指示日</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'agr_receive_date'">同意書受信日</SortHeader>
                            <SortHeader @sort="sort()" :search="search" :field="'agr_signed_date'">回収日</SortHeader>
                        </th>
                        <th class="w-[4%]">詳細</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="exchange in exchangeList" :key="exchange.id">
                        <td class="text-center">
                            <input type="checkbox" class="form-check-input" :disabled="exchange.status == 0" v-model="ids" :value="exchange.id">
                        </td>
                        <td class="text-center">{{ exchange.smd_code }}</td>
                        <td>{{ exchange.pumpFacility?.fac_name }}</td>
                        <td class="text-center">{{ exchange.patient_cd }}<br>{{ exchange.afterHistory.patient_nm }}</td>
                        <td class="text-center">{{ exchange.status_label }}</td>
                        <td>{{ exchange.exc_remark1 }}</td>
                        <td class="text-center">{{ displayDate(exchange.plan_make_set, '-', 'MM月DD日') }}<br>{{ displayDate(exchange.real_make_set, '-', 'MM月DD日') }}</td>
                        <td class="text-center">{{ displayDate(exchange.plan_send_ms, '-', 'MM月DD日') }}<br>{{ displayDate(exchange.real_send_ms, '-', 'MM月DD日') }}</td>
                        <td class="text-center">{{ displayDate(exchange.plan_send_fac, '-', 'MM月DD日') }}<br>{{ displayDate(exchange.real_send_fac, '-', 'MM月DD日') }}</td>
                        <td class="text-center">{{ displayDate(exchange.plan_recv_exp, '-', 'MM月DD日') }}<br>{{ displayDate(exchange.real_recv_exp, '-', 'MM月DD日') }}</td>
                        <td class="text-center">{{ displayDate(exchange.plan_send_deli, '-', 'MM月DD日') }}<br>{{ displayDate(exchange.real_send_deli, '-', 'MM月DD日') }}</td>
                        <td class="text-center">{{ displayDate(exchange.plan_inst_ymc, '-', 'MM月DD日') }}<br>{{ displayDate(exchange.shipment.inst_date, '-', 'MM月DD日') }}</td>
                        <td class="text-center">{{ displayDate(exchange.agr_receive_date, '-', 'MM月DD日') }}<br>{{ displayDate(exchange.agr_signed_date, '-', 'MM月DD日') }}</td>
                        <td class="text-center">
                            <button class="btn default" @click="openExchangeDetail(exchange.id)">詳細</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <Detail v-if="transit.status" :ids="detailIds" :id="detailId"></Detail>
    <ConfirmModal ref="confirmDialog"></ConfirmModal>
    <MSContactSettingModal v-if="isOpenMSContactSetting"
    :show="isOpenMSContactSetting"
    :ids="getIds()"
    :isUpdate="true"
    @close="onCloseMS($event)"></MSContactSettingModal>

    <ShipmentModal
        v-if="isOpenShippingModal"
        :show="isOpenShippingModal"
        :ids="getShipmentIds()"
        @close="isOpenShippingModal = false"
        @reload="searchExchangeIndex()"></ShipmentModal>
</template>

<script setup>
import { mapState, mapActions, mapMutations } from "vuex"
import Detail from '@/views/Exchange/Detail.vue'
import { TRANSIT_EXCHANGE } from "@/components/Constants.vue"
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue"
import SortHeader from "@/components/Sort.vue"
import MSContactSettingModal from '@/views/Exchange/modal/MSContactSettingModal.vue'
import ShipmentModal from "@/views/commons/ShipmentModal.vue";
import jp from '@/lang/jp.json'
import { formatBeforeRequest, dateToMonth, deepClone, displayDate, typeText } from '@/helper.js'
</script>
<script>
export default {
    data: function () {
        return {
            isOpenMSContactSetting: false,
            exchangeList: [],
            ids: [],
            isCheckAll: false,
            planUpdate: {
                plan: 'plan_make_set',
                plan_date: null,
                ids: []
            },
            planReport: [],
            statusReport: {},
            detailIds: [],
            detailId: null,
            isOpenShippingModal: false,
            exchange_status: [],
        }
    },
    computed: {
        ...mapState(['transit']),
        ...mapState({
            master: state => state.exchange.master,
            search: state => state.exchange.guide_search,
        }),
    },
    watch:{
        'transit.status': async function () {
            if(!this.transit.status && this.transit.reloadParent) {
                await this.searchExchangeIndex()
                this.setTransitReloadParent(false)
            }
        }
    },
    methods: {
        ...mapActions('exchange', ['getMasterExchange', 'storeExchange', 'getIndexExchange', 'updatePlan', 'getPlanReportExchange']),
        ...mapMutations('exchange', ['resetGuideSearch']),
        ...mapMutations(['setIsOpenTransitDetail', 'setTransitReloadParent']),
        openExchangeDetail: function (id) {
            this.detailId = id
            this.setIsOpenTransitDetail({status: true, type: TRANSIT_EXCHANGE})
        },
        openMSContactSetting: function () {
            this.isOpenMSContactSetting = true
        },
        onCloseMS: function (event) {
            this.isOpenMSContactSetting = false
            if(event) {
                this.searchExchangeIndex()
            }
        },
        setPumpCode: function () {
            this.$store.state.pump_code = this.search.pump_code
        },
        register: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: jp.confirm,
                message: 'Confirm?',
            })
            if(ok) {
                await this.$refs.confirmDialog.close()
                await this.storeExchange().then((res) => {
                    if(res && res.code == 200) {
                        this.$refs.confirmDialog.show({
                            title: jp.notification_title,
                            message: res.data.result+'件',
                            type: 1
                        })

                        if(res.data.result > 0) {
                            this.planUpdate.ids = []
                            this.searchExchangeIndex()
                        }
                    }
                })
            }
        },
        searchExchangeIndex: async function () {
            this.search.tab = 2
            await this.getIndexExchange(formatBeforeRequest(this.search)).then((res) => {
                if(res && res.code == 200) {
                    this.exchangeList = res.data.list
                    this.planReport = res.data.report
                    this.statusReport = res.data.status_report
                    this.detailIds = this.exchangeList.map((item) => item.id)
                }
            })
        },
        submitSearch: async function () {
            this.planUpdate.ids = []
            this.ids = []
            await this.searchExchangeIndex()
            this.setPumpCode()
        },
        sort: async function () {
            this.planUpdate.ids = []
            this.ids = []
            if(this.exchangeList.length > 0) {
                await this.searchExchangeIndex()
            }
        },
        checkAll: function () {
            this.ids = []
            this.isCheckAll = !this.isCheckAll
            if(this.isCheckAll) {
                this.ids = this.exchangeList.filter(item => item.status > 0).map(item => item.id)
            }
        },
        checkPlanUpdate: function () {
            if(!this.planUpdate.plan_date || this.ids.length == 0) return false
            return true
        },
        updatePlans: async function () {
            this.planUpdate.ids = this.getIds()
            const res = await this.updatePlan(formatBeforeRequest(this.planUpdate)).then((res) => {
                if(res && res.code == 200) {
                    return res.data
                }
                return false
            })
            if(res) {
                await this.$refs.confirmDialog.show({
                    title: jp.notification_title,
                    message: res+'件',
                    type: 1
                })

                await this.searchExchangeIndex()        
            }
        },
        openShippingModal: async function () {
            this.isOpenShippingModal = true
        },
        getIds: function () {
            let list = this.exchangeList
            return this.ids.sort(function(a, b) {
                return list.findIndex(el => {return el.id == a}) - list.findIndex(el => {return el.id == b})
            })
        },
        getShipmentIds: function () {
            let list_id = this.getIds()
            return this.exchangeList.filter(item => list_id.includes(item.id)).map(item => item.shipment.id)
        },
    },
    created: async function () {
        this.getMasterExchange().then((res) => {
            this.exchange_status = this.master.exchange_status.filter(item => [1, 2, 3, 4, 5].includes(item.id))
        })
        this.search.pump_code = this.$store.state.pump_code
        this.search.sort = null
        this.searchExchangeIndex()
    }
}
</script>