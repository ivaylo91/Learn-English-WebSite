-- ============================================================
-- seed_vocabulary_v4.sql — ~160 words, A1–B1 practical gaps
-- New: Days, Months, Seasons, Professions, Ordinals (A1)
--      Action Verbs II, Communication, Descriptive Adj (A2)
--      Cooking, Opinions, Tourism (B1)
-- Run AFTER seed_vocabulary_v3.sql
-- ============================================================

INSERT INTO public.vocabulary_words
  (word_en, word_bg, phonetic, level, category, example_en, example_bg)
VALUES

-- ── A1 · Дни на седмицата (Days of the Week) ─────────────────────────────────
('Monday',    'понеделник', '/ˈmʌndeɪ/',     'A1', 'Дни', 'I start work on Monday.',         'Работата ми започва в понеделник.'),
('Tuesday',   'вторник',    '/ˈtjuːzdeɪ/',   'A1', 'Дни', 'We have a meeting on Tuesday.',   'Имаме среща във вторник.'),
('Wednesday', 'сряда',      '/ˈwenzdeɪ/',    'A1', 'Дни', 'Wednesday is the middle of the week.', 'Сряда е средата на седмицата.'),
('Thursday',  'четвъртък',  '/ˈθɜːrzdeɪ/',  'A1', 'Дни', 'See you on Thursday.',            'До четвъртък.'),
('Friday',    'петък',      '/ˈfraɪdeɪ/',    'A1', 'Дни', 'Friday is my favourite day.',     'Петък е любимият ми ден.'),
('Saturday',  'събота',     '/ˈsætərdeɪ/',   'A1', 'Дни', 'I sleep late on Saturday.',       'Спя до по-късно в събота.'),
('Sunday',    'неделя',     '/ˈsʌndeɪ/',     'A1', 'Дни', 'Sunday is a day of rest.',        'Неделя е ден за почивка.'),

-- ── A1 · Месеци (Months) ─────────────────────────────────────────────────────
('January',   'януари',   '/ˈdʒænjueri/',  'A1', 'Месеци', 'January is the coldest month.',   'Януари е най-студеният месец.'),
('February',  'февруари', '/ˈfebrueri/',   'A1', 'Месеци', 'My birthday is in February.',     'Рожденият ми ден е през февруари.'),
('March',     'март',     '/mɑːrtʃ/',      'A1', 'Месеци', 'Spring starts in March.',         'Пролетта започва през март.'),
('April',     'април',    '/ˈeɪprəl/',     'A1', 'Месеци', 'April brings rain.',              'Април носи дъжд.'),
('May',       'май',      '/meɪ/',         'A1', 'Месеци', 'The flowers bloom in May.',       'Цветята цъфтят през май.'),
('June',      'юни',      '/dʒuːn/',       'A1', 'Месеци', 'School ends in June.',            'Учебната година свършва в юни.'),
('July',      'юли',      '/dʒuˈlaɪ/',     'A1', 'Месеци', 'July is the hottest month.',     'Юли е най-горещият месец.'),
('August',    'август',   '/ˈɔːɡəst/',     'A1', 'Месеци', 'We go on holiday in August.',    'Ходим на почивка през август.'),
('September', 'септември','/sepˈtembər/',  'A1', 'Месеци', 'School starts in September.',    'Учебната година започва в септември.'),
('October',   'октомври', '/ɒkˈtoʊbər/',   'A1', 'Месеци', 'The leaves fall in October.',    'Листата падат през октомври.'),
('November',  'ноември',  '/noʊˈvembər/',  'A1', 'Месеци', 'November is a grey month.',      'Ноември е сив месец.'),
('December',  'декември', '/dɪˈsembər/',   'A1', 'Месеци', 'Christmas is in December.',      'Коледа е в декември.'),

-- ── A1 · Сезони (Seasons) ────────────────────────────────────────────────────
('spring', 'пролет',  '/sprɪŋ/',   'A1', 'Сезони', 'I love spring flowers.',           'Обичам пролетните цветя.'),
('summer', 'лято',    '/ˈsʌmər/',  'A1', 'Сезони', 'It is very hot in summer.',        'Лятото е много горещо.'),
('autumn', 'есен',    '/ˈɔːtəm/',  'A1', 'Сезони', 'The leaves change colour in autumn.', 'Листата сменят цвета си през есента.'),
('winter', 'зима',    '/ˈwɪntər/', 'A1', 'Сезони', 'It snows in winter.',              'През зимата вали сняг.'),

-- ── A1 · Професии (Professions) ──────────────────────────────────────────────
('nurse',        'медицинска сестра', '/nɜːrs/',         'A1', 'Професии', 'The nurse checked my blood pressure.', 'Медицинската сестра провери кръвното ми.'),
('pilot',        'пилот',             '/ˈpaɪlət/',       'A1', 'Професии', 'The pilot flew the plane.',            'Пилотът управляваше самолета.'),
('engineer',     'инженер',           '/ˌendʒɪˈnɪər/',  'A1', 'Професии', 'She is a software engineer.',          'Тя е софтуерен инженер.'),
('chef',         'готвач',            '/ʃef/',            'A1', 'Професии', 'The chef prepared a delicious meal.',  'Готвачът приготви вкусно ядене.'),
('lawyer',       'адвокат',           '/ˈlɔːjər/',       'A1', 'Професии', 'I need a good lawyer.',               'Трябва ми добър адвокат.'),
('artist',       'художник / артист', '/ˈɑːrtɪst/',      'A1', 'Професии', 'She is a talented artist.',           'Тя е талантлив художник.'),
('scientist',    'учен',              '/ˈsaɪəntɪst/',    'A1', 'Професии', 'The scientist made a discovery.',     'Ученият направи откритие.'),
('farmer',       'фермер',            '/ˈfɑːrmər/',      'A1', 'Професии', 'The farmer grows vegetables.',        'Фермерът отглежда зеленчуци.'),
('firefighter',  'пожарникар',        '/ˈfaɪərfaɪtər/', 'A1', 'Професии', 'Firefighters save lives.',             'Пожарникарите спасяват животи.'),
('dentist',      'зъболекар',         '/ˈdentɪst/',      'A1', 'Професии', 'I have an appointment with my dentist.','Имам час при зъболекаря.'),
('architect',    'архитект',          '/ˈɑːrkɪtekt/',    'A1', 'Професии', 'The architect designed the building.', 'Архитектът проектира сградата.'),
('programmer',   'програмист',        '/ˈproʊɡræmər/',  'A1', 'Професии', 'He works as a programmer.',           'Той работи като програмист.'),

-- ── A1 · Числителни редни (Ordinal Numbers) ──────────────────────────────────
('first',   'първи',     '/fɜːrst/', 'A1', 'Числа', 'She came first in the race.',     'Тя завърши първа в надбягването.'),
('second',  'втори',     '/ˈsekənd/','A1', 'Числа', 'He was second in the class.',     'Той беше втори в класа.'),
('third',   'трети',     '/θɜːrd/', 'A1', 'Числа', 'This is my third attempt.',        'Това е третият ми опит.'),
('fourth',  'четвърти',  '/fɔːrθ/', 'A1', 'Числа', 'She lives on the fourth floor.',   'Тя живее на четвъртия етаж.'),
('fifth',   'пети',      '/fɪfθ/',  'A1', 'Числа', 'Today is my fifth day here.',      'Днес е петият ми ден тук.'),
('last',    'последен',  '/lɑːst/', 'A1', 'Числа', 'This is the last bus tonight.',    'Това е последният автобус тази вечер.'),
('next',    'следващ',   '/nekst/', 'A1', 'Числа', 'The next train leaves at five.',    'Следващият влак тръгва в пет.'),

-- ── A2 · Основни глаголи II (Action Verbs II) ────────────────────────────────
('wash',       'мия',           '/wɒʃ/',      'A2', 'Глаголи', 'Wash your hands before eating.',   'Измий ръцете си преди ядене.'),
('cook',       'готвя',         '/kʊk/',      'A2', 'Глаголи', 'She cooks dinner every evening.',  'Тя готви вечеря всяка вечер.'),
('clean',      'почиствам',     '/kliːn/',    'A2', 'Глаголи', 'I clean my room on Saturdays.',    'Почиствам стаята си в събота.'),
('fix',        'поправям',      '/fɪks/',     'A2', 'Глаголи', 'Can you fix my bike?',             'Можеш ли да поправиш велосипеда ми?'),
('break',      'чупя / счупвам','/breɪk/',   'A2', 'Глаголи', 'Don''t break the glass.',           'Не чупи чашата.'),
('choose',     'избирам',       '/tʃuːz/',    'A2', 'Глаголи', 'Choose what you want to eat.',     'Избери какво искаш да ядеш.'),
('wait',       'чакам',         '/weɪt/',     'A2', 'Глаголи', 'Please wait here.',                'Моля, изчакай тук.'),
('start',      'започвам',      '/stɑːrt/',   'A2', 'Глаголи', 'The film starts at eight.',        'Филмът започва в осем.'),
('finish',     'приключвам',    '/ˈfɪnɪʃ/',  'A2', 'Глаголи', 'I finish work at six.',            'Приключвам работа в шест.'),
('try',        'опитвам се',    '/traɪ/',     'A2', 'Глаголи', 'Try this dish — it''s delicious!', 'Опитай това ястие — вкусно е!'),
('remember',   'помня',         '/rɪˈmembər/','A2','Глаголи', 'Do you remember me?',              'Помниш ли ме?'),
('forget',     'забравям',      '/fərˈɡet/',  'A2', 'Глаголи', 'Don''t forget your keys!',         'Не забравяй ключовете си!'),
('miss',       'пропускам / тъгувам','/mɪs/', 'A2','Глаголи', 'I miss my family.',                'Липсва ми семейството.'),
('catch',      'хващам',        '/kætʃ/',     'A2', 'Глаголи', 'Can you catch the ball?',          'Можеш ли да хванеш топката?'),
('join',       'присъединявам се','/dʒɔɪn/', 'A2', 'Глаголи', 'Can I join you?',                  'Мога ли да се присъединя?'),

-- ── A2 · Комуникация (Communication Verbs) ───────────────────────────────────
('call',     'обаждам се / звъня', '/kɔːl/',    'A2', 'Комуникация', 'Call me when you arrive.',           'Обади ми се, когато пристигнеш.'),
('text',     'пращам съобщение',   '/tekst/',   'A2', 'Комуникация', 'Text me the address.',               'Изпрати ми адреса с SMS.'),
('email',    'пращам имейл',       '/ˈiːmeɪl/', 'A2', 'Комуникация', 'Please email me the document.',      'Моля, изпрати ми документа по имейл.'),
('send',     'изпращам',           '/send/',    'A2', 'Комуникация', 'Send me the file, please.',           'Изпрати ми файла, моля.'),
('receive',  'получавам',          '/rɪˈsiːv/','A2', 'Комуникация', 'Did you receive my message?',         'Получи ли съобщението ми?'),
('reply',    'отговарям',          '/rɪˈplaɪ/','A2', 'Комуникация', 'Please reply as soon as possible.',   'Моля, отговори възможно най-скоро.'),
('post',     'публикувам / изпращам','/poʊst/', 'A2','Комуникация', 'She posted a photo online.',          'Тя публикува снимка онлайн.'),
('share',    'споделям',           '/ʃeər/',    'A2', 'Комуникация', 'Share the good news!',                'Сподели добрата новина!'),
('follow',   'следвам / следя',    '/ˈfɒloʊ/', 'A2', 'Комуникация', 'Follow me on social media.',          'Последвай ме в социалните мрежи.'),
('contact',  'свързвам се с',      '/ˈkɒntækt/','A2','Комуникация', 'Contact us for more information.',    'Свържете се с нас за повече информация.'),

-- ── A2 · Описателни прилагателни II (Descriptive Adjectives II) ──────────────
('clean',       'чист',              '/kliːn/',      'A2', 'Прилагателни', 'The kitchen is clean.',              'Кухнята е чиста.'),
('dirty',       'мръсен',            '/ˈdɜːrti/',    'A2', 'Прилагателни', 'Your shoes are dirty.',              'Обувките ти са мръсни.'),
('loud',        'шумен / силен',     '/laʊd/',       'A2', 'Прилагателни', 'The music is too loud.',             'Музиката е твърде силна.'),
('quiet',       'тих / спокоен',     '/ˈkwaɪət/',    'A2', 'Прилагателни', 'Please be quiet in the library.',    'Моля, бъдете тихи в библиотеката.'),
('safe',        'безопасен',         '/seɪf/',       'A2', 'Прилагателни', 'Is this area safe?',                 'Безопасен ли е този район?'),
('dangerous',   'опасен',            '/ˈdeɪndʒərəs/','A2','Прилагателни', 'That road is dangerous.',            'Тази улица е опасна.'),
('comfortable', 'удобен',            '/ˈkʌmftəbəl/', 'A2', 'Прилагателни', 'This sofa is very comfortable.',     'Този диван е много удобен.'),
('useful',      'полезен',           '/ˈjuːsfl/',    'A2', 'Прилагателни', 'A dictionary is very useful.',       'Речникът е много полезен.'),
('famous',      'известен / прочут', '/ˈfeɪməs/',    'A2', 'Прилагателни', 'Paris is famous for the Eiffel Tower.','Париж е известен с Айфеловата кула.'),
('popular',     'популярен',         '/ˈpɒpjʊlər/', 'A2', 'Прилагателни', 'This song is very popular.',         'Тази песен е много популярна.'),
('light',       'лек / светъл',      '/laɪt/',       'A2', 'Прилагателни', 'This bag is very light.',            'Тази чанта е много лека.'),
('heavy',       'тежък / обилен',    '/ˈhevi/',      'A2', 'Прилагателни', 'The suitcase is very heavy.',        'Куфарът е много тежък.'),

-- ── B1 · Готвене (Cooking) ────────────────────────────────────────────────────
('boil',   'варя',           '/bɔɪl/',   'B1', 'Готвене', 'Boil the water first.',             'Първо свари водата.'),
('fry',    'пържа',          '/fraɪ/',   'B1', 'Готвене', 'Fry the onions until golden.',      'Запържи лука до златисто.'),
('bake',   'пека (на фурна)','/beɪk/',   'B1', 'Готвене', 'Bake the cake for 40 minutes.',     'Печи тортата 40 минути.'),
('roast',  'пека (на скара/фурна)','/roʊst/','B1','Готвене','Roast the vegetables in the oven.','Изпечи зеленчуците в тавата.'),
('slice',  'нарязвам на резени','/slaɪs/','B1','Готвене', 'Slice the bread thinly.',           'Нарежи хляба на тънки резени.'),
('chop',   'нарязвам (на кубчета)','/tʃɒp/','B1','Готвене','Chop the carrots finely.',         'Нарежи морковите на ситно.'),
('stir',   'бъркам / разбърквам','/stɜːr/','B1','Готвене', 'Stir the soup gently.',           'Разбърквай супата внимателно.'),
('pour',   'наливам',         '/pɔːr/',   'B1', 'Готвене', 'Pour the milk into the bowl.',      'Налей млякото в купата.'),
('taste',  'вкусвам / опитвам','/teɪst/', 'B1','Готвене', 'Taste the sauce before serving.',   'Опитай соса преди сервиране.'),
('add',    'добавям',         '/æd/',     'B1', 'Готвене', 'Add salt to taste.',                'Добавете сол на вкус.'),
('serve',  'сервирам',        '/sɜːrv/',  'B1', 'Готвене', 'Serve the dish hot.',               'Сервирайте ястието горещо.'),
('season', 'подправям',       '/ˈsiːzən/','B1', 'Готвене', 'Season with pepper and herbs.',     'Подправете с черен пипер и билки.'),

-- ── B1 · Изказване на мнение (Expressing Opinions) ───────────────────────────
('agree',     'съгласявам се',     '/əˈɡriː/',    'B1', 'Изказване на мнение', 'I completely agree with you.',          'Напълно се съгласявам с теб.'),
('disagree',  'не съм съгласен',   '/ˌdɪsəˈɡriː/','B1','Изказване на мнение', 'I disagree with that opinion.',         'Не съм съгласен с това мнение.'),
('suppose',   'предполагам',       '/səˈpoʊz/',   'B1', 'Изказване на мнение', 'I suppose you''re right.',              'Предполагам, че си прав.'),
('reckon',    'смятам / мисля',    '/ˈrekən/',    'B1', 'Изказване на мнение', 'I reckon it''s going to rain.',          'Мисля, че ще вали.'),
('wonder',    'чудя се / питам се','/ˈwʌndər/',  'B1', 'Изказване на мнение', 'I wonder if she will come.',             'Питам се дали тя ще дойде.'),
('doubt',     'съмнявам се',       '/daʊt/',      'B1', 'Изказване на мнение', 'I doubt that it''s true.',              'Съмнявам се, че е вярно.'),
('admit',     'признавам',         '/ədˈmɪt/',    'B1', 'Изказване на мнение', 'I have to admit I was wrong.',          'Трябва да призная, че грешах.'),
('insist',    'настоявам',         '/ɪnˈsɪst/',  'B1', 'Изказване на мнение', 'She insisted on paying.',               'Тя настояваше да плати.'),
('deny',      'отричам',           '/dɪˈnaɪ/',   'B1', 'Изказване на мнение', 'He denied stealing the money.',         'Той отрече, че е откраднал парите.'),
('claim',     'твърдя / претендирам','/kleɪm/',  'B1', 'Изказване на мнение', 'She claims to be an expert.',           'Тя твърди, че е експерт.'),

-- ── B1 · Туризъм (Tourism) ────────────────────────────────────────────────────
('tourist',      'турист',           '/ˈtʊərɪst/',    'B1', 'Туризъм', 'The city is full of tourists.',          'Градът е пълен с туристи.'),
('sightseeing',  'разглеждане на забележителности',NULL,'B1','Туризъм','We went sightseeing all day.',          'Разглеждахме забележителности цял ден.'),
('souvenir',     'сувенир',          '/ˌsuːvəˈnɪər/', 'B1', 'Туризъм', 'I bought a souvenir for my family.',     'Купих сувенир за семейството си.'),
('attraction',   'атракция / забележителност','/əˈtrækʃən/','B1','Туризъм','The castle is a major attraction.', 'Замъкът е голяма атракция.'),
('guide',        'водач / пътеводител','/ɡaɪd/',     'B1', 'Туризъм', 'Our guide spoke three languages.',       'Нашият водач говореше три езика.'),
('accommodation',  'настаняване / подслон','/əˌkɒməˈdeɪʃən/','B1','Туризъм','We need to book accommodation.',  'Трябва да резервираме настаняване.'),
('landmark',     'забележителност / ориентир','/ˈlændmɑːrk/','B1','Туризъм','Big Ben is a famous landmark.', 'Биг Бен е известна забележителност.'),
('explore',      'изследвам / разглеждам','/ɪkˈsplɔːr/','B1','Туризъм', 'We explored the old town.',          'Разгледахме стария град.'),
('itinerary',    'маршрут / програма','/aɪˈtɪnəreri/','B1','Туризъм', 'Our itinerary includes three cities.', 'Маршрутът ни включва три града.'),
('cruise',       'круиз',            '/kruːz/',        'B1', 'Туризъм', 'They went on a cruise around the islands.','Те направиха круиз около островите.'),
('monument',     'паметник',         '/ˈmɒnjʊmənt/',  'B1', 'Туризъм', 'There''s a monument in the main square.', 'На главния площад има паметник.'),
('heritage',     'наследство / наследство', '/ˈherɪtɪdʒ/', 'B1','Туризъм','This is a UNESCO World Heritage site.', 'Това е обект на световното наследство на ЮНЕСКО.');
