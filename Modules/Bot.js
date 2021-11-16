import {SkysmartSolver} from './SkysmartSolver/SkysmartSolver.js';




export class Bot {
  static _frame = null;
  static _state = {
    task_url: null,
    user: null,
  };
  
  
  static elements_selectors = {
    button_logout: 'a[href="/logout"]',
    button_next: 'edu-skysmart-button.ng-star-inserted',
    button_next_content: 'edu-skysmart-button.ng-star-inserted button',
    button_registration: '.-size-s.-type-separated.tab.ng-star-inserted:first-child',
    button_run: 'edu-skysmart-button button',
    button_student: '.student',
    input_class_letter: '#classLetterSelect',
    input_class_select: '.ng-select-container',
    input_class_select_option: '.ng-dropdown-panel .ng-option',
    input_email: '#email',
    input_name: '#name',
    input_password: '#password',
    input_phone: '#phone',
    input_surname: '#surname',
  };
  static task_delays = [1000, 2000];
  static urls_regExps = {
    finish: /^.+?\/contest-finish\/.+?$/,
  };
  static urls = {
    main: 'https://edu.skysmart.ru',
    referalLink: 'https://edu.skysmart.ru/contest/english_secondary_2021/roforuhukekitula',
    student: 'https://edu.skysmart.ru/student',
  };
  static user_class_letters = 'АБВ';
  static user_class_nums = [9, 10, 11];
  static user_password = '1234567890';
  
  
  
  
  static _delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  
  static async _element_await(element_selector) {
    while (!this._frame.contentDocument.querySelector(element_selector)) {
      await this._delay(1000);
    }
  }
  
  
  static async _element_click(element_selector, element_index = 0) {
    await this._element_await(element_selector);
    let element = this._frame.contentDocument.querySelectorAll(element_selector);
    element[element_index].click();
  }
  
  
  static async _element_event(element_selector, event_name, element_index = 0) {
    await this._element_await(element_selector);
    let element = this._frame.contentDocument.querySelectorAll(element_selector);
    element[element_index].dispatchEvent(new Event(event_name));
  }
  
  
  static _frame_create() {
    document.body.hidden = true;
    document.body.innerHTML = '';
    document.head.innerHTML = '';
    
    this._frame = document.createElement('iframe');
    this._frame.style.border = '4px solid red';
    this._frame.style.boxSizing = 'border-box';
    this._frame.style.display = 'block';
    this._frame.style.height = '100vh';
    this._frame.style.width = '100%';
    document.documentElement.append(this._frame);
  }
  
  
  static _frame_load(url = this._frame.contentWindow.location.href, network = false) {
    this._frame.src = url;
    
    if (!network) return;
    
    this._frame.after(this._frame);
    this._frame.contentWindow.XMLHttpRequest = window.XMLHttpRequest;
    this._frame.contentWindow.fetch = window.fetch;
  }
  
  
  static _input_setValue(input_selector, value) {
    let input = this._frame.contentDocument.querySelector(input_selector);
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }
  
  
  static async _logout() {
    this._frame_load(this.urls.student);
    await this._element_click(this.elements_selectors.button_student);
    await this._element_click(this.elements_selectors.button_logout);
    console.log('Logout');
  }
  
  
  static _random(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }
  
  
  static _sequence_getRandom(sequence) {
    return sequence[this._random(0, sequence.length - 1)];
  }
  
  
  static async _solve() {
    SkysmartSolver.promises_data__create();
    this._frame_load(this._state.task_url, true);
    await this._element_event(this.elements_selectors.button_next_content, 'click');
    
    while (!this.urls_regExps.finish.test(this._frame.contentWindow.location.href)) {
      console.log(this._frame.contentWindow.location.href);
      
      this._state.task_url = this._frame.contentWindow.location.href;
      this._state_save();
      
      let delay = this._random(this.task_delays[0], this.task_delays[1]);
      await this._delay(delay);
      await SkysmartSolver.promises_data__await();
      await SkysmartSolver.solve();
      console.log('Solve');
      
      await this._delay(5000);
      SkysmartSolver.promise_progress__create();
      this._frame_load(undefined, true);
      await this._element_event(this.elements_selectors.button_next_content, 'click');
      await SkysmartSolver.promise_progress__await();
      console.log('Reload');
      
      await this._delay(5000);
      SkysmartSolver.promises_data__create();
      await this._element_click(this.elements_selectors.button_next);
      console.log('Next');
    }
    
    this._state.task_url = null;
    this._state_save();
    await this._delay(5000);
  }
  
  
  static _state_restore() {
    let state_json = localStorage.getItem(this.name);
    this._state = JSON.parse(state_json) || this._state;
  }
  
  
  static _state_save() {
    let state_json = JSON.stringify(this._state);
    localStorage.setItem(this.name, state_json);
  }
  
  
  static async _user_create() {
    let response = await fetch('https://api.randomdatatools.ru/?count=1&params=Email,FirstName,LastName,Phone');
    let user_data = await response.json();
    
    this._state.user = {
      class_letter: this._sequence_getRandom(this.user_class_letters),
      class_num: this._sequence_getRandom(this.user_class_nums),
      email: user_data.Email,
      name: user_data.FirstName,
      password: this.user_password,
      phone: user_data.Phone,
      surname: user_data.LastName,
    };
  }
  
  
  static async _user_registration() {
    this._user_create();
    
    this._frame_load(this.urls.referalLink);
    await this._element_click(this.elements_selectors.button_registration);
    
    await this._element_event(this.elements_selectors.input_class_select, 'mousedown');
    await this._element_click(this.elements_selectors.input_class_select_option, this._state.user.class_num - 1);
    
    this._input_setValue(this.elements_selectors.input_class_letter, this._state.user.class_letter);
    this._input_setValue(this.elements_selectors.input_name, this._state.user.name);
    this._input_setValue(this.elements_selectors.input_surname, this._state.user.surname);
    this._input_setValue(this.elements_selectors.input_email, this._state.user.email);
    this._input_setValue(this.elements_selectors.input_password, this._state.user.password);
    this._input_setValue(this.elements_selectors.input_phone, this._state.user.phone);
    
    await this._delay(5000);
    await this._element_click(this.elements_selectors.button_run);
    await this._element_event(this.elements_selectors.button_next_content, 'click');
    
    this._state.task_url = this._frame.contentWindow.location.href;
    this._state_save();
  }
  
  
  
  
  static init() {
    SkysmartSolver.init();
    this._frame_create();
    this._state_restore();
  }
  
  
  static async main() {
    if (!this._state.task_url) {
      await this._user_registration();
    }
    
    await this._solve();
    await this._logout();
    
    // location.reload();
  }
}
