'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { creatorCategories } from '@/data/content';
import { isSheetsConfigured, submitToSheet, validateTenDigitPhone } from '@/lib/forms';

type Tab = 'brand' | 'creator';

function digitsOnly(value: string) {
  return value.replace(/\D/g, '').slice(0, 10);
}

function PhoneField({
  id,
  label,
  value,
  onChange,
  required = true,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        type="tel"
        id={id}
        name={id}
        required={required}
        autoComplete="tel"
        inputMode="numeric"
        pattern="[0-9]{10}"
        minLength={10}
        maxLength={10}
        title="Enter exactly 10 digits (numbers only)"
        placeholder="9876543210"
        value={value}
        onChange={(e) => onChange(digitsOnly(e.target.value))}
        onKeyPress={(e) => {
          if (e.key.length === 1 && !/\d/.test(e.key)) e.preventDefault();
        }}
        onPaste={(e) => {
          e.preventDefault();
          onChange(digitsOnly(e.clipboardData.getData('text')));
        }}
      />
      <span className="form-hint">10 digits only, no spaces or +91</span>
    </div>
  );
}

export default function ContactForms() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<Tab>('brand');
  const [configWarning, setConfigWarning] = useState(false);

  const [brand, setBrand] = useState({ name: '', email: '', phone: '', brandName: '' });
  const [creator, setCreator] = useState({
    username: '',
    fullName: '',
    mobile: '',
    followers: '',
    country: '',
    city: '',
    category: '',
  });

  const [brandMessage, setBrandMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [creatorMessage, setCreatorMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [brandLoading, setBrandLoading] = useState(false);
  const [creatorLoading, setCreatorLoading] = useState(false);

  useEffect(() => {
    setTab(searchParams.get('tab') === 'creator' ? 'creator' : 'brand');
  }, [searchParams]);

  useEffect(() => {
    if (!isSheetsConfigured()) setConfigWarning(true);
  }, []);

  const submitBrand = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setBrandMessage(null);
      setBrandLoading(true);

      try {
        const payload = {
          type: 'brand' as const,
          name: brand.name.trim(),
          email: brand.email.trim(),
          phone: validateTenDigitPhone(brand.phone, 'Phone number'),
          brandName: brand.brandName.trim(),
        };
        await submitToSheet(payload);
        setConfigWarning(false);
        setBrandMessage({ type: 'success', text: 'Thank you! We received your inquiry and will be in touch soon.' });
        setBrand({ name: '', email: '', phone: '', brandName: '' });
      } catch (err) {
        setBrandMessage({
          type: 'error',
          text: err instanceof Error ? err.message : 'Something went wrong.',
        });
        setConfigWarning(true);
      } finally {
        setBrandLoading(false);
      }
    },
    [brand]
  );

  const submitCreator = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setCreatorMessage(null);
      setCreatorLoading(true);

      try {
        const payload = {
          type: 'creator' as const,
          username: creator.username.trim(),
          fullName: creator.fullName.trim(),
          mobile: validateTenDigitPhone(creator.mobile, 'Mobile number'),
          followers: creator.followers.trim(),
          country: creator.country.trim(),
          city: creator.city.trim(),
          category: creator.category,
        };
        await submitToSheet(payload);
        setConfigWarning(false);
        setCreatorMessage({
          type: 'success',
          text: 'Thank you! Your creator profile was saved. We will review and reach out.',
        });
        setCreator({
          username: '',
          fullName: '',
          mobile: '',
          followers: '',
          country: '',
          city: '',
          category: '',
        });
      } catch (err) {
        setCreatorMessage({
          type: 'error',
          text: err instanceof Error ? err.message : 'Something went wrong.',
        });
        setConfigWarning(true);
      } finally {
        setCreatorLoading(false);
      }
    },
    [creator]
  );

  return (
    <div className="contact-main intro-on-load" style={{ ['--delay' as string]: '0.45s' }}>
      {configWarning && (
        <div className="form-config-warning form-config-warning--visible" role="alert">
          <strong>Form backend not configured.</strong> Set{' '}
          <code>NEXT_PUBLIC_SHEETS_URL</code> in <code>.env.local</code> (local) or Netlify environment
          variables (production) to your Apps Script <code>/exec</code> URL with access set to{' '}
          <strong>Anyone</strong>.
        </div>
      )}

      <div className="contact-tabs" role="tablist" aria-label="Form type">
        <button
          type="button"
          className={`contact-tabs__btn${tab === 'brand' ? ' contact-tabs__btn--active' : ''}`}
          role="tab"
          aria-selected={tab === 'brand'}
          aria-controls="panel-brand"
          onClick={() => setTab('brand')}
        >
          For Brands
        </button>
        <button
          type="button"
          className={`contact-tabs__btn${tab === 'creator' ? ' contact-tabs__btn--active' : ''}`}
          role="tab"
          aria-selected={tab === 'creator'}
          aria-controls="panel-creator"
          onClick={() => setTab('creator')}
        >
          For Creators
        </button>
      </div>

      <div
        id="panel-brand"
        className={`contact-panel${tab === 'brand' ? ' contact-panel--active' : ''}`}
        role="tabpanel"
        hidden={tab !== 'brand'}
      >
        <form className="contact-form" noValidate onSubmit={submitBrand}>
          <h2 className="contact-form__title">Work With Ekka</h2>
          <p className="contact-form__desc">
            Share your brand details and we&apos;ll reach out about creator-led campaigns.
          </p>

          <div className="form-field">
            <label htmlFor="brand-name">
              Name <span aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="brand-name"
              required
              autoComplete="name"
              placeholder="Your full name"
              value={brand.name}
              onChange={(e) => setBrand((b) => ({ ...b, name: e.target.value }))}
            />
          </div>

          <div className="form-field">
            <label htmlFor="brand-email">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              type="email"
              id="brand-email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              value={brand.email}
              onChange={(e) => setBrand((b) => ({ ...b, email: e.target.value }))}
            />
          </div>

          <PhoneField
            id="brand-phone"
            label="Phone number"
            value={brand.phone}
            onChange={(phone) => setBrand((b) => ({ ...b, phone }))}
          />

          <div className="form-field">
            <label htmlFor="brand-brandName">
              Brand name <span aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="brand-brandName"
              required
              placeholder="Your company or brand"
              value={brand.brandName}
              onChange={(e) => setBrand((b) => ({ ...b, brandName: e.target.value }))}
            />
          </div>

          <button type="submit" className="btn btn--primary" disabled={brandLoading}>
            {brandLoading ? 'Sending…' : 'Submit'}
          </button>
          {brandMessage && (
            <div
              className={`form-message form-message--visible form-message--${brandMessage.type}`}
              role="status"
              aria-live="polite"
            >
              {brandMessage.text}
            </div>
          )}
        </form>
      </div>

      <div
        id="panel-creator"
        className={`contact-panel${tab === 'creator' ? ' contact-panel--active' : ''}`}
        role="tabpanel"
        hidden={tab !== 'creator'}
      >
        <form className="contact-form" noValidate onSubmit={submitCreator}>
          <h2 className="contact-form__title">Join as Creator</h2>
          <p className="contact-form__desc">
            Apply to the Ekka creator network. We review every profile personally.
          </p>

          <div className="form-field">
            <label htmlFor="creator-username">
              Creator username <span aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="creator-username"
              required
              placeholder="@yourhandle"
              value={creator.username}
              onChange={(e) => setCreator((c) => ({ ...c, username: e.target.value }))}
            />
          </div>

          <div className="form-field">
            <label htmlFor="creator-fullName">
              Full name <span aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="creator-fullName"
              required
              autoComplete="name"
              placeholder="Your legal or display name"
              value={creator.fullName}
              onChange={(e) => setCreator((c) => ({ ...c, fullName: e.target.value }))}
            />
          </div>

          <PhoneField
            id="creator-mobile"
            label="Mobile number"
            value={creator.mobile}
            onChange={(mobile) => setCreator((c) => ({ ...c, mobile }))}
          />

          <div className="form-field">
            <label htmlFor="creator-followers">
              Total followers <span aria-hidden="true">*</span>
            </label>
            <input
              type="number"
              id="creator-followers"
              required
              min={0}
              step={1}
              placeholder="e.g. 124000"
              value={creator.followers}
              onChange={(e) => setCreator((c) => ({ ...c, followers: e.target.value }))}
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="creator-country">
                Country <span aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="creator-country"
                required
                autoComplete="country-name"
                placeholder="India"
                value={creator.country}
                onChange={(e) => setCreator((c) => ({ ...c, country: e.target.value }))}
              />
            </div>
            <div className="form-field">
              <label htmlFor="creator-city">
                City <span aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="creator-city"
                required
                autoComplete="address-level2"
                placeholder="Mumbai"
                value={creator.city}
                onChange={(e) => setCreator((c) => ({ ...c, city: e.target.value }))}
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="creator-category">
              Kind of creator <span aria-hidden="true">*</span>
            </label>
            <select
              id="creator-category"
              required
              value={creator.category}
              onChange={(e) => setCreator((c) => ({ ...c, category: e.target.value }))}
            >
              <option value="" disabled>
                Select a category
              </option>
              {creatorCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn--primary" disabled={creatorLoading}>
            {creatorLoading ? 'Sending…' : 'Save'}
          </button>
          {creatorMessage && (
            <div
              className={`form-message form-message--visible form-message--${creatorMessage.type}`}
              role="status"
              aria-live="polite"
            >
              {creatorMessage.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
