<template>
    <ModalLayout :show="show" title="担当者の選択" maxWidth="max-w-4xl" @close="onClose()">
        <div class="px-3">
            <div class="py-2 d-grid input-gap">
                <div class="gap-3 d-flex">
                    <div class="d-flex align-items-center basis-[50%]">
                        <label class="label-text w-[4rem]">特約店</label>
                        <!-- <select class="flex-1 form-select" v-model="search.com_code" @change="onchangeCompany()">
                            <option v-for="company in master.companies" :value="company.comp_cd">{{ company.comp_nm_short }}</option>
                        </select> -->
                        <v-select
                            class="flex-1"
                            v-model="search.com_code"
                            :options="master.companies"
                            :reduce="com => com.comp_cd"
                            label="comp_nm_short"
                            @option:selected="onchangeCompany()"
                            :clearable="false">
                            <template v-slot:no-options>データがありません。</template>
                        </v-select>
                    </div>
        
                    <div class="d-flex align-items-center basis-[50%]">
                        <label class="label-text w-[4rem]">営業部</label>
                        <!-- <select class="flex-1 form-select" v-model="search.ses_code" :disabled="search.com_code == null" @change="onchangeSession()">
                            <option v-for="session in sessions" :value="session.ses_code">{{ session.ses_name }}</option>
                        </select> -->
                        <v-select
                            class="flex-1"
                            v-model="search.ses_code"
                            :options="sessions"
                            :reduce="ses => ses.ses_code"
                            label="ses_name"
                            @option:selected="onchangeSession()"
                            :clearable="false">
                            <template v-slot:no-options>データがありません。</template>
                        </v-select>
                    </div>
                </div>
    
                <div class="gap-3 d-flex">
                    <div class="d-flex align-items-center basis-[50%]">
                        <label class="label-text w-[4rem]">支店</label>
                        <!-- <select class="flex-1 form-select" v-model="search.dep_code" :disabled="search.ses_code == null" @change="onchangeDepartment()">
                            <option v-for="dept in departments" :value="dept.dep_code">{{ dept.dep_name }}</option>
                        </select> -->
                        <v-select
                            class="flex-1"
                            v-model="search.dep_code"
                            :options="departments"
                            :reduce="dep => dep.dep_code"
                            label="dep_name"
                            @option:selected="onchangeDepartment()"
                            :clearable="false">
                            <template v-slot:no-options>データがありません。</template>
                        </v-select>
                    </div>
        
                    <div class="d-flex align-items-center basis-[50%]">
                        <label class="label-text w-[4rem]">所属課</label>
                        <!-- <select class="flex-1 form-select" v-model="search.grp_code" :disabled="search.dep_code == null" @change="onchangeGroup()">
                            <option v-for="group in groups" :value="group.all_code">{{ group.grp_name }}</option>
                        </select> -->
                        <v-select
                            class="flex-1"
                            v-model="search.grp_code"
                            :options="groups"
                            :reduce="dep => dep.all_code"
                            label="grp_name"
                            @option:selected="onchangeGroup()"
                            :clearable="false">
                            <template v-slot:no-options>データがありません。</template>
                        </v-select>
                    </div>
                </div>
            </div>
    
            <div class="mt-3 d-flex align-items-center">
                <span>人数：{{ billing_staff?.length ? number(billing_staff?.length) : 0 }}名</span>
            </div>
    
            <div class="py-2 wrapper-scroll" style="min-height: 15rem;">
                <div class="parent-scroll">
                    <table class="view-scroll t-border allow-select">
                        <thead class="text-center">
                            <tr>
                                <th class="w-[12%]">コード</th>
                                <th>従業員名</th>
                                <th>所属課長</th>
                                <th>役職</th>
                                <th>職種</th>
                                <th class="w-[10%]">業務区分</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in billing_staff" @click="selectItem(item)" :class="{'row-selected': selected_data?.staff_cd == item.staff_cd}" :ref="item.staff_cd">
                                <td class="text-center">{{ item.staff_cd }}</td>
                                <td>{{ item.staff_nm }}</td>
                                <td>{{ item.group?.grp_name }}</td>
                                <td class="text-center">{{ item.position?.pos_name }}</td>
                                <td class="text-center">{{ item.occupation?.occ_name }}</td>
                                <td class="text-center">{{ item.operation?.ope_name }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    
            <div class="px-3 py-3 d-flex justify-content-around">
                <button class="btn default w-[8rem]" @click="onClose()">キャンセル</button>
                <button class="btn default w-[8rem]" @click="load()" :disabled="selected_data == null">決定</button>
            </div>
        </div>
    </ModalLayout>
</template>
<style scoped>
button.btn{
    font-family: inherit;
    font-size: 1rem;
    padding: 0.375rem 0.75rem;
}
</style>
<script setup>
import { mapState, mapActions } from "vuex";
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { number } from '@/helper.js';
</script>
<script>
export default {
    props: ['show', 'staff_info'],
    emits: ['close', 'load'],
    data: function () {
        return {
            initSessions: [{ses_code: '', ses_name: '全て'}],
            sessions: [{ses_code: '', ses_name: '全て'}],
            departments: [],
            groups: [],
            search: {},
            billing_staff: [],
            selected_data: null,
        }
    },
    computed: {
        ...mapState({
            master: state => state.facility.master
        }),
    },
    watch: {},
    methods: {
        ...mapActions('facility', ['getSession', 'getDepartment', 'getGroup', 'getBillingStaffs']),
        onClose: function () {
            this.$emit('close');
        },
        initSearch: async function () {
            this.search = {...this.staff_info};
            await this.getSession({com_code: this.search.com_code}).then((res) => {
                if(res && res.code == 200) {
                    this.sessions = this.initSessions;
                    this.sessions = [...this.sessions, ...res.data];
                }
            })
            await this.getDepartment({com_code: this.search.com_code, ses_code: this.search.ses_code}).then((res) => {
                if(res && res.code == 200) {
                    this.departments = res.data;
                }
            })
            await this.getGroup({com_code: this.search.com_code, dep_code: this.search.dep_code}).then((res) => {
                if(res && res.code == 200) {
                    this.groups = res.data;
                }
            })
            await this.getBillingStaffs(this.search).then((res) => {
                if(res && res.code == 200) {
                    this.billing_staff = res.data;
                }
            })
            this.billing_staff.forEach(element => {
                if(element.staff_cd == this.staff_info.staff_code) {
                    this.selected_data = element;
                }
            });
        },
        onchangeCompany: async function () {
            await this.getSession({com_code: this.search.com_code}).then((res) => {
                if(res && res.code == 200) {
                    this.sessions = this.initSessions;
                    this.sessions = [...this.sessions, ...res.data];
                }
            })
            this.search.ses_code = null;
            this.search.dep_code = null;
            this.search.grp_code = null;
            this.departments = [];
            this.groups = [];
            this.billing_staff = [];
        },
        onchangeSession: async function () {
            await this.getDepartment({com_code: this.search.com_code, ses_code: this.search.ses_code}).then((res) => {
                if(res && res.code == 200) {
                    this.departments = res.data;
                }
            })
            this.search.dep_code = null;
            this.search.grp_code = null;
            this.groups = [];
            this.billing_staff = [];
        },
        onchangeDepartment: async function () {
            await this.getGroup({com_code: this.search.com_code, dep_code: this.search.dep_code}).then((res) => {
                if(res && res.code == 200) {
                    this.groups = res.data;
                }
            })
            this.search.grp_code = null;
            this.billing_staff = [];
        },
        onchangeGroup: async function () {
            await this.getBillingStaffs(this.search).then((res) => {
                if(res && res.code == 200) {
                    this.billing_staff = res.data;
                    this.selected_data = null;
                }
            })
        },
        selectItem: function (item) {
            this.selected_data = item;
        },
        load: function () {
            this.$emit('load', this.selected_data);
        },

    },
    created: async function () {
        await this.initSearch();
        this.$refs[this.selected_data?.staff_cd]?.[0].scrollIntoView({ behavior: "smooth" });
    }
}
</script>