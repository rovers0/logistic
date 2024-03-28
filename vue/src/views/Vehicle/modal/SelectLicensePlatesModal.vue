<template>
    <div class="popup popup2 popup_center">
        <span class="close_pop" @click="onClose()">×</span>
        <div class="pophead">
            <h2>Danh sách xe</h2>
            <p>Danh sách xe đang hoạt động</p>
        </div>
        <div class="frm check_frm check_frm_search">
            <input type="text" id="txtSeachKeywords" placeholder="Tìm xe..." autocomplete="off">
            <div class="scroll2" style="margin:10px 0 0 0;float:left">
                <p style="width:33.33333333333333%;float:left;clear:none;padding:4px 0">
                    <input type="checkbox" name="taixe" data-id="4" value="15H02985" style="float:left;margin:0 3px 0 0" class="chk_multi" id="ck1">
                    <label for="ck1" style="cursor:pointer">15H02985 <i class="green">(Xe 2 cầu)</i>
                    </label>
                </p>
                <p style="width:33.33333333333333%;float:left;clear:none;padding:4px 0">
                    <input type="checkbox" name="taixe" data-id="3" value="15C26328" style="float:left;margin:0 3px 0 0" class="chk_multi" id="ck2">
                    <label for="ck2" style="cursor:pointer">15C26328 <i class="green">(Xe 2 cầu)</i>
                    </label>
                </p>
                <p style="width:33.33333333333333%;float:left;clear:none;padding:4px 0">
                    <input type="checkbox" name="taixe" data-id="2" value="15C25292" style="float:left;margin:0 3px 0 0" class="chk_multi" id="ck3">
                    <label for="ck3" style="cursor:pointer">15C25292 <i class="green">(Xe 2 cầu)</i>
                    </label>
                </p>
                <p style="width:33.33333333333333%;float:left;clear:none;padding:4px 0">
                    <input type="checkbox" name="taixe" data-id="1" value="15C17669" style="float:left;margin:0 3px 0 0" class="chk_multi" id="ck4">
                    <label for="ck4" style="cursor:pointer">15C17669 <i class="green">(Xe 2 cầu)</i>
                    </label>
                </p>
            </div>
            <button class="checked_tx" style="margin:10px 10px 0 0;float:left" @click="onClose()">
                <i class="fa fa-plus"></i> Chọn </button>
        </div>
    </div>
</template>
<style scoped>

</style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
</script>
<script>
export default {
    props: ['show', 'keys', 'selectedKey'],
    emits: ['close'],
    data: function () {
        return {
            day: null,
            reload: false,
        }
    },
    computed: {
        // ...mapState({
        //     master: state => state.achievement.master,
        // }),
    },
    methods: {
        onClose: function () {
            this.$emit('close', this.reload)
        },
    },
    created: async function () {

    }
}
</script>
