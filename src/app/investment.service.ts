import { Injectable, signal } from '@angular/core';
import { ICreateInvestment, IInvestmentResult } from './investment.model';
import { calculateInvestmentResults } from '../investment-results';

const INVESTMENT_RESULTS_KEY = 'investmentResults';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  private investmentResults = signal<IInvestmentResult[]>(
    JSON.parse(localStorage.getItem(INVESTMENT_RESULTS_KEY) ?? '[]'),
  );

  public getInvestmentResults() {
    return this.investmentResults();
  }

  public addInvestmentResult(result: ICreateInvestment) {
    const investmentResults: IInvestmentResult[] =
      calculateInvestmentResults(result);

    this.investmentResults.set(investmentResults);

    this.saveInvestmentResults();
  }

  private saveInvestmentResults() {
    localStorage.setItem(
      INVESTMENT_RESULTS_KEY,
      JSON.stringify(this.investmentResults()),
    );
  }
}
