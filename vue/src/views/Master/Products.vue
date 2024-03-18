<template>
    <div class="p-2 wrapper-scroll transit">
        <div class="mx-auto form-border d-grid input-gap" style="max-width: 60rem;">
            <div class="gap-4 d-flex">
                <div class="d-grid input-gap">
                    <!-- row 1 -->
                    <div class="gap-3 d-flex">
                        <div class="d-flex basis-[60%] gap-3">
                            <div class="d-flex align-items-center basis-[40%]">
                                <label class="label-text w-[6rem]">商品記号</label>
                                <input type="text" class="flex-1 text-center form-control" v-model="selected_machine.pump_cd" maxlength="8" :disabled="isUpdate">
                            </div>
                            <div class="d-flex align-items-center basis-[60%]">
                                <label class="label-text w-[8rem]">メーカーコード</label>
                                <input type="text" class="flex-1 text-center form-control" v-model="selected_machine.maker_code" maxlength="10" @input="number('maker_code')">
                            </div>
                        </div>
                        <div class="d-flex align-items-center basis-[40%]">
                            <label class="label-text w-[6rem]">クラス分類</label>
                            <select class="flex-1 form-select" v-model="selected_machine.pump_class">
                                <option v-for="tp in master.class" :value="tp.id">{{ tp.value }}</option>
                            </select>
                        </div>
                    </div>

                    <!-- row 2 -->
                    <div class="gap-3 d-flex">
                        <div class="d-flex align-items-center basis-[60%]">
                            <label class="label-text w-[6rem]">商品略名</label>
                            <input type="text" class="flex-1 form-control" v-model="selected_machine.pump_nm_short" maxlength="20">
                        </div>
                        <div class="d-flex align-items-center basis-[40%]">
                            <label class="label-text w-[6rem]">特定保守</label>
                            <div class="gap-4 d-flex">
                                <label class="gap-1 label-text d-flex align-items-center">
                                    <input type="radio" name="radio" :value="0" v-model="selected_machine.maint_flag">なし
                                </label>
                                <label class="gap-1 label-text d-flex align-items-center">
                                    <input type="radio" name="radio" :value="1" v-model="selected_machine.maint_flag">ある
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- row 3 -->
                    <div class="d-flex align-items-center basis-[60%]">
                        <label class="label-text w-[6rem]">商品名</label>
                        <input type="text" class="flex-1 form-control" v-model="selected_machine.pump_nm_full" maxlength="50">
                    </div>
                </div>
                <div class="d-flex flex-column justify-content-end">
                    <!-- <button class="btn selection" @click="setupAction()" :disabled="!isUpdate">新規登録</button> -->
                    <button class="btn w-[8rem]" @click="save()" :disabled="!valid">保存</button>
                </div>
            </div>
            <div class="gap-3 d-flex">
                <div class="d-flex align-items-center basis-[20%]">
                    <label class="label-text w-[6rem]">交換年数</label>
                    <select class="flex-1 form-select" v-model="selected_machine.exchange_long">
                        <option v-for="i in 5" :value="i">{{ i }}年</option>
                    </select>
                </div>
                <div class="d-flex align-items-center basis-[50%] gap-3">
                    <label class="flex-1 label-text">使用期限(月数)</label>
                    <label class="gap-1 label-text d-flex align-items-center">
                        <input type="radio" name="radio2" :value="0" v-model="selected_machine.expire_flag" class="form-check-input">出荷から
                    </label>
                    <label class="gap-1 label-text d-flex align-items-center">
                        <input type="radio" name="radio2" :value="1" v-model="selected_machine.expire_flag" class="form-check-input">新規貸出から
                    </label>
                    <input type="text" class="flex-1 text-center form-control" v-model="selected_machine.expire_mons" @input="number('expire_mons')" maxlength="2">
                </div>
                <div class="d-flex align-items-center basis-[30%]">
                    <label class="label-text w-[8rem]">レンタル価格(円)</label>
                    <input type="text" class="flex-1 text-center form-control" v-model="selected_machine.rental_price" @input="number('rental_price')" maxlength="6">
                </div>
            </div>
            <div class="gap-3 d-flex">
                <div class="d-flex align-items-center basis-[30%]">
                    <label class="label-text w-[7.5rem]">薬剤品目コード</label>
                    <input type="text" class="flex-1 text-center form-control" v-model="selected_machine.medicine_code">
                </div>
                <div class="d-flex align-items-center basis-[30%]">
                    <label class="label-text w-[7rem]">R3品目コード</label>
                    <input type="text" class="flex-1 text-center form-control" v-model="selected_machine.medicine_r3cd">
                </div>
                <div class="d-flex align-items-center basis-[40%]">
                    <label class="label-text w-[4rem]">販売名</label>
                    <input type="text" class="flex-1 form-control" v-model="selected_machine.medicine_name">
                </div>
            </div>
        </div>

        <div class="mt-4 mb-1 d-flex align-items-center justify-content-center">
            <span class="fw-bold fs-5">商品数：全{{ machines.length }}件</span>
        </div>

        <div class="parent-scroll">
            <table class="view-scroll t-border">
                <thead class="text-center">
                    <tr>
                        <th class="w-[5%]">商品<br>記号</th>
                        <th>商品略名</th>
                        <th>商品名</th>
                        <th>薬剤名</th>
                        <th class="w-[8%]">メーカー<br>コード</th>
                        <th>メーカー名</th>
                        <th class="w-[10%]">クラス分類</th>
                        <th class="w-[10%]">特定保守</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(mc, index) in machines" :class="{'selected':index == selected_index}" @click="initSelection(mc, index)">
                        <td class="text-center">{{ mc.pump_cd }}</td>
                        <td>{{ mc.pump_nm_short }}</td>
                        <td>{{ mc.pump_nm_full }}</td>
                        <td>{{ mc.medicine_name }}</td>
                        <td class="text-center">{{ mc.maker_code }}</td>
                        <td class="text-center">{{ mc.maker_name }}</td>
                        <td class="text-center">{{ typeText(master.class, mc.pump_class) }}</td>
                        <td class="text-center">{{ typeText(master.maintains, mc.maint_flag) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { mapActions, mapState } from "vuex";
import { typeText, onlyNumber } from "@/helper.js";
import { MACHINE_SCHEMA } from '@/validation/schema.js';
</script>
<script>
export default {
    data: function () {
        return {
            machines: [],
            selected_machine: {},
            selected_index: null,
            valid: false,
            isUpdate: true,
        }
    },
    computed: {
        ...mapState({
            master: state => state.machine.master
        }),
    },
    watch: {
        'selected_machine':{
            deep: true,
            handler: async function () {
                await MACHINE_SCHEMA.validate(this.selected_machine).then(() => {
                    this.valid = true;
                }).catch(() => {
                    this.valid = false;
                })
            }
        }
    },
    methods: {
        ...mapActions('machine', ['getMasterMachine', 'getIndexMachine', 'updateMachine', 'storeMachine']),
        loadIndexData: async function () {
            await this.getIndexMachine().then((res) => {
                if(res && res.code == 200) {
                    this.machines = res.data;
                    this.selected_machine = {...this.machines[0]} || {};
                    this.selected_index = 0
                }
            })
        },
        save: async function () {
            if(this.isUpdate) {
                await this.updateMachine({pump_cd: this.selected_machine.pump_cd, payload: this.selected_machine}).then((res) => {
                    if(res && res.code == 200) {
                        this.selected_machine = res.data
                        this.machines = this.machines.map(item => {
                            if(item.pump_cd == this.selected_machine.pump_cd) item = {...this.selected_machine}
                            return item
                        })
                    }
                })
            } else {
                this.insert()
            }
        },
        insert: async function () {
            await this.storeMachine(this.selected_machine).then((res) => {
                if(res && res.code == 200) {
                    this.selected_machine = res.data
                    this.machines.push(this.selected_machine)
                    this.selected_index = this.machines.length - 1
                    this.isUpdate = true
                }
            })
        },
        setupAction: function () {
            if(this.isUpdate) this.isUpdate = false
            this.selected_machine = {
                maint_flag: 0,
                expire_flag: 0,
                pump_class: this.master.class[0].id,
                exchange_long: 1
            }
            this.selected_index = null
        },
        initSelection: function (item, index) {
            this.selected_machine = {...item}
            this.selected_index = index
            this.isUpdate = true
        },
        number: function (key) {
            this.selected_machine[key] = onlyNumber(this.selected_machine[key])
        }
    },
    created: async function () {
        await this.getMasterMachine();
        await this.loadIndexData();
    },
    mounted: async function () {
    }
}
</script>