import React, { createContext, useContext } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { rootStore } from "store/RootStore/RootStore";

import DetailRecipe from "./pages/DetailRecipe/DetailRecipe";
import Favourites from "./pages/Favourites/Favourites";
import RecipesList from "./pages/RecipesList/RecipesList";

const AppContext = createContext({
  rootStore,
});
const Provider = AppContext.Provider;
export const useAppContext = () => useContext(AppContext);

function App() {
  return (
    <Provider value={{ rootStore }}>
      <div className="page">
        <Routes>
          <Route path="/recipes" element={<RecipesList />} />
          <Route path="/recipe/:id" element={<DetailRecipe />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="*" element={<Navigate to="/recipes" replace />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
