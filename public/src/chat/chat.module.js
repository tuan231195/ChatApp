import {ONLINE_COMPONENT_NAME, onlineComponent} from "./chatlist/online.component";
import {CHATBOX_COMPONENT_NAME, chatBoxComponent} from "./chatbox/chatbox.component";
import {CHAT_SERVICE_NAME, ChatService} from "./chat.service";
import {INDEX_COMPONENT_NAME, indexComponent} from "./index.component";
import {HEADER_COMPONENT_NAME, headerComponent} from "../common/header/header.component";
import {INBOX_COMPONENT_NAME, inboxComponent } from "./inbox/inbox.component";
import {NAVIGATION_COMPONENT_NAME, navigationComponent} from "../common/navigation/navigation.component";
import {SIDEBAR_COMPONENT_NAME, sidebarComponent} from "../common/sidebar/sidebar.component";
import {SCROLL_DIRECTIVE_NAME, scrollDirective} from "../common/scroll/scroll.directive";

angular.module("chat", [])
    .component(INDEX_COMPONENT_NAME, indexComponent)
    .component(ONLINE_COMPONENT_NAME, onlineComponent)
    .component(CHATBOX_COMPONENT_NAME, chatBoxComponent)
    .component(NAVIGATION_COMPONENT_NAME, navigationComponent)
    .component(HEADER_COMPONENT_NAME, headerComponent)
    .component(INBOX_COMPONENT_NAME, inboxComponent)
    .component(SIDEBAR_COMPONENT_NAME, sidebarComponent)
    .service(CHAT_SERVICE_NAME, ChatService)
    .directive(SCROLL_DIRECTIVE_NAME, scrollDirective);
