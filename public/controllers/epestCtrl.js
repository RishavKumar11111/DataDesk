app.controller('epestCtrl', function ($scope, $http) {

    $scope.generateGraphs = function () {
        if ($scope.cbSeason != undefined && $scope.cbSeason != null && $scope.ddlFY != undefined && $scope.ddlFY != null) {
            if (chartTAACC) chartTAACC.destroy();
            if (chartTAAC) chartTAAC.destroy();
            if (chartTAAT) chartTAAT.destroy();
            $scope.getGD();
            $scope.getDashboardDetails();
        }
    };

    $scope.months = [];
    $scope.getMonth = function () {
        if ($scope.cbSeason == 'Kharif') {
            $scope.months = [{ MonthCode: '07', MonthName: 'July' }, { MonthCode: '08', MonthName: 'August' }, { MonthCode: '09', MonthName: 'September' }, { MonthCode: '10', MonthName: 'October' }, { MonthCode: '11', MonthName: 'November' }];
        }
        else if ($scope.cbSeason == 'Rabi') {
            $scope.months = [{ MonthCode: '01', MonthName: 'January' }, { MonthCode: '02', MonthName: 'February' }, { MonthCode: '03', MonthName: 'March' }, { MonthCode: '04', MonthName: 'April' }, { MonthCode: '05', MonthName: 'May' }, { MonthCode: '06', MonthName: 'June' }, { MonthCode: '12', MonthName: 'December' }];
        }
        else {
            $scope.months = [];
        }
    };

    var getSeason = function () {
        var seasonName;
        var month = new Date().getMonth();
        if (month >= 6 && month <= 10) {
            $scope.cbSeason = 'Kharif';
            $scope.getMonth();
        }
        else {
            $scope.cbSeason = 'Rabi';
            $scope.getMonth();
        }
        return seasonName;
    };
    getSeason();
    $scope.ddlFY = '2019-20'

    var ctxTAAT = document.getElementById('chartTAAT');
    var chartTAAT = null;
    $scope.getDashboardDetails = function () {
        $http.get('https://www.epestodisha.nic.in/jdapp/getDashboardDetails?season=' + $scope.cbSeason + '&financialYear=' + $scope.ddlFY).then(function success(response) {
            $scope.getJDAPPDetails = response.data;
            var vawTAA = $scope.getJDAPPDetails[3][0].TotalAreaAffected;
            var vawTTA = $scope.getJDAPPDetails[3][0].TotalAreaTreated;
            var taa = $scope.getJDAPPDetails[6][0].TotalAffectedArea;
            var tat = $scope.getJDAPPDetails[6][0].TotalTreatedArea;
            var adc = $scope.getJDAPPDetails[5];
            var months = [];
            for (var i = 0; i < adc.length; i++) {
                if (!months.includes(adc[i].Month)) {
                    months.push(adc[i].Month);
                }
            }
            var array1 = [];
            for (var i = 0; i < adc.length; i++) {
                var found = array1.find(j => j.PestDiseaseName == adc[i].PestDiseaseName);
                if (found != null) {
                    found.ModerateAdvisoryNo += ", " + adc[i].ModerateAdvisoryNo;
                    found.ModerateAdvisoryNo += "-" + adc[i].Month;
                }
                else {
                    array1.push({ "ModerateAdvisoryNo": adc[i].ModerateAdvisoryNo + "-" + adc[i].Month, "PestDiseaseName": adc[i].PestDiseaseName });
                }
            }
            for (var i = 0; i < months.length; i++) {
                for (var j = 0; j < array1.length; j++) {
                    if (array1[j].ModerateAdvisoryNo.indexOf(months[i]) == -1) {
                        if (months[i] == "September") {
                            array1[j].ModerateAdvisoryNo = "0-September, " + array1[j].ModerateAdvisoryNo;
                        }
                        else if (months[i] == "October") {
                            var k = array1[j].ModerateAdvisoryNo.split(", ");
                            k[1] = ", 0-October, " + k[1];
                            array1[j].ModerateAdvisoryNo = k[0].concat(k[1]);
                        }
                        else if (months[i] == "November") {
                            array1[j].ModerateAdvisoryNo = array1[j].ModerateAdvisoryNo + ", 0-November";
                        }
                    }
                }
            }
            var finalArray = [];
            var bgColor = [];
            for (var i = 0; i < array1.length; i++) {
                array1[i].ModerateAdvisoryNo = array1[i].ModerateAdvisoryNo.replace(/-September|-October|-November/g, "");
                array1[i].ModerateAdvisoryNo = array1[i].ModerateAdvisoryNo.split(", ");
                finalArray.push({ "data": array1[i].ModerateAdvisoryNo, "name": array1[i].PestDiseaseName });
                bgColor.push('rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')');
            }
            var optionsNADC = {
                series: finalArray,
                chart: {
                    height: 350,
                    type: 'line',
                },
                stroke: {
                    width: 3,
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'category',
                    categories: months,
                },
                // title: {
                //     text: 'Social Media',
                //     align: 'left',
                //     style: {
                //         fontSize: "16px",
                //         color: '#666'
                //     }
                // },
                fill: {
                    colors: bgColor,
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        gradientToColors: undefined,
                        inverseColors: true,
                        shadeIntensity: 0.5,
                        type: 'horizontal',
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100]
                    },
                },
                markers: {
                    size: 4,
                    colors: ["#FFA41B"],
                    strokeColors: "#fff",
                    strokeWidth: 2,
                    hover: {
                        size: 7,
                    }
                },
                yaxis: {
                    // min: -10,
                    // max: 40,
                    title: {
                        text: 'Number of Advisories',
                    },
                }
            };
            var chartNADC = new ApexCharts(document.querySelector("#chartNADC"), optionsNADC);
            chartNADC.render();
            var optionsTAATW = {
                series: [vawTAA, vawTTA],
                plotOptions: {
                    pie: {
                        // size: 200,
                        customScale: 1,
                        donut: {
                            size: '75%',
                            labels: {
                                show: true
                            }
                        }
                    }
                },
                chart: {
                    width: 380,
                    type: 'donut'
                },
                labels: ['Affected (in HA)', 'Treated (in HA)'],
                dataLabels: {
                    enabled: false
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: "dark",
                        type: "horizontal",
                        shadeIntensity: 0.5,
                        gradientToColors: ["#ABE5A1"],
                        inverseColors: true,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100]
                    }
                },
                legend: {
                    formatter: function (val, opts) {
                        return val + " - " + opts.w.globals.series[opts.seriesIndex]
                    }
                },
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
            var chartTAATW = new ApexCharts(document.querySelector("#chartTAATW"), optionsTAATW);
            chartTAATW.render();
            var optionsTAAT = {
                series: [taa, tat],
                plotOptions: {
                    pie: {
                        // size: 200,
                        customScale: 1,
                        donut: {
                            size: '75%',
                            labels: {
                                show: true
                            }
                        }
                    }
                },
                chart: {
                    width: 380,
                    type: 'donut'
                },
                labels: ['Affected (in HA)', 'Treated (in HA)'],
                dataLabels: {
                    enabled: false
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: "dark",
                        type: "horizontal",
                        shadeIntensity: 0.5,
                        gradientToColors: ["#ABE5A1"],
                        inverseColors: true,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100]
                    }
                },
                legend: {
                    formatter: function (val, opts) {
                        return val + " - " + opts.w.globals.series[opts.seriesIndex]
                    }
                },
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
            chartTAAT = new ApexCharts(ctxTAAT, optionsTAAT);
            chartTAAT.render();
        }, function error(response) {
            console.log(response.status);
        }).catch(function err(error) {
            console.log('An error occurred...', error);
        });
    };

    $scope.getCropCategories = function () {
        $http.get('https://www.epestodisha.nic.in/jdapp/getCropCategories').then(function success(response) {
            $scope.cropCategories = response.data;
        }, function error(response) {
            console.log(response.status);
        }).catch(function err(error) {
            console.log('An error occurred...', error);
        });
    };

    $scope.getCropsByCategory = function () {
        $http.get('https://www.epestodisha.nic.in/jdapp/getCropsByCategory?cropCategoryCode=' + $scope.ddlCropCategory).then(function success(response) {
            $scope.crops = response.data;
            $scope.ddlCrop = null;
            if (chartPAA) chartPAA.destroy();
            $scope.pestDiseases = [];
        }, function error(response) {
            console.log(response.status);
        }).catch(function err(error) {
            console.log('An error occurred...', error);
        });
    };

    $scope.getPestDiseases = function () {
        if ($scope.ddlCropCategory != undefined) {
            $http.get('https://www.epestodisha.nic.in/jdapp/getPestDiseases?cropCode=' + $scope.ddlCrop).then(function success(response) {
                $scope.pestDiseases = response.data;
                if (chartPAA) chartPAA.destroy();
            }, function error(response) {
                console.log(response.status);
            }).catch(function err(error) {
                console.log('An error occurred...', error);
            });
        }
    };

    $scope.pests = [];
    $scope.getValue = function () {
        $scope.pests = [];
        angular.forEach($scope.pestDiseases, function (i) {
            if (i.selected) {
                $scope.pests.push(i.PestDiseaseCode);
            }
        });
        $scope.$watch($scope.pests, function () {
            if (chartPAA) chartPAA.destroy();
        }, true)
    };

    var ctxPAA = document.querySelector("#chartPAA");
    var chartPAA = null;
    $scope.sumTAA = 0;
    $scope.getPestGraphData = function () {
        if ((($scope.ddlMonth == undefined || $scope.ddlMonth == null) && ($scope.ddlFY == undefined && $scope.ddlFY == null)) || ($scope.ddlMonth != undefined && $scope.ddlMonth != null && $scope.ddlFY != undefined && $scope.ddlFY != null) || (($scope.ddlMonth == undefined || $scope.ddlMonth == null) && $scope.ddlFY != undefined && $scope.ddlFY != null)) {
            var graphData = [];
            if ($scope.pests.length > 0) {
                var month = $scope.ddlMonth == undefined || $scope.ddlMonth == null ? 0 : $scope.ddlMonth;
                var financialYear = $scope.ddlFY == undefined || $scope.ddlFY == null ? 0 : $scope.ddlFY;
                var season = $scope.cbSeason == undefined || $scope.cbSeason == null ? 0 : $scope.cbSeason;
                $http.get('https://www.epestodisha.nic.in/jdapp/getPestGraphData', { params: { pestData: JSON.stringify($scope.pests), month: month, season: season, financialYear: financialYear } }).then(function success(response) {
                    graphData = response.data;
                    $scope.sumTAA = 0;
                    for (var i = 0; i < graphData.length; i++) {
                        $scope.sumTAA += graphData[i].TotalAffectedArea;
                    }
                    if ($scope.sumTAA > 0) {
                        var pestName = [];
                        var affectedPestArea = [];
                        // var bColor = [];
                        for (var i = 0; i < graphData.length; i++) {
                            var pest = graphData[i].PestDiseaseName;
                            var affectedArea = graphData[i].TotalAffectedArea;
                            pestName.push(pest);
                            affectedPestArea.push(affectedArea);
                        }
                        // for (var i = 0; i <= pestName.length; i++) {
                        //     bColor.push('rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')');
                        // }
                        var optionsPAA = {
                            series: [{
                                name: 'Total Area Affected (In HA)',
                                type: 'column',
                                data: affectedPestArea
                            }, {
                                name: 'Total Area Affected (In HA)',
                                type: 'area',
                                data: affectedPestArea
                            }],
                            chart: {
                                height: 350,
                                type: 'line',
                                stacked: false,
                            },
                            stroke: {
                                width: [0, 2, 5],
                                curve: 'smooth'
                            },
                            plotOptions: {
                                bar: {
                                    columnWidth: '50%'
                                }
                            },
                            fill: {
                                opacity: [0.85, 0.25, 1],
                                gradient: {
                                    inverseColors: false,
                                    shade: 'light',
                                    type: "vertical",
                                    opacityFrom: 0.85,
                                    opacityTo: 0.55,
                                    stops: [0, 100, 100, 100]
                                }
                            },
                            labels: pestName,
                            markers: {
                                size: 0
                            },
                            xaxis: {
                                type: 'category'
                            },
                            yaxis: {
                                title: {
                                    text: 'Total Area Affected (in HA)',
                                },
                                min: 0
                            },
                            tooltip: {
                                shared: true,
                                intersect: false,
                                y: {
                                    formatter: function (y) {
                                        if (typeof y !== "undefined") {
                                            return y.toFixed(0) + " ha";
                                        }
                                        return y;

                                    }
                                }
                            }
                        };
                        chartPAA = new ApexCharts(ctxPAA, optionsPAA);
                        chartPAA.render();
                    }
                    else {
                        alert("No record for graph.");
                    }
                }, function error(response) {
                    console.log(response.status);
                }).catch(function err(error) {
                    console.log('An error occurred...', error);
                });
            }
            else {
                alert('Please select atleast one Pest.');
            }
        }
        else {
            alert('Please select the month as well as financial year.');
        }
    };

    $scope.destroyGraph = function () {
        if (chartPAA) chartPAA.destroy();
    };

    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.response);
        }
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.send(null);
    };

    // var bColor = [];
    var ctxTAACC = document.getElementById('chartTAACC');
    var chartTAACC = null;
    var ctxTAAC = document.getElementById('chartTAAC');
    var chartTAAC = null;
    document.getElementById('noData').style.display = 'none';
    $scope.getGD = function () {
        var cropCategoryName = [];
        var affectedPestArea = [];
        var categoryCode = [];
        $http.get('https://www.epestodisha.nic.in/jdapp/getGraphforCrop?season=' + $scope.cbSeason + '&financialYear=' + $scope.ddlFY).then(function success(response) {
            var pieData = response.data;
            if (pieData.length > 0) {
                for (var i = 0; i < pieData.length; i++) {
                    var categoryName = pieData[i].CategoryName + ' (in HA)';
                    var affectArea = pieData[i].TotalAffectedArea;
                    var catCode = pieData[i].CropCategoryCode;
                    cropCategoryName.push(categoryName);
                    affectedPestArea.push(affectArea);
                    categoryCode.push(catCode);
                }
                // for (var i = 0; i < cropCategoryName.length; i++) {
                //     bColor.push('rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')');
                // }
                var optionsTAACC = {
                    colors: ['#fdf498', '#f37736', '#7bc043', '#0392cf', '#ee4035'],
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
                    series: affectedPestArea,
                    chart: {
                        width: 380,
                        type: 'pie',
                        events: {
                            dataPointSelection: function (event, chartContext, config) {
                                var categoryCode = config.w.config.code[config.dataPointIndex];
                                var colorSelected = config.w.config.colors[config.dataPointIndex];
                                var cropHectareName = [];
                                var affectedCropArea = [];
                                // var bagColor = [];
                                if (chartTAAC) chartTAAC.destroy();
                                httpGetAsync('https://www.epestodisha.nic.in/jdapp/getCropDetailsCategory?cropCode=' + categoryCode + '&season=' + $scope.cbSeason + '&financialYear=' + $scope.ddlFY, function success(res) {
                                    var barData = JSON.parse(res);
                                    var sumBD = 0;
                                    for (var i = 0; i < barData.length; i++) {
                                        sumBD += barData[i].TotalAffectedArea;
                                    }
                                    if (barData.length > 0) {
                                        if (sumBD != 0) {
                                            document.getElementById('noData').style.display = 'none';
                                            document.getElementById('noClick').style.display = 'none';
                                            for (var i = 0; i < barData.length; i++) {
                                                var cropName = barData[i].CropName;
                                                var affectArea = barData[i].TotalAffectedArea;
                                                cropHectareName.push(cropName);
                                                affectedCropArea.push(affectArea);
                                            }
                                            // for (var i = 0; i < cropName.length; i++) {
                                            //     bagColor.push('rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')');
                                            // }
                                            var optionsTAAC = {
                                                series: [{
                                                    name: 'Area Affected (in HA)',
                                                    data: affectedCropArea
                                                }],
                                                chart: {
                                                    height: 185,
                                                    type: 'bar'
                                                },
                                                colors: [colorSelected],
                                                plotOptions: {
                                                    bar: {
                                                        columnWidth: '45%',
                                                        distributed: true
                                                    }
                                                },
                                                dataLabels: {
                                                    enabled: false
                                                },
                                                legend: {
                                                    show: false
                                                },
                                                xaxis: {
                                                    categories: cropHectareName,
                                                    labels: {
                                                        style: {
                                                            // colors: bagColor,
                                                            fontSize: '12px'
                                                        }
                                                    }
                                                }
                                            };
                                            chartTAAC = new ApexCharts(ctxTAAC, optionsTAAC);
                                            chartTAAC.render();
                                        }
                                        else {
                                            document.getElementById('noData').style.display = 'block';
                                            document.getElementById('noClick').style.display = 'none';
                                            document.getElementById('taac').style.height = '0px';
                                        }
                                    }
                                    else {
                                        document.getElementById('noClick').style.display = 'block';
                                        document.getElementById('noData').style.display = 'none';
                                    }
                                }, function error(response) {
                                    console.log(response.status);
                                });
                            }
                        }
                    },
                    labels: cropCategoryName,
                    code: categoryCode,
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
                chartTAACC = new ApexCharts(ctxTAACC, optionsTAACC);
                chartTAACC.render();
            }
        }, function error(response) {
            console.log(response.status);
        }).catch(function err(error) {
            console.log('An error occurred...', error);
        });
    };

});