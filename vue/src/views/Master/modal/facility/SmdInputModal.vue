<template>
    <ModalLayout :show="true" title="SMD新規生成" maxWidth="max-w-sm" @close="onClose()">
        <div class="p-2 justify-content-center d-flex">
            <input type="text" class="text-center form-control w-[8rem]" v-model="smd_input" @input="number('smd_input')" maxlength="10" minlength="4">
        </div>

        <div class="pt-2 pb-3 d-flex justify-content-center">
            <button class="btn default w-[6rem]" @click="onClose()">登録</button>
        </div>
    </ModalLayout>
</template>
<style scoped>
</style>
<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import { onlyNumber } from '@/helper.js';
</script>
<script>
export default {
    props: ['show', 'smd_code'],
    emits: ['close'],
    data: function () {
        return {
            smd_input: null,
        }
    },
    methods: {
        onClose: function () {
            this.$emit('close', this.smd_input)
        },
        number: function (key) {
            this[key] = onlyNumber(this[key])
        }
    },
    created: function () {
        this.smd_input = this.smd_code
    }
}
</script>