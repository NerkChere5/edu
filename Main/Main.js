import {SkysmartSolver} from '../Classes/SkysmartSolver.js';
import {SkysmartSolver_bot} from '../Classes/SkysmartSolver_bot.js';




function _on_keydown() {
  if (event.code == 'KeyU') {
    SkysmartSolver_bot.loop_allow();
  }
}


function _on_load() {
  console.log('load');
  
  SkysmartSolver_bot.loop();
}




function main() {
  window.addEventListener('keydown', _on_keydown);
  window.addEventListener('load', _on_load);
}




main();
