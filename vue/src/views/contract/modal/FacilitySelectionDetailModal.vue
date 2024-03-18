<template>
    <ModalLayout :show="show" title="契約情報詳細" maxWidth="max-w-8xl" :class="'px-0'" @close="closeFacilitySelectionDetail()">
        <div class="pt-2">
            <div class="d-flex">
                <div class="col-6">
                    <div class="container">
                        <div class="mb-2 d-flex justify-content-between">
                            <div class="title-small">■ 施設情報</div>
                        </div>
                        <div class="row mb-2">
                            <div class="d-flex col-5">
                                <label class="col-form-label col-5">都道府県</label>
                                <select disabled class="form-select">
                                    <option>{{ facility.prof_name }}</option>
                                </select>
                            </div>
                            <div class="d-flex col-7">
                                <label class="col-form-label col-3">エリア名</label>
                                <select disabled class="form-select">
                                    <option>{{ facility.facility.profecture.area_cd }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="d-flex col-5">
                                <label class="col-form-label col-5">DCFコード</label>
                                <input disabled type="text" class="form-control text-center" v-model="facility.facility_alt">
                            </div>
                            <div class="d-flex col-7">
                                <label class="col-form-label col-3">施設名</label>
                                <input type="text" class="form-control" v-model="facility.facility_nm">
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="d-flex col-5">
                                <label class="col-form-label col-5">郵便番号</label>
                                <input type="text" class="form-control text-center" v-model="facility.facility.post_cd">
                            </div>
                            <div class="d-flex col-7">
                                <label class="col-form-label col-3">施設住所</label>
                                <input type="text" class="form-control" v-model="facility.facility.address">
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="d-flex col-5">
                                <label class="col-form-label col-5">電話番号</label>
                                <input type="text" class="form-control text-center" v-model="facility.facility.phone">
                            </div>
                            <div class="d-flex col-7">
                                <label class="col-form-label col-4">メーカー管理番号</label>
                                <input type="text" class="form-control" v-model="contract.maker_use_code">
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="d-flex col-12">
                                <label class="col-form-label col-2">連携施設</label>
                                <textarea class="form-control" rows="2"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="container mt-3">
                        <div class="mb-1 d-flex justify-content-between">
                            <div class="title-small">■ ポンプ契約情報</div>
                            <div class="d-flex">
                                <label class="col-form-label col-4">対象ポンプ</label>
                                <input disabled type="text" class="form-control text-center" v-model="types">
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="d-flex col-5">
                                <label class="col-form-label col-5">作業開始日</label>
                                <date-picker v-model="contract.start_date" :enableTimePicker="false" format="yyyy/MM/dd" locale="ja" cancelText="" selectText="" auto-apply keep-action-row :close-on-auto-apply="true"></date-picker>
                            </div>
                            <div class="d-flex col-7">
                                <label class="col-form-label col-3">有効期間</label>
                                <div class="col-3">
                                    <select class="form-select">
                                        <option v-for="i in 10" :value="i">{{ i }}年</option>
                                    </select>
                                </div>
                                <div class="col-form-label ms-2">契約区分</div>
                                <div class="form-check col-form-label ms-4">
                                    <input class="form-check-input" type="radio" v-model="contract.cont_type" value="0" name="radio" id="2社契約">
                                    <label class="form-check-label" for="2社契約">
                                        2社
                                    </label>
                                </div>
                                <div class="form-check col-form-label ms-2">
                                    <input class="form-check-input" type="radio" v-model="contract.cont_type" value="1" name="radio" id="3社契約">
                                    <label class="form-check-label" for="3社契約">
                                        3社
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="d-flex col-5">
                                <label class="col-form-label col-5">完了期限</label>
                                <date-picker v-model="contract.limit_date" :enableTimePicker="false" format="yyyy/MM/dd" locale="ja" cancelText="" selectText="" auto-apply keep-action-row :close-on-auto-apply="true"></date-picker>
                            </div>
                            <div class="d-flex col-7">
                                <label class="col-form-label col-3">次の更新</label>
                                <div class="col-5">
                                    <date-picker class="" v-model="contract.month_renew" :enableTimePicker="false" format="yyyy年MM月" locale="ja" cancelText="" selectText="" auto-apply keep-action-row month-picker :close-on-auto-apply="true"></date-picker>
                                </div>
                                <div class="form-check col-form-label ms-3">
                                    <input class="form-check-input" type="checkbox" v-model="contract.is_auto_renew" id="自動更新">
                                    <label class="form-check-label" for="自動更新">自動更新</label>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="d-flex col-5">
                                <label class="col-form-label col-5">締結日<span class="text-danger">※</span></label>
                                <date-picker v-model="contract.signed_date" :enableTimePicker="false" format="yyyy/MM/dd" locale="ja" cancelText="" selectText="" auto-apply keep-action-row :close-on-auto-apply="true"></date-picker>
                            </div>
                            <div class="d-flex col-7">
                                <label class="col-form-label col-3">フォーマット</label>
                                <div v-for="format,i in data.master.format_types" :class="i > 0 ? 'ms-2' : ''" class="form-check col-form-label">
                                    <input class="form-check-input" type="radio" v-model="contract.format" :value="format.id" name="radio1" :id="format.value">
                                    <label class="form-check-label" :for="format.value">
                                        {{ format.value }}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="d-flex col-5">
                                <label class="col-form-label col-5">締結状態</label>
                                <select class="form-select" v-model="contract.status">
                                    <option v-for="status in data.master.status_types" :value="status.id">{{ status.value }}</option>
                                </select>
                            </div>
                            <div class="d-flex col-7">
                                <label class="col-form-label col-3">契約進捗</label>
                                <select class="form-select">
                                    <option>{{ contract.stat_text }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="d-flex mb-2">
                            <label class="col-form-label col-1">対応</label>
                            <div class="col-11">
                                <textarea v-model="contract.irre_text" class="form-control" rows="2"></textarea>
                            </div>
                        </div>
                        <div class="d-flex mb-2">
                            <label class="col-form-label col-1">備考</label>
                            <div class="col-11">
                                <textarea v-model="contract.noti_text" class="form-control" rows="2"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="container overflow-auto mb-3">
                        <div class="mb-2 d-flex justify-content-between">
                            <div class="title-small">■ 施設契約状況</div>
                        </div>
                        <table class="t-border">
                            <thead class="text-center">
                                <tr>
                                    <th>ポンプ</th>
                                    <th>契約状態</th>
                                    <th>締結日</th>
                                    <th>有効期間</th>
                                    <th>契約区分</th>
                                    <th>フォーマット</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="target in data.master.target_types">
                                    <tr v-if="contract.pump_list?.includes(target.code)">
                                        <td>[{{ target.code }}] {{ target.short_name }}</td>
                                        <td class="text-center">{{ getContractStatus(contract.status) }}</td>
                                        <td class="text-center">{{ contract.signed_date }}</td>
                                        <td class="text-center">{{ getContractRenew(contract.is_auto_renew) }}</td>
                                        <td class="text-center">{{ getContractType(contract.cont_type) }}</td>
                                        <td class="text-center">{{ getContractFormat(contract.format) }}</td>
                                    </tr>
                                    <tr v-else-if="data.types.includes(target.code)" class="selected">
                                        <td>[{{ target.code }}] {{ target.short_name }}</td>
                                        <td class="text-center">{{ getContractStatus(0) }}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr v-else>
                                        <td>[{{ target.code }}] ********</td>
                                        <td class="text-center">-</td>
                                        <td class="text-center">-</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                    <div class="container mb-3">
                        <div class="title-small mb-1">■ 卸担当者情報</div>
                        <div class="row mb-2">
                            <div class="d-flex col-5">
                                <label class="col-form-label col-5">得意先コード</label>
                                <input disabled type="text" class="form-control text-center" v-model="contract.cust_cd">
                            </div>
                            <div class="d-flex col-7">
                                <label class="col-form-label col-3">卸(会社)</label>
                                <input disabled type="text" class="form-control" v-model="contract.comp_name">
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="d-flex col-8">
                                <label class="col-form-label col-3">支店・部署</label>
                                <input disabled type="text" class="form-control">
                            </div>
                            <div class="d-flex col-4">
                                <label class="col-form-label col-5">支店長名</label>
                                <input disabled type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="d-flex col-5">
                                <label class="col-form-label col-5">郵便番号</label>
                                <input disabled type="text" class="form-control">
                            </div>
                            <div class="d-flex col-7">
                                <label class="col-form-label col-3">所属住所</label>
                                <input disabled type="text" class="form-control">
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="col-11">
                                <div class="row mb-2">
                                    <div class="d-flex col-4">
                                        <label class="col-form-label col-5">担当者名</label>
                                        <input type="text" class="form-control">
                                    </div>
                                    <div class="d-flex col-3">
                                        <label class="col-form-label col-3">役職</label>
                                        <input type="text" class="form-control">
                                    </div>
                                    <div class="d-flex col-5">
                                        <label class="col-form-label col-3">携帯番号</label>
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="d-flex col-4">
                                        <label class="col-form-label col-6">担当者コード</label>
                                        <input type="text" class="form-control">
                                    </div>
                                    <div class="d-flex col-8">
                                        <label class="col-form-label col-2">Email</label>
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-1 d-flex justify-content-end py-2">
                                <button class="btn selection text-small px-3" @click="openAgentSelection('agent-selection')">担当<br>選択</button>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <div class="title-small">■ 前任担当</div>
                            <div class="d-flex">
                                <label class="col-5 col-form-label">担当者更新日</label>
                                <date-picker class="" :enableTimePicker="false" format="yyyy/MM/dd" locale="ja" cancelText="" selectText="" auto-apply keep-action-row :close-on-auto-apply="true"></date-picker>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="R3情報による担当者自動更新">
                                <label class="form-check-label" for="R3情報による担当者自動更新">R3情報による担当者自動更新</label>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="d-flex col-4">
                                <label class="col-form-label col-5">担当者名</label>
                                <input type="text" class="form-control">
                            </div>
                            <div class="d-flex col-3">
                                <label class="col-form-label col-3">役職</label>
                                <input type="text" class="form-control">
                            </div>
                            <div class="d-flex col-5">
                                <label class="col-form-label col-3">携帯番号</label>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <div class="d-flex col-4">
                                <label class="col-form-label col-6">担当者コード</label>
                                <input type="text" class="form-control">
                            </div>
                            <div class="d-flex col-8">
                                <label class="col-form-label col-2">Email</label>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-1 mb-2 d-flex justify-content-evenly">
            <button class="btn delete">データ取消</button>
            <button class="btn default" :disabled="contract.signed_date ? false : true">完了</button>
            <button class="btn default" @click="closeFacilitySelectionDetail">閉じる</button>
            <button class="btn">保存</button>
        </div>
    </ModalLayout>
    <AgentSelectionModal v-if="actionModal == 'agent-selection'" :show="showAgentSelection" :data="{}" @closeAgentSelection="closeAgentSelection" />
</template>
<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import DatePicker from "@vuepic/vue-datepicker";
import '@vuepic/vue-datepicker/dist/main.css'
import AgentSelectionModal from "@/views/contract/modal/AgentSelectionModal.vue";
import { CONTRACT_STATUS_LABEL } from "@/components/Constants.vue";
</script>
<script>
export default {
    props: ['show', 'data'],
    emits: ["closeFacilitySelectionDetail"],
    data: function () {
        return {
            actionModal: '',
            showAgentSelection: false,
            types: '',
            facility: {},
            contract: {}
        };
    },
    updated: function () {
        this.loadData();
    },
    mounted: function () {
        this.loadData();
    },
    methods: {
        closeFacilitySelectionDetail: function () {
            this.$emit("closeFacilitySelectionDetail");
        },
        openAgentSelection: function (action) {
            this.actionModal = action;
            this.showAgentSelection = true;
        },
        closeAgentSelection: function () {
            this.showAgentSelection = false;
        },
        loadData: function () {
            this.facility = this.$props.data.data;
            this.contract = this.$props.data.contract;
            this.types = this.$props.data.types.sort().join(' + ');
        },
        getContractStatus: function (status) {
            return CONTRACT_STATUS_LABEL[status] ?? '-';
        },
        getContractRenew: function(is_auto_renew) {
            if(is_auto_renew){
                return '自動更新';
            }else{
                return '';
            }
        },
        getContractType: function(type) {
            return type == 1 ? '3社' : '2社';
        },
        getContractFormat: function(format) {
            return this.$props.data.master.format_types.filter(item => item.id == format)[0].value;
        }
    },
};
</script>
  