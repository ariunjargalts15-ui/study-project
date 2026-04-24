import SEO from '../components/SEO.jsx'

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="The terms that govern your use of AI Tools Hub."
      />
      <article className="container-site py-14 max-w-3xl">
        <h1 className="font-display font-extrabold text-4xl text-slate-900 dark:text-white">Terms of Service</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: {new Date().toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric' })}</p>

        <div className="prose-article mt-8">
          <p>
            By accessing or using AI Tools Hub (the &ldquo;site&rdquo;), you agree to be bound by
            these Terms of Service. If you disagree with any part, please do not use the site.
          </p>

          <h2>1. Use of the site</h2>
          <p>
            You agree to use the site only for lawful purposes. You will not attempt to harm the
            site, its users, or any linked third-party services.
          </p>

          <h2>2. Content and intellectual property</h2>
          <p>
            All original content (articles, code, design) is © AI Tools Hub unless otherwise noted.
            Third-party tools and logos are the property of their respective owners.
          </p>

          <h2>3. Disclaimer</h2>
          <p>
            Content on this site is provided for informational purposes only. It is not
            financial, legal or professional advice. We do not guarantee the accuracy of any
            tool rating, recommendation or guide.
          </p>

          <h2>4. External links</h2>
          <p>
            We link to third-party sites and tools. We are not responsible for their content,
            policies or practices.
          </p>

          <h2>5. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, AI Tools Hub shall not be liable for any
            indirect, incidental, special, consequential or punitive damages arising out of or
            related to your use of the site.
          </p>

          <h2>6. Changes</h2>
          <p>
            We may update these Terms from time to time. Continued use of the site constitutes
            acceptance of the updated terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions? Reach out via the <a href="/contact">contact page</a>.
          </p>
        </div>
      </article>
    </>
  )
}
