-- ============================================================
-- seed_writing_v2.sql — 15 more writing exercises
-- Collocations, Phrasal Verbs, False Friends, Confusable Words
-- Run AFTER seed_writing.sql
-- ============================================================

INSERT INTO public.writing_exercises (slug, title, level, topic, prompts) VALUES

-- ── Collocations ──────────────────────────────────────────────────────────────

('b1-make-do-collocations',
 'Make or Do?',
 'B1', 'Речник',
 '[
   {"prompt": "Fill in with MAKE or DO: She ___ a mistake in the exam.", "answers": ["made"], "hint": "make a mistake"},
   {"prompt": "Fill in with MAKE or DO: I need to ___ my homework.", "answers": ["do"], "hint": "do homework"},
   {"prompt": "Fill in with MAKE or DO: He ___ a lot of progress this year.", "answers": ["made"], "hint": "make progress"},
   {"prompt": "Fill in with MAKE or DO: Can you ___ me a favour?", "answers": ["do"], "hint": "do a favour / do someone a favour"},
   {"prompt": "Fill in with MAKE or DO: She ___ a decision to quit her job.", "answers": ["made"], "hint": "make a decision"},
   {"prompt": "Fill in with MAKE or DO: We need to ___ some research first.", "answers": ["do"], "hint": "do research"},
   {"prompt": "Fill in with MAKE or DO: Don''t ___ noise — the baby is sleeping.", "answers": ["make"], "hint": "make noise"}
 ]'::jsonb),

('b1-have-take-collocations',
 'Have or Take?',
 'B1', 'Речник',
 '[
   {"prompt": "Fill in with HAVE or TAKE: Let''s ___ a break — we''ve been working for hours.", "answers": ["have", "take"], "hint": "both are possible here"},
   {"prompt": "Fill in with HAVE or TAKE: She ___ a shower every morning.", "answers": ["has", "takes"], "hint": "both have/take a shower are correct"},
   {"prompt": "Fill in with HAVE or TAKE: He ___ a risk by investing all his money.", "answers": ["took"], "hint": "take a risk"},
   {"prompt": "Fill in with HAVE or TAKE: We ___ a meeting every Monday at 9.", "answers": ["have"], "hint": "have a meeting"},
   {"prompt": "Fill in with HAVE or TAKE: Can I ___ a look at your report?", "answers": ["have", "take"], "hint": "have/take a look — both correct"},
   {"prompt": "Fill in with HAVE or TAKE: She ___ an exam next Friday.", "answers": ["takes", "has"], "hint": "take/have an exam"},
   {"prompt": "Fill in with HAVE or TAKE: I ___ a headache. I need to rest.", "answers": ["have"], "hint": "have a headache / have an illness"}
 ]'::jsonb),

('b2-adjective-noun-collocations',
 'Силни колокации: прилагателно + съществително',
 'B2', 'Речник',
 '[
   {"prompt": "Choose the correct collocation: ___ coffee (strong / powerful / heavy).", "answers": ["strong"], "hint": "strong coffee — not powerful coffee"},
   {"prompt": "Choose the correct collocation: ___ rain (strong / heavy / big).", "answers": ["heavy"], "hint": "heavy rain — not strong rain"},
   {"prompt": "Choose the correct collocation: ___ traffic (heavy / big / strong).", "answers": ["heavy"], "hint": "heavy traffic"},
   {"prompt": "Choose the correct collocation: a ___ mistake (big / large / heavy).", "answers": ["big"], "hint": "a big mistake — also grave/serious mistake"},
   {"prompt": "Choose the correct collocation: ___ interest (great / big / strong).", "answers": ["great", "strong"], "hint": "great/strong interest — both correct"},
   {"prompt": "Choose the correct collocation: a ___ friend (close / near / tight).", "answers": ["close"], "hint": "a close friend"},
   {"prompt": "Choose the correct collocation: ___ wind (strong / heavy / big).", "answers": ["strong"], "hint": "strong wind"}
 ]'::jsonb),

('b2-preposition-phrases',
 'Предлози след прилагателни и глаголи',
 'B2', 'Речник',
 '[
   {"prompt": "Fill in: She is very good ___ mathematics.", "answers": ["at"], "hint": "good at something"},
   {"prompt": "Fill in: He is interested ___ learning Spanish.", "answers": ["in"], "hint": "interested in something"},
   {"prompt": "Fill in: The result depends ___ how hard you work.", "answers": ["on"], "hint": "depend on something"},
   {"prompt": "Fill in: She is responsible ___ the marketing team.", "answers": ["for"], "hint": "responsible for something"},
   {"prompt": "Fill in: He apologised ___ being late.", "answers": ["for"], "hint": "apologise for something"},
   {"prompt": "Fill in: I''m looking forward ___ seeing you.", "answers": ["to"], "hint": "look forward to + -ing"},
   {"prompt": "Fill in: She succeeded ___ passing the exam.", "answers": ["in"], "hint": "succeed in + -ing"}
 ]'::jsonb),

-- ── Phrasal Verbs ─────────────────────────────────────────────────────────────

('b1-phrasal-verbs-get',
 'Фразови глаголи с GET',
 'B1', 'Речник',
 '[
   {"prompt": "Fill in: I ___ at 6 every morning. (get + ___)", "answers": ["get up"], "hint": "get up = стани от леглото"},
   {"prompt": "Fill in: It took him months to ___ his illness. (recover from = get ___)", "answers": ["get over"], "hint": "get over = преодолявам / съвземам се"},
   {"prompt": "Fill in: How do you ___ with your new colleague? (get ___)", "answers": ["get on", "get along"], "hint": "get on/along with = разбирам се с"},
   {"prompt": "Fill in: I need to ___ this old furniture. (get ___ of)", "answers": ["get rid"], "hint": "get rid of = отървавам се от"},
   {"prompt": "Fill in: Please ___ the bus here. (exit = get ___)", "answers": ["get off"], "hint": "get off = слизам от превозно средство"},
   {"prompt": "Fill in: She finally ___ the car. (entered = got ___)", "answers": ["got in", "got into"], "hint": "get in(to) = влизам в (кола)"},
   {"prompt": "Fill in: I couldn''t ___ to the meeting on time. (arrive = get ___)", "answers": ["get there", "get to"], "hint": "get to (a place) = стигам до"}
 ]'::jsonb),

('b1-phrasal-verbs-put',
 'Фразови глаголи с PUT',
 'B1', 'Речник',
 '[
   {"prompt": "Fill in: We had to ___ the meeting until next week. (postpone = put ___)", "answers": ["put off"], "hint": "put off = отлагам"},
   {"prompt": "Fill in: I can''t ___ his rude behaviour any longer. (tolerate = put ___ ___)", "answers": ["put up with"], "hint": "put up with = търпя / понасям"},
   {"prompt": "Fill in: Please ___ your toys when you finish playing. (tidy = put ___)", "answers": ["put away"], "hint": "put away = прибирам / наредем"},
   {"prompt": "Fill in: He ___ a great performance last night. (delivered = put ___)", "answers": ["put on"], "hint": "put on = организирам / изнасям (представление)"},
   {"prompt": "Fill in: The firefighters ___ the fire quickly. (extinguished = put ___)", "answers": ["put out"], "hint": "put out = гася"},
   {"prompt": "Fill in: Can you ___ her number for me? (write down = put ___)", "answers": ["put down"], "hint": "put down = записвам"},
   {"prompt": "Fill in: She ___ her hand to ask a question. (raised = put ___)", "answers": ["put up"], "hint": "put up your hand = вдигам ръка"}
 ]'::jsonb),

('b2-phrasal-verbs-come-take',
 'Фразови глаголи с COME и TAKE',
 'B2', 'Речник',
 '[
   {"prompt": "Fill in: I ___ an old photo while cleaning. (found by chance = came ___)", "answers": ["came across"], "hint": "come across = натъквам се на случайно"},
   {"prompt": "Fill in: She ___ a brilliant solution. (invented = came ___ ___)", "answers": ["came up with"], "hint": "come up with = измислям / намирам (идея)"},
   {"prompt": "Fill in: The plane ___ at 8 a.m. (departed = took ___)", "answers": ["took off"], "hint": "take off = излита (самолет)"},
   {"prompt": "Fill in: He ___ photography as a hobby last year. (started = took ___)", "answers": ["took up"], "hint": "take up = захващам се с (хоби)"},
   {"prompt": "Fill in: The new manager ___ the company last month. (assumed control = took ___)", "answers": ["took over"], "hint": "take over = поемам контрол"},
   {"prompt": "Fill in: The deal ___ yesterday. (was finalised = came ___)", "answers": ["came through"], "hint": "come through = осъществява се / минава"},
   {"prompt": "Fill in: Don''t worry — the pain will ___ soon. (disappear = come ___)", "answers": ["come back", "go away"], "hint": "go away or pass — note: go away, not come away. Alternative: pass"}
 ]'::jsonb),

('c1-phrasal-verbs-advanced',
 'Напреднали фразови глаголи',
 'C1', 'Речник',
 '[
   {"prompt": "Fill in: The new policy ___ significant changes. (caused = brought ___)", "answers": ["brought about"], "hint": "bring about = предизвиквам / причинявам"},
   {"prompt": "Fill in: We need to ___ a thorough investigation. (conduct = carry ___)", "answers": ["carry out"], "hint": "carry out = провеждам / извършвам"},
   {"prompt": "Fill in: The police will ___ the complaint. (investigate = look ___)", "answers": ["look into"], "hint": "look into = разследвам / проучвам"},
   {"prompt": "Fill in: They ___ a new company together. (established = set ___)", "answers": ["set up"], "hint": "set up = основавам / създавам"},
   {"prompt": "Fill in: She ___ her grandmother''s love of reading. (inherited = took ___)", "answers": ["took after"], "hint": "take after = приличам на (родственик)"},
   {"prompt": "Fill in: The project ___ longer than expected. (required = took ___)", "answers": ["dragged on", "took longer"], "hint": "drag on = проточва се — or: The project took longer than expected."},
   {"prompt": "Fill in: His argument ___ perfectly. (was convincing = held ___)", "answers": ["held up"], "hint": "hold up = издържа на проверка / оказа се верен"}
 ]'::jsonb),

-- ── False Friends ─────────────────────────────────────────────────────────────

('a2-false-friends-basic',
 'Фалшиви приятели — основни',
 'A2', 'Речник',
 '[
   {"prompt": "''Actually'' НЕ означава ''актуален''. Какво означава? Переведи: ''Всъщност, имаш право.''", "answers": ["Actually, you are right", "Actually, you''re right"], "hint": "actually = всъщност / на практика"},
   {"prompt": "''Magazine'' НЕ е ''магазин''. Преведи ''Купих списание.''", "answers": ["I bought a magazine"], "hint": "magazine = списание. Магазин = shop/store"},
   {"prompt": "''Sympathetic'' НЕ е ''симпатичен''. Преведи: ''Тя беше съчувствена.''", "answers": ["She was sympathetic"], "hint": "sympathetic = съчувствен. Симпатичен = nice/likeable"},
   {"prompt": "''Eventually'' НЕ е ''евентуално''. Преведи: ''В крайна сметка той пристигна.''", "answers": ["Eventually he arrived", "He eventually arrived"], "hint": "eventually = в крайна сметка. Евентуално = possibly"},
   {"prompt": "''Pathetic'' НЕ е ''патетичен''. Какво означава? Преведи: ''Тя беше нещастна.'' (use pathetic)", "answers": ["She was pathetic"], "hint": "pathetic = жалък / нещастен. Патетичен = dramatic/theatrical"},
   {"prompt": "''Control'' НЕ е ''контрол'' (проверка). Преведи: ''Загубихме контрол.''", "answers": ["We lost control"], "hint": "control = контрол (управление). BUT control ≠ проверка → check"},
   {"prompt": "''Advice'' е неизброимо. Преведи: ''Имам съвет за теб.''", "answers": ["I have some advice for you", "I have a piece of advice for you"], "hint": "advice = неизброимо. НЕ ''an advice'' → a piece of advice / some advice"}
 ]'::jsonb),

('b1-false-friends-intermediate',
 'Фалшиви приятели — средно ниво',
 'B1', 'Речник',
 '[
   {"prompt": "''Borrow'' vs ''lend'': Запълни: Can I ___ your pen? (вземам назаем)", "answers": ["borrow"], "hint": "borrow = взимам назаем (от теб). lend = давам назаем (на теб)"},
   {"prompt": "''Say'' vs ''tell'': Запълни: She ___ me that she was tired.", "answers": ["told"], "hint": "tell someone = казвам на някого. say something = казвам нещо"},
   {"prompt": "''Rob'' vs ''steal'': Запълни: Someone ___ her handbag.", "answers": ["stole"], "hint": "steal something. rob a person/place"},
   {"prompt": "Преведи: ''Искам да взема назаем книгата ти.''", "answers": ["I want to borrow your book", "I''d like to borrow your book"], "hint": "borrow — not lend"},
   {"prompt": "''Library'' ≠ ''книжарница''. Преведи: ''Взех книгата от библиотеката.''", "answers": ["I got the book from the library", "I borrowed the book from the library"], "hint": "library = библиотека. Книжарница = bookshop/bookstore"},
   {"prompt": "''Recipe'' vs ''receipt'': Преведи: ''Следвах рецепта.''", "answers": ["I followed a recipe"], "hint": "recipe = рецепта (за готвене). receipt = касова бележка"}
 ]'::jsonb),

('b2-false-friends-advanced',
 'Фалшиви приятели — напреднало ниво',
 'B2', 'Речник',
 '[
   {"prompt": "''Sensible'' vs ''sensitive'': Запълни: She is very ___ — she cries easily. (чувствителна)", "answers": ["sensitive"], "hint": "sensitive = чувствителен. sensible = разумен / здравомислещ"},
   {"prompt": "''Comprehensive'' vs ''sympathetic'': Запълни: The report is very ___. (изчерпателен)", "answers": ["comprehensive"], "hint": "comprehensive = изчерпателен. comprehension = разбиране"},
   {"prompt": "Преведи: ''Той е много разумен човек.'' (NOT sympathetic)", "answers": ["He is a very sensible person", "He is very sensible"], "hint": "sensible = разумен. НЕ sensible = чувствителен (= sensitive)"},
   {"prompt": "''Propose'' vs ''suggest'': Запълни: I ___ that we take a break. (предлагам)", "answers": ["suggest", "propose"], "hint": "both suggest and propose work here"},
   {"prompt": "''Realise'' vs ''achieve'': Запълни: She ___ her dream of becoming a doctor. (постига)", "answers": ["achieved", "realised"], "hint": "achieve a goal / realise a dream — both work"},
   {"prompt": "Преведи: ''Той накрая постигна целта си.''", "answers": ["He finally achieved his goal", "He eventually achieved his goal"], "hint": "achieve = постигам. НЕ realise в смисъл на постигам (in British English realise a dream е OK)"}
 ]'::jsonb),

-- ── Confusable Words ──────────────────────────────────────────────────────────

('b1-confusable-words',
 'Объркващи думи: look / see / watch',
 'B1', 'Речник',
 '[
   {"prompt": "Fill in: I ___ a great film last night. (гледах — завършено действие)", "answers": ["watched", "saw"], "hint": "watch a film (attentively) / see a film (attended)"},
   {"prompt": "Fill in: Can you ___ the board from where you sit? (виждаш ли)", "answers": ["see"], "hint": "see = виждам (неволево). look = гледам (насочено). watch = наблюдавам"},
   {"prompt": "Fill in: ___ at that beautiful sunset!", "answers": ["Look"], "hint": "look at = гледай (с намерение)"},
   {"prompt": "Fill in: She ___ tired today. (изглежда)", "answers": ["looks"], "hint": "look + adjective = изглеждам"},
   {"prompt": "Fill in: I ___ the match on TV every week.", "answers": ["watch"], "hint": "watch TV / watch a match = гледам внимателно"},
   {"prompt": "Fill in: He ___ his keys everywhere but couldn''t find them.", "answers": ["looked for"], "hint": "look for = търся"}
 ]'::jsonb),

('b1-confusable-words-2',
 'Объркващи думи: hear / listen · bring / take',
 'B1', 'Речник',
 '[
   {"prompt": "Fill in: ___ to this song — it''s amazing! (слушай)", "answers": ["Listen"], "hint": "listen to = слушам (съзнателно). hear = чувам (неволево)"},
   {"prompt": "Fill in: Did you ___ that noise? (чу ли)", "answers": ["hear"], "hint": "hear = чувам (неволево)"},
   {"prompt": "Fill in: Please ___ your umbrella — it might rain. (вземи — от тук към там)", "answers": ["take"], "hint": "take = вземам (и нося от тук нагоре). bring = нося (насам, към говорещия)"},
   {"prompt": "Fill in: Can you ___ me a coffee when you come back? (донеси — насам)", "answers": ["bring"], "hint": "bring = нося нещо насам (към говорещия)"},
   {"prompt": "Fill in: I can ___ music from the next room.", "answers": ["hear"], "hint": "hear = чувам (неволево)"},
   {"prompt": "Fill in: ___ to your teacher — she is explaining something important.", "answers": ["Listen"], "hint": "listen to = слушам внимателно"}
 ]'::jsonb),

('b2-word-families',
 'Словообразуване — семейства думи',
 'B2', 'Граматика',
 '[
   {"prompt": "Попълни правилната форма: The company needs to ___ its processes. (efficient → verb)", "answers": ["streamline", "improve", "make more efficient"], "hint": "efficient (adj) → efficiency (noun) → make efficient (phrase)"},
   {"prompt": "Попълни: Her ___ of the problem was impressive. (analyse → noun)", "answers": ["analysis"], "hint": "analyse (v) → analysis (n) → analytical (adj)"},
   {"prompt": "Попълни: The project was a great ___. (succeed → noun)", "answers": ["success"], "hint": "succeed (v) → success (n) → successful (adj)"},
   {"prompt": "Попълни: He made a significant ___ to the debate. (contribute → noun)", "answers": ["contribution"], "hint": "contribute (v) → contribution (n) → contributor (n)"},
   {"prompt": "Попълни: The results were quite ___. (encourage → adjective)", "answers": ["encouraging"], "hint": "encourage (v) → encouragement (n) → encouraging (adj)"},
   {"prompt": "Попълни: She spoke with great ___. (confident → noun)", "answers": ["confidence"], "hint": "confident (adj) → confidence (n) → confidently (adv)"},
   {"prompt": "Попълни: His ___ of the situation was accurate. (assess → noun)", "answers": ["assessment"], "hint": "assess (v) → assessment (n)"}
 ]'::jsonb);
