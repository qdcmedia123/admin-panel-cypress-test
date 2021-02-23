const APIPrefix = `/api/v1`;

export const endPoints = {
    leads:{
        listLeads:`${APIPrefix}/listLeads`
    },
    clients:{
        listClients:`${APIPrefix}/listClients`,
        listComplianceClients:`${APIPrefix}/listComplianceClients`,
        getFundedAndApprovedGraphData:`${APIPrefix}/getFundedAndApprovedGraphData`,
        getActiveAccountGraphData: `${APIPrefix}/getActiveAccountGraphData`,
        getApprovedAccountGraphData:`${APIPrefix}/getApprovedAccountGraphData`,
        uploadClientDocs:`${APIPrefix}/uploadClientDocs`,
        
    },
    portfolios:{
        portfoliValuesList:`${APIPrefix}/portfoliValuesList` 
    },
    createUser:{},
    portfolioAllocation:{
        portFolioAllocationList: `${APIPrefix}/portFolioAllocationList`
    },
    referal:{
        listReferent:`${APIPrefix}/listReferent`,
        referredPeopleByEmail: `${APIPrefix}/referredPeopleByEmail`,
        addAdminReferralAPI: `${APIPrefix}/addAdminReferralAPI`
    },
    compliance:{},
    dashboard:{
        getTotalEquityAndCashForAllClients: `${APIPrefix}/aum/getTotalEquityAndCashForAllClients`,
        CurrentDashboardNumbers:`${APIPrefix}/CurrentDashboardNumbers`,
        mapUsersByCountry:`${APIPrefix}/mapUsersByCountry`,
        dashboardGroupedNums: `${APIPrefix}/dashboardGroupedNums`,
        getAdminMasterTotals: `${APIPrefix}/getAdminMasterTotals`,
        wdAndDepositsGrapshData: `${APIPrefix}/wdAndDepositsGrapshData`,
        pfByMonth: 'https://esubs.wealthface.ca:6600/api/v1/pfByMonth',
        portFolioByMonth: 'api/v1/portFolioByMonth'
    },
    auth:{
        getLoginCode:`${APIPrefix}/getLoginCode`
    },
    reporting: {
        getAvgT:`${APIPrefix}/getAvgT`
    },
    trade: {
        listTradingLeads: `${APIPrefix}/listTradingLeads`
    },
    IFA: {
        newIFA: `${APIPrefix}/newIFA`,
        listIFA: `${APIPrefix}/listIFA`,
        showIFAUser: `${APIPrefix}/showIFAUser`,
        updateIFA: `${APIPrefix}/updateIFA`, 
        resetPasswordIFA: `${APIPrefix}/resetPasswordIFA`,  
    },

}