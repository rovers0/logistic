<template>
    <ModalLayout :show="show" title="入庫待ちポンプの詳細" maxWidth="max-w-3xl" :class="'px-0'" @close="closeOrderPump()">
        <div class="container">
            <div class="mt-2 mb-2"></div>
            <div class="mb-2 d-flex justify-content-between">
                <label class="col-form-label w-[4rem]">ポンプ</label>
                <div class="w-[50%]">
                    <select disabled class="form-select" v-model="waitDetail.pump_code" @change="loadTargets">
                        <option value="A">[A] デュオドーパ</option>
                        <option value="B">[B] ヴィアレブ</option>
                        <option value="C">[C] ポンプタイプC(仮)</option>
                        <option value="D">[D] ポンプタイプD(仮)</option>
                    </select>
                </div>
                <label class="col-form-label w-[6rem]">シリアルNo.</label>
                <div class="w-[10rem]">
                    <input disabled type="text" class="form-control" v-model="waitDetail.serial_no"/>
                </div>
            </div>
            <div class="mb-2 d-flex justify-content-between">
                <label class="col-form-label w-[4rem]">最初入庫日</label>
                <div class="w-[25%]">
                    <Datepicker disabled format="yyyy/MM/dd" v-model="waitDetail.first_stored_date"></Datepicker>
                </div>
                <label class="col-form-label w-[5rem]">期限残月数</label>
                <div class="w-[9%]">
                    <input disabled type="text" class="form-control" v-model="waitDetail.expire_mons"/>
                </div>
                <label class="col-form-label w-[6rem]">使用開始日</label>
                <div class="w-[10rem]">
                    <Datepicker disabled format="yyyy/MM/dd" v-model="waitDetail.first_rental_date"></Datepicker>
                </div>
            </div>
            <div class="mb-2 d-flex justify-content-between">
                <label class="col-form-label w-[4rem]">最後の患者</label>
                <div class="w-[25%]">
                    <input disabled type="text" class="form-control" v-model="waitDetail.last_patient_cd"/>
                </div>
                <label class="col-form-label w-[5rem]">履歴番号</label>
                <div class="w-[9%]">
                    <input disabled type="text" class="form-control" v-model="waitDetail.last_hist_no"/>
                </div>
                <label class="col-form-label w-[6rem]">指示日</label>
                <div class="w-[10rem]">
                    <Datepicker disabled format="yyyy/MM/dd" v-model="waitDetail.stock_todo_date"></Datepicker>
                </div>
            </div>
            <div class="mb-2 d-flex justify-content-between">
                <label class="col-form-label w-[4rem]">入庫の棚</label>
                <div class="w-[50%]">
                    <select disabled class="form-select" v-model="waitDetail.storein_shelf">
                        <option v-for="target,t in targets" :value="target.code">{{ target.text }}</option>
                    </select>
                </div>
                <label class="col-form-label w-[6rem]">入庫理由</label>
                <div class="w-[10rem]">
                    <select disabled class="form-select" v-model="waitDetail.wait_type">
                        <option value="1">新規入庫</option>
                        <option value="2">点検後入庫</option>
                        <option value="3">修理後入庫</option>
                        <option value="4">旧ポンプ(定期)</option>
                        <option value="5">旧ポンプ(故障)</option>
                        <option value="6">使用中止返却</option>
                        <option value="7">在庫移動</option>
                    </select>
                </div>
            </div>
            <div class="mt-1 mb-2 d-flex justify-content-evenly">
                <button class="btn delete" @click="confirmDelete">削除</button>
                <button class="btn default" @click="closeOrderPump()">閉じる</button>
            </div>
        </div>
    </ModalLayout>
    <ConfirmModal ref="confirmDialog"></ConfirmModal>
</template>
<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue";
const props = defineProps({
    show: Boolean,
    data: Object,
});
</script>
<script>
export default {
    emits: ["closeOrderPump", "loadData"],
    data: function () {
        return {
            waitDetail: {},
            targets: []
        };
    },
    updated: function () {
        this.loadData();
    },
    mounted: function () {
        this.loadData();
    },
    methods: {
        closeOrderPump: function () {
            this.$emit("closeOrderPump");
        },
        loadTargets: function () {
            this.waitDetail.todo_target = `${this.waitDetail.pump_code}001`;
            this.targets = [
                {code: `${this.waitDetail.pump_code}001`, text: `${this.waitDetail.pump_code}001(新規仕入れ)`},
                {code: `${this.waitDetail.pump_code}002`, text: `${this.waitDetail.pump_code}002(一回点検済)`},
                {code: `${this.waitDetail.pump_code}003`, text: `${this.waitDetail.pump_code}003(二回点検済)`},
                {code: `${this.waitDetail.pump_code}004`, text: `${this.waitDetail.pump_code}004(故障点検済)`},
                {code: `${this.waitDetail.pump_code}005`, text: `${this.waitDetail.pump_code}005(期限が迫った)`},
                {code: `${this.waitDetail.pump_code}006`, text: `${this.waitDetail.pump_code}006(保守点検中)`},
                {code: `${this.waitDetail.pump_code}007`, text: `${this.waitDetail.pump_code}007(故障点検中)`},
                {code: `${this.waitDetail.pump_code}008`, text: `${this.waitDetail.pump_code}008(出荷停止中)`},
                {code: `${this.waitDetail.pump_code}009`, text: `${this.waitDetail.pump_code}009(一時保存棚)`},
            ];
        },
        loadData: function () {
            this.waitDetail = this.$props.data;
            this.loadTargets();
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
                    ids: [this.waitDetail.id]
                };
                this.$store.dispatch("deleteWait", data).then((res) => {
                    if (res.data.success) {
                        this.closeOrderPump();
                        this.$emit("loadData");
                    }
                });
                await this.$refs.confirmDialog.close();
            }
        }
    },
};
</script>
  