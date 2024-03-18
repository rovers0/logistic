<template>
    <div class="transit wrapper-scroll">
        <div class="parent-scroll">
            <div class="gap-3 px-2 d-flex view-scroll">
                <!-- left -->
                <div class="basis-[50%] d-flex flex-column gap-2">
                    <!-- group 1 -->
                    <div class="d-flex flex-column input-gap">
                        <!-- group1-title -->
                        <div class="d-flex justify-content-between align-items-center">
                            <label class="fw-bold">■ 施設と宛先情報</label>
                        </div>
        
                        <!-- group1-row1 -->
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[40%]">
                                <label class="w-[6.5rem]">DCFコード<span class="text-danger">※</span></label>
                                <input type="text" class="flex-1 text-center form-control" disabled :value="rent_detail.dcf_code">
                            </div>
                            <div class="d-flex align-items-center basis-[60%]">
                                <label class="w-[5.5rem]">施設名</label>
                                <input type="text" class="flex-1 form-control" v-model="rent_detail.fac_name" :disabled="checkDisableByStatus('')">
                                <button type="button" class="btn selection w-[6rem] ms-1" @click="openFacilitySelection()" :disabled="rent_detail.status >= 0">施設選択</button>
                            </div>
                        </div>
        
                        <!-- group1-row2 -->
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[40%]">
                                <label class="w-[6.5rem]">SMDコード<span class="text-danger">※</span></label>
                                <input type="text" class="flex-1 text-center form-control" disabled :value="rent_detail.smd_code">
                            </div>
                            <div class="d-flex align-items-center basis-[60%]">
                                <!-- <label class="w-[5.5rem]">宛先名<span class="text-danger">※</span></label> -->
                                <label class="w-[5.5rem]">宛先名</label>
                                <input type="text" class="w-[6rem] me-1 form-control text-center" disabled :value="rent_detail.des_code_text">
                                <input type="text" class="flex-1 form-control" v-model="rent_detail.des_clinic" :disabled="checkDisableByStatus('')">
                            </div>
                        </div>
        
                        <!-- group1-row3 -->
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[40%]">
                                <label class="w-[6.5rem] text-center label-text">患者コード<br>(自動)</label>
                                <input type="text" class="flex-1 text-center form-control" disabled :value="rent_detail.patient_cd ? rent_detail.patient_cd : 'X-PR-XXXX'">
                                <button type="button" class="btn selection ms-1" @click="openPatientSelection()" :disabled="!rent_detail.smd_code || rent_detail.status >= 0">選択</button>
                            </div>
                            <div class="d-flex align-items-center basis-[60%]">
                                <label class="w-[5.5rem]">担当者名<span class="text-danger">※</span></label>
                                <input type="text" class="flex-1 form-control" v-model="rent_detail.des_doctor" :disabled="checkDisableByStatus('')">
                                <button type="button" class="btn selection w-[6rem] ms-1" @click="openDestinationSelection()" :disabled="!rent_detail.smd_code || checkDisableByStatus('')">宛先選択</button>
                            </div>
                        </div>
        
                        <!-- group1-row4 -->
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center mr-4 basis-[40%]"></div>
                            <div class="d-flex basis-[60%] gap-3">
                                <div class="d-flex align-items-center basis-[55%]">
                                    <label class="w-[5.5rem]">電話番号</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="rent_detail.fac_tel" :disabled="checkDisableByStatus('')">
                                </div>
                                <div class="d-flex align-items-center basis-[45%]">
                                    <label class="w-[2.5rem]">FAX</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="rent_detail.fac_fax" :disabled="checkDisableByStatus('')">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- group 2 -->
                    <div class="d-flex flex-column input-gap">
                        <!-- group2-title -->
                        <div class="d-flex justify-content-between align-items-center">
                            <label class="fw-bold">■ プレ情報</label>
                        </div>

                        <!-- group2-row1 -->
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="w-[5.5rem]">受信日</label>
                                <Datepicker class="flex-1" v-model="rent_detail.pre_recive_date" :disabled="checkDisableByStatus(GROUP_PRE)"></Datepicker>
                            </div>
                            <div class="d-flex align-items-center basis-[38%]">
                                <label class="w-[7.5rem]">発注書受信期限</label>
                                <Datepicker class="flex-1" v-model="rent_detail.pre_limit_treatment" :disabled="checkDisableByStatus(GROUP_PRE)"></Datepicker>
                            </div>
                            <div class="flex-1 d-flex align-items-center justify-content-end">
                                <a href="javascript:void(0)" @click="openPreviewFacility()" class="disabled">プレ情報解析</a>
                            </div>
                        </div>

                        <!-- group2-row2 -->
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="w-[5.5rem]">納品希望日</label>
                                <Datepicker class="flex-1" v-model="rent_detail.pre_deli_hope" :disabled="checkDisableByStatus(GROUP_PRE)"></Datepicker>
                            </div>
                            <div class="d-flex align-items-center basis-[38%]">
                                <label class="w-[7.5rem]">使用開始日</label>
                                <Datepicker class="flex-1" v-model="rent_detail.pre_plan_start" :disabled="checkDisableByStatus(GROUP_PRE)"></Datepicker>
                            </div>
                            <div class="flex-1 d-flex align-items-center justify-content-end">
                            </div>
                        </div>
                    </div>
        
                    <!-- group 3 -->
                    <div class="d-flex flex-column input-gap">
                        <!-- group3-title -->
                        <div class="d-flex justify-content-between align-items-center">
                            <label class="fw-bold">■ 治療開始連絡票</label>
                            <a href="javascript:void(0)" class="text-link disabled">連絡票情報解析</a>
                        </div>
        
                        <!-- group3-row1 -->
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="w-[5.5rem]">申込受信日</label>
                                <Datepicker class="flex-1" v-model="rent_detail.treat_recive_date" :disabled="checkDisableByStatus(GROUP_TREAT)"></Datepicker>
                            </div>
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="w-[5.5rem]">提出日</label>
                                <Datepicker class="flex-1" v-model="rent_detail.treat_apply_date" :disabled="checkDisableByStatus(GROUP_TREAT)"></Datepicker>
                            </div>
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="w-[5.5rem]">入院予定日</label>
                                <Datepicker class="flex-1" v-model="rent_detail.fac_enter_date" :disabled="checkDisableByStatus(GROUP_TREAT)"></Datepicker>
                            </div>
                        </div>
        
                        <!-- group3-row2 -->
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="w-[5.5rem]">挿入予定日</label>
                                <Datepicker class="flex-1" v-model="rent_detail.tube_insert_date" :disabled="checkDisableByStatus(GROUP_TREAT)"></Datepicker>
                            </div>
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="w-[5.5rem]">施術予定日</label>
                                <Datepicker class="flex-1" v-model="rent_detail.treatment_date" :disabled="checkDisableByStatus(GROUP_TREAT)"></Datepicker>
                            </div>
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="w-[5.5rem]">退院予定日</label>
                                <Datepicker class="flex-1" v-model="rent_detail.fac_leave_date" :disabled="checkDisableByStatus(GROUP_TREAT)"></Datepicker>
                            </div>
                        </div>
        
                        <!-- group3-row3 -->
                        <div class="d-flex">
                            <label class="w-[5.5rem]">特記事項I</label>
                            <textarea class="flex-1 form-control" v-model="rent_detail.new_remark" :disabled="(!rent_detail.status && rent_detail.status != 0) || rent_detail.status == 20"></textarea>
                        </div>
                    </div>
        
                    <!-- group 4 -->
                    <div class="d-flex flex-column input-gap">
                        <!-- group4-title -->
                        <div class="d-flex justify-content-between align-items-center">
                            <label class="fw-bold">■ 発注書・受領書情報</label>
                            <div class="gap-2 d-flex">
                                <button type="button" class="btn selection" :disabled="isDisableReceiptText()" @click="openReceiptTextOutput()">受領書本文出力</button>
                                <button type="button" class="btn selection" :disabled="checkDisableByStatus(GROUP_ORD)" @click="openReceiptReport()">発注書受領報告</button>
                            </div>
                        </div>
        
                        <!-- group4-row1 -->
                        <div class="gap-2 d-flex">
                            <div class="d-flex align-items-center basis-[32%]">
                                <label class="w-[5.5rem]">受信日</label>
                                <Datepicker class="flex-1" v-model="rent_detail.ord_recive_date" :disabled="checkDisableByStatus(GROUP_ORD)"></Datepicker>
                            </div>
        
                            <div class="d-flex align-items-center basis-[32%]">
                                <label class="w-[5.5rem]">発注書日付</label>
                                <Datepicker class="flex-1" v-model="rent_detail.ord_apply_date" :disabled="checkDisableByStatus(GROUP_ORD)"></Datepicker>
                            </div>
        
                            <div class="d-flex align-items-center basis-[36%]">
                                <label class="w-[7.5rem]">回答納品日</label>
                                <Datepicker class="flex-1" v-model="rent_detail.date_reply_plan" :disabled="checkDisableByStatus(GROUP_ORD)"></Datepicker>
                            </div>
                        </div>
        
                        <!-- group4-row2 -->
                        <div class="gap-2 d-flex">
                            <div class="d-flex align-items-center basis-[32%]">
                                <label class="w-[5.5rem]">納品希望日</label>
                                <Datepicker class="flex-1" v-model="rent_detail.ord_deli_hope" :disabled="checkDisableByStatus(GROUP_ORD)"></Datepicker>
                            </div>
        
                            <div class="d-flex align-items-center basis-[32%]">
                                <label class="w-[5.5rem]">使用開始日</label>
                                <Datepicker class="flex-1" v-model="rent_detail.ord_start_use" :disabled="checkDisableByStatus(GROUP_ORD)"></Datepicker>
                            </div>
        
                            <div class="d-flex align-items-center basis-[36%]">
                                <label class="w-[7.5rem]">受領書FAX日</label>
                                <Datepicker class="flex-1" v-model="rent_detail.date_send_fax" :disabled="checkDisableByStatus(GROUP_ORD) || rent_detail.status < 2"></Datepicker>
                            </div>
                        </div>
        
                        <!-- group4-row3 -->
                        <div class="gap-2 d-flex">
                            <div class="d-flex align-items-center basis-[32%]">
                                <label class="w-[5.5rem]">請求開始月</label>
                                <Datepicker class="flex-1" v-model="rent_detail.plan_invoice_start" month-picker format="yyyy年MM月" :disabled="checkDisableByStatus(GROUP_ORD)"></Datepicker>
                            </div>
        
                            <div class="d-flex align-items-center basis-[32%]">
                            </div>
                            <div class="d-flex align-items-center basis-[36%]">
                                <label class="w-[7.5rem]">アッヴィ報告日</label>
                                <Datepicker class="flex-1" v-model="rent_detail.date_send_report" :disabled="checkDisableByStatus(GROUP_ORD) || rent_detail.status < 2"></Datepicker>
                            </div>
                        </div>
        
                        <!-- group4-row4 -->
                        <div class="d-flex">
                            <label class="w-[5.5rem]">備考</label>
                            <textarea class="flex-1 form-control" v-model="rent_detail.form_text" :disabled="!rent_detail.status || rent_detail.status == 0 || rent_detail.status == 20"></textarea>
                        </div>
                    </div>
                </div>
        
                <!-- right -->
                <div class="basis-[50%] d-flex flex-column gap-2">
                    <!-- group 5 -->
                    <div class="d-flex flex-column input-gap">
                        <!-- group5-title -->
                        <div class="d-flex justify-content-between">
                            <label class="fw-bold">■ 出荷指示管理</label>
                        </div>
        
                        <!-- group5-row1 -->
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="w-[5.5rem]">出荷予定日</label>
                                <Datepicker class="flex-1" v-model="rent_detail.shipment.plan_date" :disabled="checkDisableByStatus(GROUP_SHIPMENT)"></Datepicker>
                            </div>
        
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="w-[5.5rem]">出荷指示日</label>
                                <Datepicker class="flex-1" v-model="rent_detail.shipment.inst_date" :disabled="checkDisableByStatus(GROUP_SHIPMENT)"></Datepicker>
                            </div>

                            <div class="d-flex align-items-center basis-1/3">
                                <label class="w-[5.5rem]">指示送信日</label>
                                <Datepicker class="flex-1" v-model="rent_detail.shipment.send_date" :disabled="checkDisableByStatus(GROUP_SHIPMENT) || rent_detail.status < 8"></Datepicker>
                            </div>
                        </div>
        
                        <!-- group5-row2 -->
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[40%]">
                                <label class="w-[5.5rem]">指示NO.</label>
                                <input type="text" class="flex-1 text-center form-control" disabled :value="rent_detail.shipment.inst_id || '-'">
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
                                    <input type="text" class="w-[8rem] me-2 form-control text-center" v-model="rent_detail.shipment.des_postcode" :disabled="checkDisableByStatus(GROUP_SHIPMENT)" maxlength="8">
                                    <input type="text" class="flex-1 form-control" v-model="rent_detail.shipment.des_address" :disabled="checkDisableByStatus(GROUP_SHIPMENT)">
                                </div>
        
                                <div class="d-flex align-items-center">
                                    <label class="w-[5.5rem]">届け先名称</label>
                                    <input type="text" class="flex-1 form-control" v-model="rent_detail.shipment.des_name" :disabled="checkDisableByStatus(GROUP_SHIPMENT)">
                                </div>
                            </div>
                            <button class="btn default w-[7rem]" @click="openShippingModal()" :disabled="checkDisableByStatus(GROUP_SHIPMENT)">出荷情報<br>確定画面</button>
                        </div>
        
                        <!-- group5-row5 -->
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[35%]">
                                <label class="w-[5.5rem]">電話番号</label>
                                <input type="text" class="flex-1 text-center form-control" v-model="rent_detail.shipment.fac_tel" :disabled="checkDisableByStatus(GROUP_SHIPMENT)">
                            </div>
        
                            <div class="d-flex align-items-center basis-[30%]">
                                <label class="w-[5rem]">棚コード</label>
                                <select class="flex-1 form-select" v-model="rent_detail.shipment.from_shelf" :disabled="checkDisableByStatus(GROUP_SHIPMENT)">
                                    <option v-for="shelf in getDesShelf()" :value="shelf.id">{{ shelf.value }}</option>
                                </select>
                            </div>
        
                            <div class="d-flex align-items-center basis-[35%]">
                                <label class="w-[5.5rem]">配達指定日</label>
                                <Datepicker class="flex-1" v-model="rent_detail.shipment.decided_date" :disabled="checkDisableByStatus(GROUP_SHIPMENT)" @update:model-value="setRemarks()"></Datepicker>
                            </div>
                        </div>
        
                        <!-- group5-row6 -->
                        <div class="d-flex align-items-center">
                            <textarea class="form-control" v-model="rent_detail.shipment.remarks" :disabled="!rent_detail.status || rent_detail.status < 6 || rent_detail.status == 20"></textarea>
                        </div>
                    </div>
        
                    <!-- group 6 -->
                    <div class="d-flex flex-column input-gap">
                        <!-- group6-title -->
                        <div class="d-flex justify-content-between align-items-center">
                            <label class="label-text fw-bold">■ 出荷実績情報</label>
                            <div class="gap-3 d-flex">
                                <a href="javascript:void(0)" :class="{'disabled': rent_detail.status == 20 || rent_detail.status < 9}" @click="openMakerReport()">メーカー報告文書</a>
                                <a href="javascript:void(0)" class="disabled">配達追跡ページへ</a>
                            </div>
                        </div>
        
                        <!-- group6-row1 -->
                        <div class="gap-3 d-flex">
                            <div class="gap-3 d-flex basis-2/3">
                                <div class="d-flex align-items-center basis-[50%]">
                                    <label class="label-text w-[5.5rem]">出荷実施日</label>
                                    <Datepicker class="flex-1" v-model="rent_detail.shipment.ship_date" :disabled="checkDisableByStatus(GROUP_INST)"></Datepicker>
                                </div>
                                <div class="d-flex align-items-center basis-[50%]">
                                    
                                </div>
                            </div>
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="label-text w-[6rem]">シリアルNo.</label>
                                <input type="text" class="flex-1 form-control"  v-model="rent_detail.shipment.serial_no" :disabled="checkDisableByStatus(GROUP_INST)">
                            </div>
                        </div>
        
                        <!-- group6-row2 -->
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-2/3">
                                <label class="label-text w-[5.5rem]">問合せ番号</label>
                                <input type="text" class="flex-1 form-control" v-model="rent_detail.shipment.ship_qacode" :disabled="checkDisableByStatus(GROUP_INST)">
                            </div>
                            <div class="d-flex align-items-center basis-1/3">
                                <label class="label-text w-[6rem]">配達完了日</label>
                                <Datepicker class="flex-1" v-model="rent_detail.shipment.delivery_date" :disabled="checkDisableByStatus(GROUP_INST) || rent_detail.status < 10"></Datepicker>
                            </div>
                        </div>
        
                        <!-- group6-row3 -->
                        <div class="d-flex">
                            <div class="w-[5.5rem]">
                                <label class="text-center label-text">アッヴィ様<br>報告</label>
                            </div>
                            <textarea class="flex-1 form-control" v-model="rent_detail.maker_report_text" :disabled="!rent_detail.status || rent_detail.status < 9 || rent_detail.status == 20"></textarea>
                        </div>
                    </div>
        
                    <div class="gap-3 d-flex">
                        <!-- group 7 -->
                        <div class="basis-[40%] d-flex flex-column input-gap">
                            <!-- group7-title -->
                            <div class="d-flex justify-content-between align-items-center">
                                <label class="fw-bold">■ 同意書情報</label>
                            </div>

                            <!-- group7-row1 -->
                            <table class="t-border">
                                <tbody>
                                    <tr class="text-center bt-table">
                                        <td>受信日</td>
                                        <td>
                                            <Datepicker class="flex-1" v-model="rent_detail.agr_recive_date" :disabled="checkDisableByStatus(GROUP_ARG)"></Datepicker>
                                        </td>
                                    </tr>
                                    <tr class="text-center">
                                        <td>署名日</td>
                                        <td>
                                            <Datepicker class="flex-1" v-model="rent_detail.agr_signed_date" :disabled="checkDisableByStatus(GROUP_ARG)"></Datepicker>
                                        </td>
                                    </tr>
                                    <tr class="text-center">
                                        <td>使用開始日</td>
                                        <td>
                                            <Datepicker class="flex-1" v-model="rent_detail.agr_start_use" :disabled="checkDisableByStatus(GROUP_ARG)"></Datepicker>
                                        </td>
                                    </tr>
                                    <tr class="text-center">
                                        <td>請求開始月</td>
                                        <td>
                                            <Datepicker class="flex-1" month-picker format="yyyy年MM月" v-model="rent_detail.arg_invoice_start" :disabled="checkDisableByStatus(GROUP_ARG)"></Datepicker>
                                        </td>
                                    </tr>
                                    <tr class="text-center">
                                        <td>シリアルNo.</td>
                                        <td>
                                            <input type="text" class="form-control"  v-model="rent_detail.patientHistory.serial_no" :disabled="checkDisableByStatus(GROUP_ARG)">
                                        </td>
                                    </tr>
                                    <tr class="text-center">
                                        <td>アッヴィ<br>使用開始</td>
                                        <td>
                                            <Datepicker class="flex-1" v-model="rent_detail.patientHistory.dateof_start" :disabled="!rent_detail.status && rent_detail.status != 0 || rent_detail.status == 20"></Datepicker>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <!-- group 8 -->
                        <div class="basis-[60%] d-flex flex-column input-gap">
                            <!-- group8-title -->
                            <div class="d-flex justify-content-between">
                                <label class="fw-bold">■ 患者情報</label>
                                <div class="d-flex gap-3 basis-[70%]">
                                    <div class="d-flex align-items-center basis-[70%]">
                                        <label class="label-text w-[5.5rem]">患者コード</label>
                                        <input type="text" class="flex-1 text-center form-control" :value="rent_detail.patientHistory.patient_cd" disabled>
                                    </div>
                                    <div class="d-flex align-items-center basis-[30%]">
                                        <label class="label-text w-[2.5rem]">枝番</label>
                                        <input type="text" class="flex-1 text-center form-control" :value="rent_detail.patientHistory.hist_no" disabled>
                                    </div>
                                </div>
                            </div>

                            <!-- group8-row1 -->
                            <div class="d-flex align-items-center">
                                <label class="label-text w-[7.5rem]">患者カルテ番号</label>
                                <input type="text" class="flex-1 form-control" v-model="rent_detail.patientHistory.medical_record" :disabled="checkDisableByStatus(GROUP_PATIENT)">
                            </div>

                            <!-- group8-row2 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[50%]">
                                    <label class="label-text w-[4rem]">患者名</label>
                                    <input type="text" class="flex-1 form-control" v-model="rent_detail.patientHistory.patient_kj" :disabled="checkDisableByStatus(GROUP_PATIENT)">
                                </div>
                                <div class="d-flex align-items-center basis-[50%]">
                                    <label class="label-text w-[5.5rem]">患者名カナ</label>
                                    <input type="text" class="flex-1 form-control" v-model="rent_detail.patientHistory.patient_kn" :disabled="checkDisableByStatus(GROUP_PATIENT)">
                                </div>
                            </div>

                            <!-- group8-row3 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[60%]">
                                    <label class="label-text w-[9rem]">患者名(イニシャル)</label>
                                    <input type="text" class="flex-1 form-control" v-model="rent_detail.patientHistory.patient_nm" :disabled="checkDisableByStatus(GROUP_PATIENT)">
                                </div>
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[3rem]">性別</label>
                                    <select class="flex-1 form-select" v-model="rent_detail.patientHistory.patient_sex" :disabled="checkDisableByStatus(GROUP_PATIENT)">
                                        <option v-for="item in master.sex" :value="item.id">{{ item.value }}</option>
                                    </select>
                                </div>
                            </div>

                            <!-- group8-row4 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[50%]">
                                    <label class="label-text w-[5rem]">診療科名</label>
                                    <input type="text" class="flex-1 form-control" v-model="rent_detail.patientHistory.des_clinic" :disabled="checkDisableByStatus(GROUP_PATIENT)">
                                </div>
                                <div class="d-flex align-items-center basis-[50%]">
                                    <label class="label-text w-[4rem]">医師名</label>
                                    <input type="text" class="flex-1 form-control" v-model="rent_detail.patientHistory.des_doctor" :disabled="checkDisableByStatus(GROUP_PATIENT)">
                                </div>
                            </div>

                            <!-- group8-row5 -->
                            <div class="d-flex">
                                <label class="label-text w-[4rem]">備考</label>
                                <textarea class="flex-1 form-control" v-model="rent_detail.arg_remarks" :disabled="!rent_detail.status && rent_detail.status != 0 || rent_detail.status == 20"></textarea>
                            </div>

                            <!-- group8-row6 -->
                            <div class="d-flex align-items-center">
                                <label class="label-text w-[4rem]">入力者</label>
                                <select class="flex-1 form-select" v-model="rent_detail.patientHistory.staff_pdfchk" :disabled="checkDisableByStatus(GROUP_PATIENT)">
                                    <option :value="null"></option>
                                    <option v-for="user in master.users" :value="user.userid">{{ user.username }}</option>
                                </select>
                            </div>

                            <!-- group8-row7 -->
                            <div class="d-flex align-items-center">
                                <label class="label-text w-[4rem]">確認者</label>
                                <select class="flex-1 form-select" v-model="rent_detail.patientHistory.staff_wcheck" :disabled="checkDisableByStatus(GROUP_PATIENT)">
                                    <option :value="null"></option>
                                    <option v-for="user in master.users" :value="user.userid">{{ user.username }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="pt-2 pb-1 d-flex justify-content-between align-items-center">
            <a href="javascript:void(0)" class="text-link disabled" style="width: 13rem;">連絡情報記録・参照</a>
            <button class="btn" style="width: 13rem;" v-if="!(rent_detail.status >= 0)" :disabled="!regis_valid && !rent_detail.status" @click="regis()">新規貸出登録</button>
            <div class="gap-2 d-flex align-items-center" v-else v-if="rent_origin.status < 14">
                <label class="label-text">状態</label>
                <select class="form-select" v-model="rent_detail.status" @change="onChangeStatus()">
                    <option v-for="st in status_list" :value="st.id">{{ st.value }}</option>
                </select>
            </div>
            <button class="btn delete w-[10rem]" @click="isOpenDeleteOption = true" :disabled="(!rent_detail.status && rent_detail.status != 0) || rent_detail.shipment.status > 2" :class="{'d-none': !isDeleteButton}">削除</button>
            <button class="btn" style="width: 10rem;" @click="update()" :disabled="(!rent_detail.status && rent_detail.status != 0) || rent_detail.status == 20">情報保存</button>
            <button class="btn" style="width: 10rem;" @click="complete()" :disabled="isDisableComplete() || rent_origin.status == 14">完了登録</button>
            <div style="width: 13rem;"></div>
        </div>
    </div>
    
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
        @close="isOpenDestinationSelection = false"
        @load="loadDestination($event)"></DestinationSelectionModal>
    
    <PatientSelectionModal
        v-if="isOpenPatientSelection"
        :show="isOpenPatientSelection"
        :pump_code="pump_code"
        @close="isOpenPatientSelection = false"
        @load="loadPatient($event)"></PatientSelectionModal>

    <ConfirmModal ref="confirmDialog"></ConfirmModal>

    <ReceiptReportModal
        v-if="isOpenReceiptReport"
        :show="isOpenReceiptReport"
        :rent="rent_detail"
        @close="isOpenReceiptReport = false"></ReceiptReportModal>

    <ReceiptTextOutputModal
        v-if="isOpenReceiptTextOutput"
        :show="isOpenReceiptTextOutput"
        :rent="rent_detail"
        @close="isOpenReceiptTextOutput = false"
        @paste="rent_detail.form_text = $event; isOpenReceiptTextOutput = false"></ReceiptTextOutputModal>

    <MakerReportModal
        v-if="isOpenMakerReport"
        :show="isOpenMakerReport"
        :rent="rent_detail"
        @close="isOpenMakerReport = false"
        @paste="rent_detail.maker_report_text = $event; isOpenMakerReport = false"></MakerReportModal>

    <!-- <ShippingInstructionsModal
        v-if="isOpenShippingModal"
        :show="isOpenShippingModal"
        :ids="ids"
        @close="isOpenShippingModal = false"
        @reload="reloadShipment()"></ShippingInstructionsModal> -->

    <ShipmentModal
        v-if="isOpenShippingModal"
        :show="isOpenShippingModal"
        :ids="ids"
        :data="shipmentData"
        @close="isOpenShippingModal = false"
        @reload="reloadShipment()"></ShipmentModal>

    <DeleteOptionModal
        v-if="isOpenDeleteOption"
        :show="isOpenDeleteOption"
        @close="isOpenDeleteOption = false"
        @confirm="deleteItem($event)"></DeleteOptionModal>
</template>
<style scoped>
    .bt-table td {
        border-top: var(--border-table);
    }
    .t-border td {
        padding: 1px;
    }
    .t-border tr>td:first-child:first-child {
        width: 7rem;
    } 
</style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
import FacilitySelectionModal from "./modal/FacilitySelectionModal.vue";
import DestinationSelectionModal from "./modal/DestinationSelectionModal.vue";
import PatientSelectionModal from "./modal/PatientSelectionModal.vue";
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue";
import ReceiptReportModal from "./modal/ReceiptReportModal.vue";
import ReceiptTextOutputModal from "./modal/ReceiptTextOutputModal.vue";
import MakerReportModal from "./modal/MakerReportModal.vue";
import DeleteOptionModal from "./modal/DeleteOptionModal.vue";
import ShippingInstructionsModal from "./modal/ShippingInstructionsModal.vue";
import ShipmentModal from "@/views/commons/ShipmentModal.vue";
import { RENT_REGIS_SCHEMA } from '@/validation/schema.js'
import { formatBeforeRequest, dateToMonth, deepClone, typeText, displayDate } from '@/helper.js';
import jp from '@/lang/jp.json';
import { GROUP_PRE, GROUP_TREAT, GROUP_ORD, GROUP_SHIPMENT, GROUP_INST, GROUP_ARG, GROUP_PATIENT } from '@/components/Constants.vue';

</script>
<script>
export default {
    props: ['rent'],
    emits: [],
    data: function () {
        return {
            isOpenFacilitySelection: false,
            isOpenDestinationSelection: false,
            isOpenPatientSelection: false,
            isOpenReceiptReport: false,
            isOpenReceiptTextOutput: false,
            isOpenMakerReport: false,
            isOpenShippingModal: false,
            isOpenDeleteOption: false,
            ids: [],
            contract: {},
            pumpFacility: {},
            pumpDestination: {},
            rent_detail: {
                mapFacility: function (ob) {
                    this.dcf_code = ob.dcf_code
                    this.smd_code = ob.smd_code
                    this.fac_name = ob.fac_name
                },
                mapDestination: function (ob) {
                    this.des_code      = ob.des_code
                    this.des_code_text = ob.des_code_text
                    this.des_clinic    = ob.des_clinic
                    this.des_doctor    = ob.des_doctor ? ob.des_doctor +' '+(ob.des_title ?? '') : ''
                    this.fac_tel       = ob.des_tel
                    this.fac_fax       = ob.des_fax
                },
                resetDestination: function () {
                    this.des_code      = null
                    this.des_code_text = null
                    this.des_clinic    = null
                    this.des_doctor    = null
                    this.fac_tel       = null
                    this.fac_fax       = null
                },
                shipment: {},
                patientHistory: {}
            },
            rent_origin: {},
            regis_valid: false,
            input_group: {
                group_facility: ['fac_name', 'fac_tel', 'fac_fax', 'des_code', 'des_clinic', 'des_doctor'],
                group_pre: ['pre_recive_date', 'pre_limit_treatment', 'pre_deli_hope', 'pre_plan_start'],
                group_treat: [
                    'treat_recive_date', 'treat_apply_date', 'fac_enter_date',
                    'tube_insert_date', 'treatment_date', 'fac_leave_date','new_remark'
                ],
                group_ord: [
                    'ord_recive_date', 'ord_apply_date', 'date_reply_plan', 'ord_deli_hope',
                    'ord_start_use', 'plan_invoice_start', 'date_send_report', 'date_send_fax', 'form_text'
                ],
                group_shipment: [
                    'shipment.plan_date', 'shipment.inst_date', 'shipment.send_date', 'shipment.des_postcode',
                    'shipment.des_address', 'shipment.des_name', 'shipment.fac_tel', 'shipment.from_shelf',
                    'shipment.decided_date', 'shipment.remarks',
                ],
                group_inst: [
                    'shipment.ship_date', 'shipment.serial_no', 'shipment.ship_qacode',
                    'shipment.delivery_date', 'maker_report_text'
                ],
                group_arg: ['agr_recive_date', 'agr_signed_date', 'agr_start_use', 'arg_invoice_start', 'patientHistory.serial_no',],
                group_patient: [
                    'patientHistory.medical_record', 'patientHistory.patient_kj', 'patientHistory.patient_kn',
                    'patientHistory.patient_nm', 'patientHistory.patient_sex', 'arg_remarks', 'patientHistory.staff_wcheck',
                    'patientHistory.staff_pdfchk',
                    'patientHistory.des_clinic', 'patientHistory.des_doctor', 'patientHistory.dateof_start'
                ],
                group_not_yet_fax: ['date_send_report', 'date_send_fax'],
                group_not_yet_send_date: ['shipment.send_date'],
                group_not_yet_delivery_date: ['shipment.delivery_date'],
            },
            status_list: [],
            back_flag: false,
            pump_code: null,
            shipmentData: {},
            beforeStatus: null,
        }
    },
    computed: {
        ...mapState({
            master: state => state.rent.master,
            search: state => state.achievement.search
        }),
        ...mapState(['isDeleteButton', 'fromFeature'])
    },
    watch: {
        'rent_detail': {
            deep: true,
            handler: async function () {
                await RENT_REGIS_SCHEMA.validate(this.rent_detail).then(() => {
                    this.regis_valid = true
                }).catch(() => {
                    this.regis_valid = false
                })
            }
        }
    },
    methods: {
        ...mapActions('rent', ['storeRent', 'updateRent', 'getDetailRent', 'completeRent', 'deleteRent', 'checkUpdateRent', 'checkStopping']),
        ...mapMutations('rent', ['setContracts', 'setPumpCode']),
        ...mapMutations(['setTransitReloadParent', 'showErrorModal', 'setIsOpenTransitDetail', 'setDeleteButton', 'setFromFeature']),
        ...mapMutations('achievement', ['resetSearch']),
        ...mapMutations('patient', ['setPatients']),
        openFacilitySelection: function () {
            this.isOpenFacilitySelection = true
        },
        loadContract: function (event) {
            this.isOpenFacilitySelection = false
            this.contract = event
            this.pumpFacility = this.contract.pump_facility
            this.rent_detail.mapFacility(this.pumpFacility)
            this.rent_detail.agr_pump_code = this.contract.pump
            this.setPumpCode(this.rent_detail.agr_pump_code)
            if(this.pump_code != this.contract.pump) {
                this.rent_detail.patient_cd = null
                this.pump_code = this.contract.pump
                this.setPatients([])
            }
            this.pumpDestination = {}
            this.rent_detail.resetDestination()
        },
        openDestinationSelection: function () {
            this.isOpenDestinationSelection = true
        },
        loadDestination: function (event) {
            this.isOpenDestinationSelection = false
            this.pumpDestination = event
            this.rent_detail.mapDestination(this.pumpDestination)
            this.rent_detail.new_remark = event.des_remark1
        },
        openPatientSelection: function () {
            this.isOpenPatientSelection = true
        },
        loadPatient: function (event) {
            console.log(event)
            this.isOpenPatientSelection = false
            this.rent_detail.patient_cd = event.patient_cd
        },
        openReceiptReport: function () {
            this.isOpenReceiptReport = true
        },
        openReceiptTextOutput: function () {
            this.isOpenReceiptTextOutput = true
        },
        openMakerReport: function () {
            this.isOpenMakerReport = true
        },
        openShippingModal: async function () {
            // if(this.rent_detail.shipment.decided_date && this.rent_detail.shipment.des_address && this.rent_detail.shipment.des_name) {
                // if(this.rent_origin.status >= 6) {
                //     this.rent_detail.status = this.rent_origin.status
                // }
                const status = this.rent_detail.status
                this.rent_detail.status = 6
                const res = await this.checkUpdate()
                this.rent_detail.status = status
                if(res) {
                    this.shipmentData.remarks = this.rent_detail.shipment.remarks
                    this.ids = []
                    this.ids.push(this.rent_detail.shipment.id) 
                    this.isOpenShippingModal = true
                }
            // } else {
            //     this.showErrorModal('届け先名称や届け先住所や配達指定日が未入力です。これらの情報を入力してください。')
            // }
        },
        reloadShipment: async function () {
            await this.getDetailRent(this.rent_detail.id).then((res) => {
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
                    let patientHistory_update = {
                        inst_id: res.data.patientHistory.inst_id,
                    }

                    if(this.rent_detail.shipment.status != res.data.shipment.status) {
                        this.rent_detail.status = res.data.status
                        this.onChangeStatus()
                    }
                    this.rent_detail.shipment = {...formatBeforeRequest(this.rent_detail.shipment), ...shipment_update}
                    this.rent_detail.patientHistory = {...formatBeforeRequest(this.rent_detail.patientHistory), ...patientHistory_update}
                    this.setRentDetail(this.rent_detail)
                }
            })
            this.setTransitReloadParent(true)
        },
        regis: async function () {
            const payload = {
                patient_cd: this.rent_detail.patient_cd,
                smd_code  : this.rent_detail.smd_code,
                des_code  : this.rent_detail.des_code,
                fac_name  : this.rent_detail.fac_name,
                fac_tel   : this.rent_detail.fac_tel,
                fac_fax   : this.rent_detail.fac_fax,
                des_clinic: this.rent_detail.des_clinic,
                des_doctor: this.rent_detail.des_doctor,
                agr_pump_code: this.rent_detail.agr_pump_code,
                new_remark: this.rent_detail.new_remark
            }

            await this.storeRent(payload).then((res) => {
                if(res && res.code == 200) {
                    this.setRentDetail(res.data)
                    this.setTransitReloadParent(true)
                    this.$refs.confirmDialog.show({
                        title: jp.notification_title,
                        message: jp.regis_success_new_rent_message,
                        type: 1
                    })
                }
            })
        },
        update: async function (showMessage = true) {
            let payload = this.getPayloadByStatus(this.rent_detail.status)
            payload                = formatBeforeRequest(payload)
            payload.shipment       = formatBeforeRequest(payload.shipment)
            payload.patientHistory = formatBeforeRequest(payload.patientHistory)

            payload.back_flag = this.back_flag
            let res = await this.updateRent(payload).then((res) => {
                if(res && res.code == 200) {
                    this.setRentDetail(res.data)
                    this.setTransitReloadParent(true)
                    if(showMessage) {
                        this.$refs.confirmDialog.show({
                            title: jp.notification_title,
                            message: jp.update_success_new_rent_message,
                            type: 1
                        })
                    }
                    return true
                }
                return false
            })
            this.back_flag = false
            return res
        },
        checkUpdate: async function() {
            let payload = this.getPayloadByStatus(this.rent_detail.status)
            payload                = formatBeforeRequest(payload)
            payload.shipment       = formatBeforeRequest(payload.shipment)
            payload.patientHistory = formatBeforeRequest(payload.patientHistory)

            payload.back_flag = this.back_flag
            let res = await this.checkUpdateRent(payload).then((res) => {
                if(res && res.code == 200) {
                    return true
                }
                return false
            })
            this.back_flag = false
            return res
        },
        getPayloadByStatus: function (status) {
            var fields = []
            switch (status) {
                case 0:
                    fields = [
                        ...this.input_group.group_facility,
                        ...this.input_group.group_patient,
                        ...this.input_group.group_pre,
                        ...this.input_group.group_treat
                    ]
                    break

                case 1:
                case 2:
                    fields = [
                        ...this.input_group.group_facility,
                        ...this.input_group.group_patient,
                        ...this.input_group.group_pre,
                        ...this.input_group.group_treat,
                        ...this.input_group.group_ord
                    ]
                    break

                case 6:
                case 7:
                case 8:
                    fields = [
                            ...this.input_group.group_facility,
                            ...this.input_group.group_patient,
                            ...this.input_group.group_pre,
                            ...this.input_group.group_treat,
                            ...this.input_group.group_ord,
                            ...this.input_group.group_shipment,
                        ]
                    break
                case 9:
                case 10:
                    fields = [
                        ...this.input_group.group_facility,
                        ...this.input_group.group_patient,
                        ...this.input_group.group_pre,
                        ...this.input_group.group_treat,
                        ...this.input_group.group_ord,
                        ...this.input_group.group_shipment,
                        ...this.input_group.group_inst
                    ]
                    break
            
                default:
                    fields = [
                        ...this.input_group.group_facility,
                        ...this.input_group.group_patient,
                        ...this.input_group.group_pre,
                        ...this.input_group.group_treat,
                        ...this.input_group.group_ord,
                        ...this.input_group.group_shipment,
                        ...this.input_group.group_inst,
                        ...this.input_group.group_arg,
                    ]
                    break
            }

            var payload = {
                id: this.rent_detail.id,
                status: this.rent_detail.status,
                shipment: {},
                patientHistory: {}
            }
            for(const index in fields) {
                var field = fields[index]
                if(field.match('shipment.')) {
                    field = fields[index].replace('shipment.', '')
                    payload.shipment[field] = this.rent_detail.shipment[field]
                } else if (field.match('patientHistory.')) {
                    field = fields[index].replace('patientHistory.', '')
                    payload.patientHistory[field] = this.rent_detail.patientHistory[field]
                } else {
                    payload[field] = this.rent_detail[field]
                }
            }
            return payload
        },
        checkDisableByStatus: function (group) {
            if(this.rent_detail.status == 14 || this.rent_detail.status == 99 || this.rent_detail.status == 20) return true
            if(group == '') return false
            if(!this.rent_detail.status && this.rent_detail.status != 0) return true
            switch (this.rent_detail.status) {
                case 0:
                    if([GROUP_ORD, GROUP_SHIPMENT, GROUP_INST, GROUP_ARG].includes(group)) return true

                case 1:
                case 2:
                    if([GROUP_SHIPMENT, GROUP_INST, GROUP_ARG].includes(group)) return true
                
                case 6:
                case 7:
                case 8:
                    if([GROUP_INST, GROUP_ARG].includes(group)) return true
                case 9:
                case 10:
                    if([GROUP_ARG].includes(group)) return true

                default:
                    return false
            }
        },
        isDisableReceiptText: function () {
            if(this.rent_detail.ord_deli_hope && this.rent_detail.date_reply_plan && this.rent_detail.des_clinic && this.rent_detail.des_doctor) return false
            return true
        },
        isDisableReceiptReport: function () {
            if(this.rent_detail.treat_apply_date
            && this.rent_detail.fac_name
            && this.rent_detail.fac_enter_date
            && this.rent_detail.tube_insert_date
            && this.rent_detail.treatment_date
            && this.rent_detail.fac_leave_date
            ) return false
            return true
        },
        onChangeStatus: async function () {
            let rollback = true

            if([8, 9].includes(this.rent_origin.status) && [0, 1, 2, 6, 7].includes(this.rent_detail.status) && [0, 1, 2].includes(this.rent_detail.shipment.status)) {
                const ok = await this.$refs.confirmDialog.show({
                    title: jp.notification_title,
                    message: jp.confirm_back_rent_message.replace('?', typeText(this.master.rent_new_status, this.rent_detail.status)),
                })
                await this.$refs.confirmDialog.close()
                if(ok) {
                    this.back_flag = true
                    this.update()
                } else {
                    rollback = false
                    this.rent_detail.status = this.beforeStatus
                }
            }

            if(rollback) {
                switch (this.rent_detail.status) {
                    case 0:
                        this.rollbackOriginData([
                            ...this.input_group.group_ord,
                            ...this.input_group.group_shipment,
                            ...this.input_group.group_inst,
                            ...this.input_group.group_arg,
                        ])
                        break
                
                    case 1:
                    case 2:
                        this.rollbackOriginData([
                            ...this.input_group.group_not_yet_fax,
                            ...this.input_group.group_shipment,
                            ...this.input_group.group_inst,
                            ...this.input_group.group_arg,
                        ])
                        break
                    
                    case 6:
                    case 7:
                        this.rollbackOriginData([
                            ...this.input_group.group_not_yet_send_date,
                            ...this.input_group.group_not_yet_delivery_date,
                            ...this.input_group.group_inst,
                            ...this.input_group.group_arg,
                        ])
                        break
                    case 8:
                        this.rollbackOriginData([
                            ...this.input_group.group_not_yet_delivery_date,
                            ...this.input_group.group_inst,
                            ...this.input_group.group_arg,
                        ])
                        break
                    case 9:
                        this.rollbackOriginData([
                            ...this.input_group.group_not_yet_delivery_date,
                            ...this.input_group.group_arg,
                        ])
                        break
                    case 10:
                        this.rollbackOriginData([
                            ...this.input_group.group_arg,
                        ])
                        break
                        
                    default:
                        break
                }
            }

            this.beforeStatus = this.rent_detail.status
        },
        rollbackOriginData: function (fields = []) {
            for(const index in fields) {
                var field = fields[index]
                if(field.match('shipment.')) {
                    field = fields[index].replace('shipment.', '')
                    this.rent_detail.shipment[field] = this.rent_origin.shipment[field]
                } else if(field.match('patientHistory.')) {
                    field = fields[index].replace('patientHistory.', '')
                    this.rent_detail.patientHistory[field] = this.rent_origin.patientHistory[field]
                } else {
                    this.rent_detail[field] = this.rent_origin[field]
                }
            }
        },
        setRentDetail: async function (data) {
            if(!data.patientHistory) data.patientHistory = {}
            if(!data.shipment) data.shipment = {}
            this.rent_detail = Object.assign(this.rent_detail, data)
            this.rent_detail.plan_invoice_start = dateToMonth(this.rent_detail.plan_invoice_start)
            this.rent_detail.arg_invoice_start = dateToMonth(this.rent_detail.arg_invoice_start)
            this.rent_origin = deepClone(this.rent_detail)
            this.setPumpCode(this.rent_detail.patientHistory?.pump_code)
            this.setStatusList()
            console.log(this.rent_detail)
            this.beforeStatus = this.rent_detail.status
        },
        getRentDetail: async function (rent_id) {
            await this.getDetailRent(rent_id).then((res) => {
                if(res && res.code == 200) {
                    this.setRentDetail(res.data)
                }
            })
        },
        setStatusList: function () {
            const status = this.rent_origin.status
            switch (status) {
                case 0:
                case 1:
                case 2:
                case 6:
                    this.status_list = this.filterStatus([0, 1, 2, 6])
                    break

                case 7:
                    this.status_list = this.filterStatus([0, 1, 2, 6, 7])
                    break
                    
                case 8:
                    this.status_list = this.filterStatus([0, 1, 2, 6, 7, 8, 9])
                    break

                case 9:
                    this.status_list = this.filterStatus([0, 1, 2, 6, 7, 8, 9])
                    break

                default:
                    this.status_list = this.filterStatus([10, 11, 12, 13])
                    break
            }
            
            if([3, 4].includes(this.rent_origin.shipment.status)) {
                this.status_list = this.filterStatus([0, 1, 2, 6, 7, 8, 9, 10, 11, 12, 13])
            }
        },
        filterStatus: function (ids) {
            let list = []
            for(const i in this.master.rent_new_status) {
                if(ids.includes(this.master.rent_new_status[i].id)) list.push(this.master.rent_new_status[i])
            }
            return list
        },
        complete: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: jp.notification_title,
                message: jp.confirm_rent_complete,
            })
            await this.$refs.confirmDialog.close()
            if(ok) {
                let payload = this.getPayloadByStatus(this.rent_detail.status)
                payload                = formatBeforeRequest(payload)
                payload.shipment       = formatBeforeRequest(payload.shipment)
                payload.patientHistory = formatBeforeRequest(payload.patientHistory)
                const res = await this.completeRent(payload).then((res) => {
                    if(res && res.code == 200) {
                        this.setRentDetail(res.data)
                        this.setTransitReloadParent(true)
                        return true
                    }
                    return false
                })
    
                if(res) {
                    await this.$refs.confirmDialog.show({
                        title: jp.notification_title,
                        message: jp.update_success_new_rent_message,
                        type: 1
                    })
                    this.resetSearch()
                    this.search.sort = 'updated_at'
                    this.search.sort_by = 'desc'
                    this.search.pump_code = this.rent_detail.patientHistory.pump_code ?? 'A'
                    this.setFromFeature(true)
                    this.$router.push({ name: "AchievementIndex" })
                }
            }

        },
        isDisableComplete: function () {
            if(this.rent_detail.status < 11) return true
            if(!this.rent_detail.agr_recive_date
                || !this.rent_detail.agr_signed_date
                || !this.rent_detail.agr_start_use
                || !this.rent_detail.arg_invoice_start
                || !this.rent_detail.patientHistory.serial_no
                || !this.rent_detail.patientHistory.medical_record
                || !this.rent_detail.patientHistory.patient_kj
                ) return true
            return false
        },
        getDesShelf: function () {
            if(!this.rent_detail.patientHistory?.pump_code) {
                return this.master.des_shelf
            }
            
            return this.master.des_shelf.filter((item) => {
                return this.rent_detail.patientHistory?.pump_code && item.value.includes(this.rent_detail.patientHistory?.pump_code)
            })
        },
        setRemarks: function () {
            if(this.rent_detail.shipment.decided_date && this.rent_detail.shipment.decided_date != this.rent_origin.shipment.decided_date) {
                let str = ''
                if(this.rent_detail.shipment.pump_code == 'A') {
                    str += '■『'+typeText(this.master.machines, this.rent_detail.shipment.pump_code, 'pump_cd', 'pump_nm_full')+'』です。'
                    str += '　■ご発注日；'+displayDate(this.rent_detail.ord_apply_date, '', 'YY/MM/DD')
                    str += '　ご希望納品日；'+displayDate(this.rent_detail.ord_deli_hope, '', 'YY/MM/DD')
                    str += '　　　　 ■【患者様　ご入院'+displayDate(this.rent_detail.fac_enter_date, '', 'YY/MM/DD')
                    str += '　NJ；'+displayDate(this.rent_detail.tube_insert_date, '', 'YY/MM/DD')
                    str += '　PEG；'+displayDate(this.rent_detail.treatment_date, '', 'YY/MM/DD')
                    str += '　⇒　ご退院；'
                    str += displayDate(this.rent_detail.fac_leave_date, '', 'YY/MM/DD')+'予定】'
                } else {
                    str += '■『'+typeText(this.master.machines, this.rent_detail.shipment.pump_code, 'pump_cd', 'pump_nm_full')+'』です。'
                    str += '　■ご発注日；'+displayDate(this.rent_detail.ord_apply_date, '', 'YY/MM/DD')
                    str += '　ご希望納品日；'+displayDate(this.rent_detail.ord_deli_hope, '', 'YY/MM/DD')
                    str += '　　　　 ■【患者様　ご入院'+displayDate(this.rent_detail.fac_enter_date, '', 'YY/MM/DD')
                    str += '　挿入予定日；'+displayDate(this.rent_detail.tube_insert_date, '', 'YY/MM/DD')
                    str += '　⇒　ご退院；'
                    str += displayDate(this.rent_detail.fac_leave_date, '', 'YY/MM/DD')+'予定】'
                }

                this.rent_detail.shipment.remarks = str
            }
        },
        deleteItem: async function (event) {
            let payload = {id: this.rent_detail.id, delete_flag: event}
            await this.deleteRent(formatBeforeRequest(payload)).then((res) => {
                if(res && res.code == 200) {
                    this.setTransitReloadParent(true)
                    this.setIsOpenTransitDetail()
                }
            })
            this.isOpenDeleteOption = false
        },
        stopping: async function () {
            if(this.rent_origin.patient_cd) {
                await this.checkStopping({patient_cd: this.rent_origin.patient_cd}).then((res) => {
                    if(res && res.code == 201) {
                        this.rent_detail.status = 20
                        this.setRentDetail(this.rent_detail)
                    }
                })
            }
        }
    },
    created: async function () {
        await this.setRentDetail(this.rent)
        this.pumpFacility = {...this.rent_detail.pumpFacility}
        if(this.pumpFacility.destinations && this.pumpFacility.destinations.length > 0) {
            this.pumpFacility.destinations.forEach(des => {
                if(des.des_code == this.rent_detail.des_code) {
                    this.pumpDestination = des
                }
            })
        }
        this.setTransitReloadParent(true)
        this.setDeleteButton(false)
        this.stopping()
    },
    mounted: function () {
        
    },
    unmounted: function () {
        this.setContracts([])
        this.setPatients([])
        this.setPumpCode()
        this.setDeleteButton(false)
    }
}
</script>