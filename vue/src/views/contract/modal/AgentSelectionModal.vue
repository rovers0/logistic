<template>
    <ModalLayout :show="show" title="担当者の選択" maxWidth="max-w-3xl" :class="'px-0'" @close="closeAgentSelection()">
        <div class="container">
            <div class="mt-2 mb-2 d-flex justify-content-between">
                <label class="col-form-label col-1 me-1">卸</label>
                <div class="col-4 ms-2 me-5">
                    <v-select v-model="comp_code" :options="comps" :reduce="comp => comp.comp_cd" label="comp_nm_short" @option:selected="getSessions" :clearable="false" class="">
                        <template v-slot:no-options>データがありません。</template>
                    </v-select>
                </div>
                <label class="col-form-label">営業部</label>
                <div class="col-4 ms-1 me-3">
                    <v-select v-model="ses_code" :options="sessions" :reduce="session => session.ses_code" label="ses_name" @option:selected="getDeps" :clearable="false" class="">
                        <template v-slot:no-options>データがありません。</template>
                    </v-select>
                </div>
            </div>
            <div class="mt-2 mb-2 d-flex col-6">
                <label class="col-form-label col-3">支店</label>
                <div class="col-8">
                    <v-select v-model="dep_code" :options="deps" :reduce="dep => dep.dep_code" label="dep_name" @option:selected="getStaffs" :clearable="false" class="">
                        <template v-slot:no-options>データがありません。</template>
                    </v-select>
                </div>
            </div>
            <div class="mb-2 d-flex justify-content-between">
                <label class="col-form-label">支店長名</label>
                <div class="col-4 ms-1 me-3">
                    <input type="text" class="form-control" v-model="selected_staff.man_name">
                </div>
                <label class="col-form-label">携帯番号</label>
                <div class="col-4 ms-1 me-3">
                    <input type="text" class="form-control" v-model="selected_staff.man_phone">
                </div>
            </div>
            <div class="mb-1">人数：{{ staffs.length }}</div>
            <div class="overflow-auto mb-3" style="max-height: 20.7rem;">
                <table class="t-border">
                    <thead class="text-center">
                        <tr>
                            <th>コード</th>
                            <th>従業員名</th>
                            <th>役職</th>
                            <th>職種</th>
                            <th>携帯番号</th>
                            <th>業務区分</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="staff in staffs" class="cursor-pointer" :class="staff.staff_cd == selected_staff.staff_cd ? 'selected' : ''" @click="staffSelect(staff)">
                            <td class="text-center">{{ staff.staff_cd }}</td>
                            <td>{{ staff.staff_nm }}</td>
                            <td class="text-center">{{ staff.all_info[staff.pos_code] }}</td>
                            <td class="text-center">{{ staff.all_info[staff.occ_code] }}</td>
                            <td class="text-center">{{ staff.cell_phone }}</td>
                            <td class="text-center">{{ staff.all_info[staff.grp_code] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mt-1 mb-2 d-flex justify-content-evenly">
                <button class="btn default" @click="closeAgentSelection">閉じる</button>
                <button class="btn default w-28" @click="setStaff">選択</button>
            </div>
        </div>
    </ModalLayout>
</template>
<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import 'vue-select/dist/vue-select.css';
import vSelect from 'vue-select';
const props = defineProps({
    show: Boolean,
    data: Object,
});
</script>
<script>
export default {
    emits: ["closeAgentSelection", "setStaff"],
    data: function () {
        return {
            actionModal: '',
            showFacilitySelectionDetail: false,
            comp_code: null,
            ses_code: null,
            dep_code: null,
            comps: [],
            sessions: [],
            deps: [],
            staffs: [],
            selected_staff: {}
        };
    },
    updated: function () {
        this.loadData();
    },
    mounted: function () {
        this.loadData();
    },
    methods: {
        closeAgentSelection: function () {
            this.$emit("closeAgentSelection");
        },
        loadData: function () {
            this.comp_code = this.$props.data.staff_info.comp_code;
            this.ses_code = this.$props.data.staff_info.ses_code;
            this.dep_code = this.$props.data.staff_info.dep_code;
            let staff_cd = this.$props.data.staff_info.staff_cd;
            this.comps = this.$props.data.comps;
            this.sessions = this.$props.data.sessions;
            this.deps = this.$props.data.deps;
            this.staffs = this.$props.data.staffs;
            this.selected_staff = this.$props.data.staffs.filter(item => item.staff_cd == staff_cd);
            if (this.selected_staff.length > 0) {
                this.selected_staff = this.selected_staff[0];
            }
        },
        staffSelect: function (staff) {
            this.selected_staff = staff;
            this.staff_cd = staff.staff_cd;
        },
        getSessions: function () {
            let data = {
                comp_code: this.comp_code
            };
            this.$store.dispatch("getSessionList", data).then((res) => {
                this.sessions = res.data.data.session;
                this.deps = res.data.data.department;
                this.sessions.unshift({
                    ses_code: null,
                    ses_name: '全て'
                });
                this.ses_code = null;
                this.dep_code = null;
            });
        },
        getDeps: function () {
            let data = {
                comp_code: this.comp_code,
                ses_code: this.ses_code
            };
            this.$store.dispatch("getDepList", data).then((res) => {
                this.deps = res.data.data;
                this.dep_code = null;
            });
        },
        getStaffs: function () {
            let data = {
                comp_code: this.comp_code,
                ses_code: this.ses_code,
                dep_code: this.dep_code
            };
            this.$store.dispatch("getStaffList", data).then((res) => {
                this.staffs = res.data.data;
                if (this.staffs.length > 0) {
                    this.staffSelect(this.staffs[0]);
                }
            })
        },
        setStaff: function () {
            this.$emit("setStaff", this.selected_staff);
            this.closeAgentSelection();
        }
    },
};
</script>
  