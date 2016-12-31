import {UPLOAD_CONTROlLER_NAME} from "../modal/upload.controller";
export default class ProfileController {

    constructor(AuthService, $uibModal, $scope, $state) {
        this.authService = AuthService;
        this.modal = $uibModal;
        this.user = this.authService.currentUser();
        this.state = $state;
        this.confirmPassword = "";
        this.newPassword = "";
        this.oldPassword = "";
        this.scope = $scope;
        let ctrl = this;
        this.scope.$on("closeModal", function (event, data) {
            ctrl.closeModal();
        });
    }

    goBack() {
        this.state.go("index");
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
            controller: `${UPLOAD_CONTROlLER_NAME} as vm`
        });
    }

    closeModal() {
        this.user = this.authService.currentUser();
        console.log(this.user);
        this.modalInstance.dismiss("cancel");
        this.modalInstance = null;
    }
};

ProfileController.$inject = ['AuthService', '$uibModal', '$scope', "$state"];