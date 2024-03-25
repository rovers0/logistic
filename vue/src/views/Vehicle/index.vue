<template>
    <div class="page">
        <div class="title">
            <h2>Danh sách xe</h2>
        </div>
        <p class="msg"> Danh sách xe đang hoạt động tính đến ngày: <b class="red">25-03-2024</b> - Hiện có: <span class="red bold">
                <u>4</u>
            </span> xe </p>
        <div class="tools">
            <form name="frmSXe" id="frmSXe" action="./xe/" method="get" enctype="multipart/form-data">
                <a href="javascript:void(0)" title="Đã đủ số lượng xe đăng ký" style="opacity:0.3">
                    <i class="fa fa-plus"></i> Thêm xe </a>
                <a href="javascript:void(0)" title="Đã đủ số lượng xe đăng ký" style="opacity:0.3">
                    <i class="fa fa-file-excel-o"></i> Nhập file Excel </a>
                <input type="text" onclick="return listXeSearch()" id="biensoxe" style="width:90px" placeholder="Biển số xe" maxlength="15" autocomplete="off" readonly>
                <input type="hidden" name="idxe" id="id_xe">
                <select name="baixe">
                    <option value="">Bãi xe</option>
                    <option value="0">Chưa có bãi</option>
                    <option value="1">Bãi xe 1</option>
                    <option value="2">Bãi xe 2</option>
                    <option value="3">Bãi xe 3</option>
                </select>
                <select name="socau">
                    <option value="">Loại xe</option>
                    <option value="1">Xe 1 cầu</option>
                    <option value="2">Xe 2 cầu</option>
                    <option value="0">Chưa xác định</option>
                </select>
                <button type="submit">
                    <i class="fa fa-search"></i> Tra cứu </button>
                <a href="./xe/" title="Làm mới">
                    <i class="fa fa-refresh"></i> Refresh </a>
            </form>
        </div>
        <div class="table table_scroll">
            <form name="frmTxList" id="frmTxList" method="post" enctype="multipart/form-data">
                <table class="table1366 table_head10" style="font-size:10px">
                    <tr>
                        <th width="1%">STT</th>
                        <th width="1%">ID</th>
                        <th width="5%">Biển số xe</th>
                        <th width="5%">Số cầu</th>
                        <th width="5%">Rơ mooc</th>
                        <th width="9%">Tài xế phụ trách</th>
                        <th width="9%">Cổ đông xe</th>
                        <th width="11%">Hạn đăng kiểm</th>
                        <th width="11%">Hạn bảo trì đường bộ</th>
                        <th width="11%">Hạn BH tự nguyện</th>
                        <th width="11%">Hạn BH bắt buộc</th>
                        <th width="11%">Giấy phép đi đường</th>
                        <th width="6%">Bãi xe</th>
                        <th width="4%">Actions</th>
                    </tr>
                    <tr>
                        <td align="center">1</td>
                        <td align="center">4</td>
                        <td>
                            <a href="javascript:void(0)" @click="openVehicleDetail('NF9fX19fMTVIMDI5ODU')" class="bold">15H02985</a>
                        </td>
                        <td>Xe 2 cầu</td>
                        <td></td>
                        <td>Lại Ngọc Hoằng</td>
                        <td></td>
                        <td>
                            <span class="red">Còn -109 (ngày)</span>
                            <a href="javascript:void(0)" style="float:right" onclick="return frmForm('xe','dk_frm','NF9fX19fMTVIMDI5ODVfX19fXzFfX19fXzE')" title="Xem">
                                <i class="fa fa-eye"></i> Xem </a>
                        </td>
                        <td> Chưa có <a href="javascript:void(0)" style="float:right" onclick="return frmForm('xe','dk_frm','NF9fX19fMTVIMDI5ODVfX19fXzJfX19fXzE')" title="Xem">
                                <i class="fa fa-eye"></i> Xem </a>
                        </td>
                        <td> Chưa có <a href="javascript:void(0)" style="float:right" onclick="return frmForm('xe','dk_frm','NF9fX19fMTVIMDI5ODVfX19fXzNfX19fXzE')" title="Xem">
                                <i class="fa fa-eye"></i> Xem </a>
                        </td>
                        <td> Chưa có <a href="javascript:void(0)" style="float:right" onclick="return frmForm('xe','dk_frm','NF9fX19fMTVIMDI5ODVfX19fXzRfX19fXzE')" title="Xem">
                                <i class="fa fa-eye"></i> Xem </a>
                        </td>
                        <td> Chưa có <a href="javascript:void(0)" style="float:right" onclick="return frmForm('xe','dk_frm','NF9fX19fMTVIMDI5ODVfX19fXzVfX19fXzE')" title="Xem">
                                <i class="fa fa-eye"></i> Xem </a>
                        </td>
                        <td>Bãi xe 1</td>
                        <td align="center">
                            <a href="javascript:void(0)" title="Chỉnh sửa" onclick="return frmXe('NF9fX19fMTVIMDI5ODU')">
                                <img src="images/icons/edit-1.png" class="e_NF9fX19fMTVIMDI5ODU" />
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">2</td>
                        <td align="center">3</td>
                        <td>
                            <a href="javascript:void(0)" @click="openVehicleDetail('M19fX19fMTVDMjYzMjg')" class="bold">15C26328</a>
                        </td>
                        <td>Xe 2 cầu</td>
                        <td></td>
                        <td>Vũ Tuấn Trường</td>
                        <td>Xe nhà</td>
                        <td>
                            <span class="green">Còn 37 (ngày)</span>
                            <a href="javascript:void(0)" style="float:right" onclick="return frmForm('xe','dk_frm','M19fX19fMTVDMjYzMjhfX19fXzFfX19fXzE')" title="Xem">
                                <i class="fa fa-eye"></i> Xem </a>
                        </td>
                        <td>
                            <span class="green">Còn 37 (ngày)</span>
                            <a href="javascript:void(0)" style="float:right" onclick="return frmForm('xe','dk_frm','M19fX19fMTVDMjYzMjhfX19fXzJfX19fXzE')" title="Xem">
                                <i class="fa fa-eye"></i> Xem </a>
                        </td>
                        <td>
                            <span class="green">Còn 219 (ngày)</span>
                            <a href="javascript:void(0)" style="float:right" onclick="return frmForm('xe','dk_frm','M19fX19fMTVDMjYzMjhfX19fXzNfX19fXzE')" title="Xem">
                                <i class="fa fa-eye"></i> Xem </a>
                        </td>
                        <td>
                            <span class="green">Còn 219 (ngày)</span>
                            <a href="javascript:void(0)" style="float:right" onclick="return frmForm('xe','dk_frm','M19fX19fMTVDMjYzMjhfX19fXzRfX19fXzE')" title="Xem">
                                <i class="fa fa-eye"></i> Xem </a>
                        </td>
                        <td> Chưa có <a href="javascript:void(0)" style="float:right" onclick="return frmForm('xe','dk_frm','M19fX19fMTVDMjYzMjhfX19fXzVfX19fXzE')" title="Xem">
                                <i class="fa fa-eye"></i> Xem </a>
                        </td>
                        <td>Bãi xe 1</td>
                        <td align="center">
                            <a href="javascript:void(0)" title="Chỉnh sửa" onclick="return frmXe('M19fX19fMTVDMjYzMjg')">
                                <img src="images/icons/edit-1.png" class="e_M19fX19fMTVDMjYzMjg" />
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">3</td>
                        <td align="center">2</td>
                        <td>
                            <a href="javascript:void(0)" @click="openVehicleDetail('Ml9fX19fMTVDMjUyOTI')" class="bold">15C25292</a>
                        </td>
                        <td>Xe 2 cầu</td>
                        <td></td>
                        <td>Nguyễn Thế Hanh</td>
                        <td></td>
                        <td>
                            <span class="red">Còn 9 (ngày)</span>
                            <a href="javascript:void(0)" style="float:right" onclick="return frmForm('xe','dk_frm','Ml9fX19fMTVDMjUyOTJfX19fXzFfX19fXzE')" title="Xem">
                                <i class="fa fa-eye"></i> Xem </a>
                        </td>
                        <td>
                            <span class="red">Còn 9 (ngày)</span>
                            <a href="javascript:void(0)" style="float:right" onclick="return frmForm('xe','dk_frm','Ml9fX19fMTVDMjUyOTJfX19fXzJfX19fXzE')" title="Xem">
                                <i class="fa fa-eye"></i> Xem </a>
                        </td>
                        <td> Chưa có <a href="javascript:void(0)" style="float:right" onclick="return frmForm('xe','dk_frm','Ml9fX19fMTVDMjUyOTJfX19fXzNfX19fXzE')" title="Xem">
                                <i class="fa fa-eye"></i> Xem </a>
                        </td>
                        <td> Chưa có <a href="javascript:void(0)" style="float:right" onclick="return frmForm('xe','dk_frm','Ml9fX19fMTVDMjUyOTJfX19fXzRfX19fXzE')" title="Xem">
                                <i class="fa fa-eye"></i> Xem </a>
                        </td>
                        <td> Chưa có <a href="javascript:void(0)" style="float:right" onclick="return frmForm('xe','dk_frm','Ml9fX19fMTVDMjUyOTJfX19fXzVfX19fXzE')" title="Xem">
                                <i class="fa fa-eye"></i> Xem </a>
                        </td>
                        <td>Bãi xe 1</td>
                        <td align="center">
                            <a href="javascript:void(0)" title="Chỉnh sửa" onclick="return frmXe('Ml9fX19fMTVDMjUyOTI')">
                                <img src="images/icons/edit-1.png" class="e_Ml9fX19fMTVDMjUyOTI" />
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">4</td>
                        <td align="center">1</td>
                        <td>
                            <a href="javascript:void(0)" @click="openVehicleDetail('MV9fX19fMTVDMTc2Njk')" class="bold">15C17669</a>
                        </td>
                        <td>Xe 2 cầu</td>
                        <td></td>
                        <td>Nguyễn Văn Hậu</td>
                        <td></td>
                        <td>
                            <span class="red">Còn -11 (ngày)</span>
                            <a href="javascript:void(0)" style="float:right" onclick="return frmForm('xe','dk_frm','MV9fX19fMTVDMTc2NjlfX19fXzFfX19fXzE')" title="Xem">
                                <i class="fa fa-eye"></i> Xem </a>
                        </td>
                        <td>
                            <span class="red">Còn -11 (ngày)</span>
                            <a href="javascript:void(0)" style="float:right" onclick="return frmForm('xe','dk_frm','MV9fX19fMTVDMTc2NjlfX19fXzJfX19fXzE')" title="Xem">
                                <i class="fa fa-eye"></i> Xem </a>
                        </td>
                        <td> Chưa có <a href="javascript:void(0)" style="float:right" onclick="return frmForm('xe','dk_frm','MV9fX19fMTVDMTc2NjlfX19fXzNfX19fXzE')" title="Xem">
                                <i class="fa fa-eye"></i> Xem </a>
                        </td>
                        <td> Chưa có <a href="javascript:void(0)" style="float:right" onclick="return frmForm('xe','dk_frm','MV9fX19fMTVDMTc2NjlfX19fXzRfX19fXzE')" title="Xem">
                                <i class="fa fa-eye"></i> Xem </a>
                        </td>
                        <td> Chưa có <a href="javascript:void(0)" style="float:right" onclick="return frmForm('xe','dk_frm','MV9fX19fMTVDMTc2NjlfX19fXzVfX19fXzE')" title="Xem">
                                <i class="fa fa-eye"></i> Xem </a>
                        </td>
                        <td>Bãi xe 1</td>
                        <td align="center">
                            <a href="javascript:void(0)" title="Chỉnh sửa" onclick="return frmXe('MV9fX19fMTVDMTc2Njk')">
                                <img src="images/icons/edit-1.png" class="e_MV9fX19fMTVDMTc2Njk" />
                            </a>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="paging"></div>
    </div>

    <VehicleDetailModal v-if="isOpenVehicleDetailModal"
    :show="isOpenVehicleDetailModal"
    @close="onCloseVehicleDetail($event)"></VehicleDetailModal>
</template>

<style scoped></style>
<script setup>
import moment from 'moment';
import VehicleDetailModal from '@/views/Achievement/modal/PRDetailModal.vue';
</script>
<script>
export default {
    el: '#page',
    data: function () {
        return {
            isOpenVehicleDetailModal: false,
            selected_key: null
        }
    },
    mounted: function () {
        
    },
    methods: {
        openVehicleDetail: function (key) {
            this.selected_key = key
            this.isOpenPRDetailModal = true
        },
        onCloseVehicleDetail: function (event) {
            this.isOpenVehicleDetailModal = false
            // if(event) {
            //     this.submitSearch()
            // }
        }
    }
}
</script>