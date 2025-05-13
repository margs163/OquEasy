from fastapi import APIRouter, Path, Depends, HTTPException, status, UploadFile, File, Query
from typing import Annotated, Any
from pydantic import BaseModel
from ..db_dependency import get_async_session
from ..schemas.content import Topic, Content, Module, ContentPresentation
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from sqlalchemy.ext.asyncio import AsyncSession
import os
import json

router = APIRouter(prefix="/content", tags=["content"])

# FLOW:
# 1. User presses to create new topic
# 2. User writes a module_name and topic_name and it creates a new topic
# 3. User adds a text content by pressing and edit button. He writes a main heading and selects .md file.
# 4. User adds a presentation by pressing and edit button. 
#
#

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

            if not data:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Topic not found!")

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

@router.post("/text/{topic_name}")
async def inser_topic_text(
    module_name: Annotated[str, Query()],
    heading: Annotated[str, Query()],
    topic_name: Annotated[str, Path(title="The topic name associated with materials")],
    topic_content: Annotated[UploadFile, File()],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    try:
        async with session:
            # module_in_db = await session.execute(select(Module).where(Module.module_name == module_name))
            # module_in_db = module_in_db.scalars().first()

            # if not module_in_db:
            #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Module not found!")

            topic_in_db = await session.execute(select(Topic).where(Topic.topic_name == topic_name))
            topic_in_db = topic_in_db.scalars().first()

            if not topic_in_db:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Topic not found!")

            file_content = await topic_content.read()
            file_text = file_content.decode()
            print(file_text)

            new_content = {
                "module": module_name,
                "topic": topic_in_db.topic_name,
                "mainHeading": heading,
                "content": [file_text]
            }

            if not topic_in_db.content_rel:
                new_content = Content(
                    topic_id=topic_in_db.id,
                    topic_content=json.dumps(new_content),
                    presentations=[],
                    images=[],
                    videos=[]
                )
                session.add(new_content)
            else:
                topic_in_db.content_rel.topic_content = json.dumps(new_content)

            await session.commit()
            print(f"[DEBUG]: Successfully updated content for topic '{topic_name}'!")
            return {
                "inserted": True
            }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.delete("/content/{topic_name}")
async def delete_topic_content(
    topic_name: Annotated[str, Path(title="The topic name associated with the content")],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    try:
        async with session:
            topic_in_db = await session.execute(
                select(Topic).where(Topic.topic_name == topic_name)
            )
            topic_in_db = topic_in_db.scalars().first()

            if not topic_in_db:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Topic not found!")

            if not topic_in_db.content_rel:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No content found for this topic!")

            topic_in_db.content_rel.topic_content = json.dumps({})

            await session.commit()
            print(f"[DEBUG]: Successfully deleted content for topic '{topic_name}'!")
            return {"message": f"Content for topic '{topic_name}' has been deleted."}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("/presentation/{topic_name}")
async def inser_topic_presentation(
    module_name: Annotated[str, Query()],
    topic_name: Annotated[str, Path(title="The topic name associated with materials")],
    topic_presentation: Annotated[UploadFile, File()],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    try:
        async with session:
            # module_in_db = await session.execute(select(Module).where(Module.module_name == module_name))
            # module_in_db = module_in_db.scalars().first()

            # if not module_in_db:
            #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Module not found!")

            topic_in_db = await session.execute(select(Topic).where(Topic.topic_name == topic_name))
            topic_in_db = topic_in_db.scalars().first()

            if not topic_in_db:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Topic not found!")

            file_content = await topic_presentation.read()
            print(file_content)

            pre_path = os.path.abspath("/static/{module_name}/{topic_name}")
            end_path = os.path.join(pre_path, topic_presentation.filename)

            os.makedirs(pre_path, exist_ok=True)

            with open(end_path, "wb") as file:
                file.write(file_content)
                
            topic_in_db.content_rel.presentations.append(
                ContentPresentation(image_path=f"http://localhost:8000/static/{module_name}/{topic_name}/{topic_presentation.filename}"))


            await session.commit()
            print(f"[DEBUG]: Successfully updated content for topic '{topic_name}'!")
            return {
                "inserted_path": f"http://localhost:8000/static/{module_name}/{topic_name}/{topic_presentation.filename}"
            }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.delete("/presentation/{topic_name}/{file_name}")
async def delete_topic_presentation(
    topic_name: Annotated[str, Path(title="The topic name associated with the presentation")],
    file_name: Annotated[str, Path(title="The name of the presentation file to delete")],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    try:
        async with session:
            topic_in_db = await session.execute(
                select(Topic).where(Topic.topic_name == topic_name)
            )
            topic_in_db = topic_in_db.scalars().first()

            if not topic_in_db:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Topic not found!")

            if not topic_in_db.content_rel or not topic_in_db.content_rel.presentations:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No presentations found for this topic!")

            presentation_to_delete = None
            for presentation in topic_in_db.content_rel.presentations:
                if presentation.presentation_path.endswith(file_name):
                    presentation_to_delete = presentation
                    break

            if not presentation_to_delete:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Presentation not found!")

            await session.delete(presentation_to_delete)

            file_path = os.path.abspath(presentation_to_delete.presentation_path.replace("http://localhost:8000", ""))
            if os.path.exists(file_path):
                os.remove(file_path)
                print(f"[DEBUG]: File '{file_path}' deleted from filesystem.")
            else:
                print(f"[WARNING]: File '{file_path}' not found on filesystem.")

            await session.commit()
            print(f"[DEBUG]: Successfully deleted presentation '{file_name}' from topic '{topic_name}'!")
            return {"message": f"Presentation '{file_name}' has been deleted from topic '{topic_name}'."}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))