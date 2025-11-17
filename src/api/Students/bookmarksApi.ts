import { httpClient } from "../axiosClient";

export type BookmarkType = "JOB" | "COURSE";

export interface Bookmark {
  id: string;
  studentId: string;
  type: BookmarkType;
  targetId: string;
  createdAt: string;
}

export async function createBookmark(
  type: BookmarkType,
  targetId: string
): Promise<Bookmark | null> {
  try {
    const res = await httpClient.post("/students/bookmarks", {
      type,
      targetId,
    });
    if (res.status >= 200 && res.status < 300 && res.data?.data) {
      return res.data.data as Bookmark;
    }
    return null;
  } catch (err) {
    console.error("createBookmark error:", err);
    return null;
  }
}

export async function getBookmarks(): Promise<Bookmark[]> {
  try {
    const res = await httpClient.get("/students/bookmarks");
    if (res.status >= 200 && res.status < 300 && res.data?.data) {
      return res.data.data as Bookmark[];
    }
    return [];
  } catch (err) {
    console.error("getBookmarks error:", err);
    return [];
  }
}

export async function deleteBookmark(bookmarkId: string): Promise<boolean> {
  try {
    const res = await httpClient.delete(`/students/bookmarks/${bookmarkId}`);
    return res.status >= 200 && res.status < 300;
  } catch (err) {
    console.error("deleteBookmark error:", err);
    return false;
  }
}
