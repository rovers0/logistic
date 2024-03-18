<template>
    <ModalLayout :show="show" title="在庫移動指示" maxWidth="max-w-3xl" :class="'px-0'" @close="closeStockTransfer()">
        <div class="container">
            <div class="mt-2 mb-1 d-flex justify-content-between">
                <div class="col-form-label">在庫移動指示： 全{{ stockData.stocks_num }}件</div>
                <div class="d-flex">
                    <label class="col-form-label">指示実施日</label>
                    <div class="ms-1">
                        <Datepicker format="yyyy/MM/dd" v-model="stockSearch.todo_date"></Datepicker>
                    </div>
                </div>
            </div>
            <div class="overflow-auto mb-3" style="max-height: 20.7rem;">
                <table class="t-border">
                    <thead class="text-center">
                        <tr>
                            <th>ロット№</th>
                            <th>移動元<br>商品コード</th>
                            <th>移動先<br>商品コード</th>
                            <th>備考</th>
                            <th>点検<br>依頼書NO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="stock in stockData.stocks">
                            <td class="text-center">{{ stock.serial_no }}</td>
                            <td class="text-center">{{ stock.shelf_code }}</td>
                            <td class="text-center">{{ stock.todo_target }}</td>
                            <td>
                                <input type="text" class="form-control" v-model="stock.todo_remark"/>
                            </td>
                            <td class="text-center"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mt-1 mb-2 d-flex justify-content-evenly">
                <button class="btn default" @click="closeStockTransfer">キャンセル</button>
                <button class="btn" :disabled="stockData.stocks.length <= 0" @click="updateRemark">移動指示</button>
            </div>
        </div>
    </ModalLayout>
</template>
<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import moment from 'moment';
const props = defineProps({
    show: Boolean,
    data: Object,
});
</script>
<script>
export default {
    emits: ["closeStockTransfer", "loadData"],
    data: function () {
        return {
            stockData: {},
            stockSearch: this.$store.state.stock.stockTransferInstruction,
            state: this.$store.state
        };
    },
    updated: function () {
        this.loadData();
    },
    mounted: function () {
        this.loadData();
    },
    methods: {
        closeStockTransfer: function () {
            this.$emit("closeStockTransfer");
        },
        loadData: function () {
            this.stockData = this.$props.data;
        },
        searchStock: function () {
            let data = {
                // todo_date: this.stockSearch.todo_date ? moment(this.stockSearch.todo_date).format('YYYY-MM-DD') : null
                pump_code: this.state.pump_code
            };
            this.$store.dispatch("getTransferInstruction", data).then((res) => {
                this.stockData = res.data.data;
            });
        },
        updateRemark: function () {
            let data = {
                data: [],
                todo_date: this.stockSearch.todo_date ? moment(this.stockSearch.todo_date).format('YYYY-MM-DD') : null,
                pump_code: this.state.pump_code
            };
            this.stockData.stocks.some(item => {
                let stock = {
                    id: item.id,
                    serial_no: item.serial_no,
                    todo_remark: item.todo_remark
                };
                data.data.push(stock);
            });
            this.$store.dispatch("updateRemark", data).then((res) => {
                window.open(res.data.data.url);
                this.$emit("loadData");
            });
        }
    },
};
</script>
  