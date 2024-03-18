<template>
    <div class="transit">
        <div class="wrapper-scroll">
            <div class="parent-scroll">
                <div class="gap-3 d-flex view-scroll">
                    <!-- left -->
                    <div class="d-flex flex-column gap-1 basis-[50%]">
                        <!-- group 1 -->
                        <div class="d-flex flex-column input-gap">
                            <!-- group1-title -->
                            <div class="d-flex align-items-center">
                                <label class="fw-bold">■ 基本情報</label>
                            </div>
            
                            <!-- group1-row1 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[33%]">
                                    <label class="label-text w-[6rem]">SMDコード</label>
                                    <input type="text" class="flex-1 text-center form-control" :value="pumpFacility.smd_code" disabled>
                                </div>
                                <div class="d-flex basis-[67%] gap-3">
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[5rem]">都道府県</label>
                                        <input type="text" class="flex-1 form-control" :value="pumpFacility.fac_prof_name" disabled>
                                    </div>
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[4rem]">エリア</label>
                                        <!-- <input type="text" class="flex-1 form-control" :value="typeText(master.areas, pumpFacility.area_cd, 'area_cd', 'area_nm')" disabled> -->
                                        <select class="flex-1 form-select" v-model="pump_facility_payload.fac_area">
                                            <option v-for="area in master.areas" :value="area.area_cd">{{ area.area_nm }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- group1-row2 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[33%]">
                                    <label class="label-text w-[6rem]">DCFコード</label>
                                    <input type="text" class="flex-1 text-center form-control" :value="pumpFacility.dcf_code" disabled>
                                </div>
                                <div class="d-flex align-items-center basis-[67%]">
                                    <label class="label-text w-[5rem]">施設名</label>
                                    <input type="text" class="flex-1 form-control" v-model="pump_facility_payload.fac_name">
                                </div>
                            </div>

                            <!-- group1-row3 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[33%]">
                                    <label class="label-text w-[6rem]">郵便番号</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.fac_post" maxlength="8">
                                </div>
                                <div class="d-flex basis-[67%] gap-3">
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[5rem]">電話番号</label>
                                        <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.fac_tel" maxlength="50">
                                    </div>
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[4rem]">FAX</label>
                                        <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.fac_fax" maxlength="50">
                                    </div>
                                </div>
                            </div>

                            <!-- group1-row4 -->
                            <div class="d-flex align-items-center">
                                <label class="label-text w-[6rem]">施設住所</label>
                                <input type="text" class="flex-1 form-control" v-model="pump_facility_payload.fac_addr" maxlength="100">
                            </div>

                            <!-- group1-row5 -->
                            <div class="d-flex">
                                <label class="label-text w-[6rem]">備考</label>
                                <textarea class="flex-1 form-control" v-model="pump_facility_payload.fac_remarks"></textarea>
                            </div>
                        </div>

                        <!-- group 2 -->
                        <div class="d-flex flex-column input-gap">
                            <!-- group2-title -->
                            <div class="d-flex align-items-end justify-content-between">
                                <label class="fw-bold">■ 宛先情報({{ pumpFacility.destinations.length }}件)</label>
                                <button class="btn selection" @click="openDestination()">宛先新規登録</button>
                            </div>

                            <!-- group2-table -->
                            <div class="wrapper-scroll" style="min-height: 11rem;">
                                <div class="parent-scroll">
                                    <table class="view-scroll t-border">
                                        <thead class="text-center">
                                            <tr>
                                                <th>コード</th>
                                                <th>受取(新規)</th>
                                                <th>受取(交換)</th>
                                                <th>詳細</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="des in pumpFacility.destinations">
                                                <td class="text-center">{{ des.des_code_text }}</td>
                                                <td class="text-center">{{ (des.des_clinic || '')+' '+(des.des_doctor || '')+' '+(des.des_title || '')  }}</td>
                                                <td class="text-center">{{ (des.exc_clinic || '')+' '+(des.exc_doctor || '')+' '+(des.exc_title || '') }}</td>
                                                <td class="text-center">
                                                    <button class="btn default sm" @click="openDestination(des)">詳細</button>
                                                </td>
                                            </tr>
                                            <tr v-for="i in Math.max(0, (3 - pumpFacility.destinations.length))" class="row-disable">
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    <button class="opacity-0 btn sm">|</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <!-- group 3 -->
                        <div class="d-flex flex-column input-gap">
                            <!-- group3-title -->
                            <div class="d-flex align-items-center">
                                <label class="fw-bold">■ 契約状況</label>
                            </div>

                            <!-- group3-table -->
                            <div class="wrapper-scroll" style="min-height: 14rem;">
                                <div class="parent-scroll">
                                    <table class="view-scroll t-border">
                                        <thead class="text-center">
                                            <tr>
                                                <th>ポンプ</th>
                                                <th>締結日</th>
                                                <th>フォーマット</th>
                                                <th>契約区分</th>
                                                <th>次の更新</th>
                                                <th class="w-[10%]">詳細</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="contract in pumpFacility.contracts">
                                                <td>{{ contract.pump_list }}</td>
                                                <td class="text-center">{{ contract.signed_date }}</td>
                                                <td class="text-center">{{ typeText(master.format_types ?? [], contract.format) }}</td>
                                                <td class="text-center">{{ typeText(master.cont_types ?? [], contract.cont_type) }}</td>
                                                <td class="text-center">{{ contract.month_renew ? moment(contract.month_renew).format('YYYY年MM') : (contract.is_auto_renew ? '自動更新' : '') }}</td>
                                                <td class="text-center">
                                                    <button class="btn default sm" @click="openContractDetail(contract.id)">詳細</button>
                                                </td>
                                            </tr>
                                            <tr v-for="i in Math.max(0, (4 - pumpFacility.contracts.length))" class="row-disable">
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    <button class="opacity-0 btn sm">|</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
            
                    <!-- right -->
                    <div class="d-flex flex-column gap-1 basis-[50%]">
                        <!-- group 4 -->
                        <div class="d-flex flex-column input-gap">
                            <!-- group4-title -->
                            <div class="d-flex align-items-center">
                                <label class="fw-bold">■ 請求先関連情報</label>
                            </div>

                            <!-- group4-row1 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[70%]">
                                    <label class="label-text w-[6.5rem]">請求施設名</label>
                                    <input type="text" class="flex-1 form-control" :value="pumpFacility.fac_name" disabled>
                                </div>
                                <label class="label-text d-flex align-items-center gap-2 basis-[30%]">
                                    <input type="checkbox" class="mt-0 form-check-input" v-model="pump_facility_payload.ouput_detail" v-bind:true-value="1" v-bind:false-value="0">請求詳細情報出力
                                </label>
                            </div>

                            <!-- group4-row2 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[70%]">
                                    <label class="label-text w-[6.5rem]">卸</label>
                                    <select class="flex-1 form-select" v-model="pump_facility_payload.comp_code">
                                        <option :value="company.comp_cd" v-for="company in master.companies">{{ company.comp_nm_short }}</option>
                                    </select>
                                </div>
                                <div class="d-flex align-items-center basis-[30%]">
                                    <label class="label-text w-[5rem]">JDコード</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.jd_code" maxlength="8">
                                </div>
                            </div>

                            <!-- group4-row3 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex gap-3 basis-[70%]">
                                    <div class="d-flex align-items-center basis-[60%]">
                                        <label class="label-text w-[6.5rem]">得意先コード</label>
                                        <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.customer_cd" maxlength="10">
                                    </div>
                                    <div class="d-flex align-items-center basis-[40%]">
                                        <label class="label-text w-[4rem]">管轄DC</label>
                                        <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.center_code" maxlength="8">
                                    </div>
                                </div>
                                <div class="d-flex align-items-center basis-[30%]">
                                    <label class="label-text w-[5rem]">所属DC</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.sale_code" maxlength="8">
                                </div>
                            </div>
                        </div>

                        <!-- group 5 -->
                        <div class="d-flex flex-column input-gap">
                            <!-- group5-title -->
                            <div class="d-flex align-items-center">
                                <label class="fw-bold">■ 請求担当者情報(現任)</label>
                            </div>

                            <!-- group5-row1 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[50%]">
                                    <label class="label-text w-[6.5rem]">支店名</label>
                                    <input type="text" class="flex-1 form-control" v-model="pump_facility_payload.dep_name">
                                </div>
                                <div class="d-flex align-items-center basis-[50%]">
                                    <label class="label-text w-[7rem]">支店電話番号</label>
                                    <input type="text" class="flex-1 form-control" v-model="pump_facility_payload.dep_phone">
                                </div>
                            </div>

                            <!-- group5-row2 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[6.5rem]">所属コード</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.grp_code">
                                </div>
                                <div class="d-flex gap-2 basis-[60%]">
                                    <div class="d-flex align-items-center basis-[65%]">
                                        <label class="label-text w-[4rem]">所属名</label>
                                        <input type="text" class="flex-1 form-control" v-model="pump_facility_payload.grp_name">
                                    </div>
                                    <div class="d-flex align-items-center basis-[35%]">
                                        <button class="flex-1 btn selection" @click="openAgentSelection()">担当選択</button>
                                    </div>
                                </div>
                            </div>

                            <!-- group5-row3 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[6.5rem]">MSコード</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.ms_staff_code">
                                </div>
                                <div class="d-flex gap-2 basis-[60%]">
                                    <div class="d-flex align-items-center basis-[65%]">
                                        <label class="label-text w-[4rem]">MS名</label>
                                        <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.ms_staff_name">
                                    </div>
                                    <div class="d-flex align-items-center basis-[35%]">
                                        <label class="label-text w-[3rem]">役職</label>
                                        <select class="flex-1 form-select" v-model="pump_facility_payload.ms_staff_pos">
                                            <option v-for="pos in positions" :value="pos.pos_code">{{ pos.pos_name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- group5-row4 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[6.5rem]">携帯番号</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.ms_staff_phone">
                                </div>
                                <div class="d-flex align-items-center basis-[60%]">
                                    <label class="label-text w-[4rem]">Email</label>
                                    <input type="text" class="flex-1 form-control" v-model="pump_facility_payload.ms_staff_email">
                                </div>
                            </div>

                            <!-- group5-row5 -->
                            <div class="d-flex">
                                <label class="label-text w-[6.5rem]">特記I</label>
                                <textarea class="flex-1 form-control" v-model="pump_facility_payload.ms_remarks"></textarea>
                            </div>
                        </div>

                        <!-- group 6 -->
                        <div class="d-flex flex-column input-gap">
                            <!-- group6-title -->
                            <div class="d-flex align-items-end justify-content-between">
                                <label class="fw-bold">■ 請求担当者情報(前任)</label>
                                <div class="d-flex align-items-center">
                                    <label class="label-text w-[6.5rem]">担当変更日</label>
                                    <Datepicker class="w-[10rem]" disabled></Datepicker>
                                </div>
                            </div>

                             <!-- group6-row1 -->
                             <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[50%]">
                                    <label class="label-text w-[6.5rem]">支店名</label>
                                    <input type="text" class="flex-1 form-control" v-model="pump_facility_payload.ms_before_dep">
                                </div>
                                <div class="d-flex align-items-center basis-[50%]">
                                    <label class="label-text w-[4rem]">所属名</label>
                                    <input type="text" class="flex-1 form-control" v-model="pump_facility_payload.ms_before_grp">
                                </div>
                            </div>

                            <!-- group6-row2 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[6.5rem]">MSコード</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.ms_before_code">
                                </div>
                                <div class="d-flex gap-2 basis-[60%]">
                                    <div class="d-flex align-items-center basis-[65%]">
                                        <label class="label-text w-[4rem]">MS名</label>
                                        <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.ms_before_name">
                                    </div>
                                    <div class="d-flex align-items-center basis-[35%]">
                                        <label class="label-text w-[3rem]">役職</label>
                                        <select class="flex-1 form-select" v-model="pump_facility_payload.ms_before_pos">
                                            <option v-for="pos in positions" :value="pos.pos_code">{{ pos.pos_name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- group6-row3 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[6.5rem]">携帯番号</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.ms_before_phone">
                                </div>
                                <div class="d-flex align-items-center basis-[60%]">
                                    <label class="label-text w-[4rem]">Email</label>
                                    <input type="text" class="flex-1 form-control" v-model="pump_facility_payload.ms_before_email">
                                </div>
                            </div>
                        </div>

                        <!-- group 7 -->
                        <div class="d-flex flex-column input-gap">
                            <!-- group7-title -->
                            <div class="d-flex align-items-center justify-content-between">
                                <label class="fw-bold">■ 連帯者(契約担当者・上司等)</label>
                            </div>

                             <!-- group7-row1 -->
                             <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[50%]">
                                    <label class="label-text w-[6.5rem]">支店名</label>
                                    <input type="text" class="flex-1 form-control" v-model="pump_facility_payload.ms_relation_dep">
                                </div>
                                <div class="d-flex align-items-center basis-[50%]">
                                    <label class="label-text w-[4rem]">所属名</label>
                                    <input type="text" class="flex-1 form-control" v-model="pump_facility_payload.ms_relation_grp">
                                </div>
                            </div>

                            <!-- group7-row2 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[6.5rem]">MSコード</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.ms_relation_code">
                                </div>
                                <div class="d-flex gap-2 basis-[60%]">
                                    <div class="d-flex align-items-center basis-[65%]">
                                        <label class="label-text w-[4rem]">MS名</label>
                                        <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.ms_relation_name">
                                    </div>
                                    <div class="d-flex align-items-center basis-[35%]">
                                        <label class="label-text w-[3rem]">役職</label>
                                        <select class="flex-1 form-select" v-model="pump_facility_payload.ms_relation_pos">
                                            <option v-for="pos in positions" :value="pos.pos_code">{{ pos.pos_name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- group7-row3 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[6.5rem]">携帯番号</label>
                                    <input type="text" class="flex-1 text-center form-control " v-model="pump_facility_payload.ms_relation_phone">
                                </div>
                                <div class="d-flex align-items-center basis-[60%]">
                                    <label class="label-text w-[4rem]">Email</label>
                                    <input type="text" class="flex-1 form-control" v-model="pump_facility_payload.ms_relation_email">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="py-2 d-flex justify-content-around align-items-center">
                <button class="btn delete w-[8rem]" @click="deleteFacility()">データ取消</button>
                <button class="btn default w-[8rem]" @click="setIsOpenTransitDetail()">閉じる</button>
                <button class="btn w-[8rem]" @click="update()">保存</button>
            </div>
        </div>
    </div>

    <DestinationDetailModal
        v-if="isOpenDestination"
        :show="isOpenDestination"
        :facility="pumpFacility"
        :destination="destination_selected"
        @close="isOpenDestination = false"
        @saved="updateDestinations($event)"></DestinationDetailModal>

    <AgentSelectionModal
        v-if="isOpenAgentSelection"
        :show="isOpenAgentSelection"
        :staff_info="staff_info"
        @close="isOpenAgentSelection = false"
        @load="loadBillingStaff($event)"></AgentSelectionModal>

    <ContractDetailModal v-if="isOpenContractDetail" :show="isOpenContractDetail" :data="detail_data" @closeDetail="isOpenContractDetail = false" @loadData="reloadContract()" />

    <ConfirmModal ref="confirmDialog"></ConfirmModal>
</template>
<style scoped>
</style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
import moment from 'moment';
import DestinationDetailModal from "./modal/facility/DestinationDetailModal.vue";
import AgentSelectionModal from './modal/facility/AgentSelectionModal.vue';
import ContractDetailModal from "@/views/contract/modal/ContractDetailModal.vue";
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue";
import { typeText, mapPayload } from '@/helper.js';
import jp from '@/lang/jp.json';
</script>
<script>
export default {
    props: ['pumpFacility'],
    data: function () {
        return {
            isOpenDestination: false,
            destination_selected: null,
            isOpenAgentSelection: false,
            isOpenContractDetail: false,
            staff_info: {},
            positions: [],
            pump_facility_payload: {
                map: function (object) {
                    return mapPayload(this, {...object})
                },
                fac_area: null,
                fac_post: null,
                fac_tel: null,
                fac_fax: null,
                fac_addr: null,
                fac_remarks: null,
                
                fac_name: null,
                ouput_detail: null,
                comp_code: null,
                comp_name: null,
                jd_code: null,
                customer_cd: null,
                center_code: null,
                sale_code: null,

                dep_code: null,
                dep_name: null,
                dep_phone: null,
                ses_code: null,
                ses_name: null,
                grp_code: null,
                grp_name: null,

                ms_staff_code: null,
                ms_staff_name: null,
                ms_staff_pos: null,
                ms_staff_phone: null,
                ms_staff_email: null,
                ms_remarks: null,

                ms_before_dep: null,
                ms_before_grp: null,
                ms_before_code: null,
                ms_before_name: null,
                ms_before_pos: null,
                ms_before_phone: null,
                ms_before_email: null,

                ms_relation_dep: null,
                ms_relation_grp: null,
                ms_relation_code: null,
                ms_relation_name: null,
                ms_relation_pos: null,
                ms_relation_phone: null,
                ms_relation_email: null,
            },
            detail_data: {
                contract: {},
                from_contract_management: true,
                master: [],
                types: [],
            },
        }
    },
    watch: {
        'pump_facility_payload.comp_code': function () {
            this.loadPositions();
        },
        'destinations': function () {
            this.pumpFacility.destinations = this.destinations
        }
    },
    computed: {
        ...mapState({
            master: state => state.facility.master,
            destinations: state =>state.facility.destination
        }),
    },
    methods: {
        ...mapActions('facility', ['updatePumpFacility', 'deletePumpFacility', 'showPumpFacility']),
        ...mapMutations(['setTransitReloadParent', 'setIsOpenTransitDetail']),
        openDestination: function (destination = null) {
            this.destination_selected = destination
            this.isOpenDestination = true
        },
        updateDestinations: function (data) {
            this.pumpFacility.destinations = data
            this.isOpenDestination = false
        },
        openAgentSelection: function () {
            this.isOpenAgentSelection = true
        },
        loadBillingStaff: function (data) {
            console.log(data)
            // load before-staff
            this.pump_facility_payload.ms_before_code  = this.pumpFacility.ms_staff_code
            this.pump_facility_payload.ms_before_name  = this.pumpFacility.ms_staff_name
            this.pump_facility_payload.ms_before_dep   = this.pumpFacility.dep_name
            this.pump_facility_payload.ms_before_grp   = this.pumpFacility.grp_name
            this.pump_facility_payload.ms_before_pos   = this.pumpFacility.ms_staff_pos
            this.pump_facility_payload.ms_before_phone = this.pumpFacility.ms_staff_phone
            this.pump_facility_payload.ms_before_email = this.pumpFacility.ms_staff_email

            this.pump_facility_payload.comp_code      = data.com_code;
            this.pump_facility_payload.comp_name      = data.pump_company?.comp_nm_short;
            this.pump_facility_payload.jd_code        = data.pump_company?.jd_code;
            
            this.pump_facility_payload.dep_code       = data.dep_code;
            this.pump_facility_payload.dep_name       = data.department?.dep_name;
            this.pump_facility_payload.dep_phone       = data.department?.dep_phone;
            this.pump_facility_payload.ses_code       = data.ses_code;
            this.pump_facility_payload.ses_name       = data.session?.ses_name;
            this.pump_facility_payload.grp_code       = data.grp_code;
            this.pump_facility_payload.grp_name       = data.group?.grp_name;

            this.pump_facility_payload.ms_staff_code  = data.staff_cd;
            this.pump_facility_payload.ms_staff_name  = data.staff_nm;
            this.pump_facility_payload.ms_staff_pos   = data.pos_code;
            this.pump_facility_payload.ms_staff_phone = data.cell_phone;
            this.pump_facility_payload.ms_staff_email = data.staff_em;

            this.initStaffInfo();
            this.isOpenAgentSelection = false;
        },
        initStaffInfo: function () {
            this.staff_info = {
                com_code  : this.pump_facility_payload.comp_code,
                ses_code  : this.pump_facility_payload.ses_code,
                dep_code  : this.pump_facility_payload.dep_code,
                grp_code  : this.pump_facility_payload.grp_code,
                staff_code: this.pump_facility_payload.ms_staff_code,
            }
        },
        loadPositions: function () {
            this.positions = this.master.positions.filter(item => item.com_code == this.pump_facility_payload.comp_code);
        },
        update: async function () {
            console.log(this.pump_facility_payload)
            await this.updatePumpFacility({smd_code: this.pumpFacility.smd_code, payload: this.pump_facility_payload}).then((res) => {
                if(res && res.code == 200) {
                    this.setTransitReloadParent(true);
                    this.setIsOpenTransitDetail()
                }
            })
        },
        openContractDetail: async function (contract_id) {
            if(this.detail_data.master.length <= 0) {
                await this.$store.dispatch("getContractMaster").then((res) => {
                    this.detail_data.master = res.data.data
                })
            }
            await this.$store.dispatch("getContractDetail", {id: contract_id}).then((res) => {
                if (res.data.success) {
                    this.detail_data.contract = res.data.data
                    this.detail_data.types = res.data.data.pump_list.split(',')
                }
            })
            this.isOpenContractDetail = true
        },
        deleteFacility: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: jp.confirm,
                message: jp.delete_data_message,
            })

            if(ok) {
                await this.deletePumpFacility(this.pumpFacility.smd_code).then((res) => {
                    if(res && res.code == 200) {
                        console.log(res)
                        this.setTransitReloadParent(true)
                        this.setIsOpenTransitDetail()
                    }
                })
                await this.$refs.confirmDialog.close()
            }
        },
        reloadContract: async function () {
            await this.showPumpFacility(this.pumpFacility.smd_code).then((res) => {
                if(res && res.code == 200) {
                    this.pumpFacility.contracts = res.data.contracts;
                }
            })
        }
    },
    created: function () {
        this.pump_facility_payload.map(this.pumpFacility);
        this.initStaffInfo();
        this.loadPositions();
    },
    mounted: function () {
    }
}
</script>