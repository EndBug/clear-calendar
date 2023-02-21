let ruleIndex: number;

function changeOpacity(opacity: number) {
  const className = document.querySelector(
    'html>body>:nth-child(3)>div>div>:nth-child(4)>:nth-child(2)>div>div>div>:nth-child(2)>div>:nth-child(2)>div>:nth-child(3)>div>div>:nth-child(2)>div>div>span>span'
  )?.className;

  if (className) {
    if (ruleIndex !== undefined) document.styleSheets[0].deleteRule(ruleIndex);

    ruleIndex = document.styleSheets[0].insertRule(
      `.${className} { opacity: ${opacity} !important; }`,
      0
    );
  }
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
    func: () => changeOpacity(nextBadgeText === 'ON' ? 0 : 1),
  });
});
