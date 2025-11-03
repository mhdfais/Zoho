import express from "express";
import {
  createAccount,
  deleteAccount,
  editAccount,
  getAccountbyId,
  getAccounts,
} from "../controllers/accountsController";
import {
  createLead,
  deleteLead,
  getLeadById,
  getLeads,
  updateLead,
} from "../controllers/leadsController";
import {
  createContact,
  deleteContact,
  editContact,
  getAllContacts,
  getContactById,
} from "../controllers/contactController";
import {
  createDeal,
  deleteDeal,
  editDeal,
  getAllDeals,
  getDealById,
} from "../controllers/dealsController";
import {
  createCampaign,
  deleteCampaign,
  editCampaign,
  getAllCampaigns,
  getCampaignById,
} from "../controllers/campaignController";
import {
  createTask,
  deleteTask,
  editTask,
  getAllTasks,
  getTaskById,
} from "../controllers/taskController";
import {
  createCall,
  deleteCall,
  editCall,
  getAllCalls,
  getCallById,
} from "../controllers/callsController";
import {
  createPriceBook,
  deletePriceBook,
  editPriceBook,
  getAllPriceBooks,
  getPriceBookById,
} from "../controllers/priceBooksController";
import {
  createVendor,
  deleteVendor,
  editVendor,
  getAllVendors,
  getVendorById,
} from "../controllers/vendorController";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productsController";
import {
  createQuote,
  deleteQuote,
  editQuote,
  getAllQuotes,
  getQuoteById,
} from "../controllers/quotesController";
import {
  createInvoice,
  deleteInvoice,
  editInvoice,
  getAllInvoices,
  getInvoiceById,
} from "../controllers/invoicesController";
import {
  createSalesOrder,
  deleteSalesOrder,
  editSalesOrder,
  getAllSalesOrders,
  getSalesOrderById,
} from "../controllers/salesOrderController";
import {
  createSolution,
  deleteSolution,
  editSolution,
  getAllSolutions,
  getSolutionById,
} from "../controllers/solutionsController";
import {
  createPurchaseOrder,
  deletePurchaseOrder,
  editPurchaseOrder,
  getAllPurchaseOrders,
  getPurchaseOrderById,
} from "../controllers/purchaseOrderController";
import {
  createCase,
  deleteCase,
  editCase,
  getAllCases,
  getCaseById,
} from "../controllers/casesController";
import {
  createTicket,
  deleteTicket,
  editTicket,
  getAllTickets,
  getTicketById,
} from "../controllers/TicketsController";

const router = express.Router();

//  accounts
router.route("/accounts").get(getAccounts).post(createAccount);
router
  .route("/accounts/:id")
  .delete(deleteAccount)
  .put(editAccount)
  .get(getAccountbyId);

//  leads
router.route("/leads").get(getLeads).post(createLead);
router.route("/leads/:id").get(getLeadById).put(updateLead).delete(deleteLead);

// contacts
router.route("/contacts").get(getAllContacts).post(createContact);
router
  .route("/contacts/:id")
  .get(getContactById)
  .put(editContact)
  .delete(deleteContact);

// deals
router.route("/deals").get(getAllDeals).post(createDeal);
router.route("/deals/:id").get(getDealById).put(editDeal).delete(deleteDeal);

// campaigns
router.route("/campaigns").get(getAllCampaigns).post(createCampaign);
router
  .route("/campaigns/:id")
  .get(getCampaignById)
  .put(editCampaign)
  .delete(deleteCampaign);

// tasks
router.route("/tasks").get(getAllTasks).post(createTask);
router.route("/tasks/:id").get(getTaskById).put(editTask).delete(deleteTask);

// calls
router.route("/calls").get(getAllCalls).post(createCall);
router.route("/calls/:id").get(getCallById).put(editCall).delete(deleteCall);

// books price
router.route("/pricebooks").get(getAllPriceBooks).post(createPriceBook);
router
  .route("/pricebooks/:id")
  .get(getPriceBookById)
  .put(editPriceBook)
  .delete(deletePriceBook);

// vendors
router.route("/vendors").get(getAllVendors).post(createVendor);
router
  .route("/vendors/:id")
  .get(getVendorById)
  .put(editVendor)
  .delete(deleteVendor);

// products
router.route("/products").get(getAllProducts).post(createProduct);
router
  .route("/products/:id")
  .get(getProductById)
  .put(editProduct)
  .delete(deleteProduct);

// quotes
router.route("/quotes").get(getAllQuotes).post(createQuote);
router
  .route("/quotes/:id")
  .get(getQuoteById)
  .put(editQuote)
  .delete(deleteQuote);

// invoices
router.route("/invoices").get(getAllInvoices).post(createInvoice);
router
  .route("/invoices/:id")
  .get(getInvoiceById)
  .put(editInvoice)
  .delete(deleteInvoice);

// sales orders
router.route("/salesorders").get(getAllSalesOrders).post(createSalesOrder);
router
  .route("/salesorders/:id")
  .get(getSalesOrderById)
  .put(editSalesOrder)
  .delete(deleteSalesOrder);

// solutions
router.route("/solutions").get(getAllSolutions).post(createSolution);
router
  .route("/solutions/:id")
  .get(getSolutionById)
  .put(editSolution)
  .delete(deleteSolution);

// purchase orders
router
  .route("/purchaseorders")
  .get(getAllPurchaseOrders)
  .post(createPurchaseOrder);
router
  .route("/purchaseorders/:id")
  .get(getPurchaseOrderById)
  .put(editPurchaseOrder)
  .delete(deletePurchaseOrder);

// cases
router.route("/cases").get(getAllCases).post(createCase);
router.route("/cases/:id").get(getCaseById).put(editCase).delete(deleteCase);

// desk
router.route("/tickets").get(getAllTickets).post(createTicket);
router
  .route("/tickets/:id")
  .get(getTicketById)
  .put(editTicket)
  .delete(deleteTicket);

export default router;
