import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/root";
import Home from "../pages/home";
import Analytics from "../pages/analytics";
import ReportsSales from "../pages/reports-sales";
import ReportsLeads from "../pages/reports-leads";
import ReportsProject from "../pages/reports-project";
import AppsChat from "../pages/apps-chat";
import LayoutApplications from "../layout/layoutApplications";
import AppsEmail from "../pages/apps-email";
import ReportsTimesheets from "../pages/reports-timesheets";
import LoginCover from "../pages/login-cover";
import AppsTasks from "../pages/apps-tasks";
import AppsNotes from "../pages/apps-notes";
import AppsCalender from "../pages/apps-calender";
import AppsStorage from "../pages/apps-storage";
import Proposalist from "../pages/proposal-list";
import CustomersList from "../pages/customers-list";
import ProposalView from "../pages/proposal-view";
import ProposalEdit from "../pages/proposal-edit";
// import LeadsList from "../pages/leadsList";
import CustomersView from "../pages/customers-view";
import CustomersCreate from "../pages/customers-create";
import ProposalCreate from "../pages/proposal-create";
import LeadsView from "../pages/LeadDetails";
import LeadsCreate from "../pages/leads-create";
import PaymentList from "../pages/payment-list";
import PaymentView from "../pages/payment-view/";
import PaymentCreate from "../pages/payment-create";
import ProjectsList from "../pages/projects-list";
import ProjectsView from "../pages/projects-view";
import ProjectsCreate from "../pages/projects-create";
import SettingsGaneral from "../pages/settings-ganeral";
import LayoutSetting from "../layout/layoutSetting";
import SettingsSeo from "../pages/settings-seo";
import SettingsTags from "../pages/settings-tags";
import SettingsEmail from "../pages/settings-email";
import SettingsTasks from "../pages/settings-tasks";
import SettingsLeads from "../pages/settings-leads";
import SettingsMiscellaneous from "../pages/settings-miscellaneous";
import SettingsRecaptcha from "../pages/settings-recaptcha";
import SettingsLocalization from "../pages/settings-localization";
import SettingsCustomers from "../pages/settings-customers";
import SettingsGateways from "../pages/settings-gateways";
import SettingsFinance from "../pages/settings-finance";
import SettingsSupport from "../pages/settings-support";
import LayoutAuth from "../layout/layoutAuth";
import LoginMinimal from "../pages/login-minimal";
import LoginCreative from "../pages/login-creative";
import RegisterCover from "../pages/register-cover";
import RegisterMinimal from "../pages/register-minimal";
import RegisterCreative from "../pages/register-creative";
import ResetCover from "../pages/reset-cover";
import ResetMinimal from "../pages/reset-minimal";
import ResetCreative from "../pages/reset-creative";
import ErrorCover from "../pages/error-cover";
import ErrorCreative from "../pages/error-creative";
import ErrorMinimal from "../pages/error-minimal";
import OtpCover from "../pages/otp-cover";
import OtpMinimal from "../pages/otp-minimal";
import OtpCreative from "../pages/otp-creative";
import MaintenanceCover from "../pages/maintenance-cover";
import MaintenanceMinimal from "../pages/maintenance-minimal";
import MaintenanceCreative from "../pages/maintenance-creative";
import HelpKnowledgebase from "../pages/help-knowledgebase";
import WidgetsLists from "../pages/widgets-lists";
import WidgetsTables from "../pages/widgets-tables";
import WidgetsCharts from "../pages/widgets-charts";
import WidgetsStatistics from "../pages/widgets-statistics";
import WidgetsMiscellaneous from "../pages/widgets-miscellaneous";
import Login from "../pages/Login";
import ProtectedRoute from "../Protected route/ProtectedRoute";
import PublicRoute from "../Public route/PublicRoute";
import AccountCreate from "../pages/AccountCreate";
import AccountEdit from "@/components/account/AccountEdit";
import AccountView from "../pages/AccountView";
import LeadCreate from "../pages/LeadCreate";
import LeadEdit from "@/components/leads/LeadEdit";
import ContactCreate from "../pages/ContactCreate";
import ContactEdit from "@/components/contact/ContactEdit";
import ContactView from "../pages/Contacts";
import DealCreate from "../pages/DealCreate";
import DealEdit from "@/components/Deals/DealEdit";
import Leads from "../pages/Leads";
import DealView from "../pages/DealView";
import CampaignCreate from "../pages/CampaignCreate";
import Tasks from "../pages/Tasks";
import Calls from "../pages/Calls";
import Meetings from "../pages/Meetings";
import Contacts from "../pages/Contacts";
import Accounts from "../pages/Accounts";
import Deals from "../pages/Deals";
import Campaigns from "../pages/Campaigns";
import PriceBooks from "../pages/PriceBooks";
import Products from "../pages/Products";
import Quotes from "../pages/Quotes";
import Invoices from "../pages/Invoices";
import SalesOrders from "../pages/SalesOrders";
import Solutions from "../pages/Solutions";
import PurchaseOrders from "../pages/PurchaseOrders";
import Vendors from "../pages/Vendors";
import Cases from "../pages/Cases";
import Tickets from "../pages/Tickets";
import LeadDetails from "../pages/LeadDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: "/sales/accounts", element: <Accounts /> },
      { path: "/sales/create-account", element: <AccountCreate /> },
      { path: "/sales/edit-account/:id", element: <AccountEdit /> },
      { path: "/sales/account/:id", element: <AccountView /> },
      { path: "/sales/leads", element: <Leads /> },
      { path: "/sales/create-lead", element: <LeadCreate /> },
      { path: "/sales/edit-lead/:id", element: <LeadEdit /> },
      { path: "/sales/lead/:id", element: <LeadDetails/>  },
      { path: "/sales/contacts", element: <Contacts /> },
      { path: "/sales/create-contact", element: <ContactCreate /> },
      { path: "/sales/edit-contact/:id", element: <ContactEdit /> },
      { path: "/sales/contact/:id", element: <ContactView /> },
      { path: "/sales/deals", element: <Deals /> },
      { path: "/sales/create-deal", element: <DealCreate /> },
      { path: "/sales/edit-deal/:id", element: <DealEdit /> },
      { path: "/sales/deal/:id", element: <DealView /> },
      { path: "/sales/campaigns", element: <Campaigns /> },
      { path: "/sales/create-campaign", element: <CampaignCreate /> },
      { path: "/activities/tasks", element: <Tasks /> },
      { path: "/activities/calls", element: <Calls /> },
      { path: "/activities/meetings", element: <Meetings /> },
      { path: "/priceBooks", element: <PriceBooks /> },
      { path: "/products", element: <Products /> },
      { path: "/quotes", element: <Quotes /> },
      { path: "/invoices", element: <Invoices /> },
      { path: "/salesOrders", element: <SalesOrders /> },
      { path: "/solutions", element: <Solutions /> },
      { path: "/purchaseOrders", element: <PurchaseOrders /> },
      {path:'/vendors',element:<Vendors/>},
      {path:'/cases',element:<Cases/>},
      {path:'/tickets',element:<Tickets/>},

      {
        path: "/dashboards/analytics",
        element: <Analytics />,
      },
      {
        path: "/reports/sales",
        element: <ReportsSales />,
      },
      {
        path: "/reports/leads",
        element: <ReportsLeads />,
      },
      {
        path: "/reports/project",
        element: <ReportsProject />,
      },
      {
        path: "/reports/timesheets",
        element: <ReportsTimesheets />,
      },
      {
        path: "/proposal/list",
        element: <Proposalist />,
      },
      {
        path: "/proposal/view",
        element: <ProposalView />,
      },
      {
        path: "/proposal/edit",
        element: <ProposalEdit />,
      },
      {
        path: "/proposal/create",
        element: <ProposalCreate />,
      },
      {
        path: "/payment/list",
        element: <PaymentList />,
      },
      {
        path: "/payment/view",
        element: <PaymentView />,
      },
      {
        path: "/payment/create",
        element: <PaymentCreate />,
      },
      {
        path: "/customers/list",
        element: <CustomersList />,
      },
      {
        path: "/customers/view",
        element: <CustomersView />,
      },
      {
        path: "/customers/create",
        element: <CustomersCreate />,
      },
      // {
      //   path: "/leads/list",
      //   element: <LeadsList />,
      // },
      {
        path: "/leads/view",
        element: <LeadsView />,
      },
      {
        path: "/leads/create",
        element: <LeadsCreate />,
      },
      {
        path: "/projects/list",
        element: <ProjectsList />,
      },
      {
        path: "/projects/view",
        element: <ProjectsView />,
      },
      {
        path: "/projects/create",
        element: <ProjectsCreate />,
      },
      {
        path: "/widgets/lists",
        element: <WidgetsLists />,
      },
      {
        path: "/widgets/tables",
        element: <WidgetsTables />,
      },
      {
        path: "/widgets/charts",
        element: <WidgetsCharts />,
      },
      {
        path: "/widgets/statistics",
        element: <WidgetsStatistics />,
      },
      {
        path: "/widgets/miscellaneous",
        element: <WidgetsMiscellaneous />,
      },
      {
        path: "/help/knowledgebase",
        element: <HelpKnowledgebase />,
      },
    ],
  },
  {
    path: "/",
    element: <LayoutApplications />,
    children: [
      {
        path: "/applications/chat",
        element: <AppsChat />,
      },
      {
        path: "/applications/email",
        element: <AppsEmail />,
      },
      {
        path: "/applications/tasks",
        element: <AppsTasks />,
      },
      {
        path: "/applications/notes",
        element: <AppsNotes />,
      },
      {
        path: "/applications/calender",
        element: <AppsCalender />,
      },
      {
        path: "/applications/storage",
        element: <AppsStorage />,
      },
    ],
  },
  {
    path: "/",
    element: <LayoutSetting />,
    children: [
      {
        path: "/settings/ganeral",
        element: <SettingsGaneral />,
      },
      {
        path: "/settings/seo",
        element: <SettingsSeo />,
      },
      {
        path: "/settings/tags",
        element: <SettingsTags />,
      },
      {
        path: "/settings/email",
        element: <SettingsEmail />,
      },
      {
        path: "/settings/tasks",
        element: <SettingsTasks />,
      },
      {
        path: "/settings/leads",
        element: <SettingsLeads />,
      },
      {
        path: "/settings/Support",
        element: <SettingsSupport />,
      },
      {
        path: "/settings/finance",
        element: <SettingsFinance />,
      },
      {
        path: "/settings/gateways",
        element: <SettingsGateways />,
      },
      {
        path: "/settings/customers",
        element: <SettingsCustomers />,
      },
      {
        path: "/settings/localization",
        element: <SettingsLocalization />,
      },
      {
        path: "/settings/recaptcha",
        element: <SettingsRecaptcha />,
      },
      {
        path: "/settings/miscellaneous",
        element: <SettingsMiscellaneous />,
      },
    ],
  },
  {
    path: "/",
    element: <LayoutAuth />,
    children: [
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/authentication/login/cover",
        element: <LoginCover />,
      },
      {
        path: "/authentication/login/minimal",
        element: <LoginMinimal />,
      },
      {
        path: "/authentication/login/creative",
        element: <LoginCreative />,
      },
      {
        path: "/authentication/register/cover",
        element: <RegisterCover />,
      },
      {
        path: "/authentication/register/minimal",
        element: <RegisterMinimal />,
      },
      {
        path: "/authentication/register/creative",
        element: <RegisterCreative />,
      },
      {
        path: "/authentication/reset/cover",
        element: <ResetCover />,
      },
      {
        path: "/authentication/reset/minimal",
        element: <ResetMinimal />,
      },
      {
        path: "/authentication/reset/creative",
        element: <ResetCreative />,
      },
      {
        path: "/authentication/404/cover",
        element: <ErrorCover />,
      },
      {
        path: "/authentication/404/minimal",
        element: <ErrorMinimal />,
      },
      {
        path: "/authentication/404/creative",
        element: <ErrorCreative />,
      },
      {
        path: "/authentication/verify/cover",
        element: <OtpCover />,
      },
      {
        path: "/authentication/verify/minimal",
        element: <OtpMinimal />,
      },
      {
        path: "/authentication/verify/creative",
        element: <OtpCreative />,
      },
      {
        path: "/authentication/maintenance/cover",
        element: <MaintenanceCover />,
      },
      {
        path: "/authentication/maintenance/minimal",
        element: <MaintenanceMinimal />,
      },
      {
        path: "/authentication/maintenance/creative",
        element: <MaintenanceCreative />,
      },
    ],
  },
]);
