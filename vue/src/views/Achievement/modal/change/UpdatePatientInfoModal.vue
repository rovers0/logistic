<template>
    <ModalLayout :show="show" title="患者マスタ編集" maxWidth="max-w-2xl" @close="onClose()">
        <div class="gap-3 px-3 py-2 d-grid">
            <div class="flex-1 gap-3 d-flex">
                <div class="d-flex align-items-center basis-[40%]">
                    <label class="label-text w-[4rem]">コード</label>
                    <input type="text" class="flex-1 text-center form-control" :value="history.patient_cd" disabled>
                </div>

                <div class="d-flex align-items-center basis-[60%]">
                    <label class="label-text w-[5rem]">略名(性別)</label>
                    <input type="text" class="flex-1 text-center form-control" v-model="patient.patient_nm">
                </div>
            </div>

            <div class="d-flex align-items-center">
                <label class="label-text w-[6rem]">患者名(漢字)</label>
                <input type="text" class="flex-1 text-center form-control" v-model="patient.patient_kj">
            </div>

            <div class="flex-1 gap-3 d-flex">
                <div class="d-flex align-items-center basis-[60%]">
                    <label class="label-text w-[6rem]">患者名(カナ)</label>
                    <input type="text" class="flex-1 text-center form-control" v-model="patient.patient_kn">
                </div>

                <div class="d-flex align-items-center basis-[40%]">
                    <label class="label-text w-[3rem]">性別</label>
                    <select class="flex-1 form-select" v-model="patient.patient_sex">
                        <option v-for="item in master.sex" :value="item.id">{{ item.value }}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="px-3 py-3 d-flex justify-content-around">
            <button class="btn default w-[8rem]" @click="onClose()">キャンセル</button>
            <button class="btn w-[6rem]" :disabled="!valid" @click="submit()">保存</button>
        </div>
    </ModalLayout>
</template>
<style scoped>
button.btn{
    font-family: inherit;
    font-size: 1rem;
    padding: 0.375rem 0.75rem;
}
</style>
<script setup>
import { mapState, mapActions } from "vuex";
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import { SEX_MALE } from "@/components/Constants.vue";
import { PATIENT_SCHEMA } from '@/validation/schema.js';
import { deepClone } from '@/helper.js';
</script>
<script>
export default {
    props: ['show', 'history', 'patient_id'],
    emits: ['close', 'saved'],
    data: function () {
        return {
            patient: {
                map: function (ob) {
                    this.patient_cd = ob.patient_cd
                    this.patient_kj = ob.patient_kj
                    this.patient_kn = ob.patient_kn
                    this.patient_nm = ob.patient_nm
                    this.patient_sex = ob.patient_sex
                },
                patient_cd: null,
                patient_kj: null,
                patient_kn: null,
                patient_nm: null,
                patient_sex: SEX_MALE,
            },
            valid: false,
        }
    },
    computed: {
        ...mapState({
            master: state => state.change.master
        }),
    },
    watch: {
        'patient': {
            deep: true,
            handler: async function () {
                await PATIENT_SCHEMA.validate(this.patient).then(() => {
                    this.valid = true;
                }).catch(() => {
                    this.valid = false;
                })
            }
        }
    },
    methods: {
        ...mapActions('patient', ['updatePatientHistory']),
        ...mapActions('change', ['getMasterChangeFacility']),
        onClose: function () {
            this.$emit('close');
        },
        submit: async function () {
            let params = {
                patient_id: this.patient_id,
                hist_no: this.history.hist_no,
                payload: this.patient
            }
            await this.updatePatientHistory(params).then((res) => {
                if(res && res.code == 200) {
                    this.$emit('close', res.data)
                }
            })
        }
    },
    created: async function () {
        await this.getMasterChangeFacility()
        this.patient.map(this.history)
    }
}
</script>