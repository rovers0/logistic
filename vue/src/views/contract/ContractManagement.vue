<template>
    <div class="wrapper-scroll">
        <div class="mt-1 mb-3 d-flex justify-content-between">
            <div class="col-10">
                <div class="mb-2 d-flex">
                    <label class="col-1 col-form-label">更新区分</label>
                    <div class="col-2">
                        <select class="form-select" v-model="contract_search.is_auto_renew" >
                            <option :value="null">全て</option>
                            <option value="1">自動更新</option>
                            <option value="0">手動更新</option>
                        </select>
                    </div>
                    <label class="col-1 col-form-label ps-4">卸</label>
                    <div class="col-2">
                        <select class="form-select" v-model="contract_search.comp_cd">
                            <option :value="null">全て</option>
                            <option v-for="comp in comps" :value="comp.comp_cd">{{ comp.comp_nm_short }}</option>
                        </select>
                    </div>
                    <label class="col-1 col-form-label ps-4">更新日</label>
                    <div class="col-2">
                        <Datepicker month-picker format="yyyy年MM月" v-model="contract_search.month_renew" ></Datepicker>
                    </div>
                    <label class="col-1 col-form-label ps-3">契約状態</label>
                    <div class="col-2">
                        <select class="form-select" v-model="contract_search.status" >
                            <option :value="null">全て</option>
                            <option v-if="master.status_types" v-for="status in master.status_types" :value="status.id">{{ status.value }}</option>
                        </select>
                    </div>
                </div>
                <div class="d-flex">
                    <label class="col-2 col-form-label">施設名・DCFコード</label>
                    <div class="col-4">
                        <input type="text" class="form-control" v-model="contract_search.search_facility" @keypress="searchContract">
                    </div>
                    <label class="col-1 col-form-label ps-4">ポンプ</label>
                    <div class="col-2">
                        <select class="form-select" v-model="contract_search.target" >
                            <option :value="null">全て</option>
                            <option v-if="master.target_types" v-for="target_type in master.target_types" :value="target_type.pump_cd">[{{ target_type.pump_cd }}] {{ target_type.pump_nm_short }}</option>
                        </select>
                    </div>
                    <label class="col-1 col-form-label ps-3">フォーマット</label>
                    <div class="col-2">
                        <select class="form-select" v-model="contract_search.format" >
                            <option :value="null">全て</option>
                            <option v-if="master.format_types" v-for="format_type in master.format_types" :value="format_type.id">{{ format_type.value }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="mb-2 d-flex justify-content-end">
                    <button class="col-6 btn default" @click="reset">リセット</button>
                </div>
                <div class="d-flex justify-content-end">
                    <button class="col-6 btn" @click="searchData">検索</button>
                </div>
            </div>
        </div>
        <div class="mb-1 text-center">
            全{{ contracts?.count_total }}件中　◎{{ contracts?.count_info?.count_signed }}件　 〇{{ contracts?.count_info?.count_send_contract }}件　 ▲{{ contracts?.count_info?.count_no_renew }}件　 ×{{ contracts?.count_info?.count_stop_by_partner }}件　 ー{{ contracts?.count_info?.count_start }}件
        </div>
        <div class="mb-1 d-flex justify-content-between">
            <div class="d-flex">
                <button class="btn" :disabled="checkedItem.length > 0 ? false : true" @click="confirmCopy">更新設定</button>
                <button class="btn ms-2" @click="openFacilitySelection('facility-selection')">新規契約</button>
                <label class="mt-1 mb-0 ms-2 col-form-label">ページ表示件数</label>
                <div class="mt-1 mb-0 ms-2">
                    <select class="form-select" v-model="contract_search.limit" @change="searchData">
                        <option value="100">100件</option>
                        <option value="200">200件</option>
                        <option value="500">500件</option>
                        <option value="1000">1000件</option>
                        <option value="">全件</option>
                    </select>
                </div>
            </div>
            <div class="d-flex">
                <div class="mt-1 mb-0 d-flex">
                    <label class="col-form-label">{{ contracts?.total }} 件中 {{ contracts?.firstItem }}-{{ contracts?.lastItem }}</label>
                </div>
                <Pagination class="mt-1 mb-0 ms-3" v-model="contract_search.page" :page-count="contracts?.page_count" :page-range="3" :margin-pages="0" :click-handler="changePage" :prev-text="'<'" :next-text="'>'" :container-class="'pagination'" :page-class="'page-item'" :first-last-button="true" :first-button-text="'<<'" :last-button-text="'>>'"></Pagination>
            </div>
            <div class="col-3 d-flex justify-content-end">
                <button class="btn default" @click="exportContract('for-maker')">メーカー用一覧出力</button>
                <button class="btn default ms-2" @click="exportContract('list-data')">一覧出力</button>
            </div>
        </div>
        <div class="parent-scroll">
            <table class="view-scroll t-border">
                <thead class="text-center">
                    <tr>
                        <th class="" style="width: 3%;">
                            <input class="form-check-input" type="checkbox" v-model="isCheckAll" @click="checkAll">
                        </th>
                        <th class="thead-link" :class="contract_search.sort == 'pump_list' ? contract_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" style="width: 5%;" @click="sortColumn('pump_list')">
                          ポンプ
                        </th>
                        <th class="thead-link" :class="contract_search.sort == 'maker_use_code' ? contract_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" style="width: 8%;" @click="sortColumn('maker_use_code')">
                            メーカー管理番号
                        </th>
                        <th class="thead-link" :class="contract_search.sort == 'cust_cd' ? contract_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" style="width: 8%;" @click="sortColumn('cust_cd')">
                            得意先コード
                        </th>
                        <th class="thead-link" :class="contract_search.sort == 'prof_name' ? contract_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" style="width: 7%;" @click="sortColumn('prof_name')">
                            都道府県
                        </th>
                        <th class="thead-link" :class="contract_search.sort == 'area_name' ? contract_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" style="width: 7%;" @click="sortColumn('area_name')">
                            エリア
                        </th>
                        <th class="thead-link" :class="contract_search.sort == 'fac_name' ? contract_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" style="width: 12%;" @click="sortColumn('fac_name')">
                            施設名
                        </th>
                        <th class="thead-link" :class="contract_search.sort == 'first_date' ? contract_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" style="width: 7%;" @click="sortColumn('first_date')">
                            初回締結日
                        </th>
                        <th class="thead-link" :class="contract_search.sort == 'comp' ? contract_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" style="width: 8%;" @click="sortColumn('comp')">
                            卸
                        </th>
                        <th class="thead-link" :class="contract_search.sort == 'status' ? contract_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" style="width: 4%;" @click="sortColumn('status')">
                            状態
                        </th>
                        <th class="thead-link" :class="contract_search.sort == 'month_renew' ? contract_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" style="width: 7%;" @click="sortColumn('month_renew')">
                            更新日
                        </th>
                        <th class="thead-link" :class="contract_search.sort == 'format' ? contract_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" style="width: 5%;" @click="sortColumn('format')">
                            フォーマット
                        </th>
                        <th style="width: 4%;">詳細</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="contract in contracts?.data" :class="contract.status == STATUS_BE_SIGNED ? 'selected' : contract.status == STATUS_NO_RENEW ? 'renew-contract' : contract.status == STATUS_STOP_BY_PARTNER ? 'stop-contract' : ''">
                        <td class="text-center">
                            <input class="form-check-input" type="checkbox" v-model="checkedItem" :value="contract.id" @change="updateCheckAll">
                        </td>
                        <td class="text-center">{{ getPumpList(contract.pump_list) }}</td>
                        <td class="text-center">{{ contract.maker_use_code }}</td>
                        <td class="text-center">{{ contract.cust_cd }}</td>
                        <td class="text-center">{{ contract.prof_name }}</td>
                        <td>{{ contract.area_name }}</td>
                        <td>{{ contract.fac_name }}</td>
                        <td class="text-center">{{ contract.first_date }}</td>
                        <td>{{ contract.comp_name }}</td>
                        <td class="text-center">{{ getContractStatus(contract.status) }}</td>
                        <td class="text-center">{{ contract.is_auto_renew ? '自動更新' : getMonthRenew(contract.month_renew) }}</td>
                        <td class="text-center">{{ getFormatType(contract.format) }}</td>
                        <td class="text-center">
                            <button class="btn default" style="white-space: nowrap;" @click="openDetail('contract-detail', contract.id)">詳細</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <FacilitySelectionModal v-if="actionModal == 'facility-selection'" :show="showFacilitySelection" :data="facilities" @loadData="getData" @closeFacilitySelection="closeFacilitySelection" />
    <ContractDetailModal v-if="actionModal == 'contract-detail'" :show="showDetail" :data="detail_data" @loadData="getData" @closeDetail="closeDetail" />
    <ConfirmModal ref="confirmDialog"></ConfirmModal>
</template>

<script setup>
import FacilitySelectionModal from "@/views/contract/modal/FacilitySelectionModal.vue";
import Pagination from "@/components/Pagination.vue";
import { CONTRACT_STATUS, STATUS_BE_SIGNED, STATUS_NO_RENEW, STATUS_STOP_BY_PARTNER } from "@/components/Constants.vue";
import ContractDetailModal from "@/views/contract/modal/ContractDetailModal.vue";
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue";
import moment from 'moment';
</script>
<script>
export default {
    data: function () {
        return {
            actionModal: "",
            showFacilitySelection: false,
            showDetail: false,
            contract_search: this.$store.state.contract.contractList,
            // state: this.$store.state,
            contracts: [],
            master: {},
            comps: [],
            facilities: {},
            detail_data: {
                contract: {},
                types: [],
                master: []
            },
            isCheckAll: false,
            checkedItem: []
        }
    },
    mounted: function () {
        this.getMaster();
        this.getData();
    },
    methods: {
        checkAll: function () {
            this.isCheckAll = !this.isCheckAll;
            this.checkedItem = [];
            if (this.isCheckAll) {
                this.contracts.data.some(item => {
                    this.checkedItem.push(item.id);
                });
            }
        },
        updateCheckAll: function () {
            if (this.checkedItem.length == this.contracts.data.length) {
                this.isCheckAll = true;
            } else {
                this.isCheckAll = false;
            }
        },
        openFacilitySelection: function (action) {
            let data = {
                limit: 100,
                page: 1
            };
            this.$store.dispatch("getFacilityList", data).then((res) => {
                this.facilities.data = res.data.data;
                this.facilities.companies = this.comps;
                this.actionModal = action;
                this.showFacilitySelection = true;
            });
        },
        closeFacilitySelection: function () {
            this.showFacilitySelection = false;
        },
        reset: function () {
            this.contract_search.search_facility = null;
            this.contract_search.month_renew = null;
            this.contract_search.comp_cd = null;
            this.contract_search.is_auto_renew = null;
            this.contract_search.format = null;
            this.contract_search.status = null;
            this.contract_search.target = null;
            this.contract_search.sort = null;
            this.contract_search.sort_by = null;
            this.contract_search.page = 1;
            this.getData();
        },
        getData: function (sort) {
            this.isCheckAll = false;
            this.checkedItem = [];
            if (this.contracts?.data) {
                this.contracts.data = [];
            }
            // this.contract_search.target = this.state.pump_code;
            let data = this.contract_search;
            if (sort != undefined && sort == 'id') {
                this.contract_search.sort = sort;
                this.contract_search.sort_by = 'desc';
            }
            data.month_renew_search = data.month_renew ? moment(data.month_renew).format('YYYY-MM-DD') : null;
            this.$store.dispatch("getContractList", data).then((res) => {
                this.contracts = res.data.data;
            });
        },
        searchData: function () {
            this.contract_search.page = 1;
            this.getData();
        },
        getMaster: function () {
            this.$store.dispatch("getContractMaster").then((res) => {
                this.master = res.data.data;
                this.detail_data.master = res.data.data;
            });
            this.$store.dispatch("getCompList").then((res) => {
                this.comps = res.data.data;
            });
        },
        changePage: function (pagenum) {
            this.contract_search.page = pagenum;
            this.getData();
        },
        getFormatType: function (format) {
            let format_name = this.master?.format_types?.filter(item => item.id == format);
            return format_name[0]?.value ?? '';
        },
        getContractStatus: function (status) {
            return CONTRACT_STATUS[status] ?? '-';
        },
        sortColumn: function (column) {
            if (this.contract_search.sort == column) {
                if (this.contract_search.sort_by == 'asc') {
                    this.contract_search.sort_by = 'desc';
                } else if (this.contract_search.sort_by == 'desc') {
                    this.contract_search.sort = '';
                    this.contract_search.sort_by = '';
                } else {
                    this.contract_search.sort_by = 'asc';
                }
            } else {
                this.contract_search.sort = column;
                this.contract_search.sort_by = 'asc';
            }
            this.getData();
        },
        openDetail: function (action, id) {
            let data = {
                id: id
            };
            this.$store.dispatch("getContractDetail", data).then((res) => {
                this.detail_data.contract = {};
                if (res.data.success) {
                    this.detail_data.from_contract_management = true;
                    this.detail_data.contract = res.data.data;
                    this.detail_data.types = res.data.data.pump_list.split(',');
                }
                this.actionModal = action;
                this.showDetail = true;
            });
        },
        closeDetail: function () {
            this.actionModal = '';
            this.showDetail = false;
        },
        confirmCopy: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: '契約更新設定',
                message: '選択された契約の更新データを作成します。※一覧データはそのまま残ります。',
                okButton: '実行',
                cancelButton: '閉じる'
            });
            if (ok) {
                let data = {
                    ids: this.checkedItem
                };
                this.$store.dispatch("addToReNewContract", data).then((res) => {
                    if (res.data.success) {
                        this.isCheckAll = false;
                        this.checkedItem = [];
                        this.$refs.confirmDialog.show({
                            title: '契約更新設定',
                            message: '年度更新データを作成しました。',
                            cancelButton: '閉じる',
                            type: 1
                        });
                    }
                });
                await this.$refs.confirmDialog.close();
            }
        },
        getMonthRenew: function (month_renew) {
            return month_renew ? moment(month_renew).format('YYYY/MM/DD') : null;
        },
        getPumpList: function (pump_list) {
            return pump_list.split(',').join(' + ');
        },
        exportContract: async function (type_export) {
            let data = this.contract_search;
            data.month_renew_search = data.month_renew ? moment(data.month_renew).format('YYYY-MM-DD') : null;
            data.type_export = type_export;
            data.data_type = 0;
            await this.$store.dispatch("export", data)
        },
        searchContract: function ($event) {
            if ($event.key == 'Enter') {
                this.getData();
            }
        }
    }
}
</script>