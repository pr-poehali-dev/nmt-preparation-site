import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

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

export const QUIZ = [
  {
    subject: 'Математика',
    icon: 'Calculator',
    q: 'Скільки коренів має рівняння x² − 5x + 6 = 0?',
    options: ['Один корінь', 'Два корені', 'Жодного кореня', 'Безліч коренів'],
    correct: 1,
  },
  {
    subject: 'Українська мова',
    icon: 'BookOpen',
    q: 'Яка частина мови відповідає на питання "який? чий?"',
    options: ['Іменник', 'Прикметник', 'Дієслово', 'Прислівник'],
    correct: 1,
  },
  {
    subject: 'Історія України',
    icon: 'Landmark',
    q: 'У якому році відбулася Битва під Крутами?',
    options: ['1917', '1918', '1920', '1921'],
    correct: 1,
  },
  {
    subject: 'Фізика',
    icon: 'Atom',
    q: 'Яка одиниця вимірювання сили в системі СІ?',
    options: ['Джоуль', 'Ватт', 'Ньютон', 'Паскаль'],
    correct: 2,
  },
  {
    subject: 'Хімія',
    icon: 'FlaskConical',
    q: 'Яка хімічна формула кухонної солі?',
    options: ['CaCO₃', 'NaCl', 'H₂SO₄', 'NaOH'],
    correct: 1,
  },
  {
    subject: 'Англійська',
    icon: 'Globe',
    q: 'Виберіть правильну форму дієслова: "She ___ to school every day."',
    options: ['go', 'goes', 'going', 'gone'],
    correct: 1,
  },
  {
    subject: 'Біологія',
    icon: 'Leaf',
    q: 'Скільки хромосом у клітинах людини?',
    options: ['23', '44', '46', '48'],
    correct: 2,
  },
  {
    subject: 'Географія',
    icon: 'Map',
    q: 'Яка найбільша річка України?',
    options: ['Південний Буг', 'Дністер', 'Дніпро', 'Дунай'],
    correct: 2,
  },
];

interface CoursesQuizProps {
  active: number;
  answers: (number | null)[];
  finished: boolean;
  selectAnswer: (idx: number) => void;
  nextQ: () => void;
  restart: () => void;
  scrollTo: (id: string) => void;
  score: number;
}

const CoursesQuiz = ({ active, answers, finished, selectAnswer, nextQ, restart, scrollTo, score }: CoursesQuizProps) => {
  return (
    <>
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
            <p className="text-muted-foreground text-lg">По одному питанню з кожного предмета — перевір себе прямо зараз.</p>
          </div>

          <div className="bg-card rounded-3xl p-8 md:p-10 border border-border card-shadow">
            {!finished ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    <Icon name={QUIZ[active].icon} size={16} />
                    {QUIZ[active].subject}
                  </span>
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
                  {QUIZ[active].options.map((opt, i) => {
                    const isAnswered = answers[active] !== null;
                    const isSelected = answers[active] === i;
                    const isCorrectOpt = i === QUIZ[active].correct;

                    let stateClasses = 'border-border hover:border-primary/40 text-muted-foreground hover:text-foreground';
                    let badgeClasses = 'bg-secondary';
                    if (isAnswered) {
                      if (isCorrectOpt) {
                        stateClasses = 'border-emerald-500 bg-emerald-500/10 text-foreground';
                        badgeClasses = 'bg-emerald-500 text-white';
                      } else if (isSelected) {
                        stateClasses = 'border-red-500 bg-red-500/10 text-foreground';
                        badgeClasses = 'bg-red-500 text-white';
                      } else {
                        stateClasses = 'border-border opacity-50 text-muted-foreground';
                      }
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => !isAnswered && selectAnswer(i)}
                        disabled={isAnswered}
                        className={`w-full flex items-center justify-between text-left px-5 py-4 rounded-2xl border transition-all ${stateClasses}`}
                      >
                        <span className="flex items-center">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-sm font-bold mr-3 ${badgeClasses}`}>
                            {String.fromCharCode(65 + i)}
                          </span>
                          {opt}
                        </span>
                        {isAnswered && isCorrectOpt && <Icon name="CheckCircle2" size={20} className="text-emerald-500 shrink-0" />}
                        {isAnswered && isSelected && !isCorrectOpt && <Icon name="XCircle" size={20} className="text-red-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                <Button
                  onClick={nextQ}
                  disabled={answers[active] === null}
                  className="w-full rounded-full font-semibold h-12 text-base"
                >
                  {active < QUIZ.length - 1 ? 'Далі питання' : 'Показати результат'}
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
    </>
  );
};

export default CoursesQuiz;
