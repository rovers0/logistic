<template>
    <ModalLayout :show="show" title="転院情報解析(転院元)" maxWidth="max-w-2xl" @close="onClose()">
        <div class="form-border preview m-2">
            <table>
                <thead></thead>
                <tbody>
                    <tr>
                        <td>情報取得日</td>
                        <td>2022年11月21日</td>
                    </tr>
                    <tr>
                        <td>転院元</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>担当MR</td>
                        <td>志和さん</td>
                    </tr>
                    <tr>
                        <td>医療機関</td>
                        <td>福岡みらい病院</td>
                    </tr>
                    <tr>
                        <td>主治医</td>
                        <td>渡利 茉里 先生</td>
                    </tr>
                    <tr>
                        <td>患者さん(名・姓)</td>
                        <td>T.Oさん (男性、52歳)</td>
                    </tr>
                    <tr>
                        <td>ポンプシリアル</td>
                        <td>586180</td>
                    </tr>
                    <tr>
                        <td>導入時期</td>
                        <td>2019年11月6日</td>
                    </tr>
                    <tr>
                        <td>最終外来(処方)</td>
                        <td>2022年12月7日</td>
                    </tr>
                    <tr>
                        <td>ポンプ請求(最終)</td>
                        <td>2022年12月まで</td>
                    </tr>
                    <tr>
                        <td>A-CONNECT</td>
                        <td>「治療中断連絡票(他院への転院)」はDSOで対応します</td>
                    </tr>
                    <tr>
                        <td>その他</td>
                        <td>・特になし<br>・調剤薬局：リーフ調剤薬局</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="d-flex justify-content-around pb-3 pt-2">
            <button class="btn default w-[6rem]" @click="onClose()">閉じる</button>
            <button class="btn selection w-[6rem]" @click="onConfirm()">解析</button>
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