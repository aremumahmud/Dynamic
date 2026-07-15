import PrivacyPolicy from '../../src/views/PrivacyPolicy'

export const metadata = {
  title: 'Privacy Policy | Dynamic Care Services',
  description: 'Read the Dynamic Care Services privacy policy to learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://dynamiccareservicesllc.com/privacy-policy',
  },
}

export default function Page() {
  return <PrivacyPolicy />
}
