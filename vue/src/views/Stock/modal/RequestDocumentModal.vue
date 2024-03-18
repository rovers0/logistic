<template>
    <ModalLayout :show="show" title="依頼書番号発行依頼文書" maxWidth="max-w-md" :class="'px-0'" @close="closeRequestDocument()">
        <div class="container">
            <div class="mt-2 mb-2 row">
                <div class="col-9">
                    <textarea class="form-control" rows="6" v-model="content"></textarea>
                </div>
                <div class="col-3">
                    <button class="btn w-[5rem] mb-4" @click="copyData">複製</button>
                    <button class="btn w-[5rem] default" @click="closeRequestDocument()">閉じる</button>
                </div>
            </div>
        </div>
    </ModalLayout>
</template>
<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
const props = defineProps({
    show: Boolean,
    data: Object,
});
</script>
<script>
export default {
    emits: ["closeRequestDocument"],
    data: function () {
        return {
            content: ''
        };
    },
    updated: function () {
        this.loadData();
    },
    mounted: function () {
        this.loadData();
    },
    methods: {
        closeRequestDocument: function () {
            this.$emit("closeRequestDocument");
        },
        loadData: function () {
            this.content = this.$props.data;
        },
        copyData: function () {
            navigator.clipboard.writeText(this.content);
        }
    },
};
</script>
  