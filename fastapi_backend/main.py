from typing import List
import json
from fastapi import FastAPI, Request
from pymongo import MongoClient
from bson.json_util import dumps
from fastapi.middleware.cors import CORSMiddleware
from pymongo.cursor import Cursor
from pydantic import BaseModel, Field
from bson import ObjectId
# MongoDB connection
conn = MongoClient(
    "mongodb+srv://manoj:kvno1chm@ikea.mkadg2e.mongodb.net/ikea?retryWrites=true&w=majority")

db = conn['Bookstore']  # Select the database

collection = db['Bookstore']  # Select the bookstore collection

userCollection = db['User']  # Select the user collection

cartCollection = db['Cart']  # Select the cart collection


class userSchema(BaseModel):
    username: str
    password: str


class cartSchema(BaseModel):
    title: str
    series: str=None
    author: str=None
    rating: int=None
    description: str
    language: str=None
    genres: List[str]
    bookFormat: str
    edition: str=None
    pages: int
    coverImg: str
    price: int=None
    username: str
    count: int


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/books")
async def get_data(page: int = 1, limit: int = 12):

    skip = (page - 1) * limit
    items: Cursor = list(collection.find().skip(skip).limit(limit))

    # Retrieve the total count of items
    total_count = collection.count_documents({})
    stringdata = dumps(items)
    res = json.loads(stringdata)

    # Return the paginated items and total count as JSON response
    return {
        "items": res,
        "total_count": total_count,
        "page": page,
        "limit": limit
    }


@app.get("/search")
async def search_book(title: str = None, genres: str = None, rating: int = None, page: int = 1, limit: int = 12):

    skip = (page-1)*limit

    query = {}

    if title:
        query["title"] = {"$regex": title, "$options": "i"}
    if genres:
        query["genres"] = {"$in": [genres]}
    if rating:
        query["rating"] = rating

    result = collection.find({"$or": [query]}).skip(skip).limit(limit)

    stringdata = dumps(result)
    res = json.loads(stringdata)
    return {
        "items": res,
        "page": page,
        "limit": limit
    }


@app.post("/signup")
async def sign_up(request: Request):
    user = userSchema(**await request.json())
    check = userCollection.find_one({"username": user.username})

    if check:
        return {"messege": "User already Exist"}
    else:
        userCollection.insert_one(
            {"username": user.username, "password": user.password})
        return {"messege": "User created successfully"}


@app.post("/signin")
async def sign_in(request: Request):
    user = userSchema(**await request.json())

    user_data = userCollection.find_one({"username": user.username})
    # print(user_data)

    if user_data and user.username == user_data.get("username") and user.password == user_data.get("password"):
        return {"token": "Sign in Sucessful"}  # Successful login, return token
    else:
        return {"message": "Login failed"}  # Invalid credentials


@app.post("/cart/add")
async def add_to_cart(request: Request):

    cart_data = await request.json()
    cart = cartSchema(**cart_data)
    existing_cart = cartCollection.find_one({"username": cart.username,"title":cart.title})

    if existing_cart:
        cartCollection.find_one_and_update({"title": existing_cart['title'], "username": existing_cart['username']}, {
                                           "$set": {"count": existing_cart['count'] + 1}})
        return {"count": existing_cart['count'] + 1}
    else:
        result = cartCollection.insert_one(cart_data)
        return {"_id": str(result.inserted_id)}

@app.post("/cart")
async def get_cart_data(request:Request):
    userData= await request.json()

    data = cartCollection.find(userData)
    
    stringdata= dumps(data)
    json_data= json.loads(stringdata)
    return json_data
    
@app.post("/cart/remove")
async def remove_from_cart(request:Request):
    userData=await request.json()
    result= cartCollection.find_one_and_delete(userData)
    print(result)
    if result:
        return {"message": "Book deleted successfully"}
    else:
        return {"message": "Book not found"}

# @app.delete("/book/{book_id}")
# async def delete_book(book_id:str):

#     # Delete the book based on the provided book_id
#     result = collection.delete_one({"_id":{"$oid":book_id}})

#     print(result)

#     if result.deleted_count:
#         return {"message": "Book deleted successfully"}
#     
