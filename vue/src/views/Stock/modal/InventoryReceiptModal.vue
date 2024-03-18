<template>
    <ModalLayout :show="show" title="入庫実績取込" maxWidth="max-w-7xl" :class="'px-0'" @close="closeInventoryReceipt()">
        <div class="container">
            <div class="mb-1 mt-2">
                <div class="d-flex justify-content-between">
                    <div>
                        <button class="btn default" @click="openFile">実績Excel選択</button>
                        <input type="file" class="visually-hidden" ref="file" @change="onFileChange" />
                    </div>
                    <div class="col-form-label fw-bold">実績データ：{{ receiptData.length }}件</div>
                    <div class="d-flex">
                        <div class="form-check col-form-label me-3">
                            <input class="form-check-input" type="checkbox" v-model="filterExist" id="取込済データ非表示">
                            <label class="form-check-label" for="取込済データ非表示">
                                取込済データ非表示
                            </label>
                        </div>
                        <button :disabled="checkedItem.length <= 0" class="btn" @click="stockIn">取込実行</button>
                    </div>
                </div>
            </div>
            <div class="mb-2 overflow-auto" style="max-height: 80vh;">
                <table class="t-border">
                    <thead class="text-center">
                        <tr>
                            <th>入庫番号</th>
                            <th>明細</th>
                            <th>入庫日</th>
                            <th>予定棚</th>
                            <th>シリアルNo.</th>
                            <th>入庫種別</th>
                            <th>入荷先</th>
                            <th>シリアルNo.</th>
                            <th>取込状態</th>
                            <th>取込可能有無</th>
                            <th>
                                <input class="form-check-input" type="checkbox" v-model="isCheckAll" @click="checkAll">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="receipt, i in receiptData" >
                            <template v-if="receipt.stock_exist">
                                <tr v-if="!filterExist" class="row-disable">
                                    <td class="text-center">{{ receipt.order_code }}</td>
                                    <td class="text-center">{{ receipt.order_no }}</td>
                                    <td class="text-center">{{ receipt.storein_date }}</td>
                                    <td class="text-center">{{ receipt.storein_shelf }}</td>
                                    <td class="text-center">{{ receipt.serial_no }}</td>
                                    <td class="text-center">{{ receipt.wait_type_label }}</td>
                                    <td class="text-center">{{ receipt.storein_shelf2 }}</td>
                                    <td class="text-center">{{ receipt.serial_no2 }}</td>
                                    <td class="text-center">{{ receipt.status_label }}</td>
                                    <td class="text-center">{{ receipt.capture }}</td>
                                    <td class="text-center">
                                        <input :disabled="checkDisabled(receipt)"  class="form-check-input" type="checkbox" v-model="checkedItem" :value="{receipt: receipt, index: i}" @change="updateCheckAll">
                                    </td>
                                </tr>
                            </template>
                            <tr v-else>
                                <td class="text-center">{{ receipt.order_code }}</td>
                                <td class="text-center">{{ receipt.order_no }}</td>
                                <td class="text-center">{{ receipt.storein_date }}</td>
                                <td class="text-center">{{ receipt.storein_shelf }}</td>
                                <td class="text-center">{{ receipt.serial_no }}</td>
                                <td class="text-center">{{ receipt.wait_type_label }}</td>
                                <td class="text-center" :class="receipt.status_num == 2 ? 'text-danger' : ''">{{ receipt.storein_shelf2 }}</td>
                                <td class="text-center">{{ receipt.serial_no2 }}</td>
                                <td class="text-center">{{ receipt.status_label }}</td>
                                <td class="text-center" :class="[2,3].includes(receipt.status_num) ? 'text-danger' : ''">{{ receipt.capture }}</td>
                                <td class="text-center">
                                    <input :disabled="checkDisabled(receipt)" :checked="receipt.status_num == 0" class="form-check-input" type="checkbox" v-model="checkedItem" :value="{receipt: receipt, index: i}" @change="updateCheckAll">
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <div class="mt-1 mb-2 d-flex justify-content-evenly">
                <button class="btn default w-[6rem]" @click="closeInventoryReceipt">閉じる</button>
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
    emits: ["closeInventoryReceipt","loadData"],
    data: function () {
        return {
            file: null,
            receiptData: [],
            isCheckAll: false,
            checkedItem: [],
            filterExist: false
        };
    },
    updated: function () {

    },
    mounted: function () {

    },
    methods: {
        closeInventoryReceipt: function () {
            this.receiptData = [];
            this.$emit("closeInventoryReceipt");
        },
        checkAll: function () {
            this.isCheckAll = !this.isCheckAll;
            this.checkedItem = [];
            if (this.isCheckAll) {
                this.receiptData.some((item,i) => {
                    if (!this.checkDisabled(item)) {
                        this.checkedItem.push({receipt: item, index: i});
                    }
                });
                if(this.checkedItem.length == 0) {
                  this.isCheckAll = false;
                }
            }
        },
        updateCheckAll: function () {
            if (this.checkedItem.length == this.receiptData.length) {
                this.isCheckAll = true;
            } else {
                this.isCheckAll = false;
            }
        },
        openFile: function () {
            this.$refs.file.click();
        },
        onFileChange: function (e) {
            this.file = e.target.files ? e.target.files[0] : null;
            if (this.file) {
                let formData = new FormData();
                formData.append('file', this.file);
                let data = {
                    formData: formData
                }
                this.$store.dispatch("importReceipt", data).then((res) => {
                    if (res.data.success) {
                        this.receiptData = res.data.data;
                        this.checkedItem = [];
                        this.receiptData.some((item,i) => {
                            if(item.status_num == 0){
                                this.checkedItem.push({receipt: item, index: i});
                                if(this.checkedItem.length == this.receiptData.length) {
                                    this.isCheckAll = true;
                                }
                            }
                        });
                    }
                    this.$refs.file.value = null;
                    //this.checkAll();
                });
            }
        },
        checkDisabled: function (receipt) {
            if ([1,3].includes(receipt.status_num)) {
                return true;
            } else {
                return false;
            }
        },
        stockIn: function () {
            let checkedItem = [];
            this.checkedItem.some(item => {
                item.receipt.storein_date = item.receipt.storein_date ? moment(item.receipt.storein_date).format('YYYY-MM-DD') : null;
                item.receipt.index = item.index;
                checkedItem.push(item.receipt);
            });
            let data = {
                data: checkedItem,
                pump_code: this.$props.data.pump_code
            };
            this.$store.dispatch("stockIn", data).then((res) => {
                if (res.data.success) {
                    this.isCheckAll = false;
                    this.checkedItem.some(item => {
                        res.data.data.some(item1 => {
                            if(item1.index == item.index){
                                this.receiptData[item.index] = item1;
                            }
                        });
                    });
                    this.checkedItem = [];
                  this.$emit("loadData");
                }
            });
        }
    },
};
</script>
  