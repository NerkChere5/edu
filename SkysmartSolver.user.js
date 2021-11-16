// ==UserScript==
// @name SkysmartSolver
// @grant none
// @noframes
// @homepage https://edu.skysmart.ru
// @match https://edu.skysmart.ru
// @updateURL https://nerkchere5.github.io/edu/SkysmartSolver.user.js
// @downloadURL https://nerkchere5.github.io/edu/SkysmartSolver.user.js
// @version 1.1
// ==/UserScript==




(async () => {
  // let Main = await import('http://localhost/Tests/SkysmartSolver/Main/Main.js');
  let Main = await import('https://nerkchere5.github.io/edu/Main/Main.js');
  Main.Bot.task_delays = [5000, 5000];
  Main.Bot.urls.referalLink = 'https://edu.skysmart.ru/contest/english_high_2021/fitulonedepazaro';
  Main.Bot.user_class_nums = [9, 10, 11];
  Main.main();
})();
