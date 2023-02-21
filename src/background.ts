function changeOpacity(opacity: number) {
  const selectors = [
    'html>body>div:nth-of-type(2)>div>div>div:nth-of-type(2)>div:nth-of-type(2)>div>div>div>:nth-child(2)>div>:nth-child(2)>div>:nth-child(3)>div>div>:nth-child(2)>div>div>span>span',
    'html>body>div:nth-of-type(2)>div>div>div:nth-of-type(2)>div:nth-of-type(2)>div>div>div>:nth-child(2)>div>:nth-child(2)>div>:nth-child(3)>div>div>:nth-child(2)>div>:nth-child(1)',
    'html>body>div:nth-of-type(2)>div>div>div:nth-of-type(2)>div:nth-of-type(2)>div>div>div>div>:nth-child(2)>:nth-child(3)>:nth-child(2)>div>div>div>div>div>span>span',
    // 'html>body>div:nth-of-type(2)>div>div>div:nth-of-type(2)>div:nth-of-type(2)>div>div>div>:nth-child(2)>div>:nth-child(2)>div>:nth-child(n+3)>div>:nth-child(n+2)>div>div>span>svg',
  ];

  const classes = selectors.map(selector => {
    const element = document.querySelectorAll(selector)[0];
    return element?.className?.split(' ')[0];
  });

  console.log('[Clear Calendar] Calendar event classes: ', classes);

  let styleSheet = document.getElementById('clear-calendar-style');

  if (!styleSheet) {
    styleSheet = document.createElement('style');
    styleSheet.setAttribute('id', 'clear-calendar-style');
    document.head.appendChild(styleSheet);
  }

  styleSheet.innerHTML = `${classes
    .map(name => `.${name}`)
    .join(',')} {opacity: ${opacity} !important;}`;
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: 'OFF',
  });
});

chrome.action.onClicked.addListener(async tab => {
  const nextBadgeText =
    (await chrome.action.getBadgeText({tabId: tab.id})) === 'ON' ? 'OFF' : 'ON';

  await chrome.action.setBadgeText({
    text: nextBadgeText,
  });

  await chrome.scripting.executeScript({
    target: {tabId: tab.id as number},
    func: changeOpacity,
    args: [nextBadgeText === 'ON' ? 0 : 1],
  });
});
