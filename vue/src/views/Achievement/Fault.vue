<template>
    <div class="p-1 wrapper-scroll transit">
        <div class="mb-1 d-flex justify-content-between align-items-end">
            <button class="btn" @click="onRegisFault()">新規作成</button>
            <span class="label-text">転院データ：全{{ faultList.length }}件</span>
            <div class="gap-3 d-flex">
                <label class="gap-2 d-flex align-items-center label-text">
                    <input type="checkbox" class="mt-0 form-check-input" @change="onChangeShowAll()" v-model="search.is_show_all">完了データも表示
                </label>
                <button class="btn default w-[9rem]" @click="isShowTable = !isShowTable">{{ isShowTable ? '一覧非表示▲' : '一覧表示▼' }}</button>
            </div>
        </div>

        <div class="parent-scroll" :class="{'d-none': !isShowTable}" style="min-height: 8.5rem;">
            <table class="view-scroll t-border">
                <thead class="text-center">
                    <tr>
                        <th>コード</th>
                        <th>施設名</th>
                        <th>患者情報</th>
                        <th>故障<br>シリアルNo.</th>
                        <th>作業状態</th>
                        <th>受領書<br>返信日</th>
                        <th>出荷<br>指示日</th>
                        <th>配達<br>完了日</th>
                        <th>同意書<br>回収日</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="fault in faultList" :key="fault.id" :class="{'selected': fault.id == faultSelected.id}" @click="changeItemSelected(fault)">
                        <td class="text-center">{{ fault.desHistory.smd_code }}</td>
                        <td>{{ fault.fac_name }}</td>
                        <td class="text-center">{{ fault.patient_cd }} {{ fault.desHistory.patient_nm }}</td>
                        <td class="text-center">[{{ fault.pump_code }}]{{ fault.serial_no }}</td>
                        <td class="text-center">{{ fault.status_label }}</td>
                        <td class="text-center">{{ displayDate(fault.reply_fax_date) }}</td>
                        <td class="text-center">{{ displayDate(fault.shipment.inst_date) }}</td>
                        <td class="text-center">{{ displayDate(fault.shipment.delivery_date) }}</td>
                        <td class="text-center">{{ displayDate(fault.agr_receive_date) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="py-2 wrapper-scroll">
            <div class="my-2 divider" style="height: 1px;" :class="{'d-none': !faultSelected.id}"></div>
            <div class="parent-scroll">
                <div class="gap-3 p-1 d-flex view-scroll" :class="{'d-none': !faultSelected.id}">
                    <!-- left -->
                    <div class="d-flex flex-column gap-2 basis-[50%]">
                        <!-- group1 -->
                        <div class="d-flex flex-column input-gap">
                            <!-- group1-row1 -->
                            <div class="d-flex align-items-center">
                                <label class="fw-bold label-text">■ 施設と宛先情報</label>
                            </div>
        
                            <!-- group1-row2 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[30%]">
                                    <label class="label-text w-[6rem]">SMDコード</label>
                                    <input type="text" class="flex-1 text-center form-control" :value="faultSelected.desHistory.smd_code" disabled>
                                </div>
                                <div class="d-flex align-items-center basis-[70%]">
                                    <label class="label-text w-[4rem]">施設名</label>
                                    <input type="text" class="flex-1 form-control" v-model="faultSelected.fac_name" :disabled="checkDisableByStatus('facility_and_destination_information')">
                                </div>
                            </div>
        
                            <!-- group1-row3 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[30%]">
                                    <label class="label-text w-[6rem]">宛先コード</label>
                                    <input type="text" class="flex-1 text-center form-control" :value="faultSelected.desHistory.des_code_text" disabled>
                                </div>
                                <div class="d-flex gap-1 align-items-center basis-[70%]">
                                    <label class="label-text w-[4rem]">宛先名</label>
                                    <input type="text" class="flex-1 form-control" v-model="faultSelected.clinic" :disabled="checkDisableByStatus('facility_and_destination_information')">
                                    
                                    <input type="text" class="w-[8rem] form-control" v-model="faultSelected.doctor" :disabled="checkDisableByStatus('facility_and_destination_information')">
                                        
                                    <select class="w-[5.5rem] form-select" v-model="faultSelected.title" :disabled="checkDisableByStatus('facility_and_destination_information')">
                                        <option v-for="title in master.des_title" :value="title.id">{{ title.value }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
        
                        <!-- group2 -->
                        <div class="d-flex flex-column input-gap">
                            <!-- group2-row1 -->
                            <div class="d-flex align-items-center">
                                <label class="fw-bold label-text">■ 患者の情報</label>
                            </div>
        
                            <!-- group2-row2 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[35%]">
                                    <label class="label-text w-[6rem]">患者コード</label>
                                    <input type="text" class="flex-1 text-center form-control" :value="faultSelected.desHistory.patient_cd" disabled>
                                </div>
                                <div class="d-flex align-items-center basis-[43%]">
                                    <label class="label-text w-[10rem]">患者名(イニシャル)</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="faultSelected.desHistory.patient_nm" :disabled="checkDisableByStatus('patient_information')">
                                </div>
                                <div class="d-flex align-items-center basis-[22%]">
                                    <label class="label-text w-[3rem]">性別</label>
                                    <select class="flex-1 form-select" v-model="faultSelected.desHistory.patient_sex" :disabled="checkDisableByStatus('patient_information')">
                                        <option v-for="item in master.sex" :value="item.id">{{ item.value }}</option>
                                    </select>
                                </div>
                            </div>
        
                            <!-- group2-row3 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[35%]">
                                    <label class="label-text w-[6rem]">シリアルNo.</label>
                                    <input type="text" class="flex-1 text-center form-control" :value="faultSelected.srcHistory.serial_no" disabled>
                                </div>
                                <div class="d-flex align-items-center basis-[28%]">
                                    <label class="label-text w-[5rem]">患者カナ</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="faultSelected.desHistory.patient_kn" :disabled="checkDisableByStatus('patient_information')">
                                </div>
                                <div class="d-flex align-items-center basis-[37%]">
                                    <label class="label-text w-[7rem]">請求停止年月</label>
                                    <Datepicker month-picker format="yyyy年MM月" class="flex-1" v-model="faultSelected.srcHistory.invoice_finish" :disabled="checkDisableByStatus('invoice_finish')"></Datepicker>
                                </div>
                            </div>
                        </div>
        
                        <!-- group3 -->
                        <div class="d-flex flex-column input-gap">
                            <!-- group3-row1 -->
                            <div class="d-flex align-items-center justify-content-between">
                                <label class="fw-bold label-text">■ 交換依頼書・受領書情報</label>
                                <a href="javascript:void(0)" class="label-text" @click="isOpenMailBodyTextModal = true" :class="{'disabled': faultSelected.status < 0 || !faultSelected.date_deli_hope}">受領書本文作成</a>
                            </div>
        
                            <!-- group3-row2 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[1/3]">
                                    <label class="label-text w-[6rem]">情報受信日</label>
                                    <Datepicker class="flex-1" v-model="faultSelected.date_mail_recv" :disabled="checkDisableByStatus('exchange_request_receipt_information')"></Datepicker>
                                </div>
                                <div class="d-flex align-items-center basis-[1/3]">
                                    <label class="label-text w-[6rem]">依頼書受信日</label>
                                    <Datepicker class="flex-1" v-model="faultSelected.date_req_recv" :disabled="checkDisableByStatus('exchange_request_receipt_information')"></Datepicker>
                                </div>
                                <div class="d-flex align-items-center basis-[1/3]">
                                    <label class="label-text w-[6rem]">依頼書日付</label>
                                    <Datepicker class="flex-1" v-model="faultSelected.date_req_apply" :disabled="checkDisableByStatus('exchange_request_receipt_information')"></Datepicker>
                                </div>
                            </div>
        
                            <!-- group3-row3 -->
                            <div class="d-flex basis-[35%]">
                                <label class="label-text w-[6rem]">受信本文</label>
                                <textarea class="flex-1 form-control" v-model="faultSelected.mail_body_text" :disabled="faultSelected.status < 0"></textarea>
                            </div>
        
                            <!-- group3-row4 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[1/3]">
                                    <label class="label-text w-[6rem]">納品希望日</label>
                                    <Datepicker class="flex-1" v-model="faultSelected.date_deli_hope" :disabled="checkDisableByStatus('exchange_request_receipt_information')"></Datepicker>
                                </div>
                                <div class="d-flex gap-3 basis-[2/3]">
                                    <div class="d-flex align-items-center basis-[60%]">
                                        <label class="label-text w-[8rem]">受領書返信FAX日</label>
                                        <Datepicker class="flex-1" v-model="faultSelected.reply_fax_date" :disabled="checkDisableByStatus('exchange_request_receipt_information')"></Datepicker>
                                    </div>
                                    <div class="d-flex align-items-center basis-[40%]">
                                        <label class="label-text w-[3rem]">時間</label>
                                        <Datepicker class="flex-1" v-model="faultSelected.reply_fax_time"
                                            time-picker
                                            :enableTimePicker="true"
                                            format="HH:mm:ss"
                                            enable-seconds
                                            selectText="セレクト"
                                            :disabled="checkDisableByStatus('exchange_request_receipt_information')"
                                            ></Datepicker>
                                    </div>
                                </div>
                            </div>
        
                            <!-- group3-row5 -->
                            <div class="d-flex align-items-center">
                                <label class="label-text w-[6rem]">不具合情報</label>
                                <input type="text" class="flex-1 form-control" v-model="faultSelected.fault_text" :disabled="checkDisableByStatus('exchange_request_receipt_information')">
                                <button class="btn ms-2" @click="updateStart()" :disabled="originFaultSelected.status > 0">受領書送信完了</button>
                            </div>
                        </div>
        
                        <!-- group4 -->
                        <div class="d-flex flex-column justify-content-between h-100">
                            <div class="d-grid input-gap">
                                <!-- group4-row1 -->
                                <div class="d-flex align-items-center justify-content-between">
                                    <label class="fw-bold">■ メーカー情報連携</label>
                                    <div class="gap-2 d-flex align-items-center">
                                        <label class="label-text">メール送信日</label>
                                        <Datepicker class="w-[10rem]" v-model="faultSelected.send_report_date" :disabled="checkDisableByStatus('shipping_instruction')"></Datepicker>
                                    </div>
                                    <a href="javascript:void(0)" :class="{'disabled': faultSelected.status < 6}" @click="isOpenReportMakerModal = true">メーカ報告文書</a>
                                </div>
            
                                <!-- group4-row2 -->
                                <textarea class="mb-2 form-control" v-model="faultSelected.send_report_text" :disabled="faultSelected.status < 6" style="min-height: 7rem;"></textarea>
                            </div>
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
                                    <input type="text" class="flex-1 text-center form-control w-[9rem]" :value="faultSelected.srcHistory.serial_no" disabled>
                                </div>
                            </div>
            
                            <!-- group5-row1 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="w-[5.5rem]">出荷予定日</label>
                                    <Datepicker class="flex-1" v-model="faultSelected.shipment.plan_date" :disabled="checkDisableByStatus('shipping_instruction')"></Datepicker>
                                </div>
            
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="w-[5.5rem]">出荷指示日</label>
                                    <Datepicker class="flex-1" v-model="faultSelected.shipment.inst_date" :disabled="checkDisableByStatus('shipping_instruction')"></Datepicker>
                                </div>

                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="w-[5.5rem]">指示送信日</label>
                                    <Datepicker class="flex-1" v-model="faultSelected.shipment.send_date" :disabled="checkDisableByStatus('shipping_instruction') || faultSelected.status < 8"></Datepicker>
                                </div>
                            </div>
            
                            <!-- group5-row2 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="w-[5.5rem]">指示NO.</label>
                                    <input type="text" class="flex-1 text-center form-control" disabled :value="faultSelected.shipment.inst_id || '-'">
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
                                        <input type="text" class="w-[8rem] me-2 form-control text-center" v-model="faultSelected.shipment.des_postcode" :disabled="checkDisableByStatus('shipping_instruction')" maxlength="8">
                                        <input type="text" class="flex-1 form-control" v-model="faultSelected.shipment.des_address" :disabled="checkDisableByStatus('shipping_instruction')">
                                    </div>
            
                                    <div class="d-flex align-items-center">
                                        <label class="w-[5.5rem]">届け先名称</label>
                                        <input type="text" class="flex-1 form-control" v-model="faultSelected.shipment.des_name" :disabled="checkDisableByStatus('shipping_instruction')">
                                    </div>
                                </div>
                                <button class="btn default w-[7rem]" @click="openShippingModal()" :disabled="checkDisableByStatus('shipping_instruction')">出荷情報<br>確定画面</button>
                            </div>
            
                            <!-- group5-row5 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[35%]">
                                    <label class="w-[5.5rem]">電話番号</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="faultSelected.shipment.fac_tel" :disabled="checkDisableByStatus('shipping_instruction')">
                                </div>
            
                                <div class="d-flex align-items-center basis-[30%]">
                                    <label class="w-[5rem]">棚コード</label>
                                    <select class="flex-1 form-select" v-model="faultSelected.shipment.from_shelf" :disabled="checkDisableByStatus('shipping_instruction')">
                                        <option v-for="shelf in getDesShelf()" :value="shelf.id">{{ shelf.value }}</option>
                                    </select>
                                </div>
            
                                <div class="d-flex align-items-center basis-[35%]">
                                    <label class="w-[5.5rem]">配達指定日</label>
                                    <Datepicker class="flex-1" v-model="faultSelected.shipment.decided_date" :disabled="checkDisableByStatus('shipping_instruction')" @update:model-value="setRemarks()"></Datepicker>
                                </div>
                            </div>
            
                            <!-- group5-row6 -->
                            <div class="d-flex align-items-center">
                                <textarea class="form-control" v-model="faultSelected.shipment.remarks" :disabled="!faultSelected.status || faultSelected.status < 6"></textarea>
                            </div>
                        </div>
            
                        <!-- group 6 -->
                        <div class="d-flex flex-column input-gap">
                            <!-- group6-title -->
                            <div class="d-flex justify-content-between align-items-center">
                                <label class="label-text fw-bold">■ 出荷実績情報</label>
                                <div class="gap-3 d-flex">
                                    <!-- <a href="javascript:void(0)" :class="{'disabled': faultSelected.status < 10}" @click="openMakerReport()">メーカー報告文書</a> -->
                                    <a href="javascript:void(0)" class="disabled">配達追跡ページへ</a>
                                </div>
                            </div>
            
                            <!-- group6-row1 -->
                            <div class="gap-3 d-flex">
                                <div class="gap-3 d-flex basis-2/3">
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[5.5rem]">出荷実施日</label>
                                        <Datepicker class="flex-1" v-model="faultSelected.shipment.ship_date" :disabled="checkDisableByStatus('shipping_performance')"></Datepicker>
                                    </div>
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[6rem]">シリアルNo.</label>
                                        <input type="text" class="flex-1 form-control"  v-model="faultSelected.shipment.serial_no" :disabled="checkDisableByStatus('shipping_performance')">
                                    </div>
                                </div>
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="label-text w-[6rem]">配達完了日</label>
                                    <Datepicker class="flex-1" v-model="faultSelected.shipment.delivery_date" :disabled="checkDisableByStatus('shipping_performance') || faultSelected.status < 10"></Datepicker>
                                </div>
                            </div>
            
                            <!-- group6-row2 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-2/3">
                                    <label class="label-text w-[5.5rem]">問合せ番号</label>
                                    <input type="text" class="flex-1 form-control" v-model="faultSelected.shipment.ship_qacode" :disabled="checkDisableByStatus('shipping_performance')">
                                </div>
                                <div class="d-flex align-items-center basis-1/3">
                                    <label class="label-text w-[6rem]">請求開始月</label>
                                    <Datepicker class="flex-1" month-picker format="yyyy年MM月" v-model="faultSelected.desHistory.invoice_start" :disabled="checkDisableByStatus('shipping_performance')"></Datepicker>
                                </div>
                            </div>
            
                            <!-- group6-row3 -->
                            <!-- <div class="d-flex">
                                <div class="w-[5.5rem]">
                                    <label class="text-center label-text">アッヴィ様<br>報告</label>
                                </div>
                                <textarea class="flex-1 form-control" v-model="faultSelected.send_report_text" :disabled="!faultSelected.status || faultSelected.status < 9"></textarea>
                            </div> -->
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
                                                <Datepicker class="flex-1" v-model="faultSelected.agr_receive_date" :disabled="checkDisableByStatus('consent')"></Datepicker>
                                            </td>
                                        </tr>
                                        <tr class="text-center">
                                            <td>署名日</td>
                                            <td>
                                                <Datepicker class="flex-1" v-model="faultSelected.agr_signed_date" :disabled="checkDisableByStatus('consent')"></Datepicker>
                                            </td>
                                        </tr>
                                        <tr class="text-center">
                                            <td>使用開始日</td>
                                            <td>
                                                <Datepicker class="flex-1" v-model="faultSelected.agr_start_use" :disabled="checkDisableByStatus('consent')"></Datepicker>
                                            </td>
                                        </tr>
                                        <tr class="text-center">
                                            <td>請求開始月</td>
                                            <td>
                                                <Datepicker class="flex-1" month-picker format="yyyy年MM月" v-model="faultSelected.arg_invoice_start" :disabled="checkDisableByStatus('consent')"></Datepicker>
                                            </td>
                                        </tr>
                                        <tr class="text-center">
                                            <td>シリアルNo.</td>
                                            <td>
                                                <input type="text" class="form-control"  v-model="faultSelected.desHistory.serial_no" :disabled="checkDisableByStatus('consent')">
                                            </td>
                                        </tr>
                                        <tr class="text-center">
                                            <td>アッヴィ<br>使用開始</td>
                                            <td>
                                                <Datepicker class="flex-1" v-model="faultSelected.desHistory.dateof_start" :disabled="!faultSelected.status && faultSelected.status != 0"></Datepicker>
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
                                            <input type="text" class="flex-1 text-center form-control" :value="faultSelected.desHistory.patient_cd" disabled>
                                        </div>
                                        <div class="d-flex align-items-center basis-[30%]">
                                            <label class="label-text w-[2.5rem]">枝番</label>
                                            <input type="text" class="flex-1 text-center form-control" :value="faultSelected.desHistory.hist_no" disabled>
                                        </div>
                                    </div>
                                </div>

                                <!-- group8-row1 -->
                                <div class="d-flex align-items-center">
                                    <label class="label-text w-[7.5rem]">患者カルテ番号</label>
                                    <input type="text" class="flex-1 form-control" v-model="faultSelected.desHistory.medical_record" :disabled="checkDisableByStatus('patient')">
                                </div>

                                <!-- group8-row2 -->
                                <div class="gap-3 d-flex">
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[4rem]">患者名</label>
                                        <input type="text" class="flex-1 form-control" v-model="faultSelected.desHistory.patient_kj" :disabled="checkDisableByStatus('patient')">
                                    </div>
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[5.5rem]">患者名カナ</label>
                                        <input type="text" class="flex-1 form-control" v-model="faultSelected.desHistory.patient_kn" :disabled="checkDisableByStatus('patient')">
                                    </div>
                                </div>

                                <!-- group8-row3 -->
                                <div class="gap-3 d-flex">
                                    <div class="d-flex align-items-center basis-[60%]">
                                        <label class="label-text w-[9rem]">患者名(イニシャル)</label>
                                        <input type="text" class="flex-1 form-control" v-model="faultSelected.desHistory.patient_nm" :disabled="checkDisableByStatus('patient')">
                                    </div>
                                    <div class="d-flex align-items-center basis-[40%]">
                                        <label class="label-text w-[3rem]">性別</label>
                                        <select class="flex-1 form-select" v-model="faultSelected.desHistory.patient_sex" :disabled="checkDisableByStatus('patient')">
                                            <option v-for="item in master.sex" :value="item.id">{{ item.value }}</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- group8-row4 -->
                                <div class="gap-3 d-flex">
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[5rem]">診療科名</label>
                                        <input type="text" class="flex-1 form-control" v-model="faultSelected.desHistory.des_clinic" :disabled="checkDisableByStatus('patient')">
                                    </div>
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[4rem]">医師名</label>
                                        <input type="text" class="flex-1 form-control" v-model="faultSelected.desHistory.des_doctor" :disabled="checkDisableByStatus('patient')">
                                    </div>
                                </div>

                                <!-- group8-row5 -->
                                <div class="d-flex">
                                    <label class="label-text w-[4rem]">備考</label>
                                    <textarea class="flex-1 form-control" v-model="faultSelected.arg_remarks" :disabled="!faultSelected.status && faultSelected.status != 0"></textarea>
                                </div>

                                <!-- group8-row6 -->
                                <div class="d-flex align-items-center">
                                    <label class="label-text w-[4rem]">入力者</label>
                                    <select class="flex-1 form-select" v-model="faultSelected.desHistory.staff_pdfchk" :disabled="checkDisableByStatus('patient')">
                                        <option :value="null"></option>
                                        <option v-for="user in master.users" :value="user.userid">{{ user.username }}</option>
                                    </select>
                                </div>

                                <!-- group8-row7 -->
                                <div class="d-flex align-items-center">
                                    <label class="label-text w-[4rem]">確認者</label>
                                    <select class="flex-1 form-select" v-model="faultSelected.desHistory.staff_wcheck" :disabled="checkDisableByStatus('patient')">
                                        <option :value="null"></option>
                                        <option v-for="user in master.users" :value="user.userid">{{ user.username }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- group-button -->
            <div class="mt-3 d-flex justify-content-around">
                <div class="gap-2 d-flex align-items-center">
                    <label class="label-text">状態</label>
                    <select class="form-select" v-model="faultSelected.status" @change="onChangeStatus()" :disabled="originFaultSelected.status == 15">
                        <option v-for="st in status_list" :value="st.id" :disabled="st.id == 12 || st.id == 13">{{ st.value }}</option>
                    </select>
                </div>
                <button class="btn delete w-[8rem]" @click="deleteItem()" :disabled="faultSelected.shipment.status > 2">交換取消</button>
                <button class="btn w-[8rem]" @click="update()">情報保存</button>
                <div class="gap-2 d-flex align-items-center">
                    <label class="gap-2 d-flex align-items-center">
                        <input type="checkbox" class="mt-0 form-check-input" v-model="isEnableComplete">回収不可
                    </label>
                    <button class="btn w-[8rem]" @click="complete()" :disabled="disableComplete()">交換完了</button>
                </div>
            </div>
        </div>
    </div>

    <RegisChangeFaultModal v-if="isOpenRegisFaultModal" :show="isOpenRegisFaultModal" @close="onCloseRegis($event)"></RegisChangeFaultModal>

    <MailBodyTextModal
        v-if="isOpenMailBodyTextModal"
        :show="isOpenMailBodyTextModal"
        @close="isOpenMailBodyTextModal = false"
        :fault="faultSelected"
        @confirm="pasteMailBodyText($event)"></MailBodyTextModal>
    
    <ReportMakerModal
        v-if="isOpenReportMakerModal"
        :show="isOpenReportMakerModal"
        @close="isOpenReportMakerModal = false"
        :fault="faultSelected"
        @confirm="isOpenReportMakerModal = false; faultSelected.send_report_text = $event"></ReportMakerModal>

    <ShipmentModal
        v-if="isOpenShippingModal"
        :show="isOpenShippingModal"
        :ids="ids"
        :data="shipmentData"
        @close="isOpenShippingModal = false"
        @reload="reloadShipment()"></ShipmentModal>

    <ConfirmModal ref="confirmDialog"></ConfirmModal>
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
import SortHeader from "@/components/Sort.vue";
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue";
import RegisChangeFaultModal from "./modal/fault/RegisChangeFaultModal.vue";
import MailBodyTextModal from "./modal/fault/MailBodyTextModal.vue";
import ReportMakerModal from "./modal/fault/ReportMakerModal.vue";
import ShipmentModal from "@/views/commons/ShipmentModal.vue";
import { formatBeforeRequest, dateToMonth, deepClone, displayDate, typeText, timeToTimeStr, timeStrToTime } from '@/helper.js';
import jp from '@/lang/jp.json';

</script>
<script>
export default {
    data: function () {
        return {
            day: null,
            isShowTable: true,
            isEnableComplete: false,
            isOpenRegisFaultModal: false,
            isOpenMailBodyTextModal: false,
            isOpenReportMakerModal: false,
            isOpenShippingModal: false,
            ids: [],
            faultList: [],
            originFaultSelected: {
            },
            faultSelected: {
                srcHistory: {},
                desHistory: {},
                shipment: {},
                masterPatient: {}
            },
            initFaultSelected: {
                srcHistory: {},
                desHistory: {},
                shipment: {},
                masterPatient: {}
            },
            status_list: [],
            input_group: {
                facility_and_destination_information: ['fac_name', 'clinic', 'doctor', 'title'],
                patient_information: ['desHistory.patient_nm', 'desHistory.patient_sex', 'desHistory.patient_kn', 'srcHistory.invoice_finish'],
                exchange_request_receipt_information: [
                    'date_mail_recv', 'date_req_recv', 'date_req_apply', 'mail_body_text',
                    'date_deli_hope', 'reply_fax_date', 'reply_fax_time', 'fault_text',
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
                    'desHistory.invoice_start',
                ],
                consent: [
                    'agr_receive_date',
                    'agr_signed_date',
                    'agr_start_use',
                    'arg_invoice_start',
                    'desHistory.serial_no',
                    'desHistory.dateof_start',
                ],
                patient: [
                    'masterPatient.medical_record',
                    'masterPatient.patient_kj',
                    'masterPatient.patient_kn',
                    'masterPatient.patient_nm',
                    'masterPatient.patient_sex',
                    'arg_remarks',
                    'masterPatient.staff_wcheck',
                    'masterPatient.staff_pdfchk',
                    'masterPatient.des_clinic',
                    'masterPatient.des_doctor',
                ],
                group_not_yet_delivery_date: ['shipment.delivery_date'],
            },
            back_flag: false,
            shipmentData: {},
            beforeStatus: null,
        }
    },
    computed: {
        ...mapState(['transit']),
        ...mapState({
            master: state => state.fault.master,
            search: state => state.fault.search,
            search_pr: state => state.achievement.search
        }),
    },
    methods: {
        ...mapActions('fault', ['getMasterChangeFault', 'getIndexChangeFault', 'updateChangeFault', 'getFaultDetail', 'completeChangeFault', 'deleteFault', 'checkUpdateChangeFault']),
        ...mapMutations('fault', ['resetSearch']),
        ...mapMutations(['showErrorModal']),
        onRegisFault: async function () {
            this.isOpenRegisFaultModal = true
        },
        onCloseRegis: async function (event) {
            this.isOpenRegisFaultModal = false
            if(event) {
                this.resetSearch()
                await this.searchChangeFaultIndex()
            }
        },
        pasteMailBodyText: function (event) {
            this.isOpenMailBodyTextModal = false
            this.faultSelected.mail_body_text = event
        },
        openShippingModal: async function () {
            // if(this.faultSelected.shipment.decided_date) {
                // if(this.originFaultSelected.status >= 6) {
                //     this.faultSelected.status = this.originFaultSelected.status
                // }
                const status = this.faultSelected.status
                this.faultSelected.status = 6
                const res = await this.checkUpdate()
                this.faultSelected.status = status
                if(res) {
                    this.shipmentData.remarks = this.faultSelected.shipment.remarks
                    this.ids = []
                    this.ids.push(this.faultSelected.shipment.id)
                    this.isOpenShippingModal = true
                }
            // } else {
            //     this.showErrorModal('配達指定日を入力してください。')
            // }
        },
        searchChangeFaultIndex: async function () {
            await this.getIndexChangeFault(this.search).then((res) => {
                if(res && res.code == 200) {
                    this.faultList = res.data
                    if(this.faultList.length > 0) {
                        this.setFaultSelected(this.faultList[0])
                    } else {
                        this.setFaultSelected(this.initFaultSelected)
                    }
                }
            })
        },
        onChangeShowAll: async function () {
            await this.searchChangeFaultIndex()
        },
        setFaultSelected: function (fault) {
            fault.masterPatient = fault.desHistory
            this.faultSelected = deepClone(fault)
            this.faultSelected.desHistory.invoice_finish = dateToMonth(this.faultSelected.desHistory.invoice_finish)
            this.faultSelected.desHistory.invoice_start = dateToMonth(this.faultSelected.desHistory.invoice_start)
            this.faultSelected.srcHistory.invoice_finish = dateToMonth(this.faultSelected.srcHistory.invoice_finish)
            this.faultSelected.srcHistory.invoice_start = dateToMonth(this.faultSelected.srcHistory.invoice_start)
            this.faultSelected.arg_invoice_start = dateToMonth(this.faultSelected.arg_invoice_start)
            this.faultSelected.reply_fax_time = timeStrToTime(this.faultSelected.reply_fax_time)

            this.originFaultSelected = deepClone(this.faultSelected)
            console.log(this.faultSelected)
            this.setStatusList()
            this.beforeStatus = this.faultSelected.status
        },
        changeItemSelected: async function (fault) {
            if(fault.id == this.faultSelected.id) return
            if(!this.compare()) {
                const ok = await this.$refs.confirmDialog.show({
                    title: jp.confirm,
                    message: jp.update_patient_message,
                })
                if(ok) {
                    const res = await this.update()
                    if(!res) {
                        await this.$refs.confirmDialog.close()
                        return
                    }
                }
                await this.$refs.confirmDialog.close()
            }
            this.setFaultSelected(fault)
        },
        compare: function () {
            return JSON.stringify(this.faultSelected) == JSON.stringify(this.originFaultSelected)
        },
        getPayload: function (fault) {
            let payload = formatBeforeRequest({...fault})
            payload.srcHistory = formatBeforeRequest({...payload.srcHistory})
            payload.desHistory = formatBeforeRequest({...payload.desHistory})
            payload.shipment = formatBeforeRequest({...payload.shipment})
            return payload
        },
        update: async function (showMessage=true) {
            let payload = this.getPayload(this.faultSelected)
            payload.back_flag = this.back_flag
            const res =  await this.updateChangeFault(payload).then((res) => {
                if(res && res.code == 200) {
                    this.faultList = this.faultList.map(item => {
                        if(item.id == res.data.id) return res.data
                        return item
                    })
                    this.setFaultSelected(res.data)
                    if(showMessage) {
                        this.$refs.confirmDialog.show({
                            title: jp.notification_title,
                            message: jp.update_success_new_rent_message,
                            type: 1
                        })
                    }
                    return true
                } else {
                    return false
                }
            })
            this.back_flag = false
            return res
        },
        checkUpdate: async function () {
            let payload = this.getPayload(this.faultSelected)
            payload.back_flag = this.back_flag
            const res =  await this.checkUpdateChangeFault(payload).then((res) => {
                if(res && res.code == 200) {
                    return true
                } else {
                    return false
                }
            })
            this.back_flag = false
            return res
        },
        updateStart: async function () {
            this.faultSelected.start = true
            this.update()
        },
        getDesShelf: function () {
            let list = this.master.des_shelf
            let need_first = this.faultSelected.desHistory.destination?.exc_need_first ?? 0
            let cant_last = this.faultSelected.desHistory.destination?.exc_cant_last ?? 0
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

            if(!this.faultSelected.shipment.pump_code) {
                return list
            }
            
            return list.filter((item) => {
                return item.value.includes(this.faultSelected.shipment.pump_code)
            })
        },
        reloadShipment: async function () {
            await this.getFaultDetail(this.faultSelected.id).then((res) => {
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
                        inst_id: res.data.desHistory.inst_id,
                    }

                    this.faultSelected.status = res.data.status
                    this.faultSelected.shipment = {...formatBeforeRequest(this.faultSelected.shipment), ...shipment_update}
                    this.faultSelected.desHistory = {...formatBeforeRequest(this.faultSelected.desHistory), ...patientHistory_update}
                    this.setFaultSelected(this.faultSelected)
                }
            })
        },
        setStatusList: function () {
            const status = this.originFaultSelected.status
            switch (status) {
                case 0:
                    this.status_list = this.filterStatus([0])
                    break;
                case 6:
                    this.status_list = this.filterStatus([0, 6])
                    break;
                case 7:
                    this.status_list = this.filterStatus([0, 6, 7])
                    break;
                case 8:
                    this.status_list = this.filterStatus([0, 6, 7, 8, 9])
                    break
                case 9:
                    this.status_list = this.filterStatus([0, 6, 7, 8, 9])
                    break
                case 15:
                    this.status_list = this.filterStatus([15])
                    break;
                default:
                    this.status_list = this.filterStatus([10, 11, 12, 13, 14])
                    break
            }

            if([3, 4].includes(this.originFaultSelected.shipment.status)) {
                this.status_list = this.filterStatus([0, 6, 7, 8, 9, 10, 11, 12, 13, 14])
            }
        },
        filterStatus: function (ids) {
            let list = []
            for(const i in this.master.fault_status) {
                if(ids.includes(this.master.fault_status[i].id)) list.push(this.master.fault_status[i])
            }
            return list
        },
        checkDisableByStatus: function (group) {
            switch (this.faultSelected.status) {
                case 0:
                    if([
                        'shipping_instruction',
                        'shipping_performance',
                        'consent',
                        'patient'
                    ].includes(group)) return true
                    break;
                
                case 6:
                case 7:
                case 8:
                    if([
                        'shipping_performance',
                        'consent',
                        'patient'
                    ].includes(group)) return true
                    break;

                case 9:
                case 10:
                    if([
                        'consent',
                        'patient'
                    ].includes(group)) return true
                    break;

                case 11:
                case 12:
                case 13:
                case 14:
                    if(['patient_information'].includes(group)) return true
                    break;
                case 15:
                    return true
                default:
                    break;
            }
            return false
        },
        onChangeStatus: async function () {
            let rollback = true

            if([8, 9].includes(this.originFaultSelected.status) && [0, 6, 7].includes(this.faultSelected.status) && [0, 1, 2].includes(this.faultSelected.shipment.status)) {
                const ok = await this.$refs.confirmDialog.show({
                    title: jp.notification_title,
                    message: jp.confirm_back_rent_message.replace('?', typeText(this.master.fault_status, this.faultSelected.status)),
                })
                await this.$refs.confirmDialog.close()
                if(ok) {
                    this.back_flag = true
                    this.update()
                } else {
                    rollback = false
                    this.faultSelected.status = this.beforeStatus
                }
            }
            if(rollback) {
                switch (this.faultSelected.status) {
                    case 0:
                        this.rollbackOriginData([
                            ...this.input_group.shipping_instruction,
                            ...this.input_group.shipping_performance,
                            ...this.input_group.consent,
                            ...this.input_group.patient,
                            ...this.input_group.group_not_yet_delivery_date,
                        ])
                        break
                
                    case 6:
                    case 7:
                    case 8:
                        this.rollbackOriginData([
                            ...this.input_group.shipping_performance,
                            ...this.input_group.consent,
                            ...this.input_group.patient,
                            ...this.input_group.group_not_yet_delivery_date,
                        ])
                        break
    
                    case 9:
                        this.rollbackOriginData([
                            ...this.input_group.consent,
                            ...this.input_group.patient,
                            ...this.input_group.group_not_yet_delivery_date,
                        ])
                        break
                        
                    case 10:
                        this.rollbackOriginData([
                            ...this.input_group.consent,
                            ...this.input_group.patient,
                        ])
                        break
    
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                        this.rollbackOriginData([
                            ...this.input_group.patient_information,
                        ])
                        break
                        
                    default:
                        break
                }
            }

            this.beforeStatus = this.faultSelected.status
        },
        rollbackOriginData: function (fields = []) {
            for(const index in fields) {
                var field = fields[index]
                if(field.match('shipment.')) {
                    field = fields[index].replace('shipment.', '')
                    this.faultSelected.shipment[field] = this.originFaultSelected.shipment[field]
                } else if(field.match('desHistory.')) {
                    field = fields[index].replace('desHistory.', '')
                    this.faultSelected.desHistory[field] = this.originFaultSelected.desHistory[field]
                } else if(field.match('srcHistory.')) {
                    field = fields[index].replace('srcHistory.', '')
                    this.faultSelected.srcHistory[field] = this.originFaultSelected.srcHistory[field]
                }
                else if(field.match('masterPatient.')) {
                    field = fields[index].replace('masterPatient.', '')
                    this.faultSelected.masterPatient[field] = this.originFaultSelected.masterPatient[field]
                } else {
                    this.faultSelected[field] = this.originFaultSelected[field]
                }
            }
        },
        complete: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: jp.notification_title,
                message: jp.complete_change_fault_warning_message,
            })
            this.$refs.confirmDialog.close()
            if(ok) {
                let payload = this.getPayload(this.faultSelected)
                const res =  await this.completeChangeFault(payload).then((res) => {
                    if(res && res.code == 200) {
                        this.faultList = this.faultList.map(item => {
                            if(item.id == res.data.id) return res.data
                            return item
                        })
                        this.setFaultSelected(res.data)
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
                    this.resetSearch()
                    this.search_pr.sort = 'updated_at'
                    this.search_pr.sort_by = 'desc'
                    this.search_pr.pump_code = this.faultSelected.desHistory.pump_code ?? 'A'
                    this.$router.push({ name: "AchievementIndex" })
                }
            }
        },
        disableComplete: function () {
            if(!this.isEnableComplete ||this.originFaultSelected.status < 14 ||this.originFaultSelected.status == 15) {
                return true
            }
            return false
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
                await this.deleteFault(this.faultSelected.id).then((res) => {
                    if(res && res.code == 200) {
                        this.searchChangeFaultIndex()
                    }
                })
            }
        },
        setRemarks: function (ok) {
            return;
        }
    },
    created: async function () {
        await this.getMasterChangeFault()
        this.search.pump_code = this.$store.state.pump_code
        await this.searchChangeFaultIndex()
    }
}
</script>