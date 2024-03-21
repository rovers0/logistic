<template>
    <ModalLayout :show="show" title="転院情報解析(転院元)" maxWidth="max-w-2xl" @close="onClose()">
        <div class="p-2">
            <table class="t-border">
                <thead class="text-center">
                    <tr>
                        <th>項目名</th>
                        <th>解析結果</th>
                        <th class="w-[3rem]">
                            <input type="checkbox" class="form-check-input">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>情報取得日</td>
                        <td>2022年11月21日</td>
                        <td class="text-center"><input type="checkbox" class="form-check-input"></td>
                    </tr>
                    <tr>
                        <td>担当MR</td>
                        <td>志和</td>
                        <td class="text-center"><input type="checkbox" class="form-check-input"></td>
                    </tr>
                    <tr>
                        <td>医療機関</td>
                        <td>福岡みらい病院</td>
                        <td class="text-center"><input type="checkbox" class="form-check-input"></td>
                    </tr>
                    <tr>
                        <td>主治医</td>
                        <td>渡利 茉里 先生</td>
                        <td class="text-center"><input type="checkbox" class="form-check-input"></td>
                    </tr>
                    <tr>
                        <td>患者さん(名・姓)</td>
                        <td>T.Oさん (男性、52歳)</td>
                        <td class="text-center"><input type="checkbox" class="form-check-input"></td>
                    </tr>
                    <tr>
                        <td>ポンプシリアル</td>
                        <td>586180</td>
                        <td class="text-center"><input type="checkbox" class="form-check-input"></td>
                    </tr>
                    <tr>
                        <td>最終外来(処方)</td>
                        <td>2022年12月7日</td>
                        <td class="text-center"><input type="checkbox" class="form-check-input"></td>
                    </tr>
                    <tr>
                        <td>ポンプ請求(最終)</td>
                        <td>2022年12月まで</td>
                        <td class="text-center"><input type="checkbox" class="form-check-input"></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="d-flex justify-content-around pb-3 pt-2">
            <button class="btn default w-[6rem]" @click="onClose()">閉じる</button>
            <button class="btn selection w-[7rem]">情報取込</button>
        </div>
    </ModalLayout>
</template>
<style scoped>

</style>
<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
</script>
<script>
export default {
    props: ['show'],
    emits: ['close'],
    data: function () {
        return {
            day: null
        }
    },
    methods: {
        onClose: function () {
            this.$emit('close');
        }
    }
}
</script>