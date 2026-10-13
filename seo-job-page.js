// Server-side SEO for job pages (/jobs/:id). The Angular app shell has generic tags, so
// before sending it we fill in the job's title, description, canonical URL and the
// Google for Jobs JobPosting data. The browser app later updates the same tags
// (the JSON-LD script keeps the same id, so it is replaced rather than duplicated).

const COUNTRY_ISO = { 'United States': 'US', 'United Kingdom': 'GB', 'Canada': 'CA' };

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function employmentType(jobType) {
  const t = (jobType || '').toLowerCase();
  if (t.includes('per diem') || t.includes('prn')) return ['PER_DIEM'];
  if (t.includes('contract') || t.includes('travel') || t.includes('locum')) return ['CONTRACTOR', 'TEMPORARY'];
  if (t.includes('part')) return ['PART_TIME'];
  return ['FULL_TIME'];
}

function baseSalary(payRange, country) {
  const p = (payRange || '').toLowerCase();
  const nums = p.replace(/,/g, '').match(/\d+(?:\.\d+)?/g)?.map(Number);
  if (!nums?.length) return undefined;
  const unit = /hr|hour/.test(p) ? 'HOUR' : /week|wk/.test(p) ? 'WEEK' : /month/.test(p) ? 'MONTH' : /year|yr|annum|annual/.test(p) ? 'YEAR' : undefined;
  if (!unit) return undefined;
  const currency = /£|gbp/.test(p) ? 'GBP' : /cad|c\$/.test(p) || country === 'Canada' ? 'CAD' : country === 'United Kingdom' ? 'GBP' : 'USD';
  return { '@type': 'MonetaryAmount', currency, value: { '@type': 'QuantitativeValue', minValue: nums[0], maxValue: nums[nums.length - 1], unitText: unit } };
}

function setTag(html, pattern, tag) {
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `  ${tag}\n</head>`);
}

function renderJobHead(shell, job, siteUrl) {
  const country = job.country || 'United States';
  const place = `${job.location}, ${country}`;
  const url = `${siteUrl}/jobs/${job.id}`;
  const pay = job.pay_range ? ` Pay: ${job.pay_range}.` : '';
  const title = `${job.title} – ${job.location} | HDDP`;
  const description = `${job.job_type} ${job.title} job in ${place}.${pay} ${(job.description || '').slice(0, 110)}`.trim().slice(0, 160);
  const city = (job.location || '').split('(')[0].split(',')[0].trim();

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: `<p>${esc(job.description)}</p><p><strong>Requirements:</strong> ${esc(job.requirements)}</p>`,
    datePosted: String(job.created_at || new Date().toISOString()).slice(0, 10),
    employmentType: employmentType(job.job_type),
    hiringOrganization: { '@type': 'Organization', name: 'HDDP Consultants', sameAs: siteUrl, logo: `${siteUrl}/assets/MainLogoHDDP.png` },
    identifier: { '@type': 'PropertyValue', name: 'HDDP Consultants', value: String(job.id) },
    url,
    baseSalary: baseSalary(job.pay_range, country),
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: city, addressRegion: job.state || undefined, addressCountry: COUNTRY_ISO[country] || country }
    },
    occupationalCategory: job.specialty,
    experienceRequirements: job.experience_required,
    directApply: true
  };

  let html = shell;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = setTag(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${esc(description)}">`);
  html = setTag(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(title)}">`);
  html = setTag(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(description)}">`);
  html = setTag(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}">`);
  html = setTag(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}">`);
  // "<" escaped so job text can never close the script tag
  const ld = JSON.stringify(jsonLd).replace(/</g, '\\u003c');
  return html.replace('</head>', `  <script type="application/ld+json" id="job-posting-jsonld">${ld}</script>\n</head>`);
}

function renderNoIndex(shell) {
  return setTag(shell, /<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex, follow">');
}

module.exports = { renderJobHead, renderNoIndex };
