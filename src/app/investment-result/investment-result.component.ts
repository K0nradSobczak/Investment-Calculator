import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IInvestmentResult } from '../investment.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-investment-result',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-result.component.html',
  styleUrl: './investment-result.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestmentResultComponent {
  public results = input.required<IInvestmentResult[]>();
}
