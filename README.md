# 📈 Investment Calculator – Angular Signals Edition 🚀

Witaj w projekcie **Kalkulatora Inwestycyjnego**! To aplikacja stworzona w celach edukacyjnych, demonstrująca nowoczesne podejście do budowania aplikacji w **Angularze** z wykorzystaniem **Signals**, **Services** oraz czystej logiki biznesowej.

---

## 🌟 Główne Funkcjonalności

* 🧮 **Precyzyjne Obliczenia** – Wykorzystanie algorytmu procentu składanego.
* ⚡ **Angular Signals** – W pełni reaktywny interfejs bez zbędnego odświeżania.
* 💾 **LocalStorage Persistency** – Twoje wyniki nie znikają po odświeżeniu strony.
* 🛡️ **Clean Architecture** – Separacja logiki biznesowej od komponentów UI.
* 📊 **Interactive Table** – Przejrzysta prezentacja danych rok po roku.

---

## 🛠️ Stos Technologiczny

* **Framework:** [Angular (Standalone Components)](https://angular.io/) 🅰️
* **State Management:** Angular Signals 📶
* **Styling:** CSS3 (Custom Properties) 🎨
* **Language:** TypeScript 📘

---

## 🏗️ Architektura Projektu

Aplikacja została zaprojektowana zgodnie z zasadą **Separation of Concerns**:

1.  **Logic (`investment-results.ts`)**: Czysta funkcja matematyczna, niezależna od frameworka.
2.  **Service (`investment.service.ts`)**: Zarządzanie stanem aplikacji, obsługa `localStorage` i wystawianie sygnałów `ReadOnly`.
3.  **Components**:
  * `UserInput`: Przechwytywanie danych od użytkownika.
  * `InvestmentResult`: Prezentacja danych w formie tabeli.
  * `Header`: Elementy wizualne.

---

## 🚀 Jak uruchomić projekt?

1.  **Sklonuj repozytorium**
    ```bash
    git clone [https://github.com/twoj-user/investment-calculator.git](https://github.com/twoj-user/investment-calculator.git)
    ```

2.  **Zainstaluj zależności**
    ```bash
    npm install
    ```

3.  **Uruchom serwer deweloperski**
    ```bash
    ng serve
    ```
    Otwórz przeglądarkę na `http://localhost:4200/`.

---

## 👨‍💻 Przykład implementacji Sygnałów

W serwisie dbamy o to, aby stan był bezpieczny i reaktywny:

```typescript
// investment.service.ts
private investmentResults = signal<IInvestmentResult[]>(
  JSON.parse(localStorage.getItem('results') ?? '[]')
);

// Udostępniamy sygnał tylko do odczytu
public result = this.investmentResults.asReadonly();
```

W komponencie korzystamy z automatycznego odświeżania:

```html
@if (results().length > 0) {
  <app-investment-result [results]="results()" />
}
```

---

## 📝 Licencja

Projekt stworzony w celach naukowych. Możesz go dowolnie modyfikować i używać do własnej nauki! 🎓

---
PRO TIP: Pamiętaj o walidacji danych na Backendzie – Frontend to tylko Twoja pierwsza linia obrony! 🛡️
