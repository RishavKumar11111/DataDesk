app.controller('souraJalanidhiCtrl', function ($scope, $http) {

    $scope.ddlFY = '2018-19';

    $scope.Loaddash = function () {
        $http.get("https://odishasolarpump.nic.in/Loaddash").then(function (response) {
            $scope.dash = response.data;
            $scope.num1 = $scope.dash[4].subcidy * 36000;
            $scope.num1 = $scope.num1.toLocaleString();
        }, function error(response) {
            console.log(response.status);
        }).catch(function err(error) {
            console.log('An error occurred...', error);
        });
    };

    $scope.Loaddash1 = function () {
        $http.get("https://odishasolarpump.nic.in/Loaddash1").then(function success(response) {
            $scope.dash1 = response.data;
            $scope.num = $scope.dash1[4].subcidy * 36000;
            $scope.num = $scope.num.toLocaleString();
        }, function error(response) {
            console.log(response.status);
        }).catch(function err(error) {
            console.log('An error occurred...', error);
        });
    };

    $scope.LoadPayment = function () {
        $http.get("https://odishasolarpump.nic.in/LoadPayment?financialYear=" + $scope.ddlFY).then(function (response) {
            $scope.paydata = response.data;
            $scope.subcidy3 = $scope.paydata[0].installed * 36000;
            $scope.subcidy3 = $scope.subcidy3.toLocaleString();
            $scope.subcidy1 = $scope.paydata[1].subcidy * 36000;
            $scope.subcidy1 = $scope.subcidy1.toLocaleString();
            $scope.subcidy2 = $scope.paydata[2].subcidyrealesed * 36000;
            $scope.subcidy2 = $scope.subcidy2.toLocaleString();
        }, function error(response) {
            console.log(response.status);
        }).catch(function err(error) {
            console.log('An error occurred...', error);
        });
    };

    var ctxSR = document.getElementById('chartSR');
    var chartSR = null;
    $scope.Loadsubcidy = function () {
        if (chartSR) chartSR.destroy();
        $http.get("https://odishasolarpump.nic.in/Loadsubcidy?financialYear=" + $scope.ddlFY).then(function (res) {
            $scope.resp = res.data;
            if ($scope.resp[0].installed1 != 0 || $scope.resp[1].subcidy1 != 0) {
                document.getElementById('sr').style.height = 'auto';
                var Applied = [];
                var Installed = [];
                var NotInstalled = [];
                Applied.push($scope.resp[0].installed1);
                Installed.push($scope.resp[1].subcidy1);
                NotInstalled.push($scope.resp[0].installed1 - $scope.resp[1].subcidy1);
                var optionsSR = {
                    colors: ['#7bc043', '#ee4035'],
                    plotOptions: {
                        pie: {
                            customScale: 1
                        }
                    },
                    dataLabels: {
                        enabled: false,
                        formatter: function (val) {
                            return val + "%"
                        }
                    },
                    series: [NotInstalled[0], Installed[0]],
                    chart: {
                        width: 380,
                        type: 'pie'
                    },
                    labels: ["Subsidy Not Realesed", "Subsidy Realesed"],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                };
                chartSR = new ApexCharts(ctxSR, optionsSR);
                chartSR.render();
            }
            else {
                if (chartSR) chartSR.destroy();
                document.getElementById('sr').style.height = '0px';
            }
        }, function error(response) {
            console.log(response.status);
        }).catch(function err(error) {
            console.log('An error occurred...', error);
        });
    };

    var ctxIDM = document.getElementById('chartIDM');
    var chartIDM = null;
    $scope.Loadmodelwise = function () {
        if (chartIDM) chartIDM.destroy();
        $http.get("https://odishasolarpump.nic.in/Loadmodelwise?financialYear=" + $scope.ddlFY).then(function (res) {
            $scope.resp1 = res.data;
            if ($scope.resp1.length > 0) {
                document.getElementById('idm').style.height = 'auto';
                document.getElementById('idmh').style.height = '304px';
                var manf1 = [];
                var manf2 = [];
                manf1.push($scope.resp1[0].install);
                manf2.push($scope.resp1[1].install);
                var optionsIDM = {
                    colors: ['#f37736', '#0392cf'],
                    plotOptions: {
                        pie: {
                            customScale: 1
                        }
                    },
                    dataLabels: {
                        enabled: false,
                        formatter: function (val) {
                            return val + "%"
                        }
                    },
                    series: [manf1[0], manf2[0]],
                    chart: {
                        width: 380,
                        type: 'pie'
                    },
                    labels: ["JSPBL0.3/HF2.4-5", "SOLAR 8 DCSSUP-500"],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                };
                chartIDM = new ApexCharts(ctxIDM, optionsIDM);
                chartIDM.render();
            }
            else {
                if (chartIDM) chartIDM.destroy();
                document.getElementById('idm').style.height = '0px';
                document.getElementById('idmh').style.height = 'auto';
            }
        }, function error(response) {
            console.log(response.status);
        }).catch(function err(error) {
            console.log('An error occurred...', error);
        });
    };

    var ctxTTD = document.getElementById('chartTTD');
    var chartTTD = null;
    $scope.LoadTarget = function () {
        if (chartTTD) chartTTD.destroy();
        $http.get("https://odishasolarpump.nic.in/loadTargetGraph?financialYear=" + $scope.ddlFY).then(function (res) {
            $scope.resp2 = res.data;
            if ($scope.resp2.length > 0) {
                var dates = [];
                var dataPack1 = [];
                var dataPack2 = [];
                for (var i = 0; i < $scope.resp2.length; i++) {
                    dates.push($scope.resp2[i].DistName);
                    dataPack2.push($scope.resp2[i].totapplied);
                    dataPack1.push($scope.resp2[i].tot);
                }
                var optionsTTD = {
                    series: [{
                        name: 'Target',
                        data: dataPack1
                    }, {
                        name: 'Applied',
                        data: dataPack2
                    }],
                    colors: ['rgb(0, 143, 251)', 'rgb(254, 176, 25)'],
                    chart: {
                        type: 'bar',
                        height: 350
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '75%',
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
                    yaxis: {
                        title: {
                            text: 'in Numbers'
                        }
                    },
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
                chartTTD = new ApexCharts(ctxTTD, optionsTTD);
                chartTTD.render();
            }
            else {

            }
        }, function error(response) {
            console.log(response.status);
        }).catch(function err(error) {
            console.log('An error occurred...', error);
        });
    };

    var ctxTAM = document.getElementById('chartTAM');
    var chartTAM = null;
    $scope.LoadAppliedMonthwise = function () {
        if (chartTAM) chartTAM.destroy();
        $http.get("https://odishasolarpump.nic.in/loadmonthwiseappliedgraph?financialYear=" + $scope.ddlFY).then(function (res) {
            $scope.resp3 = res.data;
            if ($scope.resp3.length > 0) {
                var monthnm = [];
                var applied = [];
                for (var i = 0; i < $scope.resp3.length; i++) {
                    monthnm.push($scope.resp3[i].MonthName);
                    applied.push($scope.resp3[i].apply);
                }
                var optionsTAM = {
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
                    // title: {
                    //     text: '',
                    //     align: 'left'
                    // },
                    // subtitle: {
                    //     text: '',
                    //     align: 'left'
                    // },
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
                chartTAM = new ApexCharts(ctxTAM, optionsTAM);
                chartTAM.render();
            }
            else {

            }
        }, function error(response) {
            console.log(response.status);
        }).catch(function err(error) {
            console.log('An error occurred...', error);
        });
    };

});