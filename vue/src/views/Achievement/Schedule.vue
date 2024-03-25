<template>
    <div class="wrapper-scroll p-2 transit">
        <div class="d-flex justify-content-between mb-3">
            <div class="d-flex basis-[50%] gap-3">
                <div class="d-flex align-items-center basis-[55%]">
                    <label class="label-text w-[4rem]">ポンプ</label>
                    <select class="form-select flex-1">
                        <option value="">全て</option>
                    </select>
                </div>
                <div class="d-flex align-items-center basis-[45%]">
                    <label class="label-text w-[5rem]">処理状況</label>
                    <select class="form-select flex-1">
                        <option value="">全て</option>
                    </select>
                </div>
            </div>
            <div class="d-flex align-items-center gap-2">
                <button class="btn default w-[6.5rem]">リセット</button>
                <button class="btn w-[6.5rem]">検索</button>
            </div>
        </div>

        <table class="t-border mx-auto mb-5" style="width: 80%;">
            <thead class="text-center">
                <tr>
                    <th>直近5日</th>
                    <th>一式作成</th>
                    <th>MS案内Email</th>
                    <th>施設案内FAX</th>
                    <th>施設納品案内</th>
                    <th>出荷指示</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in 5" :key="i">
                    <td class="text-center">2023/06/23</td>
                    <td class="text-center">4 件</td>
                    <td class="text-center">6 件</td>
                    <td class="text-center">2 件</td>
                    <td class="text-center">3 件</td>
                    <td class="text-center">7 件</td>
                </tr>
            </tbody>
        </table>

        <div class="d-flex gap-2 mb-2">
            <button class="btn w-[9rem]">MSへの連絡</button>
            <button class="btn w-[9rem]">案内書出力</button>
        </div>

        <div class="d-flex mb-1">
            <div class="col-5 d-flex gap-2 align-items-center">
                <select class="form-select w-[10rem]">
                    <option value="">案内一式作成日</option>
                </select>
                <Datepicker class="w-[10rem]" v-model="day"></Datepicker>
                <button class="btn w-[9rem]">作業日変更</button>
            </div>
            <div class="col-2 d-flex justify-content-end">
                <span class="fs-5">交換交換処理中：全120件</span>
            </div>
            <div class="col-5 d-flex gap-2 align-items-center justify-content-end">
                <button class="btn">出荷データ確定・指示</button>
                <button class="btn">一覧出力</button>
            </div>
        </div>

        <div class="parent-scroll">
            <table class="view-scroll t-border">
                <thead class="text-center">
                    <tr>
                        <th class="w-[2.5rem]">
                            <input type="checkbox" class="form-check-input">
                        </th>
                        <th>
                            <div class="thead-link asc">コード</div>
                        </th>
                        <th>施設名</th>
                        <th>
                            <div class="thead-link asc">患者コード</div>
                            <div>患者名</div>
                        </th>
                        <th>
                            <div class="thead-link asc">処理状況</div>
                        </th>
                        <th>
                            <div class="thead-link asc">特記事項①</div>
                        </th>
                        <th>
                            <div class="thead-link asc">案内一式</div>
                            <div class="thead-link asc">作成日</div>
                        </th>
                        <th>
                            <div class="thead-link asc">MS事前</div>
                            <div class="thead-link asc">連絡日</div>
                        </th>
                        <th>
                            <div class="thead-link asc">施設案内</div>
                            <div class="thead-link asc">FAX日</div>
                        </th>
                        <th>
                            <div class="thead-link asc">納品連絡</div>
                            <div class="thead-link asc">FAX日</div>
                        </th>
                        <th>
                            <div class="thead-link asc">出荷指示</div>
                            <div class="thead-link asc">予定日</div>
                        </th>
                        <th>
                            <div class="thead-link asc">回答納品</div>
                            <div class="thead-link asc">予定日</div>
                        </th>
                        <th>
                            <div class="thead-link asc">納品回答</div>
                            <div class="thead-link asc">連絡l日</div>
                        </th>
                        <th>
                            <div class="thead-link asc">使用<br>停止日</div>
                        </th>
                        <th>詳細</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in 40" :key="i">
                        <td class="text-center">
                            <input type="checkbox" class="form-check-input">
                        </td>
                        <td class="text-center">1001</td>
                        <td class="text-center">旭川赤十字病院</td>
                        <td class="text-center">PR-0232<br>T.K(女)</td>
                        <td class="text-center">都度</td>
                        <td class="text-center">宛先都度確認する必要です</td>
                        <td class="text-center">6月22日<br>6月22日</td>
                        <td class="text-center">7月2日<br>-</td>
                        <td class="text-center">7月3日<br>-</td>
                        <td class="text-center">7月21日<br>-</td>
                        <td class="text-center">7月23日<br>-</td>
                        <td class="text-center">7月25日<br>-</td>
                        <td class="text-center">-<br>-</td>
                        <td class="text-center">9月1日</td>
                        <td class="text-center">
                            <button type="button" class="btn default sm" @click="openScheduleDetail()">詳細</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <ScheduleDetail v-if="transit.status"></ScheduleDetail>
</template>

<script setup>
import { mapState, mapMutations } from "vuex";
import ScheduleDetail from '@/views/Achievement/ScheduleDetail.vue';
import { TRANSIT_SCHEDULE } from "@/components/Constants.vue";
</script>
<script>
export default {
    data: function () {
        return {
            isOpenPRDetailModal: false,
            day: null,
        };
    },
    computed: {
        ...mapState(['transit']),
    },
    methods: {
        ...mapMutations(['setIsOpenTransitDetail']),
        openScheduleDetail: function () {
            this.setIsOpenTransitDetail({ status: true, type: TRANSIT_SCHEDULE });
        }
    }
}
</script>