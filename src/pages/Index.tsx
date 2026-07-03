import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import HeroHeader from '@/components/index/HeroHeader';
import CoursesQuiz, { QUIZ } from '@/components/index/CoursesQuiz';
import PricingPlans from '@/components/index/PricingPlans';
import ContactFooter from '@/components/index/ContactFooter';

const SUBMIT_LEAD_URL = 'https://functions.poehali.dev/3ecfa382-f353-47d9-b18e-e85fb77cce64';

const Index = () => {
  const { toast } = useToast();
  const [active, setActive] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUIZ.length).fill(null));
  const [finished, setFinished] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPlan, setModalPlan] = useState<string | null>(null);
  const [modalName, setModalName] = useState('');
  const [modalPhone, setModalPhone] = useState('');
  const [modalSending, setModalSending] = useState(false);

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

  const openPlanModal = (planName: string) => {
    setModalPlan(planName);
    setModalOpen(true);
  };

  const submitModalLead = async () => {
    if (!modalName.trim() || !modalPhone.trim()) {
      toast({ title: "Заповніть ім'я та телефон", variant: 'destructive' });
      return;
    }
    setModalSending(true);
    try {
      const res = await fetch(SUBMIT_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: modalName,
          phone: modalPhone,
          source: modalPlan ? `Сайт NMTHub — тариф "${modalPlan}"` : 'Сайт NMTHub',
        }),
      });
      if (!res.ok) throw new Error();
      toast({ title: 'Заявку надіслано!', description: 'Ми зв\'яжемося з вами найближчим часом.' });
      setModalName('');
      setModalPhone('');
      setModalOpen(false);
    } catch {
      toast({ title: 'Помилка', description: 'Спробуйте ще раз пізніше.', variant: 'destructive' });
    } finally {
      setModalSending(false);
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
    setAnswers(Array(QUIZ.length).fill(null));
    setActive(0);
    setFinished(false);
  };

  const score = answers.filter((a, i) => a === QUIZ[i].correct).length;

  return (
    <div className="min-h-screen bg-background font-body text-foreground overflow-x-hidden">
      <HeroHeader scrollTo={scrollTo} />

      <CoursesQuiz
        active={active}
        answers={answers}
        finished={finished}
        selectAnswer={selectAnswer}
        nextQ={nextQ}
        restart={restart}
        scrollTo={scrollTo}
        score={score}
      />

      <PricingPlans openPlanModal={openPlanModal} />

      <ContactFooter
        leadName={leadName}
        setLeadName={setLeadName}
        leadPhone={leadPhone}
        setLeadPhone={setLeadPhone}
        sending={sending}
        submitLead={submitLead}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalPlan={modalPlan}
        modalName={modalName}
        setModalName={setModalName}
        modalPhone={modalPhone}
        setModalPhone={setModalPhone}
        modalSending={modalSending}
        submitModalLead={submitModalLead}
      />
    </div>
  );
};

export default Index;
