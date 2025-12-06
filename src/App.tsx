import { Home, Activity, Target, Users, User, LogOut, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';

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

  @keyframes headerGlow {
    0% {
      text-shadow: 0 0 8px rgba(34, 197, 94, 0.8), 0 0 16px rgba(56, 189, 248, 0.6);
      filter: hue-rotate(0deg);
    }
    50% {
      text-shadow: 0 0 14px rgba(248, 250, 252, 0.9), 0 0 26px rgba(236, 72, 153, 0.8);
      filter: hue-rotate(40deg);
    }
    100% {
      text-shadow: 0 0 8px rgba(34, 197, 94, 0.8), 0 0 16px rgba(56, 189, 248, 0.6);
      filter: hue-rotate(0deg);
    }
  }

  .header-glow {
    animation: headerGlow 4s ease-in-out infinite;
  }

  @keyframes headerBorderPulse {
    0% {
      box-shadow: 0 0 0 0 rgba(248, 113, 113, 0.5); /* red */
      border-color: rgba(248, 113, 113, 0.95);
    }
    50% {
      box-shadow: 0 0 20px 6px rgba(190, 242, 100, 0.95); /* lime */
      border-color: rgba(190, 242, 100, 1);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(248, 113, 113, 0.5); /* red */
      border-color: rgba(248, 113, 113, 0.95);
    }
  }

  .header-border-pulse {
    animation: headerBorderPulse 2.6s ease-in-out infinite;
  }

  @keyframes marqueeSlide {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .marquee-notice {
    animation: marqueeSlide 14s linear infinite;
  }
`;

function App() {
  const { logout } = useAuth();
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
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    name: '',
    comment: ''
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [withdrawWalletNumber, setWithdrawWalletNumber] = useState('');
  const [withdrawUsdtAddress, setWithdrawUsdtAddress] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isUsdtCopied, setIsUsdtCopied] = useState(false);

  const bannerImages = [
    "https://i.ibb.co.com/pBz4m4SB/Green-Passive-Income-Ideas-You-Tube-Thumbnail-2.png",
    "https://i.ibb.co.com/rKHyVgy9/Pngtree-a-data-analyst-sitting-at-15735858.jpg",
    "https://i.ibb.co.com/wFX96Mxd/b2cf276d-5c26-47d7-9529-f56a7017cfb8.jpg"
  ];

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

  const handleCopyUsdtAddress = async () => {
    try {
      await navigator.clipboard.writeText(usdtBep20Address);
      setIsUsdtCopied(true);
      setTimeout(() => setIsUsdtCopied(false), 2000);
    } catch (err) {
      alert('Unable to copy address automatically. Please copy it manually.');
    }
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div
      className="min-h-screen pt-16 pb-4 bg-[#191970] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/jvcsJnG9/33114809-rm251-mind-15-e.jpg')",
      }}
    >
      <style>{glowStyles}</style>

      {/* Fixed Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 flex justify-center">
        <div className="w-full max-w-md px-3">
          <div className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-sm border-b border-red-500 rounded-b-3xl header-border-pulse">
            <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center shadow-sm shadow-red-800/60">
              <img
                src="https://i.ibb.co/wZ8gyZvH/vecteezy-illustration-of-golden-soccer-logo-or-label-8172791.jpg"
                alt="MOZAMMEL MCFB logo"
                className="w-7 h-7 rounded-full"
              />
            </div>
            <h1 className="text-xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-400 drop-shadow-lg transform hover:scale-105 transition-all duration-300">
              MOZAMMEL MCFB
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto px-3 relative">
        <div className="bg-slate-900/75 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-600/80 min-h-[calc(100vh-5rem)] pb-20 flex flex-col">

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">

        {/* Notice Marquee */}
        {activeTab === 'home' && (
        <div className="px-5 pt-3 space-y-4">
          <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 rounded-full border border-amber-500/70 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-1.5 text-[11px] font-medium text-amber-950 whitespace-nowrap marquee-notice">
              <span className="uppercase tracking-wide text-[10px] bg-amber-600 text-amber-50 px-2 py-0.5 rounded-full">Notice</span>
              <span>Upcoming tournaments and match signals are demo only. Always check latest updates in the signal channel before placing real bets.</span>
              <span className="ml-6">Enjoy secure deposits with bKash, Nagad &amp; USDT · Withdraw fast · Play responsibly.</span>
            </div>
          </div>

        </div>
        )}

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
                    <span className="text-white font-semibold text-base">MOZAMMEL HAQUE</span>
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
                <div className="opacity-80 mb-1 text-[11px] text-black">Total Profit</div>
                <div className="font-semibold text-sm text-black">+৳12,540.00</div>
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
            {/* Home Banner Image Slider */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-md border border-emerald-500/40 custom-glow-card homecard-glow">
              <div className="relative w-full aspect-video sm:aspect-[16/9] md:aspect-[21/9] h-48 sm:h-64 md:h-80 lg:h-96">
                {bannerImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className={`flex items-center justify-center h-full ${index === 2 ? 'gap-6' : ''}`}>
                      {index === 2 && (
                        <div className="text-center px-6 max-w-md">
                          <h3 className="text-lg font-bold mb-2 text-shadow-lg italic bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-lime-500">"MCFB"</h3>
                          <p className="text-xs md:text-sm font-bold opacity-90 leading-relaxed italic bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-lime-400">
                            "Experience the ultimate gaming platform with secure deposits, instant withdrawals, and exciting tournament"
                          </p>
                        </div>
                      )}
                      <img
                        src={image}
                        alt={`MOZAMMEL MCFB banner ${index + 1}`}
                        className={`w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300 ${
                          index === 1 ? 'scale-90 hover:scale-100' : 
                          index === 2 ? 'w-auto h-auto max-w-full max-h-full object-contain' : ''
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {bannerImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-white w-6 sm:w-8'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Promotional grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-5 text-white shadow-xl custom-glow-card homecard-glow relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute bottom-3 left-3 w-6 h-6 bg-white rounded-full animate-pulse animation-delay-150"></div>
                  <div className="absolute top-8 left-8 w-4 h-4 bg-white rounded-full animate-pulse animation-delay-300"></div>
                </div>
                
                {/* Download icon */}
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-2xl mb-3 backdrop-blur-sm border border-white/30">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                
                <div className="font-bold text-lg mb-2 relative z-10">Download App</div>
                <p className="text-sm text-white/90 mb-4 relative z-10 leading-relaxed">Get faster access and real-time notifications.</p>
                
                {/* Platform badges */}
                <div className="flex gap-2 relative z-10">
                  <span className="inline-flex items-center text-[10px] px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 font-medium">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    iOS
                  </span>
                  <span className="inline-flex items-center text-[10px] px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 font-medium">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a1.014 1.014 0 0 1-.61-.92V2.734a1.014 1.014 0 0 1 .61-.92zm10.89 10.893l1.874 1.874-7.452 7.452a1.013 1.013 0 0 1-1.42 0l-3.87-3.87 6.868-6.868 3 3zm7.078 4.262l1.847 1.067a1.013 1.013 0 0 1 0 1.749l-1.848 1.067-2.621-2.621 2.622-2.622zm-8.976 8.976l-3.87-3.87a1.013 1.013 0 0 1 0-1.42l7.452-7.452 3.874 3.874-7.456 7.456a1.013 1.013 0 0 1-1.42 0z"/>
                    </svg>
                    Android
                  </span>
                </div>
                
                {/* Download button */}
                <button className="w-full mt-4 bg-white text-purple-600 font-semibold py-2.5 rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 relative z-10">
                  Download Now
                </button>
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

            {/* Currently Using Stats */}
            <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 rounded-2xl p-4 shadow-sm border border-green-200 hover:shadow-green-300 hover:shadow-lg transition-all custom-glow-card">
              <h3 className="text-lg font-semibold text-white800 mb-4 text-center">Currently Online</h3>
              
              <div className="text-center mb-4">
                <div className="flex items-center justify-center mb-2">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                  </div>
                  <span className="ml-2 text-sm text-green-600 font-medium">Live</span>
                </div>
                <div className="text-3xl font-bold text-white800 mb-1">2,847</div>
                <div className="text-sm text-white600">Active Users Now</div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 bg-white rounded-lg border border-green-100">
                  <div className="text-lg font-bold text-green-600">842</div>
                  <div className="text-xs text-white600">Betting</div>
                </div>
                <div className="text-center p-2 bg-white rounded-lg border border-green-100">
                  <div className="text-lg font-bold text-blue-600">1,293</div>
                  <div className="text-xs text-white600">Watching</div>
                </div>
                <div className="text-center p-2 bg-white rounded-lg border border-green-100">
                  <div className="text-lg font-bold text-purple-600">712</div>
                  <div className="text-xs text-white600">Chatting</div>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white600">Peak today:</span>
                  <span className="font-semibold text-green-600">3,421 users</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white600">Avg. online:</span>
                  <span className="font-semibold text-white700">2,156 users</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white600">Total members:</span>
                  <span className="font-semibold text-white700">48,392</span>
                </div>
              </div>

              {/* Live Activity Indicator */}
              <div className="mt-4 p-2 bg-green-100 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-white text-[8px] font-bold">A</div>
                    <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white text-[8px] font-bold">B</div>
                    <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white text-[8px] font-bold">C</div>
                    <div className="w-6 h-6 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center text-white text-[8px] font-bold">D</div>
                    <div className="w-6 h-6 bg-pink-500 rounded-full border-2 border-white flex items-center justify-center text-white text-[8px]">+12</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-white700">Recent Activity</div>
                    <div className="text-xs text-white500">Users joined in last 5 min</div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Rating System */}
            <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50 rounded-2xl p-4 shadow-sm border border-amber-200 hover:shadow-amber-300 hover:shadow-lg transition-all custom-glow-card">
              <h3 className="text-lg font-semibold text-white800 mb-4 text-center">User Ratings</h3>
              
              {/* Overall Rating */}
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-6 h-6 ${star <= 4 ? "text-amber-400 fill-current" : "text-white300"}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-2xl font-bold text-white800">4.2</div>
                <div className="text-sm text-white600">Based on 1,248 reviews</div>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const percentage = rating === 5 ? 65 : rating === 4 ? 20 : rating === 3 ? 10 : rating === 2 ? 3 : 2;
                  return (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-xs text-white600 w-8">{rating}</span>
                      <svg className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                          style={{width: `${percentage}%`}}
                        ></div>
                      </div>
                      <span className="text-xs text-white600 w-10 text-right">{percentage}%</span>
                    </div>
                  );
                })}
              </div>

              {/* User Reviews */}
              <div className="mt-4 space-y-3">
                <div className="bg-white rounded-xl p-3 border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">RJ</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-white800">Rahul Johnson</div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-3 h-3 ${star <= 5 ? "text-amber-400 fill-current" : "text-white300"}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-white500">2 days ago</span>
                  </div>
                  <p className="text-xs text-white600">"Great platform! Fast withdrawals and excellent customer support."</p>
                </div>

                <div className="bg-white rounded-xl p-3 border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">SK</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-white800">Sarah Khan</div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-3 h-3 ${star <= 4 ? "text-amber-400 fill-current" : "text-white300"}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-white500">1 week ago</span>
                  </div>
                  <p className="text-xs text-white600">"Love the match predictions! Very accurate and helpful."</p>
                </div>
              </div>

              {/* Add Review Button */}
              <button 
                onClick={() => setIsReviewOpen(true)}
                className="w-full mt-4 bg-amber-400 hover:bg-amber-500 text-white800 font-semibold py-2 rounded-xl transition-colors duration-200 text-sm"
              >
                Write a Review
              </button>
            </div>
          </div>
        )}

        {/* Activity Interface */}
        {activeTab === 'activity' && (
          <div className="px-5 mt-6 space-y-4">
            {/* Recent Activity Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-emerald-500/30 shadow-xl custom-glow-card">
              {/* Decorative orbs */}
              <div className="pointer-events-none absolute inset-0 opacity-20">
                <div className="absolute -top-6 -right-4 w-24 h-24 bg-emerald-500 rounded-full blur-2xl" />
                <div className="absolute bottom-0 -left-10 w-28 h-28 bg-cyan-500 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">Recent Activity</h3>
                      <p className="text-[11px] text-white/70">Track your latest deposits, withdraws and tournament results.</p>
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-200">Live feed</span>
                </div>

                <div className="space-y-2 text-xs">
                  {/* Item 1 */}
                  <div className="flex items-center justify-between rounded-2xl px-3 py-2.5 bg-slate-900/70 border border-emerald-500/20">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 text-[11px] font-bold">DEP</div>
                      <div>
                        <div className="font-semibold text-emerald-200">Deposit Successful</div>
                        <div className="text-[11px] text-white/70">+৳2,000 via bKash</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[11px] text-white/60">2 min ago</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/15 text-emerald-200 border border-emerald-400/40">Success</span>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center justify-between rounded-2xl px-3 py-2.5 bg-slate-900/70 border border-amber-400/25">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-200 text-[11px] font-bold">TOUR</div>
                      <div>
                        <div className="font-semibold text-amber-200">Tournament Joined</div>
                        <div className="text-[11px] text-white/70">Football Challenge – JUV vs INT</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[11px] text-white/60">15 min ago</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-amber-500/15 text-amber-100 border border-amber-300/40">Ongoing</span>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center justify-between rounded-2xl px-3 py-2.5 bg-slate-900/70 border border-sky-400/25">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-200 text-[11px] font-bold">WD</div>
                      <div>
                        <div className="font-semibold text-sky-200">Withdraw Requested</div>
                        <div className="text-[11px] text-white/70">৳1,500 to Nagad wallet</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[11px] text-white/60">1 hour ago</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-sky-500/15 text-sky-100 border border-sky-300/40">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-cyan-400/30 shadow-xl custom-glow-card">
              <div className="pointer-events-none absolute inset-0 opacity-10">
                <div className="absolute -bottom-10 right-0 w-32 h-32 bg-cyan-400 rounded-full blur-3xl" />
                <div className="absolute -top-8 left-4 w-20 h-20 bg-indigo-500 rounded-full blur-2xl" />
              </div>

              <div className="relative z-10 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-2xl bg-cyan-500/20 border border-cyan-300/40 flex items-center justify-center">
                      <Target className="w-5 h-5 text-cyan-200" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">Statistics</h3>
                      <p className="text-[11px] text-white/70">Overview of your recent performance.</p>
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/15 text-white/80">Last 7 days</span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="rounded-2xl bg-white/5 border border-emerald-400/30 px-2.5 py-2">
                    <div className="text-sm font-bold text-emerald-300">12</div>
                    <div className="text-[11px] text-white/70 mb-1">Matches</div>
                    <div className="h-1.5 w-full bg-emerald-900/60 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-gradient-to-r from-emerald-400 to-emerald-200" />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/5 border border-amber-400/30 px-2.5 py-2">
                    <div className="text-sm font-bold text-amber-300">8</div>
                    <div className="text-[11px] text-white/70 mb-1">Wins</div>
                    <div className="h-1.5 w-full bg-amber-900/60 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-amber-400 to-yellow-200" />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/5 border border-sky-400/30 px-2.5 py-2">
                    <div className="text-sm font-bold text-sky-300">৳4.2k</div>
                    <div className="text-[11px] text-white/70 mb-1">Profit</div>
                    <div className="h-1.5 w-full bg-sky-900/60 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-gradient-to-r from-sky-400 to-cyan-200" />
                    </div>
                  </div>
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
              <h3 className="text-lg font-semibold text-white800 mb-4">Team Challenge</h3>
              <div className="border border-emerald-100 rounded-xl p-4 text-center bg-white shadow-sm">
                <div className="text-sm text-white500 mb-2">2025-12-05 11:30:00 PM</div>
                <div className="flex justify-around items-center my-3">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">VB</div>
                    <span className="text-sm font-medium mt-1">Vfl Bochum</span>
                  </div>
                  <span className="text-lg font-bold text-white600">VS</span>
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
              <h3 className="text-lg font-semibold text-white800 mb-4">Team Challenge</h3>
              <div className="border border-emerald-100 rounded-xl p-4 text-center bg-white shadow-sm">
                <div className="text-sm text-white500 mb-2">2025-12-05 3:45:00 PM</div>
                <div className="flex justify-around items-center my-3">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">MC</div>
                    <span className="text-sm font-medium mt-1">Man City</span>
                  </div>
                  <span className="text-lg font-bold text-white600">VS</span>
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
              <h3 className="text-lg font-semibold text-white800 mb-4">Team Challenge</h3>
              <div className="border border-emerald-100 rounded-xl p-4 text-center bg-white shadow-sm">
                <div className="text-sm text-white500 mb-2">2025-12-05 7:20:00 PM</div>
                <div className="flex justify-around items-center my-3">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">RM</div>
                    <span className="text-sm font-medium mt-1">Real Madrid</span>
                  </div>
                  <span className="text-lg font-bold text-white600">VS</span>
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
              <h3 className="text-lg font-semibold text-white800 mb-4">Team Challenge</h3>
              <div className="border border-emerald-100 rounded-xl p-4 text-center bg-white shadow-sm">
                <div className="text-sm text-white500 mb-2">2025-12-05 1:15:00 PM</div>
                <div className="flex justify-around items-center my-3">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">PSG</div>
                    <span className="text-sm font-medium mt-1">PSG</span>
                  </div>
                  <span className="text-lg font-bold text-white600">VS</span>
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
              <h3 className="text-lg font-semibold text-white800 mb-4">Team Challenge</h3>
              <div className="border border-emerald-100 rounded-xl p-4 text-center bg-white shadow-sm">
                <div className="text-sm text-white500 mb-2">2025-12-05 9:30:00 PM</div>
                <div className="flex justify-around items-center my-3">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">LIV</div>
                    <span className="text-sm font-medium mt-1">Liverpool</span>
                  </div>
                  <span className="text-lg font-bold text-white600">VS</span>
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
              <h3 className="text-lg font-semibold text-white800 mb-4">Team Challenge</h3>
              <div className="border border-emerald-100 rounded-xl p-4 text-center bg-white shadow-sm">
                <div className="text-sm text-white500 mb-2">2025-12-05 5:00:00 PM</div>
                <div className="flex justify-around items-center my-3">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">ARS</div>
                    <span className="text-sm font-medium mt-1">Arsenal</span>
                  </div>
                  <span className="text-lg font-bold text-white600">VS</span>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center text-white font-bold">TOT</div>
                    <span className="text-sm font-medium mt-1">Tottenham</span>
                  </div>
                </div>
                <div className="bg-gray-100 text-white800 text-xs px-3 py-1 rounded-full inline-block">
                  deadline: 10:00:00
                </div>
              </div>
            </div>

            {/* Tournament 7 */}
            <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100 rounded-2xl p-4 shadow-sm border border-emerald-100 hover:shadow-emerald-300 hover:shadow-lg transition-all custom-glow-card">
              <h3 className="text-lg font-semibold text-white800 mb-4">Team Challenge</h3>
              <div className="border border-emerald-100 rounded-xl p-4 text-center bg-white shadow-sm">
                <div className="text-sm text-white500 mb-2">2025-12-05 8:45:00 PM</div>
                <div className="flex justify-around items-center my-3">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center text-white font-bold">DOR</div>
                    <span className="text-sm font-medium mt-1">Dortmund</span>
                  </div>
                  <span className="text-lg font-bold text-white600">VS</span>
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
                <h3 className="text-lg font-semibold text-white800">Upcoming Matches</h3>
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
                  <div className="text-sm text-white500 mb-2">2025-12-05 7:00:00 PM</div>
                  <div className="flex justify-around items-center my-3">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-indigo-700 rounded-full flex items-center justify-center text-white font-bold">JUV</div>
                      <span className="text-sm font-medium mt-1">Juventus</span>
                    </div>
                    <span className="text-lg font-bold text-white600">VS</span>
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
                  <div className="text-sm text-white500 mb-2">2025-12-05 9:00:00 PM</div>
                  <div className="flex justify-around items-center my-3">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">MUN</div>
                      <span className="text-sm font-medium mt-1">Man Utd</span>
                    </div>
                    <span className="text-lg font-bold text-white600">VS</span>
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
              <h3 className="text-lg font-semibold text-white800 mb-4">My Profile</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white600">Name:</span>
                  <span className="text-white800 font-medium">MOZAMMEL HAQUE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white600">VIP Level:</span>
                  <span className="bg-amber-400 text-emerald-800 text-xs font-bold px-2 py-1 rounded">VIP 2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white600">UID:</span>
                  <span className="text-white800 font-medium">123456789</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-white via-emerald-50 to-emerald-100 rounded-2xl p-4 shadow-sm border border-emerald-100 hover:shadow-emerald-300 hover:shadow-lg transition-all custom-glow-card">
              <h3 className="text-lg font-semibold text-white800 mb-4">Account Settings</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-white700">Edit Profile</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-white700">Change Password</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-white700">Notification Settings</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-white700">Privacy Settings</span>
                </button>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={async () => {
                await logout();
                // The AppWrapper will automatically redirect to login page
              }}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-2xl shadow-lg shadow-red-900/40 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        )}
        {/* Spacer for bottom nav */}
        <div className="h-4" />
        </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {isDepositOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm mx-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl shadow-2xl border border-blue-500/30 p-6 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-20 h-20 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-6 left-6 w-16 h-16 bg-emerald-400 rounded-full animate-pulse animation-delay-150"></div>
              <div className="absolute top-12 left-12 w-12 h-12 bg-purple-400 rounded-full animate-pulse animation-delay-300"></div>
            </div>
            
            <div className="relative z-10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl mb-3 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-blue-300">Deposit Funds</h2>
                <p className="text-xs text-blue-200 text-center leading-relaxed">Choose a payment method and enter the amount you want to deposit into your MCFB account.</p>
              </div>

            {/* Payment Methods */}
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod('bkash')}
                className={`flex-1 px-4 py-3 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  paymentMethod === 'bkash'
                    ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white border-pink-400 shadow-lg shadow-pink-500/30'
                    : 'bg-white/10 text-pink-200 border-pink-500/30 hover:bg-white/20 hover:border-pink-500/60'
                }`}
                disabled={isDepositing}
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="w-6 h-6 bg-pink-400 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">b</span>
                  </div>
                  <span className="text-xs font-semibold">bKash</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('nagad')}
                className={`flex-1 px-4 py-3 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  paymentMethod === 'nagad'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-400 shadow-lg shadow-amber-500/30'
                    : 'bg-white/10 text-amber-200 border-amber-500/30 hover:bg-white/20 hover:border-amber-500/60'
                }`}
                disabled={isDepositing}
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="w-6 h-6 bg-amber-400 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">N</span>
                  </div>
                  <span className="text-xs font-semibold">Nagad</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('usdt')}
                className={`flex-1 px-4 py-3 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  paymentMethod === 'usdt'
                    ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white border-slate-500 shadow-lg shadow-slate-500/30'
                    : 'bg-white/10 text-white300 border-slate-500/30 hover:bg-white/20 hover:border-slate-500/60'
                }`}
                disabled={isDepositing}
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="w-6 h-6 bg-slate-400 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">U</span>
                  </div>
                  <span className="text-xs font-semibold">USDT</span>
                </div>
              </button>
            </div>

            <div className="mb-3">
              <label className="block text-xs font-medium text-white mb-1">Amount (৳)</label>
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

            <div className="mb-1 text-[11px] text-white/80 font-semibold">
              Payment method
            </div>

            {/* Method-specific info */}
            {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
              <div className="mb-3 text-xs text-white600 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
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
              <div className="mb-3 text-xs text-white600 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">BEP20 USDT Address</span>
                  <button
                    type="button"
                    onClick={handleCopyUsdtAddress}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] border transition-colors ${
                      isUsdtCopied
                        ? 'bg-emerald-500 text-white border-emerald-500'
                        : 'bg-emerald-500/10 text-emerald-700 border-emerald-400/60 hover:bg-emerald-500/20'
                    }`}
                  >
                    <span className="inline-block w-3 h-3 border border-emerald-600 bg-white" />
                    <span>{isUsdtCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-[11px] break-all font-mono text-white800 mb-2">
                  {usdtBep20Address}
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center overflow-hidden border border-slate-200">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(usdtBep20Address)}`}
                      alt="USDT BEP20 QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-[10px] leading-snug text-slate-700">
                    Scan this QR with your wallet to send USDT via BEP20 network.
                  </p>
                </div>

                <p className="text-[11px] leading-snug">
                  Only send USDT via BEP20 network to this address. Wrong network deposits may be lost.
                </p>
              </div>
            )}

            {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
              <div className="mb-3">
                <label className="block text-xs font-bold text-white mb-1">Txn ID for verification</label>
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

            <div className="flex items-center justify-between text-xs text-white500 mb-1">
              <span className="font-bold text-white">Available balance</span>
              <span className="font-semibold text-emerald-600">৳{balanceTk.toFixed ? balanceTk.toFixed(2) : balanceTk}</span>
            </div>

            {paymentMethod === 'usdt' && (
              <div className="flex items-center justify-between text-[11px] text-yellow-300 mb-4">
                <span>Approx. balance in USDT</span>
                <span className="font-semibold text-yellow-200">
                  ≈ {(balanceTk * usdtRate).toFixed(2)} USDT
                </span>
              </div>
            )}

            <div className="flex gap-3 mt-2">
              <button
                onClick={closeDepositModal}
                className="flex-1 border border-gray-200 text-yellow-300 text-sm font-medium py-2 rounded-xl hover:bg-gray-50 disabled:opacity-60"
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
        </div>
      )}

      {/* Withdraw Modal */}
      {isWithdrawOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm mx-4 bg-[#191970] rounded-2xl shadow-2xl border border-blue-800 p-5">
            <h2 className="text-lg font-bold text-white mb-3 text-center">Withdraw Funds</h2>
            <p className="text-xs text-yellow-100 mb-4 text-center">Select a payout method and enter the amount you want to withdraw from your MCFB account.</p>

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
                    : 'bg-slate-50 text-white800 border-slate-200 hover:bg-slate-100'
                }`}
                disabled={isWithdrawing}
              >
                USDT
              </button>
            </div>

            <div className="mb-3">
              <label className="block text-xs font-medium text-white mb-1">Amount (৳)</label>
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
                <div className="mb-3 text-xs text-white600 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
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
                  <label className="block text-xs font-medium text-white mb-1">Your wallet number</label>
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
                <div className="mb-3 text-xs text-white600 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">Your BEP20 USDT Address</span>
                  </div>
                  <p className="text-[11px] leading-snug">
                    Paste your personal BEP20 USDT wallet address where you want to receive the withdraw.
                  </p>
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-medium text-white mb-1">BEP20 address</label>
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

            <div className="flex items-center justify-between text-xs text-white mb-1">
              <span>Current balance</span>
              <span className="font-semibold text-white">৳{balanceTk.toFixed ? balanceTk.toFixed(2) : balanceTk}</span>
            </div>

            {withdrawMethod === 'usdt' && (
              <div className="flex items-center justify-between text-[11px] text-yellow-300 mb-4">
                <span>Approx. withdraw in USDT</span>
                <span className="font-semibold text-yellow-200">
                  {withdrawAmount ? `≈ ${(Number(withdrawAmount) * usdtRate).toFixed(2)} USDT` : '—'}
                </span>
              </div>
            )}

            <div className="flex gap-3 mt-2">
              <button
                onClick={closeWithdrawModal}
                className="flex-1 border border-gray-200 text-yellow-300 text-sm font-medium py-2 rounded-xl hover:bg-gray-50 disabled:opacity-60"
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

      {/* Review Modal */}
      {isReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm mx-4 bg-[#191970] rounded-2xl shadow-2xl border border-blue-800 p-5">
            <h2 className="text-lg font-bold text-white mb-3 text-center">Write a Review</h2>
            <p className="text-xs text-yellow-100 mb-4 text-center">Share your experience with MOZAMMEL MCFB</p>

            {/* Star Rating */}
            <div className="mb-4">
              <label className="block text-yellow-200 text-sm font-medium mb-2">Your Rating</label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewData(prev => ({ ...prev, rating: star }))}
                    className="transition-transform hover:scale-110"
                  >
                    <svg
                      className={`w-8 h-8 ${star <= reviewData.rating ? "text-amber-400 fill-current" : "text-white400"}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-yellow-200 text-sm font-medium mb-2">Your Name</label>
              <input
                type="text"
                value={reviewData.name}
                onChange={(e) => setReviewData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 bg-blue-900/50 border border-blue-700 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>

            {/* Comment Input */}
            <div className="mb-4">
              <label className="block text-yellow-200 text-sm font-medium mb-2">Your Review</label>
              <textarea
                value={reviewData.comment}
                onChange={(e) => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
                className="w-full px-3 py-2 bg-blue-900/50 border border-blue-700 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
                rows={4}
                placeholder="Share your experience..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsReviewOpen(false)}
                className="flex-1 border border-blue-600 text-blue-200 text-sm font-medium py-2 rounded-xl hover:bg-blue-800/50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!reviewData.name.trim() || !reviewData.comment.trim()) {
                    alert('Please fill in all fields');
                    return;
                  }

                  setIsSubmittingReview(true);
                  try {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    // Show success message
                    alert('Thank you for your review! It will be published after moderation.');
                    
                    // Reset form and close modal
                    setReviewData({ rating: 5, name: '', comment: '' });
                    setIsReviewOpen(false);
                  } catch (error) {
                    alert('Failed to submit review. Please try again.');
                  } finally {
                    setIsSubmittingReview(false);
                  }
                }}
                disabled={isSubmittingReview}
                className="flex-1 bg-amber-400 hover:bg-amber-500 text-white800 font-semibold py-2 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmittingReview ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Review'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Support Button (aligned with bottom nav) */}
      <div className="fixed bottom-20 left-0 right-0 z-50 flex justify-end max-w-md mx-auto px-4 pointer-events-none">
        <button
          type="button"
          onClick={() => window.open('https://t.me/demomcfbsupport', '_blank')}
          className="pointer-events-auto w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-xl shadow-emerald-900/60 flex items-center justify-center border-2 border-white/80"
          aria-label="Support"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      </div>

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
      <div className={active ? "text-purple-600" : "text-amber-500"}>
        {icon}
      </div>
      <span className={`text-xs ${active ? "text-red-600 font-semibold" : "text-amber-500"}`}>{label}</span>
    </button>
  );
}

export default App;
