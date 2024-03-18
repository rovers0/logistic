<template>
    <ModalLayout :show="show" title="在庫実績照合" maxWidth="max-w-7xl" :class="'px-0'" @close="closeInvetoryMatching()">
        <div class="container">
            <div class="mb-2 mt-2">
                <div class="d-flex justify-content-between mb-1">
                    <div>
                        <button class="btn default" @click="openFile">実績Excel選択</button>
                        <input type="file" class="visually-hidden" ref="file" @change="onFileChange" />
                    </div>
                    <div class="col-form-label fw-bold">実績データ：{{ inventoryData.data?.length }}件 (OK: {{ inventoryData.totalOK }}件　NG: {{ inventoryData.totalNG }}件)</div>
                    <div class="d-flex">
                        <div class="form-check col-form-label me-3">
                            <input class="form-check-input" type="radio" :value="null" id="全て" v-model="filterItem">
                            <label class="form-check-label" for="全て">
                                全て
                            </label>
                        </div>
                        <div class="form-check col-form-label me-3">
                            <input class="form-check-input" type="radio" value="0" id="OK分" v-model="filterItem">
                            <label class="form-check-label" for="OK分">
                                OK分
                            </label>
                        </div>
                        <div class="form-check col-form-label">
                            <input class="form-check-input" type="radio" value="1" id="NG分" v-model="filterItem">
                            <label class="form-check-label" for="NG分">
                                NG分
                            </label>
                        </div>
                    </div>
                </div>
                <div class="mb-2 overflow-auto" style="max-height: 80vh;">
                    <table class="t-border">
                        <thead class="text-center">
                            <tr>
                                <th>実績棚</th>
                                <th>実績シリアルNo.</th>
                                <th>入庫日</th>
                                <th>DBの棚</th>
                                <th>DBのシリアルNo.</th>
                                <th>初回入庫日</th>
                                <th>最後入庫日</th>
                                <th>取込可能有無</th>
                                <th>調整</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="inventory, i in inventoryData.data">
                                <template v-if="filterItem">
                                    <tr v-if="filterItem == 0 && inventory.status == 0">
                                        <td class="text-center">{{ inventory.from_shelf }}</td>
                                        <td class="text-center">{{ inventory.serial_no }}</td>
                                        <td class="text-center">{{ inventory.ship_date }}</td>
                                        <td class="text-center">{{ inventory.from_shelf2 }}</td>
                                        <td class="text-center">{{ inventory.serial_no2 }}</td>
                                        <td class="text-center">{{ inventory.first_storein_date }}</td>
                                        <td class="text-center">{{ inventory.final_storein_date }}</td>
                                        <td class="text-center" :class="inventory.status > 0 ? 'text-danger' : ''">{{ inventory.capture }}</td>
                                        <td class="text-center">
                                            <template v-if="inventory.status == 0">-</template>
                                            <button v-if="inventory.status == 1" class="btn default" @click="updateItem(inventory,i)">実績棚複製</button>
                                            <button v-if="inventory.status == 2" class="btn default" @click="createItem(inventory,i)">実績から複製</button>
                                            <button v-if="inventory.status == 3" class="btn default" @click="confirmDelete(inventory,i)">DB情報削除</button>
                                        </td>
                                    </tr>
                                    <tr v-if="filterItem > 0 && inventory.status > 0">
                                        <td class="text-center">{{ inventory.from_shelf }}</td>
                                        <td class="text-center">{{ inventory.serial_no }}</td>
                                        <td class="text-center">{{ inventory.ship_date }}</td>
                                        <td class="text-center">{{ inventory.from_shelf2 }}</td>
                                        <td class="text-center">{{ inventory.serial_no2 }}</td>
                                        <td class="text-center">{{ inventory.first_storein_date }}</td>
                                        <td class="text-center">{{ inventory.final_storein_date }}</td>
                                        <td class="text-center" :class="inventory.status > 0 ? 'text-danger' : ''">{{ inventory.capture }}</td>
                                        <td class="text-center">
                                            <template v-if="inventory.status == 0">-</template>
                                            <button v-if="inventory.status == 1" class="btn default" @click="updateItem(inventory,i)">実績棚複製</button>
                                            <button v-if="inventory.status == 2" class="btn default" @click="createItem(inventory,i)">実績から複製</button>
                                            <button v-if="inventory.status == 3" class="btn default" @click="confirmDelete(inventory,i)">DB情報削除</button>
                                        </td>
                                    </tr>
                                </template>
                                <tr v-else>
                                    <td class="text-center">{{ inventory.from_shelf }}</td>
                                    <td class="text-center">{{ inventory.serial_no }}</td>
                                    <td class="text-center">{{ inventory.ship_date }}</td>
                                    <td class="text-center">{{ inventory.from_shelf2 }}</td>
                                    <td class="text-center">{{ inventory.serial_no2 }}</td>
                                    <td class="text-center">{{ inventory.first_storein_date }}</td>
                                    <td class="text-center">{{ inventory.final_storein_date }}</td>
                                    <td class="text-center" :class="inventory.status > 0 ? 'text-danger' : ''">{{ inventory.capture }}</td>
                                    <td class="text-center">
                                        <template v-if="inventory.status == 0">-</template>
                                        <button v-if="inventory.status == 1" class="btn default" @click="updateItem(inventory,i)">実績棚複製</button>
                                        <button v-if="inventory.status == 2" class="btn default" @click="createItem(inventory,i)">実績から複製</button>
                                        <button v-if="inventory.status == 3" class="btn default" @click="confirmDelete(inventory,i)">DB情報削除</button>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mt-1 mb-2 d-flex justify-content-evenly">
                <button class="btn default w-[6rem]" @click="closeInvetoryMatching">閉じる</button>
            </div>
        </div>
    </ModalLayout>
    <ConfirmModal ref="confirmDialog"></ConfirmModal>
</template>
<script setup>
import ModalLayout from '@/components/layout/modal/ModalLayout.vue';
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue";
const props = defineProps({
    show: Boolean,
    data: Object,
});
</script>
<script>
export default {
    emits: ["closeInvetoryMatching"],
    data: function () {
        return {
            file: null,
            inventoryData: {
                data: [],
                totalOK: 0,
                totalNG: 0
            },
            filterItem: null
        };
    },
    updated: function () {

    },
    mounted: function () {

    },
    methods: {
        closeInvetoryMatching: function () {
            this.inventoryData = {
                data: [],
                totalOK: 0,
                totalNG: 0
            };
            this.$emit("closeInvetoryMatching");
        },
        openFile: function () {
            this.$refs.file.click();
        },
        onFileChange: function (e) {
            this.file = e.target.files ? e.target.files[0] : null;
            if (this.file) {
                let formData = new FormData();
                formData.append('file', this.file);
                let data = {
                    formData: formData
                }
                this.$store.dispatch("importStockReport", data).then((res) => {
                    if (res.data.success) {
                        this.inventoryData = res.data.data;
                    }
                    this.$refs.file.value = null;
                });
            }
        },
        updateItem: function (item,index) {
            let data = {
                id: item.id,
                shelf_code: item.from_shelf
            };
            this.$store.dispatch("updateStockReport", data).then((res) => {
                this.inventoryData.data[index] = res.data.data;
                this.inventoryData.totalOK++;
                this.inventoryData.totalNG--;
            });
        },
        createItem: function (item,index) {
            let data = {
                shelf_code: item.from_shelf,
                serial_no: item.serial_no,
                ship_date: item.ship_date
            };
            this.$store.dispatch("createStockReport", data).then((res) => {
                if(res.data.success){
                    this.inventoryData.data[index] = res.data.data;
                    this.inventoryData.totalOK++;
                    this.inventoryData.totalNG--;
                }
            });
        },
        confirmDelete: async function (item,index) {
            const ok = await this.$refs.confirmDialog.show({
                title: '確認',
                message: 'DB情報を削除しますか。',
                okButton: '実行',
                cancelButton: 'キャンセル'
            });
            if (ok) {
                let data = {
                    id: item.id
                };
                this.$store.dispatch("deleteStockReport", data).then((res) => {
                    if (res.data.success) {
                        this.inventoryData.data.splice(index, 1);
                        this.inventoryData.totalNG--;
                    }
                });
                await this.$refs.confirmDialog.close();
            }
        }
    },
};
</script>
  