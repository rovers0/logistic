<template>
    <ModalLayout :show="show" :title="'確認'" maxWidth="max-w-xl" @close="_cancel()">
        <div class="gap-3 px-5 pt-3 d-flex flex-column">
            <label class="gap-2 d-flex align-items-center">
                <input type="radio" class="mt-0 form-check-input" name="delete_flag" :value="0" checked v-model="delete_flag">履歴情報を残す。
            </label>
            <label class="gap-2 d-flex align-items-center">
                <input type="radio" class="mt-0 form-check-input" name="delete_flag" :value="1" v-model="delete_flag">履歴情報を残さない。
            </label>
        </div>
        <div class="p-3 d-flex justify-content-around">
            <button class="btn default w-[8rem]" @click="_cancel()">{{ 'キャンセル' }}</button>
            <button class="btn delete w-[8rem]" @click="_confirm()">{{ '実行' }}</button>
        </div>
    </ModalLayout>
</template>
<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
</script>
<script>
export default {
    props: ['show'],
    emits: ['close', 'confirm'],
    data: function () {
        return {
            delete_flag: 0,
        }
    },
    methods: {
        _cancel: async function () {
            this.$emit('close')
        },
        _confirm: async function () {
            this.$emit('confirm', this.delete_flag)
        },
    }
}
</script>