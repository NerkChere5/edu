import {Bot} from '../Modules/Bot.js';
import {SkysmartSolver} from '../Modules/SkysmartSolver/SkysmartSolver.js';




function _on_keydown() {
  if (event.code == 'KeyB') {
    Bot.main();
  }
  else if (event.code == 'KeyS') {
    SkysmartSolver.solve(event.altKey);
  }
}




function main() {
  window.addEventListener('keydown', _on_keydown);
  
  Bot.init();
  Bot.main();
  // SkysmartSolver.init();
}




main();
