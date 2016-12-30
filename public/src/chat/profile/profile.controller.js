export default class ProfileController {

    constructor(AuthService, $modal) {
        this.authService = AuthService;
        this.modal = $modal;
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
            template: "<upload-modal on-close ='$ctrl.closeModal()' ></upload-modal>"
        });
    }

    closeModal() {
        this.modalInstance = null;
    }
};

ProfileController.$inject = ['AuthService', '$modal'];