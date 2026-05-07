# 🚀 Przewodnik po OnPush w Angularze: Turbo-Wydajność i Alternatywy! 🏎️

Hej! 👋 Jeśli tworzysz aplikacje w Angularze i chcesz, żeby śmigały z prędkością światła, to jesteś w idealnym miejscu! Dziś zanurzymy się w fascynujący świat **Detekcji Zmian (Change Detection)**, a dokładniej weźmiemy pod lupę magiczną strategię `OnPush` oraz jej nowoczesne alternatywy. 🌟

Zapnij pasy, bierzemy się do pracy! ☕💻

---

## 🤔 O co w ogóle chodzi z tą Detekcją Zmian?

Zanim pokochasz `OnPush`, musimy zrozumieć, z czym walczymy. 🥷

Domyślnie Angular działa trochę jak nadopiekuńczy rodzic. Kiedykolwiek w Twojej aplikacji wydarzy się **CÓKOLWIEK** (klikniesz przycisk, przyjdą dane z serwera, odpali się `setTimeout`), Angular mówi:
> *"Ojej! Coś się stało! Lepiej sprawdzę CAŁĄ aplikację od góry do dołu, żeby upewnić się, czy nie trzeba zaktualizować jakiegoś tekstu na ekranie!"* 🏃‍♂️💨

Nazywamy to strategią **Default** (`ChangeDetectionStrategy.Default`). Dla małych aplikacji to super wygodne. Ale gdy Twoja apka rośnie i ma setki komponentów... ten proces zaczyna mocno zamulać przeglądarkę. 🐢

---

## 🛡️ Wejście smoka: `OnPush`

I tu pojawia się nasz bohater – **OnPush**! 🦸‍♂️ To flaga, którą przypinasz do komponentu, mówiąc Angularowi:
> *"Hej, wyluzuj. Ten komponent jest mądry. Nie musisz go sprawdzać przy każdej okazji. Powiem Ci, kiedy masz to zrobić."* 🛑

### Jak to włączyć? 🛠️

To banalnie proste! Wystarczy dodać jedną linijkę w dekoratorze `@Component`:

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-super-fast',
  templateUrl: './super-fast.component.html',
  // 👇 OTO NASZA MAGIA! 👇
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuperFastComponent {
  // ... kod komponentu
}
```

### 🚦 Kiedy Angular ZAKTUALIZUJE komponent z OnPush?

Skoro odcięliśmy komponent od domyślnych aktualizacji, to kiedy widok faktycznie się odświeży? Tylko w tych 4 ściśle określonych sytuacjach:

1. **Zmieni się referencja `@Input()`** 📦
   Jeśli przekazujesz dane z komponentu rodzica do dziecka, Angular sprawdzi dziecko TYLKO, jeśli całe "pudełko" z danymi zostanie wymienione na nowe (tzw. zmiana referencji).
2. **Wydarzy się event z poziomu DOM** 🖱️
   Jeśli użytkownik kliknie przycisk `(click)` wewnątrz tego komponentu lub wpisze coś w input `(input)`.
3. **Użyjesz `AsyncPipe` w HTML-u** ⏳
   Kiedy zrobisz `{{ dane$ | async }}`, Angular sam wie, że gdy przyjdą nowe dane ze strumienia, trzeba odświeżyć widok.
4. **Użyjesz Sygnałów (Signals)** 📡
   (O tym więcej za chwilę, bo to prawdziwy game-changer!)

---

## ⚠️ Największa pułapka OnPush (Uwaga na mutacje!) 🧨

Wyobraź sobie, że masz komponent `OnPush`, który przyjmuje tablicę użytkowników przez `@Input()`.

**Takie podejście ZEPSUJE Twój widok (nie odświeży się):** ❌
```typescript
// Dodajemy element do TEJ SAMEJ tablicy. 
// Angular nie widzi zmiany, bo to to samo "pudełko"!
this.users.push(newUser); 
this.user.name = 'Kamil'; // Mutacja obiektu - też źle!
```

**A to jest POPRAWNE podejście (tzw. niemutowalne / Immutable):** ✅
```typescript
// Tworzymy ZUPEŁNIE NOWĄ tablicę z nowym elementem na końcu.
// Angular widzi nowe "pudełko" i odświeża widok! 🎉
this.users = [...this.users, newUser]; 
this.user = { ...this.user, name: 'Kamil' }; 
```

---

## 🔀 Alternatywy i Nowoczesne Podejścia

Świat Angulara pędzi do przodu! `OnPush` to klasyk, ale mamy dziś w arsenale inne, fantastyczne narzędzia. 🛠️✨

### 1. 📡 Sygnały (Signals) - Nowy Król Angulara (v16+) 👑

Sygnały to absolutna rewolucja. Pozwalają one na tzw. **precyzyjną detekcję zmian (Fine-grained reactivity)**.

Zamiast sprawdzać cały komponent, Angular odświeża **TYLKO** to jedno, konkretne słowo w HTML-u, które uległo zmianie! 🤯 Gdy używasz Sygnałów, używanie `OnPush` staje się naturalne i całkowicie bezbolesne.
```typescript
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `<button (click)="increment()">Kliknięto: {{ count() }}</button>`,
  changeDetection: ChangeDetectionStrategy.OnPush // Sygnały kochają OnPush! ❤️
})
export class CounterComponent {
  // Tworzymy sygnał
  count = signal(0);

  increment() {
    this.count.update(c => c + 1); // Widok odświeży się magicznie sam! ✨
  }
}
```

### 2. 🕹️ Ręczne sterowanie - `ChangeDetectorRef`

Czasami musisz wziąć sprawy w swoje ręce. Wstrzykując `ChangeDetectorRef`, zyskujesz supermoce nad tym, kiedy komponent ma się odświeżyć. 🦸‍♀️
```typescript
import { Component, ChangeDetectorRef } from '@angular/core';

@Component({ ... })
export class ManualComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  ukrytaAkcja() {
    this.zmienDaneWTle();
    
    // Zmuszamy Angulara do odświeżenia TEGO konkretnego komponentu 🎯
    this.cdr.markForCheck(); 
  }
}
```
**Trzy główne metody:**
* `markForCheck()`: 🟢 Zaznacza komponent do sprawdzenia w najbliższym cyklu. (Najbardziej polecane!)
* `detectChanges()`: ⚡ Natychmiastowo, brutalnie zmusza do sprawdzenia widoku "tu i teraz".
* `detach()`: ✂️ Całkowicie odłącza komponent od systemu detekcji zmian (hardcore mode!).

### 3. 🌌 Zoneless Angular (Angular bez Zone.js)

To melodia przyszłości (obecnie w fazie eksperymentalnej od Angulara 18). Do tej pory to biblioteka `Zone.js` "podsłuchiwała" wszystko, co robimy. Nowoczesny Angular pozwala całkowicie ją usunąć! 🗑️

W świecie "Zoneless" cała Twoja aplikacja opiera się na Sygnałach. Znika problem strategii Default vs OnPush, bo Angular odświeża widok **tylko wtedy**, gdy wyślesz mu Sygnał. To szczyt wydajności! 🚀

---

## 🏆 Szybkie Podsumowanie (Ściągawka) 📝

1. **Strategia Domyślna (Default):** Używaj, gdy szybko coś prototypujesz i nie przejmujesz się wydajnością. 🤷‍♂️
2. **OnPush:** Używaj **ZAWSZE** w tzw. "Dumb Components" (komponentach prezentacyjnych, które tylko wyświetlają to, co dostaną przez `@Input`). 🎨
3. **OnPush + Signals:** Absolutny standard w nowoczesnym Angularze. Najlepsza wydajność i wspaniałe doświadczenie developerskie. 💖
4. **ChangeDetectorRef:** Używaj jako "koła ratunkowego", gdy aktualizujesz stan z jakiegoś zewnętrznego źródła (np. surowy Web Socket bez użycia Observables). 🛟

I to by było na tyle! 🎉 Pamiętaj, że optymalizacja aplikacji to maraton, a nie sprint. Stopniowo wprowadzaj `OnPush` do swoich komponentów, przestaw głowę na "niemutowalność", a Twoi użytkownicy podziękują Ci za błyskawicznie działającą apkę! 💪🔥

Powodzenia w kodowaniu! 🍕💻
