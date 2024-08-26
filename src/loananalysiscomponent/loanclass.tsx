import { firstOfTheMonth } from "../main/GlobalFunctions";

export class Loan {
    name?: string;
    date?: Date;
    term?: number;
    principle?: number;
    interestRate?: number;
    minimumPayment?: number;
    loanBreakdownSchedule?: LoanScheduleBreakdown[];
    extraPayments?: Map<Date, number>;
    constructor(loan: LoanParameters, additionalPayments: number, offsetBalance: number) {
        if (loan.principle>10000&&loan.interestRate!=0) {
            this.name = loan.name;
            this.date = loan.date;
            this.term = loan.term;
            this.principle = loan.principle;
            this.interestRate = loan.interestRate;
            this.loanBreakdownSchedule = this.generateLoanSchedule(loan, additionalPayments, offsetBalance)};
    }

    private generateLoanSchedule(loan: LoanParameters, additionalPayments: number, offsetBalance:number ) {
        var date = firstOfTheMonth(new Date(loan.date));
        var loanScheduleBreakdown: LoanScheduleBreakdown[] = [{
            date: new Date(date),
            principleBalance: loan.principle,
            offsetBalance: offsetBalance,
            interestRate: loan.interestRate,
            principlePayment: 0,
            interestPayment: 0,
            additionalPayment:0
        }];
        this.minimumPayment = loan.principle * (loan.interestRate / 12 * (1 + loan.interestRate / 12) ** loan.term) / ((1 + loan.interestRate / 12) ** loan.term - 1);
        var principleRemaining = loan.principle;
        let i = 1;
        do {
            date = new Date(date.setMonth(date.getMonth() + 1));
            var dateToCheck = new Date(date).toLocaleString('en-AU');
            var interestRate = loan.interestRate;
            var interest = Math.max((principleRemaining - offsetBalance) * (interestRate / 12), 0);

            var totalpaid = this.minimumPayment + additionalPayments!;
            var principleRemaining = loanScheduleBreakdown[i - 1].principleBalance - totalpaid + interest
            
            if(principleRemaining>0){
                loanScheduleBreakdown.push({
                    date: new Date(date),
                    principleBalance: principleRemaining,
                    offsetBalance: offsetBalance,
                    interestRate: interestRate,
                    principlePayment: loanScheduleBreakdown[i - 1].principleBalance - principleRemaining,
                    interestPayment: interest,
                    additionalPayment: 0
                })  
            }
            i++;
            if (i > 500) { break }
        } while (principleRemaining > 0)
        return loanScheduleBreakdown;
    }
}

export type LoanScheduleBreakdown = {
    date:Date,
    principleBalance: number,
    offsetBalance: number,
    interestRate: number,
    principlePayment: number,
    interestPayment: number,
    additionalPayment:number
}

export type LoanParameters = {
    name: string,
    date: Date,
    term: number,
    principle: number,
    interestRate: number,
}