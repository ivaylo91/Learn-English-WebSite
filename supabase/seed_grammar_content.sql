-- ============================================================
-- seed_grammar_content.sql
-- Full lesson content + quiz questions for all 14 grammar lessons
-- Run AFTER 002_grammar_questions.sql
-- ============================================================

-- ── Present Simple ────────────────────────────────────────────

UPDATE public.grammar_lessons SET
  content_md = $md$
## Какво е Present Simple?

**Present Simple** (Сегашно просто време) е едно от най-важните времена в английския.
Използва се за:

- **Факти и общи истини** — *The sun rises in the east.*
- **Ежедневни навици и рутини** — *I drink coffee every morning.*
- **Постоянни ситуации** — *She lives in Sofia.*
- **Разписания и програми** — *The train leaves at 9.*

---

## Структура

| Лице | Форма | Пример |
|------|-------|--------|
| I / You / We / They | основна форма | *I **work*** |
| He / She / It | + **-s** или **-es** | *She **works*** |

---

## Сигнални думи

Тези думи подсказват, че трябва да използваш Present Simple:

**always** (винаги) · **usually** (обикновено) · **often** (често) · **sometimes** (понякога) · **rarely** (рядко) · **never** (никога) · **every day/week** (всеки ден/седмица)

---

## Примери

| Английски | Български |
|-----------|-----------|
| I play football on Sundays. | Играя футбол в неделя. |
| She reads books every night. | Тя чете книги всяка вечер. |
| They live in London. | Те живеят в Лондон. |
$md$,
  questions = '[
    {"question": "За какво НЕ се използва Present Simple?", "options": ["Ежедневни навици", "Действие, случващо се точно сега", "Общи истини", "Разписания"], "correct": 1},
    {"question": "Коя сигнална дума подсказва Present Simple?", "options": ["yesterday", "now", "always", "tomorrow"], "correct": 2},
    {"question": "Кое изречение е правилно?", "options": ["She work every day.", "She works every day.", "She is work every day.", "She working every day."], "correct": 1},
    {"question": "Present Simple се използва за постоянни ситуации. Кое изречение описва постоянна ситуация?", "options": ["I am eating lunch.", "I ate lunch.", "I live in Plovdiv.", "I will eat lunch."], "correct": 2},
    {"question": "Колко форми има глаголът в Present Simple?", "options": ["Три — за всяко лице различна", "Две — основна и с -s/-es за 3-то лице единствено", "Една — за всички лица еднаква", "Четири форми"], "correct": 1}
  ]'::jsonb
WHERE slug = 'present-simple-intro';

-- ─────────────────────────────────────────────────────────────

UPDATE public.grammar_lessons SET
  content_md = $md$
## Положителна форма на Present Simple

### Структура

**Subject + base verb (+ -s/-es за he/she/it)**

---

## Правила за добавяне на -s / -es

| Правило | Пример |
|---------|--------|
| Повечето глаголи → **+ s** | *work → work**s*** |
| Завършват на -s, -sh, -ch, -x, -o → **+ es** | *watch → watch**es*** |
| Завършват на съгласна + y → **-y + ies** | *study → stud**ies*** |
| Завършват на гласна + y → **+ s** | *play → play**s*** |

---

## Примери

| Лице | Глагол | Изречение |
|------|--------|-----------|
| I | work | *I **work** from home.* |
| You | play | *You **play** guitar.* |
| He | watch | *He **watches** TV.* |
| She | study | *She **studies** English.* |
| We | go | *We **go** to school.* |
| They | have | *They **have** two dogs.* |

> **Внимание:** Глаголът **have** → трето лице е **has** (не *haves*)!

---

## Упражнение: Попълни правилната форма

- She \_\_\_ (go) to the gym on Mondays.
- He \_\_\_ (teach) math at school.
- The baby \_\_\_ (cry) a lot.
$md$,
  questions = '[
    {"question": "Коя е правилната форма на ''teach'' за ''he''?", "options": ["teachs", "teaches", "teachies", "teach"], "correct": 1},
    {"question": "She ___ English every day. (study)", "options": ["studys", "studies", "studyes", "study"], "correct": 1},
    {"question": "Кое изречение е ГРЕШНО?", "options": ["I work every day.", "They play football.", "He have a car.", "She watches TV."], "correct": 2},
    {"question": "The dog ___ a lot. (bark)", "options": ["barks", "barkies", "barkes", "bark"], "correct": 0},
    {"question": "Кое лице ЗАДЪЛЖИТЕЛНО взима -s/-es?", "options": ["I", "You", "He/She/It", "They"], "correct": 2}
  ]'::jsonb
WHERE slug = 'present-simple-positive';

-- ─────────────────────────────────────────────────────────────

UPDATE public.grammar_lessons SET
  content_md = $md$
## Отрицателна форма на Present Simple

### Структура

**Subject + do/does + not + base verb**

| Лице | Помощен глагол | Кратка форма |
|------|---------------|--------------|
| I / You / We / They | **do not** | **don't** |
| He / She / It | **does not** | **doesn't** |

> **Важно:** При he/she/it глаголът **не** взима -s/-es — той е вече в основна форма!

---

## Примери

| Положително | Отрицателно |
|-------------|-------------|
| I work. | I **don't** work. |
| She works. | She **doesn't** work. |
| They play. | They **don't** play. |
| He watches TV. | He **doesn't** watch TV. |

---

## Чести грешки

❌ *She doesn't **works** here.*
✅ *She doesn't **work** here.*

❌ *He don't like coffee.*
✅ *He doesn't like coffee.*

---

## Примери в контекст

- *I **don't** eat meat. I'm vegetarian.*
- *She **doesn't** speak French, but she speaks Spanish.*
- *We **don't** have classes on Friday.*
$md$,
  questions = '[
    {"question": "I ___ like horror movies.", "options": ["not", "dont", "don''t", "doesn''t"], "correct": 2},
    {"question": "She ___ speak German.", "options": ["don''t", "not", "doesn''t", "isn''t"], "correct": 2},
    {"question": "Кое изречение е правилно?", "options": ["He doesn''t works here.", "He don''t work here.", "He doesn''t work here.", "He not work here."], "correct": 2},
    {"question": "They ___ have a car.", "options": ["doesn''t", "don''t", "not", "isn''t"], "correct": 1},
    {"question": "Защо при doesn''t глаголът е в основна форма?", "options": ["Защото always e така", "Защото does вече носи 3-то лице", "Защото е отрицание", "Защото е грешно правило"], "correct": 1}
  ]'::jsonb
WHERE slug = 'present-simple-negative';

-- ─────────────────────────────────────────────────────────────

UPDATE public.grammar_lessons SET
  content_md = $md$
## Въпроси в Present Simple

### Структура

**Do/Does + subject + base verb + ?**

| Лице | Помощен глагол |
|------|---------------|
| I / You / We / They | **Do** |
| He / She / It | **Does** |

---

## Видове въпроси

### Yes/No въпроси

- ***Do** you like pizza?* → *Yes, I do. / No, I don't.*
- ***Does** she work here?* → *Yes, she does. / No, she doesn't.*

### Въпроси с въпросителни думи (WH- questions)

**WH-word + do/does + subject + base verb?**

| Пример | Превод |
|--------|--------|
| *What do you eat for breakfast?* | Какво ядеш за закуска? |
| *Where does he live?* | Къде живее той? |
| *When do they arrive?* | Кога пристигат? |
| *How often does she exercise?* | Колко често спортува? |

---

## Чести грешки

❌ *Does she **works** here?*
✅ *Does she **work** here?*

❌ *Where you **live**?*
✅ *Where do you **live**?*

---

## Кратки отговори

| Въпрос | Положителен отговор | Отрицателен отговор |
|--------|--------------------|--------------------|
| Do you like it? | Yes, **I do**. | No, **I don't**. |
| Does he know? | Yes, **he does**. | No, **he doesn't**. |
$md$,
  questions = '[
    {"question": "___ you speak English?", "options": ["Are", "Does", "Do", "Is"], "correct": 2},
    {"question": "___ she live in Sofia?", "options": ["Do", "Is", "Are", "Does"], "correct": 3},
    {"question": "Кое е правилно?", "options": ["Does he works here?", "Does he work here?", "Do he work here?", "Is he work here?"], "correct": 1},
    {"question": "Where ___ they go on holiday?", "options": ["does", "are", "is", "do"], "correct": 3},
    {"question": "''Do you like coffee?'' — Краткият положителен отговор е:", "options": ["Yes, I like.", "Yes, I am.", "Yes, I do.", "Yes, I does."], "correct": 2}
  ]'::jsonb
WHERE slug = 'present-simple-questions';

-- ── Present Continuous ────────────────────────────────────────

UPDATE public.grammar_lessons SET
  content_md = $md$
## Какво е Present Continuous?

**Present Continuous** (Сегашно продължително) описва действие, което се случва **точно сега** или **около сега**.

---

## Структура

**Subject + am/is/are + verb-ing**

| Лице | Спомагателен глагол |
|------|---------------------|
| I | **am** |
| He / She / It | **is** |
| You / We / They | **are** |

---

## Употреба

- **Точно сега:** *I am reading this lesson right now.*
- **Около сега (временно):** *She is learning Spanish this month.*
- **Планирано бъдеще:** *We are meeting tomorrow.*

---

## Правила за -ing

| Правило | Пример |
|---------|--------|
| Повечето глаголи + **-ing** | *read → read**ing*** |
| Завършват на -e → махни -e + **-ing** | *write → writ**ing*** |
| Кратка сричка CVC → удвои съгласна + **-ing** | *run → run**ning*** |

---

## Сигнални думи

**now** · **right now** · **at the moment** · **currently** · **look!** · **listen!**

---

## Примери

- *She **is watching** a movie right now.*
- *They **are playing** in the garden.*
- *I **am not working** today — it's my day off.*
$md$,
  questions = '[
    {"question": "Коя употреба е правилна за Present Continuous?", "options": ["Постоянна ситуация", "Действие точно сега", "Ежедневен навик", "Общи истини"], "correct": 1},
    {"question": "He ___ TV at the moment.", "options": ["watch", "watches", "is watching", "was watching"], "correct": 2},
    {"question": "Как се образува -ing формата на ''write''?", "options": ["writeing", "writting", "writing", "writes"], "correct": 2},
    {"question": "Кое изречение използва Present Continuous правилно?", "options": ["I am always eat breakfast.", "She is study right now.", "They are playing football now.", "He is knows the answer."], "correct": 2},
    {"question": "Коя сигнална дума подсказва Present Continuous?", "options": ["always", "usually", "right now", "yesterday"], "correct": 2}
  ]'::jsonb
WHERE slug = 'present-continuous-intro';

-- ─────────────────────────────────────────────────────────────

UPDATE public.grammar_lessons SET
  content_md = $md$
## Present Continuous vs Present Simple

Двете сегашни времена се бъркат най-много. Ето как да ги различиш:

---

## Сравнение

| Present Simple | Present Continuous |
|---------------|--------------------|
| Навици и рутини | Действие точно сега |
| Общи истини | Временни ситуации |
| Постоянни ситуации | Планирано бъдеще |
| **every day, always, usually** | **now, at the moment, right now** |

---

## Примери

| Present Simple | Present Continuous |
|---------------|--------------------|
| *She **reads** books.* (навик) | *She **is reading** a book.* (сега) |
| *I **work** in an office.* (постоянно) | *I **am working** from home.* (временно) |
| *He **plays** guitar.* (умение) | *He **is playing** guitar.* (сега) |

---

## Глаголи, които НЕ се използват в Continuous

Някои глаголи описват **ментални** или **емоционални** състояния и не се използват в -ing форма:

**know** · **want** · **like** · **love** · **hate** · **understand** · **believe** · **remember**

❌ *I am knowing the answer.*
✅ *I know the answer.*

---

## Тест: Simple или Continuous?

1. Look! The cat \_\_\_ (sleep) on the sofa.
2. I \_\_\_ (usually drink) tea in the morning.
3. She \_\_\_ (not understand) the question.
$md$,
  questions = '[
    {"question": "''I ___ coffee every morning.'' Кое е правилно?", "options": ["am drinking", "drink", "is drinking", "drinks"], "correct": 1},
    {"question": "''Look! She ___ .'' (dance)", "options": ["dances", "dance", "is dancing", "was dancing"], "correct": 2},
    {"question": "Кой глагол НЕ се използва в Present Continuous?", "options": ["run", "eat", "know", "sleep"], "correct": 2},
    {"question": "''He ___ in Berlin this month.'' (live — временно)", "options": ["lives", "is living", "lived", "live"], "correct": 1},
    {"question": "Коя двойка изречения е ПРАВИЛНА?", "options": ["She is working at a bank. / She works right now.", "She works at a bank. / She is working right now.", "She is work at a bank. / She working right now.", "She do work at a bank. / She is work now."], "correct": 1}
  ]'::jsonb
WHERE slug = 'present-continuous-vs-simple';

-- ── Past Simple ───────────────────────────────────────────────

UPDATE public.grammar_lessons SET
  content_md = $md$
## Past Simple — Правилни глаголи

**Past Simple** (Минало просто) описва завършени действия в миналото.

---

## Образуване на правилни глаголи

**base verb + -ed**

| Правило | Пример |
|---------|--------|
| Повечето глаголи + **-ed** | *work → work**ed*** |
| Завършват на -e + **-d** | *live → liv**ed*** |
| Кратка сричка CVC → удвой + **-ed** | *stop → stop**ped*** |
| Съгласна + y → **-ied** | *study → stud**ied*** |

---

## Структура

| Тип | Форма |
|-----|-------|
| ✅ Положително | *I **worked** yesterday.* |
| ❌ Отрицателно | *I **didn't work** yesterday.* |
| ❓ Въпрос | ***Did** you **work** yesterday?* |

> При отрицание и въпрос глаголът е в **основна форма** (не -ed).

---

## Сигнални думи

**yesterday** · **last week/month/year** · **ago** · **in 2020** · **when I was a child**

---

## Примери

- *She **studied** hard and **passed** the exam.*
- *They **moved** to a new city last year.*
- *I **didn't watch** the game — I was busy.*
- ***Did** you **visit** Paris?* — *Yes, I **did**.*
$md$,
  questions = '[
    {"question": "Правилната форма на ''stop'' в Past Simple е:", "options": ["stoped", "stopied", "stopped", "stoppd"], "correct": 2},
    {"question": "She ___ English for 3 years. (study)", "options": ["studyed", "studied", "studyied", "studys"], "correct": 1},
    {"question": "Кое изречение е правилно?", "options": ["I didn''t worked yesterday.", "I didn''t work yesterday.", "I not worked yesterday.", "I no work yesterday."], "correct": 1},
    {"question": "''___ you visit London?'' ''Yes, I ___.''", "options": ["Do / do", "Did / did", "Were / was", "Have / have"], "correct": 1},
    {"question": "Коя сигнална дума подсказва Past Simple?", "options": ["tomorrow", "now", "last week", "every day"], "correct": 2}
  ]'::jsonb
WHERE slug = 'past-simple-regular';

-- ─────────────────────────────────────────────────────────────

UPDATE public.grammar_lessons SET
  content_md = $md$
## Past Simple — Неправилни глаголи

Много от най-честите английски глаголи са **неправилни** — Past Simple формата им трябва да се научи наизуст.

---

## Най-важните неправилни глаголи

| Основна форма | Past Simple | Значение |
|---------------|-------------|----------|
| be | was / were | съм |
| go | went | отивам |
| have | had | имам |
| do | did | правя |
| see | saw | виждам |
| come | came | идвам |
| get | got | получавам |
| make | made | правя |
| take | took | вземам |
| know | knew | знам |
| think | thought | мисля |
| say | said | казвам |
| give | gave | давам |
| find | found | намирам |
| tell | told | казвам |

---

## Отрицание и въпрос

Същото като при правилните — **didn't** + основна форма:

- *I **went** to the park.* → *I **didn't go** to the park.*
- ***Did** you **see** the movie?* → *Yes, I **did**.*

---

## Примери

- *She **went** to Spain last summer.*
- *We **had** a great time.*
- *He **didn't know** the answer.*
- ***Did** you **see** that?*
$md$,
  questions = '[
    {"question": "Past Simple на ''go'' е:", "options": ["goed", "gone", "went", "goes"], "correct": 2},
    {"question": "I ___ a lot of friends at the party. (meet)", "options": ["meeted", "met", "meted", "meet"], "correct": 1},
    {"question": "She ___ to the concert. (not / go)", "options": ["didn''t went", "doesn''t go", "didn''t go", "not went"], "correct": 2},
    {"question": "''___ you see the match?'' ''Yes, it was great.''", "options": ["Do", "Were", "Did", "Have"], "correct": 2},
    {"question": "Past Simple на ''have'' за he/she/it е:", "options": ["haved", "has", "had", "have"], "correct": 2}
  ]'::jsonb
WHERE slug = 'past-simple-irregular';

-- ── Future Tenses ─────────────────────────────────────────────

UPDATE public.grammar_lessons SET
  content_md = $md$
## Future с WILL

**Will** се използва за изразяване на бъдеще в английски.

---

## Структура

| Тип | Форма |
|-----|-------|
| ✅ Положително | *I **will** go.* / *I**'ll** go.* |
| ❌ Отрицателно | *I **will not** go.* / *I **won't** go.* |
| ❓ Въпрос | ***Will** you go?* |

> **will** е еднакво за всички лица — без -s!

---

## Употреба на will

- **Спонтанни решения:** *I'm tired. I **will** take a nap.*
- **Обещания:** *I **will** always love you.*
- **Прогнози без доказателства:** *It **will** rain tomorrow.*
- **Условни изречения (1-ви тип):** *If you study, you **will** pass.*

---

## Примери

- *She **will** call you later.*
- *We **won't** be late, I promise.*
- ***Will** you help me?* — *Yes, I **will**.*
- *I think it **will** be a great event.*
$md$,
  questions = '[
    {"question": "Кратката форма на ''I will'' е:", "options": ["I''d", "I''ll", "I''ve", "I''m"], "correct": 1},
    {"question": "Отрицателната форма на ''will'' е:", "options": ["willn''t", "won''t", "will not to", "not will"], "correct": 1},
    {"question": "Will се използва за:", "options": ["Действие точно сега", "Спонтанно решение за бъдещето", "Завършено минало действие", "Ежедневен навик"], "correct": 1},
    {"question": "She ___ come to the party.", "options": ["wills", "will to", "will", "is will"], "correct": 2},
    {"question": "''___ you be at home tonight?'' ''Yes, I ___.''", "options": ["Do / do", "Will / will", "Are / am", "Have / have"], "correct": 1}
  ]'::jsonb
WHERE slug = 'future-will';

-- ─────────────────────────────────────────────────────────────

UPDATE public.grammar_lessons SET
  content_md = $md$
## Future с GOING TO

**Be going to** се използва за планирани бъдещи действия и прогнози с доказателства.

---

## Структура

**am/is/are + going to + base verb**

| Тип | Пример |
|-----|--------|
| ✅ Положително | *I **am going to** study tonight.* |
| ❌ Отрицателно | *She **isn't going to** come.* |
| ❓ Въпрос | ***Are** you **going to** watch the game?* |

---

## Will vs Going to

| Will | Going to |
|------|----------|
| Спонтанно решение | Предварителен план |
| Обещание | Намерение |
| Прогноза без доказателства | Прогноза с доказателства |

**Пример:**
- *Look at those clouds! It **is going to** rain.* (виждаш облаците — доказателство)
- *I think it **will** rain tomorrow.* (просто мнение)

---

## Примери

- *We **are going to** visit Greece this summer.* (планирано)
- *He **is going to** be a great teacher.* (очевидно от сега)
- *Are you **going to** eat all of that?*
$md$,
  questions = '[
    {"question": "Going to се използва главно за:", "options": ["Спонтанни решения", "Предварително планирани действия", "Общи истини", "Завършени минали действия"], "correct": 1},
    {"question": "''Look at that car! It ___ crash!''", "options": ["will", "is going to", "goes to", "shall"], "correct": 1},
    {"question": "She ___ study medicine. (plan)", "options": ["will", "is going to", "goes to", "shall"], "correct": 1},
    {"question": "Правилният въпрос е:", "options": ["Are you going study?", "Are you going to study?", "Do you going to study?", "Will you going to study?"], "correct": 1},
    {"question": "Кое изречение изразява спонтанно решение?", "options": ["I am going to visit Paris next year.", "I will answer the phone — don''t worry.", "She is going to buy a new car.", "They are going to get married."], "correct": 1}
  ]'::jsonb
WHERE slug = 'future-going-to';

-- ── Conditionals ──────────────────────────────────────────────

UPDATE public.grammar_lessons SET
  content_md = $md$
## Conditionals — Zero & First

Условните изречения (Conditionals) изразяват **условие** и **резултат**.

---

## Zero Conditional — Общи истини

**If + Present Simple, Present Simple**

Използва се за факти и резултати, които ВИНАГИ са верни.

| Пример | Превод |
|--------|--------|
| *If you heat water to 100°C, it **boils**.* | Ако нагрееш вода до 100°C, тя завира. |
| *If I drink coffee, I **can't** sleep.* | Ако пия кафе, не мога да спя. |

---

## First Conditional — Реални ситуации

**If + Present Simple, will + base verb**

Използва се за реални, възможни ситуации в бъдещето.

| Пример | Превод |
|--------|--------|
| *If it **rains**, I **will** stay home.* | Ако вали, ще остана вкъщи. |
| *If you **study**, you **will** pass.* | Ако учиш, ще успееш. |

> **Ред на клаузите:** If-клаузата може да е първа или втора:
> - *If it rains, I'll stay home.*
> - *I'll stay home if it rains.*
> При първа позиция се поставя запетая!

---

## Сравнение

| Zero | First |
|------|-------|
| Общи истини | Реални бъдещи ситуации |
| If + Present, Present | If + Present, will |
| *If you mix red and blue, you **get** purple.* | *If she calls, I **will** answer.* |
$md$,
  questions = '[
    {"question": "Zero Conditional се използва за:", "options": ["Нереални ситуации", "Общи истини и факти", "Минали хипотези", "Желания"], "correct": 1},
    {"question": "Коя е правилната First Conditional форма?", "options": ["If it will rain, I stay home.", "If it rains, I will stay home.", "If it rained, I will stay home.", "If it rain, I would stay."], "correct": 1},
    {"question": "''If you ___ (freeze) water, it ___ (become) ice.'' — Zero Conditional:", "options": ["froze / became", "freeze / becomes", "will freeze / becomes", "freeze / will become"], "correct": 1},
    {"question": "Кога поставяме запетая в conditional изречение?", "options": ["Никога", "Винаги", "Когато if-клаузата е първа", "Когато if-клаузата е втора"], "correct": 2},
    {"question": "''If she ___ hard, she ___ the exam.'' — First Conditional:", "options": ["studies / passes", "will study / will pass", "studies / will pass", "studied / would pass"], "correct": 2}
  ]'::jsonb
WHERE slug = 'conditionals-zero-first';

-- ─────────────────────────────────────────────────────────────

UPDATE public.grammar_lessons SET
  content_md = $md$
## Second Conditional — Нереални ситуации

**Second Conditional** изразява **хипотетични, нереални или малко вероятни** ситуации в настоящето или бъдещето.

---

## Структура

**If + Past Simple, would + base verb**

---

## Примери

| Изречение | Превод |
|-----------|--------|
| *If I **had** a million euros, I **would** travel the world.* | Ако имах милион евро, щях да обиколя света. |
| *If she **lived** closer, we **would** meet more often.* | Ако живееше по-близо, щяхме да се виждаме по-често. |
| *If I **were** you, I **wouldn't** do that.* | На твое място не бих направил това. |

> **Специален случай:** При I/he/she/it можем да използваме **were** вместо was:
> *If I **were** rich...* (по-формално)
> *If I **was** rich...* (по-разговорно)

---

## First vs Second Conditional

| First | Second |
|-------|--------|
| Реална, възможна ситуация | Нереална, хипотетична ситуация |
| *If I find the keys, I'll call you.* | *If I found gold, I'd buy a castle.* |
| Вероятно се случва | Малко вероятно |

---

## Would — кратка форма: 'd

- *I **would** go.* = *I**'d** go.*
- *She **wouldn't** agree.*
$md$,
  questions = '[
    {"question": "Second Conditional се използва за:", "options": ["Реални бъдещи ситуации", "Хипотетични нереални ситуации", "Общи истини", "Завършени минали действия"], "correct": 1},
    {"question": "Правилната Second Conditional форма е:", "options": ["If I will have time, I would help.", "If I had time, I would help.", "If I have time, I would help.", "If I had time, I will help."], "correct": 1},
    {"question": "If I ___ you, I ___ accept the offer.", "options": ["am / will", "was/were / would", "will be / would", "was / will"], "correct": 1},
    {"question": "Кратката форма на ''I would'' е:", "options": ["I''m", "I''ve", "I''d", "I''ll"], "correct": 2},
    {"question": "Кое изречение е Second Conditional?", "options": ["If it rains, I will stay home.", "If it rained, I would stay home.", "If it has rained, I stayed home.", "If it is raining, I stay home."], "correct": 1}
  ]'::jsonb
WHERE slug = 'conditionals-second';

-- ── Passive Voice ─────────────────────────────────────────────

UPDATE public.grammar_lessons SET
  content_md = $md$
## Passive Voice — Страдателен залог

В **активен** залог субектът извършва действието.
В **пасивен** залог субектът получава действието.

---

## Структура

**be (в правилното време) + past participle**

| Активен | Пасивен |
|---------|---------|
| *Someone **builds** the house.* | *The house **is built**.* |
| *They **built** the house.* | *The house **was built**.* |
| *They **will build** the house.* | *The house **will be built**.* |

---

## Кога се използва Passive?

- Когато **извършителят е неизвестен:** *My wallet was stolen.*
- Когато **извършителят е маловажен:** *The results will be announced tomorrow.*
- В **официален или научен** стил: *The experiment was conducted in 2020.*

---

## BY + извършител

Ако искаме да посочим извършителя, използваме **by**:

- *The painting **was created by** Picasso.*
- *The letter **was written by** my teacher.*

---

## Past Participle на неправилни глаголи

| Глагол | Past Participle |
|--------|-----------------|
| write | written |
| make | made |
| build | built |
| give | given |
| see | seen |
$md$,
  questions = '[
    {"question": "Структурата на Passive Voice е:", "options": ["have + past participle", "be + past participle", "do + past participle", "get + infinitive"], "correct": 1},
    {"question": "Active: ''They make cars here.'' Passive:", "options": ["Cars are made here.", "Cars is made here.", "Cars are make here.", "Cars made here."], "correct": 0},
    {"question": "Кога НЕ използваме Passive?", "options": ["Когато извършителят е неизвестен", "Когато ни е важно кой извършва действието", "В официален стил", "Когато извършителят е маловажен"], "correct": 1},
    {"question": "''The book ___ by Tolkien.'' (write)", "options": ["was written", "was wrote", "is write", "was writing"], "correct": 0},
    {"question": "Как посочваме извършителя в Passive?", "options": ["с ''from''", "с ''by''", "с ''with''", "с ''of''"], "correct": 1}
  ]'::jsonb
WHERE slug = 'passive-voice-intro';

-- ── Reported Speech ───────────────────────────────────────────

UPDATE public.grammar_lessons SET
  content_md = $md$
## Reported Speech — Косвена реч

**Reported Speech** (Косвена реч) се използва, когато преразказваме това, което някой е казал.

---

## Промяна на времената

При преразказване времената **се изместват назад**:

| Пряка реч | Косвена реч |
|-----------|-------------|
| Present Simple | Past Simple |
| Present Continuous | Past Continuous |
| Past Simple | Past Perfect |
| will | would |
| can | could |

---

## Примери

| Пряка реч | Косвена реч |
|-----------|-------------|
| *"I **work** here."* | He said he **worked** there. |
| *"She **is cooking**."* | He said she **was cooking**. |
| *"I **will** come."* | She said she **would** come. |
| *"I **can** help."* | He said he **could** help. |

---

## Промяна на местоимения и думи

| Пряка реч | Косвена реч |
|-----------|-------------|
| I | he/she |
| here | there |
| now | then |
| today | that day |
| tomorrow | the next day |
| yesterday | the day before |

---

## Въпроси в косвена реч

- *"Are you tired?" → She asked if I **was** tired.*
- *"Where do you live?" → He asked where I **lived**.*
$md$,
  questions = '[
    {"question": "''I work here.'' → He said he ___ there.", "options": ["works", "worked", "will work", "is working"], "correct": 1},
    {"question": "''She is cooking.'' → He said she ___ .", "options": ["is cooking", "cooks", "was cooking", "cooked"], "correct": 2},
    {"question": "''I will help you.'' → She said she ___ help me.", "options": ["will", "would", "can", "could"], "correct": 1},
    {"question": "Как се преобразува ''I'' в косвена реч?", "options": ["Остава ''I''", "Става ''he'' или ''she''", "Става ''you''", "Изчезва"], "correct": 1},
    {"question": "''Are you ready?'' → She asked if I ___ ready.", "options": ["am", "is", "was", "were"], "correct": 2}
  ]'::jsonb
WHERE slug = 'reported-speech';
