import {SkysmartSolver} from '../Classes/SkysmartSolver.js';
import {SkysmartSolver_bot} from '../Classes/SkysmartSolver_bot.js';




function _on_keydown() {
  if (event.code == 'KeyL') {
    SkysmartSolver_bot.loop_allowed_set(!event.altKey);
  }
}


// function _on_load() {
//   console.log('load');
  
//   SkysmartSolver_bot.loop();
// }




function main() {
  window.addEventListener('keydown', _on_keydown);
  // window.addEventListener('load', _on_load);
  
  console.log('main');
  
  SkysmartSolver_bot.loop();
}




main();
