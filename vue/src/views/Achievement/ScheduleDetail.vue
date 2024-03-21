<template>
    <div class="transit wrapper-scroll">
        <div class="w-[90%] mx-auto d-flex gap-3 mb-3">
            <button class="btn default fw-bold fs-4 d-flex align-items-center gap-2"><span class="icon-pre"></span>前へ</button>
            <div class="d-grid input-gap flex-1">
                <div class="d-flex gap-3">
                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="label-text w-[6rem]">SMDコード</label>
                        <input type="text" class="form-control flex-1 text-center" value="7015">
                    </div>
                    <div class="d-flex align-items-center basis-[40%]">
                        <label class="label-text w-[4rem]">施設名</label>
                        <input type="text" class="form-control flex-1" value="信州大学医学部附属病院">
                    </div>
                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="label-text w-[6rem]">DCFコード</label>
                        <input type="text" class="form-control flex-1 text-center" value="4600918">
                    </div>
                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="label-text w-[6rem]">患者コード</label>
                        <input type="text" class="form-control flex-1 text-center" value="PR-1234" disabled>
                    </div>
                </div>

                <div class="d-flex gap-3">
                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="label-text w-[6rem]">宛先コード</label>
                        <input type="text" class="form-control flex-1 text-center" value="701501">
                    </div>
                    <div class="d-flex align-items-center basis-[40%]">
                        <label class="label-text w-[4rem]">宛先名</label>
                        <input type="text" class="form-control flex-1" value="内科学講座第３教室　西７病棟　">
                    </div>
                    <div class="d-flex align-items-center basis-[29%]">
                        <label class="label-text w-[6rem]">担当者名</label>
                        <input type="text" class="form-control flex-1" value="奥村　学　">
                    </div>
                    <div class="d-flex align-items-center basis-[11%]">
                        <select class="form-select flex-1">
                            <option value="">先生</option>
                        </select>
                    </div>
                </div>
            </div>
            <button class="btn default fw-bold fs-4 d-flex align-items-center gap-2">次へ<span class="icon-next"></span></button>
        </div>

        <div class="parent-scroll">
            <div class="d-flex gap-3 view-scroll">
                <!-- left -->
                <div class="d-grid gap-3 basis-[50%]" style="height: fit-content;">
                    <!-- group 1 -->
                    <div class="d-grid input-gap">
                        <!-- group1-title -->
                        <div class="d-flex align-items-center justify-content-between">
                            <label class="fw-bold">■ MSへの連絡</label>
                            <div class="d-flex align-items-center gap-3">
                                <a href="javascript:void(0)" @click="openMSContactSetting()">MS連絡文作成</a>
                                <a href="javascript:void(0)" @click="exportPDF()">交換案内PDF作成</a>
                            </div>
                        </div>
        
                        <!-- group1-row1 -->
                        <div class="d-flex align-items-center">
                            <label class="label-text w-[8rem]">特記事項</label>
                            <input type="text" class="flex-1 form-control">
                        </div>

                        <!-- group1-row2 -->
                        <div class="d-flex">
                            <div class="d-grid input-gap w-[8rem]" style="height: fit-content;">
                                <label class="label-text">MS連絡文</label>
                                <button class="btn default sm w-[7rem]">文書複製</button>
                            </div>
                            <textarea class="form-control flex-1"></textarea>
                        </div>
                    </div>

                    <!-- group 2 -->
                    <div class="d-grid input-gap">
                        <!-- group2-title -->
                        <div class="d-flex align-items-center justify-content-between">
                            <label class="fw-bold">■ 交換作業の予定と実績</label>
                            <div class="d-flex gap-3 align-items-center">
                                <label class="label-text">処理状態</label>
                                <select class="form-select w-[10rem]">
                                    <option value="">MS事前連絡済</option>
                                </select>
                            </div>
                            <a href="javascript:void(0)" @click="createReceiptText()">受領書本文作成</a>
                        </div>

                        <!-- group2-row1 -->
                        <div class="d-flex gap-3">
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="label-text w-[6rem]">ご要望納品日</label>
                                <Datepicker class="flex-1" v-model="day"></Datepicker>
                            </div>
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="label-text w-[6rem]">交換予定日</label>
                                <Datepicker class="flex-1" v-model="day"></Datepicker>
                            </div>
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="label-text w-[6rem]">回答納品日</label>
                                <Datepicker class="flex-1" v-model="day"></Datepicker>
                            </div>
                        </div>

                        <!-- group2-row2 -->
                        <div class="d-flex align-items-center">
                            <label class="label-text w-[6rem]">特記事項I.</label>
                            <input type="text" class="flex-1 form-control" value="都度確認・宛先不明・自動出荷禁止">
                        </div>

                        <!-- group2-row3 -->
                        <table class="t-border no-scroll">
                            <thead class="text-center">
                                <tr>
                                    <th>No.</th>
                                    <th>作業内容</th>
                                    <th>予定日</th>
                                    <th>実施</th>
                                    <th>実施日</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="st in settings">
                                    <td class="text-center fw-bold">{{ st.no }}</td>
                                    <td>{{ st.name }}</td>
                                    <td>
                                        <Datepicker class="w-[9rem] mx-auto" v-model="st.setting_date"></Datepicker>
                                    </td>
                                    <td class="text-center">
                                        <button class="btn sm">実施済設定</button>
                                    </td>
                                    <td>
                                        <Datepicker class="w-[9rem] mx-auto" v-model="st.implement_date"></Datepicker>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <!-- group2-row4 -->
                        <div class="d-flex">
                            <label class="label-text w-[7rem]">受領書本文</label>
                            <textarea class="form-control"></textarea>
                        </div>
                    </div>
                </div>
        
                <!-- right -->
                <div class="d-grid gap-3 basis-[50%]" style="height: fit-content;">
                    <!-- group 3 -->
                    <div class="d-grid input-gap">
                        <!-- group3-title -->
                        <div class="d-flex align-items-center justify-content-between">
                            <label class="fw-bold">■ 出荷指示管理</label>
                        </div>

                        <!-- group3-row1 -->
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

                        <!-- group3-row2+3 -->
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
                            <button class="btn default" @click="openShippingInstructions()">出荷情報<br>確定画面</button>
                        </div>

                        <!-- group3-row4 -->
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
                                <Datepicker class="flex-1" v-model="day"></Datepicker>
                            </div>
                        </div>

                        <!-- group3-row5 -->
                        <div class="d-flex">
                            <textarea class="form-control">※過日ご案内いたしました　定期ﾒﾝﾃﾅﾝｽ対象【ﾎﾟﾝﾌﾟ No,576771 】の交換用ポンプです。ご使用患者様、 『 ＩＤ； 7464908　ｲﾆｼｬﾙ名.姓；S.Y(男性)　』　様用です。</textarea>
                        </div>
                    </div>

                    <!-- group 4 -->
                    <div class="d-grid input-gap">
                        <!-- group4-title -->
                        <div class="d-flex align-items-center justify-content-between">
                            <label class="fw-bold">■ 出荷実績情報</label>
                            <a href="javascript:void(0)" @click="createStatement()">メーカ報告文書</a>
                        </div>

                        <!-- group4-row1 -->
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

                        <!-- group4-row2 -->
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

                        <!-- group4-row3 -->
                        <div class="d-flex align-items-center">
                            <label class="label-text w-[6rem]">備考</label>
                            <input type="text" class="flex-1 form-control">
                        </div>
                    </div>

                    <div class="d-flex gap-3">
                        <!-- group-5 -->
                        <div class="d-grid input-gap basis-[40%]">
                            <!-- group5-title -->
                            <div class="d-flex align-items-center justify-content-between">
                                <label class="fw-bold">■ 同意書情報</label>
                            </div>

                            <!-- group5-row1 -->
                            <table class="t-border">
                                <tbody>
                                    <tr class="text-center bt-table">
                                        <td>受信日</td>
                                        <td>
                                            <Datepicker class="w-[9rem] mx-auto" v-model="day"></Datepicker>
                                        </td>
                                    </tr>
                                    <tr class="text-center">
                                        <td>署名日</td>
                                        <td>
                                            <Datepicker class="w-[9rem] mx-auto" v-model="day"></Datepicker>
                                        </td>
                                    </tr>
                                    <tr class="text-center">
                                        <td>使用開始日</td>
                                        <td>
                                            <Datepicker class="w-[9rem] mx-auto" v-model="day"></Datepicker>
                                        </td>
                                    </tr>
                                    <tr class="text-center">
                                        <td>シリアル番号</td>
                                        <td>
                                            <Datepicker class="w-[9rem] mx-auto" v-model="day"></Datepicker>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- group-6 -->
                        <div class="d-grid input-gap basis-[60%]" style="height: fit-content;">
                             <!-- group6-title -->
                             <div class="d-flex align-items-center justify-content-between">
                                <label class="fw-bold">■ 患者情報</label>
                            </div>

                            <!-- group6-row1 -->
                            <div class="d-flex gap-3">
                                <div class="d-flex align-items-center basis-[45%]">
                                    <label class="label-text w-[4rem]">患者名</label>
                                    <input type="text" class="form-control flex-1 text-center" value="藤井杏奈">
                                </div>
                                <div class="d-flex align-items-center basis-[55%]">
                                    <label class="label-text w-[5.5rem]">患者名カナ</label>
                                    <input type="text" class="form-control flex-1 text-center" value="ﾌｼﾞｲ ｱﾝﾅ">
                                </div>
                            </div>

                            <!-- group6-row2 -->
                            <div class="d-flex gap-3">
                                <div class="d-flex align-items-center basis-[60%]">
                                    <label class="label-text w-[9rem]">患者名(イニシャル)</label>
                                    <input type="text" class="form-control flex-1 text-center" value="A.F">
                                </div>
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[3rem]">性別</label>
                                    <select class="form-select flex-1">
                                        <option value="">女性</option>
                                    </select>
                                </div>
                            </div>
                            <!-- group6-row2 -->
                            <div class="d-flex">
                                <label class="label-text w-[3rem]">備考</label>
                                <textarea class="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-around align-items-center py-2">
            <div class="d-flex gap-4 align-items-center">
                <a href="javascript:void(0)" @click="openContactInformation()">連絡情報記録・参照</a>
                <button class="btn delete w-[8rem]">交換取消</button>
            </div>
            <div class="d-flex gap-4 align-items-center">
                <button class="btn default w-[8rem]">情報保存</button>
                <button class="btn w-[8rem]">完了登録</button>
            </div>
        </div>
    </div>

    <ContactInformationModal v-if="isOpenContactInformation" :show="isOpenContactInformation" @close="isOpenContactInformation = false"></ContactInformationModal>

    <MSContactSettingModal v-if="isOpenMSContactSetting" :show="isOpenMSContactSetting" @close="isOpenMSContactSetting = false"></MSContactSettingModal>

    <ShippingInstructionsModal v-if="isOpenShippingInstructions" :show="isOpenShippingInstructions" @close="isOpenShippingInstructions = false"></ShippingInstructionsModal>

    <ConfirmModal ref="confirmDialog"></ConfirmModal>
</template>
<style scoped>
    .bt-table td {
        border-top: var(--border-table);
    }
</style>
<script setup>
import ContactInformationModal from '@/views/Achievement/modal/schedule/ContactInformationModal.vue';
import MSContactSettingModal from '@/views/Exchange/modal/MSContactSettingModal.vue';
import ShippingInstructionsModal from '@/views/RentManagement/modal/ShippingInstructionsModal.vue';
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue";
import jp from '@/lang/jp.json'
</script>
<script>
export default {
    data: function () {
        return {
            day: null,
            settings: [
                {
                    no: 1,
                    name: 'ご案内一式作成',
                    setting_date: null,
                    implement_date: null
                },
                {
                    no: 2,
                    name: 'MS事前メール連絡',
                    setting_date: null,
                    implement_date: null
                },
                {
                    no: 3,
                    name: '施設ご案内FAX',
                    setting_date: null,
                    implement_date: null
                },
                {
                    no: 4,
                    name: 'ご回答締め日',
                    setting_date: null,
                    implement_date: null
                },
                {
                    no: 5,
                    name: 'ご納品ご案内',
                    setting_date: null,
                    implement_date: null
                },
                {
                    no: 6,
                    name: '出荷指示実施',
                    setting_date: null,
                    implement_date: null
                },
                {
                    no: 7,
                    name: '納品確認',
                    setting_date: null,
                    implement_date: null
                },
            ],
            isOpenContactInformation: false,
            isOpenMSContactSetting: false,
            isOpenShippingInstructions: false
        }
    },
    computed: {
        
    },
    methods: {
        openContactInformation: function () {
            this.isOpenContactInformation = true;
        },
        openMSContactSetting: function () {
            this.isOpenMSContactSetting = true;
        },
        openShippingInstructions: function () {
            this.isOpenShippingInstructions = true;
        },
        exportPDF: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: jp.exchange_guide_export_title,
                message: jp.exchange_guide_export_message,
                okButton: '出力',
                cancelButton: 'キャンセル'
            })
            if(ok) await this.$refs.confirmDialog.close()
            console.log(ok)
        },
        createReceiptText: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: jp.create_receipt_title,
                message: jp.create_receipt_message,
                okButton: '複製',
                cancelButton: 'キャンセル'
            })
            if(ok) await this.$refs.confirmDialog.close()
            console.log(ok)
        },
        createStatement: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: jp.create_statement_title,
                message: jp.create_statement_message,
                okButton: '複製',
                cancelButton: 'キャンセル'
            })
            if(ok) await this.$refs.confirmDialog.close()
            console.log(ok)
        }
    }
}
</script>