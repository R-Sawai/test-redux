import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type TestData = {
  id: number;
  name: string;
};

const initialState = {
  data: [] as TestData[],
  loading: false,
  error: {
    status: false,
    message: "",
  },
};

/** データの取得 */
export const fetchTestData = createAsyncThunk<TestData[], void>(
  "testData/fetchTestData",
  async () => {
    const waitTime = 1000;
    await new Promise<void>((res) => setTimeout(() => res(), waitTime));

    return [
      { id: 1, name: "test" },
      { id: 2, name: "abcde" },
      { id: 3, name: "hoge" },
      { id: 4, name: "fuga" },
    ];
  }
);

/** データの追加 */
export const pushTestData = createAsyncThunk<TestData[], TestData>(
  "urlLauncher/pushTestData",
  async (data: TestData, { getState }) => {
    const waitTime = 1000;
    await new Promise<void>((res) => setTimeout(() => res(), waitTime));

    const state = getState() as RootState;
    const result = [...state.testData.data];
    result.push(data);
    return result;
  }
);

export const testDataSlice = createSlice({
  name: "testData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //#region fetchTestData
    builder.addCase(fetchTestData.pending, (state) => {
      state.loading = true;
      state.error.status = false;
      state.error.message = "";
    });
    builder.addCase(fetchTestData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = new Array(...action.payload);
    });
    builder.addCase(fetchTestData.rejected, (state) => {
      state.loading = true;
      state.error.status = true;
      state.error.message = "データ取得でエラーが発生しました";
    });
    //#endregion

    //#region pushTestData
    builder.addCase(pushTestData.pending, (state) => {
      state.loading = true;
      state.error.status = false;
      state.error.message = "";
    });
    builder.addCase(pushTestData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = new Array(...action.payload);
    });
    builder.addCase(pushTestData.rejected, (state) => {
      state.loading = true;
      state.error.status = true;
      state.error.message = "データ取得でエラーが発生しました";
    });
    //#endregion
  },
});

export default testDataSlice.reducer;
