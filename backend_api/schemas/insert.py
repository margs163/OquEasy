from sqlalchemy import insert, select
from sqlalchemy.orm import joinedload
import asyncio
from .content import Topic, Module, ContentImage, ContentPresentation, Content
from ..db_dependency import get_async_session
import json

sidebar_items = [
  {
    "topic": {"name": "Поиски", "link": "search", "icon": "PackageSearch"},
    "subTopics": [
      {"name": "Бинарный поиск по массиву", "link": "/search-binary-array"},
      {"name": "Бинарный поиск: реализация", "link": "/search-binary-implementation"},
      {"name": "Бинарный поиск: примеры задач", "link": "/search-binary-examples"},
      {"name": "Бинарный поиск по ответу", "link": "/search-answer-binary"},
      {"name": "Бинарный поиск по ответу: примеры задач", "link": "/search-answer-binary-examples"},
      {"name": "Тернарный поиск", "link": "/search-ternary"},
      {"name": "Тернарный поиск: реализация", "link": "/search-ternary-implementation"},
      {"name": "Тернарный поиск: примеры задач", "link": "/search-ternary-examples"},
    ],
  },
  {
    "topic": {"name": "Графы", "link": "graphs", "icon": "Waypoints"},
    "subTopics": [
      {"name": "DFS: теория", "link": "/graphs-dfs-theory"},
      {"name": "DFS: реализация", "link": "/graphs-dfs-implementation"},
      {"name": "DFS: примеры задач", "link": "/graphs-dfs-examples"},
      {"name": "BFS: теория", "link": "/graphs-bfs-theory"},
      {"name": "BFS: реализация", "link": "/graphs-bfs-implementation"},
      {"name": "BFS: примеры задач", "link": "/graphs-bfs-examples"},
      {"name": "Алгоритм Дейкстры", "link": "/graphs-daskter"},
      {"name": "Форд-Беллман", "link": "/graphs-bellman-ford"},
      {"name": "Флойд-Уоршелл", "link": "/graphs-floyd-warshall"},
      {"name": "Диаметр графа", "link": "/graphs-diameter"},
    ],
  },
  {
    "topic": {"name": "Деревья", "link": "trees", "icon": "Network"},
    "subTopics": [
      {"name": "Дерево Фенвика", "link": "/trees-fenwick"},
      {"name": "Дерево отрезков", "link": "/trees-segment"},
    ],
  },
  {
    "topic": {"name": "Разреженные таблицы", "link": "sparse", "icon": "Table"},
    "subTopics": [
      {"name": "Sparse Table", "link": "/sparse-sparse-table"},
      {"name": "Disjoint Sparse Table", "link": "/sparse-disjoint-sparse-table"},
    ],
  },
  {
    "topic": {"name": "Динам. Программ.", "link": "dp", "icon": "Code"},
    "subTopics": [
      {"name": "Основы ДП", "link": "/dp-basics"},
      {"name": "Задача о рюкзаке", "link": "/dp-knapsack"},
      {"name": "Пути в сетке", "link": "/dp-grid-paths"},
      {"name": "Наибольшая возрастающая подпоследовательность", "link": "/dp-lis"},
    ],
  },
  {
    "topic": {"name": "Бор (Trie)", "link": "trie", "icon": "Pen"},
    "subTopics": [
      {"name": "Построение Trie", "link": "/trie-construction"},
      {"name": "Поиск подстрок", "link": "/trie-search"},
      {"name": "Реализация", "link": "/trie-implementation"},
      {"name": "Примеры задач", "link": "/trie-examples"},
    ],
  },
  {
    "topic": {"name": "Хеш-функция строк", "link": "string-hashing", "icon": "Hash"},
    "subTopics": [
      {"name": "Теория хеширования", "link": "/string-hashing-theory"},
      {"name": "Полиномиальное хеширование", "link": "/string-hashing-polynomial"},
      {"name": "Примеры задач", "link": "/string-hashing-examples"},
    ],
  },
  {
    "topic": {"name": "Алгоритм Мо", "link": "mo-algorithm", "icon": "SwatchBook"},
    "subTopics": [
      {"name": "Применение", "link": "/mo-algorithm-usecases"},
      {"name": "Реализация", "link": "/mo-algorithm-implementation"},
      {"name": "Примеры задач", "link": "/mo-algorithm-examples"},
    ],
  },
  {
    "topic": {"name": "Интересные факты", "link": "facts", "icon": "Lightbulb"},
    "subTopics": [
      {"name": "Формулы: делители", "link": "/facts-divisors"},
      {"name": "Простые числа", "link": "/facts-primes"},
      {"name": "Наблюдения из теории чисел", "link": "/facts-number-theory"},
      {"name": "Олимпиадные трюки", "link": "/facts-tricks"},
    ],
  },
]

# with open("./backend_api/schemas/some.md", 'r', encoding="utf-8") as file:
#   content = file.read()
#   first_module[0]["content"].append(content)

# with open("./backend_api/schemas/another.md", 'r', encoding="utf-8") as file:
#   content = file.read()
#   first_module[1]["content"].append(content)

async def insert_some_data():
  modules = []
  async for session in get_async_session():
    async with session.begin():
      for module in sidebar_items:
        modules.append(Module(module_name = module["topic"]["link"]))

      session.add_all(modules)


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
