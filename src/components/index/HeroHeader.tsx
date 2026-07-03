import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const NAV = [
  { id: 'hero', label: 'Головна' },
  { id: 'courses', label: 'Предмети' },
  { id: 'test', label: 'Тест' },
  { id: 'prices', label: 'Ціни' },
  { id: 'reviews', label: 'Відгуки' },
  { id: 'contacts', label: 'Контакти' },
];

interface HeroHeaderProps {
  scrollTo: (id: string) => void;
}

const HeroHeader = ({ scrollTo }: HeroHeaderProps) => {
  return (
    <>
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
    </>
  );
};

export default HeroHeader;
