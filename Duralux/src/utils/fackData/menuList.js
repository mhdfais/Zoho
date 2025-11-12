import { id } from "date-fns/locale";

export const menuList = [
  {
    id: 0,
    name: "Home",
    path: "/home",
    icon: "feather-airplay",
    dropdownMenu: [],
  },
  {
    id: 111,
    name: "Sales",
    path: "#",
    icon: "bill-wave",
    dropdownMenu: [
      {
        id: 1,
        name: "Leads",
        path: "/sales/leads",
        subdropdownMenu: false,
      },
      {
        id: 2,
        name: "Contacts",
        path: "/sales/contacts",
        subdropdownMenu: false,
      },
      {
        id: 3,
        name: "Accounts",
        path: "/sales/accounts",
        subdropdownMenu: false,
      },
      {
        id: 4,
        name: "Deals",
        path: "/sales/deals",
        subdropdownMenu: false,
      },
      {
        id: 5,
        name: "Campaigns",
        path: "/sales/campaigns",
        subdropdownMenu: false,
      },
    ],
  },
  {
    id: 1,
    name: "Activities",
    path: "#",
    icon: "activities",
    dropdownMenu: [
      {
        id: 1,
        name: "Tasks",
        path: "/activities/tasks",
        subdropdownMenu: false,
      },
      {
        id: 2,
        name: "Calls",
        path: "/activities/calls",
        subdropdownMenu: false,
      },
      {
        id: 3,
        name: "Meetings",
        path: "/activities/meetings",
        subdropdownMenu: false,
      },
      // {
      //   id: 4,
      //   name: "Timesheets Report",
      //   path: "/reports/timesheets",
      //   subdropdownMenu: false,
      // },
    ],
  },
  {
    id: 2,
    name: "Price Books",
    path: "/priceBooks",
    icon: "price-tag",
    dropdownMenu: [],
  },
  {
    id: 3,
    name: "Products",
    path: "/products",
    icon: "products",
    dropdownMenu: [],
  },
  {
    id: 4,
    name: "Quotes",
    path: "/quotes",
    icon: "quotes",
    dropdownMenu: [],
  },
  {
    id: 5,
    name: "Invoices",
    path: "/invoices",
    icon: "invoices",
    dropdownMenu: [],
  },
  {
    id: 6,
    name: "Sales Orders",
    path: "/salesOrders",
    icon: "sales-order",
    dropdownMenu: [ ],
  },
  {
    id: 7,
    name: "Solutions",
    path: "/solutions",
    icon: "solutions",
    dropdownMenu: [],
  },
  {
    id: 8,
    name: "Purchase Orders",
    path: "/purchaseOrders",
    icon: "purchase-order",
    dropdownMenu: [],
  },
  {
    id: 9,
    name: "Vendors",
    path: "/vendors",
    icon: "vendors",
    dropdownMenu: [],
  },
  {
    id: 10  ,
    name: "Cases",
    path: "/cases",
    icon: "cases",
    dropdownMenu: [],
  },
  {
    id: 11  ,
    name: "Tickets",
    path: "/tickets",
    icon: "tickets",
    dropdownMenu: [],
  },
  // {
  //   id: 9,
  //   name: "settings",
  //   path: "#",
  //   icon: "feather-settings",
  //   dropdownMenu: [
  //     {
  //       id: 1,
  //       name: "Ganeral",
  //       path: "/settings/ganeral",
  //       subdropdownMenu: false,
  //     },
  //     {
  //       id: 2,
  //       name: "SEO",
  //       path: "/settings/seo",
  //       subdropdownMenu: false,
  //     },
  //     {
  //       id: 3,
  //       name: "Tags",
  //       path: "/settings/tags",
  //       subdropdownMenu: false,
  //     },
  //     {
  //       id: 4,
  //       name: "Email",
  //       path: "/settings/email",
  //       subdropdownMenu: false,
  //     },
  //     {
  //       id: 5,
  //       name: "Tasks",
  //       path: "/settings/tasks",
  //       subdropdownMenu: false,
  //     },
  //     {
  //       id: 6,
  //       name: "Leads",
  //       path: "/settings/leads",
  //       subdropdownMenu: false,
  //     },
  //     {
  //       id: 7,
  //       name: "Support",
  //       path: "/settings/Support",
  //       subdropdownMenu: false,
  //     },
  //     {
  //       id: 8,
  //       name: "Finance",
  //       path: "/settings/finance",
  //       subdropdownMenu: false,
  //     },
  //     {
  //       id: 9,
  //       name: "Gateways",
  //       path: "/settings/gateways",
  //       subdropdownMenu: false,
  //     },
  //     {
  //       id: 10,
  //       name: "Customers",
  //       path: "/settings/customers",
  //       subdropdownMenu: false,
  //     },
  //     {
  //       id: 11,
  //       name: "Localization",
  //       path: "/settings/localization",
  //       subdropdownMenu: false,
  //     },
  //     {
  //       id: 12,
  //       name: "reCAPTCHA",
  //       path: "/settings/recaptcha",
  //       subdropdownMenu: false,
  //     },
  //     {
  //       id: 13,
  //       name: "Miscellaneous",
  //       path: "/settings/miscellaneous",
  //       subdropdownMenu: false,
  //     },
  //   ],
  // },
  // {
  //   id: 10,
  //   name: "authentication",
  //   path: "#",
  //   icon: "feather-power",
  //   dropdownMenu: [
  //     {
  //       id: 1,
  //       name: "login",
  //       path: "#",
  //       subdropdownMenu: [
  //         {
  //           id: 1,
  //           name: "Cover",
  //           path: "/authentication/login/cover",
  //         },
  //         {
  //           id: 2,
  //           name: "Minimal",
  //           path: "/authentication/login/minimal",
  //         },
  //         {
  //           id: 3,
  //           name: "Creative",
  //           path: "/authentication/login/creative",
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       name: "register",
  //       path: "#",
  //       subdropdownMenu: [
  //         {
  //           id: 1,
  //           name: "Cover",
  //           path: "/authentication/register/cover",
  //         },
  //         {
  //           id: 2,
  //           name: "Minimal",
  //           path: "/authentication/register/minimal",
  //         },
  //         {
  //           id: 3,
  //           name: "Creative",
  //           path: "/authentication/register/creative",
  //         },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       name: "Error 404",
  //       path: "#",
  //       subdropdownMenu: [
  //         {
  //           id: 1,
  //           name: "Cover",
  //           path: "/authentication/404/cover",
  //         },
  //         {
  //           id: 2,
  //           name: "Minimal",
  //           path: "/authentication/404/minimal",
  //         },
  //         {
  //           id: 3,
  //           name: "Creative",
  //           path: "/authentication/404/creative",
  //         },
  //       ],
  //     },
  //     {
  //       id: 4,
  //       name: "Reset Pass",
  //       path: "#",
  //       subdropdownMenu: [
  //         {
  //           id: 1,
  //           name: "Cover",
  //           path: "/authentication/reset/cover",
  //         },
  //         {
  //           id: 2,
  //           name: "Minimal",
  //           path: "/authentication/reset/minimal",
  //         },
  //         {
  //           id: 3,
  //           name: "Creative",
  //           path: "/authentication/reset/creative",
  //         },
  //       ],
  //     },
  //     {
  //       id: 5,
  //       name: "Verify OTP",
  //       path: "#",
  //       subdropdownMenu: [
  //         {
  //           id: 1,
  //           name: "Cover",
  //           path: "/authentication/verify/cover",
  //         },
  //         {
  //           id: 2,
  //           name: "Minimal",
  //           path: "/authentication/verify/minimal",
  //         },
  //         {
  //           id: 3,
  //           name: "Creative",
  //           path: "/authentication/verify/creative",
  //         },
  //       ],
  //     },
  //     {
  //       id: 6,
  //       name: "Maintenance",
  //       path: "#",
  //       subdropdownMenu: [
  //         {
  //           id: 1,
  //           name: "Cover",
  //           path: "/authentication/maintenance/cover",
  //         },
  //         {
  //           id: 2,
  //           name: "Minimal",
  //           path: "/authentication/maintenance/minimal",
  //         },
  //         {
  //           id: 3,
  //           name: "Creative",
  //           path: "/authentication/maintenance/creative",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 11,
  //   name: "Help Center",
  //   path: "#",
  //   icon: "feather-life-buoy",
  //   dropdownMenu: [
  //     {
  //       id: 1,
  //       name: "Support",
  //       path: "https://themeforest.net/user/theme_ocean",
  //       subdropdownMenu: false,
  //     },
  //     {
  //       id: 2,
  //       name: "KnowledgeBase",
  //       path: "/help/knowledgebase",
  //       subdropdownMenu: false,
  //     },
  //     {
  //       id: 3,
  //       name: "Documentations",
  //       path: "/documentations",
  //       subdropdownMenu: false,
  //     },
  //   ],
  // },
];
