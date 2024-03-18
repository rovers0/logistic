<template>
    <ModalLayout :show="show" title="在庫ポンプの詳細" maxWidth="max-w-3xl" :class="'px-0'" @close="closeStockDetail()">
        <div class="container">
            <div class="mt-2 mb-2 d-flex justify-content-between">
                <label class="col-form-label w-[4rem]">ポンプ</label>
                <div class="w-[50%]">
                    <select disabled class="form-select" v-model="stock_detail.pump_code">
                        <option value="A">[A] デュオドーパ</option>
                        <option value="B">[B] ヴィアレブ</option>
                        <option value="C">[C] ポンプタイプC(仮)</option>
                        <option value="D">[D] ポンプタイプD(仮)</option>
                    </select>
                </div>
                <label class="col-form-label w-[6rem]">シリアルNo.</label>
                <div class="w-[10rem]">
                    <input disabled type="text" class="form-control" v-model="stock_detail.serial_no"/>
                </div>
            </div>
            <div class="mb-2 d-flex justify-content-between">
                <label class="col-form-label w-[4rem]">最初入庫日</label>
                <div class="w-[25%]">
                    <Datepicker format="yyyy/MM/dd" v-model="stock_detail.first_storein_date"></Datepicker>
                </div>
                <label class="col-form-label w-[5rem]">期限残月数</label>
                <div class="w-[9%]">
                    <input disabled type="text" class="form-control" v-model="stock_detail.expire_mons"/>
                </div>
                <label class="col-form-label w-[6rem]">使用開始日</label>
                <div class="w-[10rem]">
                    <Datepicker format="yyyy/MM/dd" v-model="stock_detail.first_rental_date"></Datepicker>
                </div>
            </div>
            <div class="mb-2 d-flex justify-content-between">
                <label class="col-form-label w-[4rem]">最後の患者</label>
                <div class="w-[25%]">
                    <input type="text" class="form-control text-center" v-model="stock_detail.last_patient_cd"/>
                </div>
                <label class="col-form-label w-[5rem]">履歴番号</label>
                <div class="w-[9%]">
                    <input type="text" class="form-control" v-model="stock_detail.last_hist_no"/>
                </div>
                <label class="col-form-label w-[6rem]">最後入庫日</label>
                <div class="w-[10rem]">
                    <Datepicker format="yyyy/MM/dd" v-model="stock_detail.final_storein_date"></Datepicker>
                </div>
            </div>
            <div class="mb-2 d-flex justify-content-between">
                <label class="col-form-label w-[4rem]">現在の棚</label>
                <div class="w-[50%]">
                    <select disabled class="form-select" v-model="stock_detail.shelf_code">
                        <option v-for="target,t in targets" :disabled="[5,6].includes(t)" :value="target.code">{{ target.text }}</option>
                    </select>
                </div>
                <label class="col-form-label w-[6rem]">次の操作</label>
                <div class="w-[10rem]">
                    <select class="form-select" v-model="stock_detail.todo_flag">
                        <option value="0"></option>
                        <option value="1">在庫移動</option>
                        <option value="4">売却出荷</option>
                        <option value="5">破棄出荷</option>
                        <option value="6">点検出荷</option>
                        <option value="7">修理出荷</option>
                    </select>
                </div>
            </div>
            <div class="mb-2 d-flex justify-content-between">
                <label class="col-form-label w-[4rem]">移動先棚</label>
                <div class="w-[50%]">
                    <select class="form-select" v-model="stock_detail.todo_target1">
                        <template v-for="target,t in targets">
                            <option v-if="![5,6].includes(t)" :disabled="target.code == stock_detail.shelf_code" :value="target.code">{{ target.text }}</option>
                        </template>
                    </select>
                </div>
                <label class="col-form-label w-[6rem]">操作実施日</label>
                <div class="w-[10rem]">
                    <Datepicker v-if="data.todo_date" format="yyyy/MM/dd" v-model="stock_detail.todo_date" :clearable="false"></Datepicker>
                    <Datepicker v-else format="yyyy/MM/dd" v-model="stock_detail.todo_date"></Datepicker>
                </div>
            </div>
            <div class="mt-1 mb-2 d-flex justify-content-evenly">
                <button class="btn delete" @click="confirmDelete" :disabled="data.todo_date">在庫削除</button>
                <button class="btn default" @click="closeStockDetail()">閉じる</button>
                <button class="btn" @click="stockUpdate">保存</button>
            </div>
        </div>
    </ModalLayout>
    <ConfirmModal ref="confirmDialog"></ConfirmModal>
</template>
<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import moment from 'moment';
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue";
const props = defineProps({
    show: Boolean,
    data: Object,
});
</script>
<script>
export default {
    emits: ["closeStockDetail", "loadData"],
    data: function () {
        return {
            stock_detail: {},
            state: this.$store.state,
            targets: [],
            clearDate: false
        };
    },
    updated: function () {
        this.loadData();
    },
    mounted: function () {
        this.loadData();
    },
    methods: {
        closeStockDetail: function () {
            this.$emit("closeStockDetail");
        },
        loadTargets: function () {
            this.targets = [
                {code: `${this.state.pump_code}001`, text: `${this.state.pump_code}001(新規仕入れ)`},
                {code: `${this.state.pump_code}002`, text: `${this.state.pump_code}002(一回点検済)`},
                {code: `${this.state.pump_code}003`, text: `${this.state.pump_code}003(二回点検済)`},
                {code: `${this.state.pump_code}004`, text: `${this.state.pump_code}004(故障点検済)`},
                {code: `${this.state.pump_code}005`, text: `${this.state.pump_code}005(期限が迫った)`},
                {code: `${this.state.pump_code}006`, text: `${this.state.pump_code}006(保守点検中)`},
                {code: `${this.state.pump_code}007`, text: `${this.state.pump_code}007(故障点検中)`},
                {code: `${this.state.pump_code}008`, text: `${this.state.pump_code}008(出荷停止中)`},
                {code: `${this.state.pump_code}009`, text: `${this.state.pump_code}009(一時保存棚)`},
            ];
        },
        loadData: function() {
            this.stock_detail = {...this.$props.data};
            this.loadTargets();
        },
        stockUpdate: function() {
            let data = {
                ...this.stock_detail
            };
            data.first_rental_date = data.first_rental_date ? moment(data.first_rental_date).format('YYYY-MM-DD') : null;
            data.final_storein_date = data.final_storein_date ? moment(data.final_storein_date).format('YYYY-MM-DD') : null;
            data.first_storein_date = data.first_storein_date ? moment(data.first_storein_date).format('YYYY-MM-DD') : null;
            data.todo_date = data.todo_date ? moment(data.todo_date).format('YYYY-MM-DD') : null;
            this.$store.dispatch("stockUpdate", data).then((res) => {
                if(res.data.success) {
                    this.$emit("loadData");
                    this.closeStockDetail();
                }
            });
        },
        confirmDelete: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: '確認',
                message: '本当にこのポンプを在庫管理から削除しますか。',
                okButton: '実行',
                cancelButton: 'キャンセル',
                ok_class: ''
            });
            if (ok) {
                let data = {
                    id: this.stock_detail.id
                };
                this.$store.dispatch("deleteStock", data).then((res) => {
                    if (res.data.success) {
                        this.isCheckAll = false;
                        this.checkedItem = [];
                        this.$emit("loadData");
                        this.closeStockDetail();
                    }
                });
                await this.$refs.confirmDialog.close();
            }
        }
    },
};
</script>
  