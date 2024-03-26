<template>
    <div class="popup">
        <div class="scroll" v-if="isEdit">
            <span class="close_pop" @click="onClose()">×</span>
            <div class="pophead">
                <h2>Thêm mới thông tin tài xế</h2>
                <p>Màn hình thêm mới thông tin tài xế</p>
            </div>
            <div class="frm">
                <form name="frm_taixe" id="frm_taixe" method="post" onsubmit="return insert('xe','taixe_update','frm_taixe','img_file')" enctype="multipart/form-data">
                    <input type="hidden" name="code" id="code" value="MV9fX19fMDk3NTUxMjI4Mg">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td width="25%">
                                    <b>Họ và tên (*)</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[hoten]" value="Nguyễn Văn Hậu" placeholder="Họ và tên" maxlength="50" required="required">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Xe đang phụ trách (*)</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[xephutrach]" value="15C17669" id="biensoxe" onclick="return listXe()" placeholder="Chọn xe phụ trách" required="required" readonly="">
                                    <input type="hidden" name="ds[id_xe]" value="1" id="id_xe">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Số điện thoại (*)</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[phone]" value="0975512282" placeholder="Số điện thoại" maxlength="10" required="required">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Email</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[email]" value="0795355831" placeholder="Email (nếu có)" maxlength="50">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Năm sinh (*)</b>
                                </td>
                                <td>
                                    <select name="ds[ngaysinh]" style="width:32.33333333333333%!important;float:left;margin:0 1% 0 0">
                                        <option value="">Ngày sinh (nếu có)</option>
                                        <option value="01">Ngày 01</option>
                                        <option value="02">Ngày 02</option>
                                        <option value="03">Ngày 03</option>
                                        <option value="04">Ngày 04</option>
                                        <option value="05" selected="selected">Ngày 05</option>
                                        <option value="06">Ngày 06</option>
                                        <option value="07">Ngày 07</option>
                                        <option value="08">Ngày 08</option>
                                        <option value="09">Ngày 09</option>
                                        <option value="10">Ngày 10</option>
                                        <option value="11">Ngày 11</option>
                                        <option value="12">Ngày 12</option>
                                        <option value="13">Ngày 13</option>
                                        <option value="14">Ngày 14</option>
                                        <option value="15">Ngày 15</option>
                                        <option value="16">Ngày 16</option>
                                        <option value="17">Ngày 17</option>
                                        <option value="18">Ngày 18</option>
                                        <option value="19">Ngày 19</option>
                                        <option value="20">Ngày 20</option>
                                        <option value="21">Ngày 21</option>
                                        <option value="22">Ngày 22</option>
                                        <option value="23">Ngày 23</option>
                                        <option value="24">Ngày 24</option>
                                        <option value="25">Ngày 25</option>
                                        <option value="26">Ngày 26</option>
                                        <option value="27">Ngày 27</option>
                                        <option value="28">Ngày 28</option>
                                        <option value="29">Ngày 29</option>
                                        <option value="30">Ngày 30</option>
                                        <option value="31">Ngày 31</option>
                                    </select>
                                    <select name="ds[thangsinh]" style="width:32.33333333333333%!important;float:left">
                                        <option value="">Tháng sinh (nếu có)</option>
                                        <option value="01">Tháng 01</option>
                                        <option value="02">Tháng 02</option>
                                        <option value="03">Tháng 03</option>
                                        <option value="04" selected="selected">Tháng 04</option>
                                        <option value="05">Tháng 05</option>
                                        <option value="06">Tháng 06</option>
                                        <option value="07">Tháng 07</option>
                                        <option value="08">Tháng 08</option>
                                        <option value="09">Tháng 09</option>
                                        <option value="10">Tháng 10</option>
                                        <option value="11">Tháng 11</option>
                                        <option value="12">Tháng 12</option>
                                    </select>
                                    <input type="number" name="ds[namsinh]" value="1988" style="width:31%;float:right" placeholder="Năm sinh" maxlength="4" onkeypress="return checkIt(event)" required="">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Quê quán</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[quequan]" value="Hải Dương" placeholder="Quê quán.VD: Tiền Giang" maxlength="100">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Số CMND/CCCD/Passport (*)</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[cmnd]" value="030088008619" placeholder="Số CMND/CCCD/Passport" maxlength="30" required="">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>SĐT người thân (*)</b>
                                </td>
                                <td>
                                    <input type="tel" name="ds[sdt_nguoithan]" value="" placeholder="SĐT người thân" maxlength="10" onkeypress="return checkIt(event)">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Tên người thân (*)</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[tennguoithan]" value="" placeholder="Tên người thân" maxlength="50">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Lương căn bản (*)</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[luong]" value="8,000,000" data-type="currency" class="red" placeholder="VD: 4,500,000" maxlength="30" required="">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Phụ cấp</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[phucap]" value="" data-type="currency" class="red" placeholder="Phụ cấp. VD: 500,000" maxlength="30">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Bảo hiểm</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[baohiem]" value="1,664,000" data-type="currency" class="red" placeholder="VD: 800,000" maxlength="30">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Tỉ lệ hoa hồng (%)</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[hoahong]" value="0" class="red" placeholder="VD: 1.5" maxlength="3">
                                    <p class="tips blue2 italic">(Nếu áp dụng, mức hoa hồng sẽ được tính theo sản lượng tài xế đạt được trong tháng. Trường hợp không áp dụng nhập 0)</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Số năm kinh nghiệm</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[kinhnghiem]" value="0" placeholder="Số năm kinh nghiệm. VD: 5" onkeypress="return checkIt(event)" maxlength="2">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Hạng bằng lái (*)</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[hangbanglai]" value="0" placeholder="Hạng bằng lái" maxlength="50" required="">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Số bằng lái (*)</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[sobanglai]" value="0300103300763" placeholder="Số bằng lái" maxlength="50" required="">
                                    <p class="tips blue2 italic">(Nhập số ghi trên bằng lái)</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b class="red">Giá trị bằng lái (*)</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[giatribanglai]" value="31-12-2024" class="picker hasDatepicker" placeholder="VD: 25-06-2028" maxlength="10" readonly="" required="" id="dp1711435244106">
                                    <p class="tips blue2 italic">(Chọn ngày hết hạn giá trị ghi trên bằng lái)</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b class="red">Hạn an toàn tài xế (nếu có)</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[hanantoan]" value="--" class="picker hasDatepicker" placeholder="VD: 25-06-2028" maxlength="10" readonly="" required="" id="dp1711435244107">
                                    <p class="tips blue2 italic">(Thời hạn an toàn của tài xế nếu có)</p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <h2>THÔNG TIN HỒ SƠ XIN VIỆC</h2>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Người nhận hồ sơ</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[nguoinhanhoso]" value="Nguyễn Mạnh Tùng" placeholder="Người nhận hồ sơ" maxlength="50">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Ngày nhận hồ sơ gốc</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[ngaynhanhoso]" value="13-03-2023" class="picker hasDatepicker" readonly="" placeholder="Ngày nhận hồ sơ" maxlength="50" id="dp1711435244108">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Ngày vào làm (*)</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[ngayvaolam]" value="13-03-2023" class="picker hasDatepicker" maxlength="10" placeholder="Ngày vào làm" readonly="" id="dp1711435244109">
                                    <p class="tips blue2 italic">(Ngày tài xế bắt đầu vào làm)</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Ngày nghỉ việc</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[ngaynghiviec]" value="" class="picker hasDatepicker" readonly="" placeholder="Ngày nhận hồ sơ" maxlength="50" id="dp1711435244110">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Ngày bàn trả hồ sơ gốc</b>
                                </td>
                                <td>
                                    <input type="text" name="ds[ngaytrohoso]" value="" class="picker hasDatepicker" readonly="" placeholder="Ngày nhận hồ sơ" maxlength="50" id="dp1711435244111">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>File hồ sơ gốc + Biên bản giao xe</b>
                                </td>
                                <td>
                                    <p style="margin:0 0 10px 0">
                                        <input type="file" name="pdf_file[]" id="pdf_file" multiple="multiple" accept=".pdf,.doc,.docx,.xls,.xlsx">
                                        <span class="red">File scan: .pdf,.doc,.docx,.xls,.xlsx</span>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Hình ảnh đính kèm</strong>
                                </td>
                                <td>
                                    <input type="file" name="img_file[]" id="img_file" onchange="previewImg(event,8);" multiple="multiple" accept="image/*;capture=camera">
                                    <p class="tips red">Lưu ý: có thể chọn cùng lúc tối thiểu 8 hình ảnh</p>
                                    <div class="view_pics"></div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <h2>THÔNG TIN ĐĂNG NHẬP</h2>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Mật khẩu</b>
                                </td>
                                <td>
                                    <div class="vpass" style="float:right;width:100%">
                                        <input type="password" name="ds[pwd]" value="0975512282" id="matkhau" placeholder="Mật khẩu > 8 ký tự" maxlength="30" required="">
                                        <span class="toggpass" id="toggpass" style="height:34px;line-height:34px" title="Ẩn/Hiện mật khẩu" onclick="togglePwd('matkhau','toggpass')">
                                            <i class="fa fa-eye"></i>
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="submit" style="margin:10px 10px 0 0;float:left">
                        <i class="fa fa-floppy-o"></i> Lưu thông tin </button>
                    <button class="close_btn" @click="onClose()" style="margin:10px 0 0 0">
                        <i class="fa fa-times-circle"></i> Đóng </button>
                </form>
            </div>
        </div>
        <div class="scroll" v-else>
            <span class="close_pop" @click="onClose()">×</span>
            <div class="pophead">
                <h2>Thông tin tài xế</h2>
                <p>Màn hình xem thông tin tài xế</p>
            </div>
            <div class="frm">
                <table class="table">
                    <tbody>
                        <tr>
                            <td width="25%">
                                <b>Họ và tên</b>
                            </td>
                            <td>Nguyễn Văn Hậu</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số điện thoại</b>
                            </td>
                            <td>0975512282</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Xe đang phụ trách</b>
                            </td>
                            <td>15C17669</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Email</b>
                            </td>
                            <td>0795355831</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Năm sinh</b>
                            </td>
                            <td> 05-04-1988 </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Quê quán</b>
                            </td>
                            <td>Hải Dương</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số CMND/Passport</b>
                            </td>
                            <td>030088008619</td>
                        </tr>
                        <tr>
                            <td>
                                <b>SĐT người thân (*)</b>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <b>Tên người thân (*)</b>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <b>Lương căn bản</b>
                            </td>
                            <td class="red">8,000,000</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Phụ cấp</b>
                            </td>
                            <td class="red"></td>
                        </tr>
                        <tr>
                            <td>
                                <b>Bảo hiểm</b>
                            </td>
                            <td class="red">1,664,000</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Tỉ lệ hoa hồng (%)</b>
                            </td>
                            <td class="red">0</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ngày vào làm</b>
                            </td>
                            <td>13-03-2023</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số năm kinh nghiệm</b>
                            </td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Hạng bằng lái</b>
                            </td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Số bằng lái</b>
                            </td>
                            <td>0300103300763</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Giá trị bằng lái (*)</b>
                            </td>
                            <td>31-12-2024 <br>
                                <span class="green">
                                    <i class="fa fa-check-circle"></i> Còn hạn 280 ngày </span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <h2>THÔNG TIN HỒ SƠ XIN VIỆC</h2>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Người nhận hồ sơ</b>
                            </td>
                            <td>Nguyễn Mạnh Tùng</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ngày nhận hồ sơ gốc</b>
                            </td>
                            <td>13-03-2023</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ngày vào làm</b>
                            </td>
                            <td>13-03-2023</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ngày nghỉ việc</b>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <b>Ngày bàn trả hồ sơ gốc</b>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <button class="close_btn" @click="onClose()" style="margin:10px 0 0 0">
                    <i class="fa fa-times-circle"></i> Đóng </button>
            </div>
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
    props: ['show', 'isEdit', 'selectedKey'],
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
