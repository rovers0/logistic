<template>
    <div class="wrapper-scroll">
        <div class="row mb-2">
            <label class="col-4 col-form-label">■ポンプ在庫・仕入実績</label>
            <div class="col-8 row">
                <label class="col-1 col-form-label">ポンプ</label>
                <div class="col-6">
                    <select class="form-select">
                        <option :value="null">全て</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center mb-4">
            <table class="t-border">
                <thead class="text-center">
                    <tr>
                        <th>過去12ヶ月</th>
                        <th>22/03</th>
                        <th>22/04</th>
                        <th>22/05</th>
                        <th>22/06</th>
                        <th>22/07</th>
                        <th>22/08</th>
                        <th>22/09</th>
                        <th>22/10</th>
                        <th>22/11</th>
                        <th>22/12</th>
                        <th>22/01</th>
                        <th>22/02</th>
                        <th>合計(台)</th>
                        <th>平均(台)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in 5">
                        <td class="text-center">出荷可能数</td>
                        <td class="text-end">120</td>
                        <td class="text-end">60</td>
                        <td class="text-end">10</td>
                        <td class="text-end">65</td>
                        <td class="text-end">21</td>
                        <td class="text-end">81</td>
                        <td class="text-end">21</td>
                        <td class="text-end">64</td>
                        <td class="text-end">10</td>
                        <td class="text-end">65</td>
                        <td class="text-end">4</td>
                        <td class="text-end">68</td>
                        <td class="text-end">-</td>
                        <td class="text-end">49</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="d-flex justify-content-between mb-2">
            <div class="d-flex">
                <label class="col-4 col-form-label">■ポンプ在庫・仕入の予測</label>
            </div>
            <div class="row">
                <label class="col-2 col-form-label">新規上昇率</label>
                <div class="col-3">
                    <input type="text" class="form-control">
                </div>
                <label class="col-1 col-form-label me-4">中止率</label>
                <div class="col-3">
                    <input type="text" class="form-control">
                </div>
            </div>
            <div class="d-flex">
                <button class="btn default">入力情報保存</button>
            </div>
        </div>
        <div class="d-flex justify-content-center mb-2">
            <table class="t-border">
                <thead class="text-center">
                    <tr>
                        <th>これから12ヶ月</th>
                        <th>23/03</th>
                        <th>23/04</th>
                        <th>23/05</th>
                        <th>23/06</th>
                        <th>23/07</th>
                        <th>23/08</th>
                        <th>23/09</th>
                        <th>23/10</th>
                        <th>23/11</th>
                        <th>23/12</th>
                        <th>23/01</th>
                        <th>23/02</th>
                        <th>合計(台)</th>
                        <th>平均(台)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center">出荷可能数</td>
                        <td class="text-end">120</td>
                        <td class="text-end">60</td>
                        <td class="text-end">10</td>
                        <td class="text-end">65</td>
                        <td class="text-end">21</td>
                        <td class="text-end">81</td>
                        <td class="text-end">21</td>
                        <td class="text-end">64</td>
                        <td class="text-end">10</td>
                        <td class="text-end">65</td>
                        <td class="text-end">4</td>
                        <td class="text-end">68</td>
                        <td class="text-end">-</td>
                        <td class="text-end">49</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>

</script>
<script>
export default {
    data: function () {
        return {

        }
    },
    mounted: function () {

    },
    methods: {

    }
}
</script>