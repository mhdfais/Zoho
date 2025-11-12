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
import RevenueTrend from "@/components/widgetsCharts/RevenueTrend";
import { getDashboardData } from "../services/dashboardCrmService";
import DealStatusChart from "@/components/widgetsCharts/DealStatusChart";
import SalesChart from "@/components/widgetsCharts/SalesChart";
import TopDeals from "@/components/widgetsCharts/TopDeals";
import UpcomingTaskTable from "@/components/widgetsCharts/UpcomingTaskTable";
import LeadConversionTable from "@/components/widgetsCharts/LeadConversionTable";
import LeadSourcesChart from "@/components/widgetsCharts/LeadSourcesChart";
// import { checkZohoConnection } from "../redux/zohoSlice";

const Home = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await getDashboardData();
        // console.log(res.upcomingTasks );
        setData(res);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  //   const [zohoConnected, setZohoConnected] = useState(false);

  // const zohoConnected = useSelector((state) => state.zoho.connected);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(checkZohoConnection());
  // }, [dispatch]);

  // const handleConnectZoho = () => {
  //   window.location.href = `${import.meta.env.VITE_BACKEND_URL}/authorize`;
  // };
  // console.log(data.revenueTrendData?.trend)
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* <PageHeader>
        <PageHeaderDate />
      </PageHeader> */}
      <div className="main-content">
        <div className="row">
          <SiteOverviewStatistics stats={data?.stats} />
          {/* <PaymentRecordChart /> */}
          <div className="col-md-7">
            {data?.revenueTrendData?.trend ? (
              <RevenueTrend revenueData={data.revenueTrendData.trend} />
            ) : (
              <div>Loading revenue chart...</div>
            )}
          </div>
          <div className="col-md-5">
            <DealStatusChart dealStatus={data.dealStatus} />
          </div>
          <div className="col-md-6">
            <SalesChart salesData={data.salesStages} />
          </div>
          <div className="col-md-6">
            <TopDeals topDeals={data.topDeals} />
          </div>
          <div className="col-md-5">
            <LeadConversionTable leadConversion={data.leadConversion} />
          </div>
          <div className="col-md-7">
            <UpcomingTaskTable upcomingTask={data.upcomingTasks} />
          </div>
          <div className="col-md-5">
            <LeadSourcesChart leadSources={data.leadSource} />
          </div>

          {/* <SalesMiscellaneous isFooterShow={true} dataList={projectsDataTwo} />
          <TasksOverviewChart />
          <LeadsOverviewChart chartHeight={315} />
          <LatestLeads title={"Latest Leads"} />
          <Schedule title={"Upcoming Schedule"} />
          <Project
            cardYSpaceClass="hrozintioal-card"
            borderShow={true}
            title="Project Status"
          />
          <TeamProgress title={"Team Progress"} footerShow={true} /> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
