<template>
    <div class="d-flex justify-content-between mb-2">
        <div class="d-flex">
            <button class="btn default me-2" :disabled="checkedItem.length <= 0" @click="openMoveSetting('move-setting', '選択2件を下記の棚に移動設定します。', true)">在庫移動設定</button>
            <button class="btn default" @click="openStockTransfer('stock-transfer')">在庫移動指示</button>
        </div>
        <div class="d-flex">
            <span class="col-form-label">レンタル中止ポンプ：{{ stocks.length > 0 ? stocks.length : 0 }}件</span>
        </div>
        <div class="d-flex">
            <button class="btn default">処分出荷指示</button>
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
                    <th class="thead-link" style="width: 5%;" :class="stock_search.sort == 'shelf_code' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('shelf_code')">
                        最初入庫日
                    </th>
                    <th class="thead-link" style="width: 7%;" :class="stock_search.sort == 'shelf_code' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('shelf_code')">
                        シリアルNo.
                    </th>
                    <th class="thead-link" style="width: 7%;" :class="stock_search.sort == 'shelf_code' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('shelf_code')">
                        使用開始日
                    </th>
                    <th class="thead-link" style="width: 10%;" :class="stock_search.sort == 'shelf_code' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('shelf_code')">
                        使用停止日
                    </th>
                    <th class="thead-link" :class="stock_search.sort == 'shelf_code' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('shelf_code')">
                        最後使用施設
                    </th>
                    <th class="thead-link" style="width: 10%;" :class="stock_search.sort == 'shelf_code' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('shelf_code')">
                        移動・出荷先
                    </th>
                    <th class="thead-link" style="width: 10%;" :class="stock_search.sort == 'shelf_code' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('shelf_code')">
                        指示日
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="stock in stocks">
                    <td class="text-center">
                        <input class="form-check-input" type="checkbox" v-model="checkedItem" :value="stock.id" @change="updateCheckAll">
                    </td>
                    <td class="text-center">{{ stock.shelf_code }}</td>
                    <td class="text-center">{{ stock.first_storein_date }}</td>
                    <td class="text-center text-primary"><u class="cursor-pointer" @click="openStockDetail('stock-detail', stock.serial_no)">{{ stock.serial_no }}</u></td>
                    <td class="text-center">{{ stock.first_rental_date }}</td>
                    <td class="text-center">2021/12/01</td>
                    <td>青森県立中央病院</td>
                    <td class="text-center"><u class="cursor-pointer" @click="openMoveSetting('move-setting', '選択1件を下記の棚に移動設定します。', true, stock.id, stock.return_shelf)">{{ getTodoTarget(stock.return_shelf) }}</u></td>
                    <td class="text-center">2023/02/20</td>
                </tr>
            </tbody>
        </table>
    </div>
    <MoveSettingModal v-if="actionModal == 'move-setting'" :show="showMoveSetting" :data="moveSettingData" @loadData="getData" @closeMoveSetting="closeMoveSetting"/>
    <StockTransferModal v-if="actionModal == 'stock-transfer'" :show="showStockTransfer" :data="stockTransferData" @loadData="getData" @closeStockTransfer="closeStockTransfer"/>
    <StockDetailModal v-if="actionModal == 'stock-detail'" :show="showStockDetail" :data="stockDetailData" @loadData="getData" @closeStockDetail="closeStockDetail"/>
</template>

<script setup>
import MoveSettingModal from "@/views/Stock/modal/MoveSettingModal.vue";
import StockTransferModal from "@/views/Stock/modal/StockTransferModal.vue";
import StockDetailModal from "@/views/Stock/modal/StockDetailModal.vue";
</script>
<script>
export default {
    emits: ["loadShelfCode"],
    data: function () {
        return {
            isCheckAll: false,
            stock_search: this.$store.state.stock.stockList,
            state: this.$store.state,
            stocks: [],
            checkedItem: [],
            actionModal: '',
            showMoveSetting: false,
            moveSettingData: {},
            showStockTransfer: false,
            stockTransferData: {},
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
                    this.checkedItem.push(item.id);
                });
            }
        },
        updateCheckAll: function () {
            if (this.checkedItem.length == this.stocks.length) {
                this.isCheckAll = true;
            } else {
                this.isCheckAll = false;
            }
        },
        reset: function () {
            this.stock_search.sort = null;
            this.stock_search.sort_by = null;
        },
        getData: function() {
            this.stock_search.pump_code = this.state.pump_code;
            this.stock_search.pump_type = 3;
            let data = this.stock_search;
            this.$store.dispatch("getStockList", data).then((res) => {
                this.stocks = res.data.data.dataStock;
                this.$emit("loadShelfCode", res.data.data.shelf_code);
            });
        },
        openMoveSetting: function(action, msg, set_instruction = false, stock_id = null, todo_target = null) {
            this.actionModal = action;
            this.moveSettingData.msg = msg;
            this.moveSettingData.set_instruction = set_instruction;
            this.moveSettingData.stock_ids = stock_id ? [stock_id] : this.checkedItem;
            this.moveSettingData.todo_target = todo_target ? todo_target : null;
            this.showMoveSetting = true;
        },
        closeMoveSetting: function() {
            this.showMoveSetting = false;
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
            this.showStockTransfer = false;
        },
        openStockDetail: function(action, serial_no) {
            this.$store.dispatch("getStockDetail", serial_no).then((res) => {
                this.stockDetailData = res.data.data;
                this.actionModal = action;
                this.showStockDetail = true;
            });
        },
        closeStockDetail: function() {
            this.showStockDetail = false;
        },
        getTodoTarget: function (todo_target) {
            return todo_target == '' ? '-' : todo_target;
        }
    }
}
</script>