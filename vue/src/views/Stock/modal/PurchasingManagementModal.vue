<template>
    <ModalLayout :show="show" title="仕入情報管理" maxWidth="max-w-7xl" :class="'px-0'" @close="closePurchasingManagement()">
        <div class="container">
            <div class="mt-2 mb-2 row">
                <div class="col-3">
                    <div class="d-flex justify-content-between">
                        <label class="col-form-label">■ 納品書のPDF文書</label>
                        <button class="btn default" @click="pasteText">貼付</button>
                    </div>
                    <div class="mt-2">
                        <textarea class="form-control" rows="11" readonly v-model="dataCopied.text"></textarea>
                    </div>
                </div>
                <div class="col-9">
                    <div class="mb-2 d-flex justify-content-between">
                        <div class="col-10 row">
                            <div class="col-4">
                                <div class="mb-2 row">
                                    <label class="col-4 col-form-label">管理番号</label>
                                    <div class="col-8">
                                        <input type="text" class="form-control" v-model="dataCopied.control_number" :disabled="selectedItem.index">
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-4 col-form-label">納品書No.</label>
                                    <div class="col-8">
                                        <input type="text" class="form-control" v-model="dataCopied.slip_code" :disabled="selectedItem.index">
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="mb-2 row">
                                    <label class="col-4 col-form-label">出荷日</label>
                                    <div class="col-8">
                                        <date-picker  :disabled="selectedItem.index" class="" v-model="dataCopied.ship_date" :enableTimePicker="false" format="yyyy/MM/dd" locale="ja" cancelText="" selectText="" auto-apply keep-action-row :close-on-auto-apply="true"></date-picker>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-4 col-form-label">搬送No.</label>
                                    <div class="col-8">
                                        <input type="text" class="form-control" v-model="dataCopied.carry_code" :disabled="selectedItem.index">
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="mb-2 row">
                                    <label class="col-4 col-form-label">仕入個数</label>
                                    <div class="col-8">
                                        <input type="text" class="form-control" v-model="dataCopied.pump_num" @change="changeSerialQuantity" :disabled="selectedItem.index">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <select class="form-select" v-model="pump_code" :disabled="selectedItem.index">
                                            <option value="A">[A] デュオドーパ</option>
                                            <option value="B">[B] ヴィアレブ</option>
                                            <option value="C">[C] ポンプタイプC(仮)</option>
                                            <option value="D">[D] ポンプタイプD(仮)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button :disabled="!selectedItem.id" class="btn selection" @click="reset">新規登録</button>
                        </div>
                    </div>
                    <div v-if="serials.data.length > 0" class="px-3 row">
                        <div v-for="s,i in serials.data" class="border border-selected" style="width:20%">
                            <div class="py-1 d-flex">
                                <input :disabled="serials.status[i] == 1" type="text" class="form-control form-control-sm" v-model="serials.data[i]">
                                <button :disabled="serials.status[i] == 1" class="btn default ms-1" @click="removeSerial(i)">X</button>
                            </div>
                        </div>
                        <div class="border border-selected" style="width:20%">
                            <div class="py-1 d-flex">
                                <input :disabled="selectedItem.status >= 2" type="text" class="form-control form-control-sm" v-model="serial_data" @keypress="addSerial">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-2 mb-2">
                <div class="mb-1 d-flex justify-content-between">
                    <div class="col-form-label">■仕入・入荷一覧(直近1年の履歴)</div>
                    <div class="col-form-label">発注回数：{{ order_data.order_num }}回　　ポンプ数：{{ order_data.pump_num }}個　未入荷：{{ order_data.pump_stock }}個</div>
                    <div>
                        <button v-if="selectedItem.id" :disabled="selectedItem.status == 2" class="btn" @click="updateOrder(selectedItem.id)">↓ 仕入情報保存</button>
                        <button v-else :disabled="serials.data.length <= 0" class="btn" @click="addOrder">↓ 仕入情報保存</button>
                    </div>
                </div>
                <div class="overflow-auto" style="height: 25vh;">
                    <table class="t-border">
                        <thead class="text-center">
                            <tr>
                                <th>ID</th>
                                <th>ポンプ</th>
                                <th>管理番号</th>
                                <th>出荷日</th>
                                <th>納品書No.</th>
                                <th>搬入No.</th>
                                <th>仕入個数</th>
                                <th>入荷個数</th>
                                <th>入荷日</th>
                                <th>入荷状況</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="order,i in order_data.order" :class="selectedItem.id == order.id ? 'selected' : ''" @click="setSelected(order,i)">
                                <td class="text-center">{{ ++i }}</td>
                                <td class="text-center">{{ order.pump_code }}</td>
                                <td class="text-center">{{ order.order_code }}</td>
                                <td class="text-center">{{ getDate(order.maker_out_date) }}</td>
                                <td class="text-center">{{ order.slip_code }}</td>
                                <td class="text-center">{{ order.carry_code }}</td>
                                <td class="text-center">{{ order.pump_num }}</td>
                                <td class="text-center">{{ order.storein_num }}</td>
                                <td class="text-center">{{ getDate(order.storein_date) }}</td>
                                <td class="text-center">{{ getOrderStatus(order.status) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mt-1 mb-2 d-flex justify-content-evenly">
                <button :disabled="selectedItem.status >= 1 || !selectedItem.id" class="btn delete w-[6rem]" @click="confirmDelete">削除</button>
                <button class="btn default w-[6rem]" @click="closePurchasingManagement">閉じる</button>
            </div>
        </div>
    </ModalLayout>
    <ConfirmModal ref="confirmDialog"></ConfirmModal>
</template>
<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import DatePicker from "@vuepic/vue-datepicker";
import '@vuepic/vue-datepicker/dist/main.css';
import moment from 'moment';
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue";
const props = defineProps({
    show: Boolean,
    data: Object,
});
</script>
<script>
export default {
    emits: ["closePurchasingManagement", "loadData"],
    data: function () {
        return {
            dataCopied: {},
            serials: {
                data: [],
                status: []
            },
            serial_data: '',
            pump_code: 'A',
            order_data: {},
            selectedItem: {}
        };
    },
    updated: function () {
        this.loadData();
        if(this.order_data != undefined && this.order_data.order_num > 0) {
            this.setSelected(this.order_data.order[0]);
        }
    },
    mounted: function () {
        this.loadData();
        if(this.order_data != undefined && this.order_data.order_num > 0) {
            this.setSelected(this.order_data.order[0]);
        }
    },
    methods: {
        closePurchasingManagement: function () {
            this.$emit("closePurchasingManagement");
            this.reset();
        },
        loadData: function() {
            this.order_data = this.$props.data;
        },
        reLoadData: function() {
          this.$store.dispatch("getOrderList").then((res) => {
            this.order_data = res.data.data;
          });
        },
        pasteText: async function () {
            this.reset();
            this.dataCopied.text = await navigator.clipboard.readText();
            let control_number = this.findByText(this.dataCopied.text, '管理番号 : ', 6);
            let ship_date = this.findByText(this.dataCopied.text, '出荷日：', 10);
            let quantity = this.findQuantity(this.dataCopied.text);
            let delivery_no = this.findByText(this.dataCopied.text, '納品書No ', 8);
            let convey_no = this.findByText(this.dataCopied.text, '搬送No ', 9);

            this.dataCopied.control_number = `O${moment().format('YYMMDD') + control_number}`;
            this.dataCopied.ship_date = ship_date;
            this.dataCopied.pump_num = quantity;
            this.dataCopied.slip_code = delivery_no;
            this.dataCopied.carry_code = convey_no;
        },
        findByText: function (text, key, size) {
            let data = text.substr(text.search(key) + key.length, size);
            return data;
        },
        findQuantity: function (text) {
            let sum = 0;
            let data_cut = text.substring(text.search('_ポンプ 1台') + '_ポンプ 1台'.length);
            let data = data_cut.substring(2, data_cut.search(' 台') - 1);
            data = data.split('\r\n');
            data.pop();
            data = data.filter(item => item.length > 0)
            data.some(item => {
                item = item.split(' ');
                this.serials.data.push(item[0]);
                if(item[1]){
                    sum += parseInt(item[1]);
                }
            });
            return sum;
        },
        reset: function() {
            this.pump_code = 'A';
            this.serials.data = [];
            this.serials.status = [];
            this.dataCopied = {};
            this.selectedItem = {};
        },
        addSerial: function($event) {
            if($event.key == 'Enter' && this.serial_data != ''){
                this.serials.data.push(this.serial_data);
                this.serials.status.push(0);
                this.serial_data = '';
                this.dataCopied.pump_num = this.serials.data.length;
            }
        },
        changeSerialQuantity: function() {
            if(this.dataCopied.text){
                if(this.serials.data.length < this.dataCopied.pump_num){
                    let count = this.dataCopied.pump_num - this.serials.data.length;
                    for(let i = 0; i < count; i++) {
                        this.serials.data.push('');
                    }
                }else{
                    let count = this.serials.data.length - this.dataCopied.pump_num;
                    for(let i = 0; i < count; i++) {
                        this.serials.data.pop();
                    }
                }
            }else{
                this.serials.data = [];
                for(let i = 0; i < this.dataCopied.pump_num; i++) {
                    this.serials.data.push('');
                }
            }
        },
        removeSerial: function(index) {
            this.serials.data.splice(index, 1);
            this.dataCopied.pump_num = this.serials.data.length;
        },
        getOrderStatus: function(status) {
            let data = status == 1 ? '一部' : status == 0 ? '-' : '済';
            return data;
        },
        getDate: function(date) {
            return date ? moment(date).format('YYYY/MM/DD') : '-';
        },
        addOrder: function() {
            let data = {
                order_code: this.dataCopied.control_number,
                pump_code: this.pump_code,
                serial_no: this.serials.data,
                slip_code: this.dataCopied.slip_code,
                carry_code: this.dataCopied.carry_code,
                pump_num: this.dataCopied.pump_num,
                maker_out_date: this.dataCopied.ship_date ? moment(this.dataCopied.ship_date).format('YYYY-MM-DD') : null
            };
            this.$store.dispatch("addWait", data).then((res) => {
                if(res.data.success){
                    this.order_data = res.data.data;
                    this.setSelected(this.order_data.order[0]);
                    this.selectedItem.index = 1;
                    this.$emit("loadData");
                }
            });
        },
        updateOrder: function(id) {
            let serial_no = this.serials.data.filter((item,i) => this.serials.status[i] == 0);
            let data = {
                order_code: this.dataCopied.control_number,
                pump_code: this.pump_code,
                serial_no: serial_no,
                slip_code: this.dataCopied.slip_code,
                carry_code: this.dataCopied.carry_code,
                pump_num: this.dataCopied.pump_num,
                maker_out_date: this.dataCopied.ship_date ? moment(this.dataCopied.ship_date).format('YYYY-MM-DD') : null
            };
            this.serial_data = '';
            this.$store.dispatch("updateWait", data).then((res) => {
                if(res.data.success){
                    this.order_data = res.data.data;
                    let order = this.order_data.order.filter(item => item.id == id);
                    this.setSelected(order[0]);
                    this.selectedItem.index = 1;
                    this.$emit("loadData");
                }
            });
        },
        setSelected: function(order,index) {
            this.serial_data = '';
            this.reset();
            this.selectedItem = {...order};
            this.selectedItem.index = index;
            this.dataCopied.control_number = order.order_code;
            this.dataCopied.slip_code = order.slip_code;
            this.dataCopied.ship_date = order.maker_out_date;
            this.dataCopied.carry_code = order.carry_code;
            this.dataCopied.pump_num = order.pump_num;
            this.pump_code = order.pump_code;
            this.serials.data = [];
            order.wait.some(item => {
                this.serials.data.push(item.serial_no);
                this.serials.status.push(item.status);
            });
        },
        confirmDelete: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: '確認',
                message: '選択した管理番号を削除しますか。',
                okButton: '実行',
                cancelButton: 'キャンセル'
            });
            if (ok) {
                let data = {
                    id: this.selectedItem.id
                };
                this.$store.dispatch("deleteOrder", data).then((res) => {
                    if (res.data.success) {
                        this.order_data = res.data.data;
                        this.setSelected(this.order_data.order[0]);
                        this.selectedItem.index = 1;
                        this.$emit("loadData");
                    }
                });
                await this.$refs.confirmDialog.close();
            }
        }
    },
};
</script>
  