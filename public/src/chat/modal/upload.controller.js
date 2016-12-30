export default class ProfileController {

    constructor($modalInstance) {
        this.modal = {
            cancel: function () {
                $modalInstance.dismiss('cancel');
            }
        }
    };
}

ProfileController
    .$inject = ['$modalInstance'];