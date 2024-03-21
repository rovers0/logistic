<template>
    <ModalLayout :show="show" title="転院データ登録" maxWidth="max-w-sm" @close="onClose()">
        <div class="p-2">
            <div class="d-flex flex-column input-gap">
                <div class="d-flex align-items-center">
                    <label class="label-text w-[6rem]">シリアルNo.</label>
                    <input type="text" class="flex-1 text-center form-control" v-model="payload.serial_no" :disabled="payload.patient_cd?.length > 0" maxlength="20">
                </div>
                <div class="d-flex align-items-center">
                    <label class="label-text w-[6rem]">患者コード</label>
                    <input type="text" class="flex-1 text-center form-control" placeholder="X-PR-XXXX" v-model="payload.patient_cd" :disabled="payload.serial_no?.length > 0" maxlength="10">
                </div>
            </div>
        </div>

        <div class="pt-2 pb-3 d-flex justify-content-around">
            <button class="btn default w-[6rem]" @click="onClose()">閉じる</button>
            <button class="btn w-[6rem]" @click="createChangeFacility()" :disabled="!payload.serial_no && !payload.patient_cd">作成</button>
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
    emits: ['close'],
    data: function () {
        return {
            payload: {
                serial_no: null,
                patient_cd: null,
            },
            reload: false,
        }
    },
    methods: {
        ...mapActions('change', ['storeChangeFacility']),
        onClose: function () {
            this.$emit('close', this.reload)
        },
        createChangeFacility: async function () {
            await this.storeChangeFacility(this.payload).then((res) => {
                if(res && res.code == 200) {
                    this.reload  = true
                    this.onClose()
                }
            })
        }
    },
    unmounted: async function () {
    }
}
</script>