import AccountTable from "@/components/account/AccountTable";
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
