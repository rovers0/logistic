$(document).ready(function(e) {
  $('.main').css({'background':'#f0f0f8','float':'left'});
});

//biểu đồ nhiêu liệu
var ctx1 = document.getElementById("nhieulieuChart");
var ctx2 = document.getElementById("luongChart");
var ctx3 = document.getElementById("vandonChart");

$.ajax({
	url: root+"homepage/chart/",
	data:"code=1",
	async:true,
	dataType:"json",
	success:function(rs){
		//console.log(rs);
		//console.log(rs[1]);
		var nhieulieuChart = new Chart(ctx1, {
			 type: 'bar',
			 data: {
					labels: rs[0],//tháng
					datasets: [{
						 label: rs[3],
						 data: rs[1],//số liệu tháng
						 backgroundColor: rs[2]//chuỗi colors theo tháng
					}]
			 },
			 options: {
				 //indexAxis: 'y', dạng bar ngang (không xóa để dùng khi cần)
				 interaction: {
					intersect: false,
					axis: 'x'
				},
				animation: {
            duration: 2000,
        },
					plugins: {
						legend: {
							 display: false //This will do the task
						}
					}
			 }
		});//END.biểu đồ nhiêu liệu
		
		
		//biểu đồ lương tài xế
		var luongChart = new Chart(ctx2, {
			 type: 'line',
			 data: {
					labels: rs[4],
					datasets: [{
						 label: rs[7],
						 data: rs[5],
						 backgroundColor: rs[6]
					}]
			 },
			 options: {
				 interaction: {
					intersect: false,
					axis: 'x'
				},
					plugins: {
						legend: {
							 display: false //This will do the task
						}
					}
			 }
		});//END.lương tài xế
		
		//biểu đồ vận đơn
		$conf_vandon = {
			 type: 'bar',
			 data: {
					labels: rs[8],
					datasets: [{
						 label: rs[11],
						 data: rs[9],
						 backgroundColor: rs[10]
					}]
			 },
			 options: {
				//indexAxis: 'y',
				tooltips: {
						enabled: true
					},
				 interaction: {
					intersect: false,
					axis: 'x'
				},
					plugins: {
						legend: {
							 display: false //This will do the task
						}
					}
			 }
		};
		var vandonChart = new Chart(ctx3, $conf_vandon);//END.biểu đồ vận đơn
		
		//console.log(vandonChart.data.datasets[0].backgroundColor);
		$('.plugin div a.achar_3').on("click",function(){
			var $nam = $(this).attr('data-id'),
			$flag = $(this).attr('data-flag');
			
			$.ajax({
				url: root+"homepage/chart2/",
				data:"code="+$nam+"&flag="+$flag,
				async:true,
				dataType:"json",
				success:function(rs){
					console.log(rs);
					console.log(rs[0]);
					$('#bdid_'+$flag).html('<i class="fa fa-sun-o faa-spin animated"></i> '+rs['nam']);
					$('#idnam_'+$flag).html(rs['nam']);
					
					if(rs['flag']==3){
						vandonChart.data.labels = rs[8];
						vandonChart.data.datasets[0].label= rs[11];
						vandonChart.data.datasets[0].data = rs[9];
						vandonChart.data.datasets[0].backgroundColor = rs[10];
						vandonChart.update();
					}
				}
			});
		});
		
		$('.plugin div a.achar_2').on("click",function(){
			var $nam = $(this).attr('data-id'),
			$flag = $(this).attr('data-flag');
			
			$.ajax({
				url: root+"homepage/chart2/",
				data:"code="+$nam+"&flag="+$flag,
				async:true,
				dataType:"json",
				success:function(rs){
					//console.log(rs);
					console.log(rs[0]);
					$('#bdid_'+$flag).html('<i class="fa fa-sun-o faa-spin animated"></i> '+rs['nam']);
					$('#idnam_'+$flag).html(rs['nam']);
					
					if(rs['flag']==2){
						luongChart.data.labels = rs[4];
						luongChart.data.datasets[0].label= rs[7];
						luongChart.data.datasets[0].data = rs[5];
						luongChart.data.datasets[0].backgroundColor = rs[6];
						luongChart.update();
					}
				}
			});
			
		});
		
		$('.plugin div a.achar_1').on("click",function(){
			var $nam = $(this).attr('data-id'),
			$flag = $(this).attr('data-flag');
			
			$.ajax({
				url: root+"homepage/chart2/",
				data:"code="+$nam+"&flag="+$flag,
				async:true,
				dataType:"json",
				success:function(rs){
					//console.log($flag);
					//console.log(rs);
					//console.log(rs[0]);
					$('#bdid_'+$flag).html('<i class="fa fa-sun-o faa-spin animated"></i> '+rs['nam']);
					$('#idnam_'+$flag).html(rs['nam']);
					
					if(rs['flag']==1){
						nhieulieuChart.data.labels = rs[0];
						nhieulieuChart.data.datasets[0].label= rs[3];
						nhieulieuChart.data.datasets[0].data = rs[1];
						nhieulieuChart.data.datasets[0].backgroundColor = rs[2];
						nhieulieuChart.update();
					}
				}
			});
			
		});
		
	}
});//END.AJAX biểu đồ