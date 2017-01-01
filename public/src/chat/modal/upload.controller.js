export const UPLOAD_CONTROlLER_NAME = "uploadController";
export class UploadController {
    constructor($rootScope, $scope, $window, AuthService, $timeout) {
        $scope.file = null;
        $scope.$on('$dropletReady', function whenDropletReady() {
            $scope.interface.allowedExtensions(['png', 'jpg', 'bmp', 'gif']);
            $scope.interface.setMaximumValidFiles(2);
            $scope.interface.setRequestHeaders({"Authorization": 'Bearer ' + AuthService.getToken()});
            $scope.interface.setRequestUrl("/profile/upload");
        });

        $scope.$on('$dropletFileAdded', function whenDropletReady() {
            $scope.allFiles = $scope.interface.getFiles($scope.interface.FILE_TYPES.VALID);
            $scope.file = $scope.allFiles[$scope.allFiles.length - 1];
            if ($scope.allFiles.length > 1) {
                $scope.firstFile = $scope.allFiles[0];
                $scope.firstFile.deleteFile();
            }

        });

        $scope.$on('$dropletSuccess', function onDropletSuccess(event, response, files) {
            AuthService.saveToken(response.token);
            $rootScope.$broadcast("closeModal");
        });

        // Listen for when the files have failed to upload.
        $scope.$on('$dropletError', function onDropletError(event, response) {
            $scope.error = true;
            $scope.file = null;
            $timeout(function timeout() {
                $scope.error = false;
            }, 5000);
        });

        $scope.onClose = function () {
            $rootScope.$broadcast("closeModal");
        }
    }
}

UploadController.$inject = ["$rootScope", "$scope", "$window", "AuthService", "$timeout"];