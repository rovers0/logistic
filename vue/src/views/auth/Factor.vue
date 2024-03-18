<template>
    <div class="mt-[2.5rem] login-body " style="margin-top: 10%" >
      <div class="">
          <div class="login-head" >
            <h3 class="text-center fw-bold fs-5">
              ポンプ管理
            </h3>
          </div>
        <h5 class=" text-center mt-[1.5rem]">
          第２パスワードの　{{ factornum[0] }}，{{ factornum[1] }}，{{ factornum[2] }}，{{ factornum[3]}}　番の数字を入力してください
        </h5>
      </div>
      <form class="factor-area form-login-detail" @submit.prevent="login">
        <Alert v-if="errorMsg">
          <ul>
            <li v-for="error in errorMsg">
              {{ error }}
            </li>
          </ul>
          <span
            @click="errorMsg = ''"
            class="w-[2rem] flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </Alert>
        <div class="flex-wrap d-flex justify-content-center">
          <div class="factor-with">
            <input
              id="factornum1"
              name="factornum1"
              type="text"
              autocomplete="current-factornum1"
              maxlength="1"
              required=""
              @keyup="isNumber($event)"
              v-model="user.factornum1"
              class="form-control"
            />
          </div>
          <div class="factor-with">
            <input
              id="factornum2"
              name="factornum2"
              type="text"
              @keyup.enter="
                $event.target.parentElement.nextSibling.children[1].focus()
              "
              autocomplete="current-factornum2"
              maxlength="1"
              required=""
              @keyup="isNumber($event)"
              v-model="user.factornum2"
              class="form-control"
            />
          </div>
          <div class="factor-with">
            <input
              id="factornum3"
              name="factornum3"
              type="text"
              autocomplete="current-factornum3"
              maxlength="1"
              required=""
              @keyup="isNumber($event)"
              v-model="user.factornum3"
              pattern="\d+"
              class="form-control"
            />
          </div>
          <div class="factor-with">
            <input
              id="factornum4"
              name="factornum4"
              type="text"
              autocomplete="current-factornum4"
              maxlength="1"
              required=""
              @keyup="isNumber($event)"
              v-model="user.factornum4"
              class="form-control"
            />
          </div>
        </div>

          <div class="col-6 offset-3 mt-[1rem]">
              <button
                  type="submit"
                  :disabled="loading"
                  class="btn btn-primary btn-lg form-control"
                  :class="{
                  'cursor-not-allowed': loading,
                  'hover:bg-indigo-500': loading,
                }"
              ><i class="fa fa-lock" aria-hidden="true"></i>
                  ログイン
              </button>
          </div>
      </form>
    </div>
</template>

<script setup>
import store from "../../store";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import Alert from "../../components/Alert.vue";
const router = useRouter();

const user = {
  factornum1: "",
  factornum2: "",
  factornum3: "",
  factornum4: "",
  factornum: "",
};
let loading = ref(false);
let errorMsg = ref("");
let factornum = sessionStorage.getItem("FACTOR");
factornum = factornum.split(',')

function isNumber($event) {
  let value = $event.key;
  const regex = /^\d{1}$/;
  if (regex.exec(value)) {
    if ($event.target.parentElement.nextSibling != undefined) {
      $event.target.parentElement.nextSibling.firstChild.focus();
    }
    return;
  } else {
    $event.target.value = $event.target.value.replace(/[^0-9]+/g, "");
    return;
  }
}
function login() {
  if (
    user.factornum1 &&
    user.factornum2 &&
    user.factornum3 &&
    user.factornum4
  ) {
    user.factornum = factornum;
    loading.value = true;
    store
      .dispatch("factor", user)
      .then(() => {
        loading.value = false;
        router.push({
          name: "Dashboard",
        });
      })
      .catch((err) => {
        loading.value = false;
        errorMsg.value = err.response.data.errors;
      });
  } else {
    if (alert("第２パスワードが不正です。")) {
      loading.value = false;
    }
  }
}
//store.dispatch("getFactor");

const factor = sessionStorage.getItem("FACTOR")
  ? sessionStorage.getItem("FACTOR")
  : "";
</script>
