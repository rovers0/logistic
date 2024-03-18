<template>
    <ModalLayout :show="show" title="新規契約登録" maxWidth="max-w-6xl" :class="'px-0'" @close="closeFacilitySelection()">
        <div class="container">
            <div class="mt-1 mb-2 d-flex justify-content-between">
                <div class="col-10 row">
                    <div class="col-2">
                        <label class="col-form-label">卸</label>
                    </div>
                    <div class="col-4">
                        <select class="flex-1 form-select" v-model="search.com_code">
                            <option :value="null" selected>全て</option>
                            <option v-if="companies" v-for="item in companies" :value="item.comp_cd">{{ item.comp_nm_short }}</option>
                        </select>
                    </div>
                    <div class="col-2">
                        <label class="col-form-label">施設名・DCFコード</label>
                    </div>
                    <div class="col-4">
                        <input type="text" class="form-control" v-model="search.search_facility_name" @keypress="searchFacility">
                    </div>
                </div>
                <div class="col-2 d-flex justify-content-end">
                    <button class="btn px-2" style="width: 6rem;" @click="sort">検索</button>
                </div>
            </div>
            <div class="mt-1 mb-2 d-flex justify-content-between">
                <div class="col-10 row">
                    <div class="col-2">
                        <label class="col-form-label">得意先コード</label>
                    </div>
                    <div class="col-4">
                        <input type="text" class="form-control" v-model="search.search_customer" @keypress="searchFacility">
                    </div>
                    <div class="col-2">
                        <label class="col-form-label">電話番号</label>
                    </div>
                    <div class="col-4">
                        <input type="text" class="form-control" v-model="search.search_facility_phone" @keypress="searchFacility">
                    </div>
                </div>
                <div class="col-2 d-flex justify-content-end">
                    <button class="btn default px-2" style="width: 6rem;" @click="reset">リセット</button>
                </div>
            </div>
            <div class="d-flex mb-2">
                <div class="col-3 col-form-label">
                    {{ facilities?.total }}件
                </div>
                <div class="col-9">
                    <Pagination class="mb-0 ms-3" v-model="search.page" :page-count="facilities?.page_count" :page-range="3" :margin-pages="0" :click-handler="changePage" :prev-text="'<'" :next-text="'>'" :container-class="'pagination'" :page-class="'page-item'" :first-last-button="true" :first-button-text="'<<'" :last-button-text="'>>'"></Pagination>
                </div>
            </div>
            <div class="overflow-auto mb-2" style="max-height: 350px;">
                <table class="t-border">
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
                            <th>
                                <SortHeader @sort="sort()" :search="search" :field="'facility_nm'">施設名</SortHeader>
                            </th>
                            <th>
                                <SortHeader @sort="sort()" :search="search" :field="'phone'">電話番号</SortHeader>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="cursor-pointer" v-for="fac in facilities.data" :class="fac.customer_cd == selected_id ? 'selected' : ''" @click="selectFacility(fac.facility_id, fac.customer_cd)">
                            <td>{{ fac.company?.comp_nm_short }}</td>
                            <td>{{ fac.department?.dep_name }}</td>
                            <td class="text-center">{{ fac.customer_cd }}</td>
                            <td class="text-center">{{ fac.facility_alt }}</td>
                            <td class="text-center">{{ fac.facility?.profecture?.prof_nm }}</td>
                            <td>{{ fac.facility_nm }}</td>
                            <td class="text-center">{{ fac.facility?.phone }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="container">
                <div class="d-flex justify-content-center">
                    <span class="col-form-label me-4">■ 契約ポンプ</span>
                    <div class="form-check col-form-label">
                        <input class="form-check-input" type="checkbox" v-model="types" value="A" id="A">
                        <label class="form-check-label" for="A">A</label>
                    </div>
                    <div class="form-check col-form-label ms-4">
                        <input class="form-check-input" type="checkbox" v-model="types" value="B" id="B">
                        <label class="form-check-label" for="B">B</label>
                    </div>
                    <div class="form-check col-form-label ms-4">
                        <input class="form-check-input" type="checkbox" v-model="types" value="C" id="C">
                        <label class="form-check-label" for="C">C</label>
                    </div>
                    <div class="form-check col-form-label ms-4">
                        <input class="form-check-input" type="checkbox" v-model="types" value="D" id="D">
                        <label class="form-check-label" for="D">D</label>
                    </div>
                </div>
            </div>
            <div class="mt-1 mb-2 d-flex justify-content-evenly">
                <button class="btn default" @click="closeFacilitySelection">閉じる</button>
                <button class="btn" :disabled="selected_alt_cd && types.length > 0 ? false : true" @click="addContract">登録</button>
            </div>
        </div>
    </ModalLayout>
</template>
<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import Pagination from "@/components/Pagination.vue";
import SortHeader from "@/components/Sort.vue";
</script>
<script>
export default {
    props: ['show', 'data'],
    emits: ["closeFacilitySelection", "loadData"],
    data: function () {
        return {
            actionModal: '',
            showFacilitySelectionDetail: false,
            facilities: this.$props.data.data,
            companies: this.$props.data.companies,
            search: {
                com_code: null,
                search_facility_name: null,
                search_customer: null,
                search_facility_phone: null,
                sort: null,
                limit: 100,
                page: 1
            },
            page: 1,
            selected_alt_cd: null,
            selected_id: null,
            types: [],
        };
    },
    updated: function () {
        this.search.com_code = null;
        this.search.search_facility_name = null;
        this.search.search_customer = null;
        this.search.sort = null;
        this.search.page = 1;
    },
    mounted: function () {

    },
    methods: {
        closeFacilitySelection: function () {
            this.search.search_facility_name = null;
            this.search.search_facility_phone = null;
            this.$emit("closeFacilitySelection");
        },
        getFacility: function () {
            this.$store.dispatch("getFacilityList", this.search).then((res) => {
                this.facilities = res.data.data;
            });
        },
        changePage: function (pagenum) {
            this.search.page = pagenum;
            this.getFacility();
        },
        selectFacility: function (alt_fac_cd = null, id = null) {
            this.selected_alt_cd = alt_fac_cd;
            this.selected_id = id;
        },
        addContract: function () {
            let data = {
                id: this.selected_alt_cd,
                pump_list: this.types.sort().join(',')
            };
            this.$store.dispatch("addContract", data).then((res) => {
                if(res.data.success){
                    this.$emit("loadData",'id');
                    this.closeFacilitySelection();
                    this.types = [];
                    this.selectFacility();
                }
            });
        },
        reset: function() {
            this.search.com_code = null;
            this.search.search_facility_name = null;
            this.search.search_customer = null;
            this.search_facility_phone = null;
            this.search.sort = null;
            this.search.page = 1;
            this.getFacility();
        },
        searchFacility: function($event) {
            if($event.key == 'Enter'){
                this.search.page = 1;
                this.getFacility();
            }
        },
        sort: function () {
            this.search.page = 1;
            this.getFacility();
        }
    },
};
</script>
  