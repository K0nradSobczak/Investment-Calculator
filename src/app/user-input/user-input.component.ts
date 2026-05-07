import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICreateInvestment } from '../investment.model';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInputComponent {
  private investmentService = inject(InvestmentService);

  protected duration = signal<number | null>(null);
  protected expectedReturn = signal<number | null>(null);
  protected annualInvestment = signal<number | null>(null);
  protected initialInvestment = signal<number | null>(null);

  protected onSubmit() {
    // gdyby to byly stringi to mozemy je przekonwertowac na string uzywajac + przed this
    const data = {
      duration: this.duration(),
      expectedReturn: this.expectedReturn(),
      annualInvestment: this.annualInvestment(),
      initialInvestment: this.initialInvestment(),
    };

    if (!Object.values(data).includes(null)) {
      this.investmentService.addInvestmentResult(data as ICreateInvestment);
    }
  }

  protected preventInvalidCharacters(event: KeyboardEvent) {
    const forbiddenKeys = ['e', 'E', '+', '-'];

    if (forbiddenKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}
