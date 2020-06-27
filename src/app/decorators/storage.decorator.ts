import { StorageService } from '../services/storage.service';
import { StorageType } from '../enums/storage-type.enum';

const isNull = item => item === null || item === undefined;

export function Storage<Type>(key: string, storageType: StorageType = StorageType.Local, defaultValue: Type = null): Function {
  return (target: object, propName: string) => {
    let _val: Type = target[propName];

    Object.defineProperty(
      target,
      propName, {
        get(): Type | unknown {
          if (!isNull(_val)) {
            return _val;
          }

          let item = StorageService.getItem(key);
          if (isNull(item)) {
            item = defaultValue;
            _val = defaultValue;
            StorageService.setItem(key, item, storageType === StorageType.Local);
          }

          return item;
        },
        set(item: Type): void {
          _val = item;
          StorageService.setItem(key, item, storageType === StorageType.Local);
        }
      }
    );
  };
}
