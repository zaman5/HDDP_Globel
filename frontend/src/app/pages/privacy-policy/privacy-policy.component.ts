import { AfterViewInit, Component, ElementRef, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LEGAL } from '../../legal.config';
import { CookieConsentService } from '../../services/cookie-consent.service';

// Company details live in legal.config.ts — edit them there, not here.
@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="band !pb-12 band-mist border-b border-line">
      <div class="wrap">
        <p class="t-kicker">Legal</p>
        <h1 class="t-h1">Privacy policy</h1>
        <p class="t-lede mt-4">How {{ L.brand }} collects, uses and protects personal information about candidates, clients and website visitors in the United States, United Kingdom and Canada.</p>
        <p class="t-small mt-4">Last updated: {{ L.lastUpdated }}</p>
      </div>
    </section>

    <section class="band-tight">
      <div class="wrap grid gap-10 lg:grid-cols-12">

        <!-- Contents -->
        <aside class="lg:col-span-3">
          <details class="lg:hidden rounded-lg border border-line p-4" >
            <summary class="font-semibold text-navy cursor-pointer">Contents</summary>
            <nav aria-label="Privacy policy contents" class="toc mt-3">
              <a *ngFor="let s of sections; let i = index" [routerLink]="[]" [fragment]="s.id">{{ i + 1 }}. {{ s.title }}</a>
            </nav>
          </details>
          <nav aria-label="Privacy policy contents" class="toc hidden lg:block sticky top-[100px] max-h-[calc(100vh-120px)] overflow-y-auto">
            <p class="text-sm font-semibold text-navy mb-3">Contents</p>
            <a *ngFor="let s of sections; let i = index" [routerLink]="[]" [fragment]="s.id"
              [class.active]="active() === s.id" [attr.aria-current]="active() === s.id ? 'location' : null">{{ i + 1 }}. {{ s.title }}</a>
          </nav>
        </aside>

        <article class="legal legal-numbered lg:col-span-9 max-w-3xl">

          <div class="callout">
            <p class="font-semibold text-navy">The short version</p>
            <ul class="!mb-0">
              <li>We collect what you send us — mainly job applications, CVs and business enquiries — and use it to match candidates with healthcare roles.</li>
              <li>We share candidate profiles only with partner agencies and employers considering you for a role. We verify licences with nursing boards but do not run background checks ourselves.</li>
              <li>We only text you if you opt in, and we never share your mobile number for marketing.</li>
              <li>We <strong>do not sell</strong> your personal information or use it for targeted advertising.</li>
              <li>The site uses only one essential cookie unless you choose otherwise. See our <a routerLink="/cookie-policy" class="link">cookie policy</a>.</li>
              <li>You can ask to see, correct or delete your information at any time: <a [href]="'mailto:' + L.privacyEmail" class="link">{{ L.privacyEmail }}</a>.</li>
            </ul>
          </div>

          <section id="who-we-are">
            <h2>Who we are</h2>
            <p>{{ L.brand }} ({{ L.legalEntity }}, registered address {{ L.registeredAddress }}) is a healthcare recruitment partner. We source and screen nurses and healthcare professionals and introduce them to licensed staffing agencies and healthcare providers (“partner agencies”). We also provide recruitment process outsourcing, credentialing support and back-office support to those agencies.</p>
            <p>For the personal information we collect through this website, we are the <strong>controller</strong> (UK GDPR), the organization <strong>accountable</strong> for your personal information (Canada) and the <strong>business</strong> collecting it (US state laws). When we process data on behalf of a client agency — for example as their outsourced recruiter — we act as their <strong>processor / service provider</strong> and follow their instructions and privacy notice.</p>
          </section>

          <section id="what-we-collect">
            <h2>Information we collect</h2>
            <div class="table-wrap">
              <table>
                <caption class="sr-only">Categories of personal information we collect</caption>
                <thead><tr><th scope="col">Who</th><th scope="col">What we collect</th><th scope="col">Source</th></tr></thead>
                <tbody>
                  <tr>
                    <td><strong>Candidates</strong></td>
                    <td>Name, email, phone, city, state / province / county and country; licence types and issuing states or bodies, whether you hold a multistate Nurse Licensure Compact (NLC) licence, and certifications such as BLS or ACLS; experience; expected pay; your answer about work authorization; the job you applied for; your CV / resume and cover note; whether you agreed to text messages; notes from screening calls and interviews.</td>
                    <td>You; public licence records from state boards of nursing and Nursys® (NCSBN), the NMC and provincial nursing colleges; and, with your permission, referees</td>
                  </tr>
                  <tr>
                    <td><strong>Clients and partners</strong></td>
                    <td>Name, job title, company, work email and phone, and the hiring requirements you send us.</td>
                    <td>You or your organization</td>
                  </tr>
                  <tr>
                    <td><strong>Website visitors</strong></td>
                    <td>Server logs (IP address, browser and device type, pages requested, date and time) and your cookie choices.</td>
                    <td>Your browser, automatically</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p><strong>What we don’t collect.</strong> Our application forms do not ask about your salary history, criminal history, age or date of birth, health or disability, or for Social Security or licence numbers. We do not collect biometric identifiers (such as fingerprints or face scans) or consumer health data through this website.</p>
            <p><strong>Please don’t send us sensitive information we haven’t asked for</strong> — for example your date of birth, photo, marital status, religion, health information, Social Security / National Insurance / Social Insurance number or bank details. If it is in your CV, we will not use it to assess you. Where a partner agency later needs such details for a background check or right-to-work check, it will ask you directly under its own privacy notice.</p>
            <p><strong>Health records and HIPAA.</strong> {{ L.brand }} is not a healthcare provider or health plan and is not a “covered entity” under HIPAA. Health-related credentialing documents — such as immunization and TB records, drug screens, physicals and fit-for-duty forms — are requested and kept by the partner agency or employer through its own secure process, not through this website. If you send them to us by mistake, we will delete them and tell you where to send them.</p>
          </section>

          <section id="how-we-use">
            <h2>How we use it and our legal bases</h2>
            <p>The UK lawful basis is shown for each purpose. In Canada and the US we rely on your consent, which you give when you submit a form, and on uses the law otherwise permits.</p>
            <div class="table-wrap">
              <table>
                <caption class="sr-only">Purposes of processing and lawful bases</caption>
                <thead><tr><th scope="col">Purpose</th><th scope="col">UK lawful basis</th></tr></thead>
                <tbody>
                  <tr><td>Reviewing your application, screening your experience and contacting you about suitable roles</td><td>Steps at your request before a possible engagement; legitimate interests</td></tr>
                  <tr><td>Sharing your profile with partner agencies and employers for roles you applied for or agreed to be considered for</td><td>Steps at your request; legitimate interests</td></tr>
                  <tr><td>Keeping your profile so we can tell you about future roles</td><td>Legitimate interests — you can object at any time</td></tr>
                  <tr><td>Coordinating interviews and credentialing paperwork</td><td>Steps at your request; contract with our clients</td></tr>
                  <tr><td>Answering client and partner enquiries and running our services</td><td>Legitimate interests; contract</td></tr>
                  <tr><td>Keeping the website secure and preventing fraud</td><td>Legitimate interests</td></tr>
                  <tr><td>Optional analytics or marketing cookies</td><td>Consent</td></tr>
                  <tr><td>Meeting legal, tax and regulatory obligations and handling legal claims</td><td>Legal obligation; legitimate interests</td></tr>
                </tbody>
              </table>
            </div>
            <p>We do <strong>not</strong> make hiring decisions about you by automated processing alone. A person reviews every application. Partner agencies and employers make the final hiring decision.</p>
            <p>We will only send you marketing emails if you ask for them or if the law allows it, and every message includes a way to unsubscribe.</p>
          </section>

          <section id="verification">
            <h2>Licence verification and background checks</h2>
            <p>Patient-safety rules and accreditation standards for healthcare staffing (such as The Joint Commission’s Health Care Staffing Services certification) require clinical staff to be checked against primary sources. As part of screening we may:</p>
            <ul>
              <li>verify your nursing or professional licence, its status and any public disciplinary action with the issuing state board of nursing or <strong>Nursys®</strong>, including multistate (NLC) privileges;</li>
              <li>check the US HHS-OIG List of Excluded Individuals/Entities (LEIE) and the SAM.gov exclusion list, which are public records;</li>
              <li>contact referees you have named, with your permission.</li>
            </ul>
            <p><strong>We do not order background checks, criminal record checks, credit reports, drug tests or other “consumer reports”.</strong> If a partner agency or employer does, the US Fair Credit Reporting Act (FCRA) and state laws require it to give you a separate written disclosure, get your written authorization first and, before any adverse decision based on the report, give you a copy of the report and a summary of your rights. Many states and cities also limit when employers may ask about criminal history (“fair chance” or “ban-the-box” laws). We do not ask about it.</p>
            <p>The employer verifies work authorization after a job offer, using Form I-9 and, where it is used, E-Verify. We never ask for identity or immigration documents before then.</p>
          </section>

          <section id="sharing">
            <h2>Who we share it with</h2>
            <ul>
              <li><strong>Partner agencies and healthcare employers</strong> considering you for a role. They decide whether to hire you and handle your data under their own privacy notices.</li>
              <li><strong>Service providers</strong> that host our website, email and data, under written contracts that let them use it only on our instructions and keep it secure.</li>
              <li><strong>Professional advisers</strong> such as lawyers and accountants, under a duty of confidentiality.</li>
              <li><strong>Authorities</strong> when the law requires it, or to protect rights, safety and property.</li>
              <li><strong>A buyer or successor</strong> if our business is reorganised or sold, under the same protections.</li>
            </ul>
            <p>We do <strong>not sell</strong> personal information, and we do not <strong>share</strong> it for cross-context behavioural advertising, as those terms are defined in US state privacy laws. We have not done so in the last 12 months.</p>
          </section>

          <section id="calls-texts">
            <h2>Calls, texts and emails</h2>
            <p>We contact candidates by email and phone about the applications they send us and about similar roles.</p>
            <ul>
              <li><strong>Text messages</strong> are sent only if you tick the separate, optional text-message box on our forms. Agreeing is not a condition of applying. We send up to 4 messages a week; message and data rates may apply. Reply <strong>STOP</strong> to opt out at any time, or <strong>HELP</strong> for help.</li>
              <li><strong>We do not share your mobile number or text-message opt-in with third parties or affiliates for their marketing.</strong> Text-message opt-in data and consent are excluded from all sharing described in this policy.</li>
              <li><strong>Emails</strong> about new roles include an unsubscribe link, and we act on it promptly, as the US CAN-SPAM Act, UK PECR and Canada’s Anti-Spam Legislation (CASL) require.</li>
              <li>We do not use autodialed or pre-recorded calls without your consent, and we respect the US National Do Not Call Registry for marketing calls.</li>
            </ul>
          </section>

          <section id="cookies">
            <h2>Cookies</h2>
            <p>This website sets one strictly necessary cookie, which remembers your cookie choices. Optional analytics and marketing cookies are only used if you turn them on, and we honour the Global Privacy Control signal. Details are in our <a routerLink="/cookie-policy" class="link">cookie policy</a>, and you can change your choice at any time in <button type="button" class="link bg-transparent border-0 p-0 cursor-pointer" (click)="consent.openPreferences()">cookie settings</button>.</p>
          </section>

          <section id="international">
            <h2>International transfers</h2>
            <p>Our recruitment team works from offices outside your country, including {{ L.offshoreCountries }}, and our servers are located in {{ L.hostingCountry }}. Your information may therefore be accessed and stored outside the United States, United Kingdom or Canada, where privacy laws may differ and where courts and authorities may be able to access it.</p>
            <p>We protect these transfers with contractual safeguards — for UK data, the UK International Data Transfer Agreement or the UK Addendum to the EU Standard Contractual Clauses — and by limiting access to staff who need it. You can ask us for a copy of the safeguards we use.</p>
          </section>

          <section id="retention">
            <h2>How long we keep it</h2>
            <div class="table-wrap">
              <table>
                <caption class="sr-only">Retention periods</caption>
                <thead><tr><th scope="col">Information</th><th scope="col">How long</th></tr></thead>
                <tbody>
                  <tr><td>Candidate applications, CVs and screening notes</td><td>{{ L.candidateRetention }} after your last contact with us, then deleted. US federal rules (29 CFR 1602.14) require application records to be kept for at least one year, so a US deletion request may be completed after that year ends.</td></tr>
                  <tr><td>Text-message opt-in and opt-out records</td><td>While we text you and 4 years afterwards, to prove consent</td></tr>
                  <tr><td>Client and partner contact details and contract records</td><td>For the relationship and up to {{ L.clientRetention }} afterwards for legal and tax purposes</td></tr>
                  <tr><td>Website enquiries that don’t lead to a relationship</td><td>12 months</td></tr>
                  <tr><td>Server logs</td><td>Up to 90 days, longer only to investigate a security incident</td></tr>
                  <tr><td>Your cookie choices</td><td>6 months</td></tr>
                </tbody>
              </table>
            </div>
            <p>You can ask us to delete your information sooner. We may need to keep some of it if the law requires it or to deal with a legal claim.</p>
          </section>

          <section id="security">
            <h2>Security</h2>
            <p>CVs are not publicly accessible and only authorised staff can open them. We use encrypted connections (HTTPS), access controls and staff confidentiality obligations, and we only give access to people who need it. No system is perfectly secure. If a breach is likely to affect you, we will tell you and the relevant regulator as the law requires — in the UK within 72 hours of becoming aware of a reportable breach, and in the US as your state’s breach-notification law requires.</p>
          </section>

          <section id="your-rights">
            <h2>How to use your rights</h2>
            <p>Email <a [href]="'mailto:' + L.privacyEmail" class="link">{{ L.privacyEmail }}</a> or use our <a routerLink="/contact-us" class="link">contact form</a>, and tell us which country you live in. To protect you, we will check your identity before sharing or changing data — usually by matching the email address and details you gave us. You may ask someone to act for you as your <strong>authorised agent</strong>; we will ask for proof that they are allowed to.</p>
            <p>We reply within the time the law sets: <strong>one month</strong> in the UK, <strong>30 days</strong> in Canada and <strong>45 days</strong> in the US. These can be extended where the law allows, and we will tell you if they are. Requests are free unless they are clearly unfounded or excessive. We will not treat you differently for using your rights.</p>
          </section>

          <section id="us-rights">
            <h2>United States</h2>
            <p>Residents of California (CCPA/CPRA) and of other states with privacy laws — including Colorado, Connecticut, Virginia, Texas, Oregon and others — may have the right to:</p>
            <ul>
              <li><strong>Know and access</strong> the personal information we hold and get a copy in a portable format;</li>
              <li><strong>Correct</strong> inaccurate information;</li>
              <li><strong>Delete</strong> your information;</li>
              <li><strong>Opt out</strong> of its sale, sharing for targeted advertising, or profiling — we don’t do these, and we treat a <strong>Global Privacy Control</strong> signal as a valid opt-out;</li>
              <li><strong>Limit</strong> the use of sensitive personal information;</li>
              <li><strong>Appeal</strong> our decision on your request by replying to it. If you are unhappy with the result, you can contact your state Attorney General.</li>
            </ul>
            <h3>Notice at collection (California)</h3>
            <p>In the last 12 months we collected these categories: <strong>identifiers</strong> (name, email, phone, IP address); <strong>professional or employment-related information</strong> (licences, NLC status, certifications, experience, CV, pay expectations); <strong>education information</strong> in your CV; <strong>internet activity</strong> (server logs); and <strong>sensitive personal information</strong> limited to your answer about work authorization, which may reveal citizenship or immigration status. We did not collect biometric, health, precise geolocation or financial account information. Sources, purposes, recipients and retention are set out under <a [routerLink]="[]" fragment="what-we-collect" class="link">Information we collect</a>, <a [routerLink]="[]" fragment="how-we-use" class="link">How we use it</a>, <a [routerLink]="[]" fragment="sharing" class="link">Who we share it with</a> and <a [routerLink]="[]" fragment="retention" class="link">How long we keep it</a>. We use sensitive personal information only to assess eligibility for roles you apply for, which is a permitted purpose, and not to infer characteristics about you.</p>
          </section>

          <section id="uk-rights">
            <h2>United Kingdom</h2>
            <p>Under UK GDPR and the Data Protection Act 2018 you have the right to <strong>access</strong> your data, to <strong>correct</strong> it, to have it <strong>erased</strong>, to <strong>restrict</strong> or <strong>object</strong> to its use (including for direct marketing, where you have an absolute right), to <strong>data portability</strong>, and to <strong>withdraw consent</strong> at any time without affecting earlier processing.</p>
            <p>You can complain to the Information Commissioner’s Office at <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener" class="link">ico.org.uk</a> or 0303 123 1113. We would appreciate the chance to resolve your concern first.</p>
          </section>

          <section id="canada-rights">
            <h2>Canada</h2>
            <p>Under PIPEDA, Quebec’s Law 25 and similar provincial laws, you may <strong>access</strong> and <strong>correct</strong> your information and <strong>withdraw consent</strong> on reasonable notice (which may mean we can no longer consider you for roles). Quebec residents may also request <strong>data portability</strong>, ask us to stop disseminating information about them, and be informed of decisions based solely on automated processing — we do not make any.</p>
            <p>Our person in charge of the protection of personal information is {{ L.privacyOfficer }}, reachable at <a [href]="'mailto:' + L.privacyEmail" class="link">{{ L.privacyEmail }}</a>. You may complain to the Office of the Privacy Commissioner of Canada (<a href="https://www.priv.gc.ca" target="_blank" rel="noopener" class="link">priv.gc.ca</a>) or, in Quebec, the Commission d’accès à l’information (<a href="https://www.cai.gouv.qc.ca" target="_blank" rel="noopener" class="link">cai.gouv.qc.ca</a>).</p>
          </section>

          <section id="children">
            <h2>Children</h2>
            <p>This website and our services are for adults seeking work and for businesses. We do not knowingly collect information from anyone under 16. If you believe a child has sent us information, contact us and we will delete it.</p>
          </section>

          <section id="recruitment-fraud">
            <h2>Recruitment scams</h2>
            <p>We <strong>never</strong> ask candidates to pay a fee, buy equipment or share bank or card details to apply or to be placed. Our emails come only from <strong>&#64;hddpconsultants.com</strong> addresses. If someone contacts you claiming to be from {{ L.brand }} and asks for money, do not respond — forward the message to <a [href]="'mailto:' + L.privacyEmail" class="link">{{ L.privacyEmail }}</a>.</p>
          </section>

          <section id="equal-opportunity">
            <h2>Equal opportunity and accessibility</h2>
            <p>We consider every qualified candidate without regard to race, colour, religion, sex, sexual orientation, gender identity, national origin, age, disability, genetic information, veteran or military status, pregnancy, marital status, citizenship status (where protected) or any other characteristic protected by law in the United States, the United Kingdom (Equality Act 2010) or Canada (Canadian Human Rights Act and provincial human rights codes).</p>
            <p>In the United States this includes Title VII of the Civil Rights Act, the Americans with Disabilities Act (ADA), the Age Discrimination in Employment Act, the Genetic Information Nondiscrimination Act (GINA), the Pregnant Workers Fairness Act and the anti-discrimination provisions of the Immigration and Nationality Act, as well as state and local laws. In line with state and local salary-history bans, we never ask about your current or past pay, and our job listings show a pay range.</p>
            <p>If you need an accommodation or reasonable adjustment to apply — for example a different format or help completing the form — email <a [href]="'mailto:' + L.recruitmentEmail" class="link">{{ L.recruitmentEmail }}</a> or call <a [href]="L.phoneHref" class="link">{{ L.phone }}</a>. We aim for this website to meet the Web Content Accessibility Guidelines (WCAG) 2.1 level AA; if any part of it is hard to use, please tell us.</p>
            <p>Licensing and right-to-work requirements — for example an active RN or LPN/LVN licence in the state where you will work (or a multistate NLC licence), NCLEX, and BLS/ACLS or specialty certifications in the US; NMC registration in the UK; or provincial college registration in Canada — are set by the partner agency or employer for each role.</p>
          </section>

          <section id="changes">
            <h2>Changes to this policy</h2>
            <p>We may update this policy as our services or the law change. We will change the date at the top, and if a change materially affects how we use your information we will tell you by email or on this site before it takes effect.</p>
          </section>

          <section id="contact">
            <h2>Contact us</h2>
            <dl class="m-0">
              <div class="py-3 border-t border-line grid sm:grid-cols-3 gap-1"><dt class="font-semibold text-navy">Company</dt><dd class="m-0 sm:col-span-2">{{ L.legalEntity }} (trading as {{ L.brand }})</dd></div>
              <div class="py-3 border-t border-line grid sm:grid-cols-3 gap-1"><dt class="font-semibold text-navy">Address</dt><dd class="m-0 sm:col-span-2">{{ L.registeredAddress }}</dd></div>
              <div class="py-3 border-t border-line grid sm:grid-cols-3 gap-1"><dt class="font-semibold text-navy">Privacy email</dt><dd class="m-0 sm:col-span-2"><a [href]="'mailto:' + L.privacyEmail" class="link">{{ L.privacyEmail }}</a></dd></div>
              <div class="py-3 border-t border-b border-line grid sm:grid-cols-3 gap-1"><dt class="font-semibold text-navy">Phone</dt><dd class="m-0 sm:col-span-2"><a [href]="L.phoneHref" class="link">{{ L.phone }}</a></dd></div>
            </dl>
          </section>

        </article>
      </div>
    </section>
  `
})
export class PrivacyPolicyComponent implements AfterViewInit, OnDestroy {
  consent = inject(CookieConsentService);
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  L = LEGAL;
  active = signal('who-we-are');

  sections = [
    { id: 'who-we-are', title: 'Who we are' },
    { id: 'what-we-collect', title: 'Information we collect' },
    { id: 'how-we-use', title: 'How we use it' },
    { id: 'verification', title: 'Licence verification and background checks' },
    { id: 'sharing', title: 'Who we share it with' },
    { id: 'calls-texts', title: 'Calls, texts and emails' },
    { id: 'cookies', title: 'Cookies' },
    { id: 'international', title: 'International transfers' },
    { id: 'retention', title: 'How long we keep it' },
    { id: 'security', title: 'Security' },
    { id: 'your-rights', title: 'How to use your rights' },
    { id: 'us-rights', title: 'United States' },
    { id: 'uk-rights', title: 'United Kingdom' },
    { id: 'canada-rights', title: 'Canada' },
    { id: 'children', title: 'Children' },
    { id: 'recruitment-fraud', title: 'Recruitment scams' },
    { id: 'equal-opportunity', title: 'Equal opportunity and accessibility' },
    { id: 'changes', title: 'Changes to this policy' },
    { id: 'contact', title: 'Contact us' }
  ];

  ngAfterViewInit() {
    // Highlight the section currently in view in the sticky contents list.
    if (typeof IntersectionObserver === 'undefined') return;
    this.observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) this.active.set(visible[0].target.id);
    }, { rootMargin: '-100px 0px -65% 0px' });
    this.host.nativeElement.querySelectorAll('article section[id]').forEach((el: Element) => this.observer!.observe(el));
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
