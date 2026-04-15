export interface CalculationInputs {
  totalMembers: number;
  monthlyContribution: number;
  firstWithdrawal: number;
  monthlyIncrement: number;
  commissionRate: number;
  oneTimeCommission: number;
  loanInterestRate: number;
  commissionType: 'monthly' | 'onetime';
  loanUtilization: number;
}

export interface WithdrawalItem {
  month: number;
  withdrawalAmount: number;
  contributionPerMember: number;
  newContributions: number;
  carryOverFromPrevious: number;
  availablePool: number;
  actualWithdrawals: number;
  totalWithdrawn: number;
  remainingPool: number;
  remainingMembersAfter: number;
  isLastMonth: boolean;
}

export interface LoanDetail {
  month: number;
  availableForLoan: number;
  loanAmount: number;
  interestRate: number;
  interestEarned: number;
  repaymentDue: number;
}

export interface MemberReturn {
  member: number;
  withdrawalMonth: number;
  totalContribution: number;
  withdrawal: number;
  netReturn: number;
  returnPercent: number;
  monthlyIRR: number | null;
  annualizedIRR: number | null;
}

export interface ChitCalculationResults {
  duration: number;
  totalPool: number;
  commissionPerMonth: number;
  totalCommission: number;
  netPoolPerMonth: number;
  withdrawalSchedule: WithdrawalItem[];
  totalMembersServed: number;
  finalCarryOver: number;
  loanDetails: LoanDetail[];
  totalLoanAmount: number;
  totalInterestEarned: number;
  memberReturns: MemberReturn[];
}

// Calculate IRR (Internal Rate of Return) using Newton-Raphson method
export const calculateIRR = (cashFlows: number[], maxIterations: number = 100, tolerance: number = 1e-7): number | null => {
  let rate = 0.01;

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let dnpv = 0;

    for (let t = 0; t < cashFlows.length; t++) {
      const discountFactor = Math.pow(1 + rate, t);
      npv += cashFlows[t] / discountFactor;
      dnpv -= t * cashFlows[t] / Math.pow(1 + rate, t + 1);
    }

    if (Math.abs(npv) < tolerance) {
      return rate;
    }

    if (Math.abs(dnpv) < tolerance) {
      break;
    }

    const newRate = rate - npv / dnpv;

    if (newRate < -0.99) {
      rate = -0.5;
    } else if (newRate > 10) {
      rate = 1;
    } else {
      rate = newRate;
    }
  }

  let low = -0.99;
  let high = 10;

  for (let i = 0; i < maxIterations; i++) {
    const mid = (low + high) / 2;
    let npv = 0;

    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + mid, t);
    }

    if (Math.abs(npv) < tolerance) {
      return mid;
    }

    let npvLow = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      npvLow += cashFlows[t] / Math.pow(1 + low, t);
    }

    if (npvLow * npv > 0) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return null;
};

export const calculateChitDetails = (inputs: CalculationInputs): ChitCalculationResults => {
  const {
    totalMembers,
    monthlyContribution,
    firstWithdrawal,
    monthlyIncrement,
    commissionRate,
    oneTimeCommission,
    loanInterestRate,
    commissionType,
    loanUtilization
  } = inputs;

  if (totalMembers <= 0) {
    return {
      duration: 0,
      totalPool: 0,
      commissionPerMonth: 0,
      totalCommission: 0,
      netPoolPerMonth: 0,
      withdrawalSchedule: [],
      totalMembersServed: 0,
      finalCarryOver: 0,
      loanDetails: [],
      totalLoanAmount: 0,
      totalInterestEarned: 0,
      memberReturns: []
    };
  }

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

  const withdrawalSchedule: WithdrawalItem[] = [];
  let remainingMembers = totalMembers;
  let carryOverPool = 0;
  let loanRepaymentDue = 0;

  const loanDetails: LoanDetail[] = [];
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

  const memberReturns: MemberReturn[] = [];
  let memberNumber = 1;

  const totalContributionForAllMembers = withdrawalSchedule.reduce(
    (sum, schedule) => sum + schedule.contributionPerMember,
    0
  );

  for (const schedule of withdrawalSchedule) {
    const cashFlows: number[] = [];
    for (let month = 0; month < withdrawalSchedule.length; month++) {
      const contribution = -withdrawalSchedule[month].contributionPerMember;
      if (month + 1 === schedule.month) {
        cashFlows.push(schedule.withdrawalAmount + contribution);
      } else {
        cashFlows.push(contribution);
      }
    }

    const monthlyIRR = calculateIRR(cashFlows);
    const annualizedIRR = monthlyIRR !== null
      ? (Math.pow(1 + monthlyIRR, 12) - 1) * 100
      : null;

    for (let i = 0; i < schedule.actualWithdrawals; i++) {
      const netReturn = schedule.withdrawalAmount - totalContributionForAllMembers;
      const returnPercent = (netReturn / totalContributionForAllMembers) * 100;

      memberReturns.push({
        member: memberNumber,
        withdrawalMonth: schedule.month,
        totalContribution: Math.round(totalContributionForAllMembers),
        withdrawal: schedule.withdrawalAmount,
        netReturn: Math.round(netReturn),
        returnPercent: returnPercent,
        monthlyIRR: monthlyIRR !== null ? monthlyIRR * 100 : null,
        annualizedIRR: annualizedIRR
      });
      memberNumber++;
    }
  }

  return {
    duration: withdrawalSchedule.length,
    totalPool,
    commissionPerMonth: Math.round(commissionPerMonth),
    totalCommission: Math.round(totalCommission),
    netPoolPerMonth,
    withdrawalSchedule,
    totalMembersServed: totalMembers - (withdrawalSchedule.length > 0 ? withdrawalSchedule[withdrawalSchedule.length - 1].remainingMembersAfter : totalMembers),
    finalCarryOver: withdrawalSchedule.length > 0 ? withdrawalSchedule[withdrawalSchedule.length - 1].remainingPool : 0,
    loanDetails,
    totalLoanAmount: Math.round(totalLoanAmount),
    totalInterestEarned: Math.round(totalInterestEarned),
    memberReturns
  };
};