import sidebarController from "./sidebar.controller";
export const SIDEBAR_COMPONENT_NAME = "sidebarSection";

export const sidebarComponent = {
    templateUrl: "templates/common/sidebar.html",
    controller: sidebarController,
    bindings: { showMenu : '='}
};