<template>
    <div class="wrapper-scroll">
        <div class="gap-3 p-3 d-flex w-[90%] mx-auto">
            <div class="flex-1">
                <table class="table mb-0 table-bordered border-color">
                    <tbody class="text-center">
                        <tr class="bg-light-blue fw-bold fs-3">
                            <td rowspan="2" class="align-middle" style="white-space: nowrap; width: 12.5%;">定期交換<br>関連予定日<br>設定基準</td>
                            <td>⓪処理対象収<br>集日</td>
                            <td>①案内一式<br>作成日</td>
                            <td>②MS事前<br>連絡日</td>
                            <td>⓷施設案内<br>FAX日</td>
                            <td>④ご回答<br>締め日</td>
                            <td>⑤納品案内<br>予定日</td>
                            <td>⑥出荷指示<br>予定日</td>
                            <td class="align-middle" style="white-space: nowrap; width: 12.5%;">使用停止日</td>
                        </tr>
                        <tr class="flex-td">
                            <td>
                                <div>
                                    <input type="text" class="text-center form-control" v-model="params_payload.PICKUP_TARGET_DATE" @input="params_payload.onlyNumber('PICKUP_TARGET_DATE')">日前
                                </div>
                            </td>
                            <td>
                                <div>
                                    <input type="text" class="text-center form-control" v-model="params_payload.GUIDE_SET_CREATION_DATE" @input="params_payload.onlyNumber('GUIDE_SET_CREATION_DATE')">日前
                                </div>
                            </td>
                            <td>
                                <div>
                                    <input type="text" class="text-center form-control" v-model="params_payload.MS_ADVANCE_CONTACT_DATE" @input="params_payload.onlyNumber('MS_ADVANCE_CONTACT_DATE')">日前
                                </div>
                            </td>
                            <td>
                                <div>
                                    <input type="text" class="text-center form-control" v-model="params_payload.FACILITY_INFORMATION_FAX_DATE" @input="params_payload.onlyNumber('FACILITY_INFORMATION_FAX_DATE')">日前
                                </div>
                            </td>
                            <td>
                                <div>
                                    <input type="text" class="text-center form-control" v-model="params_payload.RESPONSE_DEADLINE" @input="params_payload.onlyNumber('RESPONSE_DEADLINE')">日前
                                </div>
                            </td>
                            <td>
                                <div>
                                    <input type="text" class="text-center form-control" v-model="params_payload.SCHEDULED_DELIVERY_DATE" @input="params_payload.onlyNumber('SCHEDULED_DELIVERY_DATE')">日前
                                </div>
                            </td>
                            <td>
                                <div>
                                    <input type="text" class="text-center form-control" v-model="params_payload.SCHEDULED_SHIPPING_INSTRUCTION_DATE" @input="params_payload.onlyNumber('SCHEDULED_SHIPPING_INSTRUCTION_DATE')">日前
                                </div>
                            </td>
                            <td>
                                基準日
                            </td>
                        </tr>
                        <tr class="bg-light-blue">
                            <td colspan="9">
                                ※対象日は土日の場合は翌週の月曜日に設定します。
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="d-flex justify-content-between flex-column">
                <button class="btn default w-[7rem]" @click="reset()">リセット</button>
                <button class="btn w-[7rem]" @click="update()" :disabled="!valid">保存</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
    tr>td {
        vertical-align: middle;
        white-space: nowrap;
    }
    .flex-td>td>div {
        display: flex;
        align-items: center;
        gap: 0.2rem;
    }
</style>

<script setup>
import { mapActions } from "vuex";
import { onlyNumber, mapPayload } from '@/helper.js';
import { CONFIG_SCHEMA } from '@/validation/schema.js';
</script>
<script>
export default {
    data: function () {
        return {
            params_payload: {
                map: function (object) {
                    return mapPayload(this, {...object})
                },
                onlyNumber: function (key) {
                    this[key] = onlyNumber(this[key])
                },
                PICKUP_TARGET_DATE: null,
                GUIDE_SET_CREATION_DATE: null,
                MS_ADVANCE_CONTACT_DATE: null,
                FACILITY_INFORMATION_FAX_DATE: null,
                RESPONSE_DEADLINE: null,
                SCHEDULED_DELIVERY_DATE: null,
                SCHEDULED_SHIPPING_INSTRUCTION_DATE: null,
            },
            response_data: {},
            valid: false,
        }
    },
    computed: {},
    watch: {
        'params_payload': {
            deep: true,
            handler: async function () {
                await CONFIG_SCHEMA.validate(this.params_payload).then(() => {
                    this.valid = true;
                }).catch(() => {
                    this.valid = false;
                })
            }
        }
    },
    methods: {
        ...mapActions('config', ['getIndexAppConfig', 'updateAppConfig']),
        loadIndexData: async function () {
            await this.getIndexAppConfig().then((res) => {
                if(res && res.code == 200) {
                    this.response_data = res.data;
                    this.params_payload.map(this.response_data);
                }
            })
        },
        reset: function () {
            this.params_payload.map(this.response_data);
        },
        update: async function () {
            this.updateAppConfig(this.params_payload).then((res) => {
                this.response_data = res.data;
                this.params_payload.map(this.response_data);
            })
        }
    },
    created: function () {},
    mounted: function () {
        this.loadIndexData();
    }
}
</script>