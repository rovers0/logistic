<template>
    <ModalLayout :show="show" title="新規中止登録" maxWidth="max-w-2xl" @close="onClose()">
        <div class="p-2 d-grid input-gap">
            <div class="gap-3 d-flex"> 
                <div class="d-flex align-items-center basis-[50%]">
                    <label class="w-[6rem] label-text">患者コード</label>
                    <input type="text" class="flex-1 text-center form-control" :value="payload.patient_cd" disabled>
                </div>
                <div class="d-flex align-items-center basis-[50%]">
                    <label class="w-[7rem] label-text">情報受信日</label>
                    <Datepicker class="flex-1" v-model="payload.recv_info_date"></Datepicker>
                </div>
            </div>

            <div class="gap-3 d-flex"> 
                <div class="d-flex align-items-center basis-[100%] justify-content-center">
                    <label class="gap-2 mt-3 label-text d-flex align-items-center">
                        <input type="checkbox" class="mt-0 form-check-input" v-model="payload.delete_rent">ポンプ回収不要
                    </label>
                </div>
            </div>
        </div>

        <div class="pt-2 pb-3 d-flex justify-content-around">
            <button class="btn default w-[8rem]" @click="onClose()">キャンセル</button>
            <button class="btn w-[8rem]" @click="register()">登録</button>
        </div>
    </ModalLayout>

    <ConfirmModal ref="confirmDialog"></ConfirmModal>
</template>
<style scoped>
</style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue"
import { formatBeforeRequest } from '@/helper.js';
// import jp from '@/lang/jp.json'
</script>
<script>
export default {
    props: ['show', 'data'],
    emits: ['close', 'reload'],
    data: function () {
        return {
            payload: {
                patient_cd: null,
                receive_date: null,
                delete_rent: false,
            }
        }
    },
    methods: {
        ...mapActions('cancel', ['stopRent']),
        onClose: function () {
            this.$emit('close');
        },
        register: async function () {
            let message = 'jp.confirm_stop_rent'
            if([3,4].includes(this.data?.shipment?.status)) {
                message = 'jp.confirm_stop_rent_has_shipment'
            }

            const ok = await this.$refs.confirmDialog.show({
                title: 'jp.confirm',
                message: message,
                cancelButton: "キャンセル",
                ok_class: ''
            })

            if(ok) {
                console.log(this.payload)
                await this.stopRent(formatBeforeRequest(this.payload)).then((res) => {
                    if(res) {
                        if(res.code == 200) {
                            this.$emit('close', true)
                            this.$router.push({ name: "AchievementCancel" })
                        }

                        if(res.code == 201) {
                            this.$emit('reload')
                        }
                    }
                })
            }
        }
    },
    created: async function () {
        this.payload.patient_cd = this.data.patient_cd
    }
}
</script>