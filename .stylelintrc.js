module.exports = {
	extends: ["stylelint-config-standard", "stylelint-config-prettier", "stylelint-config-recess-order"],
  // scss
	plugins: ["stylelint-scss"],
	rules: {
		"at-rule-no-unknown": [
			true,
			{
				ignoreAtRules: ["mixin", "include", "tailwind", "extend", "apply", "variants", "responsive", "screen"],
			},
		],
    // scss
		"scss/at-rule-no-unknown": true,
		"selector-pseudo-element-no-unknown": [true, { ignorePseudoElements: ["v-deep"] }],
	},
};
