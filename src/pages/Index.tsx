import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const SUBMIT_LEAD_URL = 'https://functions.poehali.dev/3ecfa382-f353-47d9-b18e-e85fb77cce64';

const NAV = [
  { id: 'hero', label: 'Головна' },
  { id: 'courses', label: 'Предмети' },
  { id: 'test', label: 'Тест' },
  { id: 'prices', label: 'Ціни' },
  { id: 'reviews', label: 'Відгуки' },
  { id: 'contacts', label: 'Контакти' },
];

const COURSES = [
  { icon: 'Calculator', title: 'Математика', desc: 'Алгебра, геометрія, задачі підвищеної складності' },
  { icon: 'BookOpen', title: 'Українська мова', desc: 'Граматика, стилістика, розбір типових помилок' },
  { icon: 'Landmark', title: 'Історія України', desc: 'Дати, події, робота з історичними джерелами' },
  { icon: 'Atom', title: 'Фізика', desc: "Механіка, електрика, оптика та розв'язання задач" },
  { icon: 'FlaskConical', title: 'Хімія', desc: 'Органічна, неорганічна, розрахункові задачі' },
  { icon: 'Globe', title: 'Англійська', desc: 'Граматика, читання, аудіювання, лексика' },
  { icon: 'Leaf', title: 'Біологія', desc: 'Молекулярна біологія, генетика, анатомія' },
  { icon: 'Map', title: 'Географія', desc: 'Фізична, економічна, робота з картами' },
];

const PRICES = [
  {
    name: 'Групове',
    price: '300',
    unit: 'за заняття',
    features: ['До 8 учнів у групі', 'Онлайн або офлайн', 'Домашні завдання', 'Розбір помилок'],
    highlight: false,
  },
  {
    name: 'Індивідуально',
    price: '600',
    unit: 'за заняття',
    features: ['Персональна програма', 'Гнучкий розклад', 'Особистий куратор', 'Швидкий прогрес'],
    highlight: true,
  },
  {
    name: 'Абонемент 5',
    price: '2500',
    unit: '5 групових занять',
    features: ['Економія 500 грн', 'Фіксований розклад', 'Матеріали в подарунок', 'Пробний НМТ'],
    highlight: false,
  },
  {
    name: 'Абонемент 10',
    price: '4000',
    unit: '10 групових занять',
    features: ['Економія 2000 грн', 'Максимальна вигода', 'Куратор на весь курс', '2 пробних НМТ'],
    highlight: false,
  },
];

const REVIEWS = [
  { name: 'Марія К.', role: 'НМТ 185 балів', text: 'Пояснюють так, що нарешті все стало зрозуміло. Здала математику на високий бал!' },
  { name: 'Олег П.', role: 'НМТ 190 балів', text: 'Онлайн-тести дуже допомогли зрозуміти свій рівень. Займався з телефону будь-коли.' },
  { name: 'Анна С.', role: 'НМТ 178 балів', text: 'Індивідуальні заняття — це щось! Викладач підтягнув історію за 2 місяці.' },
];

const QUIZ = [
  {
    q: 'Скільки коренів має рівняння x² − 5x + 6 = 0?',
    options: ['Один корінь', 'Два корені', 'Жодного кореня', 'Безліч коренів'],
    correct: 1,
  },
  {
    q: 'У якому році відбулася Битва під Крутами?',
    options: ['1917', '1918', '1920', '1921'],
    correct: 1,
  },
  {
    q: 'Скільки букв в українському алфавіті?',
    options: ['30', '31', '32', '33'],
    correct: 3,
  },
];

const Index = () => {
  const { toast } = useToast();
  const [active, setActive] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const [finished, setFinished] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [sending, setSending] = useState(false);

  const submitLead = async () => {
    if (!leadName.trim() || !leadPhone.trim()) {
      toast({ title: "Заповніть ім'я та телефон", variant: 'destructive' });
      return;
    }
    setSending(true);
    try {
      const res = await fetch(SUBMIT_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: leadName, phone: leadPhone, source: 'Сайт NMTHub' }),
      });
      if (!res.ok) throw new Error();
      toast({ title: 'Заявку надіслано!', description: 'Ми зв\'яжемося з вами найближчим часом.' });
      setLeadName('');
      setLeadPhone('');
    } catch {
      toast({ title: 'Помилка', description: 'Спробуйте ще раз пізніше.', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const selectAnswer = (idx: number) => {
    const next = [...answers];
    next[active] = idx;
    setAnswers(next);
  };

  const nextQ = () => {
    if (active < QUIZ.length - 1) setActive(active + 1);
    else setFinished(true);
  };

  const restart = () => {
    setAnswers([null, null, null]);
    setActive(0);
    setFinished(false);
  };

  const score = answers.filter((a, i) => a === QUIZ[i].correct).length;

  return (
    <div className="min-h-screen bg-background font-body text-foreground overflow-x-hidden">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2 font-display font-extrabold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Icon name="GraduationCap" size={18} />
            </div>
            NMT<span className="text-primary">Hub</span>
          </div>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {n.label}
              </button>
            ))}
          </nav>
          <Button onClick={() => scrollTo('prices')} className="rounded-full font-semibold">
            Записатися
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative pt-40 pb-28 bg-hero">
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="container relative text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Набір на НМТ 2026 відкрито
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[1.02] tracking-tight mb-6 animate-fade-in">
            Підготовка до НМТ
            <br />
            на <span className="text-gradient">максимум</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto animate-fade-in">
            Всі 8 предметів, досвідчені викладачі та тести у форматі реального НМТ. Вступай до омріяного вишу без стресу.
          </p>
          <div className="flex flex-wrap gap-3 justify-center animate-fade-in">
            <Button size="lg" onClick={() => scrollTo('test')} className="rounded-full font-semibold text-base h-13 px-8 glow">
              <Icon name="Play" size={18} className="mr-1" /> Пройти тест
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo('prices')}
              className="rounded-full font-semibold text-base h-13 px-8 bg-transparent"
            >
              Дивитися ціни
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-16 animate-fade-in">
            {[
              ['1500+', 'учнів'],
              ['189', 'середній бал'],
              ['8', 'предметів'],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl border border-border bg-card/50 py-6">
                <div className="font-display font-extrabold text-3xl md:text-4xl text-gradient">{n}</div>
                <div className="text-sm text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="py-24 container">
        <div className="max-w-2xl mb-14">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
            Всі предмети <span className="text-gradient">НМТ</span>
          </h2>
          <p className="text-muted-foreground text-lg">Обери свій напрям — готуємо з нуля до високого результату.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COURSES.map((c) => (
            <div
              key={c.title}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon name={c.icon} size={22} />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{c.title}</h3>
              <p className="text-muted-foreground text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEST */}
      <section id="test" className="py-24">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground mb-5">
              <Icon name="ClipboardCheck" size={14} className="text-primary" /> Самоперевірка
            </div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-3">Онлайн-тест НМТ</h2>
            <p className="text-muted-foreground text-lg">Перевір свій рівень прямо зараз — 3 запитання.</p>
          </div>

          <div className="bg-card rounded-3xl p-8 md:p-10 border border-border card-shadow">
            {!finished ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-muted-foreground">
                    Питання {active + 1} з {QUIZ.length}
                  </span>
                  <div className="flex gap-1.5">
                    {QUIZ.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 w-8 rounded-full transition-colors ${i <= active ? 'bg-primary' : 'bg-secondary'}`}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="font-display font-bold text-2xl mb-6">{QUIZ[active].q}</h3>
                <div className="space-y-3 mb-8">
                  {QUIZ[active].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => selectAnswer(i)}
                      className={`w-full text-left px-5 py-4 rounded-2xl border transition-all ${
                        answers[active] === i
                          ? 'border-primary bg-primary/10 text-foreground'
                          : 'border-border hover:border-primary/40 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-sm font-bold mr-3 ${
                          answers[active] === i ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>
                <Button
                  onClick={nextQ}
                  disabled={answers[active] === null}
                  className="w-full rounded-full font-semibold h-12 text-base"
                >
                  {active < QUIZ.length - 1 ? 'Далі' : 'Показати результат'}
                  <Icon name="ArrowRight" size={18} className="ml-1" />
                </Button>
              </>
            ) : (
              <div className="text-center py-4 animate-scale-in">
                <div className="w-20 h-20 rounded-2xl bg-primary/15 mx-auto flex items-center justify-center mb-6 glow">
                  <Icon name="Trophy" size={38} className="text-primary" />
                </div>
                <h3 className="font-display font-extrabold text-3xl mb-2">
                  {score} з {QUIZ.length} правильно!
                </h3>
                <p className="text-muted-foreground mb-8">
                  {score === QUIZ.length
                    ? 'Чудовий результат! Ти майже готовий до НМТ.'
                    : 'Гарний старт! На наших заняттях підтягнеш решту тем.'}
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button onClick={restart} variant="outline" className="rounded-full font-semibold bg-transparent">
                    <Icon name="RotateCcw" size={18} className="mr-1" /> Пройти ще раз
                  </Button>
                  <Button onClick={() => scrollTo('prices')} className="rounded-full font-semibold">
                    Записатися на курс
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-24 container">
        <div className="max-w-2xl mb-14">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
            Прозорі <span className="text-gradient">ціни</span>
          </h2>
          <p className="text-muted-foreground text-lg">Обери формат навчання, що підходить саме тобі.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRICES.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-7 border transition-all duration-300 ${
                p.highlight
                  ? 'bg-primary/10 border-primary card-shadow'
                  : 'bg-card border-border hover:border-primary/40'
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  ПОПУЛЯРНЕ
                </span>
              )}
              <h3 className="font-display font-bold text-lg mb-4">{p.name}</h3>
              <div className="mb-1">
                <span className="font-display font-extrabold text-4xl">{p.price}</span>
                <span className="text-sm ml-1 text-muted-foreground">грн</span>
              </div>
              <p className="text-sm mb-6 text-muted-foreground">{p.unit}</p>
              <ul className="space-y-3 mb-7">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Icon name="Check" size={18} className="text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full rounded-full font-semibold"
                variant={p.highlight ? 'default' : 'outline'}
              >
                Обрати
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 container">
        <div className="max-w-2xl mb-14">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
            Відгуки <span className="text-gradient">учнів</span>
          </h2>
          <p className="text-muted-foreground text-lg">Наші випускники вступають до найкращих вишів країни.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-card rounded-3xl p-7 border border-border">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="text-primary fill-primary" />
                ))}
              </div>
              <p className="mb-6 leading-relaxed text-foreground/90">{r.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-secondary text-primary flex items-center justify-center font-display font-bold">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm">{r.name}</div>
                  <div className="text-xs text-primary">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 container">
        <div className="rounded-[2rem] border border-border bg-card p-10 md:p-16 relative overflow-hidden bg-hero">
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
                Почни готуватися <span className="text-gradient">сьогодні</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Залиш заявку — і ми підберемо оптимальну програму та проведемо безкоштовне пробне заняття.
              </p>
              <div className="space-y-4">
                {[
                  { icon: 'Phone', text: '+380 (67) 123-45-67' },
                  { icon: 'Mail', text: 'hello@nmthub.ua' },
                  { icon: 'Send', text: '@nmthub_bot' },
                ].map((c) => (
                  <div key={c.text} className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-primary">
                      <Icon name={c.icon} size={18} />
                    </div>
                    <span className="font-medium">{c.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-background/60 backdrop-blur rounded-3xl p-8 border border-border space-y-4">
              <h3 className="font-display font-bold text-xl mb-2">Безкоштовне заняття</h3>
              <input
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                placeholder="Ваше ім'я"
                className="w-full px-5 py-3.5 rounded-2xl border border-border bg-secondary/40 focus:border-primary outline-none transition-colors placeholder:text-muted-foreground"
              />
              <input
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                placeholder="Телефон"
                className="w-full px-5 py-3.5 rounded-2xl border border-border bg-secondary/40 focus:border-primary outline-none transition-colors placeholder:text-muted-foreground"
              />
              <Button onClick={submitLead} disabled={sending} className="w-full rounded-full font-semibold h-12 text-base">
                {sending ? 'Надсилаємо...' : 'Залишити заявку'}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Натискаючи кнопку, ви погоджуєтесь з політикою конфіденційності
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-display font-extrabold text-lg text-foreground">
            NMT<span className="text-primary">Hub</span>
          </div>
          <p>© 2026 NMTHub. Підготовка до НМТ.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;