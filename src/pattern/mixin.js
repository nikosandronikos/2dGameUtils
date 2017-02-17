export function mixin(base, mixin) {
	for (name of Object.getOwnPropertyNames(mixin)) {
		Object.defineProperty(
			base.prototype,
			name,
			Object.getOwnPropertyDescriptor(mixin, name)
		);
	}
}