kopf.controller('IndexSettingsController', ['$scope', '$location', '$timeout', 'IndexSettingsService', 'AlertService', function($scope, $location, $timeout, IndexSettingsService, AlertService) {
	$scope.service = IndexSettingsService;

	$scope.save=function() {
        var index = $scope.service.index;
		var settings = $scope.service.settings;
		var new_settings = {};
        var editable_settings = $scope.service.editable_settings;
		// TODO: could move that to editable_index_settings model
		editable_settings.valid_settings.forEach(function(setting) {
			if (notEmpty(editable_settings[setting])) {
				new_settings[setting] = editable_settings[setting];
			}
		});
		$scope.client.updateIndexSettings(index, JSON.stringify(new_settings, undefined, ""),
			function(response) {
				$scope.updateModel(function() {
					AlertService.success("Index settings were successfully updated", response);
				});
				$scope.refreshClusterState();
			},
			function(error) {
				$scope.updateModel(function() {
					AlertService.error("Error while updating index settings", error);
				});
			}
		);
	};
 }]);