<template>
    <ModalLayout :show="show" title="MSへの連絡文作成" maxWidth="max-w-6xl" @close="onClose()">
        <div class="px-2">
            <div class="py-2">
                <textarea class="form-control" style="min-height: 16rem;" v-model="ms_send_text"></textarea>
            </div>
    
            <div class="d-flex justify-content-between align-items-end">
                <span class="fw-bold fs-5">対象件数：{{ exchangeList.length }}件</span>
                <button class="btn default" @click="updateMSText()" :disabled="ms_send_text?.length == 0">送信文複製</button>
            </div>
    
            <div class="py-2 wrapper-scroll" style="min-height: 15rem;">
                <div class="parent-scroll">
                    <table class="view-scroll t-border">
                        <thead class="text-center">
                            <tr>
                                <th class="w-[4%]">コード</th>
                                <th>患者コード</th>
                                <th>施設名</th>
                                <th>卸(会社)</th>
                                <th>支店</th>
                                <th>担当名</th>
                                <th class="w-[4%]">交換</th>
                                <th>納品予定日</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="exchange in exchangeList" :key="exchange.id" :class="{'selected': exchange.id == exchangeSelected.id}" @click="selectItem(exchange)">
                                <td class="text-center">{{ exchange.smd_code }}</td>
                                <td class="text-center">{{ exchange.patient_cd }}</td>
                                <td>{{ exchange.pumpFacility?.fac_name }}</td>
                                <td class="text-center">{{ exchange.pumpFacility?.comp_name }}</td>
                                <td class="text-center">{{ exchange.pumpFacility?.dep_name }}</td>
                                <td class="text-center">{{ exchange.pumpFacility?.ms_staff_name }}</td>
                                <td class="text-center">定期</td>
                                <td class="text-center">{{ displayDate(exchange.plan_send_deli) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    
            <div class="pt-2 pb-3 d-flex justify-content-around">
                <button class="btn default w-[9rem]" @click="onClose()">閉じる</button>
                <button type="button" class="btn w-[9rem]" @click="update()">送信済設定</button>
            </div>
        </div>
    </ModalLayout>

    <ConfirmModal ref="confirmDialog"></ConfirmModal>
</template>
<style scoped>

</style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex"
import ModalLayout from '@/components/layout/modal/ModalLayout.vue'
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue"
import { formatBeforeRequest, dateToMonth, deepClone, displayDate } from '@/helper.js'
import moment from 'moment'
import jp from '@/lang/jp.json'
</script>
<script>
export default {
    props: ['show', 'ids', 'isUpdate'],
    emits: ['close'],
    data: function () {
        return {
            exchangeList: [],
            exchangeSelected: {
                beforeHistory: {},
                afterHistory: {},
                shipment: {},
                pumpFacility: {}
            },
            ms_send_text: '',
            reload: false
        }
    },
    methods: {
        ...mapActions('exchange', ['getIndexExchange', 'updateText', 'updateReal']),
        onClose: function () {
            this.$emit('close', this.reload)
        },
        searchExchangeIndex: async function () {
            await this.getIndexExchange({ids: this.ids}).then((res) => {
                if(res && res.code == 200 && res.data.list.length > 0) {
                    this.exchangeList = res.data.list
                    this.setExchangeSelected(res.data.list[0])
                } else {
                    this.onClose()
                }
            })
        },
        setExchangeSelected: function (data) {
            this.exchangeSelected = {...data}
            this.ms_send_text = this.renderMsSendText()
        },
        update: async function () {
            let payload = {id: this.exchangeSelected.id, real: 'real_send_ms', real_date: moment().format('YYYY-MM-DD')}
            await this.updateReal(formatBeforeRequest(payload)).then((res) => {
                if(res && res.code == 200) {
                    this.$refs.confirmDialog.show({
                        title: jp.notification_title,
                        message: jp.update_success_new_rent_message,
                        type: 1
                    })
                    this.exchangeList = this.exchangeList.map(item => {
                        if(item.id == res.data.id) return res.data
                        return item
                    })
                    this.setExchangeSelected(res.data)
                    this.reload = res.data
                }
            })
        },
        updateMSText: async function () {
            let payload = {id: this.exchangeSelected.id, ms_send_text: this.ms_send_text}
            await this.updateText(formatBeforeRequest(payload)).then((res) => {
                if(res && res.code == 200) {
                    this.$refs.confirmDialog.show({
                        title: jp.notification_title,
                        message: jp.update_success_new_rent_message,
                        type: 1
                    })
                    this.exchangeList = this.exchangeList.map(item => {
                        if(item.id == res.data.id) return res.data
                        return item
                    })
                    this.reload = res.data
                }
            })
            
        },
        renderMsSendText: function () {
            if(!this.exchangeSelected.ms_send_text || this.exchangeSelected.ms_send_text.length == 0) {
                let ms = jp.ms_sent_text
                let info = [
                    this.exchangeSelected.pumpFacility.dep_name ?? '',
                    this.exchangeSelected.pumpFacility.ms_staff_name ?? '',
                ]
                return  ms.replace(/%(\d+)/g, (_, n) => info[+n-1])
            }

            return this.exchangeSelected.ms_send_text
        },
        selectItem: function (item) {
            this.setExchangeSelected(item)
        }
    },
    created: async function () {
        await this.searchExchangeIndex()
    }
}
</script>