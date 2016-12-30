export default class ProfileController {

    constructor($uibModalInstance) {
        this.modal = {
            cancel: function () {
                $uibModalInstance.dismiss('cancel');
            }
        }
    };
}

ProfileController
    .$inject = ['$uibModalInstance'];