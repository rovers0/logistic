<template>
    <div class="wrapper-scroll p-2 transit">
        <div class="d-flex gap-5 mb-3">
            <div class="d-flex gap-3 flex-1">
                <div class="d-flex align-items-center basis-[50%]">
                    <label class="w-[5.5rem] label-text">SMDコード</label>
                    <input type="text" class="flex-1 form-control">
                </div>
                <div class="d-flex align-items-center basis-[50%]">
                    <label class="w-[5.5rem] label-text">施設コード</label>
                    <input type="text" class="flex-1 form-control">
                </div>
                <div class="d-flex align-items-center basis-[50%]">
                    <label class="w-[5.5rem] label-text">施設名</label>
                    <input type="text" class="flex-1 form-control">
                </div>
                <div class="d-flex align-items-center basis-[50%]">
                    <label class="w-[5.5rem] label-text">患者コード</label>
                    <input type="text" class="flex-1 form-control">
                </div>
            </div>

            <div class="d-flex align-items-center gap-2">
                <button type="button" class="btn default w-[7rem]">リセット</button>
                <button type="button" class="btn w-[7rem]">検索</button>
            </div>
        </div>

        <div class="form-border w-100 mx-auto px-0 py-2 mb-3" style="max-width: 64rem;">
            <div class="d-flex gap-3 px-3">
                <div class="d-grid input-gap basis-[20%]">
                    <div class="d-flex align-items-center">
                        <label class="label-text w-[5.5rem]">DCFコード</label>
                        <input type="text" class="form-control text-center flex-1" readonly value="7301059">
                    </div>
                    <div class="d-flex align-items-center">
                        <label class="label-text w-[5.5rem]">SMDコード</label>
                        <input type="text" class="form-control text-center flex-1" readonly value="8007">
                    </div>
                    <div class="d-flex align-items-center">
                        <label class="label-text w-[5.5rem]">患者コード</label>
                        <input type="text" class="form-control text-center flex-1" readonly value="PR-0693">
                    </div>
                </div>
                <div class="d-grid input-gap basis-[55%]">
                    <div class="d-flex align-items-center">
                        <label class="label-text w-[5.5rem]">医療機関</label>
                        <input type="text" class="form-control flex-1" readonly value="愛媛大学医学部附属病院">
                    </div>
                    <div class="d-flex align-items-center">
                        <label class="label-text w-[5.5rem]">宛先担当</label>
                        <input type="text" class="form-control flex-1" readonly value="神経内科　西７病棟">
                        <input type="text" class="form-control text-center w-[8rem] ms-1" readonly value="奥村　学">
                        <input type="text" class="form-control w-[5rem] ms-1" readonly value="先生">
                    </div>
                    <div class="d-flex align-items-center">
                        <label class="label-text w-[5.5rem]">患者名</label>
                        <input type="text" class="form-control text-center flex-1" readonly value="田中　英雄">
                        <input type="text" class="form-control text-center w-[5rem] ms-1" readonly value="T.H">
                        <div class="d-flex align-items-center gap-1 w-[8rem] ms-1">
                            <label class="label-text w-[2.75rem] text-end">性別</label>
                            <input type="text" class="form-control text-center flex-1" readonly value="男性">
                        </div>
                    </div>
                </div>
                <div class="d-grid input-gap basis-[25%]">
                    <div class="d-flex align-items-center">
                        <label class="label-text w-[6rem]">電話番号</label>
                        <input type="text" class="form-control text-center flex-1" readonly value="0263-37-2774">
                    </div>
                    <div class="d-flex align-items-center">
                        <label class="label-text w-[6rem]">FAX</label>
                        <input type="text" class="form-control text-center flex-1" readonly value="0263-37-2775">
                    </div>
                    <div class="d-flex align-items-center">
                        <label class="label-text w-[6rem]">シリアルNo.</label>
                        <input type="text" class="form-control text-center flex-1" readonly value="586158">
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex align-items-center mb-1">
            <div class="col-4 d-flex align-items-center gap-2">
                <label class="label-text w-[5.5rem]">出荷予定日</label>
                <Datepicker class="w-[10rem]" v-model="day"></Datepicker>
                <button type="button" class="btn default w-[6rem]">設定</button>
            </div>

            <div class="col-4 d-flex justify-content-center align-items-center">
                <span class="label-text">処理件数：4件</span>
            </div>

            <div class="col-4 d-flex align-items-center justify-content-end">
                <button type="button" class="btn">出荷データ確認・出力</button>
            </div>
        </div>

        <div class="parent-scroll">
            <table class="view-scroll t-border">
                <thead class="text-center">
                    <tr>
                        <th class="w-[3rem]">
                            <input type="checkbox" class="form-check-input">
                        </th>
                        <th class="w-[4%]">コード</th>
                        <th class="w-[8%]">DCFコード</th>
                        <th>施設名</th>
                        <th class="w-[8%]">患者コード</th>
                        <th class="w-[8%]">現在<br>シリアル</th>
                        <th class="w-[8%]">依頼受取日</th>
                        <th class="w-[8%]">
                            <div class="thead-link asc">指示予定日</div>
                        </th>
                        <th class="w-[8%]">
                            <div class="thead-link asc">棚コード</div>
                        </th>
                        <th class="w-[8%]">
                            <div class="thead-link asc">納品予定日</div>
                        </th>
                        <th class="w-[4%]">詳細</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in 40" :key="i">
                        <td class="text-center">
                            <input type="checkbox" class="form-check-input">
                        </td>
                        <td class="text-center">1023</td>
                        <td class="text-center"><a href="javascript:void(0)">7301059</a></td>
                        <td>高知大学医学部附属病院</td>
                        <td class="text-center">PR-0272</td>
                        <td class="text-center">576828</td>
                        <td class="text-center">2023/01/23</td>
                        <td class="text-center">2023/01/23</td>
                        <td class="text-center"><a href="javascript:void(0)" @click="openShelfSelection()">A001</a></td>
                        <td class="text-center">2023/01/23</td>
                        <td class="text-center">
                            <button class="btn default">詳細</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <ShelfSelectionModal v-if="isOpenShelfSelection" :show="isOpenShelfSelection" @close="isOpenShelfSelection = false"></ShelfSelectionModal>
</template>

<script setup>
import { mapState } from "vuex";
import ShelfSelectionModal from "./modal/ShelfSelectionModal.vue";
</script>
<script>
export default {
    data: function () {
        return {
            day: null,
            isOpenShelfSelection: false,
        }
    },
    computed: {
        ...mapState([]),
    },
    methods: {
        openShelfSelection: function () {
            this.isOpenShelfSelection = true;
        }
    }
}
</script>