const ethers = require('ethers');

const Admin = require('../models/admin.model');
const savvy20Abi = require('../abi/Savvy20.json');

require('dotenv').config();

// 구독 서비스
const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

module.exports = {
  updatePlan: async (req, res) => {
    const { adminEmail, plan } = req.body;

    try {
      const admin = await Admin.findOne({ email: adminEmail });

      if (!admin) {
        return res.status(400).json({ error: 'No admin found' });
      } else if (admin.plan === plan) {
        return res.status(402).json({ error: 'Same plan' });
      }

      await Admin.updateOne({ email: adminEmail }, { plan: plan });

      const savvy20Address = process.env.ERC20_CONTRACT_ADDRESS;

      const ServerPrivateKey = process.env.SERVER_PRIVATE_KEY;
      const ServerWallet = new ethers.Wallet(ServerPrivateKey, provider);

      const savvy20Contract = new ethers.Contract(
        savvy20Address,
        savvy20Abi,
        ServerWallet
      );

      const subscriptionDuration = 3 - 1; // 첫 1번 실행 :-1 / test를 위해 총 3번 실행 설정
      const INTERVAL_TIME = 65 * 1000; // 1분 + 5초 ; timestamp 기준이라 정확히 1분에 동기화 안되서 여유시간 5초 추가
      const subscriptionEndTime = Date.now() + subscriptionDuration * 65 * 1000; // 구독 종료 시간

      // `callSubscription` 함수를 처음 실행하고, 일정 시간(`INTERVAL_TIME`)이 지난 후에 반복 실행하는 함수
      function callSubscriptionWithTimeout() {
        async function callSubscription() {
          try {
            const subscription = await savvy20Contract.subscription(admin.address, plan, {
              gasLimit: 50000,
            });
            //console.log(subscription);
          } catch (error) {
            console.log(error);
          }

          // 구독 종료 시간이 되면 함수 실행 종료
          if (Date.now() < subscriptionEndTime) {
            setTimeout(callSubscription, INTERVAL_TIME);
          }
        }

        // `callSubscription` 함수를 처음 실행
        callSubscription();
      }

      // `callSubscriptionWithTimeout` 함수를 실행
      callSubscriptionWithTimeout();

      res.status(200).json({
        message: 'Successfully updated plan',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal server error',
      });
    }
  },
};
