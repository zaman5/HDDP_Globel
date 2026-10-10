import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// NOTE FOR SITE OWNER: replace every [BRACKETED] value below with your real company details
// and have the final text reviewed by a qualified lawyer before going live.
@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex flex-col w-full">

      <section class="band !pb-10 border-b border-line">
        <div class="max-w-4xl mx-auto px-6">
          <h1 class="t-h1">Privacy policy</h1>
          <p class="t-body mt-3">For candidates, clients and website visitors in the United States, United Kingdom and Canada. Last updated: {{ lastUpdated }}</p>
        </div>
      </section>

      <section class="py-12 px-6 lg:px-12 bg-white">
        <article class="max-w-4xl mx-auto text-[0.975rem] text-ink leading-relaxed space-y-10">

          <nav aria-label="Contents" class="p-6 rounded-lg bg-mist">
            <p class="font-semibold text-navy mb-2">Contents</p>
            <ol class="list-decimal pl-5 space-y-1">
              <li *ngFor="let s of sections"><a [routerLink]="[]" [fragment]="s.id" class="link">{{ s.title }}</a></li>
            </ol>
          </nav>

          <section id="who-we-are" class="scroll-mt-32">
            <h2 class="t-h3 !text-xl">1. Who we are</h2>
            <p class="mt-2">HDDP Consultants ([LEGAL ENTITY NAME], registered address [REGISTERED ADDRESS]) is a healthcare recruitment partner. We source and screen nurses and healthcare professionals and introduce them to licensed healthcare staffing agencies and healthcare providers ("partner agencies"). For candidate data we collect through this website, we are the data controller (UK) / the organization accountable for your personal information (Canada) / the business collecting your personal information (US).</p>
            <p class="mt-2">Privacy contact: <a href="mailto:[PRIVACY EMAIL]" class="link">[PRIVACY EMAIL]</a>. <span class="text-slate-500">UK representative / Canadian privacy officer: [NAME, if applicable].</span></p>
          </section>

          <section id="what-we-collect" class="scroll-mt-32">
            <h2 class="t-h3 !text-xl">2. Information we collect</h2>
            <ul class="mt-2 list-disc pl-5 space-y-1">
              <li><strong>Candidates:</strong> name, email, phone, city, state/province/county and country, licences and certifications, years of experience, expected pay, your answer about work authorization, the job you applied for, your CV/resume and anything you write in your cover note.</li>
              <li><strong>Clients and partners:</strong> name, job title, company, work email and phone, and the hiring requirements you send us.</li>
              <li><strong>Website:</strong> standard server logs (IP address, browser type, pages requested). We do not use advertising or analytics cookies.</li>
            </ul>
            <p class="mt-2">Please do <strong>not</strong> include sensitive information in your CV that we have not asked for — for example date of birth, photo, marital status, religion, health information, Social Security / National Insurance / Social Insurance numbers, or bank details.</p>
          </section>

          <section id="how-we-use" class="scroll-mt-32">
            <h2 class="t-h3 !text-xl">3. How we use your information</h2>
            <ul class="mt-2 list-disc pl-5 space-y-1">
              <li>To review your application, screen your experience and contact you about suitable roles.</li>
              <li>To share your profile and CV with partner agencies or healthcare providers for roles you applied for or agreed to be considered for.</li>
              <li>To coordinate interviews and credentialing documentation with partner agencies.</li>
              <li>To respond to client and partner enquiries.</li>
              <li>To meet legal obligations and to keep our systems secure.</li>
            </ul>
            <p class="mt-2">We do <strong>not</strong> sell your personal information and do not share it for cross-context behavioural advertising. We do not make hiring decisions about you using solely automated processing.</p>
          </section>

          <section id="sharing" class="scroll-mt-32">
            <h2 class="t-h3 !text-xl">4. Who we share it with</h2>
            <ul class="mt-2 list-disc pl-5 space-y-1">
              <li>Partner staffing agencies and healthcare providers considering you for a role. The agency or employer makes the hiring decision and will handle your data under its own privacy notice.</li>
              <li>Service providers who host our website, email and data under contract and only on our instructions.</li>
              <li>Authorities where the law requires it.</li>
            </ul>
          </section>

          <section id="international" class="scroll-mt-32">
            <h2 class="t-h3 !text-xl">5. International transfers</h2>
            <p class="mt-2">Our recruitment team works from offices outside your country, including [COUNTRY / COUNTRIES OF OFFSHORE TEAM], and our servers are located in [HOSTING COUNTRY]. Your information may therefore be accessed and stored outside the United States, United Kingdom or Canada, where privacy laws may differ. We protect these transfers with contractual safeguards (for UK data, the UK International Data Transfer Agreement or Addendum) and with access controls limiting your data to staff who need it.</p>
          </section>

          <section id="retention" class="scroll-mt-32">
            <h2 class="t-h3 !text-xl">6. How long we keep it</h2>
            <p class="mt-2">We keep candidate applications and CVs for [24 MONTHS] after your last contact with us, so we can consider you for future roles, and then delete them. You can ask us to delete them sooner at any time.</p>
          </section>

          <section id="security" class="scroll-mt-32">
            <h2 class="t-h3 !text-xl">7. Security</h2>
            <p class="mt-2">CVs are not publicly accessible and can only be retrieved by authorised staff. We use encrypted connections (HTTPS) and limit access to the people who need it. No system is perfectly secure; if a breach affects you we will notify you and the relevant regulator as the law requires.</p>
          </section>

          <section id="us-rights" class="scroll-mt-32">
            <h2 class="t-h3 !text-xl">8. United States — your rights</h2>
            <p class="mt-2">Depending on your state (including California under the CCPA/CPRA, and states such as Colorado, Connecticut, Virginia, Texas and others), you may have the right to know what personal information we hold, to get a copy, to correct it, to delete it, and to opt out of its sale or sharing (we do not sell or share it). <strong>Notice at collection (California):</strong> the categories we collect and why are listed in sections 2 and 3, and retention in section 6. We will not discriminate against you for exercising these rights. To make a request, email <a href="mailto:[PRIVACY EMAIL]" class="link">[PRIVACY EMAIL]</a>; we will verify your identity before responding.</p>
          </section>

          <section id="uk-rights" class="scroll-mt-32">
            <h2 class="t-h3 !text-xl">9. United Kingdom — your rights (UK GDPR)</h2>
            <p class="mt-2"><strong>Lawful bases:</strong> we process candidate data to take steps at your request before a possible engagement and for our legitimate interest in matching candidates with roles; we rely on consent where we ask for it, and you can withdraw it at any time. You have the right to access, correct, erase, restrict or object to processing of your data, and to data portability. You can complain to the Information Commissioner's Office (<a href="https://ico.org.uk" target="_blank" rel="noopener" class="link">ico.org.uk</a>), though we would appreciate the chance to resolve your concern first.</p>
          </section>

          <section id="canada-rights" class="scroll-mt-32">
            <h2 class="t-h3 !text-xl">10. Canada — your rights (PIPEDA and Quebec Law 25)</h2>
            <p class="mt-2">We collect, use and disclose your personal information with your consent, given when you submit an application. You may access and correct your information and withdraw consent (which may mean we can no longer consider you for roles). Quebec residents also have rights to data portability and to be informed of decisions based on automated processing. Our person in charge of personal information is [PRIVACY OFFICER NAME], <a href="mailto:[PRIVACY EMAIL]" class="link">[PRIVACY EMAIL]</a>. You may complain to the Office of the Privacy Commissioner of Canada (<a href="https://www.priv.gc.ca" target="_blank" rel="noopener" class="link">priv.gc.ca</a>) or, in Quebec, the Commission d'accès à l'information.</p>
          </section>

          <section id="equal-opportunity" class="scroll-mt-32">
            <h2 class="t-h3 !text-xl">11. Equal opportunity and accessibility</h2>
            <p class="mt-2">We consider every qualified candidate without regard to race, colour, religion, sex, sexual orientation, gender identity, national origin, age, disability, veteran status, pregnancy, marital status or any other characteristic protected by law in the United States, the United Kingdom (Equality Act 2010) or Canada (Canadian Human Rights Act and provincial codes). If you need an accommodation or reasonable adjustment to apply — for example a different format or help completing the form — email <a href="mailto:[RECRUITMENT EMAIL]" class="link">[RECRUITMENT EMAIL]</a>.</p>
            <p class="mt-2">Licensing and right-to-work requirements (for example a U.S. state nursing licence or NCLEX, NMC registration in the UK, or provincial college registration in Canada) are set by the partner agency or employer for each role.</p>
          </section>

          <section id="changes" class="scroll-mt-32">
            <h2 class="t-h3 !text-xl">12. Changes and contact</h2>
            <p class="mt-2">We may update this policy and will change the date at the top when we do. Questions or requests: <a href="mailto:[PRIVACY EMAIL]" class="link">[PRIVACY EMAIL]</a> or our <a routerLink="/contact-us" class="link">contact page</a>.</p>
          </section>

        </article>
      </section>
    </div>
  `
})
export class PrivacyPolicyComponent {
  lastUpdated = 'October 10, 2026';

  sections = [
    { id: 'who-we-are', title: 'Who we are' },
    { id: 'what-we-collect', title: 'Information we collect' },
    { id: 'how-we-use', title: 'How we use your information' },
    { id: 'sharing', title: 'Who we share it with' },
    { id: 'international', title: 'International transfers' },
    { id: 'retention', title: 'How long we keep it' },
    { id: 'security', title: 'Security' },
    { id: 'us-rights', title: 'United States — your rights' },
    { id: 'uk-rights', title: 'United Kingdom — your rights' },
    { id: 'canada-rights', title: 'Canada — your rights' },
    { id: 'equal-opportunity', title: 'Equal opportunity and accessibility' },
    { id: 'changes', title: 'Changes and contact' }
  ];
}
