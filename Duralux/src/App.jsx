import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./route/router";
import "react-quill/dist/quill.snow.css";
import "react-circular-progressbar/dist/styles.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datetime/css/react-datetime.css";
import NavigationProvider from "./contentApi/navigationProvider";
import SideBarToggleProvider from "./contentApi/sideBarToggleProvider";
import ThemeCustomizer from "./components/shared/ThemeCustomizer";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store";
import { checkZohoConnection } from "./redux/zohoSlice";
import { Toaster } from "react-hot-toast";

const App = () => {
  const AppWrapper = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(checkZohoConnection()); 
    }, [dispatch]);

    return <RouterProvider router={router} />;
  };
  return (
    <>
    <Toaster position="bottom-right" />
      <Provider store={store}>
        <NavigationProvider>
          <SideBarToggleProvider>
            <AppWrapper />
          </SideBarToggleProvider>
        </NavigationProvider>
        <ThemeCustomizer />
      </Provider>
    </>
  );
};

export default App;
