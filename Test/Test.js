import {Solver} from '../Modules/SkysmartSolver/Modules/Solver.js';
import {Solver_drop} from '../Modules/SkysmartSolver/Modules/Solver_drop.js';
import {Solver_drop_groups} from '../Modules/SkysmartSolver/Modules/Solver_drop_groups.js';
import {Solver_match} from '../Modules/SkysmartSolver/Modules/Solver_match.js';
import {Solver_math} from '../Modules/SkysmartSolver/Modules/Solver_math.js';
import {Solver_select} from '../Modules/SkysmartSolver/Modules/Solver_select.js';
import {Solver_strike} from '../Modules/SkysmartSolver/Modules/Solver_strike.js';
import {Solver_test} from '../Modules/SkysmartSolver/Modules/Solver_test.js';
import {Solver_test_images} from '../Modules/SkysmartSolver/Modules/Solver_test_images.js';
import {Solver_text} from '../Modules/SkysmartSolver/Modules/Solver_text.js';




let _solvers = [
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
let _task_step_id_postfix = '';
// let _task_steps_answers = [];
let _task_steps_answers_raw = [];
let _task_steps_ids = [];
let _task_steps_uuids = [];
let _user_id = '';
let _user_token = '';


let task_hash = 'nemuvobenaxa';
let url_get__task_data = 'https://api-edu.skysmart.ru/api/v1/lesson/join';
let url_get__task_step = 'https://api-edu.skysmart.ru/api/v1/content/step/load';
let url_get__user_token = 'https://api-edu.skysmart.ru/api/v1/auth/auth';
// let url_get__user_token = 'https://api-edu.skysmart.ru/api/v1/auth/registration/student';
let url_save__progress = 'https://api-edu.skysmart.ru/api/v1/user/progress/save';
let url_save__task_answers = 'https://vimbox-store-edu.skysmart.ru/api/v1/block/save';




async function _task_answers__save() {
  Solver.url = url_save__task_answers;
  Solver.user_authorization = 'Bearer ' + _user_token;
  Solver.user_id = _user_id;
  
  for (let i = 0; i < _task_steps_ids.length; i++) {
    Solver.user_groupId = _task_steps_ids[i] + _task_step_id_postfix;
    Solver.template_create(_task_steps_answers_raw[i]);
    
    // for (let solver of _solvers) {
    //   await solver.answers_save();
    // }
    
    await fetch(
      url_save__progress,
      {
        body: JSON.stringify({
          // completeness: 0,
          progressId: _task_steps_uuids[i],
          progressType: 'step',
          roomHash: task_hash,
          score: 30,
          userId: _user_id,
        }),
        headers: {'Authorization': `Bearer ${_user_token}`},
        method: 'post',
      }
    );
  }
}


async function _task_data__define() {
  let response = await fetch(
    url_get__task_data,
    {
      body: JSON.stringify({roomHash: task_hash}),
      headers: {'Authorization': `Bearer ${_user_token}`},
      method: 'post',
    },
  );
  let data = await response.json();
  _task_step_id_postfix = data.taskStudentMeta.variantId;
  _task_steps_uuids = data.taskStudentMeta.steps.map((item) => item.stepUuid);
  _user_id = data.contentRevisionId;
}


async function _task_steps__define() {
  let dataSet_promises = [];
  
  for (let uuid of _task_steps_uuids) {
    let fetch_promise = fetch(
      `${url_get__task_step}?stepUuid=${uuid}`,
      {
        headers: {'Authorization': `Bearer ${_user_token}`},
      },
    );
    let data_promise = fetch_promise.then((response) => response.json());
    dataSet_promises.push(data_promise);
  }
  
  let dataSet = await Promise.all(dataSet_promises);
  _task_steps_answers_raw = dataSet.map((data) => data.content);
  _task_steps_ids = dataSet.map((data) => data.stepRevId);
}


async function _user_token__define() {
  // let response = await fetch('https://api-edu.skysmart.ru/api/v1/auth/registration/student', {method: 'post'});
  let response = await fetch(
    url_get__user_token,
    {
      body: JSON.stringify({
        email: 'r0man.r0man0v.92@yandex.ru',
        password: 's7Bgm5j5wns2iRg',
      }),
      method: 'post',
    }
  );
  let data = await response.json();
  _user_token = data.jwtToken;
  
  
  // _user_token = JSON.parse(localStorage['edu-token-collection'])[37340355].token;
  // _user_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MzcxNTYzMDUsImV4cCI6MTYzOTc0ODMwNSwicm9sZXMiOlsiUk9MRV9FRFVfU0tZU01BUlRfU1RVREVOVF9VU0FHRSJdLCJ1c2VySWQiOjM3MzQwMzU1LCJlbWFpbCI6Implbm5pZmVyNDFAbWFpbC5ydSIsIm5hbWUiOiLQnNCw0LrRgdC40LwiLCJzdXJuYW1lIjoi0KHQtdGA0LPQtdC10LIiLCJpZGVudGl0eSI6ImJlcmVsdXJvbWEifQ.Xjt_QC5o266EWolq_kaYBWW2OJEsuBP2aqQYiuUb1E6-o8OkqYP6eLX37caie8txalSQqOLStP2pEisU9hiIiwMAb4IA9M27npl8eLyuTOM18DCTFdYvogUrIrNmUNPL-7LfW621Z0eSVfUNE3ugdwiCB_3tt61DrbVHymGh3LgFcyDSmvViAZm-meE9Y86f-pJDoJOsuFsm4bqgl-RFWa0vjrXyKem2OF1P-Im5TyK8eq2fV68gF3jS6YZWv4cFMUJzlhQHMHdfqp8LBK7ncOli4DrCT4LxpmWOWVbVqmAIC_lNiQci9GkYrAkRzYAfYggvr-8iza_ev0s3mTFVwT-3aUtO6B7lAQUr5hqpp0O2EmbECKZtA0jaRqqVXQuqcyZPV8FGQgy5KPUl9P7UDjHGsw8lXlf7o9gzDsS-erNJlnjwE1q3nkR91yOPyi69MH-RRkN5UYM_wcNmXk2FH2uLp8Smd-BJ3NGKJtGRuwuc_igT8ukv-X4pPC66I9XHgSIKdu_s4KU6yDNoFC75_ABArNSApvHoNtTs5wyY_MB4c9UTNNzfYm0RaTm7pCKECJIy5zL2mKSc67TTukK3-xgcM6xgpMyHu6B2Bk20tA75P0FF-adHJ4usNyjVqzG3Y3SB5AlqXpopnKw3DimK9t5YbluLPIc06qVHGtaeBz8';
}




async function main() {
  await _user_token__define();
  await _task_data__define();
  await _task_steps__define();
  
  _task_answers__save();
}




main();
