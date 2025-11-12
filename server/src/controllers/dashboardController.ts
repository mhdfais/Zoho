import { Request, Response } from "express";
import axios from "axios";
import { getAccessToken } from "./zohoAuthController";

const CRM_BASE = "https://www.zohoapis.com/crm/v8";

export const statistics = async (req: Request, res: Response) => {
  try {
    const token = await getAccessToken();
    const headers = { Authorization: `Zoho-oauthtoken ${token}` };
    const today = new Date();

    const [tasksRes, dealsRes, leadsRes] = await Promise.all([
      axios.get(
        `${CRM_BASE}/Tasks?fields=Due_Date,Status,Subject,Owner,Priority`,
        { headers }
      ),
      axios.get(
        `${CRM_BASE}/Deals?fields=Deal_Name,Stage,Amount,Closing_Date`,
        {
          headers,
        }
      ),
      axios.get(`${CRM_BASE}/Leads?fields=Lead_Status,Lead_Source`, {
        headers,
      }),
    ]);

    const allTasks = tasksRes.data.data || [];
    const allDeals = dealsRes.data.data || [];
    const allLeads = leadsRes.data.data || [];
    // const upcomingTasks = upComingTask.data.data || [];
    // console.log(allTasks)

    // console.log("Task sample:", allTasks[0]);
    // console.log("Deal sample:", allDeals[0]);

    const overdueTasks = allTasks.filter((t: any) => {
      const due = new Date(t.Due_Date);
      return due < today && t.Status !== "Completed";
    });

    const closedDeals = allDeals.filter(
      (d: any) =>
        d.Stage_Name === "Closed Won" ||
        d.Stage === "Closed Won" ||
        d.Stage === "Closed_Won"
    );

    const openDeals = allDeals.filter(
      (d: any) =>
        !["Closed Won", "Closed Lost", "Closed_Won", "Closed_Lost"].includes(
          d.Stage_Name || d.Stage
        )
    );

    const totalRevenue = closedDeals.reduce(
      (sum: number, d: any) =>
        sum + (parseFloat(d.Deal_Amount || d.Amount || "0") || 0),
      0
    );

    const activePipeline = openDeals.reduce(
      (sum: number, d: any) =>
        sum + (parseFloat(d.Deal_Amount || d.Amount || "0") || 0),
      0
    );

    const closedCount = closedDeals.length;
    const totalDeals = allDeals.length || 1;

    const overduePercent = (
      (overdueTasks.length / (allTasks.length || 1)) *
      100
    ).toFixed(1);
    const closedPercent = ((closedCount / totalDeals) * 100).toFixed(1);
    const pipelinePercent =
      activePipeline + totalRevenue > 0
        ? ((activePipeline / (activePipeline + totalRevenue)) * 100).toFixed(1)
        : "0.0";

    // revenue trend
    const now = new Date();
    const monthNames = [];
    for (let i = 3; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleString("default", { month: "long" });
      monthNames.push(monthName);
    }

    // // Get start and end dates for search range
    // const startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1)
    //   .toISOString()
    //   .split("T")[0];
    // const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    //   .toISOString()
    //   .split("T")[0];

    const revenueMap: any = monthNames.reduce(
      (acc, m) => ({ ...acc, [m]: 0 }),
      {}
    );
    allDeals.forEach((deal: any) => {
      const date = new Date(deal.Closing_Date);
      const month = date.toLocaleString("default", { month: "long" });
      const amount = parseFloat(deal.Amount) || 0;
      if (revenueMap[month] !== undefined) {
        revenueMap[month] += amount;
      }
    });

    const trend = monthNames.map((m) => ({
      month: m,
      revenue: revenueMap[m],
    }));

    // deal status chart
    let openCount = 0;
    let closedWonCount = 0;
    let closedLostCount = 0;

    allDeals.forEach((deal: any) => {
      const stage = (deal.Stage || "").toLowerCase();
      if (stage.includes("closed won")) closedWonCount++;
      else if (stage.includes("closed lost")) closedLostCount++;
      else openCount++;
    });

    //  sales
    const stages = [
      "Qualification",
      "Needs Analysis",
      "Proposal/Price Quote",
      "Negotiation/Review",
      "Closed Won",
    ];

    const stageCounts = stages.map((stage) => ({
      stage,
      count: allDeals.filter((d: any) => d.Stage === stage).length,
    }));

    // top deals
    const sortedDeals = allDeals
      .sort((a: any, b: any) => b.Amount - a.Amount)
      .slice(0, 5);

    // upcoming task
    const formattedUpcomingTask = allTasks
      .map((t: any) => ({
        id: t.id,
        subject: t.Subject,
        owner: t.Owner?.name || "Unknown",
        priority: t.Priority || "Medium",
        dueDate: t.Due_Date ? new Date(t.Due_Date) : null,
      }))
      .filter((t: any) => {
        if (!t.dueDate) return false;
        const due = new Date(t.dueDate);
        due.setHours(0, 0, 0, 0);
        return due >= today;
      })
      .sort((a: any, b: any) => a.dueDate.getTime() - b.dueDate.getTime())
      .slice(0, 4);

    // lead conversion
    const allowedStages = [
      "Contacted",
      "Qualified",
      "Contact in Future",
      "Pre-Qualified",
    ];

    const leadStageCounts = allowedStages.reduce((acc: any, stage: string) => {
      acc[stage] = 0;
      return acc;
    }, {} as Record<string, number>);

    allLeads.forEach((lead: any) => {
      const stage = lead.Lead_Status;
      if (stage && allowedStages.includes(stage)) {
        leadStageCounts[stage]++;
      }
    });
    // console.log(leadStageCounts);
    const formattedLeadConversion = Object.entries(leadStageCounts).map(
      ([stage, count]) => ({
        stage,
        count,
      })
    );

    // lead sources
    const sourceCounts: Record<string, number> = {};

    const allowedSources = [
      "Cold Call",
      "Advertisement",
      "Employee Referral",
      "Facebook",
      "Twitter",
      "LinkedIn",
      "Instagram",
    ];

    allLeads.forEach((lead: any) => {
      let source = lead.Lead_Source?.trim() || "Others";

      if (["Facebook", "Twitter", "LinkedIn", "Instagram"].includes(source)) {
        source = "Social Media";
      }

      if (allowedSources.includes(source) || source === "Social Media") {
        sourceCounts[source] = (sourceCounts[source] || 0) + 1;
      }
    });

    const totalIncludedLeads = Object.values(sourceCounts).reduce(
      (sum, val) => sum + val,
      0
    );

    const formattedLeadSourceData = Object.entries(sourceCounts).map(
      ([source, count]) => ({
        source,
        count,
        total: totalIncludedLeads,
      })
    );

    res.json({
      stats: {
        overdueTasks: {
          total: allTasks.length,
          overdue: overdueTasks.length,
          progress: `${overduePercent}%`,
          info: `${overduePercent}% overdue`,
        },
        totalRevenue: {
          total: totalRevenue,
          progress: `${closedPercent}%`,
          info: "Revenue from closed deals",
        },
        dealsClosed: {
          closed: closedCount,
          total: totalDeals,
          progress: `${closedPercent}%`,
          info: `${closedCount}/${totalDeals} closed`,
        },
        activePipeline: {
          total: activePipeline,
          progress: `${pipelinePercent}%`,
          info: "Open pipeline value",
        },
      },
      revenueTrendData: { trend },
      dealStatus: {
        openCount,
        closedWonCount,
        closedLostCount,
      },
      salesStages: stageCounts,
      topDeals: sortedDeals,
      upcomingTasks: formattedUpcomingTask,
      leadConversion: formattedLeadConversion,
      leadSource: formattedLeadSourceData,
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
};
