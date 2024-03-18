<template>
    <div class="wrapper-scroll">
        <div class="mt-1 mb-3 row">
            <div class="col-10">
                <div class="row">
                    <label class="col-1 col-form-label">ポンプ</label>
                    <div class="col-2">
                        <select class="form-select" v-model="state.pump_code" @change="loadData">
                            <option v-for="machine in machines" :value="machine.pump_cd">[{{ machine.pump_cd }}] {{ machine.pump_nm_short }}</option>
                        </select>
                    </div>
                    <!-- <label class="col-1 col-form-label">入荷管理番号</label>
                    <div class="col-2">
                        <input type="text" class="form-control" v-model="stock_wait_search.control_number"/>
                    </div> -->
                    <label class="col-1 col-form-label">シリアルNo.</label>
                    <div class="col-2">
                        <input type="text" class="form-control" v-model="stock_wait_search.serial_no" @keypress="searchWait"/>
                    </div>
                    <label class="col-1 col-form-label">入荷区分</label>
                    <div class="col-2">
                        <select class="form-select" v-model="stock_wait_search.wait_type" @change="loadData">
                            <option :value="null">全て</option>
                            <option v-for="item in ARRIVAL_CLASS" :value="item.id">{{ item.text }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-2 d-flex justify-content-end">
                <button class="btn default w-[7rem]" @click="reset">リセット</button>
                <button class="btn ms-2 w-[7rem]" @click="loadData">検索</button>
            </div>
        </div>
        <div class="px-5 mb-2 d-flex justify-content-center">
            <table class="t-border">
                <thead class="text-center">
                    <tr>
                        <th>新規入庫</th>
                        <th>点検後入庫</th>
                        <th>修理後入庫</th>
                        <th>定期回収</th>
                        <th>故障回収</th>
                        <th>中止回収</th>
                        <th>移動中</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="wait_type in stocks.waitType">
                        <td class="text-center">{{ wait_type.A1 }}</td>
                        <td class="text-center">{{ wait_type.A2 }}</td>
                        <td class="text-center">{{ wait_type.A3 }}</td>
                        <td class="text-center">{{ wait_type.A4 }}</td>
                        <td class="text-center">{{ wait_type.A5 }}</td>
                        <td class="text-center">{{ wait_type.A6 }}</td>
                        <td class="text-center">{{ wait_type.A7 }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mb-2 d-flex justify-content-between">
            <div class="d-flex">
                <button :disabled="checkedItem.length <= 0" class="btn delete" @click="confirmDelete">削除</button>
            </div>
            <div class="d-flex">
                <span class="col-form-label">全{{ stocks.dataStock?.length }}件</span>
            </div>
            <div class="d-flex">
                <button class="btn default me-2" @click="openPurchasingManagement('purchasing-management')">仕入情報管理</button>
                <button class="btn default" @click="openInventoryReceipt('inventory-receipt')">入庫実績取込</button>
            </div>
        </div>
        <div class="parent-scroll">
            <table class="view-scroll t-border">
                <thead class="text-center">
                    <tr>
                        <th class="" style="width: 2%;">
                            <input class="form-check-input" type="checkbox" v-model="isCheckAll" @click="checkAll">
                        </th>
                        <th class="thead-link" style="width: 4%;" :class="stock_wait_search.sort == 'todo_date' ? stock_wait_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('todo_date')">
                            指示日
                        </th>
                        <th class="thead-link" style="width: 4%;" :class="stock_wait_search.sort == 'serial_no' ? stock_wait_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('serial_no')">
                            シリアルNo.
                        </th>
                        <th class="thead-link" style="width: 4%;" :class="stock_wait_search.sort == 'first_stored_date' ? stock_wait_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('first_stored_date')">
                            最初入庫日
                        </th>
                        <th class="thead-link" style="width: 4%;" :class="stock_wait_search.sort == 'storein_date' ? stock_wait_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('storein_date')">
                            入荷日
                        </th>
                        <th class="thead-link" style="width: 4%;" :class="stock_wait_search.sort == 'first_rental_date' ? stock_wait_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('first_rental_date')">
                            使用開始日
                        </th>
                        <th class="thead-link" style="width: 4%;" :class="stock_wait_search.sort == 'expire_mons' ? stock_wait_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('expire_mons')">
                            期限残月数
                        </th>
                        <th class="thead-link" style="width: 4%;" :class="stock_wait_search.sort == 'status' ? stock_wait_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('status')">
                            入庫種別
                        </th>
                        <th class="thead-link" style="width: 4%;" :class="stock_wait_search.sort == 'storein_shelf' ? stock_wait_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('storein_shelf')">
                            入庫先棚
                        </th>
                        <th class="thead-link" style="width: 4%;" :class="stock_wait_search.sort == 'require_code' ? stock_wait_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('require_code')">
                            依頼書No.
                        </th>
                        <th class="thead-link" style="width: 10%;" :class="stock_wait_search.sort == 'fac_name' ? stock_wait_search.sort_by == 'desc' ? 'desc' : 'asc' : ''" @click="sortColumn('fac_name')">
                            施設名
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="stock in stocks.dataStock">
                        <td class="text-center">
                            <input class="form-check-input" type="checkbox" v-model="checkedItem" :value="stock.id" @change="updateCheckAll">
                        </td>
                        <td class="text-center">{{ stock.stock_todo_date }}</td>
                        <td class="text-center text-primary"><u class="cursor-pointer" @click="openOrderPump('order-pump', stock)">{{ stock.serial_no }}</u></td>
                        <td class="text-center">{{ stock.first_stored_date }}</td>
                        <td class="text-center">{{ stock.storein_date }}</td>
                        <td class="text-center">{{ stock.first_rental_date }}</td>
                        <td class="text-center">{{ stock.expire_mons }}</td>
                        <td class="text-center">{{ stock.wait_type_lable }}</td>
                        <td class="text-center">{{ stock.storein_shelf }}</td>
                        <td class="text-center">{{ stock.stock_require_code }}</td>
                        <td>{{ stock.fac_name }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <OrderPumpDetailModal v-if="actionModal == 'order-pump'" :show="showOrderPump" :data="stockDetailData" @loadData="loadData" @closeOrderPump="closeOrderPump"/>
    <InventoryReceiptModal v-if="actionModal == 'inventory-receipt'" :show="showInventoryReceipt" :data="dataInvetoryReceipt" @closeInventoryReceipt="closeInventoryReceipt" @loadData="loadData"/>
    <PurchasingManagementModal v-if="actionModal == 'purchasing-management'" :show="showPurchasingManagement" :data="orderData" @loadData="loadData" @closePurchasingManagement="closePurchasingManagement" />
    <ConfirmModal ref="confirmDialog"></ConfirmModal>
</template>

<script setup>
import OrderPumpDetailModal from "@/views/Stock/modal/OrderPumpDetailModal.vue";
import InventoryReceiptModal from "@/views/Stock/modal/InventoryReceiptModal.vue";
import {ARRIVAL_CLASS} from "@/components/Constants.vue";
import PurchasingManagementModal from "@/views/Stock/modal/PurchasingManagementModal.vue";
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue";
</script>
<script>
export default {
    data: function () {
        return {
            isCheckAll: false,
            checkedItem: [],
            showOrderPump: false,
            actionModal: '',
            stock_wait_search: this.$store.state.stock.stockWait,
            state: this.$store.state,
            stocks: [],
            showInventoryReceipt: false,
            dataInvetoryReceipt: {},
            stockDetailData: {},
            showPurchasingManagement: false,
            orderData: {},
            machines: []
        }
    },
    mounted: function () {
        this.stock_wait_search.sort = null;
        this.stock_wait_search.sort_by = null;
        this.getMachines();
        this.loadData();
    },
    methods: {
        checkAll: function () {
            this.isCheckAll = !this.isCheckAll;
            this.checkedItem = [];
            if (this.isCheckAll) {
                this.stocks.dataStock.some(item => {
                    this.checkedItem.push(item.id);
                });
            }
            console.log(this.stocks);
        },
        updateCheckAll: function () {
            if (this.checkedItem.length == this.stocks.dataStock.length) {
                this.isCheckAll = true;
            } else {
                this.isCheckAll = false;
            }
        },
        openOrderPump: function(action, stock) {
            this.stockDetailData = {...stock};
            this.actionModal = action;
            this.showOrderPump = true;
        },
        closeOrderPump: function() {
            this.showOrderPump = false;
        },
        reset: function() {
            this.state.pump_code = 'A';
            this.stock_wait_search.pump_code = 'A';
            this.stock_wait_search.control_number = null;
            this.stock_wait_search.serial_no = null;
            this.stock_wait_search.wait_type = null;
            this.stock_wait_search.sort = null;
            this.stock_wait_search.sort_by = null;
            this.loadData();
        },
        getMachines: function () {
            this.state.pump_code = this.state.pump_code ? this.state.pump_code : "A";
            this.$store.dispatch("getMachines").then((res) => {
                this.machines = res.data.data;
            });
        },
        loadData: function() {
            this.stock_wait_search.pump_code = this.state.pump_code;
            let data = this.stock_wait_search;
            this.$store.dispatch("getWaitList", data).then((res) => {
                this.stocks.waitType = res.data.data.waitType;
                this.stocks.dataStock = res.data.data.dataStock;
            });
        },
        openInventoryReceipt: function(action) {
            this.dataInvetoryReceipt.pump_code = this.stock_wait_search.pump_code;
            this.actionModal = action;
            this.showInventoryReceipt = true;
        },
        closeInventoryReceipt: function() {
            this.showInventoryReceipt = false;
        },
        sortColumn: function (column) {
            if (this.stock_wait_search.sort == column) {
                if (this.stock_wait_search.sort_by == 'asc') {
                    this.stock_wait_search.sort_by = 'desc';
                } else if (this.stock_wait_search.sort_by == 'desc') {
                    this.stock_wait_search.sort = '';
                    this.stock_wait_search.sort_by = '';
                } else {
                    this.stock_wait_search.sort_by = 'asc';
                }
            } else {
                this.stock_wait_search.sort = column;
                this.stock_wait_search.sort_by = 'asc';
            }
            this.loadData();
        },
        openPurchasingManagement: function (action) {
            this.$store.dispatch("getOrderList").then((res) => {
                this.orderData = res.data.data;
                this.actionModal = action;
                this.showPurchasingManagement = true;
            });
        },
        closePurchasingManagement: function () {
            this.showPurchasingManagement = false;
        },
        confirmDelete: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: '確認',
                message: '本当にこのポンプを入庫管理から削除しますか。',
                okButton: '実行',
                cancelButton: '閉じる'
            });
            if (ok) {
                let data = {
                    ids: this.checkedItem
                };
                this.$store.dispatch("deleteWait", data).then((res) => {
                    if (res.data.success) {
                        this.isCheckAll = false;
                        this.checkedItem = [];
                        this.loadData();
                    }
                });
                await this.$refs.confirmDialog.close();
            }
        },
        searchWait: function ($event) {
            if ($event.key == 'Enter') {
                this.loadData();
            }
        }
    }
}
</script>