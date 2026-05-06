import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICreateInvestment } from '../investment.model';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  private investmentService = inject(InvestmentService);

  duration: number | null = null;
  expectedReturn: number | null = null;
  annualInvestment: number | null = null;
  initialInvestment: number | null = null;

  onSubmit() {
    const data = {
      duration: this.duration,
      expectedReturn: this.expectedReturn,
      annualInvestment: this.annualInvestment,
      initialInvestment: this.initialInvestment,
    };

    if (!Object.values(data).includes(null)) {
      this.investmentService.addInvestmentResult(data as ICreateInvestment);
    }
  }
}
