const ENV_SHEETS = (process.env.NEXT_PUBLIC_SHEETS_URL || '').trim().replace(/\/$/, '');
/** Public Apps Script endpoint — used if env is missing (e.g. Vercel without env var yet) */
const FALLBACK_SHEETS =
  'https://script.google.com/macros/s/AKfycbwXPggk73UuoU2OHxQFNipRJwPrpcwOmR1d1P9gmIpoMj7Q1NohjnOZGcD28AjF46vj/exec';

const SHEETS_URL = ENV_SHEETS || FALLBACK_SHEETS;

export type BrandPayload = {
  type: 'brand';
  name: string;
  email: string;
  phone: string;
  brandName: string;
};

export type CreatorPayload = {
  type: 'creator';
  username: string;
  fullName: string;
  mobile: string;
  followers: string;
  country: string;
  city: string;
  category: string;
};

export type FormPayload = BrandPayload | CreatorPayload;

function buildQuery(payload: Record<string, string>) {
  const q = new URLSearchParams();
  Object.entries(payload).forEach(([key, val]) => {
    if (val != null) q.append(key, String(val));
  });
  return q.toString();
}

function submitViaIframe(payload: FormPayload): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!SHEETS_URL) {
      reject(new Error('Form backend is not configured. Set NEXT_PUBLIC_SHEETS_URL in .env.local'));
      return;
    }

    const frameId = 'ekka-submit-frame';
    let frame = document.getElementById(frameId) as HTMLIFrameElement | null;
    if (!frame) {
      frame = document.createElement('iframe');
      frame.id = frameId;
      frame.name = frameId;
      frame.title = 'Form submission';
      frame.setAttribute('aria-hidden', 'true');
      frame.style.cssText = 'position:absolute;width:0;height:0;border:0;visibility:hidden';
      frame.src = 'about:blank';
      document.body.appendChild(frame);
    }

    const form = document.createElement('form');
    let armed = false;
    const params = { ...payload } as unknown as Record<string, string>;
    params.type = payload.type;

    form.method = 'GET';
    form.action = SHEETS_URL;
    form.target = frameId;
    form.style.display = 'none';

    Object.keys(params).forEach((key) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = params[key] ?? '';
      form.appendChild(input);
    });

    const timeoutId = window.setTimeout(() => {
      if (!armed) return;
      armed = false;
      cleanup();
      reject(new Error('Submission timed out. Please try again.'));
    }, 30000);

    function cleanup() {
      window.clearTimeout(timeoutId);
      frame?.removeEventListener('load', onLoad);
      form.remove();
    }

    function onLoad() {
      if (!armed) return;
      armed = false;
      cleanup();
      resolve();
    }

    frame.addEventListener('load', onLoad);
    document.body.appendChild(form);
    armed = true;
    form.submit();
  });
}

function submitViaJsonp(payload: FormPayload): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!SHEETS_URL) {
      reject(new Error('Form backend is not configured.'));
      return;
    }

    const callbackName = `ekkaCb_${Date.now()}`;
    const params = { ...payload } as unknown as Record<string, string>;
    params.type = payload.type;
    params.callback = callbackName;

    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error('JSONP timeout'));
    }, 15000);

    function cleanup() {
      window.clearTimeout(timeoutId);
      delete (window as unknown as Record<string, unknown>)[callbackName];
      script.remove();
    }

    (window as unknown as Record<string, (r: { success?: boolean; error?: string }) => void>)[callbackName] = (
      result
    ) => {
      cleanup();
      if (result?.success) resolve();
      else reject(new Error(result?.error || 'Submission failed.'));
    };

    const script = document.createElement('script');
    script.src = `${SHEETS_URL}?${buildQuery(params)}`;
    script.onerror = () => {
      cleanup();
      reject(new Error('Could not reach form server.'));
    };
    document.head.appendChild(script);
  });
}

export async function submitToSheet(payload: FormPayload): Promise<void> {
  try {
    await submitViaIframe(payload);
  } catch {
    await submitViaJsonp(payload);
  }
}

export function validateTenDigitPhone(value: string, label: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 10) {
    throw new Error(`${label} must be exactly 10 digits.`);
  }
  return digits;
}

export function isSheetsConfigured(): boolean {
  return Boolean(SHEETS_URL);
}
