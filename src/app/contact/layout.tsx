import ContactBodyClass from '@/components/contact/ContactBodyClass';

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ContactBodyClass />
      {children}
    </>
  );
}
