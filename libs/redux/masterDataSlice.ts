import { AllConceptsResponse, AllRestaurantResponse } from "@/@types/models";
import apiService from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface MasterDataState {
  allConcepts: AllConceptsResponse | null;
  loading: boolean;
  error: string | null;
  loadingGetAllRestaurants: boolean;
  allRestaurants: AllRestaurantResponse | null;
  errorGetAllRestaurants: string | null;
}

const initialState: MasterDataState = {
  allConcepts: null,
  loading: false,
  error: null,
  loadingGetAllRestaurants: false,
  allRestaurants: null,
  errorGetAllRestaurants: null,
};

export const getAllConcepts = createAsyncThunk<
  AllConceptsResponse,
  void,
  { rejectValue: string }
>("masterData/getAllConcepts", async (_, thunkAPI) => {
  try {
    const data = await apiService.masterData.getAllConcepts();
    if (!data) {
      return thunkAPI.rejectWithValue("Không có dữ liệu từ API");
    }

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error:", error);
    return thunkAPI.rejectWithValue(error.message || "Lỗi không xác định");
  }
});

export const getAllRestaurants = createAsyncThunk<
  AllRestaurantResponse,
  void,
  { rejectValue: string }
>("masterData/getAllRestaurants", async (_, thunkAPI) => {
  try {
    const data = await apiService.masterData.getAllRestaurants();
    if (!data) {
      return thunkAPI.rejectWithValue("Không có dữ liệu từ API");
    }

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error:", error);
    return thunkAPI.rejectWithValue(error.message || "Lỗi không xác định");
  }
});

const masterDatasSlice = createSlice({
  name: "concepts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllConcepts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllConcepts.fulfilled, (state, action) => {
        state.loading = false;
        state.allConcepts = action.payload;
      })
      .addCase(getAllConcepts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Đã xảy ra lỗi";
      })
      .addCase(getAllRestaurants.pending, (state) => {
        state.loadingGetAllRestaurants = true;
        state.errorGetAllRestaurants = null;
      })
      .addCase(getAllRestaurants.fulfilled, (state, action) => {
        state.loadingGetAllRestaurants = false;
        state.allRestaurants = action.payload;
      })
      .addCase(getAllRestaurants.rejected, (state, action) => {
        state.loadingGetAllRestaurants = false;
        state.errorGetAllRestaurants = action.payload || "Đã xảy ra lỗi";
      });
  },
});

export default masterDatasSlice.reducer;
