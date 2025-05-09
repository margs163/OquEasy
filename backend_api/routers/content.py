from fastapi import APIRouter, Path, Depends, HTTPException, status
from typing import Annotated, Any
from ..db_dependency import get_async_session
from ..schemas.content import Topic, Content
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from sqlalchemy.ext.asyncio import AsyncSession
import json

router = APIRouter(prefix="/content", tags=["content"])

@router.get("/{topic_name}")
async def get_topic_data(
    topic_name: Annotated[str, Path(title="the topic name associated with materials")],
    session: Annotated[AsyncSession, Depends(get_async_session)]
    ):
    try:
        async with session:
            topic_in_db = await session.execute(select(Topic).where(Topic.topic_name == topic_name))
            topic_in_db = topic_in_db.scalars().first()
            if not topic_in_db:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Topic not found!")
        
            result = await session.execute(
                select(Topic).options(
                    joinedload(Topic.content_rel)
                    .joinedload(Content.images),
                    joinedload(Topic.content_rel)
                    .joinedload(Content.presentations))
                    .where(Topic.topic_name == topic_name))
            
            data = result.scalars().first()
            images = []
            presentations = []

            if data:
                global theory_obj
                theory_obj = json.loads(data.content_rel.topic_content)
                for image in data.content_rel.images:
                    images.append(image.image_path)
                for present in data.content_rel.presentations:
                    presentations.append(present.presentation_path)

            return {
                "theory": theory_obj,
                "images": images,
                "presentations": presentations,
            }
        
    except Exception as e:
        raise Exception("Exception:", e)