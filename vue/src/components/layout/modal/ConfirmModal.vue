<template>
    <div v-if="is_show">
        <ModalLayout :show="is_show" :title="title" maxWidth="max-w-xl" @close="_cancel()">
            <!-- <div class="px-2 pt-3" :class="{'text-danger': type == 3}" v-html="message"></div> -->
            <div class="px-2 pt-3" v-html="message"></div>
            <div class="p-3 d-flex justify-content-around">
                <button class="btn default w-[8rem]" @click="_cancel()">{{ cancelButton }}</button>
                <button class="btn w-[8rem]" :class="ok_class" v-if="type == 0" @click="_confirm()">{{ okButton }}</button>
            </div>
        </ModalLayout>
    </div>
</template>
<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
</script>
<script>
export default {
    expose: ['show', 'close'],
    data: function () {
        return {
            is_show: false,
            title: null,
            message: null,
            okButton: '実行',
            cancelButton: '閉じる',
            type: 0, // type => 0: confirm | 1: notification | 3: error,
            ok_class: 'default'
        }
    },
    methods: {
        initOption: async function () {
            this.is_show = false
            this.title = null
            this.message = null
            this.okButton = '実行'
            this.cancelButton = '閉じる'
            this.type = 0
            this.ok_class = 'default'
        },
        show: function (opts = {}) {
            this.is_show = true
            this.title = opts.title ? opts.title : this.title
            this.message = opts.message ? opts.message : this.message
            this.okButton = opts.okButton ? opts.okButton : this.okButton
            this.cancelButton = opts.cancelButton ? opts.cancelButton : this.cancelButton
            this.type = opts.type ? opts.type : this.type
            this.ok_class = opts.ok_class || opts.ok_class === "" ? opts.ok_class : this.ok_class

            return new Promise((resolve, reject) => {
                this.resolvePromise = resolve
                this.rejectPromise = reject
            })
        },
        _confirm: async function () {
            this.resolvePromise(true)
        },
        _cancel: async function () {
            await this.initOption()
            this.resolvePromise(false)
        },
        close: async function () {
            await this.initOption()
        }
    }
}
</script>