import SEO from '../components/SEO.jsx'

export default function Disclaimer() {
  return (
    <>
      <SEO
        title="Disclaimer"
        description="Important disclaimers about AI tool recommendations, affiliate links, and educational content on StudyAI Tools."
        url="/disclaimer"
      />
      <article className="container-site py-14 max-w-3xl">
        <h1 className="font-display font-extrabold text-4xl text-slate-900 dark:text-white">Disclaimer</h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose-article mt-8">

          <h2>General disclaimer</h2>
          <p>
            The information provided on StudyAI Tools (<strong>studyaitools.biz</strong>) is for
            general educational and informational purposes only. While we strive to keep all content
            accurate and up to date, we make no representations or warranties of any kind, express
            or implied, about the completeness, accuracy, reliability, suitability, or availability
            of the website or the information, products, tools, or related graphics contained on it.
          </p>

          <h2>Not professional advice</h2>
          <p>
            Nothing on StudyAI Tools constitutes academic, legal, financial, or professional advice.
            Tool reviews, ratings, and recommendations reflect our editorial opinion at the time of
            writing and should not be taken as a guarantee of results. Always verify AI-generated
            content and consult qualified professionals where appropriate.
          </p>

          <h2>AI tool accuracy</h2>
          <p>
            Artificial intelligence tools, including those listed on this website, can produce
            inaccurate, outdated, or misleading information ("hallucinations"). We strongly advise
            all users — especially students — to:
          </p>
          <ul>
            <li>Verify AI-generated answers using authoritative sources</li>
            <li>Never submit AI-generated content as your own academic work without proper attribution</li>
            <li>Check your institution's academic integrity policy regarding AI tool use</li>
            <li>Consult teachers or professors when uncertain about appropriate AI usage</li>
          </ul>

          <h2>Affiliate links and advertising</h2>
          <p>
            Some links on StudyAI Tools are affiliate links. This means we may earn a small
            commission if you click through and make a purchase, at no additional cost to you.
            We only recommend tools we have evaluated and genuinely believe are useful for students
            and learners. Affiliate relationships do not influence our ratings or editorial content.
          </p>
          <p>
            We also display Google AdSense advertisements. These are served by Google and may be
            personalized based on your browsing history. See our{' '}
            <a href="/privacy">Privacy Policy</a> for more information on advertising and cookies.
          </p>

          <h2>Third-party tools and websites</h2>
          <p>
            StudyAI Tools links to third-party AI tools, services, and websites. We are not
            responsible for the content, privacy practices, pricing changes, or availability of
            these external services. Tool features, pricing, and free-tier limitations may change
            after publication — always check the tool's official website for current information.
          </p>

          <h2>Pricing information</h2>
          <p>
            Pricing information displayed on this site was accurate at the time of writing but may
            become outdated. Pricing can change without notice. Always verify current pricing on the
            official website of each tool before making a purchasing decision.
          </p>

          <h2>Academic integrity</h2>
          <p>
            We promote the responsible use of AI as a learning aid. Using AI tools to complete
            assignments, exams, or coursework that prohibits such use may violate your institution's
            academic integrity policy. You are solely responsible for complying with your school or
            university's rules regarding AI use.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this Disclaimer, please{' '}
            <a href="/contact">contact us</a> or email{' '}
            <a href="mailto:hello@studyaitools.biz">hello@studyaitools.biz</a>.
          </p>

        </div>
      </article>
    </>
  )
}
