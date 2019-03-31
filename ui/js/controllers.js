angular.module('tithe.controllers', [])
	.controller('titheController', function($scope, $http) {
		$scope.z = "";
		$scope.ev = "";
		$scope.kf = "";
		$scope.scho = "";
		$scope.ah = "";
		$scope.llg = "";
		$scope.adra = "";
		$scope.rf = "";
		$scope.hm = "";
		$scope.poe_custom = "";
		$scope.proe = "";
		$scope.proefld = "";
		$scope.gems = "";
		$scope.ssg = "";
		$scope.ssg13 = "";
		$scope.wmcustom = "";
		$scope.gemk = "";
		$scope.lg_custom1 = "";
		$scope.lg_custom2 = "";
    getAccounts();
		$scope.calcproe = function() {
			var proetmpval = document.getElementsByName("proefld")[0].value;
			var proesumtmp = $scope.proesum();
			if (proesumtmp <= proetmpval) {
				$scope.proe = proetmpval - proesumtmp;
			}
			if (proesumtmp > proetmpval) {
				$scope.proe = 0;
				alert("Der Betrag muss mindestens die Summe der Einzelposten betragen.");
			}
			$scope.proesum();
		}
		$scope.proesum = function() {
			var tmp = $scope.ev*1 + $scope.kf*1 + $scope.scho*1 + $scope.ah*1 + $scope.llg*1 + $scope.adra*1 + $scope.rf*1 + $scope.hm*1 + $scope.poe_custom*1;
			document.getElementsByName("proefld")[0].value = tmp*1 + $scope.proe*1;
			return tmp;
		}
		$scope.bl2 = function() {
			return $scope.proesum()*1 + $scope.proe*1 + $scope.gems*1;
		}
		$scope.ptbl2 = function() {
			var p = $scope.bl2()/$scope.sumbl234()*100;
			if (!isNaN(p))
				return Math.round(p) + "%";
		}
		$scope.bl3 = function() {
			return $scope.ssg*1 + $scope.ssg13*1 + $scope.wmcustom*1;
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
			if ($scope.ev > 0)
				subt = subt + "EV " + $scope.ev + ",";
			if ($scope.kf > 0)
				subt = subt + "KF " + $scope.kf + ",";
			if ($scope.scho > 0)
				subt = subt + "SCHO " + $scope.scho + ",";
			if ($scope.ah > 0)
				subt = subt + "AH " + $scope.ah + ",";
			if ($scope.llg > 0)
				subt = subt + "LLG " + $scope.llg + ",";
			if ($scope.adra > 0)
				subt = subt + "ADRA " + $scope.adra + ",";
			if ($scope.rf > 0)
				subt = subt + "RF " + $scope.rf + ",";
			if ($scope.hm > 0)
				subt = subt + "HM " + $scope.hm + ",";
			if ($scope.poe_custom > 0)
				subt = subt + $scope.poe_custom_text + " " + $scope.poe_custom + ",";
			if ($scope.proe > 0)
				subt = subt + "POE" + " " + $scope.proe + ",";
			if ($scope.gems > 0)
				subt = subt + "GEMS " + $scope.gems + ",";
			if ($scope.ssg > 0)
				subt = subt + "SSG " + $scope.ssg + ",";
			if ($scope.ssg13 > 0)
				subt = subt + "13.SSG " + $scope.ssg13 + ",";
			if ($scope.wm_custom > 0)
				subt = subt + $scope.wm_custom_text + " " + $scope.wm_custom + ",";
			if ($scope.gemk > 0)
				subt = subt + "GEMK " + $scope.gemk + ",";
			if ($scope.lg_custom1 > 0)
				subt = subt + $scope.lg_custom1_text + " " + $scope.lg_custom1 + ",";
			if ($scope.lg_custom2 > 0)
				subt = subt + $scope.lg_custon2_text + " " + $scope.lg_custom2 + ",";
			return subt;
		}
    function getAccounts() {
			$http.get('https://raw.githubusercontent.com/toak/zehntenzettel-conf/master/accounts.json').
				success(function(data) {
        for (var key in data) {
          $scope.accoutdata.availableOptions.push({id: data[key], name: key});
        }
				});
		}
    $scope.accoutdata = {
			availableOptions: [
				{id: 'empty', name: 'bitte auswählen'}
			],
			selectedOption: {id: 'empty', name: 'bitte auswählen'}
		};
		$scope.onlyNumbers = /^\d+$/;
	}
);
