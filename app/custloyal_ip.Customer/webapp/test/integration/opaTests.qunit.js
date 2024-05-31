sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'custloyalip/Customer/test/integration/FirstJourney',
		'custloyalip/Customer/test/integration/pages/CustomersList',
		'custloyalip/Customer/test/integration/pages/CustomersObjectPage'
    ],
    function(JourneyRunner, opaJourney, CustomersList, CustomersObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('custloyalip/Customer') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCustomersList: CustomersList,
					onTheCustomersObjectPage: CustomersObjectPage
                }
            },
            opaJourney.run
        );
    }
);