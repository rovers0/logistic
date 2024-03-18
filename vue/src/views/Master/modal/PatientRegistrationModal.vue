<template>
    <ModalLayout :show="show" title="患者新規登録" maxWidth="max-w-2xl" @close="onClose()">
        <div class="gap-3 px-3 py-2 d-grid">
            <div class="flex-1 gap-3 d-flex">
                <div class="d-flex align-items-center basis-[30%]">
                    <label class="label-text w-[6rem]">ポンプ</label>
                    <select class="flex-1 form-select" v-model="patient.pump_code" @change="onChangePumpCode()">
                        <option v-for="machine in master.machines" :value="machine.pump_cd">{{ machine.pump_cd }}</option>
                    </select>
                </div>
                <div class="d-flex align-items-center basis-[35%]">
                    <label class="label-text w-[4rem]">コード</label>
                    <input
                        type="text"
                        class="flex-1 text-center form-control"
                        v-model="patient.patient_cd"
                        @input="patient.patient_cd = onlyPR(patient.patient_cd)"
                        maxlength="11"
                        minlength="7"
                    />
                </div>

                <div class="d-flex align-items-center basis-[35%]">
                    <label class="label-text w-[5rem]">略名(性別)</label>
                    <input type="text" class="flex-1 text-center form-control" v-model="patient.patient_nm" />
                </div>
            </div>

            <div class="d-flex align-items-center">
                <label class="label-text w-[6rem]">患者名(漢字)</label>
                <input type="text" class="flex-1 text-center form-control" v-model="patient.patient_kj" />
            </div>

            <div class="flex-1 gap-3 d-flex">
                <div class="d-flex align-items-center basis-[60%]">
                    <label class="label-text w-[6rem]">患者名(カナ)</label>
                    <input type="text" class="flex-1 text-center form-control" v-model="patient.patient_kn" />
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
            <button class="btn default w-[6rem]" @click="onClose()">閉じる</button>
            <button class="btn w-[6rem]" :disabled="!valid" @click="submit()">登録</button>
        </div>
    </ModalLayout>
</template>
<style scoped>
button.btn {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.375rem 0.75rem;
}
.parent {
    position: relative;
    width: fit-content;
    margin: 0 auto;
}
.lb-input {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-0.5rem, -52%);
}
</style>
<script setup>
import { mapState, mapActions } from 'vuex'
import ModalLayout from '@/components/layout/modal/ModalLayout.vue'
import { SEX_MALE } from '@/components/Constants.vue'
import { PATIENT_SCHEMA } from '@/validation/schema.js'
import { onlyNumber } from '@/helper.js'
</script>
<script>
export default {
    props: ['show'],
    emits: ['close', 'saved'],
    data: function () {
        return {
            patient: {
                pump_code: 'A',
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
            master: (state) => state.patient.master,
        }),
    },
    watch: {
        patient: {
            deep: true,
            handler: async function () {
                await PATIENT_SCHEMA.validate(this.patient)
                    .then(() => {
                        this.valid = true
                    })
                    .catch(() => {
                        this.valid = false
                    })
            },
        },
    },
    methods: {
        ...mapActions('patient', ['storePatient', 'getPatientCode']),
        onClose: function () {
            this.$emit('close')
        },
        submit: async function () {
            await this.storePatient(this.patient).then((res) => {
                if (res && res.code == 200) {
                    this.$store.state.pump_code = this.patient.pump_code
                    this.$emit('saved', res.data)
                }
            })
        },
        onlyPR: function (value) {
            return value = this.patient.pump_code+'-PR-'+value.replace(/[^0-9]/g, "")
        },
        onChangePumpCode: function () {
            this.patient.patient_cd = this.patient.pump_code+this.patient.patient_cd.substring(1)
        }
    },
    created: async function () {
        await this.getPatientCode().then((res) => {
            if (res && res.code == 200) {
                this.patient.patient_cd = this.patient.pump_code+'-PR-'+res.data
            }
        })
        this.patient.pump_code = this.$store.state.pump_code ?? 'A'
    },
}
</script>
