document.querySelector(".sidebar").addEventListener("transitionstart", function(event) {
    if (event.propertyName === 'width') {
        // Instead of destroying charts, update their dimensions
        updateChartDimensions(0); // Weight 0 for transition start
    }
});

document.querySelector(".sidebar").addEventListener("transitionend", function(event) {
    if (event.propertyName === 'width') {
        // Re-render charts with updated dimensions
        updateChartDimensions(1); // Weight 1 for transition end
    }
});

// Function to update chart dimensions with a scaling weight
function updateChartDimensions(weight) {
    chart.updateOptions({
        chart: {
            width: `${100 * weight}%`
        }
    }, false, false);
    chart2.updateOptions({
        chart: {
            width: `${100 * weight}%`
        }
    }, false, false);
    chart3.updateOptions({
        chart: {
            width: `${100 * weight}%`
        }
    }, false, false);
    chart4.updateOptions({
        chart: {
            width: `${100 * weight}%`
        }
    }, false, false);
    chart5.updateOptions({
        chart: {
            width: `${100 * weight}%`
        }
    }, false, false);
    chart6.updateOptions({
        chart: {
            width: `${100 * weight}%`
        }
    }, false, false);
}

var options = {
    series: [
        {
            name: "High - 2013",
            data: [28, 29, 33, 36, 32, 32, 33],
        },
        {
            name: "Low - 2013",
            data: [12, 11, 14, 18, 17, 13, 13],
        },
    ],

    chart: {
        height: '90%',
        width: '90%',   
        type: "line",
        dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
        },
        zoom: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
        events: {
            legendClick: function (chartContext, seriesIndex, config) {
                // Store the state of the legend in local storage
                console.log(JSON.parse(localStorage.getItem('legendStates')))
            }
        },
        legend: {
            onItemClick: {
                toggleDataSeries: true
            }
        }
    },

    colors: ["#77B6EA", "#545454"],
    dataLabels: {
        enabled: true,
    },

    stroke: {
        curve: "smooth",
    },

    title: {
        text: "Average High & Low Temperature",
        align: "left",
    },

    grid: {
        borderColor: "#e7e7e7",
        row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
        },
    },

    markers: {
        size: 1,
    },

    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        title: {
            text: "Month",
        },
    },

    yaxis: {
        title: {
            text: "Temperature",
        },
        min: 5,
        max: 40,
    },

    legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
    },
};

var options2 = {
    series: [{
        name: 'Sales',
        data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
    }],

    chart: {
        height: '90%',  
        width: '90%', 
        type: 'line',
    },

    forecastDataPoints: {
        count: 7
    },

    stroke: {
        width: 5,
        curve: 'smooth'
    },

    xaxis: {
        type: 'datetime',
        categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001', '4/11/2001', '5/11/2001', '6/11/2001'],
        tickAmount: 10,
        labels: {
            formatter: function(value, timestamp, opts) {
                return opts.dateFormatter(new Date(timestamp), 'dd MMM')
            }
        },
        tooltip: {
            enabled: false
        }
    },

    title: {
        text: 'Forecast',
        align: 'left',
        style: {
            fontSize: "16px",
            color: '#666'
        }
    },

    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            gradientToColors: ['#FDD835'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
        },
    },

    tooltip: {
        theme: "dark",
        x: {
            format: 'dd MMM'
        },
        marker: {
            show: false,
        },
        y: {
            formatter: function(seriesName, opts) {
                return opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ' units';
            }
        },
        fillSeriesColor: false
    }
};


function generateData() {
    var dates = [];
    var prices = [];
    var startDate = new Date();
    startDate.setDate(startDate.getDate() - 365);

    for (var i = 0; i < 365; i++) {
        var newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() + i);
        var price = Math.random() * 100 + 100; 
        var dateString = newDate.toISOString().split("T")[0];

        dates.push(dateString);
        prices.push(parseFloat(price.toFixed(2)));
    }

    return { dates, prices };
}

var { dates, prices } = generateData();
var buffer = 10;  
var minPrice = Math.round(Math.min(...prices) - buffer);
var maxPrice = Math.round(Math.max(...prices) + buffer);

let currentView = 'daily';

function generateDailyData(prices, dates) {
    return prices.map((price, index) => [dates[index], price]);
}

function generateWeeklyData(prices, dates) {
    let weeklyData = [];
    for (let i = 0; i < prices.length; i += 7) {
        const weeklyPrices = prices.slice(i, i + 7);
        const weeklyAverage = weeklyPrices.reduce((sum, price) => sum + price, 0) / weeklyPrices.length;
        weeklyData.push([dates[i], weeklyAverage.toFixed(2)]);
    }
    return weeklyData;
}

function generateMonthlyData(prices, dates) {
    let monthlyData = [];
    for (let i = 0; i < prices.length; i += 30) {
        const monthlyPrices = prices.slice(i, i + 30);
        const monthlyAverage = monthlyPrices.reduce((sum, price) => sum + price, 0) / monthlyPrices.length;
        monthlyData.push([dates[i], monthlyAverage.toFixed(2)]);
    }
    return monthlyData;
}

var options3 = {
    series: [
        {
            name: "ABC INDUSTRIES",
            data: prices.map((price, index) => [dates[index], price]),
        },
    ],

    chart: {
        height: '90%', 
        width: '90%',   
        type: "area",
        stacked: false,
        zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true,
        },
        toolbar: {
            autoSelected: "zoom",
        },
    },

    decimalsInFloat: 0,

    dataLabels: {
        enabled: false,
    },

    markers: {
        size: 0,
    },

    title: {
        text: "Stock Price Movement",
        align: "left",
    },

    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100],
        },
    },

    yaxis: {
        min: minPrice,
        max: maxPrice,
        title: {
            text: "Price",
        },
    },

    xaxis: {
        type: "datetime",
    },

    tooltip: {
        shared: false,
    },

    stroke: {
        curve: 'smooth' 
    },   
}

document.getElementById('monthlyButton').addEventListener('click', function() {
    currentView = 'monthly';
    updateChart('monthly');
    setActiveButton('monthlyButton');
});

document.getElementById('weeklyButton').addEventListener('click', function() {
    currentView = 'weekly';
    updateChart('weekly');
    setActiveButton('weeklyButton');
});

document.getElementById('dailyButton').addEventListener('click', function() {
    currentView = 'daily';
    updateChart('daily');
    setActiveButton('dailyButton');
});

function setActiveButton(buttonId) {
    const buttons = document.querySelectorAll('.button-container button');
    buttons.forEach(button => button.classList.remove('active'));
    document.getElementById(buttonId).classList.add('active');
}

function updateChart(view) {
    let data;
    if (view === 'monthly') {
        data = generateMonthlyData(prices, dates);
    } else if (view === 'weekly') {
        data = generateWeeklyData(prices, dates);
    } else {
        data = generateDailyData(prices, dates);
    }

    chart3.updateSeries([{
        name: "ABC INDUSTRIES",
        data: data
    }]);
}
document.getElementById('dailyButton').click();

var chart = new ApexCharts(document.querySelector("#chart1"), options);
chart.render(chart, 'chart1');

var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
chart2.render(chart2, 'chart2');

var chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
chart3.render(chart3, 'chart3');

var chart4 = new ApexCharts(document.querySelector("#chart4"), options);
chart4.render(chart4, 'chart4');

var chart5 = new ApexCharts(document.querySelector("#chart5"), options2);
chart5.render(chart5, 'chart5');

var chart6 = new ApexCharts(document.querySelector("#chart6"), options);
chart6.render(chart6, 'chart6');


updateChartDimensions(1);