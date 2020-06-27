import { SimpleChanges } from '@angular/core';

import { ChangesStrategy } from '@core/enums';

export function TrackChanges<Type>(key: string, methodName: string, strategy: ChangesStrategy = ChangesStrategy.Each): Function {
  return function(targetClass, functionName: string, descriptor): Function {
    const source = descriptor.value;

    descriptor.value = function(changes: SimpleChanges): Function {

      if (changes && changes[key]
        && changes[key].currentValue !== undefined) {
        const isFirstChange = changes[key].firstChange;

        if (strategy === ChangesStrategy.Each ||
           (strategy === ChangesStrategy.First    && isFirstChange) ||
           (strategy === ChangesStrategy.NonFirst && !isFirstChange)) {
          targetClass[methodName].call(this, changes[key].currentValue as Type);
        }
      }

      return source.call(this, changes);
    };

    return descriptor;
  };
}
