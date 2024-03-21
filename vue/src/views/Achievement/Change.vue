<template>
    <div class="p-1 wrapper-scroll transit">
        <div class="mb-1 d-flex justify-content-between align-items-end">
            <button class="btn w-[8rem]" @click="openRegisExchange()">新規作成</button>
            <span class="label-text">転院データ：全{{ pumpChangeFacilityList.length }}件</span>
            <div class="gap-3 d-flex">
                <label class="gap-2 d-flex align-items-center label-text">
                    <input type="checkbox" class="mt-0 form-check-input" @change="onChangeShowAll()" v-model="search.is_show_all">完了データも表示
                </label>
                <button class="btn default w-[9rem]" @click="isShowTable = !isShowTable">{{ isShowTable ? '一覧非表示▲' : '一覧表示▼' }}</button>
            </div>
        </div>

        <div class="parent-scroll" :class="{'d-none': !isShowTable}" style="min-height: 8.5rem;">
            <table class="view-scroll t-border allow-select">
                <thead class="text-center">
                    <tr>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'smd_code'">コード</SortHeader>
                        </th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'src_dcf_code'">現在の<br>DCFコード</SortHeader>
                        </th>
                        <th>現在の施設名</th>
                        <th>シリアルNo.</th>
                        <th>患者コード</th>
                        <th>患者名</th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'receive_date'">受信日</SortHeader>
                        </th>
                        <th>発生日</th>
                        <th>転院後<br>DCFコード</th>
                        <th>転院後施設</th>
                        <th>
                            <SortHeader @sort="sort()" :search="search" :field="'status'">作業状態</SortHeader>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in pumpChangeFacilityList" :class="{'selected': item.id == pumpChangeFacilitySelected.id}" @click="changeItemSelected(item)">
                        <td class="text-center">{{ item.srcHistory?.smd_code }}</td>
                        <td class="text-center">{{ item.src_dcf_code }}</td>
                        <td>{{ item.src_fac_name }}</td>
                        <td class="text-center">[{{ item.pump_code }}]{{ item.serial_no }}</td>
                        <td class="text-center">{{ item.patient_cd }}</td>
                        <td class="text-center">{{ item.desHistory?.patient_nm_text }}</td>
                        <td class="text-center">{{ displayDate(item.receive_date_text) }}</td>
                        <td class="text-center">{{ displayDate(item.src_event_date_text) }}</td>
                        <td class="text-center">{{ item.des_dcf_code ?? '-' }}</td>
                        <td>{{ item.des_fac_name }}</td>
                        <td class="text-center">{{ typeText(master.exchange_status, item.status) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mt-2 wrapper-scroll">
            <div class="gap-3 d-flex justify-content-between">
                <div class="gap-3 d-flex" :class="{'d-none': !pumpChangeFacilitySelected.id}">
                    <div class="d-flex align-items-center">
                        <label class="label-text w-[6rem]">患者コード</label>
                        <input type="text" class="text-center form-control w-[8rem]" :value="pumpChangeFacilitySelected.desHistory?.patient_cd" disabled>
                    </div>
                    <div class="d-flex align-items-center">
                        <label class="label-text w-[4rem]">患者名</label>
                        <input type="text" class="text-center form-control w-[8rem]" :value="pumpChangeFacilitySelected.desHistory?.patient_nm_text" disabled>
                    </div>
                    <input type="text" class="text-center form-control w-[8rem]" :value="pumpChangeFacilitySelected.desHistory?.patient_kn_text" disabled>
                    <button class="btn selection w-[10rem]" @click="openUpdatePatientInfo()" :disabled="disableByStatus()">患者マスタ編集</button>
                </div>
                <button class="btn w-[8rem]" @click="update()" :class="{'d-none': !pumpChangeFacilitySelected.id}" :disabled="disableByStatus()">情報仮保存</button>
            </div>
            
            <div class="my-2 divider" style="height: 1px;" :class="{'d-none': !pumpChangeFacilitySelected.id}"></div>
    
            <div class="parent-scroll" :class="{'d-none': !pumpChangeFacilitySelected.id}">
                <div class="p-1 view-scroll w-[100%]">
                    <div class="gap-3 d-flex">
                        <!-- left -->
                        <div class="basis-1/3 d-grid input-gap" style="height: fit-content;">
                            <!-- left-row1 -->
                            <div class="d-flex align-items-center">
                                <label class="fw-bold basis-[60%] label-text">■ 現在の情報</label>
                                <div class="d-flex align-items-center gap-1 basis-[40%]">
                                    
                                </div>
                            </div>
        
                            <!-- left-row2 -->
                            <div class="d-flex align-items-center">
                                <label class="w-[5rem] label-text">施設名</label>
                                <input type="text" class="flex-1 form-control" v-model="pumpChangeFacilitySelected.src_fac_name" :disabled="disableByStatus()">
                            </div>
        
                            <!-- left-row3 -->
                            <div class="gap-1 d-flex align-items-center">
                                <div class="flex-1 d-flex align-items-center">
                                    <label class="label-text w-[5rem]">宛先名</label>
                                    <input type="text" class="flex-1 form-control" v-model="pumpChangeFacilitySelected.src_clinic" :disabled="disableByStatus()">
                                </div>
                                
                                <input type="text" class="w-[8rem] form-control" v-model="pumpChangeFacilitySelected.src_doctor" :disabled="disableByStatus()">
                                
                                <select class="w-[5.5rem] form-select" v-model="pumpChangeFacilitySelected.src_title" :disabled="disableByStatus()">
                                    <option v-for="title in master.des_title" :value="title.id">{{ title.value }}</option>
                                </select>
                            </div>
        
                            <!-- left-row4 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center w-[50%]">
                                    <label class="w-[5rem] label-text">卸</label>
                                    <select class="flex-1 form-select" v-model="pumpChangeFacilitySelected.src_comp_code" :disabled="disableByStatus()">
                                        <option v-for="item in master.companies" :key="item.comp_cd" :value="item.comp_cd">{{ item.comp_nm_short }}</option>
                                    </select>
                                </div>
                                
                                <div class="d-flex align-items-center w-[50%]">
                                    <label class="w-[3rem] label-text">支店</label>
                                    <input type="text" class="flex-1 form-control" v-model="pumpChangeFacilitySelected.src_dep_name" :disabled="disableByStatus()">
                                </div>
                            </div>
        
                            <!-- left-row5 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center w-[50%]">
                                    <label class="label-text w-[5rem]">MS名</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pumpChangeFacilitySelected.src_staff_name" :disabled="disableByStatus()">
                                </div>
                                <div class="d-flex align-items-center w-[50%]">
                                    <label class="label-text w-[3rem]">電話</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pumpChangeFacilitySelected.src_staff_phone" :disabled="disableByStatus()">
                                </div>
                            </div>
        
                            <!-- left-row6 -->
                            <div class="d-flex align-items-center">
                                <label class="w-[5rem] label-text">Email</label>
                                <input type="text" class="flex-1 form-control" v-model="pumpChangeFacilitySelected.src_staff_email" :disabled="disableByStatus()">
                            </div>
        
                            <!-- left-row7 -->
                            <div class="d-flex">
                                <label class="w-[5rem] label-text">備考</label>
                                <textarea class="flex-1 form-control" v-model="pumpChangeFacilitySelected.src_remarks" :disabled="disableByStatus()"></textarea>
                            </div>
                        </div>
        
                        <!-- mid -->
                        <div class="basis-1/3 d-flex flex-column justify-content-between">
                            <div class="d-grid input-gap" style="height: fit-content;">
                                <!-- mid-row1 -->
                                <div class="gap-3 d-flex align-items-center">
                                    <label class="fw-bold basis-[50%] label-text">■ 転院(転出⇒転入)詳細</label>
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[5rem]">PDF保存者</label>
                                        <select class="flex-1 form-select" v-model="pumpChangeFacilitySelected.smd_staff" :disabled="disableByStatus()">
                                            <option :value="null"></option>
                                            <option v-for="user in master.users" :value="user.username">{{ user.username }}</option>
                                        </select>
                                    </div>
                                </div>
            
                                 <!-- mid-row2 -->
                                 <div class="gap-3 d-flex align-items-center">
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[5rem]">受信日</label>
                                        <Datepicker class="flex-1" v-model="pumpChangeFacilitySelected.receive_date" :disabled="disableByStatus()"></Datepicker>
                                    </div>
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[5rem]">登録日</label>
                                        <Datepicker class="flex-1" v-model="pumpChangeFacilitySelected.regis_date" :disabled="disableByStatus()"></Datepicker>
                                    </div>
                                </div>
            
                                <!-- mid-row3 -->
                                <div class="gap-3 d-flex align-items-center">
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[5rem]">最終外来日</label>
                                        <Datepicker class="flex-1" v-model="pumpChangeFacilitySelected.leave_date" :disabled="disableByStatus()"></Datepicker>
                                    </div>
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[5rem]">初回外来日</label>
                                        <Datepicker class="flex-1" v-model="pumpChangeFacilitySelected.comein_date" :disabled="disableByStatus()"></Datepicker>
                                    </div>
                                </div>
            
                                <!-- mid-row4 -->
                                <div class="gap-3 d-flex align-items-center">
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[5rem]">請求終了月</label>
                                        <Datepicker month-picker format="yyyy年MM月" class="flex-1" v-model="pumpChangeFacilitySelected.srcHistory.invoice_finish" :disabled="disableByStatus()"></Datepicker>
                                    </div>
                                    <div class="d-flex align-items-center basis-[50%]">
                                        <label class="label-text w-[5rem]">請求開始月</label>
                                        <Datepicker month-picker format="yyyy年MM月" class="flex-1" v-model="pumpChangeFacilitySelected.desHistory.invoice_start" :disabled="disableByStatus()"></Datepicker>
                                    </div>
                                </div>
            
                                <!-- mid-row5 -->
                                <div class="d-flex">
                                    <label class="w-[5rem] label-text">備考</label>
                                    <textarea class="flex-1 form-control" v-model="pumpChangeFacilitySelected.change_remarks" :disabled="disableByStatus()"></textarea>
                                </div>
                            </div>
        
                            <div class="pt-1 d-flex align-items-center justify-content-between">
                                <button class="btn" @click="updateGoOut()" :disabled="checkDisableGoOut()">転出終了設定</button>
                                <button class="btn delete" @click="deleteItem()" :disabled="disableByStatus()">転院取消</button>
                                <button class="btn" @click="updateGoIn()" :disabled="checkDisableGoIn()">転入開始設定</button>
                            </div>
                        </div>
        
                        <!-- right -->
                        <div class="basis-1/3 d-grid input-gap" style="height: fit-content;">
                            <!-- right-row1 -->
                            <div class="d-flex align-items-center">
                                <label class="fw-bold basis-[60%] label-text">■ 転院先情報</label>
                                <div class="d-flex align-items-center gap-1 basis-[40%]">
                                    <input type="text" class="flex-1 text-center form-control" :value="pumpChangeFacilitySelected.desHistory?.des_code_text" disabled>
                                    <button class="btn selection" :disabled="disableByStatus()" @click="openFacilitySelection()">選択</button>
                                </div>
                            </div>
        
                            <!-- right-row2 -->
                            <div class="d-flex align-items-center">
                                <label class="w-[5rem] label-text">施設名</label>
                                <input type="text" class="flex-1 form-control" v-model="pumpChangeFacilitySelected.des_fac_name" :disabled="disableByStatus()">
                            </div>
        
                            <!-- right-row3 -->
                            <div class="gap-1 d-flex align-items-center">
                                <div class="flex-1 d-flex align-items-center">
                                    <label class="label-text w-[5rem]">宛先名</label>
                                    <input type="text" class="flex-1 form-control" v-model="pumpChangeFacilitySelected.des_clinic" :disabled="disableByStatus()">
                                </div>
                                
                                <input type="text" class="w-[8rem] form-control" v-model="pumpChangeFacilitySelected.des_doctor" :disabled="disableByStatus()">
                                
                                <select class="w-[5.5rem] form-select" v-model="pumpChangeFacilitySelected.des_title" :disabled="disableByStatus()">
                                    <option v-for="title in master.des_title" :value="title.id">{{ title.value }}</option>
                                </select>
                            </div>
        
                            <!-- right-row4 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center w-[50%]">
                                    <label class="w-[5rem] label-text">卸</label>
                                    <select class="flex-1 form-select" v-model="pumpChangeFacilitySelected.des_comp_code" :disabled="disableByStatus()">
                                        <option v-for="item in master.companies" :key="item.comp_cd" :value="item.comp_cd">{{ item.comp_nm_short }}</option>
                                    </select>
                                </div>
                                
                                <div class="d-flex align-items-center w-[50%]">
                                    <label class="w-[3rem] label-text">支店</label>
                                    <input type="text" class="flex-1 form-control" v-model="pumpChangeFacilitySelected.des_dep_name" :disabled="disableByStatus()">
                                </div>
                            </div>
        
                            <!-- right-row5 -->
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center w-[50%]">
                                    <label class="label-text w-[5rem]">MS名</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pumpChangeFacilitySelected.des_staff_name" :disabled="disableByStatus()">
                                </div>
                                <div class="d-flex align-items-center w-[50%]">
                                    <label class="label-text w-[3rem]">電話</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pumpChangeFacilitySelected.des_staff_phone" :disabled="disableByStatus()">
                                </div>
                            </div>
        
                            <!-- right-row6 -->
                            <div class="d-flex align-items-center">
                                <label class="w-[5rem] label-text">Email</label>
                                <input type="text" class="flex-1 form-control" v-model="pumpChangeFacilitySelected.des_staff_email" :disabled="disableByStatus()">
                            </div>
        
                            <!-- right-row7 -->
                            <div class="d-flex">
                                <label class="w-[5rem] label-text">備考</label>
                                <textarea class="flex-1 form-control" v-model="pumpChangeFacilitySelected.des_remarks" :disabled="disableByStatus()"></textarea>
                            </div>
                        </div>
                    </div>
        
                    <div class="my-2 divider" style="height: 1px;"></div>
        
                    <div class="gap-3 d-flex">
                        <div class="d-flex flex-column input-gap basis-[20%]">
                            <label class="fw-bold label-text">■ 転院 (転出)情報</label>
                            <a href="javascript:void(0)" class="label-text disabled" @click="openTransferSourcePreview()">転院通知票　取込</a>
                            <div class="d-flex align-items-center">
                                <label class="label-text w-[4rem]">受信日</label>
                                <Datepicker class="flex-1" v-model="pumpChangeFacilitySelected.src_receive_date" :disabled="disableByStatus()"></Datepicker>
                            </div>
                            <div class="d-flex align-items-center">
                                <label class="label-text w-[4rem]">提出日</label>
                                <Datepicker class="flex-1" v-model="pumpChangeFacilitySelected.src_apply_date" :disabled="disableByStatus()"></Datepicker>
                            </div>
                            <div class="d-flex align-items-center">
                                <label class="label-text w-[4rem]">発生日</label>
                                <Datepicker class="flex-1" v-model="pumpChangeFacilitySelected.src_event_date" :disabled="disableByStatus()"></Datepicker>
                            </div>
                        </div>
        
                        <div class="basis-[40%] divider-2">
                            <div class="d-flex flex-column input-gap basis-[20%]">
                                <label class="fw-bold label-text">■ 転院元　同意書情報</label>
                                <div class="d-flex align-items-center">
                                    <label class="label-text w-[5rem]">使用開始日</label>
                                    <Datepicker class="flex-1" v-model="pumpChangeFacilitySelected.src_start_date" :disabled="disableByStatus()"></Datepicker>
                                </div>
                                <label class="label-text">※アッヴィシステムと同期</label>
                                <label class="label-text">※使用停止日の起算日</label>
                                <div class="d-flex align-items-center">
                                    <label class="label-text w-[5rem]">カルテNO</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pumpChangeFacilitySelected.src_medical_record" :disabled="disableByStatus()">
                                </div>
                            </div>
            
                            <div class="d-flex flex-column input-gap basis-[20%]">
                                <label class="fw-bold label-text">■ 転院先　同意書関連情報</label>
                                <div class="d-flex align-items-center">
                                    <label class="label-text w-[6rem]">同意書受領日</label>
                                    <Datepicker class="flex-1" v-model="pumpChangeFacilitySelected.agr_receive_date" :disabled="disableByStatus()"></Datepicker>
                                </div>
                                <div class="d-flex align-items-center">
                                    <label class="label-text w-[6rem]">署名日</label>
                                    <Datepicker class="flex-1" v-model="pumpChangeFacilitySelected.agr_signed_date" :disabled="disableByStatus()"></Datepicker>
                                </div>
                                <div class="d-flex align-items-center">
                                    <label class="label-text w-[6rem]">使用開始日</label>
                                    <Datepicker class="flex-1" v-model="pumpChangeFacilitySelected.arg_start_date" :disabled="disableByStatus()"></Datepicker>
                                </div>
                                <div class="d-flex align-items-center">
                                    <label class="label-text w-[6rem]">カルテNO</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pumpChangeFacilitySelected.arg_medical_record" :disabled="disableByStatus()">
                                </div>
                            </div>
                        </div>
        
                        <div class="d-flex flex-column justify-content-between basis-[25%]">
                            <div class="d-grid input-gap">
                                <div style="height: 2.375rem;"></div>
                                <div class="d-flex align-items-center">
                                    <label class="label-text w-[6rem]">PDF保存者</label>
                                    <select class="flex-1 form-select" v-model="pumpChangeFacilitySelected.arg_smd_staff" :disabled="disableByStatus()">
                                            <option :value="null">井野</option>
                                            <option v-for="user in master.users" :value="user.username">{{ user.username }}</option>
                                        </select>
                                </div>
                                <div class="d-flex align-items-center">
                                    <label class="label-text w-[6rem]">患者名</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pumpChangeFacilitySelected.desHistory.patient_kj" :disabled="disableByStatus()">
                                </div>
                                <div class="d-flex align-items-center">
                                    <label class="label-text w-[6rem]">患者名カナ</label>
                                    <input type="text" class="flex-1 text-center form-control" v-model="pumpChangeFacilitySelected.desHistory.patient_kn" :disabled="disableByStatus()">
                                </div>
                                <div class="gap-3 d-flex">
                                    <div class="d-flex align-items-center w-[55%]">
                                        <label class="label-text w-[6rem]">イニシャル</label>
                                        <input type="text" class="flex-1 text-center form-control" v-model="pumpChangeFacilitySelected.desHistory.patient_nm" :disabled="disableByStatus()">
                                    </div>
                                    <div class="d-flex align-items-center w-[45%]">
                                        <label class="label-text w-[6rem]">性別</label>
                                        <select class="form-select f-lex1" v-model="pumpChangeFacilitySelected.desHistory.patient_sex" :disabled="disableByStatus()">
                                            <option v-for="item in master.sex" :value="item.id">{{ item.value }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
        
                        <div class="d-flex flex-column input-gap basis-[15%]">
                            <label class="fw-bold label-text">■ 転院(転入)情報</label>
                            <a href="javascript:void(0)" class="label-text disabled" @click="openTransferDestinationPreview()">治療開始連絡票取込</a>
                            <div class="d-flex align-items-center">
                                <label class="label-text w-[4rem]">受信日</label>
                                <Datepicker class="flex-1" v-model="pumpChangeFacilitySelected.des_receive_date" :disabled="disableByStatus()"></Datepicker>
                            </div>
                            <div class="d-flex align-items-center">
                                <label class="label-text w-[4rem]">提出日</label>
                                <Datepicker class="flex-1" v-model="pumpChangeFacilitySelected.des_apply_date" :disabled="disableByStatus()"></Datepicker>
                            </div>
                            <button class="w-full btn" :disabled="checkDisableComplete()" @click="complete()">転院完了設定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <TransferSourcePreviewModal v-if="isOpenTransferSourcePreview" :show="isOpenTransferSourcePreview" @close="isOpenTransferSourcePreview = false" @confirm="confirmTransferSourcePreview()"></TransferSourcePreviewModal>
    <TransferSourceModal v-if="isOpenTransferSource" :show="isOpenTransferSource" @close="isOpenTransferSource = false"></TransferSourceModal>

    <TransferDestinationPreviewModal v-if="isOpenTransferDestinationPreview" :show="isOpenTransferDestinationPreview" @close="isOpenTransferDestinationPreview = false" @confirm="confirmTransferDestinationPreview()"></TransferDestinationPreviewModal>
    <TransferDestinationModal v-if="isOpenTransferDestination" :show="isOpenTransferDestination" @close="isOpenTransferDestination = false"></TransferDestinationModal>
    
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

    <RegisChangeFacilityModal v-if="isOpenRegisChangeFacility" :show="isOpenRegisChangeFacility" @close="onCloseRegisExchange($event)"></RegisChangeFacilityModal>
    <UpdatePatientInfoModal v-if="isOpenUpdatePatientInfo"
    :show="isOpenUpdatePatientInfo"
    :history="pumpChangeFacilitySelectedOrigin.desHistory"
    :patient_id="pumpChangeFacilitySelectedOrigin.patient.patient_id"
    @close="onCloseUpdatePatientInfo($event)"></UpdatePatientInfoModal>

    <ConfirmModal ref="confirmDialog"></ConfirmModal>
</template>
<style>
    .divider-2 {
        columns: 2;
        column-gap: 1rem;
        column-rule: 1px solid #d0d1cf;
    }
</style>

<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
import TransferSourcePreviewModal from "./modal/change/TransferSourcePreviewModal.vue";
import TransferSourceModal from "./modal/change/TransferSourceModal.vue";
import TransferDestinationPreviewModal from "./modal/change/TransferDestinationPreviewModal.vue";
import TransferDestinationModal from "./modal/change/TransferDestinationModal.vue";
import FacilitySelectionModal from "@/views/RentManagement/modal/FacilitySelectionModal.vue";
import DestinationSelectionModal from "@/views/RentManagement/modal/DestinationSelectionModal.vue";
import RegisChangeFacilityModal from "./modal/change/RegisChangeFacilityModal.vue";
import UpdatePatientInfoModal from "./modal/change/UpdatePatientInfoModal.vue";
import SortHeader from "@/components/Sort.vue";
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue";

import { formatBeforeRequest, dateToMonth, deepClone, displayDate, typeText } from '@/helper.js';
import jp from '@/lang/jp.json';
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
            isOpenRegisChangeFacility: false,
            isOpenUpdatePatientInfo: false,
            isOpenFacilitySelection: false,
            isOpenDestinationSelection: false,
            isShowTable: true,
            pumpChangeFacilityList: [],
            pumpChangeFacilitySelected: {
                srcHistory: {},
                desHistory: {},
                patient: {},
            },
            initChangeFacilitySelected: {
                srcHistory: {},
                desHistory: {},
                patient: {},
            },
            pumpChangeFacilitySelectedOrigin: {

            },
            contract: {},
            pumpFacility: {},
            pumpDestination: {},
        }
    },
    computed: {
        ...mapState({
            master: state => state.change.master,
            search: state => state.change.search,
            pumpCode: state => state.rent.pump_code
        })
    },
    methods: {
        ...mapActions('change', [
            'getMasterChangeFacility', 'getIndexChangeFacility', 'updateChangeFacility', 'updateChangeFacilityGoOut',
            'updateChangeFacilityGoIn', 'deleteChangeFacility', 'completeChangeFacility'
        ]),
        ...mapMutations('change', ['resetSearch']),
        ...mapMutations('rent', ['setContracts', 'setPumpCode']),
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
        openFacilitySelection: function () {
            this.isOpenFacilitySelection = true
        },
        loadContract: function (event) {
            this.isOpenFacilitySelection = false
            this.contract = event
            this.pumpFacility = this.contract.pump_facility
            this.isOpenDestinationSelection = true
           console.log(this.pumpFacility)
        },
        openDestinationSelection: function () {
            this.isOpenDestinationSelection = true
        },
        onCloseDestinationSelection: function () {
            this.isOpenDestinationSelection = false
            this.contract = {}
            this.pumpFacility = {}
            this.pumpDestination = {}
        },
        loadDestination: function (event) {
            this.isOpenDestinationSelection = false
            this.pumpDestination = event
            this.setFacilitySelected(this.pumpFacility, this.pumpDestination)
        },
        setFacilitySelected: function (facility, destination) {
            this.pumpChangeFacilitySelected.des_dcf_code = facility.dcf_code
            this.pumpChangeFacilitySelected.des_fac_name = facility.fac_name
            this.pumpChangeFacilitySelected.des_clinic = destination.des_clinic
            this.pumpChangeFacilitySelected.des_doctor = destination.des_doctor
            this.pumpChangeFacilitySelected.des_title = destination.des_title

            this.pumpChangeFacilitySelected.des_customer_cd = facility.customer_cd
            this.pumpChangeFacilitySelected.des_comp_code = facility.comp_code
            this.pumpChangeFacilitySelected.des_comp_name = facility.comp_name
            this.pumpChangeFacilitySelected.des_dep_name = facility.dep_name
            this.pumpChangeFacilitySelected.des_staff_name = facility.ms_staff_name
            this.pumpChangeFacilitySelected.des_staff_phone = facility.ms_staff_phone
            this.pumpChangeFacilitySelected.des_staff_email = facility.ms_staff_email
            this.pumpChangeFacilitySelected.des_remarks = facility.ms_remarks

            this.pumpChangeFacilitySelected.desHistory.from_shelf = this.pumpChangeFacilitySelected.pump_code+destination.des_shelf
            this.pumpChangeFacilitySelected.desHistory.smd_code = destination.smd_code
            this.pumpChangeFacilitySelected.desHistory.fac_name = facility.fac_name
            this.pumpChangeFacilitySelected.desHistory.des_code = destination.des_code
            this.pumpChangeFacilitySelected.desHistory.des_clinic = destination.des_clinic
            this.pumpChangeFacilitySelected.desHistory.des_doctor = destination.des_doctor
            this.pumpChangeFacilitySelected.desHistory.des_code_text = destination.des_code_text
        },
        openRegisExchange: async function () {
            this.isOpenRegisChangeFacility = true
        },
        onCloseRegisExchange: async function (event) {
            this.isOpenRegisChangeFacility = false
            if(event) {
                this.resetSearch()
                await this.searchChangeFacilityIndex()
            }
        },
        openUpdatePatientInfo: async function () {
            this.isOpenUpdatePatientInfo = true
        },
        onCloseUpdatePatientInfo: async function (event) {
            this.isOpenUpdatePatientInfo = false
            if(event) {
                let pumpChangeFacility = this.pumpChangeFacilitySelected
                pumpChangeFacility.desHistory = event
                this.setPumpChangeFacilitySelected(pumpChangeFacility)
            }
        },
        setPumpChangeFacilitySelected: function (pumpChangeFacility) {
            this.pumpChangeFacilitySelected = {...pumpChangeFacility}
            if(this.pumpChangeFacilitySelected.id) {
                this.pumpChangeFacilitySelected.receive_date_text = this.pumpChangeFacilitySelected.receive_date
                this.pumpChangeFacilitySelected.comein_date_text = this.pumpChangeFacilitySelected.comein_date
                this.pumpChangeFacilitySelected.src_event_date_text = this.pumpChangeFacilitySelected.src_event_date

                this.pumpChangeFacilitySelected.desHistory.patient_nm_text = this.pumpChangeFacilitySelected.desHistory.patient_nm
                this.pumpChangeFacilitySelected.desHistory.patient_kj_text = this.pumpChangeFacilitySelected.desHistory.patient_kj
                this.pumpChangeFacilitySelected.desHistory.patient_kn_text = this.pumpChangeFacilitySelected.desHistory.patient_kn

                this.pumpChangeFacilitySelected.srcHistory.invoice_finish = dateToMonth(this.pumpChangeFacilitySelected.srcHistory.invoice_finish)
                this.pumpChangeFacilitySelected.desHistory.invoice_start = dateToMonth(this.pumpChangeFacilitySelected.desHistory.invoice_start)
            }
            this.pumpChangeFacilitySelectedOrigin = deepClone(this.pumpChangeFacilitySelected)
            this.setPumpCode(this.pumpChangeFacilitySelected.pump_code)
        },
        searchChangeFacilityIndex: async function () {
            await this.getIndexChangeFacility(this.search).then((res) => {
                if(res && res.code == 200) {
                    this.pumpChangeFacilityList = res.data
                    if(this.pumpChangeFacilityList.length > 0) {
                        this.pumpChangeFacilityList.map((item) => {
                            item.receive_date_text = item.receive_date
                            item.comein_date_text = item.comein_date
                            item.src_event_date_text = item.src_event_date

                            item.desHistory.patient_nm_text = item.desHistory.patient_nm
                            item.desHistory.patient_kj_text = item.desHistory.patient_kj
                            item.desHistory.patient_kn_text = item.desHistory.patient_kn
                            return item
                        })
                        this.setPumpChangeFacilitySelected(this.pumpChangeFacilityList[0])
                    } else {
                        this.setPumpChangeFacilitySelected(this.initChangeFacilitySelected)
                    }
                }
            })
        },
        sort: async function () {
            if (this.pumpChangeFacilityList.length > 0) {
                await this.searchChangeFacilityIndex()
            }
        },
        onChangeShowAll: async function () {
            await this.searchChangeFacilityIndex()
        },
        changeItemSelected: function (pumpChangeFacility) {
            if(pumpChangeFacility.id == this.pumpChangeFacilitySelected.id) {
                return
            }
            this.setPumpChangeFacilitySelected(pumpChangeFacility)
        },
        getPayloadUpdate: function (pumpChangeFacility) {
            let data = formatBeforeRequest({...pumpChangeFacility})
            data.desHistory = formatBeforeRequest({...data.desHistory})
            data.srcHistory = formatBeforeRequest({...data.srcHistory})
            data.src_comp_name = typeText(this.master.companies, data.src_comp_code, 'comp_cd', 'comp_nm_short')
            data.des_comp_name = typeText(this.master.companies, data.des_comp_code, 'comp_cd', 'comp_nm_short')
            return data
        },
        update: async function () {
            let payload = this.getPayloadUpdate(this.pumpChangeFacilitySelected)
            await this.updateChangeFacility(payload).then((res) => {
                if(res && res.code == 200) {
                    this.$refs.confirmDialog.show({
                        title: jp.notification_title,
                        message: jp.update_success_new_rent_message,
                        type: 1
                    })
                    this.setPumpChangeFacilitySelected(res.data)
                    this.reloadPumpChangeFacilityList(this.pumpChangeFacilitySelected)
                }

                if(res && res.code == 201) {
                    this.setPumpChangeFacilitySelected(res.data)
                    this.reloadPumpChangeFacilityList(this.pumpChangeFacilitySelected)
                    
                    if(!this.search.is_show_all) {
                        this.searchChangeFacilityIndex()
                    }
                }
            })
        },
        updateGoOut: async function () {
            let payload = this.getPayloadUpdate(this.pumpChangeFacilitySelected)
            await this.updateChangeFacilityGoOut(payload).then((res) => {
                if(res && res.code == 200) {
                    this.$refs.confirmDialog.show({
                        title: jp.notification_title,
                        message: jp.update_success_new_rent_message,
                        type: 1
                    })
                    this.setPumpChangeFacilitySelected(res.data)
                    this.reloadPumpChangeFacilityList(this.pumpChangeFacilitySelected)
                }

                if(res && res.code == 201) {
                    this.setPumpChangeFacilitySelected(res.data)
                    this.reloadPumpChangeFacilityList(this.pumpChangeFacilitySelected)
                    
                    if(!this.search.is_show_all) {
                        this.searchChangeFacilityIndex()
                    }
                }
            })
        },
        updateGoIn: async function () {
            let payload = this.getPayloadUpdate(this.pumpChangeFacilitySelected)
            await this.updateChangeFacilityGoIn(payload).then((res) => {
                if(res && res.code == 200) {
                    this.$refs.confirmDialog.show({
                        title: jp.notification_title,
                        message: jp.update_success_new_rent_message,
                        type: 1
                    })
                    this.setPumpChangeFacilitySelected(res.data)
                    this.reloadPumpChangeFacilityList(this.pumpChangeFacilitySelected)
                }

                if(res && res.code == 201) {
                    this.setPumpChangeFacilitySelected(res.data)
                    this.reloadPumpChangeFacilityList(this.pumpChangeFacilitySelected)
                    
                    if(!this.search.is_show_all) {
                        this.searchChangeFacilityIndex()
                    }
                }
            })
        },
        checkDisableGoOut: function () {
            if(!this.pumpChangeFacilitySelected?.id || ![0].includes(this.pumpChangeFacilitySelected.status)) return true
            return false
        },
        checkDisableGoIn: function () {
            if(!this.pumpChangeFacilitySelected?.id || ![1].includes(this.pumpChangeFacilitySelected.status)) return true
            return false
        },
        checkDisableComplete: function () {
            if(!this.pumpChangeFacilitySelected?.id || ![2, 3].includes(this.pumpChangeFacilitySelected.status)) return true
            return false
        },
        disableByStatus: function () {
            if(this.pumpChangeFacilitySelected.status == 9) return true
            return false
        },
        reloadPumpChangeFacilityList: function (pumpChangeFacility) {
            for(let i = 0; i < this.pumpChangeFacilityList.length; i++) {
                if(this.pumpChangeFacilityList[i].id == pumpChangeFacility.id) {
                    this.pumpChangeFacilityList[i] = pumpChangeFacility
                    break;
                }
            }
        },
        deleteItem: async function () {
            const ok = await this.$refs.confirmDialog.show({
                title: jp.confirm,
                message: jp.delete_change_facility_confirm,
                cancelButton: "キャンセル",
                ok_class: ''
            })
            if(ok) {
                await this.$refs.confirmDialog.close()
                await this.deleteChangeFacility(this.pumpChangeFacilitySelected.id).then((res) => {
                    if(res && res.code == 200) {
                        this.searchChangeFacilityIndex()
                    }
                })
            }
        },
        complete: async function () {
            let payload = this.getPayloadUpdate(this.pumpChangeFacilitySelected)
            const res = await this.completeChangeFacility(payload).then((res) => {
                if(res && res.code == 200) {
                    this.setPumpChangeFacilitySelected(res.data)
                    this.reloadPumpChangeFacilityList(this.pumpChangeFacilitySelected)
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
                if(!this.search.is_show_all) {
                    this.searchChangeFacilityIndex()
                }
            }
        }
    },
    created: async function () {
        await this.getMasterChangeFacility()
        this.search.pump_code = this.$store.state.pump_code
        await this.searchChangeFacilityIndex()
    },
    unmounted: function (){
        this.setContracts([])
        this.setPumpCode()
    }
}
</script>