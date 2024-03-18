<template>
    <ModalLayout :show="show" title="プレ情報取込" maxWidth="max-w-2xl" @close="onClose()">
        <div class="p-2">
            <div class="d-flex justify-content-between">
                <table class="t-border">
                    <thead class="text-center">
                        <tr>
                            <th>項目名</th>
                            <th>解析結果</th>
                            <th>
                                <input class="form-check-input" type="checkbox">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>医療機関</td>
                            <td>信州大学医学部附属病院</td>
                            <td class="text-center">
                                <input class="form-check-input" type="checkbox">
                            </td>
                        </tr>
                        <tr>
                            <td>ご担当者</td>
                            <td>脳神経・リウマチ膠原病内科 (西７病棟)　奥村 学先生</td>
                            <td class="text-center">
                                <input class="form-check-input" type="checkbox">
                            </td>
                        </tr>
                        <tr>
                            <td>着荷希望日</td>
                            <td>2022年11月02日午前着</td>
                            <td class="text-center">
                                <input class="form-check-input" type="checkbox">
                            </td>
                        </tr>
                        <tr>
                            <td>電話番号</td>
                            <td>0263-37-2774</td>
                            <td class="text-center">
                                <input class="form-check-input" type="checkbox">
                            </td>
                        </tr>
                        <tr>
                            <td>ＦＡＸ番号</td>
                            <td>0263-37-3427</td>
                            <td class="text-center">
                                <input class="form-check-input" type="checkbox">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="py-2 mb-4">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="原文を連絡情報に記録します。">
                    <label class="form-check-label" for="原文を連絡情報に記録します。">
                        原文を連絡情報に記録します。
                    </label>
                </div>
            </div>
            <div class="mb-2 d-flex justify-content-evenly">
                <button class="btn default" @click="onClose()">閉じる</button>
                <button class="btn selection">情報取込</button>
            </div>
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