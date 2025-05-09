from sqlalchemy import insert, select
from sqlalchemy.orm import joinedload
import asyncio
from .content import Topic, Module, ContentImage, ContentPresentation, Content
from ..db_dependency import get_async_session
import json

first_module = [
  {
    "module": "Жадные алгоритмы",
    "topic": "Принципы жадного подхода",
    "mainHeading": "Суть жадных алгоритмов и когда они работают",
    "content": [
      "Жадные алгоритмы строятся на идее последовательного выбора **локально наилучшего решения** с надеждой, что оно приведёт к **глобально оптимальному результату**. Это значит, что на каждом шаге алгоритм выбирает самый выгодный с точки зрения текущей ситуации вариант, **не пересматривая предыдущие решения**.",
      "Такой подход позволяет значительно упростить реализацию алгоритма и уменьшить его временную сложность. Жадные алгоритмы часто работают **быстрее** и требуют **меньше памяти**, чем методы динамического программирования или полный перебор.",
      "Однако жадный метод применим не всегда. Он корректен только в задачах, где выполняется **свойство оптимальности** — когда локальные решения ведут к глобальному. Это нужно либо **доказать теоретически**, либо подтвердить с помощью контрпримеров и тестов.",
      "Типичные признаки задач, решаемых жадным методом:\n- можно сформулировать чёткую жадную стратегию;\n- данные удобно отсортировать;\n- на каждом шаге можно выбрать наилучший элемент по простому критерию."
    ]
  },
  {
    "module": "Жадные алгоритмы",
    "topic": "Два указателя",
    "mainHeading": "Метод двух указателей: мощный инструмент в арсенале алгоритмиста",
    "content": [
      "Метод двух указателей — это техника оптимизации, используемая в задачах, где требуется анализировать **отрезки**, **пары элементов** или **подмассивы**. Особенно он эффективен при работе с **отсортированными массивами**, помогая снизить сложность с `O(n^2)` до `O(n)` или `O(n log n)`.",
      "Суть метода:\n- используется два индекса (например, `i` и `j`);\n- один фиксирует начало отрезка, другой — его конец;\n- указатели сдвигаются в зависимости от условий задачи.",
      "Жадный подход и метод двух указателей часто применяются вместе. Например, в задаче покрытия отрезков точками: сначала сортируем отрезки, затем сдвигаем указатели, выбирая минимум точек для покрытия.",
      "Типичные задачи:\n- нахождение подотрезка с заданной суммой;\n- подсчёт количества подходящих пар;\n- задачи на «скользящее окно».\n\nЭтот метод позволяет **эффективно перебирать отрезки** и **сохранять высокую производительность алгоритма**."
    ]
  },
  {
    "module": "Жадные алгоритмы",
    "topic": "Примеры классических задач",
    "mainHeading": "Типовые задачи, которые решаются жадным методом",
    "content": [
      "Существует ряд классических задач, которые можно эффективно решить с помощью жадных алгоритмов:",
      "- **Задача о мероприятиях (activity selection):** выбрать максимальное число непересекающихся интервалов. Стратегия — сортировка по времени окончания и последовательный выбор совместимых интервалов.",
      "- **Размен монет:** минимизировать количество монет для заданной суммы. Работает, если номиналы «правильные» (например, 1, 5, 10, 25). При нестандартных номиналах жадность может не сработать.",
      "- **Покрытие отрезков:** покрыть все точки минимальным числом отрезков. Жадная стратегия — выбрать самый «дальнобойный» отрезок, начинающийся до текущей точки.",
      "- **Задача о дробном рюкзаке:** можно брать предметы частично. Оптимальное решение — брать элементы с **наивысшей удельной стоимостью**. Это классическая жадная задача, в отличие от 0/1-рюкзака.",
      "Во всех этих задачах важно **обосновать жадную стратегию**, доказать её корректность или привести контрпример в случае, если она не работает."
    ]
  },
  {
    "module": "Жадные алгоритмы",
    "topic": "Реализация и типичные ошибки",
    "mainHeading": "На что обратить внимание при программировании жадных решений",
    "content": [
      "**1. Выбор критерия сортировки.**  \nОсновной шаг в жадных алгоритмах — правильно отсортировать элементы. Ошибка в выборе критерия может полностью испортить результат.",
      "**2. Предположение, что жадность работает всегда.**  \nЭто не так. Перед реализацией важно убедиться, что задача действительно допускает жадное решение. Лучше всего — **доказать это** или привести контрпример.",
      "**3. Обработка краевых случаев.**  \nЧасто забывают обработать:\n- пустые массивы;\n- одинаковые значения;\n- граничные условия (всё покрывается одним элементом и т.п.).",
      "**4. Неправильная реализация двух указателей.**  \nОшибки при движении указателей могут привести к пропущенным случаям или выходу за границы массива.",
      "**5. Недостаточное тестирование.**  \nЖадные алгоритмы часто «ломаются» на специальных тестах. Тестируй на:\n- минимальных входах;\n- максимальных входах;\n- тщательно продуманных контрпримерах.",
      "Правильно реализованный жадный алгоритм может стать **быстрым и надёжным решением**, но требует аккуратности и чёткого понимания задачи."
    ]
  }
]

async def insert_some_data():
    module = Module(module_name="greedy")
    topics = [
        Topic(
            topic_name="greedy-principles", 
            content_rel=Content(
                    topic_content=json.dumps(first_module[0]), 
                    presentations=[ContentPresentation(presentation_path="http://localhost:8000/static/greedy/greedy-principles/greedy-algorithms.pdf")],
                    images=[ContentImage(image_path="http://localhost:8000/static/greedy/greedy-principles/example.jpg")]
                    )),
        Topic(
            topic_name="greedy-two-pointers", 
            content_rel=Content(
                    topic_content=json.dumps(first_module[1]), 
                    presentations=[ContentPresentation(presentation_path="http://localhost:8000/static/greedy/greedy-principles/greedy-algorithms.pdf")],
                    )),
        Topic(
            topic_name="greedy-examples", 
            content_rel=Content(
                    topic_content=json.dumps(first_module[2]), 
                    presentations=[ContentPresentation(presentation_path="http://localhost:8000/static/greedy/greedy-principles/greedy-algorithms.pdf")],
                    images=[ContentImage(image_path="http://localhost:8000/static/greedy/greedy-principles/example.jpg")]
                    )),
        Topic(
            topic_name="greedy-implementation", 
            content_rel=Content(
                    topic_content=json.dumps(first_module[3]), 
                    presentations=[ContentPresentation(presentation_path="http://localhost:8000/static/greedy/greedy-principles/greedy-algorithms.pdf")],
                    )),
    ]
    module.topics = topics

    async for session in get_async_session():
      async with session.begin():
        session.add(module)
    
    print("[DEBUG]: Successfully inserted the module!")

async def select_some_data(topic_name: str):
  try:
    async for session in get_async_session():
      async with session:
        topic_in_db = await session.execute(select(Topic).where(Topic.topic_name == topic_name))
        topic_in_db = topic_in_db.scalars().first()
        if not topic_in_db:
          raise Exception()
      
        result = await session.execute(
          select(Topic).options(
            joinedload(Topic.content_rel)
            .joinedload(Content.images),
            joinedload(Topic.content_rel)
            .joinedload(Content.presentations))
            .where(Topic.topic_name == topic_name))
        
        data = result.scalars().first()

        if data:
          print(f"Topic: {data.topic_name}")
          print(f"\tContent: {json.loads(data.content_rel.topic_content)["mainHeading"]}")
          for image in data.content_rel.images:
            print(f"\tImage: {image.image_path}")
          for present in data.content_rel.presentations:
            print(f"\tPresentation: {present.presentation_path}")
    
  except Exception as e:
     print("No topic_name found!\nException:", e)


if __name__ == "__main__":
   asyncio.run(insert_some_data())
