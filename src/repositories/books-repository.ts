import { CreateReview } from "../protocols/review";

import prisma from "../database";
import { books } from "@prisma/client";

export type CreateBook = Omit<books, "id">
export async function getBooks() {
  const books = await prisma.books.findMany();

  return books;
}

export async function getBook(id: number) {
  const book = await prisma.books.findUnique({
    where: {id}
   })
   return book;
}

export async function createBook(book: CreateBook) {
   await prisma.books.create({
    data: book
  })
  return;
}

export async function reviewBook(bookReview: CreateReview) {
    const {review, grade} = bookReview
    await prisma.books.update({
    data: {review, grade, read: true},
    where: {id: bookReview.bookId}
  })
  return;
}