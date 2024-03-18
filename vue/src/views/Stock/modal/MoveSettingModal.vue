<template>
    <ModalLayout :show="show" title="移動設定" maxWidth="max-w-sm" :class="'px-0'" @close="closeMoveSetting()">
        <div class="container">
            <div class="mt-2 mb-2">{{ data.msg }}</div>
            <div class="mb-2 d-flex justify-content-between">
                <label class="col-form-label">移動先棚</label>
                <div class="ms-1 me-3 col-9">
                    <select class="form-select" v-model="todo_target">
                        <option v-for="target,t in targets" :value="target.code">{{ target.text }}</option>
                    </select>
                </div>
            </div>
            <div class="mb-2 d-flex justify-content-between">
                <label class="col-form-label">備考</label>
                <div class="ms-1 me-3 col-9">
                    <input type="text" class="form-control" placeholder="移動理由等を記述してください。" v-model="todo_remark">
                </div>
            </div>
            <div class="mt-1 mb-2 d-flex justify-content-between">
                <button class="btn delete" @click="confirmDelete">解除</button>
                <button class="btn default" @click="closeMoveSetting()">キャンセル</button>
                <button :disabled="!data.set_instruction" class="btn" @click="moveStock">設定</button>
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
    emits: ["closeMoveSetting", "loadData"],
    data: function () {
        return {
            todo_target: '',
            todo_remark: '',
            state: this.$store.state,
            targets: []
        };
    },
    updated: function () {
        this.loadTargets();
    },
    mounted: function () {
        this.loadTargets();
    },
    methods: {
        closeMoveSetting: function () {
            this.$emit("closeMoveSetting");
        },
        moveStock: function() {
            let data = {
                ids: this.$props.data.stock_ids,
                todo_target: this.todo_target,
                todo_remark: this.todo_remark
            };
            this.$store.dispatch("moveSetting", data).then((res) => {
                if(res.data.success){
                    this.closeMoveSetting();
                    this.$emit("loadData");
                }
            });
        },
        loadTargets: function () {
            this.todo_target = this.$props.data.todo_target ? this.$props.data.todo_target : `${this.state.pump_code}001`;
            this.todo_remark = this.$props.data.todo_remark ? this.$props.data.todo_remark : '';
            this.targets = [
                {code: `${this.state.pump_code}001`, text: `${this.state.pump_code}001(新規仕入れ)`},
                {code: `${this.state.pump_code}002`, text: `${this.state.pump_code}002(一回点検済)`},
                {code: `${this.state.pump_code}003`, text: `${this.state.pump_code}003(二回点検済)`},
                {code: `${this.state.pump_code}004`, text: `${this.state.pump_code}004(故障点検済)`},
                {code: `${this.state.pump_code}005`, text: `${this.state.pump_code}005(期限が迫った)`},
                // {code: `${this.state.pump_code}006`, text: `${this.state.pump_code}006(保守点検中)`},
                // {code: `${this.state.pump_code}007`, text: `${this.state.pump_code}007(故障点検中)`},
                {code: `${this.state.pump_code}008`, text: `${this.state.pump_code}008(出荷停止中)`},
                {code: `${this.state.pump_code}009`, text: `${this.state.pump_code}009(一時保存棚)`},
            ];
        },
        confirmDelete: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: '確認',
                message: '移動設定する前に戻りますか。',
                okButton: '実行',
                cancelButton: 'キャンセル',
                ok_class: ''
            });
            if (ok) {
                let data = {
                    ids: this.$props.data.stock_ids
                };
                this.$store.dispatch("deleteMoveSetting", data).then((res) => {
                    if (res.data.success) {
                        this.isCheckAll = false;
                        this.checkedItem = [];
                        this.closeMoveSetting();
                        this.$emit("loadData");
                    }
                });
                await this.$refs.confirmDialog.close();
            }
        }
    },
};
</script>
  