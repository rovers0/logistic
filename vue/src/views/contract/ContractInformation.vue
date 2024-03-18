<template>
    <div class="wrapper-scroll">
        <div class="mt-1 mb-3 d-flex justify-content-between">
            <div class="col-10">
                <div class="mb-2 d-flex">
                    <label class="col-1 col-form-label">年度</label>
                    <div class="col-2 d-flex justify-content-between align-items-center">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" v-model="contract_search.year_renew" :value="current_year"  name="year_renew" id="year_renew">
                            <label class="form-check-label" for="year_renew">
                                {{ current_year }}年度
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" v-model="contract_search.year_renew" :value="last_year"  name="year_renew" id="year_renew1">
                            <label class="form-check-label" for="year_renew1">
                                {{ last_year }}年度
                            </label>
                        </div>
                    </div>
                    <label class="col-1 col-form-label ps-4">卸</label>
                    <div class="col-2">
                        <select class="form-select" v-model="contract_search.comp_cd" >
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
                    <label class="col-1 col-form-label">施設名・コード</label>
                    <div class="col-5">
                        <input type="text" class="form-control" v-model="contract_search.search_facility" @keypress="searchContract">
                    </div>
                    <label class="col-1 col-form-label ps-4">ポンプ</label>
                    <div class="col-2">
                        <select class="form-select" v-model="contract_search.target">
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
                    <button class="col-6 btn" @click="getData">検索</button>
                </div>
            </div>
        </div>
        <div class="mb-2 d-flex justify-content-between">
            <div></div>
            <div class="d-flex">
                <span class="col-form-label">全{{ contracts?.count_info?.count_total }}件中　◎{{ contracts?.count_info?.count_signed }}件　 〇{{ contracts?.count_info?.count_send_contract }}件　 ▲{{ contracts?.count_info?.count_no_renew }}件　 ×{{ contracts?.count_info?.count_stop_by_partner }}件　 ー{{ contracts?.count_info?.count_start }}件</span>
            </div>
            <div class="d-flex">
                <button class="btn default" @click="exportContract('list-data')">一覧出力</button>
            </div>
        </div>
        <div class="parent-scroll">
            <table class="view-scroll t-border">
                <thead class="text-center">
                    <tr>
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
                        <th class="thead-link" :class="contract_search.sort == 'signed_date' ? contract_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" style="width: 7%;" @click="sortColumn('signed_date')">
                            締結日
                        </th>
                        <th style="width: 4%;z-index:1">完了</th>
                        <th style="width: 4%;z-index:1">詳細</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="contract in contracts.data" :class="contract.status == STATUS_BE_SIGNED ? 'selected' : contract.status == STATUS_NO_RENEW ? 'renew-contract' : contract.status == STATUS_STOP_BY_PARTNER ? 'stop-contract' : ''">
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
                        <td class="text-center">{{ contract.signed_date }}</td>
                        <td class="text-center">
                            <button :disabled="contract.status >= STATUS_BE_SIGNED" class="btn default" style="white-space: nowrap;" @click="openConclusion('conclusion', contract.id)">完了</button>
                        </td>
                        <td class="text-center">
                            <button class="btn default" style="white-space: nowrap;" @click="openDetail('contract-detail', contract.id)">詳細</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <Conclusion v-if="actionModal == 'conclusion'" :show="showConclusion" :data="detail_data" @loadData="getData" @closeConclusion="closeConclusion" />
    <ContractDetailModal v-if="actionModal == 'contract-detail'" :show="showDetail" :data="detail_data" @loadData="getData" @closeDetail="closeDetail" />
</template>

<script setup>
import { CONTRACT_STATUS, STATUS_BE_SIGNED, STATUS_NO_RENEW, STATUS_STOP_BY_PARTNER } from "@/components/Constants.vue";
import moment from 'moment';
import Conclusion from "@/views/contract/modal/ConclusionModal.vue";
import ContractDetailModal from "@/views/contract/modal/ContractDetailModal.vue";
</script>
<script>
export default {
    data: function () {
        return {
            contract_search: this.$store.state.contract.contractListNew,
            // state: this.$store.state,
            contracts: [],
            master: {},
            page: 1,
            current_year: moment().format('YYYY'),
            last_year: moment().subtract(1, 'year').format('YYYY'),
            showConclusion: false,
            showDetail: false,
            actionModal: '',
            detail_data: {
                contract: {},
                types: [],
                master: []
            },
        }
    },
    mounted: function () {
        this.contract_search.year_renew = this.current_year;
        this.getMaster();
        this.getData();
    },
    methods: {
        reset: function () {
            this.contract_search.search_facility = null;
            this.contract_search.month_renew = null;
            this.contract_search.comp_cd = null;
            this.contract_search.status = null;
            this.contract_search.format = null;
            this.contract_search.target = null;
            this.contract_search.year_renew = this.current_year;
            this.contract_search.sort = null;
            this.contract_search.sort_by = null;
            this.getData();
        },
        getData: function () {
            this.contracts = [];
            // this.contract_search.target = this.state.pump_code;
            let data = this.contract_search;
            data.month_renew_search = data.month_renew ? moment(data.month_renew).format('YYYY-MM-DD') : null;
            this.$store.dispatch("getContractListNew", data).then((res) => {
                this.contracts = res.data.data;
            });
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
        openConclusion: function (action, id) {
            let data = {
                id: id
            };
            this.$store.dispatch("getContractDetail", data).then((res) => {
                this.detail_data.contract = res.data.data;
                this.actionModal = action;
                this.showConclusion = true;
            });
        },
        closeConclusion: function () {
            this.showConclusion = false;
        },
        openDetail: function (action, id) {
            let data = {
                id: id
            };
            this.$store.dispatch("getContractDetail", data).then((res) => {
                this.detail_data.contract = {};
                if (res.data.success) {
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
            if (type_export == 'list-data') {
                data.data_type = data.year_renew ? moment(data.year_renew).format('YYYY') : null;
            }
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