Service.get(`${apiLink}/${skipPage}/${perpage}/All`, {}, (response) => {
  // Lets filter the data
  console.log(response.data);
  if (response.data.code === 402) {
    window.location.reload();
  }

  const { rows } = response.data.data;

  let filteredDataByPerimssion;

  if (typeof details !== "undefined") {
    const {
      account_manager,
      senior_account_manager,
    } = details.data.permission_mapping;

    var holdStatusOption = [];
    // if user is account_manager and senior account manager
    if (account_manager === true && senior_account_manager === true) {
      // Set filter custome option
      //console.log(' hum account manager and senior account manager both.')
      // Status options
      /*
            holdStatusOption = [
              'Pending',
              'Rejected',
              'Not Funded',
              'Funded',
              'Active',
              'Inactive',
              'Approved',
              'kyc',
              'Registered User',
            ];

            */

      holdStatusOption = [
        "Funded",
        "Active",
        "Inactive",
        "Not Funded",
        "Close",
      ];

      setFilter(holdStatusOption);

      // Lets filter the origin user and users variable

      filteredDataByPerimssion = rows.filter(function (element) {
        // Check that in array and filter
        return holdStatusOption.indexOf(element.status) !== -1;
      });
      // Change the response data rest should be find
      response.data.data.rows = filteredDataByPerimssion;
      setUsers(response.data);
      setUsersOriginal(response.data);
      setStatusOptions(holdStatusOption);
    } else if (account_manager === true) {
      // if only account manager
      // Set filter options

      holdStatusOption = ["Not Funded", "Close"];

      /*
              holdStatusOption = [
              'Pending',
              'Rejected',
              'kyc',
              'Registered User',
            ];
            */

      // Set filter
      setFilter(holdStatusOption);

      filteredDataByPerimssion = rows.filter(function (element) {
        // Check that in array and filter
        return holdStatusOption.indexOf(element.status) !== -1;
      });
      // Change the response data rest should be find
      response.data.data.rows = filteredDataByPerimssion;
      setUsers(response.data);
      setUsersOriginal(response.data);
      setStatusOptions(holdStatusOption);
    } else if (senior_account_manager === true) {
      // if user is only account manager
      // Set filter

      holdStatusOption = ["Funded", "Active", "Inactive", "Close"];

      /*
            holdStatusOption = [
              'Not Funded',
              'Funded',
              'Active',
              'Inactive',
              'Approved',
            ];
            */

      setFilter(holdStatusOption);

      filteredDataByPerimssion = rows.filter(function (element) {
        // Check that in array and filter
        return holdStatusOption.indexOf(element.status) !== -1;
      });
      // Change the response data rest should be find
      response.data.data.rows = filteredDataByPerimssion;
      setUsers(response.data);
      setUsersOriginal(response.data);
      setStatusOptions(holdStatusOption);
    } else {
      // Show nothing
      setStatusOptions([]);
    }
  }

  setIsLoading(false);
}).catch((error) => {
  console.log(error);
});
