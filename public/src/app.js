/*jshint esversion: 6 */
import angular from "angular";
import 'angular-ui-router';
import 'angular-route';
import authConfig from "./config/route";
import "./auth/auth.module";
import "./chat/chat.module";
import {MAIN_CONTROLLER_NAME, MainController} from "./app.controller";


angular.module("ChatApp", ["ui.router", "auth", "chat"]).config(authConfig).controller(MAIN_CONTROLLER_NAME, MainController);
