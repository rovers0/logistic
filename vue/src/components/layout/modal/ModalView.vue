<template>
  <div class="modal-overlay"> <!-- touch outside to close: @click="$emit('close-modal')" -->
    <div v-if="type != 4" class="modal" @click.stop>
      <img v-if="type == 0" class="icon screen" src="/images/icons/ic_success.svg" alt="success" style="display: inline;"/>
      <img v-else-if="type == 1" class="icon red" src="/images/icons/ic_error.svg" alt="success" style="display: inline;"/>
      <img v-else-if="type == 2" class="icon orange" src="/images/icons/ic_warning.svg" alt="success" style="display: inline;"/>

      <h6 class="title">{{title}}</h6>
      <p style="word-break: break-word;">{{message}}</p>

      <div v-if="type == 2" style="width: 80%; display: inline-block;">
        <template v-if="value.action == 'change-title'">
          <button class="btn grey" @click="$emit('close-modal', value)" style="margin-top: 20px; min-width: 45%; float: left;">キャンセル</button>
          <button class="btn" @click="$emit('confirm-ok', value)" style="margin-top: 20px; min-width: 45%; float: right;">実行</button>
        </template>
        <template v-else>
          <button class="btn grey" @click="$emit('close-modal')" style="margin-top: 20px; min-width: 45%; float: left;">キャンセル</button>
          <button class="btn" @click="$emit('confirm-ok', value)" style="margin-top: 20px; min-width: 45%; float: right;">実行</button>
        </template>
      </div>
      <button v-else class="btn grey" @click="$emit('close-modal', value);" style="margin-top: 20px; min-width: 120px;">閉じる</button>
    </div>
    <div v-if="type == 4" class="modal size-loading" @click.stop style=" align-items: center; display: flex; justify-content: center;">
      <img class="icon" src="/images/icons/g_loading.gif" alt="loading" style="display: inline;"/>
    </div>
  </div>
</template>

<style scoped>
.title{
  font-size: 28px;
}
.icon {
  width: 96px;
  height: 96px;
}
.icon.red{
  filter: invert(37%) sepia(22%) saturate(7399%) hue-rotate(341deg) brightness(92%) contrast(97%);
}
.icon.screen{
  filter: invert(51%) sepia(70%) saturate(401%) hue-rotate(72deg) brightness(99%) contrast(86%);
}
.icon.orange{
  filter: invert(72%) sepia(31%) saturate(6570%) hue-rotate(359deg) brightness(100%) contrast(108%);
}
.modal-overlay {
  z-index: 99;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  width: 80%;
  height: fit-content;
  max-width: 450px;
  padding: 20px 10px;
  border-radius: 20px;
  margin: auto;
}
.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}
.size-loading{
  width: 172px;
  height: 172px;
}
@media screen and (max-width: 768px) {
  .title{
    font-size: 26px;
  }
  .modal {
    padding: 20px 10px;
  }
  .icon {
    width: 72px;
    height: 72px;
  }
  .size-loading{
  width: 128px;
  height: 128px;
}
}

</style>

<script>
  export default {
    props: {
      title: String,
      message: String,
      type: Number, // 0:Success - 1:Erorr - 2:Warning - 4:Loading
      value: Object,
    }
  }
</script>
