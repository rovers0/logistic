<template>
    <ModalLayout :show="show" title="出荷指示(新規貸出)" maxWidth="max-w-8xl" @close="onClose()">
        <div class="p-2 wrapper-scroll" style="min-height: 40rem;">
            <div class="py-2 d-flex align-items-center">
                <div class="slide-button z-1" :class="{'disable': shipments.length <= 1}" @click="prev()">
                    <div class="caret left"></div>
                    <span>前へ</span>
                </div>
                <div class="z-0 gap-3 px-3 py-1 overflow-hidden d-grid w-100" :class="animate_class" style="grid-template-columns: repeat(2, minmax(0, 1fr));">
                    <!-- left -->
                    <div class="d-flex input-gap flex-column justify-content-between">
                        <div class="d-flex">
                            <label class="label-text w-[5.5rem]">特記事項①</label>
                            <textarea class="flex-1 form-control" v-model="shipment_selected.des_remark1" :disabled="isDisableUpdate() || true"></textarea>
                        </div>
                        <div class="d-flex">
                            <label class="label-text w-[5.5rem]">特記事項②</label>
                            <textarea class="flex-1 form-control" v-model="shipment_selected.des_remark2" :disabled="isDisableUpdate() || true"></textarea>
                        </div>
                        <div class="d-flex">
                            <label class="label-text w-[5.5rem]">備考</label>
                            <textarea class="flex-1 form-control" v-model="shipment_selected.remarks"></textarea>
                        </div>
                    </div>

                    <!-- right -->
                    <div class="d-flex input-gap flex-column">
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[60%]">
                                <label class="label-text w-[6rem]">出荷指示NO.</label>
                                <input type="text" class="flex-1 text-center form-control" disabled :value="shipment_selected.inst_id || '-'">
                            </div> 
                            <div class="d-flex align-items-center basis-[40%] gap-1">
                                <label class="flex-1 text-end label-text">情報確定状況</label>
                                <input type="text" class="w-[8rem] text-center form-control" disabled :value="typeText(master.shipment_status ?? [],shipment_selected.status)">
                            </div>
                        </div>

                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[55%]">
                                <label class="label-text w-[6rem]">顧客コード</label>
                                <input type="text" class="form-control w-[8rem] text-center" disabled :value="shipment_selected.smd_code">
                            </div> 
                            <div class="d-flex align-items-center basis-[45%] gap-1">
                                <label class="flex-1 text-end label-text">在庫保管場コード</label>
                                <select class="w-[8rem] form-select" v-model="shipment_selected.from_shelf" :disabled="isDisableUpdate()">
                                    <option v-for="shelf in getDesShelf()" :value="shelf.id">{{ shelf.value }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="d-flex align-items-center">
                            <label class="label-text w-[6rem]">施設名</label>
                            <input type="text" class="flex-1 form-control" v-model="shipment_selected.fac_name" :disabled="isDisableUpdate()">
                        </div>

                        <div class="d-flex align-items-center">
                            <label class="label-text w-[6rem]">お届け先</label>
                            <input type="text" class="flex-1 form-control" v-model="shipment_selected.des_name" :disabled="isDisableUpdate()">
                        </div>

                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[50%]">
                                <label class="label-text w-[6rem]">郵便番号</label>
                                <input type="text" class="flex-1 form-control" v-model="shipment_selected.des_postcode" :disabled="isDisableUpdate()" maxlength="8">
                            </div>

                            <div class="d-flex align-items-center basis-[50%]">
                                <label class="label-text w-[5rem]">電話番号</label>
                                <input type="text" class="flex-1 text-center form-control" v-model="shipment_selected.fac_tel" :disabled="isDisableUpdate()">
                            </div>
                        </div>

                        <div class="d-flex align-items-center">
                            <label class="label-text w-[6rem]">住所</label>
                            <input type="text" class="flex-1 form-control" v-model="shipment_selected.des_address" :disabled="isDisableUpdate()">
                        </div>
                    </div>
                </div>
                <div class="slide-button z-1" :class="{'disable': shipments.length <= 1}" @click="next()">
                    <div class="caret right"></div>
                    <span>次へ</span>
                </div>
            </div>

            <div class="mb-1 d-flex align-items-end">
                <div class="col-4">
                    <button type="button" class="btn" :disabled="idsUpdate.length <= 0" @click="exportShipment()">指示データ出力</button>
                </div>

                <div class="text-center col-4 fw-bold fs-5">出荷指示対象：{{ shipments.length }}件</div>

                <div class="col-4 d-flex justify-content-end">
                    <button type="button" class="btn" @click="updateShipment()" :disabled="isDisableUpdate()">情報作成完了</button>
                </div>
            </div>

            <div class="parent-scroll">
                <table class="view-scroll t-border">
                    <thead class="text-center">
                        <tr>
                            <th class="w-[3rem]">
                                <input type="checkbox" class="form-check-input" @click="checkAll()" :checked="isCheckAll">
                            </th>
                            <th>情報<br>確定</th>
                            <th>指示データ<br>出力</th>
                            <th>指示予定日</th>
                            <th>指示番号</th>
                            <th>顧客<br>コード</th>
                            <th>棚<br>コード</th>
                            <th>住所③(施設名)</th>
                            <th>届け先名称</th>
                            <th>電話番号</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="shipment in shipments" :class="{'selected': shipment.id == shipment_selected.id}" @click="select(shipment, $event)">
                            <td class="text-center">
                                <input type="checkbox" class="form-check-input" :disabled="shipment.status == 0" v-model="idsUpdate" :value="shipment.id">
                            </td>
                            <td class="text-center" :class="{'text-danger': shipment.status == 0}">{{ typeText(master.shipment_status_show ?? [], shipment.status) }}</td>
                            <td class="text-center">{{ typeText(master.shipment_status ?? [], shipment.status) }}</td>
                            <td class="text-center">{{ displayDate(shipment.plan_date) }}</td>
                            <td class="text-center">{{ shipment.inst_id || '-' }}</td>
                            <td class="text-center">{{ shipment.smd_code }}</td>
                            <td class="text-center">{{ shipment.from_shelf }}</td>
                            <td>{{ shipment.fac_name }}</td>
                            <td>{{ shipment.des_name }}</td>
                            <td class="text-center">{{ shipment.fac_tel }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="p-3 d-flex justify-content-around">
            <button class="btn default w-[6rem]" @click="onClose()">閉じる</button>
            <button class="btn w-[6rem]" @click="update()">保存</button>
        </div>
    </ModalLayout>

    <ConfirmModal ref="confirmDialog"></ConfirmModal>
</template>
<style scoped>
textarea::-webkit-scrollbar {
    display: none;
}
textarea {
    min-height: 5rem;
}
</style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue";
import { typeText, formatBeforeRequest, timeToString, displayDate } from '@/helper.js';
import jp from '@/lang/jp.json';
import { SHIPMENT_STATUS_OUTPUT } from "@/components/Constants.vue";
</script>
<script>
export default {
    props: ['show', 'ids', 'data'],
    emits: ['close', 'reload'],
    data: function () {
        return {
            animate_class: '',
            shipments: [],
            shipment_selected: {},
            shipment_compare: {},
            idsUpdate: [],
            isCheckAll: false,
            reload: false
        }
    },
    computed: {
        ...mapState({
            master: state => state.shipment.master,
        }),
    },
    methods: {
        ...mapActions('shipment', ['getMasterShipment', 'getShipmentByIds', 'updateWaiting', 'updateOutput', 'updateData']),
        onClose: async function () {
            // if(await this.clear()) {
                this.$emit('close')
            // }
        },
        next: async function () {
            if(await this.clear()) {
                this.animate_class = 'animate-next'
                setTimeout(() => {
                    this.animate_class = ''
                }, 200)
                for(let i = 0; i < this.shipments.length; i++) {
                    if(this.shipments[i].id == this.shipment_selected.id) {
                        let index = i + 1
                        if(i == (this.shipments.length - 1)) index = 0
    
                        this.shipment_selected = {...this.shipments[index]}
                        this.shipment_compare = {...this.shipment_selected}
                        break
                    }
                }
            }
        },
        prev: async function () {
            if(await this.clear()) {
                this.animate_class = 'animate-prev'
                setTimeout(() => {
                    this.animate_class = ''
                }, 200)
                for(let i = 0; i < this.shipments.length; i++) {
                    if(this.shipments[i].id == this.shipment_selected.id) {
                        let index = i - 1
                        if(index == -1) index = this.shipments.length - 1
    
                        this.shipment_selected = {...this.shipments[index]}
                        this.shipment_compare = {...this.shipment_selected}
                        break
                    }
                }
            }
        },
        clear: async function () {
            if(JSON.stringify(this.shipment_compare) != JSON.stringify(this.shipment_selected)) {
                const ok = await this.$refs.confirmDialog.show({
                    title: jp.notification_title,
                    message: jp.clear_input_message,
                })
                await this.$refs.confirmDialog.close()
                return ok
            }
            return true
        },
        getShipment: async function () {
            if(this.ids.length > 0) {
                await this.getShipmentByIds({ids: this.ids}).then((res) => {
                    if(res && res.code == 200) {
                        this.shipments = res.data
                        this.shipment_selected = {...this.shipments[0]}
                        this.shipment_compare = {...this.shipment_selected}
                    }
                })
            }
        },
        select: async function (shipment, event) {
            if(event.target.type == 'checkbox') return
            if(shipment.id == this.shipment_selected.id) return
            // if(await this.clear()) {
                this.shipment_selected = {...shipment}
                this.shipment_compare = {...this.shipment_selected}
            // }
        },
        updateShipment: async function () {
            let payload = {...this.shipment_selected}
            await this.updateWaiting(payload).then((res) => {
                if(res && res.code == 200) {
                    this.shipments = this.shipments.map(item => {
                        if(item.id == res.data.id) return res.data
                        return item
                    })
                    this.shipment_selected = {...res.data}
                    this.shipment_compare = {...this.shipment_selected}
                    this.reload = true
                }
            })
        },
        update: async function () {
            let payload = {...this.shipment_selected}
            await this.updateData(payload).then((res) => {
                if(res && res.code == 200) {
                    this.shipments = this.shipments.map(item => {
                        if(item.id == res.data.id) return res.data
                        return item
                    })
                    this.shipment_selected = {...res.data}
                    this.shipment_compare = {...this.shipment_selected}
                    this.reload = true
                }
            })
        },
        checkAll: function () {
            this.idsUpdate = []
            this.isCheckAll = !this.isCheckAll
            if(this.isCheckAll) {
                this.idsUpdate = this.shipments.filter(item => item.status > 0).map(item => item.id)
            }
        },
        exportShipment: async function () {
            if(this.checkStatusOutput()) {
                const ok = await this.$refs.confirmDialog.show({
                    title: jp.notification_title,
                    message: jp.output_updated_message,
                })
                if(!ok) {
                    return
                }
            }
            const ok = await this.$refs.confirmDialog.show({
                title: jp.export_shipment_title,
                message: jp.export_shipment_message.replace('?', this.idsUpdate.length),
            })
            if(ok) {
                if(this.idsUpdate.length > 0) {
                    await this.updateOutput({ids: this.idsUpdate}).then((res) => {
                        if(res && res.code == 200) {
                            this.getShipment()
                            this.reload = true
                        }
                    })
                }
                await this.$refs.confirmDialog.close()
            }
        },
        checkStatusOutput: function () {
            var result = false
            this.shipments.forEach((item) => {
                if(this.idsUpdate.includes(item.id) && item.status == 2) {
                    result = true
                }
            })
            return result
        },
        isDisableUpdate: function () {
            return !this.shipment_selected.id || ![0].includes(this.shipment_selected.status)
        },
        getDesShelf: function () {
            if(!this.shipment_selected.pump_code) {
                return this.master.des_shelf
            }

            return this.master.des_shelf.filter((item) => {
                return this.shipment_selected.pump_code && item.value.includes(this.shipment_selected.pump_code)
            })
        }
    },
    created: async function () {
        await this.getMasterShipment()
        await this.getShipment()
        if(this.data?.remarks) {
            this.shipment_selected.remarks = this.data.remarks
        }
        if(this.shipment_selected.status == 0) {
            if(this.data?.des_postcode) {
                this.shipment_selected.des_postcode = this.data.des_postcode
            }
            if(this.data?.des_address) {
                this.shipment_selected.des_address = this.data.des_address
            }
            if(this.data?.des_name) {
                this.shipment_selected.des_name = this.data.des_name
            }
            if(this.data?.fac_tel) {
                this.shipment_selected.fac_tel = this.data.fac_tel
            }
            if(this.data?.from_shelf) {
                this.shipment_selected.from_shelf = this.data.from_shelf
            }
        }
    },
    unmounted: async function () {
        if(this.reload) {
            this.$emit('reload')
        }
    }
}
</script>