from fastapi import APIRouter, Path, Depends, HTTPException, status, Query, Body
from typing import Annotated, Any
from pydantic import BaseModel
from ..db_dependency import get_async_session
from ..schemas.content import Topic, Content, Module
from sqlalchemy import select, delete
from sqlalchemy.orm import joinedload
from sqlalchemy.ext.asyncio import AsyncSession
import json

router = APIRouter(prefix="/topic", tags=["topic"])

class CreateTopic(BaseModel):
    module_name: str
    topic_name: str

@router.get("/")
async def get_topic(session: Annotated[AsyncSession, Depends(get_async_session)]):
    try:
        async with session.begin():
            topics = await session.execute(
                select(Topic)
                .options(joinedload(Topic.content_rel)))
            data = topics.scalars().all()
            return {"data": data}
    except Exception as e:
        raise Exception(e)

@router.get("/{topic_name}")
async def get_specific_topic(topic_name: Annotated[str, Path()], session: Annotated[AsyncSession, Depends(get_async_session)]):
    try:
        async with session.begin():
            topic = await session.execute(
                select(Topic)
                .options(joinedload(Topic.content_rel))
                .where(Topic.topic_name == topic_name)
                )

            if not topic:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Could not find a topic.")

            data = topic.scalars().first()
            return {"data": data}
    except Exception as e:
        raise Exception(e)

@router.post("/")
async def create_topic(create_topic: Annotated[CreateTopic, Body()], session: Annotated[AsyncSession, Depends(get_async_session)]):
    async with session.begin():
        module_in_db = await session.execute(select(Module).where(Module.module_name == create_topic.module_name))
        module_in_db = module_in_db.scalars().first()

        if not module_in_db:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Module not found!")

        topic_in_db = await session.execute(select(Topic).where(Topic.topic_name == create_topic.topic_name))
        topic_in_db = topic_in_db.scalars().first()

        if topic_in_db:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Topic name already exists in the database!")
        
        new_topic = Topic(
            topic_name=create_topic.topic_name,
            module_id=module_in_db.id,
            topic_module=module_in_db,
        )

        session.add(new_topic)

        return {"inserted_topic_name": new_topic.topic_name, "inserted_topic_id": new_topic.id}

@router.delete("/{topic_name}")
async def delete_topic(topic_name: Annotated[str, Path()], session: Annotated[AsyncSession, Depends(get_async_session)]):
    async with session.begin():
        topic_in_db = await session.execute(select(Topic).where(Topic.topic_name == topic_name))
        topic_in_db = topic_in_db.scalars().first()

        if not topic_in_db:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Topic not found!")

        await session.execute(delete(Topic).where(Topic.topic_name == topic_name))
        return {"deleted_status": True}
