<template>
    <ModalLayout :show="show" title="メーカー向けの発注書受領報告文" maxWidth="max-w-2xl" @close="onClose()">
        <div class="p-2">
            <div class="form-border preview" ref="body_text">
                <div>【{{ typeText(master.machines, rent.shipment.pump_code,'pump_cd', 'pump_nm_short') }}】ポンプレンタル発注が届きました（{{ rent.fac_name }}）</div>
                <br>
                <div>アッヴィ合同会社</div>
                <div>川野　様</div>
                <div>庄田　様</div>
                <div>二瓶　様</div>
                <br>
                <div>いつも大変お世話になっております。</div>
                <br>
                <div>【{{ typeText(master.machines, rent.shipment.pump_code,'pump_cd', 'pump_nm_short') }}】ポンプレンタル発注書のFAXが届きましたのでご連絡致します。</div>
                <br>
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>医療機関</td>
                            <td>: {{ rent.fac_name }}</td>
                        </tr>
                        <tr>
                            <td>ご担当者</td>
                            <td>: {{ rent.shipment.des_name }}</td>
                        </tr>
                        <tr>
                            <td>希望台数</td>
                            <td>: {{ '1台' }}</td>
                        </tr>
                        <tr>
                            <td>貸出希望日</td>
                            <td>: {{ displayDate(rent.ord_deli_hope, '', 'YYYY年MM月DD日')}}</td>
                        </tr>
                        <tr>
                            <td>電話番号</td>
                            <td>: {{ rent.fac_tel }}</td>
                        </tr>
                        <tr>
                            <td>FAX番号</td>
                            <td>: {{ rent.fac_fax }}</td>
                        </tr>
                        <br>
                        <tr>
                            <td>使用開始日</td>
                            <td>{{ displayDate(rent.ord_start_use, '', 'YYYY年MM月DD日') }}</td>
                        </tr>
                        <br>
                    </tbody>
                </table>
                <div>＊貸出希望日が{{ displayDate(rent.ord_deli_hope, '', 'YYYY年MM月DD日') }}と記載されておりましたので</div>
                <div>　希望日当日の{{ displayDate(rent.ord_deli_hope, '', 'MM月DD日（ddd）') }}着で</div>
                <div>{{ rent.shipment.des_name }} 宛にお届けする様手配いたします。</div>
                <br>
                <div>請求開始は{{ displayDate(rent.plan_invoice_start, '', 'YYYY年MM月') }}より</div>
                <br>
                <table>
                    <tr>
                        <td>★治療開始連絡は、</td>
                    </tr>
                    <tr>
                        <td>≪登録内容≫</td>
                    </tr>
                    <tr>
                        <td>【メール受信日】</td>
                        <td>{{ displayDate(rent.treat_recive_date, '', 'YYYY年MM月DD日') }}</td>
                    </tr>
                    <tr>
                        <td>【提出日】</td>
                        <td>{{ displayDate(rent.treat_apply_date , '', 'YYYY年MM月DD日') }}</td>
                    </tr>
                    <tr>
                        <td>【施設名】</td>
                        <td>{{ rent.fac_name }}</td>
                    </tr>
                    <tr>
                        <td>【入院予定日】</td>
                        <td>{{ displayDate(rent.fac_enter_date , '', 'YYYY年MM月DD日') }}</td>
                    </tr>
                    <tr>
                        <td>【NJ挿入予定日】</td>
                        <td>{{ displayDate(rent.tube_insert_date , '', 'YYYY年MM月DD日') }}</td>
                    </tr>
                    <tr>
                        <td>【PEG施術予定日】</td>
                        <td>{{ displayDate(rent.treatment_date , '', 'YYYY年MM月DD日') }}</td>
                    </tr>
                    <tr>
                        <td>【退院予定日】</td>
                        <td>{{ displayDate(rent.fac_leave_date , '', 'YYYY年MM月DD日') }}</td>
                    </tr>
                </table>
            </div>
    
            <div class="pt-3 pb-1 d-flex justify-content-around">
                <button class="btn default w-[7rem]" @click="onClose()">閉じる</button>
                <button class="btn selection w-[7rem]" @click="copy()" :disabled="disable_copy">複製</button>
            </div>
        </div>
    </ModalLayout>
</template>
<style scoped>
table tr>td:first-child {
    vertical-align: top;
    padding-right: 0.5rem;
}
.form-border.preview {
    overflow-y: auto;
    max-height: calc(100vh - 14rem);
}

</style>
<script setup>
import { mapState } from "vuex"
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import { timeToString, displayDate, typeText } from '@/helper.js';
</script>
<script>
export default {
    props: ['show', 'rent'],
    emits: ['close'],
    data: function () {
        return {
            disable_copy: false,
            ord_deli_hope: null,
        }
    },
    computed: {
        ...mapState({
            master: state => state.rent.master,
        })
    },
    methods: {
        onClose: function () {
            this.$emit('close');
        },
        copy: function () {
            const text = this.$refs.body_text.innerText
            navigator.clipboard.writeText(text)
            this.disable_copy = true
            setTimeout(() => {
                this.disable_copy = false
                this.$emit('close')
            }, 300)
        }
    },
    created: function () {
        console.log(this.rent)
    }
}
</script>