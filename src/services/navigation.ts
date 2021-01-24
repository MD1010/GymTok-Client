import { navigationRef } from "../App";

export namespace Navigator {
  export function navigate(name: string, params?: any) {
    navigationRef.current?.navigate(name, params);
  }
  export function goBack() {
    navigationRef.current?.goBack();
  }
}
