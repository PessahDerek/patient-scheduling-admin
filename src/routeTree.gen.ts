/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/auth'
import { Route as AboutImport } from './routes/about'
import { Route as applayoutImport } from './routes/(app)/__layout'
import { Route as applayoutIndexImport } from './routes/(app)/__layout/index'
import { Route as applayoutSchedulesImport } from './routes/(app)/__layout/schedules'
import { Route as applayoutLogoutImport } from './routes/(app)/__layout/logout'
import { Route as applayoutDoctorsImport } from './routes/(app)/__layout/doctors'
import { Route as applayoutAppointmentsImport } from './routes/(app)/__layout/appointments'

// Create Virtual Routes

const appImport = createFileRoute('/(app)')()

// Create/Update Routes

const appRoute = appImport.update({
  id: '/(app)',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const applayoutRoute = applayoutImport.update({
  id: '/__layout',
  getParentRoute: () => appRoute,
} as any)

const applayoutIndexRoute = applayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => applayoutRoute,
} as any)

const applayoutSchedulesRoute = applayoutSchedulesImport.update({
  id: '/schedules',
  path: '/schedules',
  getParentRoute: () => applayoutRoute,
} as any)

const applayoutLogoutRoute = applayoutLogoutImport.update({
  id: '/logout',
  path: '/logout',
  getParentRoute: () => applayoutRoute,
} as any)

const applayoutDoctorsRoute = applayoutDoctorsImport.update({
  id: '/doctors',
  path: '/doctors',
  getParentRoute: () => applayoutRoute,
} as any)

const applayoutAppointmentsRoute = applayoutAppointmentsImport.update({
  id: '/appointments',
  path: '/appointments',
  getParentRoute: () => applayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/(app)': {
      id: '/(app)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appImport
      parentRoute: typeof rootRoute
    }
    '/(app)/__layout': {
      id: '/(app)/__layout'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof applayoutImport
      parentRoute: typeof appRoute
    }
    '/(app)/__layout/appointments': {
      id: '/(app)/__layout/appointments'
      path: '/appointments'
      fullPath: '/appointments'
      preLoaderRoute: typeof applayoutAppointmentsImport
      parentRoute: typeof applayoutImport
    }
    '/(app)/__layout/doctors': {
      id: '/(app)/__layout/doctors'
      path: '/doctors'
      fullPath: '/doctors'
      preLoaderRoute: typeof applayoutDoctorsImport
      parentRoute: typeof applayoutImport
    }
    '/(app)/__layout/logout': {
      id: '/(app)/__layout/logout'
      path: '/logout'
      fullPath: '/logout'
      preLoaderRoute: typeof applayoutLogoutImport
      parentRoute: typeof applayoutImport
    }
    '/(app)/__layout/schedules': {
      id: '/(app)/__layout/schedules'
      path: '/schedules'
      fullPath: '/schedules'
      preLoaderRoute: typeof applayoutSchedulesImport
      parentRoute: typeof applayoutImport
    }
    '/(app)/__layout/': {
      id: '/(app)/__layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof applayoutIndexImport
      parentRoute: typeof applayoutImport
    }
  }
}

// Create and export the route tree

interface applayoutRouteChildren {
  applayoutAppointmentsRoute: typeof applayoutAppointmentsRoute
  applayoutDoctorsRoute: typeof applayoutDoctorsRoute
  applayoutLogoutRoute: typeof applayoutLogoutRoute
  applayoutSchedulesRoute: typeof applayoutSchedulesRoute
  applayoutIndexRoute: typeof applayoutIndexRoute
}

const applayoutRouteChildren: applayoutRouteChildren = {
  applayoutAppointmentsRoute: applayoutAppointmentsRoute,
  applayoutDoctorsRoute: applayoutDoctorsRoute,
  applayoutLogoutRoute: applayoutLogoutRoute,
  applayoutSchedulesRoute: applayoutSchedulesRoute,
  applayoutIndexRoute: applayoutIndexRoute,
}

const applayoutRouteWithChildren = applayoutRoute._addFileChildren(
  applayoutRouteChildren,
)

interface appRouteChildren {
  applayoutRoute: typeof applayoutRouteWithChildren
}

const appRouteChildren: appRouteChildren = {
  applayoutRoute: applayoutRouteWithChildren,
}

const appRouteWithChildren = appRoute._addFileChildren(appRouteChildren)

export interface FileRoutesByFullPath {
  '/about': typeof AboutRoute
  '/auth': typeof AuthRoute
  '/': typeof applayoutIndexRoute
  '/appointments': typeof applayoutAppointmentsRoute
  '/doctors': typeof applayoutDoctorsRoute
  '/logout': typeof applayoutLogoutRoute
  '/schedules': typeof applayoutSchedulesRoute
}

export interface FileRoutesByTo {
  '/about': typeof AboutRoute
  '/auth': typeof AuthRoute
  '/appointments': typeof applayoutAppointmentsRoute
  '/doctors': typeof applayoutDoctorsRoute
  '/logout': typeof applayoutLogoutRoute
  '/schedules': typeof applayoutSchedulesRoute
  '/': typeof applayoutIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/about': typeof AboutRoute
  '/auth': typeof AuthRoute
  '/(app)': typeof appRouteWithChildren
  '/(app)/__layout': typeof applayoutRouteWithChildren
  '/(app)/__layout/appointments': typeof applayoutAppointmentsRoute
  '/(app)/__layout/doctors': typeof applayoutDoctorsRoute
  '/(app)/__layout/logout': typeof applayoutLogoutRoute
  '/(app)/__layout/schedules': typeof applayoutSchedulesRoute
  '/(app)/__layout/': typeof applayoutIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/about'
    | '/auth'
    | '/'
    | '/appointments'
    | '/doctors'
    | '/logout'
    | '/schedules'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/about'
    | '/auth'
    | '/appointments'
    | '/doctors'
    | '/logout'
    | '/schedules'
    | '/'
  id:
    | '__root__'
    | '/about'
    | '/auth'
    | '/(app)'
    | '/(app)/__layout'
    | '/(app)/__layout/appointments'
    | '/(app)/__layout/doctors'
    | '/(app)/__layout/logout'
    | '/(app)/__layout/schedules'
    | '/(app)/__layout/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AboutRoute: typeof AboutRoute
  AuthRoute: typeof AuthRoute
  appRoute: typeof appRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AboutRoute: AboutRoute,
  AuthRoute: AuthRoute,
  appRoute: appRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/about",
        "/auth",
        "/(app)"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/auth": {
      "filePath": "auth.tsx"
    },
    "/(app)": {
      "filePath": "(app)",
      "children": [
        "/(app)/__layout"
      ]
    },
    "/(app)/__layout": {
      "filePath": "(app)/__layout.tsx",
      "parent": "/(app)",
      "children": [
        "/(app)/__layout/appointments",
        "/(app)/__layout/doctors",
        "/(app)/__layout/logout",
        "/(app)/__layout/schedules",
        "/(app)/__layout/"
      ]
    },
    "/(app)/__layout/appointments": {
      "filePath": "(app)/__layout/appointments.tsx",
      "parent": "/(app)/__layout"
    },
    "/(app)/__layout/doctors": {
      "filePath": "(app)/__layout/doctors.tsx",
      "parent": "/(app)/__layout"
    },
    "/(app)/__layout/logout": {
      "filePath": "(app)/__layout/logout.tsx",
      "parent": "/(app)/__layout"
    },
    "/(app)/__layout/schedules": {
      "filePath": "(app)/__layout/schedules.tsx",
      "parent": "/(app)/__layout"
    },
    "/(app)/__layout/": {
      "filePath": "(app)/__layout/index.tsx",
      "parent": "/(app)/__layout"
    }
  }
}
ROUTE_MANIFEST_END */
