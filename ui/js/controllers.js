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
			return $scope.ssg*1 + $scope.ssg13*1 + $scope.wm_custom*1;
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
			return subt;
		}
        $scope.weburl = $location.absUrl().split("/").pop();
        function getAccounts() {
			$http.get('https://raw.githubusercontent.com/toak/zehntenzettel-conf/master/accounts.json').
				success(function(data) {
                    for (var key in data) {
                        $scope.accoutdata.availableOptions.push({id: data[key], name: key});
                        if ($scope.weburl==key)
                            $scope.accoutdata.selectedOption = {id: data[key], name: key};
                    }
                    $scope.accoutdata.availableOptions = $filter('orderBy')($scope.accoutdata.availableOptions, 'name');
                    $scope.accoutdata.availableOptions.unshift({id: 'empty', name: 'Bitte auswählen'});
				});
		}
        $scope.accoutdata = {
			availableOptions: [],
			selectedOption: {id: 'empty', name: 'bitte auswählen'}
		};
		$scope.onlyNumbers = /^\d+$/;
	}
);