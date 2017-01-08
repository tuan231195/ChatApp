import {UPLOAD_CONTROlLER_NAME} from "../modal/upload.controller";
export default class ProfileController {

    constructor(AuthService, $uibModal, $scope, $state, ProfileService, $timeout, $window) {
        this.authService = AuthService;
        this.modal = $uibModal;
        this.user = this.authService.currentUser();
        this.state = $state;
        this.confirmPassword = "";
        this.newPassword = "";
        this.oldPassword = "";
        this.scope = $scope;
        this.profileService = ProfileService;
        this.timeout = $timeout;
        this.window = $window;
        let ctrl = this;
        this.scope.$on("closeModal", function (event, data) {
            ctrl.closeModal();
        });
    }

    goBack() {
        this.window.history.back();
    }


    isPasswordMatch() {
        return this.confirmPassword === this.newPassword;
    }

    canSubmit() {
        return this.isPasswordMatch();
    }

    showModal() {
        this.modalInstance = this.modal.open({
            templateUrl: "templates/profile/upload-image.html",
            controller: UPLOAD_CONTROlLER_NAME
        });
        var ctrl = this;

        this.modalInstance.result.then(function () {
            ctrl.user = ctrl.authService.currentUser();
            ctrl.modalInstance = null;
        }, function () {
            console.log("Modal closed");
        })
    }

    closeModal() {
        this.modalInstance.close();
    }

    update() {
        var ctrl = this;
        this.profileService.updatePassword(this.oldPassword, this.newPassword).then(function (response) {
            console.log(response);
            ctrl.authService.saveToken(response.data.token);
            ctrl.newPassword = "";
            ctrl.oldPassword = "";
            ctrl.confirmPassword = "";
            ctrl.updated = true;
            ctrl.scope.form.$setPristine();
            ctrl.timeout(function () {
                ctrl.updated = false;
            }, 5000);
        }, function (error) {
            ctrl.error = error.data.error;
        });
    }
};

ProfileController.$inject = ['AuthService', '$uibModal', '$scope', "$state", "ProfileService", "$timeout", "$window"];