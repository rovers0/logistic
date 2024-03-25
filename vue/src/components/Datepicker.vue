<template>
    <Datepicker
        :enableTimePicker="false"
        :class="class"
        v-model="value"
        :format="format"
        locale="ja"
        :format-locale="ja"
        cancelText=""
        selectText=""
        auto-apply
        keep-action-row
        :close-on-auto-apply="true"
        :position="position">
    </Datepicker>
</template>
<script setup>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ja } from 'date-fns/locale';
</script>
<script>
export default {
  props: {
    modelValue: {},
    class: { type: String },
    format: { type: String, default: 'yyyy/MM/dd' },
    position: { type: String, default: 'right' }
  },
  emits: ['update:modelValue'],
  data: function () {
    return {
      value: null
    }
  },
  computed: {},
  watch: {
    'value': function () {
      this.$emit('update:modelValue', this.value)
    },
    'modelValue': function () {
      this.value = this.modelValue
    }
  },
  created: function () {
    this.value = this.modelValue
  }
}
</script>