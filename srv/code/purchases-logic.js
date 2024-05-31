/**
 * 
 * @On(event = { "CREATE" }, entity = "custloyal_ipSrv.Purchases")
 * @param {Object} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function(request) {
  // Calculate reward points
  const rewardPoints = Math.floor(request.data.purchaseValue / 10);
  request.data.rewardPoints = rewardPoints;

  // Update related customer's total purchase value and total reward points
  const customer = await SELECT.one.from('custloyal_ipSrv.Customers').where({ ID: request.data.customer_ID });
  if (customer) {
    const totalPurchaseValue = customer.totalPurchaseValue + request.data.purchaseValue;
    const totalRewardPoints = customer.totalRewardPoints + rewardPoints;

    await UPDATE('custloyal_ipSrv.Customers')
      .set({
        totalPurchaseValue: totalPurchaseValue,
        totalRewardPoints: totalRewardPoints
      })
      .where({ ID: request.data.customer_ID });
  }
}