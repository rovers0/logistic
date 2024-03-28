<template>
    <div class="title">
        <h2>Danh sách tài xế</h2>
    </div>
    <p class="msg">Quản lý thông tin đội tài xế</p>
    <div class="tools">
        <form name="frmTaiXe" action="./xe/taixe/" method="get" enctype="multipart/form-data">
            <a href="javascript:void(0)" onclick="return TaiXe()" title="Thêm mới tài xế" class="add">
                <i class="fa fa-plus"></i> Thêm tài xế </a>
            <a href="javascript:void(0)" onclick="return frmForm('xe','frm_taixe_excel',1)" title="Nhập từ file Excel" class="add">
                <i class="fa fa-file-excel-o"></i> Nhập file Excel </a>
            <input type="text" name="q" placeholder="Tìm tài xế: Tên, phone, email, biển số xe" style="width:250px">
            <select name="active">
                <option value="">Tình trạng</option>
                <option value="1">Còn làm</option>
                <option value="0">Đã nghỉ</option>
            </select>
            <button type="submit">
                <i class="fa fa-search"></i> Tìm kiếm </button>
            <a href="./xe/taixe/" title="Làm mới">
                <i class="fa fa-refresh"></i> Refresh </a>
        </form>
    </div>
    <div class="table table_scroll">
        <form name="frmTxList" id="frmTxList" method="post" enctype="multipart/form-data">
            <table class="table1024">
                <tbody>
                    <tr>
                        <th width="1%">STT</th>
                        <th width="1%">ID</th>
                        <th>Họ và tên</th>
                        <th width="6%">Điện thoại</th>
                        <th width="5.5%">Xe phụ trách</th>
                        <th width="5.5%">Rơ mooc</th>
                        <th width="5%">Ngày vào làm</th>
                        <th width="6%">Lương cơ bản</th>
                        <th width="6%">Phụ cấp</th>
                        <th width="6%">Bảo hiểm</th>
                        <th width="5%">Hoa hồng (%)</th>
                        <th width="1%">#</th>
                        <th width="5%">Actions</th>
                    </tr>
                    <tr>
                        <td align="center">1</td>
                        <td align="center">1</td>
                        <td>
                            <a href="javascript:void(0)" title="Chi tiết" @click="openDriverInfor('MV9fX19fMDk3NTUxMjI4Mg')">Nguyễn Văn Hậu <i class="fa fa-external-link"></i>
                            </a>
                        </td>
                        <td>0975512282</td>
                        <td>15C17669</td>
                        <td></td>
                        <td>13-03-2023</td>
                        <td class="red">8,000,000</td>
                        <td></td>
                        <td>1,664,000</td>
                        <td>0</td>
                        <td align="center">
                            <a href="javascript:void(0)" title="Chi tiết" onclick="return active('xe','taixe_ac','MV9fX19fMDk3NTUxMjI4Mg',1)">
                                <img src="template/Default/images/check-1.png">
                            </a>
                        </td>
                        <td align="center">
                            <a href="javascript:void(0)" title="Chỉnh sửa" @click="openDriverInfor('MV9fX19fMDk3NTUxMjI4Mg', true)">
                                <img src="images/icons/edit-1.png" class="e_MV9fX19fMDk3NTUxMjI4Mg">
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">2</td>
                        <td align="center">2</td>
                        <td>
                            <a href="javascript:void(0)" title="Chi tiết" @click="openDriverInfor('Ml9fX19fMDk4MzY2MTYyMg')">Lại Ngọc Hoằng <i class="fa fa-external-link"></i>
                            </a>
                        </td>
                        <td>0983661622</td>
                        <td>15H02985</td>
                        <td></td>
                        <td>07-11-2022</td>
                        <td class="red">7,500,000</td>
                        <td></td>
                        <td>1,664,000</td>
                        <td>0</td>
                        <td align="center">
                            <a href="javascript:void(0)" title="Chi tiết" onclick="return active('xe','taixe_ac','Ml9fX19fMDk4MzY2MTYyMg',1)">
                                <img src="template/Default/images/check-1.png">
                            </a>
                        </td>
                        <td align="center">
                            <a href="javascript:void(0)" title="Chỉnh sửa" @click="openDriverInfor('Ml9fX19fMDk4MzY2MTYyMg', true)">
                                <img src="images/icons/edit-1.png" class="e_Ml9fX19fMDk4MzY2MTYyMg">
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">3</td>
                        <td align="center">3</td>
                        <td>
                            <a href="javascript:void(0)" title="Chi tiết" @click="openDriverInfor('M19fX19fMDk3MjY4ODQ2MA')">Nguyễn Thế Hanh <i class="fa fa-external-link"></i>
                            </a>
                        </td>
                        <td>0972688460</td>
                        <td>15C25292</td>
                        <td></td>
                        <td>22-04-2021</td>
                        <td class="red">7,500,000</td>
                        <td></td>
                        <td>1,664,000</td>
                        <td>0</td>
                        <td align="center">
                            <a href="javascript:void(0)" title="Chi tiết" onclick="return active('xe','taixe_ac','M19fX19fMDk3MjY4ODQ2MA',1)">
                                <img src="template/Default/images/check-1.png">
                            </a>
                        </td>
                        <td align="center">
                            <a href="javascript:void(0)" title="Chỉnh sửa" @click="openDriverInfor('M19fX19fMDk3MjY4ODQ2MA', true)">
                                <img src="images/icons/edit-1.png" class="e_M19fX19fMDk3MjY4ODQ2MA">
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">4</td>
                        <td align="center">4</td>
                        <td>
                            <a href="javascript:void(0)" title="Chi tiết" @click="openDriverInfor('NF9fX19fMDM4MjM2NTY4OA')">Vũ Tuấn Trường <i class="fa fa-external-link"></i>
                            </a>
                        </td>
                        <td>0382365688</td>
                        <td>15</td>
                        <td></td>
                        <td>01-11-2023</td>
                        <td class="red">7,500,000</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td align="center">
                            <a href="javascript:void(0)" title="Chi tiết" onclick="return active('xe','taixe_ac','NF9fX19fMDM4MjM2NTY4OA',1)">
                                <img src="template/Default/images/check-1.png">
                            </a>
                        </td>
                        <td align="center">
                            <a href="javascript:void(0)" title="Chỉnh sửa" @click="openDriverInfor('NF9fX19fMDM4MjM2NTY4OA', true)">
                                <img src="images/icons/edit-1.png" class="e_NF9fX19fMDM4MjM2NTY4OA">
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
    <div class="paging"></div>

    <DriverInformationModal
        v-if="isOpenDriverInforModal"
        :isEdit="isOpenDriverInforEditModal"
        @close="onCloseDriverInfor()"
    ></DriverInformationModal>
</template>

<style scoped></style>
<script setup>
import moment from 'moment';
import DriverInformationModal from './modal/DriverInformationModal.vue';
</script>
<script>
export default {
    el: '#page',
    data: function () {
        return {
            isOpenDriverInforModal: false,
            isOpenDriverInforEditModal: false,
            selected_key: null
        }
    },
    mounted: function () {

    },
    methods: {
        openDriverInfor: function (key, isEdit = false) {
            this.selected_key = key
            this.isOpenDriverInforModal = true,
            this.isOpenDriverInforEditModal = isEdit
        },
        onCloseDriverInfor: function () {
            this.isOpenDriverInforModal = false
            // if(event) {
            //     this.submitSearch()
            // }
        }
    }
}
</script>
