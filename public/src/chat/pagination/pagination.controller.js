export const PAGE_SIZE = 5;
export class PaginationController {
    constructor($scope){
        this.scope = $scope;
    }

    $onInit() {
        this.init();
    }

    $onChanges(){
        this.init();
    }

    init(){
        this.numPages = Math.ceil(this.numItems / PAGE_SIZE);
        this.displayedPages = [];
        this.firstDisplayedPage = Math.max(0, this.pageNumber - 2);
        this.lastDisplayedPage = Math.min(this.pageNumber + 2, this.numPages - 1);
        console.log(this.firstDisplayedPage + ", " + this.lastDisplayedPage);
        for (var i = this.firstDisplayedPage; i <= this.lastDisplayedPage; i++) {
            this.displayedPages.push(i);
        }
    }

    goToNext() {
        if (this.pageNumber != this.numPages - 1)
            this.pageNumber++;
    }

    goToPrev() {
        if (this.pageNumber != 0)
            this.pageNumber--;
    }

    goToPage(page) {
        if (page >= 0 && page < this.numPages)
            this.pageNumber = page;
    }

};

PaginationController.$inject = ['$scope'];