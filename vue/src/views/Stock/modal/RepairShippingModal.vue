<template>
    <ModalLayout :show="show" title="修理出荷指示" maxWidth="max-w-5xl" :class="'px-0'" @close="closeRepairShipping()">
        <div class="container">
            <div class="mt-2 row">
                <div class="col-10">
                    <div class="mb-2 row">
                        <label class="col-form-label col-2">出荷指示No.</label>
                        <div class="col-10">
                            <input type="text" class="form-control" v-model="dataStock.instruction_number" disabled/>
                        </div>
                    </div>
                    <div class="overflow-auto mb-3" style="max-height: 20rem;">
                        <table class="t-border">
                            <thead class="text-center">
                                <tr>
                                    <th style="width: 11%;">最初入庫日</th>
                                    <th style="width: 11%;">シリアルNo.</th>
                                    <th style="width: 33%;">施設名</th>
                                    <th style="width: 15%;">エラー</th>
                                    <th style="width: 15%;">依頼書No.</th>
                                    <th style="width: 15%;">点検後棚</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="stock in dataStock.stocks">
                                    <td class="text-center">{{ getDate(stock.first_storein_date) }}</td>
                                    <td class="text-center">{{ stock.serial_no }}</td>
                                    <td></td>
                                    <td>
                                        <input type="text" class="form-control" v-model="stock.error"/>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="stock.require_code"/>
                                    </td>
                                    <td>
                                        <select class="form-select" v-model="stock.return_shelf">
                                            <option value="A001">A001</option>
                                            <option value="A002">A002</option>
                                            <option value="A003">A003</option>
                                            <option value="A004">A004</option>
                                            <option value="A005">A005</option>
                                            <option value="A006">A006</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-2">
                    <button class="btn default w-[9rem] mb-5" @click="openRequestDocument('request-document')">依頼書番号<br>発行依頼文書</button>
                    <button class="btn w-[9rem]" @click="repairShelf" :disabled="is_disable_submit">移動指示</button>
                </div>
            </div>
            <div class="mt-2 mb-2 row">
                <div class="col-10">
                    <div class="mb-2 row">
                        <label class="col-form-label col-2">備考(移動指示)</label>
                        <div class="col-10">
                            <input type="text" class="form-control" v-model="remark1"/>
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label class="col-form-label col-2">備考(入庫指示)</label>
                        <div class="col-10">
                            <input type="text" class="form-control" v-model="remark2"/>
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label class="col-form-label col-2">備考(出荷指示)</label>
                        <div class="col-10">
                            <input type="text" class="form-control" v-model="remark3"/>
                        </div>
                    </div>
                </div>
                <div class="col-2">
                    <button class="btn default w-[9rem]" @click="closeRepairShipping">キャンセル</button>
                </div>
            </div>
        </div>
    </ModalLayout>
    <RequestDocumentModal v-if="actionModal == 'request-document'" :show="showRequestDocument" :data="requestDocumentData" @closeRequestDocument="closeRequestDocument"/>
</template>
<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import RequestDocumentModal from "@/views/Stock/modal/RequestDocumentModal.vue";
const props = defineProps({
    show: Boolean,
    data: Object,
});
</script>
<script>
export default {
    emits: ["closeRepairShipping",'loadData'],
    data: function () {
        return {
            actionModal: '',
            showRequestDocument: false,
            requestDocumentData: {},
            dataStock: {},
            remark1: '',
            remark2: '',
            remark3: '',
            is_disable_submit: false
        };
    },
    updated: function () {
        this.loadData();
    },
    mounted: function () {
        this.loadData();
    },
    methods: {
        closeRepairShipping: function () {
            this.$emit("closeRepairShipping");
            this.is_disable_submit = false;
            this.dataStock = [];
        },
        openRequestDocument: function(action) {
            let content = '';
            this.dataStock.stocks.some(stock => {
                content += `ポンプNO：${stock.serial_no}
施設名：
不具合発生：Error；${stock.error ? stock.error : ''}
不具合発生日：
使用開始日：${stock.first_rental_date ? stock.first_rental_date : ''}
(空白)

`;
            });
            this.requestDocumentData = content;
            this.actionModal = action;
            this.showRequestDocument = true;
        },
        closeRequestDocument: function() {
            this.showRequestDocument = false;
        },
        loadData: function () {
            this.dataStock = this.$props.data;
        },
        getDate: function (date) {
            return date.slice(0, 7);
        },
        repairShelf: function () {
            let data_post = [];
            this.dataStock.stocks.some(stock => {
                data_post.push({
                    id: stock.id,
                    first_storein_date: this.getDate(stock.first_storein_date),
                    storein_shelf: stock.shelf_code,
                    serial_no: stock.serial_no,
                    return_shelf: stock.return_shelf,
                    require_code: stock.require_code,
                    error: stock.error
                });
            });
            let data = {
                data: data_post,
                remark1: this.remark1,
                remark2: this.remark2,
                remark3: this.remark3,
                type: 1
            };
            this.$store.dispatch("repairShelf", data).then((res) => {
                if(res.data.success){
                    window.open(res.data.data.url);
                    this.$emit("loadData");
                    this.is_disable_submit = true;
                }
            });
        }
    },
};
</script>
  