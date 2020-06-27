export function OutsideZone(targetClass, functionName: string, descriptor) {
  const source = descriptor.value;

  descriptor.value = function(...data): Function {
    if (!this.ngZone) {
      throw new Error("Class with 'OutsideZone' decorator should have 'ngZone' class property with 'NgZone' class.");
    }

    return this.ngZone.runOutsideAngular(() => source.call(this, ...data));
  };

  return descriptor;
}
