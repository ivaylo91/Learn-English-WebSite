-- ============================================================
-- seed_vocabulary_v3.sql — ~120 words, B2–C1 focus
-- New categories: Formal Connectors, Idioms, Business Collocations,
-- Evaluative Language (B2); Legal/Political, Academic Verbs,
-- Nuanced Emotions, Formal Register (C1)
-- Run AFTER seed_vocabulary_v2.sql
-- ============================================================

INSERT INTO public.vocabulary_words
  (word_en, word_bg, phonetic, level, category, example_en, example_bg)
VALUES

-- ── B2 · Формални конектори (Formal Connectors) ──────────────────────────────
('furthermore',     'освен това / нещо повече', '/ˌfɜːrðəˈmɔːr/',   'B2', 'Формални конектори', 'Furthermore, the evidence supports our claim.',         'Освен това, доказателствата подкрепят твърдението ни.'),
('consequently',    'следователно',             '/ˈkɒnsɪkwəntli/',  'B2', 'Формални конектори', 'He failed to prepare; consequently, he failed.',         'Не се подготви; следователно, провали се.'),
('nevertheless',    'въпреки това',             '/ˌnevəðəˈles/',    'B2', 'Формални конектори', 'It was hard; nevertheless, she succeeded.',              'Беше трудно; въпреки това, тя успя.'),
('whereas',         'докато / за разлика от',   '/werˈæz/',          'B2', 'Формални конектори', 'He prefers tea, whereas she drinks coffee.',             'Той предпочита чай, докато тя пие кафе.'),
('albeit',          'макар и / въпреки че',     '/ɔːlˈbiːɪt/',      'B2', 'Формални конектори', 'It was a good result, albeit unexpected.',               'Беше добър резултат, макар и неочакван.'),
('therefore',       'затова / следователно',    '/ˈðerfɔːr/',        'B2', 'Формални конектори', 'The data is clear; therefore, we must act.',             'Данните са ясни; затова трябва да действаме.'),
('thus',            'по този начин / затова',   '/ðʌs/',             'B2', 'Формални конектори', 'The task was completed, thus saving time.',              'Задачата беше изпълнена, по този начин спестявайки време.'),
('in contrast',     'за разлика / за сметка на',NULL,               'B2', 'Формални конектори', 'In contrast, the second group performed better.',        'За разлика, втората група се представи по-добре.'),
('as a result',     'в резултат на',            NULL,                'B2', 'Формални конектори', 'As a result, profits increased significantly.',          'В резултат на това печалбите нараснаха значително.'),
('to sum up',       'обобщавайки',              NULL,                'B2', 'Формални конектори', 'To sum up, the project was a success.',                  'Обобщавайки, проектът беше успешен.'),

-- ── B2 · Идиоми и изрази (Idioms & Set Phrases) ──────────────────────────────
('beat around the bush', 'заобикалям / говоря намеками', NULL,      'B2', 'Идиоми', 'Stop beating around the bush and tell me.',              'Спри да заобикаляш и ми кажи.'),
('bite the bullet',      'стискам зъби',               NULL,        'B2', 'Идиоми', 'Just bite the bullet and do it.',                        'Просто стисни зъби и го направи.'),
('on the fence',         'неутрален / нерешен',         NULL,       'B2', 'Идиоми', 'She is still on the fence about the decision.',          'Тя е все още нерешена относно решението.'),
('cut corners',          'спестявам усилия / работя набързо', NULL, 'B2', 'Идиоми', 'Don''t cut corners on safety.',                          'Не спестявай усилия по отношение на безопасността.'),
('get the hang of',      'схванал съм / наловил съм',   NULL,       'B2', 'Идиоми', 'I''m starting to get the hang of it.',                   'Започвам да го схващам.'),
('read between the lines','чета между редовете',         NULL,       'B2', 'Идиоми', 'You need to read between the lines.',                    'Трябва да четеш между редовете.'),
('go out on a limb',     'рискувам',                   NULL,        'B2', 'Идиоми', 'I went out on a limb to support her.',                   'Рискувах, за да я подкрепя.'),
('come to terms with',   'примирявам се с',             NULL,       'B2', 'Идиоми', 'He came to terms with the diagnosis.',                   'Той се примири с диагнозата.'),
('turn a blind eye',     'затварям очи за',             NULL,       'B2', 'Идиоми', 'They turned a blind eye to the problem.',                'Те затваряха очи за проблема.'),
('the tip of the iceberg','върхът на айсберга',          NULL,       'B2', 'Идиоми', 'This is just the tip of the iceberg.',                   'Това е само върхът на айсберга.'),

-- ── B2 · Бизнес колокации (Business Collocations) ────────────────────────────
('streamline',      'оптимизирам / опростявам',  '/ˈstriːmlaɪn/',   'B2', 'Бизнес', 'We need to streamline our processes.',                   'Трябва да оптимизираме процесите си.'),
('outsource',       'възлагам навън / аутсорсвам','/ˌaʊtˈsɔːrs/',  'B2', 'Бизнес', 'The company decided to outsource IT.',                   'Компанията реши да аутсорсва IT.'),
('stakeholder',     'заинтересована страна',      '/ˈsteɪkhoʊldər/','B2', 'Бизнес', 'All stakeholders must be consulted.',                    'Всички заинтересовани страни трябва да бъдат консултирани.'),
('turnover',        'оборот',                     '/ˈtɜːrnoʊvər/',  'B2', 'Бизнес', 'The annual turnover reached £2 million.',                 'Годишният оборот достигна 2 милиона лири.'),
('bottom line',     'крайна печалба / ключовото нещо', NULL,        'B2', 'Бизнес', 'The bottom line is we need more sales.',                  'Ключовото е, че ни трябват повече продажби.'),
('benchmark',       'еталон / показател',         '/ˈbentʃmɑːrk/', 'B2', 'Бизнес', 'This sets a new benchmark for quality.',                  'Това поставя нов еталон за качество.'),
('viable',          'жизнеспособен / осъществим', '/ˈvaɪəbəl/',    'B2', 'Бизнес', 'Is the plan financially viable?',                        'Финансово осъществим ли е планът?'),
('overhead',        'режийни разходи',             '/ˈoʊvərhed/',   'B2', 'Бизнес', 'We need to reduce overhead costs.',                      'Трябва да намалим режийните разходи.'),
('break even',      'на нула / нула минус',        NULL,            'B2', 'Бизнес', 'We expect to break even by year two.',                   'Очакваме да стигнем нулата до втората година.'),
('foreclosure',     'запор / изземване',           '/fɔːrˈkloʊʒər/','B2','Бизнес', 'The bank threatened foreclosure.',                       'Банката заплаши с изземване.'),

-- ── B2 · Оценъчна лексика (Evaluative Language) ──────────────────────────────
('detrimental',     'вреден / пагубен',           '/ˌdetrɪˈmentəl/','B2','Оценъчна лексика', 'Smoking is detrimental to health.',             'Пушенето е вредно за здравето.'),
('substantial',     'значителен / съществен',     '/səbˈstænʃəl/', 'B2', 'Оценъчна лексика', 'There has been substantial progress.',          'Постигнат е значителен напредък.'),
('negligible',      'пренебрежимо малък',          '/ˈneɡlɪdʒɪbəl/','B2','Оценъчна лексика', 'The difference is negligible.',                'Разликата е пренебрежимо малка.'),
('contentious',     'спорен / предизвикващ спор', '/kənˈtenʃəs/',  'B2', 'Оценъчна лексика', 'The bill remains contentious.',                 'Законопроектът остава спорен.'),
('coherent',        'логичен / последователен',   '/koʊˈhɪərənt/', 'B2', 'Оценъчна лексика', 'Please give a coherent explanation.',           'Моля, дайте логично обяснение.'),
('conducive',       'благоприятен за',            '/kənˈduːsɪv/',  'B2', 'Оценъчна лексика', 'This is not conducive to learning.',            'Това не е благоприятно за учене.'),
('exemplary',       'образцов / примерен',        '/ɪɡˈzempləri/', 'B2', 'Оценъчна лексика', 'She showed exemplary behaviour.',               'Тя показа образцово поведение.'),
('plausible',       'правдоподобен / убедителен', '/ˈplɔːzɪbəl/',  'B2', 'Оценъчна лексика', 'That is a plausible explanation.',              'Това е правдоподобно обяснение.'),
('inconclusive',    'неубедителен / без резултат','/ˌɪnkənˈkluːsɪv/','B2','Оценъчна лексика','The results were inconclusive.',               'Резултатите бяха неубедителни.'),
('indispensable',   'незаменим / необходим',      '/ˌɪndɪˈspensəbəl/','B2','Оценъчна лексика','She is indispensable to the team.',            'Тя е незаменима за екипа.'),

-- ── C1 · Право и политика (Legal & Political) ────────────────────────────────
('legislation',     'законодателство / закон',    '/ˌledʒɪˈsleɪʃən/','C1','Право и политика', 'New legislation bans single-use plastics.',    'Ново законодателство забранява пластмасата за еднократна употреба.'),
('amendment',       'изменение / поправка',        '/əˈmendmənt/',   'C1', 'Право и политика', 'They proposed an amendment to the law.',       'Те предложиха поправка на закона.'),
('jurisdiction',    'юрисдикция / правомощие',    '/ˌdʒʊərɪsˈdɪkʃən/','C1','Право и политика','This falls outside our jurisdiction.',         'Това е извън нашата юрисдикция.'),
('precedent',       'прецедент',                  '/ˈpresɪdənt/',    'C1', 'Право и политика', 'This case sets a legal precedent.',            'Това дело създава правен прецедент.'),
('referendum',      'референдум',                 '/ˌrefəˈrendəm/', 'C1', 'Право и политика', 'A referendum will decide the matter.',          'Референдум ще реши въпроса.'),
('coalition',       'коалиция',                   '/ˌkoʊəˈlɪʃən/', 'C1', 'Право и политика', 'They formed a coalition government.',           'Те сформираха коалиционно правителство.'),
('incumbent',       'действащ (за политик)',       '/ɪnˈkʌmbənt/',  'C1', 'Право и политика', 'The incumbent president won the election.',     'Действащият президент спечели изборите.'),
('sanction',        'санкция',                    '/ˈsæŋkʃən/',     'C1', 'Право и политика', 'Economic sanctions were imposed.',              'Наложени бяха икономически санкции.'),
('ratify',          'ратифицирам',                '/ˈrætɪfaɪ/',     'C1', 'Право и политика', 'Parliament must ratify the treaty.',            'Парламентът трябва да ратифицира договора.'),
('veto',            'вето',                       '/ˈviːtoʊ/',      'C1', 'Право и политика', 'The president used his veto power.',            'Президентът използва правото си на вето.'),
('litigation',      'съдебен процес / дело',      '/ˌlɪtɪˈɡeɪʃən/','C1','Право и политика', 'The dispute ended in litigation.',              'Спорът завърши с съдебен процес.'),
('sovereignty',     'суверенитет',                '/ˈsɒvrɪnti/',    'C1', 'Право и политика', 'They defended their national sovereignty.',     'Те защитиха националния си суверенитет.'),
('manifesto',       'манифест / програма',        '/mæˈnɪfestoʊ/',  'C1', 'Право и политика', 'The party published its manifesto.',            'Партията публикува своята програма.'),

-- ── C1 · Академични глаголи (Academic Verbs) ──────────────────────────────────
('assert',          'твърдя / настоявам',          '/əˈsɜːrt/',     'C1', 'Академични глаголи', 'He asserts that the theory is correct.',      'Той твърди, че теорията е правилна.'),
('contend',         'твърдя / борвам се',          '/kənˈtend/',    'C1', 'Академични глаголи', 'She contends that prices will rise.',          'Тя твърди, че цените ще се покачат.'),
('substantiate',    'подкрепям с доказателства',   '/səbˈstænʃieɪt/','C1','Академични глаголи','Can you substantiate that claim?',             'Можеш ли да подкрепиш с доказателства тази претенция?'),
('refute',          'опровергавам',                '/rɪˈfjuːt/',    'C1', 'Академични глаголи', 'The study refutes earlier findings.',           'Изследването опровергава по-ранните открития.'),
('allude',          'намеквам за',                 '/əˈluːd/',      'C1', 'Академични глаголи', 'She alluded to the problem.',                  'Тя намекна за проблема.'),
('postulate',       'постулирам / предполагам',    '/ˈpɒstʃʊleɪt/', 'C1', 'Академични глаголи', 'Scientists postulate a new model.',            'Учените постулират нов модел.'),
('infer',           'правя извод / заключавам',    '/ɪnˈfɜːr/',     'C1', 'Академични глаголи', 'What can we infer from the data?',             'Какъв извод можем да направим от данните?'),
('negate',          'отричам / неутрализирам',     '/nɪˈɡeɪt/',     'C1', 'Академични глаголи', 'This negates the original argument.',          'Това отрича първоначалния аргумент.'),
('extrapolate',     'екстраполирам',               '/ɪkˈstræpəleɪt/','C1','Академични глаголи','Can we extrapolate from these results?',       'Можем ли да екстраполираме от тези резултати?'),
('expound',         'развивам / разяснявам',       '/ɪkˈspaʊnd/',   'C1', 'Академични глаголи', 'Please expound on your theory.',               'Моля, разясни теорията си.'),
('concede',         'признавам / отстъпвам',       '/kənˈsiːd/',    'C1', 'Академични глаголи', 'I concede that you have a point.',             'Признавам, че имаш право.'),
('stipulate',       'уговарям / изисквам',         '/ˈstɪpjʊleɪt/', 'C1', 'Академични глаголи', 'The contract stipulates a 30-day notice.',     'Договорът изисква 30-дневно предизвестие.'),

-- ── C1 · Нюансирани емоции (Nuanced Emotions) ────────────────────────────────
('apprehensive',    'боязлив / обезпокоен',        '/ˌæprɪˈhensɪv/','C1','Нюансирани емоции', 'She felt apprehensive about the interview.',   'Тя се чувстваше обезпокоена от интервюто.'),
('elated',          'въодушевен / радостен',       '/ɪˈleɪtɪd/',    'C1', 'Нюансирани емоции', 'He was elated by the news.',                   'Той беше въодушевен от новината.'),
('indignant',       'възмутен / негодуващ',        '/ɪnˈdɪɡnənt/',  'C1', 'Нюансирани емоции', 'She was indignant at the accusation.',          'Тя беше възмутена от обвинението.'),
('despondent',      'обезсърчен / унил',           '/dɪˈspɒndənt/', 'C1', 'Нюансирани емоции', 'He became despondent after the failure.',       'Той стана обезсърчен след провала.'),
('exhilarated',     'развълнуван / изпълнен с радост','/ɪɡˈzɪləreɪtɪd/','C1','Нюансирани емоции','She felt exhilarated after the race.',       'Тя се чувстваше развълнувана след надбягването.'),
('remorseful',      'разкаян / изпълнен с угризия','/rɪˈmɔːrsfl/',  'C1', 'Нюансирани емоции', 'He was deeply remorseful for his actions.',     'Той беше дълбоко разкаян за постъпките си.'),
('wistful',         'замислен / тъгуващ',          '/ˈwɪstfl/',     'C1', 'Нюансирани емоции', 'She gave a wistful smile.',                     'Тя се усмихна замислено.'),
('irked',           'раздразнен / ядосан',         '/ɜːrkt/',       'C1', 'Нюансирани емоции', 'He was irked by the constant interruptions.',   'Той беше раздразнен от постоянните прекъсвания.'),
('serene',          'спокоен / безметежен',        '/səˈriːn/',     'C1', 'Нюансирани емоции', 'The lake looked serene at dawn.',               'Езерото изглеждаше спокойно на разсъмване.'),
('dismayed',        'огорчен / разстроен',         '/dɪsˈmeɪd/',    'C1', 'Нюансирани емоции', 'She was dismayed by the results.',              'Тя беше огорчена от резултатите.'),

-- ── C1 · Формален регистър (Formal Register) ─────────────────────────────────
('cognizant',       'наясно с / осъзнаващ',        '/ˈkɒɡnɪzənt/',  'C1', 'Формален регистър', 'We are cognizant of the risks.',               'Наясно сме с рисковете.'),
('paramount',       'от първостепенно значение',   '/ˈpærəmaʊnt/',  'C1', 'Формален регистър', 'Safety is paramount.',                         'Безопасността е от първостепенно значение.'),
('pertain',         'отнасям се за / касая',       '/pərˈteɪn/',    'C1', 'Формален регистър', 'This pertains to all employees.',               'Това се отнася за всички служители.'),
('supersede',       'замествам / надхвърлям',      '/ˌsuːpərˈsiːd/','C1', 'Формален регистър', 'The new law supersedes the old one.',           'Новият закон замества стария.'),
('envisage',        'предвиждам / представям си',  '/ɪnˈvɪzɪdʒ/',  'C1', 'Формален регистър', 'We envisage strong growth this year.',          'Предвиждаме силен ръст тази година.'),
('epitomise',       'олицетворявам / въплъщавам',  '/ɪˈpɪtəmaɪz/', 'C1', 'Формален регистър', 'She epitomises elegance and grace.',            'Тя олицетворява елегантност и изящество.'),
('corroborate',     'потвърждавам / подкрепям',    '/kəˈrɒbəreɪt/','C1', 'Формален регистър', 'Can anyone corroborate your story?',             'Може ли някой да потвърди историята ти?'),
('mitigate',        'смекчавам / намалявам',       '/ˈmɪtɪɡeɪt/',  'C1', 'Формален регистър', 'We must mitigate the risk.',                    'Трябва да намалим риска.'),
('preclude',        'изключвам / не позволявам',   '/prɪˈkluːd/',   'C1', 'Формален регистър', 'This does not preclude further discussion.',     'Това не изключва по-нататъшна дискусия.'),
('discrepancy',     'несъответствие / разлика',    '/dɪˈskrepənsi/','C1', 'Формален регистър', 'There is a discrepancy in the data.',            'Има несъответствие в данните.');
