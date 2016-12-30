import uploadController from "./upload.controller";
export const UPLOAD_COMPONENT_NAME = "uploadModal";

export const uploadComponent = {
    templateUrl: "templates/profile/upload-image.html",
    controller: uploadController
};