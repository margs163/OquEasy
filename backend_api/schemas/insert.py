from sqlalchemy import insert, select
from sqlalchemy.orm import joinedload
import asyncio
from .content import Topic, Module, ContentImage, ContentPresentation, Content
from ..db_dependency import get_async_session
import json

first_module = [
  {
    "module": "Основы Программирования на с++",
    "topic": "Структура программы на с++",
    "mainHeading": "Что такое с++, и как на нем писать код?",
    "content": [
    ]
  },
  {
    "module": "Основы Программирования на с++",
    "topic": "Условный оператор и вложенные условия",
    "mainHeading": "Условный оператор. Простые и сложные составные условия. Вложенные условия, оператор switch",
    "content": [
    ]
  },
]

with open("./backend_api/schemas/some.md", 'r', encoding="utf-8") as file:
  content = file.read()
  first_module[0]["content"].append(content)

with open("./backend_api/schemas/another.md", 'r', encoding="utf-8") as file:
  content = file.read()
  first_module[1]["content"].append(content)

async def insert_some_data():
  module = None
  async for session in get_async_session():
    async with session.begin():
      module = await session.execute(select(Module).where(Module.module_name == "c"))
      module = module.scalars().first()

  topics = Topic(
          topic_module=module,
          topic_name="c-intro", 
          content_rel=Content(
                  topic_content=json.dumps(first_module[0]), 
                  ))

  async for session in get_async_session():
    async with session.begin():
      session.add(topics)
  
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
