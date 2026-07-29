import { trackEvent, initClickTracking } from './analytics';

type Call = [string, string, Record<string, string | number | boolean>];

let calls: Call[];

beforeAll(() => {
  initClickTracking();
});

beforeEach(() => {
  calls = [];
  window.gtag = ((command: string, name: string, params: Record<string, unknown>) => {
    calls.push([command, name, params as Call[2]]);
  }) as typeof window.gtag;
  document.body.innerHTML = '';
});

/** 클릭 대상을 DOM에 붙이고 클릭한 뒤, 수집된 마지막 이벤트를 돌려준다. */
function clickAndRead(html: string, selector: string): Call | undefined {
  document.body.innerHTML = html;
  document.querySelector<HTMLElement>(selector)?.click();
  return calls[calls.length - 1];
}

describe('전화·카카오·인스타 문의 경로', () => {
  it('tel: 링크는 contact_call로 집계한다', () => {
    const event = clickAndRead('<a href="tel:02-511-6663">전화걸기</a>', 'a');

    expect(event?.[1]).toBe('contact_call');
    expect(event?.[2]).toMatchObject({
      link_url: 'tel:02-511-6663',
      link_text: '전화걸기',
      element: 'a',
    });
  });

  it('지점별 전화번호는 link_url로 구분된다', () => {
    const gangnam = clickAndRead('<a href="tel:02-511-6663">전화걸기</a>', 'a');
    const hongdae = clickAndRead('<a href="tel:02-333-8889">전화걸기</a>', 'a');

    expect(gangnam?.[2].link_url).toBe('tel:02-511-6663');
    expect(hongdae?.[2].link_url).toBe('tel:02-333-8889');
  });

  it('카카오 채널 링크는 contact_kakao로 집계한다', () => {
    const event = clickAndRead('<a href="http://pf.kakao.com/_xbAnDd">오픈채팅</a>', 'a');

    expect(event?.[1]).toBe('contact_kakao');
  });

  it('인스타그램 링크는 contact_instagram으로 집계한다', () => {
    const event = clickAndRead('<a href="https://www.instagram.com/catharsis_act">인스타</a>', 'a');

    expect(event?.[1]).toBe('contact_instagram');
  });
});

describe('일반 클릭 수집', () => {
  it('내부 링크는 ui_click으로 집계한다', () => {
    const event = clickAndRead('<a href="/passers">합격자</a>', 'a');

    expect(event?.[1]).toBe('ui_click');
    expect(event?.[2].link_url).toBe('/passers');
  });

  it('href 없는 button도 집계한다', () => {
    const event = clickAndRead('<button>등록</button>', 'button');

    expect(event?.[1]).toBe('ui_click');
    expect(event?.[2]).toMatchObject({ link_text: '등록', link_url: '', element: 'button' });
  });

  it('버튼 안쪽 요소를 클릭해도 버튼으로 귀속된다', () => {
    const event = clickAndRead('<button><span id="inner">문의</span></button>', '#inner');

    expect(event?.[2]).toMatchObject({ link_text: '문의', element: 'button' });
  });

  it('a/button 밖의 클릭은 집계하지 않는다', () => {
    clickAndRead('<div id="plain">본문</div>', '#plain');

    expect(calls).toHaveLength(0);
  });
});

describe('파라미터 정규화', () => {
  it('100자를 넘는 값은 자른다', () => {
    const event = clickAndRead(`<button>${'가'.repeat(300)}</button>`, 'button');

    expect((event?.[2].link_text as string).length).toBe(100);
  });

  it('줄바꿈과 연속 공백은 한 칸으로 합친다', () => {
    const event = clickAndRead('<button>전화\n\n  걸기</button>', 'button');

    expect(event?.[2].link_text).toBe('전화 걸기');
  });
});

describe('trackEvent', () => {
  it('gtag가 없으면 아무 일도 하지 않는다', () => {
    window.gtag = undefined;

    expect(() => trackEvent('inquiry_submit')).not.toThrow();
  });

  it('불리언·숫자 파라미터는 그대로 전달한다', () => {
    trackEvent('inquiry_submit', { is_secret: true, attempts: 2 });

    expect(calls[0]).toEqual(['event', 'inquiry_submit', { is_secret: true, attempts: 2 }]);
  });
});
