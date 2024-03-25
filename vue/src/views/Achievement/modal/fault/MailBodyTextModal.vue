<template>
    <ModalLayout :show="show" title="故障交換依頼受領書本文作成" maxWidth="max-w-2xl" @close="onClose()">
        <div class="px-2">
            <div class="my-2 form-border preview" ref="body_text">
                <div>この度はポンプの不具合との事でご迷惑おかけして誠に申し訳ございませんでした。</div>
                <div>交換用のポンプは希望日が{{ date }}となっておりましたので、希望日当日の{{ week_date }}着で{{ des }} 宛に配達する様、配送業者に手配いたします。</div>
            </div>
    
            <div class="pt-2 pb-3 d-flex justify-content-around">
                <button class="btn default w-[6rem]" @click="onClose()">閉じる</button>
                <button class="btn selection w-[6rem]" @click="copy()">複製</button>
            </div>
        </div>
    </ModalLayout>
</template>
<style scoped>
    .template-col-2 {
        grid-template-columns: 6rem 1fr;
    }
</style>
<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import moment from 'moment';
</script>
<script>
export default {
    props: ['show', 'fault'],
    emits: ['close', 'confirm'],
    data: function () {
        return {
            date: null,
            week_date: null,
            des: null,
        }
    },
    methods: {
        onClose: function () {
            this.$emit('close')
        },
        copy: function () {
            const text = this.$refs.body_text.innerText
            navigator.clipboard.writeText(text)
            this.$emit('confirm', text)
        }
    },
    created: function () {
        moment.updateLocale('en', {
            weekdaysShort: '日_月_火_水_木_金_土'.split('_')
        })
        if(this.fault.date_deli_hope) {
            this.date = this.fault.date_deli_hope
            if(typeof this.fault.date_deli_hope !== 'object') this.date = new Date(this.fault.date_deli_hope)
            this.week_date = moment(this.date).format('MM月DD日（ddd）')
            this.date = moment(this.date).format('MM月DD日')
        }

        this.des = this.fault.clinic+'　'+this.fault.doctor+' '+this.fault.title
    }
}
</script>