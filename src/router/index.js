import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import ForgetPwd from '@/pages/forgetPwd'
import Register from '@/pages/register'
import NoticeDetail from '@/pages/noticeDetail'
import Setting from '@/pages/setting'
import HelpCenter from '@/pages/helpCenter'
import GameFinish from '@/pages/gameFinish'
import Index from '@/pages/index'
import Donate from '@/pages/donate'
import Coffers from '@/pages/coffers'
import FreeDonate from '@/pages/freeDonate'
import FixDonate from '@/pages/fixDonate'
import TodayReturn from '@/pages/todayReturn'
import TodayBonus from '@/pages/todayBonus'
import CanProfit from '@/pages/canprofit'
import WithdrawHistory from '@/pages/withdrawHistory'
import Wallet from '@/pages/wallet'
import EditAddress from '@/pages/editAddress'
import TopupCoin from '@/pages/topupCoin'
import TopupHistory from '@/pages/topupHistory'
import WithdrawCoin from '@/pages/withdrawCoin'
import TransferCoin from '@/pages/transferCoin'
import TransferCoin1 from '@/pages/transferCoin1'
import EditAddress1 from '@/pages/editAddress1'
import TransferHistory from '@/pages/transferHistory'
import Invite from '@/pages/invite'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      components: {
        main: Login,
      },
      meta: {
        index: 1
      }
    },
    {
      path: '/forgetpwd/type=:type',
      name: 'forgetpwd',
      components: {
        main: ForgetPwd
      },
      meta: {
        index: 2
      }
    },
    {
      path: '/register',
      name: 'register',
      components: {
        main: Register
      },
      meta: {
        index: 2
      }
    },
    {
      path: '/index',
      name: 'index',
      components:{
        main: Index
      },
      meta: {
        index: 2
      },
      children: [{
          path: '/index/donate',
          name: 'donate',
          components: {
            child: Donate
          },
          meta: {
            index: 3
          }
        },
        {
          path: '/index/coffers',
          name: 'coffers',
          components: {
            child: Coffers
          },
          meta: {
            index: 3
          }
        },
        {
          path: '/index/wallet',
          name: 'wallet',
          components: {
            child: Wallet
          },
          meta: {
            index: 4
          }
        },
        {
          path: '/index/invite',
          name: 'invite',
          components: {
            child: Invite
          },
          meta: {
            index: 5
          }
        }
      ]
    },
    {
      path: '/gamefinish/type=:type&num=:num',
      name: 'gamefinish',
      components: {
        main: GameFinish
      },
      meta: {
        index: 4
      }
    },
    {
      path: '/noticedetail',
      name: 'noticedetail',
      components: {
        main: NoticeDetail
      },
      meta: {
        index: 5
      }
    },
    {
      path: '/setting',
      name: 'setting',
      components: {
        main: Setting
      },
      meta: {
        index: 6
      }
    },
    {
      path: '/helpcenter',
      name: 'helpcenter',
      components: {
        main: HelpCenter
      },
      meta: {
        index: 7
      }
    },
    {
      path: '/freedonate',
      name: 'freedonate',
      components: {
        main: FreeDonate
      },
      meta: {
        index: 4
      }
    },
    {
      path: '/fixdonate',
      name: 'fixdonate',
      components: {
        main: FixDonate
      },
      meta: {
        index: 4
      }
    },
    {
      path: '/todayreturn',
      name: 'todayreturn',
      components: {
        main: TodayReturn
      },
      meta: {
        index: 4
      }
    },
    {
      path: '/todaybonus',
      name: 'todaybonus',
      components: {
        main: TodayBonus
      },
      meta: {
        index: 4
      }
    },
    {
      path: '/canprofit',
      name: 'canprofit',
      components: {
        main: CanProfit
      },
      meta: {
        index: 4
      }
    },
    {
      path: '/withdrawhistory',
      name: 'withdrawhistory',
      components: {
        main: WithdrawHistory
      },
      meta: {
        index: 5
      }
    },
    {
      path: '/editaddress',
      name: 'editaddress',
      components: {
        main: EditAddress
      },
      meta: {
        index: 5
      }
    },
    {
      path: '/topupcoin',
      name: 'topupcoin',
      components: {
        main: TopupCoin
      },
      meta: {
        index: 5
      }
    },
    {
      path: '/topuphistory',
      name: 'topuphistory',
      components: {
        main: TopupHistory
      },
      meta: {
        index: 6
      }
    },
    {
      path: '/withdrawcoin',
      name: 'withdrawcoin',
      components: {
        main: WithdrawCoin
      },
      meta: {
        index: 5
      }
    },
    {
      path: '/transfercoin',
      name: 'transfercoin',
      components: {
        main: TransferCoin
      },
      meta: {
        index: 5
      }
    },
    {
      path: '/transfercoin1',
      name: 'transfercoin1',
      components: {
        main: TransferCoin1
      },
      meta: {
        index: 5
      }
    },
    {
      path: '/editaddress1',
      name: 'editaddress1',
      components: {
        main: EditAddress1
      },
      meta: {
        index: 6
      }
    },
    {
      path: '/transferhistory',
      name: 'transferhistory',
      components: {
        main: TransferHistory
      },
      meta: {
        index: 5
      }
    }
  ]
})
