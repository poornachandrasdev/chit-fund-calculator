import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Users, Globe } from 'lucide-react';
import logo from './assets/logo.svg';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Format number in Indian numbering system (lakhs, thousands)
const formatIndianCurrency = (num: number): string => {
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) {
    return `${(num / 100000).toFixed(2)} L`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(2)} K`;
  }
  return num.toFixed(0);
};

const ChitFundApp = () => {
  const [language, setLanguage] = useState<'en' | 'kn'>('en');
  
  const translations = {
    en: {
      title: 'ChitFund Calculator',
      subtitle: 'Calculate chit fund withdrawals with multiple members per month',
      inputParams: 'Input Parameters',
      totalMembers: 'Total Members',
      monthlyContribution: 'Monthly Contribution',
      firstWithdrawal: 'First Withdrawal Amount (Month 1)',
      finalWithdrawal: 'Final Withdrawal Amount (Last Month)',
      monthlyIncrement: 'Monthly Increment',
      loanInterestRate: 'Loan Interest Rate (% per month)',
      commissionType: 'Commission Type',
      monthlyRate: 'Monthly Rate (%)',
      oneTimeAmount: 'One-Time Amount (₹)',
      calculatedResults: 'Calculated Results',
      monthlyPool: 'Monthly Pool Amount',
      commissionPerMonth: 'Commission Per Month',
      totalCommission: 'Total Commission',
      netPool: 'Net Pool Per Month (After Commission)',
      duration: 'Duration (Months)',
      membersServed: 'Members Served',
      finalBalance: 'Final Pool Balance',
      totalLoans: 'Total Loans Given',
      totalInterest: 'Total Interest Earned',
      loanUtilization: 'Loan Utilization',
      adjustUtilization: 'Adjust loan utilization percentage',
      withdrawalTrends: 'Withdrawal & Pool Trends',
      loanDistribution: 'Loan Distribution & Interest Earned',
      contributionVsWithdrawal: 'Contribution vs Withdrawal per Member',
      withdrawalSchedule: 'Withdrawal Schedule',
      loanSchedule: 'Loan Schedule',
      month: 'Month',
      withdrawalAmount: 'Withdrawal Amount',
      membersWithdrawing: 'Members Withdrawing',
      contribution: 'Per Member Contribution',
      newContributions: 'New Contributions',
      carryOver: 'Carry Over',
      availablePool: 'Available Pool',
      totalWithdrawn: 'Total Withdrawn',
      remainingPool: 'Remaining Pool',
      membersLeft: 'Members Left',
      availableForLoan: 'Available',
      loanGiven: 'Loan Given',
      interestEarned: 'Interest Earned',
      repaymentDue: 'Repayment Due',
      allMembers: 'All members served!',
      waiting: 'members waiting',
      fromPool: 'From remaining pool across all months',
      atRate: 'At',
      perMonth: 'per month',
      afterAll: 'Remaining after all withdrawals',
      overPeriod: 'Over full',
      monthPeriod: 'month period',
      loanAmount: 'Loan Amount',
      interest: 'Interest',
      withdrawal: 'Withdrawal',
      pool: 'Pool'
    },
    kn: {
      title: 'ಚೀಟಿ ಲೆಕ್ಕಾಚಾರ',
      subtitle: 'ಚೀಟಿ ವ್ಯವಹಾರದ ಉಳಿತಾಯ ಮತ್ತು ಲೆಕ್ಕ',
      inputParams: 'ಕೆಳಗಿನ ವಿವರಗಳನ್ನು ತುಂಬಿಸಿ',
      totalMembers: 'ಒಟ್ಟು ಸದಸ್ಯರು',
      monthlyContribution: 'ತಿಂಗಳ ಕಂತು ',
      firstWithdrawal: 'ಮೊದಲ ಚೀಟಿ (ತಿಂಗಳು 1)',
      finalWithdrawal: 'ಕೊನೆಯ ಚೀಟಿ (ಕೊನೆಯ ತಿಂಗಳು)',
      monthlyIncrement: 'ಪ್ರತಿ ತಿಂಗಳ ಏರಿಕೆ ಹಣ',
      loanInterestRate: 'ಚೀಟಿ ಉಳಿಕೆ ಮೊತ್ತದ - ಬಡ್ಡಿ ದರ (% ಪ್ರತಿ ತಿಂಗಳು)',
      commissionType: 'ಕಮಿಷನ್ ರೀತಿ',
      monthlyRate: 'ತಿಂಗಳ ಕಮಿಷನ್  (%)',
      oneTimeAmount: 'ಒಟ್ಟು ಕಮಿಷನ್ ಮೊತ್ತ (₹)',
      calculatedResults: 'ಲೆಕ್ಕಾಚಾರ ಫಲಿತಾಂಶಗಳು',
      monthlyPool: 'ತಿಂಗಳ ಸೇರುವ ಒಟ್ಟು ಚೀಟಿ ಮೊತ್ತ',
      commissionPerMonth: 'ಪ್ರತಿ ತಿಂಗಳ ಕಮಿಷನ್',
      totalCommission: 'ಒಟ್ಟು ಕಮಿಷನ್',
      netPool: 'ನಿವ್ವಳ ಪೂಲ್ ಪ್ರತಿ ತಿಂಗಳು (ಕಮಿಷನ್ ನಂತರ)',
      duration: 'ಒಟ್ಟು ಚೀಟಿ ತಿಂಗಳುಗಳು',
      membersServed: 'ಚೀಟಿ ಪಡೆದ ಸದಸ್ಯರು',
      finalBalance: 'ಕೊನೆಯ ಪೂಲ್ ಬಾಲೆನ್ಸ್',
      totalLoans: 'ಬಡ್ಡಿಗೆ ನೀಡಿದ ಒಟ್ಟು ಹಣ',
      totalInterest: 'ಗಳಿಸಿದ ಒಟ್ಟು ಬಡ್ಡಿ',
      loanUtilization: 'ಪ್ರತಿ ತಿಂಗಳು ಬಡ್ಡಿಗೆ ಹೋಗುವ ಶೇಕಡಾವಾರು ಹಣ',
      adjustUtilization: 'ಅಂದಾಜು ಮಾಡಲು ಸರಿಹೊಂದಿಸಿ',
      withdrawalTrends: 'ಹಿಂಪಡೆಯುವಿಕೆ ಮತ್ತು ತಿಂಗಳಿನ ಚೀಟಿ ಹಣದ ಗ್ರಾಫ್',
      loanDistribution: 'ಸಾಲ ವಿತರಣೆ ಮತ್ತು ಬಡ್ಡಿ ಗಳಿಕೆ',
      contributionVsWithdrawal: 'ಪ್ರತಿ ಸದಸ್ಯರ ಕಟ್ಟುವಿಕೆ ಹಾಗೂ ಹಿಂಪಡೆಯುವಿಕೆ',
      withdrawalSchedule: 'ಹಿಂಪಡೆಯುವಿಕೆ ವೇಳಾಪಟ್ಟಿ',
      loanSchedule: 'ಸಾಲದ ವೇಳಾಪಟ್ಟಿ',
      month: 'ತಿಂಗಳು',
      withdrawalAmount: 'ಹಿಂಪಡೆಯುವ ಮೊತ್ತ',
      membersWithdrawing: 'ಹಿಂಪಡೆಯುವ ಸದಸ್ಯರು',
      contribution: 'ಪ್ರತಿ ಸದಸ್ಯರ ನೀಡುವಿಕೆ',
      newContributions: 'ಹೊಸ ನೀಡುವಿಕೆ',
      carryOver: 'ತಿಂಗಳ ಮಿಕ್ಕಿದ ಹಣ',
      availablePool: 'ಸದರಿ ಚೀಟಿಯ ಒಟ್ಟು ಹಣ',
      totalWithdrawn: 'ಒಟ್ಟು ಹಿಂಪಡೆಯಲಾಗಿದೆ',
      remainingPool: 'ಸದರಿ ಚೀಟಿಯ ಉಳಿದ ಹಣ',
      membersLeft: 'ಉಳಿದ ಸದಸ್ಯರು',
      availableForLoan: 'ಲಭ್ಯವಿದೆ',
      loanGiven: 'ಸಾಲ ನೀಡಲಾಗಿದೆ',
      interestEarned: 'ಬಡ್ಡಿ ಗಳಿಸಿದೆ',
      repaymentDue: 'ಮರುಪಾವತಿ ಬಾಕಿ',
      allMembers: 'ಎಲ್ಲಾ ಸದಸ್ಯರಿಗೆ ಸೇವೆ ಸಲ್ಲಿಸಲಾಗಿದೆ!',
      waiting: 'ಸದಸ್ಯರು ಕಾಯುತ್ತಿದ್ದಾರೆ',
      fromPool: 'ಎಲ್ಲಾ ತಿಂಗಳುಗಳಲ್ಲಿ ಉಳಿದ ಪೂಲ್‌ನಿಂದ',
      atRate: '',
      perMonth: 'ಪ್ರತಿ ತಿಂಗಳು',
      afterAll: 'ಎಲ್ಲಾ ಹಿಂಪಡೆಯುವಿಕೆಗಳ ನಂತರ ಉಳಿದಿದೆ',
      overPeriod: 'ಪೂರ್ಣ',
      monthPeriod: 'ತಿಂಗಳ ಅವಧಿಯ ಮೇಲೆ',
      loanAmount: 'ಸಾಲದ ಮೊತ್ತ',
      interest: 'ಬಡ್ಡಿ',
      withdrawal: 'ಹಿಂಪಡೆಯುವಿಕೆ',
      pool: 'ಪೂಲ್'
    }
  };

  const t = translations[language];
  
  const [calcInputs, setCalcInputs] = useState({
    totalMembers: 20,
    monthlyContribution: 5000,
    firstWithdrawal: 80000,
    finalWithdrawal: 99000,
    monthlyIncrement: 1000,
    commissionType: 'monthly',
    commissionRate: 5,
    oneTimeCommission: 10000,
    loanInterestRate: 2
  });
  
  const [loanUtilization, setLoanUtilization] = useState(50);

  const calculateChitDetails = () => {
    const { totalMembers, monthlyContribution, firstWithdrawal, monthlyIncrement, commissionType, commissionRate, oneTimeCommission, loanInterestRate } = calcInputs;
    
    const duration = totalMembers;
    const totalPool = totalMembers * monthlyContribution;
    
    let commissionPerMonth;
    let totalCommission;
    
    if (commissionType === 'monthly') {
      commissionPerMonth = (totalPool * commissionRate) / 100;
      totalCommission = commissionPerMonth * duration;
    } else {
      totalCommission = oneTimeCommission;
      commissionPerMonth = oneTimeCommission / duration;
    }
    
    const netPoolPerMonth = totalPool - commissionPerMonth;
    
    const withdrawalSchedule = [];
    let remainingMembers = totalMembers;
    let carryOverPool = 0;
    let loanRepaymentDue = 0;
    
    const loanDetails = [];
    let totalLoanAmount = 0;
    let totalInterestEarned = 0;
    
    for (let i = 0; i < duration && remainingMembers > 0; i++) {
      const withdrawalAmount = firstWithdrawal + (monthlyIncrement * i);
      const effectiveCarryOver = carryOverPool + loanRepaymentDue;
      
      let currentMonthContribution = netPoolPerMonth;
      let contributionPerMember = monthlyContribution;
      let availablePool = netPoolPerMonth + effectiveCarryOver;
      
      const totalRequiredForRemainingMembers = remainingMembers * withdrawalAmount;
      const isLastMonth = totalRequiredForRemainingMembers < availablePool;
      
      if (isLastMonth) {
        const requiredNet = totalRequiredForRemainingMembers - effectiveCarryOver;
        
        if (requiredNet <= 0) {
          currentMonthContribution = 0;
          contributionPerMember = 0;
          availablePool = effectiveCarryOver;
        } else {
          const grossRequired = requiredNet + commissionPerMonth;
          contributionPerMember = grossRequired / totalMembers;
          
          const totalGrossContribution = contributionPerMember * totalMembers;
          currentMonthContribution = totalGrossContribution - commissionPerMonth;
          availablePool = currentMonthContribution + effectiveCarryOver;
        }
      }
      
      const maxWithdrawalsBasedOnPool = Math.floor(availablePool / withdrawalAmount);
      const actualWithdrawals = Math.min(maxWithdrawalsBasedOnPool, remainingMembers);
      const totalWithdrawn = withdrawalAmount * actualWithdrawals;
      const remainingPool = availablePool - totalWithdrawn;
      
      let loanAmount = 0;
      let interestEarned = 0;
      let nextMonthRepayment = 0;
      
      if (!isLastMonth && remainingPool > 0) {
        loanAmount = (remainingPool * loanUtilization) / 100;
        interestEarned = (loanAmount * loanInterestRate) / 100;
        nextMonthRepayment = loanAmount + interestEarned;
        
        totalLoanAmount += loanAmount;
        totalInterestEarned += interestEarned;
        
        loanDetails.push({
          month: i + 1,
          availableForLoan: Math.round(remainingPool),
          loanAmount: Math.round(loanAmount),
          interestRate: loanInterestRate,
          interestEarned: Math.round(interestEarned),
          repaymentDue: Math.round(nextMonthRepayment)
        });
      }
      
      carryOverPool = remainingPool - loanAmount;
      loanRepaymentDue = nextMonthRepayment;
      remainingMembers -= actualWithdrawals;
      
      withdrawalSchedule.push({
        month: i + 1,
        withdrawalAmount: Math.round(withdrawalAmount),
        contributionPerMember: Math.round(contributionPerMember),
        newContributions: Math.round(currentMonthContribution),
        carryOverFromPrevious: Math.round(effectiveCarryOver),
        availablePool: Math.round(availablePool),
        actualWithdrawals: actualWithdrawals,
        totalWithdrawn: Math.round(totalWithdrawn),
        remainingPool: Math.round(remainingPool),
        remainingMembersAfter: remainingMembers,
        isLastMonth: isLastMonth
      });
      
      if (remainingMembers === 0) break;
    }
    
    return {
      duration: withdrawalSchedule.length,
      totalPool,
      commissionPerMonth: Math.round(commissionPerMonth),
      totalCommission: Math.round(totalCommission),
      netPoolPerMonth,
      withdrawalSchedule,
      totalMembersServed: totalMembers - withdrawalSchedule[withdrawalSchedule.length - 1].remainingMembersAfter,
      finalCarryOver: withdrawalSchedule[withdrawalSchedule.length - 1].remainingPool,
      loanDetails,
      totalLoanAmount: Math.round(totalLoanAmount),
      totalInterestEarned: Math.round(totalInterestEarned)
    };
  };

  const results = calculateChitDetails();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="ChitFund Calculator" className="w-10 h-10 sm:w-12 sm:h-12" />
            <h1 className="text-2xl sm:text-3xl font-bold">{t.title}</h1>
          </div>
          <button
            onClick={() => setLanguage(language === 'en' ? 'kn' : 'en')}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-all text-white"
          >
            <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base" style={{ fontFamily: "'Noto Sans Kannada', sans-serif" }}>{language === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            {t.inputParams}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.totalMembers}</label>
              <input
                type="number"
                value={calcInputs.totalMembers}
                onChange={(e) => setCalcInputs({...calcInputs, totalMembers: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.monthlyContribution} (₹)</label>
              <input
                type="number"
                value={calcInputs.monthlyContribution}
                onChange={(e) => setCalcInputs({...calcInputs, monthlyContribution: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.firstWithdrawal} (₹)</label>
              <input
                type="number"
                value={calcInputs.firstWithdrawal}
                onChange={(e) => setCalcInputs({...calcInputs, firstWithdrawal: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.monthlyIncrement} (₹)</label>
              <input
                type="number"
                value={calcInputs.monthlyIncrement}
                onChange={(e) => setCalcInputs({...calcInputs, monthlyIncrement: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.loanInterestRate}</label>
              <input
                type="number"
                step="0.1"
                value={calcInputs.loanInterestRate}
                onChange={(e) => setCalcInputs({...calcInputs, loanInterestRate: parseFloat(e.target.value) || 0})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-3">{t.commissionType}</label>
              <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
                <button
                  onClick={() => setCalcInputs({...calcInputs, commissionType: 'monthly'})}
                  className={`px-4 sm:px-6 py-2 rounded-lg font-medium text-sm sm:text-base transition-all ${
                    calcInputs.commissionType === 'monthly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {t.monthlyRate}
                </button>
                <button
                  onClick={() => setCalcInputs({...calcInputs, commissionType: 'onetime'})}
                  className={`px-4 sm:px-6 py-2 rounded-lg font-medium text-sm sm:text-base transition-all ${
                    calcInputs.commissionType === 'onetime'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {t.oneTimeAmount}
                </button>
              </div>
              <input
                type="number"
                step={calcInputs.commissionType === 'monthly' ? "0.1" : "1"}
                value={calcInputs.commissionType === 'monthly' ? calcInputs.commissionRate : calcInputs.oneTimeCommission}
                onChange={(e) => {
                  if (calcInputs.commissionType === 'monthly') {
                    setCalcInputs({...calcInputs, commissionRate: parseFloat(e.target.value) || 0});
                  } else {
                    setCalcInputs({...calcInputs, oneTimeCommission: parseInt(e.target.value) || 0});
                  }
                }}
                className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
          {[
            { label: t.monthlyPool, value: `₹${formatIndianCurrency(results.totalPool)}`, icon: DollarSign, color: 'blue' },
            { label: t.commissionPerMonth, value: `₹${formatIndianCurrency(results.commissionPerMonth)}`, icon: TrendingUp, color: 'green' },
            { label: t.duration, value: `${results.duration}`, icon: Users, color: 'purple' },
            { label: t.totalLoans, value: `₹${formatIndianCurrency(results.totalLoanAmount)}`, icon: DollarSign, color: 'cyan' },
            { label: t.totalInterest, value: `₹${formatIndianCurrency(results.totalInterestEarned)}`, icon: TrendingUp, color: 'lime' },
            { label: t.finalBalance, value: `₹${formatIndianCurrency(results.finalCarryOver)}`, icon: DollarSign, color: 'orange' }
          ].map((metric, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-3 sm:p-4">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-${metric.color}-400 to-${metric.color}-600 flex items-center justify-center mb-2 sm:mb-3`}>
                <metric.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <p className="text-xs text-gray-600 mb-1 truncate">{metric.label}</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Loan Utilization */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base sm:text-lg font-bold text-gray-800">{t.loanUtilization}</h3>
            <span className="text-xl sm:text-2xl font-bold text-blue-600">{loanUtilization}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={loanUtilization}
            onChange={(e) => setLoanUtilization(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${loanUtilization}%, #e5e7eb ${loanUtilization}%, #e5e7eb 100%)`
            }}
          />
          <p className="text-sm text-gray-600 mt-2">{t.adjustUtilization}</p>
        </div>

        {/* Charts */}
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">{t.withdrawalTrends}</h3>
            <div className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={results.withdrawalSchedule}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Area type="monotone" dataKey="withdrawalAmount" stroke="#3b82f6" fill="#93c5fd" name={t.withdrawal} />
                  <Area type="monotone" dataKey="availablePool" stroke="#10b981" fill="#86efac" name={t.pool} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {results.loanDetails.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">{t.loanDistribution}</h3>
              <div className="h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.loanDetails}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="loanAmount" fill="#06b6d4" name={t.loanAmount} />
                    <Bar dataKey="interestEarned" fill="#84cc16" name={t.interest} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Tables */}
        <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <details className="cursor-pointer">
              <summary className="text-base sm:text-lg font-bold text-gray-800 mb-4">{t.withdrawalSchedule}</summary>
              <div className="overflow-x-auto mt-4 -mx-4 sm:mx-0">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.month}</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.withdrawalAmount}</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.membersWithdrawing}</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.contribution}</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.availablePool}</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.remainingPool}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {results.withdrawalSchedule.map((item) => (
                      <tr key={item.month} className={`hover:bg-gray-50 ${item.isLastMonth ? 'bg-yellow-50' : ''}`}>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900">{t.month} {item.month}</td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">₹{item.withdrawalAmount.toLocaleString()}</td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-blue-600">{item.actualWithdrawals}</td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">₹{item.contributionPerMember.toLocaleString()}</td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-purple-600">₹{item.availablePool.toLocaleString()}</td>
                        <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">₹{item.remainingPool.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>

          {results.loanDetails.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <details className="cursor-pointer">
                <summary className="text-base sm:text-lg font-bold text-gray-800 mb-4">{t.loanSchedule}</summary>
                <div className="overflow-x-auto mt-4 -mx-4 sm:mx-0">
                  <table className="w-full min-w-[500px]">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.month}</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.availableForLoan}</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.loanGiven}</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.interestEarned}</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.repaymentDue}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {results.loanDetails.map((loan) => (
                        <tr key={loan.month} className="hover:bg-gray-50">
                          <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900">{t.month} {loan.month}</td>
                          <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">₹{loan.availableForLoan.toLocaleString()}</td>
                          <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-cyan-600">₹{loan.loanAmount.toLocaleString()}</td>
                          <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-green-600">₹{loan.interestEarned.toLocaleString()}</td>
                          <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-orange-600">₹{loan.repaymentDue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChitFundApp;