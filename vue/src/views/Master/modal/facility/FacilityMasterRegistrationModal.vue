<template>
    <ModalLayout :show="show" title="新規施設マスタ登録" maxWidth="max-w-7xl" @close="onClose()">
        <div class="px-2">
            <form class="gap-3 py-2 d-flex align-items-center"  @submit.prevent="submitSearch()">
                <div class="flex-1 gap-3 d-flex">
                    <div class="d-flex align-items-center basis-[30%]">
                        <label class="label-text w-[2rem]">卸</label>
                        <select class="flex-1 form-select" v-model="search.com_code">
                            <option :value="null" selected>全て</option>
                            <template v-if="master.companies">
                                <option v-for="item in master.companies.filter(item => item.comp_cd != 99)" :key="item.comp_cd" :value="item.comp_cd">{{ item.comp_nm_short }}</option>
                            </template>
                        </select>
                    </div>
    
                    <div class="d-flex align-items-center basis-[40%]">
                        <label class="label-text w-[9.5rem]">施設名・DCFコード</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_facility_name">
                    </div>
    
                    <div class="d-flex align-items-center basis-[30%]">
                        <label class="label-text w-[6.5rem]">得意先コード</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_customer">
                    </div>

                    <div class="d-flex align-items-center basis-[30%]">
                        <label class="label-text w-[5rem]">電話番号</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_facility_phone">
                    </div>
                </div>
                <div class="gap-2 d-flex">
                    <button type="button" class="btn default w-[6.5rem]" @click="resetSearch()">リセット</button>
                    <button type="submit" class="btn w-[6rem]">検索</button>
                </div>
            </form>
    
            <div class="mt-3 mb-1 d-flex align-items-center">
                <div class="col-2">
                    <span v-if="facility_response.total > 0">{{ number(facility_response.total) }}件</span>
                </div>
    
                <div class="col-8 d-flex justify-content-center">
                    <Pagination v-if="facility_response.page_count > 1" v-model="search.page" class="mb-0" :page-count="facility_response.page_count" :click-handler="pagination"></Pagination>
                </div>
    
                <div class="col-2">  
                </div>
            </div>
    
            <div class="wrapper-scroll" style="min-height: 18rem;">
                <div class="parent-scroll">
                    <table class="view-scroll t-border allow-select">
                        <thead class="text-center">
                            <tr>
                                <th>
                                    <SortHeader @sort="sort()" :search="search" :field="'com_code'">卸</SortHeader>
                                </th>
                                <th>
                                    <SortHeader @sort="sort()" :search="search" :field="'dep_name'">支店名</SortHeader>
                                </th>
                                <th>
                                    <SortHeader @sort="sort()" :search="search" :field="'customer_cd'">得意先コード</SortHeader>
                                </th>
                                <th>
                                    <SortHeader @sort="sort()" :search="search" :field="'facility_alt'">DCFコード</SortHeader>
                                </th>
                                <th>
                                    <SortHeader @sort="sort()" :search="search" :field="'prof_cd'">都道府県</SortHeader>
                                </th>
                                <!-- <th>
                                    都道府県
                                </th> -->
                                <th>
                                    <SortHeader @sort="sort()" :search="search" :field="'facility_nm'">施設名</SortHeader>
                                </th>
                                <th>
                                    <SortHeader @sort="sort()" :search="search" :field="'phone'">電話番号</SortHeader>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="facility_response.total > 0">
                                <tr v-for="(item, index) in facility_response.data" :key="index" @click="selectItem(item.id)" :class="{'selected': idIndex == item.id}">
                                    <td class="text-center">{{ item.comp_nm_short }}</td>
                                    <td>{{ item.dep_name }}</td>
                                    <td class="text-center">{{ item.customer_cd }}</td>
                                    <td class="text-center">{{ item.facility_alt }}</td>
                                    <td class="text-center">{{ item.profecture_nm }}</td>
                                    <td>{{ item.facility_nm }}</td>
                                    <td class="text-center">{{ item.facility_phone }}</td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr><td colspan="7" class="">結果が得られませんでした。</td></tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
    
            <div class="px-3 py-3 d-flex justify-content-around">
                <button class="btn default w-[6rem]" @click="onClose()">閉じる</button>
                <button class="btn w-[6rem]" @click="save()" :disabled="!idIndex">登録</button>
            </div>
        </div>
    </ModalLayout>

    <ConfirmModal ref="confirmDialog"></ConfirmModal>
    
    <SmdInputModal v-if="isOpenSmdInput"
        :show="isOpenSmdInput"
        :smd_code="smd_code"
        @close="onCloseSmdInput($event)"></SmdInputModal>
</template>
<style scoped>
</style>
<script setup>
import { mapState, mapActions } from "vuex";
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import Pagination from "@/components/Pagination.vue";
import SortHeader from "@/components/Sort.vue";
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue";
import SmdInputModal from "./SmdInputModal.vue";
import { number } from '@/helper.js';
import jp from '@/lang/jp.json';
</script>
<script>
export default {
    props: ['show'],
    emits: ['close', 'saved'],
    data: function () {
        return {
            search: {
                page: 1,
                limit: 100,
            },
            facility_response: {},
            idIndex: null,
            isOpenSmdInput: false,
            smd_code: null,
        }
    },
    computed: {
        ...mapState({
            master: state => state.facility.master
        }),
    },
    methods: {
        ...mapActions('facility', ['getMasterFacility', 'getIndexFacilityStaff', 'storePumpFacility', 'getSmdCode']),
        onClose: function () {
            this.$emit('close');
        },
        initSearch: function () {
            this.search.com_code              = null;
            this.search.search_facility_name  = null;
            this.search.search_facility_phone = null;
            this.search.search_customer = null;
            this.search.sort = null;
            this.search.sort_by = null;
        },
        loadIndexData: async function () {
            this.idIndex = null;
            await this.getIndexFacilityStaff(this.search).then((res) => {
                if(res && res.code == 200) {
                    this.facility_response = res.data;
                }
            })
        },
        submitSearch: function () {
            this.search.page = 1;
            this.search.sort = null;
            this.search.sort_by = null;
            this.loadIndexData();
        },
        pagination: function (page) {
            this.search.page = page;
            this.loadIndexData();
        },
        selectItem: function (id) {
            this.idIndex = id;
        },
        save: async function () {
            const res = await this.getSmdCode({facility_staff_id: this.idIndex}).then((res) => {
                if(res && res.code == 200) {
                    return res.data
                }
                return false
            })

            if(res) {
                this.smd_code = res
                this.isOpenSmdInput = true
            }

        },
        onCloseSmdInput: async function (event) {
            if(event.length <= 10 && event.length >= 4) {
                const ok = await this.$refs.confirmDialog.show({
                    title: jp.notification_title,
                    message: jp.confirm_regis_smd,
                })
    
                if(ok) {
                    let payload = {facility_staff_id: this.idIndex, smd_code: event}
                    const res = await this.storePumpFacility(payload).then((res) => {
                        if(res && res.code == 200) {
                            this.$emit('saved', res.data);
                            return true
                        }
                        return false
                    })

                    if(!res) {
                        await this.$refs.confirmDialog.close()
                        this.smd_code = event
                        this.isOpenSmdInput = true
                    }
                } else {
                    this.isOpenSmdInput = false
                    this.smd_code = null
                }
            }
        },
        resetSearch: async function () {
            this.initSearch()
            this.loadIndexData();
        },
        sort: function () {
            if(this.facility_response.total > 0) {
                this.search.page = 1;
                this.loadIndexData()
            }
        }
    },
    created: function () {
        this.initSearch();
        this.submitSearch()
    },
    mounted: function () {
        if(!this.master.companies || this.master.companies.length <= 0) {
            this.getMasterFacility();
        }
    }
}
</script>