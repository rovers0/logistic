<template>
    <ModalLayout :show="show" title="患者選択" maxWidth="max-w-8xl" @close="onClose()">
        <div class="p-2 wrapper-scroll">
            <form class="gap-3 mb-3 d-flex" @submit.prevent="submitSearch()">
                <div class="flex-1 gap-3 d-flex">
                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="label-text w-[6rem]">患者コード</label>
                        <input type="text" class="flex-1 text-center form-control" v-model="search.patient_cd">
                    </div>
                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="label-text w-[5rem]">患者名</label>
                        <input type="text" class="flex-1 text-center form-control" v-model="search.patient_name">
                    </div>
                    <div class="d-flex align-items-center basis-[40%]">
                        <label class="label-text w-[4rem]">略名</label>
                        <input type="text" class="flex-1 form-control" v-model="search.patient_nm">
                    </div>
                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="label-text w-[6rem]">性別</label>
                        <select class="flex-1 form-select" v-model="search.patient_sex">
                            <option :value="null">全て</option>
                            <option v-for="item in master.sex" :value="item.id">{{ item.value }}</option>
                        </select>
                    </div>
                </div>

                <div class="gap-1 d-flex">
                    <button type="button" class="btn default w-[6.5rem]" @click="initSearch(); submitSearch();">リセット</button>
                    <button type="submit" class="btn w-[6rem]">検索</button>
                </div>
            </form>

            <div class="mb-1 d-flex justify-content-between align-items-center">
                <label class="label-text fs-5 fw-bold">検索結果一覧：　{{ patients.length }}件</label>
                <button class="btn selection w-[6rem]" @click="load()" :disabled="!patientSelected.patient_cd">選択</button>
            </div>

            <div class="parent-scroll" style="min-height: 20rem;">
                <table class="view-scroll t-border allow-select">
                    <thead class="text-center">
                        <tr>
                            <th>患者コード</th>
                            <th>患者名(漢字)</th>
                            <th>患者名(カナ)</th>
                            <th>性別</th>
                            <th>略名</th>
                            <th>ポンプ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="patient in patients" @click="select(patient)"
                            :class="{
                                'selected': patient.patient_cd == patientSelected.patient_cd,
                                'row-disable': rowDisable(patient)
                                }">
                            <td class="text-center">{{ patient.patient_cd }}</td>
                            <td class="text-center">{{ patient.patient_kj }}</td>
                            <td class="text-center">{{ patient.patient_kn }}</td>
                            <td class="text-center">{{ typeText(master.sex, patient.patient_sex) }}</td>
                            <td class="text-center">{{ patient.patient_nm }}</td>
                            <td class="text-center">{{ pump_code }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="pt-3 pb-2 d-flex justify-content-center">
                <button class="btn default w-[6rem]" @click="onClose()">閉じる</button>
            </div>
        </div>
    </ModalLayout>
</template>
<style scoped>
</style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import SortHeader from "@/components/Sort.vue";
import { typeText } from '@/helper.js';
</script>
<script>
export default {
    props: ['show', 'pump_code'],
    emits: ['close', 'load'],
    data: function () {
        return {
            search: {
                page: 1,
                sort: null,
                sort_by: 'desc'
            },
            patientSelected: {}
        }
    },
    computed: {
        ...mapState({
            master: state => state.patient.master,
            patients: state => state.patient.patients,
        }),
    },
    watch: {
        
    },
    methods: {
        ...mapActions('patient', ['getPatient', 'getMasterPatient']),
        ...mapMutations('patient', ['setPatients']),
        onClose: function () {
            this.$emit('close')
        },
        initSearch: function () {
            this.search.patient_cd   = null
            this.search.patient_nm   = null
            this.search.patient_name = null
            this.search.patient_sex  = null
        },
        loadIndexData: async function () {
            await this.getPatient(this.search).then((res) => {
                if(res && res.code == 200) {
                    this.setPatients(res.data)
                    this.patientSelected = {}
                }
            })
        },
        submitSearch: function () {
            this.search.page = 1
            this.search.sort = null
            this.loadIndexData()
        },
        sort: function () {
            if(this.patientList.length > 0) {
                this.search.page = 1
                this.loadIndexData()
            }
        },
        select: function (patient) {
            if(!this.rowDisable(patient)) {
                this.patientSelected = patient
            }
        },
        load: function () {
            this.$emit('load', this.patientSelected)
        },
        rowDisable: function (patient) {
            return false
        }
    },
    created: async function () {
        await this.getMasterPatient()
        this.initSearch()
        this.search.pump_code = this.pump_code
        if(this.patients.length == 0) {
            await this.loadIndexData()
        }
    
        this.patients.forEach(ct => {
            if(ct.patient_cd == this.patientSelected.patient_cd) {
                this.patients = ct
            }
        })
    }
}
</script>