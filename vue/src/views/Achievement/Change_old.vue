<template>
    <div class="wrapper-scroll px-2 transit">
        <div style="margin: 0 5rem 1rem;">
            <div class="d-flex gap-3 ">
                <div class="d-flex flex-1 gap-3">
                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="label-text w-[6rem]">患者コード</label>
                        <input type="text" class="form-control text-center flex-1" value="PR-0272">
                    </div>
                    <div class="d-flex align-items-center basis-[18%]">
                        <label class="label-text w-[4rem]">患者名</label>
                        <input type="text" class="form-control text-center flex-1" value="T.M(男)">
                    </div>
                    <div class="d-flex align-items-center basis-[22%]">
                        <label class="label-text w-[8rem]">現在シリアルNo.</label>
                        <input type="text" class="form-control text-center flex-1" value="586207">
                    </div>
                    <div class="d-flex align-items-center justify-content-end basis-[40%]">
                        <label class="label-text w-[5rem]">処理状況</label>
                        <select class="form-select w-[10rem]">
                            <option value="">連絡票待ち</option>
                        </select>
                    </div>
                </div>
                <button class="btn default">情報保存</button>
            </div>

            <div class="divider my-2" style="height: 1px;"></div>

            <div class="d-flex gap-4">
                <!-- left -->
                <div class="basis-[50%] d-grid input-gap">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <label class="fw-bold">■ 現在の情報</label>
                        <a href="javascript:void(0)" @click="openTransferSourcePreview()">連絡票解析</a>
                    </div>

                    <div class="d-flex gap-3">
                        <div class="d-flex basis-[64%] gap-3">
                            <div class="basis-[50%] d-flex align-items-center">
                                <label class="w-[6rem] label-text">SMDコード</label>
                                <input type="text" class="form-control flex-1 text-center" value="1023">
                            </div>
                            <div class="basis-[50%] d-flex align-items-center">
                                <label class="w-[5rem] label-text">DCFコード</label>
                                <input type="text" class="form-control flex-1 text-center" value="3402307">
                            </div>
                        </div>
                        <div class="basis-[36%] d-flex align-items-center">
                            <label class="w-[5.5rem] label-text">請求停止月</label>
                            <select class="form-select flex-1">
                                <option value="">2023年01月</option>
                            </select>
                        </div>
                    </div>

                    <div class="d-flex align-items-center">
                        <label class="w-[6rem] label-text">施設名</label>
                        <input type="text" class="form-control flex-1" value="北本中央クリニック">
                    </div>

                    <div class="d-flex gap-3">
                        <div class="basis-[64%] d-flex align-items-center">
                            <label class="w-[6rem] label-text">宛先名</label>
                            <input type="text" class="form-control flex-1" value="脳神経外科　浜田　一郎　先生">
                        </div>
                        <div class="basis-[36%] d-flex align-items-center">
                            <label class="w-[5.5rem] label-text">最終外来日</label>
                            <select class="form-select flex-1">
                                <option value="">2023年01月</option>
                            </select>
                        </div>
                    </div>

                    <div class="d-flex align-items-center">
                        <label class="w-[6rem] label-text">備考</label>
                        <input type="text" class="form-control flex-1" value="">
                    </div>
                </div>

                <!-- right -->
                <div class="basis-[50%] d-grid input-gap">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <label class="fw-bold">■ 転院先情報</label>
                        <a href="javascript:void(0)" @click="openTransferDestinationPreview()">連絡票解析</a>
                    </div>

                    <div class="d-flex gap-3">
                        <div class="d-flex basis-[64%] gap-3">
                            <div class="basis-[50%] d-flex align-items-center">
                                <label class="w-[6rem] label-text">SMDコード</label>
                                <input type="text" class="form-control flex-1 text-center" value="2135">
                            </div>
                            <div class="basis-[50%] d-flex align-items-center">
                                <label class="w-[5rem] label-text">DCFコード</label>
                                <input type="text" class="form-control flex-1 text-center" value="3600234">
                            </div>
                        </div>
                        <div class="basis-[36%] d-flex align-items-center">
                            <label class="w-[5.5rem] label-text">請求停止月</label>
                            <select class="form-select flex-1">
                                <option value="">2023年01月</option>
                            </select>
                        </div>
                    </div>

                    <div class="d-flex align-items-center">
                        <label class="w-[6rem] label-text">施設名</label>
                        <input type="text" class="form-control flex-1" value="東和病院　医療">
                        <button class="btn selection ms-2">施設選択</button>
                    </div>

                    <div class="d-flex gap-3">
                        <div class="basis-[64%] d-flex align-items-center">
                            <label class="w-[6rem] label-text">宛先名</label>
                            <input type="text" class="form-control flex-1" value="脳神経外科　浜田　一郎　先生">
                        </div>
                        <div class="basis-[36%] d-flex align-items-center">
                            <label class="w-[5.5rem] label-text">初回外来日</label>
                            <select class="form-select flex-1">
                                <option value="">2023年01月</option>
                            </select>
                        </div>
                    </div>

                    <div class="d-flex align-items-center">
                        <label class="w-[6rem] label-text">備考</label>
                        <input type="text" class="form-control flex-1" value="">
                    </div>
                </div>
            </div>

            <div class="d-flex gap-2 py-2 mx-auto" style="max-width: 60rem;">
                <button class="btn delete w-[5rem]">転院<br>取消</button>
                <div class="d-grid input-gap flex-1">
                    <div class="d-flex gap-3">
                        <div class="d-flex align-items-center basis-1/3">
                            <label class="label-text w-[6.5rem]">転院予定日</label>
                            <Datepicker :enableTimePicker="false" class="flex-1" v-model="day" format="yyyy/MM/dd"
                                locale="ja" cancelText="" selectText="" auto-apply keep-action-row :close-on-auto-apply="true">
                            </Datepicker>
                        </div>
                        <div class="d-flex basis-2/3 gap-3">
                            <div class="d-flex align-items-center basis-[50%]">
                                <label class="label-text w-[6.5rem]">連絡票受信日</label>
                                <Datepicker :enableTimePicker="false" class="flex-1" v-model="day" format="yyyy/MM/dd"
                                    locale="ja" cancelText="" selectText="" auto-apply keep-action-row :close-on-auto-apply="true">
                                </Datepicker>
                            </div>
                            <div class="d-flex align-items-center basis-[50%]">
                                <label class="label-text w-[6.5rem]">治療開始日</label>
                                <Datepicker :enableTimePicker="false" class="flex-1" v-model="day" format="yyyy/MM/dd"
                                    locale="ja" cancelText="" selectText="" auto-apply keep-action-row :close-on-auto-apply="true">
                                </Datepicker>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex gap-3">
                        <div class="d-flex align-items-center basis-1/3">
                            <label class="label-text w-[6.5rem]">同意書押印日</label>
                            <Datepicker :enableTimePicker="false" class="flex-1" v-model="day" format="yyyy/MM/dd"
                                locale="ja" cancelText="" selectText="" auto-apply keep-action-row :close-on-auto-apply="true">
                            </Datepicker>
                        </div>
                        <div class="d-flex align-items-center basis-2/3">
                            <label class="label-text w-[6.5rem]">同意書PDF</label>
                            <input type="text" class="form-control flex-1" readonly>
                            <button class="btn default ms-2">開く</button>
                            <button class="btn default ms-2">登録</button>
                        </div>
                    </div>
                </div>
                <button class="btn w-[5rem]">完了<br>設定</button>
            </div>
        </div>

        <div class="d-flex align-items-center mb-1">
            <div class="col-2 d-flex align-items-center">
                <button class="btn w-[6rem]">新規</button>
            </div>

            <div class="col-8 d-flex justify-content-center align-items-center">
                <span class="fw-bold fs-4">転院処理中：2件</span>
            </div>

            <div class="col-2"></div>
        </div>

        <div class="parent-scroll">
            <table class="view-scroll t-border">
                <thead class="text-center">
                    <tr>
                        <th class="w-[4%]">コード</th>
                        <th class="w-[8%]">現在の<br>DCFコード</th>
                        <th>現在の施設名</th>
                        <th class="w-[8%]">
                            <div class="thead-link asc">シリアルNo.</div>
                        </th>
                        <th class="w-[8%]">
                            <div class="thead-link asc">患者コード</div>
                        </th>
                        <th class="w-[6%]">
                            <div class="thead-link asc">患者名</div>
                        </th>
                        <th class="w-[8%]">
                            <div class="thead-link asc">受信日</div>
                        </th>
                        <th class="w-[8%]">
                            <div class="thead-link asc">転院予定日</div>
                        </th>
                        <th class="w-[8%]">転院後<br>DCFコード</th>
                        <th>転院後施設</th>
                        <th>
                            <div class="thead-link asc">作業状態</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in 2" :key="i">
                        <td class="text-center">1023</td>
                        <td class="text-center">3402307</td>
                        <td>高知大学医学部附属病院</td>
                        <td class="text-center">[A]586205</td>
                        <td class="text-center">PR-0631</td>
                        <td class="text-center">T.M(男)</td>
                        <td class="text-center">2023/01/23</td>
                        <td class="text-center">2023/02/10</td>
                        <td class="text-center">3600234</td>
                        <td>医療法人野並会高知病院</td>
                        <td class="text-center">連絡票待ち</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <TransferSourcePreviewModal v-if="isOpenTransferSourcePreview" :show="isOpenTransferSourcePreview" @close="isOpenTransferSourcePreview = false" @confirm="confirmTransferSourcePreview()"></TransferSourcePreviewModal>
    <TransferSourceModal v-if="isOpenTransferSource" :show="isOpenTransferSource" @close="isOpenTransferSource = false"></TransferSourceModal>

    <TransferDestinationPreviewModal v-if="isOpenTransferDestinationPreview" :show="isOpenTransferDestinationPreview" @close="isOpenTransferDestinationPreview = false" @confirm="confirmTransferDestinationPreview()"></TransferDestinationPreviewModal>
    <TransferDestinationModal v-if="isOpenTransferDestination" :show="isOpenTransferDestination" @close="isOpenTransferDestination = false"></TransferDestinationModal>
</template>

<script setup>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import TransferSourcePreviewModal from "./modal/change/TransferSourcePreviewModal.vue";
import TransferSourceModal from "./modal/change/TransferSourceModal.vue";
import TransferDestinationPreviewModal from "./modal/change/TransferDestinationPreviewModal.vue";
import TransferDestinationModal from "./modal/change/TransferDestinationModal.vue";
</script>
<script>
export default {
    data: function () {
        return {
            day: null,
            isOpenTransferSourcePreview: false,
            isOpenTransferSource: false,
            isOpenTransferDestinationPreview: false,
            isOpenTransferDestination: false,
        };
    },
    computed: {},
    methods: {
        openTransferSourcePreview: function () {
            this.isOpenTransferSourcePreview = true;
        },
        confirmTransferSourcePreview: function () {
            this.isOpenTransferSourcePreview = false;
            this.isOpenTransferSource = true;
        },
        openTransferDestinationPreview: function () {
            this.isOpenTransferDestinationPreview = true;
        },
        confirmTransferDestinationPreview: function () {
            this.isOpenTransferDestinationPreview = false;
            this.isOpenTransferDestination = true;
        },
    }
}
</script>