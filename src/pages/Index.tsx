import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const NAV = [
  { id: 'hero', label: 'Головна' },
  { id: 'courses', label: 'Про курси' },
  { id: 'test', label: 'Онлайн-тест' },
  { id: 'prices', label: 'Ціни' },
  { id: 'reviews', label: 'Відгуки' },
  { id: 'contacts', label: 'Контакти' },
];

const COURSES = [
  { icon: 'Calculator', title: 'Математика', desc: 'Алгебра, геометрія, задачі підвищеної складності', color: 'bg-primary' },
  { icon: 'BookOpen', title: 'Українська мова', desc: 'Граматика, стилістика, розбір типових помилок', color: 'bg-secondary' },
  { icon: 'Landmark', title: 'Історія України', desc: 'Дати, події, робота з історичними джерелами', color: 'bg-pink-500' },
  { icon: 'Atom', title: 'Фізика', desc: 'Механіка, електрика, оптика та розв\'язання задач', color: 'bg-amber-400' },
];

const PRICES = [
  {
    name: 'Групове заняття',
    price: '300',
    unit: 'грн / заняття',
    features: ['До 8 учнів у групі', 'Онлайн або офлайн', 'Домашні завдання', 'Розбір помилок'],
    highlight: false,
  },
  {
    name: 'Індивідуально',
    price: '600',
    unit: 'грн / заняття',
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
  { name: 'Марія К.', text: 'Здала НМТ з математики на 185 балів! Пояснюють так, що нарешті все стало зрозуміло.', rating: 5 },
  { name: 'Олег П.', text: 'Онлайн-тести дуже допомогли зрозуміти свій рівень. Займався з телефону в будь-який час.', rating: 5 },
  { name: 'Анна С.', text: 'Індивідуальні заняття — це щось! Викладач знайшов підхід і підтягнув історію за 2 місяці.', rating: 5 },
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
  const [active, setActive] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const [finished, setFinished] = useState(false);

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
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2 font-display font-black text-xl">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
              <Icon name="GraduationCap" size={20} />
            </div>
            NMT<span className="text-gradient">Hub</span>
          </div>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="px-4 py-2 rounded-full text-sm font-medium hover:bg-muted transition-colors"
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
      <section id="hero" className="relative pt-32 pb-24 bg-hero">
        <div className="absolute top-40 -left-10 w-72 h-72 bg-secondary/40 animate-blob animate-float" />
        <div className="absolute bottom-10 right-0 w-64 h-64 bg-primary/20 animate-blob" style={{ animationDelay: '2s' }} />
        <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-semibold text-sm mb-6">
              <Icon name="Sparkles" size={16} /> Підготовка до НМТ 2026
            </span>
            <h1 className="font-display font-black text-5xl md:text-6xl leading-[1.05] mb-6">
              Склади НМТ на <span className="text-gradient">максимум</span> балів
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Онлайн-заняття, живі викладачі та інтерактивні тести для самоперевірки. Вступай до омріяного вишу без стресу.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => scrollTo('test')} className="rounded-full font-semibold text-base h-14 px-8">
                <Icon name="Play" size={18} className="mr-1" /> Пройти тест
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('courses')} className="rounded-full font-semibold text-base h-14 px-8 border-2">
                Про курси
              </Button>
            </div>
            <div className="flex gap-8 mt-10">
              {[['1500+', 'учнів'], ['189', 'середній бал'], ['4 роки', 'досвіду']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display font-black text-3xl text-gradient">{n}</div>
                  <div className="text-sm text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-secondary rounded-[2.5rem] blur-2xl opacity-30" />
            <img
              src="https://cdn.poehali.dev/projects/78aa1a30-1dba-495a-98b3-02e378200e05/files/16176598-9c25-420a-bd5d-ef30378fa63c.jpg"
              alt="Підготовка до НМТ"
              className="relative rounded-[2.5rem] card-shadow w-full"
            />
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="py-24 container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display font-black text-4xl md:text-5xl mb-4">Наші <span className="text-gradient">курси</span></h2>
          <p className="text-muted-foreground text-lg">Готуємо до всіх основних предметів НМТ з нуля до високого результату</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES.map((c) => (
            <div key={c.title} className="group bg-card rounded-3xl p-7 border border-border hover:-translate-y-2 hover:card-shadow transition-all duration-300">
              <div className={`w-14 h-14 rounded-2xl ${c.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform`}>
                <Icon name={c.icon} size={26} />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{c.title}</h3>
              <p className="text-muted-foreground text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEST */}
      <section id="test" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/20 animate-blob" />
        <div className="container relative max-w-3xl">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 font-semibold text-sm mb-4">
              <Icon name="ClipboardCheck" size={16} /> Самоперевірка
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl mb-3">Онлайн-тест НМТ</h2>
            <p className="text-primary-foreground/70 text-lg">Перевір свій рівень прямо зараз — 3 запитання</p>
          </div>

          <div className="bg-white text-foreground rounded-3xl p-8 md:p-10 card-shadow">
            {!finished ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-semibold text-muted-foreground text-sm">Питання {active + 1} з {QUIZ.length}</span>
                  <div className="flex gap-1.5">
                    {QUIZ.map((_, i) => (
                      <div key={i} className={`h-2 w-8 rounded-full transition-colors ${i <= active ? 'bg-primary' : 'bg-muted'}`} />
                    ))}
                  </div>
                </div>
                <h3 className="font-display font-bold text-2xl mb-6">{QUIZ[active].q}</h3>
                <div className="space-y-3 mb-8">
                  {QUIZ[active].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => selectAnswer(i)}
                      className={`w-full text-left px-5 py-4 rounded-2xl border-2 font-medium transition-all ${
                        answers[active] === i
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted text-sm font-bold mr-3">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>
                <Button
                  onClick={nextQ}
                  disabled={answers[active] === null}
                  className="w-full rounded-full font-semibold h-13 text-base h-12"
                >
                  {active < QUIZ.length - 1 ? 'Далі' : 'Показати результат'}
                  <Icon name="ArrowRight" size={18} className="ml-1" />
                </Button>
              </>
            ) : (
              <div className="text-center py-4 animate-scale-in">
                <div className="w-24 h-24 rounded-full bg-secondary mx-auto flex items-center justify-center mb-6">
                  <Icon name="Trophy" size={44} className="text-secondary-foreground" />
                </div>
                <h3 className="font-display font-black text-3xl mb-2">
                  {score} з {QUIZ.length} правильно!
                </h3>
                <p className="text-muted-foreground mb-8">
                  {score === QUIZ.length
                    ? 'Чудовий результат! Ти майже готовий до НМТ.'
                    : 'Гарний старт! На наших заняттях підтягнеш решту тем.'}
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button onClick={restart} variant="outline" className="rounded-full font-semibold border-2">
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
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display font-black text-4xl md:text-5xl mb-4">Прозорі <span className="text-gradient">ціни</span></h2>
          <p className="text-muted-foreground text-lg">Обери формат навчання, що підходить саме тобі</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICES.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-7 border transition-all duration-300 hover:-translate-y-2 ${
                p.highlight
                  ? 'bg-primary text-primary-foreground border-primary card-shadow scale-105'
                  : 'bg-card border-border hover:card-shadow'
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold">
                  ПОПУЛЯРНЕ
                </span>
              )}
              <h3 className="font-display font-bold text-lg mb-4">{p.name}</h3>
              <div className="mb-1">
                <span className="font-display font-black text-4xl">{p.price}</span>
                <span className={`text-sm ml-1 ${p.highlight ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>грн</span>
              </div>
              <p className={`text-sm mb-6 ${p.highlight ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{p.unit}</p>
              <ul className="space-y-3 mb-7">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Icon name="Check" size={18} className={p.highlight ? 'text-secondary' : 'text-primary'} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full rounded-full font-semibold ${
                  p.highlight ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' : ''
                }`}
                variant={p.highlight ? 'default' : 'outline'}
              >
                Обрати
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-muted/40">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display font-black text-4xl md:text-5xl mb-4">Відгуки <span className="text-gradient">учнів</span></h2>
            <p className="text-muted-foreground text-lg">Наші випускники вступають до найкращих вишів країни</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-card rounded-3xl p-7 border border-border">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={18} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="mb-6 leading-relaxed">{r.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold">
                    {r.name[0]}
                  </div>
                  <span className="font-semibold">{r.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 container">
        <div className="rounded-[2.5rem] bg-primary text-primary-foreground p-10 md:p-16 relative overflow-hidden">
          <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-secondary/20 animate-blob" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display font-black text-4xl md:text-5xl mb-4">Почни готуватися вже сьогодні</h2>
              <p className="text-primary-foreground/70 text-lg mb-8">Залиш заявку — і ми підберемо оптимальну програму та проведемо безкоштовне пробне заняття.</p>
              <div className="space-y-4">
                {[
                  { icon: 'Phone', text: '+380 (67) 123-45-67' },
                  { icon: 'Mail', text: 'hello@nmthub.ua' },
                  { icon: 'Send', text: '@nmthub_bot' },
                ].map((c) => (
                  <div key={c.text} className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                      <Icon name={c.icon} size={20} />
                    </div>
                    <span className="font-medium">{c.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white text-foreground rounded-3xl p-8 space-y-4">
              <h3 className="font-display font-bold text-xl mb-2">Безкоштовне заняття</h3>
              <input placeholder="Ваше ім'я" className="w-full px-5 py-3.5 rounded-2xl border-2 border-border focus:border-primary outline-none transition-colors" />
              <input placeholder="Телефон" className="w-full px-5 py-3.5 rounded-2xl border-2 border-border focus:border-primary outline-none transition-colors" />
              <Button className="w-full rounded-full font-semibold h-12 text-base">Залишити заявку</Button>
              <p className="text-xs text-muted-foreground text-center">Натискаючи кнопку, ви погоджуєтесь з політикою конфіденційності</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-display font-black text-lg text-foreground">
            NMT<span className="text-gradient">Hub</span>
          </div>
          <p>© 2026 NMT Hub. Підготовка до НМТ.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
