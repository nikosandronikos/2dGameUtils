export function mixin(base, mixin) {
	console.log('Mixing in:');
	for (name of Object.getOwnPropertyNames(mixin)) {
		Object.defineProperty(
			base.prototype,
			name,
			Object.getOwnPropertyDescriptor(mixin, name)
		);
	}
}