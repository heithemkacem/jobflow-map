export class ReactivityUtils {
	public static getUnReactified<T>(obj: T): T {
		try {
			const copy = JSON.parse(JSON.stringify(obj));

			return copy;
		} catch (e) {
			console.error("An invalid object was passed into unreactify!");
			return {} as any;
		}
	}
}
