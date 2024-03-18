<template>
    <ModalLayout :show="show" title="出荷元棚選択" maxWidth="max-w-4xl" :class="'px-0'" @close="onClose()">
        <div class="d-flex justify-content-center align-items-center gap-3 p-2">
            <button class="btn default w-[7rem]">←前へ</button>
            <span class="fs-5 fw-bold">[PR-0693] 高田　雅史</span>
            <button class="btn default w-[7rem]">次へ→</button>
        </div>

        <div class="divider"></div>

        <div class="d-grid input-gap p-3">
            <div class="d-flex gap-3">
                <div class="d-flex align-items-center basis-[30%]">
                    <label class="label-text w-[6rem]">SMDコード</label>
                    <input type="text" class="form-control text-center flex-1" value="1026">
                </div>
                <div class="d-flex align-items-center basis-[30%]">
                    <label class="label-text w-[6rem]">宛先コード</label>
                    <input type="text" class="form-control text-center flex-1" value="102601">
                </div>
            </div>
            <div class="d-flex align-items-center">
                <label class="label-text w-[6rem]">施設名称</label>
                <input type="text" class="form-control flex-1" value="信州大学医学部附属病院">
            </div>
            <div class="d-flex gap-3">
                <div class="d-flex align-items-center basis-[40%]">
                    <label class="label-text w-[6rem]">患者コード</label>
                    <input type="text" class="form-control text-center flex-1" value="PR-0693">
                </div>
                <div class="d-flex align-items-center basis-[60%]">
                    <label class="label-text w-[6rem]">患者名</label>
                    <input type="text" class="form-control text-center flex-1" value="高田　雅史">
                    <input type="text" class="form-control text-center w-[4rem] ms-1" value="T.M">
                    <select class="form-select w-[6rem] ms-1">
                        <option value="">男子</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="px-3 mb-1">
            <span class="fw-bold fs-4">使用ポンプの履歴</span>
        </div>

        <div class="wrapper-scroll px-3" style="min-height: 12rem;">
            <div class="parent-scroll">
                <table class="view-scroll t-border">
                    <thead class="text-center">
                        <tr>
                            <th class="w-[4%]">No.</th>
                            <th class="w-[15%]">発送日</th>
                            <th class="w-[12%]">シリアル番号</th>
                            <th class="w-[15%]">使用開始日</th>
                            <th class="w-[8%]">棚</th>
                            <th>理由</th>
                            <th>指示番号</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="i in 4" :key="i">
                            <td class="text-center">4</td>
                            <td class="text-center">2021/07/20</td>
                            <td class="text-center">585330</td>
                            <td class="text-center">21/04/30</td>
                            <td class="text-center">A001</td>
                            <td class="text-center">故障交換</td>
                            <td class="text-center">PR220225-585319</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="d-flex align-items-center justify-content-center gap-4 p-3">
            <label class="label-text">出荷元棚</label>
            <label class="d-flex align-items-center gap-2">
                <input type="radio" class="form-check-input mt-0" name="type" checked>A001(50)
            </label>
            <label class="d-flex align-items-center gap-2">
                <input type="radio" class="form-check-input mt-0" name="type">A002(32)
            </label>
            <label class="d-flex align-items-center gap-2">
                <input type="radio" class="form-check-input mt-0" name="type">A003(12)
            </label>
            <label class="d-flex align-items-center gap-2">
                <input type="radio" class="form-check-input mt-0" name="type">A004(4)
            </label>
            <label class="d-flex align-items-center gap-2">
                <input type="radio" class="form-check-input mt-0" name="type">A005(12)
            </label>
        </div>

        <div class="d-flex justify-content-around pb-3 pt-2">
            <button class="btn default w-[7rem]">←前へ</button>
            <button class="btn default w-[9rem]" @click="onClose()">閉じる</button>
            <button class="btn default w-[9rem]">決定</button>
            <button class="btn default w-[7rem]">次へ→</button>
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
            day: null,
        }
    },
    methods: {
        onClose: function () {
            this.$emit('close');
        },
    }
}
</script>