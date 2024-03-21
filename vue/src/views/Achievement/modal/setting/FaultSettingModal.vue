<template>
    <ModalLayout :show="show" title="故障情報登録" maxWidth="max-w-2xl" @close="onClose()">
        <div class="p-2 d-grid input-gap">
            <div class="gap-3 d-flex"> 
                <div class="d-flex align-items-center basis-[50%]">
                    <label class="w-[9rem] label-text">現在シリアル <span class="text-danger">(※)</span></label>
                    <input type="text" class="flex-1 text-center form-control" :value="payload.serial_no" disabled>
                </div>
                <div class="d-flex align-items-center basis-[50%]">
                    <label class="w-[7rem] label-text">患者コード</label>
                    <input type="text" class="flex-1 form-control" :value="payload.patient_cd" disabled>
                </div>
            </div>

            <div class="gap-3 d-flex"> 
                <div class="d-flex align-items-center basis-[50%]">
                    <label class="w-[7rem] label-text">連絡受信日</label>
                    <Datepicker class="flex-1" v-model="payload.date_mail_recv"></Datepicker>
                </div>
                <div class="d-flex align-items-center basis-[50%]">
                    <label class="w-[7rem] label-text">納品予定日</label>
                    <Datepicker class="flex-1" v-model="payload.date_deli_hope"></Datepicker>
                </div>
            </div>

            <div class="d-flex align-items-center">
                <label class="w-[7rem] label-text">備考</label>
                <input type="text" class="flex-1 form-control">
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
                serial_no: null,
                patient_cd: null,
                date_mail_recv: null,
                date_deli_hope: null,
            }
        }
    },
    methods: {
        ...mapActions('fault', ['storeChangeFault']),
        onClose: function () {
            this.$emit('close');
        },
        register: async function () {
            await this.storeChangeFault(formatBeforeRequest(this.payload)).then((res) => {
                if(res && res.code == 200) {
                    console.log(res)
                    this.$router.push({ name: "AchievementFault" })
                }
            })
        }
    },
    created: async function () {
        this.payload.serial_no = this.data.serial_no
        this.payload.patient_cd = this.data.patient_cd
    }
}
</script>