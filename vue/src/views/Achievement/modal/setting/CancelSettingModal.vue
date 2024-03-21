<template>
    <ModalLayout :show="show" :title=" payload.pause_flag? '中断登録' : '中止登録'" maxWidth="max-w-2xl" @close="onClose()">
        <div class="p-2 d-grid input-gap">
            <div class="gap-3 d-flex"> 
                <div class="d-flex align-items-center basis-[50%]">
                    <label class="w-[9rem] label-text">現在シリアル <span class="text-danger">(※)</span></label>
                    <input type="text" class="flex-1 text-center form-control" :value="payload.serial_no" disabled>
                </div>
                <div class="d-flex align-items-center basis-[50%]">
                    <label class="w-[7rem] label-text">患者コード</label>
                    <input type="text" class="flex-1 text-center form-control" :value="payload.patient_cd" disabled>
                </div>
            </div>

            <template v-if="payload.pause_flag">
                <div class="gap-3 d-flex"> 
                    <div class="d-flex align-items-center basis-[50%]">
                        <label class="w-[7rem] label-text">連絡受信日</label>
                        <Datepicker class="flex-1" v-model="payload.pause_recv_date"></Datepicker>
                    </div>
                    <div class="d-flex align-items-center basis-[50%]">
                        <label class="w-[7rem] label-text">中断開始日</label>
                        <Datepicker class="flex-1" v-model="payload.pause_start_date"></Datepicker>
                    </div>
                </div>
    
                <div class="gap-3 d-flex">
                    <div class="d-flex align-items-center basis-[50%]">
                    </div>
                    <div class="d-flex align-items-center basis-[50%]">
                        <label class="w-[7rem] label-text">請求停止年月</label>
                        <Datepicker month-picker format="yyyy年MM月" class="flex-1" v-model="payload.invoice_finish"></Datepicker>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="gap-3 d-flex"> 
                    <div class="d-flex align-items-center basis-[50%]">
                        <label class="w-[7rem] label-text">連絡受信日</label>
                        <Datepicker class="flex-1" v-model="payload.recv_info_date"></Datepicker>
                    </div>
                    <div class="d-flex align-items-center basis-[50%]">
                        <label class="w-[7rem] label-text">中断開始日</label>
                        <Datepicker class="flex-1" v-model="payload.stop_date"></Datepicker>
                    </div>
                </div>
    
                <div class="gap-3 d-flex">
                    <div class="d-flex align-items-center basis-[50%]">
                    </div>
                    <div class="d-flex align-items-center basis-[50%]">
                        <label class="w-[7rem] label-text">請求停止年月</label>
                        <Datepicker month-picker format="yyyy年MM月" class="flex-1" v-model="payload.invoice_finish"></Datepicker>
                    </div>
                </div>
            </template>
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
                serial_no: null,
                patient_cd: null,
                pause_flag: 1,
                pause_recv_date: null,
                pause_start_date: null,
                invoice_finish: null,
                recv_info_date: null,
                stop_date: null,
            }
        }
    },
    methods: {
        ...mapActions('cancel', ['storeCancel']),
        onClose: function () {
            this.$emit('close')
        },
        register: async function () {
            await this.storeCancel(formatBeforeRequest(this.payload)).then((res) => {
                if(res && res.code == 200) {
                    console.log(res)
                    this.$emit('close', true)
                    this.$router.push({ name: "AchievementCancel" })
                }
            })
        }
    },
    created: function () {
        console.log(this.data)
        this.payload.serial_no = this.data.serial_no
        this.payload.patient_cd = this.data.patient_cd
        this.payload.pause_flag = this.data.pause_flag
    }
}
</script>