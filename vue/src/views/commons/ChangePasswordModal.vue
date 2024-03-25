<template>
    <ModalLayout :show="show" :title="'パスワードを変更してください'" maxWidth="max-w-xl" @close="_cancel()">
        <div class="p-2">
            <FormKit type="form" :actions="false" class="p-2" @submit="submitChangePassword()"
                    :config="{
                      validationVisibility: 'submit',
                      classes: {
                        messages: 'd-none',
                      },
                    }">
                <div class="d-flex flex-column input-gap">
                    <FormKit
                        type="password"
                        name="password"
                        validation="required"
                        id="password"
                        autocomplete="off"
                        label="現パスワード"
                        v-model="payload.password"
                        :config="{
                            classes: {
                                label: 'hidden',
                                messages: '',
                                input: 'flex-1 form-control',
                            },
                        }"
                    />

                    <FormKit
                        type="password"
                        name="password_new"
                        label="新しいパスワード"
                        validation="length:6,20"
                        id="password_new"
                        autocomplete="off"
                        v-model="payload.password_new"
                        :validation-messages="{
                        length: '新しいパスワードは6文字から20文字の間で入力してください。',
                        }"
                        :config="{
                            classes: {
                                label: 'hidden',
                                messages: '',
                                input:'flex-1 form-control',
                            },
                        }"
                    />

                    <FormKit
                        type="password"
                        name="password_new_confirm"
                        validation="required|confirm|length:6,20"
                        id="password_new_confirm"
                        label="確認用パスワード"
                        autocomplete="off"
                        v-model="payload.password_new_confirm"
                        :validation-messages="{
                        confirm: '確認用パスワードが一致していません。',
                        }"
                        :config="{
                            classes: {
                                messages: '',
                                label: 'hidden',
                                input: 'flex-1 form-control',
                            },
                        }"
                    />

                    <FormKit
                        type="text"
                        name="factor"
                        validation="required|matches:/^[0-9]{10}$/"
                        :validation-messages="{ 
                        matches: '第二パスワード（ファクターコード）は 半角英数字10桁を入力してください。',
                        required: '第二パスワード（ファクターコード）は必須です。'
                        }"
                        id="factor"
                        label="第二パスワード"
                        autocomplete="off"
                        v-model="payload.factor"
                        :config="{
                            classes: {
                                messages: '',
                                label: 'hidden',
                                input: 'flex-1 form-control',
                            },
                        }"
                    />
                </div>
                <div class="gap-2 mt-3 d-flex justify-content-end">
                    <button type="button" class="btn default w-[6rem]" @click="_cancel()">閉じる</button>
                    <button type="submit" class="btn w-[6rem]">変更</button>
                </div>
            </FormKit>
        </div>
        <!-- <form class="p-2"  @submit.prevent="submitChangePassword()">
            <div class="d-flex flex-column input-gap">
                <div class="d-flex align-items-center">
                    <label class="label-text w-[9rem]">現パスワード</label>
                    <input type="password" class="flex-1 form-control" v-model="payload.password">
                </div>
                <div class="d-flex align-items-center">
                    <label class="label-text w-[9rem]">新しいパスワード</label>
                    <input type="password" class="flex-1 form-control" v-model="payload.password_new">
                </div>
                <div class="d-flex align-items-center">
                    <label class="label-text w-[9rem]">確認用パスワード</label>
                    <input type="password" class="flex-1 form-control" v-model="payload.password_new_confirm">
                </div>
                <div class="d-flex align-items-center">
                    <label class="label-text w-[9rem]">第二パスワード</label>
                    <input type="text" class="flex-1 form-control" v-model="payload.factor">
                </div>
            </div>
            <div class="gap-2 mt-3 d-flex justify-content-end">
                <button type="button" class="btn default w-[6rem]" @click="_cancel()">閉じる</button>
                <button type="submit" class="btn w-[6rem]">変更</button>
            </div>
        </form> -->
    </ModalLayout>
</template>
<style scope>
.formkit-wrapper {
    display: flex;
    align-items: center;
}
.formkit-wrapper .formkit-label {
    width: 9rem;
}
.formkit-inner {
    flex: 1;
}
.formkit-messages {
    list-style: none;
    margin-bottom: 0;
    margin-left: 9rem;
    padding-left: 0;
    color: red;
}
</style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex"
import ModalLayout from '@/components/layout/modal/ModalLayout.vue'
</script>
<script>
export default {
    props: ['show'],
    emits: ['close'],
    data: function () {
        return {
            payload: {
                password            : null,
                password_new        : null,
                password_new_confirm: null,
                factor              : null,
            }
        }
    },
    computed: {
        ...mapState(['user']),
    },
    methods: {
        ...mapActions(['changePassword', 'logout']),
        _cancel: async function () {
            this.$emit('close')
        },
        submitChangePassword: async function () {
            await this.changePassword(this.payload).then((res) => {
                if(res && res.code == 200) {
                    this.logout().then((res) => {
                        window.location.reload()
                    })
                }
            })
        }
    },
    created: async function () {
        this.payload.factor = JSON.parse(this.user.data).factor
    }
}
</script>