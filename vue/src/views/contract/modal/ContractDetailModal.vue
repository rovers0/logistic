<template>
    <ModalLayout :show="show" title="契約情報詳細" maxWidth="max-w-8xl" :class="'px-0'" @close="closeDetail()">
        <div class="pt-2">
            <div class="d-flex">
                <div class="col-6">
                    <div class="container">
                        <div class="mb-2 d-flex justify-content-between">
                            <div class="title-small">■ 施設情報</div>
                            <div class="d-flex">
                                <label class="col-form-label col-5">得意先コード</label>
                                <input type="text" class="text-center form-control" v-model="contract.cust_cd">
                            </div>
                        </div>
                        <div class="mb-2 row">
                            <div class="d-flex col-5">
                                <label class="col-form-label col-5">都道府県</label>
                                <select disabled class="form-select">
                                    <option >{{ contract.prof_name }}</option>
                                </select>
                            </div>
                            <div class="d-flex col-7">
                                <label class="col-form-label col-3">エリア名</label>
                                <select class="form-select" v-model="contract.area_cd">
                                    <option v-for="area in data.master.areas" :value="area.area_cd">{{ area.area_nm }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-2 row">
                            <div class="d-flex col-5">
                                <label class="col-form-label col-5">DCFコード</label>
                                <input  type="text" class="text-center form-control" v-model="contract.dcf_code">
                            </div>
                            <div class="d-flex col-7">
                                <label class="col-form-label col-3">施設名</label>
                                <input type="text" class="form-control" v-model="contract.fac_name">
                            </div>
                        </div>
                        <div class="mb-2 row">
                            <div class="d-flex col-5">
                                <label class="col-form-label col-5">郵便番号</label>
                                <input type="text" class="text-center form-control" v-model="contract.fac_post">
                            </div>
                            <div class="d-flex col-7">
                                <label class="col-form-label col-3">施設住所</label>
                                <input type="text" class="form-control" v-model="contract.fac_addr">
                            </div>
                        </div>
                        <div class="mb-2 row">
                            <div class="d-flex col-5">
                                <label class="col-form-label col-5">電話番号</label>
                                <input type="text" class="text-center form-control" v-model="contract.fac_tel">
                            </div>
                            <div class="d-flex col-7">
                                <label class="col-form-label col-4">メーカー管理番号</label>
                                <input type="text" class="form-control" v-model="contract.maker_use_code">
                            </div>
                        </div>
                        <div class="mb-2 row">
                            <div class="d-flex col-12">
                                <label class="col-form-label col-2">連携施設</label>
                                <textarea class="form-control" rows="2" v-model="contract.fac_link"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="container mt-3">
                        <div class="mb-2 d-flex justify-content-between">
                            <div class="title-small">■ ポンプ契約情報</div>
                            <div class="d-flex">
                                <label class="col-form-label col-4">初回締結日</label>
                                <date-picker v-model="contract.first_date" :disabled="true" :enableTimePicker="false" format="yyyy/MM/dd" locale="ja" cancelText="" selectText="" auto-apply keep-action-row :close-on-auto-apply="true"></date-picker>
                            </div>
                            <div class="d-flex">
                                <label class="col-form-label col-4">対象ポンプ</label>
                                <input disabled type="text" class="text-center form-control" v-model="types">
                            </div>
                        </div>
                        <div class="mb-2 row">
                            <div class="d-flex col-4">
                                <label class="col-form-label col-5">作業開始日</label>
                                <date-picker v-model="contract.start_date" :enableTimePicker="false" format="yyyy/MM/dd" locale="ja" cancelText="" selectText="" auto-apply keep-action-row :close-on-auto-apply="true"></date-picker>
                            </div>
                            <div class="d-flex col-8">
                                <label class="col-form-label col-2">有効期間</label>
                                <div class="col-3 me-4">
                                    <select class="form-select" v-model="contract.cont_long">
                                        <option :value="null"></option>
                                        <option v-for="i in 10" :value="i">{{ i }}年</option>
                                    </select>
                                </div>
                                <div class="col-3 col-form-label ms-3">契約区分</div>
                                <div class="col-3">
                                    <select class="form-select" v-model="contract.cont_type">
                                        <option :value="null"></option>
                                        <option :value="0">2者</option>
                                        <option :value="1">3者</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="mb-2 row">
                            <div class="d-flex col-4">
                                <label class="col-form-label col-5">完了期限</label>
                                <date-picker v-model="contract.limit_date" :enableTimePicker="false" format="yyyy/MM/dd" locale="ja" cancelText="" selectText="" auto-apply keep-action-row :close-on-auto-apply="true"></date-picker>
                            </div>
                            <div class="d-flex col-8">
                                <label class="col-form-label col-2">次の更新</label>
                                <div class="col-5">
                                    <date-picker :disabled="contract.is_auto_renew || (!contract.signed_date && !contract.first_date) ? true : false" v-model="contract.month_renew" :enableTimePicker="false" format="yyyy年MM月" locale="ja" cancelText="" selectText="" auto-apply keep-action-row month-picker :close-on-auto-apply="true"></date-picker>
                                </div>
                                <div class="form-check col-form-label ms-5">
                                    <input class="form-check-input" type="checkbox" v-model="contract.is_auto_renew" id="自動更新" @change="changeAutoRenew">
                                    <label class="form-check-label" for="自動更新">自動更新</label>
                                </div>
                            </div>
                        </div>
                        <div class="mb-2 row">
                            <div class="d-flex col-4">
                                <label class="col-form-label col-5">契約書送信日</label>
                                <date-picker @internal-model-change="" v-model="contract.send_date" :enableTimePicker="false" format="yyyy/MM/dd" locale="ja" cancelText="" selectText="" auto-apply keep-action-row :close-on-auto-apply="true"></date-picker>
                            </div>
                            <div class="d-flex col-8">
                                <label class="col-form-label col-2">進捗</label>
                                <div class="col-10">
                                    <select class="form-select" v-model="contract.stat_text">
                                        <option :value="null"></option>
                                        <option value="締結に向け活動中">締結に向け活動中</option>
                                        <option value="使用していないため中止">使用していないため中止</option>
                                        <option value="法人・連携施設にて締結のため不要">法人・連携施設にて締結のため不要</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="mb-2 row">
                            <div class="d-flex col-4">
                                <label class="col-form-label col-5">締結日</label>
                                <date-picker @internal-model-change="" v-model="contract.signed_date" :enableTimePicker="false" format="yyyy/MM/dd" locale="ja" cancelText="" selectText="" auto-apply keep-action-row :close-on-auto-apply="true" @update:model-value="contract.month_renew = contract.signed_date ? contract.month_renew : null"></date-picker>
                            </div>
                            <div class="d-flex col-8">
                                <label class="col-form-label col-2">契約状態</label>
                                <div class="col-4">
                                    <select class="form-select" v-model="contract.status">
                                        <option v-for="status in data.master.status_types" :value="status.id">{{ status.value }}</option>
                                    </select>
                                </div>
                                <label class="col-form-label col-3 ps-4">フォーマット</label>
                                <div class="col-3">
                                    <select class="form-select" v-model="contract.format">
                                        <option :value="null"></option>
                                        <option v-for="format in data.master.format_types" :value="format.id">{{ format.value }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="mb-2 d-flex">
                            <label class="col-form-label col-1">対応</label>
                            <div class="col-11">
                                <textarea v-model="contract.irre_text" class="form-control" rows="2"></textarea>
                            </div>
                        </div>
                        <div class="mb-2 d-flex">
                            <label class="col-form-label col-1">備考</label>
                            <div class="col-11">
                                <textarea v-model="contract.noti_text" class="form-control" rows="2"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="container mb-3 overflow-auto">
                        <div class="mb-2 d-flex justify-content-between">
                            <div class="title-small">■ 施設契約状況</div>
                        </div>
                        <table class="t-border">
                            <thead class="text-center">
                                <tr>
                                    <th>ポンプ</th>
                                    <th>契約状態</th>
                                    <th>初回締結日</th>
                                    <th>締結日</th>
                                    <th>次の更新</th>
                                    <th>契約区分</th>
                                    <th>フォーマット</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="target in data.master.target_types">
                                    <tr v-if="contract.pump_list?.includes(target.pump_cd)" class="selected">
                                        <td>[{{ target.pump_cd }}] {{ target.pump_nm_short }}</td>
                                        <td class="text-center">{{ getContractStatus(contract.status) }}</td>
                                        <td class="text-center">{{ getContractDate(contract.first_date) }}</td>
                                        <td class="text-center">{{ getContractDate(contract.signed_date) }}</td>
                                        <td class="text-center">{{ getContractMonthRenew(contract) }}</td>
                                        <td class="text-center">{{ getContractType(contract.cont_type) }}</td>
                                        <td class="text-center">{{ getContractFormat(contract.format) }}</td>
                                    </tr>
                                    <template v-else-if="pumpCodeList?.includes(target.pump_cd)" v-for="pump_list, i in pumpList">
                                        <tr v-if="pumpCodeList.findIndex(item => { return item == target.pump_cd }) == i">
                                            <td>[{{ target.pump_cd }}] {{ target.pump_nm_short }}</td>
                                            <td class="text-center">{{ getContractStatus(pump_list.status) }}</td>
                                            <td class="text-center">{{ getContractDate(pump_list.first_date) }}</td>
                                            <td class="text-center">{{ getContractDate(pump_list.signed_date) }}</td>
                                            <td class="text-center">{{ getContractMonthRenew(pump_list) }}</td>
                                            <td class="text-center">{{ getContractType(pump_list.cont_type) }}</td>
                                            <td class="text-center">{{ getContractFormat(pump_list.format) }}</td>
                                        </tr>
                                    </template>
                                    <tr v-else>
                                        <td>[{{ target.pump_cd }}] ********</td>
                                        <td class="text-center">-</td>
                                        <td class="text-center"></td>
                                        <td class="text-center">-</td>
                                        <td class="text-center">-</td>
                                        <td class="text-center">-</td>
                                        <td></td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                    <div class="container mb-3">
                        <div class="mb-1 title-small">■ 卸担当者情報</div>
                        <div class="mb-2 row">
                            <div class="d-flex col-5">
                                <label class="col-form-label col-5">得意先コード</label>
                                <input disabled type="text" class="text-center form-control" v-model="contract.cust_cd">
                            </div>
                            <div class="d-flex col-7">
                                <label class="col-form-label col-3">卸</label>
                                <input disabled type="text" class="form-control" v-model="contract.comp_name">
                            </div>
                        </div>
                        <div class="mb-2 row">
                            <div class="d-flex col-8">
                                <label class="col-form-label col-3">支店・部署</label>
                                <input disabled type="text" class="form-control" v-model="contract.staffNow.dep_name">
                            </div>
                            <div class="d-flex col-4">
                                <label class="col-form-label col-5">支店長名</label>
                                <input disabled type="text" class="form-control" v-model="contract.staffNow.man_name">
                            </div>
                        </div>
                        <div class="mb-2 row">
                            <div class="d-flex col-5">
                                <label class="col-form-label col-5">郵便番号</label>
                                <input disabled type="text" class="form-control" v-model="contract.staffNow.office_post">
                            </div>
                            <div class="d-flex col-7">
                                <label class="col-form-label col-3">所属住所</label>
                                <input disabled type="text" class="form-control" v-model="contract.staffNow.office_addr">
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="col-11">
                                <div class="mb-2 row">
                                    <div class="d-flex col-5">
                                        <label class="col-form-label col-5 me-2">担当者名</label>
                                        <input type="text" class="form-control ms-1" v-model="contract.staffNow.staff_nm">
                                    </div>
                                    <div class="d-flex col-3">
                                        <label class="col-form-label col-3">役職</label>
                                        <input type="text" class="form-control" v-model="contract.staffNow.staff_pos">
                                    </div>
                                    <div class="d-flex col-4">
                                        <label class="col-form-label col-4">携帯番号</label>
                                        <input type="text" class="form-control" v-model="contract.staffNow.staff_phone">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="d-flex col-5">
                                        <label class="col-form-label col-5 me-2">担当者コード</label>
                                        <input type="text" class="form-control ms-1" v-model="contract.staffNow.staff_cd">
                                    </div>
                                    <div class="d-flex col-7">
                                        <label class="col-form-label col-1 me-2">Email</label>
                                        <input type="text" class="form-control" v-model="contract.staffNow.staff_em">
                                    </div>
                                </div>
                            </div>
                            <div class="py-2 col-1 d-flex justify-content-end">
                                <button class="px-3 btn selection text-small" @click="openAgentSelection('agent-selection')">担当<br>選択</button>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="mb-2 d-flex justify-content-between align-items-center">
                            <div class="title-small">■ 前任担当</div>
                            <div class="d-flex">
                                <label class="col-4 col-form-label">担当者更新日</label>
                                <date-picker class="" :disabled="true" :enableTimePicker="false" format="yyyy/MM/dd" locale="ja" cancelText="" selectText="" auto-apply keep-action-row :close-on-auto-apply="true"></date-picker>
                            </div>
                            <div class="d-flex">
                                <button class="btn selection" @click="copyStaffNow">担当複製</button>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" v-model="contract.is_auto_change_staff" id="R3情報による担当者自動更新">
                                <label class="form-check-label" for="R3情報による担当者自動更新">R3情報による担当者自動更新</label>
                            </div>
                        </div>
                        <div class="mb-2 row">
                            <div class="d-flex col-5">
                                <label class="col-form-label col-5">担当者名</label>
                                <input type="text" class="form-control" v-model="contract.staffBefore.staff_nm">
                            </div>
                            <div class="d-flex col-3">
                                <label class="col-form-label col-3">役職</label>
                                <input type="text" class="form-control" v-model="contract.staffBefore.staff_pos">
                            </div>
                            <div class="d-flex col-4">
                                <label class="col-form-label col-4">携帯番号</label>
                                <input type="text" class="form-control" v-model="contract.staffBefore.staff_phone">
                            </div>
                        </div>
                        <div class="row">
                            <div class="d-flex col-5">
                                <label class="col-form-label col-5">担当者コード</label>
                                <input type="text" class="form-control" v-model="contract.staffBefore.staff_cd">
                            </div>
                            <div class="d-flex col-7">
                                <label class="col-form-label col-1">Email</label>
                                <input type="text" class="form-control ms-2" v-model="contract.staffBefore.staff_em">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-1 mb-2 d-flex justify-content-evenly">
            <button :disabled="contract.status == STATUS_CONTRACT_START || contract.status == STATUS_STOP_BY_PARTNER ? false : true" class="btn delete" @click="confirmDelete(contract.id)">データ取消</button>
            <!-- <button v-if="from_contract_management" class="btn default" :disabled="contract.signed_date && contract.status == STATUS_BE_SIGNED ? false : true" @click="updateContract">完了</button> -->
            <button class="btn default" @click="closeDetail">閉じる</button>
            <button class="btn" @click="updateContract">保存</button>
        </div>
    </ModalLayout>
    <AgentSelectionModal v-if="actionModal == 'agent-selection'" :show="showAgentSelection" :data="modal_data" @setStaff="setStaff" @closeAgentSelection="closeAgentSelection" />
    <ConfirmModal ref="confirmDialog"></ConfirmModal>
</template>
<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import DatePicker from "@vuepic/vue-datepicker";
import '@vuepic/vue-datepicker/dist/main.css'
import AgentSelectionModal from "@/views/contract/modal/AgentSelectionModal.vue";
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue";
import { CONTRACT_STATUS_LABEL, STATUS_CONTRACT_START, STATUS_SEND_CONTRACT, STATUS_STOP_BY_PARTNER, STATUS_BE_SIGNED, STATUS_NO_RENEW } from "@/components/Constants.vue";
import moment from 'moment';
</script>
<script>
export default {
    props: ['show', 'data'],
    emits: ["closeDetail", "loadData"],
    data: function () {
        return {
            actionModal: '',
            showAgentSelection: false,
            types: '',
            contract: {},
            modal_data: {},
            from_contract_management: false,
            pumpList: [],
            pumpCodeList: [],
            changeOldStaff: true,
            staffBeforeTemp: {}
        };
    },
    updated: function () {

    },
    mounted: function () {
        this.loadData();
    },
    methods: {
        closeDetail: function () {
            this.$emit("closeDetail");
        },
        openAgentSelection: function (action) {
            let data = {
                comp_code: this.contract.staffNow.comp_code,
                ses_code: this.contract.staffNow.ses_code,
                dep_code: this.contract.staffNow.dep_code
            };
            this.modal_data.staff_info = data;
            this.modal_data.staff_info.staff_cd = this.contract.staffNow.staff_cd;
            this.$store.dispatch("getStaffList", data).then((res) => {
                this.modal_data.staffs = res.data.data && res.data.data.length > 0 ? res.data.data : [];
            }).then(() => {
                this.$store.dispatch("getCompList", data).then((res) => {
                    this.modal_data.comps = res.data.data;
                }).then(() => {
                    this.$store.dispatch("getSessionList", data).then((res) => {
                        this.modal_data.sessions = res.data.data.session;
                        this.modal_data.deps = res.data.data.department;
                        this.actionModal = action;
                        this.showAgentSelection = true;
                    });
                });
            });
        },
        closeAgentSelection: function () {
            this.showAgentSelection = false;
        },
        loadData: function () {
            this.from_contract_management = this.$props.data.from_contract_management ? true : false;
            this.contract = this.$props.data.contract;
            this.contract.staffNow = this.contract.staffNow ? this.contract.staffNow : {};
            this.contract.staffBefore = this.contract.staffBefore ? this.contract.staffBefore : {};
            this.types = this.$props.data.types.sort().join(' + ');
            if (this.contract.pumpList.length > 0) {
                this.pumpCodeList = [];
                this.pumpList = [];
                this.contract.pumpList.some(item => {
                    item.pump_list.some(value => {
                        this.pumpCodeList.push(value);
                        this.pumpList.push(item);
                    });
                });
            }
            console.log(this.pumpList);
        },
        getContractStatus: function (status) {
            return CONTRACT_STATUS_LABEL[status] ?? '-';
        },
        getContractRenew: function (is_auto_renew) {
            if (is_auto_renew) {
                return '自動更新';
            } else {
                return this.contract.cont_long + '年';
            }
        },
        getContractLong: function (cont_long) {
            return cont_long ? cont_long + '年' : '';
        },
        getContractType: function (type) {
            return type == 1 ? '3者' : type == 0 ? '2者' : '';
        },
        getContractFormat: function (format) {
            return this.$props.data.master.format_types.filter(item => item.id == format)[0]?.value;
        },
        getContractDate: function (date) {
            return date ? moment(date).format('yyyy/MM/DD') : null;
        },
        getContractSignedDate: function (signed_date) {
            return signed_date ? moment(signed_date).format('yyyy/MM/DD') : null;
        },
        getContractMonthRenew: function (contract) {
          return contract.month_renew ? contract.month_renew.year + "年" + (contract.month_renew.month +1) + "月" : contract.is_auto_renew ? '自動更新' : null;
        },
        updateContract: function () {
            let data = this.contract;
            data.data_month_renew = data.month_renew ? moment(data.month_renew).format('yyyy/MM/DD') : null;
            data.data_first_date = data.first_date ? moment(data.first_date).format('yyyy/MM/DD') : null;
            data.data_start_date = data.start_date ? moment(data.start_date).format('yyyy/MM/DD') : null;
            data.data_limit_date = data.limit_date ? moment(data.limit_date).format('yyyy/MM/DD') : null;
            data.data_signed_date = data.signed_date ? moment(data.signed_date).format('yyyy/MM/DD') : null;
            data.data_send_date = data.send_date ? moment(data.send_date).format('yyyy/MM/DD') : null;
            data.format_type = data.format;
            if ([STATUS_BE_SIGNED].includes(data.status)) {
                if (!data.is_auto_renew && !data.month_renew && !data.first_date) {
                    this.$store.commit('showErrorModal', '契約状態が「◎締結済」の場合、「次の更新」の入力または「自動更新」へのチェックが必須です。');
                    return;
                }
            }
            this.$store.dispatch("updateContract", data).then((res) => {
                if (res.data.success) {
                    this.$emit("loadData");
                    this.closeDetail();
                }
            });
        },
        confirmDelete: async function (id) {
            const ok = await this.$refs.confirmDialog.show({
                title: '確認',
                message: '選択したデータを削除しますか。',
                okButton: '実行',
                cancelButton: 'キャンセル'
            });
            if (ok) {
                let data = {
                    id: id,
                    status: this.contract.status
                };
                this.$store.dispatch("deleteContract", data).then((res) => {
                    if (res.data.success) {
                        this.$emit("loadData");
                    } else {

                    }
                });
                await this.$refs.confirmDialog.close();
                this.$emit("loadData");
                this.closeDetail();
            }
        },
        setStaff: function (staff_new) {
            if (this.contract.staffNow.staff_cd != staff_new.staff_cd) {
                this.contract.staffNow.comp_name = staff_new.comp_name;
                this.contract.staffNow.dep_name = staff_new.dep_name;
                this.contract.staffNow.man_name = staff_new.man_name;
                this.contract.staffNow.office_post = staff_new.office_post;
                this.contract.staffNow.office_addr = staff_new.office_addr;
                this.contract.staffNow.staff_cd = staff_new.staff_cd;
                this.contract.staffNow.staff_nm = staff_new.staff_nm;
                this.contract.staffNow.staff_pos = staff_new.pos_name;
                this.contract.staffNow.staff_phone = staff_new.cell_phone;
                this.contract.staffNow.staff_em = staff_new.staff_em;
            }
            // if (this.contract.staffNow.staff_cd != staff_new.staff_cd) {
            //     if(this.changeOldStaff){
            //         this.staffBeforeTemp.staff_cd = this.contract.staffBefore.staff_cd;
            //         this.staffBeforeTemp.staff_nm = this.contract.staffBefore.staff_nm;
            //         this.staffBeforeTemp.staff_pos = this.contract.staffBefore.staff_pos;
            //         this.staffBeforeTemp.staff_phone = this.contract.staffBefore.staff_phone;
            //         this.staffBeforeTemp.staff_em = this.contract.staffBefore.staff_em;

            //         this.contract.staffBefore.staff_cd = this.contract.staffNow.staff_cd;
            //         this.contract.staffBefore.staff_nm = this.contract.staffNow.staff_nm;
            //         this.contract.staffBefore.staff_pos = this.contract.staffNow.staff_pos;
            //         this.contract.staffBefore.staff_phone = this.contract.staffNow.staff_phone;
            //         this.contract.staffBefore.staff_em = this.contract.staffNow.staff_em;

            //         this.contract.staffNow.comp_name = staff_new.comp_name;
            //         this.contract.staffNow.dep_name = staff_new.dep_name;
            //         this.contract.staffNow.man_name = staff_new.man_name;
            //         this.contract.staffNow.office_post = staff_new.office_post;
            //         this.contract.staffNow.office_addr = staff_new.office_addr;
            //         this.contract.staffNow.staff_cd = staff_new.staff_cd;
            //         this.contract.staffNow.staff_nm = staff_new.staff_nm;
            //         this.contract.staffNow.staff_pos = staff_new.pos_name;
            //         this.contract.staffNow.staff_phone = staff_new.cell_phone;
            //         this.contract.staffNow.staff_em = staff_new.staff_em;

            //         this.contract.is_auto_change_staff = false;
            //         this.changeOldStaff = false;
            //     }else{
            //         this.contract.staffNow.comp_name = staff_new.comp_name;
            //         this.contract.staffNow.dep_name = staff_new.dep_name;
            //         this.contract.staffNow.man_name = staff_new.man_name;
            //         this.contract.staffNow.office_post = staff_new.office_post;
            //         this.contract.staffNow.office_addr = staff_new.office_addr;
            //         this.contract.staffNow.staff_cd = staff_new.staff_cd;
            //         this.contract.staffNow.staff_nm = staff_new.staff_nm;
            //         this.contract.staffNow.staff_pos = staff_new.pos_name;
            //         this.contract.staffNow.staff_phone = staff_new.cell_phone;
            //         this.contract.staffNow.staff_em = staff_new.staff_em;

            //         if(staff_new.staff_cd == this.contract.staffBefore.staff_cd){
            //             this.contract.is_auto_change_staff = true;
            //             this.changeOldStaff = true;

            //             this.contract.staffBefore.staff_cd = this.staffBeforeTemp.staff_cd;
            //             this.contract.staffBefore.staff_nm = this.staffBeforeTemp.staff_nm;
            //             this.contract.staffBefore.staff_pos = this.staffBeforeTemp.staff_pos;
            //             this.contract.staffBefore.staff_phone = this.staffBeforeTemp.staff_phone;
            //             this.contract.staffBefore.staff_em = this.staffBeforeTemp.staff_em;
            //         }
            //     }
            // }else{

            // }
        },
        changeAutoRenew: function () {
            this.contract.month_renew = this.contract.is_auto_renew ? null : this.contract.is_auto_renew;
        },
        copyStaffNow: function () {
            this.contract.staffBefore.staff_cd = this.contract.staffNow.staff_cd;
            this.contract.staffBefore.staff_nm = this.contract.staffNow.staff_nm;
            this.contract.staffBefore.staff_pos = this.contract.staffNow.staff_pos;
            this.contract.staffBefore.staff_phone = this.contract.staffNow.staff_phone;
            this.contract.staffBefore.staff_em = this.contract.staffNow.staff_em;
        }
    },
};
</script>
  