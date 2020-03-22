angular.module('tithe.controllers', [])
	.controller('titheController', function($scope, $http, $location, $filter) {
		$scope.z = "";
		$scope.poe = "";
		$scope.ev = "";
		$scope.kf = "";
		$scope.scho = "";
		$scope.gems = "";
		$scope.llg = "";
		$scope.hm = "";
		$scope.poe_custom = "";
		$scope.ssg = "";
		$scope.ssg13 = "";
		$scope.afm = "";
		$scope.wm_custom = "";
		$scope.gemk = "";
		$scope.lg_custom1 = "";
		$scope.lg_custom2 = "";
        $scope.secureInfo = false;
        getAccounts();
        $scope.calcpoe = function() {
			var poetmpval = document.getElementsByName("poefld")[0].value;
			var poesumtmp = $scope.poesum();
			if (poesumtmp <= poetmpval) {
				$scope.poe = poetmpval - poesumtmp;
			}
			if (poesumtmp > poetmpval) {
				$scope.poe = 0;
				alert("Der Betrag muss mindestens die Summe der Einzelposten betragen.");
			}
			$scope.poesum();
		}
		$scope.poesum = function() {
			var tmp = $scope.ev*1 + $scope.kf*1 + $scope.scho*1 + $scope.gems*1 + $scope.llg*1 + $scope.hm*1 + $scope.poe_custom*1;
            document.getElementsByName("poefld")[0].value = tmp*1 + $scope.poe*1;
			return tmp;
        }
		$scope.bl2 = function() {
			return $scope.poesum()*1 + $scope.poe*1;
		}
		$scope.ptbl2 = function() {
			var p = $scope.bl2()/$scope.sumbl234()*100;
			if (!isNaN(p))
				return Math.round(p) + "%";
		}
		$scope.bl3 = function() {
			return $scope.ssg*1 + $scope.ssg13*1 + $scope.afm*1 + $scope.wm_custom*1;
		}
		$scope.ptbl3 = function() {
			var p = $scope.bl3()/$scope.sumbl234()*100;
			if (!isNaN(p))
				return Math.round(p) + "%";
		}
		$scope.bl4 = function() {
			return $scope.gemk*1 + $scope.lg_custom1*1 + $scope.lg_custom2*1;
		}
		$scope.ptbl4 = function() {
			var p = $scope.bl4()/$scope.sumbl234()*100;
			if (!isNaN(p))
				return Math.round(p) + "%";
		}
		$scope.sumbl234 = function() {
			return $scope.bl2()*1 + $scope.bl3()*1 + $scope.bl4()*1;
		}
		$scope.sum = function() {
			return $scope.z*1 + $scope.sumbl234()*1;
        }
        $scope.qrcode = function() {
			return 'https://epc-qr.eu/?bname=' + $scope.accoutdata.selectedOption.acname + '&iban=' + $scope.accoutdata.selectedOption.id + '&euro=' + $scope.sum()*1 + '&info=' + $scope.subject();
		}
		$scope.subject = function() {
			var subt = "";
			if ($scope.z > 0)
				subt = subt + "Z " + $scope.z + ",";
			if ($scope.poe > 0)
				subt = subt + "POE " + $scope.poe + ",";
			if ($scope.ev > 0)
				subt = subt + "EV " + $scope.ev + ",";
			if ($scope.kf > 0)
				subt = subt + "KF " + $scope.kf + ",";
			if ($scope.scho > 0)
				subt = subt + "SCHO " + $scope.scho + ",";
			if ($scope.gems > 0)
				subt = subt + "GEMS " + $scope.gems + ",";
			if ($scope.llg > 0)
				subt = subt + "LLG " + $scope.llg + ",";
			if ($scope.hm > 0)
				subt = subt + "HM " + $scope.hm + ",";
			if ($scope.poe_custom > 0)
				subt = subt + $scope.poe_custom_text + " " + $scope.poe_custom + ",";
			if ($scope.ssg > 0)
				subt = subt + "SSG " + $scope.ssg + ",";
			if ($scope.ssg13 > 0)
				subt = subt + " 13SSG " + $scope.ssg13 + ",";
			if ($scope.afm > 0)
				subt = subt + " AFM " + $scope.afm + ",";
			if ($scope.wm_custom > 0)
				subt = subt + $scope.wm_custom_text + " " + $scope.wm_custom + ",";
			if ($scope.gemk > 0)
				subt = subt + "GEMK " + $scope.gemk + ",";
			if ($scope.lg_custom1 > 0)
				subt = subt + $scope.lg_custom1_text + " " + $scope.lg_custom1 + ",";
			if ($scope.lg_custom2 > 0)
				subt = subt + $scope.lg_custom2_text + " " + $scope.lg_custom2 + ",";
            if (subt.length>0)
                subt = subt.substring(0, subt.length-1);
            document.getElementById("subject").style.height = document.getElementById("subject").scrollHeight + 'px';
			return subt;
		}
        $scope.weburl = $location.absUrl().split("/").pop();
        function getAccounts() {
			$http.get('https://raw.githubusercontent.com/toak/zehntenzettel-conf/master/accounts.json').
				success(function(data) {
                    for (var key in data) {
                        datasplit = data[key].split(',');
                        $scope.accoutdata.availableOptions.push({id: datasplit[1], name: key, acname: datasplit[0]});
                        if ($scope.weburl==key)
                            $scope.accoutdata.selectedOption = {id: datasplit[1], name: key, acname: datasplit[0]};
                    }
                    $scope.accoutdata.availableOptions = $filter('orderBy')($scope.accoutdata.availableOptions, 'name');
                    $scope.accoutdata.availableOptions.unshift({id: 'empty', name: 'Bitte auswählen', acname: 'Bitte auswählen'});
				});
		}
        $scope.changeLink = function() {
            var link = $scope.accoutdata.selectedOption.name;
            $location.url('/'+link);
            if (link=="Übrige-Gemeinden") {
                alert("Lokale Gemeindegaben sind mit dieser Auswahl nicht möglich!");
                $scope.local = "none";
                $scope.gemk = 0;
                $scope.lg_custom1 = 0;
                $scope.lg_custom2 = 0;
            } else {
                $scope.local = "";
            }
        }
        $scope.$watch(function() {
            return $location.path();
        }, function(value) {
            for (var key in $scope.accoutdata.availableOptions) {
                if (value.substring(1)=="")
                    $scope.accoutdata.selectedOption = $scope.accoutdata.availableOptions[0];
                if ($scope.accoutdata.availableOptions[key].name==value.substring(1))
                    $scope.accoutdata.selectedOption = $scope.accoutdata.availableOptions[key];
            }
        });
        $scope.accoutdata = {
			availableOptions: [],
			selectedOption: {id: 'empty', name: 'Bitte auswählen', acname: 'Bitte auswählen'}
		};
		$scope.onlyNumbers = /^\d+$/;
	}
);