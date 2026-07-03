import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface ContactFooterProps {
  leadName: string;
  setLeadName: (v: string) => void;
  leadPhone: string;
  setLeadPhone: (v: string) => void;
  sending: boolean;
  submitLead: () => void;
  modalOpen: boolean;
  setModalOpen: (v: boolean) => void;
  modalPlan: string | null;
  modalName: string;
  setModalName: (v: string) => void;
  modalPhone: string;
  setModalPhone: (v: string) => void;
  modalSending: boolean;
  submitModalLead: () => void;
}

const ContactFooter = ({
  leadName,
  setLeadName,
  leadPhone,
  setLeadPhone,
  sending,
  submitLead,
  modalOpen,
  setModalOpen,
  modalPlan,
  modalName,
  setModalName,
  modalPhone,
  setModalPhone,
  modalSending,
  submitModalLead,
}: ContactFooterProps) => {
  return (
    <>
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

      {/* PLAN MODAL */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="rounded-3xl border-border bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              Заявка{modalPlan ? `: ${modalPlan}` : ''}
            </DialogTitle>
            <DialogDescription>
              Залиш контакти — і ми зв'яжемося, щоб узгодити деталі та оплату.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <input
              value={modalName}
              onChange={(e) => setModalName(e.target.value)}
              placeholder="Ваше ім'я"
              className="w-full px-5 py-3.5 rounded-2xl border border-border bg-secondary/40 focus:border-primary outline-none transition-colors placeholder:text-muted-foreground"
            />
            <input
              value={modalPhone}
              onChange={(e) => setModalPhone(e.target.value)}
              placeholder="Телефон"
              className="w-full px-5 py-3.5 rounded-2xl border border-border bg-secondary/40 focus:border-primary outline-none transition-colors placeholder:text-muted-foreground"
            />
            <Button
              onClick={submitModalLead}
              disabled={modalSending}
              className="w-full rounded-full font-semibold h-12 text-base"
            >
              {modalSending ? 'Надсилаємо...' : 'Відправити заявку'}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Натискаючи кнопку, ви погоджуєтесь з політикою конфіденційності
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactFooter;
