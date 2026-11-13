import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowsClockwise,
  Check,
  Copy,
  Desktop,
  DeviceMobile,
  DeviceTablet,
  EnvelopeSimple,
  Eye,
  EyeSlash,
  Globe,
  LockKey,
  MagnifyingGlass,
  Plus,
  Robot,
  SignOut,
  SpinnerGap,
  WarningCircle,
  X,
} from '@phosphor-icons/react';

interface LinkStat {
  slug: string;
  target_url: string;
  clicks: number;
}

interface DeviceStat {
  device_type: string;
  clicks: number;
}

interface RefererStat {
  source: string;
  clicks: number;
}

interface ClickLogEntry {
  id: number;
  slug: string;
  referer: string;
  referer_source: string;
  user_agent: string;
  device_type: string;
  clicked_at: string;
}

interface AnalyticsResponse {
  total_clicks: number;
  logged_clicks: number;
  links: LinkStat[];
  by_device: DeviceStat[];
  top_referers: RefererStat[];
  recent_clicks: ClickLogEntry[];
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  content: string;
  created_at: string;
}

const SESSION_TOKEN_KEY = 'portfolio_admin_token';

const FOCUS_RING =
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]';

class AdminAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AdminAuthError';
  }
}

async function fetchAdminBundle(token: string, slugFilter: string): Promise<{
  links: LinkStat[];
  analytics: AnalyticsResponse;
  messages: ContactMessage[];
}> {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const analyticsUrl = slugFilter
    ? `/api/analytics?slug=${encodeURIComponent(slugFilter)}&limit=50`
    : '/api/analytics?limit=50';

  const [statsRes, analyticsRes, messagesRes] = await Promise.all([
    fetch('/api/stats', { headers }),
    fetch(analyticsUrl, { headers }),
    fetch('/api/messages', { headers }),
  ]);

  const unauthorized = [statsRes, analyticsRes, messagesRes].find(
    (r) => r.status === 401 || r.status === 503
  );
  if (unauthorized) {
    const body = await unauthorized.json().catch(() => ({}));
    throw new AdminAuthError(body.error || 'Invalid or expired admin token.');
  }

  if (!statsRes.ok || !analyticsRes.ok || !messagesRes.ok) {
    throw new Error('Failed to load admin dashboard data from backend.');
  }

  const [statsData, analyticsData, messagesData] = await Promise.all([
    statsRes.json() as Promise<LinkStat[]>,
    analyticsRes.json() as Promise<AnalyticsResponse>,
    messagesRes.json() as Promise<ContactMessage[]>,
  ]);

  return {
    links: Array.isArray(statsData) ? statsData : [],
    analytics: analyticsData,
    messages: Array.isArray(messagesData) ? messagesData : [],
  };
}

function formatTimestamp(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '—';
  const isoCandidate = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(trimmed)
    ? `${trimmed.replace(' ', 'T')}Z`
    : trimmed;
  const date = new Date(isoCandidate);
  if (Number.isNaN(date.getTime())) return trimmed;

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function DeviceIcon({ type }: { type: string }) {
  switch (type.toLowerCase()) {
    case 'mobile':
      return <DeviceMobile size={15} className="text-[#6b7280]" />;
    case 'tablet':
      return <DeviceTablet size={15} className="text-[#6b7280]" />;
    case 'bot':
      return <Robot size={15} className="text-[#6b7280]" />;
    default:
      return <Desktop size={15} className="text-[#6b7280]" />;
  }
}

export default function AdminDashboard() {
  const [savedToken, setSavedToken] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    return window.sessionStorage.getItem(SESSION_TOKEN_KEY) ?? '';
  });
  const [tokenInput, setTokenInput] = useState('');
  const [showToken, setShowToken] = useState(false);

  const [activeTab, setActiveTab] = useState<'analytics' | 'inbox'>('analytics');
  const [selectedSlug, setSelectedSlug] = useState<string>('');
  const [inboxQuery, setInboxQuery] = useState('');

  const [allLinks, setAllLinks] = useState<LinkStat[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [fetchError, setFetchError] = useState('');

  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [showNewLinkForm, setShowNewLinkForm] = useState(false);
  const [newSlug, setNewSlug] = useState('');
  const [newTargetUrl, setNewTargetUrl] = useState('');
  const [createLinkStatus, setCreateLinkStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [createLinkError, setCreateLinkError] = useState('');

  const lastLoadedKeyRef = useRef('');

  const applyBundle = useCallback(
    (
      token: string,
      slugFilter: string,
      bundle: { links: LinkStat[]; analytics: AnalyticsResponse; messages: ContactMessage[] }
    ) => {
      lastLoadedKeyRef.current = `${token}|${slugFilter}`;
      setAllLinks(bundle.links);
      setAnalytics(bundle.analytics);
      setMessages(bundle.messages);
    },
    []
  );

  const handleSessionAuthFailure = useCallback((message: string) => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(SESSION_TOKEN_KEY);
    }
    lastLoadedKeyRef.current = '';
    setSavedToken('');
    setAnalytics(null);
    setAllLinks([]);
    setMessages([]);
    setAuthError(message);
  }, []);

  const refreshDashboard = useCallback(
    async (token: string, slugFilter: string) => {
      setIsLoading(true);
      setAuthError('');
      setFetchError('');
      try {
        const bundle = await fetchAdminBundle(token, slugFilter);
        applyBundle(token, slugFilter, bundle);
        return true;
      } catch (err: unknown) {
        if (err instanceof AdminAuthError) {
          handleSessionAuthFailure(err.message);
          return false;
        }
        setFetchError(err instanceof Error ? err.message : 'Unable to reach backend server.');
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [applyBundle, handleSessionAuthFailure]
  );

  useEffect(() => {
    if (!savedToken) return;
    const key = `${savedToken}|${selectedSlug}`;
    if (lastLoadedKeyRef.current === key) return;

    let cancelled = false;
    void (async () => {
      setIsLoading(true);
      try {
        const bundle = await fetchAdminBundle(savedToken, selectedSlug);
        if (cancelled) return;
        applyBundle(savedToken, selectedSlug, bundle);
        setFetchError('');
      } catch (err: unknown) {
        if (cancelled) return;
        if (err instanceof AdminAuthError) {
          handleSessionAuthFailure(err.message);
          return;
        }
        setFetchError(err instanceof Error ? err.message : 'Unable to reach backend server.');
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [savedToken, selectedSlug, applyBundle, handleSessionAuthFailure]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    const candidate = tokenInput.trim();
    if (!candidate) {
      setAuthError('Please enter your ADMIN_SECRET token.');
      return;
    }
    const ok = await refreshDashboard(candidate, selectedSlug);
    if (ok) {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(SESSION_TOKEN_KEY, candidate);
      }
      setSavedToken(candidate);
      setTokenInput('');
    }
  };

  const handleLockSession = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(SESSION_TOKEN_KEY);
    }
    lastLoadedKeyRef.current = '';
    setSavedToken('');
    setAnalytics(null);
    setAllLinks([]);
    setMessages([]);
    setSelectedSlug('');
    setInboxQuery('');
    setAuthError('');
    setFetchError('');
  };

  const handleCopyShortlink = async (slug: string) => {
    const shareUrl = `${window.location.origin}/to/${slug}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug((curr) => (curr === slug ? null : curr)), 1800);
    } catch {
      // Clipboard API unavailable in restricted contexts
    }
  };

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLinkStatus('submitting');
    setCreateLinkError('');

    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${savedToken}`,
        },
        body: JSON.stringify({
          slug: newSlug.trim().toLowerCase(),
          target_url: newTargetUrl.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create shortlink.');
      }

      setNewSlug('');
      setNewTargetUrl('');
      setCreateLinkStatus('idle');
      setShowNewLinkForm(false);
      await refreshDashboard(savedToken, selectedSlug);
    } catch (err: unknown) {
      setCreateLinkStatus('error');
      setCreateLinkError(err instanceof Error ? err.message : 'Failed to create shortlink.');
    }
  };

  const filteredMessages = useMemo(() => {
    const query = inboxQuery.trim().toLowerCase();
    if (!query) return messages;
    return messages.filter(
      (msg) =>
        msg.name.toLowerCase().includes(query) ||
        msg.email.toLowerCase().includes(query) ||
        msg.content.toLowerCase().includes(query)
    );
  }, [messages, inboxQuery]);

  // CLEAN LOCK SCREEN
  if (!savedToken) {
    return (
      <main className="min-h-dvh bg-[#ffffff] text-[#111111] flex flex-col justify-between px-4 py-8 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 text-xs font-medium text-[#6b7280] hover:text-[#111111] transition-colors ${FOCUS_RING}`}
          >
            <ArrowLeft size={15} weight="bold" />
            <span>Back to portfolio</span>
          </Link>
        </div>

        <div className="mx-auto w-full max-w-sm rounded-2xl border border-[#e5e7eb] bg-surface-soft p-7 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <img src="/logo-static.svg" alt="" className="w-7 h-7 brightness-0 opacity-90" />
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#6b7280]">
              Protected
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-[-0.03em] text-[#111111]">
            Admin Console
          </h1>
          <p className="mt-1.5 text-sm text-[#6b7280] leading-relaxed">
            Enter your <code className="font-mono text-xs text-[#111111]">ADMIN_SECRET</code> to view link analytics and inbox messages.
          </p>

          {(authError || fetchError) && (
            <div className="mt-5 rounded-xl border border-[#fecaca] bg-[#fef2f2] p-3.5 text-xs text-[#991b1b] flex items-start gap-2.5">
              <WarningCircle size={17} weight="fill" className="shrink-0 text-[#ef4444] mt-0.5" />
              <span>{authError || fetchError}</span>
            </div>
          )}

          <form onSubmit={handleUnlock} className="mt-6 flex flex-col gap-4">
            <div>
              <label
                htmlFor="admin-secret"
                className="block text-xs font-medium text-[#374151] mb-1.5"
              >
                Admin Secret
              </label>
              <div className="relative">
                <input
                  id="admin-secret"
                  type={showToken ? 'text' : 'password'}
                  required
                  autoFocus
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="Paste ADMIN_SECRET..."
                  className="w-full rounded-xl border border-[#e5e7eb] bg-[#ffffff] pl-3.5 pr-10 py-2.5 text-sm text-[#111111] placeholder:text-[#9ca3af] focus:border-[#111111] focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowToken((prev) => !prev)}
                  aria-label={showToken ? 'Hide admin token' : 'Show admin token'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[#6b7280] hover:text-[#111111] cursor-pointer"
                >
                  {showToken ? <EyeSlash size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-4 py-2.5 text-sm font-medium text-[#ffffff] hover:bg-[#242424] disabled:opacity-60 transition-colors cursor-pointer ${FOCUS_RING}`}
            >
              {isLoading ? (
                <>
                  <SpinnerGap size={16} className="animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <LockKey size={16} weight="bold" />
                  <span>Unlock</span>
                </>
              )}
            </button>
          </form>
        </div>

        <footer className="text-center">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#898989]">
            Aditya Nugraha · Portfolio Admin Console
          </p>
        </footer>
      </main>
    );
  }

  const overallClicks = allLinks.reduce((sum, item) => sum + item.clicks, 0);
  const maxLinkClicks = allLinks.reduce((max, item) => Math.max(max, item.clicks), 0);
  const totalDeviceClicks = (analytics?.by_device ?? []).reduce((sum, item) => sum + item.clicks, 0);
  const totalRefererClicks = (analytics?.top_referers ?? []).reduce(
    (sum, item) => sum + item.clicks,
    0
  );

  return (
    <div className="min-h-dvh bg-[#ffffff] text-[#111111] flex flex-col selection:bg-[#111111]/10 selection:text-[#111111]">
      {/* Clean Sticky Header */}
      <header className="sticky top-0 z-30 border-b border-[#e5e7eb] bg-[#ffffff]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-8 h-16">
          <div className="flex items-center gap-4 min-w-0">
            <Link
              to="/"
              className={`group inline-flex items-center gap-1.5 text-xs font-medium text-[#6b7280] hover:text-[#111111] transition-colors shrink-0 ${FOCUS_RING}`}
            >
              <ArrowLeft
                size={15}
                weight="bold"
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              <span>Portfolio</span>
            </Link>

            <span aria-hidden="true" className="h-4 w-px bg-[#e5e7eb]" />

            <div className="flex items-center gap-2">
              <img src="/logo-static.svg" alt="" className="w-5 h-5 brightness-0 opacity-90" />
              <span className="text-sm font-semibold tracking-tight text-[#111111]">Admin</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void refreshDashboard(savedToken, selectedSlug)}
              disabled={isLoading}
              className={`inline-flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-[#ffffff] px-3 py-1.5 text-xs font-medium text-[#111111] hover:bg-surface-soft disabled:opacity-60 cursor-pointer transition-colors ${FOCUS_RING}`}
            >
              <ArrowsClockwise size={14} className={isLoading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={handleLockSession}
              className={`inline-flex items-center gap-1.5 rounded-lg bg-[#111111] px-3 py-1.5 text-xs font-medium text-[#ffffff] hover:bg-[#242424] cursor-pointer transition-colors ${FOCUS_RING}`}
            >
              <SignOut size={14} />
              <span>Lock</span>
            </button>
          </div>
        </div>
      </header>

      {/* Top Band: Heading, Metrics Strip & Tab Switcher */}
      <section className="px-4 sm:px-8 pt-10 pb-8 border-b border-[#e5e7eb] bg-[#ffffff]">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-[#111111]">
                Overview <span className="text-[#6b7280] font-normal">/ Console</span>
              </h1>
              <p className="mt-1.5 text-sm text-[#6b7280]">
                Shortlink click performance and portfolio contact messages.
              </p>
            </div>

            {/* Simple Segmented Tabs */}
            <div className="inline-flex self-start rounded-xl border border-[#e5e7eb] bg-surface-soft p-1">
              <button
                type="button"
                onClick={() => setActiveTab('analytics')}
                className={`rounded-lg px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'analytics'
                    ? 'bg-[#ffffff] text-[#111111] shadow-xs border border-[#e5e7eb]/70'
                    : 'text-[#6b7280] hover:text-[#111111]'
                }`}
              >
                Analytics
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('inbox')}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'inbox'
                    ? 'bg-[#ffffff] text-[#111111] shadow-xs border border-[#e5e7eb]/70'
                    : 'text-[#6b7280] hover:text-[#111111]'
                }`}
              >
                <span>Inbox</span>
                <span className="font-mono text-xs tabular-nums text-[#6b7280]">
                  {messages.length}
                </span>
              </button>
            </div>
          </div>

          {fetchError && (
            <div className="rounded-xl border border-[#fecaca] bg-[#fef2f2] p-4 text-sm text-[#991b1b] flex items-center gap-2.5">
              <WarningCircle size={18} weight="fill" className="shrink-0 text-[#ef4444]" />
              <span>{fetchError}</span>
            </div>
          )}

          {/* Calm 3-Metric Summary Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-[#e5e7eb] bg-surface-soft p-5 sm:p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#6b7280]">
                Total Clicks
              </p>
              <p className="mt-2 text-3xl font-semibold tabular-nums tracking-[-0.025em] text-[#111111]">
                {overallClicks}
              </p>
              <p className="mt-1 text-xs text-[#6b7280]">Across {allLinks.length} shortlinks</p>
            </div>

            <div className="rounded-2xl border border-[#e5e7eb] bg-surface-soft p-5 sm:p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#6b7280]">
                {selectedSlug ? `Logs (/${selectedSlug})` : 'Tracked Logs'}
              </p>
              <p className="mt-2 text-3xl font-semibold tabular-nums tracking-[-0.025em] text-[#111111]">
                {analytics?.logged_clicks ?? 0}
              </p>
              <p className="mt-1 text-xs text-[#6b7280]">With device &amp; referer source</p>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('inbox')}
              className={`text-left rounded-2xl border border-[#e5e7eb] bg-surface-soft p-5 sm:p-6 hover:border-[#d1d5db] transition-colors cursor-pointer ${FOCUS_RING}`}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#6b7280]">
                Inbox Messages
              </p>
              <p className="mt-2 text-3xl font-semibold tabular-nums tracking-[-0.025em] text-[#111111]">
                {messages.length}
              </p>
              <p className="mt-1 text-xs text-[#6b7280]">Click to view contact submissions</p>
            </button>
          </div>
        </div>
      </section>

      {/* Main Workspace Band (surface-soft) */}
      <main className="flex-1 bg-surface-soft px-4 sm:px-8 py-10">
        <div className="mx-auto max-w-6xl space-y-6">
          {activeTab === 'analytics' ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Shortlinks Card (Hairline List - No Nested Card Soup) */}
                <section className="lg:col-span-7 rounded-2xl border border-[#e5e7eb] bg-[#ffffff] p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#e5e7eb]">
                    <div>
                      <h2 className="text-base font-semibold tracking-[-0.015em] text-[#111111]">
                        Shortlinks
                      </h2>
                      <p className="text-xs text-[#6b7280] mt-0.5">
                        Click a slug to filter activity logs
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {selectedSlug && (
                        <button
                          type="button"
                          onClick={() => setSelectedSlug('')}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#e5e7eb] bg-surface-soft px-2.5 py-1.5 text-xs font-medium text-[#374151] hover:border-[#111111] hover:text-[#111111] cursor-pointer transition-colors"
                        >
                          <span>/{selectedSlug}</span>
                          <X size={12} weight="bold" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setShowNewLinkForm((v) => !v);
                          setCreateLinkError('');
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#111111] px-3 py-1.5 text-xs font-medium text-[#ffffff] hover:bg-[#242424] cursor-pointer transition-colors"
                      >
                        <Plus size={13} weight="bold" />
                        <span>{showNewLinkForm ? 'Cancel' : 'New link'}</span>
                      </button>
                    </div>
                  </div>

                  {showNewLinkForm && (
                    <form
                      onSubmit={handleCreateLink}
                      className="mt-4 rounded-xl border border-[#e5e7eb] bg-surface-soft p-4 space-y-3"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label
                            htmlFor="new-slug"
                            className="block text-xs font-medium text-[#374151] mb-1"
                          >
                            Slug
                          </label>
                          <input
                            id="new-slug"
                            type="text"
                            required
                            value={newSlug}
                            onChange={(e) => setNewSlug(e.target.value)}
                            placeholder="demo"
                            className="w-full rounded-lg border border-[#e5e7eb] bg-[#ffffff] px-3 py-2 text-xs font-mono text-[#111111] focus:border-[#111111] focus:outline-none"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="new-target"
                            className="block text-xs font-medium text-[#374151] mb-1"
                          >
                            Target URL
                          </label>
                          <input
                            id="new-target"
                            type="url"
                            required
                            value={newTargetUrl}
                            onChange={(e) => setNewTargetUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full rounded-lg border border-[#e5e7eb] bg-[#ffffff] px-3 py-2 text-xs text-[#111111] focus:border-[#111111] focus:outline-none"
                          />
                        </div>
                      </div>

                      {createLinkStatus === 'error' && createLinkError && (
                        <p className="text-xs text-[#b91c1c]">{createLinkError}</p>
                      )}

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={createLinkStatus === 'submitting'}
                          className="rounded-lg bg-[#111111] px-4 py-2 text-xs font-medium text-[#ffffff] hover:bg-[#242424] disabled:opacity-60 cursor-pointer"
                        >
                          {createLinkStatus === 'submitting' ? 'Saving...' : 'Save link'}
                        </button>
                      </div>
                    </form>
                  )}

                  <ul className="mt-2 divide-y divide-[#f3f4f6]">
                    {allLinks.map((link) => {
                      const isSelected = selectedSlug === link.slug;
                      const barPercent =
                        maxLinkClicks > 0 ? Math.round((link.clicks / maxLinkClicks) * 100) : 0;

                      return (
                        <li
                          key={link.slug}
                          className={`py-3.5 -mx-3 px-3 rounded-xl transition-colors ${
                            isSelected ? 'bg-surface-soft' : 'hover:bg-surface-soft/60'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedSlug((curr) => (curr === link.slug ? '' : link.slug))
                              }
                              className="flex-1 min-w-0 text-left cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className={`font-mono text-sm font-semibold ${
                                    isSelected
                                      ? 'text-[#111111] underline underline-offset-4'
                                      : 'text-[#111111]'
                                  }`}
                                >
                                  /{link.slug}
                                </span>
                              </div>
                              <p className="mt-0.5 truncate text-xs text-[#6b7280]">
                                {link.target_url}
                              </p>
                            </button>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="mr-1 font-mono text-sm font-semibold tabular-nums text-[#111111]">
                                {link.clicks}
                              </span>

                              <button
                                type="button"
                                onClick={() => void handleCopyShortlink(link.slug)}
                                aria-label={`Copy /to/${link.slug}`}
                                title="Copy share URL"
                                className="rounded-lg border border-[#e5e7eb] bg-[#ffffff] p-1.5 text-[#6b7280] hover:border-[#111111] hover:text-[#111111] cursor-pointer transition-colors"
                              >
                                {copiedSlug === link.slug ? (
                                  <Check size={14} weight="bold" className="text-[#10b981]" />
                                ) : (
                                  <Copy size={14} />
                                )}
                              </button>

                              <a
                                href={`/to/${link.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open /to/${link.slug}`}
                                title="Open link"
                                className="rounded-lg border border-[#e5e7eb] bg-[#ffffff] p-1.5 text-[#6b7280] hover:border-[#111111] hover:text-[#111111] transition-colors"
                              >
                                <ArrowUpRight size={14} weight="bold" />
                              </a>
                            </div>
                          </div>

                          <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-[#f3f4f6]">
                            <div
                              className="h-full rounded-full bg-[#111111] transition-all duration-300"
                              style={{ width: `${barPercent}%` }}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>

                {/* Devices & Sources Column */}
                <div className="lg:col-span-5 space-y-6">
                  <section className="rounded-2xl border border-[#e5e7eb] bg-[#ffffff] p-6">
                    <h2 className="text-base font-semibold tracking-[-0.015em] text-[#111111]">
                      Devices
                    </h2>
                    <p className="text-xs text-[#6b7280] mt-0.5 mb-5">
                      Hardware breakdown from recent clicks
                    </p>

                    {(analytics?.by_device?.length ?? 0) === 0 ? (
                      <p className="text-xs text-[#6b7280] py-6 text-center rounded-xl bg-surface-soft">
                        No device logs yet.
                      </p>
                    ) : (
                      <div className="space-y-3.5">
                        {analytics?.by_device.map((item) => {
                          const pct =
                            totalDeviceClicks > 0
                              ? Math.round((item.clicks / totalDeviceClicks) * 100)
                              : 0;
                          return (
                            <div key={item.device_type}>
                              <div className="flex items-center justify-between text-xs mb-1.5">
                                <span className="inline-flex items-center gap-2 font-medium text-[#111111]">
                                  <DeviceIcon type={item.device_type} />
                                  {item.device_type}
                                </span>
                                <span className="font-mono tabular-nums text-[#6b7280]">
                                  {item.clicks} ({pct}%)
                                </span>
                              </div>
                              <div className="h-1 w-full overflow-hidden rounded-full bg-[#f3f4f6]">
                                <div
                                  className="h-full rounded-full bg-[#111111]"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </section>

                  <section className="rounded-2xl border border-[#e5e7eb] bg-[#ffffff] p-6">
                    <h2 className="text-base font-semibold tracking-[-0.015em] text-[#111111]">
                      Traffic Sources
                    </h2>
                    <p className="text-xs text-[#6b7280] mt-0.5 mb-5">
                      Top referring domains
                    </p>

                    {(analytics?.top_referers?.length ?? 0) === 0 ? (
                      <p className="text-xs text-[#6b7280] py-6 text-center rounded-xl bg-surface-soft">
                        No referer logs yet.
                      </p>
                    ) : (
                      <div className="space-y-3.5">
                        {analytics?.top_referers.map((item) => {
                          const pct =
                            totalRefererClicks > 0
                              ? Math.round((item.clicks / totalRefererClicks) * 100)
                              : 0;
                          return (
                            <div key={item.source}>
                              <div className="flex items-center justify-between text-xs mb-1.5">
                                <span className="inline-flex items-center gap-2 font-medium text-[#111111]">
                                  <Globe size={14} className="text-[#6b7280]" />
                                  {item.source}
                                </span>
                                <span className="font-mono tabular-nums text-[#6b7280]">
                                  {item.clicks} ({pct}%)
                                </span>
                              </div>
                              <div className="h-1 w-full overflow-hidden rounded-full bg-[#f3f4f6]">
                                <div
                                  className="h-full rounded-full bg-[#111111]"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </section>
                </div>
              </div>

              {/* Recent Activity Table */}
              <section className="rounded-2xl border border-[#e5e7eb] bg-[#ffffff] p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#e5e7eb]">
                  <div>
                    <h2 className="text-base font-semibold tracking-[-0.015em] text-[#111111]">
                      Recent Activity
                    </h2>
                    <p className="text-xs text-[#6b7280] mt-0.5">
                      Latest {analytics?.recent_clicks.length ?? 0} click events
                      {selectedSlug ? ` for /${selectedSlug}` : ''}
                    </p>
                  </div>
                  {selectedSlug && (
                    <button
                      type="button"
                      onClick={() => setSelectedSlug('')}
                      className="text-xs font-medium text-[#6b7280] hover:text-[#111111] cursor-pointer"
                    >
                      Show all slugs
                    </button>
                  )}
                </div>

                {(analytics?.recent_clicks.length ?? 0) === 0 ? (
                  <p className="mt-5 rounded-xl bg-surface-soft py-8 text-center text-xs text-[#6b7280]">
                    No click logs recorded yet. Test <code className="font-mono text-[#111111]">/cv</code> and click Refresh.
                  </p>
                ) : (
                  <div className="mt-2 overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-[#e5e7eb] text-[11px] uppercase tracking-[0.06em] text-[#6b7280]">
                          <th className="py-3 pr-4 font-medium">Slug</th>
                          <th className="py-3 pr-4 font-medium">Source</th>
                          <th className="py-3 pr-4 font-medium">Device</th>
                          <th className="py-3 pr-4 font-medium">User Agent</th>
                          <th className="py-3 font-medium text-right">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f3f4f6]">
                        {analytics?.recent_clicks.map((entry) => (
                          <tr key={entry.id} className="hover:bg-surface-soft/70 transition-colors">
                            <td className="py-3 pr-4 font-mono font-semibold text-[#111111] whitespace-nowrap">
                              /{entry.slug}
                            </td>
                            <td className="py-3 pr-4 text-[#374151] whitespace-nowrap">
                              {entry.referer_source}
                            </td>
                            <td className="py-3 pr-4 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1.5 text-[#374151]">
                                <DeviceIcon type={entry.device_type} />
                                {entry.device_type}
                              </span>
                            </td>
                            <td
                              className="py-3 pr-4 text-[#6b7280] max-w-xs truncate"
                              title={entry.user_agent}
                            >
                              {entry.user_agent || '—'}
                            </td>
                            <td className="py-3 text-right font-mono tabular-nums text-[#6b7280] whitespace-nowrap">
                              {formatTimestamp(entry.clicked_at)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </>
          ) : (
            /* Contact Inbox */
            <section className="rounded-2xl border border-[#e5e7eb] bg-[#ffffff] p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e5e7eb]">
                <div>
                  <h2 className="text-base font-semibold tracking-[-0.015em] text-[#111111]">
                    Contact Inbox
                  </h2>
                  <p className="text-xs text-[#6b7280] mt-0.5">
                    Messages sent through your portfolio form
                  </p>
                </div>

                {messages.length > 0 && (
                  <div className="relative w-full sm:w-64">
                    <MagnifyingGlass
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
                    />
                    <input
                      type="search"
                      value={inboxQuery}
                      onChange={(e) => setInboxQuery(e.target.value)}
                      placeholder="Search messages..."
                      aria-label="Search contact messages"
                      className="w-full rounded-lg border border-[#e5e7eb] bg-surface-soft pl-8 pr-3 py-1.5 text-xs text-[#111111] placeholder:text-[#9ca3af] focus:border-[#111111] focus:bg-[#ffffff] focus:outline-none transition-colors"
                    />
                  </div>
                )}
              </div>

              {messages.length === 0 ? (
                <p className="mt-5 rounded-xl bg-surface-soft py-10 text-center text-xs text-[#6b7280]">
                  No messages received yet.
                </p>
              ) : filteredMessages.length === 0 ? (
                <p className="mt-5 rounded-xl bg-surface-soft py-8 text-center text-xs text-[#6b7280]">
                  No messages match &ldquo;{inboxQuery}&rdquo;.
                </p>
              ) : (
                <div className="divide-y divide-[#f3f4f6]">
                  {filteredMessages.map((msg) => (
                    <article key={msg.id} className="py-5 first:pt-4 last:pb-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h3 className="text-sm font-semibold text-[#111111]">{msg.name}</h3>
                          <a
                            href={`mailto:${msg.email}`}
                            className="inline-flex items-center gap-1 text-xs text-[#6b7280] hover:text-[#111111] underline decoration-[#e5e7eb] underline-offset-4 transition-colors"
                          >
                            <EnvelopeSimple size={13} />
                            <span>{msg.email}</span>
                          </a>
                        </div>

                        <span className="font-mono text-[11px] tabular-nums text-[#898989]">
                          {formatTimestamp(msg.created_at)}
                        </span>
                      </div>

                      <p className="mt-2.5 whitespace-pre-wrap text-sm leading-relaxed text-[#374151] max-w-3xl">
                        {msg.content}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </main>

      <footer className="border-t border-[#e5e7eb] bg-[#ffffff] px-4 sm:px-8 py-5">
        <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-2 text-[11px] uppercase tracking-[0.14em] text-[#898989]">
          <span>Aditya Nugraha · Portfolio Admin Console</span>
          <Link to="/" className="hover:text-[#111111] transition-colors">
            View Portfolio
          </Link>
        </div>
      </footer>
    </div>
  );
}
