import SEO from '../components/SEO.jsx'

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="The terms that govern your use of StudyAI Tools (studyaitools.biz)."
        url="/terms"
      />
      <article className="container-site py-14 max-w-3xl">
        <h1 className="font-display font-extrabold text-4xl text-slate-900 dark:text-white">Terms of Service</h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose-article mt-8">
          <p>
            By accessing or using <strong>StudyAI Tools</strong> at{' '}
            <strong>studyaitools.biz</strong> (the &ldquo;site&rdquo;), you agree to be bound
            by these Terms of Service. If you do not agree, please do not use the site.
          </p>

          <h2>1. Use of the site</h2>
          <p>
            You may use StudyAI Tools for personal, non-commercial, educational purposes only.
            You agree to use the site only for lawful purposes and in a way that does not infringe
            the rights of others or restrict their use and enjoyment of the site.
          </p>

          <h2>2. Intellectual property</h2>
          <p>
            All original content on StudyAI Tools — including articles, reviews, tool descriptions,
            tool ratings, graphics, and code — is &copy; StudyAI Tools unless otherwise stated.
            Third-party tool names, logos, and trademarks are the property of their respective owners
            and are used here for identification and review purposes only.
          </p>
          <p>
            You may not reproduce, distribute, or republish our original content without prior
            written permission. Short excerpts with attribution and a link back to the original
            are permitted.
          </p>

          <h2>3. AI tool reviews and accuracy</h2>
          <p>
            Tool reviews, ratings, and pricing information on this site reflect our editorial
            assessment at the time of writing. AI tool features, availability, and pricing change
            frequently. We do not guarantee that any information is current or complete.
            Always verify details on the official website of each tool.
          </p>

          <h2>4. No professional advice</h2>
          <p>
            Content on StudyAI Tools is for educational and informational purposes only. Nothing
            on this site constitutes academic, legal, financial, or professional advice. We are
            not responsible for decisions you make based on content found here.
          </p>

          <h2>5. Affiliate links and advertising</h2>
          <p>
            Some links are affiliate links. Clicking these may result in a commission for us.
            This does not affect the price you pay. We also display Google AdSense advertisements.
            See our <a href="/privacy">Privacy Policy</a> and{' '}
            <a href="/disclaimer">Disclaimer</a> for full details.
          </p>

          <h2>6. External links</h2>
          <p>
            We link to third-party websites and tools. StudyAI Tools is not responsible for the
            content, privacy practices, security, or availability of any external site. External
            links are provided for convenience only.
          </p>

          <h2>7. Academic integrity</h2>
          <p>
            You are solely responsible for complying with your educational institution&rsquo;s
            policies regarding the use of AI tools. StudyAI Tools does not condone using AI to
            cheat, plagiarize, or violate academic integrity policies.
          </p>

          <h2>8. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by applicable law, StudyAI Tools shall not be liable
            for any indirect, incidental, special, consequential, or punitive damages arising out
            of or related to your use of, or inability to use, this website or any linked
            third-party services.
          </p>

          <h2>9. Changes to these terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the site after an
            update constitutes acceptance of the revised Terms.
          </p>

          <h2>10. Governing law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable laws.
            Any disputes shall be resolved through good-faith negotiation first.
          </p>

          <h2>Contact</h2>
          <p>
            Questions? Email{' '}
            <a href="mailto:hello@studyaitools.biz">hello@studyaitools.biz</a> or use the{' '}
            <a href="/contact">contact page</a>.
          </p>
        </div>
      </article>
    </>
  )
}
