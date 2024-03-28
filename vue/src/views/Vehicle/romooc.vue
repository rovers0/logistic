<template>
    <div class="title">
        <h2>Danh sách Rơ Mooc</h2>
    </div>
    <p class="msg">Danh sách số Sơ mi rơ mooc: <b class="red">26-03-2024</b> - Hiện có: <span class="red bold">
            <u>4</u>
        </span> cái </p>
    <div class="tools">
        <form action="./xe/mooc/" methof="get" enctype="multipart/form-data">
            <a href="javascript:void(0)" onclick="return frmForm('xe','mooc_frm',1)" title="Thêm mới" class="add">
                <i class="fa fa-plus"></i> Thêm mới </a>
            <a href="javascript:void(0)" onclick="return frmForm('xe','frm_mooc_excel',1)" title="Nhập từ file Excel" class="add">
                <i class="fa fa-file-excel-o"></i> Nhập file Excel </a>
            <input type="text" name="soromooc" id="soromooc" @click="openModal('isOpenSelectLicensePlatesModal')" style="width:90px" placeholder="Số rơ mooc" maxlength="30" autocomplete="off" readonly="">
            <input type="hidden" name="romooc_id" id="romooc_id">
            <select name="baixe">
                <option value="">Bãi xe</option>
                <option value="0">Chưa có bãi</option>
                <option value="1">Bãi xe 1</option>
                <option value="2">Bãi xe 2</option>
                <option value="3">Bãi xe 3</option>
            </select>
            <button type="submit">
                <i class="fa fa-search"></i> Tra cứu </button>
            <a href="./xe/mooc/" title="Làm mới">
                <i class="fa fa-refresh"></i> Refresh </a>
        </form>
    </div>
    <div class="table table_head10 table_scroll">
        <table class="table1366" style="font-size:10px">
            <tbody>
                <tr>
                    <th width="1%">STT</th>
                    <th>Số sơ mi rơ mooc</th>
                    <th width="1%">Tải trọng (KG)</th>
                    <th width="1%">Kích cỡ</th>
                    <th>Loại mooc</th>
                    <th>Số trục</th>
                    <th>Số xe</th>
                    <th width="13%">Hạn đăng kiểm</th>
                    <th width="13%">Hạn bảo trì đường bộ</th>
                    <th width="13%">Hạn BH tự nguyện</th>
                    <th width="13%">Hạn BH bắt buộc</th>
                    <th width="13%">Giấy phép đi đường</th>
                    <th width="5%">Bãi xe</th>
                    <th width="1%">#</th>
                    <th width="4%">Actions</th>
                </tr>
                <tr>
                    <td align="center">1</td>
                    <td>
                        <a href="javascript:void(0)" @click="openVehicleDetail('NF9fX19fMTVSMTI3MzY')" title="Xem đầy đủ">15R12736</a>
                    </td>
                    <td>3305000</td>
                    <td>40'</td>
                    <td>Mooc sương</td>
                    <td>3 trục</td>
                    <td></td>
                    <td>Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenVehicleInspectionModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenRoadMaintenanceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenVoluntaryInsuranceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenMandatoryInsuranceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenRoadPermitModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Bãi xe 1</td>
                    <td align="center">
                        <a href="javascript:void(0)" onclick="return active('xe','mooc_act','NF9fX19fMTVSMTI3MzY',1)">
                            <img src="images/icons/check-1.png">
                        </a>
                    </td>
                    <td align="center">
                        <a href="javascript:void(0)" title="Chỉnh sửa" @click="openModal('isOpenVehicleEditModal')">
                            <img src="images/icons/edit-1.png" class="e_NF9fX19fMTVSMTI3MzY">
                        </a>
                    </td>
                </tr>
                <tr>
                    <td align="center">2</td>
                    <td>
                        <a href="javascript:void(0)" @click="openVehicleDetail('M19fX19fMTVSMTAzODI')" title="Xem đầy đủ">15R10382</a>
                    </td>
                    <td>3280000</td>
                    <td>40'</td>
                    <td>Mooc sương</td>
                    <td>3 trục</td>
                    <td></td>
                    <td>
                        <span class="red">29-02-2024/ Còn -26 (ngày)</span>
                        <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenVehicleInspectionModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenRoadMaintenanceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenVoluntaryInsuranceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenMandatoryInsuranceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenRoadPermitModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Bãi xe 1</td>
                    <td align="center">
                        <a href="javascript:void(0)" onclick="return active('xe','mooc_act','M19fX19fMTVSMTAzODI',1)">
                            <img src="images/icons/check-1.png">
                        </a>
                    </td>
                    <td align="center">
                        <a href="javascript:void(0)" title="Chỉnh sửa" @click="openModal('isOpenVehicleEditModal')">
                            <img src="images/icons/edit-1.png" class="e_M19fX19fMTVSMTAzODI">
                        </a>
                    </td>
                </tr>
                <tr>
                    <td align="center">3</td>
                    <td>
                        <a href="javascript:void(0)" @click="openVehicleDetail('Ml9fX19fMTVSMDc4MzI')" title="Xem đầy đủ">15R07832</a>
                    </td>
                    <td>3280000</td>
                    <td>40'</td>
                    <td>Mooc sương</td>
                    <td>3 trục</td>
                    <td></td>
                    <td>
                        <span class="green">10-04-2024/ Còn 15 (ngày)</span>
                        <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenVehicleInspectionModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenRoadMaintenanceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenVoluntaryInsuranceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenMandatoryInsuranceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenRoadPermitModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Bãi xe 1</td>
                    <td align="center">
                        <a href="javascript:void(0)" onclick="return active('xe','mooc_act','Ml9fX19fMTVSMDc4MzI',1)">
                            <img src="images/icons/check-1.png">
                        </a>
                    </td>
                    <td align="center">
                        <a href="javascript:void(0)" title="Chỉnh sửa" @click="openModal('isOpenVehicleEditModal')">
                            <img src="images/icons/edit-1.png" class="e_Ml9fX19fMTVSMDc4MzI">
                        </a>
                    </td>
                </tr>
                <tr>
                    <td align="center">4</td>
                    <td>
                        <a href="javascript:void(0)" @click="openVehicleDetail('MV9fX19fMTVSMTM3OTc')" title="Xem đầy đủ">15R13797</a>
                    </td>
                    <td>3280000</td>
                    <td>40'</td>
                    <td>Mooc sương</td>
                    <td>3 trục</td>
                    <td></td>
                    <td>
                        <span class="red">14-03-2024/ Còn -12 (ngày)</span>
                        <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenVehicleInspectionModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenRoadMaintenanceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenVoluntaryInsuranceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenMandatoryInsuranceModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Chưa có <a href="javascript:void(0)" style="float:right" @click="openModal('isOpenRoadPermitModal')" title="Xem">
                            <i class="fa fa-eye"></i> Xem </a>
                    </td>
                    <td>Bãi xe 1</td>
                    <td align="center">
                        <a href="javascript:void(0)" onclick="return active('xe','mooc_act','MV9fX19fMTVSMTM3OTc',1)">
                            <img src="images/icons/check-1.png">
                        </a>
                    </td>
                    <td align="center">
                        <a href="javascript:void(0)" title="Chỉnh sửa" @click="openModal('isOpenVehicleEditModal')">
                            <img src="images/icons/edit-1.png" class="e_MV9fX19fMTVSMTM3OTc">
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="paging"></div>

    <VehicleDetailModal
        v-if="isOpenVehicleDetailModal"
        :show="isOpenVehicleDetailModal"
        :isMooc=true
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
        :isMooc=true
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
