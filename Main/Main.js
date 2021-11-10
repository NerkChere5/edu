import {SkysmartSover} from '../Classes/SkysmartSover.js';
import {SkysmartSover_bot} from '../Classes/SkysmartSover_bot.js';




function _on_keydown() {
  if (event.code == 'KeyU') {
    SkysmartSover_bot.loop_allow();
  }
}


function _on_load() {
  SkysmartSover_bot.loop();
}




function main() {
  window.addEventListener('keydown', _on_keydown);
  window.addEventListener('load', _on_load);
}




main();
