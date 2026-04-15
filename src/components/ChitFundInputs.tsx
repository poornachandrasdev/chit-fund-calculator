import React from 'react';
import { Calculator, AlertCircle } from 'lucide-react';
import { defaultValues } from '../constants/translations';

interface ChitFundInputsProps {
  calcInputs: {
    totalMembers: string | number;
    monthlyContribution: string | number;
    firstWithdrawal: string | number;
    finalWithdrawal: string | number;
    monthlyIncrement: string | number;
    commissionType: 'monthly' | 'onetime';
    commissionRate: string | number;
    oneTimeCommission: string | number;
    loanInterestRate: string | number;
  };
  setCalcInputs: React.Dispatch<React.SetStateAction<any>>;
  t: any;
  showResults: boolean;
}

const ChitFundInputs: React.FC<ChitFundInputsProps> = ({ calcInputs, setCalcInputs, t, showResults }) => {
  return (
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
            min="1"
            max="2000"
            value={calcInputs.totalMembers}
            onChange={(e) => {
              const value = e.target.value;
              setCalcInputs({ ...calcInputs, totalMembers: value === '' ? '' : parseInt(value) });
            }}
            placeholder={`Default: ${defaultValues.totalMembers}`}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.monthlyContribution} (₹)</label>
          <input
            type="number"
            min="1"
            max="10000000"
            value={calcInputs.monthlyContribution}
            onChange={(e) => {
              const value = e.target.value;
              setCalcInputs({ ...calcInputs, monthlyContribution: value === '' ? '' : parseInt(value) });
            }}
            placeholder={`Default: ${defaultValues.monthlyContribution}`}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.firstWithdrawal} (₹)</label>
          <input
            type="number"
            min="1"
            max="100000000"
            value={calcInputs.firstWithdrawal}
            onChange={(e) => {
              const value = e.target.value;
              setCalcInputs({ ...calcInputs, firstWithdrawal: value === '' ? '' : parseInt(value) });
            }}
            placeholder={`Default: ${defaultValues.firstWithdrawal}`}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.monthlyIncrement} (₹)</label>
          <input
            type="number"
            min="0"
            max="1000000"
            value={calcInputs.monthlyIncrement}
            onChange={(e) => {
              const value = e.target.value;
              setCalcInputs({ ...calcInputs, monthlyIncrement: value === '' ? '' : parseInt(value) });
            }}
            placeholder={`Default: ${defaultValues.monthlyIncrement}`}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.loanInterestRate}</label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={calcInputs.loanInterestRate}
            onChange={(e) => {
              const value = e.target.value;
              setCalcInputs({ ...calcInputs, loanInterestRate: value === '' ? '' : parseFloat(value) });
            }}
            placeholder={`Default: ${defaultValues.loanInterestRate}`}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-3">{t.commissionType}</label>
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
            <button
              onClick={() => setCalcInputs({ ...calcInputs, commissionType: 'monthly' })}
              className={`px-4 sm:px-6 py-2 rounded-lg font-medium text-sm sm:text-base transition-all ${calcInputs.commissionType === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {t.monthlyRate}
            </button>
            <button
              onClick={() => setCalcInputs({ ...calcInputs, commissionType: 'onetime' })}
              className={`px-4 sm:px-6 py-2 rounded-lg font-medium text-sm sm:text-base transition-all ${calcInputs.commissionType === 'onetime'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {t.oneTimeAmount}
            </button>
          </div>
          <input
            type="number"
            min="0"
            max={calcInputs.commissionType === 'monthly' ? "100" : "100000000"}
            step={calcInputs.commissionType === 'monthly' ? "0.1" : "1"}
            value={calcInputs.commissionType === 'monthly' ? calcInputs.commissionRate : calcInputs.oneTimeCommission}
            onChange={(e) => {
              const value = e.target.value;
              if (calcInputs.commissionType === 'monthly') {
                setCalcInputs({ ...calcInputs, commissionRate: value === '' ? '' : parseFloat(value) });
              } else {
                setCalcInputs({ ...calcInputs, oneTimeCommission: value === '' ? '' : parseInt(value) });
              }
            }}
            placeholder={calcInputs.commissionType === 'monthly' ? `Default: ${defaultValues.commissionRate}%` : `Default: ₹${defaultValues.oneTimeCommission}`}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {!showResults && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <p className="text-sm text-amber-700">{t.enterAllFields}</p>
        </div>
      )}
    </div>
  );
};

export default ChitFundInputs;