<template>
  <div>404 - Page Not found</div>
</template>
<script setup>
import moment from "moment";
import route from "@/router";
</script>
<script>
export default {
  data: function () {
    return {
      showModal: null,
      liveClock: {
        month_from: moment().subtract(6, "M").format("YYYY年MM月"),
        month_now: moment().format("YYYY年MM月"),
      },
      surveyListTotal: 0,
      surveyList: [],
      surveyInfo: null,
      selectedRow: {},
      search: {
        status: "",
        pickedFrom: moment().subtract(6, "M"),
        pickedTo: moment().add(1, "days"),
        maker: "",
      },
      listSearched: [],
      makerList: [],
      survey_id: 0,
    };
  },
  mounted: function () {
    localStorage.removeItem("survey");
    localStorage.setItem("survey_error", 'Survey hiện tại đã hết hiệu lực và bị xóa');
    route.push({name: 'Dashboard'});
  },
  methods: {
  },
};
</script>

<style></style>
