document.querySelector(".sidebar").addEventListener("transitionstart", function(event) {
    if (event.propertyName === 'width') {
        chart3.destroy();
        chart2.destroy();
        chart.destroy();
    }
});

document.querySelector(".sidebar").addEventListener("transitionend", function(event) {
    if (event.propertyName === 'width') {
        // Recreate and re-render charts
        chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
        chart3.render();
        chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
        chart2.render();
        chart = new ApexCharts(document.querySelector("#chart1"), options);
        chart.render();
    };
});



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
        height: '90%',  // Adjusts height dynamically based on the container
        width: '100%',   // Adjusts width to fill the container
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

var chart = new ApexCharts(document.querySelector("#chart1"), options);
chart.render();

// Function to generate dates and prices
function generateData() {
    var dates = [];
    var prices = [];

    // Set the start date to 100 days ago
    var startDate = new Date();
    startDate.setDate(startDate.getDate() - 100);

    // Generate data for 100 days
    for (var i = 0; i < 100; i++) {
        var newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() + i);
        var price = Math.random() * 100 + 100; // Random price between 100 and 200

        // Format the date as a string in YYYY-MM-DD format
        var dateString = newDate.toISOString().split("T")[0];

        dates.push(dateString);
        prices.push(parseFloat(price.toFixed(2)));
    }

    return { dates, prices };
}

// Use the function to get the data
var { dates, prices } = generateData();
var buffer = 10;  // This can be adjusted to whatever value you prefer

// ...prices is a spread operator to pass the prices array as individual arguments
var minPrice = Math.round(Math.min(...prices) - buffer);
var maxPrice = Math.round(Math.max(...prices) + buffer);

// Example: log the generated data to console (can be removed if not needed)
console.log(dates, prices);
var options2 = {
    series: [
        {
            name: "ABC INDUSTRIES",
            data: prices.map((price, index) => [dates[index], price]),
        },
    ],

    chart: {
        height: '90%',  // Adjusts height dynamically based on the container
        width: '100%',   // Adjusts width to fill the container
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
        curve: 'smooth' // Ensuring the lines are smoother
    },

    
};

var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
chart2.render();

/**
 * Configuration options for the chart.
 *
 * @typedef {Object} Options3
 * @property {Array} series - An array of series objects containing the name and data for each series.
 * @property {Object} chart - Configuration options for the chart.
 * @property {Object} forecastDataPoints - Configuration options for the forecast data points.
 * @property {Object} stroke - Configuration options for the stroke.
 * @property {Object} xaxis - Configuration options for the x-axis.
 * @property {Object} title - Configuration options for the title.
 * @property {Object} fill - Configuration options for the fill.
 * @property {Object} tooltip - Configuration options for the tooltip.
 */


var options3 = {
    series: [{
        name: 'Sales',
        data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
    }],

    chart: {
        height: '90%',  // Adjusts height dynamically based on the container
        width: '100%',   // Adjusts width to fill the container
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

var chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
chart3.render();