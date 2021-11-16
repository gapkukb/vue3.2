import { CustomDirective } from '@/directives';
import { DirectiveBinding } from 'vue-demi';

const options = {
	// 所有用户角色
	roles: ['admin', 'root', 'user'],
	role: 'admin',
	predicate() {
		// 首先检验是否登录
		return true;
	},
};

function settle(el: HTMLElement, { value, modifiers }: DirectiveBinding<boolean>) {
	const isDeny = value === false;
	// 禁止访问的情况
	if (!options.predicate()) {
		// 1 未登录
		el.parentNode?.removeChild(el);
	} else if (modifiers[options.role] && isDeny) {
		// 2 角色包含在限制列表中
		el.parentNode?.removeChild(el);
	} else if (Object.keys(modifiers).length === 0 && isDeny) {
		// 3 没有指定角色则默认为指定全部角色，
		el.parentNode?.removeChild(el);
	}
}


/**
 * UI权限管理
 */
export default {
	name: 'access',
	mounted: settle,
	updated: settle,
} as CustomDirective<HTMLElement, boolean>;

// e.g. v.access.user.admin="false"  禁止user和admin
// e.g. v.access.user.admin="true"   允许user和admin 默认true
