import {Solver} from './Solver.js';
import {Solver_drop} from './Solver_drop.js';
import {Solver_drop_groups} from './Solver_drop_groups.js';
import {Solver_match} from './Solver_match.js';
import {Solver_math} from './Solver_math.js';
import {Solver_select} from './Solver_select.js';
import {Solver_strike} from './Solver_strike.js';
import {Solver_test} from './Solver_test.js';
import {Solver_test_images} from './Solver_test_images.js';
import {Solver_text} from './Solver_text.js';
import {network} from '../Api/Network.js';




export class SkysmartSolver {
  static _solvers = [
    Solver_drop,
    Solver_drop_groups,
    Solver_match,
    Solver_math,
    Solver_select,
    Solver_strike,
    Solver_test,
    Solver_test_images,
    Solver_text,
  ];
  
  
  static url_answers_load = 'https://api-edu.skysmart.ru/api/v1/content/step/load';
  static url_answers_save = 'https://vimbox-store-edu.skysmart.ru/api/v1/block/save';
  static url_user_data = 'https://vimbox-store-edu.skysmart.ru/api/v1/block/get-list';
  
  
  
  
  static _on__keydown(event) {
    // if (!event.altKey) return;
    
    if (event.code == 'KeyS') {
      this.solve();
    }
    else if (event.code == 'KeyR') {
      this.solve(true);
    }
  }
  
  
  static _on__network_response(event) {
    if (event.detail.url.startsWith(this.url_answers_load)) {
      let response_data = JSON.parse(event.detail.response_body);
      Solver.template_create(response_data.content);
    }
    else if (event.detail.url.startsWith(this.url_user_data)) {
      let request_data = JSON.parse(event.detail.request_body);
      Solver.url = this.url_answers_save;
      Solver.user_authorization = event.detail.request_headers['Authorization'];
      Solver.user_id = request_data.userId;
      Solver.user_groupId = request_data.contentGroupIds[0];
    }
  }
  
  
  
  
  static init() {
    network.addEventListener('response', this._on__network_response.bind(this));
    window.addEventListener('keydown', this._on__keydown.bind(this));
  }
  
  
  static solve(reset = false) {
    for (let solver of this._solvers) {
      solver.answers_save(reset);
    }
  }
}


SkysmartSolver.init();
