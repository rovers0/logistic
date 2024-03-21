<template>
    <ModalLayout :show="show" title="中断・中止データ登録" maxWidth="max-w-sm" @close="onClose()">
        <div class="px-3 py-3">
            <div class="d-flex flex-column input-gap">
                <div class="gap-3 d-flex">
                    <label class="gap-2 d-flex align-items-center label-text">
                        <input type="radio" class="mt-0 form-check-input" name="pause_flag" v-model="payload.pause_flag" :value="1">レンタル中断
                    </label>
                    <label class="gap-2 d-flex align-items-center label-text">
                        <input type="radio" class="mt-0 form-check-input" name="pause_flag" v-model="payload.pause_flag" :value="0">レンタル中止
                    </label>
                </div>
                <div class="d-flex align-items-center">
                    <label class="label-text w-[6rem]">シリアルNo.</label>
                    <input type="text" class="flex-1 text-center form-control" v-model="payload.serial_no" :disabled="payload.patient_cd?.length > 0" maxlength="20">
                </div>
                <div class="d-flex align-items-center">
                    <label class="label-text w-[6rem]">患者コード</label>
                    <input type="text" class="flex-1 text-center form-control" v-model="payload.patient_cd" placeholder="X-PR-XXXX" :disabled="payload.serial_no?.length > 0" maxlength="10">
                </div>
            </div>
    
            <div class="pt-3 d-flex justify-content-around">
                <button class="btn default w-[6rem]" @click="onClose()">閉じる</button>
                <button class="btn w-[6rem]" @click="register()" :disabled="!payload.serial_no && !payload.patient_cd">登録</button>
            </div>
        </div>
    </ModalLayout>
</template>
<style scoped>
</style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
</script>
<script>
export default {
    props: ['show'],
    emits: ['close', 'confirm'],
    data: function () {
        return {
            payload: {
                serial_no: null,
                patient_cd: null,
                pause_flag: 1,
            },
            reload: false,
        }
    },
    methods: {
        ...mapActions('cancel', ['storeCancel']),
        onClose: function () {
            this.$emit('close')
        },
        register: async function () {
            this.$emit('confirm', this.payload)
            // await this.storeCancel(this.payload).then((res) => {
            //     if(res && res.code == 200) {
            //         this.reload  = true
            //         this.onClose()
            //     }
            // })
        }
    }
}
</script>