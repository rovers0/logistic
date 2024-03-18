<template>
    <ModalLayout :show="show" title="出荷実績取込" maxWidth="max-w-7xl" :class="'px-0'" @close="closeShipmentRecord()">
        <div class="container">
            <div class="mb-2 mt-2">
                <div class="d-flex justify-content-between mb-1">
                    <div>
                        <button class="btn default" @click="openFile">実績Excel選択</button>
                        <input type="file" class="visually-hidden" ref="file" @change="onFileChange" />
                    </div>
                    <div class="col-form-label fw-bold">実績データ：{{ shipmentData.length }}件</div>
                    <div class="d-flex">
                        <div class="form-check col-form-label me-3">
                            <input class="form-check-input" type="checkbox" v-model="filterExist" id="取込済データ非表示">
                            <label class="form-check-label" for="取込済データ非表示">
                                取込済データ非表示
                            </label>
                        </div>
                        <button :disabled="checkedItem.length <= 0" class="btn" @click="shipmentUpdate">取込実行</button>
                    </div>
                </div>
                <div class="mb-2 overflow-auto" style="max-height: 80vh;">
                    <table class="t-border">
                        <thead class="text-center">
                            <tr>
                                <th>出荷指示No.</th>
                                <th>出荷棚</th>
                                <th>シリアルNo.</th>
                                <th>出荷日</th>
                                <th>配送伝票番号</th>
                                <th>出荷種別</th>
                                <th>出荷日</th>
                                <th>出荷棚</th>
                                <th>シリアルNo.</th>
                                <th>取込可能有無</th>
                                <th>
                                    <input class="form-check-input" type="checkbox" v-model="isCheckAll" @click="checkAll">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="shipment, i in shipmentData">
                                <template v-if="shipment.shipment_exist">

                                    <tr v-if="!filterExist" class="row-disable">
                                        <td class="text-center">{{ shipment.inst_id }}</td>
                                        <td class="text-center">{{ shipment.from_shelf }}</td>
                                        <td class="text-center">{{ shipment.serial_no }}</td>
                                        <td class="text-center">{{ shipment.ship_date }}</td>
                                        <td class="text-center">{{ shipment.ship_qacode }}</td>
                                        <td class="text-center">{{ shipment.inst_type_label }}</td>
                                        <td class="text-center">{{ shipment.ship_date2 }}</td>
                                        <td class="text-center" :class="checkDiffer(shipment) ? 'text-danger' : ''">{{ shipment.from_shelf2 }}</td>
                                        <td class="text-center">{{ shipment.serial_no2 }}</td>
                                        <td class="text-center">{{ shipment.capture }}</td>
                                        <td class="text-center">
                                            <input :disabled="checkDisabled(shipment)" class="form-check-input" type="checkbox" v-model="checkedItem" :value="{shipment: shipment, index: i}" @change="updateCheckAll">
                                        </td>
                                    </tr>
                                </template>
                                <tr v-else>
                                    <td class="text-center">{{ shipment.inst_id }}</td>
                                    <td class="text-center">{{ shipment.from_shelf }}</td>
                                    <td class="text-center">{{ shipment.serial_no }}</td>
                                    <td class="text-center">{{ shipment.ship_date }}</td>
                                    <td class="text-center">{{ shipment.ship_qacode }}</td>
                                    <td class="text-center">{{ shipment.inst_type_label }}</td>
                                    <td class="text-center">{{ shipment.ship_date2 }}</td>
                                    <td class="text-center" :class="checkDiffer(shipment) ? 'text-danger' : ''">{{ shipment.from_shelf2 }}</td>
                                    <td class="text-center">{{ shipment.serial_no2 }}</td>
                                    <td class="text-center" :class="[2,3].includes(shipment.status) ? 'text-danger' : ''">{{ shipment.capture }}</td>
                                    <td class="text-center">
                                        <input :disabled="checkDisabled(shipment)" class="form-check-input" type="checkbox" v-model="checkedItem" :value="{shipment: shipment, index: i}" @change="updateCheckAll">
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mt-1 mb-2 d-flex justify-content-evenly">
                <button class="btn default w-[6rem]" @click="closeShipmentRecord">閉じる</button>
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
    emits: ["closeShipmentRecord","loadData"],
    data: function () {
        return {
            file: null,
            shipmentData: [],
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
        closeShipmentRecord: function () {
            this.reset();
            this.$emit("closeShipmentRecord");
        },
        checkAll: function () {
            this.isCheckAll = !this.isCheckAll;
            this.checkedItem = [];
            if (this.isCheckAll) {
                this.shipmentData.some((item,i) => {
                    if(!this.checkDisabled(item)){
                        this.checkedItem.push({shipment: item, index: i});
                    }
                });
                if(this.checkedItem.length == 0) {
                  this.isCheckAll = false;
                }
            }
        },
        updateCheckAll: function () {
            if (this.checkedItem.length == this.shipmentData.length) {
                this.isCheckAll = true;
            } else {
                this.isCheckAll = false;
            }
        },
        reset: function () {
            this.shipmentData = [];
            this.isCheckAll = false;
            this.checkedItem = [];
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
                this.$store.dispatch("importShipmentRecord", data).then((res) => {
                    if (res.data.success) {
                        this.shipmentData = res.data.data;
                        this.shipmentData.some((item,i) => {
                            if(item.status == 0){
                                this.checkedItem.push({shipment: item, index: i});
                            }
                        });
                        //this.checkAll();
                    }
                    this.$refs.file.value = null;
                });
            }
        },
        shipmentUpdate: function () {
            let post_data = [];
            this.checkedItem.some(item => {
                let item_data = {
                    from_shelf: item.shipment.from_shelf,
                    ship_qacode: item.shipment.ship_qacode,
                    inst_id: item.shipment.inst_id,
                    serial_no: item.shipment.serial_no,
                    ship_date: item.shipment.ship_date == '-' ? null : item.shipment.ship_date,
                    index: item.index
                };
                post_data.push(item_data);
            });
            let data = {
                data: post_data,
                pump_code: this.$props.data.pump_code
            };
            this.$store.dispatch("shipmentUpdate", data).then((res) => {
                if (res.data.success) {
                    this.isCheckAll = false;
                    this.checkedItem.some(item => {
                        res.data.data.some(item1 => {
                            if(item1.index == item.index){
                                this.shipmentData[item.index] = item1;
                            }
                        });
                    });
                    this.checkedItem = [];
                    this.$emit("loadData");
                }
            });
        },
        checkDisabled: function (shipment) {
            if ([1,3].includes(shipment.status)) {
                return true;
            } else {
                return false;
            }
        },
        checkDiffer: function(shipment) {
            if (shipment.from_shelf != shipment.from_shelf2) {
                return true;
            } else {
                return false;
            }
        }
    },
};
</script>
  