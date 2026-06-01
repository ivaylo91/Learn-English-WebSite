-- ============================================================
-- seed_grammar_b2_c1.sql
-- 6 new grammar lessons: Present Perfect, Modal Verbs,
-- Past Perfect, Third Conditional, Relative Clauses
-- Run AFTER seed_grammar_content.sql
-- ============================================================

INSERT INTO public.grammar_lessons (slug, title, level, category, order_index, content_md) VALUES
('present-perfect-intro',           'Present Perfect — Въведение',      'B2', 'Present Perfect', 1, ''),
('present-perfect-vs-past-simple',  'Present Perfect vs Past Simple',    'B2', 'Present Perfect', 2, ''),
('modal-verbs',                     'Modal Verbs — Модални глаголи',    'B2', 'Modal Verbs',     1, ''),
('past-perfect',                    'Past Perfect',                       'C1', 'Past Perfect',    1, ''),
('conditionals-third',              'Third Conditional',                  'C1', 'Conditionals',   1, ''),
('relative-clauses',                'Relative Clauses',                   'C1', 'Relative Clauses',1, '');

-- ── Present Perfect — Въведение ──────────────────────────────

UPDATE public.grammar_lessons SET
  content_md = $md$
## Какво е Present Perfect?

**Present Perfect** свързва миналото с настоящето — описва действие, което е станало в миналото, но има **значение за сега**.

---

## Структура

**have/has + Past Participle**

| Лице | Спомагателен глагол | Пример |
|------|---------------------|--------|
| I / You / We / They | **have** | *I **have seen** that film.* |
| He / She / It | **has** | *She **has finished** her work.* |

| Тип | Форма |
|-----|-------|
| ✅ Положително | *I **have visited** London.* |
| ❌ Отрицателно | *She **hasn't called** yet.* |
| ❓ Въпрос | ***Have** you **ever** been to Japan?* |

---

## Три основни употреби

### 1. Преживявания в живота
*Have you **ever** tried sushi?*
*I have **never** been to Australia.*

### 2. Скорошно действие с резултат сега
*I **have lost** my keys.* (и сега нямам ключовете)
*She **has broken** her leg.* (сега не може да ходи)

### 3. Действие с **since** или **for**
- **since** + начален момент: *I have lived here **since** 2018.*
- **for** + продължителност: *She has worked there **for** three years.*

---

## Сигнални думи

**ever** · **never** · **already** · **yet** · **just** · **since** · **for** · **recently** · **so far** · **this week/month/year**

---

## Past Participle на неправилни глаголи

| Основна | Past Simple | Past Participle |
|---------|-------------|-----------------|
| go | went | **gone** |
| see | saw | **seen** |
| write | wrote | **written** |
| eat | ate | **eaten** |
| take | took | **taken** |
$md$,
  questions = '[
    {"question": "Структурата на Present Perfect е:", "options": ["be + base verb", "have/has + past participle", "did + base verb", "have + past simple"], "correct": 1},
    {"question": "''I ___ never ___ sushi.'' (eat)", "options": ["have / ate", "have / eaten", "has / eat", "had / eaten"], "correct": 1},
    {"question": "Коя сигнална дума НЕ е характерна за Present Perfect?", "options": ["already", "yesterday", "yet", "ever"], "correct": 1},
    {"question": "She ___ here for ten years. (live)", "options": ["lives", "lived", "has lived", "is living"], "correct": 2},
    {"question": "Кое изречение използва Present Perfect правилно?", "options": ["I have seen him yesterday.", "I have seen him last week.", "I have seen him three times.", "I have seen him in 2010."], "correct": 2}
  ]'::jsonb
WHERE slug = 'present-perfect-intro';

-- ── Present Perfect vs Past Simple ───────────────────────────

UPDATE public.grammar_lessons SET
  content_md = $md$
## Present Perfect vs Past Simple

Най-честото объркване в английски. Ето правилото:

---

## Ключовото различие

| Present Perfect | Past Simple |
|-----------------|-------------|
| Връзка с **настоящето** | Завършено в **миналото** |
| Конкретното кога е **неважно** | Конкретното кога е **известно** |
| *I **have lost** my keys.* | *I **lost** my keys yesterday.* |

---

## Времеви изрази

| Present Perfect | Past Simple |
|-----------------|-------------|
| ever, never, already, yet, just | yesterday, last week, in 2020, ago |
| since, for, recently, so far | at 3 o'clock, when I was young |
| this morning *(ако е все още сутринта)* | this morning *(ако денят е минал)* |

---

## Примери

| Present Perfect | Past Simple |
|-----------------|-------------|
| *Have you **ever been** to Paris?* | *I **went** to Paris in 2019.* |
| *She **has just arrived**.* | *She **arrived** an hour ago.* |
| *I **have never tried** oysters.* | *I **tried** oysters once.* |

---

## Правилото с конкретно минало

Ако имаш конкретно минало време → **Past Simple**:

❌ *I have seen him **yesterday**.*
✅ *I **saw** him yesterday.*

---

## Диалог

> — **Have** you **read** any good books recently?
> — Yes! I **read** a great thriller **last week**.
$md$,
  questions = '[
    {"question": "''I ___ him yesterday.'' Кой глагол е правилен?", "options": ["have seen", "have saw", "saw", "have see"], "correct": 2},
    {"question": "''I ___ never ___ sashimi.'' Кой е правилен?", "options": ["did / tried", "have / tried", "did / try", "have / try"], "correct": 1},
    {"question": "Кое изречение е ГРЕШНО?", "options": ["She has just left.", "I saw him last night.", "Have you ever been to Rome?", "I have seen her yesterday."], "correct": 3},
    {"question": "Кога използваме Past Simple вместо Present Perfect?", "options": ["Когато говорим за преживявания", "Когато споменаваме конкретен минал момент", "Когато използваме ''ever''", "Когато използваме ''for''"], "correct": 1},
    {"question": "''___ you finish the report?'' ''Yes, I ___ it an hour ago.''", "options": ["Have / finished", "Did / finished", "Have / have finished", "Did / have finished"], "correct": 1}
  ]'::jsonb
WHERE slug = 'present-perfect-vs-past-simple';

-- ── Modal Verbs ───────────────────────────────────────────────

UPDATE public.grammar_lessons SET
  content_md = $md$
## Modal Verbs — Модални глаголи

**Модалните глаголи** изразяват отношение към действието: задължение, разрешение, способност, вероятност, съвет.

---

## Основни модални глаголи

| Глагол | Употреба | Пример |
|--------|----------|--------|
| **can / could** | Способност, разрешение | *I **can** swim. / **Can** I leave?* |
| **should / ought to** | Съвет, препоръка | *You **should** see a doctor.* |
| **must / have to** | Задължение | *You **must** wear a seatbelt.* |
| **might / may** | Вероятност | *It **might** rain later.* |
| **would** | Учтива молба, хипотеза | ***Would** you help me?* |

---

## Структура

**Subject + modal + base verb** (без to, без -s!)

✅ *She **can** speak French.*
❌ *She **cans** speak French.*
❌ *She **can to** speak French.*

---

## Must vs Have to

| Must | Have to |
|------|---------|
| Лично задължение / силен съвет | Външно задължение (правило) |
| *You **must** try this!* | *I **have to** be at work at 9.* |

---

## Mustn't vs Don't have to

| Mustn't | Don't have to |
|---------|---------------|
| **Забранено** е | **Не е необходимо** (но можеш) |
| *You **mustn't** park here.* | *You **don't have to** come.* |

---

## Might vs Will

- **Will** → сигурно: *It **will** rain tomorrow.*
- **Might / May** → несигурно: *It **might** rain tomorrow.*
$md$,
  questions = '[
    {"question": "Кое изречение е ПРАВИЛНО?", "options": ["She cans swim.", "She can to swim.", "She can swims.", "She can swim."], "correct": 3},
    {"question": "Разликата между ''mustn''t'' и ''don''t have to'' е:", "options": ["Няма разлика", "Mustn''t е забрана; don''t have to е липса на задължение", "Don''t have to е по-силно", "Mustn''t е по-учтиво"], "correct": 1},
    {"question": "''You ___ see a doctor — you look terrible.'' Кое е правилно?", "options": ["must to", "should", "can", "might to"], "correct": 1},
    {"question": "''It ___ rain this afternoon — the sky is cloudy.'' Вероятност:", "options": ["will", "shall", "might", "must"], "correct": 2},
    {"question": "Кое изречение изразява ЗАБРАНА?", "options": ["You don''t have to come.", "You shouldn''t come.", "You mustn''t come.", "You might not come."], "correct": 2}
  ]'::jsonb
WHERE slug = 'modal-verbs';

-- ── Past Perfect ──────────────────────────────────────────────

UPDATE public.grammar_lessons SET
  content_md = $md$
## Past Perfect

**Past Perfect** описва действие, завършило **преди** друго минало действие. Помислете за него като "миналото на миналото".

---

## Структура

**had + Past Participle** (за всички лица)

| Тип | Форма |
|-----|-------|
| ✅ Положително | *I **had finished** before she arrived.* |
| ❌ Отрицателно | *He **hadn't eaten** anything.* |
| ❓ Въпрос | ***Had** you **met** him before?* |

---

## Употреба

**Последователност на минали действия:**

*When I **arrived** at the cinema, the film **had already started**.*
→ Първо е започнал филмът (Past Perfect), после аз съм пристигнал (Past Simple).

---

## Past Perfect vs Past Simple

| Past Perfect | Past Simple |
|--------------|-------------|
| По-ранното от двете минали действия | По-късното (или единственото) |
| *She **had left** when I called.* | *I **called** her.* |

---

## Сигнални думи

**by the time** · **when** · **before** · **after** · **as soon as** · **already** · **just** · **never ... before**

---

## Примери

- *By the time we **arrived**, they **had eaten** all the food.*
- *She **had never seen** snow before she visited Finland.*
- *I realized I **had forgotten** my wallet.*
- *After he **had finished** his homework, he went out.*
$md$,
  questions = '[
    {"question": "Структурата на Past Perfect е:", "options": ["was/were + past participle", "have/has + past participle", "had + past participle", "would + base verb"], "correct": 2},
    {"question": "''When I arrived, she ___ already ___ .'' (leave)", "options": ["has / left", "had / left", "was / leaving", "did / leave"], "correct": 1},
    {"question": "Кое действие е в Past Perfect?", "options": ["I called her", "She had left", "И двете", "Нито едно"], "correct": 1},
    {"question": "''By the time the ambulance arrived, he ___ .'' (recover)", "options": ["recovered", "has recovered", "had recovered", "was recovering"], "correct": 2},
    {"question": "Past Perfect описва:", "options": ["Действие точно сега", "Действие, завършило преди друго минало действие", "Бъдещо действие", "Постоянна минала ситуация"], "correct": 1}
  ]'::jsonb
WHERE slug = 'past-perfect';

-- ── Third Conditional ─────────────────────────────────────────

UPDATE public.grammar_lessons SET
  content_md = $md$
## Third Conditional

**Third Conditional** изразява **хипотетична минала** ситуация — какво би се случило, ако миналото беше различно. Използва се за съжаление и размисъл.

---

## Структура

**If + Past Perfect, would have + Past Participle**

| Тип | Форма |
|-----|-------|
| ✅ Положително | *If I **had studied**, I **would have passed**.* |
| ❌ Отрицателно | *If she **hadn't been** late, she **wouldn't have missed** the train.* |
| ❓ Въпрос | ***Would** you **have come** if I **had invited** you?* |

---

## Кратки форми

- *I would have* = *I**'d have***
- *would not have* = ***wouldn't have***

---

## Сравнение на всички Conditionals

| Тип | Употреба | Структура |
|-----|----------|-----------|
| Zero | Общи истини | If + Present, Present |
| First | Реално бъдеще | If + Present, will |
| Second | Нереално настояще | If + Past, would |
| Third | Нереално минало | If + Past Perfect, would have |

---

## Примери

- *If she **had arrived** on time, we **would have caught** the flight.*
- *I **wouldn't have bought** it if I **had known** the price.*
- *If he **hadn't helped** me, I **would have failed**.*
$md$,
  questions = '[
    {"question": "Структурата на Third Conditional е:", "options": ["If + Past Simple, would + base verb", "If + Past Perfect, would have + past participle", "If + Present, will + base verb", "If + Past Perfect, would + base verb"], "correct": 1},
    {"question": "''If I ___ harder, I ___ the exam.''", "options": ["studied / would pass", "had studied / would have passed", "study / will pass", "had studied / would pass"], "correct": 1},
    {"question": "Third Conditional се използва за:", "options": ["Реални бъдещи ситуации", "Хипотетично настояще", "Хипотетично минало", "Общи истини"], "correct": 2},
    {"question": "Кратката форма на ''I would not have gone'' е:", "options": ["I''d not gone", "I wouldn''t have gone", "I''d not have gone", "I wouldn''t gone"], "correct": 1},
    {"question": "Кое изречение е Third Conditional?", "options": ["If it rains, I will stay.", "If I were rich, I would travel.", "If I had known, I would have called.", "If you heat water, it boils."], "correct": 2}
  ]'::jsonb
WHERE slug = 'conditionals-third';

-- ── Relative Clauses ──────────────────────────────────────────

UPDATE public.grammar_lessons SET
  content_md = $md$
## Relative Clauses — Относителни изречения

**Relative Clauses** добавят информация за съществително. Свързват се с относителни местоимения.

---

## Относителни местоимения

| Местоимение | Употреба | Пример |
|-------------|----------|--------|
| **who** | За хора | *The woman **who** called you is here.* |
| **which** | За неща и животни | *The book **which** I read was great.* |
| **that** | За хора и неща (defining) | *The film **that** I saw was amazing.* |
| **whose** | Притежание | *The boy **whose** dog barked is my neighbor.* |
| **where** | За места | *The city **where** I was born is beautiful.* |

---

## Defining vs Non-defining Relative Clauses

### Defining (определящо) — без запетаи
Посочва точно коя личност/нещо. Без тази клауза изречението губи смисъл.

*The student **who sits next to me** is from Turkey.*
→ Кой студент? Именно този, който седи до мен.

### Non-defining (неопределящо) — с запетаи
Добавя допълнителна, незадължителна информация.

*My sister, **who lives in London**, is a doctor.*
→ Вече знаем кой е сестрата; "who lives in London" е допълнителна информация.

> ⚠️ **"That"** НЕ се използва в non-defining relative clauses!

---

## Кога можем да пропуснем местоимението?

Можем да пропуснем **who/which/that**, когато то е **обект** в клаузата (не субект):

- *The book **(that) I read** was great.* → ✅ може без that
- *The woman **who called** you is here.* → ❌ не може без who (who е субект)

---

## Примери

- *The teacher **whose** lessons I enjoy most is Mr. Brown.*
- *London, **which** is the capital of the UK, has millions of tourists.*
- *That's the restaurant **where** we had our first date.*
$md$,
  questions = '[
    {"question": "Кое местоимение се използва за хора?", "options": ["which", "that", "who", "whose"], "correct": 2},
    {"question": "Кое изречение е Non-defining Relative Clause?", "options": ["The man who called is outside.", "My brother, who lives in Spain, is visiting us.", "The film that I saw was boring.", "The house where she grew up was demolished."], "correct": 1},
    {"question": "В Non-defining Relative Clause НЕ се използва:", "options": ["who", "which", "that", "whose"], "correct": 2},
    {"question": "''The girl ___ bag was stolen called the police.''", "options": ["who", "which", "whose", "that"], "correct": 2},
    {"question": "Кога можем да пропуснем относителното местоимение?", "options": ["Никога", "Когато то е субект", "Когато то е обект", "Само с ''which''"], "correct": 2}
  ]'::jsonb
WHERE slug = 'relative-clauses';
