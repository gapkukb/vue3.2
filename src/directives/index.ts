import { App, Directive } from 'vue-demi';
import lines from '@/directives/lines';
import visible from '@/directives/visible';
import autoFocus from '@/directives/auto-focus';
import placeholder from '@/directives/img';
import lazy from '@/directives/lazy';
import draggable from '@/directives/draggable';

export type CustomDirective<E extends HTMLElement, T> = Directive<E, T> & { name: string };

export default {
	install(app: App) {
		app.directive(lines.name, lines);
		app.directive(visible.name, visible);
		app.directive(autoFocus.name, autoFocus);
		app.directive(placeholder.name, placeholder);
		app.directive(lazy.name, lazy);
		app.directive(draggable.name, draggable);
	},
};
