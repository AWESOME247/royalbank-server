import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import Dashboard from '../pages/dashboard/DashboardLayout.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: App,
            children: [
                {
                    path: "",
                    name: "gettingStarted",
                    component: () => import("../pages/GettingStarted.vue"),
                },
                {
                    path: "/login",
                    name: "login",
                    component: () => import("../pages/Login.vue"),
                },
                {
                    path: "/payment",
                    name: "payment",
                    component: () => import("../components/Payment.vue")
                },
                {
                    path: "/register",
                    name: "register",
                    component: () => import("../pages/Register.vue"),
                }
            ]
        },
        {
            path: '/dashboard',
            component: Dashboard,
            children: [
                {
                    path: "",
                    name: "Home",
                    component: () => import("../pages/dashboard/Home.vue")
                },
                {
                    path: "/withdraw",
                    name: "Withdraw",
                    component: () => import("../pages/dashboard/Withdraw.vue")
                },
                {
                    path: "/transaction",
                    name: "Transaction",
                    component: () => import("../pages/dashboard/Transaction.vue")
                },
                {
                    path: "/deposit",
                    name: "Deposit",
                    component: () => import("../pages/dashboard/Deposit.vue")
                },
                {
                    path: "/inter-transfer",
                    name: "Inter",
                    component: () => import("../pages/dashboard/Inter.vue")
                },
                {
                    path: "/security",
                    name: "Security",
                    component: () => import("../pages/dashboard/Security.vue")
                },
                {
                    path: "/verify",
                    name: "Verify",
                    component: () => import("../pages/dashboard/VerifyAccount.vue")
                },
                {
                    path: "/admin",
                    name: "Admin",
                    component: () => import("../pages/admin/admin.vue")
                },
                {
                    path: "/trading/:pairs",
                    name: "TradingVue",
                    component: () => import("../pages/dashboard/TradeRoom.vue")
                },
                {
                    path: "/trade-center",
                    name: "TradeCenter",
                    component: () => import("../pages/dashboard/TradeCenter.vue")
                },
                {
                    path: "/create-copy-trader",
                    name: "CreateCopyTrader",
                    component: () => import("../pages/dashboard/CreateCopyTrader.vue")
                },
                {
                    path: "/copy-trade",
                    name: "CopyTrade",
                    component: () => import("../pages/dashboard/CopyTrade.vue")
                },
                {
                    path: "/card",
                    name: "Card",
                    component: () => import("../pages/dashboard/Card.vue")
                },
                {
                    path: "/verify-your-account",
                    name: "Verify-Email",
                    component: () => import("../pages/Verify-email.vue")
                },
                {
                    path: "/verified-account/:token",
                    name: "Verified-Email",
                    component: () => import("../pages/Verified.vue")
                }
            ]
        },
        {
            path: '/termsandcondition',
            name: "terms",
            beforeEnter: () => {
                window.location.href = "https://mlifeinvestmenthub.com/t&c.html"
            }
        },
        {
            path: '/android-app-download',
            name: "Android",
            beforeEnter: () => {
                window.location.href = "https://eager-long-johns-ox.cyclic.app/android/download"
            }
        }
    ]
});

export default router