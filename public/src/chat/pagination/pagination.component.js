import {PaginationController as paginationController} from "./pagination.controller";
export const PAGINATION_COMPONENT_NAME = "paginationSection";

export const paginationComponent = {
    templateUrl: "templates/chat/pagination.html",
    controller: paginationController,
    bindings: {
        pageNumber: '=',
        numItems: '<'
    }
};