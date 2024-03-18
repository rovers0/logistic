<template>
    <ModalLayout :show="show" title="得意先選択" maxWidth="max-w-8xl" @close="onClose()">
        <div class="p-2 wrapper-scroll">
            <form class="gap-3 mb-3 d-flex" @submit.prevent="submitSearch()">
                <div class="flex-1 gap-3 d-flex">
                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="label-text w-[6rem]">DCFコード</label>
                        <input type="text" class="flex-1 text-center form-control" v-model="search.search_dcf_code">
                    </div>
                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="label-text w-[5rem]">担当者名</label>
                        <input type="text" class="flex-1 text-center form-control" v-model="search.search_name_staff">
                    </div>
                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="label-text w-[6rem]">ポンプ区分</label>
                        <select class="flex-1 form-select" v-model="search.pump_cd">
                            <option :value="null">全て</option>
                            <option v-for="pump in master.machines" :value="pump.pump_cd">{{ pump.pump_cd }}</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center basis-[40%]">
                        <label class="label-text w-[4rem]">施設名</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_name_facility">
                    </div>
                </div>

                <div class="gap-1 d-flex">
                    <button type="button" class="btn default w-[6.5rem]" @click="initSearch(); submitSearch()">リセット</button>
                    <button type="submit" class="btn w-[6rem]">検索</button>
                </div>
            </form>

            <div class="mb-3 form-border" style="margin: 0 3rem;">
                <div class="gap-3 d-flex">
                    <div class="d-grid input-gap basis-[20%]">
                        <div class="d-flex align-items-center">
                            <label class="label-text w-[6rem]">DCFコード</label>
                            <input type="text" class="flex-1 text-center form-control" :value="contracts_selected.dcf_code" disabled>
                        </div>
                        <div class="d-flex align-items-center">
                            <label class="label-text w-[6rem]">郵便番号</label>
                            <input type="text" class="flex-1 text-center form-control" :value="contracts_selected.fac_post" disabled>
                        </div>
                        <div class="d-flex align-items-center">
                            <label class="label-text w-[6rem]">電話番号</label>
                            <input type="text" class="flex-1 text-center form-control" :value="contracts_selected.fac_tel" disabled>
                        </div>
                    </div>

                    <div class="d-grid input-gap basis-[30%]">
                        <div class="d-flex align-items-center">
                            <label class="label-text w-[6rem]">施設名</label>
                            <input type="text" class="flex-1 form-control" :value="contracts_selected.fac_name" disabled>
                        </div>
                        <div class="d-flex align-items-center">
                            <label class="label-text w-[6rem]">施設住所</label>
                            <input type="text" class="flex-1 form-control" :value="contracts_selected.fac_addr" disabled>
                        </div>
                        <div class="d-flex align-items-center">
                            <label class="label-text w-[6rem]">SMDコード</label>
                            <input type="text" class="form-control text-center w-[7rem]" :value="contracts_selected.smd_code" disabled>
                        </div>
                    </div>

                    <div class="d-grid input-gap basis-[50%]">
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[40%]">
                                <label class="label-text w-[6.5rem]">得意先コード</label>
                                <input type="text" class="flex-1 text-center form-control" :value="contracts_selected.cust_cd" disabled>
                            </div>
                            <div class="d-flex align-items-center basis-[60%]">
                                <label class="label-text w-[6rem]">卸(会社)</label>
                                <input type="text" class="flex-1 form-control" :value="contracts_selected.comp_nm" disabled>
                            </div>
                        </div>
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[60%]">
                                <label class="label-text w-[6.5rem]">支店・部署</label>
                                <input type="text" class="flex-1 form-control" :value="contracts_selected.dep_name" disabled>
                            </div>
                            <div class="d-flex align-items-center basis-[40%]">
                                <label class="label-text w-[6rem]">支店長名</label>
                                <input type="text" class="flex-1 text-center form-control" :value="contracts_selected.manager_name" disabled>
                            </div>
                        </div>
                        <div class="gap-3 d-flex">
                            <div class="d-flex align-items-center basis-[50%]">
                                <label class="label-text w-[6.5rem]">担当者名</label>
                                <input type="text" class="flex-1 text-center form-control" :value="contracts_selected.staff?.staff_nm" disabled>
                            </div>
                            <div class="d-flex align-items-center basis-[50%]">
                                <label class="label-text w-[6rem]">携帯番号</label>
                                <input type="text" class="flex-1 text-center form-control" :value="contracts_selected.staff?.staff_phone" disabled>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-1 d-flex justify-content-between align-items-center">
                <label class="label-text fs-5 fw-bold">検索結果一覧：　{{ contracts.length }}件</label>
                <button class="btn selection w-[6rem]" @click="load()" :disabled="!contracts_selected.id">選択</button>
            </div>

            <div class="parent-scroll" style="min-height: 20rem;">
                <table class="view-scroll t-border allow-select">
                    <thead class="text-center">
                        <tr>
                            <th>SMD<br>コード</th>
                            <th>DCFコード</th>
                            <th class="w-[20%]">施設名</th>
                            <th>卸(会社)</th>
                            <th>支店・部署</th>
                            <th>担当者<br>コード</th>
                            <th>担当者</th>
                            <th>電話番号</th>
                            <th>
                                <SortHeader @sort="sort()" :search="search" :field="'cont_long'">有効期限</SortHeader>
                            </th>
                            <th>契約済<br>ポンプ</th>
                            <th>
                                <SortHeader @sort="sort()" :search="search" :field="'status'">状態</SortHeader>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="ct in contracts" @click="select(ct)" :id="'ct_'+ct.id"
                            :class="{
                                'selected': ct.id == contracts_selected.id && ct.pump == contracts_selected.pump,
                                'row-disable': rowDisable(ct)
                                }">
                            <td class="text-center">{{ ct.smd_code || '-' }}</td>
                            <td class="text-center">{{ ct.dcf_code }}</td>
                            <td>{{ ct.fac_name }}</td>
                            <td>{{ ct.comp_nm }}</td>
                            <td>{{ ct.dep_name }}</td>
                            <td class="text-center">{{ ct.manager_code }}</td>
                            <td class="text-center">{{ ct.staff?.staff_nm }}</td>
                            <td class="text-center">{{ ct.staff?.staff_phone }}</td>
                            <td class="text-center">{{ ct.cont_long ? ct.cont_long+'年' : '' }}</td>
                            <td class="text-center">{{ ct.pump }}</td>
                            <td class="text-center">{{ typeText(master.contract_status, ct.status) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="pt-3 pb-2 d-flex justify-content-center">
                <button class="btn default w-[6rem]" @click="onClose()">閉じる</button>
            </div>
        </div>
    </ModalLayout>
</template>
<style scoped>
</style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import SortHeader from "@/components/Sort.vue";
import { typeText } from '@/helper.js';
</script>
<script>
export default {
    props: ['show', 'contract'],
    emits: ['close', 'load'],
    data: function () {
        return {
            search: {
                page: 1,
                sort: null,
                sort_by: 'desc'
            },
            contracts_selected: {}
        }
    },
    computed: {
        ...mapState({
            master: state => state.rent.master,
            contracts: state => state.rent.contracts,
        }),
    },
    watch: {
        
    },
    methods: {
        ...mapActions('rent', ['getContracts', 'getMasterRent']),
        ...mapMutations('rent', ['setContracts']),
        onClose: function () {
            this.$emit('close');
        },
        initSearch: function () {
            this.search.search_dcf_code      = null;
            this.search.search_name_staff    = null;
            this.search.pump_cd              = null;
            this.search.search_name_facility = null;
        },
        loadIndexData: async function () {
            this.$store.state.pump_code = this.search.pump_cd
            await this.getContracts(this.search).then((res) => {
                if(res && res.code == 200) {
                    this.setContracts(res.data)
                    this.contracts_selected = {}
                }
            })
        },
        submitSearch: function () {
            this.search.page = 1
            this.search.sort = null
            this.loadIndexData()
        },
        sort: function () {
            if(this.contracts.length > 0) {
                this.search.page = 1;
                this.loadIndexData();
            }
        },
        select: function (ct) {
            if(!this.rowDisable(ct)) {
                this.contracts_selected = ct
            }
        },
        load: function () {
            this.$emit('load', this.contracts_selected)
        },
        rowDisable: function (ct) {
            if(!ct.pump_facility) return true
            if(![1, 2, 8].includes(ct.status)) return true
            return false
        }
    },
    created: async function () {
        await this.getMasterRent()
        this.initSearch()
        this.search.pump_cd = this.$store.state.pump_code
        if(this.contracts.length == 0) {
            await this.loadIndexData()
        }
    
        this.contracts.forEach(ct => {
            if(ct.id == this.contract.id) {
                this.contracts_selected = ct
            }
        })
    }
}
</script>