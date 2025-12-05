import { Download, Gem, Gift, Trophy, Briefcase, Home, Activity, Target, Users, User, ChevronRight, Wifi, Battery, Signal } from 'lucide-react';
import { useState } from 'react';

const glowStyles = `
  @keyframes glowPulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.2);
    }
    50% {
      box-shadow: 0 0 25px 4px rgba(16, 185, 129, 0.55);
    }
  }

  .custom-glow-card:hover {
    animation: glowPulse 3.5s ease-in-out infinite;
  }

  @keyframes userCardGlow {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(248, 113, 113, 0.35);
    }
    50% {
      box-shadow: 0 0 40px 8px rgba(16, 185, 129, 0.6);
    }
  }

  .usercard-glow {
    animation: userCardGlow 4s ease-in-out infinite;
  }

  @keyframes homeCardGlow {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.25);
      border-color: rgba(16, 185, 129, 0.4);
    }
    50% {
      box-shadow: 0 0 24px 6px rgba(16, 185, 129, 0.65);
      border-color: rgba(56, 189, 248, 0.9);
    }
  }

  .homecard-glow {
    animation: homeCardGlow 3.5s ease-in-out infinite;
  }
`;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [isDepositing, setIsDepositing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'usdt'>('bkash');
  const [txnId, setTxnId] = useState('');
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawMethod, setWithdrawMethod] = useState<'bkash' | 'nagad' | 'usdt'>('bkash');
  const [withdrawWalletNumber, setWithdrawWalletNumber] = useState('');
  const [withdrawUsdtAddress, setWithdrawUsdtAddress] = useState('');

  const initialBalanceTk = 35772.6198;
  const [balanceTk, setBalanceTk] = useState(initialBalanceTk);
  const usdtRate = 0.012; // 1 TK -> 0.012 USDT (example rate)
  const bkashNumber = '01XXXXXXXXX';
  const nagadNumber = '01YYYYYYYYY';
  const usdtBep20Address = '0x1234...BEP20_USDT_ADDRESS';

  const openDepositModal = () => {
    setDepositAmount('');
    setTxnId('');
    setPaymentMethod('bkash');
    setIsDepositOpen(true);
  };

  const closeDepositModal = () => {
    if (isDepositing) return;
    setIsDepositOpen(false);
  };

  const handleConfirmDeposit = async () => {
    const amountNum = Number(depositAmount);

    if (!depositAmount || amountNum <= 0) {
      alert('Please enter a valid deposit amount.');
      return;
    }

    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !txnId.trim()) {
      alert('Please enter the transaction ID for verification.');
      return;
    }

    setIsDepositing(true);
    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const newBalance = balanceTk + amountNum;
      setBalanceTk(newBalance);

      if (paymentMethod === 'usdt') {
        const usdtAmount = amountNum * usdtRate;
        alert(`Deposit of ≈ ${usdtAmount.toFixed(2)} USDT successful via USDT (simulated).`);
      } else {
        const methodLabel = paymentMethod === 'bkash' ? 'bKash' : 'Nagad';
        alert(`Deposit of ৳${amountNum.toFixed(2)} successful via ${methodLabel} (simulated).`);
      }
      setIsDepositOpen(false);
    } catch (e) {
      alert('Something went wrong while processing your deposit. Please try again.');
    } finally {
      setIsDepositing(false);
    }
  };

  const openWithdrawModal = () => {
    setWithdrawAmount('');
    setWithdrawWalletNumber('');
    setWithdrawUsdtAddress('');
    setWithdrawMethod('bkash');
    setIsWithdrawOpen(true);
  };

  const closeWithdrawModal = () => {
    if (isWithdrawing) return;
    setIsWithdrawOpen(false);
  };

  const handleConfirmWithdraw = async () => {
    const amountNum = Number(withdrawAmount);

    if (!withdrawAmount || amountNum <= 0) {
      alert('Please enter a valid withdraw amount.');
      return;
    }

    // Minimum withdraw amounts
    if (withdrawMethod === 'bkash' || withdrawMethod === 'nagad') {
      if (amountNum < 1000) {
        alert('Minimum withdraw amount for bKash/Nagad is ৳1000.');
        return;
      }
    }

    if (withdrawMethod === 'usdt') {
      const approxUsdt = amountNum * usdtRate;
      if (approxUsdt < 10) {
        alert('Minimum withdraw amount for USDT is 10 USDT (approx). Increase the TK amount.');
        return;
      }
    }

    if (amountNum > balanceTk) {
      alert('You do not have enough balance to withdraw this amount.');
      return;
    }

    if (withdrawMethod === 'bkash' || withdrawMethod === 'nagad') {
      const wallet = withdrawWalletNumber.trim();
      if (!wallet) {
        alert('Please enter your personal wallet number for withdraw.');
        return;
      }
      // Bangladeshi mobile format: 11 digits, starts with 01
      const walletRegex = /^01\d{9}$/;
      if (!walletRegex.test(wallet)) {
        alert('Please enter a valid Bangladeshi mobile number (11 digits, starts with 01).');
        return;
      }
    }

    if (withdrawMethod === 'usdt') {
      const addr = withdrawUsdtAddress.trim();
      if (!addr) {
        alert('Please enter your BEP20 USDT address for withdraw.');
        return;
      }
      // Simple BEP20 format: 0x + 40 hex characters
      const bep20Regex = /^0x[a-fA-F0-9]{40}$/;
      if (!bep20Regex.test(addr)) {
        alert('Please enter a valid BEP20 USDT address (starts with 0x and is 42 characters long).');
        return;
      }
    }

    setIsWithdrawing(true);
    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const newBalance = balanceTk - amountNum;
      setBalanceTk(newBalance);

      if (withdrawMethod === 'usdt') {
        const usdtAmount = amountNum * usdtRate;
        alert(`Withdraw of ≈ ${usdtAmount.toFixed(2)} USDT requested to BEP20 address (simulated).`);
      } else {
        const methodLabel = withdrawMethod === 'bkash' ? 'bKash' : 'Nagad';
        alert(`Withdraw of ৳${amountNum.toFixed(2)} to your ${methodLabel} wallet has been requested (simulated).`);
      }
      setIsWithdrawOpen(false);
    } catch (e) {
      alert('Something went wrong while processing your withdraw. Please try again.');
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1f2933] pt-16 pb-4">
      <style>{glowStyles}</style>

      {/* Fixed Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 flex justify-center">
        <div className="w-full max-w-md px-3">
          <div className="text-center py-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-sm border-b border-slate-700 rounded-b-3xl">
            <h1 className="text-xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-emerald-100 to-emerald-400 drop-shadow-sm">
              MCFB
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto px-3 relative">
        <div className="bg-slate-900/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-700 min-h-[calc(100vh-5rem)] pb-20 flex flex-col">

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">

        {/* Green Profile Section */}
        {activeTab !== 'home' && activeTab !== 'activity' && (
        <div className="bg-gradient-to-br from-red-500 via-emerald-500 to-emerald-700 px-5 pt-6 pb-8 relative overflow-hidden usercard-glow">
          {/* Texture overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="relative z-10 flex flex-col gap-4">
            {/* Profile Info */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden shadow-md shadow-emerald-900/40">
                  <div className="w-full h-full bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center">
                    <div className="text-white text-2xl">👤</div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold text-base">ZIKRUL ISLAM JUWEL</span>
                    <span className="bg-amber-400 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">VIP 2</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-100 text-xs">
                    <span className="opacity-80">UID:</span>
                    <span className="font-medium">123456789</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex flex-col items-end text-xs text-emerald-50">
                <span className="uppercase tracking-wide opacity-80">Account Level</span>
                <span className="font-semibold">VIP 2 Member</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 text-xs text-emerald-50">
              <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-xl px-3 py-2 border border-purple-300/60 shadow-sm">
                <div className="opacity-90 mb-1 text-[11px]">Balance</div>
                <div className="font-semibold text-sm">৳{balanceTk.toFixed ? balanceTk.toFixed(2) : balanceTk}</div>
              </div>
              <div className="bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 rounded-xl px-3 py-2 border border-amber-200/70 shadow-sm">
                <div className="opacity-90 mb-1 text-[11px] text-amber-950">Today Profit</div>
                <div className="font-semibold text-sm text-white">+৳1,250.00</div>
              </div>
              <div className="bg-white/95 rounded-xl px-3 py-2 border border-emerald-100 shadow-sm">
                <div className="opacity-80 mb-1 text-[11px] text-gray-700">Total Profit</div>
                <div className="font-semibold text-sm text-gray-900">+৳12,540.00</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={openDepositModal}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-2xl shadow-lg shadow-emerald-900/40"
              >
                Deposits
              </button>
              <button
                onClick={openWithdrawModal}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-2xl shadow-lg shadow-emerald-900/40"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
        )}

        {/* Menu Items */}
        {activeTab === 'home' && (
          <div className="px-5 mt-6 space-y-5">
            {/* Promotional Hero Card */}
            <div className="bg-gradient-to-br from-emerald-500 via-emerald-400 to-emerald-600 rounded-3xl p-6 shadow-md border border-emerald-100 text-white custom-glow-card homecard-glow">
              <h2 className="text-xl font-semibold mb-2">Welcome to MCFB</h2>
              <p className="text-sm text-emerald-50 mb-4">
                Play tournaments, earn rewards and withdraw instantly with bKash, Nagad or USDT.
              </p>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-semibold">Daily Bonus</div>
                  <div className="text-emerald-50 text-[13px]">Login every day to unlock extra income.</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] uppercase tracking-wide opacity-80">Active Users</div>
                  <div className="text-base font-semibold">120k+</div>
                </div>
              </div>
            </div>

            {/* Promotional grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-4 text-white shadow-sm custom-glow-card homecard-glow">
                <div className="font-semibold mb-2">Download App</div>
                <p className="text-xs text-blue-50 mb-3">Get faster access and real-time notifications.</p>
                <span className="inline-block text-[11px] px-3 py-1 rounded-full bg-white/15 border border-white/20">Android & iOS</span>
              </div>

              <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-4 text-white shadow-sm custom-glow-card homecard-glow">
                <div className="font-semibold mb-2">VIP Privileges</div>
                <p className="text-xs text-amber-50 mb-3">Higher limits, extra bonuses and special events.</p>
                <span className="inline-block text-[11px] px-3 py-1 rounded-full bg-white/15 border border-white/20">Upgrade now</span>
              </div>

              <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl p-4 text-white shadow-sm custom-glow-card homecard-glow">
                <div className="font-semibold mb-2">Referral Rewards</div>
                <p className="text-xs text-pink-50 mb-3">Invite friends and earn commission on their play.</p>
                <span className="inline-block text-[11px] px-3 py-1 rounded-full bg-white/15 border border-white/20">Share link</span>
              </div>

              <div className="bg-gradient-to-br from-sky-500 to-cyan-500 rounded-2xl p-4 text-white shadow-sm custom-glow-card homecard-glow">
                <div className="font-semibold mb-2">24/7 Support</div>
                <p className="text-xs text-sky-50 mb-3">Our team is always active to help you.</p>
                <span className="inline-block text-[11px] px-3 py-1 rounded-full bg-white/15 border border-white/20">Contact us</span>
              </div>
            </div>
          </div>
        )}

        {/* Activity Interface */}
        {activeTab === 'activity' && (
          <div className="px-5 mt-6 space-y-4">
            <div className="bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-700 text-slate-50 custom-glow-card">
              <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
              <p className="text-xs text-slate-300 mb-3">Track your latest deposits, withdraws and tournament results.</p>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between bg-slate-900/60 rounded-xl px-3 py-2">
                  <div>
                    <div className="font-semibold text-emerald-300">Deposit Successful</div>
                    <div className="text-slate-400">+৳2,000 via bKash</div>
                  </div>
                  <span className="text-[11px] text-slate-400">2 min ago</span>
                </div>

                <div className="flex items-center justify-between bg-slate-900/60 rounded-xl px-3 py-2">
                  <div>
                    <div className="font-semibold text-amber-300">Tournament Joined</div>
                    <div className="text-slate-400">Football Challenge – JUV vs INT</div>
                  </div>
                  <span className="text-[11px] text-slate-400">15 min ago</span>
                </div>

                <div className="flex items-center justify-between bg-slate-900/60 rounded-xl px-3 py-2">
                  <div>
                    <div className="font-semibold text-sky-300">Withdraw Requested</div>
                    <div className="text-slate-400">৳1,500 to Nagad wallet</div>
                  </div>
                  <span className="text-[11px] text-slate-400">1 hour ago</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-700 text-slate-50 custom-glow-card">
              <h3 className="text-lg font-semibold mb-2">Statistics</h3>
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div>
                  <div className="text-base font-bold text-emerald-300">12</div>
                  <div className="text-slate-400">Matches</div>
                </div>
                <div>
                  <div className="text-base font-bold text-amber-300">8</div>
                  <div className="text-slate-400">Wins</div>
                </div>
                <div>
                  <div className="text-base font-bold text-sky-300">৳4.2k</div>
                  <div className="text-slate-400">Profit</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team Interface */}
        {activeTab === 'team' && (
          <div className="px-5 mt-6 space-y-4">
            {/* Team Challenge Cards */}

            {/* Tournament 1 */}
            <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100 rounded-2xl p-4 shadow-sm border border-emerald-100 hover:shadow-emerald-300 hover:shadow-lg transition-all custom-glow-card">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Challenge</h3>
              <div className="border border-emerald-100 rounded-xl p-4 text-center bg-white shadow-sm">
                <div className="text-sm text-gray-500 mb-2">2024-05-12 11:30:00 PM</div>
                <div className="flex justify-around items-center my-3">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">VB</div>
                    <span className="text-sm font-medium mt-1">Vfl Bochum</span>
                  </div>
                  <span className="text-lg font-bold text-gray-600">VS</span>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">BL</div>
                    <span className="text-sm font-medium mt-1">Bayer Leverkusen</span>
                  </div>
                </div>
                <div className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full inline-block">
                  deadline: 04:32:16
                </div>
              </div>
            </div>

            {/* Tournament 2 */}
            <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100 rounded-2xl p-4 shadow-sm border border-emerald-100 hover:shadow-emerald-300 hover:shadow-lg transition-all custom-glow-card">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Challenge</h3>
              <div className="border border-emerald-100 rounded-xl p-4 text-center bg-white shadow-sm">
                <div className="text-sm text-gray-500 mb-2">2024-05-13 3:45:00 PM</div>
                <div className="flex justify-around items-center my-3">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">MC</div>
                    <span className="text-sm font-medium mt-1">Man City</span>
                  </div>
                  <span className="text-lg font-bold text-gray-600">VS</span>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">CHE</div>
                    <span className="text-sm font-medium mt-1">Chelsea</span>
                  </div>
                </div>
                <div className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full inline-block">
                  deadline: 06:12:45
                </div>
              </div>
            </div>

            {/* Tournament 3 */}
            <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100 rounded-2xl p-4 shadow-sm border border-emerald-100 hover:shadow-emerald-300 hover:shadow-lg transition-all custom-glow-card">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Challenge</h3>
              <div className="border border-emerald-100 rounded-xl p-4 text-center bg-white shadow-sm">
                <div className="text-sm text-gray-500 mb-2">2024-05-14 7:20:00 PM</div>
                <div className="flex justify-around items-center my-3">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">RM</div>
                    <span className="text-sm font-medium mt-1">Real Madrid</span>
                  </div>
                  <span className="text-lg font-bold text-gray-600">VS</span>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">BAR</div>
                    <span className="text-sm font-medium mt-1">Barcelona</span>
                  </div>
                </div>
                <div className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full inline-block">
                  deadline: 12:45:30
                </div>
              </div>
            </div>

            {/* Tournament 4 */}
            <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100 rounded-2xl p-4 shadow-sm border border-emerald-100 hover:shadow-emerald-300 hover:shadow-lg transition-all custom-glow-card">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Challenge</h3>
              <div className="border border-emerald-100 rounded-xl p-4 text-center bg-white shadow-sm">
                <div className="text-sm text-gray-500 mb-2">2024-05-15 1:15:00 PM</div>
                <div className="flex justify-around items-center my-3">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">PSG</div>
                    <span className="text-sm font-medium mt-1">PSG</span>
                  </div>
                  <span className="text-lg font-bold text-gray-600">VS</span>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">LYO</div>
                    <span className="text-sm font-medium mt-1">Lyon</span>
                  </div>
                </div>
                <div className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full inline-block">
                  deadline: 08:22:15
                </div>
              </div>
            </div>

            {/* Tournament 5 */}
            <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100 rounded-2xl p-4 shadow-sm border border-emerald-100 hover:shadow-emerald-300 hover:shadow-lg transition-all custom-glow-card">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Challenge</h3>
              <div className="border border-emerald-100 rounded-xl p-4 text-center bg-white shadow-sm">
                <div className="text-sm text-gray-500 mb-2">2024-05-16 9:30:00 PM</div>
                <div className="flex justify-around items-center my-3">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">LIV</div>
                    <span className="text-sm font-medium mt-1">Liverpool</span>
                  </div>
                  <span className="text-lg font-bold text-gray-600">VS</span>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">MUN</div>
                    <span className="text-sm font-medium mt-1">Man United</span>
                  </div>
                </div>
                <div className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full inline-block">
                  deadline: 15:18:40
                </div>
              </div>
            </div>

            {/* Tournament 6 */}
            <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100 rounded-2xl p-4 shadow-sm border border-emerald-100 hover:shadow-emerald-300 hover:shadow-lg transition-all custom-glow-card">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Challenge</h3>
              <div className="border border-emerald-100 rounded-xl p-4 text-center bg-white shadow-sm">
                <div className="text-sm text-gray-500 mb-2">2024-05-17 5:00:00 PM</div>
                <div className="flex justify-around items-center my-3">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">ARS</div>
                    <span className="text-sm font-medium mt-1">Arsenal</span>
                  </div>
                  <span className="text-lg font-bold text-gray-600">VS</span>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center text-white font-bold">TOT</div>
                    <span className="text-sm font-medium mt-1">Tottenham</span>
                  </div>
                </div>
                <div className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full inline-block">
                  deadline: 10:00:00
                </div>
              </div>
            </div>

            {/* Tournament 7 */}
            <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100 rounded-2xl p-4 shadow-sm border border-emerald-100 hover:shadow-emerald-300 hover:shadow-lg transition-all custom-glow-card">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Challenge</h3>
              <div className="border border-emerald-100 rounded-xl p-4 text-center bg-white shadow-sm">
                <div className="text-sm text-gray-500 mb-2">2024-05-18 8:45:00 PM</div>
                <div className="flex justify-around items-center my-3">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center text-white font-bold">DOR</div>
                    <span className="text-sm font-medium mt-1">Dortmund</span>
                  </div>
                  <span className="text-lg font-bold text-gray-600">VS</span>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold">BAY</div>
                    <span className="text-sm font-medium mt-1">Bayern</span>
                  </div>
                </div>
                <div className="bg-lime-100 text-lime-800 text-xs px-3 py-1 rounded-full inline-block">
                  deadline: 14:30:00
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Match Interface */}
        {activeTab === 'match' && (
          <div className="px-5 mt-6 space-y-4">
            {/* Match Betting Cards */}
            <div className="bg-gradient-to-br from-white via-emerald-50 to-emerald-100 rounded-2xl p-4 shadow-sm border border-emerald-100 hover:shadow-emerald-300 hover:shadow-lg transition-all custom-glow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Upcoming Matches</h3>
                <a
                  href="https://t.me/demomcfbsignal"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm sm:text-base font-bold text-emerald-600 hover:text-emerald-700 underline decoration-emerald-400 decoration-dotted"
                >
                  Get match signal
                </a>
              </div>
              <div className="space-y-3">
                {/* Match 1 */}
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-500 mb-2">2024-05-19 7:00:00 PM</div>
                  <div className="flex justify-around items-center my-3">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-indigo-700 rounded-full flex items-center justify-center text-white font-bold">JUV</div>
                      <span className="text-sm font-medium mt-1">Juventus</span>
                    </div>
                    <span className="text-lg font-bold text-gray-600">VS</span>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold">INT</div>
                      <span className="text-sm font-medium mt-1">Inter Milan</span>
                    </div>
                  </div>
                  <div className="flex justify-around items-center mt-4">
                    <button className="bg-green-500 text-white text-xs px-4 py-2 rounded-full">Bet on JUV (1.85)</button>
                    <button className="bg-red-500 text-white text-xs px-4 py-2 rounded-full">Bet on INT (2.10)</button>
                  </div>
                </div>

                {/* Match 2 */}
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-500 mb-2">2024-05-20 9:00:00 PM</div>
                  <div className="flex justify-around items-center my-3">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">MUN</div>
                      <span className="text-sm font-medium mt-1">Man Utd</span>
                    </div>
                    <span className="text-lg font-bold text-gray-600">VS</span>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold">CHE</div>
                      <span className="text-sm font-medium mt-1">Chelsea</span>
                    </div>
                  </div>
                  <div className="flex justify-around items-center mt-4">
                    <button className="bg-green-500 text-white text-xs px-4 py-2 rounded-full">Bet on MUN (2.00)</button>
                    <button className="bg-red-500 text-white text-xs px-4 py-2 rounded-full">Bet on CHE (1.90)</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* My Interface */}
        {activeTab === 'my' && (
          <div className="px-5 mt-6 space-y-4 pb-4">
            <div className="bg-gradient-to-r from-emerald-50 via-white to-emerald-100 rounded-2xl p-4 shadow-sm border border-emerald-100 hover:shadow-emerald-300 hover:shadow-lg transition-all custom-glow-card">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">My Profile</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Name:</span>
                  <span className="text-gray-800 font-medium">ZIKRUL ISLAM JUWEL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">VIP Level:</span>
                  <span className="bg-amber-400 text-emerald-800 text-xs font-bold px-2 py-1 rounded">VIP 2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">UID:</span>
                  <span className="text-gray-800 font-medium">123456789</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-white via-emerald-50 to-emerald-100 rounded-2xl p-4 shadow-sm border border-emerald-100 hover:shadow-emerald-300 hover:shadow-lg transition-all custom-glow-card">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-gray-700">Edit Profile</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-gray-700">Change Password</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-gray-700">Notification Settings</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-gray-700">Privacy Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Spacer for bottom nav */}
        <div className="h-4" />
        </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {isDepositOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl border border-emerald-100 p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">Deposit Funds</h2>
            <p className="text-xs text-gray-500 mb-4 text-center">Choose a payment method and enter the amount you want to deposit into your MCFB account.</p>

            {/* Payment Methods */}
            <div className="flex gap-2 mb-4 text-xs font-medium">
              <button
                type="button"
                onClick={() => setPaymentMethod('bkash')}
                className={`flex-1 px-3 py-2 rounded-xl border transition-colors ${
                  paymentMethod === 'bkash'
                    ? 'bg-pink-500 text-white border-pink-500'
                    : 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100'
                }`}
                disabled={isDepositing}
              >
                bKash
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('nagad')}
                className={`flex-1 px-3 py-2 rounded-xl border transition-colors ${
                  paymentMethod === 'nagad'
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                }`}
                disabled={isDepositing}
              >
                Nagad
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('usdt')}
                className={`flex-1 px-3 py-2 rounded-xl border transition-colors ${
                  paymentMethod === 'usdt'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
                disabled={isDepositing}
              >
                USDT
              </button>
            </div>

            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">Amount (৳)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full border border-emerald-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g. 1000"
                disabled={isDepositing}
              />
            </div>

            {/* Method-specific info */}
            {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
              <div className="mb-3 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">Cash out to</span>
                  <span className="font-semibold text-emerald-700">
                    {paymentMethod === 'bkash' ? bkashNumber : nagadNumber}
                  </span>
                </div>
                <p className="text-[11px] leading-snug">
                  First send the money to the above wallet number, then paste your bKash/Nagad transaction ID below for verification.
                </p>
              </div>
            )}

            {paymentMethod === 'usdt' && (
              <div className="mb-3 text-xs text-gray-600 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">BEP20 USDT Address</span>
                </div>
                <div className="text-[11px] break-all font-mono text-slate-800 mb-1">
                  {usdtBep20Address}
                </div>
                <p className="text-[11px] leading-snug">
                  Only send USDT via BEP20 network to this address. Wrong network deposits may be lost.
                </p>
              </div>
            )}

            {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">Txn ID for verification</label>
                <input
                  type="text"
                  value={txnId}
                  onChange={(e) => setTxnId(e.target.value)}
                  className="w-full border border-emerald-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g. B6H8J9K1L3"
                  disabled={isDepositing}
                />
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Available balance</span>
              <span className="font-semibold text-emerald-600">৳{balanceTk.toFixed ? balanceTk.toFixed(2) : balanceTk}</span>
            </div>

            {paymentMethod === 'usdt' && (
              <div className="flex items-center justify-between text-[11px] text-gray-500 mb-4">
                <span>Approx. balance in USDT</span>
                <span className="font-semibold text-slate-700">
                  ≈ {(balanceTk * usdtRate).toFixed(2)} USDT
                </span>
              </div>
            )}

            <div className="flex gap-3 mt-2">
              <button
                onClick={closeDepositModal}
                className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2 rounded-xl hover:bg-gray-50 disabled:opacity-60"
                disabled={isDepositing}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDeposit}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold py-2 rounded-xl disabled:opacity-60 flex items-center justify-center gap-2"
                disabled={isDepositing}
              >
                {isDepositing ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Confirm Deposit</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {isWithdrawOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl border border-emerald-100 p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">Withdraw Funds</h2>
            <p className="text-xs text-gray-500 mb-4 text-center">Select a payout method and enter the amount you want to withdraw from your MCFB account.</p>

            {/* Payment Methods */}
            <div className="flex gap-2 mb-4 text-xs font-medium">
              <button
                type="button"
                onClick={() => setWithdrawMethod('bkash')}
                className={`flex-1 px-3 py-2 rounded-xl border transition-colors ${
                  withdrawMethod === 'bkash'
                    ? 'bg-pink-500 text-white border-pink-500'
                    : 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100'
                }`}
                disabled={isWithdrawing}
              >
                bKash
              </button>
              <button
                type="button"
                onClick={() => setWithdrawMethod('nagad')}
                className={`flex-1 px-3 py-2 rounded-xl border transition-colors ${
                  withdrawMethod === 'nagad'
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                }`}
                disabled={isWithdrawing}
              >
                Nagad
              </button>
              <button
                type="button"
                onClick={() => setWithdrawMethod('usdt')}
                className={`flex-1 px-3 py-2 rounded-xl border transition-colors ${
                  withdrawMethod === 'usdt'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
                disabled={isWithdrawing}
              >
                USDT
              </button>
            </div>

            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">Amount (৳)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full border border-emerald-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="e.g. 1000"
                disabled={isWithdrawing}
              />
            </div>

            {/* Method-specific info */}
            {(withdrawMethod === 'bkash' || withdrawMethod === 'nagad') && (
              <>
                <div className="mb-3 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">Payout provider</span>
                    <span className="font-semibold text-emerald-700">
                      {withdrawMethod === 'bkash' ? 'bKash' : 'Nagad'}
                    </span>
                  </div>
                  <p className="text-[11px] leading-snug">
                    Enter your personal {withdrawMethod === 'bkash' ? 'bKash' : 'Nagad'} wallet number where you want to receive the cash out.
                  </p>
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Your wallet number</label>
                  <input
                    type="tel"
                    value={withdrawWalletNumber}
                    onChange={(e) => setWithdrawWalletNumber(e.target.value)}
                    className="w-full border border-emerald-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder={withdrawMethod === 'bkash' ? bkashNumber : nagadNumber}
                    disabled={isWithdrawing}
                  />
                </div>
              </>
            )}

            {withdrawMethod === 'usdt' && (
              <>
                <div className="mb-3 text-xs text-gray-600 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">Your BEP20 USDT Address</span>
                  </div>
                  <p className="text-[11px] leading-snug">
                    Paste your personal BEP20 USDT wallet address where you want to receive the withdraw.
                  </p>
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1">BEP20 address</label>
                  <input
                    type="text"
                    value={withdrawUsdtAddress}
                    onChange={(e) => setWithdrawUsdtAddress(e.target.value)}
                    className="w-full border border-emerald-100 rounded-xl px-3 py-2 text-[11px] font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder={usdtBep20Address}
                    disabled={isWithdrawing}
                  />
                </div>
              </>
            )}

            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Current balance</span>
              <span className="font-semibold text-emerald-600">৳{balanceTk.toFixed ? balanceTk.toFixed(2) : balanceTk}</span>
            </div>

            {withdrawMethod === 'usdt' && (
              <div className="flex items-center justify-between text-[11px] text-gray-500 mb-4">
                <span>Approx. withdraw in USDT</span>
                <span className="font-semibold text-slate-700">
                  {withdrawAmount ? `≈ ${(Number(withdrawAmount) * usdtRate).toFixed(2)} USDT` : '—'}
                </span>
              </div>
            )}

            <div className="flex gap-3 mt-2">
              <button
                onClick={closeWithdrawModal}
                className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2 rounded-xl hover:bg-gray-50 disabled:opacity-60"
                disabled={isWithdrawing}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmWithdraw}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded-xl disabled:opacity-60 flex items-center justify-center gap-2"
                disabled={isWithdrawing}
              >
                {isWithdrawing ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Confirm Withdraw</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-4 pb-3">
        <div className="bg-white/95 backdrop-blur-lg border border-emerald-50 shadow-lg rounded-2xl px-6 py-2.5 flex justify-between items-center">
          <NavItem icon={<Home size={24} />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<Activity size={24} />} label="Activity" active={activeTab === 'activity'} onClick={() => setActiveTab('activity')} />
          <NavItem icon={<Target size={24} />} label="Match" active={activeTab === 'match'} onClick={() => setActiveTab('match')} />
          <NavItem icon={<Users size={24} />} label="Team" active={activeTab === 'team'} onClick={() => setActiveTab('team')} />
          <NavItem icon={<User size={24} />} label="My" active={activeTab === 'my'} onClick={() => setActiveTab('my')} />
        </div>
      </div>
    </div>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
}

function MenuItem(props: MenuItemProps) {
  const { icon, text } = props;
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-emerald-100 hover:shadow-emerald-300 hover:shadow-md transition-all custom-glow-card">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
          {icon}
        </div>
        <span className="text-gray-800 font-medium">{text}</span>
      </div>
      <ChevronRight className="text-gray-400" size={20} />
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavItem(props: NavItemProps) {
  const { icon, label, active, onClick } = props;
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 min-w-[60px] hover:opacity-80 transition-opacity">
      <div className={active ? "text-emerald-600" : "text-gray-400"}>
        {icon}
      </div>
      <span className={`text-xs ${active ? "text-emerald-600 font-semibold" : "text-gray-400"}`}>{label}</span>
    </button>
  );
}

export default App;
