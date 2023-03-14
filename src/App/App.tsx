import React, { createContext, useContext } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import QueryStore from "store/QueryStore/QueryStore";
import RecipesStore from "store/RecipesStore/RecipesStore";

import DetailRecipe from "./pages/DetailRecipe/DetailRecipe";
import Favourites from "./pages/Favourites/Favourites";
import RecipesList from "./pages/RecipesList/RecipesList";

export const recipesStore = new RecipesStore();
export const queryStore = new QueryStore();

const AppContext = createContext({
  recipesStore,
  queryStore,
});
const Provider = AppContext.Provider;
export const useAppContext = () => useContext(AppContext);

function App() {
  return (
    <Provider value={{ recipesStore, queryStore }}>
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
