import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

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

interface PricingPlansProps {
  openPlanModal: (planName: string) => void;
}

const PricingPlans = ({ openPlanModal }: PricingPlansProps) => {
  return (
    <>
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
                onClick={() => openPlanModal(p.name)}
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
    </>
  );
};

export default PricingPlans;
