import { NavigationActions } from "react-navigation";

let navigator: any;

export const setNavigator = (nav: any) => {
  navigator = nav;
};

export const navigate = (routeName: any, params: any) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};
