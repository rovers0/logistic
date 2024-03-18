<template>
    <div class="d-flex justify-content-between mb-2">
        <div class="d-flex">
            <button class="btn default me-2" :disabled="checkedItem.length <= 0" @click="openMoveSetting('move-setting', '選択2件を下記の棚に移動設定します。', true)">在庫移動設定</button>
            <button class="btn default" @click="openStockTransfer('stock-transfer')">在庫移動指示</button>
        </div>
        <div class="d-flex">
            <span class="col-form-label">貸出可能ポンプ：{{ stocks.length > 0 ? stocks.length : 0 }}件</span>
        </div>
        <div class="d-flex">
            <button class="btn default me-2" @click="openInventoryMatching('inventory-matching')">在庫実績照合</button>
            <button class="btn default me-2" @click="openShipmentRecord('shipment-record')">出荷実績取込</button>
            <button class="btn default" @click="openInventoryReceipt('inventory-receipt')">入庫実績取込</button>
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
                    <th class="thead-link" style="width: 7%;" :class="stock_search.sort == 'first_storein_date' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('first_storein_date')">
                        最初入庫日
                    </th>
                    <th class="thead-link" style="width: 7%;" :class="stock_search.sort == 'serial_no' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('serial_no')">
                        シリアルNo.
                    </th>
                    <th class="thead-link" style="width: 7%;" :class="stock_search.sort == 'first_rental_date' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('first_rental_date')">
                        使用開始日
                    </th>
                    <th class="thead-link" style="width: 4%;" :class="stock_search.sort == 'expire_mons' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('expire_mons')">
                        期限残月数
                    </th>
                    <th class="thead-link" style="width: 7%;" :class="stock_search.sort == 'final_storein_date' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('final_storein_date')">
                        最後入庫日
                    </th>
                    <th class="thead-link" style="width: 4%;" :class="stock_search.sort == 'todo_flag' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('todo_flag')">
                        指示種別
                    </th>
                    <th class="thead-link" style="width: 7%;" :class="stock_search.sort == 'todo_target' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('todo_target')">
                        移動・出荷先
                    </th>
                    <th class="thead-link" style="width: 7%;" :class="stock_search.sort == 'todo_date' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('todo_date')">
                        指示日
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="stock in stocks">
                    <td class="text-center">
                        <input :disabled="stock.todo_date ? true : false" class="form-check-input" type="checkbox" v-model="checkedItem" :value="stock.id" @change="updateCheckAll">
                    </td>
                    <td class="text-center">{{ stock.shelf_code }}</td>
                    <td class="text-center">{{ stock.first_storein_date }}</td>
                    <td class="text-center text-primary"><u class="cursor-pointer" @click="openStockDetail('stock-detail', stock.serial_no)">{{ stock.serial_no }}</u></td>
                    <td class="text-center">{{ stock.first_rental_date }}</td>
                    <td class="text-center">{{ stock.expire_mons }}</td>
                    <td class="text-center">{{ stock.final_storein_date }}</td>
                    <td class="text-center">{{ getTodoFlag(stock.todo_flag) }}</td>
                    <td class="text-center"><u class="cursor-pointer" @click="openMoveSetting('move-setting', '選択1件を下記の棚に移動設定します。', stock.todo_date ? false : true, stock.id, stock.todo_target, stock.todo_remark)">{{ getTodoTarget(stock.todo_target) }}</u></td>
                    <td class="text-center">{{ stock.todo_date }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <MoveSettingModal v-if="actionModal == 'move-setting'" :show="showMoveSetting" :data="moveSettingData" @loadData="getData" @closeMoveSetting="closeMoveSetting" />
    <StockTransferModal v-if="actionModal == 'stock-transfer'" :show="showStockTransfer" :data="stockTransferData" @loadData="getData" @closeStockTransfer="closeStockTransfer" />
    <InventoryReceiptModal v-if="actionModal == 'inventory-receipt'" :show="showInventoryReceipt" :data="dataInvetoryReceipt" @closeInventoryReceipt="closeInventoryReceipt" @loadData="getData" />
    <InventoryMatchingModal v-if="actionModal == 'inventory-matching'" :show="showInventoryMatching" :data="dataInvetoryMatching" @closeInvetoryMatching="closeInvetoryMatching" />
    <ShipmentRecordModal v-if="actionModal == 'shipment-record'" :show="showShipmentRecord" :data="dataShipmentRecord" @closeShipmentRecord="closeShipmentRecord"  @loadData="getData" />
    <StockDetailModal v-if="actionModal == 'stock-detail'" :show="showStockDetail" :data="stockDetailData" @loadData="getData" @closeStockDetail="closeStockDetail" />
</template>

<script setup>
import MoveSettingModal from "@/views/Stock/modal/MoveSettingModal.vue";
import StockTransferModal from "@/views/Stock/modal/StockTransferModal.vue";
import InventoryReceiptModal from "@/views/Stock/modal/InventoryReceiptModal.vue";
import InventoryMatchingModal from "@/views/Stock/modal/InventoryMatchingModal.vue";
import ShipmentRecordModal from "@/views/Stock/modal/ShipmentRecordModal.vue";
import StockDetailModal from "@/views/Stock/modal/StockDetailModal.vue";
import { TODO_FLAG } from "@/components/Constants.vue";
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
            showMoveSetting: false,
            moveSettingData: {},
            showStockTransfer: false,
            stockTransferData: {},
            stocks: [],
            showInventoryReceipt: false,
            dataInvetoryReceipt: {},
            showShipmentRecord: false,
            dataShipmentRecord: {},
            showInventoryMatching: false,
            dataInvetoryMatching: {},
            showStockDetail: false,
            stockDetailData: {}
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
                    if (!item.todo_date) {
                        this.checkedItem.push(item.id);
                    }
                });
            }
        },
        reset: function () {
            this.stock_search.sort = null;
            this.stock_search.sort_by = null;
        },
        getData: function () {
            this.stock_search.pump_code = this.state.pump_code;
            this.stock_search.pump_type = 1;
            let data = this.stock_search;
            this.$store.dispatch("getStockList", data).then((res) => {
                this.stocks = res.data.data.dataStock;
                this.$emit("loadShelfCode", res.data.data.shelf_code);
            });
            this.isCheckAll = false;
            this.checkedItem = [];
        },
        updateCheckAll: function () {
            if (this.checkedItem.length == this.stocks.length) {
                this.isCheckAll = true;
            } else {
                this.isCheckAll = false;
            }
        },
        openMoveSetting: function (action, msg, set_instruction = false, stock_id = null, todo_target = null, todo_remark = null) {
            this.actionModal = action;
            this.moveSettingData.msg = msg;
            this.moveSettingData.set_instruction = set_instruction;
            this.moveSettingData.stock_ids = stock_id ? [stock_id] : this.checkedItem;
            this.moveSettingData.todo_target = todo_target ? todo_target : null;
            this.moveSettingData.todo_remark = todo_remark ? todo_remark : null;
            this.showMoveSetting = true;
        },
        closeMoveSetting: function () {
            this.showMoveSetting = false;

        },
        openStockTransfer: function (action) {
            let data = {
                pump_code: this.stock_search.pump_code
            };
            this.$store.dispatch("getTransferInstruction", data).then((res) => {
                this.stockTransferData = res.data.data;
                this.actionModal = action;
                this.showStockTransfer = true;
            });
        },
        closeStockTransfer: function () {
            this.showStockTransfer = false;
        },
        openInventoryReceipt: function (action) {
            this.dataInvetoryReceipt.pump_code = this.stock_search.pump_code;
            this.actionModal = action;
            this.showInventoryReceipt = true;
        },
        closeInventoryReceipt: function () {
            this.showInventoryReceipt = false;
        },
        openShipmentRecord: function (action) {
            this.dataShipmentRecord.pump_code = this.stock_search.pump_code;
            this.actionModal = action;
            this.showShipmentRecord = true;
        },
        closeShipmentRecord: function () {
            this.showShipmentRecord = false;
        },
        openInventoryMatching: function (action) {
            this.dataInvetoryMatching.pump_code = this.stock_search.pump_code;
            this.actionModal = action;
            this.showInventoryMatching = true;
        },
        closeInvetoryMatching: function () {
            this.showInventoryMatching = false;
        },
        openStockDetail: function (action, serial_no) {
            this.$store.dispatch("getStockDetail", serial_no).then((res) => {
                this.stockDetailData = res.data.data;
                this.actionModal = action;
                this.showStockDetail = true;
            });
        },
        closeStockDetail: function () {
            this.showStockDetail = false;
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
        getTodoTarget: function (todo_target) {
            return todo_target == '' ? '-' : todo_target;
        },
        getTodoFlag: function (todo_flag) {
            return TODO_FLAG[todo_flag];
        }
    }
}
</script>