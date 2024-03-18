<template>
    <ModalLayout :show="show" title="出荷情報送信完了設定" maxWidth="max-w-xl" @close="onClose()">
        <div class="px-5 my-3 d-flex">
            <div class="d-flex align-items-center basis-[40%]">
                <label class="input-label">件数：{{ quantity }}件</label>
            </div>

            <div class="d-flex align-items-center basis-[60%]">
                <label class="input-label w-[6rem]">送信完了日</label>
                <Datepicker class="flex-1" v-model="send_date"></Datepicker>
            </div>
        </div>

        <div class="p-3 d-flex justify-content-around">
            <button class="btn default w-[8rem]" @click="onClose()">閉じる</button>
            <button class="btn default w-[8rem]" @click="onConfirm()" :disabled="!send_date">送信完了</button>
        </div>
    </ModalLayout>
</template>

<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
</script>
<script>
export default {
    props: ['show', 'quantity'],
    emits: ['close', 'confirm'],
    data: function () {
        return {
            send_date: null
        };
    },
    methods: {
        onClose: function () {
            this.$emit('close')
        },
        onConfirm: function () {
            this.$emit('confirm', this.send_date)
        }
    }
}
</script>