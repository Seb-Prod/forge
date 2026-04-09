import { Route } from "react-router-dom";
import type { AppRoute } from "./routes.types";

export function renderRoutes(routes: AppRoute[]) {
  return routes.map((route, index) => {
    const key = route.to ?? `index-${index}`;

    if (route.index) {
      return <Route key={key} index element={route.element} />;
    }

    // Route normale
    return (
      <Route key={key} path={route.to} element={route.element}>
        {route.children && renderRoutes(route.children)}
      </Route>
    );
  });
}
