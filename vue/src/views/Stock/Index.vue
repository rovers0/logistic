<template>
    <div class="wrapper-scroll">
        <div class="mt-1 mb-3 row">
            <div class="col-3">
                <div class="row">
                    <label class="col-2 col-form-label">ポンプ</label>
                    <div class="col-10">
                        <select class="form-select" v-model="state.pump_code">
                            <option v-for="machine in machines" :value="machine.pump_cd">[{{ machine.pump_cd }}] {{ machine.pump_nm_short }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-7">
                <div class="row">
                    <label class="col-2 col-form-label">在庫区分</label>
                    <div class="col-10 d-flex justify-content-between col-form-label">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" id="貸出可能(1-5)" v-model="tab_index" :value="0">
                            <label class="form-check-label" for="貸出可能(1-5)">
                                貸出可能(1-5)
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" id="点検・修理中(6-7)" v-model="tab_index" :value="1">
                            <label class="form-check-label" for="点検・修理中(6-7)">
                                点検・修理中(6-7)
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" id="レンタル中止(8)" v-model="tab_index" :value="2">
                            <label class="form-check-label" for="レンタル中止(8)">
                                レンタル中止(8)
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" id="一時在庫棚(9)" v-model="tab_index" :value="3">
                            <label class="form-check-label" for="一時在庫棚(9)">
                                一時在庫棚(9)
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="tab_index == 0" class="col-2 d-flex justify-content-end">
                <button class="btn default" @click="openPurchasingManagement('purchasing-management')">仕入情報管理</button>
            </div>
        </div>
        <div class="px-5 mb-2 d-flex justify-content-center">
            <table class="t-border">
                <thead class="text-center">
                    <tr>
                        <th v-if="shelfCode.length > 0" v-for="item in shelfCode">{{ item.shelf_code }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td v-if="shelfCode.length > 0" v-for="item in shelfCode" class="text-center">{{ item.count }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <TabIndex0 v-if="tab_index == 0" @loadShelfCode="loadShelfCode"></TabIndex0>
        <TabIndex1 v-if="tab_index == 1" @loadShelfCode="loadShelfCode"></TabIndex1>
        <TabIndex2 v-if="tab_index == 2" @loadShelfCode="loadShelfCode"></TabIndex2>
        <TabIndex3 v-if="tab_index == 3" @loadShelfCode="loadShelfCode"></TabIndex3>
    </div>
    <PurchasingManagementModal v-if="actionModal == 'purchasing-management'" :show="showPurchasingManagement" :data="orderData" @closePurchasingManagement="closePurchasingManagement" />
</template>

<script setup>
import TabIndex0 from "@/views/Stock/partials/TabIndex0.vue";
import TabIndex1 from "@/views/Stock/partials/TabIndex1.vue";
import TabIndex2 from "@/views/Stock/partials/TabIndex2.vue";
import TabIndex3 from "@/views/Stock/partials/TabIndex3.vue";
import PurchasingManagementModal from "@/views/Stock/modal/PurchasingManagementModal.vue";
</script>
<script>
export default {
    data: function () {
        return {
            tab_index: 0,
            actionModal: '',
            showPurchasingManagement: false,
            stock_search: this.$store.state.stock.stockList,
            state: this.$store.state,
            shelfCode: [],
            orderData: {},
            machines: []
        }
    },
    mounted: function () {
        this.getMachines();
    },
    methods: {
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
        loadShelfCode: function (shelf_code) {
            this.shelfCode = shelf_code;
        },
        getMachines: function () {
            this.state.pump_code = this.state.pump_code ? this.state.pump_code : "A";
            this.$store.dispatch("getMachines").then((res) => {
                this.machines = res.data.data;
            });
        }
    }
}
</script>