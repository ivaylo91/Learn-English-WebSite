-- ============================================================
-- seed_writing.sql — 25 writing exercises A1–C1
-- Run AFTER 007_writing.sql
-- ============================================================

INSERT INTO public.writing_exercises (slug, title, level, topic, prompts) VALUES

-- ── A1 ─────────────────────────────────────────────────────────────────────

('a1-verb-to-be',
 'Глаголът "to be"',
 'A1', 'Граматика',
 '[
   {"prompt": "Fill in: I ___ a student.", "answers": ["am"], "hint": "to be, 1st person singular"},
   {"prompt": "Fill in: She ___ from Bulgaria.", "answers": ["is"], "hint": "to be, 3rd person singular"},
   {"prompt": "Fill in: They ___ happy.", "answers": ["are"], "hint": "to be, plural"},
   {"prompt": "Fill in: We ___ at school.", "answers": ["are"], "hint": "to be, plural"},
   {"prompt": "Fill in: He ___ a doctor.", "answers": ["is"], "hint": "to be, 3rd person singular"},
   {"prompt": "Fill in: You ___ very kind.", "answers": ["are"], "hint": "to be, 2nd person"},
   {"prompt": "Преведи: Тя е моята учителка.", "answers": ["She is my teacher", "She is my teacher."], "hint": "Use is"}
 ]'::jsonb),

('a1-daily-verbs',
 'Ежедневни глаголи',
 'A1', 'Ежедневие',
 '[
   {"prompt": "Fill in: I ___ coffee every morning. (drink)", "answers": ["drink"], "hint": "Present Simple, 1st person"},
   {"prompt": "Fill in: She ___ to school by bus. (go)", "answers": ["goes"], "hint": "Present Simple, 3rd person singular"},
   {"prompt": "Fill in: They ___ English at school. (study)", "answers": ["study"], "hint": "Present Simple, plural"},
   {"prompt": "Fill in: He ___ football on Saturdays. (play)", "answers": ["plays"], "hint": "Present Simple, 3rd person singular"},
   {"prompt": "Преведи: Аз ям закуска в 8 часа.", "answers": ["I eat breakfast at 8", "I eat breakfast at 8 o''clock", "I have breakfast at 8"], "hint": "Use eat or have"},
   {"prompt": "Преведи: Тя работи в болница.", "answers": ["She works in a hospital"], "hint": "Use works"},
   {"prompt": "Fill in: My father ___ the dog every morning. (walk)", "answers": ["walks"], "hint": "Present Simple, 3rd person singular"}
 ]'::jsonb),

('a1-colours-adjectives',
 'Цветове и прилагателни',
 'A1', 'Речник',
 '[
   {"prompt": "Преведи: Небето е синьо.", "answers": ["The sky is blue", "The sky is blue."], "hint": "sky = небе"},
   {"prompt": "Преведи: Тревата е зелена.", "answers": ["The grass is green", "The grass is green."], "hint": "grass = трева"},
   {"prompt": "Преведи: Кучето е голямо и кафяво.", "answers": ["The dog is big and brown", "The dog is large and brown"], "hint": "big or large"},
   {"prompt": "Fill in: This apple is ___. (червена)", "answers": ["red"], "hint": "colour"},
   {"prompt": "Fill in: The classroom is very ___. (голяма)", "answers": ["big", "large"], "hint": "big or large"},
   {"prompt": "Преведи: Рокля й е нова и червена.", "answers": ["Her dress is new and red"], "hint": "Her dress"},
   {"prompt": "Fill in: My favourite colour is ___.", "answers": ["red", "blue", "green", "yellow", "black", "white", "pink", "purple", "orange", "brown", "grey"], "hint": "Any colour in English"}
 ]'::jsonb),

('a1-family-people',
 'Семейство и хора',
 'A1', 'Хора',
 '[
   {"prompt": "Преведи: Майка ми е лекар.", "answers": ["My mother is a doctor", "My mum is a doctor"], "hint": "mother or mum"},
   {"prompt": "Преведи: Имам един брат и две сестри.", "answers": ["I have one brother and two sisters"], "hint": "brother / sister"},
   {"prompt": "Fill in: My ___ (баща) is a teacher.", "answers": ["father", "dad"], "hint": "father or dad"},
   {"prompt": "Преведи: Тя е моята най-добра приятелка.", "answers": ["She is my best friend"], "hint": "best friend"},
   {"prompt": "Fill in: He is my ___. (дядо)", "answers": ["grandfather", "grandpa", "granddad"], "hint": "grandfather / grandpa"},
   {"prompt": "Преведи: Нашето семейство живее в София.", "answers": ["Our family lives in Sofia"], "hint": "Use lives — 3rd person"}
 ]'::jsonb),

('a1-numbers-prices',
 'Числа и цени',
 'A1', 'Ежедневие',
 '[
   {"prompt": "Преведи: Има пет ябълки.", "answers": ["There are five apples", "There are 5 apples"], "hint": "There are..."},
   {"prompt": "Преведи: Книгата струва десет лева.", "answers": ["The book costs ten leva", "The book costs 10 leva"], "hint": "costs"},
   {"prompt": "Fill in: I am ___ years old. (на 14 години)", "answers": ["fourteen", "14"], "hint": "Write the number in words or digits"},
   {"prompt": "Преведи: Магазинът е отворен от 9 до 6.", "answers": ["The shop is open from 9 to 6", "The store is open from 9 to 6", "The shop is open from nine to six"], "hint": "open from X to Y"},
   {"prompt": "Преведи: Купих три портокала.", "answers": ["I bought three oranges", "I bought 3 oranges"], "hint": "bought = купих"},
   {"prompt": "Fill in: It costs ___. (двадесет и пет евро)", "answers": ["twenty-five euros", "25 euros", "twenty five euros"], "hint": "25 euros"}
 ]'::jsonb),

-- ── A2 ─────────────────────────────────────────────────────────────────────

('a2-shopping',
 'Пазаруване',
 'A2', 'Ежедневие',
 '[
   {"prompt": "Fill in: How ___ does it cost?", "answers": ["much"], "hint": "How much / How many"},
   {"prompt": "Преведи: Търся синьо яке.", "answers": ["I am looking for a blue jacket", "I''m looking for a blue jacket"], "hint": "I am looking for"},
   {"prompt": "Fill in: Can I ___ it on? (try)", "answers": ["try"], "hint": "Can I try it on?"},
   {"prompt": "Преведи: Харесвам го, но е твърде скъпо.", "answers": ["I like it but it''s too expensive", "I like it, but it is too expensive"], "hint": "too expensive"},
   {"prompt": "Fill in: Do you have this in a ___ size? (по-голям)", "answers": ["bigger", "larger"], "hint": "comparative adjective"},
   {"prompt": "Преведи: Ще го взема.", "answers": ["I''ll take it", "I will take it"], "hint": "I''ll or I will"},
   {"prompt": "Fill in: I''d like to ___ this, please. (pay for)", "answers": ["pay for"], "hint": "pay for something"}
 ]'::jsonb),

('a2-past-simple',
 'Минало просто — правилни глаголи',
 'A2', 'Граматика',
 '[
   {"prompt": "Fill in: She ___ (watch) TV last night.", "answers": ["watched"], "hint": "Past Simple: watch + ed"},
   {"prompt": "Fill in: We ___ (visit) our grandparents yesterday.", "answers": ["visited"], "hint": "Past Simple: visit + ed"},
   {"prompt": "Fill in: He ___ (not / like) the film.", "answers": ["didn''t like", "did not like"], "hint": "Past Simple negative: didn''t + base form"},
   {"prompt": "Fill in: ___ you ___ (enjoy) the concert?", "answers": ["Did you enjoy"], "hint": "Past Simple question: Did + base form"},
   {"prompt": "Преведи: Вчера учих английски два часа.", "answers": ["Yesterday I studied English for two hours", "I studied English for two hours yesterday"], "hint": "studied"},
   {"prompt": "Fill in: They ___ (move) to a new house last year.", "answers": ["moved"], "hint": "Past Simple: move → moved"},
   {"prompt": "Преведи: Разговаряхме за час.", "answers": ["We talked for an hour", "We chatted for an hour"], "hint": "talked / chatted"}
 ]'::jsonb),

('a2-daily-routine',
 'Ежедневна рутина',
 'A2', 'Ежедневие',
 '[
   {"prompt": "Преведи: Ставам в 7 всяка сутрин.", "answers": ["I get up at 7 every morning", "I wake up at 7 every morning"], "hint": "get up or wake up"},
   {"prompt": "Fill in: After breakfast, I ___ (brush) my teeth.", "answers": ["brush"], "hint": "Present Simple"},
   {"prompt": "Преведи: Пристигам на работа в 9.", "answers": ["I arrive at work at 9", "I get to work at 9"], "hint": "arrive at work"},
   {"prompt": "Fill in: She usually ___ (have) lunch at one o''clock.", "answers": ["has"], "hint": "has — 3rd person singular"},
   {"prompt": "Преведи: Лягам си около 11 вечерта.", "answers": ["I go to bed at around 11", "I go to bed at about 11 at night", "I go to bed around 11 in the evening"], "hint": "go to bed"},
   {"prompt": "Fill in: On weekdays, I ___ (take) the bus to work.", "answers": ["take"], "hint": "Present Simple"},
   {"prompt": "Преведи: Четем книги преди сън.", "answers": ["We read books before bed", "We read before bed"], "hint": "before bed"}
 ]'::jsonb),

('a2-weather-descriptions',
 'Описване на времето',
 'A2', 'Природа',
 '[
   {"prompt": "Преведи: Днес е слънчево и топло.", "answers": ["It is sunny and warm today", "Today it is sunny and warm", "It''s sunny and warm today"], "hint": "It is / It''s"},
   {"prompt": "Fill in: It ___ heavily last night. (rain)", "answers": ["rained"], "hint": "Past Simple"},
   {"prompt": "Преведи: Утре ще вали сняг.", "answers": ["It will snow tomorrow", "Tomorrow it will snow"], "hint": "will snow"},
   {"prompt": "Fill in: The temperature is ___ zero. (под)", "answers": ["below"], "hint": "below zero"},
   {"prompt": "Преведи: Носи чадър — вали.", "answers": ["Take an umbrella — it''s raining", "Bring an umbrella, it is raining", "Take an umbrella, it''s raining"], "hint": "it''s raining"},
   {"prompt": "Fill in: It is very ___ today. Stay inside. (ветровито)", "answers": ["windy"], "hint": "windy"},
   {"prompt": "Преведи: Обичам слънчевото лято.", "answers": ["I love the sunny summer", "I love sunny summers"], "hint": "sunny summer"}
 ]'::jsonb),

('a2-asking-questions',
 'Задаване на въпроси',
 'A2', 'Граматика',
 '[
   {"prompt": "Постави въпрос: She lives in London. (Where...?)", "answers": ["Where does she live?"], "hint": "Where does she...?"},
   {"prompt": "Постави въпрос: He works every day. (How often...?)", "answers": ["How often does he work?"], "hint": "How often does he...?"},
   {"prompt": "Постави въпрос: They went to Paris. (Where...?)", "answers": ["Where did they go?"], "hint": "Where did they go?"},
   {"prompt": "Fill in: ___ time does the train leave? (What)", "answers": ["What"], "hint": "What time"},
   {"prompt": "Постави въпрос: She is 25 years old. (How old...?)", "answers": ["How old is she?"], "hint": "How old is she?"},
   {"prompt": "Fill in: ___ is your favourite subject?", "answers": ["What"], "hint": "What is your favourite..."},
   {"prompt": "Постави въпрос: He has two brothers. (How many...?)", "answers": ["How many brothers does he have?"], "hint": "How many brothers does he have?"}
 ]'::jsonb),

('a2-transport-directions',
 'Транспорт и посоки',
 'A2', 'Пътуване',
 '[
   {"prompt": "Преведи: Как да стигна до гарата?", "answers": ["How do I get to the station?", "How can I get to the station?"], "hint": "How do I / How can I get to"},
   {"prompt": "Fill in: Turn ___ at the traffic lights. (наляво)", "answers": ["left"], "hint": "left / right"},
   {"prompt": "Преведи: Автобусът тръгва на всеки 15 минути.", "answers": ["The bus leaves every 15 minutes", "The bus runs every 15 minutes"], "hint": "every 15 minutes"},
   {"prompt": "Fill in: The station is ___ the park. (срещу)", "answers": ["opposite", "across from"], "hint": "opposite or across from"},
   {"prompt": "Преведи: Колко време отнема с влак?", "answers": ["How long does it take by train?"], "hint": "How long does it take"},
   {"prompt": "Fill in: Go ___ the road and you''ll see it. (право напред)", "answers": ["straight ahead", "straight on"], "hint": "straight ahead"}
 ]'::jsonb),

-- ── B1 ─────────────────────────────────────────────────────────────────────

('b1-present-perfect',
 'Present Perfect',
 'B1', 'Граматика',
 '[
   {"prompt": "Fill in: I ___ never ___ sushi. (eat)", "answers": ["have never eaten"], "hint": "have/has + past participle"},
   {"prompt": "Fill in: She ___ just ___ the report. (finish)", "answers": ["has just finished"], "hint": "has just + past participle"},
   {"prompt": "Fill in: ___ you ever ___ to Japan? (be)", "answers": ["Have you ever been"], "hint": "Have + you + ever + past participle"},
   {"prompt": "Преведи: Живея тук от 5 години.", "answers": ["I have lived here for 5 years", "I have been living here for 5 years", "I''ve lived here for 5 years"], "hint": "have lived / have been living + for"},
   {"prompt": "Fill in: They ___ already ___ the film. (see)", "answers": ["have already seen"], "hint": "have + already + past participle"},
   {"prompt": "Преведи: Тя не е яла нищо от сутринта.", "answers": ["She hasn''t eaten anything since this morning", "She has not eaten anything since this morning"], "hint": "hasn''t + eaten + since"},
   {"prompt": "Fill in: How long ___ you ___ English? (study)", "answers": ["have you been studying", "have you studied"], "hint": "How long have you...?"}
 ]'::jsonb),

('b1-modal-verbs',
 'Модални глаголи',
 'B1', 'Граматика',
 '[
   {"prompt": "Fill in: You ___ see a doctor — you look terrible. (съвет)", "answers": ["should", "ought to"], "hint": "should or ought to"},
   {"prompt": "Fill in: She ___ speak three languages. (способност)", "answers": ["can"], "hint": "can — ability"},
   {"prompt": "Преведи: Не е нужно да идваш. (Not necessary)", "answers": ["You don''t have to come", "You don''t need to come"], "hint": "don''t have to / don''t need to"},
   {"prompt": "Fill in: You ___ park here — it''s illegal. (забранено)", "answers": ["mustn''t", "must not", "cannot", "can''t"], "hint": "mustn''t — it''s forbidden"},
   {"prompt": "Преведи: Може да вали утре — не съм сигурен.", "answers": ["It might rain tomorrow", "It may rain tomorrow"], "hint": "might or may"},
   {"prompt": "Fill in: ___ you help me with this, please? (учтива молба)", "answers": ["Could", "Can", "Would"], "hint": "Could / Can / Would"},
   {"prompt": "Преведи: Трябва да предам проекта до петък.", "answers": ["I have to submit the project by Friday", "I must submit the project by Friday"], "hint": "have to / must"}
 ]'::jsonb),

('b1-conditionals-1-2',
 'Условни изречения (1 и 2)',
 'B1', 'Граматика',
 '[
   {"prompt": "Fill in (First Conditional): If it ___ (rain), we ___ (stay) home.", "answers": ["rains, we will stay", "rains, we''ll stay"], "hint": "If + Present Simple, will + base form"},
   {"prompt": "Завърши изречението: If I have enough money, ___", "answers": ["I will travel the world", "I''ll buy a new phone", "I will buy a car", "I''ll travel"], "hint": "Any logical answer with will"},
   {"prompt": "Fill in (Second Conditional): If she ___ (have) more time, she ___ (learn) Italian.", "answers": ["had more time, she would learn", "had, she would learn"], "hint": "If + Past Simple, would + base form"},
   {"prompt": "Преведи: Ако бях ти, нямаше да кажа нищо.", "answers": ["If I were you, I wouldn''t say anything", "If I was you, I wouldn''t say anything"], "hint": "If I were you..."},
   {"prompt": "Fill in: If you ___ (study) hard, you ___ (pass) the exam.", "answers": ["study hard, you will pass", "study, you''ll pass"], "hint": "First Conditional"},
   {"prompt": "Преведи: Ако имах кола, щях да карам до работа.", "answers": ["If I had a car, I would drive to work"], "hint": "Second Conditional: If I had... I would"},
   {"prompt": "Fill in: ___ you come to my party if I ___ (invite) you?", "answers": ["Would you come if I invited"], "hint": "Second Conditional question"}
 ]'::jsonb),

('b1-comparatives-superlatives',
 'Сравнения',
 'B1', 'Граматика',
 '[
   {"prompt": "Fill in: She is ___ (висока) than her sister. (tall)", "answers": ["taller"], "hint": "one-syllable adj + -er"},
   {"prompt": "Fill in: This is the ___ (интересен) book I have ever read. (interesting)", "answers": ["most interesting"], "hint": "the most + adjective"},
   {"prompt": "Преведи: Лятото е по-топло от пролетта.", "answers": ["Summer is warmer than spring"], "hint": "warmer than"},
   {"prompt": "Fill in: He is the ___ student in the class. (good)", "answers": ["best"], "hint": "irregular superlative of good"},
   {"prompt": "Преведи: Колкото повече учиш, толкова по-добре говориш.", "answers": ["The more you study, the better you speak"], "hint": "The more... the more/better"},
   {"prompt": "Fill in: This car is not as ___ as that one. (expensive)", "answers": ["expensive"], "hint": "not as + adjective + as"},
   {"prompt": "Преведи: Той е най-умният човек, когото познавам.", "answers": ["He is the smartest person I know", "He is the most intelligent person I know"], "hint": "the smartest / most intelligent"}
 ]'::jsonb),

('b1-passive-voice',
 'Пасивен залог',
 'B1', 'Граматика',
 '[
   {"prompt": "Преобразувай в пасив: Someone stole my bag.", "answers": ["My bag was stolen"], "hint": "Subject + was/were + past participle"},
   {"prompt": "Fill in: The Eiffel Tower ___ (build) in 1889.", "answers": ["was built"], "hint": "was + past participle"},
   {"prompt": "Преведи: Новините ще бъдат обявени утре.", "answers": ["The news will be announced tomorrow"], "hint": "will be + past participle"},
   {"prompt": "Преобразувай в пасив: They make chocolate in Belgium.", "answers": ["Chocolate is made in Belgium"], "hint": "Chocolate is made..."},
   {"prompt": "Fill in: The letter ___ (write) by Shakespeare. (в минало)", "answers": ["was written"], "hint": "Past Simple passive"},
   {"prompt": "Преведи: Тя беше наградена за смелостта си.", "answers": ["She was awarded for her bravery", "She was rewarded for her bravery"], "hint": "was awarded/rewarded for"},
   {"prompt": "Fill in: The results ___ (announce) next week.", "answers": ["will be announced"], "hint": "will be + past participle"}
 ]'::jsonb),

('b1-work-vocabulary',
 'Работна лексика',
 'B1', 'Бизнес',
 '[
   {"prompt": "Преведи: Подавам оставка от работата си.", "answers": ["I am resigning from my job", "I''m quitting my job", "I resign from my job"], "hint": "resign or quit"},
   {"prompt": "Fill in: She got a ___ — her salary increased by 10%. (повишение)", "answers": ["promotion", "pay rise", "raise"], "hint": "promotion"},
   {"prompt": "Преведи: Имаме среща в 10 часа.", "answers": ["We have a meeting at 10", "We have a meeting at 10 o''clock"], "hint": "a meeting"},
   {"prompt": "Fill in: The ___ is next Friday. (краен срок)", "answers": ["deadline"], "hint": "deadline"},
   {"prompt": "Преведи: Изпращам ти имейл с детайлите.", "answers": ["I will send you an email with the details", "I''ll email you the details", "I''m sending you an email with the details"], "hint": "send an email / email you"},
   {"prompt": "Fill in: He works ___. (на непълно работно време)", "answers": ["part-time"], "hint": "part-time"},
   {"prompt": "Преведи: Отговорен съм за маркетинга.", "answers": ["I am responsible for marketing", "I''m in charge of marketing"], "hint": "responsible for / in charge of"}
 ]'::jsonb),

-- ── B2 ─────────────────────────────────────────────────────────────────────

('b2-third-conditional',
 'Трето условно изречение',
 'B2', 'Граматика',
 '[
   {"prompt": "Fill in (Third Conditional): If she ___ (study) harder, she ___ (pass) the exam.", "answers": ["had studied harder, she would have passed", "had studied, she would have passed"], "hint": "If + Past Perfect, would have + past participle"},
   {"prompt": "Преведи: Ако бях знаел, щях да дойда.", "answers": ["If I had known, I would have come"], "hint": "If I had known... I would have come"},
   {"prompt": "Fill in: He ___ (not / miss) the train if he ___ (leave) earlier.", "answers": ["wouldn''t have missed the train if he had left", "would not have missed if he had left"], "hint": "wouldn''t have + past participle / if + had + past participle"},
   {"prompt": "Завърши: If they had arrived on time, ___", "answers": ["they would have caught the flight", "we would have started the meeting", "everything would have been fine"], "hint": "Any logical answer with would have"},
   {"prompt": "Преведи: Тя не би направила тази грешка, ако беше по-внимателна.", "answers": ["She wouldn''t have made that mistake if she had been more careful"], "hint": "wouldn''t have made... if she had been"},
   {"prompt": "Fill in: ___ you have told me the truth if I ___ (ask)?", "answers": ["Would you have told me the truth if I had asked"], "hint": "Would you have + past participle / if I had + past participle"}
 ]'::jsonb),

('b2-reported-speech',
 'Косвена реч',
 'B2', 'Граматика',
 '[
   {"prompt": "Преобразувай: He said: ''I work in London.''", "answers": ["He said he worked in London", "He said that he worked in London"], "hint": "work → worked (backshift)"},
   {"prompt": "Преобразувай: She said: ''I am cooking dinner.''", "answers": ["She said she was cooking dinner", "She said that she was cooking dinner"], "hint": "is cooking → was cooking"},
   {"prompt": "Преобразувай: He told me: ''I will call you.''", "answers": ["He told me he would call me", "He told me that he would call me"], "hint": "will → would"},
   {"prompt": "Преобразувай: She asked: ''Do you like jazz?''", "answers": ["She asked if I liked jazz", "She asked whether I liked jazz"], "hint": "she asked if/whether + Past Simple"},
   {"prompt": "Fill in: He asked ___ I was ready. (if/whether)", "answers": ["if", "whether"], "hint": "if or whether"},
   {"prompt": "Преведи: Тя каза, че не може да дойде на срещата.", "answers": ["She said she couldn''t come to the meeting", "She said that she could not come to the meeting"], "hint": "said she couldn''t"},
   {"prompt": "Преобразувай: He said: ''I have already finished.''", "answers": ["He said he had already finished", "He said that he had already finished"], "hint": "has finished → had finished (Past Perfect)"}
 ]'::jsonb),

('b2-sentence-transformations',
 'Трансформации на изречения',
 'B2', 'Граматика',
 '[
   {"prompt": "Преобразувай с DESPITE: Although she was tired, she finished the work.", "answers": ["Despite being tired, she finished the work", "Despite her tiredness, she finished the work"], "hint": "Despite + noun/verb-ing"},
   {"prompt": "Преобразувай с SO...THAT: She was very tired. She fell asleep immediately.", "answers": ["She was so tired that she fell asleep immediately"], "hint": "She was so ... that ..."},
   {"prompt": "Fill in: He succeeded ___ many difficulties. (въпреки)", "answers": ["despite", "in spite of"], "hint": "despite or in spite of"},
   {"prompt": "Преобразувай от актив в пасив: People believe that she is innocent.", "answers": ["She is believed to be innocent", "It is believed that she is innocent"], "hint": "It is believed that... / She is believed to be..."},
   {"prompt": "Fill in: ___ is no point arguing with him.", "answers": ["There"], "hint": "There is no point..."},
   {"prompt": "Преобразувай с WISH: I don''t speak French. (I wish...)", "answers": ["I wish I spoke French"], "hint": "I wish + Past Simple"},
   {"prompt": "Fill in: Not only ___ she work hard, but she also finds time for family.", "answers": ["does"], "hint": "Inversion: Not only does she..."}
 ]'::jsonb),

('b2-academic-vocabulary',
 'Академична лексика',
 'B2', 'Речник',
 '[
   {"prompt": "Преведи: Изследването показва значителна корелация.", "answers": ["The research shows a significant correlation", "The study shows a significant correlation"], "hint": "research/study + shows + significant"},
   {"prompt": "Fill in: The ___ (последствия) of climate change are severe.", "answers": ["consequences", "effects", "impacts"], "hint": "consequences / effects"},
   {"prompt": "Преведи: Необходими са допълнителни данни, за да се потвърди хипотезата.", "answers": ["Further data is needed to confirm the hypothesis", "Additional data is required to confirm the hypothesis"], "hint": "further/additional data + to confirm"},
   {"prompt": "Fill in: The study ___ (разглежда) the effects of stress on performance.", "answers": ["examines", "investigates", "analyses", "explores"], "hint": "examines / investigates"},
   {"prompt": "Преведи: Той твърди, че резултатите са ненадеждни.", "answers": ["He argues that the results are unreliable", "He claims that the results are unreliable"], "hint": "argues/claims that"},
   {"prompt": "Fill in: This ___ (доказателство) supports the theory.", "answers": ["evidence"], "hint": "evidence"},
   {"prompt": "Преведи: Резултатите противоречат на предишните изследвания.", "answers": ["The results contradict previous research", "The findings contradict previous studies"], "hint": "contradict / conflict with"}
 ]'::jsonb),

('b2-business-communication',
 'Бизнес комуникация',
 'B2', 'Бизнес',
 '[
   {"prompt": "Преведи: Пишем Ви относно предстоящата среща.", "answers": ["We are writing to you regarding the upcoming meeting", "We are writing with regard to the upcoming meeting"], "hint": "regarding / with regard to"},
   {"prompt": "Fill in: Please find ___ the report you requested. (приложен)", "answers": ["attached"], "hint": "Please find attached"},
   {"prompt": "Преведи: Би ли ми изпратил отчета до края на деня?", "answers": ["Could you send me the report by end of day?", "Could you please send me the report by the end of the day?"], "hint": "Could you send... by end of day"},
   {"prompt": "Fill in: I would like to ___ a meeting for next Tuesday. (насрочи)", "answers": ["schedule", "arrange", "set up"], "hint": "schedule / arrange / set up"},
   {"prompt": "Преведи: Нека потвърдим детайлите по имейл.", "answers": ["Let''s confirm the details by email", "Let us confirm the details via email"], "hint": "confirm the details by/via email"},
   {"prompt": "Fill in: Thank you for your ___. (запитване)", "answers": ["enquiry", "inquiry", "email", "message"], "hint": "enquiry or inquiry"},
   {"prompt": "Преведи: Съжаляваме за неудобството.", "answers": ["We apologise for the inconvenience", "We are sorry for the inconvenience", "We apologize for the inconvenience"], "hint": "We apologise for"}
 ]'::jsonb),

-- ── C1 ─────────────────────────────────────────────────────────────────────

('c1-reformulation',
 'Преформулиране',
 'C1', 'Граматика',
 '[
   {"prompt": "Преформулирай с IT IS SAID THAT: People say he is brilliant.", "answers": ["It is said that he is brilliant", "He is said to be brilliant"], "hint": "It is said that... / He is said to be..."},
   {"prompt": "Преформулирай с HAVE SOMETHING DONE: A mechanic repaired my car.", "answers": ["I had my car repaired", "I got my car repaired"], "hint": "I had/got my car repaired"},
   {"prompt": "Fill in: ___ the bad weather, the event was a success. (въпреки)", "answers": ["Despite", "In spite of"], "hint": "Despite or In spite of"},
   {"prompt": "Преформулирай с UNLESS: If you don''t study, you will fail.", "answers": ["Unless you study, you will fail"], "hint": "Unless = if not"},
   {"prompt": "Преформулирай с NEEDN''T HAVE: It wasn''t necessary for her to stay late, but she did.", "answers": ["She needn''t have stayed late"], "hint": "needn''t have + past participle"},
   {"prompt": "Fill in: Scarcely ___ he arrived when the phone rang.", "answers": ["had"], "hint": "Inversion: Scarcely had + subject + past participle"},
   {"prompt": "Преформулирай с WERE IT NOT FOR: Without your help, I would have failed.", "answers": ["Were it not for your help, I would have failed"], "hint": "Were it not for + noun..."}
 ]'::jsonb),

('c1-register-formal-informal',
 'Формален и неформален регистър',
 'C1', 'Стил',
 '[
   {"prompt": "Формализирай: I want to know more about the job.", "answers": ["I would like to enquire about the position", "I would like further information regarding the role", "I wish to learn more about the opportunity"], "hint": "I would like to enquire / wish to learn"},
   {"prompt": "Формализирай: We''re going to talk about the budget.", "answers": ["We will discuss the budget", "We are going to address the budgetary matters"], "hint": "discuss / address"},
   {"prompt": "Fill in изречението по-формално: She told me about the ___. (problem → )", "answers": ["issue", "matter", "concern"], "hint": "issue / matter / concern"},
   {"prompt": "Формализирай: Sorry for the mess-up.", "answers": ["We apologise for the error", "We regret any inconvenience caused", "Please accept our apologies for the mistake"], "hint": "We apologise for / We regret"},
   {"prompt": "Направи неформално: I would be grateful if you could provide the necessary documentation.", "answers": ["Could you send me the documents?", "Can you send me the papers?", "Please send me the documents"], "hint": "Simplify — could you / can you"},
   {"prompt": "Fill in formally: Please ___ that your payment is due. (remind you)", "answers": ["be advised", "note"], "hint": "Please be advised / Please note"}
 ]'::jsonb),

('c1-advanced-phrases',
 'Напреднали фрази и идиоми',
 'C1', 'Речник',
 '[
   {"prompt": "Преведи: Тя е много издръжлива — не се предава лесно.", "answers": ["She is very tenacious — she doesn''t give up easily", "She is resilient and doesn''t give up easily"], "hint": "tenacious / resilient"},
   {"prompt": "Fill in: The meeting was ___ — nothing was achieved. (безплодна)", "answers": ["fruitless", "unproductive", "pointless"], "hint": "fruitless / unproductive"},
   {"prompt": "Преведи: Неговото обяснение беше изключително нееднозначно.", "answers": ["His explanation was highly ambiguous", "His explanation was extremely ambiguous"], "hint": "highly/extremely ambiguous"},
   {"prompt": "Fill in: She gave a ___ (безупречен) performance.", "answers": ["flawless", "impeccable", "faultless"], "hint": "flawless / impeccable"},
   {"prompt": "Преведи: Трябва да обмислим всички последствия.", "answers": ["We need to consider all the implications", "We must consider all the consequences"], "hint": "consider + implications / consequences"},
   {"prompt": "Fill in: His behaviour was ___ (неприемливо) under the circumstances.", "answers": ["unacceptable", "inexcusable"], "hint": "unacceptable / inexcusable"},
   {"prompt": "Преведи: Фактите говорят сами за себе си.", "answers": ["The facts speak for themselves"], "hint": "speak for themselves"}
 ]'::jsonb);
