// ==UserScript==
// @name SkysmartSolver
// @grant none
// @noframes
// @homepage https://edu.skysmart.ru
// @match https://edu.skysmart.ru
// @updateURL https://nerkchere5.github.io/edu/SkysmartSolver.user.js
// @downloadURL https://nerkchere5.github.io/edu/SkysmartSolver.user.js
// @version 2.4.6
// ==/UserScript==




(async () => {
  // let Main = await import('http://localhost/Tests/SkysmartSolver/Main/Main.js');
  let Main = await import('https://nerkchere5.github.io/edu/Main/Main.js');
  // Main.Bot.task_delays = [5000, 10000];
  Main.Bot.urls.referalLink = 'https://edu.skysmart.ru/contest/english_secondary_2021/roforuhukekitula';
  // Main.Bot.urls.referalLink = 'https://edu.skysmart.ru/contest/english_high_2021/fitulonedepazaro';
  // Main.Bot.user_class_nums = [9, 10, 11];
  Main.Bot.user_class_nums = [6, 7, 8];
  
  Main.main();
  // Main.Bot.init();
  // Main.Bot.main();
  Main.SkysmartSolver.init();
})();
