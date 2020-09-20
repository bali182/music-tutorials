import { isNil } from 'lodash'
import { RouteDescriptor } from './routes'

export function getQualifiedId(combinedId: string, id: string): string {
  return isNil(combinedId) ? `/${id}` : `${combinedId}/${id}`
}

export function withQualifiedIds(combinedId: string, route: RouteDescriptor): RouteDescriptor {
  const id = getQualifiedId(combinedId, route.id)
  return {
    ...route,
    id,
    children: isNil(route.children) ? null : route.children.map((child) => withQualifiedIds(id, child)),
  }
}

export function allWithQualifiedIds(routes: RouteDescriptor[]): RouteDescriptor[] {
  return routes.map((route) => withQualifiedIds(null, route))
}

export function flattenRoute(route: RouteDescriptor, routes: RouteDescriptor[]): RouteDescriptor[] {
  routes.push(route)
  if (!isNil(route.children)) {
    route.children.forEach((child) => flattenRoute(child, routes))
  }
  return routes
}

export function flattenRoutes(routes: RouteDescriptor[]): RouteDescriptor[] {
  const flatRoutes: RouteDescriptor[] = []
  routes.forEach((route) => flattenRoute(route, flatRoutes))
  return flatRoutes
}
