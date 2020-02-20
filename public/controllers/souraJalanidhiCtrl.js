app.controller('souraJalanidhiCtrl', function ($scope, $http) {

    $scope.ddlFY = '2018-19'

    $scope.Loaddash = function () {
        $http.get("https://odishasolarpump.nic.in/Loaddash")
            .then(function (response) {
                $scope.dash = response.data;
                $scope.num1 = $scope.dash[4].subcidy * 36000;
                $scope.num1 = $scope.num1.toLocaleString();
            });
    };

    $scope.Loaddash1 = function () {
        $http.get("https://odishasolarpump.nic.in/Loaddash1")
            .then(function (response) {
                $scope.dash1 = response.data;
                $scope.num = $scope.dash1[4].subcidy * 36000;
                $scope.num = $scope.num.toLocaleString();
            });
    };

    $scope.LoadPayment = function () {
        $http.get("https://odishasolarpump.nic.in/LoadPayment?financialYear=" + $scope.ddlFY)
            .then(function (response) {
                $scope.paydata = response.data;
                $scope.subcidy3 = $scope.paydata[0].installed * 36000;
                $scope.subcidy3 = $scope.subcidy3.toLocaleString();
                $scope.subcidy1 = $scope.paydata[1].subcidy * 36000;
                $scope.subcidy1 = $scope.subcidy1.toLocaleString();
                $scope.subcidy2 = $scope.paydata[2].subcidyrealesed * 36000;
                $scope.subcidy2 = $scope.subcidy2.toLocaleString();
            });
    };

    var bagColor = [];
    var bag1colar = [];
    $scope.Loadsubcidy = function () {
        function httpGetAsync(theUrl, callback) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                    callback(xmlHttp.response);
            }
            xmlHttp.open("GET", theUrl, true);
            xmlHttp.send(null);
        };
        httpGetAsync("https://odishasolarpump.nic.in/Loadsubcidy?financialYear=" + $scope.ddlFY, function (res) {
            var resp = JSON.parse(res);
            if (resp.length > 0) {
                var Applied = [];
                var Installed = [];
                var NotInstalled = [];
                Applied.push(resp[0].installed1);
                Installed.push(resp[1].subcidy1);
                NotInstalled.push(resp[0].installed1 - resp[1].subcidy1);
                for (var i = 0; i < resp.length; i++) {
                    bagColor.push('rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')');
                }
            }
            var options = {
                series: [NotInstalled[0], Installed[0]],
                colors: bagColor,
                chart: {
                    width: 450,
                    type: 'pie',
                },
                dataLabels: {
                    enabled: false,
                    formatter: function (val) {
                        return val + "%"
                    },
                },
                labels: ["Subcidy Not Realesed", "Subcidy Realesed"],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 400
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            };
            var chart = new ApexCharts(document.querySelector("#chart1"), options);
            chart.render();
        });
    };

    $scope.Loadmodelwise = function () {
        function httpGetAsync(theUrl, callback) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                    callback(xmlHttp.response);
            }
            xmlHttp.open("GET", theUrl, true);
            xmlHttp.send(null);
        };
        httpGetAsync("https://odishasolarpump.nic.in/Loadmodelwise?financialYear=" + $scope.ddlFY, function (res) {
            var resp = JSON.parse(res);
            if (resp.length > 0) {
                var manf1 = [];
                var manf2 = [];
                manf1.push(resp[0].install);
                manf2.push(resp[1].install);
                for (var i = 0; i < resp.length; i++) {
                    bag1colar.push('rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')');
                }
            }
            var options = {
                series: [manf1[0], manf2[0]],
                colors: bag1colar,
                chart: {
                    width: 520,
                    type: 'pie',
                },
                dataLabels: {
                    enabled: false,
                    formatter: function (val) {
                        return val + "%"
                    },
                },
                labels: ["DC Surface-JSPBL0.3/HF2.4-5", "DC Surface-SOLAR 8 DCSSUP-500"],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 400
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            };
            var chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();
        });
    };

    $scope.LoadTargetApex = function () {
        function httpGetAsync(theUrl, callback) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                    callback(xmlHttp.response);
            }
            xmlHttp.open("GET", theUrl, true);
            xmlHttp.send(null);
        };
        httpGetAsync("https://odishasolarpump.nic.in/loadTargetGraph?financialYear=" + $scope.ddlFY, function (res) {
            // if (myChart2) myChart2.destroy();
            var resp = JSON.parse(res);
            if (resp.length > 0) {
                var dates = [];
                var dataPack1 = [];
                var dataPack2 = [];
                for (var i = 0; i < resp.length; i++) {
                    dates.push(resp[i].DistName);
                    dataPack2.push(resp[i].totapplied);
                    dataPack1.push(resp[i].tot);
                }
            }
            else {
                alert("No Data");
            }
            var options = {
                series: [{
                    name: 'Target',
                    data: dataPack1
                }, {
                    name: 'Applied',
                    data: dataPack2
                }],
                colors: ['rgba(255, 69, 96, 0.85)', 'rgba(254, 176, 25, 0.85)'],
                chart: {
                    type: 'bar',
                    height: 550
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '85%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: dates,
                },
                // yaxis: {
                //   title: {
                //     text: '$ (thousands)'
                //   }
                // },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val
                        }
                    }
                }

            };
            var chart = new ApexCharts(document.querySelector("#chart2"), options);
            chart.render();
        });
    };

    $scope.LoadAppliedMonthwiseApex = function () {
        function httpGetAsync(theUrl, callback) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                    callback(xmlHttp.response);
            }
            xmlHttp.open("GET", theUrl, true);
            xmlHttp.send(null);
        };
        httpGetAsync("https://odishasolarpump.nic.in/loadmonthwiseappliedgraph?financialYear=" + $scope.ddlFY, function (res) {
            var resp3 = JSON.parse(res);
            if (resp3.length > 0) {
                var monthnm = [];
                var applied = [];
                for (var i = 0; i < resp3.length; i++) {
                    monthnm.push(resp3[i].MonthName);
                    applied.push(resp3[i].apply);
                }
            }
            else {
                alert("No Data");
            }
            var options = {
                series: [{
                    name: "Applied",
                    data: applied
                }],
                chart: {
                    type: 'area',
                    height: 350,
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: 'Fundamental Analysis of Total Applied',
                    align: 'left'
                },
                subtitle: {
                    text: 'Price Movements',
                    align: 'left'
                },
                labels: monthnm,
                xaxis: {
                    type: 'char',
                },
                yaxis: {
                    opposite: false
                },
                legend: {
                    horizontalAlign: 'left'
                }
            };
            var chart = new ApexCharts(document.querySelector("#chart3"), options);
            chart.render();
        });
    };

});