/**
 * GA4 이벤트 수집.
 *
 * gtag 로드와 초기화는 public/index.html에서 처리한다. localhost에서는 config를 보내지 않으므로
 * 로컬 개발 중 이 함수를 호출해도 실제 전송은 일어나지 않는다.
 *
 * GA4가 자동으로 수집하는 항목(page_view, scroll, outbound_click, session_start)은 여기서 다시
 * 구현하지 않는다 — 같은 행동이 두 번 집계되면 방문자 수와 전환율을 신뢰할 수 없게 된다.
 */

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (command: 'event', name: string, params?: EventParams) => void;
  }
}

/** GA4 파라미터 값 상한(100자)에 맞춰 공백을 정리하고 자른다. */
const normalize = (value: string): string => value.replace(/\s+/g, ' ').trim().slice(0, 100);

/** 문자열 파라미터는 여기서 일괄 정규화하므로 호출부는 길이를 신경 쓰지 않아도 된다. */
export function trackEvent(name: string, params: EventParams = {}): void {
  if (!window.gtag) return;

  const safeParams: EventParams = {};
  Object.keys(params).forEach(key => {
    const value = params[key];
    safeParams[key] = typeof value === 'string' ? normalize(value) : value;
  });

  window.gtag('event', name, safeParams);
}

/**
 * 클릭 대상의 href로 문의 경로를 판별한다.
 * 전화·카카오 링크는 GA4의 자동 outbound click 수집 대상이 아니므로 직접 이름을 붙여야 한다.
 */
function resolveClickEvent(href: string): string {
  if (href.startsWith('tel:')) return 'contact_call';
  if (href.includes('pf.kakao.com')) return 'contact_kakao';
  if (href.includes('instagram.com')) return 'contact_instagram';
  return 'ui_click';
}

let clickTrackingReady = false;

/**
 * 문서 전체의 a/button 클릭을 위임 리스너 하나로 수집한다.
 * 컴포넌트마다 핸들러를 심지 않으므로 이후 추가되는 버튼도 자동으로 잡힌다.
 * capture 단계에서 듣기 때문에 React 핸들러가 preventDefault를 해도 유실되지 않는다.
 */
export function initClickTracking(): void {
  if (clickTrackingReady) return;
  clickTrackingReady = true;

  document.addEventListener(
    'click',
    event => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const el = target.closest('a, button');
      if (!el) return;

      const href = el.getAttribute('href') ?? '';
      trackEvent(resolveClickEvent(href), {
        link_text: el.textContent ?? '',
        link_url: href,
        element: el.tagName.toLowerCase(),
      });
    },
    { capture: true }
  );
}
