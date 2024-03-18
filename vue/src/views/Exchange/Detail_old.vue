<template>
    <div class="transit" style="height: calc(100% - 4rem);">
        <div class="wrapper-scroll">
            <div class="parent-scroll">
                <div class="d-flex gap-3 view-scroll">
                    <!-- left -->
                    <div class="d-grid gap-3 basis-[50%]" style="height: fit-content;">
                        <!-- group 1 -->
                        <div class="d-grid input-gap">
                            <!-- group1-title -->
                            <div class="d-flex align-items-center mb-2">
                                <label class="fw-bold">■ 施設と宛先情報</label>
                            </div>
            
                            <!-- group1-row1 -->
                            <div class="d-flex gap-3">
                                <div class="d-flex align-items-center basis-[35%]">
                                    <label class="label-text w-[8rem]">DCFコード</label>
                                    <input type="text" class="flex-1 form-control text-center" value="4600918">
                                </div>
                                <div class="d-flex align-items-center basis-[65%]">
                                    <label class="label-text w-[5rem]">施設名</label>
                                    <input type="text" class="flex-1 form-control" value="信州大学医学部附属病院">
                                    <button class="btn selection w-[7rem] ms-2">施設選択</button>
                                </div>
                            </div>

                            <!-- group1-row2 -->
                            <div class="d-flex gap-3">
                                <div class="d-flex align-items-center basis-[35%]">
                                    <label class="label-text w-[8rem]">SMDコード</label>
                                    <input type="text" class="flex-1 form-control text-center" value="7015">
                                </div>
                                <div class="d-flex align-items-center basis-[65%]">
                                    <label class="label-text w-[5rem]">宛先名</label>
                                    <input type="text" class="form-control text-center w-[5rem] me-2" value="701501">
                                    <input type="text" class="flex-1 form-control" value="内科学講座第３教室　西７病棟　">
                                </div>
                            </div>

                            <!-- group1-row3 -->
                            <div class="d-flex gap-3">
                                <div class="d-flex align-items-center basis-[35%]">
                                    <label class="label-text w-[8rem]">患者コード(自動)</label>
                                    <input type="text" class="flex-1 form-control text-center" value="PR-1234">
                                </div>
                                <div class="d-flex align-items-center basis-[65%]">
                                    <label class="label-text w-[5rem]">担当者名</label>
                                    <input type="text" class="flex-1 form-control" value="奥村　学">
                                    <select class="form-select w-[6rem] ms-2">
                                        <option value="">先生</option>
                                    </select>
                                    <button class="btn selection w-[7rem] ms-2">宛先選択</button>
                                </div>
                            </div>

                            <!-- group1-row4 -->
                            <div class="d-flex gap-3">
                                <div class="d-flex align-items-center basis-[35%]">
                                </div>
                                <div class="d-flex basis-[65%] gap-3">
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[5rem]">電話番号</label>
                                        <input type="text" class="flex-1 form-control text-center" value="0263-37-2774">
                                    </div>
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[4rem]">FAX</label>
                                        <input type="text" class="flex-1 form-control text-center" value="0263-37-3427">
                                    </div>
                                </div>
                            </div>
            
                        </div>

                        <!-- group 2 -->
                        <div class="d-grid input-gap">
                            <!-- group2-title -->
                            <div class="d-flex align-items-center mb-2">
                                <label class="fw-bold">■ MSへの連絡と交換案内</label>
                            </div>

                            <!-- group2-row1 -->
                            <div class="d-flex gap-3">
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="label-text w-[6rem]">案内予定日</label>
                                    <Datepicker class="flex-1" v-model="day"></Datepicker>
                                </div>
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="label-text w-[6rem]">MS連絡日</label>
                                    <Datepicker class="flex-1" v-model="day"></Datepicker>
                                </div>
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="label-text w-[6rem]">案内実施日</label>
                                    <Datepicker class="flex-1" v-model="day"></Datepicker>
                                </div>
                            </div>

                            <!-- group2-row2 -->
                            <div class="d-flex gap-3">
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="label-text w-[6rem]">処理状態</label>
                                    <select class="form-select flex-1">
                                        <option value="">案内未実施</option>
                                    </select>
                                </div>
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="label-text w-[6rem]"></label>
                                    <a href="javascript:void(0)">MS連絡文表示</a>
                                </div>
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="label-text w-[6rem]"></label>
                                    <a href="javascript:void(0)">交換案内PDF</a>
                                </div>
                            </div>

                            <!-- group2-row2 -->
                            <div class="d-flex">
                                <label class="label-text w-[6rem]">備考</label>
                                <textarea class="form-control flex-1" style="min-height: 6rem;">一覧から複数のデータに対して一括実施できますが、この画面ではMSへの連絡文参照及び交換案内PDFを個別にダウンロードでき、交換ステータスを変更できます。</textarea>
                            </div>
                        </div>

                        <!-- group 3 -->
                        <div class="d-grid input-gap">
                            <!-- group3-title -->
                            <div class="d-flex align-items-center mb-2">
                                <div class="d-flex justify-content-between align-items-center flex-1">
                                    <label class="fw-bold">■ 交換依頼・受領書情報</label>
                                    <button class="btn selection">受領書本文出力</button>
                                </div>
                                <a href="javascript:void(0)" class="w-[8.5rem] ms-2 text-end">受領書PDF表示</a>
                            </div>

                            <!-- group2-row1 -->
                            <div class="d-flex align-items-center">
                                <label class="label-text w-[6rem]">依頼書登録</label>
                                <input type="text" class="flex-1 form-control" readonly placeholder="依頼書PDFファイル">
                                <div class="d-flex align-items-center justify-content-between w-[8.5rem] ms-2">
                                    <button class="btn default">開く</button>
                                    <button class="btn default">登録</button>
                                </div>
                            </div>

                            <!-- group3-row2 -->
                            <div class="d-flex gap-3">
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="label-text w-[6rem]">依頼受信日</label>
                                    <Datepicker class="flex-1" v-model="day"></Datepicker>
                                </div>
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="label-text w-[6rem]">交換予定日</label>
                                    <Datepicker class="flex-1" v-model="day"></Datepicker>
                                </div>
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="label-text w-[6rem]">納品希望日</label>
                                    <Datepicker class="flex-1" v-model="day"></Datepicker>
                                </div>
                            </div>

                            <!-- group3-row3 -->
                            <div class="d-flex gap-3">
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="label-text w-[6rem]">交換依頼日</label>
                                    <Datepicker class="flex-1" v-model="day"></Datepicker>
                                </div>
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="label-text w-[6rem]">回答納品日</label>
                                    <Datepicker class="flex-1" v-model="day"></Datepicker>
                                </div>
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="label-text w-[6rem]">受領書FAX日</label>
                                    <Datepicker class="flex-1" v-model="day"></Datepicker>
                                </div>
                            </div>

                            <!-- group3-row4 -->
                            <div class="d-flex">
                                <label class="label-text w-[6rem]">備考</label>
                                <textarea class="form-control flex-1" style="min-height: 5.5rem;"></textarea>
                            </div>
                        </div>
                    </div>
            
                    <!-- right -->
                    <div class="d-grid gap-3 basis-[50%]" style="height: fit-content;">
                        <!-- group 1 -->
                        <div class="d-grid input-gap">
                            <!-- group1-title -->
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <label class="fw-bold">■ 出荷指示管理</label>
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[3rem]">状態</label>
                                    <select class="form-select flex-1">
                                        <option value="">-</option>
                                    </select>
                                </div>
                            </div>

                            <!-- group1-row1 -->
                            <div class="d-flex gap-3">
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="label-text w-[6rem]">出荷予定日</label>
                                    <Datepicker class="flex-1" v-model="day"></Datepicker>
                                </div>
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="label-text w-[6rem]">出荷指示日</label>
                                    <Datepicker class="flex-1" v-model="day"></Datepicker>
                                </div>
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="label-text w-[6rem]">指示送信日</label>
                                    <Datepicker class="flex-1" v-model="day"></Datepicker>
                                </div>
                            </div>

                            <!-- group1-row2 -->
                            <div class="d-flex gap-3">
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[6rem]">指示NO.</label>
                                    <input type="text" class="flex-1 form-control text-center" value="PR221101-01-1-01">
                                </div>
                                <div class="d-flex align-items-center basis-[60%]">
                                    <label class="label-text w-[6rem]">依頼主名称</label>
                                    <select class="flex-1 form-select">
                                        <option value="">エス・エム・ディ株式会社</option>
                                    </select>
                                </div>
                            </div>

                            <!-- group1-row3+4 -->
                            <div class="d-flex gap-2">
                                <div class="d-grid input-gap flex-1">
                                    <div class="d-flex align-items-center">
                                        <label class="label-text w-[6rem]">届け先住所</label>
                                        <input type="text" class="form-control text-center me-2 w-[9rem]" value="390-0802">
                                        <input type="text" class="flex-1 form-control" value="長野県松本市旭３－１－１">
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <label class="label-text w-[6rem]">届け先名称</label>
                                        <input type="text" class="flex-1 form-control text-center" value="内科学講座第３教室　西７病棟　奥村　学　先生　　">
                                    </div>
                                </div>
                                <button class="btn default">出荷情報<br>確定画面</button>
                            </div>

                            <!-- group1-row5 -->
                            <div class="d-flex gap-3">
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[6rem]">電話番号</label>
                                    <input type="text" class="flex-1 form-control text-center" value="0263-37-2774">
                                </div>
                                <div class="d-flex align-items-center basis-[30%]">
                                    <label class="label-text w-[5rem]">棚コード</label>
                                    <select class="flex-1 form-select">
                                        <option value="">A001</option>
                                    </select>
                                </div>
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[6rem]">配達指定日</label>
                                    <Datepicker :enableTimePicker="false" class="flex-1" v-model="day" format="yyyy/MM/dd"
                                        locale="ja" cancelText="" selectText="" auto-apply keep-action-row :close-on-auto-apply="true">
                                    </Datepicker>
                                </div>
                            </div>

                            <!-- group1-row6 -->
                            <div class="d-flex">
                                <textarea class="form-control">■『CADD-Legacy 1400 ポンプ』です。■ご発注日；01/16ご希望納品日；01/20　■【患者様　ご入院01/18　NJ；01/22　PEG；01/23⇒ご退院；01/19 予定】</textarea>
                            </div>
                        </div>

                        <!-- group 2 -->
                        <div class="d-grid input-gap">
                            <!-- group2-title -->
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <label class="fw-bold">■ 出荷実績情報</label>
                                <a href="javascript:void(0)">メーカ報告文書</a>
                            </div>

                            <!-- group2-row1 -->
                            <div class="d-flex gap-3">
                                <div class="d-flex basis-2/3 gap-3">
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[6rem]">出荷実施日</label>
                                        <Datepicker class="flex-1" v-model="day"></Datepicker>
                                    </div>
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[6rem]">シリアルNo.</label>
                                        <input type="text" class="flex-1 form-control text-center">
                                    </div>
                                </div>
                                <div class="d-flex align-items-center justify-content-end basis-1/3">
                                    <a href="javascript:void(0)">配達追跡ページ</a>
                                </div>
                            </div>

                            <!-- group2-row2 -->
                            <div class="d-flex gap-3">
                                <div class="d-flex align-items-center basis-2/3">
                                    <label class="label-text w-[6rem]">問合せ番号</label>
                                    <input type="text" class="flex-1 form-control">
                                </div>
                                <div class="d-flex align-items-center justify-content-end basis-1/3">
                                    <label class="label-text w-[6rem]">配達完了日</label>
                                    <Datepicker class="flex-1" v-model="day"></Datepicker>
                                </div>
                            </div>

                            <!-- group2-row3 -->
                            <div class="d-flex align-items-center">
                                <label class="label-text w-[6rem]">備考</label>
                                <input type="text" class="flex-1 form-control">
                            </div>
                        </div>

                        <!-- group 3 -->
                        <div class="d-grid input-gap">
                            <!-- group3-title -->
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <label class="fw-bold">■ 同意書情報</label>
                                <a href="javascript:void(0)">同意書PDF表示</a>
                            </div>

                            <!-- group3-row1 -->
                            <div class="d-flex align-items-center">
                                <label class="label-text w-[6rem]">同意書登録</label>
                                <input type="text" class="flex-1 form-control" readonly placeholder="同意書PDFファイル">
                                <div class="d-flex align-items-center justify-content-between w-[8.5rem] ms-2">
                                    <button class="btn default">開く</button>
                                    <button class="btn default">登録</button>
                                </div>
                            </div>

                            <!-- group3-row2 -->
                            <div class="d-flex gap-3">
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="label-text w-[6rem]">受信日</label>
                                    <Datepicker class="flex-1" v-model="day"></Datepicker>
                                </div>
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="label-text w-[6rem]">著名日</label>
                                    <Datepicker class="flex-1" v-model="day"></Datepicker>
                                </div>
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="label-text w-[6rem]">使用開始日</label>
                                    <Datepicker class="flex-1" v-model="day"></Datepicker>
                                </div>
                            </div>

                            <!-- group2-row3 -->
                            <div class="d-flex gap-3">
                                <div class="d-flex align-items-center basis-[60%]">
                                    <label class="label-text w-[6rem]">受信日</label>
                                    <input type="text" class="flex-1 form-control">
                                    <input type="text" class="form-control w-[6rem] ms-1">
                                    <select class="form-select w-[6rem] ms-1">
                                        <option value=""></option>
                                    </select>
                                </div>
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[6rem]">シリアルNo.</label>
                                    <input type="text" class="flex-1 form-control">
                                    <input type="text" class="form-control text-center w-[5rem] ms-1" value="-">
                                </div>
                            </div>
                            
                            <!-- group2-row4 -->
                            <div class="d-flex align-items-center">
                                <label class="label-text w-[6rem]">備考</label>
                                <input type="text" class="flex-1 form-control">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex align-items-center py-2">
            <div class="col-2">
                <a href="javascript:void(0)">連絡情報記録・参照</a>
            </div>
            <div class=" col-8 d-flex justify-content-around align-items-center">
                <button class="btn delete w-[8rem]">交換取消</button>
                <button class="btn w-[10rem]">案内完了設定</button>
                <button class="btn default w-[8rem]">情報保存</button>
                <button class="btn w-[8rem]">完了登録</button>
            </div>
            <div class="col-2"></div>
        </div>
    </div>
</template>
<style scoped>
</style>
<script setup>

</script>
<script>
export default {
    data: function () {
        return {
            day: null,
        }
    },
    computed: {},
    methods: {
    }
}
</script>