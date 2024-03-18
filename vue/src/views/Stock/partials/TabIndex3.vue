<template>
    <div class="d-flex justify-content-between mb-2">
        <div class="d-flex">
            <button class="btn default me-2" :disabled="checkedItem.length <= 0" @click="openMoveSetting('move-setting', '選択2件を下記の棚に移動設定します。', true)">在庫移動設定</button>
            <button class="btn default" @click="openStockTransfer('stock-transfer')">在庫移動指示</button>
        </div>
        <div class="d-flex">
            <span class="col-form-label">一時在庫数：{{ stocks.length > 0 ? stocks.length : 0 }}件</span>
        </div>
        <div class="d-flex">
            <button class="btn default me-2" :disabled="checkedItem.length !== 6" @click="openRepairShipping('repair-shipping')">修理出荷指示</button>
            <button class="btn default" :disabled="checkedItem.length !== 6" @click="openInspectionShipping('inspection-shipping')">点検出荷指示</button>
        </div>
    </div>
    <div class="parent-scroll">
        <table class="view-scroll t-border">
            <thead class="text-center">
                <tr>
                    <th class="" style="width: 3%;">
                        <input class="form-check-input" type="checkbox" v-model="isCheckAll" @click="checkAll">
                    </th>
                    <th class="thead-link" style="width: 5%;" :class="stock_search.sort == 'shelf_code' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('shelf_code')">
                        在庫棚
                    </th>
                    <th class="thead-link" style="width: 6%;" :class="stock_search.sort == 'first_storein_date' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('first_storein_date')">
                        最初入庫日
                    </th>
                    <th class="thead-link" style="width: 7%;" :class="stock_search.sort == 'serial_no' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('serial_no')">
                        シリアルNo.
                    </th>
                    <th class="thead-link" style="width: 8%;" :class="stock_search.sort == 'first_rental_date' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('first_rental_date')">
                        使用開始日
                    </th>
                    <th class="thead-link" style="width: 6%;" :class="stock_search.sort == 'expire_mons' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('expire_mons')">
                        期限残月数
                    </th>
                    <th class="thead-link" style="width: 15%;" :class="stock_search.sort == 'src_name' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('src_name')">
                        返却元の施設
                    </th>
                    <th class="thead-link" style="width: 5%;" :class="stock_search.sort == 'event_code' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('event_code')">
                        返却理由
                    </th>
                    <th class="thead-link" style="width: 5%;" :class="stock_search.sort == 'todo_target' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('todo_target')">
                        移動先
                    </th>
                    <th class="thead-link" style="width: 7%;" :class="stock_search.sort == 'todo_date' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('todo_date')">
                        移動依頼日
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="stock in stocks">
                    <td class="text-center">
                        <input :disabled="stock.todo_target ? true : false" class="form-check-input" type="checkbox" v-model="checkedItem" :value="stock.id" @change="updateCheckAll">
                    </td>
                    <td class="text-center">{{ stock.shelf_code }}</td>
                    <td class="text-center">{{ stock.first_storein_date }}</td>
                    <td class="text-center">{{ stock.serial_no }}</td>
                    <td class="text-center">{{ stock.first_rental_date }}</td>
                    <td class="text-center">{{ stock.expire_mons }}</td>
                    <td></td>
                    <td class="text-center">{{ getEventCode(stock.event_code) }}</td>
                    <td class="text-center"><u class="cursor-pointer" @click="openMoveSetting('move-setting', '選択1件を下記の棚に移動設定します。', stock.todo_date ? false : true, stock.id, stock.todo_target)">{{ getTodoTarget(stock.todo_target) }}</u></td>
                    <td class="text-center">{{ stock.todo_date }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <MoveSettingModal v-if="actionModal == 'move-setting'" :show="showMoveSetting" :data="moveSettingData" @loadData="getData" @closeMoveSetting="closeMoveSetting"/>
    <InspectionShippingModal v-if="actionModal == 'inspection-shipping'" :show="showInspectionShipping" :data="inspectionShippingData" @closeInspectionShipping="closeInspectionShipping" @loadData="getData"/>
    <RepairShippingModal v-if="actionModal == 'repair-shipping'" :show="showRepairShipping" :data="repairShippingData" @closeRepairShipping="closeRepairShipping" @loadData="getData"/>
    <StockTransferModal v-if="actionModal == 'stock-transfer'" :show="showStockTransfer" :data="stockTransferData" @loadData="getData" @closeStockTransfer="closeStockTransfer"/>
</template>

<script setup>
import InspectionShippingModal from "@/views/Stock/modal/InspectionShippingModal.vue";
import RepairShippingModal from "@/views/Stock/modal/RepairShippingModal.vue";
import MoveSettingModal from "@/views/Stock/modal/MoveSettingModal.vue";
import StockTransferModal from "@/views/Stock/modal/StockTransferModal.vue";
import moment from 'moment';
import { EVENT_CODE } from "@/components/Constants.vue";
</script>
<script>
export default {
    emits: ["loadShelfCode"],
    data: function () {
        return {
            isCheckAll: false,
            checkedItem: [],
            stock_search: this.$store.state.stock.stockList,
            state: this.$store.state,
            actionModal: '',
            showInspectionShipping: false,
            inspectionShippingData: {},
            showRepairShipping: false,
            repairShippingData: {},
            stocks: [],
            showMoveSetting: false,
            moveSettingData: {},
            showStockTransfer: false,
            stockTransferData: {}
        }
    },
    watch: {
        'state.pump_code': function() {
            this.getData();
        }
    },
    mounted: function () {
        this.reset();
        this.getData();
    },
    methods: {
        checkAll: function () {
            this.isCheckAll = !this.isCheckAll;
            this.checkedItem = [];
            if (this.isCheckAll) {
                this.stocks.some(item => {
                    if (!item.todo_target) {
                        this.checkedItem.push(item.id);
                    }
                });
            }
        },
        reset: function () {
            this.stock_search.sort = null;
            this.stock_search.sort_by = null;
        },
        getData: function() {
            this.stock_search.pump_code = this.state.pump_code;
            this.stock_search.pump_type = 4;
            let data = this.stock_search;
            this.$store.dispatch("getStockList", data).then((res) => {
                this.stocks = res.data.data.dataStock;
                this.isCheckAll = false;
                this.checkedItem = [];
                this.$emit("loadShelfCode", res.data.data.shelf_code);
            });
        },
        updateCheckAll: function () {
            if (this.checkedItem.length == this.stocks.length) {
                this.isCheckAll = true;
            } else {
                this.isCheckAll = false;
            }
        },
        openInspectionShipping: function(action) {
            this.inspectionShippingData.stocks = this.stocks.filter(item => this.checkedItem.includes(item.id));
            this.inspectionShippingData.instruction_number = `PR${moment().format("YYMMDD")}-${this.stock_search.pump_code}-6-001~006`;
            this.actionModal = action;
            this.showInspectionShipping = true;
        },
        closeInspectionShipping: function() {
            this.showInspectionShipping = false;
        },
        openRepairShipping: function(action) {
            this.repairShippingData.stocks = this.stocks.filter(item => this.checkedItem.includes(item.id));
            this.repairShippingData.instruction_number = `PR${moment().format("YYMMDD")}-${this.stock_search.pump_code}-7-001~006`;
            this.actionModal = action;
            this.showRepairShipping = true;
        },
        closeRepairShipping: function() {
            this.showRepairShipping = false;
        },
        sortColumn: function (column) {
            if (this.stock_search.sort == column) {
                if (this.stock_search.sort_by == 'asc') {
                    this.stock_search.sort_by = 'desc';
                } else if (this.stock_search.sort_by == 'desc') {
                    this.stock_search.sort = '';
                    this.stock_search.sort_by = '';
                } else {
                    this.stock_search.sort_by = 'asc';
                }
            } else {
                this.stock_search.sort = column;
                this.stock_search.sort_by = 'asc';
            }
            this.getData();
        },
        getTodoTarget: function(todo_target) {
            return todo_target == '' ? '-' : todo_target;
        },
        openMoveSetting: function(action, msg, set_instruction = false, stock_id = null, todo_target = null) {
            this.actionModal = action;
            this.moveSettingData.msg = msg;
            this.moveSettingData.inspectionRepair = true;
            this.moveSettingData.set_instruction = set_instruction;
            this.moveSettingData.stock_ids = stock_id ? [stock_id] : this.checkedItem;
            this.moveSettingData.todo_target = todo_target ? todo_target : null;
            this.showMoveSetting = true;
        },
        closeMoveSetting: function() {
            this.showMoveSetting = false;
        },
        openStockTransfer: function(action) {
            let data = {
                pump_code: this.stock_search.pump_code
            };
            this.$store.dispatch("getTransferInstruction", data).then((res) => {
                this.stockTransferData = res.data.data;
                this.actionModal = action;
                this.showStockTransfer = true;
            });
        },
        closeStockTransfer: function() {
            this.isCheckAll = false;
            this.checkedItem = [];
            this.showStockTransfer = false;

        },
        getEventCode: function (event_code) {
            return event_code ? EVENT_CODE[event_code].text : '';
        }
    }
}
</script>