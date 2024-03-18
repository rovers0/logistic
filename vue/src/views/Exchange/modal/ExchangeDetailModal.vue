<template>
    <ModalLayout :show="show" title="交換情報詳細" maxWidth="max-w-7xl" :class="'px-0'" @close="onClose()">
        <div class="d-flex justify-content-center align-items-center gap-3 p-2">
            <button class="btn default w-[7rem]">←前へ</button>
            <span class="fs-5 fw-bold">【PR-1242】 信州大学医学部附属病院</span>
            <button class="btn default w-[7rem]">次へ→</button>
        </div>

        <div class="divider"></div>

        <div class="d-flex gap-3 px-3 pt-2 pb-4">
            <!-- left -->
            <div class="basis-[50%]">
                <!-- group 1 -->
                <div class="d-grid input-gap mb-3">
                    <!-- group1-title -->
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <label class="fs-5 fw-bold">■ 施設と患者情報</label>
                    </div>

                    <!-- group1-row1 -->
                    <div class="d-flex align-items-center gap-1">
                        <div class="d-flex flex-1 gap-3">
                            <div class="d-flex align-items-center basis-[46%]">
                                <label class="w-[7rem] label-text">得意先コード</label>
                                <input type="text" class="form-control text-center flex-1" value="7015">
                            </div>
                            <div class="d-flex align-items-center basis-[54%]">
                                <label class="w-[6rem] label-text">DCFコード</label>
                                <input type="text" class="form-control text-center flex-1" value="4600918">
                            </div>
                        </div>

                        <button class="btn selection w-[9rem]">得意先選択</button>
                    </div>

                    <!-- group1-row2 -->
                    <div class="d-flex align-items-center">
                        <label class="w-[7rem] label-text">医療機関</label>
                        <input type="text" class="form-control flex-1" value="信州大学医学部附属病院">
                    </div>

                    <!-- group1-row3 -->
                    <div class="d-flex align-items-center">
                        <label class="w-[7rem] label-text">宛先名</label>
                        <input type="text" class="form-control text-center w-[6rem] me-2" value="701501">
                        <input type="text" class="form-control flex-1" value="内科学講座第３教室　西７病棟　">
                    </div>

                    <!-- group1-row4 -->
                    <div class="d-flex align-items-center gap-1">
                        <div class="d-flex flex-1 gap-1">
                            <div class="d-flex align-items-center basis-[75%]">
                                <label class="w-[7rem] label-text">宛先名</label>
                                <input type="text" class="form-control flex-1" value="奥村　学　">
                            </div>
                            <select class="form-select basis-[25%]">
                                <option value="">先生</option>
                            </select>
                        </div>

                        <button class="btn selection w-[9rem]">宛先情報選択</button>
                    </div>

                    <!-- group1-row5 -->
                    <div class="d-flex gap-3">
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[7rem] label-text">電話番号</label>
                            <input type="text" class="form-control text-center flex-1" value="0263-37-2774">
                        </div>
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[5rem] label-text">FAX番号</label>
                            <input type="text" class="form-control text-center flex-1" value="0263-37-3427">
                        </div>
                    </div>

                    <!-- group1-row6 -->
                    <div class="d-flex gap-3">
                        <div class="d-flex align-items-center basis-[40%]">
                            <label class="w-[7rem] label-text">患者コード</label>
                            <input type="text" class="form-control text-center flex-1" value="PR-0693">
                        </div>
                        <div class="d-flex align-items-center basis-[60%]">
                            <label class="w-[5rem] label-text">患者名</label>
                            <input type="text" class="form-control text-center flex-1" value="高田雅史">
                            <input type="text" class="form-control text-center w-[4rem] ms-1" value="T.M">
                            <select class="form-select w-[5rem] ms-1">
                                <option value="">男子</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- group 2 -->
                <div class="d-grid input-gap mb-3">
                    <!-- group2-title -->
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <label class="fs-5 fw-bold">■ 連絡と案内</label>
                        <div class="d-flex align-items-center gap-3">
                            <a href="javascript:void(0)" class="fw-bold">MS連絡文表示</a>
                            <a href="javascript:void(0)" class="fw-bold">交換案内PDF</a>
                        </div>
                    </div>

                    <!-- group2-row1 -->
                    <div class="d-flex gap-3">
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[7rem] label-text">MSへの連絡日</label>
                            <Datepicker class="flex-1" v-model="day"></Datepicker>
                        </div>
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[7rem] label-text">案内実施日</label>
                            <Datepicker class="flex-1" v-model="day"></Datepicker>
                        </div>
                    </div>

                    <!-- group2-row2 -->
                    <div class="d-flex">
                        <label class="w-[7rem] label-text">備考</label>
                        <textarea class="form-control flex-1"></textarea>
                    </div>
                </div>

                <!-- group 3 -->
                <div class="d-grid input-gap">
                    <!-- group3-title -->
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <label class="fs-5 fw-bold">■ 依頼書・受領書情報</label>
                    </div>

                    <!-- group3-row1 -->
                    <div class="d-flex gap-3">
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[7rem] label-text">受信日</label>
                            <Datepicker class="flex-1" v-model="day"></Datepicker>
                        </div>
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[7rem] label-text">交換依頼日</label>
                            <Datepicker class="flex-1" v-model="day"></Datepicker>
                        </div>
                    </div>

                    <!-- group3-row2 -->
                    <div class="d-flex gap-3">
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[7rem] label-text">納品希望日</label>
                            <Datepicker class="flex-1" v-model="day"></Datepicker>
                        </div>
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[7rem] label-text">交換予定日</label>
                            <Datepicker class="flex-1" v-model="day"></Datepicker>
                        </div>
                    </div>

                    <!-- group3-row3 -->
                    <div class="d-flex gap-3">
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[7rem] label-text">回答納品日</label>
                            <Datepicker class="flex-1" v-model="day"></Datepicker>
                        </div>
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[7rem] label-text">受領書FAX日</label>
                            <Datepicker class="flex-1" v-model="day"></Datepicker>
                        </div>
                    </div>
                </div>
            </div>

            <!-- right -->
            <div class="basis-[50%]">
                <!-- group 1 -->
                <div class="d-grid input-gap mb-3">
                    <!-- group1-title -->
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <label class="fs-5 fw-bold">■ 出荷履歴参照</label>
                    </div>

                    <!-- group1-table -->
                    <div class="wrapper-scroll" style="min-height: 12rem;">
                        <div class="parent-scroll">
                            <table class="view-scroll t-border">
                                <thead class="text-center">
                                    <tr>
                                        <th class="w-[3rem]">No.</th>
                                        <th>発送日</th>
                                        <th>シリアル番号</th>
                                        <th>ロットNo.</th>
                                        <th>理由</th>
                                        <th>指示番号</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="i in 4" :key="i">
                                        <td class="text-center">{{ i }}</td>
                                        <td class="text-center">2022/08/10</td>
                                        <td class="text-center">586207</td>
                                        <td class="text-center">21/03/30</td>
                                        <td class="text-center">定期交換</td>
                                        <td class="text-center">PR220620-585330</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- group 2 -->
                <div class="d-grid input-gap mb-3">
                    <!-- group2-title -->
                    <div class="d-flex align-items-center gap-2 mb-1">
                        <label class="fs-5 fw-bold basis-[50%]">■ 出荷・配達情報</label>
                        <div class="d-flex basis-[50%] align-items-center">
                            <label class="label-text w-[7rem]">出荷進捗</label>
                            <select class="form-select flex-1">
                                <option value="">配達完了</option>
                            </select>
                        </div>
                    </div>

                    <!-- group2-row1 -->
                    <div class="d-flex gap-3">
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[7rem] label-text">指示予定日</label>
                            <Datepicker class="flex-1" v-model="day"></Datepicker>
                        </div>
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[7rem] label-text">出荷完了日</label>
                            <Datepicker class="flex-1" v-model="day"></Datepicker>
                        </div>
                    </div>

                    <!-- group2-row2 -->
                    <div class="d-flex gap-3">
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[7rem] label-text">指示書No.</label>
                            <input type="text" class="form-control text-center flex-1" value="PR230116-01-1-01">
                        </div>
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[7rem] label-text">シリアルNo.</label>
                            <input type="text" class="form-control text-center flex-1" value="576828">
                            <select class="form-select w-[6rem] ms-1">
                                <option value="">A002</option>
                            </select>
                        </div>
                    </div>

                    <!-- group2-row3 -->
                    <div class="d-flex gap-3">
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[7rem] label-text">問合せ番号</label>
                            <input type="text" class="form-control text-center flex-1" value="1234567890-123">
                        </div>
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[7rem] label-text">配達完了日</label>
                            <Datepicker class="flex-1" v-model="day"></Datepicker>
                        </div>
                    </div>

                </div>

                <!-- group 3 -->
                <div class="d-grid input-gap">
                    <!-- group3-title -->
                    <div class="d-flex align-items-center mb-1">
                        <label class="fs-5 fw-bold">■ 同意書管理情報</label>
                    </div>

                    <!-- group3-row1 -->
                    <div class="d-flex gap-3">
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[7rem] label-text">同意書受信日</label>
                            <Datepicker class="flex-1" v-model="day"></Datepicker>
                        </div>
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[7rem] label-text">使用開始日</label>
                            <Datepicker class="flex-1" v-model="day"></Datepicker>
                        </div>
                    </div>

                    <!-- group3-row2 -->
                    <div class="d-flex gap-3">
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[7rem] label-text">同意書押印日</label>
                            <Datepicker class="flex-1" v-model="day"></Datepicker>
                        </div>
                        <div class="d-flex align-items-center basis-[50%] gap-5">
                            <label class="label-text d-flex align-items-center gap-1">
                                <input type="checkbox" class="form-check-input mt-0">シリアル照合済
                            </label>
                            <a href="javascript:void(0)" class="fw-bold">同意書の参照</a>
                        </div>
                    </div>
                </div>

                <!-- group-button -->
                <div class="d-flex justify-content-around" style="margin-top: 2.5rem;">
                    <button class="btn delete w-[9rem]">交換取消</button>
                    <button class="btn default w-[8rem]" @click="onClose()">閉じる</button>
                    <button class="btn w-[9rem]">情報保存</button>
                </div>
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