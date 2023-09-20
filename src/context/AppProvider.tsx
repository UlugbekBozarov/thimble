import { FC, ReactNode } from "react";

import AppContext from "./AppContext";
import useApp from "./useApp";

interface IAppProvider {
  children?: ReactNode;
}
const AppProvider: FC<IAppProvider> = ({ children }) => {
  const store = useApp();

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export default AppProvider;
