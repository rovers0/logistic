<template>
    <ModalLayout :show="show" title="連絡テキスト情報" maxWidth="max-w-2xl" @close="onClose()">
        <div class="form-border preview m-2">
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
        </div>

        <div class="d-flex justify-content-between p-2">
            <button class="btn">文書のペスト</button>
            <div class="d-flex align-items-center gap-2">
                <label class="label-text">テキスト種別</label>
                <select class="form-select">
                    <option value="">治療開始連絡票</option>
                </select>
            </div>
            <button class="btn">文書の追加</button>
        </div>

        <div class="form-border preview m-2">
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
            contact information
        </div>

        <div class="d-flex justify-content-between pb-3 pt-2 px-2">
            <label class="label-text d-flex gap-2 align-items-center">
                <input type="checkbox" class="form-check-input mt-0">記録文書の直接編集
            </label>
            <button class="btn default w-[6rem]" @click="onClose()">閉じる</button>
            <button class="btn w-[6rem]" @click="onConfirm()">保存</button>
        </div>
    </ModalLayout>
</template>
<style scoped>
    .form-border.preview {
        max-height: 15rem;
        overflow-y: auto;
    }
</style>
<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
</script>
<script>
export default {
    props: ['show'],
    emits: ['close', 'confirm'],
    data: function () {
        return {
            day: null
        }
    },
    methods: {
        onClose: function () {
            this.$emit('close');
        },
        onConfirm: function () {
            this.$emit('confirm');
        }
    }
}
</script>