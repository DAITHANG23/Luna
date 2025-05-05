import { AllConceptsResponse } from "@/@types/models/concept";
import apiService from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ConceptsState {
  allConcepts: AllConceptsResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: ConceptsState = {
  allConcepts: null,
  loading: false,
  error: null,
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
      });
  },
});

export default masterDatasSlice.reducer;
