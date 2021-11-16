import { App, VueElement } from "vue-demi";
import SvgIcon from "./SvgIcon.vue";

export default {
	install(app: App) {
		[SvgIcon].forEach((component) => {
			app.component(component.name, component);
		});
	},
};

export {
	SvgIcon
}
