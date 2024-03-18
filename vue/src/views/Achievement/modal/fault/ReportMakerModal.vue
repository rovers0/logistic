<template>
    <ModalLayout :show="show" title="故障交換時のメーカーに報告文作成" maxWidth="max-w-2xl" @close="onClose()">
        <div class="px-2">
            <div class="my-2 form-border preview" ref="body_text">
                <div>ポンプ交換依頼のFAXが届きましたのでご連絡致します。</div>
                <br>
                <table>
                    <tr>
                        <td>医療機関</td>
                        <td>: {{ fault.fac_name }}</td>
                    </tr>
                    <tr>
                        <td>ご担当者</td>
                        <td>: {{ fault.clinic+' '+fault.doctor+' '+fault.title }}</td>
                    </tr>
                    <tr>
                        <td>製造番号</td>
                        <td>: {{ '未っ記入(患者IDから検索し、'+fault.srcHistory.serial_no+'と判明)' }}</td>
                    </tr>
                    <tr>
                        <td>{{ ' ' }}</td>
                        <td>{{ fault.fault_text ?? 'ポンプ動作不良のため' }}</td>
                    </tr>
                    <tr>
                        <td>納品希望</td>
                        <td>: {{ fault.date_deli_hope ? (displayDate(fault.date_deli_hope, '', 'YYYY年MM月DD日')+'午前中') : '' }}</td>
                    </tr>
                    <tr>
                        <td>電話番号</td>
                        <td>: {{ fault.desHistory.facility.fac_tel ?? '' }}</td>
                    </tr>
                    <tr>
                        <td>FAX 番号</td>
                        <td>: {{ fault.desHistory.facility.fac_fax ?? '' }}</td>
                    </tr>
                </table>
                <br>
                <div>----★----☆----★----☆----★----☆----★----☆----★----</div>
                <div>エス・エム・ディ株式会社</div>
                <div>業務部　業務グループ</div>
                <br>
                <div>{{ user ? user.username : '' }}</div>
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
import { mapState, mapGetters } from "vuex";
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import moment from 'moment';
import { displayDate } from '@/helper.js';
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
    computed: {
      ...mapGetters(['user'])
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
       
    }
}
</script>