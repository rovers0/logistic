<template>
    <div class="p-1 transit wrapper-scroll">
        <div class="w-[98%] mx-auto d-flex gap-3 mb-3">
            <button class="gap-2 btn default fw-bold fs-4 d-flex align-items-center" @click="prev()" :disabled="ids.length <= 1"><span class="icon-pre"></span>前へ</button>
            <div class="flex-1 gap-1 d-flex">
                <div class="flex-1 d-grid input-gap">
                    <div class="gap-3 d-flex">
                        <div class="d-flex align-items-center basis-[20%]">
                            <label class="label-text w-[6rem]">SMDコード</label>
                            <input type="text" class="flex-1 text-center form-control" :value="exchangeDetail.smd_code" disabled>
                        </div>
                        <div class="d-flex align-items-center basis-[38%]">
                            <label class="label-text w-[4rem]">施設名</label>
                            <input type="text" class="flex-1 form-control" :value="exchangeDetail.destination?.exc_name" disabled>
                        </div>
                        <div class="d-flex align-items-center basis-[22%]">
                            <label class="label-text w-[6rem]">DCFコード</label>
                            <input type="text" class="flex-1 text-center form-control" :value="exchangeDetail.pumpFacility?.dcf_code" disabled>
                        </div>
                        <div class="d-flex align-items-center basis-[20%]">
                            <label class="label-text w-[6rem]">患者コード</label>
                            <input type="text" class="flex-1 text-center form-control" :value="exchangeDetail.patient_cd" disabled>
                        </div>
                    </div>
    
                    <div class="gap-3 d-flex">
                        <div class="d-flex align-items-center basis-[20%]">
                            <label class="label-text w-[6rem]">宛先コード</label>
                            <input type="text" class="flex-1 text-center form-control" :value="exchangeDetail.destination?.des_code_text" disabled>
                        </div>
                        <div class="d-flex align-items-center basis-[38%]">
                            <label class="label-text w-[4rem]">宛先名</label>
                            <input type="text" class="flex-1 form-control" :value="exchangeDetail.destination?.exc_clinic" disabled>
                        </div>
                        <div class="d-flex align-items-center basis-[31%]">
                            <label class="label-text w-[6rem]">担当者名</label>
                            <input type="text" class="flex-1 form-control" :value="exchangeDetail.destination?.exc_doctor" disabled>
                        </div>
                        <div class="d-flex align-items-center basis-[11%]">
                            <select class="flex-1 form-select" v-model="exchangeDetail.destination.exc_title" disabled>
                                <option v-for="title in master.des_title" :value="title.id">{{ title.value }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button class="btn selection w-[4.5rem]" type="button" @click="openFacilitySelection()">宛先<br>編集</button>
            </div>
            <button class="gap-2 btn default fw-bold fs-4 d-flex align-items-center" @click="next()" :disabled="ids.length <= 1">次へ<span class="icon-next"></span></button>
        </div>

        <div class="parent-scroll">
            <div class="w-full gap-3 d-flex">
                <!-- left -->
                <div class="d-grid gap-3 basis-[50%]" style="height: fit-content;">
                    <!-- group 1 -->
                    <div class="d-grid input-gap">
                        <!-- group1-title -->
                        <div class="d-flex align-items-center justify-content-between">
                            <label class="fw-bold label-text">■ MSへの連絡</label>
                            <div class="gap-3 d-flex align-items-center">
                                <a href="javascript:void(0)" @click="openMSContactSetting()">MS連絡文作成</a>
                                <a href="javascript:void(0)" @click="exportExchangePDF()">交換案内PDF作成</a>
                                <a href="javascript:void(0)" @click="createReceiptText()">受領書本文作成</a>
                            </div>
                        </div>
        
                        <!-- group1-row1 -->
                        <div class="d-flex align-items-center">
                            <label class="label-text w-[7rem]">特記事項</label>
                            <input type="text" class="flex-1 form-control" v-model="exchangeDetail.ms_remarks" :disabled="checkDisableByStatus('contact_ms')">
                        </div>

                        <!-- group1-row2 -->
                        <div class="d-flex">
                            <div class="d-grid input-gap w-[7rem]" style="height: fit-content;">
                                <label class="label-text">MS連絡文</label>
                                <button class="btn default sm w-[6rem]" @click="copyMS()">文書複製</button>
                            </div>
                            <textarea class="flex-1 form-control" v-model="exchangeDetail.ms_send_text" :disabled="checkDisableByStatus('contact_ms')"></textarea>
                        </div>
                    </div>

                    <!-- group 2 -->
                    <div class="d-grid input-gap">
                        <!-- group2-title -->
                        <div class="d-flex align-items-center justify-content-between">
                            <label class="fw-bold label-text">■ 交換作業の予定と実績</label>
                            <div class="gap-3 d-flex align-items-center">
                                <label class="label-text">処理状態</label>
                                <select class="flex-1 form-select" v-model="exchangeDetail.status" @change="onChangeStatus()">
                                    <option v-for="st in status_list" :value="st.id">{{ st.value }}</option>
                                </select>
                            </div>
                        </div>

                        <!-- group2-row1 -->
                        <div class="d-flex align-items-center">
                            <label class="label-text w-[6rem]">特記事項I</label>
                            <input type="text" class="flex-1 form-control" v-model="exchangeDetail.exc_remark1" :disabled="checkDisableByStatus('schedule_and_results')">
                        </div>
                        <!-- group2-row2 -->
                        <div class="d-flex align-items-center">
                            <label class="label-text w-[6rem]">特記事項II</label>
                            <input type="text" class="flex-1 form-control" v-model="exchangeDetail.exc_remark2" :disabled="checkDisableByStatus('schedule_and_results')">
                        </div>
                        <!-- group2-row3 -->
                        <div class="d-flex">
                            <label class="label-text w-[6rem]">受領書本文</label>
                            <textarea class="flex-1 form-control" v-model="exchangeDetail.answer_mail_body" :disabled="checkDisableByStatus('schedule_and_results')"></textarea>
                            <!-- <input type="text" class="flex-1 form-control" v-model="exchangeDetail.answer_mail_body" :disabled="checkDisableByStatus('schedule_and_results')"> -->
                        </div>

                        <!-- group2-row4 -->
                        <div class="gap-2 d-flex">
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="label-text w-[6rem]">交換予定日</label>
                                <Datepicker class="flex-1" v-model="exchangeDetail.limit_change_date" :disabled="checkDisableByStatus('schedule_and_results')"></Datepicker>
                            </div>
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="label-text w-[6rem]">交換希望日</label>
                                <Datepicker class="flex-1" v-model="exchangeDetail.hope_slip_date" :disabled="checkDisableByStatus('schedule_and_results')"></Datepicker>
                            </div>
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="label-text w-[6rem]">配達予定日</label>
                                <Datepicker class="flex-1" v-model="exchangeDetail.answer_slip_date" :disabled="checkDisableByStatus('schedule_and_results')"></Datepicker>
                            </div>
                        </div>

                        <!-- group2-row5 -->
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
                                        <Datepicker class="w-[9rem] mx-auto" v-model="st.setting_date" @update:modelValue="st.settingUpdate" :disabled="st.disabledSetting"></Datepicker>
                                    </td>
                                    <td class="text-center">
                                        <button class="btn sm w-[7rem]" v-if="st.button" @click="st.action" :disabled="st.disabledButton()">{{ st.button }}</button>
                                        <span v-else>-</span>
                                    </td>
                                    <td>
                                        <Datepicker class="w-[9rem] mx-auto" v-model="st.implement_date" @update:modelValue="st.implementUpdate" :disabled="st.disabledImplement"></Datepicker>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        
                <!-- right -->
                <div class="basis-[50%] d-flex flex-column gap-2">
                    <!-- group 5 -->
                    <div class="d-flex flex-column input-gap">
                        <!-- group5-title -->
                        <div class="d-flex justify-content-between">
                            <label class="fw-bold label-text">■ 出荷指示管理</label>

                            <div class="gap-2 d-flex align-items-center">
                                <label class="label-text">旧シリアルNo.</label>
                                <input type="text" class="flex-1 text-center form-control w-[9rem]" :value="exchangeDetail.beforeHistory.serial_no" disabled>
                            </div>
                        </div>
        
                        <!-- group5-row1 -->
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="w-[5.5rem]">出荷予定日</label>
                                <Datepicker class="flex-1" v-model="exchangeDetail.shipment.plan_date" :disabled="checkDisableByStatus('shipping_instruction')"></Datepicker>
                            </div>
        
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="w-[5.5rem]">出荷指示日</label>
                                <Datepicker class="flex-1" v-model="exchangeDetail.shipment.inst_date" :disabled="checkDisableByStatus('shipping_instruction')"></Datepicker>
                            </div>

                            <div class="d-flex align-items-center basis-1/3">
                                <label class="w-[5.5rem]">指示送信日</label>
                                <Datepicker class="flex-1" v-model="exchangeDetail.shipment.send_date" :disabled="checkDisableByStatus('shipping_instruction') || exchangeDetail.status < 8"></Datepicker>
                            </div>
                        </div>
        
                        <!-- group5-row2 -->
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[40%]">
                                <label class="w-[5.5rem]">指示NO.</label>
                                <input type="text" class="flex-1 text-center form-control" disabled :value="exchangeDetail.shipment.inst_id || '-'">
                            </div>
                            <div class="d-flex align-items-center basis-[60%]">
                                <label class="w-[6rem]">依頼主名称</label>
                                <input type="text" class="flex-1 form-control" disabled :value="master?.configs?.SMD_COMP_NAME || ''">
                            </div>
                        </div>
        
                        <!-- group5-row3+4 -->
                        <div class="gap-2 d-flex">
                            <div class="flex-1 d-grid input-gap">
                                <div class="d-flex align-items-center">
                                    <label class="w-[5.5rem]">届け先住所</label>
                                    <input type="text" class="w-[8rem] me-2 form-control text-center" v-model="exchangeDetail.shipment.des_postcode" :disabled="checkDisableByStatus('shipping_instruction')" maxlength="8">
                                    <input type="text" class="flex-1 form-control" v-model="exchangeDetail.shipment.des_address" :disabled="checkDisableByStatus('shipping_instruction')">
                                </div>
        
                                <div class="d-flex align-items-center">
                                    <label class="w-[5.5rem]">届け先名称</label>
                                    <input type="text" class="flex-1 form-control" v-model="exchangeDetail.shipment.des_name" :disabled="checkDisableByStatus('shipping_instruction')">
                                </div>
                            </div>
                            <button class="btn default w-[7rem]" @click="openShippingModal()" :disabled="checkDisableByStatus('shipping_instruction')">出荷情報<br>確定画面</button>
                        </div>
        
                        <!-- group5-row5 -->
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[35%]">
                                <label class="w-[5.5rem]">電話番号</label>
                                <input type="text" class="flex-1 text-center form-control" v-model="exchangeDetail.shipment.fac_tel" :disabled="checkDisableByStatus('shipping_instruction')">
                            </div>
        
                            <div class="d-flex align-items-center basis-[30%]">
                                <label class="w-[5rem]">棚コード</label>
                                <select class="flex-1 form-select" v-model="exchangeDetail.shipment.from_shelf" :disabled="checkDisableByStatus('shipping_instruction')">
                                    <option v-for="shelf in getDesShelf()" :value="shelf.id">{{ shelf.value }}</option>
                                </select>
                            </div>
        
                            <div class="d-flex align-items-center basis-[35%]">
                                <label class="w-[5.5rem]">配達指定日</label>
                                <Datepicker class="flex-1" v-model="exchangeDetail.shipment.decided_date" :disabled="checkDisableByStatus('shipping_instruction')" @update:model-value="setRemarks()"></Datepicker>
                            </div>
                        </div>
        
                        <!-- group5-row6 -->
                        <div class="d-flex align-items-center">
                            <textarea class="form-control" v-model="exchangeDetail.shipment.remarks" :disabled="!exchangeDetail.status || exchangeDetail.status < 6"></textarea>
                        </div>
                    </div>
        
                    <!-- group 6 -->
                    <div class="d-flex flex-column input-gap">
                        <!-- group6-title -->
                        <div class="d-flex justify-content-between align-items-center">
                            <label class="label-text fw-bold">■ 出荷実績情報</label>
                            <div class="gap-3 d-flex">
                                <a href="javascript:void(0)" :class="{'disabled': exchangeDetail.status < 9}" @click="openMakerReport()">メーカー報告文書</a>
                                <a href="javascript:void(0)" class="disabled">配達追跡ページへ</a>
                            </div>
                        </div>
        
                        <!-- group6-row1 -->
                        <div class="gap-3 d-flex">
                            <div class="gap-3 d-flex basis-2/3">
                                <div class="d-flex align-items-center basis-[50%]">
                                    <label class="label-text w-[5.5rem]">出荷実施日</label>
                                    <Datepicker class="flex-1" v-model="exchangeDetail.shipment.ship_date" :disabled="checkDisableByStatus('shipping_performance')"></Datepicker>
                                </div>
                                <div class="d-flex align-items-center basis-[50%]">
                                    
                                </div>
                            </div>
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="label-text w-[6rem]">シリアルNo.</label>
                                <input type="text" class="flex-1 form-control"  v-model="exchangeDetail.shipment.serial_no" :disabled="checkDisableByStatus('shipping_performance')">
                            </div>
                        </div>
        
                        <!-- group6-row2 -->
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-2/3">
                                <label class="label-text w-[5.5rem]">問合せ番号</label>
                                <input type="text" class="flex-1 form-control" v-model="exchangeDetail.shipment.ship_qacode" :disabled="checkDisableByStatus('shipping_performance')">
                            </div>
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="label-text w-[6rem]">配達完了日</label>
                                <Datepicker class="flex-1" v-model="exchangeDetail.shipment.delivery_date" :disabled="checkDisableByStatus('shipping_performance') || exchangeDetail.status < 10"></Datepicker>
                            </div>
                        </div>
        
                        <!-- group6-row3 -->
                        <div class="d-flex">
                            <div class="w-[5.5rem]">
                                <label class="text-center label-text">アッヴィ様<br>報告</label>
                            </div>
                            <textarea class="flex-1 form-control" v-model="exchangeDetail.send_report_text" :disabled="!exchangeDetail.status || exchangeDetail.status < 9"></textarea>
                        </div>
                    </div>
        
                    <div class="gap-3 d-flex">
                        <!-- group 7 -->
                        <div class="basis-[40%] d-flex flex-column input-gap">
                            <!-- group7-title -->
                            <div class="d-flex justify-content-between align-items-center">
                                <label class="fw-bold label-text">■ 同意書情報</label>
                            </div>

                            <!-- group7-row1 -->
                            <table class="t-border fit">
                                <tbody>
                                    <tr class="text-center bt-table">
                                        <td>受信日</td>
                                        <td>
                                            <Datepicker class="flex-1" v-model="exchangeDetail.agr_receive_date" :disabled="checkDisableByStatus('consent')"></Datepicker>
                                        </td>
                                    </tr>
                                    <tr class="text-center">
                                        <td>署名日</td>
                                        <td>
                                            <Datepicker class="flex-1" v-model="exchangeDetail.agr_signed_date" :disabled="checkDisableByStatus('consent')"></Datepicker>
                                        </td>
                                    </tr>
                                    <tr class="text-center">
                                        <td>使用開始日</td>
                                        <td>
                                            <Datepicker class="flex-1" v-model="exchangeDetail.agr_start_use" :disabled="checkDisableByStatus('consent')"></Datepicker>
                                        </td>
                                    </tr>
                                    <tr class="text-center">
                                        <td>請求開始月</td>
                                        <td>
                                            <Datepicker class="flex-1" month-picker format="yyyy年MM月" v-model="exchangeDetail.arg_invoice_start" :disabled="checkDisableByStatus('consent')"></Datepicker>
                                        </td>
                                    </tr>
                                    <tr class="text-center">
                                        <td>シリアルNo.</td>
                                        <td>
                                            <input type="text" class="form-control"  v-model="exchangeDetail.afterHistory.serial_no" :disabled="checkDisableByStatus('consent')">
                                        </td>
                                    </tr>
                                    <tr class="text-center">
                                        <td>アッヴィ<br>使用開始</td>
                                        <td>
                                            <Datepicker class="flex-1" v-model="exchangeDetail.afterHistory.dateof_start" :disabled="!exchangeDetail.status && exchangeDetail.status != 0"></Datepicker>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <!-- group 8 -->
                        <div class="basis-[60%] d-flex flex-column input-gap">
                            <!-- group8-title -->
                            <div class="d-flex justify-content-between">
                                <label class="fw-bold label-text">■ 患者情報</label>
                                <div class="d-flex gap-3 basis-[70%]">
                                    <div class="d-flex align-items-center basis-[70%]">
                                        <label class="label-text w-[5.5rem]">患者コード</label>
                                        <input type="text" class="flex-1 text-center form-control" :value="exchangeDetail.afterHistory.patient_cd" disabled>
                                    </div>
                                    <div class="d-flex align-items-center basis-[30%]">
                                        <label class="label-text w-[2.5rem]">枝番</label>
                                        <input type="text" class="flex-1 text-center form-control" :value="exchangeDetail.afterHistory.hist_no" disabled>
                                    </div>
                                </div>
                            </div>

                            <!-- group8-row1 -->
                            <div class="d-flex align-items-center">
                                <label class="label-text w-[7.5rem]">患者カルテ番号</label>
                                <input type="text" class="flex-1 form-control" v-model="exchangeDetail.afterHistory.medical_record" :disabled="checkDisableByStatus('patient')">
                            </div>

                            <!-- group8-row2 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[50%]">
                                    <label class="label-text w-[4rem]">患者名</label>
                                    <input type="text" class="flex-1 form-control" v-model="exchangeDetail.afterHistory.patient_kj" :disabled="checkDisableByStatus('patient')">
                                </div>
                                <div class="d-flex align-items-center basis-[50%]">
                                    <label class="label-text w-[5.5rem]">患者名カナ</label>
                                    <input type="text" class="flex-1 form-control" v-model="exchangeDetail.afterHistory.patient_kn" :disabled="checkDisableByStatus('patient')">
                                </div>
                            </div>

                            <!-- group8-row3 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[60%]">
                                    <label class="label-text w-[9rem]">患者名(イニシャル)</label>
                                    <input type="text" class="flex-1 form-control" v-model="exchangeDetail.afterHistory.patient_nm" :disabled="checkDisableByStatus('patient')">
                                </div>
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[3rem]">性別</label>
                                    <select class="flex-1 form-select" v-model="exchangeDetail.afterHistory.patient_sex" :disabled="checkDisableByStatus('patient')">
                                        <option v-for="item in master.sex" :value="item.id">{{ item.value }}</option>
                                    </select>
                                </div>
                            </div>

                            <!-- group8-row4 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[50%]">
                                    <label class="label-text w-[5rem]">診療科名</label>
                                    <input type="text" class="flex-1 form-control" v-model="exchangeDetail.afterHistory.des_clinic" :disabled="checkDisableByStatus('patient')">
                                </div>
                                <div class="d-flex align-items-center basis-[50%]">
                                    <label class="label-text w-[4rem]">医師名</label>
                                    <input type="text" class="flex-1 form-control" v-model="exchangeDetail.afterHistory.des_doctor" :disabled="checkDisableByStatus('patient')">
                                </div>
                            </div>

                            <!-- group8-row5 -->
                            <div class="d-flex">
                                <label class="label-text w-[4rem]">備考</label>
                                <textarea class="flex-1 form-control" v-model="exchangeDetail.arg_remarks" :disabled="!exchangeDetail.status && exchangeDetail.status != 0"></textarea>
                            </div>

                            <!-- group8-row6 -->
                            <div class="d-flex align-items-center">
                                <label class="label-text w-[4rem]">入力者</label>
                                <select class="flex-1 form-select" v-model="exchangeDetail.afterHistory.staff_pdfchk" :disabled="checkDisableByStatus('patient')">
                                    <option :value="null"></option>
                                    <option v-for="user in master.users" :value="user.userid">{{ user.username }}</option>
                                </select>
                            </div>

                            <!-- group8-row7 -->
                            <div class="d-flex align-items-center">
                                <label class="label-text w-[4rem]">確認者</label>
                                <select class="flex-1 form-select" v-model="exchangeDetail.afterHistory.staff_wcheck" :disabled="checkDisableByStatus('patient')">
                                    <option :value="null"></option>
                                    <option v-for="user in master.users" :value="user.userid">{{ user.username }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="gap-3 py-2 d-flex align-items-center">
            <div class="d-flex justify-content-between align-items-center basis-[50%]">
                <button class="btn delete w-[8rem]" @click="deleteItem()" :disabled="exchangeOrigin.status > 5">交換取消</button>
                <div class="gap-2 d-flex align-items-center">
                    <label class="label-text">請求終了月</label>
                    <Datepicker class="w-[9rem] mx-auto" month-picker format="yyyy年MM月" v-model="exchangeDetail.beforeHistory.invoice_finish" :disabled="checkDisableByStatus('schedule_and_results')"></Datepicker>
                </div>
                <button class="btn w-[8rem]" @click="update()">情報保存</button>
            </div>
            <div class="d-flex basis-[50%] justify-content-center">
                <button class="btn w-[9rem]" @click="complete()" :disabled="exchangeOrigin.status != 14">完了登録</button>
            </div>
        </div>
    </div>

    <ContactInformationModal v-if="isOpenContactInformation" :show="isOpenContactInformation" @close="isOpenContactInformation = false"></ContactInformationModal>

    <MSContactSettingModal v-if="isOpenMSContactSetting"
        :show="isOpenMSContactSetting"
        :ids="[exchangeDetail.id]"
        @close="onCloseMS($event)"></MSContactSettingModal>

    <ShippingInstructionsModal v-if="isOpenShippingInstructions" :show="isOpenShippingInstructions" @close="isOpenShippingInstructions = false"></ShippingInstructionsModal>

    <ConfirmModal ref="confirmDialog"></ConfirmModal>

    <ShipmentModal
        v-if="isOpenShippingModal"
        :show="isOpenShippingModal"
        :ids="shipmentIds"
        :data="shipmentData"
        @close="isOpenShippingModal = false"
        @reload="reloadShipment()"></ShipmentModal>
    
    <FacilitySelectionModal
        v-if="isOpenFacilitySelection"
        :show="isOpenFacilitySelection"
        :contract="contract"
        @close="isOpenFacilitySelection = false"
        @load="loadContract($event)"></FacilitySelectionModal>
    
    <DestinationSelectionModal
        v-if="isOpenDestinationSelection"
        :show="isOpenDestinationSelection"
        :facility="pumpFacility"
        :destination="pumpDestination"
        :rent="true"
        @close="onCloseDestinationSelection()"
        @load="loadDestination($event)"></DestinationSelectionModal>
</template>
<style scoped>
    .bt-table td {
        border-top: var(--border-table);
    }
    .t-border td {
        padding: 1px;
    }

    .t-border.fit tr>td:first-child:first-child {
        width: 7.5rem;
    } 
</style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex"
import ContactInformationModal from '@/views/Achievement/modal/schedule/ContactInformationModal.vue'
import MSContactSettingModal from '@/views/Exchange/modal/MSContactSettingModal.vue'
import ShippingInstructionsModal from '@/views/RentManagement/modal/ShippingInstructionsModal.vue'
import FacilitySelectionModal from "@/views/RentManagement/modal/FacilitySelectionModal.vue"
import DestinationSelectionModal from "@/views/RentManagement/modal/DestinationSelectionModal.vue"
import ShipmentModal from "@/views/commons/ShipmentModal.vue"
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue"
import jp from '@/lang/jp.json'
import { formatBeforeRequest, dateToMonth, deepClone, typeText, displayDate } from '@/helper.js'
</script>
<script>
export default {
    props: ['ids', 'id'],
    data: function () {
        return {
            day: null,
            settings: [],
            isOpenContactInformation: false,
            isOpenMSContactSetting: false,
            isOpenShippingInstructions: false,
            isOpenShippingModal: false,
            isOpenFacilitySelection: false,
            isOpenDestinationSelection: false,
            isOpenMakerReport: false,
            exchangeDetail: {
                beforeHistory: {},
                afterHistory: {},
                shipment: {},
                pumpFacility: {},
                destination: {},
            },
            exchangeOrigin: {
                beforeHistory: {},
                afterHistory: {},
                shipment: {},
                pumpFacility: {},
                destination: {},
            },
            detailId: null,
            status_list: [],
            back_flag: false,
            shipmentIds: [],
            input_group: {
                contact_ms: [
                    'ms_remarks',
                    'ms_send_text',
                ],
                plan: [
                    'plan_make_set', 'real_make_set',
                    'plan_send_ms', 'real_send_ms',
                    'plan_send_fac', 'real_send_fac',
                    'plan_recv_exp', 'real_recv_exp',
                    'plan_send_deli', 'real_send_deli',
                ],
                schedule_and_results: [
                    'exc_remark1',
                    'exc_remark2',
                    'answer_mail_body',
                    'limit_change_date',
                    'hope_slip_date',
                    'answer_slip_date',
                    // 'beforeHistory.invoice_finish'
                ],
                shipping_instruction: [
                    'shipment.inst_date',
                    'shipment.des_postcode',
                    'shipment.des_address',
                    'shipment.des_name',
                    'shipment.fac_tel',
                    'shipment.from_shelf',
                    'shipment.decided_date',
                    'shipment.remarks',
                    'shipment.send_date',
                    // 'send_report_date',
                    // 'send_report_text',
                ],
                shipping_performance: [
                    'shipment.ship_date',
                    'shipment.serial_no',
                    'shipment.delivery_date',
                    'shipment.ship_qacode',
                    'afterHistory.invoice_start',
                ],
                consent: [
                    'agr_receive_date',
                    'agr_signed_date',
                    'agr_start_use',
                    'arg_invoice_start',
                    'afterHistory.serial_no',
                    'afterHistory.dateof_start',
                ],
                patient: [
                    'afterHistory.medical_record',
                    'afterHistory.patient_kj',
                    'afterHistory.patient_kn',
                    'afterHistory.patient_nm',
                    'afterHistory.patient_sex',
                    'arg_remarks',
                    'afterHistory.staff_wcheck',
                    'afterHistory.staff_pdfchk',
                    'afterHistory.des_clinic',
                    'afterHistory.des_doctor'
                ]
            },
            contract: {},
            pumpFacility: {},
            pumpDestination: {},
            shipmentData: {},
            beforeStatus: null,
        }
    },
    computed: {
        ...mapState(['fromFeature']),
        ...mapState({
            master: state => state.exchange.master,
            search_pr: state => state.achievement.search
        }),
    },
    methods: {
        ...mapActions('exchange', ['getExchange', 'updateReal', 'updateExchange', 'completeExchange', 'updateFacility', 'deleteExchange', 'checkUpdateExchange', 'exportPDF']),
        ...mapActions('facility', ['showPumpFacility']),
        ...mapMutations(['setTransitReloadParent', 'showErrorModal', 'setIsOpenTransitDetail', 'setFromFeature']),
        openContactInformation: function () {
            this.isOpenContactInformation = true;
        },
        openMSContactSetting: function () {
            this.isOpenMSContactSetting = true;
        },
        onCloseMS: function (event) {
            this.isOpenMSContactSetting = false
            console.log(event)
            if(event) {
                this.setExchangeDetail(event)
            }
        },
        openShippingInstructions: function () {
            this.isOpenShippingInstructions = true;
        },
        openMakerReport: async function () {
            let message = jp.exchange_maker_report_message 
            let info = [
                this.exchangeDetail.shipment?.serial_no ?? '',
                this.exchangeDetail.afterHistory?.patient_nm ?? '',
            ]
            message = message.replace(/%(\d+)/g, (_, n) => info[+n-1])
            const ok = await this.$refs.confirmDialog.show({
                title: jp.exchange_maker_report_title,
                message: message,
                okButton: '複製',
                cancelButton: 'キャンセル'
            })
            if(ok) {
                await this.$refs.confirmDialog.close()
                this.exchangeDetail.send_report_text = message.replace( /(<([^>]+)>)/ig, '')
            }
        },
        openFacilitySelection: function () {
            // this.isOpenFacilitySelection = true
            this.openDestinationSelection()
        },
        loadContract: function (event) {
            this.isOpenFacilitySelection = false
            this.contract = event
            this.pumpFacility = this.contract.pump_facility
            this.isOpenDestinationSelection = true
        },
        openDestinationSelection: async function () {
            await this.showPumpFacility(this.exchangeDetail.pumpFacility.smd_code).then((res) => {
                if(res && res.code == 200) {
                    this.pumpFacility = res.data
                    this.pumpDestination = this.exchangeDetail.destination
                    this.isOpenDestinationSelection = true
                }
            })
        },
        onCloseDestinationSelection: function () {
            this.isOpenDestinationSelection = false
            this.contract = {}
            this.pumpFacility = {}
            this.pumpDestination = {}
        },
        loadDestination: async function (event) {
            const ok = await this.$refs.confirmDialog.show({
                title: jp.confirm,
                message: jp.confirm_update_facility_for_exchange,
                cancelButton: "キャンセル",
                ok_class: ''
            })

            if(ok) {
                await this.$refs.confirmDialog.close()
                this.isOpenDestinationSelection = false
                this.pumpDestination = event
                let payload = {id: this.exchangeDetail.id, smd_code: this.pumpDestination.smd_code, des_code: this.pumpDestination.des_code}
                await this.updateFacility(payload).then((res) => {
                    if(res && res.code == 200) {
                        this.setExchangeDetail(res.data)
                    }
                })
            }
        },
        exportExchangePDF: async function () {
            let payload = { ids: [this.exchangeDetail.id] }
            let message = jp.exchange_guide_export_message
            let info = [
                payload.ids.length
            ]
            message = message.replace(/%(\d+)/g, (_, n) => info[+n-1])
            const ok = await this.$refs.confirmDialog.show({
                title: jp.exchange_guide_export_title,
                message: message,
                okButton: '出力',
                cancelButton: 'キャンセル'
            })
            
            if(ok) {
                await this.exportPDF(formatBeforeRequest(payload)).then((res) => {
                    if(res && res.code == 200) {
                        this.$refs.confirmDialog.close()
                    }
                })
            } else {
                await this.$refs.confirmDialog.close()
            }
        },
        createReceiptText: async function () {
            let message = jp.create_receipt_message 
            let info = [
                displayDate(this.exchangeDetail.hope_slip_date, '', 'MM月DD日'),
                displayDate(this.exchangeDetail.answer_slip_date, '', 'MM月DD日（ddd）'),
                this.exchangeDetail.destination?.exc_clinic ?? '',
                this.exchangeDetail.destination?.exc_doctor ?? '',
            ]
            message = message.replace(/%(\d+)/g, (_, n) => info[+n-1])
            const ok = await this.$refs.confirmDialog.show({
                title: jp.create_receipt_title,
                message: message,
                okButton: '複製',
                cancelButton: 'キャンセル'
            })
            if(ok) {
                await this.$refs.confirmDialog.close()
                this.exchangeDetail.answer_mail_body = message.replace( /(<([^>]+)>)/ig, '')
            }
        },
        createStatement: async function () {
            let message = jp.create_statement_message 
            let info = [
                this.exchangeDetail.shipment.serial_no ?? '',
                this.exchangeDetail.destination?.des_code_text ?? '',
                this.exchangeDetail.afterHistory.patient_nm ?? '',
            ]
            message = message.replace(/%(\d+)/g, (_, n) => info[+n-1])
            const ok = await this.$refs.confirmDialog.show({
                title: jp.create_statement_title,
                message: message,
                okButton: '複製',
                cancelButton: 'キャンセル'
            })
            if(ok) {
                await this.$refs.confirmDialog.close()
                this.exchangeDetail.shipment.remarks = message.replace( /(<([^>]+)>)/ig, '')
            }
        },
        copyMS: function () {
            navigator.clipboard.writeText(this.exchangeDetail.ms_send_text)
        },
        getExchangeDetail: async function (id) {
            await this.getExchange(id).then((res) => {
                if(res && res.code == 200) {
                    this.setExchangeDetail(res.data)
                }
            })
        },
        setExchangeDetail: function (data) {
            if(!data.pumpFacility) data.pumpFacility = {}
            if(!data.destination) data.destination = {}
            this.exchangeDetail = data

            this.exchangeDetail.beforeHistory.invoice_finish = dateToMonth(this.exchangeDetail.beforeHistory.invoice_finish)
            this.exchangeDetail.beforeHistory.invoice_start = dateToMonth(this.exchangeDetail.beforeHistory.invoice_start)
            this.exchangeDetail.afterHistory.invoice_finish = dateToMonth(this.exchangeDetail.afterHistory.invoice_finish)
            this.exchangeDetail.afterHistory.invoice_start = dateToMonth(this.exchangeDetail.afterHistory.invoice_start)
            this.exchangeDetail.arg_invoice_start = dateToMonth(this.exchangeDetail.arg_invoice_start)

            this.exchangeOrigin = deepClone(this.exchangeDetail)
            console.log(this.exchangeDetail)
            this.setStatusList()
            this.setSettings()
            this.beforeStatus = this.exchangeDetail.status
        },
        prev: async function () {
            for(let i = 0; i < this.ids.length; i++) {
                if(this.ids[i] == this.detailId) {
                    let index = i - 1
                    if(index == -1) index = this.ids.length - 1

                    this.detailId = this.ids[index]
                    this.getExchangeDetail(this.detailId)
                    break
                }
            }
        },
        next: async function () {
            for(let i = 0; i < this.ids.length; i++) {
                if(this.ids[i] == this.detailId) {
                    let index = i + 1
                    if(i == (this.ids.length - 1)) index = 0

                    this.detailId = this.ids[index]
                    this.getExchangeDetail(this.detailId)
                    break
                }
            }
        },
        setStatusList: function () {
            const status = this.exchangeOrigin.status
            switch (status) {
                case 0:
                    this.status_list = this.filterStatus([0])
                    break;
                case 1:
                    this.status_list = this.filterStatus([1])
                    break;
                case 2:
                    this.status_list = this.filterStatus([1, 2])
                    break;
                case 3:
                    this.status_list = this.filterStatus([2, 3])
                    break;
                case 4:
                    this.status_list = this.filterStatus([3, 4])
                    break;
                case 5:
                    this.status_list = this.filterStatus([4, 5])
                    break;
                case 6:
                    this.status_list = this.filterStatus([5, 6])
                    break;
                case 7:
                    this.status_list = this.filterStatus([5, 6, 7])
                    break;
                case 8:
                    this.status_list = this.filterStatus([5, 6, 7, 8, 9])
                    break
                case 9:
                    this.status_list = this.filterStatus([5, 6, 7, 8, 9])
                    break
                case 15:
                    this.status_list = this.filterStatus([15])
                    break;
                default:
                    this.status_list = this.filterStatus([10, 11, 12, 13, 14])
                    break
            }

            if([3, 4].includes(this.exchangeOrigin.shipment.status)) {
                this.status_list = this.filterStatus([10, 11, 12, 13, 14])
            }

            // this.status_list = this.filterStatus([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
        },
        filterStatus: function (ids) {
            let list = []
            for(const i in this.master.exchange_status) {
                if(ids.includes(this.master.exchange_status[i].id)) list.push(this.master.exchange_status[i])
            }
            return list
        },
        checkDisableByStatus: function (group) {
            switch (this.exchangeDetail.status) {
                case 0:
                    if([
                        'contact_ms',
                        'plan',
                        'schedule_and_results',
                        'shipping_instruction',
                        'shipping_performance',
                        'consent',
                        'patient',
                    ].includes(group)) return true
                    break;
                
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    if([
                        'shipping_instruction',
                        'shipping_performance',
                        'consent',
                    ].includes(group)) return true
                    break;
                    
                case 6:
                case 7:
                case 8:
                    if([
                        'shipping_performance',
                        'consent',
                    ].includes(group)) return true
                    break;

                case 9:
                case 10:
                    if([
                        'consent',
                    ].includes(group)) return true
                    break;

                case 11:
                case 12:
                case 13:
                case 14:
                    break;
                    
                case 15:
                    return true
                default:
                    break;
            }
            return false
        },
        rollbackOriginData: function (fields = []) {
            for(const index in fields) {
                var field = fields[index]
                if(field.match('shipment.')) {
                    field = fields[index].replace('shipment.', '')
                    this.exchangeDetail.shipment[field] = this.exchangeOrigin.shipment[field]
                } else if(field.match('afterHistory.')) {
                    field = fields[index].replace('afterHistory.', '')
                    this.exchangeDetail.afterHistory[field] = this.exchangeOrigin.afterHistory[field]
                } else if(field.match('beforeHistory.')) {
                    field = fields[index].replace('beforeHistory.', '')
                    this.exchangeDetail.beforeHistory[field] = this.exchangeOrigin.beforeHistory[field]
                } else {
                    this.exchangeDetail[field] = this.exchangeOrigin[field]
                }
            }
        },
        setSettings: function () {
            this.settings = [
                {
                    no: 1,
                    name: '案内一式作成',
                    setting_date: this.exchangeDetail.plan_make_set,
                    settingUpdate: (value) => {
                        this.exchangeDetail.plan_make_set = value
                    },
                    button: '作成済',
                    action: async () => {
                        await this.updateRealDate('real_make_set', 'plan_make_set')
                    },
                    implement_date: this.exchangeDetail.real_make_set,
                    implementUpdate: (value) => {
                        this.exchangeDetail.real_make_set = value
                    },
                    disabledSetting: false,
                    disabledImplement: false,
                    disabledButton: () => {
                        if(this.exchangeOrigin.status != 1 || !this.exchangeDetail.plan_make_set) return true
                        return false
                    },
                },
                {
                    no: 2,
                    name: 'MS事前連絡',
                    setting_date: this.exchangeDetail.plan_send_ms,
                    settingUpdate: (value) => {
                        this.exchangeDetail.plan_send_ms = value
                    },
                    button: '連絡済',
                    action: async () => {
                        await this.updateRealDate('real_send_ms', 'plan_send_ms')
                    },
                    implement_date: this.exchangeDetail.real_send_ms,
                    implementUpdate: (value) => {
                        this.exchangeDetail.real_send_ms = value
                    },
                    disabledSetting: false,
                    disabledImplement: false,
                    disabledButton: () => {
                        if(this.exchangeOrigin.status != 2 || !this.exchangeDetail.plan_send_ms) return true
                        return false
                    },
                },
                {
                    no: 3,
                    name: '施設案内FAX',
                    setting_date: this.exchangeDetail.plan_send_fac,
                    settingUpdate: (value) => {
                        this.exchangeDetail.plan_send_fac = value
                    },
                    button: '案内済',
                    action: async () => {
                        await this.updateRealDate('real_send_fac', 'plan_send_fac')
                    },
                    implement_date: this.exchangeDetail.real_send_fac,
                    implementUpdate: (value) => {
                        this.exchangeDetail.real_send_fac = value
                    },
                    disabledSetting: false,
                    disabledImplement: false,
                    disabledButton: () => {
                        if(this.exchangeOrigin.status != 3 || !this.exchangeDetail.plan_send_fac) return true
                        return false
                    },
                },
                {
                    no: 4,
                    name: '回答受信',
                    setting_date: this.exchangeDetail.plan_recv_exp,
                    settingUpdate: (value) => {
                        this.exchangeDetail.plan_recv_exp = value
                    },
                    button: '回答済',
                    action: async () => {
                        await this.updateRealDate('real_recv_exp', 'plan_recv_exp')
                    },
                    implement_date: this.exchangeDetail.real_recv_exp,
                    implementUpdate: (value) => {
                        this.exchangeDetail.real_recv_exp = value
                    },
                    disabledSetting: false,
                    disabledImplement: false,
                    disabledButton: () => {
                        if(this.exchangeOrigin.status != 4 || !this.exchangeDetail.plan_recv_exp) return true
                        return false
                    },
                },
                {
                    no: 5,
                    name: '納品連絡',
                    setting_date: this.exchangeDetail.plan_send_deli,
                    settingUpdate: (value) => {
                        this.exchangeDetail.plan_send_deli = value
                    },
                    button: '実施済',
                    action: async () => {
                        await this.updateRealDate('real_send_deli', 'plan_send_deli')
                    },
                    implement_date: this.exchangeDetail.real_send_deli,
                    implementUpdate: (value) => {
                        this.exchangeDetail.real_send_deli = value
                    },
                    disabledSetting: false,
                    disabledImplement: false,
                    disabledButton: () => {
                        if(this.exchangeOrigin.status != 5 || !this.exchangeDetail.plan_send_deli) return true
                        return false
                    },
                },
                {
                    no: 6,
                    name: '出荷指示実施',
                    setting_date: this.exchangeDetail.plan_inst_ymc,
                    settingUpdate: (value) => {
                        this.exchangeDetail.plan_inst_ymc = value
                    },
                    button: null,
                    implement_date: this.exchangeOrigin.shipment.inst_date,
                    implementUpdate: (value) => {
                        this.exchangeOrigin.shipment.inst_date = value
                    },
                    disabledSetting: false,
                    disabledImplement: true,
                    disabledButton: false,
                },
                {
                    no: 7,
                    name: '納品確認',
                    setting_date: this.exchangeDetail.shipment.decided_date,
                    settingUpdate: (value) => {
                        this.exchangeDetail.shipment.decided_date = value
                    },
                    button: null,
                    implement_date: this.exchangeOrigin.shipment.delivery_date,
                    implementUpdate: (value) => {
                        this.exchangeOrigin.shipment.delivery_date = value
                    },
                    disabledSetting: false,
                    disabledImplement: true,
                    disabledButton: false,
                },
                {
                    no: 8,
                    name: '回収進捗(使用停止日)',
                    setting_date: null,
                    settingUpdate: (value) => {
                        
                    },
                    button: null,
                    implement_date: null,
                    implementUpdate: (value) => {
                        
                    },
                    disabledSetting: false,
                    disabledImplement: false,
                    disabledButton: false,
                },
            ]
        },
        getDesShelf: function () {
            let list = this.master.des_shelf
            let need_first = this.exchangeDetail.destination?.exc_need_first ?? 0
            let cant_last = this.exchangeDetail.destination?.exc_cant_last ?? 0
            if(need_first) {
                list = list.filter((item) => {
                    return item.value.includes('1')
                })
            }

            if(cant_last) {
                list = list.filter((item) => {
                    return !item.value.includes('5')
                })
            }

            if(!this.exchangeDetail.afterHistory?.pump_code) {
                return list
            }
            
            return list.filter((item) => {
                return this.exchangeDetail.afterHistory.pump_code && item.value.includes(this.exchangeDetail.afterHistory.pump_code)
            })
        },
        updateRealDate: async function (real, plan_date) {
            if(!this.exchangeDetail[real]) {
                this.exchangeDetail[real] = new Date()
            }
            let payload = {id: this.exchangeDetail.id, real: real, real_date: this.exchangeDetail[real]}
            await this.updateReal(formatBeforeRequest(payload)).then((res) => {
                if(res && res.code == 200) {
                    this.setExchangeDetail(res.data)
                    this.setTransitReloadParent(true)
                    if(this.exchangeDetail.status == 6) {
                        this.setRemarks(true)
                    }
                }
            })
        },
        getPayload: function (exchange) {
            let payload = formatBeforeRequest({...exchange})
            payload.beforeHistory = formatBeforeRequest({...payload.beforeHistory})
            payload.afterHistory = formatBeforeRequest({...payload.afterHistory})
            payload.shipment = formatBeforeRequest({...payload.shipment})
            return payload
        },
        update: async function (showMessage=true) {
            let payload = this.getPayload(this.exchangeDetail)
            payload.back_flag = this.back_flag
            const res =  await this.updateExchange(payload).then((res) => {
                if(res && res.code == 200) {
                    this.setExchangeDetail(res.data)
                    if(showMessage) {
                        this.$refs.confirmDialog.show({
                            title: jp.notification_title,
                            message: jp.update_success_new_rent_message,
                            type: 1
                        })
                    }
                    this.setTransitReloadParent(true)
                    return true
                } else {
                    return false
                }
            })
            this.back_flag = false
            return res
        },
        checkUpdate: async function () {
            let payload = this.getPayload(this.exchangeDetail)
            payload.back_flag = this.back_flag
            const res =  await this.checkUpdateExchange(payload).then((res) => {
                if(res && res.code == 200) {
                    return true
                } else {
                    return false
                }
            })
            this.back_flag = false
            return res
        },
        openShippingModal: async function () {
            // if(this.exchangeDetail.shipment.decided_date) {
                // if(this.exchangeOrigin.status >= 6) {
                //     this.exchangeDetail.status = this.exchangeOrigin.status
                // }
                const status = this.exchangeDetail.status
                this.exchangeDetail.status = 6
                const res = await this.checkUpdate()
                this.exchangeDetail.status = status
                if(res) {
                    this.shipmentData.remarks = this.exchangeDetail.shipment.remarks
                    this.shipmentData.des_postcode = this.exchangeDetail.shipment.des_postcode
                    this.shipmentData.des_address = this.exchangeDetail.shipment.des_address
                    this.shipmentData.des_name = this.exchangeDetail.shipment.des_name
                    this.shipmentData.fac_tel = this.exchangeDetail.shipment.fac_tel
                    this.shipmentData.from_shelf = this.exchangeDetail.shipment.from_shelf
                    this.shipmentIds = []
                    this.shipmentIds.push(this.exchangeDetail.shipment.id)
                    this.isOpenShippingModal = true
                }
            // } else {
            //     this.showErrorModal('納品確認予定日を入力してください。')
            // }
        },
        reloadShipment: async function () {
            await this.getExchange(this.exchangeDetail.id).then((res) => {
                if(res && res.code == 200) {
                    let shipment_update = {
                            inst_type: res.data.shipment.inst_type,
                            from_shelf: res.data.shipment.from_shelf,
                            status: res.data.shipment.status,
                            pump_code: res.data.shipment.pump_code,
                            smd_code: res.data.shipment.smd_code,
                            patient_cd: res.data.shipment.patient_cd,
                            hist_no: res.data.shipment.hist_no,
                            des_postcode: res.data.shipment.des_postcode,
                            des_address: res.data.shipment.des_address,
                            des_clinic: res.data.shipment.des_clinic,
                            des_doctor: res.data.shipment.des_doctor,
                            des_name: res.data.shipment.des_name,
                            fac_name: res.data.shipment.fac_name,
                            fac_tel: res.data.shipment.fac_tel,
                            inst_date: res.data.shipment.inst_date,
                            inst_id: res.data.shipment.inst_id,
                            remarks: res.data.shipment.remarks,
                        }
                    // let afterHistory_update = {
                    //     inst_id: res.data.desHistory.inst_id,
                    // }

                    this.exchangeDetail.status = res.data.status
                    this.exchangeDetail.shipment = {...formatBeforeRequest(this.exchangeDetail.shipment), ...shipment_update}
                    // this.exchangeDetail.desHistory = {...formatBeforeRequest(this.exchangeDetail.desHistory), ...afterHistory_update}
                    this.setExchangeDetail(this.exchangeDetail)

                    this.setTransitReloadParent(true)
                }
            })
        },
        onChangeStatus: async function () {
            let rollback = true
            
            if([8, 9].includes(this.exchangeOrigin.status) && [0, 1, 2, 3, 4, 5, 6, 7].includes(this.exchangeDetail.status) && [0, 1, 2].includes(this.exchangeDetail.shipment.status)) {
                const ok = await this.$refs.confirmDialog.show({
                    title: jp.notification_title,
                    message: jp.confirm_back_rent_message.replace('?', typeText(this.master.exchange_status, this.exchangeDetail.status)),
                })
                await this.$refs.confirmDialog.close()
                if(ok) {
                    this.back_flag = true
                    this.update()
                } else {
                    rollback = false
                    this.exchangeDetail.status = this.beforeStatus
                }
            }

            if(rollback) {
                switch (this.exchangeDetail.status) {
                    case 0:
                        this.rollbackOriginData([
                            ...this.input_group.contact_ms,
                            ...this.input_group.plan,
                            ...this.input_group.schedule_and_results,
                            ...this.input_group.shipping_instruction,
                            ...this.input_group.shipping_performance,
                            ...this.input_group.consent,
                            ...this.input_group.patient,
                        ])
                        break
    
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        this.rollbackOriginData([
                            ...this.input_group.shipping_instruction,
                            ...this.input_group.shipping_performance,
                            ...this.input_group.consent,
                        ])
                        break
                
                    case 6:
                    case 7:
                    case 8:
                        this.rollbackOriginData([
                            ...this.input_group.shipping_performance,
                            ...this.input_group.consent,
                        ])
                        break
    
                    case 9:
                        this.rollbackOriginData([
                            ...this.input_group.consent,
                        ])
                        break
                        
                    case 10:
                        this.rollbackOriginData([
                            ...this.input_group.consent,
                        ])
                        break
    
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                        break
                        
                    default:
                        break
                }
            }

            this.beforeStatus = this.exchangeDetail.status
        },
        complete: async function () {
            let payload = this.getPayload(this.exchangeDetail)
            const res =  await this.completeExchange(payload).then((res) => {
                if(res && res.code == 200) {
                    this.setExchangeDetail(res.data)
                    this.$refs.confirmDialog.show({
                        title: jp.notification_title,
                        message: jp.update_success_new_rent_message,
                        type: 1
                    })
                    return true
                } else {
                    return false
                }
            })

            if(res) {
                    await this.$refs.confirmDialog.show({
                        title: jp.notification_title,
                        message: jp.update_success_new_rent_message,
                        type: 1
                    })
                    this.setFromFeature(true)
                    this.search_pr.sort = 'updated_at'
                    this.search_pr.sort_by = 'desc'
                    this.search_pr.pump_code = this.exchangeDetail.afterHistory.pump_code ?? 'A'
                    this.$router.push({ name: "AchievementIndex" })
                }
        },
        deleteItem: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: jp.confirm,
                message: jp.delete_data_message,
                cancelButton: "キャンセル",
                ok_class: ''
            })
            if(ok) {
                await this.$refs.confirmDialog.close()
                await this.deleteExchange(this.exchangeDetail.id).then((res) => {
                    if(res && res.code == 200) {
                        this.setTransitReloadParent(true)
                        this.setIsOpenTransitDetail()
                    }
                })
            }
        },
        setRemarks: function (ok) {
            return;
            if(ok || (this.exchangeDetail.shipment.decided_date && this.exchangeDetail.shipment.decided_date != this.exchangeOrigin.shipment.decided_date)) {
                let str = ''
                if(this.exchangeDetail.shipment.pump_code == 'A') {
                    str += '■『'+typeText(this.master.machines, this.exchangeDetail.shipment.pump_code, 'pump_cd', 'pump_nm_full')+'』です。'
                    str += '　■ご発注日；'+displayDate(this.exchangeDetail.ord_apply_date, '', 'YY/MM/DD')+'；'
                    str += '　ご希望納品日；'+displayDate(this.exchangeDetail.ord_deli_hope, '', 'YY/MM/DD')
                    str += '　■【患者様　ご入院'+displayDate(this.exchangeDetail.fac_enter_date, '', 'YY/MM/DD')+'；'
                    str += '　NJ；'+displayDate(this.exchangeDetail.tube_insert_date, '', 'YY/MM/DD')
                    str += '　PEG；'+displayDate(this.exchangeDetail.treatment_date, '', 'YY/MM/DD')
                    str += '　⇒　ご退院；'
                    str += displayDate(this.exchangeDetail.fac_leave_date, '', 'YY/MM/DD')+'予定】'
                } else {
                    str += '■『'+typeText(this.master.machines, this.exchangeDetail.shipment.pump_code, 'pump_cd', 'pump_nm_full')+'』です。'
                    str += '　■ご発注日；'+displayDate(this.exchangeDetail.ord_apply_date, '', 'YY/MM/DD')+'；'
                    str += '　ご希望納品日；'+displayDate(this.exchangeDetail.ord_deli_hope, '', 'YY/MM/DD')
                    str += '　■【患者様　ご入院'+displayDate(this.exchangeDetail.fac_enter_date, '', 'YY/MM/DD')+'；'
                    str += '　投与開始日；'+displayDate(this.exchangeDetail.treatment_date, '', 'YY/MM/DD')+'；'
                    str += '　⇒　ご退院；'
                    str += displayDate(this.exchangeDetail.fac_leave_date, '', 'YY/MM/DD')+'予定】'
                }

                this.exchangeDetail.shipment.remarks = str
            }
        },
    },
    created: async function () {
        await this.getExchangeDetail(this.id)
        this.detailId = this.id
        console.log('test')
    }
}
</script>