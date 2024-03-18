<template>
    <ModalLayout :show="show" title="施設向けの受領書本文
" maxWidth="max-w-2xl" @close="onClose()">
        <div class="p-2">
            <div class="form-border preview" ref="body_text">
                <div>
                    納入希望日が<span class="text-danger">{{ ord_deli_hope }}</span>と記載されましたので、
                </div>
                <div>
                    希望日当日の<span  class="text-danger">{{ date_reply_plan }}</span>に<span  class="text-danger">{{ rent.des_clinic }} {{ rent.des_doctor }}</span>　宛に納品して頂く様、配送業者へ依頼をいたします。
                </div>
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
import moment from 'moment';
</script>
<script>
export default {
    props: ['show', 'rent'],
    emits: ['close', 'paste'],
    data: function () {
        return {
            ord_deli_hope: new Date(),
            date_reply_plan: new Date()
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
        moment.updateLocale('en', {
            weekdaysShort: '日_月_火_水_木_金_土'.split('_')
        })
        this.ord_deli_hope = this.rent.ord_deli_hope
        this.date_reply_plan = this.rent.date_reply_plan
        if(typeof this.rent.ord_deli_hope !== 'object') this.ord_deli_hope = new Date(this.rent.ord_deli_hope)
        if(typeof this.rent.date_reply_plan !== 'object') this.date_reply_plan = new Date(this.rent.date_reply_plan)
        this.ord_deli_hope = moment(this.ord_deli_hope).format('MM月DD日')
        this.date_reply_plan = moment(this.date_reply_plan).format('MM月DD日（ddd）')
    }
}
</script>