<template>
    <div class="mt-[2.5rem]" style="margin-top: 10%" >
        <img class=" logo-login" src="/logo-1.png" alt="Workflow" />
        <div class="pb-[2.5rem] bg-light-blue" style="border-top: 3px #0F3B94 solid" >
            <div class="pt-1 col-8 offset-2" >
                <div class="relative login-head" >
                    <h3 class="mt-[1.75rem] ">
                        <img class=" logo-login-icon" src="/logo-2.png" alt="Workflow" /><span class="fw-bold fs-5 ml-[0.5rem]">ポンプ管理</span>
                    </h3>
                </div>
                <form class="form-login-detail" @submit="login" autocomplete="off">
                    <Alert v-if="errorMsg">
                        {{ errorMsg }}
                        <span
                            @click="errorMsg = ''"
                            class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"
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

                    <div class="row mt-[1.5rem]">
                        <div class="form-group row">
                            <label for="username" class="col-sm-3 col-form-label">ログインID</label>
                            <div class="col-sm-9">
                                <input type="text"  class="form-control" id="username"   placeholder="ログインID"
                                       autocomplete="do-not-autofill"
                                       required=""
                                       v-model="user.userid">
                            </div>
                        </div>
                        <div class="form-group row mt-[0.75rem]">
                            <label for="password" class="col-sm-3 col-form-label">パスワード</label>
                            <div class="col-sm-9">
                                <input type="password"  class="form-control" id="password"
                                       autocomplete="do-not-autofill"
                                       required=""
                                       placeholder="パスワード"
                                       v-model="user.password">
                            </div>
                        </div>

                        <div class="pt-2 col-9 offset-3">
                            <div class="form-check">
                                <input class="form-check-input"
                                       id="remember"
                                       name="remember"
                                       type="checkbox"
                                       v-model="user.remember"
                                />

                                <label for="remember" class="form-check-label"> ログインIDを保持する</label>
                            </div>
                        </div>
                    </div>

                    <div class="col-4 offset-4 mt-[1rem]">
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
        </div>
    </div>
</template>

<script setup>
import store from "../../store";
import { useRouter } from "vue-router";
import { ref  } from "vue";
import Alert from "../../components/Alert.vue";
const router = useRouter();
const user = {
  userid: localStorage.getItem('userid') ? localStorage.getItem('userid') : '',
  password: "",
  remember: localStorage.getItem('remember') ? true : false,
};
let loading = ref(false);
let errorMsg = ref("");
sessionStorage.clear();
function login(ev) {
    ev.preventDefault();
    loading.value = true;
    store.dispatch("login", user)
        .then(() => {
            loading.value = false;
            if (user.remember) {
                localStorage.setItem('remember', true);
                localStorage.setItem('userid', user.userid)
            } else {
                localStorage.removeItem('remember');
                localStorage.setItem('userid', '')
            }
            router.push({
                name: "Factor",
            });
        })
        .catch((err) => {
            loading.value = false;
            console.log(err.response.data.error);
            errorMsg.value = err.response.data.error;
        });
    // if (user.userid.length > 0 && user.password.length > 2) {
    // } else {
    //     if (alert("有効な利用者 IDとパスワードを入力してください。")) {
    //         loading.value = false;
    //     }
    // }
}
</script>
