import { ObjectDirective } from "vue-demi";

export declare const vAccess: ObjectDirective<VShowElement>;

declare interface VShowElement extends HTMLElement {
    _vod: string;
}
