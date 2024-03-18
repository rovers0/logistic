<template>
    <div class="transit">
        <div class="wrapper-scroll">
            <div class="parent-scroll">
                <div class="gap-3 d-flex view-scroll">
                    <!-- left -->
                    <div class="d-grid gap-3 basis-[50%]">
                        <!-- group 1 -->
                        <div class="d-grid input-gap">
                            <!-- group1-title -->
                            <div class="mb-2 d-flex align-items-center">
                                <label class="fw-bold">■ 基本情報</label>
                            </div>
            
                            <!-- group1-row1 -->
                            <div class="gap-2 d-flex">
                                <div class="d-flex align-items-center basis-[33%]">
                                    <label class="label-text w-[6rem]">SMDコード</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pumpFacility.smd_code" disabled>
                                </div>
                                <div class="d-flex basis-[67%] gap-2">
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[5rem]">都道府県</label>
                                        <input type="text" class="flex-1 text-center form-control" v-model="pumpFacility.fac_prof_name" disabled>
                                    </div>
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[4rem]">エリア</label>
                                        <select class="flex-1 form-select" v-model="pumpFacility.area_cd">
                                            <option v-for="area in master.areas" :value="area.area_cd">{{ area.area_nm }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- group1-row2 -->
                            <div class="gap-2 d-flex">
                                <div class="d-flex align-items-center basis-[33%]">
                                    <label class="label-text w-[6rem]">DCFコード</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pumpFacility.dcf_code" disabled>
                                </div>
                                <div class="d-flex align-items-center basis-[67%]">
                                    <label class="label-text w-[5rem]">施設名</label>
                                    <input type="text" class="flex-1 form-control" v-model="pumpFacility.fac_name" disabled>
                                </div>
                            </div>

                            <!-- group1-row3 -->
                            <div class="gap-2 d-flex">
                                <div class="d-flex align-items-center basis-[33%]">
                                    <label class="label-text w-[6rem]">郵便番号</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.fac_post" maxlength="8">
                                </div>
                                <div class="d-flex basis-[67%] gap-2">
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
            
                        </div>

                        <!-- group 2 -->
                        <div class="d-grid input-gap">
                            <!-- group2-title -->
                            <div class="d-flex align-items-center justify-content-between">
                                <label class="fw-bold">■ 納入先情報({{ pumpFacility.destinations.length }}件)</label>
                                <button class="btn selection w-[5rem]" @click="openRegisDeliveryDestination()">追加</button>
                            </div>

                            <!-- group2-table -->
                            <div class="wrapper-scroll" style="min-height: 12rem;">
                                <div class="parent-scroll">
                                    <table class="view-scroll t-border">
                                        <thead class="text-center">
                                            <tr>
                                                <th class="w-[15%]">コード</th>
                                                <th>受取部署</th>
                                                <th class="w-[20%]">受取担当</th>
                                                <th class="w-[10%]">敬称</th>
                                                <th class="w-[15%]">住所情報</th>
                                                <th class="w-[12%]">詳細</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="destination in pumpFacility.destinations">
                                                <td class="text-center">{{ destination.des_code_text }}</td>
                                                <td>{{ destination.des_clinic }}</td>
                                                <td class="text-center">{{ destination.des_doctor }}</td>
                                                <td class="text-center">{{ destination.des_title }}</td>
                                                <td class="text-center" :class="{'text-danger': !destination.des_copy}">{{ typeText(master.des_copy ?? [], destination.des_copy) }}</td>
                                                <td class="text-center">
                                                    <button class="btn default sm" @click="openUpdateDeliveryDestination(destination)">詳細</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <!-- group 3 -->
                        <div class="d-grid input-gap">
                            <!-- group3-title -->
                            <div class="d-flex align-items-center">
                                <label class="fw-bold">■ 契約状況</label>
                            </div>

                            <!-- group3-table -->
                            <div class="wrapper-scroll" style="min-height: 12rem;">
                                <div class="parent-scroll">
                                    <table class="view-scroll t-border">
                                        <thead class="text-center">
                                            <tr>
                                                <th>ポンプ</th>
                                                <th class="w-[20%]">締結日</th>
                                                <th class="w-[15%]">フォーマット</th>
                                                <th class="w-[15%]">契約区分</th>
                                                <th class="w-[20%]">次の更新</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="contract in pumpFacility.contracts">
                                                <td>{{ contract.pump_list }}</td>
                                                <td class="text-center">{{ contract.signed_date }}</td>
                                                <td class="text-center">{{ typeText(master.format_types ?? [], contract.format) }}</td>
                                                <td class="text-center">{{ typeText(master.cont_types ?? [], contract.cont_type) }}</td>
                                                <td class="text-center">{{ contract.month_renew ? moment(contract.month_renew).format('YYYY/MM/DD') : '' }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
            
                    <!-- right -->
                    <div class="d-grid gap-3 basis-[50%]" style="height: fit-content;">
                        <!-- group 1 -->
                        <div class="d-grid input-gap">
                            <!-- group1-title -->
                            <div class="mb-2 d-flex align-items-center">
                                <label class="fw-bold">■ 請求関連情報</label>
                            </div>

                            <!-- group1-row1 -->
                            <div class="gap-4 d-flex">
                                <div class="d-flex align-items-center basis-[55%]">
                                    <label class="label-text w-[7rem]">卸</label>
                                    <select class="flex-1 form-select" v-model="pump_facility_payload.comp_code">
                                        <option :value="null"></option>
                                        <option :value="company.comp_cd" v-for="company in master.companies">{{ company.comp_nm_short }}</option>
                                    </select>
                                </div>
                                <div class="d-flex align-items-center basis-[25%]">
                                    <label class="label-text w-[5rem]">JDコード</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.jd_code" maxlength="8">
                                </div>
                                <label class="label-text d-flex align-items-center gap-2 basis-[20%]">
                                    <input type="checkbox" class="mt-0 form-check-input" v-model="pump_facility_payload.ouput_detail">請求データ出力対象
                                </label>
                            </div>

                            <!-- group1-row2 -->
                            <div class="gap-4 d-flex">
                                <div class="d-flex align-items-center basis-[60%]">
                                    <label class="label-text w-[7rem]">得意先コード</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.customer_cd" maxlength="10">
                                </div>
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[9.5rem]">グループコード</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.sale_code" maxlength="8">
                                </div>
                            </div>

                            <!-- group1-row3 -->
                            <div class="gap-4 d-flex">
                                <div class="d-flex align-items-center basis-[60%]">
                                    <label class="label-text w-[7rem]">支店</label>
                                    <input type="text" class="flex-1 form-control" v-model="pump_facility_payload.dep_name" maxlength="50">
                                </div>
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[9.5rem]">管轄センターコード</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.center_code" maxlength="8">
                                </div>
                            </div>

                            <!-- group1-row4 -->
                            <div class="gap-4 d-flex">
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[7rem]">所属コード</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.grp_code" maxlength="16">
                                </div>
                                <div class="d-flex basis-[60%] gap-2">
                                    <div class="flex-1 d-flex align-items-center">
                                        <label class="label-text w-[5rem]">所属名</label>
                                        <input type="text" class="flex-1 form-control" v-model="pump_facility_payload.grp_name" maxlength="50">
                                    </div>
                                    <button class="btn selection" @click="openAgentSelection()">担当選択</button>
                                </div>
                            </div>

                            <!-- group1-row5 -->
                            <div class="gap-4 d-flex">
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[7rem]">MS担当コード</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.ms_staff_code" maxlength="20">
                                </div>
                                <div class="d-flex basis-[60%] gap-3">
                                    <div class="d-flex align-items-center basis-[60%]">
                                        <label class="label-text w-[5rem]">担当者名</label>
                                        <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.ms_staff_name" maxlength="50">
                                    </div>
                                    <div class="d-flex align-items-center basis-[40%]">
                                        <label class="label-text w-[3rem]">役職</label>
                                        <select class="flex-1 form-select" v-model="pump_facility_payload.ms_staff_pos">
                                            <option v-for="position in positions" :value="position.pos_code">{{ position.pos_name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- group1-row6 -->
                            <div class="gap-4 d-flex">
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[7rem]">電話番号</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.ms_staff_phone" maxlength="20">
                                </div>
                                <div class="d-flex align-items-center basis-[60%]">
                                    <label class="label-text w-[3rem]">Email</label>
                                    <input type="text" class="flex-1 form-control" v-model="pump_facility_payload.ms_staff_email" maxlength="60">
                                </div>
                            </div>

                            <!-- group1-row7 -->
                            <div class="gap-4 d-flex">
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[7rem]">前任担当者</label>
                                    <input type="text" class="flex-1 form-control" v-model="pump_facility_payload.ms_before_name" maxlength="50">
                                </div>
                                <div class="d-flex basis-[60%] gap-3">
                                    <div class="d-flex align-items-center basis-[30%]">
                                        <label class="label-text w-[3rem]">役職</label>
                                        <input type="text" class="flex-1 text-center form-control" v-model="pump_facility_payload.ms_before_pos">
                                    </div>
                                    <div class="d-flex align-items-center basis-[70%]">
                                        <label class="label-text w-[5rem]">電話番号</label>
                                        <input type="text" class="flex-1 form-control" v-model="pump_facility_payload.ms_before_phone" maxlength="20">
                                    </div>
                                </div>
                            </div>

                            <!-- group1-row8 -->
                            <div class="gap-4 d-flex">
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[7rem]">担当変更日</label>
                                    <input type="text" class="flex-1 text-center form-control" value="?" disabled>
                                </div>
                                <div class="d-flex align-items-center basis-[60%]">
                                    <label class="label-text w-[3rem]">Email</label>
                                    <input type="text" class="flex-1 form-control" v-model="pump_facility_payload.ms_before_email" maxlength="60">
                                </div>
                            </div>
                        </div>

                        <!-- group 2 -->
                        <div class="d-grid input-gap">
                            <!-- group2-title -->
                            <div class="mb-2 d-flex align-items-center">
                                <label class="fw-bold">■ 契約関連情報</label>
                            </div>

                            <!-- group2-row1 -->
                            <div class="gap-4 d-flex">
                                <div class="d-flex align-items-center basis-[45%]">
                                    <label class="label-text w-[7rem]">卸</label>
                                    <input type="text" class="flex-1 form-control" disabled :value="pumpFacility.contract?.comp_name">
                                </div>
                                <div class="d-flex align-items-center basis-[55%]">
                                    <label class="label-text w-[4rem]">支店</label>
                                    <input type="text" class="flex-1 form-control" disabled :value="pumpFacility.contract?.staffNow?.dep_name">
                                </div>
                            </div>

                            <!-- group2-row2 -->
                            <div class="gap-4 d-flex">
                                <div class="d-flex align-items-center basis-[45%]">
                                    <label class="label-text w-[7rem]">所属コード</label>
                                    <input type="text" class="flex-1 text-center form-control" disabled :value="pumpFacility.contract?.staffNow?.grp_code">
                                </div>
                                <div class="d-flex align-items-center basis-[55%]">
                                    <label class="label-text w-[4rem]">所属名</label>
                                    <input type="text" class="flex-1 form-control" disabled :value="pumpFacility.contract?.staffNow?.grp_name">
                                </div>
                            </div>

                            <!-- group2-row3 -->
                            <div class="gap-4 d-flex">
                                <div class="d-flex align-items-center basis-[45%]">
                                    <label class="label-text w-[7rem]">MS担当コード</label>
                                    <input type="text" class="flex-1 text-center form-control" disabled :value="pumpFacility.contract?.staff_cd_now">
                                </div>
                                <div class="d-flex basis-[55%] gap-3">
                                    <div class="d-flex align-items-center basis-[55%]">
                                        <label class="label-text w-[4rem]">担当者名</label>
                                        <input type="text" class="flex-1 text-center form-control" disabled :value="pumpFacility.contract?.staffNow?.staff_nm">
                                    </div>
                                    <div class="d-flex align-items-center basis-[45%]">
                                        <label class="label-text w-[3rem]">役職</label>
                                        <input type="text" class="flex-1 text-center form-control" disabled :value="typeText(master.positions ,pumpFacility.contract?.staffNow?.staff_pos, 'pos_code', 'pos_name')">
                                    </div>
                                </div>
                            </div>
                            <!-- group2-row4 -->
                            <div class="gap-3 d-flex">
                                <div class="flex-1 d-flex align-items-center">
                                    <label class="label-text w-[7rem]">施設名</label>
                                    <input type="text" class="flex-1 form-control" :value="pumpFacility.contract?.fac_name" disabled>
                                </div>
                                <button class="btn default">契約情報詳細</button>
                            </div>

                            <!-- group2-row5 -->
                            <div class="gap-4 d-flex">
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[7rem]">電話番号</label>
                                    <input type="text" class="flex-1 text-center form-control" disabled :value="pumpFacility.contract?.staffNow?.staff_phone">
                                </div>
                                <div class="d-flex align-items-center basis-[60%]">
                                    <label class="label-text w-[3rem]">Email</label>
                                    <input type="text" class="flex-1 form-control" disabled :value="pumpFacility.contract?.staffNow?.staff_em">
                                </div>
                            </div>

                            <!-- group2-row5 -->
                            <div class="d-flex align-items-center">
                                <label class="label-text w-[9rem]">メーカー管理番号</label>
                                <input type="text" class="flex-1 form-control" :value="pumpFacility.contract?.maker_use_code" disabled>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="py-2 d-flex justify-content-around align-items-center">
                <button class="btn delete w-[8rem]">データ取消</button>
                <button class="btn default w-[8rem]" @click="setIsOpenTransitDetail()">閉じる</button>
                <button class="btn w-[8rem]" @click="update()">保存</button>
            </div>
        </div>
    </div>
    <RegistrationOfDeliveryDestinationModal 
        v-if="isOpenRegisDD"
        :show="isOpenRegisDD"
        @close="isOpenRegisDD = false"
        @saved="addDestination($event)"
        :facility="pumpFacility"></RegistrationOfDeliveryDestinationModal>

    <UpdateOfDeliveryDestinationModal
        v-if="isOpenUpdateDD"
        :show="isOpenUpdateDD"
        @close="isOpenUpdateDD = false"
        @saved="reloadDestination($event)"
        :facility="pumpFacility"
        :destination_detail="destination_detail"></UpdateOfDeliveryDestinationModal>

    <AgentSelectionModal
        v-if="isOpenAgentSelection"
        :show="isOpenAgentSelection"
        :staff_info="staff_info"
        @close="isOpenAgentSelection = false"
        @load="loadBillingStaff($event)"></AgentSelectionModal>
</template>
<style scoped>
</style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
import moment from 'moment';
import RegistrationOfDeliveryDestinationModal from './modal/RegistrationOfDeliveryDestinationModal.vue';
import UpdateOfDeliveryDestinationModal from './modal/UpdateOfDeliveryDestinationModal.vue';
import AgentSelectionModal from './modal/AgentSelectionModal.vue';
import { typeText, mapPayload } from '@/helper.js';
</script>
<script>
export default {
    props: ['pumpFacility'],
    data: function () {
        return {
            isOpenRegisDD: false,
            isOpenUpdateDD: false,
            isOpenAgentSelection: false,
            destination_detail: {},
            staff_info: {},
            positions: [],
            pump_facility_payload: {
                map: function (object) {
                    return mapPayload(this, {...object})
                },
                fac_post: null,
                fac_tel: null,
                fac_fax: null,
                fac_addr: null,
                comp_code: null,
                comp_name: null,
                jd_code: null,
                ouput_detail: null,
                customer_cd: null,
                sale_code: null,
                dep_code: null,
                dep_name: null,
                center_code: null,
                grp_code: null,
                grp_name: null,
                ses_code: null,
                ses_name: null,
                ms_staff_code: null,
                ms_staff_name: null,
                ms_staff_pos: null,
                ms_staff_phone: null,
                ms_staff_email: null,
                ms_before_name: null,
                ms_before_pos: null,
                ms_before_phone: null,
                ms_before_email: null,
            }
        }
    },
    watch: {
        'pump_facility_payload.comp_code':  function () {
            this.loadPositions();
        }
    },
    computed: {
        ...mapState({
            master: state => state.facility.master
        }),
    },
    methods: {
        ...mapActions('facility', ['updatePumpFacility']),
        ...mapMutations(['setTransitReloadParent', 'setIsOpenTransitDetail']),
        openRegisDeliveryDestination: function () {
            this.isOpenRegisDD = true
        },
        addDestination: function (data) {
            this.pumpFacility.destinations.unshift(data);
            this.isOpenRegisDD = false;
        },
        openUpdateDeliveryDestination: function (destination) {
            this.destination_detail = destination;
            this.isOpenUpdateDD = true
        },
        reloadDestination: function (data) {
            this.pumpFacility.destinations = this.pumpFacility.destinations.map(item => {
                if(item.smd_code == data.smd_code && item.des_code == data.des_code) {
                    return data;
                }
                return item;
            });
            this.isOpenUpdateDD = false;
        },
        openAgentSelection: function () {
            this.isOpenAgentSelection = true
        },
        loadBillingStaff: function (data) {
            this.pumpFacility.comp_code = data.com_code;
            this.pumpFacility.jd_code = data.pump_company?.jd_code;
            // this.pumpFacility.customer_cd = ?;
            this.pumpFacility.dep_name = data.department?.dep_name;
            this.pumpFacility.grp_code = data.grp_code;
            this.pumpFacility.grp_name = data.group?.grp_name;
            this.pumpFacility.ms_staff_code = data.staff_cd;
            this.pumpFacility.ms_staff_name = data.staff_nm;
            this.pumpFacility.ms_staff_pos = data.position?.pos_code;
            this.pumpFacility.ms_staff_phone = data.cell_phone;
            this.pumpFacility.ms_staff_email = data.staff_em;

            this.pumpFacility.comp_name = data.pump_company?.comp_nm_short;
            this.pumpFacility.ses_code = data.ses_code;
            this.pumpFacility.ses_name = data.session?.ses_name;
            this.pumpFacility.dep_code = data.dep_code;

            this.initStaffInfo();
            this.pump_facility_payload.map(this.pumpFacility);
            this.isOpenAgentSelection = false;
        },
        initStaffInfo: function () {
            this.staff_info = {
                com_code: this.pumpFacility.comp_code,
                ses_code: this.pumpFacility.ses_code,
                dep_code: this.pumpFacility.dep_code,
                grp_code: this.pumpFacility.grp_code,
                staff_code: this.pumpFacility.ms_staff_code,
            }
        },
        loadPositions: function () {
            this.positions = this.master.positions.filter(item => item.com_code == this.pump_facility_payload.comp_code);
        },
        update: async function () {
            await this.updatePumpFacility({smd_code: this.pumpFacility.smd_code, payload: this.pump_facility_payload}).then((res) => {
                if(res && res.code == 200) {
                    this.setTransitReloadParent(true);
                }
            });
        }
    },
    created: function () {
        this.pumpFacility.area_cd = this.pumpFacility?.contract?.area_cd ?? null;
        this.pumpFacility.contract = this.pumpFacility?.contract ? this.pumpFacility.contract : {};
        this.pumpFacility.ouput_detail = this.pumpFacility.ouput_detail ? true : false;
        this.initStaffInfo();
        this.loadPositions(this.pumpFacility);
        this.pump_facility_payload.map(this.pumpFacility);
    },
    mounted: function () {
    }
}
</script>