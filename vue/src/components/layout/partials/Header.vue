<template>
    <div class="header" id="myHeader">
        <span class="mbmenu"><i class="fa fa-bars"></i></span><a href="./homepage" class="home"><i class="fa fa-home"></i></a>
        <ul class="menu">
            <li><a href="./homepage"><i class="fa fa-home mnh"></i> Home</a></li>
            <li><a href="./vandon">Vận đơn <i class="fa fa-caret-down"></i></a>
                <ul>
                    <li><a href="./lenh">Lệnh điều động</a></li>
                    <li><a href="./lenh/xuat">Danh sách Cont</a></li>
                </ul>
            </li>
            <li><a href="./hangroi">Hàng rời <i class="fa fa-caret-down"></i></a>
                <ul>
                    <li><a href="./hangroi/lenh">Lệnh điều động</a></li>
                </ul>
            </li>
            <li><a href="./ncc">Nhà cung cấp</a></li>
            <li><a href="./kho">Q.Lý Kho <i class="fa fa-caret-down"></i></a>
                <ul>
                    <li><a href="./kho">Quản lý sản phẩm kho</a></li>
                    <li><a href="./kho/dexuat">Phiếu đề xuất nhập kho</a></li>
                    <li><a href="./kho/xuat">Lịch sử xuất kho</a></li>
                    <li><a href="./sp"><i class="fa fa-plus"></i> Sản phẩm nhập kho</a></li>
                </ul>
            </li>
            <li><a href="./dau">Theo dõi dầu <i class="fa fa-caret-down"></i></a>
                <ul>
                    <li><a href="./dau/xuat/?m=03&y=2024">Định mức tiêu hao nhiên liệu</a></li>
                </ul>
            </li>
            <li><a href="./lop">Theo dõi lốp <i class="fa fa-caret-down"></i></a>
                <ul>
                    <li><a href="./lop/lopmoi">Kho lốp nhập mới</a></li>
                    <li><a href="./lopthuhoi">Kho lốp thu hồi</a></li>
                </ul>
            </li>
            <li><a href="./dexuat">Sửa chữa <i class="fa fa-caret-down"></i></a>
                <ul>
                    <li><a href="./dexuat">Đề xuất sửa chữa</a></li>
                    <li><a href="./suachua">Sửa chữa vặt</a></li>
                    <li><a href="./hangmuc"><i class="fa fa-plus"></i> Hạng mục sửa chữa</a></li>
                </ul>
            </li>
            <li><a href="./xe">Phương tiện <i class="fa fa-caret-down"></i></a>
                <ul>
                    <li><a href="./xe">Đội xe</a></li>
                    <li><a href="./xe/mooc">Rơ mooc</a></li>
                    <li><a href="./xe/taixe">Tài xế</a></li>
                </ul>
            </li>
            <li><a href="./baocao"><i class="fa fa-area-chart mnh"></i> Báo cáo</a>
                <ul>
                    <li><a href="./baocaoxe">Doanh thu theo xe</a></li>
                </ul>
            </li>
        </ul>
        <div class="user"><a href="javascript:void(0)" title="Tài khoản đăng nhập" class="toogle_user"><i class="fa fa-user"></i> Hi, Vtm</a>
            <div class="toogle_class"><i class="arrow-up"></i><i class="arrow-up2"></i><span>V</span>
                <p class="bold">Vtm</p>
                <p class="p">Kỹ thuật</p>
                <h3 class="h3op"><i class="fa fa-cog"></i> Chọn giao diện làm việc</h3>
                <div class="setch">
                    <ul>
                        <li><a href="javascript:void(0)" id="mn_horizontal" onclick="return active2('homepage','menu',0,0,1)"><input type="radio" name="radio" value="0" id="radio0" checked><label for="radio0">Giao diện menu ngang</label></a></li>
                        <li><a href="javascript:void(0)" id="mn_horizontal" onclick="return active2('homepage','menu',1,0,1)"><input type="radio" name="radio" value="1" id="radio0"><label for="radio0">Giao diện menu dọc</label></a></li>
                    </ul>
                </div>
                <p class="p2"><a href="javascript:void(0)" title="Thoát" onClick="return checkLogout()">Đăng xuất</a><a href="javascript:void(0)" onClick="return frmChangePass()" title="Đổi mật khẩu?" style="float:right;border:0;background:none;color:#0084fc;text-decoration:underline">Đổi mật khẩu?</a></p>
            </div>
        </div>
    </div>
    <div class="transmenu"></div>
</template>