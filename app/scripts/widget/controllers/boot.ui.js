(function (ng) {
    'use strict';

        var ModalCtrl = function ($scope, $modal, $log) {

        $scope.items = ['item1', 'item2', 'item3'];

        $scope.open = function (size) {

        var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          controller: ModalInstanceCtrl,
          size: size,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
        };
        };

        var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

        $scope.items = items;
        $scope.selected = {
        item: $scope.items[0]
        };

        $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        };
        };

    ng.module('piwikExtDash.widget').controller("ModalCtrl", [
        "$scope", "$modal", "$log",
        ModalCtrl
    ]);

    var DatepickerCtrl = function ($scope, $route, $location, $timeout)
    {
        $scope.today = function() {
            $scope.dt = new Date();
          };
          $scope.today();

          $scope.clear = function () {
            $scope.dt = null;
          };

          // Disable weekend selection
          $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
          };

          $scope.toggleMin = function() {
            $scope.minDate = new Date('2008');
          };
          $scope.toggleMin();

          $scope.toggleMax = function() {
            $scope.maxDate = new Date();
          };
          $scope.toggleMax();

          $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
          };

          $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            calendarWeeks: false
          };

          $scope.initDate = new Date('2016-15-20');
          $scope.formats = ['dd.MM.yyyy'];
          $scope.format = $scope.formats[0];

        $scope.$watch('dt',function (newDate, oldDate) {
            $timeout(function () {
                if (newDate != oldDate) {
                    $location.search('date', moment(newDate).format('YYYY-MM-DD'));
                }
            },1);
        });
    };

    ng.module('piwikExtDash.widget').controller("DatepickerCtrl", [
        "$scope",
        "$route",
        "$location",
        "$timeout",
        DatepickerCtrl
    ]);

})(angular);