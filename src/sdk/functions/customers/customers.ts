import { http } from "../../config/http-client";

function validateEmail(email) {
  if (isNaN(email)) {
    if (email.length === 1 && email[0] === "+") {
      return false;
    }
    return true;
  } else {
    return false;
  }
}

const getCustomersBySearch = async (searchValue) => {
  var searchCriteria = searchValue || null;
  const paramName = validateEmail(searchCriteria) ? "email" : "msisdn";

  if (searchCriteria[0] === "+") {
    searchCriteria = "%2B" + searchCriteria.substring(1);
  }

  return await http.get(`/customers?${paramName}=${searchCriteria}`, {}, 2);
};

const getLogs = async (id) => {
  return await http.get(`/transactions/customer/${id}`);
};

const getNotes = async (id) => {
  return await http.get(`/customers/${id}/notes`);
};

type PostNotesProps = {
  content: string;
  customerId: string;
};
const postNotes = async (data: PostNotesProps) => {
  return await http.post(`/customers/${data.customerId}/notes`, data);
};

interface GetBillingProps {
  id: string;
  offset?: string;
}
const getBilling = async ({ id, offset }: GetBillingProps) => {
  return await http.get(
    `/iot-invoices/invoices/${id}${offset ? `?offset=${offset}` : ``}`
  );
};

interface GetInvoiceProps {
  id: string;
  billingId: string;
}
const getInvoice = async ({ id, billingId }: GetInvoiceProps) => {
  return await http.get(
    `/iot-invoices/invoices/invoiceCopy/${id}/${billingId}`,
    {
      responseType: "blob",
    }
  );
};

const getCustomerDevices = async (id) => {
  return await http.get(`/customers/${id}`);
};

export default {
  getCustomersBySearch,
  getLogs,
  getNotes,
  getBilling,
  postNotes,
  getCustomerDevices,
  getInvoice,
};
