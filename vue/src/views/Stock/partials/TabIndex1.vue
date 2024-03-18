<template>
    <div class="d-flex justify-content-between mb-2">
        <div class="d-flex">
            <button class="btn delete" :disabled="checkedItem.length <= 0" @click="confirmDelete">出荷指示取消</button>
        </div>
        <div class="d-flex">
            <span class="col-form-label">点検・修理：{{ stocks.length > 0 ? stocks.length : 0 }}件</span>
        </div>
        <div class="d-flex">
            <button class="btn default me-2" @click="openShipmentRecord('shipment-record')">出庫実績取込</button>
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
                    <th class="thead-link" style="width: 10%;" :class="stock_search.sort == 'shelf_code' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('shelf_code')">
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
                    <th class="thead-link" style="width: 7%;" :class="stock_search.sort == 'todo_flag' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('todo_flag')">
                        在庫区分
                    </th>
                    <th class="thead-link" style="width: 4%;" :class="stock_search.sort == 'expire_mons' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('expire_mons')">
                        期限残月数
                    </th>
                    <th class="thead-link" style="width: 7%;" :class="stock_search.sort == 'require_code' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('require_code')">
                        依頼書No.
                    </th>
                    <th class="thead-link" style="width: 13%;" :class="stock_search.sort == 'inst_id' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('inst_id')">
                        指示書番号
                    </th>
                    <th class="thead-link" style="width: 7%;" :class="stock_search.sort == 'ship_date' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('ship_date')">
                        出荷日
                    </th>
                    <th class="thead-link" style="width: 7%;" :class="stock_search.sort == 'todo_target' ? stock_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('todo_target')">
                        入荷時棚
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
                    <td class="text-center">{{ stock.serial_no }}</td>
                    <td class="text-center">{{ stock.first_rental_date }}</td>
                    <td class="text-center">{{ getTodoFlag(stock.todo_flag) }}</td>
                    <td class="text-center">{{ stock.expire_mons }}</td>
                    <td class="text-center">{{ stock.require_code }}</td>
                    <td class="text-center">{{ stock.inst_id }}</td>
                    <td class="text-center">{{ stock.ship_date }}</td>
                    <td class="text-center">{{ stock.return_shelf }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <InventoryReceiptModal v-if="actionModal == 'inventory-receipt'" :show="showInventoryReceipt" :data="{}" @closeInventoryReceipt="closeInventoryReceipt" @loadData="getData"/>
    <ShipmentRecordModal v-if="actionModal == 'shipment-record'" :show="showShipmentRecord" :data="{}" @closeShipmentRecord="closeShipmentRecord" @loadData="getData"/>
    <ConfirmModal ref="confirmDialog"></ConfirmModal>
</template>

<script setup>
import InventoryReceiptModal from "@/views/Stock/modal/InventoryReceiptModal.vue";
import ShipmentRecordModal from "@/views/Stock/modal/ShipmentRecordModal.vue";
import { TODO_FLAG } from "@/components/Constants.vue";
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue";
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
            stocks: [],
            actionModal: '',
            showInventoryReceipt: false,
            showShipmentRecord: false,
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
        reset: function () {
            this.stock_search.sort = null;
            this.stock_search.sort_by = null;
        },
        getData: function() {
            this.stock_search.pump_code = this.state.pump_code;
            this.stock_search.pump_type = 2;
            let data = this.stock_search;
            this.$store.dispatch("getStockList", data).then((res) => {
                this.stocks = res.data.data.dataStock;
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
        openInventoryReceipt: function(action) {
            this.actionModal = action;
            this.showInventoryReceipt = true;
        },
        closeInventoryReceipt: function() {
            this.showInventoryReceipt = false;
        },
        openShipmentRecord: function(action) {
            this.actionModal = action;
            this.showShipmentRecord = true;
        },
        closeShipmentRecord: function() {
            this.showShipmentRecord = false;
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
        getTodoFlag: function(todo_flag) {
            return TODO_FLAG[todo_flag];
        },
        confirmDelete: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: '確認',
                message: '出荷指示情報を削除しますか。',
                okButton: '実行',
                cancelButton: 'キャンセル',
                ok_class: ''
            });
            if (ok) {
                let data = {
                    ids: this.checkedItem
                };
                this.$store.dispatch("deleteShipment", data).then((res) => {
                    if (res.data.success) {
                        this.getData();
                    }
                });
                await this.$refs.confirmDialog.close();
            }
        }
    }
}
</script>