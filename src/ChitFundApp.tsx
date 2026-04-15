import { useState } from 'react';
import { Globe } from 'lucide-react';
import logo from './assets/logo.svg';
import { translations, defaultValues } from './constants/translations';
import { calculateChitDetails } from './utils/calculations';
import type { ChitCalculationResults } from './utils/calculations';
import ChitFundInputs from './components/ChitFundInputs';
import ChitFundResults from './components/ChitFundResults';

const ChitFundApp = () => {
  const [language, setLanguage] = useState<'en' | 'kn'>('en');

  const t = translations[language];

  const [calcInputs, setCalcInputs] = useState({
    totalMembers: '' as string | number,
    monthlyContribution: '' as string | number,
    firstWithdrawal: '' as string | number,
    finalWithdrawal: '' as string | number,
    monthlyIncrement: '' as string | number,
    commissionType: 'monthly' as 'monthly' | 'onetime',
    commissionRate: '' as string | number,
    oneTimeCommission: '' as string | number,
    loanInterestRate: '' as string | number
  });

  const [loanUtilization, setLoanUtilization] = useState(50);

  // Check if all required inputs are filled
  const areAllInputsFilled = (): boolean => {
    const { totalMembers, monthlyContribution, firstWithdrawal, monthlyIncrement, commissionRate, oneTimeCommission, loanInterestRate } = calcInputs;

    const isNotEmpty = (val: string | number) => val !== '' && val !== null && val !== undefined;

    if (calcInputs.commissionType === 'monthly') {
      return (
        isNotEmpty(totalMembers) &&
        isNotEmpty(monthlyContribution) &&
        isNotEmpty(firstWithdrawal) &&
        isNotEmpty(monthlyIncrement) &&
        isNotEmpty(commissionRate) &&
        isNotEmpty(loanInterestRate)
      );
    } else {
      return (
        isNotEmpty(totalMembers) &&
        isNotEmpty(monthlyContribution) &&
        isNotEmpty(firstWithdrawal) &&
        isNotEmpty(monthlyIncrement) &&
        isNotEmpty(oneTimeCommission) &&
        isNotEmpty(loanInterestRate)
      );
    }
  };

  // Get numeric value from input (returns default if empty)
  const getInputValue = (value: string | number, defaultValue: number): number => {
    if (value === '' || value === null || value === undefined) {
      return defaultValue;
    }
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(numValue) ? defaultValue : numValue;
  };

  // Prepare inputs for the calculation utility
  const results: ChitCalculationResults = calculateChitDetails({
    totalMembers: getInputValue(calcInputs.totalMembers, defaultValues.totalMembers),
    monthlyContribution: getInputValue(calcInputs.monthlyContribution, defaultValues.monthlyContribution),
    firstWithdrawal: getInputValue(calcInputs.firstWithdrawal, defaultValues.firstWithdrawal),
    monthlyIncrement: getInputValue(calcInputs.monthlyIncrement, defaultValues.monthlyIncrement),
    commissionRate: getInputValue(calcInputs.commissionRate, defaultValues.commissionRate),
    oneTimeCommission: getInputValue(calcInputs.oneTimeCommission, defaultValues.oneTimeCommission),
    loanInterestRate: getInputValue(calcInputs.loanInterestRate, defaultValues.loanInterestRate),
    commissionType: calcInputs.commissionType,
    loanUtilization: loanUtilization
  });

  const showResults = areAllInputsFilled();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg" style={{ paddingTop: 'var(--safe-area-inset-top)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 relative">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img src={logo} alt="ChitFund Calculator" className="w-9 h-9 sm:w-10 sm:h-10" />
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">{t.title}</h1>
            </div>

            <button
              onClick={() => setLanguage(language === 'en' ? 'kn' : 'en')}
              className="flex items-center gap-1.5 bg-white hover:bg-gray-100 text-blue-600 px-3 py-1.5 rounded-full transition-all shadow-md"
            >
              <Globe className="w-3.5 h-3.5" />
              <span
                className="font-medium text-xs"
                style={{
                  fontFamily: "'Noto Sans Kannada', sans-serif",
                  lineHeight: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  height: '14px',
                  paddingTop: '3px'
                }}
              >
                {language === 'en' ? 'ಕನ್ನಡ' : 'English'}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <ChitFundInputs 
          calcInputs={calcInputs} 
          setCalcInputs={setCalcInputs} 
          t={t} 
          showResults={showResults} 
        />

        {showResults && (
          <ChitFundResults 
            results={results} 
            loanUtilization={loanUtilization} 
            setLoanUtilization={setLoanUtilization} 
            t={t} 
          />
        )}
      </div>
    </div>
  );
};

export default ChitFundApp;