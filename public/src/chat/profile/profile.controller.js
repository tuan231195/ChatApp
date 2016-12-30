export default class ProfileController {

    constructor(AuthService, $uibModal) {
        this.authService = AuthService;
        this.modal = $uibModal;
        this.user = this.authService.currentUser();
        this.confirmPassword = "";
        this.newPassword = "";
        this.oldPassword = "";
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
            template: "<upload-modal on-close='$ctrl.closeModal()'></upload-modal>"
        });
    }

    closeModal() {
        console.log("Hi");
        this.modalInstance.dismiss("cancel");
        this.modalInstance = null;
    }
};

ProfileController.$inject = ['AuthService', '$uibModal'];