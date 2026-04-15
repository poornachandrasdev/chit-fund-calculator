import React from 'react';
import { DollarSign, TrendingUp, Users } from 'lucide-react';
import { formatIndianCurrency } from '../utils/formatters';
import type { ChitCalculationResults } from '../utils/calculations';

interface ChitFundResultsProps {
  results: ChitCalculationResults;
  loanUtilization: number;
  setLoanUtilization: React.Dispatch<React.SetStateAction<number>>;
  t: any;
}

const ChitFundResults: React.FC<ChitFundResultsProps> = ({ results, loanUtilization, setLoanUtilization, t }) => {
  return (
    <>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
        {[
          { label: t.monthlyPool, value: `₹${formatIndianCurrency(results.totalPool)}`, icon: DollarSign, color: 'blue' },
          { label: t.commissionPerMonth, value: `₹${formatIndianCurrency(results.commissionPerMonth)}`, icon: TrendingUp, color: 'green' },
          { label: t.duration, value: `${results.duration}`, icon: Users, color: 'purple' },
          { label: t.totalLoans, value: `₹${formatIndianCurrency(results.totalLoanAmount)}`, icon: DollarSign, color: 'cyan' },
          { label: t.totalInterest, value: `₹${formatIndianCurrency(results.totalInterestEarned)}`, icon: TrendingUp, color: 'lime' }
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

      {/* Member Returns (IRR) */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">{t.effectiveInterest}</h3>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.member}</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.withdrawalMonth}</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.totalContribution}</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.withdrawal}</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.netReturn}</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.monthlyIRR}</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.effectiveInterestRate}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {results.memberReturns.map((member) => (
                <tr key={member.member} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900">{member.member}</td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">{t.month} {member.withdrawalMonth}</td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">₹{member.totalContribution.toLocaleString()}</td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-blue-600">₹{member.withdrawal.toLocaleString()}</td>
                  <td className={`px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium ${member.netReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {member.netReturn >= 0 ? '+' : ''}₹{member.netReturn.toLocaleString()}
                  </td>
                  <td className={`px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium ${member.monthlyIRR !== null && member.monthlyIRR >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {member.monthlyIRR !== null ? `${member.monthlyIRR >= 0 ? '+' : ''}${member.monthlyIRR.toFixed(2)}%` : '-'}
                  </td>
                  <td className={`px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-bold ${member.annualizedIRR !== null && member.annualizedIRR >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {member.annualizedIRR !== null ? `${member.annualizedIRR >= 0 ? '+' : ''}${member.annualizedIRR.toFixed(1)}%` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          * {t.irrExplanation}
        </p>
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
    </>
  );
};

export default ChitFundResults;