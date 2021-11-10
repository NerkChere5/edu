import {SkysmartSolver} from './SkysmartSolver.js';




export class SkysmartSolver_bot {
  static _state = {
    loop_allowed: false,
    task_solved: false,
    user_num: 0,
  };
  
  
  static elements_selectors = {
    button_logout: 'a[href="/logout"]',
    button_next: 'edu-skysmart-button.ng-star-inserted button',
    button_registration: '.-size-s.-type-separated.tab.ng-star-inserted:first-child',
    button_run: 'edu-skysmart-button button',
    icon: '.student',
    input_class_letter: '#classLetterSelect',
    input_class_select: '.ng-select-container',
    input_class_select_option: '.ng-dropdown-panel .ng-option',
    input_email: '#email',
    input_name: '#name',
    input_password: '#password',
    input_phone: '#phone',
    input_surname: '#surname',
  };
  static urls_parts = [
    'https://edu.skysmart.ru/',
    'https://edu.skysmart.ru/contest/english_secondary_2021/roforuhukekitula',
    'https://edu.skysmart.ru/lesson/homework',
    'contest-finish',
    'https://edu.skysmart.ru/student',
  ];
  static users_classes = [5, 8];
  static users_classes_letters = 'АБВГДЕЖЗИК';
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
  
  
  static _input_setValue(input_selector, value) {
    let input = document.querySelector(input_selector);
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }
  
  
  static _random(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    
    return Math.round(rand);
  }
  
  
  static _sequence_getRandom(sequence) {
    return sequence[this._random(0, sequence.length - 1)];
  }
  
  
  static _state_restore() {
    let state_json = localStorage.getItem(this.name);
    this._state = JSON.parse(state_json) || this._state;
  }
  
  
  static _state_save() {
    let state_json = JSON.stringify(this._state);
    localStorage.setItem(this.name, state_json);
  }
  
  
  static _user_email_create() {
    return this.users_emails_names[this._state.user_num] + '@' + this._sequence_getRandom(this.users_emails_domains);
  }
  
  
  static _user_name_create() {
    return this.users_names[this._state.user_num].split(' ');
  }
  
  
  static _user_phone_create() {
    let phone_template = '+7 (900) 000-00-00';
    
    return phone_template.replace(/0/g, () => this._random(0, 9));
  }
  
  
  
  
  static async logout() {
    document.querySelector(this.elements_selectors.icon).click();
    
    await this._delay(1000);
    
    this._state.user_num++;
    this._state.loop_allowed = !!(this._state.user_num % 5);
    this._state_save();
    
    document.querySelector(this.elements_selectors.button_logout).click();
  }
  
  
  static async loop() {
    await this._delay(5000);
    
    this._state_restore();
    
    if (!this._state.loop_allowed) return;
    
    console.log('loop');
    
    if (location.href == this.urls_parts[0]) {
      location.replace(this.urls_parts[1]);
    }
    else if (location.href.startsWith(this.urls_parts[1])) {
      console.log('loop_1');
      
      this.user_registration();
    }
    else if (location.href.startsWith(this.urls_parts[2])) {
      console.log('loop_2');
      
      if (this._state.task_solved) {
        this.task_next();
      }
      else {
        this.solve();
      }
    }
    else if (location.href.includes(this.urls_parts[3])) {
      console.log('loop_3');
      
      location.replace(this.urls_parts[4]);
    }
    else if (location.href.startsWith(this.urls_parts[4])) {
      console.log('loop_4');
      
      this.logout();
    }
  }
  
  
  static loop_allowed_set(allowed) {
    this._state.loop_allowed = allowed;
    this._state_save();
    
    location.reload();
  }
  
  
  static async solve() {
    if (this._state.task_solved || !location.href.endsWith('/1')) {
      document.querySelector(this.elements_selectors.button_next).click();
      
      this._state.task_solved = false;
      this._state_save();
      
      await this._delay(5000);
    }
    
    SkysmartSolver.solve();
    
    console.log('solve_1');
    
    await this._delay(this._random(5000, 10000));
    
    console.log('solve_2');
    
    this._state.task_solved = true;
    this._state_save();
    
    location.reload();
  }
  
  
  static task_next() {
    this._state.task_solved = false;
    this._state_save();
    
    document.querySelector(this.elements_selectors.button_next).click();
  }
  
  
  static async user_registration() {
    document.querySelector(this.elements_selectors.button_registration).click();
    
    await this._delay(1000);
    
    document.querySelector(this.elements_selectors.input_class_select).dispatchEvent(new Event('mousedown'));
    
    await this._delay(1000);
    
    let class_num = this._random(this.users_classes[0], this.users_classes[1]);
    document.querySelectorAll(this.elements_selectors.input_class_select_option)[class_num - 1].click();
    
    await this._delay(1000);
    
    this._input_setValue(this.elements_selectors.input_class_letter, this._sequence_getRandom(this.users_classes_letters));
    let [user_surname, user_name] = this._user_name_create();
    this._input_setValue(this.elements_selectors.input_name, user_name);
    this._input_setValue(this.elements_selectors.input_surname, user_surname);
    this._input_setValue(this.elements_selectors.input_email, this._user_email_create());
    this._input_setValue(this.elements_selectors.input_password, '1234567890');
    this._input_setValue(this.elements_selectors.input_phone, this._user_phone_create());
    
    await this._delay(1000);
    
    document.querySelector(this.elements_selectors.button_run).click();
  }
}
