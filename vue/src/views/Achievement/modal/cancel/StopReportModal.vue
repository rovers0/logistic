<template>
    <ModalLayout :show="show" title="中止の報告文書" maxWidth="max-w-2xl" @close="onClose()">
        <div class="px-2">
            <div class="my-2 form-border preview" ref="body_text">
                <table>
                    <tr>
                        <td>医療機関</td>
                        <td>: {{ cancel.fac_name }}</td>
                    </tr>
                    <tr>
                        <td>ご担当者</td>
                        <td>: {{ cancel.recv_from_who }}</td>
                    </tr>
                    <tr>
                        <td>製造番号</td>
                        <td>: {{ cancel.serial_no }}</td>
                    </tr>
                    <tr>
                        <td>中止日</td>
                        <td>: {{ stop_date }}</td>
                    </tr>
                    <tr>
                        <td>電話番号</td>
                        <td>: {{ cancel.recv_phone ?? '未記入' }}</td>
                    </tr>
                    <tr>
                        <td>ＦＡＸ番号</td>
                        <td>: {{ cancel.recv_fax ?? '未記入' }}</td>
                    </tr>
                    <tr>
                        <td>中止理由</td>
                        <td>: {{ cancel.stop_info_text ?? '未記載' }}</td>
                    </tr>
                </table>
                <div class="d-grid">
                    <span>＊ポンプ回収用梱包資材の希望　{{ cancel.hope_send_case ? 'はい' : '無' }}　</span>
                    <span>★治療中断通知連絡メールは、届いておりませんが</span>
                    <span>川野様より下記のメールが届いておします。</span>
                    <span>いつも大変お世話になっております。</span>
                    <span>潤和会記念病院のPEG延期中患者さんの治療中止の一報が入りましたので連</span>
                    <span>絡いたします。ご施設へはポンプレンタル中止FAXと現物返却を依頼しました。</span>
                    <span>よろしくお願いいたします。</span>
                </div>
                <table>
                    <tr>
                        <td>医療機関</td>
                        <td>: {{ cancel.fac_name }}</td>
                    </tr>
                    <tr>
                        <td>患者さん</td>
                        <td>: {{ cancel.curHistory.patient_nm }}</td>
                    </tr>
                    <tr>
                        <td>ポンプ</td>
                        <td>: {{ cancel.serial_no }}</td>
                    </tr>
                    <tr>
                        <td>PEG予定</td>
                        <td>: {{ stop_date_end }} {{ ' →　治療中止' }}</td>
                    </tr>
                </table>
            </div>
    
            <div class="pt-2 pb-3 d-flex justify-content-around">
                <button class="btn default w-[6rem]" @click="onClose()">閉じる</button>
                <button class="btn selection w-[6rem]" @click="copy()" :disabled="isDisable">解析</button>
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
    props: ['show', 'cancel'],
    emits: ['close', 'confirm'],
    data: function () {
        return {
            stop_date: null,
            stop_date_end: null,
            isDisable: false,
        }
    },
    methods: {
        onClose: function () {
            this.$emit('close');
        },
        copy: function () {
            const text = this.$refs.body_text.innerText
            navigator.clipboard.writeText(text)
            this.isDisable = true
            setTimeout(() => {
                this.isDisable = false
            }, 500)
        }
    },
    created: function () {
        if(this.cancel.stop_date) {
            this.stop_date = this.cancel.stop_date
            if(typeof this.cancel.stop_date !== 'object') this.stop_date = new Date(this.cancel.stop_date)
            this.stop_date_end = moment(this.stop_date).format('YYYY/MM/DD')
            this.stop_date = moment(this.stop_date).format('YYYY年MM月DD日')
        }
    }
}
</script>