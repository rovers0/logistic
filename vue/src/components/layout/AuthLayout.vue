<template>
    <div class="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
        <div class=" col-6 offset-3">
            <router-view></router-view>
        </div>
    </div>
    <div class="bottom-0 px-2 py-2 position-fixed end-0" style="color: #9E9E9E; font-weight: bold;">
        <div class="d-flex justify-content-end">
            <!-- <div class="me-2" style="font-size: 0.8rem;">エス・エム・ディ株式会社</div> -->
            <div class="">
                <div style="font-size: 0.8rem;">Copyright© Specialty Medical Distribution Corporation All rights reserved.</div>
            </div>
        </div>
    </div>
</template>