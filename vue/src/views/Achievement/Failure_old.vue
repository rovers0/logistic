<template>
    <div class="wrapper-scroll p-2 transit">
        <div class="d-flex gap-5 mb-3">
            <div class="flex-1 d-grid input-gap">
                <!-- row 1 -->
                <div class="d-flex gap-3">
                    <div class="d-flex basis-[50%] gap-3">
                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[5.5rem] label-text">SMDコード</label>
                            <input type="text" class="flex-1 form-control">
                        </div>

                        <div class="d-flex align-items-center basis-[50%]">
                            <label class="w-[5.5rem] label-text">患者コード</label>
                            <input type="text" class="flex-1 form-control">
                        </div>
                    </div>

                    <div class="d-flex align-items-center basis-[22%]">
                        <label class="w-[6rem] label-text">DCFコード</label>
                        <input type="text" class="flex-1 form-control">
                    </div>

                    <div class="d-flex align-items-center basis-[27%]">
                        <label class="w-[5.5rem] label-text">施設名</label>
                        <input type="text" class="flex-1 form-control">
                    </div>
                </div>
                
                <!-- row 2 -->
                <div class="d-flex gap-3">
                    <div class="d-flex align-items-center basis-[50%]">
                        <label class="w-[5.5rem] label-text">対象ポンプ</label>
                        <select class="form-select flex-1">
                            <option value="">先生</option>
                        </select>
                    </div>

                    <div class="d-flex align-items-center basis-[22%]">
                        <label class="w-[6rem] label-text">シリアルNo.</label>
                        <input type="text" class="flex-1 form-control">
                    </div>

                    <div class="d-flex align-items-center basis-[27%]">
                        <label class="w-[5.5rem] label-text">処理状態</label>
                        <select class="form-select w-[10rem]">
                            <option value="">先生</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="w-[7rem] d-grid input-gap">
                <button type="button" class="btn default">リセット</button>
                <button type="button" class="btn">検索</button>
            </div>
        </div>

        <div class="d-flex align-items-center mb-1">
            <div class="col-2">
                <button type="button" class="btn w-[6rem]">新規</button>
            </div>

            <div class="col-8 d-flex justify-content-center align-items-center">
                <span class="fw-bold fs-4">転院処理中：2件</span>

            </div>

            <div class="col-2 d-flex align-items-center justify-content-end">
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
                        <th class="w-[8%]">
                            <div class="thead-link asc">患者コード</div>
                            <div class="thead-link asc">患者名</div>
                        </th>
                        <th class="w-[10%]">
                            <div class="thead-link asc">故障受信日</div>
                            <div class="thead-link asc">現状シリアルNo.</div>
                        </th>
                        <th>
                            <div class="thead-link asc">作業状態</div>
                        </th>
                        <th class="w-[8%]">
                            <div class="thead-link asc">出荷指示日</div>
                        </th>
                        <th class="w-[8%]">
                            <div class="thead-link asc">出荷実施日</div>
                            <div class="thead-link asc">出荷シリアルNo.</div>
                        </th>
                        <th>
                            <div class="thead-link asc">配達完了日</div>
                        </th>
                        <th class="w-[4%]">詳細</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in 2" :key="i">
                        <td class="text-center">
                            <input type="checkbox" class="form-check-input">
                        </td>
                        <td class="text-center">1023</td>
                        <td class="text-center">3402307</td>
                        <td>高知大学医学部附属病院</td>
                        <td class="text-center">PR-0272<br>T.M(男)</td>
                        <td class="text-center">2023/01/23<br>[A]586207</td>
                        <td class="text-center">出荷指示済</td>
                        <td class="text-center">2023/01/23</td>
                        <td class="text-center">2023/01/23<br>-</td>
                        <td class="text-center"></td>
                        <td class="text-center">
                            <button class="btn default" @click="openFailureDetail()">詳細</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <FailureDetail v-if="transit.status"></FailureDetail>
</template>

<script setup>
import { mapState } from "vuex";
import FailureDetail from './FailureDetail.vue';
import { TRANSIT_ACHIEVEMENT } from "../../components/Constants.vue";
</script>
<script>
export default {
    data: function () {
        return {}
    },
    computed: {
        ...mapState(['transit']),
    },
    methods: {
        openFailureDetail: function () {
            this.$store.commit('setIsOpenTransitDetail', {status: true, type: TRANSIT_ACHIEVEMENT});
        }
    }
}
</script>