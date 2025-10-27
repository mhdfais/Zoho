import React, { useEffect, useState } from "react";
import LeadsOverviewChart from "@/components/widgetsCharts/LeadsOverviewChart";
import LatestLeads from "@/components/widgetsTables/LatestLeads";
import Schedule from "@/components/widgetsList/Schedule";
import Project from "@/components/widgetsList/Project";
import TeamProgress from "@/components/widgetsList/Progress";
import PaymentRecordChart from "@/components/widgetsCharts/PaymentRecordChart";
import SiteOverviewStatistics from "@/components/widgetsStatistics/SiteOverviewStatistics";
import TasksOverviewChart from "@/components/widgetsCharts/TasksOverviewChart";
import SalesMiscellaneous from "@/components/widgetsMiscellaneous/SalesMiscellaneous";
import PageHeaderDate from "@/components/shared/pageHeader/PageHeaderDate";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import Footer from "@/components/shared/Footer";
import { projectsDataTwo } from "@/utils/fackData/projectsDataTwo";
import { useDispatch } from "react-redux";
// import { checkZohoConnection } from "../redux/zohoSlice";

const Home = () => {
  //   const [zohoConnected, setZohoConnected] = useState(false);

  // const zohoConnected = useSelector((state) => state.zoho.connected);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(checkZohoConnection());
  // }, [dispatch]);

  // const handleConnectZoho = () => {
  //   window.location.href = `${import.meta.env.VITE_BACKEND_URL}/authorize`;
  // };

  return (
    <>
      <PageHeader>
        <PageHeaderDate />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <SiteOverviewStatistics />
          <PaymentRecordChart />
          <SalesMiscellaneous isFooterShow={true} dataList={projectsDataTwo} />
          <TasksOverviewChart />
          <LeadsOverviewChart chartHeight={315} />
          <LatestLeads title={"Latest Leads"} />
          <Schedule title={"Upcoming Schedule"} />
          <Project
            cardYSpaceClass="hrozintioal-card"
            borderShow={true}
            title="Project Status"
          />
          <TeamProgress title={"Team Progress"} footerShow={true} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
