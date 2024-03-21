<template>
    <ModalLayout :show="show" title="定期交換対象の設定" maxWidth="max-w-2xl" @close="onClose()">
        <div class="p-2 d-grid input-gap">
            <div class="gap-3 d-flex"> 
                <div class="d-flex align-items-center basis-[50%]">
                    <label class="w-[7rem] label-text">使用開始日</label>
                    <Datepicker class="flex-1" v-model="data.dateof_use" disabled></Datepicker>
                </div>
                <div class="d-flex align-items-center basis-[50%]">
                    <label class="w-[7rem] label-text">納品予定日</label>
                    <Datepicker class="flex-1" v-model="payload.plan_send_deli"></Datepicker>
                </div>
            </div>

            <div class="d-flex">
                <label class="w-[7rem] label-text">備考</label>
                <textarea class="flex-1 form-control" v-model="payload.ms_remarks"></textarea>
            </div>
        </div>

        <div class="pt-2 pb-3 d-flex justify-content-around">
            <button class="btn default w-[8rem]" @click="onClose()">キャンセル</button>
            <button class="btn w-[8rem]" @click="register()">登録</button>
        </div>
    </ModalLayout>
</template>
<style scoped>
</style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import { formatBeforeRequest } from '@/helper.js';
</script>
<script>
export default {
    props: ['show', 'data'],
    emits: ['close'],
    data: function () {
        return {
            payload: {
                patient_cds: [],
                agr_start_use: null,
                plan_send_deli: null,
                ms_remarks: null,
            },
        }
    },
    methods: {
        ...mapActions('exchange', ['storeExchange']),
        onClose: function () {
            this.$emit('close');
        },
        register: async function () {
            await this.storeExchange(formatBeforeRequest(this.payload)).then((res) => {
                if(res && res.code == 200) {
                    console.log(res)
                    this.$router.push({ name: "ExchangeIndex" })
                }
            })
        }
    },
    created: function () {
        console.log(this.data)
        this.payload.patient_cds.push(this.data.patient_cd)
    }
}
</script>