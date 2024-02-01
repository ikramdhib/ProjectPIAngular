import { ChartType } from './jobs.model';

const jobViewChart: ChartType = {
    series: [{
        name: "Job View",
        data: [36, 21, 65, 22, 35, 50, 87, 98],
    },],
    chart: {
        width: 130,
        height: 46,
        type: "area",
        sparkline: {
            enabled: true,
        },
        toolbar: {
            show: false,
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
        width: 1.5,
    },
    colors: ['#34c38f'],
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [50, 100, 100, 100],
        },
    },
    tooltip: {
        fixed: {
            enabled: false
        },
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function (seriesName) {
                    return ''
                }
            }
        },
        marker: {
            show: false
        }
    },
};

const ApplicationChart: ChartType = {
    series: [{
        name: "New Application",
        data: [36, 48, 10, 74, 35, 50, 70, 73],
    },],
    chart: {
        width: 130,
        height: 46,
        type: "area",
        sparkline: {
            enabled: true,
        },
        toolbar: {
            show: false,
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
        width: 1.5,
    },
    colors: ['#34c38f'],
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [50, 100, 100, 100],
        },
    },
    tooltip: {
        fixed: {
            enabled: false
        },
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function (seriesName) {
                    return ''
                }
            }
        },
        marker: {
            show: false
        }
    },
};

const ApprovedChart: ChartType = {
    series: [{
        name: "Total Approved",
        data: [60, 14, 5, 60, 30, 43, 65, 84],
    },],
    chart: {
        width: 130,
        height: 46,
        type: "area",
        sparkline: {
            enabled: true,
        },
        toolbar: {
            show: false,
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
        width: 1.5,
    },
    colors: ['#34c38f'],
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [50, 100, 100, 100],
        },
    },
    tooltip: {
        fixed: {
            enabled: false
        },
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function (seriesName) {
                    return ''
                }
            }
        },
        marker: {
            show: false
        }
    },
};

const RejectedChart: ChartType = {
    series: [{
        name: "Total Rejected",
        data: [32, 22, 7, 55, 20, 45, 36, 20],
    },],
    chart: {
        width: 130,
        height: 46,
        type: "area",
        sparkline: {
            enabled: true,
        },
        toolbar: {
            show: false,
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
        width: 1.5,
    },
    colors: ['#f46a6a'],
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [50, 100, 100, 100],
        },
    },
    tooltip: {
        fixed: {
            enabled: false
        },
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function (seriesName) {
                    return ''
                }
            }
        },
        marker: {
            show: false
        }
    },
};

const emailSentBarChart: ChartType = {
    series: [{
        name: 'Companay',
        type: 'column',
        data: [30, 48, 28, 74, 39, 87, 54, 36, 50, 87, 84]
    }, {
        name: 'New Jobs',
        type: 'column',
        data: [20, 50, 42, 10, 24, 28, 60, 35, 47, 64, 78]
    }, {
        name: 'Total Jobs',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    }, {
        name: 'Job View',
        type: 'line',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
    }],
    chart: {
        height: 350,
        type: 'line',
        stacked: false,
        toolbar: {
            show: false,
        },
    },
    legend: {
        show: true,
        offsetY: 10,
    },
    stroke: {
        width: [0, 0, 2, 2],
        curve: 'smooth'
    }, 
    plotOptions: {
        bar: {
            columnWidth: '30%'
        }
    },
    fill: {
        opacity: [1, 1, 0.1, 1],
        gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
        }
    },
    labels: ['01/01/2022', '02/01/2022', '03/01/2022', '04/01/2022', '05/01/2022', '06/01/2022', '07/01/2022',
            '08/01/2022', '09/01/2022', '10/01/2022', '11/01/2022'
        ],
    dataLabels: {
        enabled: false
    },
    colors: ['#556ee6', '#34c38f', '#f1b44c', '#50a5f1'],
    markers: {
        size: 0
    },
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function (y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " points";
                }
                return y;

            }
        }
    }
};

// Vacancy Data
const vacancyData = [
    {
        image: 'assets/images/companies/airbnb.svg',
        title: 'Project Manager',
        brand: 'Themesbrand',
        location: 'California',
        vacancy: 8
    },
    {
        image: 'assets/images/companies/mailchimp.svg',
        title: 'Marketing Director',
        brand: 'Themesbrand',
        location: 'Danemark',
        vacancy: 12
    },
    {
        image: 'assets/images/companies/reddit.svg',
        title: 'Product Designer',
        brand: 'Themesbrand',
        location: 'France',
        vacancy: 25
    },
    {
        image: 'assets/images/companies/amazon.svg',
        title: 'Magento Developer',
        brand: 'Themesbrand',
        location: 'Hong-Kong',
        vacancy: 8
    },
    {
        image: 'assets/images/companies/adobe-photoshop.svg',
        title: 'Product Sales Specialist',
        brand: 'Themesbrand',
        location: 'Louisiana',
        vacancy: 1
    },
    {
        image: 'assets/images/companies/line.svg',
        title: 'Business Associate',
        brand: 'Themesbrand',
        location: 'Phoenix',
        vacancy: 15
    },
]

// Received Time Data
const receivedTimeChart: ChartType = {
    series: [{
        name: 'Received Application',
        data: [34, 44, 54, 21, 12, 43, 33, 80, 66]
    }],
    chart: {
        type: 'line',
        height: 378,
        toolbar: {
            show: false,
        },
    },
    stroke: {
        width: 3,
        curve: 'smooth'
    },
    labels: ['8 PM', '9 PM', '10 PM', '11 PM', '12 PM', '1 AM', '2 AM',
        '3 AM', '4 AM'
    ],
    dataLabels: {
        enabled: false
    },
    colors: ['#556ee6', '#34c38f', '#f1b44c', '#50a5f1'],
    markers: {
        hover: {
            sizeOffset: 4
        }
    }
};

// Recent Jobs Data
const recentJobsData = [
    {
        image: 'assets/images/companies/wechat.svg',
        title: 'Marketing Director',
        brand: 'Themesbrand',
        location: 'USA',
        time: 53
    },
    {
        image: 'assets/images/companies/sass.svg',
        title: 'Frontend Developer',
        brand: 'Themesbrand',
        location: 'Hong-Kong',
        time: 47
    },
    {
        image: 'assets/images/companies/adobe.svg',
        title: 'React Developer',
        brand: 'Creative Agency',
        location: 'Danemark',
        time: 1
    },
    {
        image: 'assets/images/companies/airbnb.svg',
        title: 'NodeJs Developer',
        brand: 'Skote Themes',
        location: 'Louisiana',
        time: 2
    },
    {
        image: 'assets/images/companies/flutter.svg',
        title: 'Digital Marketing',
        brand: 'Web Technology pvt.Ltd',
        location: 'Danemark',
        time: 8
    },
    {
        image: 'assets/images/companies/mailchimp.svg',
        title: 'Marketing Director',
        brand: 'Skote Technology',
        location: 'Dominica',
        time: 1
    },
    {
        image: 'assets/images/companies/spotify.svg',
        title: 'Business Associate',
        brand: 'Themesbrand',
        location: 'Russia',
        time: 2
    },
    {
        image: 'assets/images/companies/reddit.svg',
        title: 'Backend Developer',
        brand: 'Adobe Agency',
        location: 'Malaysia',
        time: 3
    },
]

export { jobViewChart, ApplicationChart, ApprovedChart, RejectedChart, emailSentBarChart, vacancyData, receivedTimeChart, recentJobsData};
