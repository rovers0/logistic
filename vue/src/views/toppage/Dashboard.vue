<template>
    <div class="wrapper-scroll">
        <div class="mb-3 d-flex justify-content-between">
            <!-- <button class="btn">新規契約登録</button> -->
            <div class="w-[8rem]"></div>
            <div class="title">{{currDate}}現在の状況</div>
            <button class="btn">新規レンタル登録</button>
        </div>
        <div class="container px-2 mb-3">
            <table class="table table-bordered border-color" style="width: 90%; margin: auto;">
                <tbody class="text-center align-middle">
                    <tr class="bg-light-blue">
                        <td rowspan="3" class="fs-5">顧客<br>状況</td>
                    </tr>
                    <tr class="bg-light-blue">
                        <td class="fs-4">レンタル中</td>
                        <td class="fs-4">契約中</td>
                        <td class="fs-4">貸出準備</td>
                        <td class="fs-4">中断手続き中</td>
                        <td class="fs-4">次期稼働数</td>
                    </tr>
                    <tr>
                        <td><a href="#" class="fs-5">1,600</a></td>
                        <td><a href="#" class="fs-5">49</a></td>
                        <td><a href="#" class="fs-5">60</a></td>
                        <td><a href="#" class="fs-5">45</a></td>
                        <td class="fs-5">(1,443)</td>
                    </tr>
                    <tr class="bg-light-blue">
                        <td rowspan="3" class="fs-4">業務<br>状況</td>
                    </tr>
                    <tr class="bg-light-blue">
                        <td class="fs-4">定期交換準備</td>
                        <td class="fs-4">定期交換中</td>
                        <td class="fs-4">故障交換中</td>
                        <td class="fs-4">回収確認中</td>
                        <td class="fs-4">重要調査</td>
                    </tr>
                    <tr>
                        <td><a href="#" class="fs-5">18</a></td>
                        <td><a href="#" class="fs-5">3</a></td>
                        <td><a href="#" class="fs-5">2</a></td>
                        <td><a href="#" class="fs-5">8</a></td>
                        <td><a href="#" class="fs-5">12</a></td>
                    </tr>
                    <tr class="bg-light-blue">
                        <td rowspan="3" class="fs-4">在庫<br>状況</td>
                    </tr>
                    <tr class="bg-light-blue">
                        <td class="fs-4">新規在庫中</td>
                        <td class="fs-4">中古在庫</td>
                        <td class="fs-4">点検対象</td>
                        <td class="fs-4">返却在庫</td>
                        <td class="fs-4">出荷指示待</td>
                    </tr>
                    <tr>
                        <td class="fs-5">320</td>
                        <td class="fs-5">120</td>
                        <td class="fs-5">80</td>
                        <td class="fs-5">126</td>
                        <td><a href="#" class="h-red fs-5">24</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="wrapper-scroll" style="padding: 0rem 2rem;">
            <div class="d-flex parent-scroll">
                <div class="px-2 col wrapper-scroll">
                    <fieldset class="p-2 rounded parent-scroll border-light-blue">
                        <legend class="float-none w-auto px-2 title">■システムからのお知らせ</legend>
                        <ul class="list-style-type-disc col-11 view-scroll">
                            <li class="mb-2 fs-5">
                                【定期交換】 交換案内予定日の経過(<a href="#" class="h-black">3件</a>)
                                <button class="py-1 ms-2 btn btn-danger">至急</button>
                            </li>
                            <li class="mb-2 fs-5">【定期交換】 <strong>60</strong>日前のデータを登録しました(<a>20件</a>)</li>
                            <li class="mb-2 fs-5">【新規貸出】 契約が完了しました(<a href="#">1件</a>)</li>
                            <li class="mb-2 fs-5">
                                【故障交換】 出荷指示未実施 (<a href="#">1件</a>)
                                <button class="py-1 ms-2 btn btn-danger">至急</button>
                            </li>
                        </ul>
                    </fieldset>
                </div>
                <div class="px-2 col wrapper-scroll">
                    <fieldset class="p-2 rounded parent-scroll border-light-blue">
                        <legend class="float-none w-auto px-2 title">■本日の予定作業</legend>
                        <ul class="list-style-type-disc col-11 view-scroll">
                            <li class="mb-2"><a class=" fs-5" href="#">【定期交換】 交換案内予定：12件</a></li>
                            <li class="mb-2"><a class=" fs-5" href="#">【新規貸出】 発送指示予定： 2件</a></li>
                        </ul>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
<script setup>
import moment from 'moment';
</script>
<script>
export default {
    created: function(){
        this.currDate = moment().format('YYYY年MM月DD日　H:mm');
    },
    data: function () {
        return {
            currDate: ''
        }
    },
}
</script>