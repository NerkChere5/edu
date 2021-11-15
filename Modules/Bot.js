import {SkysmartSolver} from './SkysmartSolver/SkysmartSolver.js';




export class Bot {
  static _frame = null;
  static _state = {
    task_url: null,
    user: null,
    user_num: 56,
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
  static urls_regExps = {
    finish: /^.+?\/contest-finish\/.+?$/,
  };
  static urls = {
    main: 'https://edu.skysmart.ru',
    referalLink: 'https://edu.skysmart.ru/contest/english_secondary_2021/roforuhukekitula',
    student: 'https://edu.skysmart.ru/student',
  };
  static users_password = '1234567890';
  static users_phone_template = '+7 (900) 000-00-00';
  static users_classes_letters = 'АБВГД';
  static users_classes_nums = [7, 8];
  static users_emails_domains = ['bk.ru', 'gmail.com', 'mail.ru', 'ya.ru', 'yandex.ru'];
  static users_emails_names = [
    'anderson.sarah', 'eriberto09', 'mayer.pasquale', 'jennifer41', 'dicki.morton', 'jonathan91', 'daugherty.dee', 'mcglynn.melody', 'arvid09', 'ljacobs', 'lakin.julia', 'eweimann', 'barney.walsh', 'jjaskolski', 'kaci15', 'remington.emard', 'mann.claude', 'jast.lonny', 'devante71', 'lowe.shayne', 'cloyd81', 'akris', 'mrunte', 'vmayer', 'casey29', 'nkutch', 'ckassulke', 'deven.bogisich', 'adalberto.hayes', 'kamille.hamill', 'reva99', 'ppaucek', 'abner33', 'jacobs.crystal', 'langworth.jordy', 'waylon64', 'mertz.gail', 'jesus21', 'camryn75', 'bahringer.burdette', 'monahan.mallie', 'dhessel', 'orrin.feest', 'katlynn.hauck', 'cassidy.ward', 'mertie.block', 'ally.hettinger', 'rosenbaum.oran', 'haag.yasmeen', 'koss.justine', 'grady.tyrel', 'fdaniel', 'roel18', 'xkemmer', 'jaqueline91', 'senger.caroline', 'eileen57', 'gussie.kirlin', 'velda.bayer', 'craig.paucek', 'eloy.rau', 'charity.pfeffer', 'dena.ziemann', 'margot79', 'lamar.ledner', 'pagac.taylor', 'sfisher', 'auer.name', 'ahirthe', 'ricardo99', 'ludwig.kunde', 'zhickle', 'wilbert72', 'holden33', 'qharber', 'kaleigh41', 'hackett.deanna', 'rosemarie61', 'deshawn45', 'palma.daniel', 'ignatius.waelchi', 'fdicki', 'janessa26', 'hane.abigale', 'william.roob', 'dolores.conroy', 'kip.hamill', 'brennan.kiehn', 'vladimir.christiansen', 'sallie.von', 'hilton23', 'klangworth', 'hettinger.gabriella', 'davion.kohler', 'braxton.harris', 'hayden.paucek', 'jany.rice', 'sage99', 'jerel.dibbert', 'weber.cristopher'
  ];
  static users_names = [
    'Ильина Милана', 'Ковалева Александра', 'Алехина София', 'Сергеев Максим', 'Захарова Сафия', 'Титова Маргарита', 'Зотова Анастасия', 'Богданов Марк', 'Петров Леонид', 'Васильева Фатима', 'Коновалов Марк', 'Козырева София', 'Игнатьева Екатерина', 'Снегирева Юлия', 'Черепанова Маргарита', 'Орлова Варвара', 'Карасева Ксения', 'Матвеева Полина', 'Блохин Али', 'Овчинников Михаил', 'Морозов Даниил', 'Захарова Виктория', 'Павлов Георгий', 'Козлова Каролина', 'Захарова Кристина', 'Новиков Владимир', 'Носов Тимур', 'Карпов Тимофей', 'Борисов Даниил', 'Соколов Олег', 'Казаков Даниил', 'Нечаева Мила', 'Егоров Тимофей', 'Алексеева Вера', 'Астафьева Алия', 'Соловьева Таисия', 'Ковалева Екатерина', 'Высоцкая Ева', 'Игнатьева Марьям', 'Петрова Дарья', 'Прокофьева Анастасия', 'Королева Анна', 'Гаврилова Анастасия', 'Павлова Николь', 'Чумакова Маргарита', 'Виноградов Денис', 'Алехин Максим', 'Самойлов Николай', 'Давыдов Андрей', 'Высоцкая Ника', 'Петрова Виктория', 'Сальникова Любовь', 'Карасева Амина', 'Климова Елизавета', 'Попова Софья', 'Федорова Теона', 'Моргунова Вероника', 'Афанасьев Максим', 'Ермакова Мария', 'Леонтьев Даниил', 'Смирнов Ярослав', 'Жаров Игорь', 'Орлова Стефания', 'Спиридонова Марианна', 'Комаров Георгий', 'Молчанова Софья', 'Коновалов Денис', 'Баранов Тихон', 'Кузнецова Сабина', 'Ткачев Илья', 'Гаврилова Амелия', 'Королев Артемий', 'Леонтьев Алексей', 'Анохина София', 'Семенов Максим', 'Беляев Михаил', 'Сорокина Ева', 'Смирнов Алексей', 'Устинова Ульяна', 'Леонтьев Фёдор', 'Михайлов Михаил', 'Маслова Алина', 'Кузнецов Матвей', 'Панфилов Фёдор', 'Комарова Дарья', 'Гришин Матвей', 'Попов Михаил', 'Смирнов Всеволод', 'Смирнов Михаил', 'Краснова Александра', 'Егоров Даниил', 'Моргунова Каролина', 'Баранова Полина', 'Фролов Антон', 'Трофимова Полина', 'Павловский Георгий', 'Лебедева София', 'Левин Георгий', 'Гусева Алиса', 'Галкина Александра'
  ];
  
  
  
  
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
    SkysmartSolver.promises_create();
    this._frame_load(this._state.task_url, true);
    // this._frame_load('https://edu.skysmart.ru/lesson/homework/hasoludeluzo/7', true);
    await this._element_event(this.elements_selectors.button_next_content, 'click');
    
    while (!this.urls_regExps.finish.test(this._frame.contentWindow.location.href)) {
      console.log(this._frame.contentWindow.location.href);
      
      this._state.task_url = this._frame.contentWindow.location.href;
      this._state_save();
      
      await this._delay(5000);
      await SkysmartSolver.solve();
      console.log('Solve');
      
      await this._delay(5000);
      SkysmartSolver.promises_create();
      this._frame_load(undefined, true);
      await this._element_event(this.elements_selectors.button_next_content, 'click');
      await SkysmartSolver.promises_await();
      console.log('Reload');
      
      await this._delay(5000);
      SkysmartSolver.promises_create();
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
  
  
  static _user_create() {
    this._state.user_num++;
    let [surname, name] = this.users_names[this._state.user_num].split(' ');
    this._state.user = {
      name, surname,
      
      class_letter: this._sequence_getRandom(this.users_classes_letters),
      class_num: this._sequence_getRandom(this.users_classes_nums),
      email: this.users_emails_names[this._state.user_num] + '@' + this._sequence_getRandom(this.users_emails_domains),
      password: this.users_password,
      phone: this.users_phone_template.replace(/0/g, () => this._random(0, 9)),
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
    
    location.reload();
  }
}
