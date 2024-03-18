<template>
    <ModalLayout :show="show" title="締結完了設定" maxWidth="max-w-sm" :class="'px-0'" @close="closeConclusion()">
        <div class="container">
            <div class="mt-2 mb-2">
                該当契約に契約完了を設定します。
            </div>
            <div class="mb-2 d-flex justify-content-between">
                <label class="col-form-label">契約書送信日</label>
                <div class="">
                    <date-picker class="" v-model="send_date" :enableTimePicker="false" format="yyyy/MM/dd" locale="ja" cancelText="" selectText="" auto-apply keep-action-row :close-on-auto-apply="true"></date-picker>
                </div>
            </div>
            <div class="mb-2 d-flex justify-content-between">
                <label class="col-form-label">締結日</label>
                <div class="">
                    <date-picker class="" v-model="signed_date" :enableTimePicker="false" format="yyyy/MM/dd" locale="ja" cancelText="" selectText="" auto-apply keep-action-row :close-on-auto-apply="true"></date-picker>
                </div>
            </div>
          <div class="mb-2 d-flex justify-content-between">
                <label class="col-form-label" for="is_auto_renew">自動更新 <input class="form-check-input" type="checkbox" v-model="is_auto_renew" id="is_auto_renew" @change="month_renew = null"></label>

            </div>

          <div class="mb-2 d-flex justify-content-between">
                <label class="col-form-label">次の更新</label>
                <div class="">
                  <date-picker :disabled="is_auto_renew || (!signed_date && !first_date) ? true : false" v-model="month_renew" :enableTimePicker="false" format="yyyy年MM月" locale="ja" cancelText="" selectText="" auto-apply keep-action-row month-picker :close-on-auto-apply="true"></date-picker>
                </div>
            </div>

            <div class="mt-1 mb-2 d-flex justify-content-evenly">
                <button class="btn default" @click="closeConclusion">閉じる</button>
                <button :disabled="( !signed_date  )" class="btn default w-28" @click="conclusionContract">実行</button>
            </div>
        </div>
    </ModalLayout>
</template>
<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import DatePicker from "@vuepic/vue-datepicker";
import '@vuepic/vue-datepicker/dist/main.css';
import moment from 'moment';
const props = defineProps({
    show: Boolean,
    data: Object,
});
</script>
<script>
export default {
    emits: ["closeConclusion", "loadData"],
    data: function () {
        return {
            actionModal: '',
            showFacilitySelectionDetail: false,
            send_date: null,
            signed_date: null,
            is_auto_renew: null,
            month_renew: null,
            first_date: null,
        };
    },
    updated: function () {
        this.loadData();
    },
    mounted: function () {
        this.loadData();
    },
    methods: {
        loadData: function() {
            this.send_date = this.$props.data.contract.send_date;
            this.signed_date = this.$props.data.contract.signed_date;
            this.month_renew = this.$props.data.contract.month_renew;
            this.is_auto_renew = this.$props.data.contract.is_auto_renew;
            this.first_date = this.$props.data.contract.first_date;
        },
        closeConclusion: function () {
            this.send_date = null;
            this.signed_date = null;
            this.month_renew = null;
            this.is_auto_renew = null;
            this.first_date = null;
            this.$emit("closeConclusion");
        },
        conclusionContract: function () {
            let data = {
                id: this.$props.data.contract.id,
                send_date: this.send_date ? moment(this.send_date).format('yyyy/MM/DD') : null,
                signed_date: this.signed_date ? moment(this.signed_date).format('yyyy/MM/DD') : null,
                is_auto_renew: this.is_auto_renew,
                month_renew: this.month_renew ? moment(this.month_renew).format('yyyy/MM/DD') : null
            };
            this.$store.dispatch("conclusionContract", data).then((res) => {
                if(res.data.success) {
                    this.$emit("loadData");
                    this.closeConclusion();
                }
            });
        }
    },
};
</script>
  