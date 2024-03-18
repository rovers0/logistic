<template>
    <div class="p-2 wrapper-scroll transit">
        <form class="gap-5 mb-3 d-flex" @submit.prevent="submitSearch()">
            <div class="flex-1 d-grid input-gap">
                <!-- row 1 -->
                <div class="gap-3 d-flex">
                    <div class="d-flex basis-[40%] gap-3">
                        <div class="d-flex align-items-center basis-[55%]">
                            <label class="w-[9.5rem] label-text">SMDコード</label>
                            <input type="text" class="flex-1 form-control" v-model="search.search_smd_code">
                        </div>

                        <div class="d-flex align-items-center basis-[45%]">
                            <label class="w-[5.5rem] label-text">DCFコード</label>
                            <input type="text" class="flex-1 form-control" v-model="search.search_dcf_code">
                        </div>
                    </div>

                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="w-[6.5rem] label-text">施設電話</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_facility_phone">
                    </div>

                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="w-[4.5rem] label-text">卸</label>
                        <select class="flex-1 form-select" v-model="search.comp_code">
                            <option :value="null">全て</option>
                            <template v-if="master.companies">
                                <option v-for="item in master.companies" :key="item.comp_cd" :value="item.comp_cd">{{ item.comp_nm_short }}</option>
                            </template>
                        </select>
                    </div>

                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="w-[5rem] label-text">営業部</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_branch_name">
                    </div>
                </div>
                
                <!-- row 2 -->
                <div class="gap-3 d-flex">
                    <div class="d-flex align-items-center basis-[40%]">
                        <label class="w-[9.5rem] label-text">施設名・DCFコード</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_facility_name">
                    </div>

                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="w-[6.5rem] label-text">得意先コード</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_customer_code">
                    </div>

                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="w-[4.5rem] label-text">支店名</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_department">
                    </div>

                    <div class="d-flex align-items-center basis-[20%]">
                        <label class="w-[5rem] label-text">MS担当</label>
                        <input type="text" class="flex-1 form-control" v-model="search.search_ms">
                    </div>
                </div>
            </div>

            <div class="w-[7rem] d-grid input-gap">
                <button type="button" class="btn default" @click="resetSearch(); submitSearch();">リセット</button>
                <button type="submit" class="btn">検索</button>
            </div>
        </form>

        <div class="mb-1 d-flex align-items-center">
            <div class="col-2">
                <button type="button" class="btn selection w-[8rem]" @click="openRegistrationModal()">新規登録</button>
            </div>

            <div class="gap-2 col-8 d-flex justify-content-center align-items-center">
                <select class="form-select w-[6.5rem]" v-model="search.limit" @change="onChangeLimit()">
                    <option :value="null">全て</option>
                    <option v-for="item in ROW_LIMITS" :value="item.id">{{ item.text }}</option>
                </select>

                <span v-if="facility_response.total > 0">{{ number(facility_response.total) }}件中{{ facility_response.firstItem }}-{{ facility_response.lastItem }}</span>

                <Pagination v-if="facility_response.page_count > 0" v-model="search.page" class="mb-0" :page-count="facility_response.page_count" :click-handler="pagination"></Pagination>
            </div>

            <div class="col-2 d-flex align-items-center justify-content-end">
                <button type="button" class="btn default w-[7rem]" @click="exportFacility(search)">一覧出力</button>
            </div>
        </div>

        <div class="parent-scroll">
            <table class="view-scroll t-border">
                <thead class="text-center">
                    <tr>
                        <th class="w-[4%]">
                            <SortHeader @sort="sort()" :search="search" :field="'smd_code'">SMD<br>コード</SortHeader>
                        </th>
                        <th class="w-[6%]">
                            <SortHeader @sort="sort()" :search="search" :field="'prof_cd'">都道府県</SortHeader>
                        </th>
                        <th class="w-[8%]">
                            <SortHeader @sort="sort()" :search="search" :field="'dcf_code'">DCFコード</SortHeader>
                        </th>
                        <th class="w-[21%]"><SortHeader @sort="sort()" :search="search" :field="'fac_name'">施設名</SortHeader></th>
                        <th class="w-[12%]">
                            <SortHeader @sort="sort()" :search="search" :field="'fac_tel'">電話番号</SortHeader>
                        </th>
                        <th class="w-[8%]">
                            <SortHeader @sort="sort()" :search="search" :field="'customer_cd'">得意先コード</SortHeader>
                        </th>
                        <th class="w-[9%]">
                            <SortHeader @sort="sort()" :search="search" :field="'comp_code'">卸</SortHeader>
                        </th>
                        <th class="w-[10%]">
                            <SortHeader @sort="sort()" :search="search" :field="'ses_name'">営業部</SortHeader>
                        </th>
                        <th class="w-[10%]">
                            <SortHeader @sort="sort()" :search="search" :field="'dep_name'">支店</SortHeader>
                        </th>
                        <th class="w-[8%]">MS担当名</th>
                        <th class="w-[4%]">詳細</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="facility_response.total > 0">
                        <tr v-for="(item, index) in facility_response.data" :key="index">
                            <td class="text-center">{{ item.smd_code }}</td>
                            <td class="text-center">{{ item.fac_prof_name }}</td>
                            <td class="text-center">{{ item.dcf_code }}</td>
                            <td>{{ item.fac_name }}</td>
                            <td class="text-center">{{ item.fac_tel }}</td>
                            <td class="text-center">{{ item.customer_cd }}</td>
                            <td>{{ item.comp_name }}</td>
                            <td>{{ item.ses_name }}</td>
                            <td>{{ item.dep_name }}</td>
                            <td class="text-center">{{ item.ms_staff_name }}</td>
                            <td class="text-center">
                                <button type="button" class="btn default sm" @click="openPumpFacilityDetail(item.smd_code)">詳細</button>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr><td colspan="11" class="">結果が得られませんでした。</td></tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>

    <FacilityDeliveryDetail v-if="transit.status" :pumpFacility="pump_facility"></FacilityDeliveryDetail>

    <FacilityMasterRegistrationModal v-if="isOpenRegisModal"
        :show="isOpenRegisModal"
        @close="isOpenRegisModal = false"
        @saved="openPumpFacilityDetail($event)"></FacilityMasterRegistrationModal>
</template>

<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
import Pagination from "@/components/Pagination.vue";
import SortHeader from "@/components/Sort.vue";
import FacilityMasterRegistrationModal from "./modal/facility/FacilityMasterRegistrationModal.vue";
import FacilityDeliveryDetail from "./FacilityDeliveryDetail.vue";
import { TRANSIT_FACILITY, ROW_LIMITS } from "@/components/Constants.vue";
import { number } from '@/helper.js';
</script>
<script>
export default {
    data: function () {
        return {
            isOpenRegisModal: false,
            facility_response: {},
            pump_facility: null,
        };
    },
    computed: {
        ...mapState(['transit']),
        ...mapState({
            master: state => state.facility.master,
            search: state => state.facility.search
        }),
    },
    watch:{
        'transit.status':  function () {
            if(!this.transit.status && this.transit.reloadParent) {
                this.loadIndexData();
            }
        }
    },
    methods: {
        ...mapActions('facility', ['getIndexFacilityDelivery', 'getMasterFacility', 'showPumpFacility', 'exportFacility']),
        ...mapMutations(['setTransitReloadParent', 'setIsOpenTransitDetail']),
        ...mapMutations('facility', ['setSearchSubmit', 'resetSearch', 'setSearchProperty']),
        openPumpFacilityDetail: async function (smd_code) {
            this.pump_facility = null;
            if(typeof smd_code === 'object') {
                this.pump_facility = smd_code;
                this.resetSearch();
                this.setSearchProperty({sort: 'smd_code', sort_by: 'desc', page: 1});
                this.loadIndexData();
            } else {
                await this.showPumpFacility(smd_code).then((res) => {
                    if(res && res.code == 200) {
                        this.pump_facility = res.data;
                    }
                })
            }
            if(this.pump_facility) {
                this.isOpenRegisModal = false;
                this.setTransitReloadParent(false);
                this.setIsOpenTransitDetail({status: true, type: TRANSIT_FACILITY});
            }
        },
        openRegistrationModal: function () {
            this.isOpenRegisModal = true;
        },
        loadIndexData: async function () {
            await this.getIndexFacilityDelivery(this.search).then((res) => {
                if(res && res.code == 200) {
                    this.facility_response = res.data;
                }
            })
        },
        submitSearch: function () {
            this.setSearchSubmit();
            this.loadIndexData();
        },
        pagination: function (page) {
            this.search.page = page;
            this.loadIndexData();
        },
        onChangeLimit: function () {
            if(!this.search.limit && this.facility_response.firstItem == 1 && this.facility_response.lastItem == this.facility_response.total) {
                return;
            }
            if(this.search.limit && this.search.limit > this.facility_response.total && this.facility_response.total < this.facility_response.limit) {
                return;
            }
            this.search.page = 1;
            this.loadIndexData();
        },
        sort: function () {
            if(this.facility_response.total > 0) {
                this.search.page = 1;
                this.loadIndexData();
            }
        }
    },
    created: function () {
        this.getMasterFacility();
    },
    mounted: function () {
        this.loadIndexData();
    },
    unmounted: function () {
        this.search.sort = null
    }
}
</script>