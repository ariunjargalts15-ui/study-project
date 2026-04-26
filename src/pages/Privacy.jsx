import SEO from '../components/SEO.jsx'

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="How StudyAI Tools collects, uses, and protects your information — including advertising, analytics, and cookie disclosures."
        url="/privacy"
      />
      <article className="container-site py-14 max-w-3xl">
        <h1 className="font-display font-extrabold text-4xl text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose-article mt-8">
          <p>
            This Privacy Policy describes how <strong>StudyAI Tools</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;),
            operating at <strong>studyaitools.biz</strong>, collects, uses, and shares information about
            you when you use our website. By using the site you consent to the practices described below.
          </p>

          <h2>Information we collect</h2>
          <p>
            We collect basic, non-personal analytics data including pages viewed, device type, browser,
            and approximate geographic region (derived from IP address). This data is used to understand
            how visitors use the site and improve content.
          </p>
          <p>
            If you subscribe to our newsletter or contact us, we also collect the email address and
            any information you voluntarily submit in the contact or subscription form.
          </p>

          <h2>Cookies</h2>
          <p>
            We and our advertising and analytics partners use cookies and similar tracking technologies
            to understand how visitors use our website and to serve relevant ads. You can disable
            non-essential cookies through your browser settings. Note that disabling cookies may
            affect some features of the site.
          </p>

          <h2>Google AdSense</h2>
          <p>
            We use Google AdSense to display advertisements on this site. Google uses cookies to serve
            ads based on your prior visits to this website and other sites across the web. You may
            opt out of personalized advertising by visiting{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">
              Google Ads Settings
            </a>.
            For more information, see{' '}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer">
              Google&rsquo;s advertising and privacy policies
            </a>.
          </p>

          <h2>Affiliate links</h2>
          <p>
            Some links on StudyAI Tools are affiliate links. If you click an affiliate link and
            make a purchase, we may earn a commission at no extra cost to you. We only recommend
            tools we have genuinely evaluated and believe are useful to students. Affiliate
            relationships do not influence our ratings or editorial opinions.
          </p>

          <h2>How we use your information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Analyze site traffic and improve the website</li>
            <li>Send newsletters (only if you subscribe)</li>
            <li>Respond to contact form submissions</li>
            <li>Display relevant advertising via Google AdSense</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Data sharing</h2>
          <p>
            We do not sell your personal data. We share data only with service providers
            (Google Analytics, Google AdSense, email service providers) that help us operate the site,
            and only as necessary for those services.
          </p>

          <h2>Your rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of any personal
            data we hold about you. To exercise these rights, email us at{' '}
            <a href="mailto:hello@studyaitools.biz">hello@studyaitools.biz</a>.
          </p>

          <h2>Children&rsquo;s privacy</h2>
          <p>
            StudyAI Tools is intended for general audiences. We do not knowingly collect personal
            information from children under 13. If you believe a child has submitted personal
            information to us, please contact us and we will delete it promptly.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this Privacy Policy periodically. The date at the top of this page
            reflects the most recent revision. Continued use of the site after changes constitutes
            acceptance of the updated policy.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy? Email us at{' '}
            <a href="mailto:hello@studyaitools.biz">hello@studyaitools.biz</a> or use the{' '}
            <a href="/contact">contact page</a>.
          </p>
        </div>
      </article>
    </>
  )
}
