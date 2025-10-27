import AccountTable from "@/components/account/accountTable";
import CustomersTable from "@/components/customers/CustomersTable";
import React from "react";

const AccountsList = () => {
  return (
    <>
      <div className="main-content">
        <div className="row">
          <AccountTable />
        </div>
      </div>
    </>
  );
};

export default AccountsList;
