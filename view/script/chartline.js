//khởi tạo echarts
var myChart = echarts.init(document.getElementById('lineChart'));
$.ajax({
    url: API + '/chartscontroller/ChartUser.php',
    method: 'GET',
    dataType: 'json',
    success: function(jsonData) {
        // Extract dates, user counts, and post counts from JSON
        var dates = jsonData.data.map(item => item.date);
        var userCounts = jsonData.data.map(item => item.user_count);
        var postCounts = jsonData.data.map(item => item.post_count);

        // Set chart options
        var option = {
            title: {
                text: 'User and Post Statistics',
                subtext: 'By Date'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['User Count', 'Post Count']
            },
            xAxis: {
                type: 'category',
                data: dates
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'User Count',
                    type: 'line',
                    data: userCounts
                },
                {
                    name: 'Post Count',
                    type: 'line',
                    data: postCounts
                }
            ]
        };

        // Set chart options and render
        myChart.setOption(option);
    }
});

													
										