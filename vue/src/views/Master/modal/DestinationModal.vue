<template>
    <ModalLayout :show="show" title="宛先登録・情報編集" maxWidth="max-w-8xl" @close="onClose()">
        <div class="px-3 wrapper-scroll">
            <div class="gap-5 py-3 d-flex justify-content-between">
                <div class="d-flex align-items-end">
                    <label class="fs-5 fw-bold">宛先一覧({{ facility.destinations.length }}件)</label>
                </div>
                <div class="flex-1">
                    <fieldset class="form-border">
                        <legend class="w-auto px-3 center fw-bold fs-6">基本情報</legend>
                        <div class="d-flex flex-column input-gap">
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[30%]">
                                    <label class="label-text w-[6rem]">SMDコード</label>
                                    <input type="text" class="flex-1 text-center form-control" readonly :value="facility.smd_code">
                                </div>
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[6rem]">施設名</label>
                                    <input type="text" class="flex-1 form-control" readonly :value="facility.fac_name">
                                </div>
                                <div class="d-flex align-items-center basis-[30%]">
                                    <label class="label-text w-[6rem]">電話番号</label>
                                    <input type="text" class="flex-1 text-center form-control" readonly :value="facility.fac_tel">
                                </div>
                            </div>
    
                            <div class="gap-3 d-flex">
                                <div class="d-flex align-items-center basis-[30%]">
                                    <label class="label-text w-[6rem]">郵便番号</label>
                                    <input type="text" class="flex-1 text-center form-control" readonly :value="facility.fac_post">
                                </div>
                                <div class="d-flex align-items-center basis-[40%]">
                                    <label class="label-text w-[6rem]">施設住所</label>
                                    <input type="text" class="flex-1 form-control" readonly :value="facility.fac_addr">
                                </div>
                                <div class="d-flex align-items-center basis-[30%]">
                                    <label class="label-text w-[6rem]">FAX番号</label>
                                    <input type="text" class="flex-1 text-center form-control" readonly :value="facility.fac_fax">
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="d-flex align-items-end">
                    <button class="btn selection w-[6rem]" :disabled="!isUpdate" @click="setUpAction()">新規</button>
                </div>
            </div>

            <div class="parent-scroll" style="min-height: 7rem;">
                <table class="view-scroll t-border">
                    <thead class="text-center">
                        <tr>
                            <th>コード</th>
                            <th>【新規】　受取者</th>
                            <th>【新規】棚</th>
                            <th>【交換】受取者</th>
                            <th>A001</th>
                            <th>A005</th>
                            <th>定期交換FAXご案内先</th>
                            <th>FAX番号</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr v-for="des in facility.destinations" :class="{'selected': des.des_code == destination_selected.des_code}" @click="setUpAction(des)">
                            <td class="text-center">{{ des.des_code_text }}</td>
                            <td>{{ des.des_doctor ? des.des_doctor +' '+ des.des_title ?? '' : '' }}</td>
                            <td class="text-center">{{ des.des_shelf }}</td>
                            <td class="text-center">{{ des.exc_doctor ? des.exc_doctor +' '+ des.exc_title ?? '' : '' }}</td>
                            <td class="text-center">{{ typeText(master.need_first || [], des.exc_need_first) }}</td>
                            <td class="text-center">{{ typeText(master.cant_last || [], des.exc_cant_last) }}</td>
                            <td class="text-center">{{ des.ann_persion ? des.ann_persion +' '+ des.ann_title ?? '' : '' }}</td>
                            <td class="text-center">{{ des.des_fax }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="gap-3 py-3 d-flex">
                <div class="d-flex flex-column gap-4 basis-[50%]">
                    <!-- group 1 -->
                    <div>
                        <fieldset class="flex-1 px-2 form-border">
                            <legend class="w-auto px-3 left fw-bold fs-6">納入先(新規)</legend>
                            <div class="d-flex flex-column input-gap">
                                <!-- group1-row1 -->
                                <div class="gap-3 d-flex">
                                    <div class="d-flex align-items-center basis-[75%]">
                                        <label class="label-text w-[6rem]">施設名</label>
                                        <input type="text" class="flex-1 form-control" v-model="destination_selected.des_name" :disabled="destination_selected.des_copy">
                                    </div>
                                    <label class="gap-1 label-text d-flex align-items-center">
                                        <input type="checkbox" class="mt-0 form-check-input" v-model="destination_selected.des_copy" @change="onChangeDesCopy()" v-bind:true-value="1" v-bind:false-value="0">基本情報同様
                                    </label>
                                </div>
    
                                <!-- group1-row2 -->
                                <div class="gap-3 d-flex">
                                    <div class="d-flex align-items-center basis-[35%]">
                                        <label class="label-text w-[6rem]">郵便番号</label>
                                        <input type="text" class="flex-1 text-center form-control" v-model="destination_selected.des_postcode" :disabled="destination_selected.des_copy">
                                    </div>
                                    <div class="d-flex align-items-center basis-[65%]">
                                        <label class="label-text w-[5rem]">施設住所</label>
                                        <input type="text" class="flex-1 form-control" v-model="destination_selected.des_address" :disabled="destination_selected.des_copy">
                                    </div>
                                </div>
                
                                <!-- group1-row3 -->
                                <div class="gap-3 d-flex">
                                    <div class="d-flex align-items-center basis-[65%]">
                                        <label class="label-text w-[6rem]">受取部署名</label>
                                        <input type="text" class="flex-1 form-control" v-model="destination_selected.des_clinic">
                                    </div>
                                    <div class="d-flex align-items-center basis-[35%]">
                                        <label class="label-text w-[5rem]">電話番号</label>
                                        <input type="text" class="flex-1 text-center form-control" v-model="destination_selected.des_tel" :disabled="destination_selected.des_copy">
                                    </div>
                                </div>
                
                                <!-- group1-row4 -->
                                <div class="gap-3 d-flex">
                                    <div class="d-flex align-items-center basis-[65%] gap-3">
                                        <div class="d-flex align-items-center basis-[65%]">
                                            <label class="label-text w-[6rem]">受取担当名</label>
                                            <input type="text" class="flex-1 form-control" v-model="destination_selected.des_doctor">
                                        </div>
                                        <div class="d-flex align-items-center basis-[35%]">
                                            <label class="label-text w-[2.5rem]">敬称</label>
                                            <select class="flex-1 form-select" v-model="destination_selected.des_title">
                                                <option v-for="title in master.des_title" :value="title.id">{{ title.value }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center basis-[35%]">
                                        <label class="label-text w-[5rem]">FAX番号</label>
                                        <input type="text" class="flex-1 text-center form-control" v-model="destination_selected.des_fax" :disabled="destination_selected.des_copy">
                                    </div>
                                </div>
    
                                <!-- group1-row5 -->
                                <div class="gap-3 d-flex">
                                    <div class="d-flex align-items-center basis-[30%]">
                                        <label class="label-text w-[6rem]">指定出荷棚</label>
                                        <select class="flex-1 form-select" v-model="destination_selected.des_shelf">
                                            <option v-for="self in master.des_shelf" :value="self.id">{{ self.value }}</option>
                                        </select>
                                    </div>
                                    <div class="d-flex align-items-center basis-[70%]">
                                        <label class="label-text w-[3rem]">特記I</label>
                                        <input type="text" class="flex-1 form-control" v-model="destination_selected.des_remark1">
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    <!-- group 2 -->
                    <div>
                        <fieldset class="flex-1 px-2 form-border">
                            <legend class="w-auto px-3 left fw-bold fs-6">定期交換FAXご案内先情報</legend>
                            <div class="d-flex flex-column input-gap">
                                <!-- group2-row1 -->
                                <div class="gap-3 d-flex">
                                    <div class="d-flex align-items-center basis-[75%]">
                                        <label class="label-text w-[6rem]">施設名</label>
                                        <input type="text" class="flex-1 form-control" v-model="destination_selected.ann_name" :disabled="destination_selected.ann_copy">
                                    </div>
                                    <label class="gap-1 label-text d-flex align-items-center">
                                        <input type="checkbox" class="mt-0 form-check-input" v-model="destination_selected.ann_copy" @change="onChangeAnnCopy()" v-bind:true-value="1" v-bind:false-value="0">受取先と同様
                                    </label>
                                </div>
                
                                <!-- group2-row2 -->
                                <div class="gap-3 d-flex">
                                    <div class="d-flex align-items-center basis-[65%]">
                                        <label class="label-text w-[6rem]">案内部署</label>
                                        <input type="text" class="flex-1 form-control" v-model="destination_selected.ann_place" :disabled="destination_selected.ann_copy">
                                    </div>
                                    <div class="d-flex align-items-center basis-[35%]">
                                        <label class="label-text w-[5rem]">電話番号</label>
                                        <input type="text" class="flex-1 text-center form-control" v-model="destination_selected.ann_tel" :disabled="destination_selected.ann_copy">
                                    </div>
                                </div>
                
                                <!-- group2-row3 -->
                                <div class="gap-3 d-flex">
                                    <div class="d-flex align-items-center basis-[65%] gap-3">
                                        <div class="d-flex align-items-center basis-[65%]">
                                            <label class="label-text w-[6rem]">案内担当者</label>
                                            <input type="text" class="flex-1 form-control" v-model="destination_selected.ann_persion">
                                        </div>
                                        <div class="d-flex align-items-center basis-[35%]">
                                            <label class="label-text w-[2.5rem]">敬称</label>
                                            <select class="flex-1 form-select" v-model="destination_selected.ann_title">
                                                <option v-for="title in master.des_title" :value="title.id">{{ title.value }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center basis-[35%]">
                                        <label class="label-text w-[5rem]">FAX番号</label>
                                        <input type="text" class="flex-1 text-center form-control" v-model="destination_selected.ann_fax" :disabled="destination_selected.ann_copy">
                                    </div>
                                </div>
    
                                <!-- group2-row4 -->
                                <div class="d-flex align-items-center">
                                    <label class="label-text w-[6rem]">特記I</label>
                                    <input type="text" class="flex-1 form-control" v-model="destination_selected.ann_remark1">
                                </div>
    
                                <!-- group2-row5 -->
                                <div class="d-flex align-items-center">
                                    <label class="label-text w-[6rem]">特記II</label>
                                    <input type="text" class="flex-1 form-control" v-model="destination_selected.ann_remark2">
                                </div>
    
                                <!-- group2-row6 -->
                                <div class="gap-3 d-flex align-items-center">
                                    <div class="d-flex align-items-center basis-[65%]">
                                        <label class="label-text w-[6rem]">備考</label>
                                        <input type="text" class="flex-1 form-control" v-model="destination_selected.ann_note">
                                    </div>
                                    <div class="d-flex align-items-center basis-[35%]">
                                        <label class="label-text w-[10rem]">PDFフォーマット番号</label>
                                        <select class="flex-1 form-select" v-model="destination_selected.pdf_format">
                                            <option v-for="i in 1">{{ i }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>

                <div class="d-flex flex-column justify-content-between gap-4 basis-[50%]">
                    <!-- group 3 -->
                    <div>
                        <fieldset class="flex-1 px-2 form-border">
                            <legend class="w-auto px-3 left fw-bold fs-6">納入先(交換)</legend>
                            <div class="d-flex flex-column input-gap">
                                <!-- group3-row1 -->
                                <div class="gap-3 d-flex">
                                    <div class="d-flex align-items-center basis-[75%]">
                                        <label class="label-text w-[6rem]">施設名</label>
                                        <input type="text" class="flex-1 form-control" v-model="destination_selected.exc_name" :disabled="destination_selected.exc_copy">
                                    </div>
                                    <label class="gap-1 label-text d-flex align-items-center">
                                        <input type="checkbox" class="mt-0 form-check-input" v-model="destination_selected.exc_copy" @change="onChangeExcCopy()" v-bind:true-value="1" v-bind:false-value="0">基本情報同様
                                    </label>
                                </div>
    
                                <!-- group3-row2 -->
                                <div class="gap-3 d-flex">
                                    <div class="d-flex align-items-center basis-[35%]">
                                        <label class="label-text w-[6rem]">郵便番号</label>
                                        <input type="text" class="flex-1 text-center form-control" v-model="destination_selected.exc_postcode" :disabled="destination_selected.exc_copy">
                                    </div>
                                    <div class="d-flex align-items-center basis-[65%]">
                                        <label class="label-text w-[5rem]">施設住所</label>
                                        <input type="text" class="flex-1 form-control" v-model="destination_selected.exc_address" :disabled="destination_selected.exc_copy">
                                    </div>
                                </div>
                
                                <!-- group3-row3 -->
                                <div class="gap-3 d-flex">
                                    <div class="d-flex align-items-center basis-[65%]">
                                        <label class="label-text w-[6rem]">受取部署名</label>
                                        <input type="text" class="flex-1 form-control" v-model="destination_selected.exc_clinic">
                                    </div>
                                    <div class="d-flex align-items-center basis-[35%]">
                                        <label class="label-text w-[5rem]">電話番号</label>
                                        <input type="text" class="flex-1 text-center form-control" v-model="destination_selected.exc_tel" :disabled="destination_selected.exc_copy">
                                    </div>
                                </div>
                
                                <!-- group3-row4 -->
                                <div class="gap-3 d-flex">
                                    <div class="d-flex align-items-center basis-[65%] gap-3">
                                        <div class="d-flex align-items-center basis-[65%]">
                                            <label class="label-text w-[6rem]">受取担当名</label>
                                            <input type="text" class="flex-1 form-control" v-model="destination_selected.exc_doctor">
                                        </div>
                                        <div class="d-flex align-items-center basis-[35%]">
                                            <label class="label-text w-[2.5rem]">敬称</label>
                                            <select class="flex-1 form-select" v-model="destination_selected.exc_title">
                                                <option v-for="title in master.des_title" :value="title.id">{{ title.value }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center basis-[35%]">
                                        <label class="label-text w-[5rem]">FAX番号</label>
                                        <input type="text" class="flex-1 text-center form-control" v-model="destination_selected.exc_fax" :disabled="destination_selected.exc_copy">
                                    </div>
                                </div>
    
                                <!-- group3-row5 -->
                                <div class="gap-3 py-2 d-flex">
                                    <div class="d-flex align-items-center basis-[65%]">
                                        <label class="label-text w-[6rem]">指定出荷棚</label>
                                        <label class="gap-1 label-text d-flex align-items-center">
                                            <input type="checkbox" class="mt-0 form-check-input" v-model="destination_selected.exc_need_first" v-bind:true-value="1" v-bind:false-value="0">A001必須
                                        </label>
                                        <label class="gap-1 label-text d-flex align-items-center ms-4">
                                            <input type="checkbox" class="mt-0 form-check-input" v-model="destination_selected.exc_cant_last" v-bind:true-value="1" v-bind:false-value="0">A005不可
                                        </label>
                                    </div>
                                    <div class="d-flex align-items-center basis-[35%]">
                                        <label class="gap-1 label-text d-flex align-items-center">
                                            <input type="checkbox" class="mt-0 form-check-input" v-model="destination_selected.exc_preconfirm" v-bind:true-value="1" v-bind:false-value="0">定期交換時の都度確認
                                        </label>
                                    </div>
                                </div>
    
                                <!-- group3-row6 -->
                                <div class="d-flex">
                                    <label class="label-text w-[6rem]">特記I</label>
                                    <textarea class="flex-1 form-control" v-model="destination_selected.exc_remark1"></textarea>
                                </div>
    
                                <!-- group3-row7 -->
                                <div class="d-flex">
                                    <label class="label-text w-[6rem]">特記II</label>
                                    <textarea class="flex-1 form-control" v-model="destination_selected.exc_remark2"></textarea>
                                </div>
    
                                <!-- group3-row8 -->
                                <div class="d-flex">
                                    <label class="label-text w-[6rem]">備考</label>
                                    <textarea class="flex-1 form-control" v-model="destination_selected.exc_note"></textarea>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    <div class="d-flex justify-content-around">
                        <button class="btn selection w-[8rem]" v-if="rent" :disabled="!destination_selected?.des_code || destination?.des_code == ''" @click="load()">選択</button>
                        <button class="btn default w-[8rem]" @click="onClose()">キャンセル</button>
                        <button class="btn w-[8rem]" @click="save()">保存</button>
                    </div>
                </div>
            </div>
        </div>
    </ModalLayout>

    <ConfirmModal ref="confirmDialog"></ConfirmModal>
</template>

<script setup>
import { mapActions, mapState, mapMutations } from "vuex";
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue";
import { PUMP_DESTINATION_SCHEMA } from '@/validation/schema.js';
import { typeText, mapPayload, textNull } from '@/helper.js';
import { DES_TITLE_SAMA } from "@/components/Constants.vue";
import jp from '@/lang/jp.json';
</script>
<script>
export default {
    props: ['show', 'facility', 'destination', 'rent'],
    emits: ['close', 'saved', 'load'],
    data: function () {
        return {
            init_payload: {
                des_code: '',
                des_code_text: '',
                des_name: '',
                des_copy: 1,
                des_postcode: '',
                des_address: '',
                des_clinic: '',
                des_tel: '',
                des_doctor: '',
                des_title: DES_TITLE_SAMA,
                des_fax: '',
                des_shelf: '',
                des_remark1: '',

                exc_copy: 1,
                exc_name: '',
                // exc_code: '', ???
                exc_postcode: '',
                exc_address: '',
                exc_clinic: '',
                exc_tel: '',
                exc_doctor: '',
                exc_title: DES_TITLE_SAMA,
                exc_fax: '',
                exc_need_first: 0,
                exc_cant_last: 0,
                exc_preconfirm: 0,
                exc_remark1: '',
                exc_remark2: '',
                exc_note: '',

                ann_copy: 1,
                ann_name: '',
                ann_place: '',
                ann_tel: '',
                ann_persion: '',
                ann_title: DES_TITLE_SAMA,
                ann_fax: '',
                ann_remark1: '',
                ann_remark2: '',
                ann_note: '',
                pdf_format: 1,
            },
            destination_selected: {
                map: function (object) {
                    return mapPayload(this, {...object})
                },
                textNull: function () {
                    return textNull(this)
                },
                copyDes: function (ob) {
                    const object = {...ob}
                    this.des_name     = object.fac_name
                    this.des_postcode = object.fac_post
                    this.des_address  = object.fac_addr
                    this.des_tel      = object.fac_tel
                    this.des_fax      = object.fac_fax
                },
                copyDesTmp: function (ob) {
                    const object = {...ob}
                    this.des_name     = object.des_name
                    this.des_postcode = object.des_postcode
                    this.des_address  = object.des_address
                    this.des_tel      = object.des_tel
                    this.des_fax      = object.des_fax
                },
                copyAnn: function (ob) {
                    const object = {...ob}
                    this.ann_name  = object.exc_name
                    this.ann_place = object.exc_address
                    this.ann_tel   = object.exc_tel
                    this.ann_fax   = object.exc_fax
                },
                copyAnnTmp: function (ob) {
                    const object = {...ob}
                    this.ann_name  = object.ann_name
                    this.ann_place = object.ann_place
                    this.ann_tel   = object.ann_tel
                    this.ann_fax   = object.ann_fax
                },
                copyExc: function (ob) {
                    const object = {...ob}
                    this.exc_name     = object.des_name
                    this.exc_postcode = object.des_postcode
                    this.exc_address  = object.des_address
                    this.exc_tel      = object.des_tel
                    this.exc_fax      = object.des_fax
                },
                copyExcTmp: function (ob) {
                    const object = {...ob}
                    this.exc_name     = object.exc_name
                    this.exc_postcode = object.exc_postcode
                    this.exc_address  = object.exc_address
                    this.exc_tel      = object.exc_tel
                    this.exc_fax      = object.exc_fax
                },
            },
            destination_compare: {
                map: function (object) {
                    return mapPayload(this, {...object})
                }
            },
            tmp_des_copy: {
                copy: function (ob) {
                    const object = {...ob}
                    this.des_name     = object.des_name
                    this.des_postcode = object.des_postcode
                    this.des_address  = object.des_address
                    this.des_tel      = object.des_tel
                    this.des_fax      = object.des_fax
                }
            },
            tmp_ann_copy: {
                copy: function (ob) {
                    const object = {...ob}
                    this.ann_name  = object.ann_name
                    this.ann_place = object.ann_place
                    this.ann_tel   = object.ann_tel
                    this.ann_fax   = object.ann_fax
                }
            },
            tmp_exc_copy: {
                copy: function (ob) {
                    const object = {...ob}
                    this.exc_name     = object.exc_name
                    this.exc_postcode = object.exc_postcode
                    this.exc_address  = object.exc_address
                    this.exc_tel      = object.exc_tel
                    this.exc_fax      = object.exc_fax
                }
            },
            isUpdate: false,
            valid: false,
        }
    },
    watch: {
        // 'destination': {
        //     deep: true,
        //     handler: async function () {
        //         await PUMP_DESTINATION_SCHEMA.validate(this.destination).then(() => {
        //             this.valid = true;
        //         }).catch(() => {
        //             this.valid = false;
        //         })
        //     }
        // }
    },
    computed: {
        ...mapState({
            master: state => state.facility.master
        }),
    },
    methods: {
        ...mapActions('facility', ['storePumpDestination', 'updatePumpDestination', 'getMasterFacility']),
        ...mapMutations('facility', ['setDestination']),
        clear: async function () {
            if(JSON.stringify(this.destination_compare) != JSON.stringify(this.destination_selected)) {
                const ok = await this.$refs.confirmDialog.show({
                    title: jp.notification_title,
                    message: jp.clear_input_message,
                })
                await this.$refs.confirmDialog.close()
                return ok
            }
            return true
        },
        onClose: async function () {
            if(await this.clear()) {
                this.$emit('close')
            }
        },
        setUpAction: async function (selected=null) {
            if(await this.clear()) {
                if(selected) {
                    this.isUpdate = true
                    this.destination_selected.map(selected)
                } else {
                    this.isUpdate = false
                    this.destination_selected.map(this.init_payload)
                    this.onChangeDesCopy()
                    this.onChangeExcCopy()
                    this.onChangeAnnCopy()
                }
                this.destination_compare.map(this.destination_selected)
            }
        },
        onChangeDesCopy: function () {
            if(this.destination_selected.des_copy) {
                this.tmp_des_copy.copy(this.destination_selected)
                this.destination_selected.copyDes(this.facility)
            } else {
                this.destination_selected.copyDesTmp(this.tmp_des_copy)
            }
        },
        onChangeAnnCopy: function () {
            if(this.destination_selected.ann_copy) {
                this.tmp_ann_copy.copy(this.destination_selected)
                this.destination_selected.copyAnn(this.destination_selected)
            } else {
                this.destination_selected.copyAnnTmp(this.tmp_ann_copy)
            }
        },
        onChangeExcCopy: function () {
            if(this.destination_selected.exc_copy) {
                this.tmp_exc_copy.copy(this.destination_selected)
                this.destination_selected.copyExc(this.destination_selected)
            } else {
                this.destination_selected.copyExcTmp(this.tmp_exc_copy)
            }
        },
        save: async function () {
            if(this.isUpdate) {
                await this.updatePumpDestination({smd_code: this.facility.smd_code, des_code: this.destination_selected.des_code, payload: this.destination_selected.textNull()}).then((res) => {
                    if(res && res.code == 200) {
                        this.destination_selected.map(res.data)
                        this.destination_compare.map(this.destination_selected)

                        this.facility.destinations = this.facility.destinations.map(item => {
                            if(item.des_code == res.data.des_code) return res.data
                            return item
                        })

                        this.setDestination(this.facility.destinations)
                    }
                })
            }

            if(!this.isUpdate) {
                await this.storePumpDestination({smd_code: this.facility.smd_code, payload: this.destination_selected.textNull()}).then((res) => {
                    if(res && res.code == 200) {
                        this.destination_selected.map(res.data)
                        this.destination_compare.map(this.destination_selected)
                        this.facility.destinations.unshift(res.data)
                        this.isUpdate = true

                        this.setDestination(this.facility.destinations)
                    }
                })
            }
        },
        load: function () {
            this.facility.destinations.forEach(des => {
                if(this.destination_selected.des_code == des.des_code) {
                    this.$emit('load', des)
                }
            })
        }
    },
    created: async function () {
        console.log(this.facility)
        await this.getMasterFacility()
        this.destination_selected = {...this.destination_selected, ...this.init_payload}
        this.destination_selected.des_shelf = this.master.des_shelf[0].id
        this.destination_compare = {...this.destination_compare, ...this.init_payload}

        if(this.destination && Object.keys(this.destination).length > 0) {
            this.destination_selected.map(this.destination)
            this.isUpdate = true
        } else {
            if(this.rent && this.facility.destinations.length > 0) {
                this.destination_selected.map(this.facility.destinations[0])
                this.isUpdate = true
            } else {
                this.isUpdate = false
                this.onChangeDesCopy()
                this.onChangeExcCopy()
                this.onChangeAnnCopy()
            }
        }
        
        this.destination_compare.map(this.destination_selected)
    }
}
</script>