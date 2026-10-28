(() => {
  const canonical = 'www.xn--l89ap9efxb823bcqa80c.com';
  const hosts = [canonical, 'xn--l89ap9efxb823bcqa80c.com', 'kimgeunhyung0103.github.io'];
  const url = new URL(location.href);
  if (hosts.includes(location.hostname.toLowerCase())) {
    url.protocol = 'https:'; url.hostname = canonical; url.port = '';
    if (url.pathname === '/index.html') url.pathname = '/';
  }
  const clean = url.pathname.replace(/^\//, '').replace(/\/$/, '');
  if (['home', 'store', 'building', 'factory', 'cctv', 'internet-tv', 'restaurant', 'table-order', 'privacy', 'terms'].includes(clean)) url.pathname = '/' + clean + '.html';
  if (['/', '/index.html'].includes(url.pathname)) {
    if (url.hash === '#services') url.hash = '#space-gallery';
    if (url.hash === '#process') url.hash = '#faq-title';
  }
  if (url.href !== location.href) location.replace(url.href);
})();
