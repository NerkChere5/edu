import {Solver} from './Modules/Solver.js';
import {Solver_drop} from './Modules/Solver_drop.js';
import {Solver_drop_groups} from './Modules/Solver_drop_groups.js';
import {Solver_match} from './Modules/Solver_match.js';
import {Solver_math} from './Modules/Solver_math.js';
import {Solver_select} from './Modules/Solver_select.js';
import {Solver_strike} from './Modules/Solver_strike.js';
import {Solver_test} from './Modules/Solver_test.js';
import {Solver_test_images} from './Modules/Solver_test_images.js';
import {Solver_text} from './Modules/Solver_text.js';
import {network} from '../../Api/Network.js';




export class SkysmartSolver {
  static _promise_answers = null;
  static _promise_answers__resolve = null;
  static _promise_progress = null;
  static _promise_progress__resolve = null;
  static _promise_user_data = null;
  static _promise_user_data__resolve = null;
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
  static url_progress_save = 'https://api-edu.skysmart.ru/api/v1/user/progress/save';
  static url_user_data = 'https://vimbox-store-edu.skysmart.ru/api/v1/block/get-list';
  
  
  
  
  static _on__network_response(event) {
    if (event.detail.url.startsWith(this.url_answers_load)) {
      let response_data = JSON.parse(event.detail.response_body);
      Solver.template_create(response_data.content);
      
      this._promise_answers__resolve?.();
    }
    else if (event.detail.url.startsWith(this.url_progress_save)) {
      this._promise_progress__resolve?.();
    }
    else if (event.detail.url.startsWith(this.url_user_data)) {
      let request_data = JSON.parse(event.detail.request_body);
      Solver.url = this.url_answers_save;
      Solver.user_authorization = event.detail.request_headers['Authorization'];
      Solver.user_id = request_data.userId;
      Solver.user_groupId = request_data.contentGroupIds[0];
      
      this._promise_user_data__resolve?.();
    }
  }
  
  
  
  
  static init() {
    network.addEventListener('response', this._on__network_response.bind(this));
  }
  
  
  static async promises_data__await() {
    await Promise.all([this._promise_answers, this._promise_user_data]);
  }
  
  
  static promises_data__create() {
    this._promise_answers = new Promise((resolve) => this._promise_answers__resolve = resolve);
    this._promise_user_data = new Promise((resolve) => this._promise_user_data__resolve = resolve);
  }
  
  
  static async promise_progress__await() {
    await this._promise_progress;
  }
  
  
  static promise_progress__create() {
    this._promise_progress = new Promise((resolve) => this._promise_progress__resolve = resolve);
  }
  
  
  static async solve(reset = false) {
    await this.promises_data__await();
    
    for (let solver of this._solvers) {
      await solver.answers_save(reset);
    }
  }
}
