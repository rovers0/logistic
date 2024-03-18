<template>
    <ModalLayout :show="true" title="宛先コード新規生成" maxWidth="max-w-sm" @close="onClose()">
        <div class="p-2 justify-content-center d-flex parent">
            <input type="text" class="text-center form-control" v-model="des_input" @input="des_input = onlyDes(des_input)" maxlength="6" minlength="5">
        </div>

        <div class="pt-2 pb-3 d-flex justify-content-center">
            <button class="btn default w-[6rem]" @click="onClose()">登録</button>
        </div>
    </ModalLayout>
</template>
<style scoped>
    .parent {
        position: relative;
        width: fit-content;
        margin: 0 auto;
    }
    .lb-input {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        left: 1rem;
    }
</style>
<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import { onlyNumber } from '@/helper.js';
</script>
<script>
export default {
    props: ['show', 'des_code', 'smd_code'],
    emits: ['close'],
    data: function () {
        return {
            des_input: null,
        }
    },
    methods: {
        onClose: function () {
            this.$emit('close', this.des_input.substring(this.smd_code.toString().length))
        },
        number: function (key) {
            this[key] = onlyNumber(this[key])
        },
        onlyDes: function (value) {
            value = value.substring(this.smd_code.toString().length)
            return value = `${this.smd_code}${value.replace(/[^0-9]/g, "")}`
        },
    },
    created: function () {
        this.des_input = this.smd_code+''+this.des_code
    }
}
</script>