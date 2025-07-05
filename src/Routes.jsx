import { Routes as ReactRoutes, Route } from "react-router-dom";
import { routes } from "@/constants/routes";

function buildRoutes(routeList, elements) {
  for (const route of routeList) {
    elements.push(<Route key={route.path} path={route.path} element={route.element} />);
    if (route.children) buildRoutes(route.children, elements);
  }
}

export function Routes() {
  const routeElements = [];
  buildRoutes(routes, routeElements);
  return <ReactRoutes>{routeElements}</ReactRoutes>;
}
