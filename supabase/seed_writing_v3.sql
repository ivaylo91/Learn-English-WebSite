-- ============================================================
-- seed_writing_v3.sql — 10 A1/A2 exercises for beginners
-- A1 (4): word order, negatives, yes/no questions, have got
-- A2 (6): irregular past, comparatives, there is/are,
--         frequency adverbs, going to, present continuous
-- Run AFTER seed_writing_v2.sql
-- ============================================================

INSERT INTO public.writing_exercises (slug, title, level, topic, prompts) VALUES

-- ── A1 ─────────────────────────────────────────────────────────────────────

('a1-word-order',
 'Ред на думите в изречението',
 'A1', 'Граматика',
 '[
   {"prompt": "Наредете думите: [every / coffee / morning / I / drink]", "answers": ["I drink coffee every morning"], "hint": "Subject + verb + object + time"},
   {"prompt": "Наредете думите: [school / to / They / go / bus / by]", "answers": ["They go to school by bus"], "hint": "Subject + verb + place + how"},
   {"prompt": "Наредете думите: [lives / in / She / Sofia]", "answers": ["She lives in Sofia"], "hint": "Subject + verb + place"},
   {"prompt": "Наредете думите: [very / My / is / sister / tall]", "answers": ["My sister is very tall"], "hint": "Subject + is + adjective"},
   {"prompt": "Наредете думите: [a / reads / He / night / every / book]", "answers": ["He reads a book every night"], "hint": "Subject + verb + object + time"},
   {"prompt": "Наредете думите: [the / opens / park / at / eight]", "answers": ["The park opens at eight"], "hint": "Subject + verb + time"}
 ]'::jsonb),

('a1-negatives-basic',
 'Отрицания с don''t / isn''t / can''t',
 'A1', 'Граматика',
 '[
   {"prompt": "Направи отрицание: She is happy.", "answers": ["She is not happy", "She isn''t happy"], "hint": "is → is not / isn''t"},
   {"prompt": "Направи отрицание: I like fish.", "answers": ["I do not like fish", "I don''t like fish"], "hint": "Use don''t before the main verb"},
   {"prompt": "Направи отрицание: He can swim.", "answers": ["He cannot swim", "He can''t swim"], "hint": "can → cannot / can''t"},
   {"prompt": "Направи отрицание: They have a car.", "answers": ["They do not have a car", "They don''t have a car"], "hint": "Use don''t for I/you/we/they"},
   {"prompt": "Направи отрицание: She works on Sundays.", "answers": ["She does not work on Sundays", "She doesn''t work on Sundays"], "hint": "Use doesn''t for he/she/it"},
   {"prompt": "Направи отрицание: The film is interesting.", "answers": ["The film is not interesting", "The film isn''t interesting"], "hint": "is → isn''t"},
   {"prompt": "Направи отрицание: We understand the question.", "answers": ["We do not understand the question", "We don''t understand the question"], "hint": "we → don''t"}
 ]'::jsonb),

('a1-yes-no-questions',
 'Да/не въпроси',
 'A1', 'Граматика',
 '[
   {"prompt": "Постави въпрос: She is a doctor. (Is...?)", "answers": ["Is she a doctor?"], "hint": "Move ''is'' to the front: Is she...?"},
   {"prompt": "Постави въпрос: You like coffee. (Do...?)", "answers": ["Do you like coffee?"], "hint": "Use Do for I/you/we/they"},
   {"prompt": "Постави въпрос: He plays football. (Does...?)", "answers": ["Does he play football?"], "hint": "Use Does for he/she/it — base form of verb"},
   {"prompt": "Постави въпрос: They can speak French. (Can...?)", "answers": ["Can they speak French?"], "hint": "Move ''can'' to the front"},
   {"prompt": "Постави въпрос: The library is open. (Is...?)", "answers": ["Is the library open?"], "hint": "Move ''is'' to the front"},
   {"prompt": "Постави въпрос: She has a sister. (Does...?)", "answers": ["Does she have a sister?"], "hint": "Does she have... (not ''has'')"},
   {"prompt": "Постави въпрос: You are tired. (Are...?)", "answers": ["Are you tired?"], "hint": "Move ''are'' to the front"}
 ]'::jsonb),

('a1-have-got',
 'Have got / Has got',
 'A1', 'Граматика',
 '[
   {"prompt": "Fill in: I ___ a new phone. (have got)", "answers": ["have got", "''ve got"], "hint": "I have got / I''ve got"},
   {"prompt": "Fill in: She ___ two brothers. (has got)", "answers": ["has got", "''s got"], "hint": "She has got / She''s got"},
   {"prompt": "Постави въпрос: You have got a dog. (Have...?)", "answers": ["Have you got a dog?"], "hint": "Have + subject + got?"},
   {"prompt": "Направи отрицание: He has got a car.", "answers": ["He hasn''t got a car", "He has not got a car"], "hint": "hasn''t got"},
   {"prompt": "Fill in: ___ they got any children? (Have/Has)", "answers": ["Have"], "hint": "Have for I/you/we/they"},
   {"prompt": "Преведи: Имам главоболие.", "answers": ["I have got a headache", "I''ve got a headache", "I have a headache"], "hint": "have got or have"},
   {"prompt": "Fill in: The house ___ a big garden. (has got)", "answers": ["has got"], "hint": "has got — for it/he/she"}
 ]'::jsonb),

-- ── A2 ─────────────────────────────────────────────────────────────────────

('a2-irregular-past-2',
 'Минало — неправилни глаголи II',
 'A2', 'Граматика',
 '[
   {"prompt": "Fill in: She ___ (go) to Paris last year.", "answers": ["went"], "hint": "go → went"},
   {"prompt": "Fill in: He ___ (come) home very late.", "answers": ["came"], "hint": "come → came"},
   {"prompt": "Fill in: I ___ (get) a present for my birthday.", "answers": ["got"], "hint": "get → got"},
   {"prompt": "Fill in: We ___ (make) a cake yesterday.", "answers": ["made"], "hint": "make → made"},
   {"prompt": "Fill in: She ___ (take) the bus to work.", "answers": ["took"], "hint": "take → took"},
   {"prompt": "Fill in: They ___ (sit) in the garden.", "answers": ["sat"], "hint": "sit → sat"},
   {"prompt": "Fill in: He ___ (become) a teacher.", "answers": ["became"], "hint": "become → became"}
 ]'::jsonb),

('a2-comparatives',
 'Сравнения — по-голям от / по-скъп от',
 'A2', 'Граматика',
 '[
   {"prompt": "Fill in: A car is ___ than a bike. (expensive)", "answers": ["more expensive"], "hint": "long adjective: more + adjective"},
   {"prompt": "Fill in: He is ___ than his brother. (tall)", "answers": ["taller"], "hint": "short adjective: + -er"},
   {"prompt": "Fill in: This test is ___ than the last one. (difficult)", "answers": ["more difficult"], "hint": "more + difficult"},
   {"prompt": "Fill in: She runs ___ than me. (fast)", "answers": ["faster"], "hint": "fast + -er"},
   {"prompt": "Fill in: This hotel is ___ than the other one. (good)", "answers": ["better"], "hint": "good → better (irregular)"},
   {"prompt": "Преведи: Тя е по-умна от него.", "answers": ["She is cleverer than him", "She is more intelligent than him", "She is smarter than him"], "hint": "cleverer / more intelligent / smarter"},
   {"prompt": "Fill in: The journey was ___ than expected. (long)", "answers": ["longer"], "hint": "long + -er → longer"}
 ]'::jsonb),

('a2-there-is-are',
 'There is / There are / There was / There were',
 'A2', 'Граматика',
 '[
   {"prompt": "Fill in: ___ a supermarket near here.", "answers": ["There is", "There''s"], "hint": "There is + singular noun"},
   {"prompt": "Fill in: ___ three parks in our city.", "answers": ["There are"], "hint": "There are + plural noun"},
   {"prompt": "Fill in: ___ any milk in the fridge? (Are/Is)", "answers": ["Is there"], "hint": "Is there + uncountable/singular?"},
   {"prompt": "Fill in: ___ a lot of people at the concert last night.", "answers": ["There were"], "hint": "There were (past plural)"},
   {"prompt": "Fill in: ___ no coffee left. (отрицание)", "answers": ["There is no", "There''s no", "There isn''t any"], "hint": "There is no... / There isn''t any..."},
   {"prompt": "Преведи: Няма магазини в това село.", "answers": ["There are no shops in this village", "There aren''t any shops in this village"], "hint": "There are no / There aren''t any + plural"},
   {"prompt": "Fill in: ___ a good film on TV last night.", "answers": ["There was"], "hint": "There was (past singular)"}
 ]'::jsonb),

('a2-frequency-adverbs',
 'Наречия за честота',
 'A2', 'Граматика',
 '[
   {"prompt": "Постави ''always'' на правилното място: She is late.", "answers": ["She is always late"], "hint": "always goes AFTER the verb ''to be''"},
   {"prompt": "Постави ''usually'' на правилното място: I have breakfast at 7.", "answers": ["I usually have breakfast at 7"], "hint": "usually goes BEFORE the main verb"},
   {"prompt": "Постави ''never'' на правилното място: He drinks coffee.", "answers": ["He never drinks coffee"], "hint": "never goes BEFORE the main verb"},
   {"prompt": "Постави ''often'' на правилното място: We go to the cinema.", "answers": ["We often go to the cinema"], "hint": "often goes BEFORE the main verb"},
   {"prompt": "Постави ''sometimes'' на правилното място: She is tired.", "answers": ["She is sometimes tired"], "hint": "sometimes after ''to be''"},
   {"prompt": "Преведи: Той рядко яде месо.", "answers": ["He rarely eats meat", "He seldom eats meat"], "hint": "rarely / seldom"},
   {"prompt": "Постави ''usually'' на правилното място: Are you late for work?", "answers": ["Are you usually late for work?"], "hint": "In questions: Are you usually...?"}
 ]'::jsonb),

('a2-going-to',
 'Going to — планове и намерения',
 'A2', 'Граматика',
 '[
   {"prompt": "Fill in: We ___ visit Rome next year. (going to)", "answers": ["are going to"], "hint": "am/is/are + going to + base verb"},
   {"prompt": "Fill in: She ___ start a new job. (going to)", "answers": ["is going to"], "hint": "is going to — for she/he/it"},
   {"prompt": "Fill in: Look at those clouds! It ___ rain. (going to)", "answers": ["is going to"], "hint": "Evidence = going to (not will)"},
   {"prompt": "Направи отрицание: He is going to move.", "answers": ["He is not going to move", "He isn''t going to move"], "hint": "is not / isn''t going to"},
   {"prompt": "Постави въпрос: She is going to study abroad.", "answers": ["Is she going to study abroad?"], "hint": "Is + subject + going to...?"},
   {"prompt": "Преведи: Не смятам да остана дълго.", "answers": ["I''m not going to stay long", "I am not going to stay long"], "hint": "I''m not going to..."},
   {"prompt": "Fill in: ___ you ___ buy a new car? (going to)", "answers": ["Are you going to"], "hint": "Are you going to + base verb?"}
 ]'::jsonb),

('a2-present-continuous-vs-simple',
 'Present Continuous vs Present Simple — в контекст',
 'A2', 'Граматика',
 '[
   {"prompt": "Choose the correct form: She usually ___ tea, but today she ___ coffee. (drink)", "answers": ["drinks, is drinking"], "hint": "usually → Present Simple; today, now → Present Continuous"},
   {"prompt": "Fill in: Be quiet! The baby ___ (sleep) right now.", "answers": ["is sleeping"], "hint": "right now → Present Continuous"},
   {"prompt": "Fill in: He ___ (not / usually / work) on Saturdays.", "answers": ["doesn''t usually work"], "hint": "usually + Present Simple"},
   {"prompt": "Fill in: Look! It ___ (rain).", "answers": ["is raining"], "hint": "Look! = right now → Present Continuous"},
   {"prompt": "Fill in: Water ___ (boil) at 100°C.", "answers": ["boils"], "hint": "Scientific fact = Present Simple"},
   {"prompt": "Fill in: She ___ (stay) with friends this week — she normally lives in Sofia.", "answers": ["is staying"], "hint": "this week (temporary) → Present Continuous"},
   {"prompt": "Fill in: I ___ (think) this film is boring.", "answers": ["think"], "hint": "think (state verb) = Present Simple, NOT continuous"}
 ]'::jsonb);
