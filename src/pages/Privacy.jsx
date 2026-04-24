import SEO from '../components/SEO.jsx'

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="How AI Tools Hub collects, uses and protects your information, including advertising and analytics disclosures."
      />
      <article className="container-site py-14 max-w-3xl">
        <h1 className="font-display font-extrabold text-4xl text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: {new Date().toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric' })}</p>

        <div className="prose-article mt-8">
          <p>
            This Privacy Policy describes how AI Tools Hub (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects,
            uses, and shares information about you when you use our website. By using the site you
            consent to the practices below.
          </p>

          <h2>Information we collect</h2>
          <p>
            We collect basic, non-personal analytics data (pages viewed, device type, approximate
            location from IP) through privacy-respecting analytics. If you subscribe to our
            newsletter or contact us, we also store the email address and message you submit.
          </p>

          <h2>Cookies</h2>
          <p>
            We and our partners use cookies and similar technologies to understand site usage and
            serve relevant advertising. You can disable cookies in your browser settings.
          </p>

          <h2>Google AdSense</h2>
          <p>
            We use Google AdSense to display ads. Google uses cookies to serve ads based on your
            prior visits to this and other websites. You may opt out of personalized advertising
            by visiting{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">Google Ads Settings</a>.
            More information: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer">Google&rsquo;s advertising policies</a>.
          </p>

          <h2>Affiliate links</h2>
          <p>
            Some links on this site are affiliate links. If you click and purchase, we may earn a
            commission at no extra cost to you. We only recommend tools we genuinely believe in.
          </p>

          <h2>Your rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of your personal
            data. Email us at hello@aitoolshub.example to exercise these rights.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy? Use the <a href="/contact">contact page</a>.
          </p>
        </div>
      </article>
    </>
  )
}
