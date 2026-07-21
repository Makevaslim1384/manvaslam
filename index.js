export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // تنظیم دامنه هدف (ریلیوی شما)
    url.hostname = 'makvaslim.up.railway.app';
    
    // کپی کردن هدرها و اصلاح هدر Host برای مطابقت با ریلیوی
    const modifiedHeaders = new Headers(request.headers);
    modifiedHeaders.set('Host', 'makvaslim.up.railway.app');
    
    // ساخت درخواست جدید برای ارسال به سرور ریلیوی
    const modifiedRequest = new Request(url, {
      headers: modifiedHeaders,
      method: request.method,
      body: request.body,
      redirect: request.redirect
    });

    try {
      // دریافت پاسخ از ریلیوی و ارسال آن به کاربر (به همراه قابلیت‌های سی‌دی‌ان کلودفلر)
      let response = await fetch(modifiedRequest);
      return response;
    } catch (e) {
      return new Response('Cloudflare Worker Proxy Error: ' + e.message, { status: 500 });
    }
  }
};
