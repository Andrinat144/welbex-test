import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

import { axiosApiClient } from '@/api/axiosApiClient';
import { InitialsValuesBlog } from '@/components/Form/useNewBlog';
import { IBlog } from '@/Interfaces/IBlog.interface';

export interface BlogState {
  allBlogs: IBlog[] | null;
  blogLoading: boolean;
  error: string | null;
}

interface ErrorResponse {
  error: { message: string };
}

export interface IEditBlog {
  id: number;
  media: string | File;
  text: string;
  date: string;
}

export const getAllBlogs = createAsyncThunk<IBlog[], void, { rejectValue: ErrorResponse }>(
  'blog/getAllBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApiClient.get<IBlog[]>('/blog/get');
      return response.data;
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        console.log(error.response?.data);
        return rejectWithValue(error.response?.data || { error: { message: 'Some error in response server' } });
      }
      throw error;
    }
  }
);

export const deleteBlog = createAsyncThunk<IBlog, number, { rejectValue: ErrorResponse }>(
  'blog/deleteBlog',
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await axiosApiClient.delete<IBlog>(`/blog/delete/${blogId}`);
      return response.data;
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        console.log(error.response?.data);
        return rejectWithValue(error.response?.data || { error: { message: 'Some error in response server' } });
      }
      throw error;
    }
  }
);

export const addBlog = createAsyncThunk<IBlog, InitialsValuesBlog, { rejectValue: ErrorResponse }>(
  'blog/addBlog',
  async (materialData: InitialsValuesBlog, { rejectWithValue }) => {
    try {
      if (materialData.media) {
        const formData = new FormData();
        formData.append('media', materialData.media);
        formData.append('text', materialData.text);
        const response = await axiosApiClient.post<IBlog>('blog/add', formData);
        return response.data;
      } else {
        const response = await axiosApiClient.post<IBlog>('blog/add', materialData);
        return response.data;
      }
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        console.log(error.response?.data);
        return rejectWithValue(error.response?.data || { error: { message: 'Some error in response server' } });
      }
      throw error;
    }
  }
);

export const patchBlog = createAsyncThunk<
  IBlog,
  { materialData: IEditBlog; blogId: number },
  { rejectValue: ErrorResponse }
>('blog/patchBlog', async ({ materialData, blogId }, { rejectWithValue }) => {
  try {
    if (materialData.media) {
      const formData = new FormData();
      formData.append('media', materialData.media);
      formData.append('text', materialData.text);
      const response = await axiosApiClient.patch<IBlog>(`blog/patch/${blogId}`, formData);
      return response.data;
    } else {
      const response = await axiosApiClient.patch<IBlog>(`blog/patch/${blogId}`, materialData);
      return response.data;
    }
  } catch (error) {
    if (isAxiosError<ErrorResponse>(error)) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data || { error: { message: 'Some error in response server' } });
    }
    throw error;
  }
});

const initialState: BlogState = {
  allBlogs: null,
  blogLoading: false,
  error: null,
};

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(getAllBlogs.pending, (state) => {
        state.blogLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.blogLoading = false;
        state.allBlogs = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.blogLoading = false;
        state.error = action.payload?.error.message || 'Unknown error';
      })
      .addCase(deleteBlog.pending, (state) => {
        state.blogLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogLoading = false;
        state.allBlogs = state.allBlogs?.filter((item) => item.id !== action.payload.id) || null;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.blogLoading = false;
        state.error = action.payload?.error.message || 'Unknown error';
      })
      .addCase(addBlog.pending, (state) => {
        state.blogLoading = true;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogLoading = false;
        console.log(action.payload);
        if (state.allBlogs) {
          state.allBlogs = [...state.allBlogs, action.payload];
        } else {
          state.allBlogs = [action.payload];
        }
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.blogLoading = false;
        state.error = action.payload?.error.message || 'Unknown error';
      })
      .addCase(patchBlog.pending, (state) => {
        state.blogLoading = true;
      })
      .addCase(patchBlog.fulfilled, (state, action) => {
        state.blogLoading = false;
        console.log(action.payload);
        if (state.allBlogs) {
          state.allBlogs = state.allBlogs.map((item) => (item.id === action.payload.id ? action.payload : item));
        } else {
          state.allBlogs = [action.payload];
        }
      })
      .addCase(patchBlog.rejected, (state, action) => {
        state.blogLoading = false;
        state.error = action.payload?.error.message || 'Unknown error';
      });
  },
});

export default blogSlice.reducer;
