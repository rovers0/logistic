<template>
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
            <input type="text" @click="openModal('isOpenSelectLicensePlatesModal')" id="biensoxe" style="width:90px" placeholder="Biển số xe" maxlength="15" autocomplete="off" readonly>
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
                        <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenVehicleInspectionModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td> Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenRoadMaintenanceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td> Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenVoluntaryInsuranceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td> Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenMandatoryInsuranceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td> Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenRoadPermitModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Bãi xe 1</td>
                    <td align="center">
                        <a href="javascript:void(0)" title="Chỉnh sửa" @click="openModal('isOpenVehicleEditModal')">
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
                        <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenVehicleInspectionModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>
                        <span class="green">Còn 37 (ngày)</span>
                        <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenRoadMaintenanceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>
                        <span class="green">Còn 219 (ngày)</span>
                        <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenVoluntaryInsuranceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>
                        <span class="green">Còn 219 (ngày)</span>
                        <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenMandatoryInsuranceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td> Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenRoadPermitModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Bãi xe 1</td>
                    <td align="center">
                        <a href="javascript:void(0)" title="Chỉnh sửa" @click="openModal('isOpenVehicleEditModal')">
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
                        <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenVehicleInspectionModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>
                        <span class="red">Còn 9 (ngày)</span>
                        <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenRoadMaintenanceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td> Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenVoluntaryInsuranceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td> Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenMandatoryInsuranceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td> Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenRoadPermitModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Bãi xe 1</td>
                    <td align="center">
                        <a href="javascript:void(0)" title="Chỉnh sửa" @click="openModal('isOpenVehicleEditModal')">
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
                        <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenVehicleInspectionModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>
                        <span class="red">Còn -11 (ngày)</span>
                        <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenRoadMaintenanceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td> Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenVoluntaryInsuranceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td> Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenMandatoryInsuranceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td> Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenRoadPermitModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Bãi xe 1</td>
                    <td align="center">
                        <a href="javascript:void(0)" title="Chỉnh sửa" @click="openModal('isOpenVehicleEditModal')">
                            <img src="images/icons/edit-1.png" class="e_MV9fX19fMTVDMTc2Njk" />
                        </a>
                    </td>
                </tr>
            </table>
        </form>
    </div>
    <div class="paging"></div>

    <VehicleDetailModal
        v-if="isOpenVehicleDetailModal"
        :show="isOpenVehicleDetailModal"
        @close="onCloseDetailModal('isOpenVehicleDetailModal')"
    ></VehicleDetailModal>
    <VehicleInspectionModal
        v-if="isOpenVehicleInspectionModal"
        :show="isOpenVehicleInspectionModal"
        @close="onCloseDetailModal('isOpenVehicleInspectionModal')"
    ></VehicleInspectionModal>
    <RoadMaintenanceModal
        v-if="isOpenRoadMaintenanceModal"
        :show="isOpenRoadMaintenanceModal"
        @close="onCloseDetailModal('isOpenRoadMaintenanceModal')"
    ></RoadMaintenanceModal>
    <VoluntaryInsuranceModal
        v-if="isOpenVoluntaryInsuranceModal"
        :show="isOpenVoluntaryInsuranceModal"
        @close="onCloseDetailModal('isOpenVoluntaryInsuranceModal')"
    ></VoluntaryInsuranceModal>
    <MandatoryInsuranceModal
        v-if="isOpenMandatoryInsuranceModal"
        :show="isOpenMandatoryInsuranceModal"
        @close="onCloseDetailModal('isOpenMandatoryInsuranceModal')"
    ></MandatoryInsuranceModal>
    <RoadPermitModal
        v-if="isOpenRoadPermitModal"
        :show="isOpenRoadPermitModal"
        @close="onCloseDetailModal('isOpenRoadPermitModal')"
    ></RoadPermitModal>
    <VehicleEditModal
        v-if="isOpenVehicleEditModal"
        :show="isOpenVehicleEditModal"
        @close="onCloseDetailModal('isOpenVehicleEditModal')"
    ></VehicleEditModal>
    <SelectLicensePlatesModal
        v-if="isOpenSelectLicensePlatesModal"
        :show="isOpenSelectLicensePlatesModal"
        @close="onCloseDetailModal('isOpenSelectLicensePlatesModal')"
    ></SelectLicensePlatesModal>
</template>

<style scoped></style>
<script setup>
import moment from 'moment';
import VehicleDetailModal from './modal/VehicleDetailModal.vue';
import VehicleInspectionModal from './modal/VehicleInspectionModal.vue';
import RoadMaintenanceModal from './modal/RoadMaintenanceModal.vue';
import VoluntaryInsuranceModal from './modal/VoluntaryInsuranceModal.vue';
import MandatoryInsuranceModal from './modal/MandatoryInsuranceModal.vue';
import RoadPermitModal from './modal/RoadPermitModal.vue';
import VehicleEditModal from './modal/VehicleEditModal.vue';
import SelectLicensePlatesModal from './modal/SelectLicensePlatesModal.vue';
</script>
<script>
export default {
    el: '#page',
    data: function () {
        return {
            isOpenVehicleDetailModal: false,
            isOpenVehicleInspectionModal: false,
            isOpenRoadMaintenanceModal: false,
            isOpenVoluntaryInsuranceModal: false,
            isOpenMandatoryInsuranceModal: false,
            isOpenRoadPermitModal: false,
            isOpenVehicleEditModal: false,
            isOpenSelectLicensePlatesModal: false,
            selected_key: null
        }
    },
    mounted: function () {

    },
    methods: {
        openVehicleDetail: function (key) {
            this[key] = true
            this.isOpenVehicleDetailModal = true
        },
        openModal: function (type) {
            this[type] = true
        },
        onCloseDetailModal: function (type) {
            this[type] = false
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
