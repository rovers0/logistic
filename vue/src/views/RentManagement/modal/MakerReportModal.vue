<template>
    <ModalLayout :show="show" title="メーカーページ登録文出力" maxWidth="max-w-2xl" @close="onClose()">
        <div class="p-2">
            <div class="pb-3 form-border preview" ref="body_text">
                <div>①{{ rent.smd_code }}{{ rent.fac_name }}-{{displayDate(rent.date_reply_plan, '','YY/MM/DD')}}着[請求開始{{monthToDate(rent.plan_invoice_start, false,'YY/MM')}}月]</div>
            </div>
    
            <div class="pt-3 pb-1 d-flex justify-content-around">
                <button class="btn default w-[7rem]" @click="onClose()">閉じる</button>
                <button class="btn selection w-[7rem]" @click="copy()">複製</button>
            </div>
        </div>
    </ModalLayout>
</template>
<style scoped>
table tr>td:first-child {
    vertical-align: top;
    padding-right: 0.5rem;
}
</style>
<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import { displayDate, monthToDate } from '@/helper.js';
</script>
<script>
export default {
    props: ['show', 'rent'],
    emits: ['close', 'paste'],
    data: function () {
        return {
        }
    },
    methods: {
        onClose: function () {
            this.$emit('close');
        },
        copy: function () {
            const text = this.$refs.body_text.innerText
            navigator.clipboard.writeText(text)
            this.$emit('paste', text)
        }
    },
    created: function () {
    }
}
</script>