import {AUTH_COMPONENT_NAME, authComponent} from "./auth.component";
import {LOGIN_COMPONENT_NAME, loginComponent} from "./login/login.component";
import {SIGNUP_COMPONENT_NAME, signupComponent} from "./signup/signup.component";
import {AUTH_SERVICE_NAME, AuthService} from "./auth.service";

angular.module("auth", [])
    .component(AUTH_COMPONENT_NAME, authComponent)
    .component(LOGIN_COMPONENT_NAME, loginComponent)
    .component(SIGNUP_COMPONENT_NAME, signupComponent)
    .service(AUTH_SERVICE_NAME, AuthService);
;
