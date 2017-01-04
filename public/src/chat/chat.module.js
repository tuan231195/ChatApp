import {CHATLIST_COMPONENT_NAME, chatListComponent} from "./chatlist/chatlist.component";
import {CHATBOX_COMPONENT_NAME, chatBoxComponent} from "./chatbox/chatbox.component";
import {CHAT_SERVICE_NAME, ChatService} from "./chat.service";
import {PROFILE_SERVICE_NAME, ProfileService} from "./profile.service";
import {INDEX_COMPONENT_NAME, indexComponent} from "./index.component";
import {HEADER_COMPONENT_NAME, headerComponent} from "../common/header/header.component";
import {INBOX_COMPONENT_NAME, inboxComponent} from "./inbox/inbox.component";
import {NAVIGATION_COMPONENT_NAME, navigationComponent} from "../common/navigation/navigation.component";
import {SIDEBAR_COMPONENT_NAME, sidebarComponent} from "../common/sidebar/sidebar.component";
import {PROFILE_COMPONENT_NAME, profileComponent} from "./profile/profile.component";
import {UPLOAD_CONTROlLER_NAME, UploadController} from "./modal/upload.controller";
import {SCROLL_DIRECTIVE_NAME, scrollDirective} from "../common/scroll/scroll.directive";
import {ONLINE_COMPONENT_NAME, onlineComponent} from "./online/online.component";
angular.module("chat", [])
    .component(INDEX_COMPONENT_NAME, indexComponent)
    .component(CHATLIST_COMPONENT_NAME, chatListComponent)
    .component(CHATBOX_COMPONENT_NAME, chatBoxComponent)
    .component(NAVIGATION_COMPONENT_NAME, navigationComponent)
    .component(HEADER_COMPONENT_NAME, headerComponent)
    .component(INBOX_COMPONENT_NAME, inboxComponent)
    .component(SIDEBAR_COMPONENT_NAME, sidebarComponent)
    .component(PROFILE_COMPONENT_NAME, profileComponent)
    .component(ONLINE_COMPONENT_NAME, onlineComponent)
    .controller(UPLOAD_CONTROlLER_NAME, UploadController)
    .service(CHAT_SERVICE_NAME, ChatService)
    .service(PROFILE_SERVICE_NAME, ProfileService)
    .directive(SCROLL_DIRECTIVE_NAME, scrollDirective);
